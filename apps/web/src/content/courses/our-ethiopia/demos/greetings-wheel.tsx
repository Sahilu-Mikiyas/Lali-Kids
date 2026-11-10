"use client";

import { useState, type ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Camel, Cub, Ibex, Teacher, Wolf } from "@/components/book/courses/our-ethiopia/kit-cast";
import { SayBubble } from "@/components/book/courses/our-ethiopia/kit-culture";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sayAmharic, sound, Stage, t, type T } from "./demo-kit";

/*
  The Greetings Wheel (level 2). Five friends stand in a ring, each with the hello of their
  family's language, written in its own script: Anbessa ሰላም (Amharic, fidel), Hawi Akkam (Afaan
  Oromo, Qubee), Haben ከመይ (Tigrinya, fidel), Ayan Iska warran (Somali, Latin letters) and
  Teacher Saro (Wolaytta, Latin letters). First the child taps each friend to hear and read their
  hello; then five rounds of "Who says this?". Only the Amharic hello is ever spoken aloud, and
  only by an Amharic voice; the others are read on the screen (a voice made for English would
  say them wrongly).
*/

type Key = "am" | "om" | "ti" | "so" | "wal";
type Friend = { key: Key; who: T; lang: T; hello: string; script: "fidel" | "latin"; say: T; mean: T; x: number; y: number; draw: ReactNode; flip?: boolean };

const FRIENDS: Friend[] = [
  { key: "am", who: { en: "Anbessa", am: "አንበሳ" }, lang: { en: "Amharic", am: "አማርኛ" }, hello: "ሰላም!", script: "fidel", say: { en: "Selam!", am: "ሰላም!" }, mean: { en: "\"Peace!\", the everyday hello.", am: "«ሰላም!» የዘወትር ሰላምታ።" }, x: 200, y: 168, draw: <Cub mood="joy" arm="up" /> },
  { key: "om", who: { en: "Hawi", am: "ሀዊ" }, lang: { en: "Afaan Oromo", am: "አፋን ኦሮሞ" }, hello: "Akkam!", script: "latin", say: { en: "Akkam! (say it: AK-kam)", am: "አካም!" }, mean: { en: "\"Hello, how are you?\" It is written in Qubee, with Latin letters.", am: "«ሰላም፣ እንዴት ነህ/ነሽ?» በቁቤ፣ በላቲን ፊደላት ይጻፋል።" }, x: 70, y: 210, draw: <Wolf mood="joy" arm="wave" /> },
  { key: "ti", who: { en: "Haben", am: "ሐበን" }, lang: { en: "Tigrinya", am: "ትግርኛ" }, hello: "ከመይ?", script: "fidel", say: { en: "Kemey? (say it: KE-mey)", am: "ከመይ?" }, mean: { en: "\"How are you?\" Tigrinya is written in fidel too.", am: "«እንዴት ነህ/ነሽ?» ትግርኛም በፊደል ይጻፋል።" }, x: 330, y: 210, draw: <Ibex mood="joy" pose="wave" />, flip: true },
  { key: "so", who: { en: "Ayan", am: "አያን" }, lang: { en: "Somali", am: "ሶማልኛ" }, hello: "Iska warran?", script: "latin", say: { en: "Iska warran? (say it: IS-ka WAR-ran)", am: "ኢስካ ዋራን?" }, mean: { en: "\"What's your news?\", a friendly hello, written in Latin letters.", am: "«ምን አዲስ ነገር አለ?» የወዳጅነት ሰላምታ፤ በላቲን ፊደላት ይጻፋል።" }, x: 110, y: 296, draw: <Camel who="ayan" mood="joy" /> },
  { key: "wal", who: { en: "Teacher", am: "መምህርቷ" }, lang: { en: "Wolaytta", am: "ወላይትኛ" }, hello: "Saro!", script: "latin", say: { en: "Saro! (say it: SA-ro)", am: "ሳሮ!" }, mean: { en: "\"Hello!\" in Wolaytta, written in Latin letters.", am: "በወላይትኛ «ሰላም!»፤ በላቲን ፊደላት ይጻፋል።" }, x: 290, y: 296, draw: <Teacher mood="joy" pose="wave" />, flip: true },
];

/** The quiz order, so it is not the same as the ring. */
const ASK: Key[] = ["om", "wal", "am", "so", "ti"];

export default function GreetingsWheel({ lang, onDone }: DemoProps) {
  const [heard, setHeard] = useState<Key[]>([]);
  const [open, setOpen] = useState<Key | null>(null);
  const [phase, setPhase] = useState<"listen" | "quiz" | "done">("listen");
  const [q, setQ] = useState(0);
  const [answer, setAnswer] = useState<Key | null>(null);
  const ask = FRIENDS.find((f) => f.key === ASK[Math.min(q, ASK.length - 1)])!;
  const openF = FRIENDS.find((f) => f.key === open);

  const tapFriend = (f: Friend) => {
    if (phase === "listen") {
      sound.tap();
      setOpen(f.key);
      setHeard((h) => (h.includes(f.key) ? h : [...h, f.key]));
      if (f.key === "am") sayAmharic("ሰላም");
    } else if (phase === "quiz" && answer === null) {
      setAnswer(f.key);
      if (f.key === ask.key) sound.good();
      else sound.gentle();
    }
  };

  const step = phase === "listen" ? heard.length : phase === "quiz" ? FRIENDS.length + q : FRIENDS.length * 2;

  return (
    <DemoFrame
      lang={lang}
      title={{ en: "The Greetings Wheel", am: "የሰላምታ መንኮራኩር" }}
      goal={phase === "listen" ? { en: "Tap each friend to hear and read their hello.", am: "የእያንዳንዱን ጓደኛ ሰላምታ ለማየትና ለመስማት ንኩት።" } : { en: "Who says this hello? Tap the friend.", am: "ይህን ሰላምታ የሚለው ማን ነው? ጓደኛውን ንኩ።" }}
      step={step}
      total={FRIENDS.length * 2}
      color="#15803D"
    >
      <Stage label={t(lang, { en: "Five friends in a ring", am: "በክብ የቆሙ አምስት ጓደኞች" })}>
        <rect width={400} height={300} fill="#FFF4DC" />
        <circle cx={200} cy={190} r={130} fill="#FFE9B0" />
        <circle cx={200} cy={190} r={130} fill="none" stroke="#F5B21E" strokeWidth={4} strokeDasharray="10 8" className="lali-spin" style={{ animationDuration: "60s" }} />
        {FRIENDS.map((f) => {
          const right = phase === "quiz" && answer === ask.key && f.key === ask.key;
          return (
            <g key={f.key} onClick={() => tapFriend(f)} data-friend={f.key} style={{ cursor: "pointer" }}>
              <circle cx={f.x} cy={f.y - 40} r={44} fill={right ? "#C8F0D4" : heard.includes(f.key) && phase === "listen" ? "#FFFFFF" : "#FFFFFF00"} />
              <Place x={f.x} y={f.y} s={0.34} flip={f.flip} tap={false}>
                {f.draw}
              </Place>
            </g>
          );
        })}
        {phase === "listen" && openF && <SayBubble key={openF.key} x={Math.min(330, Math.max(70, openF.x))} y={openF.y - 108} text={openF.hello} script={openF.script} w={openF.key === "so" ? 110 : 80} delay={0} />}
        {phase === "quiz" && (
          <g>
            <rect x={130} y={14} width={140} height={44} rx={12} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2.4} />
            <text x={200} y={44} textAnchor="middle" fontSize={ask.script === "fidel" ? 22 : 18} fontWeight={900} fontFamily={ask.script === "fidel" ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"} fill="#1B2A4E">
              {ask.hello}
            </text>
          </g>
        )}
      </Stage>

      {phase === "done" ? (
        <Finale lang={lang} text={{ en: "Five languages, five hellos, one big smile!", am: "አምስት ቋንቋዎች፣ አምስት ሰላምታዎች፣ አንድ ትልቅ ፈገግታ!" }} onDone={onDone} color="#15803D" />
      ) : phase === "listen" ? (
        <>
          {openF ? (
            <div className="mt-3 rounded-2xl border-2 border-[#D3E4F4] bg-white p-4" role="status">
              <p className="font-display text-2xl font-black text-ink">
                <span lang={openF.key === "am" || openF.key === "ti" ? "am" : undefined}>{openF.hello}</span>
              </p>
              <p className="mt-1 text-lg text-ink">
                {t(lang, openF.who)} · {t(lang, openF.lang)} · <span className="font-bold">{t(lang, openF.say)}</span>
              </p>
              <p className="mt-1 text-base text-muted">{t(lang, openF.mean)}</p>
            </div>
          ) : (
            <p className="mt-3 text-center text-lg text-muted">{t(lang, { en: "Tap a friend in the ring.", am: "በክቡ ውስጥ ያለ ጓደኛ ንኩ።" })}</p>
          )}
          {heard.length === FRIENDS.length && (
            <div className="mt-3 flex justify-end">
              <Next
                color="#15803D"
                onClick={() => {
                  setPhase("quiz");
                  setOpen(null);
                }}
              >
                {t(lang, { en: "Now play: who says it?", am: "አሁን እንጫወት፦ ማን ይላል?" })}
              </Next>
            </div>
          )}
        </>
      ) : answer === null ? (
        <p className="mt-3 text-center text-lg text-muted">{t(lang, { en: "Who says this hello? Tap the friend in the ring.", am: "ይህን ሰላምታ የሚለው ማን ነው? በክቡ ውስጥ ያለውን ጓደኛ ንኩ።" })}</p>
      ) : answer === ask.key ? (
        <Feedback
          tone="great"
          action={
            <Next
              color="#15803D"
              onClick={() => {
                setAnswer(null);
                if (q + 1 >= ASK.length) setPhase("done");
                else setQ(q + 1);
              }}
            >
              {t(lang, q + 1 >= ASK.length ? { en: "Finish", am: "ጨርሱ" } : { en: "Next hello", am: "ቀጣዩ ሰላምታ" })}
            </Next>
          }
        >
          {t(lang, { en: "Yes! ", am: "አዎ! " })}
          {t(lang, ask.who)} · {t(lang, ask.lang)}: {t(lang, ask.say)}
        </Feedback>
      ) : (
        <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setAnswer(null)}>{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
          {t(lang, { en: "Not quite. Look at the letters: is it fidel or Latin letters? Whose language is it?", am: "ገና ነው። ፊደላቱን ተመልከቱ፦ ፊደል ነው ወይስ የላቲን ፊደላት? የማን ቋንቋ ነው?" })}
        </Feedback>
      )}
    </DemoFrame>
  );
}
