/** The plans families can buy. Prices match the `plans` table in the database. */
export type PlanId = "reader" | "learner" | "vip";

export const PLANS: { id: PlanId; name: string; priceEtb: number; for: string; items: string[] }[] = [
  {
    id: "reader",
    name: "Starter",
    priceEtb: 400,
    for: "For a daily reading habit",
    items: ["The Story Garden library: every picture book, 4 new a month", "1 child profile", "Stickers, Find Lali and the read-aloud mic", "Printable activities for its stories"],
  },
  {
    id: "learner",
    name: "Family",
    priceEtb: 650,
    for: "For the whole family",
    items: ["Everything in Starter", "Up to 3 child profiles", "Games, family voices and narration", "A progress map and a weekly Telegram note", "Offline reading in the app"],
  },
  {
    id: "vip",
    name: "VIP",
    priceEtb: 2500,
    for: "For families who want everything",
    items: ["Everything in Family, up to 4 children", "Every learning package, one at a time per child", "A printed storybook each month", "Monthly live reading circle"],
  },
];

export function planById(id: string | null | undefined) {
  return PLANS.find((p) => p.id === id) ?? null;
}

export function formatBirr(n: number) {
  return n.toLocaleString("en-US");
}

const DAY = 86_400_000;

export type CurrentPlan = { planId: PlanId; endsAtMs: number; nextPlanId: PlanId | null; nextDays: number } | null;

export type SwitchPreview = {
  kind: "new" | "renew" | "upgrade" | "downgrade";
  /** When the chosen plan starts. */
  startsAtMs: number;
  /** When the chosen plan's days run out after this payment. */
  endsAtMs: number;
  /** For upgrades: how many days the leftover time is worth on the new plan. */
  convertedDays: number;
};

/**
 * What a payment for `target` would do, mirroring the database function `apply_plan_days`
 * (used by `activate_payment` and `redeem_gift`): same plan adds the days; an upgrade starts now
 * and converts the days left by value; a downgrade waits until the current plan ends.
 * A payment adds 30 days; a gift adds months x 30.
 */
export function previewSwitch(current: CurrentPlan, target: PlanId, nowMs: number, days = 30): SwitchPreview {
  const to = planById(target)!;
  if (!current || current.endsAtMs <= nowMs) {
    return { kind: "new", startsAtMs: nowMs, endsAtMs: nowMs + days * DAY, convertedDays: 0 };
  }
  const from = planById(current.planId)!;
  if (from.id === to.id) {
    return { kind: "renew", startsAtMs: nowMs, endsAtMs: current.endsAtMs + days * DAY, convertedDays: 0 };
  }
  if (to.priceEtb > from.priceEtb) {
    const converted = ((current.endsAtMs - nowMs) / DAY) * (from.priceEtb / to.priceEtb);
    return { kind: "upgrade", startsAtMs: nowMs, endsAtMs: nowMs + (converted + days) * DAY, convertedDays: converted };
  }
  const waiting = current.nextPlanId ? current.nextDays * (planById(current.nextPlanId)!.priceEtb / to.priceEtb) : 0;
  return { kind: "downgrade", startsAtMs: current.endsAtMs, endsAtMs: current.endsAtMs + (waiting + days) * DAY, convertedDays: 0 };
}

export function formatDay(ms: number) {
  return new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Addis_Ababa" });
}
