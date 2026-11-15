"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, say, sfx, t } from "./kit";

/*
  "The And-But Chain" (level 6: joining sentences). Two short sentences on paper strips; the child
  picks the link that joins them: a green and (it adds more) or a red but (it says something
  different). The strips join into one sentence that is read aloud, and the chain grows. Eight.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type R = { a: string; b: string; link: "and" | "but"; joined: string };
const ROUNDS: R[] = [
  { a: "I have a cat.", b: "I have a dog.", link: "and", joined: "I have a cat and a dog." },
  { a: "I like rain.", b: "I don't like mud.", link: "but", joined: "I like rain, but I don't like mud." },
  { a: "Gugu is small.", b: "He is fast.", link: "but", joined: "Gugu is small, but he is fast." },
  { a: "We sang.", b: "We danced.", link: "and", joined: "We sang and we danced." },
  { a: "It is sunny.", b: "It is cold.", link: "but", joined: "It is sunny, but it is cold." },
  { a: "I bought a mango.", b: "I bought a banana.", link: "and", joined: "I bought a mango and a banana." },
  { a: "The crow was thirsty.", b: "The water was low.", link: "and", joined: "The crow was thirsty and the water was low." },
  { a: "I was tired.", b: "I read one more page.", link: "but", joined: "I was tired, but I read one more page." },
];
const C = { and: "#2E9A5B", but: "#E8413B" };

export default function AndOrBut({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];

  const pick = (l: "and" | "but") => {
    if (hit) return;
    if (l === r.link) {
      sfx.good();
      say(r.joined, 0.85);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2600);
    } else {
      sfx.oops();
      setWrong(l);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "The And-But Chain", am: "የand እና የbut ሰንሰለት" }}
      howTo={{ en: "Join the two sentences. Does and add more, or does but change the story?", am: "ሁለቱን ዓረፍተ ነገሮች አገናኙ። and ይጨምራል ወይስ but ታሪኩን ይቀይራል?" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={C.and}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col gap-1 text-base font-bold" style={ANDIKA} lang="en">
          {ROUNDS.map((x) => (
            <span key={x.joined}>{x.joined}</span>
          ))}
        </div>
      }
    >
      <div className="flex flex-wrap justify-center gap-1" aria-hidden>
        {ROUNDS.slice(0, i + (hit ? 1 : 0)).map((x, k) => (
          <span key={k} className="h-5 w-8 rounded-full border-4" style={{ borderColor: C[x.link] }} />
        ))}
      </div>
      {hit ? (
        <motion.p key={`j${i}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-3 rounded-2xl bg-[#FFF6B0] p-3 text-center text-2xl font-bold" style={ANDIKA} lang="en">
          {r.joined}
        </motion.p>
      ) : (
        <div className="mt-3 flex flex-col items-center gap-2" lang="en" data-round={i}>
          <span className="rounded-xl bg-[#FFF6B0] px-3 py-2 text-2xl font-bold" style={ANDIKA}>
            {r.a}
          </span>
          <span className="text-3xl text-[#B9A58C]">+</span>
          <span className="rounded-xl bg-[#FFF6B0] px-3 py-2 text-2xl font-bold" style={ANDIKA}>
            {r.b}
          </span>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3" lang="en">
        {(["and", "but"] as const).map((l) => (
          <motion.button
            key={l}
            type="button"
            data-choice={l === r.link ? "right" : "wrong"}
            onClick={() => pick(l)}
            animate={wrong === l ? { x: [0, -6, 6, -4, 0] } : {}}
            className="rounded-full border-8 bg-white py-3 text-3xl font-black shadow-[0_4px_0_#00000018]"
            style={{ ...ANDIKA, borderColor: C[l], color: C[l] }}
          >
            {l}
          </motion.button>
        ))}
      </div>
      {hit ? (
        <Note tone="good">{r.link === "and" ? t(lang, { en: "And adds more!", am: "and ይጨምራል!" }) : t(lang, { en: "But changes the story!", am: "but ታሪኩን ይቀይራል!" })}</Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: "Read both strips again: are they alike, or different?", am: "ሁለቱንም እንደገና አንብቡ፦ ይመሳሰላሉ ወይስ ይለያያሉ?" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "And adds more, but changes the story!", am: "and ይጨምራል፣ but ታሪኩን ይቀይራል!" })}</Note>
      )}
    </Frame>
  );
}
