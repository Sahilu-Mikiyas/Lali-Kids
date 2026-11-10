"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 3, "Opposite pairs" (after "Gugu's Opposite Day"): Grandma's opposite cards in two
  columns. Tap a word on the left, then its opposite on the right; a matched pair turns the same
  colour and is read out together. Two rounds of five pairs, then onDone.
*/

const ROUNDS: [string, string, string, string][][] = [
  [
    ["ትልቅ", "ትንሽ", "big", "small"],
    ["ረጅም", "አጭር", "long, tall", "short"],
    ["ሞቃት", "ቀዝቃዛ", "hot", "cold"],
    ["ላይ", "ታች", "up", "down"],
    ["ክፍት", "ዝግ", "open", "shut"],
  ],
  [
    ["ፈጣን", "ቀርፋፋ", "fast", "slow"],
    ["ቀን", "ሌሊት", "day", "night"],
    ["ውስጥ", "ውጭ", "inside", "outside"],
    ["ደስተኛ", "ያዘነ", "happy", "sad"],
    ["ብዙ", "ጥቂት", "many", "few"],
  ],
];
const TINTS = ["#FFE27A", "#BDE6FF", "#C9F0C4", "#FBD3E2", "#E3D3FA"];

const COPY = {
  title: { en: "Opposite pairs", am: "ተቃራኒ ጥንዶች" } satisfies T,
  howTo: { en: "Tap a word on the left, then its opposite on the right.", am: "በግራ ያለውን ቃል ንኩ፤ ከዚያ በቀኝ ያለውን ተቃራኒውን ንኩ።" } satisfies T,
  ending: { en: "Up and down, big and small: opposites, opposites, you know them all!", am: "ላይና ታች፣ ትልቅና ትንሽ፦ ተቃራኒ፣ ተቃራኒ፣ ሁሉንም ታውቃላችሁ!" } satisfies T,
};

export default function OppositePairs({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [got, setGot] = useState(0);
  const later = useLater();
  const pairs = ROUNDS[r];
  const right = useMemo(() => shuffled(pairs.map((_, i) => i), r * 0.71 + 0.33), [pairs, r]);
  const total = ROUNDS.reduce((n, p) => n + p.length, 0);
  const done = got === total;

  const tapLeft = (i: number) => {
    if (matched.includes(i)) return;
    setSel(i);
    say(pairs[i][0], i);
  };

  const tapRight = (i: number) => {
    if (matched.includes(i)) return;
    if (sel === null) {
      say(pairs[i][1], i);
      return;
    }
    if (i === sel) {
      sfx.good();
      say(`${pairs[i][0]}፣ ${pairs[i][1]}`, i);
      const m = [...matched, i];
      setMatched(m);
      setSel(null);
      setGot((g) => g + 1);
      if (m.length === pairs.length && r + 1 < ROUNDS.length) {
        later(() => {
          setR(r + 1);
          setMatched([]);
        }, 1500);
      }
    } else {
      sfx.oops();
      setWrong(i);
      later(() => setWrong(null), 600);
    }
  };

  const cell = (text: string, en: string, tint: string | null, active: boolean) => (
    <span className="flex flex-col items-center">
      <span className="text-[26px] font-bold leading-tight" style={FIDEL}>
        {text}
      </span>
      {lang === "en" && <span className="text-[11px] text-[#5B4636]">{en}</span>}
      <span className="sr-only">{tint ? "matched" : active ? "selected" : ""}</span>
    </span>
  );

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={total} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div key={r} className="mx-auto grid max-w-[380px] grid-cols-2 gap-x-6 gap-y-2">
        <div className="flex flex-col gap-2">
          {pairs.map((p, i) => {
            const tint = matched.includes(i) ? TINTS[i] : null;
            return (
              <motion.button key={`l${i}`} type="button" data-left={i} onClick={() => tapLeft(i)} animate={sel === i ? { scale: 1.06 } : { scale: 1 }} className="min-h-[60px] rounded-2xl border-[3px] px-2 py-1 shadow-[0_4px_0_#00000014]" style={{ background: tint ?? "#FFFFFF", borderColor: sel === i ? "#2F6FD6" : tint ? "#00000010" : "#E3D5C3" }}>
                {cell(p[0], p[2], tint, sel === i)}
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {right.map((i) => {
            const tint = matched.includes(i) ? TINTS[i] : null;
            return (
              <motion.button key={`r${i}`} type="button" data-right={i} onClick={() => tapRight(i)} animate={wrong === i ? { x: [0, -8, 8, -6, 0] } : {}} className="min-h-[60px] rounded-2xl border-[3px] px-2 py-1 shadow-[0_4px_0_#00000014]" style={{ background: tint ?? "#FFFFFF", borderColor: tint ? "#00000010" : "#E3D5C3" }}>
                {cell(pairs[i][1], pairs[i][3], tint, false)}
              </motion.button>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}
