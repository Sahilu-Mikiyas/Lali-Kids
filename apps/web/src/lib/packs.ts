import type { Category, Pack, Story } from "@/content/stories";

// Kept here (not imported from the stories module) so browser code that uses these helpers
// never pulls the stories' text into a script.
export const PACKS: Pack[] = ["story", "fidel", "numbers", "english"];
import type { PlanId } from "@/lib/payments/plans";

/*
  Packs (docs/PACKAGES.md, v2): which part of the library a story is in. Every place that decides
  access (the shelf, the reader, narration, printable activities and the app's API) asks here or
  in src/lib/stories.ts. Plain TypeScript, safe in the browser too.

  - Any plan (Starter, Family, VIP) opens the whole Story Garden library: the `story` pack and,
    until English First Words launches, the English stories (and studio stories in any pack).
  - Stories that belong to a learning package (`course` set) open only through that package, or
    as its free taster: src/lib/stories.ts and src/lib/courses decide those.
  - Free stories are open to everyone.
*/

const PLAN_PACKS: Record<PlanId, Pack[]> = {
  reader: [...PACKS],
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

/**
 * Whether a family on `planId` (null: no open plan) may open the story from the library. A
 * learning package's story never opens here (only through its package, or as its taster).
 */
export function canOpen(story: Pick<Story, "isFree" | "pack" | "course">, planId: string | null | undefined): boolean {
  if (story.course) return false;
  return story.isFree || packsForPlan(planId).includes(packOf(story));
}

/** The cheapest plan that opens a pack, for "opens with …" and upgrade buttons: Starter opens the library. */
export function planForPack(pack: Pack): PlanId {
  void pack;
  return "reader";
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
