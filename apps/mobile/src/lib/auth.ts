import { Platform } from 'react-native';

import { dict } from '@/i18n/dict';
import type { Lang } from './api';
import { AUTH_REDIRECT } from './config';
import { supabase } from './supabase';

export type SendResult = { ok: true } | { ok: false; error: string };

export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/** The same friendly messages as the website's sign-in page. */
function friendly(message: string, lang: Lang): string {
  const t = dict[lang].signin;
  if (/rate limit|too many|security purposes/i.test(message)) return t.errRate;
  if (/email.*invalid|invalid.*email|validate email/i.test(message)) return t.errEmail;
  if (/fetch|network|ECONN|ENOTFOUND|timed? ?out/i.test(message)) return t.errNetwork;
  return t.errOther;
}

/**
 * Where the email link goes. Phones: the website's callback, which hands the code to `lali://auth`.
 * The web build has no app to open, so the link comes straight back to its own /auth page
 * (that address must be allowed under Supabase's Redirect URLs).
 */
function redirectTo(): string {
  if (Platform.OS === 'web' && typeof window !== 'undefined') return `${window.location.origin}/auth`;
  return AUTH_REDIRECT;
}

/** Emails a sign-in link (PKCE: the matching secret stays on this phone). */
export async function sendSignInLink(email: string, lang: Lang): Promise<SendResult> {
  const clean = email.trim().toLowerCase();
  if (!isEmail(clean)) return { ok: false, error: dict[lang].signin.errEmail };
  try {
    const { error } = await supabase.auth.signInWithOtp({ email: clean, options: { emailRedirectTo: redirectTo(), shouldCreateUser: true } });
    return error ? { ok: false, error: friendly(error.message, lang) } : { ok: true };
  } catch (e) {
    return { ok: false, error: friendly(e instanceof Error ? e.message : '', lang) };
  }
}

/** Finishes signing in with the code from `lali://auth?code=…`. */
export async function finishSignIn(code: string, lang: Lang): Promise<SendResult> {
  const t = dict[lang].signin;
  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return { ok: true };
    // The secret that matches the code lives on the phone that asked for the email.
    if (/code verifier|code_verifier/i.test(error.message)) return { ok: false, error: t.errOtherPhone };
    if (/fetch|network/i.test(error.message)) return { ok: false, error: t.errNetwork };
    return { ok: false, error: t.errLink };
  } catch (e) {
    return { ok: false, error: /fetch|network/i.test(e instanceof Error ? e.message : '') ? t.errNetwork : t.errLink };
  }
}
