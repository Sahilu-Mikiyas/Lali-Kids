import "server-only";

import { randomBytes } from "node:crypto";

import { getStory } from "@/content/stories";
import { isStoryId } from "@/lib/stickers/catalog";
import { hasSecretKey, isSupabaseConfigured } from "@/lib/supabase/env";
import { requestUser, type RequestUser } from "@/lib/supabase/request-user";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { baseType, cleanName, MAX_BYTES, MAX_SECONDS, VOICE_BUCKET, VOICE_EXT, type Recording, type VoiceLang } from "./shared";

/*
  Family voices, server side. Recordings are the family's own voices, so:
  - files live in the private `family-voices` bucket under <family_id>/<story_id>/<lang>/<page>-<random>.<ext>;
  - rows in `family_recordings` are readable only by the family (row-level security) and are
    written only here, with the secret key, after checking who is signed in;
  - playback uses links that expire after half an hour.
  Until migration 0009 is applied, everything answers "unavailable" and the features hide.
*/

const LINK_SECONDS = 30 * 60;

type Row = { id: string; story_id: string; lang: VoiceLang; page: number; recorder_name: string; path: string; duration_ms: number; created_at: string };
const COLUMNS = "id, story_id, lang, page, recorder_name, path, duration_ms, created_at";

const toRecording = (r: Row, url?: string): Recording => ({
  id: r.id,
  storyId: r.story_id,
  lang: r.lang,
  page: r.page,
  name: r.recorder_name,
  durationMs: r.duration_ms,
  createdAt: r.created_at,
  url,
});

export type VoiceResult = { status: number; body: Record<string, unknown> };
const answer = (status: number, body: Record<string, unknown>): VoiceResult => ({ status, body });

/** The signed-in parent, whether the website (cookie) or the app (Bearer token) is asking. */
export async function voiceUser(request: Request): Promise<RequestUser | null> {
  if (!isSupabaseConfigured()) return null;
  return requestUser(request).catch(() => null);
}

export async function listVoices(me: RequestUser, storyId: string | null): Promise<VoiceResult> {
  if (!hasSecretKey()) return answer(200, { recordings: [], available: false });
  let q = me.supabase.from("family_recordings").select(COLUMNS).eq("family_id", me.user.id).order("created_at", { ascending: false }).limit(1000);
  if (storyId) q = q.eq("story_id", storyId);
  const { data, error } = await q;
  if (error) return answer(200, { recordings: [], available: false });
  const rows = (data ?? []) as Row[];
  if (!storyId || !rows.length) return answer(200, { recordings: rows.map((r) => toRecording(r)), available: true });
  // Newest first, so the latest take of each page wins.
  const seen = new Set<string>();
  const latest = rows.filter((r) => {
    const k = `${r.recorder_name}|${r.lang}|${r.page}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  const { data: links } = await createSupabaseAdmin()
    .storage.from(VOICE_BUCKET)
    .createSignedUrls(
      latest.map((r) => r.path),
      LINK_SECONDS,
    );
  const byPath = new Map((links ?? []).map((l) => [l.path, l.signedUrl]));
  return answer(200, { recordings: latest.map((r) => toRecording(r, byPath.get(r.path) ?? undefined)), available: true });
}

async function storyExists(id: string): Promise<boolean> {
  if (getStory(id)) return true;
  const { data } = await createSupabaseAdmin().from("stories").select("id").eq("slug", id).maybeSingle();
  return Boolean(data);
}

export async function saveVoice(me: RequestUser, form: FormData): Promise<VoiceResult> {
  if (!hasSecretKey()) return answer(503, { error: "unavailable" });
  const file = form.get("file");
  const storyId = String(form.get("story") ?? "");
  const lang = form.get("lang");
  const page = Number(form.get("page"));
  const name = cleanName(form.get("name"));
  const durationMs = Math.round(Number(form.get("duration")));
  if (!(file instanceof Blob) || file.size === 0) return answer(400, { error: "No recording" });
  if (file.size > MAX_BYTES) return answer(413, { error: "too-big" });
  const type = baseType(file.type || "");
  const ext = VOICE_EXT[type];
  if (!ext) return answer(415, { error: "Unsupported audio type" });
  if (!isStoryId(storyId) || (lang !== "en" && lang !== "am") || !Number.isInteger(page) || page < 0 || page > 199) return answer(400, { error: "Which page?" });
  if (!name) return answer(400, { error: "Who is reading?" });
  if (!Number.isFinite(durationMs) || durationMs <= 0 || durationMs > (MAX_SECONDS + 1) * 1000) return answer(400, { error: "too-long" });

  const admin = createSupabaseAdmin();
  const { data: profile } = await me.supabase.from("profiles").select("id").eq("id", me.user.id).maybeSingle();
  if (!profile) return answer(403, { error: "No family" });
  if (!(await storyExists(storyId))) return answer(404, { error: "No such story" });

  const path = `${me.user.id}/${storyId}/${lang}/${page}-${randomBytes(8).toString("hex")}.${ext}`;
  const up = await admin.storage.from(VOICE_BUCKET).upload(path, file, { contentType: type, upsert: false });
  if (up.error) return answer(503, { error: "unavailable" });
  const { data: row, error } = await admin
    .from("family_recordings")
    .insert({ family_id: me.user.id, story_id: storyId, lang, page, recorder_name: name, path, duration_ms: durationMs })
    .select(COLUMNS)
    .single();
  if (error || !row) {
    await admin.storage.from(VOICE_BUCKET).remove([path]);
    return answer(503, { error: "unavailable" });
  }
  // A new take replaces the old one for the same reader, page and language.
  const { data: old } = await admin
    .from("family_recordings")
    .select("id, path")
    .eq("family_id", me.user.id)
    .eq("story_id", storyId)
    .eq("lang", lang)
    .eq("page", page)
    .eq("recorder_name", name)
    .neq("id", (row as Row).id);
  if (old?.length) {
    await admin.storage.from(VOICE_BUCKET).remove(old.map((o) => o.path));
    await admin
      .from("family_recordings")
      .delete()
      .in(
        "id",
        old.map((o) => o.id),
      );
  }
  return answer(201, { recording: toRecording(row as Row) });
}

/** Deletes one recording (`id`), or every recording of the family (`id` null). */
export async function deleteVoices(me: RequestUser, id: string | null): Promise<VoiceResult> {
  if (!hasSecretKey()) return answer(503, { error: "unavailable" });
  const admin = createSupabaseAdmin();
  let q = admin.from("family_recordings").select("id, path").eq("family_id", me.user.id).limit(5000);
  if (id) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) return answer(404, { error: "No such recording" });
    q = q.eq("id", id);
  }
  const { data, error } = await q;
  if (error) return answer(503, { error: "unavailable" });
  const rows = (data ?? []) as { id: string; path: string }[];
  if (id && !rows.length) return answer(404, { error: "No such recording" });
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100);
    await admin.storage.from(VOICE_BUCKET).remove(chunk.map((r) => r.path));
    await admin
      .from("family_recordings")
      .delete()
      .eq("family_id", me.user.id)
      .in(
        "id",
        chunk.map((r) => r.id),
      );
  }
  return answer(200, { ok: true, deleted: rows.length });
}
