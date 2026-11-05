import "server-only";

import { randomBytes } from "node:crypto";

import { dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { chapaConfigured, chapaSettingNames, createCheckout } from "./chapa";
import { planById } from "./plans";

export type CheckoutResult = { url: string } | { error: string };

type Payer = { id: string; display_name: string | null; email?: string | null };

/**
 * Creates a pending payment and returns Chapa's checkout page. Used by the website's plans page
 * and by the mobile app. `fromApp` adds a "back to the app" button on the thank-you page.
 */
export async function beginCheckout(payer: Payer, planId: string, origin: string, lang: UiLang, fromApp = false): Promise<CheckoutResult> {
  const e = dict[lang].errors;
  const plan = planById(planId);
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
  const { error } = await admin.from("payments").insert({ family_id: payer.id, plan_id: plan.id, tx_ref: txRef, amount_etb: plan.priceEtb });
  if (error) {
    console.error("[payments] could not create payment", error.message);
    return { error: e.couldntStart };
  }

  const [first, ...rest] = (payer.display_name || "Lali parent").trim().split(/\s+/);
  try {
    const url = await createCheckout({
      txRef,
      amountEtb: plan.priceEtb,
      email: payer.email ?? "",
      firstName: first || "Lali",
      lastName: rest.join(" ") || "Parent",
      callbackUrl: `${origin}/api/payments/chapa`,
      returnUrl: `${origin}/subscribe/done?tx_ref=${txRef}${fromApp ? "&app=1" : ""}`,
      title: `Lali ${plan.name}`,
      description: `Lali ${plan.name} plan for 30 days`,
    });
    return { url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Chapa could not start the payment.";
    console.error("[payments]", message);
    await admin.from("payments").update({ status: "failed" }).eq("tx_ref", txRef);
    return { error: message };
  }
}
