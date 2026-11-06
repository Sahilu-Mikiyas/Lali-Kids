import { connection } from "next/server";

import { getStory } from "@/content/stories";
import { isLang, type UiLang } from "@/i18n/langs";
import { signPage, TOKEN_SECONDS } from "@/lib/books/protect";
import { familyFor, limitReached, type Family } from "@/lib/family";
import { addisMidnightIso, gameBySlug, secondsPlayedToday, shelfGames } from "@/lib/games";
import { originFrom } from "@/lib/origin";
import { beginCheckout } from "@/lib/payments/checkout";
import { PLANS } from "@/lib/payments/plans";
import { familyPlan } from "@/lib/payments/subscription";
import { requestUser, type RequestUser } from "@/lib/supabase/request-user";
import { createSupabaseAdmin, hasActivePlan } from "@/lib/supabase/server";
import { signReadPass } from "@/lib/read-pass";
import { shelfStories, storyForReading } from "@/lib/stories";

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
  const [plan, played] = await Promise.all([familyPlan(f.profile.id), f.current ? secondsPlayedToday(f.current.id) : Promise.resolve(0)]);
  return json({
    profile: { id: profile.id, name: profile.display_name, email: profile.email, role: profile.role, uiLang: profile.ui_lang, telegram: Boolean(profile.telegram_chat_id) },
    children: f.children,
    currentChildId: f.current?.id ?? null,
    settings: { nightlyLimit: f.nightlyLimit, showAllAges: f.showAllAges, gamesMinutes: f.gamesMinutes },
    tonight: { read: f.readTonight, limitReached: limitReached(f) },
    games: { secondsToday: played, secondsLeft: f.gamesMinutes === 0 ? 0 : Math.max(0, f.gamesMinutes * 60 - played) },
    plan,
    plans: PLANS.map((p) => ({ id: p.id, priceEtb: p.priceEtb })),
  });
}

/** PATCH me: { nightlyLimit?, showAllAges?, gamesMinutes?, uiLang?, name? } */
async function patchMe(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ nightlyLimit: number; showAllAges: boolean; gamesMinutes: number; uiLang: string; name: string }>(ctx.request);
  const update: Record<string, unknown> = {};
  if (Number.isInteger(b.nightlyLimit) && b.nightlyLimit! >= 0 && b.nightlyLimit! <= 20) update.nightly_limit = b.nightlyLimit;
  if (typeof b.showAllAges === "boolean") update.show_all_ages = b.showAllAges;
  if ([0, 10, 20, 30, 60].includes(Number(b.gamesMinutes))) update.games_minutes = Number(b.gamesMinutes);
  if (isLang(b.uiLang)) update.ui_lang = b.uiLang;
  if (typeof b.name === "string") update.display_name = b.name.trim().slice(0, 60);
  if (!Object.keys(update).length) return fail(400, "Nothing to change");
  const { error } = await ctx.me.supabase.from("profiles").update(update).eq("id", ctx.me.user.id);
  return error ? fail(400, error.message) : getMe(ctx);
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

/** GET stories: the whole shelf. Launch stories come with their text; studio stories with a cover only. */
async function getStories(ctx: Ctx) {
  const stories = await shelfStories(ctx.me?.user.id ?? null);
  return json({ stories });
}

/** GET stories/:id: one story for reading, with short-lived picture and narration links. */
async function getStoryForReading(ctx: Ctx, id: string) {
  const builtIn = getStory(id);
  if (builtIn?.isFree) return json({ story: builtIn });
  const profile = ctx.me ? await profileOf(ctx.me) : null;
  const access = await storyForReading(id, ctx.me?.user.id ?? null, profile?.role === "admin");
  if (!access) return fail(404, "No such story");
  if (!("story" in access)) return json({ locked: access.locked }, 402);
  // Paid launch stories open in the website's animated book inside the app: add ?pass=… to its address.
  const readPass = builtIn && ctx.me ? signReadPass(ctx.me.user.id, id) : undefined;
  return json({ story: access.story, readPass });
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

/** POST checkout: { plan } → { url } of Chapa's page. The app opens it in the browser. */
async function checkout(ctx: Ctx) {
  if (!ctx.me) return fail(401, "Sign in");
  const b = await body<{ plan: string }>(ctx.request);
  const profile = await profileOf(ctx.me);
  if (!profile) return fail(404, "No profile");
  const result = await beginCheckout(profile, String(b.plan), originFrom(ctx.request.headers), ctx.lang, true);
  return "url" in result ? json(result) : json(result, 400);
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
