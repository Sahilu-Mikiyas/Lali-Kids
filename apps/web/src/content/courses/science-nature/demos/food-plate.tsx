"use client";

import { Food, GroupSign, type FoodKind } from "@/components/book/courses/science-nature/kit-body";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Fill the Plate (level 2: what our food does for us). Nine foods from an Ethiopian table, one at a
  time: is it an energy food (injera, bread, potatoes, maize), a body-building food (beans,
  lentils, eggs, milk, fish) or a protective food (gomen, carrots, tomatoes, fruit)? Each right
  answer puts the food in its part of the plate, so the plate ends up with some of each.
*/

type G = "go" | "grow" | "glow";

const OPTIONS: Option[] = [
  { key: "go", label: { en: "Energy food", am: "ኃይል ሰጪ" }, pic: <GroupSign group="go" x={22} y={22} s={1} /> },
  { key: "grow", label: { en: "Body-building food", am: "ሰውነት ገንቢ" }, pic: <GroupSign group="grow" x={22} y={22} s={1} /> },
  { key: "glow", label: { en: "Protective food", am: "በሽታ ተከላካይ" }, pic: <GroupSign group="glow" x={22} y={22} s={1} /> },
];

const FOODS: { kind: FoodKind; group: G; name: Option["label"]; why: Option["label"] }[] = [
  { kind: "injera", group: "go", name: { en: "injera", am: "እንጀራ" }, why: { en: "Injera is an energy food: it gives you the power to run, play and think.", am: "እንጀራ ኃይል ሰጪ ምግብ ነው፦ ለመሮጥ፣ ለመጫወትና ለማሰብ ጉልበት ይሰጣል።" } },
  { kind: "beans", group: "grow", name: { en: "beans", am: "ባቄላ" }, why: { en: "Beans are a body-building food: they help you grow strong muscles.", am: "ባቄላ ሰውነት ገንቢ ምግብ ነው፦ ጠንካራ ጡንቻ እንድታበቅሉ ይረዳል።" } },
  { kind: "gomen", group: "glow", name: { en: "gomen (greens)", am: "ጎመን" }, why: { en: "Gomen is a protective food: vegetables help your body work well and fight sickness.", am: "ጎመን በሽታ ተከላካይ ምግብ ነው፦ አትክልቶች ሰውነታችሁ በደንብ እንዲሠራና በሽታን እንዲከላከል ይረዳሉ።" } },
  { kind: "milk", group: "grow", name: { en: "milk", am: "ወተት" }, why: { en: "Milk is a body-building food: it helps build strong bones and teeth.", am: "ወተት ሰውነት ገንቢ ምግብ ነው፦ ጠንካራ አጥንትና ጥርስ እንዲገነባ ይረዳል።" } },
  { kind: "potato", group: "go", name: { en: "a potato", am: "ድንች" }, why: { en: "Potatoes are an energy food, like injera and bread.", am: "ድንች እንደ እንጀራና ዳቦ ኃይል ሰጪ ምግብ ነው።" } },
  { kind: "mango", group: "glow", name: { en: "a mango", am: "ማንጎ" }, why: { en: "Fruit like mango is a protective food.", am: "እንደ ማንጎ ያሉ ፍራፍሬዎች በሽታ ተከላካይ ምግቦች ናቸው።" } },
  { kind: "egg", group: "grow", name: { en: "an egg", am: "እንቁላል" }, why: { en: "Eggs are a body-building food.", am: "እንቁላል ሰውነት ገንቢ ምግብ ነው።" } },
  { kind: "carrot", group: "glow", name: { en: "a carrot", am: "ካሮት" }, why: { en: "Carrots are a protective food, like all vegetables.", am: "ካሮት እንደ ሁሉም አትክልቶች በሽታ ተከላካይ ምግብ ነው።" } },
  { kind: "maize", group: "go", name: { en: "maize", am: "በቆሎ" }, why: { en: "Maize is an energy food. Now your plate has some of each kind!", am: "በቆሎ ኃይል ሰጪ ምግብ ነው። አሁን ሳህናችሁ ከእያንዳንዱ ዓይነት ትንሽ አለው!" } },
];

const SLOT: Record<G, [number, number]> = { go: [-70, -8], grow: [70, -8], glow: [0, 34] };

/** The plate with the foods placed so far (`upto` foods, and this round's food if solved). */
function Plate({ upto, current, solved }: { upto: number; current?: number; solved: boolean }) {
  const placed = FOODS.slice(0, upto + (solved ? 1 : 0));
  const count: Record<G, number> = { go: 0, grow: 0, glow: 0 };
  return (
    <g>
      <rect width={400} height={300} fill="#F4EBD8" />
      <g transform="translate(200 190)">
        <ellipse rx={170} ry={84} fill="#FFFFFF" stroke="#D8D0C0" strokeWidth={4} />
        <path d="M0 -84 V0 M0 0 L-140 50 M0 0 L140 50" stroke="#EEE8DC" strokeWidth={3} />
        <GroupSign group="go" x={-120} y={-44} s={0.8} />
        <GroupSign group="grow" x={120} y={-44} s={0.8} />
        <GroupSign group="glow" x={0} y={66} s={0.8} />
        {placed.map((f, i) => {
          const n = count[f.group]++;
          const [sx, sy] = SLOT[f.group];
          return <Food key={i} kind={f.kind} x={sx + (n - 1) * 34} y={sy + (f.group === "glow" ? 0 : n * 6)} s={1.1} />;
        })}
      </g>
      {current !== undefined && !solved && (
        <g transform="translate(200 56)">
          <circle r={42} fill="#FFFFFF" stroke="#7C3AED" strokeWidth={3} />
          <Food kind={FOODS[current].kind} s={1.7} />
        </g>
      )}
    </g>
  );
}

const ROUNDS: Round[] = FOODS.map((f, i) => ({
  prompt: { en: `Where does ${f.name.en} go?`, am: `${f.name.am} የትኛው ምድብ ነው?` },
  right: f.group,
  options: OPTIONS,
  why: f.why,
  scene: (ok: boolean) => <Plate upto={i} current={i} solved={ok} />,
}));

export default function FoodPlate({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Fill the Plate", am: "ሳህኑን እንሙላ" }}
      goal={{ en: "Put each food in its part of the plate: energy, body-building or protective.", am: "እያንዳንዱን ምግብ በሳህኑ ውስጥ በቦታው አስቀምጡ፦ ኃይል ሰጪ፣ ሰውነት ገንቢ ወይም በሽታ ተከላካይ።" }}
      rounds={ROUNDS}
      hint={{ en: "Not that part. Does it give energy, build the body, or protect it?", am: "ያ ቦታ አይደለም። ኃይል ይሰጣል? ሰውነትን ይገነባል? ወይስ ይከላከላል?" }}
      finale={{ en: "A plate with some of each: just what a growing body needs!", am: "ከእያንዳንዱ ትንሽ ያለበት ሳህን፦ የሚያድግ ሰውነት የሚያስፈልገው ልክ ይሄ ነው!" }}
      end={<Plate upto={FOODS.length} solved={false} />}
      onDone={onDone}
    />
  );
}
