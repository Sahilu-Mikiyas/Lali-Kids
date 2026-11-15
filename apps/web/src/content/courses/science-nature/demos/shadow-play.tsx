"use client";

import type { ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Tsehay } from "@/components/book/courses/science-nature/kit-cast";
import { Torch } from "@/components/book/courses/science-nature/kit-forces";
import { SunDisc } from "@/components/book/courses/science-nature/kit-sky";
import type { DemoProps } from "../../types";
import { Rounds, type Round } from "./rounds-kit";

/*
  Shadow Play (level 6: light and shadows). Five rounds with Tsehay: which way does her morning
  shadow point (away from the Sun)? Is her midday shadow long or short (short: the Sun is high)? Which
  makes the darkest shadow in torchlight (the wooden board; glass lets light through)? How do we make
  the shadow show's lion bigger (move it closer to the torch)? Where light can't go, a shadow will show!
*/

/** Tsehay in a plain yard with the Sun at (sx, sy) and her shadow (if shown) of length `len`, `dir`. */
function SunYard({ sx, sy, len, dir, show }: { sx: number; sy: number; len: number; dir: 1 | -1; show: boolean }) {
  return (
    <g>
      <rect width={400} height={300} fill="#BFE4FA" />
      <rect y={230} width={400} height={70} fill="#E3B77C" />
      <SunDisc x={sx} y={sy} r={24} />
      {show && <ellipse cx={200 + (dir * len) / 2} cy={276} rx={Math.max(18, len / 2)} ry={7} fill="#1E1A30" opacity={0.35} />}
      <Place x={200} y={278} s={0.5}>
        <Tsehay mood="happy" />
      </Place>
    </g>
  );
}

/** A torch on the left, a white wall on the right, and something in between. */
function TorchRoom({ children }: { children?: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#141A3A" />
      <rect x={310} y={30} width={80} height={240} fill="#F4F4EE" />
      <Torch x={30} y={150} s={1.1} len={280} />
      {children}
    </g>
  );
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "Morning: the Sun is low on this side. Where will Tsehay's shadow point?", am: "ጠዋት ነው፤ ፀሐይ በዚህ ጎን ዝቅ ብላለች። ጥላው ወዴት ይመለከታል?" },
    right: "away",
    options: [
      { key: "towards", label: { en: "Towards the Sun", am: "ወደ ፀሐይ" } },
      { key: "away", label: { en: "Away from the Sun", am: "ከፀሐይ ተቃራኒ" } },
    ],
    why: { en: "Her body blocks the light, so the shadow falls on the far side, away from the Sun. Low Sun, long shadow!", am: "ሰውነቷ ብርሃኑን ይዘጋል፤ ስለዚህ ጥላው ከፀሐይ በተቃራኒ ጎን ይወድቃል። ዝቅ ያለች ፀሐይ፣ ረጅም ጥላ!" },
    scene: (ok) => <SunYard sx={40} sy={150} len={170} dir={1} show={ok} />,
  },
  {
    prompt: { en: "Midday: the Sun is high overhead. Long shadow or short?", am: "እኩለ ቀን፦ ፀሐይ ከራስ በላይ ከፍ ብላለች። ጥላው ረጅም ነው ወይስ አጭር?" },
    right: "short",
    options: [
      { key: "long", label: { en: "Long", am: "ረጅም" } },
      { key: "short", label: { en: "Short", am: "አጭር" } },
    ],
    why: { en: "When the Sun is high, the shadow is short, almost under her feet.", am: "ፀሐይ ከፍ ስትል ጥላው አጭር ነው፤ ከእግሯ ሥር ማለት ይቻላል።" },
    scene: (ok) => <SunYard sx={200} sy={40} len={20} dir={1} show={ok} />,
  },
  {
    prompt: { en: "Evening: the Sun is low on the other side. Where does the shadow point now?", am: "ምሽት፦ ፀሐይ በሌላኛው ጎን ዝቅ ብላለች። አሁን ጥላው ወዴት ይመለከታል?" },
    right: "left",
    options: [
      { key: "left", label: { en: "The other way: away from the Sun", am: "በሌላኛው መንገድ፦ ከፀሐይ ተቃራኒ" } },
      { key: "same", label: { en: "The same way as the morning", am: "እንደ ጠዋቱ በዚያው መንገድ" } },
    ],
    why: { en: "Shadows always point away from the light, so in the evening it points the other way.", am: "ጥላ ሁልጊዜ ከብርሃኑ ተቃራኒ ይመለከታል፤ ስለዚህ ምሽት ላይ በሌላኛው መንገድ ይመለከታል።" },
    scene: (ok) => <SunYard sx={360} sy={150} len={170} dir={-1} show={ok} />,
  },
  {
    prompt: { en: "Which one makes the darkest shadow in the torchlight?", am: "በባትሪው ብርሃን በጣም ጨለማ ጥላ የሚሰጠው የትኛው ነው?" },
    right: "wood",
    options: [
      { key: "glass", label: { en: "A clear glass", am: "ጥርት ያለ ብርጭቆ" } },
      { key: "cloth", label: { en: "A thin cloth", am: "ስስ ጨርቅ" } },
      { key: "wood", label: { en: "A wooden board", am: "የእንጨት ሳንቃ" } },
    ],
    why: { en: "Light can't pass through wood, so it makes a dark shadow. Glass lets light through; thin cloth lets some through.", am: "ብርሃን በእንጨት ውስጥ ማለፍ አይችልም፤ ስለዚህ ጨለማ ጥላ ይሰጣል። ብርጭቆ ብርሃን ያሳልፋል፤ ስስ ጨርቅ ደግሞ ጥቂት ያሳልፋል።" },
    scene: (ok) => (
      <TorchRoom>
        <rect x={160} y={60} width={10} height={40} fill="#BFE6FA" opacity={0.5} />
        <rect x={160} y={130} width={10} height={40} fill="#F4EEDC" opacity={0.7} />
        <rect x={160} y={200} width={10} height={40} fill="#8A5A36" />
        {ok && (
          <g>
            <rect x={320} y={50} width={26} height={50} fill="#1E1A30" opacity={0.06} />
            <rect x={320} y={130} width={26} height={50} fill="#1E1A30" opacity={0.35} />
            <rect x={320} y={210} width={26} height={50} fill="#1E1A30" opacity={0.9} />
          </g>
        )}
      </TorchRoom>
    ),
  },
  {
    prompt: { en: "How do we make the paper lion's shadow bigger?", am: "የወረቀቱን አንበሳ ጥላ እንዴት እናተልቀዋለን?" },
    right: "near",
    options: [
      { key: "near", label: { en: "Move it closer to the torch", am: "ወደ ባትሪው እናቅርበው" } },
      { key: "far", label: { en: "Move it closer to the wall", am: "ወደ ግድግዳው እናቅርበው" } },
    ],
    why: { en: "Closer to the light, the shadow grows bigger (and blurrier). Closer to the wall, it gets smaller and sharper.", am: "ወደ ብርሃኑ ሲቀርብ ጥላው ይተልቃል (ይደበዝዛልም)። ወደ ግድግዳው ሲቀርብ ያንሳል፣ ይጠራልም።" },
    scene: (ok) => (
      <TorchRoom>
        <circle cx={ok ? 120 : 230} cy={150} r={14} fill="#F5B21E" />
        <circle cx={350} cy={150} r={ok ? 60 : 22} fill="#1E1A30" opacity={ok ? 0.6 : 0.85} />
      </TorchRoom>
    ),
  },
];

export default function ShadowPlay({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Shadow Play", am: "የጥላ ጨዋታ" }}
      goal={{ en: "Work out where shadows fall, and how big and dark they are.", am: "ጥላ የት እንደሚወድቅ፣ ምን ያህል ትልቅና ጨለማ እንደሆነ እወቁ።" }}
      rounds={ROUNDS}
      hint={{ en: "Remember: light travels in straight lines, and the shadow is where it can't reach.", am: "አስታውሱ፦ ብርሃን ቀጥ ብሎ ይጓዛል፤ ጥላው ብርሃኑ የማይደርስበት ቦታ ነው።" }}
      finale={{ en: "Where light can't go, a shadow will show!", am: "ብርሃን በማይደርስበት ጥላ ይታያል!" }}
      end={<SunYard sx={40} sy={150} len={170} dir={1} show />}
      onDone={onDone}
    />
  );
}
