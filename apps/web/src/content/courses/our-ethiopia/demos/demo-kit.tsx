"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import { STAR_PATH } from "@/components/characters";
import { confetti } from "@/lib/confetti";
import { playTapSound } from "@/lib/tap-sound";
import type { Lang } from "@/content/stories";

/*
  The shared frame for the Our Ethiopia demos (copied from Values & Character; courses do not
  import each other): a title and goal, progress dots, a 4:3 picture (an SVG stage, 400 × 300
  like the storybook scenes) and big buttons underneath. Words are in both languages; pictures
  hold words only where the words are the lesson (a greeting in its own script, a place on the
  map). Everything fits a 390-wide phone: the stage scales to the width, the buttons wrap, and
  nothing scrolls sideways.

  Voices: sayAmharic() speaks Amharic text with an Amharic voice when the device has one, and
  otherwise does nothing (the words are on the screen). Greetings in Afaan Oromo, Tigrinya,
  Somali or Wolaytta are never spoken by a voice made for another language.

  AMHARIC in the demos: first draft, to be checked by a native-speaking editor.
*/

export type T = Record<Lang, string>;
export const t = (lang: Lang, s: T) => s[lang];

/** The frame round a demo: heading, goal, progress dots. */
export function DemoFrame({ lang, title, goal, step, total, color = "#15803D", children }: { lang: Lang; title: T; goal: T; step: number; total: number; color?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-5 sm:px-6" lang={lang}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-black leading-tight text-ink sm:text-3xl" style={{ color }}>
            {t(lang, title)}
          </h2>
          <p className="mt-1 text-base text-muted sm:text-lg">{t(lang, goal)}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5 pt-2" aria-label={`${Math.min(step + 1, total)} / ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className="block h-3 w-3 rounded-full transition-colors" style={{ background: i < step ? color : i === step ? `${color}88` : "#D3E4F4" }} />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

/** The 4:3 picture. */
export function Stage({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border-4 border-white bg-sky-soft shadow-[0_10px_30px_rgba(27,42,78,0.15)]">
      <svg viewBox="0 0 400 300" className="block h-auto w-full touch-manipulation select-none" role="img" aria-label={label}>
        {children}
      </svg>
    </div>
  );
}

/** A big friendly answer button, with an optional little picture. */
export function Choice({ children, onClick, pic, tone = "plain", disabled = false }: { children: ReactNode; onClick: () => void; pic?: ReactNode; tone?: "plain" | "good" | "soft"; disabled?: boolean }) {
  const bg = tone === "good" ? "#E4F7EA" : tone === "soft" ? "#FFF4E0" : "#FFFFFF";
  const edge = tone === "good" ? "#2FA35A" : tone === "soft" ? "#F5B21E" : "#D3E4F4";
  return (
    <button
      type="button"
      data-choice=""
      disabled={disabled}
      onClick={onClick}
      className="flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-display text-lg font-extrabold leading-snug text-ink transition-transform hover:-translate-y-0.5 active:translate-y-1 disabled:opacity-60"
      style={{ background: bg, borderColor: edge, boxShadow: `0 5px 0 ${edge}` }}
    >
      {pic && (
        <span className="shrink-0" aria-hidden>
          {pic}
        </span>
      )}
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}

/** What happened, said kindly: a green "well done" or a warm "here's a better way". */
export function Feedback({ tone, children, action }: { tone: "great" | "gentle"; children: ReactNode; action?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="mt-3 rounded-2xl border-2 p-4 text-lg leading-snug text-ink"
      style={{ background: tone === "great" ? "#E4F7EA" : "#FFF4E0", borderColor: tone === "great" ? "#2FA35A" : "#F5B21E" }}
      role="status"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0" aria-hidden>
          {tone === "great" ? <StarIcon size={28} /> : <HeartIcon size={28} />}
        </span>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      {action && <div className="mt-3 flex flex-wrap justify-end gap-2">{action}</div>}
    </motion.div>
  );
}

/** A chunky "next" style button. */
export function Next({ children, onClick, color = "#15803D" }: { children: ReactNode; onClick: () => void; color?: string }) {
  return (
    <button
      type="button"
      data-next=""
      onClick={onClick}
      className="inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-2.5 font-display text-lg font-extrabold text-white transition-transform hover:-translate-y-0.5 active:translate-y-1"
      style={{ background: color, boxShadow: `0 5px 0 color-mix(in srgb, ${color} 70%, black)` }}
    >
      {children}
    </button>
  );
}

export function StarIcon({ size = 24, color = "#FFD233" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d={STAR_PATH} fill={color} stroke="#E8A800" strokeWidth={1} />
    </svg>
  );
}

export function HeartIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" aria-hidden>
      <path d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#E2463F" />
    </svg>
  );
}

/** The happy ending: stars, confetti, a line of praise, and the button that finishes the demo. */
export function Finale({ lang, text, stars = 3, onDone, color = "#15803D", children }: { lang: Lang; text: T; stars?: number; onDone: () => void; color?: string; children?: ReactNode }) {
  useEffect(() => {
    playTapSound("chime");
    confetti(0.4);
  }, []);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 rounded-[28px] border-4 border-white bg-white p-5 text-center shadow-[0_10px_30px_rgba(27,42,78,0.12)]">
      <div className="flex justify-center gap-2">
        {Array.from({ length: stars }, (_, i) => (
          <motion.span key={i} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2 + i * 0.18, type: "spring" }}>
            <StarIcon size={48} />
          </motion.span>
        ))}
      </div>
      <p className="mt-3 font-display text-2xl font-black text-ink">{t(lang, text)}</p>
      {children}
      <div className="mt-4">
        <Next onClick={onDone} color={color}>
          {t(lang, { en: "I did it!", am: "ጨረስኩ!" })}
        </Next>
      </div>
    </motion.div>
  );
}

let amVoice: SpeechSynthesisVoice | null | undefined;

/** Speaks Amharic text with an Amharic voice, if the device has one; otherwise stays silent. */
export function sayAmharic(text: string) {
  try {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (!amVoice) amVoice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("am")) ?? null;
    if (!amVoice) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = amVoice;
    u.lang = amVoice.lang;
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch {
    /* no voice: the words are on the screen */
  }
}

/** Sounds for answers. */
export const sound = {
  good: () => playTapSound("chime"),
  gentle: () => playTapSound("boing"),
  tap: () => playTapSound("pop"),
};
