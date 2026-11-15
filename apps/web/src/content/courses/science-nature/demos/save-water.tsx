"use client";

import type { ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Cub, Gugu } from "@/components/book/courses/science-nature/kit-cast";
import { Home, Yard } from "@/components/book/courses/science-nature/kit-places";
import { Jerrycan, TomatoPlant, WaterPot } from "@/components/book/courses/science-nature/kit-props";
import { BottleFilter, RainBarrel } from "@/components/book/courses/science-nature/kit-sky";
import type { DemoProps } from "../../types";
import { Rounds, type Round } from "./rounds-kit";

/*
  Every Drop Counts (level 4: clean water and saving it). Five everyday choices: turn the tap off
  while brushing; catch kiremt rain from the roof; give washing-up water to the plants; boil or treat
  clear-looking water before drinking it; fix a dripping tap. A right choice shows why it matters.
*/

/** A wall tap at (x, y), with water running when `on` (or a slow drip). */
function WallTap({ x, y, s = 1, flow = "off" }: { x: number; y: number; s?: number; flow?: "off" | "on" | "drip" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-30} y={-10} width={30} height={12} rx={3} fill="#9AA4B0" />
      <path d="M0 -4 H14 V12" stroke="#9AA4B0" strokeWidth={10} fill="none" strokeLinejoin="round" />
      <rect x={-22} y={-22} width={14} height={8} rx={2} fill="#E2463F" />
      {flow === "on" && <rect x={10} y={16} width={8} height={80} fill="#7FC8F0" opacity={0.8} className="lali-rain" />}
      {flow === "drip" && <ellipse cx={14} cy={30} rx={3} ry={4} fill="#7FC8F0" className="lali-rain" />}
    </g>
  );
}

function Bathroom({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect width={400} height={300} fill="#DDEFF4" />
      <rect y={230} width={400} height={70} fill="#B8C8D0" />
      <rect x={150} y={170} width={120} height={30} rx={8} fill="#FFFFFF" stroke="#C9D8E0" strokeWidth={3} />
      {children}
    </g>
  );
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "Brushing your teeth: what about the tap?", am: "ጥርስ ስትቦርሹ፦ ቧንቧውስ?" },
    right: "off",
    options: [
      { key: "run", label: { en: "Leave it running", am: "እየፈሰሰ ይቆይ" } },
      { key: "off", label: { en: "Turn it off while I brush", am: "ስቦርሽ እዘጋዋለሁ" } },
    ],
    why: { en: "A running tap pours away clean water. Turn it on only to rinse. Every drop counts!", am: "የሚፈስ ቧንቧ ንጹሕ ውሃ ያባክናል። ለመጉመጥመጥ ብቻ ክፈቱት። እያንዳንዷ ጠብታ ትቆጠራለች!" },
    scene: (ok) => (
      <Bathroom>
        <WallTap x={226} y={150} s={1.4} flow={ok ? "off" : "on"} />
        <Place x={100} y={296} s={0.5}>
          <Cub mood={ok ? "joy" : "happy"} arm="hold" />
        </Place>
      </Bathroom>
    ),
  },
  {
    prompt: { en: "Kiremt rain pours off the roof. What can we do?", am: "የክረምት ዝናብ ከጣሪያው ይወርዳል። ምን ማድረግ እንችላለን?" },
    right: "catch",
    options: [
      { key: "catch", label: { en: "Catch it in a barrel", am: "በበርሜል እንያዘው" } },
      { key: "away", label: { en: "Let it all run away", am: "ሁሉም ይፍሰስ" } },
    ],
    why: { en: "Rain caught in kiremt can water the garden in the dry bega months.", am: "በክረምት የተያዘ ዝናብ በደረቁ የበጋ ወራት የአትክልት ቦታውን ሊያጠጣ ይችላል።" },
    scene: (ok) => (
      <Yard id="sw-rain" time="day">
        <RainBarrel x={300} y={276} s={1.4} fill={ok ? 0.8 : 0.1} />
        <path d="M280 120 l-4 14 M300 126 l-4 14 M320 120 l-4 14" stroke="#4FA8E0" strokeWidth={3} strokeLinecap="round" className="lali-rain" />
      </Yard>
    ),
  },
  {
    prompt: { en: "Water left from washing vegetables: where should it go?", am: "አትክልት ከታጠበ በኋላ የተረፈ ውሃ፦ ወዴት ይሂድ?" },
    right: "plants",
    options: [
      { key: "road", label: { en: "Throw it on the road", am: "መንገድ ላይ ይደፋ" } },
      { key: "plants", label: { en: "Pour it on the plants", am: "ለተክሎቹ ይጠጣ" } },
    ],
    why: { en: "Plants are glad of it. Using water twice saves water.", am: "ተክሎች ይወዱታል። ውሃን ሁለት ጊዜ መጠቀም ውሃ ይቆጥባል።" },
    scene: (ok) => (
      <Yard id="sw-veg" time="day" house={false}>
        <TomatoPlant x={270} y={270} s={1.2} ripe={ok} />
        <WaterPot x={170} y={270} s={1.2} fill={ok ? 0.2 : 0.7} />
        <Place x={80} y={296} s={0.44}>
          <Gugu mood={ok ? "joy" : "happy"} />
        </Place>
      </Yard>
    ),
  },
  {
    prompt: { en: "The river water looks clear. Can we drink it?", am: "የወንዙ ውሃ ጥሩ ይመስላል። ልንጠጣው እንችላለን?" },
    right: "boil",
    options: [
      { key: "yes", label: { en: "Yes, straight away", am: "አዎ፣ ወዲያውኑ" } },
      { key: "boil", label: { en: "Boil or treat it first", am: "መጀመሪያ ይፍላ ወይም ይታከም" } },
    ],
    why: { en: "Clear water can still have germs too small to see. Boil it or treat it first.", am: "ንጹሕ የሚመስል ውሃ እንኳ ለዓይን የማይታዩ ጀርሞች ሊኖሩበት ይችላሉ። መጀመሪያ አፍሉት ወይም አክሙት።" },
    scene: (ok) => (
      <g>
        <rect width={400} height={300} fill="#BFE4FA" />
        <rect y={200} width={400} height={100} fill="#4FA8E0" />
        <BottleFilter x={200} y={190} s={1.6} drip={false} />
        {ok && <Jerrycan x={320} y={280} s={1.2} />}
      </g>
    ),
  },
  {
    prompt: { en: "The tap is dripping. Drip, drip, drip…", am: "ቧንቧው ያንጠባጥባል። ጠብ፣ ጠብ፣ ጠብ…" },
    right: "fix",
    options: [
      { key: "fix", label: { en: "Ask a grown-up to fix it", am: "ትልቅ ሰው እንዲጠግነው እንጠይቅ" } },
      { key: "leave", label: { en: "Leave it: it's only drops", am: "ይቅር፦ ጠብታ ብቻ ነው" } },
    ],
    why: { en: "Drop by drop, a dripping tap wastes buckets of water over the weeks.", am: "ጠብታ በጠብታ፣ የሚያንጠባጥብ ቧንቧ በሳምንታት ውስጥ ብዙ ባልዲ ውሃ ያባክናል።" },
    scene: (ok) => (
      <Home id="sw-drip" time="day" shelf={false}>
        <WallTap x={200} y={150} s={1.6} flow={ok ? "off" : "drip"} />
      </Home>
    ),
  },
];

export default function SaveWater({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Every Drop Counts", am: "እያንዳንዷ ጠብታ ትቆጠራለች" }}
      goal={{ en: "Choose the way that saves water and keeps us safe.", am: "ውሃ የሚቆጥበውንና ደኅንነታችንን የሚጠብቀውን መንገድ ምረጡ።" }}
      rounds={ROUNDS}
      hint={{ en: "Hmm. Which way keeps more clean water for later, and keeps us healthy?", am: "እምም። የትኛው መንገድ ንጹሕ ውሃን ለኋላ ያቆያል፣ ጤናችንንም ይጠብቃል?" }}
      finale={{ en: "Every drop counts, and you know how to save it!", am: "እያንዳንዷ ጠብታ ትቆጠራለች፤ እናንተም እንዴት እንደምትቆጥቡ ታውቃላችሁ!" }}
      end={ROUNDS[1].scene(true)}
      onDone={onDone}
    />
  );
}
