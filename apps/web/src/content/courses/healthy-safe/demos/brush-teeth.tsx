"use client";

import { useRef, useState, type ReactNode } from "react";

import { Moon, Sun } from "@/components/book/scenery";
import { Foam, Glint, PasteTube, Toothbrush } from "@/components/book/courses/healthy-safe/kit-health";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Brush Every Tooth (level 1), from "Anbessa's Sparkly Smile". Four parts:
    1. how much toothpaste: a pea-sized bit (for children aged 3 to 6);
    2. brush every tooth: a big friendly smile with twelve teeth, each with little bits of food;
       rub over them with a finger (or the mouse) or tap each one, twice, until it sparkles;
    3. spit out the foam;
    4. when do we brush? Tap the two times: when the sun comes up, and before bed.
  Nothing scary: the teeth have crumbs, never "bugs".
*/

const COLOR = "#3AA7A0";

/** Where the teeth are in the 400 x 300 picture: six on top, six below. */
const TEETH: [number, number, boolean][] = [
  ...[110, 146, 182, 218, 254, 290].map((x) => [x, 132, true] as [number, number, boolean]),
  ...[118, 154, 190, 226, 262, 298].map((x) => [x - 8, 196, false] as [number, number, boolean]),
];

function ToothShape({ x, y, top, clean, n }: { x: number; y: number; top: boolean; clean: boolean; n: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-15} y={top ? -26 : -2} width={30} height={30} rx={top ? 8 : 8} fill={clean ? "#FFFFFF" : "#FFF6DD"} stroke="#D3E4F4" strokeWidth={2} />
      {!clean && (
        <g fill="#D9A04A">
          <circle cx={-6} cy={top ? -6 : 14} r={2.6 - n} />
          <circle cx={5} cy={top ? -14 : 8} r={2.2 - n * 0.5} />
          {n === 0 && <circle cx={2} cy={top ? -2 : 20} r={1.8} />}
        </g>
      )}
      {clean && <Glint x={-5} y={top ? -12 : 10} s={0.7} delay={(x % 7) * 0.2} />}
    </g>
  );
}

export default function BrushTeeth({ lang, onDone }: DemoProps) {
  const [part, setPart] = useState(0);
  const [paste, setPaste] = useState<number | null>(null);
  const [scrub, setScrub] = useState<number[]>(() => TEETH.map(() => 0));
  const [spat, setSpat] = useState(false);
  const [times, setTimes] = useState<string[]>([]);
  const [oops, setOops] = useState<string | null>(null);
  const svgWrap = useRef<HTMLDivElement>(null);
  const down = useRef(false);
  const lastHit = useRef(-1);

  const clean = scrub.filter((v) => v >= 2).length;
  const allClean = clean === TEETH.length;

  const brushAt = (k: number) => {
    if (part !== 1) return;
    setScrub((arr) => {
      if (arr[k] >= 2) return arr;
      const next = arr.slice();
      next[k] = arr[k] + 1;
      return next;
    });
    sound.tap();
  };

  const hitTest = (clientX: number, clientY: number) => {
    const el = svgWrap.current?.querySelector("svg");
    if (!el) return;
    const b = el.getBoundingClientRect();
    const x = ((clientX - b.left) / b.width) * 400;
    const y = ((clientY - b.top) / b.height) * 300;
    const k = TEETH.findIndex(([tx, ty, top]) => Math.abs(x - tx) < 18 && (top ? y > ty - 30 && y < ty + 8 : y > ty - 6 && y < ty + 32));
    if (k >= 0 && k !== lastHit.current) {
      lastHit.current = k;
      brushAt(k);
    }
  };

  const total = 4;
  const PASTE: { label: T; ok: boolean; note?: T }[] = [
    { label: { en: "A long stripe, all along the brush", am: "በብሩሹ ሙሉ ረጅም መስመር" }, ok: false, note: { en: "That's too much for a child. Just a little pea is enough.", am: "ያ ለልጅ በጣም ብዙ ነው። እንደ አተር ያለች ትንሽ ብቻ በቂ ነው።" } },
    { label: { en: "A little pea", am: "እንደ አተር ያለች ትንሽ" }, ok: true },
    { label: { en: "None at all", am: "ምንም" }, ok: false, note: { en: "A little toothpaste helps keep teeth strong. Just a pea!", am: "ትንሽ የጥርስ ሳሙና ጥርስን ጠንካራ ለማድረግ ይረዳል። እንደ አተር ብቻ!" } },
  ];
  const TIMES: { key: string; label: T; ok: boolean; pic: ReactNode }[] = [
    { key: "morning", label: { en: "When the sun comes up", am: "ፀሐይ ስትወጣ" }, ok: true, pic: <svg width={36} height={36} viewBox="-18 -18 36 36"><Sun x={0} y={0} r={10} face={false} /></svg> },
    { key: "party", label: { en: "Only on holidays", am: "በበዓል ቀን ብቻ" }, ok: false, pic: <svg width={36} height={36} viewBox="-18 -18 36 36"><path d="M-10 10 L0 -14 L10 10Z" fill="#E2463F" /><circle cx={0} cy={-14} r={3} fill="#FFD233" /></svg> },
    { key: "night", label: { en: "Before bed", am: "ከመተኛት በፊት" }, ok: true, pic: <svg width={36} height={36} viewBox="-18 -18 36 36"><Moon x={0} y={0} r={10} glow={false} /></svg> },
  ];

  return (
    <DemoFrame lang={lang} title={{ en: "Brush Every Tooth", am: "ሁሉንም ጥርስ ቦርሹ" }} goal={{ en: "A pea of toothpaste, every tooth, then spit. Twice a day!", am: "እንደ አተር ያለች ሳሙና፣ ሁሉም ጥርስ፣ ከዚያ መትፋት። በቀን ሁለት ጊዜ!" }} step={part} total={total} color={COLOR}>
      <div
        ref={svgWrap}
        onPointerDown={(e) => {
          down.current = true;
          lastHit.current = -1;
          hitTest(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (down.current) hitTest(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          down.current = false;
        }}
        onPointerLeave={() => {
          down.current = false;
        }}
        style={{ touchAction: part === 1 ? "none" : "auto" }}
      >
        <Stage label={t(lang, { en: "A big smile", am: "ትልቅ ፈገግታ" })}>
          <rect width={400} height={300} fill="#FFE2C8" />
          <ellipse cx={200} cy={164} rx={170} ry={110} fill="#C9622B" opacity={0.25} />
          {part === 0 ? (
            <g>
              <Toothbrush x={170} y={170} s={3.4} rot={-10} paste={paste === 1} />
              <PasteTube x={290} y={110} s={2.4} />
            </g>
          ) : part >= 3 ? (
            <g>
              <path d="M70 120 Q200 260 330 120 Q200 180 70 120Z" fill="#8A2F1E" />
              {TEETH.slice(0, 6).map(([x, y], k) => (
                <ToothShape key={k} x={x} y={y - 10} top clean n={2} />
              ))}
              <Glint x={140} y={110} s={2} />
              <Glint x={260} y={110} s={1.6} delay={0.8} />
            </g>
          ) : (
            <g>
              <path d="M70 120 Q200 300 330 120 Q200 106 70 120Z" fill="#8A2F1E" />
              <ellipse cx={200} cy={210} rx={70} ry={26} fill="#E87A7A" />
              {TEETH.map(([x, y, top], k) => (
                <g key={k} data-tooth={k} style={{ cursor: "pointer" }}>
                  <ToothShape x={x} y={y} top={top} clean={scrub[k] >= 2} n={scrub[k]} />
                </g>
              ))}
              {part === 2 && !spat && <Foam x={200} y={170} s={2.4} />}
              {part === 1 && <Toothbrush x={340} y={250} s={2} rot={-40} paste />}
            </g>
          )}
        </Stage>
      </div>

      {part === 4 ? (
        <Finale lang={lang} text={{ en: "A sparkly smile, twice a day!", am: "በቀን ሁለት ጊዜ፣ የሚያበራ ፈገግታ!" }} onDone={onDone} color={COLOR}>
          <p className="mt-2 text-lg leading-snug text-ink">{t(lang, { en: "Ask a grown-up to check the teeth at the back. They're the hardest to reach!", am: "ከኋላ ያሉትን ጥርሶች ትልቅ ሰው እንዲፈትሽላችሁ ጠይቁ። ለመድረስ በጣም ከባዶቹ እነሱ ናቸው!" })}</p>
        </Finale>
      ) : part === 0 ? (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, { en: "How much toothpaste for a child?", am: "ለልጅ ምን ያህል የጥርስ ሳሙና?" })}</p>
          {paste !== null && PASTE[paste].ok ? (
            <Feedback tone="great" action={<Next onClick={() => setPart(1)} color={COLOR}>{t(lang, { en: "Next", am: "ቀጣይ" })}</Next>}>
              {t(lang, { en: "Just a pea-sized bit. That's plenty for small teeth.", am: "እንደ አተር ያለች ትንሽ ብቻ። ለትንንሽ ጥርሶች በቂ ነው።" })}
            </Feedback>
          ) : (
            <>
              {paste !== null && <Feedback tone="gentle">{t(lang, PASTE[paste].note!)}</Feedback>}
              <div className="mt-3 grid gap-3">
                {PASTE.map((o, k) => (
                  <Choice
                    key={k}
                    tone={paste === k ? "soft" : "plain"}
                    onClick={() => {
                      setPaste(k);
                      if (o.ok) sound.good();
                      else sound.gentle();
                    }}
                  >
                    {t(lang, o.label)}
                  </Choice>
                ))}
              </div>
            </>
          )}
        </div>
      ) : part === 1 ? (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">
            {t(lang, allClean ? { en: "Every tooth is sparkling!", am: "ሁሉም ጥርስ ያበራል!" } : { en: `Brush every tooth: rub or tap each one twice (${clean} of 12).`, am: `ሁሉንም ጥርስ ቦርሹ፦ እያንዳንዱን ሁለት ጊዜ እሹ ወይም ንኩ (${clean} ከ12)።` })}
          </p>
          <p className="mt-1 text-lg text-muted">{t(lang, { en: "Top teeth, bottom teeth, front and back, round and round!", am: "የላይ ጥርስ፣ የታች ጥርስ፣ ፊትና ኋላ፣ ዙሪያ ዙሪያ!" })}</p>
          {allClean && (
            <div className="mt-3">
              <Next onClick={() => setPart(2)} color={COLOR}>
                {t(lang, { en: "Next", am: "ቀጣይ" })}
              </Next>
            </div>
          )}
        </div>
      ) : part === 2 ? (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, { en: "Now spit out the foam. Don't swallow it!", am: "አሁን አረፋውን ትፉ። አትዋጡት!" })}</p>
          <div className="mt-3">
            {spat ? (
              <Feedback tone="great" action={<Next onClick={() => setPart(3)} color={COLOR}>{t(lang, { en: "Next", am: "ቀጣይ" })}</Next>}>
                {t(lang, { en: "Ptoo! All done.", am: "ፕቱ! ተጠናቀቀ።" })}
              </Feedback>
            ) : (
              <Next
                onClick={() => {
                  sound.good();
                  setSpat(true);
                }}
                color={COLOR}
              >
                {t(lang, { en: "Spit!", am: "ትፉ!" })}
              </Next>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, { en: "When do we brush? Tap the two times.", am: "መቼ እንቦርሻለን? ሁለቱን ጊዜያት ንኩ።" })}</p>
          {oops && <Feedback tone="gentle">{t(lang, { en: "Teeth need brushing every day, not just on holidays: once in the morning and once before bed.", am: "ጥርስ በበዓል ብቻ ሳይሆን በየቀኑ መቦረሽ አለበት፦ ጠዋት አንድ ጊዜ፣ ከመተኛት በፊት አንድ ጊዜ።" })}</Feedback>}
          {times.length === 2 ? (
            <Feedback tone="great" action={<Next onClick={() => setPart(4)} color={COLOR}>{t(lang, { en: "Finish", am: "ጨርሱ" })}</Next>}>
              {t(lang, { en: "Twice a day: when the sun comes up, and before bed.", am: "በቀን ሁለት ጊዜ፦ ፀሐይ ስትወጣና ከመተኛት በፊት።" })}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {TIMES.map((o) => (
                <Choice
                  key={o.key}
                  pic={o.pic}
                  tone={times.includes(o.key) ? "good" : oops === o.key ? "soft" : "plain"}
                  disabled={times.includes(o.key)}
                  onClick={() => {
                    if (o.ok) {
                      sound.good();
                      setOops(null);
                      setTimes((x) => (x.includes(o.key) ? x : [...x, o.key]));
                    } else {
                      sound.gentle();
                      setOops(o.key);
                    }
                  }}
                >
                  {t(lang, o.label)}
                </Choice>
              ))}
            </div>
          )}
        </div>
      )}
    </DemoFrame>
  );
}
