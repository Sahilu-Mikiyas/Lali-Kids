"use client";

import { motion } from "motion/react";

import { Place } from "@/components/book/scenery";
import { Cub, Grandma, TAP } from "@/components/book/courses/our-ethiopia/kit-cast";
import { BatterJar, FlourSack, Mitad } from "@/components/book/courses/our-ethiopia/kit-crafts";
import { Home } from "@/components/book/courses/our-ethiopia/kit-places";
import { Steam } from "@/components/book/courses/our-ethiopia/kit-props";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./rounds-kit";

/*
  Make Injera, Step by Step (level 6). Six steps in order: mix teff flour, water and a spoon of
  ersho (old batter saved from last time); let it rest two or three days until it bubbles and
  smells a little sour; a grown-up heats the big clay mitad; pour the batter in a spiral from
  the outside in; cover it with the lid; lift it off when the top is covered in eyes (injera
  cooks on one side only). A grown-up always handles the fire.
*/

const STEPS: Step[] = [
  {
    key: "mix",
    label: { en: "Mix teff flour, water and a spoon of ersho", am: "የጤፍ ዱቄት፣ ውሃና አንድ ማንኪያ እርሾ አቡኩ" },
    fact: { en: "Ersho is a little old batter saved from last time. It wakes up the new batter.", am: "እርሾ ካለፈው ጊዜ የተቀመጠ ትንሽ ሊጥ ነው። አዲሱን ሊጥ ያነቃዋል።" },
    pic: (
      <g transform="translate(22 40)">
        <FlourSack x={0} y={0} s={0.6} />
      </g>
    ),
  },
  {
    key: "wait",
    label: { en: "Let it rest for two or three days", am: "ለሁለት ወይም ለሦስት ቀን ይቆይ" },
    fact: { en: "Bubbles grow, and it smells a little sour. The bubbles will make the eyes.", am: "አረፋዎች ያድጋሉ፤ ትንሽ ይኮመጥጣል። አረፋዎቹ ዓይኖቹን ይሠራሉ።" },
    pic: (
      <g transform="translate(22 42)">
        <BatterJar x={0} y={0} s={0.8} />
      </g>
    ),
  },
  {
    key: "heat",
    label: { en: "A grown-up heats the big round mitad", am: "አንድ ትልቅ ሰው ትልቁን ክብ ምጣድ ያግላል" },
    fact: { en: "The mitad is a wide clay plate over the fire. Fire is a grown-up's job: stand back.", am: "ምጣድ ከእሳት በላይ ያለ ሰፊ የሸክላ ሳህን ነው። እሳት የትልልቅ ሰዎች ሥራ ነው፤ ራቅ ብላችሁ ቁሙ።" },
    pic: (
      <g transform="translate(22 26) scale(0.26)">
        <Mitad x={0} y={0} />
      </g>
    ),
  },
  {
    key: "pour",
    label: { en: "Pour the batter round and round, from the outside in", am: "ሊጡን ከውጭ ወደ ውስጥ እየዞራችሁ አፍስሱ" },
    fact: { en: "A thin spiral of batter covers the whole mitad.", am: "ቀጭን ጥምዝ ሊጥ ምጣዱን በሙሉ ይሸፍናል።" },
    pic: (
      <g transform="translate(22 26) scale(0.26)">
        <Mitad x={0} y={0} injera="batter" fire={false} />
      </g>
    ),
  },
  {
    key: "lid",
    label: { en: "Cover it with the woven lid", am: "በአክንባሎው ክደኑት" },
    fact: { en: "The steam cooks the top, so you never need to turn it over.", am: "እንፋሎቱ ላዩን ያበስላል፤ ስለዚህ መገልበጥ አያስፈልግም።" },
    pic: (
      <g transform="translate(22 30) scale(0.26)">
        <Mitad x={0} y={0} lid fire={false} />
      </g>
    ),
  },
  {
    key: "lift",
    label: { en: "Lift it off when the eyes appear", am: "ዓይኖቹ ሲታዩ አንሱት" },
    fact: { en: "Injera cooks on one side only: smooth underneath, full of eyes on top.", am: "እንጀራ የሚበስለው በአንድ በኩል ብቻ ነው፦ ከታች ለስላሳ፣ ከላይ ዓይን የሞላው።" },
    pic: (
      <g transform="translate(22 26) scale(0.26)">
        <Mitad x={0} y={0} injera="eyes" fire={false} />
      </g>
    ),
  },
];

const PILE = ["pour", "mix", "lift", "heat", "lid", "wait"];

export default function InjeraSteps({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "Make Injera, Step by Step", am: "እንጀራ በደረጃ" }}
      goal={{ en: "Tap the steps in the right order, from flour to eyes.", am: "ደረጃዎቹን ከዱቄት እስከ ዓይን በትክክለኛው ቅደም ተከተል ንኩ።" }}
      steps={STEPS}
      pile={PILE}
      hint={{ en: "Not yet: what has to happen before that?", am: "ገና ነው፦ ከዚያ በፊት ምን መሆን አለበት?" }}
      finale={{ en: "Injera with hundreds of eyes. Well waited!", am: "መቶ ዓይን ያለው እንጀራ። በደንብ ጠበቃችሁ!" }}
      onDone={onDone}
      stage={(placed) => (
        <Home id="is" time="day">
          {placed === 0 && <FlourSack x={200} y={262} s={1.6} />}
          {(placed === 1 || placed === 2) && <BatterJar x={placed === 1 ? 200 : 70} y={262} s={placed === 1 ? 2.2 : 1.2} bubbles={placed >= 2} />}
          {placed >= 3 && (
            <motion.g key={placed} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
              <Mitad x={200} y={226} s={1} injera={placed === 3 ? "none" : placed === 4 ? "batter" : placed === 5 ? "batter" : "eyes"} lid={placed === 5} />
              {placed >= 5 && <Steam x={200} y={186} n={3} />}
            </motion.g>
          )}
          <Place x={350} y={300} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood={placed === 6 ? "joy" : "happy"} />
          </Place>
          <Place x={50} y={300} s={0.4} tap={TAP.cub}>
            <Cub mood={placed === 6 ? "joy" : "happy"} arm={placed === 6 ? "up" : "none"} />
          </Place>
        </Home>
      )}
    />
  );
}
