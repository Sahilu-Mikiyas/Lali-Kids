import type { Lang } from "@/content/stories";

/*
  Matching what the speech service heard against the words on the page, leniently: a young reader
  (and the recogniser) gets plenty of small things "wrong", and that must still count.

  - Case, punctuation and quotes are ignored (English and Ethiopic: ። ፣ ፤ ፥ ፦ ፧ « » …).
  - English: digits match number words ("3" = "three"), endings may differ ("count" = "counted").
  - Amharic: letters that sound the same are treated as one (ሀ ሐ ኀ, ሰ ሠ, አ ዐ, ጸ ፀ), and a word
    also matches when its consonants agree even if a vowel order differs.
  - One letter wrong is fine in words of four or more letters, two in long words.
  Plain TypeScript with no browser APIs, so it can be tested on its own.
*/

const NUMBERS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine",
  "10": "ten", "11": "eleven", "12": "twelve", "13": "thirteen", "14": "fourteen", "15": "fifteen", "16": "sixteen", "17": "seventeen",
  "18": "eighteen", "19": "nineteen", "20": "twenty",
};

/** Rows of fidel that sound alike, folded onto one row: [from, to] row starts. */
const SAME_SOUND: [number, number][] = [
  [0x1210, 0x1200], // ሐ -> ሀ
  [0x1280, 0x1200], // ኀ -> ሀ
  [0x1220, 0x1230], // ሠ -> ሰ
  [0x12d0, 0x12a0], // ዐ -> አ
  [0x1340, 0x1338], // ፀ -> ጸ
];

function foldFidel(ch: string): string {
  const c = ch.codePointAt(0) ?? 0;
  for (const [from, to] of SAME_SOUND) {
    if (c >= from && c < from + 8) return String.fromCodePoint(to + (c - from));
  }
  return ch;
}

/** A word reduced to what matters for matching ("" for punctuation-only words). */
export function normalizeWord(word: string, lang: Lang): string {
  let w = word.normalize("NFC").toLowerCase();
  // Punctuation, symbols and Ethiopic punctuation (U+1360-U+1368).
  w = w.replace(/[\p{P}\p{S}፠-፨]/gu, "");
  if (lang === "am") return [...w].map(foldFidel).join("");
  return NUMBERS[w] ?? w;
}

/** The consonant of each fidel syllable (its row), so vowel slips still match. */
function skeleton(w: string): string {
  return [...w]
    .map((ch) => {
      const c = ch.codePointAt(0) ?? 0;
      return c >= 0x1200 && c <= 0x137f ? String.fromCodePoint(c - ((c - 0x1200) % 8)) : ch;
    })
    .join("");
}

function distance(a: string, b: string): number {
  const x = [...a];
  const y = [...b];
  if (Math.abs(x.length - y.length) > 2) return 3;
  let prev = Array.from({ length: y.length + 1 }, (_, j) => j);
  for (let i = 1; i <= x.length; i++) {
    const cur = [i];
    for (let j = 1; j <= y.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[y.length];
}

/** Whether a heard word is close enough to a page word (both already normalised). */
export function similar(page: string, heard: string, lang: Lang): boolean {
  if (!page || !heard) return false;
  if (page === heard) return true;
  const len = Math.max([...page].length, [...heard].length);
  const short = Math.min([...page].length, [...heard].length);
  // "count" / "counted", "jump" / "jumping"; Amharic prefixes and endings often split differently.
  if (short >= 3 && (page.startsWith(heard) || heard.startsWith(page)) && len - short <= 3) return true;
  if (lang === "am" && short >= 2 && skeleton(page) === skeleton(heard)) return true;
  const allowed = len >= 7 ? 2 : len >= 4 ? 1 : lang === "am" && len >= 3 ? 1 : 0;
  return allowed > 0 && distance(page, heard) <= allowed;
}

/** The page's words, normalised once. Punctuation-only "words" are empty and never need reading. */
export function pageTargets(words: string[], lang: Lang): string[] {
  return words.map((w) => normalizeWord(w, lang));
}

/** Words heard in a transcript, normalised. */
export function heardWords(transcript: string, lang: Lang): string[] {
  return transcript
    .split(/\s+/)
    .map((w) => normalizeWord(w, lang))
    .filter(Boolean);
}

/**
 * Lines up heard words with page words, from `from` onwards, in reading order. A heard word may
 * skip ahead a few page words (a missed or misheard word); a long, exact word may jump further
 * (the child skipped a line). Returns the page indexes that were read, and where it got to.
 */
export function align(targets: string[], heard: string[], lang: Lang, from = 0): { hits: number[]; next: number } {
  const hits: number[] = [];
  let p = from;
  for (let k = 0; k < heard.length; k++) {
    const h = heard[k];
    if (p >= targets.length) break;
    while (p < targets.length && !targets[p]) p++;
    let found = -1;
    // Two heard words that make one page word ("on to" for "onto").
    const joined = k + 1 < heard.length ? h + heard[k + 1] : "";
    if (joined && p < targets.length && targets[p] !== h && similar(targets[p], joined, lang) && !similar(targets[p], h, lang)) {
      hits.push(p);
      p += 1;
      k += 1;
      continue;
    }
    for (let j = p, seen = 0; j < targets.length && seen < 4; j++) {
      if (!targets[j]) continue;
      seen++;
      if (similar(targets[j], h, lang)) {
        found = j;
        break;
      }
    }
    if (found < 0 && [...h].length >= 4) {
      for (let j = p; j < targets.length; j++) {
        if (targets[j] === h) {
          found = j;
          break;
        }
      }
    }
    if (found >= 0) {
      hits.push(found);
      p = found + 1;
    }
  }
  return { hits, next: p };
}

/** How many of the page's words need reading (punctuation-only ones don't). */
export const countable = (targets: string[]) => targets.filter(Boolean).length;

/** The share of the page that counts as "read": about 70%, or 60% for ages 3 to 5. */
export const readThreshold = (ageBand: string | null | undefined) => (ageBand === "3-5" ? 0.6 : 0.7);
