"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, t, type T } from "./kit";

/*
  "Now or Done?" (level 3): action words with -ing and -ed, from Hawi's sports day. Each card
  starts with "Look! Now…" (something is happening: it moves) or "Yesterday…" (it is all done: a
  tick). The child picks the word that fits the gap: "is jumping" or "jumped". Then the voice
  reads the whole sentence. Eight sentences, half now and half done.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type R = { before: string; after: string; ing: string; ed: string; now: boolean; pic: string; am: string };
const ROUNDS: R[] = [
  { before: "Look! Hawi", after: ".", ing: "is jumping", ed: "jumped", now: true, pic: "foot", am: "ተመልከቱ! ሀዊ እየዘለለች ነው።" },
  { before: "Yesterday Haben", after: "the ball.", ing: "is kicking", ed: "kicked", now: false, pic: "ball", am: "ትናንት ሐበን ኳሱን መታች።" },
  { before: "Look! Gugu", after: "the sack.", ing: "is pulling", ed: "pulled", now: true, pic: "sack", am: "ተመልከቱ! ጉጉ ጆንያውን እየጎተተ ነው።" },
  { before: "Yesterday we", after: "in the yard.", ing: "are playing", ed: "played", now: false, pic: "ball", am: "ትናንት በግቢው ውስጥ ተጫወትን።" },
  { before: "Look! Grandma", after: "the pot.", ing: "is painting", ed: "painted", now: true, pic: "paint", am: "ተመልከቱ! አያቴ ድስቱን ቀለም እየቀባች ነው።" },
  { before: "Yesterday Anbessa", after: "Grandma.", ing: "is helping", ed: "helped", now: false, pic: "heart", am: "ትናንት አንበሳ አያቴን ረዳ።" },
  { before: "Look! Haben", after: "the rock.", ing: "is climbing", ed: "climbed", now: true, pic: "rock", am: "ተመልከቱ! ሐበን ድንጋዩ ላይ እየወጣች ነው።" },
  { before: "Yesterday Ayan", after: "for the train.", ing: "is waiting", ed: "waited", now: false, pic: "train", am: "ትናንት አያን ባቡሩን ጠበቀች።" },
];
const NOW = "#E8513B";
const DONE = "#2F6FD0";
const LABEL: Record<"now" | "done", T> = { now: { en: "Now", am: "አሁን" }, done: { en: "All done", am: "ተፈጽሟል" } };

export default function NowOrDone({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const right = r.now ? r.ing : r.ed;
  const sentence = `${r.before} ${right}${r.after === "." ? "." : ` ${r.after}`}`;
  // the -ing word first on most rounds, the -ed word first on every third one
  const options = i % 3 === 1 ? [r.ed, r.ing] : [r.ing, r.ed];

  const pick = (o: string) => {
    if (hit) return;
    if (o === right) {
      sfx.good();
      say(sentence, 0.8);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2400);
    } else {
      sfx.oops();
      setWrong(o);
    }
  };

  const color = r.now ? NOW : DONE;
  return (
    <Frame
      lang={lang}
      title={{ en: "Now or Done?", am: "አሁን ወይስ ተፈጽሟል?" }}
      howTo={{ en: "Is it happening now (-ing) or is it all done (-ed)? Pick the word that fits.", am: "አሁን እየሆነ ነው (-ing) ወይስ ተፈጽሟል (-ed)? የሚገጥመውን ቃል ምረጡ።" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={NOW}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col items-center gap-1 text-lg font-bold" style={ANDIKA} lang="en">
          {ROUNDS.map((x) => (
            <span key={x.ing}>
              {x.before} <span style={{ color: x.now ? NOW : DONE }}>{x.now ? x.ing : x.ed}</span>
              {x.after === "." ? "." : ` ${x.after}`}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={i} initial={{ scale: 0.6, opacity: 0 }} animate={r.now ? { scale: 1, opacity: 1, y: [0, -10, 0] } : { scale: 1, opacity: 1 }} transition={r.now ? { y: { repeat: Infinity, duration: 0.8 } } : {}} className="rounded-3xl border-4 bg-white p-1" style={{ borderColor: color }}>
          <Pic id={r.pic} size={84} />
        </motion.div>
        <span className="flex items-center gap-1 rounded-full px-3 py-1 text-lg font-bold text-white" style={{ background: color }} data-kind={r.now ? "now" : "done"}>
          {r.now ? (
            <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden>
              <circle cx={10} cy={10} r={8} fill="none" stroke="#fff" strokeWidth={2.4} />
              <path d="M10 5 V10 L14 12" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden>
              <path d="M4 10 L8 14 L16 5" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {LABEL[r.now ? "now" : "done"][lang]}
        </span>
        {hit && <Hear text={sentence} lang={lang} color={color} />}
      </div>

      <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-3xl font-bold" style={ANDIKA} lang="en">
        <span>{r.before}</span>
        {hit ? (
          <motion.span initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl px-2 text-white" style={{ background: color }}>
            {right}
          </motion.span>
        ) : (
          <span className="inline-block min-w-[110px] rounded-xl border-4 border-dashed px-2 text-center text-[#D8C8A8]" style={{ borderColor: "#E3D5C3" }}>
            ?
          </span>
        )}
        {r.after !== "." && <span>{r.after}</span>}
        {r.after === "." && <span>.</span>}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2" lang="en">
        {options.map((o) => (
          <motion.button
            key={`${i}-${o}`}
            type="button"
            data-choice={o === right ? "right" : "wrong"}
            onClick={() => pick(o)}
            animate={wrong === o ? { x: [0, -6, 6, -4, 0] } : {}}
            className="rounded-2xl border-4 bg-white py-3 text-2xl font-bold shadow-[0_5px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: wrong === o ? "#E58A00" : "#FFFFFF" }}
          >
            {o}
          </motion.button>
        ))}
      </div>

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {sentence}
          </span>
          {lang === "am" && ` (${r.am})`}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, r.now ? { en: '"Look!" means it is happening now. Which word ends in -ing?', am: '«Look!» አሁን እየሆነ ነው ማለት ነው። በ-ing የሚያልቀው የትኛው ቃል ነው?' } : { en: '"Yesterday" means it is all done. Which word tells us it already happened?', am: '«Yesterday» (ትናንት) ተፈጽሟል ማለት ነው። ቀድሞ እንደሆነ የሚነግረን የትኛው ቃል ነው?' })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Now: -ing. All done: -ed.", am: "አሁን፦ -ing። ተፈጽሟል፦ -ed።" })}</Note>
      )}
    </Frame>
  );
}
