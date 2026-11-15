"use client";

import type { ReactNode } from "react";

import { Acacia, Place, Sun } from "@/components/book/scenery";
import { Camel, Ibex, TAP } from "@/components/book/courses/science-nature/kit-cast";
import { Fish, Frog, PondWater, Worm } from "@/components/book/courses/science-nature/kit-life";
import { Yard } from "@/components/book/courses/science-nature/kit-places";
import { SimienEdge } from "@/components/book/courses/science-nature/kit-land";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  A Home for Every Animal (level 1: habitats). Five animals, one at a time: choose where each one
  lives from three little pictures. A right answer moves the animal into its home and says why it
  fits: the fish breathes water (pond), the camel stores fat in its hump and can go many days
  without drinking (dry lowlands), the walia climbs steep cliffs (the Simien Mountains), the frog
  lays its eggs in water and hunts insects nearby (pond), the earthworm lives in damp soil and eats
  dead leaves (under the ground).

  Science notes: a camel's hump stores fat, not water; camels can go many days without drinking.
*/

type Home = "pond" | "desert" | "cliffs" | "soil";

const HOME: Record<Home, { label: Option["label"]; pic: ReactNode }> = {
  pond: {
    label: { en: "A pond", am: "ኩሬ" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#CFE8F8" />
        <rect y={22} width={44} height={22} fill="#5FB0C8" />
        <path d="M6 22 q-1 -10 2 -14 M10 22 q1 -8 3 -12" stroke="#4E8A3A" strokeWidth={2} fill="none" />
      </g>
    ),
  },
  desert: {
    label: { en: "Hot, dry lowlands", am: "ሞቃትና ደረቅ ቆላ" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#CFE8F8" />
        <rect y={28} width={44} height={16} fill="#F0D090" />
        <circle cx={34} cy={12} r={6} fill="#FFC21E" />
      </g>
    ),
  },
  cliffs: {
    label: { en: "Steep mountain cliffs", am: "ገደላማ የተራራ ቋጥኞች" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#CFE8F8" />
        <path d="M0 44 L0 18 L12 12 L20 24 L30 8 L44 18 L44 44Z" fill="#8A8278" />
      </g>
    ),
  },
  soil: {
    label: { en: "Under the ground, in damp soil", am: "ከመሬት በታች፣ በእርጥብ አፈር" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#CFE8F8" />
        <rect y={14} width={44} height={30} fill="#7A5236" />
        <path d="M10 30 q4 -4 8 0 t8 0" stroke="#D88A8A" strokeWidth={3} fill="none" />
      </g>
    ),
  },
};

const opt = (k: Home): Option => ({ key: k, label: HOME[k].label, pic: HOME[k].pic });

/** The animal on a plain background, or at home once the right answer is chosen. */
const scenes: Record<string, (home: boolean) => ReactNode> = {
  fish: (home) =>
    home ? (
      <g>
        <rect width={400} height={300} fill="#CFE8F8" />
        <PondWater y={110} h={200} />
        <Fish x={160} y={200} s={4} />
        <Fish x={270} y={240} s={2.4} flip color="#E2783A" delay={-1} />
      </g>
    ) : (
      <g>
        <rect width={400} height={300} fill="#F4EBD8" />
        <Fish x={200} y={150} s={5} />
      </g>
    ),
  camel: (home) => (
    <g>
      {home ? (
        <g>
          <rect width={400} height={300} fill="#BFE0F8" />
          <Sun x={320} y={60} r={28} />
          <path d="M-10 200 Q100 186 200 196 T410 190 L410 310 L-10 310Z" fill="#F0D090" />
          <Acacia x={90} y={204} s={0.7} />
        </g>
      ) : (
        <rect width={400} height={300} fill="#F4EBD8" />
      )}
      <Place x={210} y={280} s={0.8} tap={TAP.ayan}>
        <Camel who="aabo" mood="happy" walk={home} />
      </Place>
    </g>
  ),
  walia: (home) => (
    <g>
      {home ? <SimienEdge id="hh-simien" time="day" /> : <rect width={400} height={300} fill="#F4EBD8" />}
      <Place x={200} y={home ? 250 : 280} s={0.8} tap={TAP.haben}>
        <Ibex grown mood="happy" />
      </Place>
    </g>
  ),
  frog: (home) =>
    home ? (
      <g>
        <Yard id="hh-pond" time="day" house={false} />
        <PondWater y={210} h={100} />
        <Frog x={200} y={226} s={4} hop />
      </g>
    ) : (
      <g>
        <rect width={400} height={300} fill="#F4EBD8" />
        <Frog x={200} y={200} s={5} />
      </g>
    ),
  worm: (home) =>
    home ? (
      <g>
        <rect width={400} height={300} fill="#BFE0F8" />
        <rect y={90} width={400} height={210} fill="#7A5236" />
        <rect y={80} width={400} height={14} fill="#6CC07C" />
        {[60, 140, 300, 350].map((x, i) => (
          <circle key={x} cx={x} cy={150 + (i % 2) * 60} r={10} fill="#8A6244" />
        ))}
        <Worm x={200} y={190} s={6} />
      </g>
    ) : (
      <g>
        <rect width={400} height={300} fill="#F4EBD8" />
        <Worm x={200} y={160} s={7} />
      </g>
    ),
};

const ROUNDS: Round[] = [
  {
    prompt: { en: "Where does the fish live?", am: "ዓሣው የሚኖረው የት ነው?" },
    right: "pond",
    options: [opt("desert"), opt("pond"), opt("cliffs")],
    why: { en: "In the water! A fish breathes the water with its gills, so it can only live in water.", am: "በውሃ ውስጥ! ዓሣ በስንጥቦቹ ውሃውን ይተነፍሳል፤ ስለዚህ መኖር የሚችለው በውሃ ውስጥ ብቻ ነው።" },
    scene: scenes.fish,
  },
  {
    prompt: { en: "Where does the camel live?", am: "ግመሉ የሚኖረው የት ነው?" },
    right: "desert",
    options: [opt("pond"), opt("cliffs"), opt("desert")],
    why: { en: "In the hot, dry lowlands. Camels can go many days without drinking, and the fat stored in their humps helps them when food is scarce.", am: "በሞቃቱና ደረቁ ቆላ። ግመሎች ሳይጠጡ ብዙ ቀናት መቆየት ይችላሉ፤ በሻኛቸው የተከማቸው ስብም ምግብ ሲያንስ ይረዳቸዋል።" },
    scene: scenes.camel,
  },
  {
    prompt: { en: "Where does the walia ibex live?", am: "ዋልያው የሚኖረው የት ነው?" },
    right: "cliffs",
    options: [opt("cliffs"), opt("soil"), opt("pond")],
    why: { en: "On the steep cliffs of the Simien Mountains. Its hooves grip the rock, and it can climb where enemies can't follow.", am: "በሰሜን ተራሮች ገደላማ ቋጥኞች ላይ። ኮቴዎቹ ዐለቱን ይይዛሉ፤ ጠላቶች መከተል በማይችሉበት ቦታ መውጣት ይችላል።" },
    scene: scenes.walia,
  },
  {
    prompt: { en: "Where does the frog live?", am: "እንቁራሪቱ የሚኖረው የት ነው?" },
    right: "pond",
    options: [opt("desert"), opt("soil"), opt("pond")],
    why: { en: "By a pond. Frogs lay their eggs in the water, the tadpoles grow up there, and the frogs catch insects on the wet banks.", am: "በኩሬ አጠገብ። እንቁራሪቶች እንቁላላቸውን በውሃ ውስጥ ይጥላሉ፤ ኩርንችቶቹ እዚያ ያድጋሉ፤ እንቁራሪቶቹም በእርጥቡ ዳር ነፍሳት ይይዛሉ።" },
    scene: scenes.frog,
  },
  {
    prompt: { en: "Where does the earthworm live?", am: "የመሬት ትሉ የሚኖረው የት ነው?" },
    right: "soil",
    options: [opt("soil"), opt("cliffs"), opt("desert")],
    why: { en: "Under the ground, in damp soil. It eats dead leaves and makes the soil better for plants.", am: "ከመሬት በታች፣ በእርጥብ አፈር ውስጥ። የሞቱ ቅጠሎችን ይበላል፤ አፈሩንም ለተክሎች የተሻለ ያደርገዋል።" },
    scene: scenes.worm,
  },
];

export default function HabitatHomes({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "A Home for Every Animal", am: "ለእያንዳንዱ እንስሳ መኖሪያ" }}
      goal={{ en: "Choose where each animal lives.", am: "እያንዳንዱ እንስሳ የሚኖርበትን ምረጡ።" }}
      rounds={ROUNDS}
      hint={{ en: "Not quite. Think: what does this animal need to breathe, eat and stay safe?", am: "ልክ አይደለም። አስቡ፦ ይህ እንስሳ ለመተንፈስ፣ ለመብላትና ደህና ለመሆን ምን ያስፈልገዋል?" }}
      finale={{ en: "Every animal has a home that fits it!", am: "እያንዳንዱ እንስሳ የሚስማማው መኖሪያ አለው!" }}
      end={scenes.frog(true)}
      onDone={onDone}
    />
  );
}
