import "server-only";

import { cookies } from "next/headers";
import { lang } from "next/root-params";

import { dict, type Dict } from "./dict";
import { isLang, LANG_COOKIE, type UiLang } from "./langs";

/** The website language in server components (from the /[lang] segment). */
export async function getLang(): Promise<UiLang> {
  const l = await lang();
  return isLang(l) ? l : "en";
}

export async function getT(): Promise<Dict> {
  return dict[await getLang()];
}

/** In server actions and route handlers, which can't read the segment: the saved choice. */
export async function langFromCookie(): Promise<UiLang> {
  const v = (await cookies()).get(LANG_COOKIE)?.value;
  return isLang(v) ? v : "en";
}
