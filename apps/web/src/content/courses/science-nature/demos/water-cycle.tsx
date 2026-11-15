"use client";

import { Fluffy, Vapour, WaterCycle } from "@/components/book/courses/science-nature/kit-sky";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./rounds-kit";

/*
  Round and Round: the Water Cycle (level 4: the water cycle). Tap the four steps in order; each
  one adds to the picture: water rises as vapour, vapour cools into clouds, rain falls, and rivers
  carry it back to the lake, ready to go round again. Each step says one true thing.
*/

const STEPS: Step[] = [
  {
    key: "rise",
    label: { en: "Water rises as vapour", am: "ውሃ እንፋሎት ሆኖ ይወጣል" },
    fact: { en: "The Sun warms the lake, and some water turns into vapour, a gas we can't see.", am: "ፀሐይ ሐይቁን ታሞቀዋለች፤ ጥቂት ውሃም ልናየው የማንችል ጋዝ፣ እንፋሎት ይሆናል።" },
    pic: <Vapour x={22} y={38} n={2} s={0.8} />,
  },
  {
    key: "cloud",
    label: { en: "Vapour makes clouds", am: "እንፋሎት ደመና ይሆናል" },
    fact: { en: "High up it is cold, so the vapour turns into tiny drops: a cloud.", am: "ከፍ ብሎ ቀዝቃዛ ነው፤ ስለዚህ እንፋሎቱ ጥቃቅን ጠብታዎች ይሆናል፦ ደመና።" },
    pic: <Fluffy x={22} y={24} s={0.4} color="#E8F0FA" />,
  },
  {
    key: "rain",
    label: { en: "Rain falls", am: "ዝናብ ይዘንባል" },
    fact: { en: "Tiny drops join into big, heavy drops, and down they fall.", am: "ጥቃቅን ጠብታዎች ተቀላቅለው ትልቅና ከባድ ጠብታ ይሆናሉ፤ ወደ ታችም ይወርዳሉ።" },
    pic: <path d="M12 10 l-4 12 M22 14 l-4 12 M32 10 l-4 12" stroke="#4FA8E0" strokeWidth={3} strokeLinecap="round" />,
  },
  {
    key: "river",
    label: { en: "Rivers carry it back", am: "ወንዞች መልሰው ይወስዱታል" },
    fact: { en: "Rain runs into rivers and lakes, ready to go round again!", am: "ዝናቡ ወደ ወንዞችና ሐይቆች ይፈሳል፤ እንደገና ለመዞር ዝግጁ ነው!" },
    pic: <path d="M4 26 q6 -6 12 0 t12 0 t12 0" stroke="#3E8FCC" strokeWidth={4} fill="none" strokeLinecap="round" />,
  },
];

export default function WaterCycleDemo({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "Round and Round", am: "እየዞረ ይመለሳል" }}
      goal={{ en: "Tap the steps of the water cycle in order.", am: "የውሃ ዑደትን ደረጃዎች በቅደም ተከተል ንኩ።" }}
      steps={STEPS}
      pile={["rain", "river", "rise", "cloud"]}
      hint={{ en: "Not yet. Start at the lake: what does the warm Sun do to the water?", am: "ገና ነው። ከሐይቁ ጀምሩ፦ ሞቃቷ ፀሐይ ውሃውን ምን ታደርገዋለች?" }}
      finale={{ en: "Up as vapour, down as rain, round and round again!", am: "እንፋሎት ሆኖ ወደ ላይ፣ ዝናብ ሆኖ ወደ ታች፣ እየዞረ ይመለሳል!" }}
      stage={(placed) => <WaterCycle step={placed} />}
      onDone={onDone}
    />
  );
}
