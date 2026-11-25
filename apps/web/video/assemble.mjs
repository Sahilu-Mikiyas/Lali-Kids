/*
  Puts a story video together: the recorded segments dissolve into each other, and the sound
  is mixed under them (the narrator, the music bed ducking under the voice, the intro sting and
  a soft chime as each page opens), loudness-matched for YouTube (-14 LUFS).

    node video/assemble.mjs <timeline.json> <segments dir> <audio dir> <narration dir> <out.mp4>

  audio dir: music.wav, sting.wav, chime.wav (video/music.py). narration dir: the clips named in
  the timeline (intro.mp3, page-00.mp3 …); a clip that isn't there is left out, with a warning.
*/
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const [timelinePath, segDir, audioDir, narrDir, out] = process.argv.slice(2);
if (!out) {
  console.error("usage: node video/assemble.mjs <timeline.json> <segments dir> <audio dir> <narration dir> <out.mp4>");
  process.exit(1);
}
const tl = JSON.parse(readFileSync(timelinePath, "utf8"));
const { segments, xfade, total } = tl;

const args = ["-loglevel", "error", "-y"];
const filters = [];
let input = 0;

// --- picture: every segment, dissolving into the next ---
segments.forEach((_, i) => {
  args.push("-i", path.join(segDir, `seg-${String(i).padStart(2, "0")}.mp4`));
  input++;
});
let v = "[0:v]";
for (let i = 1; i < segments.length; i++) {
  const label = i === segments.length - 1 ? "[vout]" : `[v${i}]`;
  filters.push(`${v}[${i}:v]xfade=transition=fade:duration=${xfade}:offset=${segments[i].start.toFixed(3)}${label}`);
  v = label;
}

// --- sound ---
const ms = (s) => Math.max(0, Math.round(s * 1000));
args.push("-i", path.join(audioDir, "music.wav"));
const music = input++;
args.push("-i", path.join(audioDir, "sting.wav"));
const sting = input++;
args.push("-i", path.join(audioDir, "chime.wav"));
const chime = input++;

const clips = tl.voice.filter((c) => {
  const ok = existsSync(path.join(narrDir, `${c.name}.mp3`));
  if (!ok) console.warn(`no narration clip ${c.name}.mp3: left out`);
  return ok;
});
const voiced = clips.length > 0;
clips.forEach((c, k) => {
  args.push("-i", path.join(narrDir, `${c.name}.mp3`));
  filters.push(`[${input}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay=${ms(c.at)}:all=1[c${k}]`);
  input++;
});

const pages = segments.filter((s) => s.chime);
filters.push(`[${chime}:a]volume=0.5,asplit=${pages.length}${pages.map((_, k) => `[ch${k}]`).join("")}`);
pages.forEach((s, k) => filters.push(`[ch${k}]adelay=${ms(s.start + 0.15)}:all=1[chd${k}]`));
filters.push(`${pages.map((_, k) => `[chd${k}]`).join("")}amix=inputs=${pages.length}:normalize=0[chimes]`);
filters.push(`[${sting}:a]volume=0.7[st]`);

if (voiced) {
  filters.push(`${clips.map((_, k) => `[c${k}]`).join("")}amix=inputs=${clips.length}:normalize=0,apad,atrim=0:${total.toFixed(3)},asplit=2[voice][key]`);
  // The music sits well under the voice and dips further while someone is speaking.
  filters.push(`[${music}:a]volume=0.22,apad,atrim=0:${total.toFixed(3)}[bed]`);
  filters.push(`[bed][key]sidechaincompress=threshold=0.03:ratio=5:attack=30:release=500[ducked]`);
  filters.push(`[voice][ducked][chimes][st]amix=inputs=4:normalize=0[mix]`);
} else {
  filters.push(`[${music}:a]volume=0.55,apad,atrim=0:${total.toFixed(3)}[bed]`);
  filters.push(`[bed][chimes][st]amix=inputs=3:normalize=0[mix]`);
}
filters.push(`[mix]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[aout]`);

args.push(
  "-filter_complex", filters.join(";"),
  "-map", "[vout]", "-map", "[aout]",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", String(tl.fps),
  "-c:a", "aac", "-b:a", "192k",
  "-movflags", "+faststart",
  "-t", total.toFixed(3),
  out,
);
execFileSync("ffmpeg", args, { stdio: "inherit" });
console.log(`${out}: ${total.toFixed(1)} s, ${voiced ? `${clips.length} narration clips` : "no narration (read-along with music)"}`);
