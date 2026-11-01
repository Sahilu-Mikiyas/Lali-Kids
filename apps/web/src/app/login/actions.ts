"use server";

import { headers } from "next/headers";

import { createSupabaseServer } from "@/lib/supabase/server";

export type AuthResult = { ok: true } | { ok: false; error: string };

function friendly(message: string): string {
  if (/rate limit|too many/i.test(message)) return "Too many sign-in emails were sent. Please wait a few minutes and try again.";
  if (/invalid|expired/i.test(message)) return "That code didn't work. Check it and try again, or request a new email.";
  if (/fetch|network|ECONN|ENOTFOUND/i.test(message)) return "We couldn't reach the sign-in service. Please try again in a moment.";
  return message;
}

/**
 * Sends the sign-in email from the server, so it works even when a browser
 * extension or network filter blocks the browser from reaching Supabase.
 */
export async function sendSignInEmail(email: string, nextPath: string): Promise<AuthResult> {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return { ok: false, error: "Enter a valid email address." };
  const h = await headers();
  const origin = h.get("origin") ?? `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  const next = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/account";
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: { shouldCreateUser: true, emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    return error ? { ok: false, error: friendly(error.message) } : { ok: true };
  } catch (e) {
    return { ok: false, error: friendly(e instanceof Error ? e.message : "Something went wrong.") };
  }
}

/** Signs in with a 6-digit code, for when a custom email template sends one. */
export async function verifySignInCode(email: string, code: string): Promise<AuthResult> {
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type: "email" });
    return error ? { ok: false, error: friendly(error.message) } : { ok: true };
  } catch (e) {
    return { ok: false, error: friendly(e instanceof Error ? e.message : "Something went wrong.") };
  }
}
