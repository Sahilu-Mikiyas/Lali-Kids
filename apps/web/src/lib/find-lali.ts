import type { Story } from "@/content/stories";

/*
  Find Lali: where the tiny bee hides on a page.

  The reader can't see what's in a picture (drawn scenes and uploaded studio pictures alike),
  so she hides in places that work on any picture: peeking in from a side edge, from behind a
  little cloud at the top, or from behind a tuft of grass or a flower near the bottom and along
  the horizon. Her spot is picked from that set, seeded by the story id and page, so it's the
  same every time, and it never repeats on the next page. The top-left corner is left free
  for the "Found Lali" counter. A story can set exact spots later with `story.lali`.
*/

export type Peek = "left" | "right" | "top" | "bottom";
/** What she hides behind: the edge of the picture, or something drawn in front of her. */
export type Cover = "edge" | "cloud" | "tuft" | "flower";
export type HidingSpot = { x: number; y: number; peek: Peek; cover: Cover };

const SPOTS: HidingSpot[] = [
  { x: 0.07, y: 0.91, peek: "bottom", cover: "tuft" },
  { x: 1, y: 0.58, peek: "right", cover: "edge" },
  { x: 0.5, y: 0, peek: "top", cover: "cloud" },
  { x: 0.9, y: 0.91, peek: "bottom", cover: "flower" },
  { x: 0, y: 0.66, peek: "left", cover: "edge" },
  { x: 0.22, y: 0.64, peek: "bottom", cover: "tuft" },
  { x: 0.8, y: 0, peek: "top", cover: "cloud" },
  { x: 0.4, y: 0.92, peek: "bottom", cover: "flower" },
  { x: 1, y: 0.3, peek: "right", cover: "edge" },
  { x: 0.74, y: 0.66, peek: "bottom", cover: "tuft" },
  { x: 0, y: 0.42, peek: "left", cover: "edge" },
];

/** A small, stable string hash (FNV-1a). */
export function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function hidingSpot(story: Pick<Story, "id" | "lali">, page: number): HidingSpot {
  const own = story.lali?.[page];
  if (own) {
    const edge = own.x <= 0.02 || own.x >= 0.98 || own.y <= 0.02;
    return { x: own.x, y: own.y, peek: own.peek, cover: edge ? (own.peek === "top" ? "cloud" : "edge") : own.peek === "top" ? "cloud" : "tuft" };
  }
  // Steps of 5 through 11 spots: consecutive pages always land somewhere new.
  const spot = SPOTS[(hash(story.id) + page * 5) % SPOTS.length];
  // A little wobble along the edge, so the same spot looks different in each story.
  const j = ((hash(`${story.id}:${page}`) % 1000) / 1000 - 0.5) * 0.08;
  const along = spot.peek === "left" || spot.peek === "right" ? { y: Math.min(0.86, Math.max(0.24, spot.y + j)) } : { x: Math.min(0.94, Math.max(spot.peek === "top" ? 0.3 : 0.06, spot.x + j)) };
  return { ...spot, ...along };
}

/** How long a page is open, unfound, before Lali gives a tiny wiggle. */
export const HINT_MS = 25_000;
