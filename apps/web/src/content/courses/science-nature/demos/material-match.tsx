"use client";

import type { ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Cub, Grandma, Gugu, TAP } from "@/components/book/courses/science-nature/kit-cast";
import { Home, Yard } from "@/components/book/courses/science-nature/kit-places";
import { Cup, Dabo, Hearth } from "@/components/book/courses/science-nature/kit-props";
import { Thing, type ThingKind } from "@/components/book/courses/science-nature/kit-stuff";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  The Right Stuff (level 3: materials and their properties). Six jobs in Grandma's house; for each,
  choose the thing made of the best material: carry water (plastic jerrycan: waterproof, light,
  won't break; not the grass basket or the cloth), stir hot stew (wooden spoon: wood doesn't get
  hot like metal), dry wet hands (cotton cloth: soaks up water), carry bread (the basket: light and
  airy), keep warm on a cold night (a cotton gabi), hold hot coffee (a clay cup: hard, holds water,
  takes the heat).
*/

const pic = (k: ThingKind, s = 0.9, y = 32): ReactNode => <Thing kind={k} x={22} y={y} s={s} />;

const O = {
  jerrycan: { key: "jerrycan", label: { en: "Plastic jerrycan", am: "የፕላስቲክ ጀሪካን" }, pic: pic("jerrycan", 0.85, 40) },
  basket: { key: "basket", label: { en: "Woven grass basket", am: "የሣር ቅርጫት" }, pic: pic("basket", 0.8, 34) },
  cloth: { key: "cloth", label: { en: "Cotton cloth", am: "የጥጥ ጨርቅ" }, pic: pic("cloth", 0.9, 32) },
  wood: { key: "wood", label: { en: "Wooden spoon", am: "የእንጨት ማንኪያ" }, pic: pic("wood-spoon", 0.75, 26) },
  metal: { key: "metal", label: { en: "Metal spoon", am: "የብረት ማንኪያ" }, pic: pic("metal-spoon", 0.75, 26) },
  plasticCup: { key: "plastic", label: { en: "Plastic cup", am: "የፕላስቲክ ኩባያ" }, pic: pic("glass", 0.9, 36) },
  clayCup: { key: "clay", label: { en: "Clay cup", am: "የሸክላ ስኒ" }, pic: <Cup x={22} y={26} s={1.4} /> },
  pot: { key: "pot", label: { en: "Clay pot", am: "የሸክላ ማሰሮ" }, pic: pic("pot", 0.8, 38) },
  key: { key: "key", label: { en: "Metal key", am: "የብረት ቁልፍ" }, pic: pic("key", 0.9, 26) },
} satisfies Record<string, Option>;

function House({ outside = false, children }: { outside?: boolean; children?: ReactNode }) {
  return (
    <g>
      {outside ? <Yard id="mm-yard" time="day" /> : <Home id="mm-home" time="day" />}
      {children}
      <Place x={80} y={296} s={0.42} tap={TAP.cub}>
        <Cub mood="happy" />
      </Place>
      <Place x={330} y={294} s={0.46} flip tap={TAP.grandma}>
        <Grandma arm="raise" />
      </Place>
    </g>
  );
}

/** The chosen thing, big in the middle once the job is done. */
const done = (el: ReactNode) => (
  <g transform="translate(200 230)">
    <circle r={60} cy={-30} fill="#FFFFFF" opacity={0.85} />
    {el}
  </g>
);

const ROUNDS: Round[] = [
  {
    prompt: { en: "Job 1: carry water from the tap to the garden.", am: "ሥራ 1፦ ከቧንቧው ወደ አትክልቱ ውሃ መሸከም።" },
    right: "jerrycan",
    options: [O.basket, O.jerrycan, O.cloth],
    why: { en: "Plastic doesn't let water through, it's light, and it won't break if you bump it.", am: "ፕላስቲክ ውሃ አያሳልፍም፤ ቀላል ነው፤ ቢያጋጩትም አይሰበርም።" },
    scene: (ok) => <House outside>{ok && done(<Thing kind="jerrycan" s={2.4} />)}</House>,
  },
  {
    prompt: { en: "Job 2: stir the hot stew.", am: "ሥራ 2፦ ትኩሱን ወጥ ማማሰል።" },
    right: "wood",
    options: [O.metal, O.wood],
    why: { en: "Wood doesn't let heat through easily, so the handle stays cool. A metal spoon gets hot.", am: "እንጨት ሙቀትን በቀላሉ አያሳልፍም፤ ስለዚህ እጀታው አይሞቅም። የብረት ማንኪያ ግን ይሞቃል።" },
    scene: (ok) => (
      <House>
        <Hearth x={200} y={272} />
        {ok && (
          <g transform="translate(220 190) rotate(-60)">
            <Thing kind="wood-spoon" s={2.4} />
          </g>
        )}
      </House>
    ),
  },
  {
    prompt: { en: "Job 3: dry your wet hands.", am: "ሥራ 3፦ እርጥብ እጆቻችሁን ማድረቅ።" },
    right: "cloth",
    options: [O.plasticCup, O.key, O.cloth],
    why: { en: "Cotton cloth soaks up water. That's bad for carrying water, but just right for drying.", am: "የጥጥ ጨርቅ ውሃ ይመጣል። ውሃ ለመሸከም መጥፎ ነው፤ ለማድረቅ ግን ልክ ነው።" },
    scene: (ok) => <House>{ok && done(<Thing kind="cloth" s={2.8} />)}</House>,
  },
  {
    prompt: { en: "Job 4: carry the fresh bread to the table.", am: "ሥራ 4፦ ትኩሱን ዳቦ ወደ ማዕድ መውሰድ።" },
    right: "basket",
    options: [O.basket, O.pot, O.key],
    why: { en: "The light grass basket is perfect for bread. Bread doesn't leak, so the gaps don't matter.", am: "ቀላሉ የሣር ቅርጫት ለዳቦ ፍጹም ነው። ዳቦ አያፈስም፤ ስለዚህ ክፍተቶቹ ችግር አይደሉም።" },
    scene: (ok) => (
      <House>
        {ok
          ? done(
              <g>
                <Thing kind="basket" s={2.6} />
                <Dabo x={0} y={-50} s={0.9} />
              </g>,
            )
          : <Dabo x={200} y={240} s={1.2} />}
      </House>
    ),
  },
  {
    prompt: { en: "Job 5: keep warm on a cold highland night.", am: "ሥራ 5፦ በቀዝቃዛ የደጋ ሌሊት መሞቅ።" },
    right: "cloth",
    options: [O.metal, O.cloth, O.pot],
    why: { en: "A thick cotton gabi or netela keeps the warmth of your body close to you.", am: "ወፍራም የጥጥ ጋቢ ወይም ነጠላ የሰውነታችሁን ሙቀት ከእናንተ ጋር ያቆያል።" },
    scene: (ok) => (
      <g>
        <Home id="mm-night" time="night" />
        <Place x={200} y={290} s={0.56} tap={TAP.gugu}>
          <Gugu mood={ok ? "joy" : "worried"} />
        </Place>
        {ok && <path d="M152 270 Q140 210 170 196 Q200 210 230 196 Q260 210 248 270Z" fill="#F4EEDC" opacity={0.95} />}
        {ok && <path d="M152 262 H248" stroke="#2E9A8A" strokeWidth={4} />}
      </g>
    ),
  },
  {
    prompt: { en: "Job 6: hold hot coffee for Grandma.", am: "ሥራ 6፦ ለአያቴ ትኩስ ቡና መያዝ።" },
    right: "clay",
    options: [O.cloth, O.basket, O.clayCup],
    why: { en: "A clay cup is hard, holds water and can take the heat. That's why coffee cups are made of fired clay.", am: "የሸክላ ስኒ ጠንካራ ነው፤ ውሃ ይይዛል፤ ሙቀትንም ይችላል። የቡና ስኒዎች ከተቃጠለ ሸክላ የሚሠሩት ለዚህ ነው።" },
    scene: (ok) => <House>{ok && done(<Cup x={0} y={-10} s={3.4} />)}</House>,
  },
];

export default function MaterialMatch({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "The Right Stuff", am: "ትክክለኛው ቁስ" }}
      goal={{ en: "For each job, choose the thing made of the best material.", am: "ለእያንዳንዱ ሥራ በምርጡ ቁስ የተሠራውን ነገር ምረጡ።" }}
      rounds={ROUNDS}
      hint={{ en: "Hmm. Ask: what is it made of? What can it do?", am: "እምም። ጠይቁ፦ ከምን ተሠራ? ምን ይሠራል?" }}
      finale={{ en: "You chose the right stuff every time!", am: "ሁልጊዜ ትክክለኛውን ቁስ መረጣችሁ!" }}
      end={ROUNDS[5].scene(true)}
      onDone={onDone}
    />
  );
}
