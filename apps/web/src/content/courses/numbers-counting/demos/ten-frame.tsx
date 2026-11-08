"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, sound, useRounds, type L } from "./ui";

/*
  "Fill the egg box" (a ten-frame, level 1). Tsehay's egg box has two rows of five. The child
  taps holes to put an egg in or take it out until the box shows the number on the card. The
  frame teaches "five and some more" at a glance (the full top row is five), and the last round
  starts full and asks for ZERO: take every egg out. Targets 3, 5, 7, 10, then 0.
*/

const ROUNDS: { target: number; start: number }[] = [
  { target: 3, start: 0 },
  { target: 5, start: 0 },
  { target: 7, start: 0 },
  { target: 10, start: 0 },
  { target: 0, start: 10 },
];

const T = {
  title: { en: "Fill the egg box", am: "የእንቁላል ሳጥኑን ሙሉ" },
  make: { en: "Put in this many eggs:", am: "ይህን ያህል እንቁላል አስገቡ፦" },
  zero: { en: "Take every egg out. Make zero!", am: "እንቁላሎቹን ሁሉ አውጡ። ዜሮ አድርጉ!" },
  now: { en: "In the box:", am: "በሳጥኑ ውስጥ፦" },
  five: { en: "five and", am: "አምስትና" },
  full: { en: "A full row is five!", am: "ሙሉ ረድፍ አምስት ነው!" },
  summary: { en: "You made 3, 5, 7, 10, and zero, the empty box.", am: "3፣ 5፣ 7፣ 10 እና ዜሮ (ባዶ ሳጥን) ሠራችሁ።" },
} satisfies Record<string, L>;

export default function TenFrame({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const { target, start } = ROUNDS[round];
  const fresh = () => Array.from({ length: 10 }, (_, i) => i < start);
  const [cells, setCells] = useState<boolean[]>(fresh);
  const [seen, setSeen] = useState(round);
  if (seen !== round) {
    setSeen(round);
    setCells(fresh());
  }
  const count = cells.filter(Boolean).length;
  const topFull = cells.slice(0, 5).every(Boolean);

  const toggle = (i: number) => {
    const next = cells.map((c, k) => (k === i ? !c : c));
    sound(next[i] ? "pop" : "boing");
    setCells(next);
    if (next.filter(Boolean).length === target) win();
  };

  return (
    <DemoShell
      lang={lang}
      title={T.title}
      round={round}
      rounds={ROUNDS.length}
      cheer={cheer}
      finished={finished}
      summary={T.summary[lang]}
      onAgain={again}
      task={
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span>{target === 0 ? T.zero[lang] : T.make[lang]}</span>
          <NumBadge n={target} lang={lang} tone="blue" />
        </div>
      }
    >
      <div className="mx-auto grid w-full max-w-[420px] grid-cols-5 gap-1.5 rounded-3xl border-4 border-[#9A7440] bg-[#C9A26A] p-2 sm:gap-2 sm:p-3">
        {cells.map((on, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            aria-pressed={on}
            aria-label={`${i + 1}`}
            className={`relative flex aspect-square items-center justify-center rounded-2xl bg-[#8E6A38] shadow-inner ${i >= 5 ? "ring-2 ring-[#B08850]" : "ring-2 ring-[#E8B66A]"}`}
          >
            <AnimatePresence>
              {on && (
                <motion.span
                  className="block h-[72%] w-[58%] rounded-[50%] bg-[#F6E7D2] shadow-[inset_-4px_-6px_0_#E5CFAE]"
                  initial={{ y: -40, scale: 0.6, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: -30, scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 20 }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-base font-bold text-muted">
        <span>{T.now[lang]}</span>
        <NumBadge n={count} lang={lang} size="sm" tone="teal" />
        {topFull && count > 5 && (
          <span className="rounded-full bg-sky-soft px-3 py-1 text-ink">
            {T.five[lang]} {count - 5} <span className="font-display">(5 + {count - 5})</span>
          </span>
        )}
        {topFull && count === 5 && <span className="rounded-full bg-sky-soft px-3 py-1 text-ink">{T.full[lang]}</span>}
      </div>
    </DemoShell>
  );
}
