"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { chapaConfigured, createCheckout } from "@/lib/payments/chapa";
import { planById } from "@/lib/payments/plans";
import { canStartTrial } from "@/lib/payments/subscription";
import { createSupabaseAdmin, currentProfile } from "@/lib/supabase/server";

export type StartResult = { error: string } | null;

async function siteOrigin() {
  const h = await headers();
  return h.get("origin") ?? `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

/** Starts the free week for this family, once. */
export async function startTrial(_prev: StartResult, form: FormData): Promise<StartResult> {
  const profile = await currentProfile();
  if (!profile) redirect("/login?next=/subscribe");
  const plan = planById(String(form.get("plan")));
  if (!plan) return { error: "Choose a plan first." };
  if (!(await canStartTrial(profile.id))) return { error: "Your family has already used its free week." };
  const { data, error } = await createSupabaseAdmin().rpc("start_trial", { p_family: profile.id, p_plan: plan.id });
  if (error || !data) return { error: "We couldn't start the free week. Please try again." };
  redirect("/account?welcome=trial");
}

/** Creates a pending payment and sends the parent to Chapa's checkout page. */
export async function startCheckout(_prev: StartResult, form: FormData): Promise<StartResult> {
  const profile = await currentProfile();
  if (!profile) redirect("/login?next=/subscribe");
  const plan = planById(String(form.get("plan")));
  if (!plan) return { error: "Choose a plan first." };
  if (!chapaConfigured()) return { error: "Online payment is being set up. Please try again soon." };

  const txRef = `lali-${plan.id}-${randomBytes(9).toString("hex")}`;
  const admin = createSupabaseAdmin();
  const { error } = await admin
    .from("payments")
    .insert({ family_id: profile.id, plan_id: plan.id, tx_ref: txRef, amount_etb: plan.priceEtb });
  if (error) return { error: "We couldn't start the payment. Please try again." };

  const origin = await siteOrigin();
  const [first, ...rest] = (profile.display_name || "Lali parent").trim().split(/\s+/);
  let checkoutUrl: string;
  try {
    checkoutUrl = await createCheckout({
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
  } catch (e) {
    await admin.from("payments").update({ status: "failed" }).eq("tx_ref", txRef);
    return { error: e instanceof Error ? e.message : "Chapa could not start the payment." };
  }
  redirect(checkoutUrl as never);
}
