"use client";

import type { ComponentType, ReactNode } from "react";

import { AuntieSheep, Baby, Camel, Cat, Cub, Grandma, Gugu, Ibex, Mama, Papa, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import {
  AshendaSkirt,
  Book,
  Demera,
  EdirBox,
  GennaStick,
  GrassBundle,
  KnotString,
  LemonPlant,
  Litter,
  Nest,
  NoLitterSign,
  Seedling,
  Spring,
  StormCloud,
  Truck,
  WeaveBasket,
  WeaverBird,
} from "@/components/book/courses/values-character/kit-more";
import {
  Ball,
  Broom,
  CoffeeTray,
  Cup,
  Dabo,
  Drum,
  Feather,
  Gursha,
  Hearth,
  HeavyStone,
  Jebena,
  Jerrycan,
  Kite,
  Mesob,
  Mortar,
  Qetema,
  RoastPan,
  Sandals,
  Sheaf,
  SnackBowl,
  Steam,
  Stool,
  TomatoPlant,
  WashSet,
  WateringCan,
} from "@/components/book/courses/values-character/kit-props";
import { Sheep } from "@/components/book/scenery";
import type { ArtProps } from "../types";

/*
  Small pictures for the Values & Character quiz questions, by id. Each is a square SVG drawn
  with the course's scene kit, so the quizzes look like the stories. No words in the pictures.
*/

function Pic({ size = 96, className, vb = "0 0 100 100", label, children }: ArtProps & { vb?: string; label?: string; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} role={label ? "img" : undefined} aria-hidden={label ? undefined : true} aria-label={label}>
      {children}
    </svg>
  );
}

/** A character from the cast, filling the square. */
const who = (el: ReactNode) =>
  function Who(p: ArtProps) {
    return (
      <Pic {...p} vb="-20 0 240 240">
        {el}
      </Pic>
    );
  };

/** A thing from the kit, centred in a 100 × 100 square. */
const thing = (el: ReactNode, bg = "#FFF6DD") =>
  function Thing(p: ArtProps) {
    return (
      <Pic {...p}>
        <rect width={100} height={100} rx={22} fill={bg} />
        {el}
      </Pic>
    );
  };

/** A little scene of two characters (in the 400 × 300 scene units, cropped square). */
const scene = (el: ReactNode, bg = "#E4F6FF") =>
  function Scene(p: ArtProps) {
    return (
      <Pic {...p} vb="90 90 220 220">
        <rect x={90} y={90} width={220} height={220} rx={44} fill={bg} />
        <path d="M90 250 H310 V266 Q310 310 266 310 H134 Q90 310 90 266Z" fill="#E8C08A" />
        {el}
      </Pic>
    );
  };

const at = (x: number, y: number, s: number, el: ReactNode, flip = false) => <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(-100 -230)`}>{el}</g>;

/** A round face showing a feeling. */
function Face({ mood }: { mood: "happy" | "sad" | "angry" | "worried" | "surprised" | "proud" }) {
  const ink = "#5A3410";
  return (
    <g>
      <circle cx={50} cy={50} r={44} fill="#FFD27A" />
      <circle cx={50} cy={50} r={44} fill="none" stroke="#E8A83A" strokeWidth={3} />
      <ellipse cx={26} cy={60} rx={8} ry={5} fill="#FF8A7A" opacity={0.45} />
      <ellipse cx={74} cy={60} rx={8} ry={5} fill="#FF8A7A" opacity={0.45} />
      {mood === "surprised" ? (
        <g fill={ink}>
          <ellipse cx={36} cy={42} rx={5} ry={7} />
          <ellipse cx={64} cy={42} rx={5} ry={7} />
          <ellipse cx={50} cy={70} rx={8} ry={10} />
        </g>
      ) : mood === "proud" ? (
        <g stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round">
          <path d="M28 44 Q36 36 44 44 M56 44 Q64 36 72 44" />
          <path d="M34 64 Q50 78 66 64" />
        </g>
      ) : (
        <g>
          <g fill={ink}>
            <ellipse cx={36} cy={44} rx={5} ry={6.5} />
            <ellipse cx={64} cy={44} rx={5} ry={6.5} />
          </g>
          {mood === "angry" && <path d="M26 32 L44 38 M74 32 L56 38" stroke={ink} strokeWidth={4} strokeLinecap="round" />}
          {(mood === "sad" || mood === "worried") && <path d="M26 36 L42 31 M74 36 L58 31" stroke={ink} strokeWidth={3.4} strokeLinecap="round" />}
          <path
            d={mood === "happy" ? "M32 62 Q50 80 68 62" : mood === "sad" ? "M34 74 Q50 62 66 74" : mood === "angry" ? "M34 72 Q50 64 66 72" : "M34 70 Q42 64 50 70 Q58 76 66 70"}
            stroke={ink}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
          />
          {mood === "sad" && <path d="M64 52 Q60 60 64 64 Q68 60 64 52Z" fill="#7FC8F8" />}
        </g>
      )}
    </g>
  );
}
const face = (mood: Parameters<typeof Face>[0]["mood"]) =>
  function F(p: ArtProps) {
    return (
      <Pic {...p}>
        <Face mood={mood} />
      </Pic>
    );
  };

/** The three magic words as pictures. */
function WordPic({ word }: { word: "please" | "thanks" | "sorry" }) {
  return (
    <g transform="translate(50 52) scale(2.6)">
      {word === "please" && (
        <g>
          <ellipse cx={0} cy={3} rx={10} ry={7} fill="#5A3A2A" />
          <path d="M-8 -1 l-2 -7 M-3 -3 l-1 -8 M3 -3 l1 -8 M8 -1 l2 -7" stroke="#5A3A2A" strokeWidth={3.4} strokeLinecap="round" />
          <circle cx={0} cy={0} r={3} fill="#FFD233" />
        </g>
      )}
      {word === "thanks" && <path d="M0 10 C-13 0 -11 -12 -2 -12 C0 -12 0 -10 0 -8 C0 -10 0 -12 2 -12 C11 -12 13 0 0 10Z" fill="#E2463F" />}
      {word === "sorry" && (
        <g>
          <path d="M0 10 C-13 0 -11 -12 -2 -12 C0 -12 0 -10 0 -8 C0 -10 0 -12 2 -12 C11 -12 13 0 0 10Z" fill="#FF8FB1" />
          <rect x={-10} y={-4} width={20} height={7} rx={3.5} fill="#F2D3A2" transform="rotate(-30)" />
        </g>
      )}
    </g>
  );
}
const word = (w: "please" | "thanks" | "sorry") =>
  function W(p: ArtProps) {
    return (
      <Pic {...p}>
        <rect width={100} height={100} rx={22} fill="#E4F7EA" />
        <WordPic word={w} />
      </Pic>
    );
  };

const BrokenCup = (
  <g transform="translate(50 64) scale(2.2)">
    <path d="M-14 0 L-8 -8 L-2 -2Z M2 0 L8 -10 L14 -1Z M-4 4 L4 -2 L8 4Z" fill="#FFFFFF" stroke="#C8C0B0" />
    <path d="M-12 -2 H-4" stroke="#2E9A8A" strokeWidth={1.4} />
  </g>
);

const Money = (
  <g transform="translate(50 52) scale(2)">
    <rect x={-16} y={-9} width={32} height={18} rx={2} fill="#9FCB8A" stroke="#5A8A4A" strokeWidth={1.4} />
    <circle cx={0} cy={0} r={4.6} fill="none" stroke="#5A8A4A" strokeWidth={1.4} />
  </g>
);

export const ART: Record<string, ComponentType<ArtProps>> = {
  /* people */
  grandma: who(<Grandma mood="joy" />),
  grandpa: who(<Wolf elder mood="happy" />),
  mama: who(<Mama mood="joy" baby="sleep" />),
  baby: thing(<g transform="translate(54 56) scale(2)"><Baby face="sleep" /></g>, "#E4F6FF"),
  friend: who(<Gugu mood="joy" pose="wave" />),
  tsehay: who(<Tsehay mood="joy" />),
  hawi: who(<Wolf mood="joy" />),
  guest: who(<Camel who="hooyo" mood="joy" />),
  haben: who(<Ibex mood="joy" pose="wave" />),
  anbessa: who(<Cub mood="joy" />),
  auntie: who(<AuntieSheep mood="joy" />),
  cat: thing(<g transform="translate(50 86) scale(1.1)"><Cat mood="wow" /></g>, "#EEF0F6"),

  /* little scenes */
  bow: scene(
    <g>
      {at(150, 290, 0.55, <Wolf elder mood="joy" />)}
      <g transform="rotate(24 260 290)">{at(260, 290, 0.5, <Cub mood="joy" />, true)}</g>
    </g>,
  ),
  "stay-seated": scene(
    <g>
      {at(140, 290, 0.55, <Wolf elder mood="worried" />)}
      {at(270, 290, 0.45, <Cub mood="happy" look={3} />, true)}
      <g transform="translate(320 270)">
        <Ball x={0} y={0} s={1.4} />
      </g>
    </g>,
  ),
  hug: scene(
    <g>
      {at(170, 290, 0.55, <Cub mood="joy" arm="give" />)}
      {at(250, 290, 0.55, <Gugu mood="joy" pose="wave" />, true)}
    </g>,
  ),
  greet: scene(
    <g>
      {at(140, 290, 0.55, <Camel who="hooyo" mood="joy" />)}
      {at(270, 290, 0.5, <Cub mood="joy" arm="up" />, true)}
    </g>,
    "#FFF0E0",
  ),
  seat: scene(
    <g>
      <Stool x={180} y={282} s={2} />
      {at(290, 290, 0.5, <Cub mood="joy" arm="reach" />, true)}
    </g>,
    "#FFF0E0",
  ),
  "wash-hands": scene(
    <g>
      {at(140, 290, 0.55, <Wolf elder mood="joy" />)}
      <WashSet x={220} y={288} s={2.2} pour />
    </g>,
    "#FFF0E0",
  ),
  food: scene(
    <g>
      <Mesob x={200} y={292} s={1.6} rx={70} />
    </g>,
    "#FFF0E0",
  ),
  goodbye: scene(
    <g>
      {at(150, 290, 0.5, <Cub mood="joy" arm="up" />)}
      {at(260, 290, 0.5, <Ibex grown mood="joy" pose="wave" />, true)}
    </g>,
    "#E4F6FF",
  ),
  "help-carry": scene(
    <g>
      {at(150, 290, 0.5, <Gugu mood="joy" />)}
      <Jerrycan x={200} y={272} s={1.6} />
      {at(250, 290, 0.5, <Wolf mood="joy" />, true)}
    </g>,
  ),
  "debo-work": scene(
    <g>
      <Sheaf x={130} y={280} s={1.8} />
      <Sheaf x={200} y={284} s={2} />
      <Sheaf x={270} y={280} s={1.8} />
      {at(110, 300, 0.36, <Cub mood="joy" />)}
      {at(290, 300, 0.36, <Gugu mood="joy" />, true)}
    </g>,
    "#FFF4D0",
  ),
  "keep-alone": scene(
    <g>
      {at(200, 290, 0.6, <Cub mood="happy" arm="hold" item={<SnackBowl x={0} y={10} s={0.9} kind="kolo" />} />)}
    </g>,
  ),

  /* faces */
  "face-happy": face("happy"),
  "face-sad": face("sad"),
  "face-angry": face("angry"),
  "face-worried": face("worried"),
  "face-surprised": face("surprised"),
  "face-proud": face("proud"),

  /* magic words */
  please: word("please"),
  thanks: word("thanks"),
  sorry: word("sorry"),

  /* things */
  bread: thing(<Dabo x={50} y={70} s={1.3} />),
  "broken-cup": thing(BrokenCup),
  broom: thing(<Broom x={50} y={86} s={1.1} />),
  stone: thing(<HeavyStone x={50} y={74} size={1.6} />, "#EEF0F6"),
  feather: thing(<Feather x={50} y={50} delay={0} />, "#E4F6FF"),
  jerrycan: thing(<Jerrycan x={50} y={82} s={1.4} />),
  sandals: thing(<g transform="translate(50 50) rotate(90)"><Sandals x={0} y={0} s={1.9} /></g>),
  "shoe-shelf": thing(
    <g transform="translate(50 64)">
      <ellipse cx={-24} cy={10} rx={11} ry={8} fill="#9C98A6" />
      <ellipse cx={24} cy={10} rx={11} ry={8} fill="#8E8AA0" />
      <rect x={-40} y={-2} width={80} height={9} rx={3} fill="#9A6236" />
      <g transform="translate(0 -14) rotate(90)">
        <Sandals x={0} y={0} s={1} />
      </g>
    </g>,
  ),
  "bread-basket": thing(
    <g transform="translate(50 72)">
      <path d="M-30 -30 L-24 0 L24 0 L30 -30Z" fill="#D9A04A" />
      <path d="M-29 -20 H29 M-27 -10 H27" stroke="#E2463F" strokeWidth={2.4} />
      <ellipse cx={0} cy={-30} rx={30} ry={7} fill="#B8802A" />
    </g>,
  ),
  "toy-basket": thing(
    <g transform="translate(50 70)">
      <path d="M-30 -14 L-24 14 L24 14 L30 -14Z" fill="#D9A04A" />
      <path d="M-29 -2 H29 M-27 6 H27" stroke="#2E9A8A" strokeWidth={2.4} />
      <Ball x={-6} y={-18} s={1.2} />
    </g>,
  ),
  "cup-shelf": thing(
    <g transform="translate(50 60)">
      <rect x={-38} y={6} width={76} height={7} rx={2} fill="#8A5A3A" />
      <Cup x={-18} y={6} s={1.6} full={false} />
      <Cup x={0} y={6} s={1.6} full={false} />
      <Cup x={18} y={6} s={1.6} full={false} />
    </g>,
  ),
  cup: thing(<Cup x={50} y={66} s={3} full />),
  ball: thing(<Ball x={50} y={52} s={2.6} />, "#E4F6FF"),
  tomato: thing(<TomatoPlant x={50} y={90} s={1.4} ripe tied />, "#E4F7EA"),
  money: thing(Money, "#E4F7EA"),
  kite: thing(<Kite x={50} y={44} s={1} />, "#E4F6FF"),
  gursha: thing(<g transform="translate(50 54)"><Gursha s={3.4} /></g>),
  mesob: thing(<Mesob x={50} y={92} s={0.62} rx={70} />),
  stool: thing(<Stool x={50} y={80} s={1.5} />),
  wash: thing(<WashSet x={46} y={86} s={1.6} />),
  cups: thing(<CoffeeTray x={50} y={74} s={0.8} full={6} />),
  jebena: thing(<Jebena x={50} y={84} s={1.3} steam />),
  grass: thing(<Qetema x={50} y={50} w={90} />, "#E4F7EA"),
  roast: thing(<RoastPan x={42} y={66} s={1.2} dark />),
  grind: thing(<Mortar x={50} y={86} s={1.5} />),
  popcorn: thing(<SnackBowl x={50} y={72} s={1.6} kind="popcorn" />),
  kolo: thing(<SnackBowl x={50} y={72} s={1.6} kind="kolo" />),
  sheaf: thing(<Sheaf x={50} y={86} s={1.5} />, "#FFF4D0"),
  heart: thing(<path d="M50 80 C20 58 26 26 44 26 C48 26 50 30 50 34 C50 30 52 26 56 26 C74 26 80 58 50 80Z" fill="#E2463F" />, "#FFE9EE"),

  /* level 4 to 6 */
  ayan: who(<Camel who="ayan" mood="joy" />),
  basket: thing(<WeaveBasket x={50} y={80} s={1.5} rows={6} lid />, "#FFF4D0"),
  "wobbly-basket": thing(<WeaveBasket x={50} y={80} s={1.5} rows={4} lid lopsided old />, "#FFF4D0"),
  "give-up": scene(
    <g>
      {at(170, 290, 0.6, <Wolf mood="worried" ears="flat" />)}
      <GrassBundle x={262} y={286} s={1.6} loose />
    </g>,
    "#FFF0E0",
  ),
  "try-again": scene(
    <g>
      {at(160, 290, 0.6, <Wolf mood="joy" arm="give" item={<GrassBundle x={0} y={8} s={0.7} />} />)}
      <WeaveBasket x={262} y={288} s={1.6} rows={3} />
    </g>,
    "#FFF0E0",
  ),
  "climb-high": scene(
    <g>
      <path d="M90 200 Q200 176 310 186" stroke="#7A5236" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M110 150 q30 -30 70 -10 q40 -30 80 0 q30 -10 50 20 Q200 190 110 150Z" fill="#3E9B5A" />
      {at(230, 196, 0.36, <Gugu mood="worried" />)}
    </g>,
    "#E4F6FF",
  ),
  "ask-help": scene(
    <g>
      {at(150, 290, 0.5, <Gugu mood="happy" pose="wave" />)}
      {at(262, 290, 0.56, <Papa mood="joy" pose="wave" />, true)}
    </g>,
    "#E4F6FF",
  ),
  "hot-pot": thing(
    <g transform="translate(50 78) scale(1.5)">
      <Hearth x={0} y={0} />
    </g>,
  ),
  seed: thing(<LemonPlant x={50} y={86} s={1.7} stage={0} />, "#E4F7EA"),
  sprout: thing(<LemonPlant x={50} y={86} s={1.7} stage={1} />, "#E4F7EA"),
  "lemon-tree": thing(<LemonPlant x={50} y={92} s={0.9} stage={5} />, "#E4F7EA"),
  watering: thing(<WateringCan x={46} y={64} s={1.8} pour />, "#E4F6FF"),
  book: thing(<Book x={50} y={56} s={2.4} />, "#E4F6FF"),
  "read-aloud": scene(
    <g>
      {at(170, 290, 0.56, <Ibex mood="happy" pose="point" />)}
      <Book x={250} y={226} s={1.6} />
    </g>,
    "#E4F6FF",
  ),
  storm: thing(<StormCloud x={50} y={52} size={0.9} bolt />, "#EEF0F6"),
  "coffee-breath": thing(
    <g>
      <Cup x={50} y={84} s={3.2} />
      <Steam x={50} y={46} />
    </g>,
  ),
  lamb: thing(<Sheep x={50} y={62} s={0.9} />, "#E4F7EA"),
  drum: thing(<Drum x={50} y={74} s={1.6} />),
  "left-out": scene(
    <g>
      <rect x={100} y={250} width={110} height={30} rx={4} fill="#C9A06A" />
      {at(160, 256, 0.44, <Camel who="abdi" mood="sad" />)}
      <Ball x={286} y={274} s={1.4} />
    </g>,
    "#E4F6FF",
  ),
  "join-in": scene(
    <g>
      {at(150, 290, 0.5, <Camel who="abdi" mood="joy" item={<Ball x={0} y={0} s={1.2} />} />)}
      {at(262, 290, 0.5, <Camel who="ayan" mood="joy" />, true)}
    </g>,
    "#E4F6FF",
  ),
  quarrel: scene(
    <g>
      {at(150, 290, 0.5, <Gugu mood="worried" />)}
      {at(262, 290, 0.5, <Ibex mood="worried" />, true)}
      <StormCloud x={200} y={150} size={0.8} bolt />
    </g>,
    "#EEF0F6",
  ),
  "speaking-stick": thing(
    <g transform="translate(50 54) rotate(20)">
      <rect x={-4} y={-38} width={8} height={80} rx={4} fill="#7A5236" />
      <circle cx={0} cy={-38} r={7} fill="#8A6040" />
    </g>,
  ),
  knots: thing(<KnotString x={10} y={50} n={4} total={7} />),
  truck: thing(<Truck x={56} y={72} s={0.55} />, "#E4F6FF"),
  "edir-box": thing(<EdirBox x={50} y={80} s={1.4} open />),
  soup: thing(
    <g transform="translate(50 70) scale(2.2)">
      <path d="M-16 -14 Q-18 2 -8 4 L8 4 Q18 2 16 -14Z" fill="#8A4A2A" />
      <ellipse cx={0} cy={-14} rx={16} ry={4} fill="#E8A86A" />
      <Steam x={0} y={-22} />
    </g>,
  ),
  "sick-bed": scene(
    <g>
      <rect x={110} y={270} width={180} height={14} rx={7} fill="#2E9A8A" />
      {at(200, 286, 0.5, <Wolf elder mood="worried" sleepy />)}
    </g>,
    "#FFF0E0",
  ),
  nest: thing(<Nest x={50} y={50} s={2.6} />, "#E4F7EA"),
  chick: thing(<WeaverBird x={50} y={70} s={2.6} chick />, "#E4F7EA"),
  bird: thing(<WeaverBird x={46} y={64} s={2.6} />, "#E4F6FF"),
  box: thing(
    <g transform="translate(50 74) scale(1.8)">
      <path d="M-16 0 L-16 -20 L16 -20 L16 0Z" fill="#C9A06A" />
      <path d="M-16 -20 L-6 -28 L26 -28 L16 -20Z" fill="#D9B080" />
      <path d="M16 0 L26 -8 L26 -28 L16 -20Z" fill="#B88A50" />
    </g>,
  ),
  "water-dish": thing(
    <g>
      <ellipse cx={50} cy={78} rx={34} ry={9} fill="#B8683E" />
      <ellipse cx={50} cy={76} rx={28} ry={6} fill="#9FD4F0" />
      <WeaverBird x={42} y={66} s={1.4} />
    </g>,
    "#E4F7EA",
  ),
  litter: thing(
    <g>
      <Litter x={36} y={70} kind="bag" s={2} />
      <Litter x={70} y={80} kind="bottle" s={1.6} rot={60} />
    </g>,
    "#F4EEE0",
  ),
  "bin-sign": thing(<NoLitterSign x={50} y={96} s={1.2} />, "#E4F7EA"),
  seedling: thing(<Seedling x={50} y={88} s={2.4} />, "#E4F7EA"),
  "spring-clean": thing(
    <g transform="translate(50 66) scale(0.4)">
      <Spring x={0} y={0} bright />
    </g>,
    "#E4F7EA",
  ),
  "spring-dirty": thing(
    <g>
      <g transform="translate(50 66) scale(0.4)">
        <Spring x={0} y={0} dirty />
      </g>
      <Litter x={40} y={62} kind="bag" s={0.8} />
      <Litter x={62} y={66} kind="bottle" s={0.8} rot={70} />
    </g>,
    "#F4EEE0",
  ),
  demera: thing(<Demera x={50} y={96} s={0.5} lit />, "#3A4488"),
  plate: thing(
    <g transform="translate(50 64) scale(2.6)">
      <ellipse cx={0} cy={2} rx={16} ry={4} fill="#E8E2D2" stroke="#B8AE98" />
      <path d="M-12 1 Q-10 -12 0 -13 Q10 -12 12 1Z" fill="#E2463F" />
      <path d="M-6 -6 h4 M2 -9 h4 M-2 -2 h5" stroke="#FFD233" strokeWidth={2} strokeLinecap="round" />
    </g>,
  ),
  genna: thing(
    <g transform="translate(42 20) scale(1.6)">
      <GennaStick ball />
    </g>,
    "#E4F7EA",
  ),
  ashenda: who(
    <g>
      <Ibex mood="joy" pose="wave" />
      <AshendaSkirt />
    </g>,
  ),
  irreecha: thing(
    <g>
      <path d="M0 60 Q50 50 100 60 V100 H0Z" fill="#5BB8E8" />
      <GrassBundle x={50} y={66} s={1.8} />
    </g>,
    "#E4F7EA",
  ),
};
