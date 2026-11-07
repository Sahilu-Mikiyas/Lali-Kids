import type { Lang } from "@/content/stories";

/*
  Narration by voice actors: one recording per story, language and page, with the start time of
  every word (ms) so the reader lights the words up exactly. Shared by the server, the reader and
  the admin's timing tool.
*/

export const NARRATION_BUCKET = "narration";
export const NARRATION_MAX_BYTES = 15 * 1024 * 1024;

/** Accepted file types and the extension each is stored under. Nothing is converted. */
export const NARRATION_TYPES: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/m4a": "m4a",
  "audio/aac": "m4a",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/wave": "wav",
  "audio/vnd.wave": "wav",
  "audio/webm": "webm",
};

/** For files whose type the browser left empty. */
const BY_EXTENSION: Record<string, string> = { mp3: "audio/mpeg", m4a: "audio/mp4", wav: "audio/wav", webm: "audio/webm" };

/** The stored type for an upload, from its type or its name; null when it isn't one we take. */
export function narrationType(file: { type: string; name?: string }): string | null {
  const t = file.type.split(";")[0].trim().toLowerCase();
  if (NARRATION_TYPES[t]) return t;
  const ext = /\.([a-z0-9]+)$/i.exec(file.name ?? "")?.[1]?.toLowerCase();
  return ext && BY_EXTENSION[ext] ? BY_EXTENSION[ext] : null;
}

export const NARRATION_ACCEPT = "audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/x-wav,audio/webm,.mp3,.m4a,.wav,.webm";

/**
 * The words of a page, exactly as the reader splits them (on single spaces). Word times are one
 * per entry of this list.
 */
export const pageWords = (text: string) => text.split(" ");

/** One page's narration in one language, as the reader gets it. */
export type PageNarration = { url: string; narrator: string; durationMs: number; wordTimes: number[] };

/** Narration of a story: page index -> language -> clip. */
export type StoryNarration = Record<number, Partial<Record<Lang, PageNarration>>>;

/** Word times from outside, made safe: whole milliseconds, never going backwards. */
export function cleanWordTimes(v: unknown, maxMs = 600_000): number[] | null {
  if (!Array.isArray(v) || v.length > 600) return null;
  const out: number[] = [];
  for (const x of v) {
    const n = Math.round(Number(x));
    if (!Number.isFinite(n) || n < 0 || n > maxMs) return null;
    if (out.length && n < out[out.length - 1]) return null;
    out.push(n);
  }
  return out;
}

/** Word times that fit this text (one per word); anything else means "spread across the clip". */
export function timesFit(times: number[] | null | undefined, text: string): boolean {
  return Boolean(times && times.length > 0 && times.length === pageWords(text).length);
}

export const cleanNarrator = (v: unknown) =>
  typeof v === "string"
    ? [...v]
        .filter((c) => c.charCodeAt(0) >= 32 && c !== "<" && c !== ">")
        .join("")
        .trim()
        .slice(0, 60)
    : "";
