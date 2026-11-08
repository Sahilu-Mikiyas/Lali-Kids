"use client";

import { useState } from "react";

import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Classroom, StormCloud, WeaveBasket } from "@/components/book/courses/values-character/kit-more";
import { Home, Yard } from "@/components/book/courses/values-character/kit-places";
import { Cup, Hearts, Kite, ScatteredStones, Sparkles, Steam } from "@/components/book/courses/values-character/kit-props";
import { Place } from "@/components/book/scenery";
import { ART } from "../art";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Opt, type Round } from "./choice-rounds";
import { Next, sound, t, type T } from "./demo-kit";

/*
  How Does It Feel? (level 5: naming feelings and calming down), from "Hawi's Stormy Day". Six
  moments; the child names the feeling with a face. Every feeling is allowed: the explanations
  say so. Then Hawi's coffee breath to calm a storm cloud: smell the coffee (breathe in), blow it
  cool (breathe out), three times.
*/

const COLOR = "#2E9A8A";

type Feel = "happy" | "sad" | "angry" | "worried" | "surprised" | "proud";

const FEEL: Record<Feel, T> = {
  happy: { en: "Happy", am: "ደስታ" },
  sad: { en: "Sad", am: "ሐዘን" },
  angry: { en: "Angry", am: "ቁጣ" },
  worried: { en: "Worried", am: "ጭንቀት" },
  surprised: { en: "Surprised", am: "መገረም" },
  proud: { en: "Proud", am: "ኩራት" },
};

function FacePic({ f }: { f: Feel }) {
  const A = ART[`face-${f}`];
  return <A size={40} />;
}

const opt = (f: Feel, ok: boolean, note?: T): Opt => ({ label: FEEL[f], pic: <FacePic f={f} />, ok, note });

const ROUNDS: Round[] = [
  {
    say: { en: "Snap! The kite string broke, and Gugu's kite flew far away.", am: "ቅጭ! የካይቱ ገመድ ተበጠሰ፤ የጉጉ ካይት ርቆ በረረ።" },
    options: [opt("happy", false, { en: "Look at Gugu's face. Losing something we love doesn't feel happy.", am: "የጉጉን ፊት እንመልከት። የምንወደው ነገር ሲጠፋ ደስ አይልም።" }), opt("sad", true), opt("proud", false, { en: "Proud is when we did something well. What do we feel when we lose something?", am: "ኩራት አንድ ነገር በደንብ ስንሠራ ነው። አንድ ነገር ሲጠፋብን ምን ይሰማናል?" })],
    good: { en: "Sad. It's OK to feel sad, and it helps to say it: \"I'm sad, my kite flew away.\"", am: "ሐዘን። ማዘን ችግር የለውም፤ መናገሩም ይረዳል፦ «አዝኛለሁ፣ ካይቴ በረረ።»" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Kite x={80} y={70} s={0.45} />
        <Place x={170} y={294} s={0.5} tap={TAP.gugu}>
          <Gugu mood="sad" tear={s === "good"} />
        </Place>
        {s === "good" && (
          <Place x={260} y={296} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="sad" />
          </Place>
        )}
      </Yard>
    ),
  },
  {
    say: { en: "Someone knocked Anbessa's tower down, on purpose!", am: "አንድ ሰው የአንበሳን ማማ ሆን ብሎ አፈረሰው!" },
    options: [opt("surprised", false, { en: "Maybe surprised for a moment, but on purpose? That makes a big hot feeling inside.", am: "ለአፍታ መገረም ይቻላል፤ ሆን ተብሎ ግን? ውስጥ ትልቅ የሚያቃጥል ስሜት ይፈጥራል።" }), opt("angry", true), opt("happy", false, { en: "Look at the storm cloud over Anbessa. That's not a happy feeling.", am: "ከአንበሳ በላይ ያለውን የማዕበል ደመና እንመልከት። ይህ የደስታ ስሜት አይደለም።" })],
    good: { en: "Angry. Angry is allowed! We just don't hit or break things. First we calm down, then we talk.", am: "ቁጣ። መቆጣት ይፈቀዳል! ብቻ አንመታም፣ አንሰብርም። መጀመሪያ እንረጋጋለን፤ ከዚያ እንነጋገራለን።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <ScatteredStones x={240} y={288} />
        <Place x={150} y={294} s={0.5} tap={TAP.cub}>
          <Cub mood="worried" />
        </Place>
        <StormCloud x={150} y={150} size={s === "good" ? 0.9 : 0.6} bolt={s === "good"} />
      </Home>
    ),
  },
  {
    say: { en: "It's Haben's first day at a new school. She doesn't know anyone yet.", am: "ዛሬ ሐበን በአዲስ ትምህርት ቤት የመጀመሪያ ቀኗ ነው። እስካሁን ማንንም አታውቅም።" },
    options: [opt("angry", false, { en: "Nobody did anything unkind. Look at her face: it's more of a wobbly, tummy feeling.", am: "ማንም ክፉ ነገር አላደረገም። ፊቷን እንመልከት፦ ሆድ የሚያንቀጠቅጥ ስሜት ነው።" }), opt("proud", false, { en: "Not yet! Proud might come later, when she has made a friend.", am: "ገና ነው! ጓደኛ ስታፈራ ኩራት ሊመጣ ይችላል።" }), opt("worried", true)],
    good: { en: "Worried. New things can feel worrying. A smile and \"Come and sit with us!\" helps a lot.", am: "ጭንቀት። አዲስ ነገር ሊያስጨንቅ ይችላል። ፈገግታና «ነይ፣ ከእኛ ጋር ተቀመጪ!» በጣም ይረዳል።" },
    scene: (id, s) => (
      <Classroom id={id}>
        <Place x={140} y={294} s={0.46} tap={TAP.haben}>
          <Ibex mood="worried" />
        </Place>
        <Place x={300} y={290} s={0.5} flip tap={false}>
          <Teacher mood="happy" pose={s === "good" ? "wave" : "sit"} />
        </Place>
        {s === "good" && (
          <Place x={220} y={296} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        )}
      </Classroom>
    ),
  },
  {
    say: { en: "Ayan opens the door, and there are all her friends, with a cake!", am: "አያን በሩን ስትከፍት ጓደኞቿ ሁሉ ኬክ ይዘው ቆመዋል!" },
    options: [opt("sad", false, { en: "Look at her eyes and mouth, open wide! Something unexpected happened.", am: "ዓይኖቿንና አፏን እንመልከት፣ ተከፍተዋል! ያልተጠበቀ ነገር ሆነ።" }), opt("surprised", true), opt("worried", false, { en: "Nothing to worry about here! It's a lovely thing she didn't expect.", am: "እዚህ የሚያስጨንቅ ነገር የለም! ያልጠበቀችው ደስ የሚል ነገር ነው።" })],
    good: { en: "Surprised! And then happy, too. Sometimes we feel two feelings at once.", am: "መገረም! ከዚያም ደስታ። አንዳንድ ጊዜ ሁለት ስሜቶች በአንድ ጊዜ ይሰሙናል።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={120} y={294} s={0.52} tap={TAP.ayan}>
          <Camel who="ayan" mood="wow" />
        </Place>
        <g transform="translate(230 262)">
          <rect x={-22} y={-20} width={44} height={20} rx={4} fill="#FFD48A" />
          <rect x={-22} y={-26} width={44} height={8} rx={4} fill="#FF8FB1" />
          <path d="M-10 -26 V-36 M0 -26 V-38 M10 -26 V-36" stroke="#2F6FD0" strokeWidth={2.4} />
          <path d="M-10 -40 v-3 M0 -42 v-3 M10 -40 v-3" stroke="#F5B21E" strokeWidth={3} strokeLinecap="round" />
        </g>
        <Place x={300} y={296} s={0.36} flip tap={TAP.gugu}>
          <Gugu mood="joy" pose="wave" />
        </Place>
        <Place x={350} y={296} s={0.34} flip tap={TAP.hawi}>
          <Wolf mood="joy" wag />
        </Place>
        {s === "good" && <Sparkles x={200} y={180} r={70} delay={0.1} n={7} />}
      </Yard>
    ),
  },
  {
    say: { en: "Hawi finished her very first basket, all by herself.", am: "ሀዊ የመጀመሪያ ቅርጫቷን ብቻዋን ሠርታ ጨረሰች።" },
    options: [opt("worried", false, { en: "She worked hard and finished! That feels big and warm, not wobbly.", am: "ጠንክራ ሠርታ ጨረሰች! ይህ ትልቅና ሞቅ ያለ ስሜት ነው እንጂ የሚያንቀጠቅጥ አይደለም።" }), opt("proud", true), opt("angry", false, { en: "Nothing went wrong here! She finished something hard.", am: "እዚህ ምንም አልተበላሸም! ከባድ ነገር ጨረሰች።" })],
    good: { en: "Proud! The good feeling of trying hard and doing it.", am: "ኩራት! ጠንክሮ ሞክሮ የመሳካት ጥሩ ስሜት።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Place x={170} y={294} s={0.5} tap={TAP.hawi}>
          <Wolf mood="joy" wag={s === "good"} arm="give" item={<WeaveBasket x={0} y={14} s={0.7} rows={5} lid lopsided />} />
        </Place>
        {s === "good" && <Sparkles x={220} y={190} r={50} delay={0.1} n={6} />}
      </Home>
    ),
  },
  {
    say: { en: "Anbessa knocks: \"Tsehay, do you want to play?\"", am: "አንበሳ በሩን አንኳኳ፦ «ፀሐይ፣ መጫወት ትፈልጊያለሽ?»" },
    options: [opt("sad", false, { en: "A friend came to play! Look at Tsehay's big smile.", am: "ጓደኛ ለጨዋታ መጣ! የፀሐይን ትልቅ ፈገግታ እንመልከት።" }), opt("angry", false, { en: "No storm cloud here! A friend at the door feels lovely.", am: "እዚህ የማዕበል ደመና የለም! በሩ ላይ ያለ ጓደኛ ደስ ያሰኛል።" }), opt("happy", true)],
    good: { en: "Happy! A friend at the door makes the whole day brighter.", am: "ደስታ! በር ላይ ያለ ጓደኛ ቀኑን ሁሉ ያበራዋል።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={150} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood="joy" arm="up" />
        </Place>
        <Place x={260} y={294} s={0.46} flip className={s === "good" ? "lali-hop" : undefined} tap={TAP.tsehay}>
          <Tsehay mood="joy" />
        </Place>
        {s === "good" && <Hearts spots={[[200, 180, 0.2], [224, 166, 1]]} />}
      </Yard>
    ),
  },
];

export default function FeelingsFaces({ lang, onDone }: DemoProps) {
  // Hawi's coffee breath, counted in half-breaths: even = ready to smell (in), odd = ready to blow (out).
  const [n, setN] = useState(0);
  const breaths = Math.floor(n / 2);
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "How Does It Feel?", am: "ምን ይሰማል?" }}
      goal={{ en: "Name the feeling. Every feeling is OK; then we choose what to do with it.", am: "ስሜቱን እንሰይም። ሁሉም ስሜት ችግር የለውም፤ ከዚያ በስሜቱ ምን እንደምናደርግ እንመርጣለን።" }}
      color={COLOR}
      rounds={ROUNDS}
      cols={3}
      ending={(id, finish) => ({
        scene: (
          <Home id={id} time="day">
            <Place x={170} y={294} s={0.52} tap={TAP.hawi}>
              <Wolf mood={breaths >= 3 ? "joy" : n % 2 ? "happy" : "worried"} />
            </Place>
            <StormCloud x={170} y={140} size={Math.max(0, 1 - breaths / 3)} bolt={breaths === 0} />
            <g transform="translate(250 262)">
              <Cup x={0} y={0} s={2} />
              <Steam x={0} y={-24} />
            </g>
            {breaths >= 3 && <Sparkles x={170} y={150} r={50} delay={0.1} n={6} />}
          </Home>
        ),
        controls: (
          <div className="mt-4">
            <p className="font-display text-xl font-extrabold text-ink">
              {t(lang, breaths >= 3 ? { en: "The storm cloud is gone. Now Hawi can say what's wrong.", am: "የማዕበሉ ደመና ጠፋ። አሁን ሀዊ ያስቸገራትን መናገር ትችላለች።" } : { en: `Hawi's coffee breath (${breaths} of 3): smell the coffee… and blow it cool.`, am: `የሀዊ የቡና እስትንፋስ (${breaths} ከ3)፦ ቡናውን እናሽትት… እፍ ብለን እናቀዝቅዘው።` })}
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
                  color={n % 2 ? "#2F6FD0" : "#B8683E"}
                >
                  {t(lang, n % 2 ? { en: "Blow it cool… whoo", am: "እፍ ብለን እናቀዝቅዝ… ፉ" } : { en: "Smell the coffee… mmm", am: "ቡናውን እናሽትት… ምምም" })}
                </Next>
              )}
            </div>
          </div>
        ),
      })}
      finale={{ en: "Six feelings named, and one storm calmed!", am: "ስድስት ስሜቶች ተሰየሙ፤ አንድ ማዕበልም ረጋ!" }}
      finaleScene={(id) => (
        <Yard id={id} time="day">
          {[
            { x: 70, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 150, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 230, el: <Tsehay mood="joy" pose="hop" />, tap: TAP.tsehay },
            { x: 310, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
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
