/**
 * Gift plans: prices, codes and links. Safe in the browser (the gift page shows live prices);
 * everything that touches the database or Chapa is in gift-server.ts.
 */
import { planById, type PlanId } from "./plans";

/**
 * About how many US dollars one birr is worth, only to show givers abroad a rough amount.
 * Gifts are always charged in birr (ETB); the giver's card bank does the real conversion.
 * FOUNDER: update this now and then (for example from the National Bank of Ethiopia's rate).
 * 0.0065 means about 154 birr to the dollar.
 */
export const USD_PER_ETB = 0.0065;

export const GIFT_MONTHS = [1, 3, 6, 12] as const;
export type GiftMonths = (typeof GIFT_MONTHS)[number];

/** Longer gifts cost a little less per month. */
export const GIFT_DISCOUNT: Record<GiftMonths, number> = { 1: 0, 3: 0, 6: 0.1, 12: 0.15 };

export const MESSAGE_MAX = 300;
export const DAYS_PER_MONTH = 30;

export const isGiftMonths = (n: unknown): n is GiftMonths => GIFT_MONTHS.includes(Number(n) as GiftMonths);

export function giftPrice(planId: PlanId, months: GiftMonths) {
  const plan = planById(planId)!;
  const full = plan.priceEtb * months;
  const total = Math.round(full * (1 - GIFT_DISCOUNT[months]));
  return { full, total, saved: full - total, discountPct: Math.round(GIFT_DISCOUNT[months] * 100) };
}

/** A rough dollar amount, rounded to whole dollars. */
export function approxUsd(etb: number): number {
  return Math.max(1, Math.round(etb * USD_PER_ETB));
}

/** No 0/O, 1/I/L: every character is easy to read aloud and type. Matches the database check. */
export const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const BODY = new RegExp(`^[${CODE_ALPHABET}]{8}$`);

/**
 * Turns whatever a parent typed or pasted ("lali xk7m-p2qa", "XK7MP2QA") into LALI-XXXX-XXXX,
 * or null if it can't be a code.
 */
export function normalizeGiftCode(input: string | null | undefined): string | null {
  let s = String(input ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  // The body never contains L or I, so a leading LALI is always the prefix.
  if (s.startsWith("LALI")) s = s.slice(4);
  if (!BODY.test(s)) return null;
  return `LALI-${s.slice(0, 4)}-${s.slice(4)}`;
}

export function redeemLink(origin: string, code: string) {
  return `${origin}/gift/redeem?code=${encodeURIComponent(code)}`;
}
