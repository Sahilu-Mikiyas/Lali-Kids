"use client";

import { useState } from "react";

import { Camel, Cub, Gugu, TAP, Tsehay, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import { Candle, FeelFace, SmellFlower, TummyButterflies, type Feel } from "@/components/book/courses/healthy-safe/kit-health";
import { StormCloud } from "@/components/book/courses/healthy-safe/kit-more";
import { Home, Yard } from "@/components/book/courses/healthy-safe/kit-places";
import { Hearts, Kite, ScatteredStones, Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { Glow } from "@/components/book/glow";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Opt, type Round } from "./choice-rounds";
import { Next, sound, t, type T } from "./demo-kit";

/*
  Feelings Clues (level 3), from "Gugu's Tummy Butterflies". Five moments; a body clue (a
  fluttery tummy, a hot face and tight fists, heavy with tears, light and bouncy, eyes wide
  open) and the child names the feeling with a face. Every feeling is allowed. Then the flower-
  and-candle breath, three times, until the face is calm.
*/

const COLOR = "#C2569A";

const NAME: Record<Feel, T> = {
  happy: { en: "Happy", am: "ደስታ" },
  sad: { en: "Sad", am: "ሐዘን" },
  angry: { en: "Angry", am: "ቁጣ" },
  worried: { en: "Worried", am: "ጭንቀት" },
  surprised: { en: "Surprised", am: "መገረም" },
  calm: { en: "Calm", am: "እርጋታ" },
};

const face = (f: Feel) => (
  <svg width={40} height={40} viewBox="-22 -22 44 44" aria-hidden>
    <FeelFace x={0} y={0} feel={f} />
  </svg>
);

const opt = (f: Feel, ok: boolean, note?: T): Opt => ({ label: NAME[f], pic: face(f), ok, note });

const ROUNDS: Round[] = [
  {
    say: { en: "Before the show, Gugu's tummy flutters and his knees wobble. What is he feeling?", am: "ከዝግጅቱ በፊት የጉጉ ሆድ ይርገበገባል፤ ጉልበቱም ይንቀጠቀጣል። ምን ተሰምቶታል?" },
    options: [opt("happy", false, { en: "A fluttery tummy before something big is usually a worry.", am: "ከትልቅ ነገር በፊት የሚርገበገብ ሆድ ብዙውን ጊዜ ጭንቀት ነው።" }), opt("worried", true), opt("angry", false, { en: "Nobody was unkind. Fluttery butterflies are a worried feeling.", am: "ማንም ክፉ አላደረገም። የሚርገበገቡ ቢራቢሮዎች የጭንቀት ስሜት ናቸው።" })],
    good: { en: "Worried. Saying it helps: \"I'm worried.\" Then it gets a little smaller.", am: "ጭንቀት። መናገሩ ይረዳል፦ «ተጨንቄያለሁ።» ከዚያ ትንሽ ያንሳል።" },
    scene: (id, s) => (
      <Home id={id} time="morning">
        <Place x={200} y={294} s={0.56} className={s === "good" ? undefined : "hs-wobble"} tap={TAP.gugu}>
          <Gugu mood="worried" />
          <TummyButterflies x={100} y={186} s={1.3} n={s === "good" ? 2 : 4} calm={s === "good"} />
        </Place>
      </Home>
    ),
  },
  {
    say: { en: "Someone knocked Anbessa's tower down on purpose. His face is hot and his fists are tight.", am: "አንድ ሰው የአንበሳን ማማ ሆን ብሎ አፈረሰ። ፊቱ ይግላል፤ ጡጫውም ተጨብጧል።" },
    options: [opt("surprised", false, { en: "Maybe for a moment! But a hot face and tight fists are an angry feeling.", am: "ለአፍታ ሊሆን ይችላል! የሚግል ፊትና የተጨበጠ ጡጫ ግን የቁጣ ስሜት ነው።" }), opt("happy", false, { en: "Look at the storm cloud. That's not happy.", am: "የማዕበሉን ደመና እዩ። ደስታ አይደለም።" }), opt("angry", true)],
    good: { en: "Angry. Angry is allowed, but we don't hit. First we calm down, then we talk.", am: "ቁጣ። መቆጣት ይፈቀዳል፤ ግን አንመታም። መጀመሪያ እንረጋጋለን፤ ከዚያ እንነጋገራለን።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <ScatteredStones x={260} y={288} />
        <Glow x={160} y={200} r={70} color="#FF7A5A" strength={s === "good" ? 0.5 : 0.25} dur={1.4} />
        <Place x={160} y={294} s={0.52} tap={TAP.cub}>
          <Cub mood="worried" />
        </Place>
        <StormCloud x={160} y={140} size={0.8} bolt={s === "good"} />
      </Home>
    ),
  },
  {
    say: { en: "Tsehay's kite flew away. She feels heavy, and the tears come.", am: "የፀሐይ ካይት በረረ። ይከብዳታል፤ እንባዋም ይመጣል።" },
    options: [opt("sad", true), opt("angry", false, { en: "Look: heavy and teary, not hot and stormy. That's sad.", am: "እዩ፦ የሚከብድና እንባ ያለው እንጂ የሚግል አይደለም። ያ ሐዘን ነው።" }), opt("happy", false, { en: "Losing something we love doesn't feel happy.", am: "የምንወደው ነገር ሲጠፋ ደስ አይልም።" })],
    good: { en: "Sad. It's OK to cry. A hug from someone kind helps.", am: "ሐዘን። ማልቀስ ችግር የለውም። የደግ ሰው እቅፍ ይረዳል።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Kite x={90} y={60} s={0.4} />
        <Place x={190} y={294} s={0.52} tap={TAP.tsehay}>
          <Tsehay mood="sad" tear />
        </Place>
        {s === "good" && (
          <Place x={270} y={294} s={0.46} flip tap={TAP.hawi}>
            <Wolf mood="happy" arm="bless" />
          </Place>
        )}
      </Yard>
    ),
  },
  {
    say: { en: "Grandpa Tolosa is home from the market! Hawi feels light and bouncy.", am: "አባ ቶሎሳ ከገበያ መጡ! ሀዊ ቀለል ብሏት መዝለል አማራት።" },
    options: [opt("worried", false, { en: "Light and bouncy isn't wobbly or fluttery. It's a lovely feeling!", am: "ቀለል ማለትና መዝለል መንቀጥቀጥ አይደለም። ደስ የሚል ስሜት ነው!" }), opt("happy", true), opt("sad", false, { en: "Sad feels heavy. Hawi feels light!", am: "ሐዘን ይከብዳል። ሀዊ ግን ቀለል ብሏታል!" })],
    good: { en: "Happy! Light and bouncy all over.", am: "ደስታ! መላ ሰውነት ቀለል ብሎ መዝለል።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={160} y={294} s={0.5} className="lali-hop" tap={TAP.hawi}>
          <Wolf mood="joy" wag />
        </Place>
        <Place x={280} y={292} s={0.54} flip tap={TAP.elder}>
          <Wolf elder mood="joy" />
        </Place>
        {s === "good" && <Hearts spots={[[200, 170, 0.1], [220, 156, 0.8]]} />}
      </Yard>
    ),
  },
  {
    say: { en: "Ayan opens the door and all her friends shout \"Welcome home!\" Her eyes go wide.", am: "አያን በሩን ስትከፍት ጓደኞቿ ሁሉ «እንኳን ደህና መጣሽ!» ብለው ጮኹ። ዓይኖቿ ፈጠጡ።" },
    options: [opt("sad", false, { en: "Wide eyes and an open mouth: something she didn't expect!", am: "የተከፈቱ ዓይኖችና አፍ፦ ያልጠበቀችው ነገር!" }), opt("surprised", true), opt("angry", false, { en: "Nothing went wrong here. It's a lovely surprise!", am: "እዚህ ምንም አልተበላሸም። ደስ የሚል ድንገቴ ነው!" })],
    good: { en: "Surprised! And then happy, too. We can feel two feelings at once.", am: "መገረም! ከዚያ ደስታም። ሁለት ስሜቶች በአንድ ጊዜ ሊሰሙን ይችላሉ።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={130} y={294} s={0.52} tap={TAP.ayan}>
          <Camel who="ayan" mood="wow" />
        </Place>
        <Place x={260} y={296} s={0.38} flip tap={TAP.gugu}>
          <Gugu mood="joy" pose="wave" />
        </Place>
        <Place x={320} y={296} s={0.36} flip tap={TAP.cub}>
          <Cub mood="joy" arm="up" />
        </Place>
        {s === "good" && <Sparkles x={190} y={180} r={60} delay={0.1} n={7} />}
      </Yard>
    ),
  },
];

export default function FeelingsClues({ lang, onDone }: DemoProps) {
  // The breath, counted in half-breaths: even = ready to smell (in), odd = ready to blow (out).
  const [n, setN] = useState(0);
  const breaths = Math.floor(n / 2);
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Feelings Clues", am: "የስሜት ፍንጮች" }}
      goal={{ en: "Our body gives clues. Name the feeling; every feeling is OK.", am: "ሰውነታችን ፍንጭ ይሰጣል። ስሜቱን ሰይሙ፤ ሁሉም ስሜት ችግር የለውም።" }}
      color={COLOR}
      rounds={ROUNDS}
      cols={3}
      ending={(id, finish) => ({
        scene: (
          <Home id={id} time="day">
            <SmellFlower x={110} y={270} s={1.5} />
            <Candle x={300} y={276} s={1.5} out={n % 2 === 0 && n > 0} />
            <Place x={205} y={294} s={0.56} tap={TAP.gugu}>
              <Gugu mood={breaths >= 3 ? "joy" : "happy"} />
              <circle cx={100} cy={190} r={22} fill="none" stroke="#FFFFFF" strokeWidth={4} className="hs-breath" />
              <TummyButterflies x={100} y={186} s={1.1} n={Math.max(0, 3 - breaths)} calm={breaths >= 1} />
            </Place>
            {breaths >= 3 && (
              <g>
                <FeelFace x={205} y={70} feel="calm" s={1.3} />
                <Sparkles x={205} y={70} r={40} delay={0.1} n={6} />
              </g>
            )}
          </Home>
        ),
        controls: (
          <div className="mt-4">
            <p className="font-display text-xl font-extrabold text-ink">
              {t(lang, breaths >= 3 ? { en: "Calm. Now Gugu can tell someone who can help.", am: "ረጋ። አሁን ጉጉ ሊረዳ ለሚችል ሰው መናገር ይችላል።" } : { en: `The calm-down breath (${breaths} of 3): smell the flower… blow out the candle.`, am: `የመረጋጊያ ትንፋሽ (${breaths} ከ3)፦ አበባውን አሽትት… ሻማውን አጥፋ።` })}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {breaths >= 3 ? (
                <Next onClick={finish} color={COLOR}>
                  {t(lang, { en: "Finish", am: "ጨርሱ" })}
                </Next>
              ) : (
                <Next
                  onClick={() => {
                    sound.tap();
                    setN((x) => x + 1);
                  }}
                  color={n % 2 ? "#2F6FD0" : "#3F9A4E"}
                >
                  {t(lang, n % 2 ? { en: "Blow out the candle… whoo", am: "ሻማውን አጥፋ… ፉ" } : { en: "Smell the flower… mmm", am: "አበባውን አሽትት… ምምም" })}
                </Next>
              )}
            </div>
          </div>
        ),
      })}
      finale={{ en: "Five feelings named, and one tummy calmed!", am: "አምስት ስሜቶች ተሰየሙ፤ አንድ ሆድም ረጋ!" }}
      finaleScene={(id) => (
        <Yard id={id} time="day">
          {[
            { x: 80, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 150, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 220, el: <Tsehay mood="joy" pose="hop" />, tap: TAP.tsehay },
            { x: 300, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[150, 150, 0.2], [200, 136, 0.8], [250, 150, 1.4]]} />
        </Yard>
      )}
      onDone={onDone}
    />
  );
}
