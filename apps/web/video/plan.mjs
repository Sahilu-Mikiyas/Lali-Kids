/*
  Plans a story video: how long each segment lasts, when each word lights up and how the
  camera moves.

    node video/plan.mjs <story id> <text.json> <lang> <narration dir> <out timeline.json>

  text.json comes from `npx tsx video/story-text.ts <story>`. The narration dir holds the
  narrator's clips (intro.mp3, page-00.mp3 … page-NN.mp3, end.mp3), or at least a
  durations.json ({ "intro": 3.2, "page-00": 9.7, … } in seconds) when the clips aren't here yet.
  Without either, each page gets a reading time from its length (a read-along video with music).

  Words light up across the clip in proportion to their length, with a pause after commas and
  sentence ends. A narrator's word times (the admin timing tool) can replace this later.
*/
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const [story, textPath, lang, narrDir, outPath] = process.argv.slice(2);
const text = JSON.parse(readFileSync(textPath, "utf8"))[lang];

export const FPS = 30;
export const LEAD = 0.9; // the picture settles before the voice starts
export const TAIL = 1.4; // and stays a moment after it ends
export const XFADE = 0.5; // pages dissolve into each other
const INTRO = 6.5;
const INTRO_VOICE_AT = 2.2;
const END = 14;
const END_VOICE_AT = 0.9;

const durations = existsSync(path.join(narrDir, "durations.json")) ? JSON.parse(readFileSync(path.join(narrDir, "durations.json"), "utf8")) : {};
/** A clip's length in seconds: from the file when it's here, else durations.json, else null. */
function clip(name) {
  const file = path.join(narrDir, `${name}.mp3`);
  if (existsSync(file)) return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString());
  return durations[name] ?? null;
}

/** Seconds from the start of the clip at which each word starts. */
function wordTimes(words, seconds) {
  // Each word takes time for its letters, and a pause comes after commas and sentence ends.
  const pauses = words.map((w, i) => (i === 0 ? 0 : /[.!?።…]["»”]?$/.test(words[i - 1]) ? 9 : /[,;:፣፤፦]["»”]?$/.test(words[i - 1]) ? 4 : 0));
  const lengths = words.map((w) => w.length + 2);
  const total = pauses.reduce((a, b) => a + b, 0) + lengths.reduce((a, b) => a + b, 0);
  let acc = 0;
  return words.map((_, i) => {
    acc += pauses[i];
    const start = (acc / total) * seconds;
    acc += lengths[i];
    return start;
  });
}

const cams = [
  { from: { zoom: 1.02, x: -14, y: 6 }, to: { zoom: 1.08, x: 14, y: -6 } },
  { from: { zoom: 1.08, x: 12, y: -4 }, to: { zoom: 1.02, x: -10, y: 4 } },
  { from: { zoom: 1.03, x: 0, y: 10 }, to: { zoom: 1.09, x: 0, y: -12 } },
];

const segments = [];
const voice = [];
let t = 0;
const push = (seg, seconds, extra = {}) => {
  const frames = Math.round(seconds * FPS);
  segments.push({ seg, frames, start: t, ...extra });
  t += frames / FPS - XFADE;
};

const introClip = clip("intro");
if (introClip) voice.push({ name: "intro", at: t + INTRO_VOICE_AT });
push("intro", Math.max(INTRO, INTRO_VOICE_AT + (introClip ?? 0) + 1), { camera: { from: { zoom: 1.12, x: 0, y: 20 }, to: { zoom: 1.0, x: 0, y: 0 } } });

text.pages.forEach((p, i) => {
  const name = `page-${String(i).padStart(2, "0")}`;
  const words = p.text.split(" ");
  const spoken = clip(name);
  // No narration: a calm reading time from the length of the page.
  const seconds = spoken ?? Math.max(6, p.text.length * (lang === "am" ? 0.12 : 0.068));
  if (spoken) voice.push({ name, at: t + LEAD });
  const times = wordTimes(words, seconds);
  push(String(i), LEAD + seconds + TAIL, {
    wordFrames: times.map((s) => Math.round((LEAD + s) * FPS)),
    camera: cams[i % cams.length],
    chime: true,
  });
});

const endClip = clip("end");
if (endClip) voice.push({ name: "end", at: t + END_VOICE_AT });
push("end", END, { camera: { from: { zoom: 1.0, x: 0, y: 0 }, to: { zoom: 1.06, x: -20, y: 0 } } });

const total = t + XFADE;
writeFileSync(outPath, JSON.stringify({ story, lang, fps: FPS, xfade: XFADE, total, segments, voice, narrated: voice.length > 0 }, null, 1));
console.log(`${lang}: ${segments.length} segments, ${total.toFixed(1)} s, ${voice.length} voice clips`);
