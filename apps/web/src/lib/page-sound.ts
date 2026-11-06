"use client";

import { useSyncExternalStore } from "react";

/*
  A soft paper "fwip" for page turns, made with the Web Audio API (no audio files):
  a short burst of filtered noise that sweeps up and fades, then a tiny low thump as the
  page lands. Quiet by default; a mute toggle is remembered in this browser.
*/

const KEY = "lali-page-sound";
const listeners = new Set<() => void>();
let muted: boolean | null = null;
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function readMuted(): boolean {
  if (muted !== null) return muted;
  try {
    muted = window.localStorage.getItem(KEY) === "off";
  } catch {
    muted = false;
  }
  return muted;
}

export function setPageSoundMuted(value: boolean) {
  muted = value;
  try {
    window.localStorage.setItem(KEY, value ? "off" : "on");
  } catch {
    // Private windows can block storage; the setting lasts until the page closes.
  }
  listeners.forEach((l) => l());
}

/** Whether the reader's sounds are off (page turns, the scene's soundscape and tap sounds). */
export function isPageSoundMuted(): boolean {
  return typeof window === "undefined" ? true : readMuted();
}

/** Listen for the sound toggle; returns an unsubscribe function. */
export function onPageSoundMutedChange(l: () => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function usePageSoundMuted(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    readMuted,
    () => false,
  );
}

/** The one shared AudioContext for every book sound (null where Web Audio is missing). */
export function bookAudio(): AudioContext | null {
  return audio();
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    ctx = new AC();
    const len = Math.floor(ctx.sampleRate * 0.6);
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noise.getChannelData(0);
    // Brownish noise: softer than white noise, more like paper.
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.09 * (Math.random() * 2 - 1)) / 1.09;
      data[i] = last * 3.2;
    }
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Play the page-turn sound. `strength` 0–1 scales it (a slow drag is quieter). */
export function playPageTurn(strength = 1) {
  if (readMuted()) return;
  const ac = audio();
  if (!ac || !noise) return;
  const now = ac.currentTime;
  const vol = 0.16 * Math.max(0.3, Math.min(1, strength));

  const src = ac.createBufferSource();
  src.buffer = noise;
  src.playbackRate.value = 0.9 + Math.random() * 0.2;
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.9;
  band.frequency.setValueAtTime(700, now);
  band.frequency.exponentialRampToValueAtTime(3200, now + 0.22);
  band.frequency.exponentialRampToValueAtTime(1400, now + 0.42);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(vol, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(vol * 0.5, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  src.connect(band).connect(gain).connect(ac.destination);
  src.start(now);
  src.stop(now + 0.5);

  // The page lands: a soft, low tap.
  const tap = ac.createOscillator();
  tap.type = "sine";
  tap.frequency.setValueAtTime(140, now + 0.4);
  tap.frequency.exponentialRampToValueAtTime(70, now + 0.52);
  const tg = ac.createGain();
  tg.gain.setValueAtTime(0.0001, now + 0.4);
  tg.gain.exponentialRampToValueAtTime(vol * 0.5, now + 0.42);
  tg.gain.exponentialRampToValueAtTime(0.0001, now + 0.56);
  tap.connect(tg).connect(ac.destination);
  tap.start(now + 0.4);
  tap.stop(now + 0.6);
}
