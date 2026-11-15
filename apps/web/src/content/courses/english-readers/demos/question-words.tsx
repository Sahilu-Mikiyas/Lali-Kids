"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, t } from "./kit";

/*
  "The Question Jar" (level 5: who, what, where, when, why, how). Grandpa Tolosa's answer is shown;
  the child picks the question word that asks for it, and the whole question is read aloud.
  Six rounds, one for each word.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

const WORDS = ["Who", "What", "Where", "When", "Why", "How"];
const COLORS: Record<string, string> = { Who: "#E8413B", What: "#2E9A5B", Where: "#2F6FD0", When: "#E3A500", Why: "#8E5BE0", How: "#D9662B" };
type R = { answer: string; pic: string; word: string; question: string; am: string };
const ROUNDS: R[] = [
  { answer: "In the Bale Mountains.", pic: "mountain", word: "Where", question: "Where did you live?", am: "የት ይኖሩ ነበር?" },
  { answer: "When I was seven.", pic: "book", word: "When", question: "When did you start school?", am: "ትምህርት መቼ ጀመሩ?" },
  { answer: "I walked, over the hills.", pic: "foot", word: "How", question: "How did you get there?", am: "እንዴት ይሄዱ ነበር?" },
  { answer: "Because I wanted to read.", pic: "book", word: "Why", question: "Why did you walk so far?", am: "ለምን ያን ያህል ሩቅ ሄዱ?" },
  { answer: "My friend Chala.", pic: "heart", word: "Who", question: "Who was your best friend?", am: "የቅርብ ጓደኛዎ ማን ነበር?" },
  { answer: "Hide and seek, with the sheep!", pic: "sheep", word: "What", question: "What did you play?", am: "ምን ይጫወቱ ነበር?" },
];
const RED = "#C42A5A";

export default function QuestionWords({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];

  const pick = (w: string) => {
    if (hit) return;
    if (w === r.word) {
      sfx.good();
      say(r.question, 0.85);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2200);
    } else {
      sfx.oops();
      setWrong(w);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "The Question Jar", am: "የጥያቄ ማሰሮ" }}
      howTo={{ en: "Here is Grandpa's answer. Which question word asks for it?", am: "የአያት መልስ ይኸው። ይህን መልስ የሚጠይቀው የትኛው የጥያቄ ቃል ነው?" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={RED}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col gap-1 text-base font-bold" style={ANDIKA} lang="en">
          {ROUNDS.map((x) => (
            <span key={x.question}>
              <span style={{ color: COLORS[x.word] }}>{x.word}</span>
              {x.question.slice(x.word.length)}
            </span>
          ))}
        </div>
      }
    >
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-[0_4px_0_#00000014]">
        <Pic id={r.pic} size={64} />
        <div>
          <p className="text-sm text-[#5B4636]">{t(lang, { en: "Grandpa says:", am: "አያት እንዲህ አሉ፦" })}</p>
          <p className="text-2xl font-bold" style={ANDIKA} lang="en" data-round={i}>
            &ldquo;{r.answer}&rdquo;
          </p>
        </div>
      </motion.div>
      <p className="mt-3 min-h-[40px] text-center text-2xl font-bold" style={ANDIKA} lang="en">
        {hit ? (
          <>
            <span style={{ color: COLORS[r.word] }}>{r.word}</span>
            {r.question.slice(r.word.length)}
          </>
        ) : (
          "… ?"
        )}
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2" lang="en">
        {WORDS.map((w) => (
          <motion.button
            key={w}
            type="button"
            data-choice={w === r.word ? "right" : "wrong"}
            onClick={() => pick(w)}
            animate={wrong === w ? { x: [0, -6, 6, -4, 0] } : {}}
            className="rounded-2xl py-3 text-2xl font-bold text-white shadow-[0_4px_0_#00000026] active:translate-y-0.5"
            style={{ ...ANDIKA, background: COLORS[w], outline: hit && w === r.word ? "4px solid #2FA35A" : "none" }}
          >
            {w}?
          </motion.button>
        ))}
      </div>
      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {r.question}
          </span>
          {lang === "am" && ` (${r.am})`}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `"${wrong}?" asks for something else. Is the answer a person, a thing, a place, a time, a reason or a way?`, am: `«${wrong}?» ሌላ ነገር ይጠይቃል። መልሱ ሰው፣ ነገር፣ ቦታ፣ ጊዜ፣ ምክንያት ወይስ መንገድ ነው?` })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Who: a person. Where: a place. When: a time.", am: "Who፦ ሰው። Where፦ ቦታ። When፦ ጊዜ።" })}</Note>
      )}
    </Frame>
  );
}
