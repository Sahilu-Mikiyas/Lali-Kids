"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, sound, useRounds, useShake } from "./ui";

/*
  "More or less" on the market balance (level 3). The left pan holds the seller's oranges; the
  child adds or takes away oranges on the right pan with + and −. The beam tips toward the side
  with more, levels when they are the same, and the sign between the two numbers (<, =, >) and
  the words change as they play. Each round asks for MORE, the SAME, or LESS on the right, and
  the child presses "Check" when they think it is right.
*/

type Goal = "more" | "same" | "less";
const ROUNDS: { left: number; goal: Goal }[] = [
  { left: 3, goal: "same" },
  { left: 4, goal: "more" },
  { left: 6, goal: "less" },
  { left: 8, goal: "same" },
];

const T = {
  title: { en: "More or less?", am: "ይበዛል ወይስ ያንሳል?" },
  ask: {
    en: { more: "Put MORE oranges on the right side.", same: "Make both sides the SAME.", less: "Put LESS oranges on the right side." },
    am: { more: "በቀኝ በኩል ብዙ ብርቱካኖች አስቀምጡ።", same: "ሁለቱንም ጎኖች እኩል አድርጉ።", less: "በቀኝ በኩል ጥቂት ብርቱካኖች አስቀምጡ።" },
  },
  check: { en: "Check", am: "አረጋግጡ" },
  more: { en: "the right has more", am: "ቀኙ ይበዛል" },
  less: { en: "the right has less", am: "ቀኙ ያንሳል" },
  same: { en: "the same!", am: "እኩል ነው!" },
  notYet: { en: "Not yet: look at which side goes down.", am: "ገና ነው፦ የትኛው ጎን እንደሚወርድ ተመልከቱ።" },
  add: { en: "Add an orange", am: "ብርቱካን ጨምሩ" },
  take: { en: "Take an orange away", am: "ብርቱካን አንሱ" },
  summary: { en: "The side with more goes down. When both sides are the same, the balance is level.", am: "ብዙ ያለው ጎን ይወርዳል። ሁለቱም ጎኖች እኩል ሲሆኑ ሚዛኑ ቀጥ ይላል።" },
};

/** Orange spots in a pan: a little heap. */
function heap(n: number): [number, number][] {
  const out: [number, number][] = [];
  const rows = [4, 3, 2, 1];
  let left = n;
  let r = 0;
  while (left > 0 && r < rows.length) {
    const k = Math.min(rows[r], left);
    for (let i = 0; i < k; i++) out.push([(i - (k - 1) / 2) * 15, -r * 12]);
    left -= k;
    r++;
  }
  return out;
}

function Pan({ n, x }: { n: number; x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M0 0 L-34 46 M0 0 L34 46" stroke="#6A5A4A" strokeWidth={1.6} />
      <path d="M-42 46 Q0 68 42 46Z" fill="#C9A26A" stroke="#9A7440" strokeWidth={2} />
      {heap(n).map(([dx, dy], i) => (
        <motion.g key={i} initial={{ scale: 0, y: -30 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
          <circle cx={dx} cy={38 + dy} r={7.5} fill="#F5961E" />
          <circle cx={dx - 2.4} cy={35.6 + dy} r={2.2} fill="#fff" opacity={0.35} />
        </motion.g>
      ))}
    </g>
  );
}

export default function BalanceScale({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const { left, goal } = ROUNDS[round];
  const [right, setRight] = useState(0);
  const [seen, setSeen] = useState(round);
  const [missed, setMissed] = useState(false);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setRight(0);
    setMissed(false);
  }
  const diff = right - left;
  const tilt = Math.max(-16, Math.min(16, diff * 4));
  const sign = diff > 0 ? "<" : diff < 0 ? ">" : "=";
  const words = diff > 0 ? T.more : diff < 0 ? T.less : T.same;

  const change = (k: number) => {
    const next = Math.max(0, Math.min(10, right + k));
    if (next === right) return;
    sound(k > 0 ? "pop" : "boing");
    setRight(next);
    setMissed(false);
  };
  const check = () => {
    const ok = goal === "more" ? diff > 0 : goal === "less" ? diff < 0 : diff === 0;
    if (ok) win();
    else {
      nudge();
      setMissed(true);
    }
  };

  return (
    <DemoShell lang={lang} title={T.title} round={round} rounds={ROUNDS.length} cheer={cheer} finished={finished} summary={T.summary[lang]} onAgain={again} task={T.ask[lang][goal]}>
      <svg viewBox="0 0 360 190" className="block w-full select-none" aria-hidden>
        <rect x={0} y={0} width={360} height={190} rx={20} fill="#FFF3DC" />
        <rect x={172} y={64} width={16} height={110} rx={4} fill="#7A5236" />
        <path d="M140 178 H220 L210 166 H150Z" fill="#6A4028" />
        <motion.g animate={{ rotate: tilt }} transition={{ type: "spring", stiffness: 120, damping: 12 }} style={{ originX: "180px", originY: "64px", transformBox: "view-box" }}>
          <rect x={86} y={60} width={188} height={8} rx={4} fill="#9A6A44" />
          <motion.g animate={{ rotate: -tilt }} transition={{ type: "spring", stiffness: 120, damping: 12 }} style={{ originX: "92px", originY: "64px", transformBox: "view-box" }}>
            <g transform="translate(0 64)">
              <Pan n={left} x={92} />
            </g>
          </motion.g>
          <motion.g animate={{ rotate: -tilt }} transition={{ type: "spring", stiffness: 120, damping: 12 }} style={{ originX: "268px", originY: "64px", transformBox: "view-box" }}>
            <g transform="translate(0 64)">
              <Pan n={right} x={268} />
            </g>
          </motion.g>
        </motion.g>
        <circle cx={180} cy={64} r={7} fill="#F5B21E" stroke="#B88A2A" strokeWidth={2} />
      </svg>
      <div className="mt-1 flex items-center justify-center gap-3">
        <NumBadge n={left} lang={lang} size="sm" word={false} />
        <motion.span key={sign} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="font-display text-3xl font-black text-blue">
          {sign}
        </motion.span>
        <NumBadge n={right} lang={lang} size="sm" tone="teal" word={false} />
      </div>
      <p className={`mt-1 text-center text-sm font-bold ${diff === 0 ? "text-teal" : "text-muted"}`}>{words[lang]}</p>
      <motion.div className="mt-2 flex items-center justify-center gap-3" animate={shakeAnim(shake)}>
        <button type="button" className="btn btn-plain h-14 w-14 p-0 text-3xl" onClick={() => change(-1)} aria-label={T.take[lang]}>
          −
        </button>
        <button type="button" className="btn btn-primary px-5" onClick={check}>
          {T.check[lang]}
        </button>
        <button type="button" className="btn btn-plain h-14 w-14 p-0 text-3xl" onClick={() => change(1)} aria-label={T.add[lang]} data-add>
          +
        </button>
      </motion.div>
      {missed && <p className="mt-2 text-center text-sm font-bold text-coral">{T.notYet[lang]}</p>}
    </DemoShell>
  );
}
