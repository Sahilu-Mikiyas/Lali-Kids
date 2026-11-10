"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState, type ReactNode } from "react";

import { playTapSound, type TapSound } from "@/lib/tap-sound";
import type { Lang } from "../../../stories";
import { geez, numberWord } from "../numbers";

/*
  Shared pieces for the Maths Explorers demonstrations (copied from Numbers & Counting): the frame (title, round dots, the
  task for this round, a cheer between rounds and a "well done" card at the end), number
  badges that always show a number three ways (digit, Ge'ez numeral, word), and small helpers.
  Every demo fits a 390-wide phone with no sideways scrolling, and works with touch and mouse.
*/

export type L = Record<Lang, string>;

export const sound = (s: TapSound) => {
  try {
    playTapSound(s);
  } catch {
    // Sound is a nicety; never let it break the game.
  }
};

/** A seeded shuffle, so a round looks the same each time it is played. */
export function shuffle<T>(list: T[], seed: number): T[] {
  const out = [...list];
  let s = seed * 9301 + 49297;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A number three ways: the digit, the Ge'ez numeral (none for zero) and the word. */
export function NumBadge({ n, lang, size = "md", tone = "coral", word = true }: { n: number; lang: Lang; size?: "sm" | "md" | "lg"; tone?: "coral" | "blue" | "teal" | "gold"; word?: boolean }) {
  const big = size === "lg" ? "text-4xl sm:text-5xl" : size === "md" ? "text-2xl sm:text-3xl" : "text-lg";
  const color = { coral: "text-coral border-coral", blue: "text-blue border-blue", teal: "text-teal border-teal", gold: "text-gold-deep border-gold" }[tone];
  return (
    <span className={`inline-flex items-center gap-2 rounded-2xl border-[3px] bg-white px-3 py-1 ${color}`}>
      <span className={`font-display font-black leading-none ${big}`}>{n}</span>
      <span className="h-6 w-px bg-current opacity-30" />
      <span className={`font-ethiopic font-bold leading-none ${big}`}>{n === 0 ? "–" : geez(n)}</span>
      {word && <span className={`text-sm font-bold text-ink/70 ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{numberWord(n, lang)}</span>}
    </span>
  );
}

/** Little stars bursting out from the middle of the box (a cheer). */
export function Cheer({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="pointer-events-none absolute inset-0 flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                animate={{ x: Math.cos(a) * 130, y: Math.sin(a) * 90, scale: 1.2, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                {i % 3 === 0 ? "⭐" : i % 3 === 1 ? "✨" : "🌼"}
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const T = {
  round: { en: "Round", am: "ዙር" },
  done: { en: "Well done!", am: "ጎበዝ!" },
  again: { en: "Play again", am: "እንደገና ተጫወት" },
  next: { en: "Next", am: "ቀጣይ" },
} satisfies Record<string, L>;

/**
 * The frame every demo sits in. `round` counts from 0; when `finished`, the well-done card
 * shows instead of the children (with `summary` under it).
 */
export function DemoShell({
  lang,
  title,
  round,
  rounds,
  task,
  cheer,
  finished,
  summary,
  onAgain,
  children,
}: {
  lang: Lang;
  title: L;
  round: number;
  rounds: number;
  task?: ReactNode;
  cheer: boolean;
  finished: boolean;
  summary?: ReactNode;
  onAgain: () => void;
  children: ReactNode;
}) {
  const am = lang === "am";
  return (
    <div className={`relative mx-auto w-full max-w-[640px] overflow-hidden rounded-[28px] border-2 border-line bg-paper p-3 shadow-[0_8px_0_var(--color-line)] sm:p-5 ${am ? "font-ethiopic" : ""}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className={`text-lg font-black text-ink sm:text-xl ${am ? "font-ethiopic" : "font-display"}`}>{title[lang]}</h2>
        <div className="flex shrink-0 items-center gap-1.5" aria-label={`${T.round[lang]} ${Math.min(round + 1, rounds)} / ${rounds}`}>
          {Array.from({ length: rounds }, (_, i) => (
            <span key={i} className={`h-2.5 w-2.5 rounded-full transition-colors ${i < round || finished ? "bg-teal" : i === round ? "bg-coral" : "bg-line"}`} />
          ))}
        </div>
      </div>
      {finished ? (
        <motion.div className="flex flex-col items-center gap-4 py-8 text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <motion.div className="text-6xl" animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}>
            🌟
          </motion.div>
          <p className={`text-3xl font-black text-ink ${am ? "font-ethiopic" : "font-display"}`}>{T.done[lang]}</p>
          {summary && <div className="text-base text-muted">{summary}</div>}
          <button type="button" className="btn btn-plain" onClick={onAgain}>
            {T.again[lang]}
          </button>
        </motion.div>
      ) : (
        <>
          {task && <div className="mt-2 min-h-[3.5rem] text-center text-base font-bold text-ink sm:text-lg">{task}</div>}
          <div className="relative mt-2">{children}</div>
        </>
      )}
      <Cheer show={cheer} />
    </div>
  );
}

/**
 * Round bookkeeping: `win()` cheers, then moves to the next round after a pause (or finishes
 * and calls onDone once). `again()` starts over.
 */
export function useRounds(rounds: number, onDone: () => void, pause = 1400) {
  const [round, setRound] = useState(0);
  const [cheer, setCheer] = useState(false);
  const [finished, setFinished] = useState(false);
  const called = useRef(false);
  const busy = useRef(false);
  const at = useRef(0);
  const win = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    sound("chime");
    setCheer(true);
    setTimeout(() => {
      setCheer(false);
      busy.current = false;
      if (at.current + 1 >= rounds) {
        setFinished(true);
        if (!called.current) {
          called.current = true;
          onDone();
        }
        return;
      }
      at.current += 1;
      setRound(at.current);
    }, pause);
  }, [rounds, onDone, pause]);
  const again = useCallback(() => {
    at.current = 0;
    setRound(0);
    setFinished(false);
  }, []);
  return { round, cheer, finished, win, again, busy };
}

/** A gentle wrong-answer nudge: returns [key, nudge()]; put the key on a motion element's animate. */
export function useShake() {
  const [n, setN] = useState(0);
  const nudge = useCallback(() => {
    sound("boing");
    setN((k) => k + 1);
  }, []);
  return [n, nudge] as const;
}

/** The shake for a nudge count (the last value differs each time, so it plays again). */
export const shakeAnim = (n: number) => (n ? { x: [0, -8, 8, -5, 5, n % 2 ? 0.01 : 0] } : { x: 0 });
