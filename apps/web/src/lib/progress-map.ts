import { getStory, type AgeBand, type Story } from "@/content/stories";
import { storyEnglish, storyFidel, storyNumbers } from "@/lib/activities";
import { packOf } from "@/lib/packs";
import type { StickerBasis } from "@/lib/stickers/catalog";

/*
  A child's progress map, worked out from what they did (finished stories, pages read aloud,
  reading days) and what each story teaches (`teaches` on Story; stories that don't say yet
  count by their pack). Plain TypeScript.
*/

export type ProgressMap = {
  /** Fidel families met, by first letter. */
  fidel: Set<string>;
  /** Numbers 1–10 met. */
  numbers: Set<number>;
  /** English words met, in the order first met. */
  words: string[];
  /** Stories finished (ids), launch and studio. */
  finished: string[];
  /** Stories read aloud by the child on every page. */
  readAloudBooks: number;
  /** Pages read aloud in all. */
  readAloudPages: number;
  /** Days with a finished story, YYYY-MM-DD (Addis Ababa). */
  days: Set<string>;
};

export function progressMap(basis: StickerBasis, pageCount: (id: string) => number | undefined): ProgressMap {
  const fidel = new Set<string>();
  const numbers = new Set<number>();
  const words: string[] = [];
  for (const id of basis.finished) {
    const story = getStory(id);
    if (!story) continue;
    const pack = packOf(story);
    // Fidel families come from the Fidel pack's stories.
    if (pack === "fidel") storyFidel(story, false).forEach((f) => fidel.add(f));
    (story.teaches?.numbers ?? (pack === "numbers" ? storyNumbers(story) : [])).forEach((n) => n >= 1 && n <= 10 && numbers.add(n));
    for (const w of story.teaches?.words ?? (pack === "english" ? storyEnglish(story) : [])) if (!words.includes(w.toLowerCase())) words.push(w.toLowerCase());
  }
  let readAloudBooks = 0;
  let readAloudPages = 0;
  for (const [id, pages] of Object.entries(basis.reads ?? {})) {
    const n = pageCount(id);
    const read = new Set(pages.filter((p) => p >= 0 && (!n || p < n)));
    readAloudPages += read.size;
    if (n && read.size >= n) readAloudBooks += 1;
  }
  return { fidel, numbers, words, finished: basis.finished, readAloudBooks, readAloudPages, days: new Set(basis.days) };
}

/**
 * "Next, try …": an unread story in the child's age group from a pack the family can open,
 * from the pack the child has read least of, so the map keeps growing in every direction.
 */
export function suggestNext(shelf: Story[], finished: string[], band: AgeBand | null): Story | null {
  const done = new Set(finished);
  const readByPack = new Map<string, number>();
  for (const s of shelf) if (done.has(s.id)) readByPack.set(packOf(s), (readByPack.get(packOf(s)) ?? 0) + 1);
  const options = shelf
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => !s.locked && !done.has(s.id) && (!band || s.ageBands.includes(band)));
  options.sort((a, b) => (readByPack.get(packOf(a.s)) ?? 0) - (readByPack.get(packOf(b.s)) ?? 0) || a.i - b.i);
  return options[0]?.s ?? null;
}

/** The days of a month as a calendar: weeks of 7 (Monday first), null outside the month. */
export function monthGrid(year: number, month: number): (string | null)[][] {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7;
  const cells: (string | null)[] = [...Array<null>(lead).fill(null)];
  for (let d = 1; d <= days; d++) cells.push(`${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}
