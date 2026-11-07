import "server-only";

import { randomBytes } from "node:crypto";

import { getStory, type Lang, type Story } from "@/content/stories";
import { isStoryId } from "@/lib/stickers/catalog";
import { storyOpenFor } from "@/lib/stories";
import { hasSecretKey, isSupabaseConfigured } from "@/lib/supabase/env";
import { requestUser, type RequestUser } from "@/lib/supabase/request-user";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { cleanNarrator, cleanWordTimes, NARRATION_BUCKET, NARRATION_MAX_BYTES, NARRATION_TYPES, narrationType, type PageNarration, type StoryNarration } from "./shared";

/*
  Narration, server side.
  - Files live in the private `narration` bucket under <story>/<lang>/<page>-<random>.<ext>.
  - Rows in `story_narrations` (migration 0011) are written only here, with the secret key, after
    checking the person is an admin.
  - Playback uses links that expire after an hour, handed out only for stories the family may
    open (the same rules as storyForReading).
  Until the migration is applied every read answers "unavailable" and the reader carries on with
  the browser's voice.
*/

const LINK_SECONDS = 60 * 60;

export type NarrationRow = { story_id: string; lang: Lang; page: number; narrator: string; path: string; duration_ms: number; word_times: unknown; updated_at: string };
const COLUMNS = "story_id, lang, page, narrator, path, duration_ms, word_times, updated_at";

export type NarrationResult = { status: number; body: Record<string, unknown> };
const answer = (status: number, body: Record<string, unknown>): NarrationResult => ({ status, body });

/** Every narration row of a story, or null when narration isn't available (no key, no table). */
async function rowsFor(storyId: string): Promise<NarrationRow[] | null> {
  if (!hasSecretKey()) return null;
  const { data, error } = await createSupabaseAdmin().from("story_narrations").select(COLUMNS).eq("story_id", storyId).order("page").limit(800);
  if (error) return null;
  return (data ?? []) as NarrationRow[];
}

async function sign(paths: string[]): Promise<Map<string, string>> {
  if (!paths.length) return new Map();
  const { data } = await createSupabaseAdmin().storage.from(NARRATION_BUCKET).createSignedUrls(paths, LINK_SECONDS);
  const out = new Map<string, string>();
  for (const d of data ?? []) if (d.path && d.signedUrl) out.set(d.path, d.signedUrl);
  return out;
}

/** A story's narration with fresh links. Callers check access first. Null when unavailable. */
export async function signedNarration(storyId: string): Promise<StoryNarration | null> {
  const rows = await rowsFor(storyId);
  if (!rows) return null;
  const links = await sign(rows.map((r) => r.path));
  const out: StoryNarration = {};
  for (const r of rows) {
    const url = links.get(r.path);
    if (!url) continue;
    (out[r.page] ??= {})[r.lang] = { url, narrator: r.narrator, durationMs: r.duration_ms, wordTimes: cleanWordTimes(r.word_times) ?? [] };
  }
  return out;
}

/** GET /api/narration: the narration a family may hear for one story. */
export async function narrationForFamily(storyId: string, familyId: string | null, isAdmin: boolean): Promise<NarrationResult> {
  if (!isStoryId(storyId)) return answer(400, { error: "Which story?" });
  const access = await storyOpenFor(storyId, familyId, isAdmin).catch(() => null);
  if (!access) return answer(getStory(storyId) ? 200 : 404, getStory(storyId) ? { available: false, pages: {} } : { error: "No such story" });
  if (!access.open) return answer(402, { error: "This story needs a Lali plan", pages: {} });
  const pages = await signedNarration(storyId).catch(() => null);
  return answer(200, { available: pages !== null, pages: pages ?? {} });
}

/**
 * A story for the app's API with narration added: `audio[page][lang]` links (replacing a studio
 * story's own narration where both exist), `wordTimes[page][lang]` and `narrators[page][lang]`.
 */
export function withNarration(story: Story, narration: StoryNarration | null): Story {
  if (!narration || !Object.keys(narration).length) return story;
  const audio = story.pages.map((_, i) => ({ ...(story.audio?.[i] ?? {}) }));
  const wordTimes = story.pages.map(() => ({}) as Partial<Record<Lang, number[]>>);
  const narrators = story.pages.map(() => ({}) as Partial<Record<Lang, string>>);
  for (const [p, byLang] of Object.entries(narration)) {
    const i = Number(p);
    if (!audio[i]) continue;
    for (const [l, n] of Object.entries(byLang) as [Lang, PageNarration][]) {
      audio[i][l] = n.url;
      wordTimes[i][l] = n.wordTimes;
      narrators[i][l] = n.narrator;
    }
  }
  return { ...story, audio, wordTimes, narrators };
}

/* ---------------------------------------------------------------- admin */

/** The signed-in admin behind a request (website cookie or Bearer token), or null. */
export async function requestAdmin(request: Request): Promise<RequestUser | null> {
  if (!isSupabaseConfigured()) return null;
  const me = await requestUser(request).catch(() => null);
  if (!me) return null;
  const { data } = await me.supabase.from("profiles").select("role").eq("id", me.user.id).maybeSingle();
  return data?.role === "admin" ? me : null;
}

/** Whether the story exists, and whether it's free (copied onto the row for its read policy). */
async function storyInfo(storyId: string): Promise<{ free: boolean } | null> {
  const launch = getStory(storyId);
  if (launch) return { free: launch.isFree };
  const { data } = await createSupabaseAdmin().from("stories").select("is_free").eq("slug", storyId).maybeSingle();
  return data ? { free: Boolean(data.is_free) } : null;
}

/** GET /api/admin/narration?story=: every page's clip with links for the admin to listen to. */
export async function adminNarration(storyId: string): Promise<NarrationResult> {
  if (!isStoryId(storyId)) return answer(400, { error: "Which story?" });
  const rows = await rowsFor(storyId);
  if (!rows) return answer(200, { available: false, clips: [] });
  const links = await sign(rows.map((r) => r.path));
  return answer(200, {
    available: true,
    clips: rows.map((r) => ({
      page: r.page,
      lang: r.lang,
      narrator: r.narrator,
      durationMs: r.duration_ms,
      wordTimes: cleanWordTimes(r.word_times) ?? [],
      updatedAt: r.updated_at,
      url: links.get(r.path) ?? null,
    })),
  });
}

function where(form: FormData | Record<string, unknown>) {
  const get = (k: string) => (form instanceof FormData ? form.get(k) : form[k]);
  const storyId = String(get("story") ?? "");
  const lang = get("lang");
  const page = Number(get("page"));
  if (!isStoryId(storyId) || (lang !== "en" && lang !== "am") || !Number.isInteger(page) || page < 0 || page > 199) return null;
  return { storyId, lang: lang as Lang, page };
}

/** POST: a new clip for one page (replaces the old one, and its timings). */
export async function saveNarrationClip(form: FormData): Promise<NarrationResult> {
  if (!hasSecretKey()) return answer(503, { error: "unavailable" });
  const at = where(form);
  if (!at) return answer(400, { error: "Which story, language and page?" });
  const file = form.get("file");
  if (!(file instanceof Blob) || file.size === 0) return answer(400, { error: "Choose an audio file." });
  if (file.size > NARRATION_MAX_BYTES) return answer(413, { error: "Narration files must be 15 MB or less." });
  const type = narrationType({ type: file.type || "", name: file instanceof File ? file.name : "" });
  if (!type) return answer(415, { error: "Narration must be MP3, M4A, WAV or WebM." });
  const narrator = cleanNarrator(form.get("narrator"));
  if (!narrator) return answer(400, { error: "Who is the narrator?" });
  const durationMs = Math.round(Number(form.get("duration")));
  if (!Number.isFinite(durationMs) || durationMs <= 0 || durationMs > 600_000) return answer(400, { error: "Couldn't read how long the clip is." });

  const info = await storyInfo(at.storyId);
  if (!info) return answer(404, { error: "No such story" });
  const admin = createSupabaseAdmin();
  const { data: old, error: readError } = await admin.from("story_narrations").select("path").eq("story_id", at.storyId).eq("lang", at.lang).eq("page", at.page).maybeSingle();
  if (readError) return answer(503, { error: "unavailable" });

  const path = `${at.storyId}/${at.lang}/${at.page}-${randomBytes(8).toString("hex")}.${NARRATION_TYPES[type]}`;
  const up = await admin.storage.from(NARRATION_BUCKET).upload(path, file, { contentType: type, upsert: false });
  if (up.error) return answer(503, { error: `Upload failed: ${up.error.message}` });
  const { error } = await admin.from("story_narrations").upsert(
    {
      story_id: at.storyId,
      lang: at.lang,
      page: at.page,
      narrator,
      path,
      duration_ms: durationMs,
      word_times: [],
      story_is_free: info.free,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "story_id,lang,page" },
  );
  if (error) {
    await admin.storage.from(NARRATION_BUCKET).remove([path]);
    return answer(503, { error: "unavailable" });
  }
  if (old?.path && old.path !== path) await admin.storage.from(NARRATION_BUCKET).remove([old.path]);
  return answer(201, { ok: true });
}

/** PATCH: word times for one page (and optionally a new narrator name). */
export async function saveWordTimes(body: Record<string, unknown>): Promise<NarrationResult> {
  if (!hasSecretKey()) return answer(503, { error: "unavailable" });
  const at = where(body);
  if (!at) return answer(400, { error: "Which story, language and page?" });
  const times = cleanWordTimes(body.wordTimes);
  if (!times) return answer(400, { error: "Word times must be whole milliseconds, in order." });
  const update: Record<string, unknown> = { word_times: times, updated_at: new Date().toISOString() };
  if (body.narrator !== undefined) {
    const narrator = cleanNarrator(body.narrator);
    if (!narrator) return answer(400, { error: "Who is the narrator?" });
    update.narrator = narrator;
  }
  const { data, error } = await createSupabaseAdmin().from("story_narrations").update(update).eq("story_id", at.storyId).eq("lang", at.lang).eq("page", at.page).select("page");
  if (error) return answer(503, { error: "unavailable" });
  if (!data?.length) return answer(404, { error: "Upload the clip first." });
  return answer(200, { ok: true, wordTimes: times });
}

/** DELETE: removes one page's clip. */
export async function deleteNarration(params: URLSearchParams): Promise<NarrationResult> {
  if (!hasSecretKey()) return answer(503, { error: "unavailable" });
  const at = where(Object.fromEntries(params));
  if (!at) return answer(400, { error: "Which story, language and page?" });
  const admin = createSupabaseAdmin();
  const { data, error } = await admin.from("story_narrations").delete().eq("story_id", at.storyId).eq("lang", at.lang).eq("page", at.page).select("path");
  if (error) return answer(503, { error: "unavailable" });
  const paths = (data ?? []).map((r: { path: string }) => r.path);
  if (paths.length) await admin.storage.from(NARRATION_BUCKET).remove(paths);
  return answer(200, { ok: true, deleted: paths.length });
}
