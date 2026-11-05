"use server";

import { headers } from "next/headers";

import { dict } from "@/i18n/dict";
import { langFromCookie } from "@/i18n/server";
import { originFrom } from "@/lib/origin";
import { beginCheckout, type CheckoutResult as Result } from "@/lib/payments/checkout";
import { currentProfile } from "@/lib/supabase/server";

export type CheckoutResult = Result | null;

/**
 * Creates a pending payment and returns Chapa's checkout page. The browser then
 * goes there itself, which is more reliable than a server redirect to another site.
 */
export async function startCheckout(_prev: CheckoutResult, form: FormData): Promise<CheckoutResult> {
  const [profile, lang, h] = await Promise.all([currentProfile(), langFromCookie(), headers()]);
  if (!profile) return { error: dict[lang].errors.signInAgain };
  return beginCheckout(profile, String(form.get("plan")), originFrom(h), lang);
}
