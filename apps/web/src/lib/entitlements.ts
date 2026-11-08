import "server-only";

import { cache } from "react";

import type { PlanId } from "@/lib/payments/plans";
import { activePlanId } from "@/lib/payments/subscription";
import { schoolPlanFor } from "@/lib/schools/server";

/*
  What a family may use, decided in one place (docs/PACKAGES.md). Every server check asks here:
  the shelf and the reader (through src/lib/stories.ts), children (src/lib/family.ts), games,
  family voices, narration, the progress map, the weekly Telegram note, the learning packages,
  and the app's API (`GET me` sends the same object, so the app shows what the server allows).

  | What                         | No plan | Starter (reader) | Family (learner) | VIP (vip) |
  |------------------------------|---------|------------------|------------------|-----------|
  | Children who can read        | 1       | 1                | 3                | 4         |
  | Story Garden library         | tasters | yes              | yes              | yes       |
  | Games (paid ones)            |         |                  | yes              | yes       |
  | Recording family voices      |         |                  | yes              | yes       |
  | Narration of paid stories    |         |                  | yes              | yes       |
  | Progress map                 |         |                  | yes              | yes       |
  | Weekly Telegram note         |         |                  | yes              | yes       |
  | Offline reading in the app   |         |                  | yes              | yes       |
  | Every learning package       | buy     | buy              | buy              | included  |

  Free things stay free for everyone: the free picture books and course tasters (with their
  narration), free games, and playing back family voices already recorded. A school licence
  (docs/SCHOOLS.md) gives its teachers what Family gives. Admins get everything.
  Children beyond the limit are kept, read-only: they can't be chosen to read until the family
  is on a plan with room for them. Nothing is ever deleted because of a plan.
*/

export type Entitlements = {
  /** The open plan (or the school licence's equivalent), null without one. */
  planId: PlanId | null;
  source: "plan" | "school" | "admin" | null;
  /** How many children can read; the rest are read-only. */
  maxChildren: number;
  /** The Story Garden library (paid picture books). */
  library: boolean;
  games: boolean;
  familyVoices: boolean;
  narration: boolean;
  progressMap: boolean;
  telegramWeekly: boolean;
  offline: boolean;
  /** Every learning package (VIP), one at a time per child, at most one new level every 4 days. */
  allCourses: boolean;
};

type Gates = Omit<Entitlements, "planId" | "source">;

const NONE: Gates = { maxChildren: 1, library: false, games: false, familyVoices: false, narration: false, progressMap: false, telegramWeekly: false, offline: false, allCourses: false };

export const GATES: Record<PlanId | "none", Gates> = {
  none: NONE,
  reader: { ...NONE, maxChildren: 1, library: true },
  learner: { maxChildren: 3, library: true, games: true, familyVoices: true, narration: true, progressMap: true, telegramWeekly: true, offline: true, allCourses: false },
  vip: { maxChildren: 4, library: true, games: true, familyVoices: true, narration: true, progressMap: true, telegramWeekly: true, offline: true, allCourses: true },
};

/** The gates of a plan id (an unknown id or null is "no plan"). */
export function entitlementsFor(planId: string | null | undefined, source: Entitlements["source"] = planId ? "plan" : null): Entitlements {
  const id = planId && planId in GATES && planId !== "none" ? (planId as PlanId) : null;
  return { planId: id, source: id ? source : null, ...GATES[id ?? "none"] };
}

/** What a family may use right now: its open plan, else a teacher's school licence. */
export const familyEntitlements = cache(async (familyId: string | null | undefined, role?: string | null): Promise<Entitlements> => {
  if (role === "admin") return entitlementsFor("vip", "admin");
  if (!familyId) return entitlementsFor(null);
  const plan = await activePlanId(familyId).catch(() => null);
  if (plan) return entitlementsFor(plan, "plan");
  const school = await schoolPlanFor(familyId).catch(() => null);
  return school ? entitlementsFor(school, "school") : entitlementsFor(null);
});

/** The cheapest plan that has a feature, for "comes with …" messages and upgrade buttons. */
export function planWith(feature: keyof Gates): PlanId {
  if (GATES.reader[feature]) return "reader";
  if (GATES.learner[feature]) return "learner";
  return "vip";
}

/** The cheapest plan with room for this many children. */
export function planForChildren(n: number): PlanId {
  if (GATES.reader.maxChildren >= n) return "reader";
  if (GATES.learner.maxChildren >= n) return "learner";
  return "vip";
}
