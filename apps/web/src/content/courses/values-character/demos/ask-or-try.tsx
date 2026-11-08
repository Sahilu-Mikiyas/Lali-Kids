"use client";

import { Cub, Gugu, Grandma, Ibex, Papa, TAP, Teacher, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Book } from "@/components/book/courses/values-character/kit-more";
import { Home, Yard } from "@/components/book/courses/values-character/kit-places";
import { Ball, Hearth, Hearts, Kite, Sandals, ScatteredStones, Sign, Sparkles, Speech, Steam, Stool, StoneTower } from "@/components/book/courses/values-character/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Opt, type Round } from "./choice-rounds";
import { StarIcon, type T } from "./demo-kit";

/*
  Try, or Ask for Help? (level 4: courage and perseverance), from "Gugu Asks for Help" and "The
  Tallest Tower". Six moments: some we can try ourselves (and try again), some need a grown-up
  (hot, sharp, high or unkind), and one where both are right: try first, then ask. Asking is
  brave too.
*/

const COLOR = "#2F6FD0";

/** A paw held up: asking for help. */
function AskPic() {
  return (
    <svg width={36} height={36} viewBox="-18 -18 36 36" aria-hidden>
      <circle r={17} fill="#E4F0FF" />
      <path d="M-6 12 V-4 Q-6 -8 -3 -8 Q0 -8 0 -4 V-10 Q0 -14 3 -14 Q6 -14 6 -10 V2 L9 -2 Q12 -4 13 0 L6 12Z" fill="#F7B95E" stroke="#B5701E" strokeWidth={1.4} />
    </svg>
  );
}

const TRY: T = { en: "I can try it myself", am: "ራሴ መሞከር እችላለሁ" };
const ASK: T = { en: "Ask a grown-up for help", am: "ትልቅ ሰው እርዳታ መጠየቅ" };

const opts = (tryOk: boolean, askOk: boolean, tryNote?: T, askNote?: T): Opt[] => [
  { label: TRY, pic: <StarIcon size={36} />, ok: tryOk, note: tryNote },
  { label: ASK, pic: <AskPic />, ok: askOk, note: askNote },
];

const ROUNDS: Round[] = [
  {
    say: { en: "Your sandal strap came undone.", am: "የጫማችን ማሰሪያ ተፈታ።" },
    options: opts(true, false, undefined, { en: "A grown-up could do it, but this is one we can learn! Have a go first.", am: "ትልቅ ሰው ሊያስርልን ይችላል፤ ግን ይህን መማር እንችላለን! መጀመሪያ እንሞክር።" }),
    good: { en: "Pull, loop, press. It took three tries, and now it's done. You did that!", am: "ጎትቶ፣ ጠምዝዞ፣ መጫን። ሦስት ጊዜ ሞከርን፤ አሁን ተሳካ። በራሳችን!" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={170} y={294} s={0.5} tap={TAP.cub}>
          <Cub mood={s === "good" ? "joy" : s === "oops" ? "happy" : "worried"} arm={s === "good" ? "up" : "reach"} />
        </Place>
        <g transform="translate(250 286) rotate(-10)">
          <Sandals x={0} y={0} s={1.3} one={s !== "good"} />
        </g>
        {s === "good" && <Sparkles x={250} y={270} r={30} delay={0.2} n={5} />}
        {s === "ask" && <Sign x={250} y={210} kind="?" delay={0.4} />}
      </Yard>
    ),
  },
  {
    say: { en: "The stew on the fire needs stirring, and the pot is very hot.", am: "በእሳቱ ላይ ያለው ወጥ መማሰል አለበት፤ ድስቱ ግን በጣም ሞቃት ነው።" },
    options: opts(false, true, { en: "Fire and hot pots can burn us. This one is a job for a grown-up.", am: "እሳትና ሞቃት ድስት ሊያቃጥሉን ይችላሉ። ይህ የትልቅ ሰው ሥራ ነው።" }),
    good: { en: "Grandma stirs the pot, and you fetch the spoon and the bowls. Safe and helpful!", am: "አያቴ ወጡን ማሰለች፤ እኛ ማንኪያውንና ሳህኖቹን አመጣን። ደህንነትም፣ እገዛም!" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Hearth x={200} y={272} />
        <Steam x={200} y={232} />
        {s === "good" && (
          <Place x={268} y={290} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="pour" />
          </Place>
        )}
        <Place x={110} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={s === "oops" ? "worried" : s === "good" ? "joy" : "wow"} />
        </Place>
        {s === "oops" && <Sign x={200} y={180} kind="!" delay={0.2} color="#E2463F" />}
      </Home>
    ),
  },
  {
    say: { en: "Crash! Your stone tower fell down.", am: "ዷ! የድንጋይ ማማችን ፈረሰ።" },
    options: opts(true, false, undefined, { en: "Nobody else needs to build it. We can do it again, a little better!", am: "ሌላ ሰው መገንባት አያስፈልገውም። እንደገና፣ ትንሽ በተሻለ መሥራት እንችላለን!" }),
    good: { en: "Big stones at the bottom this time. Again, a little better!", am: "በዚህ ጊዜ ትላልቆቹ ድንጋዮች ከታች። እንደገና፣ ትንሽ በተሻለ!" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Stool x={210} y={270} s={1.1}>{s === "good" ? <StoneTower n={6} build start={0.2} /> : null}</Stool>
        {s !== "good" && <ScatteredStones x={210} y={288} />}
        <Place x={120} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={s === "good" ? "joy" : "sad"} arm={s === "good" ? "reach" : "none"} />
        </Place>
        {s === "good" && <Sparkles x={214} y={200} r={30} delay={1.6} n={5} />}
      </Home>
    ),
  },
  {
    say: { en: "Your kite is stuck up on the roof.", am: "ካይታችን ጣሪያው ላይ ተጣበቀ።" },
    options: opts(false, true, { en: "Climbing up high is dangerous. Ask a grown-up, and stay on the ground.", am: "ከፍ ብሎ መውጣት አደገኛ ነው። ትልቅ ሰው እንጠይቅ፤ መሬት ላይ እንቆይ።" }),
    good: { en: "Papa reaches it with a long stick. Down it comes, safe and sound!", am: "ፓፓ በረጅም ዱላ አወረደው። ካይቱ በሰላም ወረደ!" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Kite x={s === "good" ? 250 : 330} y={s === "good" ? 120 : 150} s={0.7} />
        {s === "good" && (
          <Place x={290} y={292} s={0.5} flip tap={TAP.papa}>
            <Papa mood="joy" pose="wave" />
          </Place>
        )}
        <Place x={140} y={294} s={0.46} tap={TAP.gugu}>
          <Gugu mood={s === "good" ? "joy" : "worried"} pose={s === "good" ? "wave" : "sit"} />
        </Place>
        {s === "oops" && <Sign x={330} y={110} kind="!" delay={0.2} color="#E2463F" />}
      </Yard>
    ),
  },
  {
    say: { en: "A word in your book is hard to read.", am: "በመጽሐፋችን ውስጥ አንድ ቃል ለማንበብ ከበደን።" },
    options: opts(true, true),
    good: { en: "Both are brave! Sound it out slowly first, and if it's still hard, ask the teacher. Asking is brave too!", am: "ሁለቱም ጀግንነት ነው! መጀመሪያ ቀስ ብለን ፊደል በፊደል እንሞክር፤ አሁንም ከከበደ መምህርቷን እንጠይቅ። መጠየቅም ጀግንነት ነው!" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Place x={150} y={294} s={0.46} tap={TAP.haben}>
          <Ibex mood={s === "good" ? "joy" : "worried"} pose="point" />
        </Place>
        <g transform="translate(200 230)">
          <Book s={1.4} />
        </g>
        {s === "good" ? (
          <>
            <Place x={290} y={290} s={0.5} flip tap={false}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Hearts spots={[[220, 170, 0.3]]} />
          </>
        ) : (
          <Sign x={200} y={170} kind="?" delay={0.3} />
        )}
      </Home>
    ),
  },
  {
    say: { en: "A big child keeps taking your ball and won't give it back.", am: "አንድ ትልቅ ልጅ ኳሳችንን ደጋግሞ ይወስዳል፤ አይመልስም።" },
    options: opts(false, true, { en: "We don't have to sort out unkindness alone. Tell a grown-up you trust.", am: "ክፉ ነገርን ብቻችንን መፍታት የለብንም። ለምናምነው ትልቅ ሰው እንንገር።" }),
    good: { en: "Grandma talks to the big child, and the ball comes back. Telling was the brave thing.", am: "አያቴ ትልቁን ልጅ አናገረችው፤ ኳሱም ተመለሰ። መናገሩ ጀግንነት ነበር።" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <Ball x={s === "good" ? 170 : 320} y={s === "good" ? 280 : 250} s={1.4} />
        {s === "good" ? (
          <Place x={270} y={290} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="raise" />
          </Place>
        ) : (
          <Speech x={300} y={190} w={40} h={34} tail="down" delay={0.3}>
            <path d="M-8 -6 L8 6 M8 -6 L-8 6" stroke="#E2463F" strokeWidth={3} />
          </Speech>
        )}
        <Place x={120} y={294} s={0.46} tap={TAP.tsehay}>
          <Tsehay mood={s === "good" ? "joy" : "sad"} />
        </Place>
        {s === "good" && <Hearts spots={[[180, 190, 0.4], [200, 176, 1.2]]} />}
      </Yard>
    ),
  },
];

export default function AskOrTry({ lang, onDone }: DemoProps) {
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Try, or Ask for Help?", am: "መሞከር ወይስ እርዳታ መጠየቅ?" }}
      goal={{ en: "Some things we can try ourselves; some need a grown-up. Choose!", am: "አንዳንዱን ራሳችን መሞከር እንችላለን፤ አንዳንዱ ትልቅ ሰው ያስፈልገዋል። ምረጡ!" }}
      color={COLOR}
      rounds={ROUNDS}
      cols={2}
      finale={{ en: "Trying is brave, and asking is brave too!", am: "መሞከር ጀግንነት ነው፤ መጠየቅም ጀግንነት ነው!" }}
      finaleScene={(id) => (
        <Yard id={id} time="day">
          {[
            { x: 70, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 150, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 230, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 310, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Sparkles x={200} y={140} r={110} delay={0.2} n={9} />
        </Yard>
      )}
      onDone={onDone}
    />
  );
}
