"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";

import { dict } from "@/i18n/dict";
import { langFromCookie } from "@/i18n/server";
import { chapaConfigured, chapaSettingNames, createCheckout } from "@/lib/payments/chapa";
import { planById } from "@/lib/payments/plans";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin, currentProfile } from "@/lib/supabase/server";

export type CheckoutResult = { url: string } | { error: string } | null;

async function siteOrigin() {
  const h = await headers();
  return h.get("origin") ?? `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

/**
 * Creates a pending payment and returns Chapa's checkout page. The browser then
 * goes there itself, which is more reliable than a server redirect to another site.
 */
export async function startCheckout(_prev: CheckoutResult, form: FormData): Promise<CheckoutResult> {
  const [profile, lang] = await Promise.all([currentProfile(), langFromCookie()]);
  const e = dict[lang].errors;
  if (!profile) return { error: e.signInAgain };
  const plan = planById(String(form.get("plan")));
  if (!plan) return { error: e.choosePlan };
  if (!chapaConfigured()) {
    const seen = chapaSettingNames();
    console.error(`[payments] CHAPA_SECRET_KEY is not set on the server. Chapa-related settings seen: ${seen.length ? seen.join(", ") : "none"}`);
    return { error: e.noChapa };
  }
  if (!hasSecretKey()) {
    console.error("[payments] SUPABASE_SECRET_KEY is not set on the server");
    return { error: e.noRecord };
  }

  const txRef = `lali-${plan.id}-${randomBytes(9).toString("hex")}`;
  const admin = createSupabaseAdmin();
  const { error } = await admin.from("payments").insert({ family_id: profile.id, plan_id: plan.id, tx_ref: txRef, amount_etb: plan.priceEtb });
  if (error) {
    console.error("[payments] could not create payment", error.message);
    return { error: e.couldntStart };
  }

  const origin = await siteOrigin();
  const [first, ...rest] = (profile.display_name || "Lali parent").trim().split(/\s+/);
  try {
    const url = await createCheckout({
      txRef,
      amountEtb: plan.priceEtb,
      email: profile.email ?? "",
      firstName: first || "Lali",
      lastName: rest.join(" ") || "Parent",
      callbackUrl: `${origin}/api/payments/chapa`,
      returnUrl: `${origin}/subscribe/done?tx_ref=${txRef}`,
      title: `Lali ${plan.name}`,
      description: `Lali ${plan.name} plan for 30 days`,
    });
    return { url };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Chapa could not start the payment.";
    console.error("[payments]", message);
    await admin.from("payments").update({ status: "failed" }).eq("tx_ref", txRef);
    return { error: message };
  }
}
