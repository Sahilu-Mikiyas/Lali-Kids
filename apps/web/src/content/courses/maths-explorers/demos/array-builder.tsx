"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Set out the chairs" (arrays, level 2). The wedding tent needs chairs in equal rows. The card
  asks for, say, 3 rows of 5; the child changes the number of rows and the chairs in each row
  until the array matches, then says how many chairs there are (the running count shows at
  the end of each row). The last round asks for 5 rows of 3 after 3 rows of 5: the same 15.
  Arrays: 3 × 5, 2 × 10, 4 × 5, 5 × 2, 5 × 3.
*/

const ROUNDS: [number, number][] = [
  [3, 5],
  [2, 10],
  [4, 5],
  [5, 2],
  [5, 3],
];

const T = {
  title: { en: "Set out the chairs", am: "ወንበሮቹን አስቀምጡ" },
  rows: { en: "rows", am: "ረድፎች" },
  inRow: { en: "in each row", am: "በእያንዳንዱ ረድፍ" },
  make: { en: "Make", am: "ሥሩ፦" },
  of: { en: "rows of", am: "ረድፎች፣ በእያንዳንዱ" },
  how: { en: "Equal rows! How many chairs?", am: "እኩል ረድፎች! ስንት ወንበሮች?" },
  turn: { en: "Turn it round: still the same number?", am: "ብታዞሩትስ፦ ያው ቁጥር ነው?" },
  summary: { en: "Equal rows make counting quick: 3 rows of 5 and 5 rows of 3 are both 15.", am: "እኩል ረድፎች ቆጠራን ያፈጥናሉ፦ 3 የ5 ረድፎችና 5 የ3 ረድፎች ሁለቱም 15 ናቸው።" },
} satisfies Record<string, L>;

function ChairIcon({ color }: { color: string }) {
  return (
    <svg width={20} height={22} viewBox="-10 -30 20 32" aria-hidden>
      <path d="M-8 0 L-7 -12 M8 0 L7 -12" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={-9} y={-15} width={18} height={5} rx={2} fill={color} stroke="#00000022" strokeWidth={0.6} />
      <path d="M-8 -14 Q-9 -28 0 -29 Q9 -28 8 -14" fill={color} stroke="#00000022" strokeWidth={0.6} />
    </svg>
  );
}

const COLORS = ["#E2463F", "#FFD233", "#7FC8F0"];

function Stepper({ label, value, set, max }: { label: string; value: number; set: (n: number) => void; max: number }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl bg-white px-2 py-1">
      <button type="button" className="btn btn-plain h-10 w-10 !p-0 text-xl" onClick={() => {
          sound("boing");
          set(Math.max(1, value - 1));
        }} aria-label={`${label} −`}>
        −
      </button>
      <span className="min-w-[4.5rem] text-center text-sm font-bold">
        <span className="font-display text-2xl font-black text-ink">{value}</span> {label}
      </span>
      <button type="button" className="btn btn-primary h-10 w-10 !p-0 text-xl" onClick={() => {
          sound("pop");
          set(Math.min(max, value + 1));
        }} aria-label={`${label} +`} data-plus={label}>
        +
      </button>
    </div>
  );
}

export default function ArrayBuilder({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const [tr, tc] = ROUNDS[round];
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setRows(1);
    setCols(1);
  }
  const ready = rows === tr && cols === tc;
  const total = tr * tc;
  const options = shuffle([total, total + tc, Math.max(1, total - tr)], round + 11);
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
          <span>
            {T.make[lang]} <span className="font-display text-2xl font-black text-blue">{tr}</span> {T.of[lang]} <span className="font-display text-2xl font-black text-coral">{tc}</span>
          </span>
          {round === ROUNDS.length - 1 && <span className="text-sm text-muted">{T.turn[lang]}</span>}
        </div>
      }
    >
      <div className="flex min-h-[150px] flex-col items-center justify-center gap-1 rounded-3xl bg-[#E7F2DC] p-2" data-array={`${rows}x${cols}`} data-target={`${tr}x${tc}`}>
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className="flex items-end gap-0.5">
            {Array.from({ length: cols }, (_, c) => (
              <motion.span key={c} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <ChairIcon color={COLORS[(r + c) % 3]} />
              </motion.span>
            ))}
            <span className="ml-2 w-8 font-display text-base font-black text-blue">{(r + 1) * cols}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Stepper label={T.rows[lang]} value={rows} set={setRows} max={6} />
        <Stepper label={T.inRow[lang]} value={cols} set={setCols} max={10} />
      </div>
      {ready && (
        <div className="mt-3 text-center">
          <p className="font-bold">
            {T.how[lang]} <span className="font-display">{tr} × {tc}</span>
          </p>
          <motion.div className="mt-2 flex justify-center gap-3" animate={shakeAnim(shake)}>
            {options.map((n) => (
              <button key={n} type="button" onClick={() => pick(n)} className="rounded-2xl" data-answer={n}>
                <NumBadge n={n} lang={lang} size="md" word={false} />
              </button>
            ))}
          </motion.div>
        </div>
      )}
    </DemoShell>
  );
}
