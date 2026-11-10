"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Hop in twos, fives and tens" (skip-counting, level 2). Lali hops along a number line in
  equal jumps. Each time, the child taps the number where the next hop lands (three choices);
  each correct tap draws the arc and Lali flies there. Rounds: twos from 0 to 12, fives from 0
  to 30, tens from 0 to 60, twos from 10 to 20.
*/

type Round = { from: number; step: number; to: number };
const ROUNDS: Round[] = [
  { from: 0, step: 2, to: 12 },
  { from: 0, step: 5, to: 30 },
  { from: 0, step: 10, to: 60 },
  { from: 10, step: 2, to: 20 },
];

const T = {
  title: { en: "Hop in twos, fives and tens", am: "በሁለት፣ በአምስትና በአሥር ዝለሉ" },
  hop: { en: "Hop in", am: "በ… ዝለሉ፦" },
  s: { en: "s", am: "" },
  where: { en: "Where does Lali land next?", am: "ላሊ ቀጥሎ የት ታርፋለች?" },
  summary: { en: "Twos: 2, 4, 6, 8. Fives end in 5 or 0. Tens end in 0.", am: "ሁለቶች፦ 2፣ 4፣ 6፣ 8። አምስቶች በ5 ወይም በ0 ያልቃሉ። አሥሮች በ0 ያልቃሉ።" },
} satisfies Record<string, L>;

const W = 340;

export default function SkipJumps({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const { from, step, to } = ROUNDS[round];
  const [at, setAt] = useState(from);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setAt(from);
  }
  const x = (n: number) => 20 + ((n - from) / (to - from)) * (W - 40);
  const next = at + step;
  const options = shuffle([next, next + (step === 2 ? 1 : step === 5 ? 2 : 5), Math.max(from + 1, next - 1)], at + round * 13);
  const hops: number[] = [];
  for (let n = from + step; n <= at; n += step) hops.push(n);

  const pick = (n: number) => {
    if (n !== next) return nudge();
    sound("pop");
    setAt(n);
    if (n >= to) win();
  };
  const tickEvery = step === 2 ? 1 : step === 5 ? 5 : 10;
  const ticks: number[] = [];
  for (let n = from; n <= to; n += tickEvery) ticks.push(n);

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
        <div className="flex flex-col items-center">
          <span>
            {lang === "en" ? (
              <>
                {T.hop.en} <b className="font-display text-2xl text-coral">{step}</b>
                {T.s.en}
              </>
            ) : (
              <>
                በ<b className="font-display text-2xl text-coral">{step}</b> በ<b className="font-display text-2xl text-coral">{step}</b> ዝለሉ
              </>
            )}
          </span>
          <span className="text-sm text-muted">{T.where[lang]}</span>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-[520px]">
        <svg viewBox={`0 0 ${W} 120`} className="block w-full" aria-label={`${at}`}>
          <rect x={4} y={70} width={W - 8} height={44} rx={12} fill="#FFFDF4" />
          <path d={`M14 84 H${W - 14}`} stroke="#1B2A4E" strokeWidth={3} strokeLinecap="round" />
          {ticks.map((n) => (
            <g key={n}>
              <path d={`M${x(n)} 78 V90`} stroke="#1B2A4E" strokeWidth={2} />
              <text x={x(n)} y={106} fontSize={11} fontWeight={900} textAnchor="middle" fill={hops.includes(n) || n === from ? "#E8513B" : "#1B2A4E"} fontFamily="var(--font-grandstander), sans-serif">
                {n}
              </text>
            </g>
          ))}
          {hops.map((n) => {
            const a = x(n - step);
            const b = x(n);
            return (
              <g key={n}>
                <motion.path d={`M${a} 80 Q${(a + b) / 2} ${80 - Math.min(50, (b - a) * 0.9)} ${b} 80`} stroke="#E8513B" strokeWidth={2.4} fill="none" strokeDasharray="5 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                <text x={(a + b) / 2} y={80 - Math.min(50, (b - a) * 0.9) / 2 - 6} fontSize={10} fontWeight={900} fill="#E8513B" textAnchor="middle" fontFamily="var(--font-grandstander), sans-serif">
                  +{step}
                </text>
              </g>
            );
          })}
          <motion.g initial={false} animate={{ x: x(at) - 12, y: 52 }} transition={{ type: "spring", stiffness: 160, damping: 14 }}>
            <ellipse cx={12} cy={12} rx={10} ry={8} fill="#FFC83D" />
            <path d="M8 5 Q7 12 8 19 M13 4 Q12 12 13 20" stroke="#1B2A4E" strokeWidth={2.4} fill="none" />
            <circle cx={21} cy={11} r={5} fill="#1B2A4E" />
            <circle cx={22.4} cy={9.6} r={1.6} fill="#fff" />
            <ellipse cx={9} cy={2} rx={6} ry={4} fill="#E3F6FF" stroke="#1B2A4E" strokeWidth={1} />
          </motion.g>
        </svg>
      </div>
      <p className="text-center font-display text-lg font-black text-ink" aria-live="polite">
        {[from, ...hops].join(", ")} <span className="font-ethiopic text-base text-muted">{at ? geez(at) : ""}</span>
      </p>
      <motion.div className="mt-2 flex justify-center gap-3" animate={shakeAnim(shake)}>
        {options.map((n) => (
          <button key={`${at}-${n}`} type="button" onClick={() => pick(n)} className="h-14 w-16 rounded-2xl border-[3px] border-coral bg-white font-display text-2xl font-black text-coral" data-answer={n}>
            {n}
          </button>
        ))}
      </motion.div>
    </DemoShell>
  );
}
