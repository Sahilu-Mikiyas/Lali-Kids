"use server";

import { cookies } from "next/headers";

import { createSupabaseServer, currentProfile } from "@/lib/supabase/server";
import { isLang, LANG_COOKIE } from "./langs";

/** Saves the website language (cookie, and the profile so Lali's Telegram messages match). */
export async function setLanguage(lang: string) {
  if (!isLang(lang)) return;
  (await cookies()).set(LANG_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  const profile = await currentProfile();
  if (profile) {
    const supabase = await createSupabaseServer();
    await supabase.from("profiles").update({ ui_lang: lang }).eq("id", profile.id);
  }
}
