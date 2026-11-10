"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 2, "What comes next?" (after "What Happens Next?"): two sentences of a little story, with
  one clue word in them. Guess what happens next by picking one of three pictures. A wrong guess
  is fine: the clue word lights up to help. Then the next sentence appears, telling what really
  happened. Five little stories, then onDone.
*/

const ROUNDS: { lines: string[]; en: string; clue: string; next: string; nextEn: string; pic: string; others: string[] }[] = [
  { lines: ["ሰማዩ ጠቆረ።", "ጥቁር ደመና መጣ።"], en: "The sky grew dark. A black cloud came.", clue: "ጠቆረ", next: "ዝናብ ዘነበ።", nextEn: "It rained.", pic: "cloud", others: ["sun", "cake"] },
  { lines: ["ሕፃኑ ተራበ።", "እናቱን ጠራ።"], en: "The baby was hungry. He called his mother.", clue: "ተራበ", next: "እናቱ ወተት ሰጠችው።", nextEn: "His mother gave him milk.", pic: "milk", others: ["ball", "bell"] },
  { lines: ["ዘሩን ተከልን።", "በየቀኑ ውሃ አጠጣነው።"], en: "We planted the seed. We watered it every day.", clue: "ውሃ", next: "ችግኝ በቀለ።", nextEn: "A seedling grew.", pic: "seedling", others: ["hen", "drum"] },
  { lines: ["ፀሐይ ገባች።", "ጨለማ ሆነ።"], en: "The sun went down. It got dark.", clue: "ጨለማ", next: "ጨረቃ ወጣች።", nextEn: "The moon came up.", pic: "moon", others: ["sun", "banana"] },
  { lines: ["ላሊ ከአበባ ወደ አበባ በረረች።", "ወደ ቀፎዋ ተመለሰች።"], en: "Lali flew from flower to flower. She went back to her hive.", clue: "ቀፎዋ", next: "ጣፋጭ ማር ሠራች።", nextEn: "She made sweet honey.", pic: "honey", others: ["fish", "shoe"] },
];

const COPY = {
  title: { en: "What comes next?", am: "ቀጥሎ ምን ይሆናል?" } satisfies T,
  howTo: { en: "Read the story. Look for the clue, and guess what happens next.", am: "ታሪኩን አንብቡ። ፍንጩን ፈልጉና ቀጥሎ ምን እንደሚሆን ገምቱ።" } satisfies T,
  guess: { en: "What happens next?", am: "ቀጥሎ ምን ይሆናል?" } satisfies T,
  clue: { en: "Look at the clue!", am: "ፍንጩን ተመልከቱ!" } satisfies T,
  ending: { en: "Five good guesses. Clues help us read!", am: "አምስት ጥሩ ግምቶች። ፍንጮች እንድናነብ ይረዱናል!" } satisfies T,
};

/** A line with its clue word lit. */
function Line({ text, clue, show }: { text: string; clue: string; show: boolean }) {
  const i = text.indexOf(clue);
  if (!show || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <motion.span initial={{ backgroundColor: "#FFFFFF00" }} animate={{ backgroundColor: ["#FFE27A", "#FFF1C2", "#FFE27A"] }} transition={{ repeat: Infinity, duration: 1.2 }} className="rounded-md px-0.5">
        {clue}
      </motion.span>
      {text.slice(i + clue.length)}
    </>
  );
}

export default function WhatNext({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [hint, setHint] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const round = ROUNDS[r];
  const choices = useMemo(() => shuffled([round.pic, ...round.others], r * 0.61 + 0.07), [round, r]);
  const done = got === ROUNDS.length;

  const pick = (p: string) => {
    if (right) return;
    if (p === round.pic) {
      setRight(true);
      sfx.good();
      later(() => say(round.next), 400);
      later(() => {
        setGot((g) => g + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setRight(false);
          setHint(false);
        }
      }, 2400);
    } else {
      sfx.oops();
      setWrong(p);
      setHint(true);
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[400px] flex-col">
        <div key={r} className="rounded-[24px] border-2 border-[#E3D5C3] bg-[#FFFDF6] px-3 py-3">
          {round.lines.map((l, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.4 }} className="text-[24px] font-bold leading-snug" style={FIDEL}>
              <Line text={l} clue={round.clue} show={hint || right} />
            </motion.p>
          ))}
          {lang === "en" && <p className="mt-1 text-xs text-[#7A6A5A]">{round.en}</p>}
          {right ? (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 rounded-xl bg-[#E9F7E4] px-2 py-1 text-[24px] font-bold text-[#2E7A2E]" style={FIDEL}>
              {round.next}
              {lang === "en" && <span className="block text-xs font-normal text-[#4A6A4A]">{round.nextEn}</span>}
            </motion.p>
          ) : (
            <p className="mt-2 text-center text-2xl text-[#C9B48E]">…</p>
          )}
        </div>
        <p className="mb-2 mt-3 text-center text-lg font-bold">{hint && !right ? COPY.clue[lang] : COPY.guess[lang]}</p>
        <div className="grid grid-cols-3 gap-3">
          {choices.map((p) => (
            <motion.button
              key={`${r}-${p}`}
              type="button"
              data-pick={p}
              onClick={() => pick(p)}
              animate={wrong === p ? { x: [0, -8, 8, -6, 0] } : right && p === round.pic ? { scale: [1, 1.15, 1] } : {}}
              className={`grid aspect-square place-items-center rounded-3xl bg-white shadow-[0_4px_0_#00000018] ${right && p === round.pic ? "ring-4 ring-[#2E9A5B]" : ""}`}
              aria-label={p}
            >
              <Pic id={p} size={76} />
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
