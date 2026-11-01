import "server-only";

import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { verifyPayment } from "./chapa";
import { planById } from "./plans";

export type FamilyPlan = {
  planId: string;
  planName: string;
  status: "trialing" | "active" | "past_due" | "cancelled";
  endsAt: string;
  isOpen: boolean;
  daysLeft: number;
};

/** The family's plan, or null if they have never had one. */
export async function familyPlan(familyId: string): Promise<FamilyPlan | null> {
  if (!hasSecretKey()) return null;
  const { data } = await createSupabaseAdmin()
    .from("subscriptions")
    .select("plan_id, status, current_period_end")
    .eq("family_id", familyId)
    .maybeSingle();
  if (!data) return null;
  const ends = new Date(data.current_period_end).getTime();
  const msLeft = ends - Date.now();
  return {
    planId: data.plan_id,
    planName: planById(data.plan_id)?.name ?? data.plan_id,
    status: data.status,
    endsAt: data.current_period_end,
    isOpen: (data.status === "trialing" || data.status === "active") && msLeft > 0,
    daysLeft: Math.max(0, Math.ceil(msLeft / 86_400_000)),
  };
}

/** A family can start the free week once, before ever paying. */
export async function canStartTrial(familyId: string): Promise<boolean> {
  if (!hasSecretKey()) return false;
  const admin = createSupabaseAdmin();
  const [{ count: subs }, { count: paid }] = await Promise.all([
    admin.from("subscriptions").select("id", { count: "exact", head: true }).eq("family_id", familyId),
    admin.from("payments").select("id", { count: "exact", head: true }).eq("family_id", familyId).eq("status", "paid"),
  ]);
  return (subs ?? 0) === 0 && (paid ?? 0) === 0;
}

export type Confirmation = "paid" | "already" | "pending" | "unknown";

/**
 * Confirms a Chapa payment and, if it really succeeded, adds 30 days of access.
 * Called from the return page and from Chapa's callback; whichever comes first wins,
 * the database makes sure it only counts once.
 */
export async function confirmPayment(txRef: string): Promise<Confirmation> {
  const admin = createSupabaseAdmin();
  const { data: payment } = await admin.from("payments").select("status").eq("tx_ref", txRef).maybeSingle();
  if (!payment) return "unknown";
  if (payment.status === "paid") return "already";

  const result = await verifyPayment(txRef);
  if (!result.paid) return "pending";

  const { data: activated, error } = await admin.rpc("activate_payment", {
    p_tx_ref: txRef,
    p_provider_ref: result.reference ?? "",
    p_amount: result.amountEtb,
  });
  if (error) throw new Error(`Could not record the payment: ${error.message}`);
  return activated ? "paid" : "already";
}
