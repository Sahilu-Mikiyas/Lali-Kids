"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { Hat } from "@/components/book/courses/fidel-foundations/kit";
import { THINGS } from "@/components/book/courses/fidel-foundations/things";
import { confetti } from "@/lib/confetti";
import { bookAudio, isPageSoundMuted } from "@/lib/page-sound";
import { playTapSound } from "@/lib/tap-sound";
import type { Lang } from "../../../../stories";
import { formOf, ORDER_COLORS } from "../../fidel";

/*
  Shared pieces for the Fidel Foundations demos (../<id>.tsx): the frame every demo sits in
  (title, what to do, progress stars, the "well done" ending that calls onDone once), the sounds,
  a picture and a hat in plain HTML, and the fidel font.
  Every demo works with a finger or a mouse (pointer events), fits a 390-wide phone, and speaks
  English or Amharic; the fidel stay fidel in both.
  Sounds: if the device has an Amharic voice, letters and words are spoken with it; otherwise each
  letter plays a soft two-note chime whose pitch follows its form (so the seven forms of a family
  sound like a little rising tune), never an English voice mispronouncing fidel.
*/

export type T = Record<Lang, string>;

export const FIDEL: CSSProperties = { fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" };
export const INK = "#2A1A10";

/* ---------- sound ---------- */

let amVoice: SpeechSynthesisVoice | null | undefined;
function amharicVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (amVoice === undefined || amVoice === null) amVoice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("am")) ?? null;
  return amVoice;
}

/** A soft chime for a letter: two notes, pitched by the letter's form. */
function chime(order: number, long = false) {
  if (isPageSoundMuted()) return;
  const ac = bookAudio();
  if (!ac) return;
  const base = [392, 440, 494, 523, 587, 349, 659][order] ?? 440;
  const t = ac.currentTime + 0.01;
  [0, 1].forEach((k) => {
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t + k * 0.09);
    g.gain.exponentialRampToValueAtTime(order === 5 ? 0.05 : 0.11, t + k * 0.09 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + k * 0.09 + (long ? 0.7 : 0.4));
    g.connect(ac.destination);
    const o = ac.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(base * (k ? 1.5 : 1), t + k * 0.09);
    o.connect(g);
    o.start(t + k * 0.09);
    o.stop(t + k * 0.09 + (long ? 0.75 : 0.45));
  });
}

/** Says a letter or a word: with an Amharic voice when there is one, else a chime. */
export function say(text: string) {
  const v = amharicVoice();
  if (v && !isPageSoundMuted()) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v;
    u.lang = v.lang;
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
    return;
  }
  const f = formOf([...text][0] ?? "");
  chime(f?.order ?? 0, [...text].length > 1);
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

/** One of Grandma's seven hats as an inline SVG. */
export function HatIcon({ order, size = 36 }: { order: number; size?: number }) {
  return (
    <svg viewBox="-24 -34 48 40" width={size} height={(size * 40) / 48} aria-hidden>
      <Hat order={order} />
    </svg>
  );
}

/** A letter's colour by its form (Grandma's hats). */
export function orderColor(g: string) {
  return ORDER_COLORS[formOf(g)?.order ?? 0];
}

/* ---------- the frame ---------- */

const WELL_DONE: T = { en: "Well done!", am: "ጎበዝ!" };
const AGAIN: T = { en: "Play again", am: "እንደገና ተጫወቱ" };

/**
 * The frame every demo sits in: a title, what to do, stars for progress, the activity, and
 * the happy ending once `done`. onDone is called once, the first time `done` turns true.
 */
export function Frame({
  lang,
  title,
  howTo,
  total,
  got,
  done,
  onDone,
  onAgain,
  ending,
  children,
}: {
  lang: Lang;
  title: T;
  howTo: T;
  total: number;
  got: number;
  done: boolean;
  onDone: () => void;
  onAgain?: () => void;
  ending?: ReactNode;
  children: ReactNode;
}) {
  const called = useRef(false);
  useEffect(() => {
    if (done && !called.current) {
      called.current = true;
      sfx.yay();
      confetti(0.4);
      onDone();
    }
  }, [done, onDone]);
  const font: CSSProperties = lang === "am" ? FIDEL : { fontFamily: "var(--font-andika), var(--font-noto-ethiopic), sans-serif" };
  return (
    <div className="mx-auto w-full max-w-[560px] select-none px-3 py-4 text-[#2A1A10]" style={font} lang={lang}>
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold leading-tight sm:text-2xl" style={lang === "am" ? FIDEL : { fontFamily: "var(--font-grandstander), sans-serif" }}>
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
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-white p-5 text-center shadow-[0_6px_0_#00000014]">
          <p className="text-3xl font-bold" style={lang === "am" ? FIDEL : { fontFamily: "var(--font-grandstander), sans-serif" }}>
            {WELL_DONE[lang]}
          </p>
          {ending && <div className="mt-3">{ending}</div>}
          {onAgain && (
            <button type="button" onClick={onAgain} className="mt-4 rounded-full bg-[#E8513B] px-5 py-2 text-base font-bold text-white shadow-[0_4px_0_#B33A28] active:translate-y-0.5">
              {AGAIN[lang]}
            </button>
          )}
        </motion.div>
      ) : (
        children
      )}
    </div>
  );
}

/** A big round button with a fidel or an icon on it. */
export function Round({ onClick, children, label, color = "#fff", className = "", style }: { onClick: () => void; children: ReactNode; label: string; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={`grid place-items-center rounded-full shadow-[0_4px_0_#00000022] active:translate-y-0.5 ${className}`} style={{ background: color, ...style }}>
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

/**
 * Dragging with a finger or a mouse: returns pointer handlers for a draggable thing. While it
 * moves, `onMove(dx, dy)`; when it is let go, `onDrop(x, y)` with the pointer's page position
 * (use document.elementsFromPoint to find the drop target). A short tap without moving calls `onTap`.
 */
export function useDrag({ onMove, onDrop, onTap }: { onMove: (dx: number, dy: number) => void; onDrop: (x: number, y: number) => void; onTap?: () => void }) {
  const start = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
  }, []);
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const s = start.current;
      if (!s || s.id !== e.pointerId) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (!s.moved && Math.hypot(dx, dy) > 6) s.moved = true;
      if (s.moved) onMove(dx, dy);
    },
    [onMove],
  );
  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s || s.id !== e.pointerId) return;
      if (s.moved) onDrop(e.clientX, e.clientY);
      else onTap?.();
    },
    [onDrop, onTap],
  );
  const onPointerCancel = useCallback(() => {
    start.current = null;
    onMove(0, 0);
  }, [onMove]);
  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}

/** Finds the drop target under a page point: the nearest element with data-drop, and its value. */
export function dropAt(x: number, y: number): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    const v = (el as HTMLElement).closest<HTMLElement>("[data-drop]")?.dataset.drop;
    if (v !== undefined) return v;
  }
  return null;
}
