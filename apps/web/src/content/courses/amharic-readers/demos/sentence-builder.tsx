"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 6, "Build a sentence" (after "The Sentence Builders"): word cards arrive mixed up. Tap them
  in the right order (who first, the doing-word at the end); a wrong card wobbles. Then choose the
  mark that ends it: ። when we tell, ? when we ask, ! when we are surprised or excited. The cue says
  which. Five sentences, then onDone. Amharic is a first draft.
*/

type Mark = "።" | "?" | "!";
const MARKS: { m: Mark; en: string; am: string }[] = [
  { m: "።", en: "telling", am: "መንገር" },
  { m: "?", en: "asking", am: "መጠየቅ" },
  { m: "!", en: "surprise", am: "መደነቅ" },
];

const ROUNDS: { words: string[]; mark: Mark; cue: T; en: string }[] = [
  { words: ["ፍየሏ", "ሣር", "በላች"], mark: "።", cue: { en: "Tell it.", am: "ንገሩ።" }, en: "The goat ate grass." },
  { words: ["ጨረቃ", "ወጣች"], mark: "።", cue: { en: "Tell it.", am: "ንገሩ።" }, en: "The moon came out." },
  { words: ["ዶሮዋ", "የት", "ሄደች"], mark: "?", cue: { en: "Ask it.", am: "ጠይቁ።" }, en: "Where did the hen go?" },
  { words: ["አብዲ", "ኳስ", "ይዞ", "ሮጠ"], mark: "።", cue: { en: "Tell it.", am: "ንገሩ።" }, en: "Abdi ran holding a ball." },
  { words: ["ዝናብ", "መጣ"], mark: "!", cue: { en: "Say it with surprise!", am: "በመደነቅ ተናገሩ!" }, en: "The rain came!" },
];

const COPY = {
  title: { en: "Build a sentence", am: "ዓረፍተ ነገር ገንቡ" } satisfies T,
  howTo: { en: "Tap the words in order. The doing-word goes at the end. Then pick the mark.", am: "ቃላቱን በቅደም ተከተል ንኩ። ድርጊቱ መጨረሻ ላይ ይገባል። ከዚያ ምልክቱን ምረጡ።" } satisfies T,
  mark: { en: "Which mark ends it?", am: "በየትኛው ምልክት ያልቃል?" } satisfies T,
  ending: { en: "Five sentences built: who, did what, and a mark at the end!", am: "አምስት ዓረፍተ ነገሮች ተገነቡ፦ ማን፣ ምን አደረገ፣ መጨረሻ ላይም ምልክት!" } satisfies T,
};

export default function SentenceBuilder({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [n, setN] = useState(0);
  const [mark, setMark] = useState<Mark | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [got, setGot] = useState(0);
  const later = useLater();
  const rd = ROUNDS[r];
  const tiles = useMemo(() => shuffled(rd.words.map((w, i) => ({ w, i })), r * 0.19 + 0.37), [rd, r]);
  const built = n === rd.words.length;
  const done = got === ROUNDS.length;

  const tap = (i: number) => {
    if (built) return;
    if (i === n) {
      sfx.tap();
      say(rd.words[i]);
      setN(n + 1);
    } else {
      sfx.oops();
      setWrong(`w${i}`);
      later(() => setWrong(null), 600);
    }
  };

  const pickMark = (m: Mark) => {
    if (!built || mark) return;
    if (m === rd.mark) {
      setMark(m);
      sfx.good();
      say(rd.words.join(" "));
      later(() => {
        setGot((g) => g + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setN(0);
          setMark(null);
        }
      }, 1700);
    } else {
      sfx.oops();
      setWrong(m);
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[440px] flex-col items-center">
        <span className="rounded-full bg-[#3B3F94] px-4 py-1 text-sm font-bold text-white" style={lang === "am" ? FIDEL : undefined}>
          {rd.cue[lang]}
        </span>
        <div className="mt-3 flex min-h-[64px] w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#B9A47A] bg-[#FFFDF6] px-2 py-2" data-strip="">
          {rd.words.slice(0, n).map((w, i) => (
            <motion.span key={`${r}-${i}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`rounded-lg px-1 text-[24px] font-bold ${i === rd.words.length - 1 ? "underline decoration-[#2E9A5B] decoration-4 underline-offset-4" : ""}`} style={FIDEL}>
              {w}
            </motion.span>
          ))}
          {mark && (
            <motion.span initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[28px] font-bold text-[#C2410C]" style={FIDEL}>
              {mark}
            </motion.span>
          )}
        </div>
        {lang === "en" && mark && <p className="mt-1 text-sm text-[#5B4636]">{rd.en}</p>}
        {!built ? (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {tiles.map(({ w, i }) =>
              i < n ? (
                <span key={`${r}-${i}`} className="min-w-[64px] rounded-2xl border-2 border-dashed border-[#E3D5C3] px-3 py-2 text-[22px] text-transparent" style={FIDEL}>
                  {w}
                </span>
              ) : (
                <motion.button key={`${r}-${i}`} type="button" data-tile={i} onClick={() => tap(i)} animate={wrong === `w${i}` ? { x: [0, -8, 8, -6, 0] } : {}} className="min-w-[64px] rounded-2xl bg-white px-3 py-2 text-[22px] font-bold shadow-[0_4px_0_#00000018]" style={FIDEL}>
                  {w}
                </motion.button>
              ),
            )}
          </div>
        ) : (
          <div className="mt-4 w-full text-center">
            <p className="text-base font-bold text-[#5B4636]" style={lang === "am" ? FIDEL : undefined}>
              {COPY.mark[lang]}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {MARKS.map((m) => (
                <motion.button
                  key={m.m}
                  type="button"
                  data-mark={m.m}
                  onClick={() => pickMark(m.m)}
                  animate={wrong === m.m ? { x: [0, -8, 8, -6, 0] } : mark === m.m ? { scale: [1, 1.15, 1] } : {}}
                  className={`flex h-[84px] flex-col items-center justify-center rounded-3xl bg-white shadow-[0_4px_0_#00000018] ${mark === m.m ? "ring-4 ring-[#2E9A5B]" : ""}`}
                >
                  <span className="text-[34px] font-bold leading-none text-[#C2410C]" style={FIDEL}>
                    {m.m}
                  </span>
                  <span className="mt-1 text-xs text-[#5B4636]" style={lang === "am" ? FIDEL : undefined}>
                    {m[lang]}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
}
