"use client";

import { Donkey } from "@/components/book/courses/science-nature/kit-land";
import { Yard } from "@/components/book/courses/science-nature/kit-places";
import { Lever, RampBarrel, Well } from "@/components/book/courses/science-nature/kit-forces";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  A Little Help (level 6: simple machines). Four jobs from "The Village Well", and four simple
  machines: which one helps? Lifting water from a deep well (a pulley), tipping a heavy stone (a
  lever), getting a barrel up onto a cart (a ramp), and moving a heavy load along the road (wheels
  and an axle). Machines don't do the work for us: they make it easier.
*/

const PULLEY: Option = {
  key: "pulley",
  label: { en: "A pulley", am: "መዘውር" },
  pic: (
    <g>
      <circle cx={22} cy={12} r={8} fill="none" stroke="#7A5236" strokeWidth={3} />
      <path d="M14 12 V40 M30 12 V34" stroke="#C8A060" strokeWidth={2} />
      <rect x={24} y={34} width={12} height={8} fill="#9AA4B0" />
    </g>
  ),
};
const LEVER: Option = { key: "lever", label: { en: "A lever", am: "መፈንቀያ" }, pic: <g><path d="M4 30 L40 18" stroke="#8A5A36" strokeWidth={4} strokeLinecap="round" /><path d="M18 36 L22 26 L26 36Z" fill="#8A8A90" /><circle cx={36} cy={14} r={5} fill="#A8A0A8" /></g> };
const RAMP: Option = { key: "ramp", label: { en: "A ramp", am: "ተዳፋት" }, pic: <g><path d="M4 40 L40 18 V40Z" fill="#C08A4A" /><circle cx={20} cy={26} r={6} fill="#2F6FD0" /></g> };
const WHEEL: Option = { key: "wheel", label: { en: "Wheels and an axle", am: "መንኮራኩርና ዘንግ" }, pic: <g><circle cx={12} cy={30} r={8} fill="#5A3A2A" /><circle cx={32} cy={30} r={8} fill="#5A3A2A" /><path d="M12 30 H32" stroke="#C08A4A" strokeWidth={3} /><rect x={4} y={12} width={36} height={10} fill="#C08A4A" /></g> };

const ALL = [PULLEY, LEVER, RAMP, WHEEL];

const ROUNDS: Round[] = [
  {
    prompt: { en: "Lift a heavy bucket of water up out of a deep well.", am: "ከጥልቅ ጉድጓድ ከባድ የውሃ ባልዲ ወደ ላይ አውጡ።" },
    right: "pulley",
    options: ALL,
    why: { en: "With a pulley you pull down to lift up, and can use your own weight.", am: "በመዘውር ወደ ታች ጎትታችሁ ወደ ላይ ታወጣላችሁ፤ የራሳችሁን ክብደትም መጠቀም ትችላላችሁ።" },
    scene: (ok) => (
      <Yard id="sm-well" time="day" house={false}>
        <Well x={200} y={280} s={1.4} bucket={ok ? "up" : "down"} pulley={ok} />
      </Yard>
    ),
  },
  {
    prompt: { en: "Move a big, heavy stone off the path.", am: "ትልቅና ከባድ ድንጋይ ከመንገዱ ላይ አንሡ።" },
    right: "lever",
    options: [RAMP, WHEEL, LEVER, PULLEY],
    why: { en: "A long stick over a small rock is a lever: press the long end down, and up tips the stone.", am: "በትንሽ ድንጋይ ላይ የተቀመጠ ረጅም እንጨት መፈንቀያ ነው፦ ረጅሙን ጫፍ ወደ ታች ጫኑ፤ ድንጋዩም ወደ ላይ ይነሣል።" },
    scene: (ok) => (
      <Yard id="sm-lever" time="day" house={false}>
        <Lever x={210} y={270} s={1.2} lifted={ok} />
      </Yard>
    ),
  },
  {
    prompt: { en: "Get a heavy barrel up onto the cart.", am: "ከባድ በርሜል ጋሪው ላይ አውጡ።" },
    right: "ramp",
    options: [WHEEL, RAMP, PULLEY, LEVER],
    why: { en: "Rolling it up a sloping plank, a ramp, is easier than lifting it straight up.", am: "በተዳፋት ሳንቃ ላይ አንከባሎ ማውጣት ቀጥ አድርጎ ከማንሣት ይቀላል።" },
    scene: (ok) => (
      <Yard id="sm-ramp" time="day" house={false}>
        <RampBarrel x={210} y={280} s={1.3} at={ok ? 0.9 : 0} />
      </Yard>
    ),
  },
  {
    prompt: { en: "Carry heavy water barrels along the road to the village.", am: "ከባድ የውሃ በርሜሎችን በመንገድ ወደ መንደሩ ውሰዱ።" },
    right: "wheel",
    options: [LEVER, PULLEY, WHEEL, RAMP],
    why: { en: "Wheels on an axle roll, so a donkey can pull a cart full of water easily.", am: "በዘንግ ላይ ያሉ መንኮራኩሮች ይንከባለላሉ፤ ስለዚህ አህያ ውሃ የሞላበትን ጋሪ በቀላሉ መጎተት ትችላለች።" },
    scene: (ok) => (
      <Yard id="sm-cart" time="day" house={false}>
        <g transform={`translate(${ok ? 60 : 0} 0)`}>
          <rect x={120} y={226} width={90} height={16} fill="#8A5A36" />
          <ellipse cx={165} cy={206} rx={18} ry={22} fill="#2F6FD0" />
          {ok && (
            <g>
              <circle cx={165} cy={256} r={16} fill="#5A3A2A" />
              <path d="M151 256 H179 M165 242 V270" stroke="#C08A4A" strokeWidth={3} />
            </g>
          )}
          <path d="M210 234 H240" stroke="#7A5236" strokeWidth={4} />
          <Donkey x={280} y={270} s={1} walk={ok} />
        </g>
      </Yard>
    ),
  },
];

export default function SimpleMachines({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "A Little Help", am: "ትንሽ እገዛ" }}
      goal={{ en: "Which simple machine makes each job easier?", am: "እያንዳንዱን ሥራ የሚያቀልለው የትኛው ቀላል ማሽን ነው?" }}
      rounds={ROUNDS}
      hint={{ en: "Think of the village well: pulling down, pressing down, rolling up, or rolling along?", am: "የመንደሩን ጉድጓድ አስቡ፦ ወደ ታች መጎተት፣ ወደ ታች መጫን፣ ወደ ላይ ማንከባለል ወይስ ወደ ፊት ማንከባለል?" }}
      finale={{ en: "A little help from a simple machine!", am: "ከቀላል መሣሪያ ትንሽ እርዳታ!" }}
      end={ROUNDS[0].scene(true)}
      onDone={onDone}
    />
  );
}
