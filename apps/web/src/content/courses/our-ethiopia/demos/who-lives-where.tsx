"use client";

import type { ReactNode } from "react";

import { Mountains } from "@/components/book/scenery";
import { CoffeeBush, Flamingo, Lobelia, SimienEdge, WildGelada, WildIbex } from "@/components/book/courses/our-ethiopia/kit-land";
import { MoleRat, Nyala } from "@/components/book/courses/our-ethiopia/kit-past";
import { SkyFor } from "@/components/book/courses/our-ethiopia/kit-places";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Who Lives Where? (level 5). Five animals of Ethiopia and their homes: the walia ibex on the
  steep cliffs of the Simien Mountains (it lives nowhere else); the Ethiopian wolf on the high,
  cold grassland of the Bale Mountains, hunting mole-rats; the mountain nyala in the Bale
  forests; the black-and-white colobus in the tall forest trees; flamingos on the salty lakes of
  the Rift Valley. Choose each one's home from three little pictures.
*/

type Home = "cliffs" | "plateau" | "forest" | "trees" | "lake" | "desert";

const HOME: Record<Home, { label: Option["label"]; pic: ReactNode }> = {
  cliffs: {
    label: { en: "Steep, rocky cliffs high in the Simien Mountains", am: "በሰሜን ተራሮች ከፍ ብለው ያሉ ቀጥ ያሉ ድንጋያማ ገደሎች" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#BFD8F0" />
        <path d="M0 44 L0 14 L12 8 L20 20 L30 6 L44 16 L44 44Z" fill="#8A8278" />
        <path d="M6 26 h14 M22 34 h16" stroke="#A9A096" strokeWidth={2} />
      </g>
    ),
  },
  plateau: {
    label: { en: "High, cold grassland with giant lobelias", am: "ግዙፍ ጅባራ ያለበት ከፍተኛና ቀዝቃዛ የሣር ምድር" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#BFD8F0" />
        <rect y={28} width={44} height={16} fill="#A8A86A" />
        <g transform="translate(14 32) scale(0.32)">
          <Lobelia x={0} y={0} />
        </g>
        <g transform="translate(32 34) scale(0.3)">
          <Lobelia x={0} y={0} />
        </g>
      </g>
    ),
  },
  forest: {
    label: { en: "A cool mountain forest", am: "ቀዝቃዛ የተራራ ደን" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#3E6A3A" />
        {[10, 22, 34].map((x) => (
          <g key={x}>
            <rect x={x - 2} y={22} width={4} height={18} fill="#5A4030" />
            <ellipse cx={x} cy={18} rx={8} ry={10} fill="#2E5A32" />
          </g>
        ))}
      </g>
    ),
  },
  trees: {
    label: { en: "High up in tall forest trees", am: "በረጃጅም የደን ዛፎች ላይ ከፍ ብሎ" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#2E5A3A" />
        <rect x={18} y={8} width={8} height={36} fill="#6A4A30" />
        <ellipse cx={22} cy={8} rx={22} ry={10} fill="#3E8A4A" />
        <path d="M26 20 Q36 18 42 22" stroke="#6A4A30" strokeWidth={3} />
      </g>
    ),
  },
  lake: {
    label: { en: "A salty lake in the Rift Valley", am: "በስምጥ ሸለቆ ያለ ጨዋማ ሐይቅ" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#F0D8A8" />
        <ellipse cx={22} cy={30} rx={20} ry={8} fill="#4FA8E0" />
        <path d="M10 30 q4 -2 8 0 M24 32 q4 -2 8 0" stroke="#FFFFFF" strokeWidth={1.4} fill="none" />
      </g>
    ),
  },
  desert: {
    label: { en: "A hot, dry salt plain", am: "ሞቃትና ደረቅ የጨው ሜዳ" },
    pic: (
      <g>
        <rect width={44} height={44} rx={8} fill="#FFE7A8" />
        <rect y={28} width={44} height={16} fill="#F2EEE2" />
        <circle cx={34} cy={12} r={6} fill="#FFB21E" />
        <path d="M4 34 l8 4 M20 32 l10 6" stroke="#D8D0B8" strokeWidth={1.4} />
      </g>
    ),
  },
};

const opt = (h: Home): Option => ({ key: h, label: HOME[h].label, pic: HOME[h].pic });

/** A tree-top colobus with its long white cape and tail. */
function Colobus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 8 Q-14 30 -8 50" stroke="#1E1E26" strokeWidth={3} fill="none" />
      <ellipse cx={-8} cy={58} rx={5} ry={11} fill="#FFFFFF" />
      <ellipse cx={0} cy={-2} rx={10} ry={13} fill="#1E1E26" />
      <path d="M-8 -10 Q-18 6 -12 18 Q-6 8 -4 -6Z M8 -10 Q16 4 12 16 Q6 6 4 -6Z" fill="#FFFFFF" />
      <circle cx={4} cy={-20} r={7.4} fill="#1E1E26" />
      <circle cx={4} cy={-19} r={5.4} fill="none" stroke="#FFFFFF" strokeWidth={2} />
      <circle cx={4} cy={-19} r={3.6} fill="#4A4A54" />
    </g>
  );
}

/** An Ethiopian wolf, side-on. */
function RedWolf({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-16 0 L-15 -22 M-9 0 L-10 -22 M12 0 L11 -22 M18 0 L17 -22" stroke="#B85A2A" strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={0} cy={-28} rx={24} ry={10} fill="#C8642E" />
      <ellipse cx={2} cy={-22} rx={16} ry={4} fill="#F2E6D2" />
      <path d="M-22 -30 Q-38 -30 -42 -14 Q-34 -22 -22 -24Z" fill="#C8642E" />
      <path d="M-40 -18 Q-42 -12 -40 -10 Q-36 -14 -36 -18Z" fill="#2A1E18" />
      <path d="M16 -32 L24 -46 L32 -36Z" fill="#F2EEE2" />
      <path d="M18 -34 Q22 -48 34 -48 Q44 -46 50 -42 Q44 -38 34 -36 Q26 -30 18 -34Z" fill="#C8642E" />
      <path d="M24 -46 L22 -62 L30 -50Z M30 -48 L32 -63 L36 -48Z" fill="#B85A2A" />
      <circle cx={50} cy={-42} r={2} fill="#2A1E18" />
      <circle cx={33} cy={-44} r={1.6} fill="#2A1E18" />
    </g>
  );
}

/** A plain backdrop with the animal in the middle, waiting for its home. */
function Waiting({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#EAF4FB" />
      <ellipse cx={200} cy={250} rx={130} ry={18} fill="#D3E4F4" />
      <text x={200} y={60} textAnchor="middle" fontSize={40} fontWeight={900} fill="#9DB4CC" fontFamily="var(--font-grandstander), sans-serif">
        ?
      </text>
      {children}
    </g>
  );
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "Where does the walia ibex live?", am: "ዋልያ የሚኖረው የት ነው?" },
    right: "cliffs",
    options: [opt("lake"), opt("cliffs"), opt("trees")],
    why: { en: "Walia live only in the Simien Mountains, on ledges so steep that few other animals can follow.", am: "ዋልያ የሚኖረው በሰሜን ተራሮች ብቻ ነው፤ ሌሎች እንስሳት በማይደርሱባቸው በጣም ቀጥ ያሉ ጠርዞች ላይ።" },
    scene: (solved) =>
      solved ? (
        <g>
          <SimienEdge id="wl1" />
          <WildIbex x={120} y={240} s={2.2} />
          <WildIbex x={290} y={236} s={1.6} flip />
        </g>
      ) : (
        <Waiting>
          <WildIbex x={200} y={250} s={2.6} />
        </Waiting>
      ),
  },
  {
    prompt: { en: "Where does the Ethiopian wolf hunt for mole-rats?", am: "የኢትዮጵያ ቀበሮ ፍልፈሎችን የሚያድነው የት ነው?" },
    right: "plateau",
    options: [opt("plateau"), opt("desert"), opt("lake")],
    why: { en: "Ethiopian wolves live on the high, cold grasslands, like the top of the Bale Mountains, where mole-rats dig their tunnels.", am: "የኢትዮጵያ ቀበሮዎች እንደ ባሌ ተራሮች አናት ባሉ ከፍተኛና ቀዝቃዛ የሣር ምድሮች ይኖራሉ፤ ፍልፈሎች ዋሻቸውን እዚያ ይቆፍራሉ።" },
    scene: (solved) =>
      solved ? (
        <g>
          <SkyFor id="wl2" time="day" />
          <path d="M-10 200 Q200 186 410 202 L410 310 L-10 310Z" fill="#A8A86A" />
          <Lobelia x={50} y={250} s={1.2} />
          <Lobelia x={360} y={246} s={1} delay={-1} />
          <RedWolf x={180} y={262} s={2} />
          <MoleRat x={310} y={262} s={2} />
        </g>
      ) : (
        <Waiting>
          <RedWolf x={190} y={252} s={2.2} />
        </Waiting>
      ),
  },
  {
    prompt: { en: "Where does the mountain nyala live?", am: "የደጋ አጋዘን የሚኖረው የት ነው?" },
    right: "forest",
    options: [opt("desert"), opt("cliffs"), opt("forest")],
    why: { en: "Mountain nyala live in the cool mountain forests and woodlands of Bale and Arsi, and nowhere else in the world.", am: "የደጋ አጋዘን በባሌና በአርሲ ቀዝቃዛ የተራራ ደኖች ይኖራል፤ በዓለም ሌላ ቦታ የለም።" },
    scene: (solved) =>
      solved ? (
        <g>
          <rect width={400} height={300} fill="#3E6A3A" />
          {[30, 110, 290, 370].map((x, i) => (
            <g key={x}>
              <rect x={x - 8} y={60} width={16} height={190} fill="#5A4030" />
              <ellipse cx={x} cy={60} rx={50} ry={46} fill={i % 2 ? "#2E5A32" : "#3A6A3E"} />
            </g>
          ))}
          <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#5A8A42" />
          <Nyala x={200} y={270} s={1.5} />
        </g>
      ) : (
        <Waiting>
          <Nyala x={190} y={252} s={1.6} />
        </Waiting>
      ),
  },
  {
    prompt: { en: "Where does the black-and-white colobus monkey live?", am: "ጉሬዛ የሚኖረው የት ነው?" },
    right: "trees",
    options: [opt("trees"), opt("plateau"), opt("desert")],
    why: { en: "Colobus monkeys live high in the trees and eat leaves. They leap from branch to branch, their white capes flying.", am: "ጉሬዛዎች በዛፎች ላይ ከፍ ብለው ይኖራሉ፤ ቅጠል ይበላሉ። ነጭ ካባቸው እየበረረ ከቅርንጫፍ ቅርንጫፍ ይዘላሉ።" },
    scene: (solved) =>
      solved ? (
        <g>
          <rect width={400} height={300} fill="#2E5A3A" />
          <rect x={180} y={60} width={40} height={240} fill="#6A4A30" />
          <ellipse cx={200} cy={50} rx={200} ry={60} fill="#3E8A4A" />
          <path d="M210 130 Q300 120 380 136" stroke="#6A4A30" strokeWidth={12} strokeLinecap="round" fill="none" />
          <Colobus x={300} y={110} s={2} />
          <CoffeeBush x={80} y={290} s={1.4} />
        </g>
      ) : (
        <Waiting>
          <Colobus x={200} y={180} s={2.4} />
        </Waiting>
      ),
  },
  {
    prompt: { en: "Where do the pink flamingos gather?", am: "ሮዝ ፍላሚንጎዎች የሚሰበሰቡት የት ነው?" },
    right: "lake",
    options: [opt("cliffs"), opt("lake"), opt("forest")],
    why: { en: "Flamingos wade in the salty lakes of the Rift Valley, like Abijatta, eating tiny plants and shrimps in the water.", am: "ፍላሚንጎዎች እንደ አብጃታ ባሉ የስምጥ ሸለቆ ጨዋማ ሐይቆች ውስጥ ይቆማሉ፤ በውሃው ውስጥ ያሉ ጥቃቅን ተክሎችንና ሽሪምፖችን ይበላሉ።" },
    scene: (solved) =>
      solved ? (
        <g>
          <SkyFor id="wl5" time="day" />
          <Mountains far="#C8D0E6" mid="#A8B4D4" />
          <path d="M-10 180 Q200 166 410 182 L410 310 L-10 310Z" fill="#E0C890" />
          <ellipse cx={200} cy={250} rx={220} ry={46} fill="#4FA8E0" />
          {[90, 150, 220, 290].map((x, i) => (
            <Flamingo key={x} x={x} y={262 - (i % 2) * 8} s={1.1} flip={i % 2 === 1} delay={-i * 0.4} />
          ))}
        </g>
      ) : (
        <Waiting>
          <Flamingo x={200} y={250} s={2} />
        </Waiting>
      ),
  },
];

export default function WhoLivesWhere({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Who Lives Where?", am: "ማን የት ይኖራል?" }}
      goal={{ en: "Find the right home for each of our animals.", am: "ለእያንዳንዱ እንስሳችን ትክክለኛውን መኖሪያ ፈልጉ።" }}
      rounds={ROUNDS}
      hint={{ en: "Hmm, could it live there? Think about what it eats and how it moves.", am: "እምም፣ እዚያ ሊኖር ይችላል? ምን እንደሚበላና እንዴት እንደሚንቀሳቀስ አስቡ።" }}
      finale={{ en: "Every animal has its home. Let's keep them safe!", am: "ለእያንዳንዱ እንስሳ መኖሪያ አለው። እንጠብቃቸው!" }}
      end={
        <g>
          <SimienEdge id="wl-end" />
          <WildIbex x={70} y={250} s={1.4} />
          <WildGelada x={150} y={258} s={1.4} />
          <RedWolf x={250} y={262} s={1.1} />
          <Nyala x={340} y={268} s={0.9} />
        </g>
      }
      onDone={onDone}
    />
  );
}
