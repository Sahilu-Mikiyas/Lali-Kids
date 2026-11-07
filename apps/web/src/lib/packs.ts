import { PACKS, type Category, type Pack, type Story } from "@/content/stories";
import type { PlanId } from "@/lib/payments/plans";

/*
  Packages (docs/PACKAGES.md): which packs each plan opens, and whether a family may open a
  story. Every place that decides access (the shelf, the reader, narration, printable
  activities and the app's API) asks here. Plain TypeScript, safe in the browser too.

  - Reader opens the Story Garden (`story`).
  - Learner and VIP open every pack.
  - Free stories are open to everyone, whatever their pack.
*/

const PLAN_PACKS: Record<PlanId, Pack[]> = {
  reader: ["story"],
  learner: [...PACKS],
  vip: [...PACKS],
};

export const isPack = (v: unknown): v is Pack => typeof v === "string" && (PACKS as string[]).includes(v);

/** The packs a plan opens. No plan (or an unknown one) opens none; free stories stay open. */
export function packsForPlan(planId: string | null | undefined): Pack[] {
  return planId && planId in PLAN_PACKS ? PLAN_PACKS[planId as PlanId] : [];
}

/** A story's pack: the Story Garden when it doesn't say. */
export function packOf(story: Pick<Story, "pack">): Pack {
  return isPack(story.pack) ? story.pack : "story";
}

/** Whether a family on `planId` (null: no open plan) may open the story. */
export function canOpen(story: Pick<Story, "isFree" | "pack">, planId: string | null | undefined): boolean {
  return story.isFree || packsForPlan(planId).includes(packOf(story));
}

/** The cheapest plan that opens a pack, for "opens with …" and upgrade buttons. */
export function planForPack(pack: Pack): PlanId {
  return pack === "story" ? "reader" : "learner";
}

/** The pack a story studio story gets when the admin doesn't choose one: from its world. */
export function packFromCategory(category: Category | string | null | undefined): Pack {
  if (category === "Fidel") return "fidel";
  if (category === "Maths") return "numbers";
  if (category === "English") return "english";
  return "story";
}

/** How many stories each pack holds. */
export function packCounts(stories: Pick<Story, "pack">[]): Record<Pack, number> {
  const out = Object.fromEntries(PACKS.map((p) => [p, 0])) as Record<Pack, number>;
  for (const s of stories) out[packOf(s)] += 1;
  return out;
}
