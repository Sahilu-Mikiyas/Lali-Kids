"use client";

import { bookAudio, isPageSoundMuted, onPageSoundMutedChange } from "./page-sound";

/*
  A quiet soundscape under each picture, synthesised with Web Audio (no audio files):
  birds in the morning, a breeze by day, crickets at night, a babbling river, rain, and a
  crackling fire at home. It follows the page's mood, cross-fades when the mood changes,
  dips under the narration, and shares the book's sound toggle.

  Everything is built from two noise buffers and a few oscillators. Chirps and drops are
  scheduled a little ahead on the audio clock, so a busy main thread never makes them stutter.
*/

export type Ambience = "morning" | "day" | "night" | "wood" | "water" | "rain" | "home" | "quiet";

/** Overall loudness: well under the narration and the page-turn sound. */
const LEVEL = 0.55;
const DUCKED = 0.35;
const FADE = 1.6;

type Layer = { stop: (at: number) => void };
type Scape = { gain: GainNode; layers: Layer[]; timers: ReturnType<typeof setInterval>[] };

let master: GainNode | null = null;
let current: { mood: Ambience; scape: Scape } | null = null;
let wanted: Ambience | null = null;
let ducked = false;
let hidden = false;
let brown: AudioBuffer | null = null;
let white: AudioBuffer | null = null;
let unsubMute: (() => void) | null = null;

function noiseBuffers(ac: AudioContext) {
  if (brown && white) return;
  const len = ac.sampleRate * 4;
  brown = ac.createBuffer(1, len, ac.sampleRate);
  white = ac.createBuffer(1, len, ac.sampleRate);
  const b = brown.getChannelData(0);
  const w = white.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const r = Math.random() * 2 - 1;
    w[i] = r * 0.5;
    last = (last + 0.02 * r) / 1.02;
    b[i] = last * 3.5;
  }
  // Smooth the loop point so the bed never clicks.
  for (let i = 0; i < 2000; i++) {
    const k = i / 2000;
    b[len - 2000 + i] = b[len - 2000 + i] * (1 - k) + b[i] * k;
    w[len - 2000 + i] = w[len - 2000 + i] * (1 - k) + w[i] * k;
  }
}

function masterGain(ac: AudioContext): GainNode {
  if (!master) {
    master = ac.createGain();
    master.gain.value = 0;
    master.connect(ac.destination);
  }
  return master;
}

function targetLevel() {
  return isPageSoundMuted() || hidden ? 0 : ducked ? LEVEL * DUCKED : LEVEL;
}

function applyLevel(seconds = 0.6) {
  const ac = bookAudio();
  if (!ac || !master) return;
  const now = ac.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(targetLevel(), now + seconds);
}

/* ---------- building blocks ---------- */

/** A looping noise bed through a filter, with a slow swell. */
function bed(ac: AudioContext, out: AudioNode, opts: { buffer: AudioBuffer; type: BiquadFilterType; freq: number; q?: number; gain: number; swell?: number; swellHz?: number; wobble?: number }): Layer {
  const src = ac.createBufferSource();
  src.buffer = opts.buffer;
  src.loop = true;
  src.loopStart = Math.random() * 2;
  const f = ac.createBiquadFilter();
  f.type = opts.type;
  f.frequency.value = opts.freq;
  f.Q.value = opts.q ?? 0.7;
  const g = ac.createGain();
  g.gain.value = opts.gain;
  src.connect(f).connect(g).connect(out);
  const lfos: OscillatorNode[] = [];
  if (opts.swell) {
    const lfo = ac.createOscillator();
    lfo.frequency.value = opts.swellHz ?? 0.08;
    const depth = ac.createGain();
    depth.gain.value = opts.gain * opts.swell;
    lfo.connect(depth).connect(g.gain);
    lfo.start();
    lfos.push(lfo);
  }
  if (opts.wobble) {
    // Moves the filter about: water babbles, wind gusts.
    const lfo = ac.createOscillator();
    lfo.type = "triangle";
    lfo.frequency.value = 0.35 + Math.random() * 0.3;
    const depth = ac.createGain();
    depth.gain.value = opts.wobble;
    lfo.connect(depth).connect(f.frequency);
    lfo.start();
    lfos.push(lfo);
  }
  src.start(ac.currentTime, src.loopStart);
  return {
    stop: (at) => {
      src.stop(at);
      lfos.forEach((l) => l.stop(at));
    },
  };
}

/** Calls `fire(atTime)` again and again at random gaps, scheduled ahead on the audio clock. */
function every(ac: AudioContext, scape: Scape, minGap: number, maxGap: number, fire: (t: number) => void, firstAfter = 0.4) {
  let next = ac.currentTime + firstAfter + Math.random() * minGap;
  const tick = () => {
    if (ac.state !== "running") {
      next = Math.max(next, ac.currentTime + 0.3);
      return;
    }
    while (next < ac.currentTime + 1.2) {
      if (next > ac.currentTime) fire(next);
      next += minGap + Math.random() * (maxGap - minGap);
    }
  };
  tick();
  scape.timers.push(setInterval(tick, 400));
}

function tone(ac: AudioContext, out: AudioNode, t: number, o: { type?: OscillatorType; f0: number; f1: number; dur: number; vol: number; attack?: number; f2?: number }) {
  const osc = ac.createOscillator();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.f0, t);
  if (o.f2) {
    osc.frequency.exponentialRampToValueAtTime(o.f1, t + o.dur * 0.5);
    osc.frequency.exponentialRampToValueAtTime(o.f2, t + o.dur);
  } else {
    osc.frequency.exponentialRampToValueAtTime(o.f1, t + o.dur);
  }
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(o.vol, t + (o.attack ?? 0.012));
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + o.dur + 0.02);
}

/** A short burst of filtered noise: a raindrop, a crackle, a splash. */
function tick(ac: AudioContext, out: AudioNode, t: number, o: { freq: number; q?: number; dur: number; vol: number; type?: BiquadFilterType }) {
  if (!white) return;
  const src = ac.createBufferSource();
  src.buffer = white;
  const f = ac.createBiquadFilter();
  f.type = o.type ?? "bandpass";
  f.frequency.value = o.freq;
  f.Q.value = o.q ?? 4;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(o.vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  src.connect(f).connect(g).connect(out);
  src.start(t, Math.random() * 3);
  src.stop(t + o.dur + 0.02);
}

/** Slightly to one side or the other, so the scene feels wide. */
function panned(ac: AudioContext, out: AudioNode, pan: number): AudioNode {
  if (!ac.createStereoPanner) return out;
  const p = ac.createStereoPanner();
  p.pan.value = pan;
  p.connect(out);
  return p;
}

/* ---------- the voices of a scene ---------- */

function birds(ac: AudioContext, out: AudioNode, scape: Scape, busy: number) {
  // A few different birds, each with its own little song and place in the stereo field.
  const songs = [
    (t: number, o: AudioNode) => {
      for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) tone(ac, o, t + i * 0.13, { f0: 3600, f1: 2500, dur: 0.09, vol: 0.05 });
    },
    (t: number, o: AudioNode) => {
      tone(ac, o, t, { f0: 2200, f1: 3400, dur: 0.16, vol: 0.045 });
      tone(ac, o, t + 0.22, { f0: 3000, f1: 1900, dur: 0.22, vol: 0.04 });
    },
    (t: number, o: AudioNode) => {
      for (let i = 0; i < 5; i++) tone(ac, o, t + i * 0.07, { f0: 4800, f1: 4200, dur: 0.05, vol: 0.03 });
    },
    (t: number, o: AudioNode) => tone(ac, o, t, { f0: 1700, f1: 2600, f2: 1500, dur: 0.38, vol: 0.035, attack: 0.05 }),
  ];
  songs.forEach((song, i) => {
    const o = panned(ac, out, (i % 2 ? 1 : -1) * (0.3 + Math.random() * 0.5));
    every(ac, scape, 2.4 / busy, 7 / busy, (t) => song(t, o), 0.3 + i * 0.9);
  });
}

function crickets(ac: AudioContext, out: AudioNode, scape: Scape, n = 2) {
  for (let k = 0; k < n; k++) {
    const o = panned(ac, out, k % 2 ? 0.55 : -0.5);
    const pitch = 4200 + k * 650 + Math.random() * 200;
    every(
      ac,
      scape,
      0.7,
      1.5,
      (t) => {
        for (let i = 0; i < 3; i++) tone(ac, o, t + i * 0.045, { f0: pitch, f1: pitch * 0.98, dur: 0.03, vol: 0.022, attack: 0.004 });
      },
      0.2 + k * 0.33,
    );
  }
}

function owl(ac: AudioContext, out: AudioNode, scape: Scape) {
  const o = panned(ac, out, -0.6);
  every(
    ac,
    scape,
    9,
    16,
    (t) => {
      tone(ac, o, t, { f0: 420, f1: 380, dur: 0.4, vol: 0.05, attack: 0.08 });
      tone(ac, o, t + 0.55, { f0: 400, f1: 360, dur: 0.6, vol: 0.045, attack: 0.1 });
    },
    3,
  );
}

function bubbles(ac: AudioContext, out: AudioNode, scape: Scape) {
  const o = panned(ac, out, 0.2);
  every(ac, scape, 0.25, 1.1, (t) => tone(ac, o, t, { f0: 300 + Math.random() * 500, f1: 900 + Math.random() * 700, dur: 0.07, vol: 0.02 }));
}

function build(ac: AudioContext, mood: Ambience, out: GainNode, scape: Scape) {
  const add = (l: Layer) => scape.layers.push(l);
  if (!brown || !white) return;
  switch (mood) {
    case "morning":
      add(bed(ac, out, { buffer: brown, type: "lowpass", freq: 500, gain: 0.18, swell: 0.4, swellHz: 0.06 }));
      birds(ac, out, scape, 1.4);
      break;
    case "day":
      add(bed(ac, out, { buffer: brown, type: "lowpass", freq: 650, gain: 0.24, swell: 0.6, swellHz: 0.05, wobble: 180 }));
      birds(ac, out, scape, 0.7);
      break;
    case "night":
      add(bed(ac, out, { buffer: brown, type: "lowpass", freq: 380, gain: 0.14, swell: 0.3 }));
      crickets(ac, out, scape, 3);
      break;
    case "wood":
      add(bed(ac, out, { buffer: brown, type: "lowpass", freq: 420, gain: 0.22, swell: 0.7, swellHz: 0.07, wobble: 120 }));
      crickets(ac, out, scape, 2);
      owl(ac, out, scape);
      break;
    case "water":
      add(bed(ac, out, { buffer: brown, type: "bandpass", freq: 700, q: 0.8, gain: 0.5, wobble: 260 }));
      add(bed(ac, out, { buffer: white, type: "highpass", freq: 3500, gain: 0.03, swell: 0.5, swellHz: 0.2 }));
      bubbles(ac, out, scape);
      birds(ac, out, scape, 0.4);
      break;
    case "rain":
      add(bed(ac, out, { buffer: white, type: "bandpass", freq: 1800, q: 0.5, gain: 0.16, swell: 0.25, swellHz: 0.1 }));
      add(bed(ac, out, { buffer: brown, type: "lowpass", freq: 300, gain: 0.2 }));
      {
        const l = panned(ac, out, -0.4);
        const r = panned(ac, out, 0.4);
        every(ac, scape, 0.03, 0.16, (t) => tick(ac, Math.random() < 0.5 ? l : r, t, { freq: 2500 + Math.random() * 3000, dur: 0.03, vol: 0.05 }));
      }
      break;
    case "home":
      // A warm room: a low hum of the fire and its crackles, with a cricket outside.
      add(bed(ac, out, { buffer: brown, type: "lowpass", freq: 240, gain: 0.3, swell: 0.3, swellHz: 0.3 }));
      every(ac, scape, 0.08, 0.7, (t) => tick(ac, out, t, { freq: 1200 + Math.random() * 2500, q: 2, dur: 0.02 + Math.random() * 0.03, vol: 0.06 + Math.random() * 0.06 }));
      crickets(ac, out, scape, 1);
      break;
    case "quiet":
      break;
  }
}

function startScape(ac: AudioContext, mood: Ambience): Scape {
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(1, ac.currentTime + FADE);
  gain.connect(masterGain(ac));
  const scape: Scape = { gain, layers: [], timers: [] };
  build(ac, mood, gain, scape);
  return scape;
}

function stopScape(ac: AudioContext, s: Scape) {
  const now = ac.currentTime;
  s.timers.forEach(clearInterval);
  s.gain.gain.cancelScheduledValues(now);
  s.gain.gain.setValueAtTime(Math.max(0.0001, s.gain.gain.value), now);
  s.gain.gain.exponentialRampToValueAtTime(0.0001, now + FADE);
  s.layers.forEach((l) => l.stop(now + FADE + 0.05));
  setTimeout(() => s.gain.disconnect(), (FADE + 0.3) * 1000);
}

function sync() {
  const ac = bookAudio();
  if (!ac) return;
  const mood = isPageSoundMuted() ? null : wanted;
  if (current && current.mood === mood) {
    applyLevel();
    return;
  }
  if (current) {
    stopScape(ac, current.scape);
    current = null;
  }
  if (mood && mood !== "quiet") {
    noiseBuffers(ac);
    masterGain(ac);
    current = { mood, scape: startScape(ac, mood) };
  }
  applyLevel();
}

function onVisibility() {
  hidden = document.visibilityState === "hidden";
  applyLevel(0.3);
}

/**
 * Play the soundscape for a mood, or `null` for silence. Changing mood cross-fades.
 * Browsers only let sound start after the child has touched the page; until then
 * this waits quietly and starts on the first tap.
 */
export function setAmbience(mood: Ambience | null) {
  if (typeof window === "undefined") return;
  wanted = mood;
  if (mood && !unsubMute) {
    unsubMute = onPageSoundMutedChange(sync);
    document.addEventListener("visibilitychange", onVisibility);
    const wake = () => {
      const ac = bookAudio();
      if (ac && ac.state !== "running") void ac.resume();
    };
    window.addEventListener("pointerdown", wake, { passive: true });
    window.addEventListener("keydown", wake);
  }
  sync();
}

/** Turn the soundscape down while a page is being read aloud. */
export function duckAmbience(on: boolean) {
  if (ducked === on) return;
  ducked = on;
  applyLevel(on ? 0.35 : 1.2);
}
