"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 4, "Sort the chapters" (after "Abdi and the Lost Goat"): a long story is told in chapters,
  like a house has rooms. Six sentences from Abdi's story arrive mixed up; tap the chapter each
  belongs to: ምዕራፍ ፩ (Nechu is lost), ምዕራፍ ፪ (the search), ምዕራፍ ፫ (home with a bell). Each
  chapter fills up with its sentences, in story order. Six sentences, then onDone.
*/

const CHAPTERS: { am: string; en: string; color: string }[] = [
  { am: "ምዕራፍ ፩፦ ነጩ የት ናት?", en: "Chapter 1: Where is Nechu?", color: "#8A4FB0" },
  { am: "ምዕራፍ ፪፦ የኮቴ ምልክቶች", en: "Chapter 2: Hoof prints", color: "#2F7FB8" },
  { am: "ምዕራፍ ፫፦ ለነጩ ቃጭል", en: "Chapter 3: A bell for Nechu", color: "#2E9A5B" },
];

const LINES: { am: string; en: string; ch: number }[] = [
  { am: "ዛሬ ጧት የነጩ በረት ባዶ ነው።", en: "This morning Nechu's pen is empty.", ch: 0 },
  { am: "አያን ትንንሽ የኮቴ ምልክቶችን አየች።", en: "Ayan saw tiny hoof prints.", ch: 0 },
  { am: "ምልክቶቹ ወደ ደረቅ ወንዝ ይወርዳሉ።", en: "The prints lead down to a dry riverbed.", ch: 1 },
  { am: "ነጩ እሾሃማ ቁጥቋጦ ውስጥ ተይዛለች።", en: "Nechu is caught in a thorny bush.", ch: 1 },
  { am: "አብዲ ነጩን አቅፎ ወደ ቤት ወሰዳት።", en: "Abdi carried Nechu home.", ch: 2 },
  { am: "ሁዮ በነጩ አንገት ላይ ቃጭል አሰረች።", en: "Hooyo tied a bell round Nechu's neck.", ch: 2 },
];

const COPY = {
  title: { en: "Sort the chapters", am: "ምዕራፎቹን ደርድሩ" } satisfies T,
  howTo: { en: "Read each sentence. Which chapter does it belong in?", am: "እያንዳንዱን ዓረፍተ ነገር አንብቡ። በየትኛው ምዕራፍ ውስጥ ይገባል?" } satisfies T,
  ending: { en: "One story, three chapters, every sentence in its room!", am: "አንድ ታሪክ፣ ሦስት ምዕራፎች፤ እያንዳንዱ ዓረፍተ ነገር በክፍሉ ገባ!" } satisfies T,
};

export default function ChapterSort({ lang, onDone }: DemoProps) {
  const order = useMemo(() => shuffled(LINES.map((_, i) => i), 0.61), []);
  const [n, setN] = useState(0);
  const [placed, setPlaced] = useState<number[][]>([[], [], []]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const later = useLater();
  const done = n === LINES.length;
  const line = done ? null : LINES[order[n]];

  const tapCh = (c: number) => {
    if (!line || busy) return;
    if (c === line.ch) {
      setBusy(true);
      sfx.good();
      say(line.am);
      setPlaced((p) => p.map((arr, i) => (i === c ? [...arr, order[n]] : arr)));
      later(() => {
        setN((k) => k + 1);
        setBusy(false);
      }, 1000);
    } else {
      sfx.oops();
      setWrong(c);
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={LINES.length} got={n} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[440px] flex-col">
        <div className="flex min-h-[70px] items-center justify-center">
          {line && (
            <motion.div key={n} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: busy ? 0.3 : 1 }} className="rounded-2xl border-2 border-[#B9A47A] bg-[#FFFDF6] px-4 py-2 text-center shadow-[0_4px_0_#00000018]">
              <span className="text-[20px] font-bold" style={FIDEL}>
                {line.am}
              </span>
              {lang === "en" && <span className="block text-xs text-[#7A6A5A]">{line.en}</span>}
            </motion.div>
          )}
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {CHAPTERS.map((c, i) => (
            <motion.button
              key={i}
              type="button"
              data-chapter={i}
              onClick={() => tapCh(i)}
              animate={wrong === i ? { x: [0, -8, 8, -6, 0] } : {}}
              className="min-h-[86px] rounded-2xl border-[3px] bg-white px-3 py-2 text-left"
              style={{ borderColor: c.color }}
            >
              <span className="text-[17px] font-bold" style={{ ...FIDEL, color: c.color }}>
                {c.am}
              </span>
              {lang === "en" && <span className="ml-2 text-xs text-[#5B4636]">{c.en}</span>}
              {[...placed[i]].sort((a, b) => a - b).map((li) => (
                <motion.span key={li} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-1 block text-[16px] leading-snug" style={FIDEL}>
                  {LINES[li].am}
                </motion.span>
              ))}
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
