"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, sayWords, sfx, useLater, type T } from "./shared/kit";

/*
  Level 2, "Point to it!" (after "The Answer Is Hiding" and "The Note Detectives"): a short story
  card of four sentences and a question with its question word in colour (ማን? ምን? የት? መቼ?
  ለምን?). "Read it to me" reads the story sentence by sentence with a highlight that follows the
  reading. The child taps the sentence that holds the answer; it lights up, and the answer words
  inside it are underlined. Three stories, two questions each, then onDone.
*/

type Q = { q: string; qen: string; answer: number; mark: string };
const STORIES: { lines: string[]; en: string[]; qs: Q[] }[] = [
  {
    lines: ["ሀዊ ቀይ ኳስ አላት።", "ጧት ወደ ሜዳ ሄደች።", "ከጉጉ ጋር ኳስ ተጫወተች።", "ማታ ደክሟት ተኛች።"],
    en: ["Hawi has a red ball.", "In the morning she went to the field.", "She played ball with Gugu.", "In the evening she was tired and went to sleep."],
    qs: [
      { q: "ሀዊ ምን አላት?", qen: "What does Hawi have?", answer: 0, mark: "ቀይ ኳስ" },
      { q: "ሀዊ ከማን ጋር ተጫወተች?", qen: "Who did Hawi play with?", answer: 2, mark: "ከጉጉ" },
    ],
  },
  {
    lines: ["አያን ዳቦ ጋገረች።", "ዳቦው ትኩስና ሞቃት ነው።", "ለአብዲ ግማሹን ሰጠችው።", "አብዲ «አመሰግናለሁ» አለ።"],
    en: ["Ayan baked bread.", "The bread is fresh and warm.", "She gave half to Abdi.", "Abdi said, 'Thank you.'"],
    qs: [
      { q: "ዳቦው ምን ዓይነት ነው?", qen: "What is the bread like?", answer: 1, mark: "ትኩስና ሞቃት" },
      { q: "አብዲ ምን አለ?", qen: "What did Abdi say?", answer: 3, mark: "«አመሰግናለሁ»" },
    ],
  },
  {
    lines: ["ጉጉ ቅዳሜ ወደ ገበያ ሄደ።", "ብርቱካን ገዛ።", "ብርቱካኑን ለአያቴ ሰጠ።", "ምክንያቱም አያቴ ታማለች።"],
    en: ["On Saturday Gugu went to the market.", "He bought oranges.", "He gave the oranges to Grandma.", "Because Grandma is ill."],
    qs: [
      { q: "ጉጉ መቼ ወደ ገበያ ሄደ?", qen: "When did Gugu go to the market?", answer: 0, mark: "ቅዳሜ" },
      { q: "ብርቱካኑ ለምን ለአያቴ ሆነ?", qen: "Why were the oranges for Grandma?", answer: 3, mark: "አያቴ ታማለች" },
    ],
  },
];
const ROUNDS = STORIES.flatMap((s, si) => s.qs.map((q) => ({ si, q })));

const QWORDS: [string, string][] = [
  ["ማን", "#8A4FB0"],
  ["ምን", "#2E9A5B"],
  ["የት", "#2F7FB8"],
  ["መቼ", "#C2410C"],
  ["ለምን", "#D9822B"],
];

/** The question with its question word in colour. */
function Question({ text }: { text: string }) {
  const found = QWORDS.flatMap(([w, c]) => {
    const i = text.indexOf(w);
    return i < 0 ? [] : [{ w, c, i }];
  }).sort((a, b) => b.w.length - a.w.length)[0];
  if (!found) return <>{text}</>;
  return (
    <>
      {text.slice(0, found.i)}
      <span className="rounded-md px-1" style={{ background: "#FFFFFF", color: found.c }}>{found.w}</span>
      {text.slice(found.i + found.w.length)}
    </>
  );
}

const COPY = {
  title: { en: "Point to it!", am: "በጣታችሁ አሳዩ!" } satisfies T,
  howTo: { en: "Read the story, then tap the sentence that answers the question.", am: "ታሪኩን አንብቡ፤ ከዚያ ጥያቄውን የሚመልሰውን ዓረፍተ ነገር ንኩ።" } satisfies T,
  read: { en: "Read it to me", am: "አንብቡልኝ" } satisfies T,
  ending: { en: "Six answers, every one found in the words!", am: "ስድስት መልሶች፤ ሁሉም በቃላቱ ውስጥ ተገኙ!" } satisfies T,
};

export default function FindTheAnswer({ lang, onDone }: DemoProps) {
  const [r, setR] = useState(0);
  const [lit, setLit] = useState(-1);
  const [found, setFound] = useState(false);
  const [wrong, setWrong] = useState(-1);
  const [got, setGot] = useState(0);
  const stop = useRef<(() => void) | null>(null);
  const later = useLater();
  const { si, q } = ROUNDS[r];
  const story = STORIES[si];
  const done = got === ROUNDS.length;

  useEffect(() => () => stop.current?.(), []);

  const readAll = () => {
    stop.current?.();
    stop.current = sayWords(story.lines, { gap: 1500, onWord: (i) => setLit(i), onEnd: () => setLit(-1) });
  };

  const tapLine = (i: number) => {
    if (found) return;
    stop.current?.();
    setLit(-1);
    if (i === q.answer) {
      setFound(true);
      sfx.good();
      later(() => {
        setGot((g) => g + 1);
        if (r + 1 < ROUNDS.length) {
          setR(r + 1);
          setFound(false);
        }
      }, 1900);
    } else {
      sfx.oops();
      setWrong(i);
      later(() => setWrong(-1), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={ROUNDS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[420px] flex-col items-stretch">
        <motion.div key={`q${r}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-3 rounded-2xl bg-[#5B5FC7] px-3 py-2 text-center text-white">
          <p className="text-[22px] font-bold" style={FIDEL}>
            <Question text={q.q} />
          </p>
          {lang === "en" && <p className="text-sm opacity-90">{q.qen}</p>}
        </motion.div>
        <div className="rounded-[24px] border-2 border-[#E3D5C3] bg-[#FFFDF6] p-2">
          {story.lines.map((line, i) => {
            const answer = found && i === q.answer;
            const at = answer ? line.indexOf(q.mark) : -1;
            return (
              <motion.button
                key={`${si}-${i}`}
                type="button"
                data-line={i}
                onClick={() => tapLine(i)}
                animate={wrong === i ? { x: [0, -8, 8, -6, 0] } : answer ? { scale: [1, 1.04, 1] } : {}}
                className="block w-full rounded-xl px-2 py-1.5 text-left transition-colors"
                style={{ background: answer ? "#FFE27A" : lit === i ? "#FFF1C2" : "transparent" }}
              >
                <span className="text-[22px] font-bold leading-snug" style={FIDEL}>
                  {at >= 0 ? (
                    <>
                      {line.slice(0, at)}
                      <span className="underline decoration-[#E2463F] decoration-[3px] underline-offset-4">{q.mark}</span>
                      {line.slice(at + q.mark.length)}
                    </>
                  ) : (
                    line
                  )}
                </span>
                {lang === "en" && <span className="block text-xs text-[#7A6A5A]">{story.en[i]}</span>}
              </motion.button>
            );
          })}
        </div>
        <button type="button" data-read="" onClick={readAll} className="mx-auto mt-3 rounded-full bg-[#E9F2FB] px-4 py-1.5 text-base font-bold text-[#2F7FB8]" style={lang === "am" ? FIDEL : undefined}>
          🔊 {COPY.read[lang]}
        </button>
      </div>
    </Frame>
  );
}
