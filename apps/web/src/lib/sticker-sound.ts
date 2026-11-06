"use client";

import { bookAudio, isPageSoundMuted } from "./page-sound";

/*
  Sticker sounds, synthesised like the book's other sounds (no audio files), sharing its
  sound toggle: a crackly peel as the sticker lifts off the sheet, a whoosh as it flies,
  and a happy two-note "pop-ding" as it sticks in the book.
*/

function noise(ac: AudioContext, seconds: number): AudioBuffer {
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.12 ? 1 : 0.35);
  return buf;
}

function ready(): AudioContext | null {
  if (isPageSoundMuted()) return null;
  return bookAudio();
}

export function playPeel() {
  const ac = ready();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  const src = ac.createBufferSource();
  src.buffer = noise(ac, 0.4);
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 2.5;
  band.frequency.setValueAtTime(1800, t);
  band.frequency.exponentialRampToValueAtTime(5200, t + 0.32);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
  src.connect(band).connect(g).connect(ac.destination);
  src.start(t);
  src.stop(t + 0.4);
}

export function playWhoosh() {
  const ac = ready();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  const src = ac.createBufferSource();
  src.buffer = noise(ac, 0.7);
  const low = ac.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(500, t);
  low.frequency.exponentialRampToValueAtTime(2400, t + 0.35);
  low.frequency.exponentialRampToValueAtTime(700, t + 0.65);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.1, t + 0.25);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.68);
  src.connect(low).connect(g).connect(ac.destination);
  src.start(t);
  src.stop(t + 0.7);
}

export function playStick() {
  const ac = ready();
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  [
    [660, 0],
    [990, 0.11],
    [1320, 0.22],
  ].forEach(([f, at]) => {
    const o = ac.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(f, t + at);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t + at);
    g.gain.exponentialRampToValueAtTime(0.12, t + at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + at + 0.3);
    o.connect(g).connect(ac.destination);
    o.start(t + at);
    o.stop(t + at + 0.32);
  });
}
