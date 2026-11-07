import type { Lang, Story } from "@/content/stories";

/*
  Printable activities, worked out from a story's own words: a word search in each language,
  recall questions, the fidel families, numbers and English words it meets. Plain functions,
  seeded from the story id so a story's sheets come out the same every time.
*/

// ---------------------------------------------------------------- seeded randomness

/** A 32-bit hash of a string (FNV-1a). */
export function hashSeed(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A small, fast seeded random number generator (mulberry32): numbers in [0, 1). */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(list: T[], rnd: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ---------------------------------------------------------------- words

const EN_STOP = new Set(
  (
    "the a an and or but so to of in on at by for with from up down out over under into onto off is are was were be been am " +
    "he she it they we you i me my his her its their our your them him us this that these those there here then than " +
    "what who where when why how which all any some one two three four five six seven eight nine ten no not yes " +
    "said says say says asked like just very too also only again more most much many little big can could will would " +
    "do did does done have has had get got go goes went come came see saw look looked let lets let's oh ah mmm hop " +
    "every each other another back away now day today tomorrow night time first last next way along around through " +
    "s t ll re ve d m isn don didn can't won't it's i'm that's he's she's there's"
  ).split(" "),
);

const AM_STOP = new Set(
  (
    "እና ግን ነው ናት ነኝ ነህ ነሽ ናቸው ላይ ውስጥ ወደ ከዚያ ከዚያም ብሎ አለ አለች አሉ ነበር ነበረች ነበሩ ይህ ያ እነሆ " +
    "ሁሉ ሁሉም ብቻ እንደ በጣም ደግሞ አንድ ሁለት ሦስት አራት አምስት ስድስት ሰባት ስምንት ዘጠኝ አሥር ምን ማን የት " +
    "እንደገና አሁን ከዚህ እዚያ እዚህ ጋር ሲል ስትል እሱ እሷ እኔ አንተ አንቺ እኛ እናንተ እነሱ ዛሬ ነገ ይላል ይላሉ ትላለች አለው አላት የት ነሽ ነህ"
  ).split(" "),
);

/** Ethiopic letters (the syllables are single characters, so a word's length counts fidel). */
const ETHIOPIC = /^[\u1200-\u135A]+$/;

/**
 * 8–10 words from the story for a word search: the words it uses most, with the words it
 * teaches first. English words come in capitals; Amharic words in fidel, 2–5 letters long.
 */
export function storyWords(story: Story, lang: Lang, max = lang === "en" ? 9 : 8): string[] {
  const counts = new Map<string, number>();
  const taught = new Set((story.teaches?.words ?? []).map((w) => w.toLowerCase()));
  for (const page of story.pages) {
    const text = page[lang] ?? "";
    const tokens = lang === "en" ? text.toLowerCase().split(/[^a-z']+/) : text.split(/[\s፣።፤፦፥፧!?«»"'.,…—\-()]+/);
    for (const raw of tokens) {
      const w = lang === "en" ? raw.replace(/'s$/, "").replace(/'/g, "") : raw;
      if (!w || (lang === "en" ? EN_STOP.has(w) : AM_STOP.has(w))) continue;
      const len = [...w].length;
      if (lang === "en" ? !/^[a-z]+$/.test(w) || len < 3 || len > 9 : !ETHIOPIC.test(w) || len < 2 || len > 5) continue;
      counts.set(w, (counts.get(w) ?? 0) + 1);
    }
  }
  const score = (w: string) => (counts.get(w) ?? 0) + (taught.has(w) ? 100 : 0);
  return [...counts.keys()]
    .sort((a, b) => score(b) - score(a) || a.localeCompare(b))
    .slice(0, max)
    .map((w) => (lang === "en" ? w.toUpperCase() : w));
}

// ---------------------------------------------------------------- word search

export type WordSearch = {
  size: number;
  grid: string[][];
  /** The words that fit, each with the cells it covers. */
  words: { word: string; cells: [number, number][] }[];
};

/** Across, down and corner to corner (down-right, up-right): no backwards words for little readers. */
const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

/** A word search grid with the words hidden in it, filled with letters from the same alphabet. */
export function makeWordSearch(words: string[], size: number, seed: number, filler: string[]): WordSearch {
  const rnd = seeded(seed);
  const grid: (string | null)[][] = Array.from({ length: size }, () => Array<string | null>(size).fill(null));
  const placed: WordSearch["words"] = [];
  // Longest first: they are the hardest to fit.
  for (const word of [...words].sort((a, b) => [...b].length - [...a].length)) {
    const letters = [...word];
    if (letters.length > size) continue;
    for (let attempt = 0; attempt < 400; attempt++) {
      // Diagonals only for the later, shorter words, so most words stay easy to spot.
      const [dr, dc] = DIRS[Math.floor(rnd() * (placed.length < 3 ? 2 : DIRS.length))];
      const r0 = Math.floor(rnd() * size);
      const c0 = Math.floor(rnd() * size);
      const cells: [number, number][] = letters.map((_, i) => [r0 + dr * i, c0 + dc * i]);
      const fits = cells.every(([r, c], i) => r >= 0 && r < size && c >= 0 && c < size && (grid[r][c] === null || grid[r][c] === letters[i]));
      if (!fits) continue;
      cells.forEach(([r, c], i) => (grid[r][c] = letters[i]));
      placed.push({ word, cells });
      break;
    }
  }
  const pool = filler.length ? filler : ["A"];
  return {
    size,
    grid: grid.map((row) => row.map((cell) => cell ?? pool[Math.floor(rnd() * pool.length)])),
    words: words.filter((w) => placed.some((p) => p.word === w)).map((w) => placed.find((p) => p.word === w)!),
  };
}

const AZ = "ABCDEFGHIJKLMNOPRSTUWY".split("");

/** Both word searches for a story (English 12×12, Amharic 9×9 in fidel). */
export function wordSearches(story: Story): Record<Lang, WordSearch> {
  const en = storyWords(story, "en");
  const am = storyWords(story, "am");
  // Fill the Amharic grid with fidel from the story itself, so it looks like the words do.
  const fidel = [...new Set([...story.pages.map((p) => p.am).join("")].filter((ch) => ETHIOPIC.test(ch)))];
  return {
    en: makeWordSearch(en, 12, hashSeed(`${story.id}:en`), AZ),
    am: makeWordSearch(am, 9, hashSeed(`${story.id}:am`), fidel),
  };
}

// ---------------------------------------------------------------- recall questions

/** The friends who appear across the Lali stories, with their Amharic names. */
const CHARACTERS: { en: string; am: string }[] = [
  { en: "Anbessa", am: "አንበሳ" },
  { en: "Gugu", am: "ጉጉ" },
  { en: "Lali", am: "ላሊ" },
  { en: "Grandma", am: "አያቴ" },
  { en: "Grandpa", am: "አያቴ" },
  { en: "Tsehay", am: "ፀሐይ" },
  { en: "Kaldi", am: "ካልዲ" },
  { en: "Owl", am: "ጉጉት" },
  { en: "Hyena", am: "ጅብ" },
  { en: "Tortoise", am: "ኤሊ" },
  { en: "Monkey", am: "ዝንጀሮ" },
];

/** Places a story can happen, matched in the English text, with Amharic. */
const PLACES: { match: RegExp; en: string; am: string }[] = [
  { match: /\bmountains?\b/gi, en: "in the mountains", am: "በተራሮቹ ላይ" },
  { match: /\brivers?\b/gi, en: "by the river", am: "በወንዙ ዳር" },
  { match: /\bmarket\b/gi, en: "at the market", am: "በገበያው" },
  { match: /\bschool|classroom\b/gi, en: "at school", am: "በትምህርት ቤት" },
  { match: /\bhills?\b/gi, en: "on the hill", am: "በኮረብታው ላይ" },
  { match: /\b(wood|forest)\b/gi, en: "in the wood", am: "በጫካው ውስጥ" },
  { match: /\bmeadow\b/gi, en: "in the meadow", am: "በመስኩ" },
  { match: /\b(field|teff)\b/gi, en: "in the fields", am: "በማሳው" },
  { match: /\bkitchen\b/gi, en: "in the kitchen", am: "በማድ ቤቱ" },
  { match: /\bLalibela\b/g, en: "in Lalibela", am: "በላሊበላ" },
  { match: /\b(station|train)\b/gi, en: "on the train", am: "በባቡሩ ላይ" },
  { match: /\bpuddles?\b/gi, en: "at the puddle", am: "በኩሬው" },
  { match: /\b(sky|stars)\b/gi, en: "under the night sky", am: "በምሽቱ ሰማይ ሥር" },
];

export type Recall = { key: "who" | "where" | "start" | "end"; hint: Partial<Record<Lang, string>> };

/** The first sentence of a page's text. */
function firstSentence(text: string): string {
  const m = /^.*?[.!?።](?=\s|$|["»”])["»”]?/.exec(text.trim());
  return (m ? m[0] : text).trim();
}

/** Three simple recall questions with answers for the grown-up: who, where (or the start), and the end. */
export function recallQuestions(story: Story): Recall[] {
  const text = story.pages.map((p) => p.en).join(" ");
  const out: Recall[] = [];

  const named = CHARACTERS.map((c) => ({ ...c, n: (text.match(new RegExp(`\\b${c.en}\\b`, "g")) ?? []).length }))
    .filter((c) => c.n > 0)
    .sort((a, b) => b.n - a.n);
  if (named.length) {
    const two = named.slice(0, named[1] && named[1].n >= named[0].n / 2 ? 2 : 1);
    out.push({ key: "who", hint: { en: two.map((c) => c.en).join(" and "), am: two.map((c) => c.am).join(" እና ") } });
  }

  const place = PLACES.map((p) => ({ ...p, n: (text.match(p.match) ?? []).length }))
    .filter((p) => p.n > 0)
    .sort((a, b) => b.n - a.n)[0];
  if (place) out.push({ key: "where", hint: { en: place.en, am: place.am } });

  const first = story.pages[0];
  const last = story.pages[story.pages.length - 1];
  if (first && out.length < 2) out.push({ key: "start", hint: { en: firstSentence(first.en), am: firstSentence(first.am) } });
  if (last) out.push({ key: "end", hint: { en: firstSentence(last.en), am: firstSentence(last.am) } });
  if (out.length < 3 && first && !out.some((q) => q.key === "start")) out.splice(out.length - 1, 0, { key: "start", hint: { en: firstSentence(first.en), am: firstSentence(first.am) } });
  return out.slice(0, 3);
}

// ---------------------------------------------------------------- fidel

/** The seven forms of a fidel family, from its first letter (ሀ → ሀ ሁ ሂ ሃ ሄ ህ ሆ). */
export function fidelFamily(letter: string): string[] {
  const cp = letter.codePointAt(0) ?? 0x1200;
  if (cp < 0x1200 || cp > 0x135a) return [letter];
  const base = cp - ((cp - 0x1200) % 8);
  return Array.from({ length: 7 }, (_, i) => String.fromCodePoint(base + i));
}

/** The first letter of the family a fidel letter belongs to. */
export function familyBase(letter: string): string {
  return fidelFamily(letter)[0];
}

/** The families on the classic fidel chart, in order (ሀ to ፐ, with ቨ). */
export const FIDEL_CHART: string[] = "ሀለሐመሠረሰሸቀበቨተቸኀነኘአከኸወዐዘዠየደጀገጠጨጰጸፀፈፐ".split("");

/**
 * The fidel families a story meets: what it says it teaches, or the letters in its title, or
 * (for the tracing sheet, `fallback`) the first family.
 */
export function storyFidel(story: Story, fallback = true): string[] {
  if (story.teaches?.fidel?.length) return [...new Set(story.teaches.fidel.map(familyBase))];
  const inTitle = [...story.title.en].filter((ch) => ETHIOPIC.test(ch));
  if (inTitle.length) return [...new Set(inTitle.map(familyBase))];
  return fallback ? ["ሀ"] : [];
}

// ---------------------------------------------------------------- numbers

const GEEZ = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲"];

/** A number from 1 to 10 in Ge'ez numerals. */
export function geez(n: number): string {
  return GEEZ[n] ?? String(n);
}

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** The numbers (1–10) a story meets: what it says it teaches, or the number words in its text. */
export function storyNumbers(story: Story): number[] {
  if (story.teaches?.numbers?.length) return [...new Set(story.teaches.numbers.filter((n) => n >= 1 && n <= 10))].sort((a, b) => a - b);
  const text = story.pages.map((p) => p.en.toLowerCase()).join(" ");
  const found = NUMBER_WORDS.map((w, n) => (n > 0 && new RegExp(`\\b${w}\\b`).test(text) ? n : 0)).filter(Boolean);
  return found.length >= 3 ? found : [1, 2, 3, 4, 5];
}

/** Counting rows for the numbers sheet: a few of the story's numbers, each with three choices. */
export function countingRows(story: Story, rows = 4): { n: number; choices: number[] }[] {
  const rnd = seeded(hashSeed(`${story.id}:count`));
  const nums = storyNumbers(story).filter((n) => n <= 8);
  const picked = shuffle(nums.length ? nums : [1, 2, 3, 4, 5], rnd).slice(0, rows);
  return picked.map((n) => {
    const others = shuffle(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((m) => m !== n && Math.abs(m - n) <= 3),
      rnd,
    ).slice(0, 2);
    return { n, choices: shuffle([n, ...others], rnd) };
  });
}

// ---------------------------------------------------------------- English

/** The English words a story teaches, or its most used words. */
export function storyEnglish(story: Story, max = 6): string[] {
  const taught = story.teaches?.words ?? [];
  const words = taught.length ? taught : storyWords(story, "en", max).map((w) => w.toLowerCase());
  return [...new Set(words.map((w) => w.toLowerCase()))].slice(0, max);
}

/** Simple English plural to singular, for finding a word's picture. */
export function singular(w: string): string {
  const s = w.toLowerCase();
  if (s.endsWith("oes")) return s.slice(0, -2);
  if (s.endsWith("ies")) return `${s.slice(0, -3)}y`;
  if (s.endsWith("s") && !s.endsWith("ss")) return s.slice(0, -1);
  return s;
}
