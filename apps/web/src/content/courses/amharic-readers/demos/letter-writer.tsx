"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 6, "Write a letter" (after "Anbessa's Letter to Grandma"): a letter has its parts in
  order: who it is for (ለውድ…፣), asking how they are, the news, then goodbye and your name. The
  four parts arrive mixed up; tap the one that comes next and it is written onto the paper (a
  wrong one wobbles). First a letter to Grandma, then one to a friend, Hawi. Eight parts, then
  onDone. Amharic is a first draft.
*/

const PART: T[] = [
  { en: "who it's for", am: "ለማን" },
  { en: "how are you?", am: "ሰላምታ" },
  { en: "the news", am: "ወሬው" },
  { en: "goodbye and name", am: "ስንብትና ስም" },
];

const LETTERS: { to: T; parts: { am: string; en: string }[] }[] = [
  {
    to: { en: "A letter to Grandma", am: "ለአያት ደብዳቤ" },
    parts: [
      { am: "ለውድ አያቴ፣", en: "To my dear Grandma," },
      { am: "እንደምን ሰነበትሽ? ናፍቀሽኛል።", en: "How have you been? I miss you." },
      { am: "ዛሬ ትምህርት ቤት ግጥም አነበብኩ።", en: "Today at school I read a poem." },
      { am: "የልጅ ልጅሽ፣ አንበሳ", en: "Your grandchild, Anbessa" },
    ],
  },
  {
    to: { en: "A letter to a friend", am: "ለጓደኛ ደብዳቤ" },
    parts: [
      { am: "ለውድ ጓደኛዬ ሀዊ፣", en: "To my dear friend Hawi," },
      { am: "እንዴት ነሽ? እኔ ደህና ነኝ።", en: "How are you? I am fine." },
      { am: "ትንሽ መጽሐፍ ሠራሁ!", en: "I made a little book!" },
      { am: "ጓደኛሽ፣ ሐበን", en: "Your friend, Haben" },
    ],
  },
];

const COPY = {
  title: { en: "Write a letter", am: "ደብዳቤ ጻፉ" } satisfies T,
  howTo: { en: "Which part of the letter comes next? Tap it to write it.", am: "ቀጥሎ የሚመጣው የደብዳቤው ክፍል የትኛው ነው? ንኩትና ጻፉት።" } satisfies T,
  ending: { en: "Two letters: who it's for, how are you, the news, goodbye and your name!", am: "ሁለት ደብዳቤዎች፦ ለማን፣ ሰላምታ፣ ወሬው፣ ስንብትና ስም!" } satisfies T,
};

export default function LetterWriter({ lang, onDone }: DemoProps) {
  const [t, setT] = useState(0);
  const [n, setN] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const letter = LETTERS[t];
  const order = useMemo(() => shuffled([0, 1, 2, 3], t * 0.43 + 0.17), [t]);
  const total = LETTERS.length * 4;
  const done = got === total;

  const tap = (i: number) => {
    if (busy || n >= 4) return;
    if (i === n) {
      sfx.good();
      say(letter.parts[i].am);
      setN(n + 1);
      setGot((g) => g + 1);
      if (n + 1 === 4 && t + 1 < LETTERS.length) {
        setBusy(true);
        later(() => {
          setT(t + 1);
          setN(0);
          setBusy(false);
        }, 2200);
      }
    } else {
      sfx.oops();
      setWrong(i);
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={total} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[440px] flex-col">
        <p className="text-center text-base font-bold text-[#7A3A10]" style={lang === "am" ? FIDEL : undefined}>
          {letter.to[lang]}
        </p>
        <motion.div key={t} initial={{ rotate: -2, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="mt-2 min-h-[176px] rounded-md border-2 border-[#B9A47A] bg-[#FFFDF6] px-4 py-3 shadow-[0_4px_0_#00000014]" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 35px, #DCE8FB 35px 37px)" }}>
          {letter.parts.slice(0, n).map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`text-[19px] leading-[37px] ${i === 3 ? "text-right" : ""}`} style={{ ...FIDEL, color: "#3B3F94" }}>
              {p.am}
              {lang === "en" && <span className="ml-2 text-[11px] text-[#7A6A5A]">{p.en}</span>}
            </motion.p>
          ))}
        </motion.div>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {order.map((i) =>
            i < n ? null : (
              <motion.button
                key={`${t}-${i}`}
                type="button"
                data-part={i}
                onClick={() => tap(i)}
                animate={wrong === i ? { x: [0, -8, 8, -6, 0] } : {}}
                className="rounded-2xl bg-white px-3 py-2 text-left shadow-[0_4px_0_#00000018]"
              >
                <span className="text-[18px] font-bold" style={FIDEL}>
                  {letter.parts[i].am}
                </span>
                <span className="ml-2 text-[11px] text-[#7A6A5A]" style={lang === "am" ? FIDEL : undefined}>
                  ({PART[i][lang]})
                </span>
              </motion.button>
            ),
          )}
        </div>
      </div>
    </Frame>
  );
}
