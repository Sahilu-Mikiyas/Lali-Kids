import type { AgeBand } from "@/content/stories";

/**
 * "3-5", "6-7" -> "3–7". The same as agesLabel in src/content/stories.ts, kept here so that
 * browser code (shelf and game cards) can use it without pulling every story's text into the
 * page's JavaScript.
 */
export function agesLabel(bands: AgeBand[]): string {
  const nums = bands.flatMap((b) => b.split("-").map(Number));
  return `${Math.min(...nums)}–${Math.max(...nums)}`;
}
