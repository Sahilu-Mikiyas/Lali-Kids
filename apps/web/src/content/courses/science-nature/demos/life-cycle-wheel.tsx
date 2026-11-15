"use client";

import { useState } from "react";

import { Caterpillar, Chick, Chrysalis, Egg, Frog, FrogSpawn, Hen, LemonLeaf, Swallowtail, Tadpole } from "@/components/book/courses/science-nature/kit-life";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./rounds-kit";

/*
  The Life-Cycle Wheel (level 1: life cycles). Three animals, one after the other: the frog, the
  butterfly and the chicken. Tap the stages in order; each lands on its place round the wheel, with
  an arrow to the next, and the last arrow points back to the start: a cycle. Each step says one
  true thing about that stage.
*/

type Animal = { name: { en: string; am: string }; steps: Step[]; pile: string[] };

const ANIMALS: Animal[] = [
  {
    name: { en: "the frog", am: "እንቁራሪት" },
    steps: [
      { key: "spawn", label: { en: "Eggs in jelly", am: "በዝልግልግ ውስጥ ያሉ እንቁላሎች" }, fact: { en: "Laid in a pond in the rainy season.", am: "በዝናብ ወቅት በኩሬ ውስጥ ይጣላሉ።" }, pic: <FrogSpawn x={22} y={22} s={0.8} n={8} /> },
      { key: "tadpole", label: { en: "Tadpole", am: "ኩርንችት" }, fact: { en: "It breathes the water and nibbles green slime.", am: "ውሃውን ይተነፍሳል፤ አረንጓዴ ልምላሜም ይግጣል።" }, pic: <Tadpole x={24} y={22} s={1.3} swim={false} /> },
      { key: "froglet", label: { en: "Froglet", am: "ትንሽ እንቁራሪት" }, fact: { en: "Legs, a short tail, and lungs for breathing air.", am: "እግሮች፣ አጭር ጅራትና አየር የሚተነፍስበት ሳምባ።" }, pic: <Frog x={22} y={32} s={1} froglet /> },
      { key: "frog", label: { en: "Frog", am: "እንቁራሪት" }, fact: { en: "It hops off to catch insects, and comes back to the pond to lay eggs.", am: "ነፍሳትን ለመያዝ ዘሎ ይሄዳል፤ እንቁላል ለመጣልም ወደ ኩሬው ይመለሳል።" }, pic: <Frog x={22} y={32} s={1.2} /> },
    ],
    pile: ["frog", "tadpole", "spawn", "froglet"],
  },
  {
    name: { en: "the butterfly", am: "ቢራቢሮ" },
    steps: [
      { key: "egg", label: { en: "Egg on a leaf", am: "በቅጠል ላይ ያለ እንቁላል" }, fact: { en: "One tiny round egg on a lemon leaf.", am: "በሎሚ ቅጠል ላይ አንድ ጥቃቅን ክብ እንቁላል።" }, pic: <LemonLeaf x={4} y={24} s={1} egg /> },
      { key: "caterpillar", label: { en: "Caterpillar", am: "አባ ጨጓሬ" }, fact: { en: "It eats and eats, and sheds its skin as it grows.", am: "ይበላል፣ ይበላል፤ ሲያድግም ቆዳውን ይቀይራል።" }, pic: <Caterpillar x={6} y={28} s={0.8} munch={false} /> },
      { key: "chrysalis", label: { en: "Chrysalis", am: "ሙሽሬ" }, fact: { en: "It hangs still while it changes inside.", am: "ውስጡ እየተለወጠ ጸጥ ብሎ ይንጠለጠላል።" }, pic: <Chrysalis x={22} y={8} s={1} /> },
      { key: "butterfly", label: { en: "Butterfly", am: "ቢራቢሮ" }, fact: { en: "She drinks nectar and lays eggs on the lemon tree.", am: "የአበባ ማር ትጠጣለች፤ በሎሚው ዛፍ ላይም እንቁላል ትጥላለች።" }, pic: <Swallowtail x={22} y={22} s={0.6} flap={false} /> },
    ],
    pile: ["chrysalis", "butterfly", "caterpillar", "egg"],
  },
  {
    name: { en: "the chicken", am: "ዶሮ" },
    steps: [
      { key: "egg", label: { en: "Egg", am: "እንቁላል" }, fact: { en: "The hen keeps it warm for about 21 days.", am: "ዶሮዋ ለ21 ቀን ያህል ታሞቀዋለች።" }, pic: <Egg x={22} y={36} s={1.1} /> },
      { key: "hatch", label: { en: "Hatching", am: "መፈልፈል" }, fact: { en: "The chick pecks its own way out with its egg tooth.", am: "ጫጩቱ በእንቁላል ጥርሱ ራሱ ቀዳድ ብሎ ይወጣል።" }, pic: <Egg x={22} y={36} s={1.1} crack={2} /> },
      { key: "chick", label: { en: "Chick", am: "ጫጩት" }, fact: { en: "Fluffy, and pecking seeds from the very first day.", am: "ለስላሳ ነው፤ ከመጀመሪያው ቀን ጀምሮ እህል ይለቅማል።" }, pic: <Chick x={22} y={34} s={1.2} /> },
      { key: "hen", label: { en: "Hen", am: "ዶሮ" }, fact: { en: "Grown up, she lays eggs of her own.", am: "አድጋ የራሷን እንቁላሎች ትጥላለች።" }, pic: <Hen x={20} y={40} s={0.6} /> },
    ],
    pile: ["chick", "hen", "egg", "hatch"],
  },
];

/** The wheel: four spots round a circle, filled in as the stages are placed. */
function Wheel({ animal, placed }: { animal: Animal; placed: number }) {
  const spots: [number, number][] = [
    [200, 56],
    [316, 150],
    [200, 244],
    [84, 150],
  ];
  return (
    <g>
      <rect width={400} height={300} fill="#F4EEFA" />
      <circle cx={200} cy={150} r={94} fill="none" stroke="#D8C8F0" strokeWidth={8} strokeDasharray="18 12" />
      {[45, 135, 225, 315].map((a, i) => (
        <path key={a} d="M0 -8 L10 0 L0 8Z" fill={i < placed - 1 || (placed === 4 && i === 3) ? "#7C3AED" : "#D8C8F0"} transform={`translate(200 150) rotate(${a - 90}) translate(94 0) rotate(90)`} />
      ))}
      {spots.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r={40} fill={i < placed ? "#FFFFFF" : "#EDE4F8"} stroke={i < placed ? "#7C3AED" : "#D8C8F0"} strokeWidth={3} />
          {i < placed && (
            <g className="lali-pop-in" style={{ ["--delay" as string]: "0s" }}>
              <g transform="translate(-44 -44) scale(2)">{animal.steps[i].pic}</g>
            </g>
          )}
          {i >= placed && (
            <text y={8} textAnchor="middle" fontSize={22} fontWeight={900} fill="#B8A4DC" fontFamily="var(--font-grandstander), sans-serif">
              {i + 1}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

export default function LifeCycleWheel({ lang, onDone }: DemoProps) {
  const [a, setA] = useState(0);
  const animal = ANIMALS[a];
  return (
    <div data-animal={a}>
      <Order
        key={a}
        lang={lang}
        title={{ en: "The Life-Cycle Wheel", am: "የሕይወት ዑደት መንኮራኩር" }}
        goal={{ en: `Tap the stages of ${animal.name.en} in order, round the wheel (${a + 1} of 3).`, am: `የ${animal.name.am}ን ደረጃዎች በቅደም ተከተል በመንኮራኩሩ ዙሪያ ንኩ (ከ3 ${a + 1})።` }}
        steps={animal.steps}
        pile={animal.pile}
        hint={{ en: "Not yet. Which comes next, after the last one on the wheel?", am: "ገና ነው። በመንኮራኩሩ ላይ ካለው የመጨረሻው ቀጥሎ የሚመጣው የትኛው ነው?" }}
        finale={
          a < ANIMALS.length - 1
            ? { en: `Round and round! Next: ${ANIMALS[a + 1].name.en}.`, am: `እየዞረ ይቀጥላል! ቀጥሎ፦ ${ANIMALS[a + 1].name.am}።` }
            : { en: "Frog, butterfly, chicken: three life cycles, all round and round!", am: "እንቁራሪት፣ ቢራቢሮ፣ ዶሮ፦ ሦስት የሕይወት ዑደቶች፣ ሁሉም እየዞሩ!" }
        }
        stage={(placed) => <Wheel animal={animal} placed={placed} />}
        onDone={() => {
          if (a < ANIMALS.length - 1) setA(a + 1);
          else onDone();
        }}
      />
    </div>
  );
}
