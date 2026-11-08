"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "What comes next?" (level 2, with "The Teff Harvest Patterns"). Grandma is weaving a basket
  border. A pattern repeats along it and the last two places are empty: the child picks what
  comes next, twice. The rounds grow from colours (red, yellow) to an AAB rhythm, to shapes
  (circle, triangle, square), to sizes (big, small).
*/

type Bead = { kind: "dot" | "tri" | "sq"; color: string; size: number };
const R: Bead = { kind: "dot", color: "#E2463F", size: 1 };
const Y: Bead = { kind: "dot", color: "#F5B21E", size: 1 };
const G: Bead = { kind: "dot", color: "#2E9A5A", size: 1 };
const C: Bead = { kind: "dot", color: "#2F5BD3", size: 1 };
const TRI: Bead = { kind: "tri", color: "#2F5BD3", size: 1 };
const SQ: Bead = { kind: "sq", color: "#2E9A5A", size: 1 };
const BIG: Bead = { kind: "dot", color: "#B5653A", size: 1.25 };
const SMALL: Bead = { kind: "dot", color: "#B5653A", size: 0.6 };

const ROUNDS: { unit: Bead[]; shown: number; options: Bead[]; say: L }[] = [
  { unit: [R, Y], shown: 6, options: [R, Y, G], say: { en: "red, yellow, red, yellow…", am: "ቀይ፣ ቢጫ፣ ቀይ፣ ቢጫ…" } },
  { unit: [R, R, Y], shown: 7, options: [R, Y, G], say: { en: "red, red, yellow…", am: "ቀይ፣ ቀይ፣ ቢጫ…" } },
  { unit: [C, TRI, SQ], shown: 6, options: [SQ, C, TRI], say: { en: "circle, triangle, square…", am: "ክብ፣ ሦስት ማዕዘን፣ ካሬ…" } },
  { unit: [BIG, SMALL], shown: 6, options: [BIG, SMALL, G], say: { en: "big, small, big, small…", am: "ትልቅ፣ ትንሽ፣ ትልቅ፣ ትንሽ…" } },
];

const T = {
  title: { en: "What comes next?", am: "ቀጥሎ ምን ይመጣል?" },
  pick: { en: "Look, and guess! Tap what comes next.", am: "ተመልከቱና ገምቱ! ቀጥሎ የሚመጣውን ንኩ።" },
  summary: { en: "A pattern is something that repeats. You found what comes next in 4 patterns.", am: "ስርዓተ ጥለት ደጋግሞ የሚመጣ ነገር ነው። በ4 ጥለቶች ቀጥሎ የሚመጣውን አገኛችሁ።" },
} satisfies Record<string, L>;

const same = (a: Bead, b: Bead) => a.kind === b.kind && a.color === b.color && a.size === b.size;

function BeadShape({ b, r = 15 }: { b: Bead; r?: number }) {
  const s = r * b.size;
  return (
    <svg width={2 * r * 1.3} height={2 * r * 1.3} viewBox={`${-r * 1.3} ${-r * 1.3} ${2.6 * r} ${2.6 * r}`} aria-hidden>
      {b.kind === "dot" && <circle r={s} fill={b.color} stroke="#fff" strokeWidth={2} />}
      {b.kind === "tri" && <path d={`M0 ${-s} L${s} ${s * 0.8} L${-s} ${s * 0.8}Z`} fill={b.color} stroke="#fff" strokeWidth={2} strokeLinejoin="round" />}
      {b.kind === "sq" && <rect x={-s * 0.85} y={-s * 0.85} width={s * 1.7} height={s * 1.7} rx={3} fill={b.color} stroke="#fff" strokeWidth={2} />}
    </svg>
  );
}

export default function PatternBasket({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const r = ROUNDS[round];
  const seq = Array.from({ length: r.shown + 2 }, (_, i) => r.unit[i % r.unit.length]);
  const [filled, setFilled] = useState(0);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setFilled(0);
  }

  const pick = (b: Bead) => {
    if (filled >= 2) return;
    if (same(b, seq[r.shown + filled])) {
      sound("pop");
      const next = filled + 1;
      setFilled(next);
      if (next === 2) setTimeout(() => win(), 400);
    } else nudge();
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
          {T.pick[lang]}
          <span className="block text-sm font-semibold text-muted">{r.say[lang]}</span>
        </span>
      }
    >
      <motion.div className="flex flex-wrap items-center justify-center gap-0.5 rounded-3xl sm:gap-1 border-4 border-[#B88032] bg-[#D9A55A] px-2 py-3" animate={shakeAnim(shake)}>
        {seq.map((b, i) => {
          const blank = i >= r.shown + filled;
          return (
            <div key={`${round}-${i}`} className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 ${blank ? "border-2 border-dashed border-white/80 bg-white/20" : ""}`}>
              <AnimatePresence>
                {!blank && (
                  <motion.div initial={i >= r.shown ? { scale: 0, y: -20 } : false} animate={{ scale: 1, y: 0 }}>
                    <BeadShape b={b} r={12} />
                  </motion.div>
                )}
              </AnimatePresence>
              {blank && i === r.shown + filled && <motion.span className="text-lg font-black text-white" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>?</motion.span>}
            </div>
          );
        })}
      </motion.div>
      <div className="mt-4 flex items-center justify-center gap-3">
        {r.options.map((b, i) => (
          <motion.button key={i} type="button" whileTap={{ scale: 0.9 }} onClick={() => pick(b)} className="btn btn-plain h-16 w-16 p-0" aria-label={`${i + 1}`}>
            <BeadShape b={b} r={16} />
          </motion.button>
        ))}
      </div>
    </DemoShell>
  );
}
