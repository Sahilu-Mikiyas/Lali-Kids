"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { THINGS } from "@/components/book/courses/amharic-readers/things";
import { confetti } from "@/lib/confetti";
import { bookAudio, isPageSoundMuted } from "@/lib/page-sound";
import { playTapSound } from "@/lib/tap-sound";
import type { Lang } from "../../../../stories";

/*
  Shared pieces for the Amharic Readers demos (../<id>.tsx), adapted from Fidel Foundations'
  demo kit: the frame every demo sits in (title, what to do, progress stars, the "well done"
  ending that calls onDone once), sounds, a picture from the course's things, and shuffling.
  Every demo works with a finger or a mouse, fits a 390-wide phone, and speaks English or
  Amharic; the Amharic text the child reads stays Amharic in both.

  Sounds, the same rule as Fidel Foundations: if the device has an Amharic voice, words and
  sentences are spoken with it (sayWords reads a sentence word by word, so a highlight can follow
  the reading); otherwise each word plays a soft chime, never an English voice mispronouncing
  Amharic text.
*/

export type T = Record<Lang, string>;

export const FIDEL: CSSProperties = { fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" };
export const LATIN: CSSProperties = { fontFamily: "var(--font-grandstander), sans-serif" };
export const INK = "#2A1A10";
export const ACCENT = "#C2410C";

/* ---------- sound ---------- */

let amVoice: SpeechSynthesisVoice | null | undefined;
function amharicVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (amVoice === undefined || amVoice === null) amVoice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("am")) ?? null;
  return amVoice;
}

/** Whether words are spoken aloud (an Amharic voice) or chimed. */
export function hasAmharicVoice() {
  return amharicVoice() !== null;
}

/** A soft two-note chime; `step` moves the pitch along a little scale (word by word). */
export function chime(step = 0, long = false) {
  if (isPageSoundMuted()) return;
  const ac = bookAudio();
  if (!ac) return;
  const base = [392, 440, 494, 523, 587, 659, 698, 784][((step % 8) + 8) % 8];
  const t = ac.currentTime + 0.01;
  [0, 1].forEach((k) => {
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t + k * 0.08);
    g.gain.exponentialRampToValueAtTime(0.1, t + k * 0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + k * 0.08 + (long ? 0.6 : 0.32));
    g.connect(ac.destination);
    const o = ac.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(base * (k ? 1.5 : 1), t + k * 0.08);
    o.connect(g);
    o.start(t + k * 0.08);
    o.stop(t + k * 0.08 + (long ? 0.65 : 0.36));
  });
}

/** Says a word or a sentence: with an Amharic voice when there is one, else a chime. */
export function say(text: string, step = 0, rate = 0.85) {
  const v = amharicVoice();
  if (v && !isPageSoundMuted()) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v;
    u.lang = v.lang;
    u.rate = rate;
    window.speechSynthesis.speak(u);
    return;
  }
  chime(step, [...text].length > 3);
}

/** Stops any reading in progress. */
export function hush() {
  if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
}

/**
 * Reads words one after another, calling onWord(i) as each one starts and onEnd() at the end.
 * `gap` is the pause per word in ms when there is no voice (and the minimum with one).
 * Returns a function that stops it.
 */
export function sayWords(words: string[], { gap = 700, onWord, onEnd }: { gap?: number; onWord: (i: number) => void; onEnd?: () => void }) {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const v = amharicVoice();
  const next = (i: number) => {
    if (stopped) return;
    if (i >= words.length) {
      timer = setTimeout(() => !stopped && onEnd?.(), 300);
      return;
    }
    onWord(i);
    if (v && !isPageSoundMuted()) {
      const u = new SpeechSynthesisUtterance(words[i]);
      u.voice = v;
      u.lang = v.lang;
      u.rate = gap > 900 ? 0.7 : 0.95;
      const started = Date.now();
      u.onend = () => {
        const wait = Math.max(0, gap * 0.5 - (Date.now() - started));
        timer = setTimeout(() => next(i + 1), wait);
      };
      window.speechSynthesis.speak(u);
    } else {
      chime(i);
      timer = setTimeout(() => next(i + 1), gap);
    }
  };
  if (v) window.speechSynthesis.cancel();
  next(0);
  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
    hush();
  };
}

export const sfx = {
  tap: () => playTapSound("pop"),
  good: () => playTapSound("chime"),
  oops: () => playTapSound("boing"),
  yay: () => playTapSound("giggle"),
};

/* ---------- pictures ---------- */

/** One of the course pictures (things.tsx) as an inline SVG. */
export function Pic({ id, size = 64, className }: { id: string; size?: number; className?: string }) {
  const Draw = THINGS[id];
  if (!Draw) return null;
  return (
    <svg viewBox="-44 -44 88 88" width={size} height={size} className={className} aria-hidden>
      <Draw />
    </svg>
  );
}

/* ---------- the frame ---------- */

const WELL_DONE: T = { en: "Well done!", am: "ጎበዝ!" };

/**
 * The frame every demo sits in: a title, what to do, stars for progress, the activity, and
 * the happy ending once `done`. onDone is called once, the first time `done` turns true.
 */
export function Frame({ lang, title, howTo, total, got, done, onDone, ending, children }: { lang: Lang; title: T; howTo: T; total: number; got: number; done: boolean; onDone: () => void; ending?: ReactNode; children: ReactNode }) {
  const called = useRef(false);
  useEffect(() => {
    if (done && !called.current) {
      called.current = true;
      sfx.yay();
      confetti(0.4);
      onDone();
    }
  }, [done, onDone]);
  useEffect(() => () => hush(), []);
  const font: CSSProperties = lang === "am" ? FIDEL : { fontFamily: "var(--font-andika), var(--font-noto-ethiopic), sans-serif" };
  return (
    <div className="mx-auto w-full max-w-[560px] select-none px-3 py-4 text-[#2A1A10]" style={font} lang={lang}>
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold leading-tight sm:text-2xl" style={lang === "am" ? FIDEL : LATIN}>
          {title[lang]}
        </h2>
        <p className="mt-1 text-base leading-snug text-[#5B4636]">{howTo[lang]}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1" aria-label={`${got} / ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <motion.span key={i} initial={false} animate={{ scale: i < got ? [1.5, 1] : 1 }} className="text-lg leading-none" style={{ color: i < got ? "#F5B21E" : "#E3D5C3" }}>
              ★
            </motion.span>
          ))}
        </div>
      </div>
      {done ? (
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-white p-5 text-center shadow-[0_6px_0_#00000014]" data-demo-done="">
          <p className="text-3xl font-bold" style={lang === "am" ? FIDEL : LATIN}>
            {WELL_DONE[lang]}
          </p>
          {ending && <div className="mt-3">{ending}</div>}
        </motion.div>
      ) : (
        children
      )}
    </div>
  );
}

/** A big friendly button. */
export function Btn({ onClick, children, color = ACCENT, shade = "#8A2E08", disabled = false, lang, className = "", data }: { onClick: () => void; children: ReactNode; color?: string; shade?: string; disabled?: boolean; lang: Lang; className?: string; data?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-btn={data}
      className={`rounded-full px-5 py-2 text-lg font-bold text-white transition-opacity active:translate-y-0.5 disabled:opacity-30 ${className}`}
      style={{ background: color, boxShadow: `0 4px 0 ${shade}`, ...(lang === "am" ? FIDEL : LATIN) }}
    >
      {children}
    </button>
  );
}

/** Shuffles a list (a new array), but never leaves it in its original order when it has 2+ items. */
export function shuffled<X>(list: X[], seed = Math.random()): X[] {
  const a = [...list];
  let s = Math.floor(seed * 2147483646) + 1;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((x, i) => x === list[i])) a.push(a.shift() as X);
  return a;
}

/** Calls fn after ms, cancelled if the component goes away first. */
export function useLater() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);
}
