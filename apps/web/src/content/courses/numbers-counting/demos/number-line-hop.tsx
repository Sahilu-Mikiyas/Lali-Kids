"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { GuguShape } from "@/components/characters";
import type { DemoProps } from "../../types";
import { geez } from "../numbers";
import { DemoShell, NumBadge, sound, useRounds, type L } from "./ui";

/*
  "Number line hop" with Gugu (level 3). Eleven stepping stones cross the river (0 to 10, and
  later 10 to 20). Each round asks for a stone: a number, one more, one less, or the number
  between two others. The child taps a stone; if it is right, Gugu hops there stone by stone,
  counting each hop, so "one more" is literally one hop forward. A wrong stone wobbles and the
  hint shows where to start counting from.
*/

type Task = { from: number; base: number; start: number; answer: number; ask: L; hint: L };

const TASKS: Task[] = [
  { from: 0, base: 0, start: 0, answer: 4, ask: { en: "Hop to stone 4!", am: "ወደ 4 ቁጥር ድንጋይ ዝለሉ!" }, hint: { en: "Count the hops from 0: 1, 2, 3, 4.", am: "ከ0 ጀምሮ ዝላዮቹን ቁጠሩ፦ 1፣ 2፣ 3፣ 4።" } },
  { from: 0, base: 4, start: 4, answer: 5, ask: { en: "One more than 4: one hop forward!", am: "ከ4 አንድ የሚበልጠው፦ አንድ ዝላይ ወደ ፊት!" }, hint: { en: "Just one hop, forward.", am: "አንድ ዝላይ ብቻ፣ ወደ ፊት።" } },
  { from: 0, base: 8, start: 8, answer: 7, ask: { en: "One less than 8: one hop back!", am: "ከ8 አንድ የሚያንሰው፦ አንድ ዝላይ ወደ ኋላ!" }, hint: { en: "Just one hop, back toward 0.", am: "አንድ ዝላይ ብቻ፣ ወደ 0 በኩል።" } },
  { from: 0, base: 7, start: 3, answer: 6, ask: { en: "Which number is between 5 and 7?", am: "በ5 እና በ7 መካከል ያለው ቁጥር የትኛው ነው?" }, hint: { en: "It comes after 5 and before 7.", am: "ከ5 በኋላ፣ ከ7 በፊት ይመጣል።" } },
  { from: 10, base: 10, start: 10, answer: 13, ask: { en: "Ten and three more: hop to 13!", am: "አሥርና ሦስት ተጨማሪ፦ ወደ 13 ዝለሉ!" }, hint: { en: "Start at 10 and hop three times.", am: "ከ10 ጀምራችሁ ሦስት ጊዜ ዝለሉ።" } },
  { from: 10, base: 15, start: 15, answer: 16, ask: { en: "One more than 15!", am: "ከ15 አንድ የሚበልጠው!" }, hint: { en: "One hop forward from 15.", am: "ከ15 አንድ ዝላይ ወደ ፊት።" } },
  { from: 10, base: 20, start: 20, answer: 19, ask: { en: "One less than 20!", am: "ከ20 አንድ የሚያንሰው!" }, hint: { en: "One hop back from 20.", am: "ከ20 አንድ ዝላይ ወደ ኋላ።" } },
];

const T = {
  title: { en: "Hop with Gugu", am: "ከጉጉ ጋር ዝለሉ" },
  tapStone: { en: "Tap the stone.", am: "ድንጋዩን ንኩ።" },
  summary: { en: "One more is a hop forward, one less is a hop back. Bigger numbers are further along!", am: "አንድ መጨመር ወደ ፊት አንድ ዝላይ፣ አንድ መቀነስ ወደ ኋላ አንድ ዝላይ ነው። ትልልቅ ቁጥሮች ራቅ ብለው ይገኛሉ!" },
} satisfies Record<string, L>;

const sx = (k: number) => 22 + k * 35.6;
const sy = (k: number) => 120 + Math.sin(k * 0.9) * 6;

export default function NumberLineHop({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(TASKS.length, onDone, 1200);
  const task = TASKS[round];
  const [pos, setPos] = useState(task.start);
  const [wobble, setWobble] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [moving, setMoving] = useState(false);
  const [seen, setSeen] = useState(round);
  const x = useMotionValue(sx(task.start - task.from));
  const y = useMotionValue(sy(task.start - task.from));
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  if (seen !== round) {
    setSeen(round);
    setPos(task.start);
    setHint(false);
    setWobble(null);
  }
  useEffect(() => {
    x.set(sx(task.start - task.from));
    y.set(sy(task.start - task.from));
  }, [round, task, x, y]);

  const hopTo = async (target: number) => {
    setMoving(true);
    let at = pos;
    while (at !== target && alive.current) {
      at += target > at ? 1 : -1;
      const k = at - task.from;
      sound("boing");
      await Promise.all([animate(x, sx(k), { duration: 0.32, ease: "easeInOut" }), animate(y, [y.get(), sy(k) - 22, sy(k)], { duration: 0.32, ease: "easeOut" })]);
      if (alive.current) setPos(at);
    }
    if (alive.current) setMoving(false);
  };

  const tap = async (n: number) => {
    if (moving || n === pos) return;
    if (n === task.answer) {
      setHint(false);
      await hopTo(n);
      win();
    } else {
      sound("boing");
      setWobble(n);
      setHint(true);
      setTimeout(() => setWobble(null), 500);
    }
  };

  const stones = Array.from({ length: 11 }, (_, k) => task.from + k);
  return (
    <DemoShell
      lang={lang}
      title={T.title}
      round={round}
      rounds={TASKS.length}
      cheer={cheer}
      finished={finished}
      summary={T.summary[lang]}
      onAgain={again}
      task={
        <span>
          {task.ask[lang]}
          <span className="block text-sm font-semibold text-muted">{hint ? <span className="text-coral">{task.hint[lang]}</span> : T.tapStone[lang]}</span>
        </span>
      }
    >
      <div className="mb-2 flex justify-center">
        <NumBadge n={pos} lang={lang} tone="teal" />
      </div>
      <svg viewBox="0 50 400 120" className="block w-full touch-manipulation select-none">
        <rect x={0} y={50} width={400} height={120} rx={20} fill="#5BB8E8" />
        <path d="M0 150 Q100 140 200 150 T400 150 L400 170 L0 170Z" fill="#3E98D0" />
        <path d="M30 70 q12 -5 24 0 M300 64 q12 -5 24 0 M170 80 q12 -5 24 0" stroke="#fff" strokeWidth={2} opacity={0.5} fill="none" strokeLinecap="round" />
        {stones.map((n, k) => (
          <motion.g key={n} onClick={() => tap(n)} style={{ cursor: "pointer" }} role="button" aria-label={`${n}`} animate={wobble === n ? { rotate: [0, -12, 12, -6, 0] } : { rotate: 0 }} transition={{ duration: 0.45 }}>
            <rect x={sx(k) - 17} y={sy(k) - 40} width={34} height={64} fill="transparent" />
            <ellipse cx={sx(k)} cy={sy(k) + 4} rx={16} ry={7} fill="#000" opacity={0.18} />
            <ellipse cx={sx(k)} cy={sy(k)} rx={17} ry={9} fill={n === pos ? "#FFE27A" : "#C9C3D2"} stroke="#9C98A6" strokeWidth={1.2} />
            <text x={sx(k)} y={sy(k) + 4.5} fontSize={n >= 10 ? 13 : 15} fontWeight={900} fill="#2A2414" textAnchor="middle" fontFamily="var(--font-grandstander)">
              {n}
            </text>
            <text x={sx(k)} y={sy(k) + 27} fontSize={13} fontWeight={700} fill="#123A5A" textAnchor="middle" fontFamily="var(--font-noto-ethiopic)">
              {n === 0 ? "" : geez(n)}
            </text>
          </motion.g>
        ))}
        <motion.g style={{ x, y }}>
          <g transform="scale(0.25) translate(-100 -230)" pointerEvents="none">
            <GuguShape pose="hop" mood="joy" />
          </g>
        </motion.g>
      </svg>
    </DemoShell>
  );
}
