"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, say, sfx, t } from "./kit";

/*
  "Fix the Sentence" (level 6: capital letters and full stops). Each sentence comes in all small
  letters with no full stop. The child taps every word that needs a capital (the first word, names,
  and I) and taps the dot button to end it. A word that doesn't need a capital wobbles. When the
  sentence is mended, it is read aloud. Six sentences.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type R = { words: string[]; caps: number[] };
const ROUNDS: R[] = [
  { words: ["my", "cat", "is", "gray"], caps: [0] },
  { words: ["come", "to", "the", "river"], caps: [0] },
  { words: ["i", "like", "mango"], caps: [0] },
  { words: ["this", "is", "hawi"], caps: [0, 2] },
  { words: ["gugu", "and", "i", "can", "run"], caps: [0, 2] },
  { words: ["we", "went", "to", "lake", "tana"], caps: [0, 3, 4] },
];
const RED = "#E8413B";
const cap = (w: string) => w[0].toUpperCase() + w.slice(1);

export default function FixTheSentence({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [fixed, setFixed] = useState<number[]>([]);
  const [dot, setDot] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const complete = dot && r.caps.every((k) => fixed.includes(k));
  const text = r.words.map((w, k) => (r.caps.includes(k) ? cap(w) : w)).join(" ") + ".";

  const check = (f: number[], d: boolean) => {
    if (d && r.caps.every((k) => f.includes(k))) {
      sfx.good();
      say(text, 0.85);
      setTimeout(() => {
        setFixed([]);
        setDot(false);
        setI((n) => n + 1);
      }, 2400);
    }
  };
  const tapWord = (k: number) => {
    if (complete || fixed.includes(k)) return;
    if (r.caps.includes(k)) {
      sfx.tap();
      const f = [...fixed, k];
      setFixed(f);
      setWrong(null);
      check(f, dot);
    } else {
      sfx.oops();
      setWrong(k);
    }
  };
  const tapDot = () => {
    if (dot || complete) return;
    sfx.tap();
    setDot(true);
    check(fixed, true);
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Fix the Sentence", am: "ዓረፍተ ነገሩን አስተካክሉ" }}
      howTo={{ en: "Tap each word that needs a capital letter. Then add the full stop!", am: "ትልቅ ፊደል የሚያስፈልገውን እያንዳንዱን ቃል ንኩ። ከዚያ ነጥቡን ጨምሩ!" }}
      total={ROUNDS.length}
      got={Math.min(i + (complete ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={RED}
      onAgain={() => {
        setI(0);
        setFixed([]);
        setDot(false);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col gap-1 text-lg font-bold" style={ANDIKA} lang="en">
          {ROUNDS.map((x) => (
            <span key={x.words.join(" ")}>{x.words.map((w, k) => (x.caps.includes(k) ? cap(w) : w)).join(" ")}.</span>
          ))}
        </div>
      }
    >
      <div className="flex min-h-[90px] flex-wrap items-center justify-center gap-2 rounded-3xl bg-white p-3" lang="en" data-round={i}>
        {r.words.map((w, k) => {
          const on = fixed.includes(k);
          return (
            <motion.button
              key={`${i}-${k}`}
              type="button"
              data-choice={r.caps.includes(k) && !on ? "right" : "wrong"}
              onClick={() => tapWord(k)}
              animate={wrong === k ? { x: [0, -6, 6, -4, 0] } : on ? { scale: [1, 1.2, 1] } : {}}
              className="rounded-xl border-2 px-2 py-1 text-3xl font-bold"
              style={{ ...ANDIKA, borderColor: wrong === k ? "#E58A00" : "#E3D5C3", background: "#FFFDF6" }}
            >
              {on ? (
                <>
                  <span style={{ color: RED }}>{w[0].toUpperCase()}</span>
                  {w.slice(1)}
                </>
              ) : (
                w
              )}
            </motion.button>
          );
        })}
        <motion.button
          type="button"
          data-choice={!dot ? "right" : "wrong"}
          data-dot=""
          onClick={tapDot}
          animate={dot ? { scale: [1, 1.3, 1] } : {}}
          className="grid h-12 w-12 place-items-center rounded-full border-4 border-dashed text-4xl font-black"
          style={{ borderColor: dot ? RED : "#E3D5C3", color: dot ? RED : "#D8C8A8" }}
          aria-label={t(lang, { en: "Add a full stop", am: "ነጥብ ጨምሩ" })}
        >
          .
        </motion.button>
      </div>
      {complete ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {text}
          </span>
        </Note>
      ) : wrong !== null ? (
        <Note tone="try">{t(lang, { en: "That word is fine small. Capitals: the first word, names, and I.", am: "ያ ቃል በትንሽ ፊደል ይሆናል። ትልቅ ፊደል፦ የመጀመሪያው ቃል፣ ስሞች እና I።" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Big letter at the start, little dot at the end!", am: "መጀመሪያ ትልቅ ፊደል፣ መጨረሻ ትንሽ ነጥብ!" })}</Note>
      )}
    </Frame>
  );
}
