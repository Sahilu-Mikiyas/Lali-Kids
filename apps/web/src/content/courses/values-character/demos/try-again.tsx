"use client";

import { useId, useState } from "react";

import { Grandma, TAP, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { GrassBundle, WeaveBasket } from "@/components/book/courses/values-character/kit-more";
import { Home } from "@/components/book/courses/values-character/kit-places";
import { Hearts, Sparkles } from "@/components/book/courses/values-character/kit-props";
import { Place, vars } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Again, a Little Better! (level 4: trying again after failing), from "Hawi's First Basket".
  Grandma shows a pattern of coloured grass; the child weaves it, one colour at a time. A wrong
  colour is never a failure: the row is unwound, the try is counted as practice, and the child
  goes again ("Again, a little better!"). Three patterns, of 3, 4 and 5, and the basket grows a
  little with each. Each colour also has its own shape, so the colours are not the only clue.
*/

type Col = "red" | "yellow" | "green" | "purple";

const COLS: Record<Col, { fill: string; name: T; shape: string }> = {
  red: { fill: "#E2463F", name: { en: "Red", am: "ቀይ" }, shape: "M0 -6 a6 6 0 1 0 0.01 0Z" },
  yellow: { fill: "#F5C21E", name: { en: "Yellow", am: "ቢጫ" }, shape: "M0 -7 L7 6 L-7 6Z" },
  green: { fill: "#2FA35A", name: { en: "Green", am: "አረንጓዴ" }, shape: "M-6 -6 H6 V6 H-6Z" },
  purple: { fill: "#8A5AB8", name: { en: "Purple", am: "ወይን ጠጅ" }, shape: "M0 -8 L8 0 L0 8 L-8 0Z" },
};
const ORDER: Col[] = ["red", "yellow", "green", "purple"];

const PATTERNS: Col[][] = [
  ["red", "yellow", "red"],
  ["green", "yellow", "green", "yellow"],
  ["red", "purple", "yellow", "purple", "red"],
];

/** One coil of coloured grass in the pattern, with its shape on it. */
function Bead({ x, y, col, empty = false, wrong = false }: { x: number; y: number; col?: Col; empty?: boolean; wrong?: boolean }) {
  if (empty || !col) return <circle cx={x} cy={y} r={15} fill="#FFF6DC" stroke="#C9A06A" strokeWidth={2.4} strokeDasharray="5 4" />;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={wrong ? "lali-no" : "lali-pop-in"} style={vars({ "--delay": "0s" })}>
        <circle r={15} fill={COLS[col].fill} stroke={wrong ? "#7A1E18" : "#7A5236"} strokeWidth={2.4} />
        <path d="M-12 -4 Q0 -10 12 -4 M-12 4 Q0 -2 12 4" stroke="#000" strokeOpacity={0.15} strokeWidth={2} fill="none" />
        <path d={COLS[col].shape} fill="#FFFFFF" opacity={0.85} />
      </g>
    </g>
  );
}

function Dot({ col }: { col: Col }) {
  return (
    <svg width={36} height={36} viewBox="-18 -18 36 36" aria-hidden>
      <circle r={16} fill={COLS[col].fill} stroke="#7A5236" strokeWidth={2} />
      <path d={COLS[col].shape} fill="#FFFFFF" opacity={0.9} />
    </svg>
  );
}

export default function TryAgain({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [round, setRound] = useState(0);
  const [row, setRow] = useState<Col[]>([]);
  const [wrong, setWrong] = useState<Col | null>(null);
  const [tries, setTries] = useState(0);
  const done = round >= PATTERNS.length;
  const pat = PATTERNS[Math.min(round, PATTERNS.length - 1)];
  const complete = !done && row.length === pat.length;
  const color = "#8A5AB8";

  const tap = (c: Col) => {
    if (wrong || complete) return;
    if (pat[row.length] === c) {
      sound.tap();
      const nr = [...row, c];
      setRow(nr);
      if (nr.length === pat.length) sound.good();
    } else {
      sound.gentle();
      setWrong(c);
      setTries((n) => n + 1);
    }
  };
  const unwind = () => {
    setRow([]);
    setWrong(null);
  };
  const next = () => {
    setRound((n) => n + 1);
    setRow([]);
    setWrong(null);
  };

  const gap = 40;
  const x0 = 200 - ((pat.length - 1) * gap) / 2;

  return (
    <DemoFrame lang={lang} title={{ en: "Again, a Little Better!", am: "እንደገና፣ ትንሽ በተሻለ!" }} goal={{ en: "Weave Grandma's pattern, one colour at a time. If it goes wrong, unwind and try again.", am: "የአያቴን ንድፍ አንድ በአንድ ቀለም እንሥራ። ከተሳሳትን ፈትተን እንደገና እንሞክራለን።" }} step={round} total={PATTERNS.length} color={color}>
      <Stage label={done ? undefined : t(lang, { en: `Pattern ${round + 1}: ${pat.map((c) => COLS[c].name.en).join(", ")}`, am: `ንድፍ ${round + 1}፦ ${pat.map((c) => COLS[c].name.am).join("፣ ")}` })}>
        <Home id={id} time={done ? "evening" : "day"} shelf={false} win={[358, 70]}>
          {done ? (
            <>
              <WeaveBasket x={200} y={250} s={1.5} rows={6} lid />
              <Place x={90} y={292} s={0.5} tap={TAP.grandma}>
                <Grandma mood="joy" arm="clap" />
              </Place>
              <Place x={310} y={294} s={0.5} flip tap={TAP.hawi}>
                <Wolf mood="joy" wag />
              </Place>
              <Sparkles x={200} y={190} r={70} delay={0.2} n={8} />
              <Hearts spots={[[200, 120, 0.6], [230, 106, 1.4]]} />
            </>
          ) : (
            <>
              {/* Grandma's pattern, on a mat. */}
              <rect x={x0 - 30} y={40} width={(pat.length - 1) * gap + 60} height={48} rx={14} fill="#FFF6DC" stroke="#C9A06A" strokeWidth={2} />
              {pat.map((c, k) => (
                <Bead key={`p${k}`} x={x0 + k * gap} y={64} col={c} />
              ))}
              {/* The row being woven. */}
              <rect x={x0 - 30} y={112} width={(pat.length - 1) * gap + 60} height={48} rx={14} fill="#E9D3A8" />
              {pat.map((_, k) =>
                k < row.length ? (
                  <Bead key={`r${round}-${k}`} x={x0 + k * gap} y={136} col={row[k]} />
                ) : k === row.length && wrong ? (
                  <Bead key={`w${tries}`} x={x0 + k * gap} y={136} col={wrong} wrong />
                ) : (
                  <Bead key={`e${k}`} x={x0 + k * gap} y={136} empty />
                ),
              )}
              <WeaveBasket x={200} y={282} s={1.6} rows={2 + round * 2 + (complete ? 1 : 0)} lopsided={round === 0} />
              <GrassBundle x={140} y={284} s={0.7} loose />
              <Place x={70} y={292} s={0.44} tap={TAP.grandma}>
                <Grandma mood={complete ? "joy" : "happy"} arm={complete ? "clap" : "down"} />
              </Place>
              <Place x={326} y={294} s={0.46} flip tap={TAP.hawi}>
                <Wolf mood={wrong ? "worried" : complete ? "joy" : "happy"} wag={complete} />
              </Place>
              {/* One knot for every try that taught us something. */}
              {Array.from({ length: Math.min(tries, 12) }, (_, k) => (
                <circle key={k} cx={300 + (k % 6) * 12} cy={196 + Math.floor(k / 6) * 12} r={4.4} fill="#C9A06A" stroke="#7A5236" />
              ))}
              {complete && <Sparkles x={200} y={136} r={60} delay={0.1} n={6} />}
            </>
          )}
        </Home>
      </Stage>

      {done ? (
        <Finale lang={lang} text={{ en: "Three patterns woven! Every try made your hands a little better.", am: "ሦስት ንድፎች ተሠሩ! እያንዳንዱ ሙከራ እጃችንን ትንሽ አሻሻለው።" }} onDone={onDone} color={color}>
          {tries > 0 && <p className="mt-2 text-lg text-muted">{t(lang, { en: `${tries} unwound rows were practice, not failure.`, am: `${tries} የተፈቱ ረድፎች ልምምድ ነበሩ እንጂ ውድቀት አልነበሩም።` })}</p>}
        </Finale>
      ) : complete ? (
        <Feedback tone="great" action={<Next onClick={next} color={color}>{t(lang, round === PATTERNS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next pattern", am: "ቀጣዩ ንድፍ" })}</Next>}>
          {t(lang, round === 0 ? { en: "Your first row! Grandma claps.", am: "የመጀመሪያው ረድፍ! አያቴ አጨበጨበች።" } : round === 1 ? { en: "Even neater than the first one!", am: "ከመጀመሪያው እንኳን የበለጠ ጥሩ!" } : { en: "Five in a row, perfect! Slowly, slowly, the egg walks on its own legs.", am: "አምስቱም በተራ፣ ፍጹም! ቀስ በቀስ እንቁላል በእግሩ ይሄዳል።" })}
        </Feedback>
      ) : wrong ? (
        <Feedback tone="gentle" action={<Next onClick={unwind} color="#C98A0A">{t(lang, { en: "Unwind and try again", am: "ፈትተን እንደገና እንሞክር" })}</Next>}>
          {t(lang, { en: `Oops, that one is ${COLS[wrong].name.en.toLowerCase()}. Look at Grandma's pattern again. Again, a little better!`, am: `ውይ፣ ያ ${COLS[wrong].name.am} ነው። የአያቴን ንድፍ እንደገና እንመልከት። እንደገና፣ ትንሽ በተሻለ!` })}
        </Feedback>
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">
            {t(lang, row.length === 0 ? { en: "Which colour comes first?", am: "መጀመሪያ የሚመጣው የትኛው ቀለም ነው?" } : { en: "And next?", am: "ቀጥሎስ?" })}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ORDER.map((c) => (
              <Choice key={c} onClick={() => tap(c)} pic={<Dot col={c} />}>
                {t(lang, COLS[c].name)}
              </Choice>
            ))}
          </div>
        </>
      )}
    </DemoFrame>
  );
}
