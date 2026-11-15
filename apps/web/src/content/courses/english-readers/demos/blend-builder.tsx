"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Build the Blend" (level 1): a picture and the end of its word (_ _ og). The child builds the
  blend at the start letter by letter from four letter tiles: f, then r. Both sounds stay in a
  blend, so each letter has its own slot; when both are in, the slots slide together and the
  voice says the whole word. Six words: frog, stop, truck, grapes, spoon, blocks.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type W = { word: string; am: string; extra: string[] };
const WORDS: W[] = [
  { word: "frog", am: "እንቁራሪት", extra: ["l", "t"] },
  { word: "stop", am: "ቁም", extra: ["p", "r"] },
  { word: "truck", am: "የጭነት መኪና", extra: ["s", "l"] },
  { word: "grapes", am: "ወይን", extra: ["b", "t"] },
  { word: "spoon", am: "ማንኪያ", extra: ["t", "r"] },
  { word: "blocks", am: "ኩቦች", extra: ["r", "s"] },
];
const RED = "#E8413B";

export default function BlendBuilder({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [placed, setPlaced] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = i >= WORDS.length;
  const w = WORDS[Math.min(i, WORDS.length - 1)];
  const blend = w.word.slice(0, 2);
  const complete = placed >= 2;
  const tiles = useMemo(() => shuffled([blend[0], blend[1], ...w.extra].map((l, k) => ({ l, k })), (i + 3) / 17), [blend, w, i]);
  const [used, setUsed] = useState<number[]>([]);

  const tap = (l: string, k: number) => {
    if (complete || used.includes(k)) return;
    if (l === blend[placed]) {
      sfx.tap();
      const n = placed + 1;
      setPlaced(n);
      setUsed((u) => [...u, k]);
      setWrong(null);
      if (n >= 2) {
        sfx.good();
        setTimeout(() => say(w.word, 0.8), 500);
        setTimeout(() => {
          setPlaced(0);
          setUsed([]);
          setI((x) => x + 1);
        }, 2400);
      }
    } else {
      sfx.oops();
      setWrong(k);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Build the Blend", am: "ጥምር ድምፁን ሥሩ" }}
      howTo={{ en: "Say the picture's word slowly. Which two sounds come first? Tap them in order.", am: "የሥዕሉን ቃል በቀስታ በሉ። መጀመሪያ የሚመጡት ሁለት ድምፆች የትኞቹ ናቸው? በቅደም ተከተል ንኩ።" }}
      total={WORDS.length}
      got={Math.min(i + (complete ? 1 : 0), WORDS.length)}
      done={done}
      onDone={onDone}
      color={RED}
      onAgain={() => {
        setI(0);
        setPlaced(0);
        setUsed([]);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {WORDS.map((x) => (
            <span key={x.word} className="flex items-center gap-1 rounded-xl bg-[#FDECEA] px-2 py-1 text-lg font-bold" style={ANDIKA}>
              <Pic id={x.word} size={28} />
              <span style={{ color: RED }}>{x.word.slice(0, 2)}</span>
              {x.word.slice(2)}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={w.word} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl border-4 bg-white p-1" style={{ borderColor: RED }}>
          <Pic id={w.word} size={96} />
        </motion.div>
        {complete && <Hear text={w.word} lang={lang} color={RED} />}
      </div>

      <div className="mt-3 flex min-h-[76px] items-center justify-center" lang="en" data-placed={placed}>
        {[0, 1].map((k) => (
          <motion.span
            key={k}
            animate={{ marginRight: complete ? 2 : 10 }}
            className="grid h-16 w-12 place-items-center rounded-xl text-4xl font-bold"
            style={{ ...ANDIKA, background: k < placed ? RED : "#FFFFFF", color: k < placed ? "#FFFFFF" : "#B9A58C", border: k < placed ? "none" : "4px dashed #E3D5C3" }}
          >
            {k < placed ? blend[k] : "?"}
          </motion.span>
        ))}
        {w.word
          .slice(2)
          .split("")
          .map((ch, k) => (
            <span key={k} className="mx-[1px] grid h-16 w-12 place-items-center rounded-xl bg-white text-4xl font-bold shadow-[0_3px_0_#00000018]" style={ANDIKA}>
              {ch}
            </span>
          ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2" lang="en">
        {tiles.map(({ l, k }) => (
          <motion.button
            key={`${i}-${k}`}
            type="button"
            data-tile={l}
            data-choice={!used.includes(k) && l === blend[placed] ? "right" : "wrong"}
            disabled={used.includes(k)}
            onClick={() => tap(l, k)}
            animate={wrong === k ? { x: [0, -6, 6, -4, 0] } : { opacity: used.includes(k) ? 0.25 : 1 }}
            className="h-16 w-16 rounded-2xl border-4 bg-white text-4xl font-bold shadow-[0_5px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: wrong === k ? "#E58A00" : "#FFFFFF" }}
          >
            {l}
          </motion.button>
        ))}
      </div>

      {complete ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {blend[0]}… {blend[1]}… {blend}… {w.word}!
          </span>
          {lang === "am" && ` (${w.am})`}
        </Note>
      ) : wrong !== null ? (
        <Note tone="try">{t(lang, placed ? { en: "Not that one. Which sound comes next?", am: "ያ አይደለም። ቀጥሎ የሚመጣው ድምፅ የትኛው ነው?" } : { en: "Not that one. Say the word slowly: which sound comes first?", am: "ያ አይደለም። ቃሉን በቀስታ በሉ፦ መጀመሪያ የሚመጣው ድምፅ የትኛው ነው?" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Two sounds together, fast, fast, fast!", am: "ሁለት ድምፆች አብረው፣ ፈጠን፣ ፈጠን፣ ፈጠን!" })}</Note>
      )}
    </Frame>
  );
}
