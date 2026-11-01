/** The plans families can buy. Prices match the `plans` table in the database. */
export type PlanId = "reader" | "learner" | "vip";

export const PLANS: { id: PlanId; name: string; priceEtb: number; for: string; items: string[] }[] = [
  {
    id: "reader",
    name: "Reader",
    priceEtb: 400,
    for: "For building a daily reading habit",
    items: ["The whole Story Garden library", "New stories every week", "Read-to-me in English and Amharic", "Offline reading in the app"],
  },
  {
    id: "learner",
    name: "Learner",
    priceEtb: 1200,
    for: "For reading plus real skills",
    items: ["Everything in Reader", "Two worlds: English, Maths or Values", "Weekly progress note", "Up to 2 child profiles"],
  },
  {
    id: "vip",
    name: "VIP",
    priceEtb: 5000,
    for: "For families who want everything",
    items: ["Every world and every story", "A printed storybook each month", "Monthly live reading circle", "Up to 4 child profiles"],
  },
];

export function planById(id: string | null | undefined) {
  return PLANS.find((p) => p.id === id) ?? null;
}

export function formatBirr(n: number) {
  return n.toLocaleString("en-US");
}
