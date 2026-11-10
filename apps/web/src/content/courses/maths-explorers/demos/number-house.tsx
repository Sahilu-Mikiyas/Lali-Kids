"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "The number house" (fact families and missing numbers, level 1). Hooyo's number house holds a
  family: the whole on the roof and the two parts in the rooms. Under it are the family's four
  sums, each with one number missing. The child taps the missing box, then one of the family's
  numbers, to fill it in. Families: 15 (7, 8), 13 (4, 9), 11 (6, 5), 17 (9, 8).
*/

type Fam = { whole: number; a: number; b: number };
const ROUNDS: Fam[] = [
  { whole: 15, a: 7, b: 8 },
  { whole: 13, a: 4, b: 9 },
  { whole: 11, a: 6, b: 5 },
  { whole: 17, a: 9, b: 8 },
];

/** The four sums of a family, as [x, op, y, result] with the index of the blank. */
function sums({ whole, a, b }: Fam): { parts: [number, string, number, number]; blank: number }[] {
  return [
    { parts: [a, "+", b, whole], blank: 2 },
    { parts: [b, "+", a, whole], blank: 0 },
    { parts: [whole, "−", b, a], blank: 3 },
    { parts: [whole, "−", a, b], blank: 2 },
  ];
}

const T = {
  title: { en: "The number house", am: "የቁጥር ቤቱ" },
  task: { en: "Three numbers, one family, four sums! Fill in each missing number.", am: "ሦስት ቁጥሮች፣ አንድ ቤተሰብ፣ አራት ስሌቶች! የጎደለውን ቁጥር ሙሉ።" },
  pick: { en: "Which number goes here?", am: "እዚህ የትኛው ቁጥር ይገባል?" },
  summary: { en: "If you know 7 + 8 = 15, you also know 8 + 7, 15 − 8 and 15 − 7.", am: "7 + 8 = 15 መሆኑን ካወቃችሁ 8 + 7፣ 15 − 8 እና 15 − 7ንም ታውቃላችሁ።" },
} satisfies Record<string, L>;

export default function NumberHouse({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const fam = ROUNDS[round];
  const list = sums(fam);
  const [filled, setFilled] = useState<boolean[]>([false, false, false, false]);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setFilled([false, false, false, false]);
    setActive(0);
  }
  const chips = [fam.a, fam.b, fam.whole];
  const cell = (s: (typeof list)[number], i: number, k: number) =>
    k === s.blank && !filled[i] ? (
      <button type="button" onClick={() => setActive(i)} className={`h-9 w-12 rounded-xl border-[3px] border-dashed ${i === active ? "border-coral bg-white" : "border-line"}`} aria-label="?">
        ?
      </button>
    ) : (
      <span className={k === s.blank ? "text-coral" : "text-ink"}>{s.parts[k]}</span>
    );

  const choose = (n: number) => {
    const s = list[active];
    if (s.parts[s.blank] !== n) return nudge();
    sound("pop");
    const next = filled.map((f, i) => (i === active ? true : f));
    setFilled(next);
    const left = next.findIndex((f) => !f);
    if (left === -1) win();
    else setActive(left);
  };

  return (
    <DemoShell lang={lang} title={T.title} round={round} rounds={ROUNDS.length} cheer={cheer} finished={finished} summary={T.summary[lang]} onAgain={again} task={T.task[lang]}>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-center">
        <svg width={170} height={140} viewBox="-85 -80 170 140" aria-label={`${fam.whole}, ${fam.a}, ${fam.b}`}>
          <path d="M-74 -20 L0 -76 L74 -20Z" fill="#E8513B" />
          <rect x={-62} y={-20} width={124} height={74} rx={4} fill="#FFF6E2" stroke="#8A5A36" strokeWidth={2.4} />
          <path d="M0 -20 V54" stroke="#8A5A36" strokeWidth={2.4} />
          <text y={-34} fontSize={28} fontWeight={900} fill="#fff" textAnchor="middle" fontFamily="var(--font-grandstander), sans-serif">
            {fam.whole}
          </text>
          <text x={-31} y={28} fontSize={30} fontWeight={900} fill="#2F5BD3" textAnchor="middle" fontFamily="var(--font-grandstander), sans-serif">
            {fam.a}
          </text>
          <text x={31} y={28} fontSize={30} fontWeight={900} fill="#2E9A5A" textAnchor="middle" fontFamily="var(--font-grandstander), sans-serif">
            {fam.b}
          </text>
        </svg>
        <div className="flex flex-col gap-1.5">
          {list.map((s, i) => (
            <div key={i} className={`flex items-center justify-center gap-1.5 rounded-2xl px-3 py-1 font-display text-2xl font-black ${i === active && !filled[i] ? "bg-sky-soft" : "bg-white"}`} data-sum={i}>
              {cell(s, i, 0)}
              <span className="text-muted">{s.parts[1]}</span>
              {cell(s, i, 2)}
              <span className="text-muted">=</span>
              {cell(s, i, 3)}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-bold text-muted">{T.pick[lang]}</p>
      <motion.div className="mt-1 flex justify-center gap-3" animate={shakeAnim(shake)}>
        {chips.map((n) => (
          <button key={n} type="button" onClick={() => choose(n)} className="h-14 w-16 rounded-2xl border-[3px] border-blue bg-white font-display text-3xl font-black text-blue" data-chip={n}>
            {n}
          </button>
        ))}
      </motion.div>
    </DemoShell>
  );
}
