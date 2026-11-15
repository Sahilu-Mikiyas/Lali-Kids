"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Two Letters, One Sound" (level 1): the digraph detective. A picture and its word with two
  letters missing (fi _ _, _ _ ree). The child taps the pair that fills the gap: sh, ch, th, ck or
  ng. The pair slides into the gap as one tile (two letters, one sound), and the voice says the
  whole word. Ten words. The voice only says whole words, never a lone sound.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type W = { word: string; team: string; am: string };
const WORDS: W[] = [
  { word: "fish", team: "sh", am: "ዓሣ" },
  { word: "chick", team: "ch", am: "ጫጩት" },
  { word: "three", team: "th", am: "ሦስት" },
  { word: "duck", team: "ck", am: "ዳክዬ" },
  { word: "ring", team: "ng", am: "ቀለበት" },
  { word: "ship", team: "sh", am: "መርከብ" },
  { word: "chair", team: "ch", am: "ወንበር" },
  { word: "bath", team: "th", am: "ገንዳ" },
  { word: "sock", team: "ck", am: "ካልሲ" },
  { word: "king", team: "ng", am: "ንጉሥ" },
];
const TEAMS = ["sh", "ch", "th", "ck", "ng"];
const COLORS: Record<string, string> = { sh: "#D9662B", ch: "#8E5BE0", th: "#2F6FD0", ck: "#2E9A5B", ng: "#C42A5A" };
const PICS: Record<string, string> = { three: "three", chick: "chick" };

export default function DigraphDetective({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= WORDS.length;
  const w = WORDS[Math.min(i, WORDS.length - 1)];
  const at = w.word.indexOf(w.team);
  // the right pair and two others, muddled
  const options = useMemo(() => shuffled([w.team, ...shuffled(TEAMS.filter((x) => x !== w.team), (i + 2) / 11).slice(0, 2)], (i + 5) / 13), [w, i]);

  const pick = (team: string) => {
    if (hit) return;
    if (team === w.team) {
      sfx.good();
      say(w.word, 0.8);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 1900);
    } else {
      sfx.oops();
      setWrong(team);
    }
  };

  const color = COLORS[w.team];
  return (
    <Frame
      lang={lang}
      title={{ en: "Two Letters, One Sound", am: "ሁለት ፊደሎች፣ አንድ ድምፅ" }}
      howTo={{ en: "Look at the picture. Which two letters fill the gap?", am: "ሥዕሉን ተመልከቱ። ክፍተቱን የሚሞሉት የትኞቹ ሁለት ፊደሎች ናቸው?" }}
      total={WORDS.length}
      got={Math.min(i + (hit ? 1 : 0), WORDS.length)}
      done={done}
      onDone={onDone}
      color="#D9662B"
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {WORDS.map((x) => (
            <span key={x.word} className="flex items-center gap-1 rounded-xl bg-[#FFF1E6] px-2 py-1 text-lg font-bold" style={ANDIKA}>
              <Pic id={PICS[x.word] ?? x.word} size={28} />
              {x.word.slice(0, x.word.indexOf(x.team))}
              <span style={{ color: COLORS[x.team] }}>{x.team}</span>
              {x.word.slice(x.word.indexOf(x.team) + 2)}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={w.word} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl border-4 bg-white p-1" style={{ borderColor: color }}>
          <Pic id={PICS[w.word] ?? w.word} size={96} />
        </motion.div>
        {hit && <Hear text={w.word} lang={lang} color={color} />}
      </div>

      <div className="mt-3 flex min-h-[76px] items-center justify-center gap-1" lang="en" data-word={w.word}>
        {w.word.slice(0, at).split("").map((ch, k) => (
          <span key={`a${k}`} className="grid h-16 w-12 place-items-center rounded-xl bg-white text-4xl font-bold shadow-[0_3px_0_#00000018]" style={ANDIKA}>
            {ch}
          </span>
        ))}
        {hit ? (
          <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid h-16 w-[84px] place-items-center rounded-xl text-4xl font-bold text-white" style={{ ...ANDIKA, background: color }}>
            {w.team}
          </motion.span>
        ) : (
          <span className="grid h-16 w-[84px] place-items-center rounded-xl border-4 border-dashed text-3xl text-[#B9A58C]" style={{ borderColor: "#E3D5C3" }}>
            ?
          </span>
        )}
        {w.word.slice(at + 2).split("").map((ch, k) => (
          <span key={`b${k}`} className="grid h-16 w-12 place-items-center rounded-xl bg-white text-4xl font-bold shadow-[0_3px_0_#00000018]" style={ANDIKA}>
            {ch}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2" lang="en">
        {options.map((o) => (
          <motion.button
            key={`${i}-${o}`}
            type="button"
            data-choice={o === w.team ? "right" : "wrong"}
            onClick={() => pick(o)}
            animate={wrong === o ? { x: [0, -6, 6, -4, 0] } : {}}
            className="rounded-2xl border-4 bg-white py-3 text-4xl font-bold shadow-[0_5px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, color: COLORS[o], borderColor: wrong === o ? "#E58A00" : COLORS[o] }}
          >
            {o}
          </motion.button>
        ))}
      </div>

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {w.team}… {w.word}!
          </span>
          {lang === "am" && ` (${w.am})`}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `"${wrong}" doesn't fit. Say the word for the picture slowly and listen again.`, am: `«${wrong}» አይገጥምም። የሥዕሉን ቃል በቀስታ በሉና እንደገና አዳምጡ።` })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Two letters, one sound! Tap the pair.", am: "ሁለት ፊደሎች፣ አንድ ድምፅ! ጥንዱን ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
