/*
  Schools and classroom licences (docs/SCHOOLS.md): the rules and shapes both the server and the
  browser use. Plain TypeScript, no story data, safe in client code.
*/

/** The nine pictures a picture password is made from (three, in order). */
export const ANIMALS = ["lion", "monkey", "owl", "goat", "fish", "bird", "tortoise", "butterfly", "cow"] as const;
export type Animal = (typeof ANIMALS)[number];
export const PICTURE_LENGTH = 3;
/** Wrong picture passwords in a row before the teacher has to unlock the pupil. */
export const MAX_TRIES = 5;

/** Pupils pick a character and a colour, so 24 children in a class can tell theirs apart. */
export const PUPIL_CHARACTERS = ["cub", "gugu", "bee"] as const;
export const PUPIL_COLORS = ["coral", "teal", "blue", "gold", "berry", "green", "purple", "orange"] as const;
export type PupilCharacter = (typeof PUPIL_CHARACTERS)[number];
export type PupilColor = (typeof PUPIL_COLORS)[number];
export const COLOR_HEX: Record<PupilColor, string> = {
  coral: "#FF6B5B",
  teal: "#14A3A3",
  blue: "#3B6FE0",
  gold: "#F5B321",
  berry: "#D6336C",
  green: "#3FA34D",
  purple: "#8A5BD6",
  orange: "#F2832B",
};

export type PupilAvatar = `${PupilCharacter}-${PupilColor}`;
export const PUPIL_AVATARS: PupilAvatar[] = PUPIL_CHARACTERS.flatMap((c) => PUPIL_COLORS.map((k) => `${c}-${k}` as PupilAvatar));
export const isPupilAvatar = (v: unknown): v is PupilAvatar => typeof v === "string" && (PUPIL_AVATARS as string[]).includes(v);
export function splitAvatar(a: string): { character: PupilCharacter; color: PupilColor } {
  const [c, k] = a.split("-");
  return {
    character: (PUPIL_CHARACTERS as readonly string[]).includes(c) ? (c as PupilCharacter) : "cub",
    color: (PUPIL_COLORS as readonly string[]).includes(k) ? (k as PupilColor) : "coral",
  };
}

export const AGE_GROUPS = ["3-5", "6-7", "8-9"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];
export const isAgeGroup = (v: unknown): v is AgeGroup => typeof v === "string" && (AGE_GROUPS as readonly string[]).includes(v);

/** A class code such as LALI-KG2-7Q4: easy to read aloud and type (no 0/O, 1/I/L). */
export const CODE_LETTERS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CODE_PATTERN = /^LALI-[A-Z0-9]{2,4}-[A-Z0-9]{3}$/;

/** The code as typed or read from an address, tidied (upper case, no spaces), or null. */
export function cleanCode(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const c = v.trim().toUpperCase().replace(/\s+/g, "");
  return CODE_PATTERN.test(c) ? c : null;
}

/** The middle part of a class's code, from its name: "KG 2 Blue" -> "KG2". */
export function codePrefix(className: string): string {
  const letters = className
    .normalize("NFKD")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  return letters.length >= 2 ? letters.slice(0, 3) : "CLS";
}

/** A pupil's picture password: three animal indexes, each 0–8. */
export function isPicture(v: unknown): v is number[] {
  return Array.isArray(v) && v.length === PICTURE_LENGTH && v.every((n) => Number.isInteger(n) && n >= 0 && n < ANIMALS.length);
}

/** First names only: 1–30 letters, spaces, hyphens or apostrophes (any script). */
export function cleanFirstName(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const n = v.replace(/[\s\u0000-\u001f]+/g, " ").trim().slice(0, 30).trim();
  return n && /^[\p{L}\p{M}' -]+$/u.test(n) ? n : null;
}

/** What the class tablet shows of a pupil before they sign in: a first name and an avatar. */
export type PupilCard = { id: string; firstName: string; avatar: PupilAvatar; locked: boolean };
