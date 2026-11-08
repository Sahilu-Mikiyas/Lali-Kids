"use client";

import { useId, useState } from "react";

import { Camel, Cub, Grandma, Gugu, Ibex, Mama, TAP, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Home } from "@/components/book/courses/values-character/kit-places";
import { Ball, Hearts, Sparkles } from "@/components/book/courses/values-character/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  The Greeting Game (level 1). Six visitors come through the door, one at a time: an elder, a
  friend, Mama with the baby, a guest, Grandma with a heavy basket, and a shy new girl. The child
  picks how Anbessa greets each one. The respectful way gets a blessing or a hug; any other
  choice is shown kindly (what happens, and why), with the better way, and the child tries again.
*/

type Who = "elder" | "friend" | "baby" | "guest" | "basket" | "newgirl";
type Option = { label: T; good: boolean; result: T };
type Visitor = { who: Who; intro: T; options: Option[]; great: T };

const VISITORS: Visitor[] = [
  {
    who: "elder",
    intro: { en: "Knock, knock! Grandpa Tolosa comes in, leaning on his stick.", am: "ኳ፣ ኳ! አባ ቶሎሳ በምርኩዛቸው ተደግፈው ገቡ።" },
    options: [
      { label: { en: "Wave from the floor and keep playing.", am: "ከወለሉ ላይ እጅ አውለብልቦ መጫወት መቀጠል።" }, good: false, result: { en: "Grandpa waves back, but he looks a little sad. Elders feel respected when we stand up and greet them properly.", am: "አባ ቶሎሳ መልሰው እጅ አውለበለቡ፤ ግን ትንሽ ያዘኑ ይመስላሉ። ታላላቆች ቆመን በሥርዓት ሰላም ስንላቸው ክብር ይሰማቸዋል።" } },
      { label: { en: "Stand up, bow low and kiss his knees.", am: "ተነሥቶ፣ ጎንበስ ብሎ ጉልበታቸውን መሳም።" }, good: true, result: { en: "", am: "" } },
      { label: { en: "Give him a high five!", am: "እጅ ለእጅ ማጨብጨብ!" }, good: false, result: { en: "Grandpa laughs and gives you a wobbly high five! But for an elder, the respectful way is to stand up and bow.", am: "አባ ቶሎሳ ሳቁና እየተንቀጠቀጡ አጨበጨቡ! ለታላቅ ሰው ግን የክብሩ መንገድ ተነሥቶ እጅ መንሳት ነው።" } },
    ],
    great: { en: "Grandpa Tolosa rests his paw on your head: \"Grow and flourish, child!\"", am: "አባ ቶሎሳ እጃቸውን ራሳችን ላይ አሳረፉ፦ «እደግ ተመንደግ፣ ልጄ!»" },
  },
  {
    who: "friend",
    intro: { en: "Here comes Gugu, your best friend!", am: "የቅርብ ጓደኛችን ጉጉ መጣ!" },
    options: [
      { label: { en: "Bow and kiss his knees.", am: "ጎንበስ ብሎ ጉልበቱን መሳም።" }, good: false, result: { en: "Gugu giggles: \"I'm not your grandpa!\" Bowing is for elders. For a friend, a hug or a high five is just right.", am: "ጉጉ ሳቀ፦ «እኔ አያታችሁ አይደለሁም!» እጅ መንሳት ለታላላቆች ነው። ለጓደኛ ማቀፍ ወይም ማጨብጨብ ልክ ነው።" } },
      { label: { en: "Hide behind the door.", am: "ከበሩ ጀርባ መደበቅ።" }, good: false, result: { en: "Gugu thinks you don't want to play. A friendly hello helps friends feel welcome.", am: "ጉጉ መጫወት የማንፈልግ መሰለው። የወዳጅነት ሰላምታ ጓደኞች እንደተፈለጉ እንዲሰማቸው ያደርጋል።" } },
      { label: { en: "Jump up and give him a big hug!", am: "ዘልሎ ተነሥቶ በደንብ ማቀፍ!" }, good: true, result: { en: "", am: "" } },
    ],
    great: { en: "A hug for a friend! Gugu hugs you back and wants to play.", am: "ለጓደኛ ማቀፍ! ጉጉ መልሶ አቀፈን፤ መጫወትም ፈለገ።" },
  },
  {
    who: "baby",
    intro: { en: "Mama comes in, carrying baby Dawit.", am: "እማማ ሕፃኑን ዳዊትን አቅፋ ገባች።" },
    options: [
      { label: { en: "Greet Mama first, then a soft hello for the baby.", am: "መጀመሪያ እማማን ሰላም ማለት፣ ከዚያ ለሕፃኑ በለስላሳ ድምፅ ሰላም ማለት።" }, good: true, result: { en: "", am: "" } },
      { label: { en: "Run to the baby and shout HELLO!", am: "ወደ ሕፃኑ ሮጦ «ሰላም!» ብሎ መጮኽ!" }, good: false, result: { en: "Waaah! Baby Dawit got a fright. Babies like soft voices and gentle touches, and Mama likes a hello too.", am: "ዋ! ሕፃኑ ዳዊት ደነገጠ። ሕፃናት ለስላሳ ድምፅና ቀስ ያለ መዳበስ ይወዳሉ፤ እማማም ሰላምታ ትወዳለች።" } },
      { label: { en: "Ask Mama for a snack.", am: "እማማን መክሰስ መጠየቅ።" }, good: false, result: { en: "Mama smiles, but she hasn't even sat down yet! First a hello, then she can help you.", am: "እማማ ፈገግ አለች፤ ግን ገና አልተቀመጠችም! መጀመሪያ ሰላምታ፣ ከዚያ ልትረዳን ትችላለች።" } },
    ],
    great: { en: "Mama kisses your cheeks, and baby Dawit smiles at you.", am: "እማማ ጉንጫችንን ሳመች፤ ሕፃኑ ዳዊትም ፈገግ አለልን።" },
  },
  {
    who: "guest",
    intro: { en: "A guest! Hooyo, Ayan's mother, comes to visit.", am: "እንግዳ! የአያን እናት ሁዮ ልትጠይቅ መጣች።" },
    options: [
      { label: { en: "Point at a chair and keep eating.", am: "ወንበር እየጠቆሙ መብላት መቀጠል።" }, good: false, result: { en: "Hooyo sits down, but she isn't sure she's welcome. Standing up and inviting a guest in makes them feel at home.", am: "ሁዮ ተቀመጠች፤ ግን እንደተፈለገች እርግጠኛ አልሆነችም። ተነሥቶ እንግዳን መጋበዝ እቤታቸው እንዳሉ እንዲሰማቸው ያደርጋል።" } },
      { label: { en: "Ask: \"What did you bring me?\"", am: "«ምን አመጣሽልኝ?» ብሎ መጠየቅ።" }, good: false, result: { en: "Hooyo laughs, but that question can make a guest feel awkward. A guest is welcome just as they are.", am: "ሁዮ ሳቀች፤ ይህ ጥያቄ ግን እንግዳን ሊያሳፍር ይችላል። እንግዳ እንዳለ ሆኖ የተወደደ ነው።" } },
      { label: { en: "Stand up: \"Welcome! Please come in and sit down.\"", am: "ተነሥቶ፦ «እንኳን ደህና መጣሽ! እባክሽ ግቢ፣ ተቀመጪ።»" }, good: true, result: { en: "", am: "" } },
    ],
    great: { en: "Hooyo smiles: \"What a kind welcome!\" She feels right at home.", am: "ሁዮ ፈገግ አለች፦ «እንዴት ያለ ደግ አቀባበል!» እቤቷ እንዳለች ተሰማት።" },
  },
  {
    who: "basket",
    intro: { en: "Grandma is back from the market with a heavy basket.", am: "አያቴ ከገበያ ከባድ ቅርጫት ይዛ ተመለሰች።" },
    options: [
      { label: { en: "Run to help carry the basket, and say hello.", am: "ቅርጫቱን ለማገዝ ሮጦ ሰላም ማለት።" }, good: true, result: { en: "", am: "" } },
      { label: { en: "Ask: \"What's in the basket?\"", am: "«ቅርጫቱ ውስጥ ምን አለ?» ብሎ መጠየቅ።" }, good: false, result: { en: "Grandma's arms are tired! Helping first is a lovely way to say hello.", am: "የአያቴ እጆች ደክመዋል! መጀመሪያ ማገዝ ድንቅ የሰላምታ መንገድ ነው።" } },
      { label: { en: "Keep playing with the ball.", am: "በኳሱ መጫወት መቀጠል።" }, good: false, result: { en: "Grandma puts the basket down slowly, all by herself. A quick helping hand would have made her smile.", am: "አያቴ ቅርጫቱን ብቻዋን ቀስ ብላ አስቀመጠች። ፈጣን የእርዳታ እጅ ፈገግ ያሰኛት ነበር።" } },
    ],
    great: { en: "Grandma laughs: \"My strong helper!\" Together the basket is light.", am: "አያቴ ሳቀች፦ «ጠንካራው ረዳቴ!» አብሮ ሲሆን ቅርጫቱ ቀለለ።" },
  },
  {
    who: "newgirl",
    intro: { en: "Haben is new in the village. She speaks Tigrinya, and she is shy.", am: "ሐበን በመንደሩ አዲስ ናት። ትግርኛ ትናገራለች፤ ዓይናፋርም ናት።" },
    options: [
      { label: { en: "Stare at her and whisper to your friends.", am: "እያፈጠጡ ለጓደኞች ሹክ ማለት።" }, good: false, result: { en: "Haben feels shy and alone. A smile is the same in every language.", am: "ሐበን ዓይናፋርነትና ብቸኝነት ተሰማት። ፈገግታ በሁሉም ቋንቋ አንድ ነው።" } },
      { label: { en: "Smile, say \"Selam!\" and show her where to sit.", am: "ፈገግ ብሎ «ሰላም!» ማለትና የምትቀመጥበትን ማሳየት።" }, good: true, result: { en: "", am: "" } },
      { label: { en: "Talk very LOUDLY so she understands.", am: "እንድትገባት በጣም ጮክ ብሎ መናገር።" }, good: false, result: { en: "Loud words can be scary! Haben is still learning Amharic. Speak gently, and smile.", am: "ጩኸት ሊያስፈራ ይችላል! ሐበን ገና አማርኛ እየተማረች ነው። በቀስታ እንናገር፤ ፈገግም እንበል።" } },
    ],
    great: { en: "Haben smiles back: \"Selam!\" Now she has a new friend.", am: "ሐበን መልሳ ፈገግ አለች፦ «ሰላም!» አሁን አዲስ ጓደኛ አገኘች።" },
  },
];

/** The visitor, drawn at the door, in a mood that shows how the greeting went. */
function Visitor({ who, state }: { who: Who; state: "idle" | "good" | "oops" }) {
  const mood = state === "good" ? "joy" : state === "oops" ? "worried" : "happy";
  switch (who) {
    case "elder":
      return (
        <Place x={120} y={292} s={0.52} tap={TAP.elder}>
          <Wolf elder mood={mood} arm={state === "good" ? "bless" : undefined} />
        </Place>
      );
    case "friend":
      return (
        <Place x={130} y={294} s={0.46} className={state === "good" ? "lali-hop" : undefined} tap={TAP.gugu}>
          <Gugu mood={mood} pose={state === "good" ? "wave" : state === "oops" ? "no" : "sit"} />
        </Place>
      );
    case "baby":
      return (
        <Place x={120} y={292} s={0.52} tap={TAP.mama}>
          <Mama mood={state === "oops" ? "worried" : mood} baby={state === "oops" ? "cry" : state === "good" ? "awake" : "sleep"} />
        </Place>
      );
    case "guest":
      return (
        <Place x={140} y={294} s={0.62} tap={TAP.mama}>
          <Camel who="hooyo" mood={mood} />
        </Place>
      );
    case "basket":
      return (
        <Place x={124} y={292} s={0.52} tap={TAP.grandma}>
          <Grandma mood={mood} arm="hold" item={<Basket />} />
        </Place>
      );
    case "newgirl":
      return (
        <Place x={126} y={294} s={0.44} tap={TAP.haben}>
          <Ibex mood={state === "good" ? "joy" : state === "oops" ? "sad" : "worried"} pose={state === "good" ? "wave" : "sit"} />
        </Place>
      );
  }
}

function Basket() {
  return (
    <g transform="translate(0 6)">
      <path d="M-18 -10 L-14 10 L14 10 L18 -10Z" fill="#D9A04A" />
      <circle cx={-8} cy={-12} r={6} fill="#E2463F" />
      <circle cx={4} cy={-14} r={6} fill="#F5B21E" />
      <path d="M10 -12 l4 -10" stroke="#3F9A4E" strokeWidth={3} />
    </g>
  );
}

/** How Anbessa greets: bowing to elders, hugging friends, helping Grandma, waving to Haben. */
function Anbessa({ who, state }: { who: Who; state: "idle" | "good" | "oops" }) {
  if (state === "good") {
    const bow = who === "elder" || who === "guest" || who === "baby";
    return (
      <Place x={220} y={294} s={0.46} flip tap={TAP.cub}>
        <Cub mood="joy" bow={bow} arm={who === "basket" ? "reach" : who === "newgirl" ? "up" : who === "friend" ? "give" : "none"} />
      </Place>
    );
  }
  return (
    <Place x={300} y={294} s={0.46} flip tap={TAP.cub}>
      <Cub mood={state === "oops" ? "worried" : "happy"} look={-3} />
    </Place>
  );
}

export default function GreetingGame({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const done = i >= VISITORS.length;
  const v = VISITORS[Math.min(i, VISITORS.length - 1)];
  const chosen = pick === null ? null : v.options[pick];
  const state = chosen ? (chosen.good ? "good" : "oops") : "idle";

  const choose = (k: number) => {
    setPick(k);
    if (v.options[k].good) sound.good();
    else {
      sound.gentle();
      setTried((x) => [...x, k]);
    }
  };
  const next = () => {
    setI((n) => n + 1);
    setPick(null);
    setTried([]);
  };

  return (
    <DemoFrame lang={lang} title={{ en: "The Greeting Game", am: "የሰላምታ ጨዋታ" }} goal={{ en: "Who is at the door? Choose the best way to greet each visitor.", am: "በሩ ላይ ማን አለ? እያንዳንዱን እንግዳ ሰላም የምትሉበትን ምርጥ መንገድ ምረጡ።" }} step={i} total={VISITORS.length}>
      <Stage label={done ? undefined : t(lang, v.intro)}>
        <Home id={id} time="day" door="open">
          {done ? (
            <g>
              <Place x={50} y={290} s={0.36} tap={TAP.elder}>
                <Wolf elder mood="joy" />
              </Place>
              <Place x={104} y={294} s={0.3} tap={TAP.gugu}>
                <Gugu mood="joy" pose="wave" />
              </Place>
              <Place x={156} y={290} s={0.36} tap={TAP.mama}>
                <Mama mood="joy" baby="awake" />
              </Place>
              <Place x={214} y={294} s={0.3} tap={TAP.cub}>
                <Cub mood="joy" arm="up" />
              </Place>
              <Place x={270} y={292} s={0.42} flip tap={TAP.mama}>
                <Camel who="hooyo" mood="joy" />
              </Place>
              <Place x={326} y={290} s={0.36} flip tap={TAP.grandma}>
                <Grandma mood="joy" arm="raise" />
              </Place>
              <Place x={374} y={294} s={0.3} flip tap={TAP.haben}>
                <Ibex mood="joy" pose="wave" />
              </Place>
              <Hearts spots={[[120, 170, 0.2], [200, 150, 0.8], [280, 166, 1.4]]} />
            </g>
          ) : (
            <g key={`${i}-${pick ?? "x"}`}>
              <Ball x={340} y={282} s={1} />
              <Visitor who={v.who} state={state} />
              <Anbessa who={v.who} state={state} />
              {state === "good" && <Hearts spots={[[170, 180, 0.2], [190, 166, 1], [156, 160, 1.6]]} />}
              {state === "good" && <Sparkles x={170} y={180} r={50} delay={0.2} n={6} />}
            </g>
          )}
        </Home>
      </Stage>

      {done ? (
        <Finale lang={lang} text={{ en: "Six visitors, six kind greetings!", am: "ስድስት እንግዶች፣ ስድስት ደግ ሰላምታዎች!" }} onDone={onDone} />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, v.intro)}</p>
          {chosen?.good ? (
            <Feedback tone="great" action={<Next onClick={next}>{t(lang, i === VISITORS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next visitor", am: "ቀጣዩ እንግዳ" })}</Next>}>
              {t(lang, v.great)}
            </Feedback>
          ) : chosen ? (
            <Feedback tone="gentle" action={<Next onClick={() => setPick(null)} color="#C98A0A">{t(lang, { en: "Try another way", am: "ሌላ መንገድ ሞክሩ" })}</Next>}>
              {t(lang, chosen.result)}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3">
              {v.options.map((o, k) => (
                <Choice key={k} onClick={() => choose(k)} tone={tried.includes(k) ? "soft" : "plain"}>
                  {t(lang, o.label)}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
