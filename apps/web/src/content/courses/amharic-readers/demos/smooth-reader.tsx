"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { DemoProps } from "../../types";
import { Btn, FIDEL, Frame, Pic, say, sayWords, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 1, "Slow, then smooth as a river" (after "Smooth as a River" and "Swimming or Main?"):
  a sentence in word cards. First read it slowly: tap each word in order (it lights up and
  sounds). Then press "Smooth!": the words close up, little arches show which words hold hands,
  and the sentence is read smoothly while a yellow highlight follows the reading, word by word
  (with an Amharic voice if the device has one; otherwise a soft chime per word, never English
  text-to-speech). Then pick the picture the sentence is about. Two of the sentences use ዋና,
  soft (swimming) and strong (main): the picture shows which it is. Five sentences, then onDone.
*/

const ROUNDS: { words: string[]; arches: [number, number][]; pic: string; others: string[]; en: string; note?: T }[] = [
  { words: ["ትንሿ", "ድመት", "ወተት", "ጠጣች።"], arches: [[0, 1], [2, 3]], pic: "cat", others: ["hen", "fish"], en: "The little cat drank milk." },
  { words: ["ጉጉ", "ቀይ", "ኳስ", "አለው።"], arches: [[0, 0], [1, 3]], pic: "ball", others: ["shoe", "drum"], en: "Gugu has a red ball." },
  { words: ["ቅዳሜ", "ዋና", "እንሄዳለን።"], arches: [[0, 0], [1, 2]], pic: "swimmer", others: ["gate", "book"], en: "On Saturday we're going swimming.", note: { en: "Here ዋና is soft: wa-na, swimming.", am: "እዚህ «ዋና» ላልቶ ነው፦ መዋኘት።" } },
  { words: ["ዋናው", "በር", "ክፍት", "ነው።"], arches: [[0, 1], [2, 3]], pic: "gate", others: ["swimmer", "window"], en: "The main gate is open.", note: { en: "Here ዋና is strong: wan-na, main.", am: "እዚህ «ዋና» ጠብቆ ነው፦ ዋናው።" } },
  { words: ["ቢራቢሮዋ", "በአበባ", "ላይ", "አረፈች።"], arches: [[0, 0], [1, 3]], pic: "butterfly", others: ["bee", "dove"], en: "The butterfly landed on a flower." },
];

const COPY = {
  title: { en: "Slow, then smooth as a river", am: "ቀስ ብሎ፣ ከዚያ እንደ ወንዝ ለስላሳ" } satisfies T,
  howTo: { en: "Tap each word slowly. Then press Smooth! and read along with the yellow light.", am: "እያንዳንዱን ቃል ቀስ ብላችሁ ንኩ። ከዚያ «ለስላሳ!» ተጭናችሁ ከቢጫው ብርሃን ጋር አንብቡ።" } satisfies T,
  smooth: { en: "Smooth!", am: "ለስላሳ!" } satisfies T,
  again: { en: "Again", am: "እንደገና" } satisfies T,
  which: { en: "What is it about?", am: "ስለ ምንድን ነው?" } satisfies T,
  ending: { en: "Five sentences, smooth as a river. The words held hands!", am: "አምስት ዓረፍተ ነገሮች፣ እንደ ወንዝ ለስላሳ። ቃላቱ እጅ ለእጅ ተያያዙ!" } satisfies T,
};

export default function SmoothReader({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [tapped, setTapped] = useState(0);
  const [phase, setPhase] = useState<"slow" | "reading" | "pick">("slow");
  const [lit, setLit] = useState(-1);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const stop = useRef<(() => void) | null>(null);
  const later = useLater();
  const round = ROUNDS[r];
  const choices = useMemo(() => shuffled([round.pic, ...round.others], r * 0.43 + 0.11), [round, r]);
  const done = got === ROUNDS.length;
  const close = phase !== "slow";

  useEffect(() => () => stop.current?.(), []);

  const tap = (i: number) => {
    if (close) return;
    if (i !== tapped) {
      sfx.oops();
      return;
    }
    say(round.words[i], i);
    setTapped(i + 1);
  };

  const smooth = () => {
    stop.current?.();
    setPhase("reading");
    stop.current = sayWords(round.words, {
      gap: 520,
      onWord: (i) => setLit(i),
      onEnd: () => {
        setLit(-1);
        setPhase("pick");
      },
    });
  };

  const pick = (p: string) => {
    if (right || phase !== "pick") return;
    if (p === round.pic) {
      setRight(true);
      sfx.good();
      later(() => {
        setGot((g) => g + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setTapped(0);
          setPhase("slow");
          setRight(false);
        }
      }, 1700);
    } else {
      sfx.oops();
      setWrong(p);
      later(() => setWrong(null), 600);
    }
  };

  const archOf = (i: number) => round.arches.find(([a, b]) => i >= a && i <= b && a !== b);

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[400px] flex-col items-center">
        <div className="w-full rounded-[28px] bg-white px-2 py-4 shadow-[0_6px_0_#00000014]">
          <motion.div key={r} className="flex flex-wrap items-end justify-center" animate={{ columnGap: close ? 6 : 16, rowGap: 12 }}>
            {round.words.map((w, i) => {
              const arch = archOf(i);
              return (
                <div key={`${r}-${i}`} className="flex flex-col items-center">
                  <motion.button
                    type="button"
                    data-word={i}
                    onClick={() => tap(i)}
                    initial={{ scale: 0 }}
                    animate={{ scale: i === tapped && !close ? [1, 1.08, 1] : 1, backgroundColor: lit === i ? "#FFE27A" : !close && i < tapped ? "#FFF1C2" : "#FFFFFF" }}
                    transition={i === tapped && !close ? { repeat: Infinity, duration: 1.1 } : { duration: 0.15 }}
                    className={`rounded-xl px-1.5 py-1 text-[28px] font-bold leading-tight ${close ? "" : "border-2 border-[#D9C4A2]"}`}
                    style={FIDEL}
                  >
                    {w}
                  </motion.button>
                  <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" className="block w-full" aria-hidden>
                    {close && arch && <path d={i === arch[0] ? "M8 2 Q60 12 100 8" : i === arch[1] ? "M0 8 Q40 12 92 2" : "M0 8 H100"} stroke="#2F7FB8" strokeWidth={3} fill="none" vectorEffect="non-scaling-stroke" />}
                  </svg>
                </div>
              );
            })}
          </motion.div>
          {lang === "en" && phase === "pick" && <p className="mt-1 text-center text-sm text-[#5B4636]">{round.en}</p>}
          {phase === "pick" && round.note && <p className="mt-1 text-center text-sm font-bold text-[#2F7FB8]">{round.note[lang]}</p>}
        </div>

        {phase === "slow" && (
          <Btn lang={lang} onClick={smooth} disabled={tapped < round.words.length} color="#2F7FB8" shade="#1E5A8A" className="mt-4" data="smooth">
            {COPY.smooth[lang]} 〰
          </Btn>
        )}
        {phase === "pick" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 w-full">
            <div className="mb-2 flex items-center justify-center gap-3">
              <p className="text-lg font-bold">{COPY.which[lang]}</p>
              <button type="button" onClick={smooth} className="rounded-full bg-[#E9F2FB] px-3 py-1 text-sm font-bold text-[#2F7FB8]" style={lang === "am" ? FIDEL : undefined}>
                ↻ {COPY.again[lang]}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {choices.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  data-pick={p}
                  onClick={() => pick(p)}
                  animate={wrong === p ? { x: [0, -8, 8, -6, 0] } : right && p === round.pic ? { scale: [1, 1.15, 1] } : {}}
                  className={`grid aspect-square place-items-center rounded-3xl bg-white shadow-[0_4px_0_#00000018] ${right && p === round.pic ? "ring-4 ring-[#2E9A5B]" : ""}`}
                  aria-label={p}
                >
                  <Pic id={p} size={76} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Frame>
  );
}
