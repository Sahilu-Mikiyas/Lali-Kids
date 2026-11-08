"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, NumBadge, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "The hundred chart" (counting to 100, level 6). A 10 × 10 chart of the numbers 1 to 100.
  Each round asks for a run of numbers to tap in order: count by tens to 100 (they fall in one
  column), count by fives to 50 (a stripe of two columns), count by twos to 20, and find three
  numbers (47, the one after 59, and 99). Tapped numbers light up; a wrong tap wobbles and the
  hint says what to look for. The Ge'ez numeral of each lit number shows below.
*/

const ROUNDS: { seq: number[]; ask: L; hint: L }[] = [
  { seq: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ask: { en: "Count by tens: tap 10, 20, 30 … all the way to 100.", am: "በአሥር በአሥር ቁጠሩ፦ 10፣ 20፣ 30… እስከ 100 ንኩ።" }, hint: { en: "Tens are all in the last column.", am: "አሥሮቹ ሁሉ በመጨረሻው ዓምድ ውስጥ ናቸው።" } },
  { seq: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], ask: { en: "Count by fives: 5, 10, 15 … up to 50.", am: "በአምስት በአምስት ቁጠሩ፦ 5፣ 10፣ 15… እስከ 50።" }, hint: { en: "Fives end in 5 or 0.", am: "አምስቶቹ በ5 ወይም በ0 ያልቃሉ።" } },
  { seq: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], ask: { en: "Count by twos: 2, 4, 6 … up to 20.", am: "በሁለት በሁለት ቁጠሩ፦ 2፣ 4፣ 6… እስከ 20።" }, hint: { en: "Skip one number each time.", am: "በእያንዳንዱ ጊዜ አንድ ቁጥር ዝለሉ።" } },
  { seq: [47, 60, 99], ask: { en: "Find 47. Then the number after 59. Then 99.", am: "47ን ፈልጉ። ከዚያ ከ59 በኋላ ያለውን ቁጥር። ከዚያ 99ን።" }, hint: { en: "The first digit tells you the row: 47 is in the row of the forties.", am: "የመጀመሪያው አሃዝ ረድፉን ይነግራችኋል፦ 47 በአርባዎቹ ረድፍ ውስጥ ነው።" } },
];

const T = {
  title: { en: "The hundred chart", am: "የመቶ ሰንጠረዥ" },
  next: { en: "Next:", am: "ቀጣዩ፦" },
  summary: { en: "Tens go down one column, fives end in 5 or 0, and 100 is ten tens: ፻.", am: "አሥሮቹ በአንድ ዓምድ ይወርዳሉ፣ አምስቶቹ በ5 ወይም በ0 ያልቃሉ፣ 100 ደግሞ አሥር አሥሮች ነው፦ ፻።" },
} satisfies Record<string, L>;

export default function HundredChart({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const r = ROUNDS[round];
  const [k, setK] = useState(0);
  const [bad, setBad] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setK(0);
    setHint(false);
    setBad(null);
  }
  const lit = new Set(r.seq.slice(0, k));

  const tap = (n: number) => {
    if (k >= r.seq.length || lit.has(n)) return;
    if (n === r.seq[k]) {
      sound("pop");
      const next = k + 1;
      setK(next);
      setBad(null);
      if (next === r.seq.length) win();
    } else {
      nudge();
      setBad(n);
      setHint(true);
    }
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
        <span>
          {r.ask[lang]}
          {hint && <span className="block text-sm text-coral">{r.hint[lang]}</span>}
        </span>
      }
    >
      <motion.div className="mx-auto grid w-full max-w-[440px] grid-cols-10 gap-[3px] rounded-2xl bg-[#E6DEC9] p-1.5" animate={shakeAnim(shake)}>
        {Array.from({ length: 100 }, (_, i) => {
          const n = i + 1;
          const on = lit.has(n);
          return (
            <motion.button
              key={n}
              type="button"
              onClick={() => tap(n)}
              aria-label={String(n)}
              data-n={n}
              animate={bad === n ? { rotate: [0, -10, 10, 0] } : on ? { scale: [1, 1.25, 1] } : {}}
              className={`flex aspect-square items-center justify-center rounded-md font-display text-[11px] font-black sm:text-sm ${on ? "bg-coral text-white" : n % 10 === 0 ? "bg-[#FFF3DC] text-ink" : "bg-white text-ink"}`}
            >
              {n}
            </motion.button>
          );
        })}
      </motion.div>
      <div className="mt-2 flex min-h-[40px] flex-wrap items-center justify-center gap-1.5">
        {r.seq.slice(0, k).map((n) => (
          <motion.span key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-full bg-white px-2 py-0.5 font-ethiopic text-sm font-bold text-coral shadow">
            {geez(n)}
          </motion.span>
        ))}
        {k > 0 && k < r.seq.length && (
          <span className="ml-1 text-xs font-bold text-muted">
            {T.next[lang]} ?
          </span>
        )}
        {k === r.seq.length && <NumBadge n={r.seq[r.seq.length - 1]} lang={lang} size="sm" />}
      </div>
    </DemoShell>
  );
}
