import "server-only";

import { cache } from "react";

import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { verifyPayment } from "./chapa";
import { planById, type CurrentPlan, type PlanId } from "./plans";

export type FamilyPlan = {
  planId: string;
  planName: string;
  status: "trialing" | "active" | "past_due" | "cancelled";
  endsAt: string;
  isOpen: boolean;
  daysLeft: number;
  /** A cheaper plan the family paid for, which starts when this one ends. */
  next: { planId: string; planName: string; days: number; endsAt: string } | null;
};

/** The family's plan, or null if they have never had one. */
export async function familyPlan(familyId: string): Promise<FamilyPlan | null> {
  if (!hasSecretKey()) return null;
  const admin = createSupabaseAdmin();
  // Starts a waiting (downgraded) plan if the current one has ended.
  await admin.rpc("settle_subscription", { p_family: familyId });
  const { data } = await admin
    .from("subscriptions")
    .select("plan_id, status, current_period_end, next_plan_id, next_days")
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
    next: data.next_plan_id
      ? {
          planId: data.next_plan_id,
          planName: planById(data.next_plan_id)?.name ?? data.next_plan_id,
          days: Math.round(Number(data.next_days)),
          endsAt: new Date(ends + Number(data.next_days) * 86_400_000).toISOString(),
        }
      : null,
  };
}

/**
 * The plan that is open for a family right now, or null: the same rule as the database's
 * has_active_subscription. When the current plan has run out and a waiting (downgraded) plan
 * is still within its days, that plan counts. Read only (no settling), once per request.
 */
export const activePlanId = cache(async (familyId: string): Promise<PlanId | null> => {
  if (!hasSecretKey()) return null;
  const { data } = await createSupabaseAdmin()
    .from("subscriptions")
    .select("plan_id, status, current_period_end, next_plan_id, next_days")
    .eq("family_id", familyId)
    .maybeSingle();
  if (!data || (data.status !== "trialing" && data.status !== "active")) return null;
  const now = Date.now();
  const ends = new Date(data.current_period_end).getTime();
  const known = (id: unknown) => planById(typeof id === "string" ? id : null)?.id ?? null;
  if (ends > now) return known(data.plan_id);
  if (data.next_plan_id && ends + Number(data.next_days ?? 0) * 86_400_000 > now) return known(data.next_plan_id);
  return null;
});

/** The plan in the shape the plan picker needs to preview a switch. */
export function asCurrentPlan(p: FamilyPlan | null): CurrentPlan {
  if (!p?.isOpen) return null;
  return {
    planId: p.planId as PlanId,
    endsAtMs: new Date(p.endsAt).getTime(),
    nextPlanId: (p.next?.planId as PlanId | undefined) ?? null,
    nextDays: p.next ? Number(p.next.days) : 0,
  };
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
