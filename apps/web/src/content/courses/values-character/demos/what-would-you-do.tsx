"use client";

import { useId, useState, type ReactNode } from "react";

import { AuntieSheep, Cat, Cub, Grandma, Gugu, TAP, Tsehay } from "@/components/book/courses/values-character/kit-cast";
import { Fence, Home, Village, Yard } from "@/components/book/courses/values-character/kit-places";
import { Ball, Broom, Hearts, HeavyStone, Kite, Sign, Sparkles, TomatoPlant, WateringCan } from "@/components/book/courses/values-character/kit-props";
import { Place, vars } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  What Would You Do? (level 2: honesty and responsibility). Four real moments: a broken cup, a
  promise and a better offer, money found on the path, and a chore when friends are playing.
  Every choice plays out in the picture and is described kindly: what happens next and why. If
  there's a better way, the child sees it play out too, then moves on.
*/

type Pick = { label: T; best: boolean; result: T; key: string };
type Moment = { say: T; picks: Pick[]; better: T; scene: (key: string | null) => ReactNode; place: "home" | "village" | "garden" };

const BrokenCup = () => (
  <g transform="translate(200 280)">
    <path d="M-14 0 L-8 -8 L-2 -2Z M2 0 L8 -10 L14 -1Z M-4 4 L4 -2 L8 4Z" fill="#FFFFFF" stroke="#D8D0C0" />
    <path d="M-12 -2 H-4" stroke="#2E9A8A" strokeWidth={1.4} />
  </g>
);

const Note = () => (
  <g>
    <rect x={-16} y={-9} width={32} height={18} rx={2} fill="#9FCB8A" stroke="#5A8A4A" strokeWidth={1.4} />
    <circle cx={0} cy={0} r={4.6} fill="none" stroke="#5A8A4A" strokeWidth={1.4} />
    <path d="M-12 -5 h4 M8 5 h4" stroke="#5A8A4A" strokeWidth={1.4} />
  </g>
);

const MOMENTS: Moment[] = [
  {
    place: "home",
    say: { en: "Playing ball inside, you broke Grandma's coffee cup. Grandma is coming!", am: "ቤት ውስጥ ኳስ ስትጫወት የአያቴን የቡና ስኒ ሰበርከው። አያቴ እየመጣች ነው!" },
    picks: [
      { key: "hide", best: false, label: { en: "Hide the pieces under the mat.", am: "ስብርባሪዎቹን ከምንጣፉ ሥር መደበቅ።" }, result: { en: "Later Grandma finds the pieces under the mat. Now she is sad twice: about the cup, and about the hiding.", am: "ቆየት ብሎ አያቴ ስብርባሪዎቹን ከምንጣፉ ሥር አገኘቻቸው። አሁን ሁለት ጊዜ አዘነች፦ ለስኒው፣ ለመደበቁም።" } },
      { key: "cat", best: false, label: { en: "Say that Dimmet the cat did it.", am: "«ድመቷ ዲመት ነች የሰበረችው» ማለት።" }, result: { en: "Dimmet is sent outside, and she didn't do anything! Your tummy feels heavy, like a stone.", am: "ዲመት ወደ ውጭ ተባረረች፤ ምንም ሳታጠፋ! ሆድህ እንደ ድንጋይ ከበደ።" } },
      { key: "truth", best: true, label: { en: "Tell Grandma the truth, and help clean up.", am: "ለአያቴ እውነቱን መናገርና ማጽዳቱን ማገዝ።" }, result: { en: "Grandma hugs you: \"Thank you for telling me. Cups can break, but truth is precious.\" You sweep up together.", am: "አያቴ አቀፈችህ፦ «ስለነገርከኝ አመሰግናለሁ። ስኒ ይሰበራል፤ እውነት ግን ውድ ነው።» አብራችሁ ጠረጋችሁ።" } },
    ],
    better: { en: "A better way: tell Grandma what happened, say sorry, and help sweep up.", am: "የተሻለው መንገድ፦ የሆነውን ለአያቴ መንገር፣ ይቅርታ መጠየቅና መጥረግ ማገዝ።" },
    scene: (key) => (
      <>
        {key !== "truth" && <BrokenCup />}
        {key === "hide" && <path d="M150 288 L250 288 L240 296 L160 296Z" fill="#E86A2A" />}
        {key === "hide" && <path d="M190 288 q10 -8 20 0" fill="#E86A2A" />}
        <Ball x={340} y={280} s={1.1} />
        {key === "cat" ? (
          <g transform="translate(70 284)">
            <Cat mood="wow" />
          </g>
        ) : (
          <g transform="translate(330 250)">
            <Cat sleep />
          </g>
        )}
        <Place x={key === "truth" ? 150 : 110} y={292} s={0.5} tap={TAP.grandma}>
          <Grandma arm={key === "truth" ? "wrap" : "down"} mood={key === "truth" ? "joy" : key ? "sad" : "wow"} />
        </Place>
        <Place x={key === "truth" ? 226 : 270} y={294} s={0.46} flip tap={TAP.cub}>
          <g>
            <Cub mood={key === "truth" ? "joy" : "worried"} />
            {key === "cat" && <HeavyStone x={150} y={182} size={2.2} />}
          </g>
        </Place>
        {key === "truth" && <Broom x={290} y={290} s={1.1} sweep />}
        {key === "truth" && <Hearts spots={[[190, 170, 0.3], [210, 156, 1.1]]} />}
        {!key && <Sign x={200} y={150} kind="!" delay={0.3} color="#E2463F" />}
      </>
    ),
  },
  {
    place: "village",
    say: { en: "You promised to play with Tsehay after lunch. Now Gugu asks you to fly kites!", am: "ከምሳ በኋላ ከፀሐይ ጋር ልትጫወት ቃል ገብተሃል። አሁን ጉጉ ካይት እናብር አለህ!" },
    picks: [
      { key: "run", best: false, label: { en: "Run off with Gugu and say nothing.", am: "ምንም ሳይናገሩ ከጉጉ ጋር መሮጥ።" }, result: { en: "Tsehay waits and waits by her door. She feels forgotten.", am: "ፀሐይ በሯ ላይ ጠበቀች፣ ጠበቀች። እንደተረሳች ተሰማት።" } },
      { key: "together", best: true, label: { en: "Ask Tsehay: \"Shall we all fly kites together?\"", am: "ፀሐይን «ሁላችንም አብረን ካይት እናብር?» ብሎ መጠየቅ።" }, result: { en: "Tsehay claps! Now three friends fly kites, and your promise is kept.", am: "ፀሐይ አጨበጨበች! አሁን ሦስት ጓደኛሞች ካይት ያበራሉ፤ ቃልህም ተጠበቀ።" } },
      { key: "later", best: false, label: { en: "Tell Tsehay \"maybe later\" and go.", am: "ለፀሐይ «ምናልባት በኋላ» ብሎ መሄድ።" }, result: { en: "Tsehay's face falls. \"Maybe later\" isn't the same as a promise kept.", am: "የፀሐይ ፊት ጠቆረ። «ምናልባት በኋላ» ቃልን ከመጠበቅ ጋር አንድ አይደለም።" } },
    ],
    better: { en: "A better way: keep your promise. You could even invite Tsehay to fly kites with you both!", am: "የተሻለው መንገድ፦ ቃልህን መጠበቅ። ፀሐይንም ከሁለታችሁ ጋር ካይት እንድታበር መጋበዝ ትችላለህ!" },
    scene: (key) => (
      <>
        <Kite x={key === "together" ? 200 : 300} y={80} s={0.8} sx={-30} sy={150} />
        <Place x={key === "run" || key === "later" ? 300 : 230} y={294} s={0.44} flip tap={TAP.gugu}>
          <Gugu mood="joy" pose="wave" />
        </Place>
        <Place x={key === "run" || key === "later" ? 250 : 160} y={294} s={0.46} flip={key === "run" || key === "later"} tap={TAP.cub}>
          <Cub mood={key === "together" ? "joy" : key ? "worried" : "wow"} />
        </Place>
        <Place x={key === "together" ? 90 : 70} y={294} s={0.42} className={key === "together" ? "lali-hop" : undefined} tap={TAP.tsehay}>
          <Tsehay mood={key === "together" ? "joy" : key ? "sad" : "happy"} tear={key === "run"} />
        </Place>
        {key === "together" && <Sparkles x={160} y={180} r={60} delay={0.2} n={7} />}
      </>
    ),
  },
  {
    place: "village",
    say: { en: "On the path you find a 10-birr note.", am: "በመንገዱ ላይ አሥር ብር አገኘህ።" },
    picks: [
      { key: "keep", best: false, label: { en: "Keep it and buy sweets.", am: "ይዞ ከረሜላ መግዛት።" }, result: { en: "The sweets taste nice, but someone is walking up and down the path, looking worried.", am: "ከረሜላው ይጣፍጣል፤ ግን አንድ ሰው ተጨንቆ በመንገዱ ላይ ወዲያና ወዲህ እየፈለገ ነው።" } },
      { key: "leave", best: false, label: { en: "Leave it where it is.", am: "ባለበት መተው።" }, result: { en: "Someone else might pick it up and keep it, and whoever lost it may never get it back.", am: "ሌላ ሰው አንሥቶ ሊወስደው ይችላል፤ የጠፋበት ሰውም ላያገኘው ይችላል።" } },
      { key: "ask", best: true, label: { en: "Ask \"Who lost this?\" and give it to a grown-up.", am: "«ይህ የማን ነው?» ብሎ ለትልቅ ሰው መስጠት።" }, result: { en: "It was Auntie Sheep's! She needed it for medicine. \"Thank you, my honest friend!\"", am: "የእማማ በግ ነበር! ለመድኃኒት ያስፈልጋት ነበር። «አመሰግናለሁ፣ ታማኝ ወዳጄ!»" } },
    ],
    better: { en: "A better way: pick it up, ask \"Who lost this?\" and give it to a grown-up.", am: "የተሻለው መንገድ፦ አንሥቶ «ይህ የማን ነው?» ብሎ መጠየቅና ለትልቅ ሰው መስጠት።" },
    scene: (key) => (
      <>
        {(key === null || key === "leave") && (
          <g transform="translate(200 272)">
            <Note />
          </g>
        )}
        <Place x={key === "ask" ? 160 : 130} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={key === "ask" ? "joy" : key ? "worried" : "wow"} arm={key === "ask" ? "give" : "none"} item={key === "ask" ? <Note /> : undefined} />
        </Place>
        <g className={key === "keep" || key === "leave" ? "vc-rock" : undefined}>
          <Place x={300} y={294} s={0.48} flip tap={TAP.sheep}>
            <AuntieSheep mood={key === "ask" ? "joy" : "worried"} />
          </Place>
        </g>
        {key === "keep" && (
          <g transform="translate(176 230)">
            <circle r={6} fill="#E2463F" />
            <circle cx={10} cy={4} r={6} fill="#2F6FD0" />
          </g>
        )}
        {key === "ask" && <Hearts spots={[[240, 170, 0.3], [262, 156, 1.1]]} />}
        {key !== "ask" && key !== null && <Sign x={300} y={160} kind="?" delay={0.3} />}
      </>
    ),
  },
  {
    place: "garden",
    say: { en: "Your job today is watering the tomatoes. But your friends are playing football!", am: "የዛሬ ሥራህ ቲማቲሞቹን ውሃ ማጠጣት ነው። ጓደኞችህ ግን ኳስ እየተጫወቱ ነው!" },
    picks: [
      { key: "later", best: false, label: { en: "Play first, water later… if you remember.", am: "መጀመሪያ መጫወት፣ ውሃውን በኋላ… ካስታወሱ።" }, result: { en: "You forget! By evening the tomato plants are droopy and thirsty.", am: "ረሳኸው! ምሽት ላይ የቲማቲም ተክሎቹ ጠውልገውና ተጠምተው ነበር።" } },
      { key: "first", best: true, label: { en: "Water the tomatoes, then go and play.", am: "ቲማቲሞቹን ውሃ አጠጥቶ ከዚያ መጫወት።" }, result: { en: "The plants drink and stand up tall. And there's still time for football!", am: "ተክሎቹ ውሃ ጠጥተው ቀጥ አሉ። ለኳስ ጨዋታም ገና ጊዜ አለ!" } },
      { key: "friend", best: false, label: { en: "Ask a friend to do your job for you.", am: "ጓደኛን ሥራህን እንዲሠራልህ መጠየቅ።" }, result: { en: "Gugu wants to play too, and it's your job, not his. The plants are still waiting for you.", am: "ጉጉም መጫወት ይፈልጋል፤ ሥራው ደግሞ ያንተ እንጂ የእሱ አይደለም። ተክሎቹ አሁንም እየጠበቁህ ነው።" } },
    ],
    better: { en: "A better way: do your job first, then play. Jobs done well feel good!", am: "የተሻለው መንገድ፦ መጀመሪያ ሥራህን፣ ከዚያ ጨዋታ። በደንብ የተሠራ ሥራ ደስ ያሰኛል!" },
    scene: (key) => (
      <>
        <Fence y={250} />
        {[70, 130, 190].map((x) => (
          <g key={x} className={key === "later" ? "vc-tumble" : undefined} style={vars({ "--tr": "40deg", "--tx": "0px", "--ty": "0px" })}>
            <TomatoPlant x={x} y={262} s={1.3} ripe={key === "first"} />
          </g>
        ))}
        {key === "first" && <WateringCan x={250} y={238} s={1.3} pour />}
        <Place x={key === "first" ? 280 : 250} y={294} s={0.46} flip tap={TAP.cub}>
          <Cub mood={key === "first" ? "joy" : key ? "worried" : "wow"} />
        </Place>
        <Place x={350} y={294} s={0.4} flip tap={TAP.gugu}>
          <Gugu mood={key === "friend" ? "worried" : "joy"} pose={key === "friend" ? "no" : "wave"} />
        </Place>
        <Ball x={330} y={220} s={1} />
        {key === "first" && <Sparkles x={130} y={200} r={60} delay={0.4} n={6} />}
      </>
    ),
  },
];

export default function WhatWouldYouDo({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [key, setKey] = useState<string | null>(null);
  const [showBetter, setShowBetter] = useState(false);
  const done = i >= MOMENTS.length;
  const m = MOMENTS[Math.min(i, MOMENTS.length - 1)];
  const pick = m.picks.find((p) => p.key === key) ?? null;
  const bestKey = m.picks.find((p) => p.best)!.key;
  const shownKey = showBetter ? bestKey : key;

  const choose = (p: Pick) => {
    setKey(p.key);
    setShowBetter(false);
    if (p.best) sound.good();
    else sound.gentle();
  };
  const next = () => {
    setI((n) => n + 1);
    setKey(null);
    setShowBetter(false);
  };
  const nextLabel = t(lang, i === MOMENTS.length - 1 ? { en: "Finish", am: "ጨርስ" } : { en: "Next", am: "ቀጣይ" });

  const scene = (
    <g key={`${i}-${shownKey ?? "x"}`}>
      {m.scene(shownKey)}
    </g>
  );

  return (
    <DemoFrame lang={lang} title={{ en: "What Would You Do?", am: "አንተ ምን ታደርጋለህ?" }} goal={{ en: "Choose what to do, and watch what happens next.", am: "የምታደርገውን ምረጥ፤ ቀጥሎ የሚሆነውንም ተመልከት።" }} step={i} total={MOMENTS.length} color="#E2463F">
      <Stage label={done ? undefined : t(lang, m.say)}>
        {done ? (
          <Yard id={id} time="evening">
            <Place x={120} y={292} s={0.46} tap={TAP.grandma}>
              <Grandma arm="raise" mood="joy" />
            </Place>
            <Place x={200} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={280} y={294} s={0.4} flip tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="hop" />
            </Place>
            <Place x={340} y={294} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Sparkles x={200} y={140} r={110} delay={0.2} n={9} />
          </Yard>
        ) : m.place === "home" ? (
          <Home id={id} time="day">
            {scene}
          </Home>
        ) : m.place === "village" ? (
          <Village id={id} time="day">
            {scene}
          </Village>
        ) : (
          <Yard id={id} time={key === "later" && !showBetter ? "evening" : "day"} house={false}>
            {scene}
          </Yard>
        )}
      </Stage>

      {done ? (
        <Finale lang={lang} text={{ en: "Four tricky moments, and you found the kind, honest way!", am: "አራት አስቸጋሪ ጊዜያት፤ ደግና ታማኝ መንገዱን አገኘህ!" }} onDone={onDone} color="#E2463F" />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, m.say)}</p>
          {pick && (pick.best || showBetter) ? (
            <Feedback tone="great" action={<Next onClick={next} color="#E2463F">{nextLabel}</Next>}>
              {t(lang, m.picks.find((p) => p.best)!.result)}
            </Feedback>
          ) : pick ? (
            <Feedback
              tone="gentle"
              action={
                <>
                  <Next onClick={() => setKey(null)} color="#7A8AA8">
                    {t(lang, { en: "Choose again", am: "እንደገና ምረጥ" })}
                  </Next>
                  <Next onClick={() => { setShowBetter(true); sound.good(); }} color="#C98A0A">
                    {t(lang, { en: "Show me the better way", am: "የተሻለውን መንገድ አሳየኝ" })}
                  </Next>
                </>
              }
            >
              <p>{t(lang, pick.result)}</p>
              <p className="mt-2 font-bold">{t(lang, m.better)}</p>
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3">
              {m.picks.map((p) => (
                <Choice key={p.key} onClick={() => choose(p)}>
                  {t(lang, p.label)}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
