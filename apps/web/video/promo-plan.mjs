/*
  Plans the vertical promo for parents (1080×1920, about 30 seconds): five beats recorded from
  the stage (?seg=promo-<beat>, src/components/video/promo.tsx) and the narrator's lines.

    node video/promo-plan.mjs <lang> <narration dir> <out timeline.json>

  The narration dir holds line-0.mp3 … line-5.mp3, one per line below (all six made in one
  vidIQ job; see README.md). A language without them (Amharic: no computer voice reads
  Amharic) gets the same beats with music and chimes only. The beats' animations are timed
  for these lines, so keep the lines' meaning and rough length if they change.

    0 "Busy days? You can't teach them everything. Let stories help."   hook
    1 "Every Lali story is made with care."                            pages
    2 "Kindness. Courage. Good manners. Saying sorry. Trying again."   values
    3 "Over 280 stories, in English and Amharic, for ages 3 to 9."     proof
    4 "No ads. Nothing made to keep them scrolling. Just good stories." end
    5 "Start reading with Lali!"                                       end
*/
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const [lang, narrDir, outPath] = process.argv.slice(2);
if (!outPath) {
  console.error("usage: node video/promo-plan.mjs <lang> <narration dir> <out timeline.json>");
  process.exit(1);
}

const FPS = 30;
const XFADE = 0.5;
// seconds; voice: [line, seconds into the beat]; chimes: seconds into the beat.
const BEATS = [
  { seg: "promo-hook", seconds: 5.1, voice: [[0, 0.3]], chimes: [] },
  { seg: "promo-pages", seconds: 6.6, voice: [[1, 0.3]], chimes: [0.05, 1.75, 3.95] },
  { seg: "promo-values", seconds: 6.3, voice: [[2, 0.3]], chimes: [0.2, 1.3, 2.3, 3.6, 4.8] },
  { seg: "promo-proof", seconds: 6.2, voice: [[3, 0.3]], chimes: [0.2] },
  { seg: "promo-end", seconds: 7.6, voice: [[4, 0.3], [5, 5.3]], chimes: [4.9] },
];

const segments = [];
const voice = [];
let t = 0;
for (const b of BEATS) {
  const frames = Math.round(b.seconds * FPS);
  segments.push({ seg: b.seg, frames, start: t, chimes: b.chimes });
  for (const [line, at] of b.voice) {
    const name = `line-${line}`;
    if (existsSync(path.join(narrDir, `${name}.mp3`))) voice.push({ name, at: t + at });
  }
  t += frames / FPS - XFADE;
}
const total = t + XFADE;
writeFileSync(
  outPath,
  JSON.stringify({ story: "new-year-flowers", lang, fps: FPS, width: 1080, height: 1920, xfade: XFADE, total, segments, voice, narrated: voice.length > 0 }, null, 1),
);
console.log(`promo ${lang}: ${segments.length} beats, ${total.toFixed(1)} s, ${voice.length} voice clips`);
