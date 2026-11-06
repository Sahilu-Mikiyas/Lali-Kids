import type { Story } from "@/content/stories";
import type { Ambience } from "@/lib/ambient";

/*
  Which soundscape plays under each page. The launch stories are mapped page by page;
  any other story (new drawn stories, studio stories) gets one from the words on the page,
  so a page about the river sounds like water and a bedtime page has crickets.
*/

const BY_SCENE: Record<string, Ambience[] | Ambience> = {
  // home, wish, the long way, Lali, river ×4, dark wood ×2, flower hill, home at dusk
  newyear: ["morning", "morning", "day", "day", "water", "water", "water", "water", "wood", "wood", "day", "home"],
  moon: "night",
  // out of the pen ×5, grazing, sunset, rock, river, teff, dark ×4
  count: ["morning", "morning", "morning", "morning", "morning", "day", "day", "day", "water", "day", "night", "night", "night", "night"],
  // the meadow ×3, the hive, tasting ×4, Anbessa ×4, sunset
  share: ["morning", "day", "day", "quiet", "day", "day", "day", "day", "day", "day", "day", "day", "night"],
  // the night rain, puddle ×2, six colours, the grey shower, the rainbow ×2
  rainbow: ["rain", "morning", "morning", "day", "day", "day", "day", "day", "day", "rain", "day", "day"],
};

const WORDS: [RegExp, Ambience][] = [
  [/\b(rain|raining|storm|thunder|puddle)/i, "rain"],
  [/\b(river|water|lake|sea|swim|splash|stream|waterfall|boat)/i, "water"],
  [/\b(forest|wood|jungle|trees whispered)/i, "wood"],
  [/\b(night|moon|stars?|sleep|bedtime|dark|dream)/i, "night"],
  [/\b(home|house|coffee|fire|kitchen|grandma)/i, "home"],
  [/\b(morning|sunrise|wake|woke|breakfast)/i, "morning"],
];

export function ambienceFor(story: Story, page: number): Ambience {
  if (page >= story.pages.length) return "night";
  const mapped = story.scene ? BY_SCENE[story.scene] : undefined;
  if (typeof mapped === "string") return mapped;
  if (mapped?.[page]) return mapped[page];
  const text = story.pages[page]?.en ?? "";
  for (const [re, mood] of WORDS) if (re.test(text)) return mood;
  return "day";
}
