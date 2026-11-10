"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Build a Sentence" (level 6): a picture, and the words of its sentence muddled up on cards.
  The child taps the cards in order to build the sentence on the line ("I" … "like" … "mango.");
  each card hops up into place and the voice says it; a card out of turn wobbles back. When the
  sentence is built, the voice reads it all. Six sentences with the level's patterns:
  I can…, I like…, This is…, I see a….
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type S = { text: string; pic: string; am: string };
const SENTENCES: S[] = [
  { text: "I like mango.", pic: "mango", am: "ማንጎ እወዳለሁ።" },
  { text: "This is my cat.", pic: "cat", am: "ይህ ድመቴ ነው።" },
  { text: "I see a bus.", pic: "bus", am: "አውቶቡስ አያለሁ።" },
  { text: "I can read.", pic: "book", am: "ማንበብ እችላለሁ።" },
  { text: "This is a key.", pic: "key", am: "ይህ ቁልፍ ነው።" },
  { text: "I see the sun.", pic: "sun", am: "ፀሐይን አያለሁ።" },
];
const GREEN = "#2E9A5B";

export default function SentenceBuilder({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [built, setBuilt] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = i >= SENTENCES.length;
  const s = SENTENCES[Math.min(i, SENTENCES.length - 1)];
  const words = s.text.split(" ");
  const complete = built >= words.length;
  // the cards, muddled: each remembers its place in the sentence
  const cards = useMemo(() => shuffled(s.text.split(" ").map((w, k) => ({ w, k })), (i + 3) / 31), [s.text, i]);

  const tap = (k: number) => {
    if (complete || k < built) return;
    if (k === built) {
      sfx.tap();
      const nb = built + 1;
      setBuilt(nb);
      setWrong(null);
      if (nb >= words.length) {
        sfx.good();
        say(s.text, 0.8);
        setTimeout(() => {
          setBuilt(0);
          setI((n) => n + 1);
        }, 2600);
      } else {
        say(words[k].replace(/[.!]/g, ""), 0.8);
      }
    } else {
      sfx.oops();
      setWrong(k);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Build a Sentence", am: "ዓረፍተ ነገር ሥሩ" }}
      howTo={{ en: "Look at the picture. Tap the words in order to build the sentence.", am: "ሥዕሉን ተመልከቱ። ዓረፍተ ነገሩን ለመሥራት ቃላቱን በቅደም ተከተል ንኩ።" }}
      total={SENTENCES.length}
      got={Math.min(i + (complete ? 1 : 0), SENTENCES.length)}
      done={done}
      onDone={onDone}
      color={GREEN}
      onAgain={() => {
        setI(0);
        setBuilt(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col items-center gap-1" lang="en">
          {SENTENCES.map((x) => (
            <span key={x.text} className="flex items-center gap-2 text-lg font-bold" style={ANDIKA}>
              <Pic id={x.pic} size={28} />
              {x.text}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={s.pic} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl border-4 bg-white p-1" style={{ borderColor: GREEN }}>
          <Pic id={s.pic} size={88} />
        </motion.div>
        {complete && <Hear text={s.text} lang={lang} color={GREEN} />}
      </div>

      <div className="mt-3 flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-2xl border-b-4 border-dashed px-2 pb-2" style={{ borderColor: GREEN }} lang="en" data-built={built}>
        {words.slice(0, built).map((w, k) => (
          <motion.span key={`${i}-${k}`} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl px-3 py-1 text-3xl font-bold" style={{ ...ANDIKA, background: complete ? "#E4F7EA" : "#FFFFFF", color: "#2A1A10" }}>
            {w}
          </motion.span>
        ))}
        {!built && <span className="text-base text-[#B9A58C]">{t(lang, { en: "The sentence goes here", am: "ዓረፍተ ነገሩ እዚህ ይሠራል" })}</span>}
      </div>

      <div className="mt-4 flex min-h-[60px] flex-wrap justify-center gap-2" lang="en">
        {cards.map(({ w, k }) =>
          k < built ? null : (
            <motion.button
              key={`${i}-${k}`}
              type="button"
              data-card={k}
              data-choice={k === built ? "right" : "wrong"}
              onClick={() => tap(k)}
              animate={wrong === k ? { x: [0, -6, 6, -4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border-4 bg-white px-4 py-2 text-3xl font-bold shadow-[0_4px_0_#00000022] active:translate-y-0.5"
              style={{ ...ANDIKA, borderColor: wrong === k ? "#E58A00" : "#FFFFFF" }}
            >
              {w}
            </motion.button>
          ),
        )}
      </div>

      {complete ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {s.text}
          </span>
          {lang === "am" && ` (${s.am})`}
        </Note>
      ) : wrong !== null ? (
        <Note tone="try">{t(lang, { en: built ? "Not yet! Read what you have, then find the next word." : "Not yet! Which word comes first? (It starts with a capital letter.)", am: built ? "ገና ነው! ያላችሁን አንብቡ፤ ከዚያ ቀጣዩን ቃል ፈልጉ።" : "ገና ነው! መጀመሪያ የሚመጣው የትኛው ቃል ነው? (በትልቅ ፊደል ይጀምራል።)" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, built ? { en: "Now the next word!", am: "አሁን ቀጣዩን ቃል!" } : { en: "Tap the first word.", am: "የመጀመሪያውን ቃል ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
