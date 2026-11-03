import "server-only";

import { revalidatePath } from "next/cache";

import { LANGS } from "@/i18n/langs";

/** Refreshes a page in every language (pages live under /[lang]/…). */
export function revalidate(path: string) {
  for (const lang of LANGS) revalidatePath(`/${lang}${path === "/" ? "" : path}`);
}
