import type { UiLang } from "./langs";

const LOCALE: Record<UiLang, string> = { en: "en-GB", am: "am-ET" };

/** A date in the website language, in Addis Ababa time. */
export function fmtDate(lang: UiLang, value: string | number | Date, style: "long" | "short" = "long") {
  return new Date(value).toLocaleDateString(LOCALE[lang], {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa",
  });
}
