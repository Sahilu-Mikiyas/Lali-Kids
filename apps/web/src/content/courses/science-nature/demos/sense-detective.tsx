"use client";

import type { ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Cub, OnHead, TAP } from "@/components/book/courses/science-nature/kit-cast";
import { Blindfold, Food, SenseIcon, Waves, type Sense } from "@/components/book/courses/science-nature/kit-body";
import { Cow } from "@/components/book/courses/science-nature/kit-life";
import { Home } from "@/components/book/courses/science-nature/kit-places";
import { Hearth, Jebena, RoastPan } from "@/components/book/courses/science-nature/kit-props";
import { Thing } from "@/components/book/courses/science-nature/kit-stuff";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Which Sense? (level 2: the five senses). Anbessa plays the blindfold game again. Six clues, one at
  a time: which sense tells him? The coffee roasting (smell), the cow mooing (hear), a smooth cool
  egg in his paw (touch), a sweet banana (taste), and, with the scarf off, the colours of the
  rainbow-striped basket (see), and the jebena bubbling (hear). Each answer shows the sense organ
  and the message going to the brain.
*/

const SENSES: Sense[] = ["see", "hear", "smell", "taste", "touch"];
const NAME: Record<Sense, Option["label"]> = {
  see: { en: "Seeing (eyes)", am: "ማየት (ዓይኖች)" },
  hear: { en: "Hearing (ears)", am: "መስማት (ጆሮዎች)" },
  smell: { en: "Smelling (nose)", am: "ማሽተት (አፍንጫ)" },
  taste: { en: "Tasting (tongue)", am: "መቅመስ (ምላስ)" },
  touch: { en: "Touching (skin)", am: "መዳሰስ (ቆዳ)" },
};
const OPTIONS: Option[] = SENSES.map((k) => ({ key: k, label: NAME[k], pic: <SenseIcon kind={k} x={22} y={22} s={0.75} /> }));

function Kitchen({ blind = true, children, sense }: { blind?: boolean; children?: ReactNode; sense?: Sense }) {
  return (
    <g>
      <Home id="sd-home" time="day" />
      {children}
      <Place x={140} y={294} s={0.52} tap={TAP.cub}>
        <g>
          <Cub mood={sense ? "joy" : "wow"} />
          {blind && (
            <OnHead>
              <Blindfold y={96} />
            </OnHead>
          )}
        </g>
      </Place>
      {sense && (
        <g transform="translate(140 110)">
          <circle r={30} fill="#FFFFFF" stroke="#7C3AED" strokeWidth={3} />
          <SenseIcon kind={sense} s={1} />
        </g>
      )}
    </g>
  );
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "Anbessa can't see, but he knows the coffee is roasting. Which sense tells him?", am: "አንበሳ ማየት አይችልም፤ ግን ቡና እየተቆላ መሆኑን ያውቃል። የትኛው ስሜት ነገረው?" },
    right: "smell",
    options: OPTIONS,
    why: { en: "His nose smells the roasting coffee. Smells travel through the air to your nose.", am: "አፍንጫው የሚቆላውን ቡና ያሸታል። ሽታ በአየር ውስጥ ተጉዞ አፍንጫችሁ ይደርሳል።" },
    scene: (ok) => (
      <Kitchen sense={ok ? "smell" : undefined}>
        <Hearth x={290} y={272}>
          <RoastPan x={0} y={-30} s={1.2} dark />
        </Hearth>
        <Waves x={260} y={210} n={4} dir={-1} />
      </Kitchen>
    ),
  },
  {
    prompt: { en: "Something outside goes \"Mooo!\" Which sense tells Anbessa it's the cow?", am: "ውጭ የሆነ ነገር «ሙውው!» አለ። ላሚቱ መሆኗን ለአንበሳ የነገረው የትኛው ስሜት ነው?" },
    right: "hear",
    options: OPTIONS,
    why: { en: "His ears hear the moo. Sounds travel through the air to your ears.", am: "ጆሮዎቹ «ሙ»ውን ይሰማሉ። ድምፅ በአየር ውስጥ ተጉዞ ጆሮአችሁ ይደርሳል።" },
    scene: (ok) => (
      <Kitchen sense={ok ? "hear" : undefined}>
        <Cow x={300} y={250} s={0.9} flip />
        <Waves x={250} y={190} kind="sound" n={3} dir={-1} />
      </Kitchen>
    ),
  },
  {
    prompt: { en: "Something smooth, hard and cool is in his paw. Which sense tells him it's an egg?", am: "ለስላሳ፣ ጠንካራና ቀዝቃዛ ነገር በእጁ ላይ አለ። እንቁላል መሆኑን የነገረው የትኛው ስሜት ነው?" },
    right: "touch",
    options: OPTIONS,
    why: { en: "The skin on his paw feels its shape, and that it is smooth and cool.", am: "የእጁ ቆዳ ቅርጹን፣ ለስላሳና ቀዝቃዛ መሆኑን ይሰማዋል።" },
    scene: (ok) => (
      <Kitchen sense={ok ? "touch" : undefined}>
        <Food kind="egg" x={260} y={230} s={2.6} />
      </Kitchen>
    ),
  },
  {
    prompt: { en: "He takes a bite: soft and sweet. Which sense tells him it's banana?", am: "ትንሽ ነከሰ፦ ለስላሳና ጣፋጭ። ሙዝ መሆኑን የነገረው የትኛው ስሜት ነው?" },
    right: "taste",
    options: OPTIONS,
    why: { en: "His tongue tastes it is sweet (and his nose helps too). We only taste things a grown-up says are food.", am: "ምላሱ ጣፋጭ መሆኑን ይቀምሳል (አፍንጫውም ይረዳል)። የምንቀምሰው ትልቅ ሰው ምግብ ነው ያለውን ብቻ ነው።" },
    scene: (ok) => (
      <Kitchen sense={ok ? "taste" : undefined}>
        <Food kind="banana" x={260} y={220} s={2.6} />
      </Kitchen>
    ),
  },
  {
    prompt: { en: "The scarf comes off. Which sense shows him the bright colours of the basket?", am: "ሻሹ ተፈታ። የቅርጫቱን ደማቅ ቀለሞች ያሳየው የትኛው ስሜት ነው?" },
    right: "see",
    options: OPTIONS,
    why: { en: "His eyes see shapes and colours. Eyes need light to see.", am: "ዓይኖቹ ቅርጾችንና ቀለሞችን ያያሉ። ዓይኖች ለማየት ብርሃን ያስፈልጋቸዋል።" },
    scene: (ok) => (
      <Kitchen blind={false} sense={ok ? "see" : undefined}>
        <g transform="translate(270 250)">
          <Thing kind="basket" s={2.4} />
          {["#E2463F", "#F5B21E", "#2E9A5A", "#2F6FD0"].map((c, i) => (
            <path key={c} d={`M-48 ${-10 - i * 8} H48`} stroke={c} strokeWidth={4} />
          ))}
        </g>
      </Kitchen>
    ),
  },
  {
    prompt: { en: "Blub, blub! Which sense tells him the jebena is bubbling?", am: "ቡል፣ ቡል! ጀበናው እየፈላ መሆኑን የነገረው የትኛው ስሜት ነው?" },
    right: "hear",
    options: OPTIONS,
    why: { en: "His ears again! Often we use two senses at once: he can hear it bubble and see the steam.", am: "እንደገና ጆሮዎቹ! ብዙ ጊዜ ሁለት ስሜቶችን አንድ ላይ እንጠቀማለን፦ ሲፈላ ይሰማዋል፣ እንፋሎቱንም ያያል።" },
    scene: (ok) => (
      <Kitchen blind={false} sense={ok ? "hear" : undefined}>
        <Hearth x={290} y={272}>
          <Jebena x={0} y={-24} s={1} steam />
        </Hearth>
        <Waves x={256} y={210} kind="sound" n={3} dir={-1} />
      </Kitchen>
    ),
  },
];

export default function SenseDetective({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Which Sense?", am: "የትኛው ስሜት?" }}
      goal={{ en: "Help Anbessa: which sense tells him what is there?", am: "አንበሳን እርዱት፦ እዚያ ያለውን የሚነግረው የትኛው ስሜት ነው?" }}
      rounds={ROUNDS}
      hint={{ en: "Not that one. Which part of Anbessa notices it: eyes, ears, nose, tongue or skin?", am: "ያ አይደለም። ይህን የሚያስተውለው የአንበሳ የትኛው ክፍል ነው፦ ዓይን፣ ጆሮ፣ አፍንጫ፣ ምላስ ወይስ ቆዳ?" }}
      finale={{ en: "Five senses, five helpers. Well done, detective!", am: "አምስት ስሜቶች፣ አምስት ረዳቶች። ጎበዝ መርማሪ!" }}
      end={ROUNDS[4].scene(true)}
      onDone={onDone}
    />
  );
}
