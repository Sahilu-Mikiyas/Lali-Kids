"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, say, sfx, t, type T } from "./kit";

/*
  "Write a Postcard" (level 6: a short message). The child builds a postcard to Grandma, part by
  part: the greeting, a first sentence, a second sentence, the goodbye and the closing, choosing
  each from three. Wrong choices (a closing in the greeting's place, a sentence about something else)
  gently bounce back. At the end the finished postcard is read aloud, ready to copy onto real paper.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Part = { label: T; right: string; others: [string, string] };
const PARTS: Part[] = [
  { label: { en: "The greeting", am: "ሰላምታው" }, right: "Dear Grandma,", others: ["Love, Ayan", "See you soon!"] },
  { label: { en: "Where you are", am: "ያላችሁበት ቦታ" }, right: "I am at Lake Tana.", others: ["Dear Grandma,", "Love, Ayan"] },
  { label: { en: "A best thing", am: "አንድ ምርጥ ነገር" }, right: "I saw a pelican eat a fish!", others: ["Dear Grandma,", "I am a fish."] },
  { label: { en: "The goodbye", am: "ስንብቱ" }, right: "See you soon!", others: ["Dear Grandma,", "I saw a pelican!"] },
  { label: { en: "The closing", am: "መዝጊያው" }, right: "Love, Ayan", others: ["Dear Ayan,", "I am at Lake Tana."] },
];
const BLUE = "#2F6FD0";

export default function WriteAPostcard({ lang, onDone }: DemoProps) {
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = step >= PARTS.length;
  const p = PARTS[Math.min(step, PARTS.length - 1)];
  // a fixed muddle for each step, so the right answer moves about
  const options = [p.right, ...p.others];
  const order = [[1, 0, 2], [0, 2, 1], [2, 1, 0], [1, 2, 0], [0, 1, 2]][Math.min(step, 4)].map((k) => options[k]);

  const pick = (o: string) => {
    if (done) return;
    if (o === p.right) {
      sfx.good();
      setWrong(null);
      const n = step + 1;
      setStep(n);
      if (n >= PARTS.length) say(PARTS.map((x) => x.right).join(" "), 0.85);
      else say(o, 0.85);
    } else {
      sfx.oops();
      setWrong(o);
    }
  };

  const card = (
    <div className="grid grid-cols-[1fr_auto] gap-2 rounded-xl border-2 border-[#D8C8A8] bg-[#FFFDF6] p-3 text-left shadow-[0_6px_0_#00000014]" lang="en">
      <div className="min-h-[150px] border-r-2 border-[#E3D5C3] pr-2 text-lg font-bold leading-snug text-[#2A3A7A]" style={ANDIKA}>
        {PARTS.slice(0, step).map((x) => (
          <motion.p key={x.right} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            {x.right}
          </motion.p>
        ))}
      </div>
      <div className="flex w-[84px] flex-col items-end gap-2">
        <div className="h-10 w-9 border-2 border-dashed border-white bg-[#E8413B]" />
        <div className="w-full text-xs font-bold text-[#2A3A7A]" style={ANDIKA}>
          Grandma Halima
          <br />
          Jijiga
        </div>
      </div>
    </div>
  );

  return (
    <Frame
      lang={lang}
      title={{ en: "Write a Postcard", am: "ፖስት ካርድ ጻፉ" }}
      howTo={{ en: "Build a postcard to Grandma, one part at a time.", am: "ለአያት ፖስት ካርድ ክፍል በክፍል ሥሩ።" }}
      total={PARTS.length}
      got={Math.min(step, PARTS.length)}
      done={done}
      onDone={onDone}
      color={BLUE}
      onAgain={() => {
        setStep(0);
        setWrong(null);
      }}
      ending={card}
    >
      {card}
      <p className="mt-3 text-center text-lg font-bold" style={{ color: BLUE }} data-step={step}>
        {p.label[lang]}
      </p>
      <div className="mt-2 flex flex-col gap-2" lang="en">
        {order.map((o) => (
          <motion.button
            key={`${step}-${o}`}
            type="button"
            data-choice={o === p.right ? "right" : "wrong"}
            onClick={() => pick(o)}
            animate={wrong === o ? { x: [0, -6, 6, -4, 0] } : {}}
            className="rounded-2xl border-4 bg-white px-3 py-2 text-lg font-bold shadow-[0_4px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: wrong === o ? "#E58A00" : "#FFFFFF" }}
          >
            {o}
          </motion.button>
        ))}
      </div>
      {wrong ? (
        <Note tone="try">{t(lang, { en: "Not here! What comes next on a postcard?", am: "እዚህ አይደለም! በፖስት ካርድ ላይ ቀጥሎ ምን ይመጣል?" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Dear…, three best things, Love…!", am: "Dear…፣ ሦስት ምርጥ ነገሮች፣ Love…!" })}</Note>
      )}
    </Frame>
  );
}
