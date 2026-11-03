export const LANGS = ["en", "am"] as const;
export type UiLang = (typeof LANGS)[number];
export const LANG_COOKIE = "lali-lang";
export const isLang = (v: unknown): v is UiLang => v === "en" || v === "am";
