/*
  Record your voice: a parent or grandparent reads a story page by page for their own
  children. Shared limits and shapes for the recorder, the API and the reader.
*/

export const VOICE_BUCKET = "family-voices";
export const MAX_SECONDS = 60;
export const MAX_BYTES = 4 * 1024 * 1024;

/** Opus in WebM where the browser can, MP4/AAC on Safari. In order of preference. */
export const RECORDING_TYPES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4;codecs=mp4a.40.2", "audio/mp4", "audio/aac", "audio/ogg;codecs=opus"];

/** File types the server accepts, with the extension they're stored under. */
export const VOICE_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/mpeg": "mp3",
};

/** "audio/webm;codecs=opus" -> "audio/webm" */
export const baseType = (t: string) => t.split(";")[0].trim().toLowerCase();

export type VoiceLang = "en" | "am";

export type Recording = {
  id: string;
  storyId: string;
  lang: VoiceLang;
  page: number;
  name: string;
  durationMs: number;
  createdAt: string;
  /** Short-lived link for playback (only when listing one story). */
  url?: string;
};

/** A recorder's voice for one story: their clip for each language and page. */
export type FamilyVoice = { name: string; pages: Partial<Record<VoiceLang, Record<number, string>>> };

export function groupVoices(recordings: Recording[]): FamilyVoice[] {
  const by = new Map<string, FamilyVoice>();
  for (const r of recordings) {
    if (!r.url) continue;
    const v = by.get(r.name) ?? { name: r.name, pages: {} };
    (v.pages[r.lang] ??= {})[r.page] = r.url;
    by.set(r.name, v);
  }
  return [...by.values()];
}

export const cleanName = (v: unknown) =>
  typeof v === "string"
    ? [...v]
        .filter((c) => c.charCodeAt(0) >= 32 && c !== "<" && c !== ">")
        .join("")
        .trim()
        .slice(0, 40)
    : "";
