"use client";

import type { ComponentType, ReactNode } from "react";

import { Camel, Cub, Gugu, Ibex, Teacher, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import {
  Banana,
  Bed,
  BigHand,
  Bubbles,
  Candle,
  Candy,
  Canjeero,
  ClothCover,
  CoveredPot,
  Drops,
  Egg,
  FeelFace,
  FeelingWeight,
  FlowerCup,
  Fly,
  Foam,
  FoodBlob,
  HelpingHand,
  Latrine,
  Mango,
  Mug,
  Plate,
  RubbishHeap,
  Scrubber,
  SmellFlower,
  SneezeSpray,
  SoapBar,
  SodaBottle,
  StopHand,
  Tissue,
  Toothbrush,
  Towel,
  TummyButterflies,
  WashingLine,
} from "@/components/book/courses/healthy-safe/kit-health";
import { Book } from "@/components/book/courses/healthy-safe/kit-more";
import { FigTree } from "@/components/book/courses/healthy-safe/kit-places";
import { Ball, Mesob, WashSet } from "@/components/book/courses/healthy-safe/kit-props";
import { CloudShape, Daisy, Moon, Sun } from "@/components/book/scenery";
import type { ArtProps } from "../types";

/*
  Small pictures for the Healthy & Safe quiz questions, by id. Each is a square SVG drawn with the
  course's scene kit, so the quizzes look like the stories. No words in the pictures, and nothing
  frightening: germs are never drawn as monsters, and "private" is only ever the little swimsuit
  and pants on the washing line.
*/

function Pic({ size = 96, className, vb = "0 0 100 100", children }: ArtProps & { vb?: string; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} aria-hidden>
      {children}
    </svg>
  );
}

/** A character from the cast, filling the square. */
const who = (el: ReactNode, bg = "#E4F6FF") =>
  function Who(p: ArtProps) {
    return (
      <Pic {...p} vb="-20 0 240 240">
        <rect x={-20} y={0} width={240} height={240} rx={52} fill={bg} />
        {el}
      </Pic>
    );
  };

/** A thing from the kit, centred in a 100 x 100 square. */
const thing = (el: ReactNode, bg = "#FFF6DD") =>
  function Thing(p: ArtProps) {
    return (
      <Pic {...p}>
        <rect width={100} height={100} rx={22} fill={bg} />
        {el}
      </Pic>
    );
  };

const face = (feel: "happy" | "sad" | "angry" | "worried" | "calm" | "surprised") => thing(<FeelFace x={50} y={50} s={2} feel={feel} />, "#FFF6DD");

export const ART: Record<string, ComponentType<ArtProps>> = {
  /* ---------- level 1: clean and healthy ---------- */
  soap: thing(
    <g>
      <SoapBar x={50} y={68} s={2.2} foam />
      <Bubbles x={50} y={36} n={4} spread={40} seed={3} up={-20} />
    </g>,
    "#E4F6FF",
  ),
  mesob: thing(<Mesob x={50} y={86} s={0.62} rx={60} />),
  sky: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#9FD4FF" />
      <g transform="translate(36 46)">
        <CloudShape s={0.7} />
      </g>
      <Sun x={72} y={28} r={12} face={false} />
    </g>,
  ),
  wave: who(<Gugu mood="joy" pose="wave" />),
  splash: thing(
    <g>
      <BigHand x={50} y={98} s={0.62} view="back" clay />
      <Drops x={50} y={14} n={4} w={40} fall={30} />
    </g>,
    "#E4F6FF",
  ),
  "hands-wet": thing(
    <g>
      <WashSet x={74} y={40} s={0.9} pour />
      <BigHand x={40} y={98} s={0.55} view="back" />
    </g>,
    "#E4F6FF",
  ),
  "hands-scrub": thing(
    <g>
      <BigHand x={50} y={98} s={0.62} view="palm" zone="palm" />
      <Scrubber x={50} y={66} s={0.6} />
      <Bubbles x={50} y={40} n={4} spread={40} seed={6} up={-20} />
    </g>,
    "#E4F6FF",
  ),
  "hands-rinse": thing(
    <g>
      <BigHand x={50} y={98} s={0.62} view="back" foam />
      <Drops x={50} y={8} n={5} w={44} fall={40} />
    </g>,
    "#E4F6FF",
  ),
  towel: thing(<Towel x={50} y={74} s={2} />),
  "sneeze-air": who(
    <g>
      <Ibex mood="wow" />
      <SneezeSpray x={130} y={124} s={1.6} />
    </g>,
  ),
  "elbow-sneeze": who(
    <g>
      <Ibex mood="wow" />
      <path d="M138 168 Q138 132 116 124 Q96 118 72 122" stroke="#9C7552" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M136 150 Q132 130 116 126" stroke="#FFFDF4" strokeWidth={6} fill="none" strokeLinecap="round" />
      <SneezeSpray x={86} y={120} s={1.6} caught />
    </g>,
  ),
  "sneeze-hands": who(
    <g>
      <Ibex mood="wow" />
      <ellipse cx={86} cy={130} rx={14} ry={10} fill="#7E5A3C" />
      <ellipse cx={114} cy={130} rx={14} ry={10} fill="#7E5A3C" />
      <SneezeSpray x={100} y={130} s={1.2} caught />
    </g>,
  ),
  toothbrush: thing(<Toothbrush x={44} y={56} s={1.5} rot={-30} paste />),
  "sun-only": thing(<Sun x={50} y={50} r={22} />, "#E4F6FF"),
  "sun-moon": thing(
    <g>
      <rect x={50} y={0} width={50} height={100} rx={0} fill="#26307A" />
      <rect width={100} height={100} rx={22} fill="none" />
      <Sun x={27} y={50} r={15} face={false} />
      <Moon x={74} y={50} r={14} glow={false} />
    </g>,
    "#E4F6FF",
  ),
  tissue: thing(<Tissue x={50} y={70} s={3} />, "#E4F6FF"),
  "water-pot": thing(<CoveredPot x={44} y={86} s={1.1} />),
  puddle: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#D9B07A" />
      <ellipse cx={50} cy={64} rx={36} ry={14} fill="#8A7A5A" />
      <ellipse cx={44} cy={60} rx={20} ry={6} fill="#A8987A" />
      <path d="M30 70 q8 -3 16 0" stroke="#6A5A3A" strokeWidth={2} fill="none" />
    </g>,
  ),
  stream: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#8FCB80" />
      <path d="M-4 54 Q50 40 104 54 L104 78 Q50 66 -4 78Z" fill="#6CC0EC" />
      <path d="M20 62 q8 -3 16 0 M60 60 q8 -3 16 0" stroke="#E8F7FF" strokeWidth={2} fill="none" />
      <g transform="translate(72 52) scale(0.55)">
        <path d="M-18 0 V-16 M-8 0 V-16 M16 0 V-16 M24 0 V-16" stroke="#F2EADC" strokeWidth={5} strokeLinecap="round" />
        <ellipse cx={4} cy={-24} rx={28} ry={14} fill="#F2EADC" />
        <ellipse cx={-28} cy={-14} rx={10} ry={8} fill="#F2EADC" />
      </g>
    </g>,
  ),
  "clay-hands": thing(<BigHand x={50} y={98} s={0.62} view="back" clay />, "#E4F6FF"),
  latrine: thing(<Latrine x={40} y={86} s={0.9} />, "#E4F6FF"),
  "paste-long": thing(
    <g>
      <Toothbrush x={46} y={60} s={1.5} rot={-20} />
      <path d="M56 37 L84 27" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" />
      <path d="M56 37 L84 27" stroke="#7FD8C8" strokeWidth={2} strokeLinecap="round" strokeDasharray="3 4" />
    </g>,
  ),
  "paste-pea": thing(<Toothbrush x={46} y={60} s={1.5} rot={-20} paste />),
  "brush-dry": thing(<Toothbrush x={46} y={60} s={1.5} rot={-20} />),
  moon: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#26307A" />
      <Moon x={50} y={50} r={24} sleepy />
    </g>,
  ),
  "blow-kiss": who(
    <g>
      <Ibex mood="joy" pose="wave" />
      <path d="M190 80 C176 70 178 58 186 58 C189 58 190 61 190 63 C190 61 191 58 194 58 C202 58 204 70 190 80Z" fill="#E2463F" />
    </g>,
  ),
  "food-covered": thing(
    <g>
      <Mesob x={50} y={92} s={0.55} rx={60} />
      <ClothCover x={50} y={57} s={1.2} color="#FFFDF4" />
      <Fly x={22} y={22} s={1.4} still />
    </g>,
  ),
  "food-flies": thing(
    <g>
      <Mesob x={50} y={92} s={0.55} rx={60} />
      <Fly x={36} y={50} s={1.6} still />
      <Fly x={60} y={46} s={1.6} still />
      <Fly x={50} y={30} s={1.6} still />
    </g>,
  ),
  rubbish: thing(
    <g>
      <RubbishHeap x={50} y={74} s={1.3} />
      <Fly x={36} y={34} s={1.4} still />
      <Fly x={64} y={30} s={1.4} still />
    </g>,
  ),
  "abdi-dusty": who(
    <g>
      <Camel who="abdi" mood="happy" />
      <g fill="#8A6A44" opacity={0.6}>
        <ellipse cx={80} cy={160} rx={14} ry={8} />
        <ellipse cx={110} cy={174} rx={10} ry={6} />
        <ellipse cx={150} cy={130} rx={6} ry={8} />
      </g>
    </g>,
    "#FFE9C8",
  ),

  /* ---------- level 2: food, sleep and moving ---------- */
  candy: thing(<Candy x={50} y={52} s={1.8} />),
  misir: thing(
    <g>
      <ellipse cx={50} cy={60} rx={36} ry={14} fill="#E8E2D6" />
      <g transform="translate(50 54)">
        <FoodBlob food="misir" s={2.4} />
      </g>
    </g>,
  ),
  soda: thing(<SodaBottle x={50} y={88} s={1.5} />, "#E4F6FF"),
  "water-cup": thing(<Mug x={46} y={78} s={2.4} />, "#E4F6FF"),
  breakfast: thing(
    <g>
      <Canjeero x={36} y={66} s={1.1} />
      <Egg x={68} y={56} s={1.2} />
      <Mug x={74} y={86} s={1.1} drink="milk" color="#FFFFFF" />
    </g>,
  ),
  basin: thing(
    <g>
      <ellipse cx={50} cy={70} rx={34} ry={10} fill="#C9C2B4" />
      <ellipse cx={50} cy={66} rx={28} ry={6} fill="#9FD4F0" />
      <Drops x={50} y={22} n={4} w={24} fall={28} />
    </g>,
    "#E4F6FF",
  ),
  book: thing(<Book x={50} y={60} s={2.2} />),
  bed: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#26307A" />
      <Moon x={78} y={24} r={10} glow={false} />
      <Bed x={50} y={80} s={0.7} color="#8A5AB8" />
    </g>,
  ),
  "sun-field": thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#FFF0B0" />
      <Sun x={50} y={34} r={20} />
      <path d="M0 74 Q50 66 100 74 L100 100 L0 100Z" fill="#E8C690" />
    </g>,
  ),
  "shade-tree": thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#BDE6FF" />
      <path d="M0 78 Q50 70 100 78 L100 100 L0 100Z" fill="#8FCB80" />
      <ellipse cx={50} cy={84} rx={36} ry={8} fill="#3A6A8A" opacity={0.3} />
      <FigTree x={50} y={84} s={0.42} />
    </g>,
  ),
  banana: thing(<Banana x={50} y={52} s={1.6} rot={-10} />),
  injera: thing(
    <g>
      <ellipse cx={50} cy={58} rx={40} ry={18} fill="#E6CB98" stroke="#C9A66C" strokeWidth={2} />
      <g fill="#C9A66C">
        {[
          [34, 54],
          [48, 50],
          [62, 56],
          [42, 64],
          [58, 64],
          [70, 52],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={2} />
        ))}
      </g>
    </g>,
  ),
  mango: thing(<Mango x={50} y={52} s={2} />),
  garden: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#BDE6FF" />
      <path d="M0 74 H100 V100 H0Z" fill="#8A5A3A" />
      {[30, 44, 58].map((x) => (
        <path key={x} d={`M${x} 74 q-8 -16 0 -26 q8 10 0 26Z`} fill="#3F9A4E" />
      ))}
      <circle cx={18} cy={62} r={6} fill="#E2463F" />
      <Daisy x={78} y={74} h={26} />
    </g>,
  ),
  stone: thing(<FeelingWeight x={50} y={54} s={2.4} />),
  cloud: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#9FD4FF" />
      <g transform="translate(50 52)">
        <CloudShape s={1} />
      </g>
    </g>,
  ),
  "plate-bread": thing(<Plate x={50} y={60} s={0.85} foods={["bread", "bread", "bread"]} injera={false} />),
  "plate-sweets": thing(<Plate x={50} y={60} s={0.85} foods={["sweets", "sweets", "sweets"]} injera={false} />),
  "plate-rainbow": thing(<Plate x={50} y={60} s={0.85} foods={["misir", "gomen", "carrot", "egg", "tomato"]} />),
  "ayan-wobbly": who(
    <g>
      <Camel who="ayan" mood="worried" />
      <g stroke="#E2763A" strokeWidth={3} fill="none" strokeLinecap="round">
        <path d="M50 160 q-6 6 0 12 q6 6 0 12" />
        <path d="M38 156 q-6 8 0 16 q6 8 0 16" />
      </g>
    </g>,
    "#FFE9C8",
  ),
  "empty-plate": thing(<Plate x={50} y={60} s={0.85} injera={false} />),
  football: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#8FCB80" />
      <Ball x={50} y={50} s={2.2} />
    </g>,
  ),
  sunrise: thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#FFE2B8" />
      <Sun x={50} y={70} r={18} face={false} />
      <path d="M0 72 Q50 62 100 72 L100 100 L0 100Z" fill="#9CCB86" />
    </g>,
  ),
  "sun-high": thing(
    <g>
      <rect width={100} height={100} rx={22} fill="#7FCFFF" />
      <Sun x={50} y={30} r={18} />
      <path d="M0 80 Q50 72 100 80 L100 100 L0 100Z" fill="#8FCB80" />
    </g>,
  ),

  /* ---------- level 3: feelings and my body ---------- */
  "face-happy": face("happy"),
  "face-sad": face("sad"),
  "face-angry": face("angry"),
  "face-worried": face("worried"),
  "face-calm": face("calm"),
  "gugu-butterflies": who(
    <g>
      <Gugu mood="worried" />
      <TummyButterflies x={100} y={186} s={1.4} n={4} />
    </g>,
  ),
  shout: who(
    <g>
      <Cub mood="worried" />
      <path d="M160 70 l14 -10 M164 92 l18 0 M160 114 l14 10" stroke="#E2463F" strokeWidth={5} strokeLinecap="round" />
    </g>,
    "#FFE4E0",
  ),
  "flower-candle": thing(
    <g>
      <SmellFlower x={32} y={90} s={1.3} />
      <Candle x={72} y={90} s={1.3} />
    </g>,
    "#E4F6FF",
  ),
  "throw-toys": who(
    <g>
      <Cub mood="worried" arm="up" />
      <Ball x={180} y={60} s={1.6} />
    </g>,
    "#FFE4E0",
  ),
  "helping-hand": thing(<HelpingHand x={50} y={92} s={0.78} filled={5} />, "#FFF6DD"),
  "high-five": thing(
    <g>
      <path d="M50 22 L56 38 L74 40 L60 52 L64 70 L50 60 L36 70 L40 52 L26 40 L44 38Z" fill="#FFD233" stroke="#E8A800" strokeWidth={2} />
      <g transform="translate(22 66) rotate(-30) scale(0.32)">
        <BigHand x={0} y={60} s={1} view="palm" />
      </g>
      <g transform="translate(78 66) rotate(30) scale(0.32)">
        <BigHand x={0} y={60} s={1} view="palm" flip skin="#C98A4E" />
      </g>
    </g>,
    "#E4F6FF",
  ),
  ayan: who(<Camel who="ayan" mood="joy" />, "#FFE9C8"),
  underwear: thing(<WashingLine x={50} y={34} s={1.3} w={80} />, "#E4F6FF"),
  hands: thing(<BigHand x={50} y={98} s={0.62} view="palm" />, "#E4F6FF"),
  "stop-hand": thing(<StopHand x={50} y={50} s={1.2} />, "#E4F6FF"),
  "flower-cup": thing(<FlowerCup x={50} y={80} s={2.4} />),
  nurse: who(
    <g>
      <Teacher mood="happy" />
      <path d="M66 46 Q100 18 134 46 L128 58 Q100 48 72 58Z" fill="#FFFFFF" stroke="#D3E4F4" strokeWidth={2} />
      <path d="M97 32 H103 V38 H109 V44 H103 V50 H97 V44 H91 V38 H97Z" fill="#2E9A5B" />
    </g>,
  ),
  wolf: who(<Wolf mood="happy" />, "#FFE9C8"),
  "foam-hands": thing(<Foam x={50} y={50} s={2.4} />, "#E4F6FF"),
};
