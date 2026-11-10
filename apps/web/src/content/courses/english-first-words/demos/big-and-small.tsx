"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, DISPLAY, Frame, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Big and Little Letters" (level 3): every English letter has a big (capital) and a little
  (small) shape. Big letters on top, little letters below, mixed up: tap a big letter, then its
  little partner. A match turns both the same color and shows a word that starts with it; the
  voice says the letter and the word. Two rounds of six, with the look-alikes b and d in the mix.
*/

const ROUNDS = [
  ["a", "b", "d", "e", "g", "h"],
  ["c", "f", "i", "j", "l", "m"],
];
const WORD: Record<string, string> = { a: "ant", b: "ball", c: "cat", d: "dog", e: "egg", f: "fish", g: "goat", h: "hat", i: "insect", j: "jug", k: "kite", l: "lion", m: "moon" };
const PAIR_COLORS = ["#E8513B", "#2F6FD0", "#2E9A5B", "#8E5BE0", "#E58A00", "#D63B72"];

export default function BigAndSmall({ lang, onDone }: DemoProps) {
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [last, setLast] = useState<string | null>(null);
  const letters = ROUNDS[Math.min(round, ROUNDS.length - 1)];
  const smalls = useMemo(() => shuffled(letters, (round + 3) / 7), [letters, round]);
  const done = round >= ROUNDS.length;
  const got = Math.min(round, ROUNDS.length) * 6 + (done ? 0 : matched.length);

  const tapBig = (l: string) => {
    if (matched.includes(l)) return;
    sfx.tap();
    setPick(l);
  };
  const tapSmall = (l: string) => {
    if (matched.includes(l) || !pick) return;
    if (l === pick) {
      sfx.good();
      say(`${l.toUpperCase()}. ${WORD[l]}.`);
      const next = [...matched, l];
      setMatched(next);
      setLast(l);
      setPick(null);
      if (next.length === letters.length) {
        setTimeout(() => {
          setRound((r) => r + 1);
          setMatched([]);
          setLast(null);
        }, 1600);
      }
    } else {
      sfx.oops();
      setShake(l);
      setTimeout(() => setShake(null), 500);
    }
  };
  const colorOf = (l: string) => PAIR_COLORS[letters.indexOf(l) % PAIR_COLORS.length];

  return (
    <Frame
      lang={lang}
      title={{ en: "Big and Little Letters", am: "ትልልቅና ትንንሽ ፊደሎች" }}
      howTo={{ en: "Tap a big letter, then its little partner.", am: "አንድ ትልቅ ፊደል ንኩ፤ ከዚያ ትንሹን ጓደኛውን ንኩ።" }}
      total={12}
      got={got}
      done={done}
      onDone={onDone}
      color="#D63B72"
      onAgain={() => {
        setRound(0);
        setMatched([]);
        setPick(null);
        setLast(null);
      }}
      ending={
        <p className="text-4xl font-bold tracking-wide text-[#D63B72]" style={ANDIKA} lang="en">
          {ROUNDS.flat()
            .sort()
            .map((l) => `${l.toUpperCase()}${l}`)
            .join(" ")}
        </p>
      }
    >
      <p className="mb-1 text-center text-base font-bold text-[#5B4636]">{t(lang, { en: "Big letters", am: "ትልልቅ ፊደሎች" })}</p>
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {letters.map((l) => {
          const m = matched.includes(l);
          return (
            <button
              key={`B${l}`}
              type="button"
              data-big={l}
              onClick={() => tapBig(l)}
              className="flex h-16 items-center justify-center rounded-2xl text-4xl font-bold shadow-[0_4px_0_#00000022] active:translate-y-0.5"
              style={{ ...ANDIKA, background: m ? colorOf(l) : pick === l ? "#2A1A10" : "#FFFFFF", color: m || pick === l ? "#FFFFFF" : "#2A1A10" }}
            >
              {l.toUpperCase()}
            </button>
          );
        })}
      </div>
      <div className="my-3 flex h-16 items-center justify-center gap-2">
        {last ? (
          <motion.span key={last} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-1 shadow-[0_3px_0_#00000014]">
            <span className="text-3xl font-bold" style={{ ...ANDIKA, color: colorOf(last) }}>
              {last.toUpperCase()}
              {last}
            </span>
            <Pic id={WORD[last]} size={44} />
            <span className="text-xl font-black" style={DISPLAY} lang="en">
              {WORD[last]}
            </span>
          </motion.span>
        ) : (
          <span className="text-3xl text-[#B9A58C]">↕</span>
        )}
      </div>
      <p className="mb-1 text-center text-base font-bold text-[#5B4636]">{t(lang, { en: "Little letters", am: "ትንንሽ ፊደሎች" })}</p>
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {smalls.map((l) => {
          const m = matched.includes(l);
          return (
            <motion.button
              key={`s${l}`}
              type="button"
              data-small={l}
              onClick={() => tapSmall(l)}
              animate={shake === l ? { x: [0, -6, 6, -4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex h-16 items-center justify-center rounded-2xl text-4xl font-bold shadow-[0_4px_0_#00000022] active:translate-y-0.5"
              style={{ ...ANDIKA, background: m ? colorOf(l) : "#FFFFFF", color: m ? "#FFFFFF" : "#2A1A10" }}
            >
              {l}
            </motion.button>
          );
        })}
      </div>
      <Note tone="plain">
        {pick
          ? t(lang, { en: `Now find the little ${pick}.`, am: `አሁን ትንሹን ${pick} ፈልጉ።` })
          : t(lang, { en: "Tap a big letter first.", am: "መጀመሪያ አንድ ትልቅ ፊደል ንኩ።" })}
      </Note>
    </Frame>
  );
}
