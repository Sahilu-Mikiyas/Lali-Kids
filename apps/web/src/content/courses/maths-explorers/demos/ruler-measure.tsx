"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import {
  DemoShell,
  NumBadge,
  shakeAnim,
  shuffle,
  sound,
  useRounds,
  useShake,
  type L,
} from "./ui";

/*
  "Measure it with a ruler" (length, level 4). A thing lies above a 15 cm ruler and the child
  says how long it is (three choices). In two rounds the thing does not start at 0: a "slide it
  to 0" button lines it up, and the answer is the gap between its ends, not the number at the
  far end. Rounds: pencil 7 cm, ribbon 12 cm, spoon 9 cm starting at 3, leaf 5 cm starting at 4.
*/

type Thing = "pencil" | "ribbon" | "spoon" | "leaf";
type Round = { thing: Thing; len: number; start: number };
const ROUNDS: Round[] = [
  { thing: "pencil", len: 7, start: 0 },
  { thing: "ribbon", len: 12, start: 0 },
  { thing: "spoon", len: 9, start: 3 },
  { thing: "leaf", len: 5, start: 4 },
];

const T = {
  title: { en: "Measure it with a ruler", am: "በማስመሪያ ለኩት" },
  how: { en: "How long is the", am: "ርዝመቱ ስንት ነው?" },
  pencil: { en: "pencil", am: "እርሳሱ" },
  ribbon: { en: "ribbon", am: "ሪባኑ" },
  spoon: { en: "spoon", am: "ማንኪያው" },
  leaf: { en: "leaf", am: "ቅጠሉ" },
  off: {
    en: "It doesn't start at 0! Slide it, or count the gap.",
    am: "ከ0 አይጀምርም! አንሸራቱት፣ ወይም ክፍተቱን ቁጠሩ።",
  },
  zero: {
    en: "Line the end up with 0, then read the number.",
    am: "ጫፉን ከ0 ጋር አስተካክሉ፣ ከዚያ ቁጥሩን አንብቡ።",
  },
  slide: { en: "Slide it to 0", am: "ወደ 0 አንሸራቱት" },
  cm: { en: "cm", am: "ሳ.ሜ" },
  summary: {
    en: "Line the end up with 0, then read the number at the other end.",
    am: "ጫፉን ከ0 ጋር አስተካክሉ፣ ከዚያ በሌላኛው ጫፍ ያለውን ቁጥር አንብቡ።",
  },
} satisfies Record<string, L>;

const X0 = 20;
const PX = 21; // pixels per centimetre
const COLORS: Record<Thing, string> = {
  pencil: "#F5B21E",
  ribbon: "#E2463F",
  spoon: "#9AA8B8",
  leaf: "#3E9B5A",
};

function ThingShape({ thing, len }: { thing: Thing; len: number }) {
  const w = len * PX;
  const c = COLORS[thing];
  if (thing === "pencil")
    return (
      <g>
        <rect
          x={0}
          y={-8}
          width={w - 16}
          height={16}
          fill={c}
          stroke="#B8860B"
        />
        <rect x={0} y={-8} width={8} height={16} fill="#F28CA0" />
        <path d={`M${w - 16} -8 L${w} 0 L${w - 16} 8Z`} fill="#F2D2A6" />
        <path d={`M${w - 5} -3 L${w} 0 L${w - 5} 3Z`} fill="#2A2420" />
      </g>
    );
  if (thing === "spoon")
    return (
      <g>
        <rect x={0} y={-3} width={w - 30} height={6} rx={3} fill={c} />
        <ellipse cx={w - 15} cy={0} rx={15} ry={10} fill={c} />
      </g>
    );
  if (thing === "leaf")
    return (
      <g>
        <path d={`M0 0 Q${w / 2} -18 ${w} 0 Q${w / 2} 18 0 0Z`} fill={c} />
        <path d={`M0 0 H${w}`} stroke="#2E6A3A" strokeWidth={1.5} />
      </g>
    );
  return <path d={`M0 -6 H${w} L${w - 6} 0 L${w} 6 H0 L6 0Z`} fill={c} />;
}

export default function RulerMeasure({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(
    ROUNDS.length,
    onDone,
  );
  const { thing, len, start } = ROUNDS[round];
  const [slid, setSlid] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setSlid(false);
  }
  const at = slid ? 0 : start;
  const options = shuffle(
    start ? [len, start + len, len + 1] : [len, len + 1, len - 2],
    round + 3,
  );
  const pick = (n: number) => (n === len ? win() : nudge());
  const ticks = Array.from({ length: 16 }, (_, i) => i);
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
            {lang === "am"
              ? `${T[thing].am} ${T.how.am}`
              : `${T.how.en} ${T[thing].en}?`}
          </span>
          <span className="text-sm text-muted">
            {start && !slid ? T.off[lang] : T.zero[lang]}
          </span>
        </div>
      }
    >
      <svg
        viewBox="0 0 360 120"
        className="w-full rounded-2xl bg-[#FFF6E2]"
        role="img"
        aria-label={`${len}`}
        data-len={len}
        data-start={start}
      >
        <motion.g
          initial={false}
          animate={{ x: X0 + at * PX }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <g transform="translate(0 44)">
            <ThingShape thing={thing} len={len} />
          </g>
        </motion.g>
        <rect
          x={X0 - 10}
          y={62}
          width={15 * PX + 20}
          height={46}
          rx={6}
          fill="#F5D27A"
          stroke="#C9A040"
        />
        {ticks.map((i) => (
          <g key={i}>
            <path
              d={`M${X0 + i * PX} 62 V${i % 5 ? 74 : 80}`}
              stroke="#5A3A1A"
              strokeWidth={1.6}
            />
            <text
              x={X0 + i * PX}
              y={96}
              fontSize={11}
              textAnchor="middle"
              fontWeight={900}
              fill="#5A3A1A"
            >
              {i}
            </text>
          </g>
        ))}
        <path
          d={`M${X0 + at * PX} 30 V62`}
          stroke="#2F5BD3"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
        <path
          d={`M${X0 + (at + len) * PX} 30 V62`}
          stroke="#E8513B"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
      </svg>
      {start > 0 && !slid && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            className="btn btn-plain"
            onClick={() => {
              sound("pop");
              setSlid(true);
            }}
            data-slide
          >
            ← {T.slide[lang]}
          </button>
        </div>
      )}
      <motion.div
        className="mt-3 flex flex-wrap justify-center gap-3"
        animate={shakeAnim(shake)}
      >
        {options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => pick(n)}
            className="flex items-center gap-1 rounded-2xl"
            data-answer={n}
          >
            <NumBadge n={n} lang={lang} size="md" word={false} />
            <span className="font-bold text-muted">{T.cm[lang]}</span>
          </button>
        ))}
      </motion.div>
    </DemoShell>
  );
}
