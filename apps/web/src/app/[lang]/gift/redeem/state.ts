import "server-only";

import { dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";
import { peekGift, type GiftPeek, type GiftRedeemed } from "@/lib/payments/gift-server";

export type RedeemState =
  | { stage: "enter"; code: string; error?: string }
  | { stage: "preview"; gift: Extract<GiftPeek, { ok: true }> }
  | { stage: "done"; gift: Extract<GiftRedeemed, { ok: true }> };

/** Turns a lookup into what the form shows next. Used by the action and by the page for a code in the link. */
export async function peekState(code: string, familyId: string, lang: UiLang, nowMs: number): Promise<RedeemState> {
  const peek = await peekGift(code, familyId, nowMs);
  if (peek.ok) return { stage: "preview", gift: peek };
  return { stage: "enter", code, error: dict[lang].gift.errors[peek.error] };
}
