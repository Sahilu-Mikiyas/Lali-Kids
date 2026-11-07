import type { Lang } from "@/content/stories";

/*
  The sticker book: which stickers exist and which a child has earned.

  - Each story has a sticker, earned by finishing it.
  - Finding Lali on every page of a story earns the golden version of its sticker.
  - Milestones: 3, 5 and 10 different stories finished, and stories on 7 days in a row.
  - "I read it myself": reading every page of a book aloud (the read-along microphone).

  Nothing here is stored as "earned": it is worked out from what the child did (finished
  stories, the days they read, the pages where they found Lali), so it can't drift.
  Plain TypeScript, shared by the browser, the server and the app's API.
*/

export type StickerKind = "story" | "golden" | "milestone";

export type StickerDef = {
  id: string;
  kind: StickerKind;
  /** For story and golden stickers. */
  storyId?: string;
  title: Record<Lang, string>;
  color: string;
  /** Album page it belongs on. */
  album: number;
};

/** What a child did, the only thing stickers are worked out from. */
export type StickerBasis = {
  /** Stories finished at least once. */
  finished: string[];
  /** Days with a finished story, YYYY-MM-DD. */
  days: string[];
  /** Pages where Lali was found, by story. */
  finds: Record<string, number[]>;
  /** Where the child stuck each sticker in the album. */
  positions: Record<string, StickerPosition>;
  /** Pages the child read aloud, by story (reader stars). Optional: older records lack it. */
  reads?: Record<string, number[]>;
};

export type StickerPosition = { page: number; x: number; y: number; r?: number };

export const EMPTY_BASIS: StickerBasis = { finished: [], days: [], finds: {}, positions: {}, reads: {} };

/** The stories the album knows about: launch stories and studio stories. */
export type StickerStory = { id: string; title: Record<Lang, string>; color: string; pageCount: number };

/** The "I read it myself" sticker: every page of a book read aloud. */
export const READ_MYSELF_ID = "m:readself";

export const MILESTONES: { id: string; n?: number; streak?: number; readAll?: boolean; title: Record<Lang, string>; color: string }[] = [
  { id: "m:3", n: 3, title: { en: "3 stories!", am: "3 ተረቶች!" }, color: "#2F5BD3" },
  { id: "m:5", n: 5, title: { en: "5 stories!", am: "5 ተረቶች!" }, color: "#0E8C80" },
  { id: "m:10", n: 10, title: { en: "10 stories!", am: "10 ተረቶች!" }, color: "#D63B72" },
  { id: "m:streak7", streak: 7, title: { en: "7 days in a row", am: "7 ቀን በተከታታይ" }, color: "#F5B21E" },
  // AMHARIC: first draft, to be checked by a native-speaking editor.
  { id: READ_MYSELF_ID, readAll: true, title: { en: "I read it myself!", am: "ራሴ አነበብኩት!" }, color: "#1E9E5A" },
];

/** Whether every page of some story was read aloud. */
export function readEveryPage(reads: Record<string, number[]> | undefined, pageCount: (storyId: string) => number | undefined): boolean {
  for (const [storyId, pages] of Object.entries(reads ?? {})) {
    const n = pageCount(storyId);
    if (n && new Set(pages.filter((p) => p >= 0 && p < n)).size >= n) return true;
  }
  return false;
}

export const storyStickerId = (storyId: string) => `story:${storyId}`;
export const goldenStickerId = (storyId: string) => `gold:${storyId}`;

/** Story stickers on album page 0, golden ones on page 1, milestones on page 2. */
export function stickerCatalog(stories: StickerStory[]): StickerDef[] {
  return [
    ...stories.map((s) => ({ id: storyStickerId(s.id), kind: "story" as const, storyId: s.id, title: s.title, color: s.color, album: 0 })),
    ...stories.map((s) => ({
      id: goldenStickerId(s.id),
      kind: "golden" as const,
      storyId: s.id,
      title: { en: `Golden ${s.title.en}`, am: `የወርቅ ${s.title.am}` },
      color: s.color,
      album: 1,
    })),
    ...MILESTONES.map((m) => ({ id: m.id, kind: "milestone" as const, title: m.title, color: m.color, album: 2 })),
  ];
}

/** The longest run of consecutive days in a list of YYYY-MM-DD dates. */
export function longestStreak(days: string[]): number {
  const sorted = [...new Set(days)].sort();
  let best = 0;
  let run = 0;
  let prev = 0;
  for (const d of sorted) {
    const t = Date.parse(`${d}T00:00:00Z`);
    if (Number.isNaN(t)) continue;
    run = prev && t - prev === 86_400_000 ? run + 1 : 1;
    prev = t;
    best = Math.max(best, run);
  }
  return best;
}

/**
 * Every sticker this child has earned. `pageCount` gives a story's number of pages (for the
 * golden sticker); stories it doesn't know can't earn their golden sticker.
 */
export function earnedStickers(basis: StickerBasis, pageCount: (storyId: string) => number | undefined): Set<string> {
  const earned = new Set<string>();
  const finished = new Set(basis.finished);
  for (const id of finished) earned.add(storyStickerId(id));
  for (const [storyId, pages] of Object.entries(basis.finds)) {
    const n = pageCount(storyId);
    if (!n) continue;
    const found = new Set(pages.filter((p) => p >= 0 && p < n));
    if (found.size >= n) earned.add(goldenStickerId(storyId));
  }
  const streak = longestStreak(basis.days);
  const readAll = readEveryPage(basis.reads, pageCount);
  for (const m of MILESTONES) {
    if (m.n && finished.size >= m.n) earned.add(m.id);
    if (m.streak && streak >= m.streak) earned.add(m.id);
    if (m.readAll && readAll) earned.add(m.id);
  }
  return earned;
}

/** A sticker id's story, or null for milestones. */
export function stickerStory(id: string): string | null {
  const m = /^(story|gold):(.+)$/.exec(id);
  return m ? m[2] : null;
}

/** Ids we accept from browsers and the app. */
export const isStickerId = (v: unknown): v is string => typeof v === "string" && /^(story:|gold:)[a-z0-9-]{1,100}$|^m:(3|5|10|streak7|readself)$/.test(v);
export const isStoryId = (v: unknown): v is string => typeof v === "string" && /^[a-z0-9-]{1,100}$/.test(v);

/** A position from outside, made safe (0–1 across the album page). */
export function cleanPosition(v: unknown): StickerPosition | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const page = Number(o.page);
  const x = Number(o.x);
  const y = Number(o.y);
  const r = o.r === undefined ? 0 : Number(o.r);
  if (!Number.isInteger(page) || page < 0 || page > 20) return null;
  if (![x, y, r].every(Number.isFinite)) return null;
  const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
  return { page, x: clamp(x, 0, 1), y: clamp(y, 0, 1), r: clamp(r, -30, 30) };
}

/** Today's date where the reader is, YYYY-MM-DD. */
export function localDay(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** A timestamp's date in Addis Ababa (UTC+3, no daylight saving), YYYY-MM-DD. */
export function addisDay(iso: string): string {
  const d = new Date(Date.parse(iso) + 3 * 3600_000);
  return d.toISOString().slice(0, 10);
}
