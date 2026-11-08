/*
  The fidel this course teaches, built from their Unicode code points so every form is exactly
  right: each family's seven forms (the seven "orders") follow its first letter one after another.
  The 33 basic families are listed in their traditional order (ሀ ለ ሐ መ ሠ ረ ሰ ሸ ቀ በ ተ ቸ ኀ ነ ኘ አ
  ከ ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ ጠ ጨ ጰ ጸ ፀ ፈ ፐ); levels 1–3 teach the first 16.
*/

/** First letter of each of the 33 basic families, in order, with its code point. */
const BASES: [string, number][] = [
  ["ሀ", 0x1200], ["ለ", 0x1208], ["ሐ", 0x1210], ["መ", 0x1218], ["ሠ", 0x1220], ["ረ", 0x1228], ["ሰ", 0x1230], ["ሸ", 0x1238],
  ["ቀ", 0x1240], ["በ", 0x1260], ["ተ", 0x1270], ["ቸ", 0x1278], ["ኀ", 0x1280], ["ነ", 0x1290], ["ኘ", 0x1298], ["አ", 0x12a0],
  ["ከ", 0x12a8], ["ኸ", 0x12b8], ["ወ", 0x12c8], ["ዐ", 0x12d0], ["ዘ", 0x12d8], ["ዠ", 0x12e0], ["የ", 0x12e8], ["ደ", 0x12f0],
  ["ጀ", 0x1300], ["ገ", 0x1308], ["ጠ", 0x1320], ["ጨ", 0x1328], ["ጰ", 0x1330], ["ጸ", 0x1338], ["ፀ", 0x1340], ["ፈ", 0x1348], ["ፐ", 0x1350],
];

/** The 33 families' first letters, in order. */
export const FAMILY_ORDER: string[] = BASES.map(([g]) => g);

/** The seven forms of a family, from its first letter: fam("ሀ") is ["ሀ","ሁ","ሂ","ሃ","ሄ","ህ","ሆ"]. */
export function fam(first: string): string[] {
  const cp = first.codePointAt(0) ?? 0;
  return Array.from({ length: 7 }, (_, i) => String.fromCodePoint(cp + i));
}

/** Which family a letter belongs to (its first letter), and which form it is (0–6). */
export function formOf(g: string): { first: string; order: number } | null {
  const cp = g.codePointAt(0) ?? 0;
  for (const [first, base] of BASES) if (cp >= base && cp < base + 7) return { first, order: cp - base };
  return null;
}

/**
 * Sounds-alike groups, with the names Ethiopian children learn to tell them apart
 * (ሀሌታው ሀ, ሐመሩ ሐ, ብዙኀኑ ኀ; ንጉሡ ሠ, እሳቱ ሰ; አልፋው አ, ዓይኑ ዐ; ጸሎቱ ጸ, ፀሐዩ ፀ).
 */
export const SOUND_ALIKES: string[][] = [["ሀ", "ሐ", "ኀ"], ["ሠ", "ሰ"], ["አ", "ዐ"], ["ጸ", "ፀ"]];

/**
 * One colour per form (order), used everywhere in the course: Grandma's seven hats in
 * "Grandma's Seven Hats", the seven-forms demo and the quiz pictures.
 * Red (as it is), green, yellow, blue, pink, grey (the quiet one), orange (round as an O).
 */
export const ORDER_COLORS = ["#E8513B", "#2E9A5B", "#E3A511", "#2F6FD6", "#D63B72", "#7C7C90", "#F07F1E"];

/** How each form sounds, as English letters (the first form as in fidel-train: ለ "la", ላ "laa"). */
export const ORDER_VOWELS = ["a", "u", "i", "aa", "ay", "", "o"];

/** A form's sound written in English letters, e.g. say("l", 1) is "lu", say("l", 5) is "l". */
export function say(consonant: string, order: number): string {
  return consonant + ORDER_VOWELS[order];
}
