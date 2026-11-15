"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Cub, TAP } from "@/components/book/courses/our-ethiopia/kit-cast";
import { SkyFor } from "@/components/book/courses/our-ethiopia/kit-places";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./rounds-kit";

/*
  Carve a Church from the Rock (level 4). At Lalibela, about 800 years ago, churches were not
  built up stone by stone: they were carved down into one great rock. The best known, Bete
  Giyorgis (the church of Saint George), is shaped like a cross. In the right order: mark the
  cross on the flat rock; dig a deep trench all round it; shape the outside (roof, walls,
  windows); hollow out the inside and open the door. A cut-away picture shows each step.
*/

const ROCK = "#B8704A";
const ROCK_D = "#8A4A30";
const ROCK_L = "#D89A70";

function Tool({ kind }: { kind: "chalk" | "pick" | "chisel" | "door" }): ReactNode {
  switch (kind) {
    case "chalk":
      return (
        <g>
          <rect x={10} y={10} width={24} height={24} rx={3} fill={ROCK} />
          <path d="M19 13 H25 V19 H31 V25 H25 V31 H19 V25 H13 V19 H19Z" fill="none" stroke="#FFFFFF" strokeWidth={2} />
        </g>
      );
    case "pick":
      return (
        <g>
          <rect x={4} y={22} width={36} height={16} fill={ROCK} />
          <rect x={10} y={22} width={6} height={16} fill="#3A2418" />
          <rect x={28} y={22} width={6} height={16} fill="#3A2418" />
          <path d="M14 6 L30 20" stroke="#8A5A30" strokeWidth={3} />
          <path d="M22 4 Q30 8 34 16" stroke="#7A7A86" strokeWidth={4} fill="none" />
        </g>
      );
    case "chisel":
      return (
        <g>
          <rect x={12} y={12} width={20} height={26} fill={ROCK_L} />
          <rect x={16} y={18} width={4} height={8} rx={2} fill="#3A2418" />
          <rect x={24} y={18} width={4} height={8} rx={2} fill="#3A2418" />
          <path d="M10 12 H34 L30 8 H14Z" fill={ROCK_D} />
        </g>
      );
    case "door":
      return (
        <g>
          <rect x={12} y={10} width={20} height={28} fill={ROCK_L} />
          <path d="M18 38 V26 Q22 20 26 26 V38Z" fill="#FFF3C0" />
        </g>
      );
  }
}

const STEPS: Step[] = [
  {
    key: "mark",
    label: { en: "Mark a big cross on the flat rock", am: "በጠፍጣፋው ዐለት ላይ ትልቅ መስቀል ምልክት አድርጉ" },
    fact: { en: "Bete Giyorgis is shaped like a cross. You can see it best from above.", am: "ቤተ ጊዮርጊስ የመስቀል ቅርጽ አላት። ከላይ ሲታይ በደንብ ይታያል።" },
    pic: <Tool kind="chalk" />,
  },
  {
    key: "trench",
    label: { en: "Dig a deep trench all round it", am: "በዙሪያው ጥልቅ ጉድጓድ ቆፍሩ" },
    fact: { en: "They dug down into the rock, leaving one huge block standing in the middle.", am: "ዐለቱን ወደ ታች ቆፈሩ፤ በመሐል አንድ ግዙፍ ዐለት ቆሞ ቀረ።" },
    pic: <Tool kind="pick" />,
  },
  {
    key: "outside",
    label: { en: "Shape the roof, the walls and the windows", am: "ጣሪያውን፣ ግድግዳዎቹንና መስኮቶቹን ቅረጹ" },
    fact: { en: "Then they carved the outside of the block into a church, from the top down.", am: "ከዚያ የዐለቱን ውጭ ከላይ ወደ ታች ቤተ ክርስቲያን አስመስለው ቀረጹት።" },
    pic: <Tool kind="chisel" />,
  },
  {
    key: "inside",
    label: { en: "Hollow out the inside and open the door", am: "ውስጡን ፈልፍሉና በሩን ክፈቱ" },
    fact: { en: "Last, they hollowed out the rooms inside. The whole church is one single piece of rock!", am: "በመጨረሻ ውስጡን ክፍሎች ፈለፈሉ። ቤተ ክርስቲያኑ በሙሉ አንድ ዐለት ነው!" },
    pic: <Tool kind="door" />,
  },
];

const PILE = ["outside", "inside", "mark", "trench"];

/** The cut-away picture: the rock, the trench, the carved church, the open door. */
function Cut({ placed }: { placed: number }) {
  const trench = placed >= 2;
  const shaped = placed >= 3;
  const open = placed >= 4;
  return (
    <g>
      <SkyFor id="cr" time="day" />
      <rect x={-10} y={110} width={420} height={200} fill={ROCK} />
      <path d="M-10 110 H410" stroke={ROCK_L} strokeWidth={4} />
      {trench && (
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <rect x={90} y={110} width={50} height={170} fill="#3A2418" />
          <rect x={260} y={110} width={50} height={170} fill="#3A2418" />
          <rect x={90} y={270} width={220} height={14} fill="#3A2418" />
          <path d="M90 110 v170 M310 110 v170" stroke={ROCK_D} strokeWidth={3} />
        </motion.g>
      )}
      {(trench || placed >= 1) && <rect x={140} y={110} width={120} height={160} fill={shaped ? ROCK_L : ROCK} />}
      {shaped && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d="M140 110 H260 V122 H140Z" fill={ROCK_D} />
          {[150, 182, 214, 236].map((x) => (
            <rect key={x} x={x} y={146} width={12} height={20} rx={6} fill={ROCK_D} />
          ))}
          {[150, 182, 214, 236].map((x) => (
            <rect key={`b${x}`} x={x} y={196} width={12} height={20} rx={6} fill={ROCK_D} />
          ))}
          <path d="M140 136 H260 M140 184 H260" stroke={ROCK_D} strokeWidth={3} />
        </motion.g>
      )}
      {placed >= 1 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <g transform="translate(200 110)">
          <path d="M-14 -4 H14 M0 -16 V0 M-6 -10 H6" stroke={shaped ? ROCK_D : "#FFFFFF"} strokeWidth={4} strokeLinecap="round" />
          </g>
        </motion.g>
      )}
      {open && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d="M186 270 V236 Q200 220 214 236 V270Z" fill="#FFF3C0" />
          <circle cx={200} cy={250} r={40} fill="#FFF3C0" opacity={0.25} />
        </motion.g>
      )}
      <Place x={350} y={112} s={0.3} flip tap={TAP.cub}>
        <Cub mood={open ? "joy" : "wow"} arm={open ? "up" : "none"} />
      </Place>
    </g>
  );
}

export default function CarveFromRock({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "Carve a Church from the Rock", am: "ከዐለት ቤተ ክርስቲያን ፈልፍሉ" }}
      goal={{ en: "At Lalibela, churches were carved down into one rock. Choose the steps in order.", am: "በላሊበላ አብያተ ክርስቲያናት ከአንድ ዐለት ወደ ታች ተፈልፍለዋል። ደረጃዎቹን በቅደም ተከተል ምረጡ።" }}
      steps={STEPS}
      pile={PILE}
      hint={{ en: "Not yet! Remember: they started at the top of the rock and worked down.", am: "ገና ነው! አስታውሱ፦ ከዐለቱ አናት ጀምረው ወደ ታች ሠሩ።" }}
      finale={{ en: "A whole church from one rock!", am: "ከአንድ ዐለት አንድ ሙሉ ቤተ ክርስቲያን!" }}
      onDone={onDone}
      stage={(placed) => <Cut placed={placed} />}
    />
  );
}
