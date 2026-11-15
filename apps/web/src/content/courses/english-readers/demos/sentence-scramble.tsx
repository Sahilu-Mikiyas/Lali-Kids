"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Sentence Scramble" (level 3): the words of a sentence from the stories, muddled. The child taps
  them in order to put the sentence back together (the first word has the capital letter, the
  last has the full stop). A word out of turn wobbles back; the finished sentence is read aloud.
  Six longer sentences with describing words and -ing and -ed words.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type S = { text: string; pic: string; am: string };
const SENTENCES: S[] = [
  { text: "Haben has a little yellow hat.", pic: "hat", am: "ሐበን ትንሽ ቢጫ ኮፍያ አላት።" },
  { text: "The goat is eating the flower.", pic: "goat", am: "ፍየሏ አበባውን እየበላች ነው።" },
  { text: "Gugu has a red and yellow kite.", pic: "kite", am: "ጉጉ ቀይና ቢጫ ካይት አለው።" },
  { text: "Dimmet is under the bed.", pic: "bed", am: "ዲሜት ከአልጋው ሥር ናት።" },
  { text: "Hawi is running fast.", pic: "foot", am: "ሀዊ በፍጥነት እየሮጠች ነው።" },
  { text: "Ayan jumped over the rock.", pic: "rock", am: "አያን ድንጋዩን ዘለለች።" },
];
const TEAL = "#0E8C80";

export default function SentenceScramble({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [built, setBuilt] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = i >= SENTENCES.length;
  const s = SENTENCES[Math.min(i, SENTENCES.length - 1)];
  const words = s.text.split(" ");
  const complete = built >= words.length;
  const cards = useMemo(() => shuffled(s.text.split(" ").map((w, k) => ({ w, k })), (i + 4) / 29), [s.text, i]);

  const tap = (k: number) => {
    if (complete || k < built) return;
    // a word that is the same as the next one fits too ("the… the")
    if (k === built || words[k] === words[built]) {
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
        }, 2800);
      }
    } else {
      sfx.oops();
      setWrong(k);
    }
  };

  // which cards are already used: the first `built` positions, matched by word
  const usedCount: Record<string, number> = {};
  words.slice(0, built).forEach((w) => (usedCount[w] = (usedCount[w] ?? 0) + 1));
  const seen: Record<string, number> = {};
  const isUsed = (w: string) => {
    seen[w] = (seen[w] ?? 0) + 1;
    return seen[w] <= (usedCount[w] ?? 0);
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Sentence Scramble", am: "የተደበላለቀ ዓረፍተ ነገር" }}
      howTo={{ en: "The words are muddled! Tap them in order. The capital letter goes first, the full stop last.", am: "ቃላቱ ተደበላልቀዋል! በቅደም ተከተል ንኩ። ትልቁ ፊደል መጀመሪያ፣ ነጥቡ መጨረሻ።" }}
      total={SENTENCES.length}
      got={Math.min(i + (complete ? 1 : 0), SENTENCES.length)}
      done={done}
      onDone={onDone}
      color={TEAL}
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
        <motion.div key={s.pic} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl border-4 bg-white p-1" style={{ borderColor: TEAL }}>
          <Pic id={s.pic} size={80} />
        </motion.div>
        {complete && <Hear text={s.text} lang={lang} color={TEAL} />}
      </div>

      <div className="mt-3 flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-2xl border-b-4 border-dashed px-2 pb-2" style={{ borderColor: TEAL }} lang="en" data-built={built}>
        {words.slice(0, built).map((w, k) => (
          <motion.span key={`${i}-${k}`} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl px-2 py-1 text-2xl font-bold" style={{ ...ANDIKA, background: complete ? "#E4F7EA" : "#FFFFFF" }}>
            {w}
          </motion.span>
        ))}
        {!built && <span className="text-base text-[#B9A58C]">{t(lang, { en: "The sentence goes here", am: "ዓረፍተ ነገሩ እዚህ ይሠራል" })}</span>}
      </div>

      <div className="mt-4 flex min-h-[60px] flex-wrap justify-center gap-2" lang="en">
        {cards.map(({ w, k }) =>
          isUsed(w) ? null : (
            <motion.button
              key={`${i}-${k}`}
              type="button"
              data-card={k}
              data-choice={w === words[built] ? "right" : "wrong"}
              onClick={() => tap(k)}
              animate={wrong === k ? { x: [0, -6, 6, -4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border-4 bg-white px-3 py-2 text-2xl font-bold shadow-[0_4px_0_#00000022] active:translate-y-0.5"
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
        <Note tone="try">{t(lang, built ? { en: "Not yet! Read what you have, then find the next word.", am: "ገና ነው! ያላችሁን አንብቡ፤ ከዚያ ቀጣዩን ቃል ፈልጉ።" } : { en: "Not yet! Which word has the capital letter?", am: "ገና ነው! ትልቅ ፊደል ያለው የትኛው ቃል ነው?" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, built ? { en: "Now the next word!", am: "አሁን ቀጣዩን ቃል!" } : { en: "Tap the first word.", am: "የመጀመሪያውን ቃል ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
