"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Gugu's Mystery Bag" (level 6), after the story "What Is This?": asking and answering. Something
  pops out of Gugu's bag and the voice asks a question about it. Two kinds of turn, mixed:
    - "What is this?": the child taps the right answer of three: "It is a ball."
    - "Is it a …?": the child taps "Yes, it is." or "No, it isn't."
  The voice reads the answer the child chose, so every tap is heard as a whole sentence.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Round = { pic: string; ask?: string; am: string };
/** With `ask`, the question is "Is it a <ask>?" (yes when ask === pic); without, "What is this?". */
const ROUNDS: Round[] = [
  { pic: "ball", am: "ኳስ" },
  { pic: "cup", ask: "cup", am: "ስኒ" },
  { pic: "banana", am: "ሙዝ" },
  { pic: "key", ask: "ball", am: "ቁልፍ" },
  { pic: "book", am: "መጽሐፍ" },
  { pic: "cat", ask: "cat", am: "ድመት" },
  { pic: "hat", ask: "cake", am: "ኮፍያ" },
  { pic: "mango", am: "ማንጎ" },
];
const ALL = ["ball", "cup", "banana", "key", "book", "cat", "hat", "mango", "cake", "egg"];
const TEAL = "#0E8C80";
const an = (w: string) => (/^[aeiou]/.test(w) ? "an" : "a");

export default function WhatIsIt({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const question = r.ask ? `Is it ${an(r.ask)} ${r.ask}?` : "What is this?";
  const answers = useMemo(() => {
    if (r.ask) {
      const yes = r.ask === r.pic;
      return [
        { text: "Yes, it is.", right: yes },
        { text: "No, it isn't.", right: !yes },
      ];
    }
    const others = shuffled(ALL.filter((x) => x !== r.pic), (i + 5) / 19).slice(0, 2);
    return shuffled([r.pic, ...others], (i + 8) / 23).map((x) => ({ text: `It is ${an(x)} ${x}.`, right: x === r.pic }));
  }, [r, i]);

  useEffect(() => {
    if (!done) {
      const id = setTimeout(() => say(question, 0.8), 600);
      return () => clearTimeout(id);
    }
  }, [question, done]);

  const tap = (a: { text: string; right: boolean }) => {
    if (hit) return;
    say(a.text, 0.85);
    if (a.right) {
      sfx.good();
      setHit(a.text);
      setWrong(null);
      setTimeout(() => {
        setHit(null);
        setI((n) => n + 1);
      }, 2400);
    } else {
      sfx.oops();
      setWrong(a.text);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Gugu's Mystery Bag", am: "የጉጉ ምስጢራዊ ከረጢት" }}
      howTo={{ en: "Something pops out of the bag! Listen to the question and tap the answer.", am: "ከከረጢቱ የሆነ ነገር ወጣ! ጥያቄውን አዳምጡና መልሱን ንኩ።" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={TEAL}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col gap-1 text-xl font-bold" style={ANDIKA} lang="en">
          <span>What is this? It is a…</span>
          <span>Is it a…? Yes, it is. No, it isn&apos;t.</span>
        </div>
      }
    >
      <div className="flex flex-col items-center">
        <div className="relative h-[150px] w-[180px]">
          <motion.div key={`${i}-pic`} initial={{ y: 70, scale: 0.3, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }} className="absolute left-1/2 top-0 -ml-[46px]">
            <Pic id={r.pic} size={92} />
          </motion.div>
          <svg viewBox="-60 -40 120 70" width={130} height={76} className="absolute bottom-0 left-1/2 -ml-[65px]" aria-hidden>
            <path d="M-46 30 Q-56 -10 -30 -28 Q0 -36 30 -28 Q56 -10 46 30Z" fill="#C98A4A" />
            <path d="M-32 -28 Q0 -20 32 -28" stroke="#7A5236" strokeWidth={4} fill="none" />
            <text y={16} fontSize={26} fontWeight={900} fill="#FFFDF6" textAnchor="middle" fontFamily="var(--font-grandstander), sans-serif">
              ?
            </text>
          </svg>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="rounded-2xl bg-white px-4 py-2 text-3xl font-bold shadow-[0_3px_0_#00000014]" style={{ ...ANDIKA, color: TEAL }} lang="en" data-question="">
            {question}
          </span>
          <Hear text={question} lang={lang} color={TEAL} />
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-[420px] flex-col gap-2" lang="en">
        {answers.map((a) => (
          <motion.button
            key={`${i}-${a.text}`}
            type="button"
            data-choice={a.right ? "right" : "wrong"}
            onClick={() => tap(a)}
            animate={hit === a.text ? { scale: [1, 1.06, 1] } : wrong === a.text ? { x: [0, -6, 6, 0] } : {}}
            className="rounded-2xl border-4 bg-white px-4 py-2 text-2xl font-bold shadow-[0_4px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: hit === a.text ? "#2FA35A" : wrong === a.text ? "#E58A00" : "#FFFFFF" }}
          >
            {a.text}
          </motion.button>
        ))}
      </div>

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {r.ask ? hit : `It is ${an(r.pic)} ${r.pic}!`}
          </span>
          {lang === "am" && ` (${r.am})`}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `Look again: it is ${an(r.pic)} ${r.pic}.${r.ask ? ` Is it ${an(r.ask)} ${r.ask}?` : ""}`, am: `እንደገና ተመልከቱ፦ ይህ ${r.am} (${r.pic}) ነው።` })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Tap the answer.", am: "መልሱን ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
