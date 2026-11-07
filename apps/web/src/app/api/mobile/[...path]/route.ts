import { connection } from "next/server";

import { getStory, type Story } from "@/content/stories";
import { isLang, type UiLang } from "@/i18n/langs";
import { signPage, TOKEN_SECONDS } from "@/lib/books/protect";
import { deleteFamilyAccount } from "@/lib/account";
import { familyFor, limitReached, type Family } from "@/lib/family";
import { addisMidnightIso, gameBySlug, secondsPlayedToday, shelfGames } from "@/lib/games";
import { originFrom } from "@/lib/origin";
import { beginCheckout } from "@/lib/payments/checkout";
import { peekGift, redeemGift, type GiftErrorCode } from "@/lib/payments/gift-server";
import { PLANS } from "@/lib/payments/plans";
import { dict } from "@/i18n/dict";
import { activePlanId, familyPlan } from "@/lib/payments/subscription";
import { packsForPlan, planForPack, packOf } from "@/lib/packs";
import { requestUser, type RequestUser } from "@/lib/supabase/request-user";
import { createSupabaseAdmin, hasActivePlan } from "@/lib/supabase/server";
import { signReadPass } from "@/lib/read-pass";
import { shelfStories, storyForReading } from "@/lib/stories";
import { cleanPosition, EMPTY_BASIS, isStickerId, isStoryId } from "@/lib/stickers/catalog";
import { loadStickerBasis, saveFind, savePosition, stickerStories, summarise } from "@/lib/stickers/server";
import { signedNarration, withNarration } from "@/lib/narration/server";
import { micListenSetting, saveMicListen } from "@/lib/read-aloud/server";

/**
 * The Lali app's API (apps/mobile, see docs/MOBILE.md). Every call carries the parent's
 * Supabase access token as `Authorization: Bearer …`, except the public shelf calls.
 * Calls that need the server's secret key (plans, private pictures, payments, game time)
 * live here; everything else the app reads straight from Supabase with row-level security.
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Lali-Child, X-Lali-Lang",
};
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { ...CORS, "Cache-Control": "no-store" } });
const fail = (status: number, error: string) => json({ error }, status);

type Ctx = { request: Request; path: string[]; me: RequestUser | null; lang: UiLang };

async function body<T>(request: Request): Promise<Partial<T>> {
  return ((await request.json().catch(() => ({}))) ?? {}) as Partial<T>;
}

async function profileOf(me: RequestUser) {
  const { data } = await me.supabase.from("profiles").select("id, display_name, role, ui_lang, telegram_chat_id").eq("id", me.user.id).single();
  return data ? { ...data, email: me.user.email } : null;
}

async function family(ctx: Ctx): Promise<Family | null> {
  if (!ctx.me) return null;
  const profile = await profileOf(ctx.me);
  if (!profile) return null;
  return familyFor(ctx.me.supabase, profile, ctx.request.headers.get("x-lali-child"));
}

// ---------------------------------------------------------------- handlers

/** GET me: the family, children, settings, plan and today's counters. */
async function getMe(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const [profile, f] = await Promise.all([profileOf(ctx.me), family(ctx)]);
  if (!profile || !f) return fail(404, "No profile");
  const [plan, played, micListen] = await Promise.all([
    familyPlan(f.profile.id),
    f.current ? secondsPlayedToday(f.current.id) : Promise.resolve(0),
    micListenSetting(ctx.me.supabase, f.profile.id).catch(() => null),
  ]);
  // After familyPlan, which starts a waiting plan if the current one has ended.
  const openPlan = await activePlanId(f.profile.id).catch(() => null);
  return json({
    profile: { id: profile.id, name: profile.display_name, email: profile.email, role: profile.role, uiLang: profile.ui_lang, telegram: Boolean(profile.telegram_chat_id) },
    children: f.children,
    currentChildId: f.current?.id ?? null,
    // micListen: "Listen to my child read" (null until migration 0011 is applied).
    settings: { nightlyLimit: f.nightlyLimit, showAllAges: f.showAllAges, gamesMinutes: f.gamesMinutes, micListen },
    tonight: { read: f.readTonight, limitReached: limitReached(f) },
    games: { secondsToday: played, secondsLeft: f.gamesMinutes === 0 ? 0 : Math.max(0, f.gamesMinutes * 60 - played) },
    plan,
    // The packs the family's plan opens (docs/PACKAGES.md); free stories open whatever these are.
    packs: packsForPlan(openPlan),
    plans: PLANS.map((p) => ({ id: p.id, priceEtb: p.priceEtb, packs: packsForPlan(p.id) })),
  });
}

/** PATCH me: { nightlyLimit?, showAllAges?, gamesMinutes?, uiLang?, name?, micListen? } */
async function patchMe(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ nightlyLimit: number; showAllAges: boolean; gamesMinutes: number; uiLang: string; name: string; micListen: boolean }>(ctx.request);
  // Saved on its own, so the other settings still save before migration 0011 adds the column.
  const micSaved = typeof b.micListen === "boolean" ? await saveMicListen(ctx.me.supabase, ctx.me.user.id, b.micListen) : null;
  const update: Record<string, unknown> = {};
  if (Number.isInteger(b.nightlyLimit) && b.nightlyLimit! >= 0 && b.nightlyLimit! <= 20) update.nightly_limit = b.nightlyLimit;
  if (typeof b.showAllAges === "boolean") update.show_all_ages = b.showAllAges;
  if ([0, 10, 20, 30, 60].includes(Number(b.gamesMinutes))) update.games_minutes = Number(b.gamesMinutes);
  if (isLang(b.uiLang)) update.ui_lang = b.uiLang;
  if (typeof b.name === "string") update.display_name = b.name.trim().slice(0, 60);
  if (!Object.keys(update).length) return micSaved === null ? fail(400, "Nothing to change") : getMe(ctx);
  const { error } = await ctx.me.supabase.from("profiles").update(update).eq("id", ctx.me.user.id);
  return error ? fail(400, error.message) : getMe(ctx);
}

/** DELETE me { confirm: "DELETE" }: deletes the family's account, recordings included. */
async function deleteMe(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ confirm: string }>(ctx.request);
  if (String(b.confirm ?? "").trim().toUpperCase() !== "DELETE") return fail(400, 'Send { "confirm": "DELETE" }');
  const result = await deleteFamilyAccount(ctx.me.user.id);
  return result.ok ? json({ ok: true }) : fail(500, "Could not delete the account");
}

const BANDS = ["3-5", "6-7", "8-9"];
const AVATARS = ["cub", "gugu", "bee"];

/** POST children: { name, ageBand, lang, avatar } */
async function addChild(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ name: string; ageBand: string; lang: string; avatar: string }>(ctx.request);
  const name = String(b.name ?? "").trim().slice(0, 40);
  if (!name || !BANDS.includes(String(b.ageBand)) || !AVATARS.includes(String(b.avatar ?? "cub"))) return fail(400, "Check the name and age group");
  const { data, error } = await ctx.me.supabase
    .from("children")
    .insert({ family_id: ctx.me.user.id, name, age_band: b.ageBand, preferred_lang: b.lang === "am" ? "am" : "en", avatar: b.avatar ?? "cub" })
    .select("id, name, age_band, preferred_lang, stars, avatar")
    .single();
  return error ? fail(400, error.message) : json({ child: data }, 201);
}

async function removeChild(ctx: Ctx, id: string) {
  if (!ctx.me) return fail(401, "Sign in");
  await ctx.me.supabase.from("children").delete().eq("id", id).eq("family_id", ctx.me.user.id);
  return json({ ok: true });
}

/** POST children/:id/allow-more: reopens tonight's shelf (moves today's completions to yesterday). */
async function allowMore(ctx: Ctx, id: string) {
  if (!ctx.me) return fail(401, "Sign in");
  const start = addisMidnightIso();
  await ctx.me.supabase
    .from("completions")
    .update({ completed_at: new Date(new Date(start).getTime() - 1000).toISOString() })
    .eq("child_id", id)
    .gte("completed_at", start);
  return json({ ok: true });
}

/**
 * GET stories: the whole shelf. Launch stories come with their text; studio stories with a cover
 * only. Each has its `pack` and whether it is `locked` for this family's plan; locked stories
 * carry no text and say which plan opens them (`opensWith`).
 */
async function getStories(ctx: Ctx) {
  const stories = await shelfStories(ctx.me?.user.id ?? null);
  return json({ stories: stories.map((s) => ({ ...s, pack: packOf(s), locked: Boolean(s.locked), ...(s.locked ? { opensWith: planForPack(packOf(s)) } : {}) })) });
}

/**
 * GET stories/:id: one story for reading, with short-lived picture and narration links. Voice-actor
 * narration (launch and studio stories) comes as `audio[page][lang]`, with `wordTimes[page][lang]`
 * (start of each word in ms) and `narrators[page][lang]`.
 */
async function getStoryForReading(ctx: Ctx, id: string) {
  const builtIn = getStory(id);
  const narrated = async (story: Story) => withNarration(story, await signedNarration(story.id).catch(() => null));
  if (builtIn?.isFree) return json({ story: await narrated({ ...builtIn, pack: packOf(builtIn) }) });
  const profile = ctx.me ? await profileOf(ctx.me) : null;
  const access = await storyForReading(id, ctx.me?.user.id ?? null, profile?.role === "admin");
  if (!access) return fail(404, "No such story");
  if (!("story" in access)) return json({ locked: access.locked, pack: packOf(access.locked), opensWith: planForPack(packOf(access.locked)) }, 402);
  // Paid launch stories open in the website's animated book inside the app: add ?pass=… to its address.
  const readPass = builtIn && ctx.me ? signReadPass(ctx.me.user.id, id) : undefined;
  return json({ story: await narrated(access.story), readPass });
}

/** POST progress: { storyId, itemType? } for the current child. Earns a star. */
async function postProgress(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ storyId: string; itemType: string }>(ctx.request);
  const f = await family(ctx);
  if (!f?.current) return fail(400, "Add a child first");
  if (!b.storyId || String(b.storyId).length > 100) return fail(400, "Which story?");
  if (limitReached(f)) return json({ stars: f.current.stars, tonight: { read: f.readTonight, limitReached: true } });
  await ctx.me.supabase.from("completions").insert({ child_id: f.current.id, item_type: b.itemType === "book" ? "book" : "story", item_id: b.storyId });
  const after = await family(ctx);
  return json({ stars: after?.current?.stars ?? 0, tonight: { read: after?.readTonight ?? 0, limitReached: limitReached(after) } });
}

/** GET books: partner PDF books. GET books/:slug?from=1&to=20: fresh page links (valid 90 seconds). */
async function getBooks(ctx: Ctx) {
  const admin = createSupabaseAdmin();
  const { data } = await admin
    .from("books")
    .select("id, slug, title, title_am, author, page_count, is_free, category, age_band")
    .eq("status", "ready")
    .order("created_at", { ascending: false });
  const open = ctx.me ? await hasActivePlan(ctx.me.user.id) : false;
  const origin = originFrom(ctx.request.headers);
  // Covers need the same Authorization header as the other calls.
  return json({ books: (data ?? []).map((b) => ({ ...b, locked: !b.is_free && !open, cover: `${origin}/api/books/${b.id}/cover` })) });
}

async function getBookPages(ctx: Ctx, slug: string) {
  if (!ctx.me) return fail(401, "Sign in");
  const url = new URL(ctx.request.url);
  const { data: book } = await createSupabaseAdmin()
    .from("books")
    .select("id, title, page_count, is_free, book_pages(page_number, width, height)")
    .eq("slug", slug)
    .eq("status", "ready")
    .single();
  if (!book) return fail(404, "No such book");
  if (!book.is_free && !(await hasActivePlan(ctx.me.user.id))) return fail(402, "This book needs a Lali plan");
  const from = Math.max(1, Number(url.searchParams.get("from")) || 1);
  const to = Math.min(book.page_count, Number(url.searchParams.get("to")) || from + 9);
  const origin = originFrom(ctx.request.headers);
  const pages = (book.book_pages as { page_number: number; width: number; height: number }[])
    .filter((p) => p.page_number >= from && p.page_number <= to)
    .sort((a, b) => a.page_number - b.page_number)
    .map((p) => ({ n: p.page_number, w: p.width, h: p.height, url: `${origin}/api/books/${book.id}/pages/${p.page_number}?t=${signPage(ctx.me!.user.id, book.id, p.page_number)}` }));
  return json({ id: book.id, title: book.title, pageCount: book.page_count, validSeconds: TOKEN_SECONDS, pages });
}

/** GET games; POST games/:slug/start; POST sessions/:id { seconds?, score? } */
async function getGames(ctx: Ctx) {
  const games = await shelfGames(ctx.me?.user.id ?? null);
  // Relative addresses (games hosted on Lali) become full ones for the app's web view.
  const origin = originFrom(ctx.request.headers);
  return json({ games: games.map((g) => ({ ...g, url: g.url.startsWith("/") ? `${origin}${g.url}` : g.url })) });
}

async function startGame(ctx: Ctx, slug: string) {
  const f = await family(ctx);
  const game = await gameBySlug(slug, f?.profile.id ?? null, f?.profile.role === "admin");
  if (!game) return fail(404, "missing");
  if (game.locked) return json({ ok: false, reason: "locked" }, 402);
  const origin = originFrom(ctx.request.headers);
  const url = game.url.startsWith("/") ? `${origin}${game.url}` : game.url;
  if (!f?.current) return json({ ok: true, sessionId: null, secondsLeft: null, url });
  if (f.gamesMinutes === 0) return json({ ok: false, reason: "off" });
  const left = f.gamesMinutes * 60 - (await secondsPlayedToday(f.current.id));
  if (left <= 0) return json({ ok: false, reason: "time-up" });
  const { data } = await createSupabaseAdmin()
    .from("game_sessions")
    .insert({ family_id: f.profile.id, child_id: f.current.id, game_id: game.id })
    .select("id")
    .single();
  return json({ ok: true, sessionId: data?.id ?? null, secondsLeft: left, url });
}

async function updateSession(ctx: Ctx, id: string) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ seconds: number; score: number }>(ctx.request);
  const admin = createSupabaseAdmin();
  const { data: s } = await admin.from("game_sessions").select("id, child_id, seconds, best_score").eq("id", id).eq("family_id", ctx.me.user.id).maybeSingle();
  if (!s) return fail(404, "No such session");
  const update: Record<string, number> = {};
  if (Number.isFinite(b.seconds)) update.seconds = s.seconds + Math.max(0, Math.min(30, Math.round(Number(b.seconds))));
  if (Number.isFinite(b.score)) {
    const score = Math.max(0, Math.min(1_000_000, Math.round(Number(b.score))));
    if (s.best_score === null || score > s.best_score) update.best_score = score;
  }
  if (Object.keys(update).length) await admin.from("game_sessions").update(update).eq("id", id);
  const { data: profile } = await ctx.me.supabase.from("profiles").select("games_minutes").eq("id", ctx.me.user.id).single();
  const left = s.child_id ? (profile?.games_minutes ?? 20) * 60 - (await secondsPlayedToday(s.child_id)) : null;
  return json({ secondsLeft: left });
}

/**
 * GET stickers: the current child's sticker book. Earned stickers come from their finished
 * stories (`completions`), golden ones from Find Lali finds, plus the milestones.
 */
async function getStickers(ctx: Ctx) {
  const f = await family(ctx);
  const stories = await stickerStories(f?.profile.id ?? null);
  const basis = f?.current && ctx.me ? await loadStickerBasis(ctx.me.supabase, f.current.id) : EMPTY_BASIS;
  const summary = summarise(stories, basis);
  return json({ childId: f?.current?.id ?? null, ...summary, finds: basis.finds, positions: basis.positions, reads: basis.reads ?? {} });
}

/** POST stickers/finds: { storyId, page } — the child found Lali on that page (sent by the reader as `lali:found`). */
async function postFind(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const f = await family(ctx);
  if (!f?.current) return fail(400, "Add a child first");
  const b = await body<{ storyId: string; page: number }>(ctx.request);
  const page = Number(b.page);
  if (!isStoryId(b.storyId) || !Number.isInteger(page) || page < 0 || page > 199) return fail(400, "Which page?");
  return json({ ok: true, saved: await saveFind(f.current.id, b.storyId, page) });
}

/** PATCH stickers/:id: { page, x, y, r? } — where the child stuck it in the album (x, y 0–1). */
async function patchSticker(ctx: Ctx, id: string) {
  if (!ctx.me) return fail(401, "Sign in");
  const f = await family(ctx);
  if (!f?.current) return fail(400, "Add a child first");
  const pos = cleanPosition(await body<Record<string, unknown>>(ctx.request));
  if (!isStickerId(id) || !pos) return fail(400, "Which sticker?");
  return json({ ok: true, saved: await savePosition(f.current.id, id, pos) });
}

/** POST checkout: { plan } → { url } of Chapa's page. The app opens it in the browser. */
async function checkout(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ plan: string }>(ctx.request);
  const profile = await profileOf(ctx.me);
  if (!profile) return fail(404, "No profile");
  const result = await beginCheckout(profile, String(b.plan), originFrom(ctx.request.headers), ctx.lang, true);
  return "url" in result ? json(result) : json(result, 400);
}

const GIFT_STATUS: Record<GiftErrorCode, number> = { format: 400, invalid: 404, used: 409, usedMine: 409, rate: 429, off: 503 };

/**
 * POST gifts/check { code }: what a gift code would give, before adding it.
 * POST gifts/redeem { code }: adds it to the family's plan, once, with the same rules as a payment.
 */
async function giftCall(ctx: Ctx, step: string) {
  if (!ctx.me) return fail(401, "Sign in");
  if (step !== "check" && step !== "redeem") return fail(404, "Unknown call");
  const b = await body<{ code: string }>(ctx.request);
  const code = String(b.code ?? "").slice(0, 40);
  const e = dict[ctx.lang].gift.errors;
  if (step === "check") {
    const peek = await peekGift(code, ctx.me.user.id, Date.now());
    if (!peek.ok) return json({ error: e[peek.error], reason: peek.error }, GIFT_STATUS[peek.error]);
    return json({ gift: peek });
  }
  const result = await redeemGift(code, ctx.me.user.id);
  if (!result.ok) return json({ error: e[result.error], reason: result.error }, GIFT_STATUS[result.error]);
  return json({ gift: result, plan: await familyPlan(ctx.me.user.id) });
}

// ---------------------------------------------------------------- routing

async function route(request: Request, params: Promise<{ path: string[] }>, method: string) {
  await connection();
  const { path } = await params;
  const header = request.headers.get("x-lali-lang");
  const ctx: Ctx = { request, path, me: await requestUser(request).catch(() => null), lang: isLang(header) ? header : "en" };
  const [a, b, c] = path;
  const key = `${method} ${a}${b ? "/:x" : ""}${c ? `/${c}` : ""}`;
  try {
    switch (key) {
      case "GET me":
        return await getMe(ctx);
      case "DELETE me":
        return await deleteMe(ctx);
      case "PATCH me":
        return await patchMe(ctx);
      case "POST children":
        return await addChild(ctx);
      case "DELETE children/:x":
        return await removeChild(ctx, b);
      case "POST children/:x/allow-more":
        return await allowMore(ctx, b);
      case "GET stories":
        return await getStories(ctx);
      case "GET stories/:x":
        return await getStoryForReading(ctx, b);
      case "POST progress":
        return await postProgress(ctx);
      case "GET books":
        return await getBooks(ctx);
      case "GET books/:x":
        return await getBookPages(ctx, b);
      case "GET games":
        return await getGames(ctx);
      case "POST games/:x/start":
        return await startGame(ctx, b);
      case "POST sessions/:x":
        return await updateSession(ctx, b);
      case "POST checkout":
        return await checkout(ctx);
      case "POST gifts/:x":
        return await giftCall(ctx, b);
      case "GET stickers":
        return await getStickers(ctx);
      case "POST stickers/:x":
        return b === "finds" ? await postFind(ctx) : fail(404, "Unknown call");
      case "PATCH stickers/:x":
        return await patchSticker(ctx, decodeURIComponent(b));
      default:
        return fail(404, "Unknown call");
    }
  } catch (e) {
    console.error("[mobile api]", key, e);
    return fail(500, "Something went wrong");
  }
}

type Params = { params: Promise<{ path: string[] }> };
export const GET = (r: Request, { params }: Params) => route(r, params, "GET");
export const POST = (r: Request, { params }: Params) => route(r, params, "POST");
export const PATCH = (r: Request, { params }: Params) => route(r, params, "PATCH");
export const DELETE = (r: Request, { params }: Params) => route(r, params, "DELETE");
export const OPTIONS = () => new Response(null, { status: 204, headers: CORS });
