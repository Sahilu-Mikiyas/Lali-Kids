"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { Cup } from "@/components/book/courses/our-ethiopia/kit-props";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sayAmharic, sound, Stage, t, type T } from "./demo-kit";

/*
  Two Ways to Write (level 2). Eight words appear one at a time, each in its own language and
  script; the child sorts them into the fidel box or the Latin-letters box. Water: ውሃ (Amharic),
  bishaan (Afaan Oromo), ማይ (Tigrinya), biyo (Somali); peace: ሰላም (Amharic), nagaa (Afaan Oromo);
  coffee: ቡና (Amharic), buna (Afaan Oromo). Amharic words are spoken only by an Amharic voice.
*/

type Script = "fidel" | "latin";
type Word = { text: string; script: Script; language: T; meaning: T; pic: "water" | "peace" | "coffee"; amharic?: boolean };

const WORDS: Word[] = [
  { text: "ውሃ", script: "fidel", language: { en: "Amharic", am: "አማርኛ" }, meaning: { en: "water", am: "ውሃ" }, pic: "water", amharic: true },
  { text: "bishaan", script: "latin", language: { en: "Afaan Oromo", am: "አፋን ኦሮሞ" }, meaning: { en: "water", am: "ውሃ" }, pic: "water" },
  { text: "ማይ", script: "fidel", language: { en: "Tigrinya", am: "ትግርኛ" }, meaning: { en: "water", am: "ውሃ" }, pic: "water" },
  { text: "biyo", script: "latin", language: { en: "Somali", am: "ሶማልኛ" }, meaning: { en: "water", am: "ውሃ" }, pic: "water" },
  { text: "ሰላም", script: "fidel", language: { en: "Amharic", am: "አማርኛ" }, meaning: { en: "peace", am: "ሰላም" }, pic: "peace", amharic: true },
  { text: "nagaa", script: "latin", language: { en: "Afaan Oromo", am: "አፋን ኦሮሞ" }, meaning: { en: "peace", am: "ሰላም" }, pic: "peace" },
  { text: "ቡና", script: "fidel", language: { en: "Amharic", am: "አማርኛ" }, meaning: { en: "coffee", am: "ቡና" }, pic: "coffee", amharic: true },
  { text: "buna", script: "latin", language: { en: "Afaan Oromo", am: "አፋን ኦሮሞ" }, meaning: { en: "coffee", am: "ቡና" }, pic: "coffee" },
];

const BOX: Record<Script, T> = {
  fidel: { en: "Fidel", am: "ፊደል" },
  latin: { en: "Latin letters (like Qubee)", am: "የላቲን ፊደላት (እንደ ቁቤ)" },
};

function Pic({ k }: { k: Word["pic"] }): ReactNode {
  if (k === "water") return <path d="M0 -26 Q-18 0 -14 10 Q-10 22 0 22 Q10 22 14 10 Q18 0 0 -26Z" fill="#5BB8E8" />;
  if (k === "coffee") return <g transform="scale(3)"><Cup x={0} y={6} full /></g>;
  return (
    <g>
      <path d="M-20 4 Q-8 -16 10 -10 Q22 -6 24 -16 Q26 0 12 6 Q0 10 -20 4Z" fill="#FFFFFF" stroke="#8EA8C8" strokeWidth={2} />
      <path d="M10 -10 l10 -6" stroke="#4EAA3A" strokeWidth={3} />
      <circle cx={-12} cy={-2} r={1.6} fill="#1B2A4E" />
    </g>
  );
}

/** The two boxes, with the words already sorted into them. */
function Boxes({ sorted }: { sorted: Word[] }) {
  return (
    <g>
      {(["fidel", "latin"] as const).map((s, i) => {
        const x = i === 0 ? 100 : 300;
        const inBox = sorted.filter((w) => w.script === s);
        return (
          <g key={s}>
            <rect x={x - 86} y={168} width={172} height={120} rx={14} fill={i === 0 ? "#FFF0E0" : "#E8F0FF"} stroke={i === 0 ? "#C9622B" : "#2B3A8C"} strokeWidth={3} />
            <text x={x} y={200} textAnchor="middle" fontSize={26} fontWeight={900} fontFamily={i === 0 ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"} fill={i === 0 ? "#C9622B" : "#2B3A8C"}>
              {i === 0 ? "ሀ ለ ሐ" : "A B C"}
            </text>
            {inBox.map((w, k) => (
              <text key={w.text} x={x - 60 + (k % 2) * 120 * 0.5 + 30} y={232 + Math.floor(k / 2) * 26} textAnchor="middle" fontSize={18} fontWeight={800} fontFamily={w.script === "fidel" ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"} fill="#1B2A4E">
                {w.text}
              </text>
            ))}
          </g>
        );
      })}
    </g>
  );
}

export default function TwoScripts({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Script | null>(null);
  const [sorted, setSorted] = useState<Word[]>([]);
  const done = i >= WORDS.length;
  const w = WORDS[Math.min(i, WORDS.length - 1)];
  const right = pick === w.script;

  const choose = (s: Script) => {
    setPick(s);
    if (s === w.script) {
      sound.good();
      setSorted((x) => [...x, w]);
      if (w.amharic) sayAmharic(w.text);
    } else sound.gentle();
  };

  return (
    <DemoFrame lang={lang} title={{ en: "Two Ways to Write", am: "ሁለት የአጻጻፍ መንገዶች" }} goal={{ en: "Is the word written in fidel, or in Latin letters? Put it in the right box.", am: "ቃሉ የተጻፈው በፊደል ነው ወይስ በላቲን ፊደላት? በትክክለኛው ሳጥን ውስጥ አስገቡት።" }} step={i} total={WORDS.length} color="#15803D">
      <Stage label={done ? undefined : w.text}>
        <rect width={400} height={300} fill="#FFFBEE" />
        {!done && (
          <motion.g key={i} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <rect x={80} y={20} width={240} height={130} rx={16} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={3} />
            <g transform="translate(130 84)">
              <Pic k={w.pic} />
            </g>
            <text x={232} y={96} textAnchor="middle" fontSize={w.script === "fidel" ? 36 : 28} fontWeight={900} fontFamily={w.script === "fidel" ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"} fill="#1B2A4E">
              {w.text}
            </text>
          </motion.g>
        )}
        {done && (
          <g>
            <text x={200} y={70} textAnchor="middle" fontSize={22} fontWeight={900} fontFamily="var(--font-grandstander), sans-serif" fill="#15803D">
              ውሃ · bishaan · ማይ · biyo
            </text>
            <path d="M200 92 Q182 118 186 128 Q190 140 200 140 Q210 140 214 128 Q218 118 200 92Z" fill="#5BB8E8" />
          </g>
        )}
        <Boxes sorted={sorted} />
      </Stage>
      {done ? (
        <Finale lang={lang} text={{ en: "Water in four languages, two ways to write!", am: "ውሃ በአራት ቋንቋ፣ በሁለት አጻጻፍ!" }} onDone={onDone} color="#15803D" />
      ) : pick && right ? (
        <Feedback
          tone="great"
          action={
            <Next
              color="#15803D"
              onClick={() => {
                setI((n) => n + 1);
                setPick(null);
              }}
            >
              {t(lang, i === WORDS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next word", am: "ቀጣዩ ቃል" })}
            </Next>
          }
        >
          {t(lang, { en: `"${w.text}" means ${w.meaning.en} in ${w.language.en}, written in ${w.script === "fidel" ? "fidel" : "Latin letters"}.`, am: w.amharic ? `«${w.text}» የአማርኛ ቃል ነው፤ የተጻፈው በፊደል ነው።` : `«${w.text}» የ${w.language.am} ቃል ነው፤ «${w.meaning.am}» ማለት ነው፤ የተጻፈው በ${w.script === "fidel" ? "ፊደል" : "ላቲን ፊደላት"} ነው።` })}
        </Feedback>
      ) : pick ? (
        <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setPick(null)}>{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
          {t(lang, { en: "Look closely: fidel letters are shapes like ሀ ለ ሐ; Latin letters look like A B C.", am: "በደንብ ተመልከቱ፦ ፊደሎች እንደ ሀ ለ ሐ ያሉ ቅርጾች ናቸው፤ የላቲን ፊደላት A B C ይመስላሉ።" })}
        </Feedback>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(["fidel", "latin"] as const).map((s) => (
            <Choice key={s} onClick={() => choose(s)} pic={<span className="inline-block w-12 text-center text-2xl font-black" style={{ color: s === "fidel" ? "#C9622B" : "#2B3A8C" }}>{s === "fidel" ? "ሀ" : "A"}</span>}>
              {t(lang, BOX[s])}
            </Choice>
          ))}
        </div>
      )}
    </DemoFrame>
  );
}
