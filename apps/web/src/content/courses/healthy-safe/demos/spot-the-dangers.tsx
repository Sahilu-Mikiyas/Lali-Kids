"use client";

import { useState, type ReactNode } from "react";

import { Cub, TAP } from "@/components/book/courses/healthy-safe/kit-cast";
import { Book } from "@/components/book/courses/healthy-safe/kit-more";
import { Home } from "@/components/book/courses/healthy-safe/kit-places";
import { Ball, Jebena, Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { BrokenPieces, CoffeeStove, Knife, OrangeBottle, PillStrip, Socket } from "@/components/book/courses/healthy-safe/kit-safety";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Spot the Grown-Up Things (level 4), from "Hot, Hot, Step Back!", "The Broken Cup", "Abdi Asks
  First" and "Hawi's Kite and the Wire". A home picture with six grown-up things hidden in plain
  sight (the coffee on the coals, a knife at the table's edge, pink tablets, the orange bottle of
  kerosene, a socket, broken pieces on the floor) and two things that are fine to play with (a
  ball, a book). Tap each grown-up thing to find out what to do; the play things get a smile.
  Every spot carries data-spot="<key>".
*/

const COLOR = "#E2553A";

type Spot = { key: string; x: number; y: number; r: number; danger: boolean; say: T; draw: ReactNode };

const SPOTS: Spot[] = [
  {
    key: "coffee",
    x: 300,
    y: 250,
    r: 34,
    danger: true,
    say: { en: "Hot coals and a hot jebena! Stay outside the safe circle: hot, hot, step back!", am: "ትኩስ ፍምና ትኩስ ጀበና! ከደህንነቱ ክብ ውጭ ቁሙ፦ ትኩስ ነው፣ ወደ ኋላ!" },
    draw: (
      <CoffeeStove x={300} y={276} s={1.1}>
        <Jebena x={0} y={0} s={0.7} steam />
      </CoffeeStove>
    ),
  },
  {
    key: "knife",
    x: 190,
    y: 196,
    r: 26,
    danger: true,
    say: { en: "A sharp knife! Sharp things are grown-up things. Leave it, and tell a grown-up.", am: "ስለታም ቢላ! ስለታም ነገሮች የትልልቆች ናቸው። ተውትና ለትልቅ ሰው ንገሩ።" },
    draw: <Knife x={196} y={196} s={1.1} rot={-10} />,
  },
  {
    key: "pills",
    x: 150,
    y: 194,
    r: 24,
    danger: true,
    say: { en: "Tablets that look like sweets! Medicine is only from a grown-up. If you're not sure, ask first.", am: "ከረሜላ የሚመስሉ ኪኒኖች! መድኃኒት ከትልቅ ሰው ብቻ ነው። እርግጠኛ ካልሆናችሁ መጀመሪያ ጠይቁ።" },
    draw: <PillStrip x={150} y={194} s={1} />,
  },
  {
    key: "bottle",
    x: 80,
    y: 262,
    r: 26,
    danger: true,
    say: { en: "An orange bottle by the door. It might not be juice! Never drink from a bottle unless a grown-up gives it to you.", am: "በበሩ አጠገብ ብርቱካናማ ጠርሙስ። ጭማቂ ላይሆን ይችላል! ትልቅ ሰው ካልሰጣችሁ ከጠርሙስ አትጠጡ።" },
    draw: <OrangeBottle x={80} y={286} s={1} />,
  },
  {
    key: "socket",
    x: 360,
    y: 170,
    r: 24,
    danger: true,
    say: { en: "A socket! Electricity lives in there. Never poke anything in it, and only touch switches with dry hands.", am: "ሶኬት! ኤሌክትሪክ እዚያ ውስጥ አለ። ምንም ነገር አትክተቱበት፤ ማብሪያንም በደረቅ እጅ ብቻ ንኩ።" },
    draw: <Socket x={360} y={170} s={1.2} />,
  },
  {
    key: "glass",
    x: 230,
    y: 286,
    r: 26,
    danger: true,
    say: { en: "Broken pieces on the floor! Stop, step back, call a grown-up.", am: "ወለሉ ላይ ስብርባሪ! ቁሙ፣ ወደ ኋላ በሉ፣ ትልቅ ሰው ጥሩ።" },
    draw: <BrokenPieces x={230} y={288} s={1.1} />,
  },
  {
    key: "ball",
    x: 120,
    y: 284,
    r: 20,
    danger: false,
    say: { en: "A ball! That's fine to play with.", am: "ኳስ! ለመጫወት ችግር የለውም።" },
    draw: <Ball x={120} y={286} s={0.8} />,
  },
  {
    key: "book",
    x: 260,
    y: 196,
    r: 20,
    danger: false,
    say: { en: "A book! That's lovely to read.", am: "መጽሐፍ! ለማንበብ ደስ ይላል።" },
    draw: <Book x={260} y={196} s={0.9} />,
  },
];

const NEED = SPOTS.filter((s) => s.danger).length;

export default function SpotTheDangers({ lang, onDone }: DemoProps) {
  const [found, setFound] = useState<string[]>([]);
  const [last, setLast] = useState<Spot | null>(null);
  const [finished, setFinished] = useState(false);
  const done = found.length === NEED;

  const tap = (s: Spot) => {
    setLast(s);
    if (s.danger) {
      sound.good();
      setFound((f) => (f.includes(s.key) ? f : [...f, s.key]));
    } else sound.tap();
  };

  return (
    <DemoFrame lang={lang} title={{ en: "Spot the Grown-Up Things", am: "የትልልቆችን ነገሮች ፈልጉ" }} goal={{ en: `Find the ${NEED} things that are for grown-ups. Tap them!`, am: `የትልልቆች የሆኑትን ${NEED} ነገሮች ፈልጉ። ንኳቸው!` }} step={found.length} total={NEED} color={COLOR}>
      <Stage label={t(lang, { en: "A home", am: "ቤት" })}>
        <Home id="sd" time="day" shelf={false}>
          <g transform="translate(200 200)">
            <rect x={-70} y={0} width={140} height={8} rx={2} fill="#9A6A3E" />
            <path d="M-60 8 V60 M60 8 V60" stroke="#7A4A2E" strokeWidth={5} />
          </g>
          {SPOTS.map((s) => (
            <g key={s.key} data-spot={s.key} onClick={() => tap(s)} style={{ cursor: "pointer" }}>
              {s.draw}
              {found.includes(s.key) && <circle cx={s.x} cy={s.y} r={s.r} fill="none" stroke="#2FA35A" strokeWidth={4} strokeDasharray="6 4" />}
              <circle cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={0.01} />
            </g>
          ))}
          <Place x={40} y={300} s={0.32} tap={TAP.cub}>
            <Cub mood={done ? "joy" : "happy"} />
          </Place>
          {done && <Sparkles x={200} y={150} r={90} delay={0.1} n={8} />}
        </Home>
      </Stage>
      {finished ? (
        <Finale lang={lang} text={{ en: "Six grown-up things spotted. Safe at home!", am: "ስድስት የትልልቆች ነገሮች ተገኙ። በቤት ደህና!" }} onDone={onDone} color={COLOR} />
      ) : (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, { en: `Found ${found.length} of ${NEED}`, am: `${found.length} ከ${NEED} ተገኙ` })}</p>
          {last && (
            <Feedback tone={last.danger ? "great" : "gentle"} action={done ? <Next onClick={() => setFinished(true)} color={COLOR}>{t(lang, { en: "Finish", am: "ጨርሱ" })}</Next> : undefined}>
              {t(lang, last.say)}
            </Feedback>
          )}
        </div>
      )}
    </DemoFrame>
  );
}
