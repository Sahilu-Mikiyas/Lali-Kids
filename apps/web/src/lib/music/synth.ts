"use client";

import { parse, type Step } from "./notes";
import { TUNES, type Tune } from "./tunes";
import { playNote, type Voice } from "./voices";

/*
  The home page's music box: plays TUNES with Web Audio, one after another.

  - Nothing makes a sound until someone taps: the AudioContext is only created inside a tap
    (browsers require it, and parents rightly expect it).
  - The on/off choice and the last tune are remembered in the browser. If the music was on
    last time, it comes back on the next tap or key press anywhere on the page, never by itself.
  - It fades out while something else needs the ears (a video, the tab hidden, a story being
    read aloud) and fades back in afterwards. While faded out, the context is suspended,
    so it costs nothing.
  - Notes are scheduled a fraction of a second ahead on the audio clock, so the timing stays
    steady even when the page is busy.
*/

export type MusicState = {
  /** The grown-up's choice: music on or off. */
  on: boolean;
  /** Music is actually sounding now (on, started by a tap, and not faded out). */
  playing: boolean;
  /** Index into TUNES. */
  tune: number;
  /** The player has been used before in this browser (hides the first-time hint). */
  known: boolean;
};

const KEY = "lali-music";
const TUNE_KEY = "lali-music-tune";
const PLAYS_PER_TUNE = 2;
const LOOKAHEAD = 0.3;
const VOLUME = 0.75;

type Parsed = { voice: Voice; gain: number; steps: Step[] }[];

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private windows can refuse storage; the music still works for this visit.
  }
}

const parsedCache = new Map<string, { parts: Parsed; length: number }>();
function parsed(tune: Tune) {
  let p = parsedCache.get(tune.id);
  if (!p) {
    const parts = tune.parts.map((part) => ({ voice: part.voice, gain: part.gain ?? 1, ...parse(part.notes) }));
    const length = Math.max(...parts.map((x) => x.length));
    if (process.env.NODE_ENV !== "production" && parts.some((x) => Math.abs(x.length - length) > 1e-6)) {
      console.warn(`[music] parts of "${tune.id}" have different lengths:`, parts.map((x) => x.length));
    }
    p = { parts: parts.map(({ voice, gain, steps }) => ({ voice, gain, steps })), length };
    parsedCache.set(tune.id, p);
  }
  return p;
}

function impulse(ac: AudioContext, seconds = 2.4) {
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
  }
  return buf;
}

let state: MusicState = { on: false, playing: false, tune: 0, known: true };
const SERVER_STATE = state;
const listeners = new Set<() => void>();
let loaded = false;

function set(patch: Partial<MusicState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const saved = read(KEY);
  const tune = Number(read(TUNE_KEY));
  state = { on: saved === "on", playing: false, tune: Number.isInteger(tune) && tune >= 0 && tune < TUNES.length ? tune : 0, known: saved !== null };
}

/* ---------- the engine ---------- */

let ac: AudioContext | null = null;
let master: GainNode | null = null;
let input: GainNode | null = null;
let song: GainNode | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let sleep: ReturnType<typeof setTimeout> | null = null;
let started = false;
const ducks = new Set<string>();

// Playhead: when beat 0 of the current pass starts on the audio clock, which pass, and the
// next step to schedule in each part.
let passStart = 0;
let pass = 0;
let cursors: number[] = [];

function ensureContext(): AudioContext | null {
  if (ac) return ac;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  try {
    ac = new Ctor();
  } catch {
    return null;
  }
  const comp = ac.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  master = ac.createGain();
  master.gain.value = 0.0001;
  master.connect(comp).connect(ac.destination);
  // Everything goes through a soft room: mostly the dry sound, plus a gentle reverb.
  input = ac.createGain();
  const dry = ac.createGain();
  dry.gain.value = 0.82;
  const verb = ac.createConvolver();
  verb.buffer = impulse(ac);
  const wet = ac.createGain();
  wet.gain.value = 0.34;
  input.connect(dry).connect(master);
  input.connect(verb).connect(wet).connect(master);
  return ac;
}

function newSong(at: number) {
  if (!ac || !input) return;
  const old = song;
  if (old) {
    old.gain.setTargetAtTime(0, ac.currentTime, 0.08);
    setTimeout(() => old.disconnect(), 1500);
  }
  song = ac.createGain();
  song.connect(input);
  passStart = at;
  pass = 0;
  cursors = TUNES[state.tune].parts.map(() => 0);
}

function tick() {
  if (!ac || !song) return;
  const tune = TUNES[state.tune];
  const { parts, length } = parsed(tune);
  const spb = 60 / tune.bpm;
  const horizon = ac.currentTime + LOOKAHEAD;
  // If the page stalled and the playhead fell behind, slide it forward instead of piling up notes.
  const due = (at: number) => passStart + at * spb;
  for (let i = 0; i < parts.length; i++) {
    const { voice, gain, steps } = parts[i];
    while (cursors[i] < steps.length && due(steps[cursors[i]].at) < horizon) {
      const step = steps[cursors[i]++];
      const t = due(step.at);
      if (t < ac.currentTime - 0.05) {
        passStart += ac.currentTime - t + 0.05;
        continue;
      }
      for (const f of step.freqs) playNote(voice, ac, song, f, t, step.beats * spb, step.vel * gain * (step.freqs.length > 1 ? 0.75 : 1));
    }
  }
  const end = due(length);
  if (end < horizon) {
    pass++;
    if (pass >= PLAYS_PER_TUNE) {
      // On to the next tune, after a little breath.
      const next = (state.tune + 1) % TUNES.length;
      set({ tune: next });
      write(TUNE_KEY, String(next));
      newSong(end + 1.2);
    } else {
      passStart = end;
      cursors = parts.map(() => 0);
    }
  }
}

function audible() {
  return state.on && started && ducks.size === 0;
}

function apply() {
  const should = audible();
  if (should === state.playing && (!should || timer)) return;
  if (!ac || !master) {
    if (state.playing) set({ playing: false });
    return;
  }
  const now = ac.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), now);
  if (should) {
    if (sleep) clearTimeout(sleep);
    sleep = null;
    void ac.resume();
    master.gain.setTargetAtTime(VOLUME, now, 0.45);
    if (!timer) timer = setInterval(tick, 90);
    tick();
    set({ playing: true });
  } else {
    master.gain.setTargetAtTime(0.0001, now, 0.3);
    set({ playing: false });
    if (sleep) clearTimeout(sleep);
    sleep = setTimeout(() => {
      sleep = null;
      if (audible() || !ac) return;
      if (timer) clearInterval(timer);
      timer = null;
      void ac.suspend();
    }, 1600);
  }
}

/** Starts the music. Call it from a tap or key press. */
function start() {
  const ctx = ensureContext();
  if (!ctx) return;
  void ctx.resume();
  if (!started) {
    started = true;
    newSong(ctx.currentTime + 0.15);
  }
  apply();
}

/* ---------- what the page uses ---------- */

export function subscribeMusic(l: () => void) {
  load();
  listeners.add(l);
  return () => listeners.delete(l);
}
export function musicSnapshot(): MusicState {
  load();
  return state;
}
export function musicServerSnapshot(): MusicState {
  return SERVER_STATE;
}

/** The music button: on and off. Must be called from a tap. */
export function toggleMusic() {
  load();
  if (state.on && started) {
    set({ on: false, known: true });
    write(KEY, "off");
    apply();
  } else {
    set({ on: true, known: true });
    write(KEY, "on");
    start();
  }
}

/** Skips to the next tune. Must be called from a tap. */
export function skipTune() {
  load();
  const next = (state.tune + 1) % TUNES.length;
  set({ tune: next });
  write(TUNE_KEY, String(next));
  if (!state.on) {
    set({ on: true, known: true });
    write(KEY, "on");
  }
  const ctx = ensureContext();
  if (!ctx) return;
  started = true;
  newSong(ctx.currentTime + 0.25);
  start();
}

/** Fades the music out while `reason` holds (a video playing, say), and back in after. */
export function duckMusic(reason: string, on: boolean) {
  if (on) ducks.add(reason);
  else ducks.delete(reason);
  apply();
}

let wired = false;
/**
 * Sets up the page-wide listeners once: the tab being hidden, other sounds on the page,
 * and (when the music was on last time) bringing it back on the next tap.
 */
export function wireMusic(): () => void {
  load();
  if (wired) return () => {};
  wired = true;

  const onVisibility = () => duckMusic("hidden", document.hidden);
  document.addEventListener("visibilitychange", onVisibility);

  // A story read aloud, or any audio or video element on the page, takes the stage.
  const playing = new Set<EventTarget>();
  const onPlay = (e: Event) => {
    if (!(e.target instanceof HTMLMediaElement)) return;
    playing.add(e.target);
    duckMusic("media", true);
  };
  const onStop = (e: Event) => {
    playing.delete(e.target as EventTarget);
    if (!playing.size) duckMusic("media", false);
  };
  document.addEventListener("play", onPlay, true);
  document.addEventListener("pause", onStop, true);
  document.addEventListener("ended", onStop, true);
  const speech = setInterval(() => {
    if (!state.on || typeof speechSynthesis === "undefined") return;
    const talking = speechSynthesis.speaking;
    if (talking !== ducks.has("speech")) duckMusic("speech", talking);
  }, 600);

  // The music was on last time: the next tap anywhere (not on the music button itself, and
  // not on a video) brings it back. Pointer-up and key presses count as a tap for browsers.
  const wake = (e: Event) => {
    const el = e.target instanceof Element ? e.target : null;
    if (el?.closest("[data-music-quiet]")) return;
    if (e instanceof KeyboardEvent && e.key === "Escape") return;
    remove();
    if (state.on && !started) start();
  };
  const remove = () => {
    window.removeEventListener("pointerup", wake, true);
    window.removeEventListener("keydown", wake, true);
  };
  if (state.on) {
    window.addEventListener("pointerup", wake, true);
    window.addEventListener("keydown", wake, true);
  }

  return () => {
    wired = false;
    remove();
    clearInterval(speech);
    document.removeEventListener("visibilitychange", onVisibility);
    document.removeEventListener("play", onPlay, true);
    document.removeEventListener("pause", onStop, true);
    document.removeEventListener("ended", onStop, true);
    // Leaving the home page: fade out and let the context sleep.
    ducks.add("away");
    apply();
    ducks.delete("away");
    if (ac && started) {
      // Next time the page mounts, a tap is needed again.
      started = false;
    }
  };
}

export { TUNES };
