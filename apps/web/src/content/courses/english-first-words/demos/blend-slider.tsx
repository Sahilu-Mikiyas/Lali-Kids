"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Slow, Slow… Fast!" (level 5): the blending slider, after Grandma's trick in "Grandma Says It
  Slowly". Three letter tiles stand far apart, each with its sound under it (‘c’ ‘a’ ‘t’). The child
  pushes the slider (a finger, a mouse, or the arrow keys): the tiles slide closer and closer
  until they bump together, and the voice says the whole word. Then three pictures appear and
  the child taps the one the word names. Six words: cat, sun, fig, bed, pot, hen.
  The voice cannot say a lone sound, so the sounds are shown for a grown-up to say aloud; the
  voice only says whole words.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type W = { word: string; am: string };
const WORDS: W[] = [
  { word: "cat", am: "ድመት" },
  { word: "sun", am: "ፀሐይ" },
  { word: "fig", am: "በለስ" },
  { word: "bed", am: "አልጋ" },
  { word: "pot", am: "ድስት" },
  { word: "hen", am: "ዶሮ" },
];
const COLORS = ["#E8513B", "#2F6FD0", "#2E9A5B"];
const BLUE = "#2F6FD0";

export default function BlendSlider({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [v, setV] = useState(0);
  const [blended, setBlended] = useState(false);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= WORDS.length;
  const w = WORDS[Math.min(i, WORDS.length - 1)];
  const pics = useMemo(() => {
    const others = shuffled(WORDS.filter((x) => x.word !== w.word), (i + 4) / 13).slice(0, 2);
    return shuffled([w, ...others], (i + 9) / 17);
  }, [w, i]);

  const slide = (n: number) => {
    if (blended) return;
    setV(n);
    if (n >= 100) {
      setBlended(true);
      sfx.good();
      say(w.word, 0.8);
    }
  };

  const pick = (x: W) => {
    if (hit || !blended) return;
    if (x.word === w.word) {
      sfx.good();
      say(`${w.word}!`);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setBlended(false);
        setV(0);
        setI((n) => n + 1);
      }, 1800);
    } else {
      sfx.oops();
      setWrong(x.word);
    }
  };

  // the gap between the tiles, from wide apart (0) to touching (100)
  const gap = Math.round((1 - v / 100) * 46);

  return (
    <Frame
      lang={lang}
      title={{ en: "Slow, Slow… Fast!", am: "ቀስ፣ ቀስ… ፈጠን!" }}
      howTo={{ en: "Say each sound. Push the slider to blend them into a word!", am: "እያንዳንዱን ድምፅ በሉ። ድምፆቹን አጣምራችሁ ቃል ለመሥራት ተንሸራታቹን ግፉ!" }}
      total={WORDS.length}
      got={Math.min(i + (hit ? 1 : 0), WORDS.length)}
      done={done}
      onDone={onDone}
      color={BLUE}
      onAgain={() => {
        setI(0);
        setV(0);
        setBlended(false);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {WORDS.map((x) => (
            <span key={x.word} className="flex items-center gap-1 rounded-xl bg-[#EAF1FC] px-2 py-1 text-lg font-bold" style={ANDIKA}>
              <Pic id={x.word} size={28} />
              {x.word.split("").join("-")} = {x.word}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex min-h-[112px] items-center justify-center" lang="en" data-gap={gap}>
        {w.word.split("").map((ch, k) => (
          <motion.div key={`${i}-${k}`} animate={{ marginLeft: k ? gap : 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="flex flex-col items-center">
            <span className="grid h-[72px] w-[60px] place-items-center rounded-2xl text-5xl font-bold text-white shadow-[0_4px_0_#00000026]" style={{ ...ANDIKA, background: COLORS[k] }}>
              {ch}
            </span>
            <span className="mt-1 text-lg text-[#5B4636]" style={ANDIKA}>
              ‘{ch}’
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-2 flex max-w-[340px] items-center gap-3">
        <span className="text-sm font-bold text-[#5B4636]">{t(lang, { en: "slow", am: "ቀስ" })}</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={v}
          data-slider=""
          onChange={(e) => slide(Number(e.target.value))}
          aria-label={t(lang, { en: "Blend the sounds", am: "ድምፆቹን አጣምሩ" })}
          className="h-10 flex-1 cursor-pointer"
          style={{ accentColor: BLUE }}
          disabled={blended}
        />
        <span className="text-sm font-bold text-[#5B4636]">{t(lang, { en: "fast!", am: "ፈጠን!" })}</span>
      </div>

      {blended && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-4xl font-black" style={{ ...ANDIKA, color: BLUE }} lang="en">
              {w.word}!
            </span>
            <Hear text={w.word} lang={lang} color={BLUE} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {pics.map((x) => (
              <motion.button
                key={`${i}-${x.word}`}
                type="button"
                data-choice={x.word === w.word ? "right" : "wrong"}
                onClick={() => pick(x)}
                animate={hit && x.word === w.word ? { y: [0, -14, 0] } : wrong === x.word ? { x: [0, -6, 6, 0] } : {}}
                className="grid place-items-center rounded-3xl border-4 bg-white p-2 shadow-[0_5px_0_#D3E4F4] active:translate-y-0.5"
                style={{ borderColor: hit && x.word === w.word ? "#2FA35A" : wrong === x.word ? "#E58A00" : "#FFFFFF" }}
                aria-label={x.word}
              >
                <Pic id={x.word} size={76} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {w.word.split("").join("… ")}… {w.word}!
          </span>
          {lang === "am" && ` (${w.am})`}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `That's a ${wrong}. Which picture is "${w.word}"?`, am: `ያ ${wrong} ነው። «${w.word}» የትኛው ሥዕል ነው?` })}</Note>
      ) : blended ? (
        <Note tone="plain">{t(lang, { en: "Tap the picture.", am: "ሥዕሉን ንኩ።" })}</Note>
      ) : (
        <Note tone="plain">
          {t(lang, { en: "Say the sounds slowly, then push the slider all the way!", am: "ድምፆቹን ቀስ ብላችሁ በሉ፤ ከዚያ ተንሸራታቹን እስከ መጨረሻ ግፉ!" })}
        </Note>
      )}
    </Frame>
  );
}
