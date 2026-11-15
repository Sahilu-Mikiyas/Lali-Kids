"use client";

import { useState } from "react";

import { Place } from "@/components/book/scenery";
import { Ibex, TAP, Wolf } from "@/components/book/courses/science-nature/kit-cast";
import { Yard } from "@/components/book/courses/science-nature/kit-places";
import { InTub, Thing, Tub, type ThingKind } from "@/components/book/courses/science-nature/kit-stuff";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Float or Sink? (level 3: floating and sinking). Like Haben and Hawi at the tub: for each thing,
  guess first, then drop it in and watch. There is no losing: a right guess earns a star, and a
  surprise is a chance to learn (scientists learn most from surprises). Ten things: the wooden spoon
  (floats), the stone (sinks), the metal key (sinks), the plastic bottle top (floats), the big log
  (floats, though heavy), the tiny coin (sinks, though light), a whole orange (floats), a peeled
  orange (sinks), a ball of clay (sinks) and the same clay as a boat (floats).
*/

type Item = { kind: ThingKind; name: T; floats: boolean; why: T; s?: number };

const ITEMS: Item[] = [
  { kind: "wood-spoon", name: { en: "a wooden spoon", am: "የእንጨት ማንኪያ" }, floats: true, why: { en: "Wood is light for its size, so it floats.", am: "እንጨት ለመጠኑ ቀላል ነው፤ ስለዚህ ይንሳፈፋል።" } },
  { kind: "stone", name: { en: "a stone", am: "ድንጋይ" }, floats: false, why: { en: "Stone is heavy for its size, so it sinks.", am: "ድንጋይ ለመጠኑ ከባድ ነው፤ ስለዚህ ይሰምጣል።" } },
  { kind: "key", name: { en: "a metal key", am: "የብረት ቁልፍ" }, floats: false, why: { en: "Metal is heavy for its size, so a key sinks.", am: "ብረት ለመጠኑ ከባድ ነው፤ ስለዚህ ቁልፍ ይሰምጣል።" } },
  { kind: "cap", name: { en: "a plastic bottle top", am: "የፕላስቲክ የጠርሙስ ክዳን" }, floats: true, why: { en: "This plastic is light for its size, and the cap holds a little air, so it floats.", am: "ይህ ፕላስቲክ ለመጠኑ ቀላል ነው፤ ክዳኑም ትንሽ አየር ይይዛል፤ ስለዚህ ይንሳፈፋል።" } },
  { kind: "log", name: { en: "a big, heavy log", am: "ትልቅና ከባድ ግንድ" }, floats: true, s: 0.8, why: { en: "Heavy, but wood is light for its size, so even a big log floats!", am: "ከባድ ነው፤ ግን እንጨት ለመጠኑ ቀላል ነው፤ ስለዚህ ትልቅ ግንድም ይንሳፈፋል!" } },
  { kind: "coin", name: { en: "a tiny coin", am: "ትንሽ ሳንቲም" }, floats: false, why: { en: "Tiny and light, but metal is heavy for its size, so it sinks.", am: "ትንሽና ቀላል ነው፤ ግን ብረት ለመጠኑ ከባድ ነው፤ ስለዚህ ይሰምጣል።" } },
  { kind: "orange", name: { en: "a whole orange", am: "ሙሉ ብርቱካን" }, floats: true, why: { en: "The peel is full of tiny pockets of air, like a life jacket.", am: "ልጣጩ እንደ ሕይወት አድን ጃኬት በጥቃቅን የአየር ኪሶች የተሞላ ነው።" } },
  { kind: "orange-peeled", name: { en: "a peeled orange", am: "የተላጠ ብርቱካን" }, floats: false, why: { en: "Without its air-filled peel, the orange sinks.", am: "አየር የሞላበት ልጣጩ ከሌለ ብርቱካኑ ይሰምጣል።" } },
  { kind: "clay-ball", name: { en: "a ball of clay", am: "የሸክላ ኳስ" }, floats: false, why: { en: "A tight ball of clay sinks.", am: "የተጠቀጠቀ የሸክላ ኳስ ይሰምጣል።" } },
  { kind: "clay-boat", name: { en: "the same clay, made into a boat", am: "ያው ሸክላ፣ ጀልባ ሆኖ" }, floats: true, why: { en: "Same clay, new shape: a hollow boat floats!", am: "ያው ሸክላ፣ አዲስ ቅርጽ፦ ውስጡ ክፍት የሆነ ጀልባ ይንሳፈፋል!" } },
];

export default function FloatOrSink({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [guess, setGuess] = useState<boolean | null>(null);
  const [right, setRight] = useState(0);
  const [finished, setFinished] = useState(false);
  const item = ITEMS[Math.min(i, ITEMS.length - 1)];
  const dropped = guess !== null;
  const good = dropped && guess === item.floats;

  const choose = (g: boolean) => {
    setGuess(g);
    if (g === item.floats) {
      sound.good();
      setRight((n) => n + 1);
    } else sound.tap();
  };

  return (
    <DemoFrame lang={lang} title={{ en: "Float or Sink?", am: "ይንሳፈፋል ወይስ ይሰምጣል?" }} goal={{ en: "Guess first, then drop it in and watch!", am: "መጀመሪያ ገምቱ፤ ከዚያ ጥላችሁ ተመልከቱ!" }} step={finished ? ITEMS.length : i} total={ITEMS.length}>
      <Stage label={t(lang, item.name)}>
        <Yard id="fos-yard" time="day" />
        <Tub x={200} y={286} s={1.5}>
          {dropped && (
            <InTub key={i} x={0} floats={item.floats} delay={0.2}>
              <Thing kind={item.kind} s={(item.s ?? 1) * 1.5} />
            </InTub>
          )}
        </Tub>
        {!dropped && (
          <g transform="translate(200 120)">
            <g className="sn-bob">
              <Thing kind={item.kind} s={(item.s ?? 1) * 2.4} />
            </g>
          </g>
        )}
        <Place x={56} y={298} s={0.38} tap={TAP.haben}>
          <Ibex mood={dropped ? (good ? "joy" : "wow") : "happy"} />
        </Place>
        <Place x={346} y={298} s={0.38} flip tap={TAP.hawi}>
          <Wolf mood={dropped ? "joy" : "happy"} />
        </Place>
      </Stage>
      {finished ? (
        <Finale lang={lang} stars={right >= 8 ? 3 : right >= 5 ? 2 : 1} text={{ en: `You guessed ${right} of ${ITEMS.length} right, and found out all ten!`, am: `ከ${ITEMS.length} ነገሮች ${right}ቱን በትክክል ገመታችሁ፤ አሥሩንም ደረሳችሁበት!` }} onDone={onDone} />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">
            {t(lang, { en: "Will ", am: "" })}
            {t(lang, item.name)}
            {t(lang, { en: " float or sink?", am: " ይንሳፈፋል ወይስ ይሰምጣል?" })}
          </p>
          {dropped ? (
            <Feedback
              tone={good ? "great" : "gentle"}
              action={
                <Next
                  onClick={() => {
                    if (i === ITEMS.length - 1) setFinished(true);
                    else {
                      setI(i + 1);
                      setGuess(null);
                    }
                  }}
                >
                  {t(lang, i === ITEMS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next", am: "ቀጣይ" })}
                </Next>
              }
            >
              <span className="font-extrabold">
                {t(lang, item.floats ? { en: "It floats! ", am: "ይንሳፈፋል! " } : { en: "It sinks! ", am: "ይሰምጣል! " })}
                {t(lang, good ? { en: "Your guess was right. ", am: "ግምታችሁ ትክክል ነበር። " } : { en: "A surprise! Scientists learn from surprises. ", am: "አስገራሚ! ሳይንቲስቶች ከሚያስገርሙ ነገሮች ይማራሉ። " })}
              </span>
              {t(lang, item.why)}
            </Feedback>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Choice onClick={() => choose(true)} pic={<svg width={36} height={36} viewBox="-18 -18 36 36" aria-hidden><path d="M0 10 V-10 M-8 -2 L0 -10 L8 -2" stroke="#2FA35A" strokeWidth={4} fill="none" strokeLinecap="round" /></svg>}>
                {t(lang, { en: "Float", am: "ይንሳፈፋል" })}
              </Choice>
              <Choice onClick={() => choose(false)} pic={<svg width={36} height={36} viewBox="-18 -18 36 36" aria-hidden><path d="M0 -10 V10 M-8 2 L0 10 L8 2" stroke="#2F6FD0" strokeWidth={4} fill="none" strokeLinecap="round" /></svg>}>
                {t(lang, { en: "Sink", am: "ይሰምጣል" })}
              </Choice>
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
