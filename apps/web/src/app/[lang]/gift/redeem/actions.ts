"use server";

import { dict } from "@/i18n/dict";
import { langFromCookie } from "@/i18n/server";
import { redeemGift } from "@/lib/payments/gift-server";
import { currentProfile } from "@/lib/supabase/server";
import { peekState, type RedeemState } from "./state";

/**
 * One action for both steps: `intent=check` looks the code up, `intent=redeem` adds it to the
 * signed-in family's plan. The family always comes from the session, never from the form.
 */
export async function giftStep(_prev: RedeemState, form: FormData): Promise<RedeemState> {
  const [profile, lang] = await Promise.all([currentProfile(), langFromCookie()]);
  const code = String(form.get("code") ?? "").slice(0, 40);
  if (!profile) return { stage: "enter", code, error: dict[lang].gift.errors.signIn };
  if (form.get("intent") !== "redeem") return peekState(code, profile.id, lang, Date.now());

  const result = await redeemGift(code, profile.id);
  if (!result.ok) return { stage: "enter", code, error: dict[lang].gift.errors[result.error] };
  return { stage: "done", gift: result };
}
