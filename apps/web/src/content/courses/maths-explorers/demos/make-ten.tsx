"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Make a ten first" (level 1). Two egg boxes: the first holds the bigger number in brown eggs,
  the second the other number in white eggs. The child taps white eggs to move them across
  until the first box is full (ten), then picks the total: "ten and three is thirteen". Sums:
  8 + 5, 9 + 4, 7 + 6, 8 + 6, 9 + 7.
*/

const ROUNDS: [number, number][] = [
  [8, 5],
  [9, 4],
  [7, 6],
  [8, 6],
  [9, 7],
];

const T = {
  title: { en: "Make a ten first", am: "መጀመሪያ አሥር ሙሉ" },
  move: { en: "Tap the white eggs to fill the first box.", am: "የመጀመሪያውን ሳጥን ለመሙላት ነጮቹን እንቁላሎች ንኩ።" },
  full: { en: "Ten! And how many altogether?", am: "አሥር! በአጠቃላይ ስንት ናቸው?" },
  tenAnd: { en: "ten and", am: "አሥርና" },
  summary: { en: "Fill the ten, then add the rest: 8 + 5 is 10 + 3, thirteen.", am: "አሥሩን ሙሉ፣ ቀሪውን ጨምሩ፦ 8 + 5 ማለት 10 + 3፣ አሥራ ሦስት።" },
} satisfies Record<string, L>;

function Box({ eggs, onTap, label }: { eggs: ("b" | "w" | null)[]; onTap?: (i: number) => void; label: string }) {
  return (
    <div className="w-full max-w-[260px]" aria-label={label}>
      <div className="grid grid-cols-5 gap-1 rounded-2xl border-4 border-[#9A7440] bg-[#C9A26A] p-1.5">
        {eggs.map((e, i) => (
          <button
            key={i}
            type="button"
            disabled={!onTap || e !== "w"}
            onClick={() => onTap?.(i)}
            aria-label={e ? (e === "b" ? "brown egg" : "white egg") : "empty"}
            className="relative flex aspect-square items-center justify-center rounded-xl bg-[#8E6A38] shadow-inner disabled:cursor-default"
            data-egg={e ?? ""}
          >
            <AnimatePresence>
              {e && (
                <motion.span
                  className={`block h-[74%] w-[58%] rounded-[50%] ${e === "b" ? "bg-[#C98A5A] shadow-[inset_-3px_-5px_0_#A86A3A]" : "bg-[#FBF4E6] shadow-[inset_-3px_-5px_0_#E5D6BC]"}`}
                  initial={{ scale: 0.4, opacity: 0, y: -16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.4, opacity: 0, y: -16 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MakeTen({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const [a, b] = ROUNDS[round];
  const [moved, setMoved] = useState(0);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setMoved(0);
  }
  const need = 10 - a;
  const full = moved >= need;
  const total = a + b;
  const first: ("b" | "w" | null)[] = Array.from({ length: 10 }, (_, i) => (i < a ? "b" : i < a + moved ? "w" : null));
  const second: ("b" | "w" | null)[] = Array.from({ length: 10 }, (_, i) => (i < b - moved ? "w" : null));
  const options = shuffle([total, total - 1, total + 1], round + 3);

  const tapWhite = () => {
    if (full) return;
    sound("pop");
    setMoved((m) => Math.min(need, m + 1));
  };
  const pick = (n: number) => {
    if (n === total) win();
    else nudge();
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
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-3xl font-black">
            <span className="text-[#A86A3A]">{a}</span> + <span className="text-blue">{b}</span> = ?
          </span>
          <span className="text-base">{full ? T.full[lang] : T.move[lang]}</span>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Box eggs={first} label="first box" />
        <Box eggs={second} onTap={tapWhite} label="second box" />
      </div>
      <div className="mt-3 flex min-h-[3rem] flex-wrap items-center justify-center gap-2 text-lg font-bold text-ink">
        {full && (
          <>
            <span className="font-display">10 + {b - need}</span>
            <span className="text-muted">
              ({T.tenAnd[lang]} {b - need})
            </span>
          </>
        )}
      </div>
      {full && (
        <motion.div className="mt-2 flex justify-center gap-3" animate={shakeAnim(shake)}>
          {options.map((n) => (
            <button key={n} type="button" className="rounded-2xl" onClick={() => pick(n)} data-answer={n}>
              <NumBadge n={n} lang={lang} size="md" tone="coral" word={false} />
            </button>
          ))}
        </motion.div>
      )}
    </DemoShell>
  );
}
