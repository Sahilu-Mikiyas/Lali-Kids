"use client";

import { LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, NumBadge, shakeAnim, shuffle, sound, useRounds, useShake, type L } from "./ui";

/*
  "Smallest to biggest" (level 2). Things from Grandma's house lie mixed up; the child taps them
  in order (smallest first, shortest first, or, to keep children thinking, biggest first) and
  each one moves into the line with its place number. A wrong tap wiggles and says what to look
  for. Rounds: injera (3), sticks (4), sheep biggest first (3), teff stalks (5).
*/

type Kind = "injera" | "stick" | "sheep" | "teff";
type Round = { kind: Kind; sizes: number[]; dir: "up" | "down"; ask: L; hint: L };

const ROUNDS: Round[] = [
  { kind: "injera", sizes: [0.5, 0.75, 1], dir: "up", ask: { en: "Smallest injera first, up to the biggest.", am: "ከትንሹ እንጀራ ጀምሮ እስከ ትልቁ።" }, hint: { en: "Find the smallest one left!", am: "ከቀሩት ትንሹን ፈልጉ!" } },
  { kind: "stick", sizes: [0.35, 0.55, 0.78, 1], dir: "up", ask: { en: "Shortest stick first, up to the longest.", am: "ከአጭሩ እንጨት ጀምሮ እስከ ረጅሙ።" }, hint: { en: "Find the shortest one left!", am: "ከቀሩት አጭሩን ፈልጉ!" } },
  { kind: "sheep", sizes: [0.55, 0.78, 1], dir: "down", ask: { en: "Now the other way: biggest sheep first!", am: "አሁን በተቃራኒው፦ ትልቁ በግ መጀመሪያ!" }, hint: { en: "Find the biggest one left!", am: "ከቀሩት ትልቁን ፈልጉ!" } },
  { kind: "teff", sizes: [0.3, 0.48, 0.66, 0.84, 1], dir: "up", ask: { en: "Shortest teff first, up to the tallest.", am: "ከአጭሩ ጤፍ ጀምሮ እስከ ረጅሙ።" }, hint: { en: "Find the shortest one left!", am: "ከቀሩት አጭሩን ፈልጉ!" } },
];

const T = {
  title: { en: "Put them in order", am: "በቅደም ተከተል አስቀምጡ" },
  line: { en: "Your line:", am: "የእናንተ መስመር፦" },
  summary: { en: "Small, bigger, biggest! Short, longer, longest! You ordered 4 rows.", am: "ትንሽ፣ ትልቅ፣ ትልቁ! አጭር፣ ረዘም ያለ፣ ረጅሙ! አራት መስመሮችን አስተካከላችሁ።" },
} satisfies Record<string, L>;

function Item({ kind, s }: { kind: Kind; s: number }) {
  switch (kind) {
    case "injera": {
      const r = 34 * s;
      return (
        <svg width={r * 2 + 4} height={r * 2 + 4} viewBox={`${-r - 2} ${-r - 2} ${r * 2 + 4} ${r * 2 + 4}`} aria-hidden>
          <circle r={r} fill="#E2C79A" />
          <circle r={r - 3} fill="#EBD3A8" />
          {Array.from({ length: Math.round(10 * s) + 4 }, (_, i) => {
            const a = i * 2.4;
            const rr = (r - 6) * Math.sqrt((i + 0.5) / (10 * s + 4));
            return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={1.6} fill="#C9A672" />;
          })}
        </svg>
      );
    }
    case "stick": {
      const w = 130 * s;
      return (
        <svg width={w + 6} height={18} aria-hidden>
          <rect x={3} y={5} width={w} height={8} rx={4} fill="#8A5A36" />
          <rect x={5} y={6} width={w - 4} height={2} rx={1} fill="#fff" opacity={0.25} />
        </svg>
      );
    }
    case "sheep": {
      const k = s;
      return (
        <svg width={70 * k} height={56 * k} viewBox="-34 -28 70 56" aria-hidden>
          <rect x={-15} y={6} width={6} height={16} rx={3} fill="#3A2E2A" />
          <rect x={9} y={6} width={6} height={16} rx={3} fill="#3A2E2A" />
          <g fill="#fff" stroke="#E2DDEA" strokeWidth={1}>
            <circle cx={-14} cy={0} r={12} />
            <circle cx={0} cy={-6} r={14} />
            <circle cx={14} cy={-1} r={12} />
            <circle cx={0} cy={6} r={13} />
          </g>
          <ellipse cx={26} cy={-4} rx={9} ry={10} fill="#3A2E2A" />
          <circle cx={29} cy={-6} r={2} fill="#fff" />
        </svg>
      );
    }
    case "teff": {
      const h = 110 * s;
      return (
        <svg width={30} height={h + 4} viewBox={`-15 ${-h - 2} 30 ${h + 4}`} aria-hidden>
          <path d={`M0 0 Q-2 ${-h * 0.5} 0 ${-h}`} stroke="#3E9E4A" strokeWidth={3} fill="none" />
          <path d={`M0 ${-h} q-8 6 -10 16 M0 ${-h} q8 6 10 16 M0 ${-h + 8} q-7 6 -9 14 M0 ${-h + 8} q7 6 9 14`} stroke="#C8B04A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
        </svg>
      );
    }
  }
}

export default function SizeOrder({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const r = ROUNDS[round];
  const want = useMemo(() => (r.dir === "up" ? r.sizes.map((_, i) => i) : r.sizes.map((_, i) => r.sizes.length - 1 - i)), [r]);
  const mixed = useMemo(() => shuffle(r.sizes.map((_, i) => i), round * 5 + 2), [r, round]);
  const [line, setLine] = useState<number[]>([]);
  const [wrong, setWrong] = useState(false);
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setLine([]);
    setWrong(false);
  }

  const tap = (i: number) => {
    if (line.includes(i)) return;
    if (i === want[line.length]) {
      sound("pop");
      setWrong(false);
      const next = [...line, i];
      setLine(next);
      if (next.length === r.sizes.length) setTimeout(() => win(), 500);
    } else {
      nudge();
      setWrong(true);
    }
  };

  const tall = r.kind === "teff";
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
          {wrong && <span className="block text-sm text-coral">{r.hint[lang]}</span>}
        </span>
      }
    >
      <LayoutGroup id={`order-${round}`}>
        <motion.div data-pile className={`flex min-h-[110px] flex-wrap items-end justify-center gap-3 rounded-3xl bg-[#F3E7CF] p-3 ${r.kind === "stick" ? "flex-col items-center" : ""}`} animate={shakeAnim(shake)}>
          {mixed
            .filter((i) => !line.includes(i))
            .map((i) => (
              <motion.button key={i} layoutId={`it-${round}-${i}`} type="button" onClick={() => tap(i)} className="rounded-2xl p-1 hover:bg-white/60 active:scale-95" whileTap={{ scale: 0.92 }}>
                <Item kind={r.kind} s={r.sizes[i]} />
              </motion.button>
            ))}
        </motion.div>
        <p className="mt-3 text-sm font-bold text-muted">{T.line[lang]}</p>
        <div className={`mt-1 flex min-h-[110px] flex-wrap justify-center gap-3 rounded-3xl border-2 border-dashed border-line bg-white p-3 ${r.kind === "stick" ? "flex-col items-start" : tall ? "items-end" : "items-end"}`}>
          {line.map((i, k) => (
            <motion.div key={i} layoutId={`it-${round}-${i}`} className={`flex items-center gap-2 ${r.kind === "stick" ? "flex-row" : "flex-col-reverse"}`}>
              <NumBadge n={k + 1} lang={lang} size="sm" word={false} />
              <Item kind={r.kind} s={r.sizes[i]} />
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
    </DemoShell>
  );
}
