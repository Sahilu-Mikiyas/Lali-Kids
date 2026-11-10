"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { THINGS } from "@/components/book/courses/english-first-words/things";
import { confetti } from "@/lib/confetti";
import { isPageSoundMuted } from "@/lib/page-sound";
import { playTapSound } from "@/lib/tap-sound";
import type { Lang } from "../../../stories";

/*
  Shared pieces for the English First Words demos (../<id>.tsx): the frame every demo sits in
  (title, what to do, progress stars, the "well done" ending that calls onDone once), the English
  voice, the course pictures in plain HTML, and a few buttons.
  Every demo works with a finger or a mouse, fits a 390-wide phone, and speaks the child's
  language on the screen; the English words being learned are always shown in English.

  The voice: say() speaks ENGLISH text only, with the device's English text-to-speech voice
  (any "en" voice, preferring a US one). If the device has no English voice, or no speech at
  all, it plays a soft chime instead, so the demo still works silently. It is never used for
  Amharic text: instructions in Amharic are shown, not spoken.

  AMHARIC in the demos: first draft, to be checked by a native-speaking editor.
*/

export type T = Record<Lang, string>;
export const t = (lang: Lang, s: T) => s[lang];

export const ANDIKA: CSSProperties = { fontFamily: "var(--font-andika), var(--font-grandstander), sans-serif" };
export const DISPLAY: CSSProperties = { fontFamily: "var(--font-grandstander), sans-serif" };
export const ETHIOPIC: CSSProperties = { fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" };
export const INK = "#2A1A10";
export const TEAL = "#0E8C80";

/* ---------- the English voice ---------- */

let enVoice: SpeechSynthesisVoice | null | undefined;
function englishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (!enVoice) {
    const all = window.speechSynthesis.getVoices();
    enVoice = all.find((v) => v.lang.toLowerCase().startsWith("en-us")) ?? all.find((v) => v.lang.toLowerCase().startsWith("en")) ?? null;
  }
  return enVoice;
}

/** Says English words with an English voice; a soft chime when there is none. */
export function say(text: string, rate = 0.85) {
  if (isPageSoundMuted()) return;
  try {
    const v = englishVoice();
    if (v) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = v;
      u.lang = v.lang;
      u.rate = rate;
      window.speechSynthesis.speak(u);
      return;
    }
  } catch {
    /* fall through to the chime */
  }
  playTapSound("chime");
}

// Voices load late in some browsers: ask once early so the first word has a voice.
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", () => {
      enVoice = undefined;
    });
  } catch {
    /* no speech on this device */
  }
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

/** A little loudspeaker icon. */
export function SpeakerIcon({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 9 H8 L13 5 V19 L8 15 H4Z" fill={color} />
      <path d="M16 8.5 Q18.5 12 16 15.5 M18.5 6 Q22.5 12 18.5 18" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** A round "hear it again" button that says English words. */
export function Hear({ text, lang, color = TEAL }: { text: string; lang: Lang; color?: string }) {
  return (
    <button
      type="button"
      data-hear=""
      onClick={() => say(text)}
      aria-label={lang === "am" ? "እንደገና ስሙ" : "Hear it again"}
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white shadow-[0_4px_0_#00000026] active:translate-y-0.5"
      style={{ background: color }}
    >
      <SpeakerIcon size={24} color="#fff" />
    </button>
  );
}

/* ---------- the frame ---------- */

const WELL_DONE: T = { en: "Well done!", am: "ጎበዝ!" };
const AGAIN: T = { en: "Play again", am: "እንደገና ተጫወቱ" };

/**
 * The frame every demo sits in: a title, what to do, stars for progress, the activity, and the
 * happy ending once `done`. onDone is called once, the first time `done` turns true.
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
  color = TEAL,
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
  color?: string;
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
  const font: CSSProperties = lang === "am" ? { fontFamily: "var(--font-andika), var(--font-noto-ethiopic), sans-serif" } : { fontFamily: "var(--font-andika), sans-serif" };
  return (
    <div className="mx-auto w-full max-w-[600px] select-none px-3 py-4 text-[#2A1A10]" style={font} lang={lang}>
      <div className="mb-3 text-center">
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ ...(lang === "am" ? ETHIOPIC : DISPLAY), color }}>
          {title[lang]}
        </h2>
        <p className="mt-1 text-base leading-snug text-[#5B4636] sm:text-lg">{howTo[lang]}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1" aria-label={`${got} / ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <motion.span key={i} initial={false} animate={{ scale: i < got ? [1.5, 1] : 1 }} className="text-xl leading-none" style={{ color: i < got ? "#F5B21E" : "#E3D5C3" }}>
              ★
            </motion.span>
          ))}
        </div>
      </div>
      {done ? (
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-white p-5 text-center shadow-[0_6px_0_#00000014]" data-finale="">
          <p className="text-3xl font-bold" style={lang === "am" ? ETHIOPIC : DISPLAY}>
            {WELL_DONE[lang]}
          </p>
          {ending && <div className="mt-3">{ending}</div>}
          {onAgain && (
            <button type="button" data-again="" onClick={onAgain} className="mt-4 rounded-full px-5 py-2 text-base font-bold text-white shadow-[0_4px_0_#00000033] active:translate-y-0.5" style={{ background: color }}>
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

/** A short line of feedback under the activity: green when right, warm orange when not yet. */
export function Note({ tone, children }: { tone: "good" | "try" | "plain"; children: ReactNode }) {
  const c = tone === "good" ? ["#E4F7EA", "#2FA35A"] : tone === "try" ? ["#FFF4E0", "#E58A00"] : ["#FFFFFF", "#E3D5C3"];
  return (
    <motion.p
      key={String(children)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 min-h-12 rounded-2xl border-2 px-4 py-2 text-center text-lg leading-snug"
      style={{ background: c[0], borderColor: c[1] }}
      role="status"
    >
      {children}
    </motion.p>
  );
}

/** Shuffles a list (a new array), never leaving it in its original order when it has 2+ items. */
export function shuffled<X>(list: X[], seed = Math.random()): X[] {
  const a = [...list];
  let s = Math.floor((Math.abs(seed) % 1) * 2147483646) + 1;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((x, i) => x === list[i])) a.push(a.shift() as X);
  return a;
}
