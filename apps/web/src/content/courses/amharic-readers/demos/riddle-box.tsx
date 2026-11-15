"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { Btn, FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 5, "Riddle box" (after "Riddle Night"): the riddle game the traditional way. Lali says
  «እንቆቅልሽ!»; the child answers by pressing «ምን አውቅልሽ!»; then the riddle appears, clue by
  clue (each line pops in). Pick the answer from three pictures; a wrong guess lights up the best
  clue word. Five riddles (made for this course, not traditional fixed riddles), then onDone.
*/

const RIDDLES: { lines: string[]; en: string; clue: string; pic: string; others: string[]; answer: string }[] = [
  { lines: ["ቤቷን በጀርባዋ ተሸክማ", "በጣም ቀስ ብላ ትሄዳለች።"], en: "She carries her house on her back and walks very slowly.", clue: "ቤቷን", pic: "turtle", others: ["camel", "cat"], answer: "ኤሊ" },
  { lines: ["ቀን ትደበቃለች፤", "ማታ ትወጣለች።"], en: "She hides by day and comes out at night.", clue: "ማታ", pic: "moon", others: ["sun", "flower"], answer: "ጨረቃ" },
  { lines: ["ብዙ ጥርስ አለው፤", "ግን አይበላም።"], en: "It has many teeth, but it never eats.", clue: "ጥርስ", pic: "comb", others: ["cake", "bread"], answer: "ማበጠሪያ" },
  { lines: ["ብዙ ዓይን አላት፤", "ግን አታይም።"], en: "She has many eyes, but she can't see.", clue: "ዓይን", pic: "injera", others: ["fish", "cat"], answer: "እንጀራ" },
  { lines: ["ትንሽ ናት፤ ዝዝ ትላለች፤", "ጣፋጭ ማር ትሠራለች።"], en: "She's small, she says bzz, she makes sweet honey.", clue: "ማር", pic: "bee", others: ["butterfly", "dove"], answer: "ንብ" },
];

const COPY = {
  title: { en: "Riddle box", am: "የእንቆቅልሽ ሣጥን" } satisfies T,
  howTo: { en: "Answer «ምን አውቅልሽ!», read the riddle, and pick the answer.", am: "«ምን አውቅልሽ!» ብላችሁ መልሱ፤ እንቆቅልሹን አንብቡ፤ መልሱን ምረጡ።" } satisfies T,
  call: { en: "Lali says:", am: "ላሊ እንዲህ ትላለች፦" } satisfies T,
  ending: { en: "Five riddles solved! Now make one up for your family.", am: "አምስት እንቆቅልሾች ተፈቱ! አሁን ለቤተሰባችሁ አንድ ፍጠሩ።" } satisfies T,
};

export default function RiddleBox({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const rd = RIDDLES[r];
  const choices = useMemo(() => shuffled([rd.pic, ...rd.others], r * 0.27 + 0.4), [rd, r]);
  const done = got === RIDDLES.length;

  const answer = () => {
    setOpen(true);
    say("ምን አውቅልሽ");
    later(() => say(rd.lines.join(" ")), 900);
  };

  const pick = (p: string) => {
    if (right) return;
    if (p === rd.pic) {
      setRight(true);
      sfx.good();
      say(rd.answer);
      later(() => {
        setGot((g) => g + 1);
        if (r + 1 < RIDDLES.length) {
          setR(r + 1);
          setOpen(false);
          setRight(false);
          setHint(false);
        }
      }, 1900);
    } else {
      sfx.oops();
      setWrong(p);
      setHint(true);
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={RIDDLES.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[400px] flex-col items-center">
        <motion.div key={`call${r}`} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full bg-[#3B3F94] px-5 py-2 text-center text-white">
          <span className="block text-xs opacity-80" style={lang === "am" ? FIDEL : undefined}>
            {COPY.call[lang]}
          </span>
          <span className="text-[24px] font-bold" style={FIDEL}>
            እንቆቅልሽ!
          </span>
        </motion.div>
        {!open ? (
          <Btn lang={lang} onClick={answer} color="#E3A511" shade="#A87A08" className="mt-4" data="answer">
            <span style={FIDEL}>ምን አውቅልሽ!</span>
          </Btn>
        ) : (
          <div className="mt-3 w-full">
            <div className="rounded-[24px] border-2 border-[#B9A47A] bg-[#FFFDF6] px-4 py-3 text-center">
              {rd.lines.map((l, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.6 }} className="text-[24px] font-bold leading-snug" style={FIDEL}>
                  {hint && l.includes(rd.clue) ? (
                    <>
                      {l.slice(0, l.indexOf(rd.clue))}
                      <span className="rounded-md bg-[#FFE27A] px-0.5">{rd.clue}</span>
                      {l.slice(l.indexOf(rd.clue) + rd.clue.length)}
                    </>
                  ) : (
                    l
                  )}
                </motion.p>
              ))}
              {lang === "en" && <p className="mt-1 text-xs text-[#7A6A5A]">{rd.en}</p>}
              {right && (
                <motion.p initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="mt-1 text-[26px] font-bold text-[#2E9A5B]" style={FIDEL}>
                  {rd.answer}!
                </motion.p>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {choices.map((p) => (
                <motion.button
                  key={`${r}-${p}`}
                  type="button"
                  data-pick={p}
                  onClick={() => pick(p)}
                  animate={wrong === p ? { x: [0, -8, 8, -6, 0] } : right && p === rd.pic ? { scale: [1, 1.15, 1] } : {}}
                  className={`grid aspect-square place-items-center rounded-3xl bg-white shadow-[0_4px_0_#00000018] ${right && p === rd.pic ? "ring-4 ring-[#2E9A5B]" : ""}`}
                  aria-label={p}
                >
                  <Pic id={p} size={74} />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Frame>
  );
}
