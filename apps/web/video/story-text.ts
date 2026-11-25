/*
  Prints a story's text and the extra lines the video says, as JSON, for the video scripts:
  npx tsx video/story-text.ts <storyId>
*/
import { getStory } from "../src/content/stories";
import { END_CARD, captionLines } from "./segments";

const id = process.argv[2];
const story = getStory(id);
if (!story) throw new Error(`no story ${id}`);
const out = Object.fromEntries(
  (["en", "am"] as const).map((lang) => [
    lang,
    {
      title: story.title[lang],
      intro: `${story.title[lang]}. ${END_CARD[lang].tagline}.`,
      pages: story.pages.map((p) => ({ text: p[lang], lines: captionLines(p[lang], lang === "am" ? 34 : 50) })),
      end: `${END_CARD[lang].title} ${END_CARD[lang].lines.join(" ")}`,
    },
  ]),
);
console.log(JSON.stringify(out, null, 1));
