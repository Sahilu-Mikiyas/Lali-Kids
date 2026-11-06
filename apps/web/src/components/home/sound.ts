"use client";

import { bookAudio, isPageSoundMuted, playPageTurn } from "@/lib/page-sound";
import { playTapSound } from "@/lib/tap-sound";

/*
  Animal voices and little magic sounds for the home page's pop-up book, synthesised with
  Web Audio (no audio files). They share the reader's sound toggle and AudioContext.

  Browsers only allow sound after the person has touched the page, so nothing plays (and no
  AudioContext is made) until the first tap or key press: the book opening by itself is silent.
*/

export type Sfx =
  | "page"
  | "magic"
  | "flutter"
  | "chirp"
  | "hoot"
  | "howl"
  | "bleat"
  | "chatter"
  | "roar"
  | "blip"
  | "hrumph"
  | "chime"
  | "buzz"
  | "boing"
  | "pop"
  | "caw";

let touched = false;
let armed = false;

/** Call once on the page: listens for the first real touch, after which sounds may play. */
export function armSound() {
  if (armed || typeof window === "undefined") return;
  armed = true;
  const on = () => {
    touched = true;
    window.removeEventListener("pointerdown", on, true);
    window.removeEventListener("keydown", on, true);
  };
  window.addEventListener("pointerdown", on, true);
  window.addEventListener("keydown", on, true);
}

function ctx(): AudioContext | null {
  if (!touched || isPageSoundMuted()) return null;
  return bookAudio();
}

function env(ac: AudioContext, t: number, vol: number, a: number, r: number, out?: AudioNode) {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + r);
  g.connect(out ?? ac.destination);
  return g;
}

function tone(ac: AudioContext, type: OscillatorType, t: number, dur: number, out: AudioNode, set: (f: AudioParam) => void) {
  const o = ac.createOscillator();
  o.type = type;
  set(o.frequency);
  o.connect(out);
  o.start(t);
  o.stop(t + dur + 0.05);
  return o;
}

function vibrato(ac: AudioContext, o: OscillatorNode, t: number, dur: number, rate: number, depth: number) {
  const l = ac.createOscillator();
  l.frequency.value = rate;
  const d = ac.createGain();
  d.gain.value = depth;
  l.connect(d).connect(o.frequency);
  l.start(t);
  l.stop(t + dur);
}

function band(ac: AudioContext, f: number, q: number, out: AudioNode) {
  const b = ac.createBiquadFilter();
  b.type = "bandpass";
  b.frequency.value = f;
  b.Q.value = q;
  b.connect(out);
  return b;
}

export function sfx(name: Sfx) {
  if (name === "page") {
    if (touched) playPageTurn(0.8);
    return;
  }
  if (name === "boing" || name === "pop" || name === "buzz") {
    if (touched) playTapSound(name);
    return;
  }
  const ac = ctx();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  const V = 0.12;
  switch (name) {
    case "magic": {
      // a soft rising harp glissando
      [784, 988, 1175, 1397, 1568, 1976].forEach((f, i) => {
        const at = t + i * 0.055;
        tone(ac, "sine", at, 0.6, env(ac, at, V * 0.45, 0.005, 0.55), (p) => p.setValueAtTime(f, at));
        tone(ac, "sine", at, 0.3, env(ac, at, V * 0.08, 0.005, 0.25), (p) => p.setValueAtTime(f * 3, at));
      });
      break;
    }
    case "flutter": {
      // wings: a few quick, soft taps of filtered noise made from a fast square wave
      for (let i = 0; i < 6; i++) {
        const at = t + i * 0.045;
        tone(ac, "square", at, 0.03, band(ac, 2400 + i * 120, 2, env(ac, at, V * 0.18, 0.004, 0.03)), (p) => p.setValueAtTime(90 + i * 7, at));
      }
      break;
    }
    case "chirp": {
      [0, 0.13, 0.26].forEach((d, i) => {
        const at = t + d;
        tone(ac, "sine", at, 0.09, env(ac, at, V * 0.7, 0.005, 0.08), (p) => {
          p.setValueAtTime(2400 + i * 200, at);
          p.exponentialRampToValueAtTime(3600 + i * 250, at + 0.05);
          p.exponentialRampToValueAtTime(2800, at + 0.09);
        });
      });
      break;
    }
    case "caw": {
      [0, 0.22].forEach((d) => {
        const at = t + d;
        const o = tone(ac, "sawtooth", at, 0.18, band(ac, 1200, 3, env(ac, at, V * 0.8, 0.01, 0.16)), (p) => {
          p.setValueAtTime(520, at);
          p.linearRampToValueAtTime(430, at + 0.18);
        });
        vibrato(ac, o, at, 0.2, 40, 30);
      });
      break;
    }
    case "hoot": {
      [0, 0.32, 0.5].forEach((d, i) => {
        const at = t + d;
        const dur = i === 0 ? 0.26 : 0.16;
        tone(ac, "sine", at, dur, env(ac, at, V * 0.9, 0.04, dur), (p) => {
          p.setValueAtTime(400, at);
          p.linearRampToValueAtTime(370, at + dur);
        });
      });
      break;
    }
    case "howl": {
      const o = tone(ac, "triangle", t, 1.1, band(ac, 900, 1.5, env(ac, t, V * 1.3, 0.2, 0.9)), (p) => {
        p.setValueAtTime(420, t);
        p.exponentialRampToValueAtTime(760, t + 0.4);
        p.exponentialRampToValueAtTime(600, t + 1.05);
      });
      vibrato(ac, o, t, 1.1, 6, 12);
      break;
    }
    case "bleat": {
      playTapSound("baa");
      break;
    }
    case "chatter": {
      // geladas talk in quick, soft grunts and lip-smacks
      for (let i = 0; i < 5; i++) {
        const at = t + i * 0.09 + (i % 2) * 0.02;
        tone(ac, "sawtooth", at, 0.07, band(ac, 700 + (i % 3) * 200, 2.5, env(ac, at, V, 0.008, 0.06)), (p) => {
          p.setValueAtTime(260 + (i % 3) * 60, at);
          p.exponentialRampToValueAtTime(200, at + 0.07);
        });
      }
      break;
    }
    case "roar": {
      // a tiny cub roar: a growl that rises and breaks into a giggle
      const o = tone(ac, "sawtooth", t, 0.5, band(ac, 600, 1.2, env(ac, t, V * 1.4, 0.06, 0.45)), (p) => {
        p.setValueAtTime(150, t);
        p.exponentialRampToValueAtTime(260, t + 0.25);
        p.exponentialRampToValueAtTime(180, t + 0.5);
      });
      vibrato(ac, o, t, 0.5, 28, 22);
      setTimeout(() => playTapSound("giggle"), 450);
      break;
    }
    case "blip": {
      [0, 0.08, 0.15].forEach((d, i) => {
        const at = t + d;
        tone(ac, "sine", at, 0.08, env(ac, at, V * 0.6, 0.004, 0.07), (p) => {
          p.setValueAtTime(500 + i * 260, at);
          p.exponentialRampToValueAtTime(1300 + i * 300, at + 0.06);
        });
      });
      break;
    }
    case "hrumph": {
      const o = tone(ac, "sawtooth", t, 0.5, band(ac, 300, 1.5, env(ac, t, V * 1.6, 0.04, 0.42)), (p) => {
        p.setValueAtTime(90, t);
        p.linearRampToValueAtTime(70, t + 0.45);
      });
      vibrato(ac, o, t, 0.5, 16, 10);
      setTimeout(() => sfx("blip"), 380);
      break;
    }
    case "chime": {
      playTapSound("chime");
      break;
    }
  }
}
