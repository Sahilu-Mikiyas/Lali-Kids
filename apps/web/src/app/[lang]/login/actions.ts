"use server";

import { headers } from "next/headers";

import { dict } from "@/i18n/dict";
import { langFromCookie } from "@/i18n/server";
import { originFrom } from "@/lib/origin";
import { safeNext } from "@/lib/safe-next";
import { createSupabaseServer } from "@/lib/supabase/server";

export type AuthResult = { ok: true } | { ok: false; error: string };

async function friendly(message: string): Promise<string> {
  const t = dict[await langFromCookie()].login;
  if (/rate limit|too many/i.test(message)) return t.errRate;
  if (/invalid|expired/i.test(message)) return t.errCode;
  if (/fetch|network|ECONN|ENOTFOUND/i.test(message)) return t.errNetwork;
  return t.errOther;
}

/**
 * Sends the sign-in email from the server, so it works even when a browser
 * extension or network filter blocks the browser from reaching Supabase.
 */
export async function sendSignInEmail(email: string, nextPath: string): Promise<AuthResult> {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return { ok: false, error: dict[await langFromCookie()].login.errEmail };
  const h = await headers();
  // SITE_URL when set, never the browser's Origin header (the link in the email must point here).
  const origin = originFrom(h);
  const next = safeNext(nextPath, "/account");
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: { shouldCreateUser: true, emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    return error ? { ok: false, error: await friendly(error.message) } : { ok: true };
  } catch (e) {
    return { ok: false, error: await friendly(e instanceof Error ? e.message : "") };
  }
}

/** Signs in with a 6-digit code, for when a custom email template sends one. */
export async function verifySignInCode(email: string, code: string): Promise<AuthResult> {
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type: "email" });
    return error ? { ok: false, error: await friendly(error.message) } : { ok: true };
  } catch (e) {
    return { ok: false, error: await friendly(e instanceof Error ? e.message : "") };
  }
}
