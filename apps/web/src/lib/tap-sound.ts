"use client";

import { bookAudio, isPageSoundMuted } from "./page-sound";

/*
  Tiny sounds for tapping things in the pictures, synthesised with Web Audio.
  They share the book's sound toggle and stay soft.
*/

export type TapSound = "pop" | "boing" | "chime" | "giggle" | "buzz" | "baa" | "none";

const VOL = 0.13;

function env(ac: AudioContext, t: number, vol: number, attack: number, release: number): GainNode {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  g.connect(ac.destination);
  return g;
}

function osc(ac: AudioContext, type: OscillatorType, t: number, dur: number, out: AudioNode, f: (p: AudioParam) => void) {
  const o = ac.createOscillator();
  o.type = type;
  f(o.frequency);
  o.connect(out);
  o.start(t);
  o.stop(t + dur + 0.05);
  return o;
}

export function playTapSound(sound: TapSound) {
  if (sound === "none" || isPageSoundMuted()) return;
  const ac = bookAudio();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  switch (sound) {
    case "pop": {
      const g = env(ac, t, VOL, 0.005, 0.11);
      osc(ac, "sine", t, 0.12, g, (p) => {
        p.setValueAtTime(420, t);
        p.exponentialRampToValueAtTime(1300, t + 0.06);
      });
      break;
    }
    case "boing": {
      const g = env(ac, t, VOL, 0.01, 0.45);
      const o = osc(ac, "triangle", t, 0.46, g, (p) => {
        p.setValueAtTime(160, t);
        p.exponentialRampToValueAtTime(440, t + 0.12);
        p.exponentialRampToValueAtTime(300, t + 0.45);
      });
      // the wobble of a spring
      const lfo = ac.createOscillator();
      lfo.frequency.setValueAtTime(18, t);
      lfo.frequency.linearRampToValueAtTime(7, t + 0.45);
      const depth = ac.createGain();
      depth.gain.value = 40;
      lfo.connect(depth).connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + 0.5);
      break;
    }
    case "chime": {
      [1046.5, 1318.5, 1568].forEach((f, i) => {
        const at = t + i * 0.07;
        const g = env(ac, at, VOL * 0.7, 0.006, 0.9);
        osc(ac, "sine", at, 0.95, g, (p) => p.setValueAtTime(f, at));
        const g2 = env(ac, at, VOL * 0.15, 0.006, 0.4);
        osc(ac, "sine", at, 0.45, g2, (p) => p.setValueAtTime(f * 2.76, at));
      });
      break;
    }
    case "giggle": {
      // "hee-hee-hee": short vowel-ish bursts that bounce in pitch.
      const notes = [620, 700, 660, 760, 690];
      notes.forEach((f, i) => {
        const at = t + i * 0.085;
        const band = ac.createBiquadFilter();
        band.type = "bandpass";
        band.frequency.value = 1500;
        band.Q.value = 1.2;
        const g = env(ac, at, VOL * 1.1, 0.012, 0.06);
        band.connect(g);
        osc(ac, "sawtooth", at, 0.08, band, (p) => {
          p.setValueAtTime(f * 1.06, at);
          p.exponentialRampToValueAtTime(f * 0.92, at + 0.07);
        });
      });
      break;
    }
    case "buzz": {
      const low = ac.createBiquadFilter();
      low.type = "lowpass";
      low.frequency.value = 1100;
      const g = env(ac, t, VOL * 0.9, 0.03, 0.42);
      low.connect(g);
      const o = osc(ac, "sawtooth", t, 0.46, low, (p) => {
        p.setValueAtTime(210, t);
        p.linearRampToValueAtTime(260, t + 0.2);
        p.linearRampToValueAtTime(220, t + 0.45);
      });
      const lfo = ac.createOscillator();
      lfo.frequency.value = 30;
      const depth = ac.createGain();
      depth.gain.value = 14;
      lfo.connect(depth).connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + 0.5);
      break;
    }
    case "baa": {
      const band = ac.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 900;
      band.Q.value = 1.5;
      const g = env(ac, t, VOL * 1.2, 0.04, 0.5);
      band.connect(g);
      const o = osc(ac, "sawtooth", t, 0.55, band, (p) => {
        p.setValueAtTime(330, t);
        p.linearRampToValueAtTime(300, t + 0.5);
      });
      const lfo = ac.createOscillator();
      lfo.frequency.value = 9;
      const depth = ac.createGain();
      depth.gain.value = 16;
      lfo.connect(depth).connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + 0.56);
      break;
    }
  }
}
