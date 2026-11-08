"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { geez, numberWord } from "../numbers";
import { DemoShell, NumBadge, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Count the coffee beans" (level 1). Beans lie scattered on Grandma's tray. Tap each bean once:
  it hops into the counting line and gets its number, and the big number grows (digit, Ge'ez
  numeral and word). When every bean is counted, the child answers "How many?" by picking the
  last number said (cardinality). Rounds of 3, 5, 7 and 10 beans.
*/

const ROUNDS = [3, 5, 7, 10];

const T = {
  title: { en: "Count the coffee beans", am: "የቡና ፍሬዎቹን ቁጠሩ" },
  tap: { en: "Tap each bean once to count it.", am: "እያንዳንዱን ፍሬ አንድ ጊዜ ነክታችሁ ቁጠሩ።" },
  howMany: { en: "How many beans?", am: "ስንት ፍሬዎች ናቸው?" },
  hint: { en: "Look at the last number in the line!", am: "በመስመሩ የመጨረሻውን ቁጥር ተመልከቱ!" },
  summary: { en: "You counted 3, 5, 7 and 10 beans, touching each one once.", am: "እያንዳንዱን አንድ ጊዜ እየነካችሁ 3፣ 5፣ 7 እና 10 ፍሬዎችን ቆጠራችሁ።" },
} satisfies Record<string, L>;

/** Scattered spots on the tray (seeded, no two too close). */
function scatter(n: number, seed: number): [number, number][] {
  const cells = shuffle(
    Array.from({ length: 18 }, (_, i) => i),
    seed,
  ).slice(0, n);
  return cells.map((c, i) => {
    const col = c % 6;
    const row = Math.floor(c / 6);
    const jx = ((seed * 7 + i * 13) % 11) - 5;
    const jy = ((seed * 5 + i * 17) % 9) - 4;
    return [62 + col * 47 + jx, 48 + row * 40 + jy];
  });
}

function BeanShape({ glow }: { glow: boolean }) {
  return (
    <g>
      {glow && <circle r={17} fill="#FFE27A" opacity={0.6} />}
      <ellipse rx={13} ry={9} fill="#5A3320" />
      <path d="M-10 0 Q-3 -3 0 0 Q3 3 10 0" stroke="#2A160C" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <ellipse cx={-5} cy={-4} rx={4} ry={1.6} fill="#fff" opacity={0.25} />
    </g>
  );
}

export default function CountBeans({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const n = ROUNDS[round];
  const spots = useMemo(() => scatter(n, round + 3), [n, round]);
  const [order, setOrder] = useState<number[]>([]);
  const [shake, nudge] = useShake();
  const [hint, setHint] = useState(false);
  const [roundSeen, setRoundSeen] = useState(round);
  if (roundSeen !== round) {
    // A new round: clear the line (state reset during render, the React way).
    setRoundSeen(round);
    setOrder([]);
    setHint(false);
  }
  const counted = order.length;
  const all = counted === n;
  const choices = useMemo(() => shuffle([n, Math.max(1, n - 1) === n ? n + 2 : n - 1, n + 1], n * 3 + round), [n, round]);
  const slotX = (k: number) => 30 + k * 33;

  const tap = (i: number) => {
    if (order.includes(i) || all) return;
    sound("pop");
    setOrder((o) => [...o, i]);
  };
  const answer = (c: number) => {
    if (c === n) win();
    else {
      nudge();
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
      task={all ? T.howMany[lang] : T.tap[lang]}
    >
      <div className="flex min-h-[64px] items-center justify-center">
        <motion.div key={counted} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}>
          {counted > 0 ? <NumBadge n={counted} lang={lang} size="lg" /> : <span className="font-display text-4xl font-black text-line">0</span>}
        </motion.div>
      </div>
      <svg viewBox="0 0 360 250" className="mt-1 block w-full touch-manipulation select-none" role="group" aria-label={T.title[lang]}>
        {/* the woven tray */}
        <ellipse cx={180} cy={92} rx={170} ry={84} fill="#D9A55A" />
        <ellipse cx={180} cy={92} rx={154} ry={70} fill="none" stroke="#B88032" strokeWidth={4} strokeDasharray="10 6" />
        {/* the counting line */}
        <rect x={10} y={196} width={340} height={46} rx={14} fill="#FFF6E5" stroke="#E6DEC9" strokeWidth={2} />
        {Array.from({ length: n }, (_, k) => (
          <circle key={k} cx={slotX(k)} cy={222} r={13} fill="none" stroke="#E8B6A6" strokeWidth={2} strokeDasharray="4 3" />
        ))}
        {spots.map(([x, y], i) => {
          const k = order.indexOf(i);
          const placed = k >= 0;
          return (
            <motion.g
              key={`${round}-${i}`}
              initial={{ x, y, scale: 0 }}
              animate={placed ? { x: slotX(k), y: 222, scale: 0.85 } : { x, y, scale: 1.35 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: placed ? 0 : i * 0.05 }}
              onClick={() => tap(i)}
              style={{ cursor: placed ? "default" : "pointer" }}
              role="button"
              aria-label={placed ? `${k + 1}` : "bean"}
            >
              <circle r={22} fill="transparent" />
              <BeanShape glow={hint && placed && k === n - 1} />
            </motion.g>
          );
        })}
        {order.map((_, k) => (
          <motion.g key={`n-${round}-${k}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <text x={slotX(k)} y={206} fontSize={14} fontWeight={900} fill="#E8513B" textAnchor="middle" fontFamily="var(--font-grandstander)">
              {k + 1}
            </text>
          </motion.g>
        ))}
      </svg>
      {all && (
        <motion.div className="mt-2 flex flex-wrap items-center justify-center gap-2" animate={shakeAnim(shake)}>
          {choices.map((c) => (
            <button key={c} type="button" onClick={() => answer(c)} className="btn btn-plain min-w-[88px] px-3 py-2 text-2xl" aria-label={numberWord(c, lang)}>
              <span className="font-display font-black">{c}</span>
              <span className="font-ethiopic text-xl font-bold text-muted">{geez(c)}</span>
            </button>
          ))}
        </motion.div>
      )}
      {hint && all && <p className="mt-2 text-center text-sm font-bold text-coral">{T.hint[lang]}</p>}
    </DemoShell>
  );
}
