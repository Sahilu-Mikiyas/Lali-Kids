"use server";

import { headers } from "next/headers";

import { dict } from "@/i18n/dict";
import { langFromCookie } from "@/i18n/server";
import { originFrom } from "@/lib/origin";
import { allow, clientIp } from "@/lib/rate-limit";
import { beginGiftCheckout, type GiftCheckoutResult } from "@/lib/payments/gift-server";

export type GiftFormState = GiftCheckoutResult | null;

/**
 * Creates a pending gift and returns Chapa's checkout page. Anyone can give: no sign-in.
 * The browser then goes to Chapa itself, as on the plans page.
 */
export async function startGiftCheckout(_prev: GiftFormState, form: FormData): Promise<GiftFormState> {
  const [lang, h] = await Promise.all([langFromCookie(), headers()]);
  // No sign-in here, so each address may start 10 gift payments in 10 minutes (and everyone
  // together 200): enough for any giver, too few to flood the gifts table or Chapa.
  const ip = clientIp(h) ?? "unknown";
  if (!allow(`gift:${ip}`, 10, 10 * 60_000) || !allow("gift:all", 200, 10 * 60_000)) return { error: dict[lang].ops.tooMany };
  const s = (k: string) => String(form.get(k) ?? "").slice(0, 2000);
  return beginGiftCheckout(
    { plan: s("plan"), months: Number(s("months")), giverName: s("giverName"), giverEmail: s("giverEmail"), recipient: s("recipient"), message: s("message") },
    originFrom(h),
    lang,
  );
}
