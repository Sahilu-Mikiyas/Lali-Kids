"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Equal groups" (level 2). Grandma's plates at the coffee ceremony: put the same number of
  rolls on every plate. Tapping a plate puts a roll on it; tapping a roll takes it off. When
  every plate has the right number, the child says how many altogether (counting in groups):
  4 plates of 3, 5 plates of 2, 3 plates of 5, 6 plates of 2. Below, the sum writes itself as
  repeated addition and as a times sum.
*/

const ROUNDS: [number, number][] = [
  [4, 3],
  [5, 2],
  [3, 5],
  [6, 2],
];

const T = {
  title: { en: "Equal groups", am: "እኩል ቡድኖች" },
  put: { en: "on every plate", am: "በእያንዳንዱ ሳህን ላይ" },
  tap: { en: "Tap a plate to add a roll. Tap a roll to take it off.", am: "ዳቦ ለመጨመር ሳህኑን ንኩ። ለማንሣት ዳቦውን ንኩ።" },
  how: { en: "Equal groups! How many rolls altogether?", am: "እኩል ቡድኖች! በአጠቃላይ ስንት ዳቦዎች?" },
  summary: { en: "Equal groups, add them up: 4 groups of 3 is 3 + 3 + 3 + 3 = 12, or 4 × 3 = 12.", am: "እኩል ቡድኖች፣ ደምሯቸው፦ 4 የ3 ቡድኖች 3 + 3 + 3 + 3 = 12፣ ወይም 4 × 3 = 12።" },
} satisfies Record<string, L>;

function RollIcon() {
  return (
    <svg width={22} height={16} viewBox="-11 -8 22 16" aria-hidden>
      <ellipse cx={0} cy={0} rx={10} ry={7} fill="#D9964A" />
      <path d="M-5 -2 Q0 -6 5 -2" stroke="#B8742E" strokeWidth={1.6} fill="none" />
    </svg>
  );
}

export default function EqualGroups({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const [plates, each] = ROUNDS[round];
  const [counts, setCounts] = useState<number[]>(() => Array.from({ length: plates }, () => 0));
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setCounts(Array.from({ length: plates }, () => 0));
  }
  const ready = counts.length === plates && counts.every((c) => c === each);
  const total = plates * each;
  const options = shuffle([total, total + each, total - each > 0 ? total - each : total + 1], round + 7);

  const add = (i: number) => {
    if (ready) return;
    if (counts[i] >= 6) return nudge();
    sound("pop");
    setCounts(counts.map((c, k) => (k === i ? c + 1 : c)));
  };
  const take = (i: number) => {
    if (ready) return;
    sound("boing");
    setCounts(counts.map((c, k) => (k === i ? Math.max(0, c - 1) : c)));
  };
  const pick = (n: number) => (n === total ? win() : nudge());

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
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <NumBadge n={each} lang={lang} size="sm" tone="blue" />
            <span>{T.put[lang]}</span>
          </div>
          <span className="text-sm text-muted">{ready ? T.how[lang] : T.tap[lang]}</span>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-2" data-each={each}>
        {counts.map((c, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              onClick={() => add(i)}
              className={`flex h-24 w-full flex-wrap content-center items-center justify-center gap-0.5 rounded-[50%] border-4 p-2 ${c === each ? "border-teal bg-[#E7F6EE]" : "border-[#D9B27A] bg-[#FFF6E2]"}`}
              aria-label={`plate ${i + 1}: ${c}`}
              data-plate={i}
            >
              <AnimatePresence>
                {Array.from({ length: c }, (_, k) => (
                  <motion.span
                    key={k}
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      take(i);
                    }}
                    initial={{ scale: 0, y: -14 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                  >
                    <RollIcon />
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 min-h-[2.5rem] text-center font-display text-xl font-black text-ink" aria-live="polite">
        {counts.map((c) => c).join(" + ")} {ready && <span className="text-coral">= {plates} × {each}</span>}
      </div>
      {ready && (
        <motion.div className="mt-2 flex justify-center gap-3" animate={shakeAnim(shake)}>
          {options.map((n) => (
            <button key={n} type="button" onClick={() => pick(n)} className="rounded-2xl" data-answer={n}>
              <NumBadge n={n} lang={lang} size="md" word={false} />
            </button>
          ))}
        </motion.div>
      )}
    </DemoShell>
  );
}
