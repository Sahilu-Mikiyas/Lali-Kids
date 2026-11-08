"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { fam, FAMILY_ORDER, ORDER_COLORS } from "../fidel";
import { FIDEL, Frame, HatIcon, say, sfx, type T } from "./shared/kit";

/*
  Level 5, "Find it on the fidel chart" (after "The Great Fidel Parade"): a letter appears; find
  it in two steps, the way the chart works. First tap its family among the 33 first letters (the
  chart's first column, in order); its row opens with the seven forms under Grandma's hats; then
  tap the right form. Six letters from all over the chart. The ending shows the whole chart,
  33 rows of 7. Then onDone.
*/

const TARGETS: [string, string][] = [
  ["ጉ", "gu"],
  ["ዞ", "zo"],
  ["ፊ", "fi"],
  ["ጫ", "chaa"],
  ["ዳ", "daa"],
  ["ኮ", "ko"],
];

const COPY = {
  title: { en: "Find it on the fidel chart", am: "በፊደል ገበታው ላይ ፈልጉት" } satisfies T,
  step1: { en: "Which family is it in? Tap its first letter.", am: "የየትኛው ቤተሰብ ነው? የመጀመሪያ ፊደሉን ንኩ።" } satisfies T,
  step2: { en: "Now tap it in its family's row.", am: "አሁን በቤተሰቡ ረድፍ ውስጥ ንኩት።" } satisfies T,
  howTo: { en: "Find each letter: first its family, then its hat.", am: "እያንዳንዱን ፊደል ፈልጉ፦ መጀመሪያ ቤተሰቡን፣ ከዚያ ኮፍያውን።" } satisfies T,
  ending: { en: "The whole fidel: 33 families, 7 forms each.", am: "ሙሉው ፊደል፦ ሠላሳ ሦስት ቤተሰቦች፣ እያንዳንዳቸው ሰባት መልኮች።" } satisfies T,
};

/** The family a letter belongs to (the first letter of the family whose seven forms include it). */
function familyOf(g: string) {
  return FAMILY_ORDER.find((f) => fam(f).includes(g)) ?? "";
}

export default function FidelChart({ lang, onDone }: DemoProps) {
  const [t, setT] = useState(0);
  const [row, setRow] = useState<string | null>(null);
  const [bad, setBad] = useState<string | null>(null);
  const [found, setFound] = useState(false);
  const [got, setGot] = useState(0);
  const [target, sound] = TARGETS[Math.min(t, TARGETS.length - 1)];
  const done = got === TARGETS.length;

  const oops = (k: string) => {
    sfx.oops();
    setBad(k);
    setTimeout(() => setBad(null), 500);
  };

  const pickFamily = (f: string) => {
    if (row) return;
    if (f === familyOf(target)) {
      sfx.good();
      say(f);
      setRow(f);
    } else oops(f);
  };

  const pickForm = (g: string) => {
    if (found) return;
    if (g === target) {
      setFound(true);
      say(g);
      sfx.good();
      setTimeout(() => {
        setGot((n) => n + 1);
        setT((n) => n + 1);
        setRow(null);
        setFound(false);
      }, 1300);
    } else oops(g);
  };

  return (
    <Frame
      lang={lang}
      title={COPY.title}
      howTo={COPY.howTo}
      total={TARGETS.length}
      got={got}
      done={done}
      onDone={onDone}
      ending={
        <div>
          <p className="mb-2 text-base">{COPY.ending[lang]}</p>
          <div className="mx-auto grid max-w-[300px] grid-cols-7 gap-x-1 text-[15px] font-bold leading-[1.45]" style={FIDEL}>
            {FAMILY_ORDER.flatMap((f) => fam(f)).map((g, i) => (
              <span key={g} style={{ color: ORDER_COLORS[i % 7] }}>
                {g}
              </span>
            ))}
          </div>
        </div>
      }
    >
      <div className="mx-auto flex max-w-[380px] flex-col items-center">
        <div className="flex items-center gap-3 rounded-[24px] bg-white px-5 py-2 shadow-[0_5px_0_#00000014]">
          <motion.span key={target} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="text-[64px] font-bold leading-none" style={FIDEL}>
            {target}
          </motion.span>
          {lang === "en" && <span className="rounded-full bg-[#FFF3D6] px-2 text-sm font-bold">&ldquo;{sound}&rdquo;</span>}
        </div>
        <p className="mt-2 text-center text-base font-bold">{row ? COPY.step2[lang] : COPY.step1[lang]}</p>
        {row ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 grid w-full grid-cols-7 gap-1">
            {fam(row).map((g, i) => (
              <motion.button
                key={g}
                type="button"
                aria-label={g}
                onClick={() => pickForm(g)}
                animate={bad === g ? { x: [0, -5, 5, -3, 0] } : found && g === target ? { scale: [1, 1.3, 1] } : {}}
                className={`flex flex-col items-center rounded-xl pb-1 pt-1 ${found && g === target ? "bg-[#DFF3E4]" : "bg-white"}`}
              >
                <HatIcon order={i} size={24} />
                <span className="text-[30px] font-bold leading-none" style={{ ...FIDEL, color: ORDER_COLORS[i] }}>
                  {g}
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <div className="mt-3 grid w-full grid-cols-6 gap-1.5">
            {FAMILY_ORDER.map((f) => (
              <motion.button
                key={f}
                type="button"
                aria-label={f}
                onClick={() => pickFamily(f)}
                animate={bad === f ? { x: [0, -5, 5, -3, 0] } : {}}
                className="grid h-11 place-items-center rounded-xl bg-white text-[26px] font-bold shadow-[0_3px_0_#00000018]"
                style={FIDEL}
              >
                {f}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </Frame>
  );
}
