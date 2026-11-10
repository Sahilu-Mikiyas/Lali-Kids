"use client";

import { useEffect, useState } from "react";

import { Cub } from "@/components/book/courses/english-first-words/cast";
import type { DemoProps } from "../../types";
import { DISPLAY, Frame, Hear, Note, Pic, say, sfx, t, type T } from "./kit";

/*
  "Touch Your Nose!" (level 1): a body game with Anbessa, big on the screen. The English voice
  says "Touch the nose!" and the word is on a card with its picture; the child touches that part
  of Anbessa. The right part glows and says its name; another part says its own name ("That's
  his ear!"), so every tap teaches a word. Eight parts: nose, eyes, ears, mouth, head, tummy,
  hand (his paw) and feet.
*/

type Part = { id: string; word: string; pic: string; am: string; spots: [number, number, number][] };

/** Where each part is on Anbessa, in the picture's 400 x 300 units (he sits at the middle). */
const PARTS: Part[] = [
  { id: "nose", word: "nose", pic: "nose", am: "አፍንጫ", spots: [[200, 180, 11]] },
  { id: "eyes", word: "eyes", pic: "eye", am: "ዓይኖች", spots: [[185, 166, 11], [215, 166, 11]] },
  { id: "ears", word: "ears", pic: "ear", am: "ጆሮዎች", spots: [[170, 135, 15], [230, 135, 15]] },
  { id: "mouth", word: "mouth", pic: "mouth", am: "አፍ", spots: [[200, 196, 10]] },
  { id: "head", word: "head", pic: "head", am: "ራስ", spots: [[200, 112, 22]] },
  { id: "tummy", word: "tummy", pic: "tummy", am: "ሆድ", spots: [[200, 264, 24]] },
  { id: "hand", word: "hand", pic: "hand", am: "እጅ", spots: [[280, 214, 16]] },
  { id: "feet", word: "feet", pic: "foot", am: "እግሮች", spots: [[172, 292, 16], [228, 292, 16]] },
];

export default function TouchYourNose({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<Part | null>(null);
  const done = i >= PARTS.length;
  const p = PARTS[Math.min(i, PARTS.length - 1)];
  const prompt = `Touch the ${p.word}!`;

  useEffect(() => {
    if (!done) say(prompt);
  }, [prompt, done]);

  const touch = (q: Part) => {
    if (hit) return;
    if (q.id === p.id) {
      sfx.good();
      say(q.word);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 1500);
    } else {
      sfx.oops();
      say(q.word);
      setWrong(q);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Touch Your Nose!", am: "Touch Your Nose! አፍንጫችሁን ንኩ!" }}
      howTo={{ en: "Listen, then touch that part of Anbessa.", am: "አዳምጡ፤ ከዚያ የአንበሳን ያንን የሰውነት ክፍል ንኩ።" }}
      total={PARTS.length}
      got={Math.min(i + (hit ? 1 : 0), PARTS.length)}
      done={done}
      onDone={onDone}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {PARTS.map((q) => (
            <span key={q.id} className="rounded-xl bg-[#FFF3E6] px-2.5 py-1 text-lg font-bold" style={DISPLAY}>
              {q.word}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border-2 border-[#E8513B] bg-white px-3 py-1.5">
          <Pic id={p.pic} size={44} />
          <span className="text-left">
            <span className="block text-2xl font-black leading-tight text-[#E8513B]" style={DISPLAY} lang="en">
              {prompt}
            </span>
            {lang === "am" && <span className="block text-base text-[#5B4636]">{`«${p.word}» ማለት ${p.am} ማለት ነው።`}</span>}
          </span>
        </div>
        <Hear text={prompt} lang={lang} color="#E8513B" />
      </div>
      <div className="mt-3 overflow-hidden rounded-[24px] border-4 border-white bg-[#FFF3D6] shadow-[0_8px_24px_rgba(27,42,78,0.15)]">
        <svg viewBox="0 0 400 320" className="block h-auto w-full touch-manipulation" role="img" aria-label={prompt}>
          <rect width={400} height={320} fill="#FFF3D6" />
          <ellipse cx={200} cy={306} rx={150} ry={14} fill="#F2D9A8" />
          <g transform="translate(100 66)">
            <Cub mood={hit ? "joy" : wrong ? "wow" : "happy"} arm="give" />
          </g>
          {PARTS.map((q) =>
            q.spots.map(([x, y, r], k) => (
              <circle
                key={`${q.id}-${k}`}
                data-part={q.id}
                cx={x}
                cy={y}
                r={r + 4}
                fill={hit && q.id === p.id ? "#FFE27A" : wrong?.id === q.id ? "#E58A00" : "#fff"}
                fillOpacity={hit && q.id === p.id ? 0.55 : wrong?.id === q.id ? 0.35 : 0.001}
                stroke={hit && q.id === p.id ? "#F5B21E" : "none"}
                strokeWidth={3}
                style={{ cursor: "pointer" }}
                onClick={() => touch(q)}
              />
            )),
          )}
        </svg>
      </div>
      {hit ? (
        <Note tone="good">
          <span style={DISPLAY} lang="en" className="font-bold">
            {p.word}!
          </span>{" "}
          {t(lang, { en: "Yes!", am: "ጎበዝ!" } as T)}
        </Note>
      ) : wrong ? (
        <Note tone="try">
          {t(lang, { en: `That's his ${wrong.word}. Find the ${p.word}!`, am: `ያ የአንበሳ «${wrong.word}» (${wrong.am}) ነው። «${p.word}»ን ፈልጉ!` })}
        </Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Tap on Anbessa.", am: "አንበሳ ላይ ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
