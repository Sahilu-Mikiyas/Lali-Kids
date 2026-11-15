"use client";

import { Bed, Drops, Kuraz, Latrine, Plate, Toothbrush } from "@/components/book/courses/healthy-safe/kit-health";
import { Ibex, TAP } from "@/components/book/courses/healthy-safe/kit-cast";
import { Book } from "@/components/book/courses/healthy-safe/kit-more";
import { Home } from "@/components/book/courses/healthy-safe/kit-places";
import { Sparkles, Zzz } from "@/components/book/courses/healthy-safe/kit-props";
import { Moon, Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./order-kit";

/*
  Haben's Bedtime (level 2), from "Haben and the Sleepy Moon". Put the evening in order: dinner,
  wash face and feet, brush teeth, the toilet, one story, goodnight to the moon and lights out.
  The same steps at the same time every night help growing bodies get enough sleep.
*/

const COLOR = "#4A4F9E";

const STEPS: Step[] = [
  {
    key: "dinner",
    label: { en: "Eat dinner", am: "እራት መብላት" },
    fact: { en: "A good dinner, not too late, so the tummy is calm at bedtime.", am: "ጥሩ እራት፣ በጣም ሳይመሽ፣ በመኝታ ሰዓት ሆድ እንዲረጋጋ።" },
    pic: (
      <g transform="translate(22 26) scale(0.4)">
        <Plate x={0} y={0} foods={["misir", "gomen"]} />
      </g>
    ),
  },
  {
    key: "wash",
    label: { en: "Wash face and feet", am: "ፊትንና እግርን መታጠብ" },
    fact: { en: "Clean and fresh for bed.", am: "ለመኝታ ንጹሕና ትኩስ።" },
    pic: (
      <g transform="translate(22 30)">
        <ellipse cx={0} cy={4} rx={16} ry={5} fill="#C9C2B4" />
        <ellipse cx={0} cy={2} rx={12} ry={3} fill="#9FD4F0" />
        <Drops x={0} y={-16} n={3} w={10} fall={12} />
      </g>
    ),
  },
  {
    key: "brush",
    label: { en: "Brush teeth", am: "ጥርስ መቦረሽ" },
    fact: { en: "The night brush is the most important one!", am: "የማታው መቦረሽ ከሁሉ ይበልጣል!" },
    pic: <Toothbrush x={20} y={26} s={0.8} rot={-30} paste />,
  },
  {
    key: "toilet",
    label: { en: "Go to the toilet", am: "ወደ መጸዳጃ መሄድ" },
    fact: { en: "Then wash hands with soap.", am: "ከዚያ እጅን በሳሙና መታጠብ።" },
    pic: (
      <g transform="translate(18 40)">
        <Latrine x={0} y={0} s={0.42} tap={false} />
      </g>
    ),
  },
  {
    key: "story",
    label: { en: "One story", am: "አንድ ተረት" },
    fact: { en: "Quiet and cosy, no screens: the body gets ready to sleep.", am: "ጸጥና ሞቅ ያለ፣ ያለ ስክሪን፦ ሰውነት ለእንቅልፍ ይዘጋጃል።" },
    pic: (
      <g transform="translate(22 28)">
        <Book x={0} y={0} s={0.9} />
      </g>
    ),
  },
  {
    key: "sleep",
    label: { en: "Goodnight, Moon. Lights out!", am: "ደህና እደሪ ጨረቃ። መብራት ይጥፋ!" },
    fact: { en: "Growing children need lots of sleep, at the same time every night.", am: "የሚያድጉ ልጆች በየሌሊቱ በአንድ ሰዓት ብዙ እንቅልፍ ያስፈልጋቸዋል።" },
    pic: <Moon x={22} y={22} r={12} glow={false} sleepy />,
  },
];

const PILE = ["story", "brush", "sleep", "dinner", "toilet", "wash"];

export default function BedtimeRoutine({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "Haben's Bedtime", am: "የሐበን የመኝታ ሰዓት" }}
      goal={{ en: "Tap the evening steps in order, from dinner to lights out.", am: "የምሽቱን ደረጃዎች ከእራት እስከ መብራት መጥፋት በቅደም ተከተል ንኩ።" }}
      steps={STEPS}
      pile={PILE}
      hint={{ en: "Not yet: what comes before that?", am: "ገና ነው፦ ከዚያ በፊት ምን ይመጣል?" }}
      finale={{ en: "Wash, brush, story, hush. Goodnight!", am: "መታጠብ፣ መቦረሽ፣ ተረት፣ ጸጥታ። ደህና እደሩ!" }}
      color={COLOR}
      onDone={onDone}
      stage={(placed) => (
        <Home id="br" time={placed >= 6 ? "night" : "evening"}>
          {placed <= 1 && <Plate x={250} y={270} s={1.2} foods={placed === 0 ? ["misir", "gomen", "egg"] : []} />}
          {placed === 2 && (
            <g>
              <ellipse cx={260} cy={280} rx={30} ry={8} fill="#C9C2B4" />
              <Drops x={250} y={190} n={4} w={30} fall={40} />
            </g>
          )}
          {placed === 3 && <Toothbrush x={260} y={250} s={2.2} rot={-30} paste />}
          {placed === 4 && <Latrine x={270} y={286} s={1} />}
          {placed === 5 && <Book x={270} y={262} s={1.8} />}
          {placed >= 6 && <Moon x={312} y={92} r={18} sleepy />}
          {placed < 5 ? (
            <Place x={150} y={294} s={0.5} tap={TAP.haben}>
              <Ibex mood="happy" />
            </Place>
          ) : (
            <Bed x={170} y={286} s={1.3} color="#8A5AB8">
              <Place x={-30} y={-8} s={0.32} tap={TAP.haben}>
                <Ibex mood="happy" />
              </Place>
            </Bed>
          )}
          {placed === 5 && (
            <Place x={330} y={294} s={0.46} flip tap={TAP.haben}>
              <Ibex grown old mood="happy" />
            </Place>
          )}
          {placed >= 6 && (
            <g>
              <Zzz x={150} y={190} />
              <Sparkles x={312} y={92} r={40} delay={0.4} n={5} />
            </g>
          )}
          {placed < 6 && <Kuraz x={340} y={240} s={0.9} />}
        </Home>
      )}
    />
  );
}
