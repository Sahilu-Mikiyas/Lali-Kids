"use server";

import { headers } from "next/headers";

import { langFromCookie } from "@/i18n/server";
import { originFrom } from "@/lib/origin";
import { beginGiftCheckout, type GiftCheckoutResult } from "@/lib/payments/gift-server";

export type GiftFormState = GiftCheckoutResult | null;

/**
 * Creates a pending gift and returns Chapa's checkout page. Anyone can give: no sign-in.
 * The browser then goes to Chapa itself, as on the plans page.
 */
export async function startGiftCheckout(_prev: GiftFormState, form: FormData): Promise<GiftFormState> {
  const [lang, h] = await Promise.all([langFromCookie(), headers()]);
  const s = (k: string) => String(form.get(k) ?? "");
  return beginGiftCheckout(
    { plan: s("plan"), months: Number(s("months")), giverName: s("giverName"), giverEmail: s("giverEmail"), recipient: s("recipient"), message: s("message") },
    originFrom(h),
    lang,
  );
}
