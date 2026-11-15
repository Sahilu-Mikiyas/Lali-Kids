"use client";

import type { ComponentType, ReactNode } from "react";

import { Acacia, CloudShape } from "@/components/book/scenery";
import { Camel, Cub, Gugu, Ibex, Wolf } from "@/components/book/courses/science-nature/kit-cast";
import { BodyChart, Food, GroupSign, Heart, Lungs, SenseIcon, Smile, Tooth, type FoodKind, type Sense, type ToothKind } from "@/components/book/courses/science-nature/kit-body";
import { Kebero, Krar, Mitad } from "@/components/book/courses/science-nature/kit-crafts";
import { BananaPeel, BoxKrar, Dam, GoCart, Lever, Magnet, PlasticBag, RampBarrel, RingSeedling, Small, SolarLamp, Torch, Well, type SmallThing } from "@/components/book/courses/science-nature/kit-forces";
import { Volcano } from "@/components/book/courses/science-nature/kit-land";
import { Basalt, BottleFilter, EarthBall, Fluffy, LavaLake, MoonPhase, OrionBelt, Pinwheel, RainBarrel, Rainbow, SoilJar, StormTower, SunDisc, Vapour, WaterCycle } from "@/components/book/courses/science-nature/kit-sky";
import { Bean, BeanJar, Caterpillar, Chick, Chrysalis, Cow, Egg, Fish, Frog, FrogSpawn, Goat, Hen, JarTag, LemonLeaf, Pebble, StrawNest, Swallowtail, Tadpole, Worm } from "@/components/book/courses/science-nature/kit-life";
import { ButterPan, Frost, Hailstones, IceCube, InTub, Puddle, SteamPot, TeaGlass, Thing, Tub, type ThingKind } from "@/components/book/courses/science-nature/kit-stuff";
import type { ArtProps } from "../types";

/*
  Small pictures for the Science & Nature quiz questions, by id. Square SVGs drawn with the course's
  kits (the cast, living things, the body, materials), so the quizzes look like the stories. No words
  in the pictures.
*/

function Pic({ size = 96, className, vb = "0 0 100 100", children }: ArtProps & { vb?: string; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox={vb} className={className} aria-hidden>
      {children}
    </svg>
  );
}

/** A thing centred in a 100 x 100 square on a soft background. */
const thing = (el: ReactNode, bg = "#FFF6DD") =>
  function Thing100(p: ArtProps) {
    return (
      <Pic {...p}>
        <rect width={100} height={100} rx={14} fill={bg} />
        {el}
      </Pic>
    );
  };

/** A character from the cast, filling the square. */
const who = (el: ReactNode, bg = "#E8F4FB") =>
  function Who(p: ArtProps) {
    return (
      <Pic {...p} vb="-20 0 240 240">
        <rect x={-20} width={240} height={240} rx={34} fill={bg} />
        {el}
      </Pic>
    );
  };

const small = (k: SmallThing, s = 2.5) => thing(<Small kind={k} x={50} y={56} s={s} />, "#F2EEE6");
const moon = (phase: number) => thing(<MoonPhase x={50} y={50} r={30} phase={phase} />, "#141A4A");
const food = (k: FoodKind) => thing(<Food kind={k} x={50} y={52} s={1.9} />, "#FFF6DD");
const sense = (k: Sense) => thing(<SenseIcon kind={k} x={50} y={50} s={1.7} />, "#F4ECFA");
const tooth = (k: ToothKind) => thing(<Tooth kind={k} x={50} y={56} s={2.4} />, "#FDECEE");
const mat = (k: ThingKind, s = 2.2, y = 66) => thing(<Thing kind={k} x={50} y={y} s={s} />, "#F2EEE6");
const tub = (k: ThingKind, floats: boolean) =>
  thing(
    <g transform="translate(50 92) scale(0.48)">
      <Tub x={0} y={0}>
        <InTub x={0} floats={floats} delay={0}>
          <Thing kind={k} s={1.8} />
        </InTub>
      </Tub>
    </g>,
    "#E8F4FB",
  );
const body = (layer: "skin" | "bones" | "muscles" | "inside", glow?: string) =>
  function Body(p: ArtProps) {
    return (
      <Pic {...p}>
        <rect width={100} height={100} rx={14} fill={layer === "skin" ? "#E8F4FB" : "#14283E"} />
        <BodyChart x={50} y={98} s={0.46} layer={layer} glow={glow} tap={false} />
      </Pic>
    );
  };

export const ART: Record<string, ComponentType<ArtProps>> = {
  // living and not living
  cow: thing(<Cow x={46} y={82} s={1} />, "#E4F4DC"),
  stone: thing(<Pebble x={50} y={70} s={2.4} />, "#EEF0F4"),
  tree: thing(<Acacia x={50} y={88} s={0.9} />, "#DDF0FF"),
  cloud: thing(<g transform="translate(50 50) scale(0.9)"><CloudShape /></g>, "#BFE4FA"),
  bean: thing(<Bean x={50} y={62} s={3.4} />),
  "bean-open": thing(<Bean x={50} y={78} s={3.4} open />),
  "dry-leaf": thing(<path d="M20 60 Q44 30 82 50 Q46 76 20 60Z M20 60 L78 50" fill="#B8803A" stroke="#8A5A2A" strokeWidth={2} />),
  nest: thing(<StrawNest x={50} y={74} s={1.3}><Chick x={-12} y={-4} s={0.8} /><Chick x={10} y={-4} s={0.8} flip /></StrawNest>, "#E4F4DC"),
  worm: thing(<Worm x={50} y={56} s={2.4} />, "#E8D8C0"),
  // plants
  "jar-light": thing(<BeanJar x={50} y={86} s={0.85} stage={4} label={<JarTag kind="sun" />} />, "#FFF4D0"),
  "jar-dark": thing(<BeanJar x={50} y={86} s={0.85} stage={4} dark label={<JarTag kind="dark" />} />, "#DCDCEC"),
  "jar-dry": thing(<BeanJar x={50} y={86} s={0.85} stage={0} dry label={<JarTag kind="dry" />} />, "#F4ECE0"),
  "jar-root": thing(<BeanJar x={50} y={86} s={0.85} stage={1} />, "#E8F4FB"),
  "jar-shoot": thing(<BeanJar x={50} y={86} s={0.85} stage={2} />, "#E8F4FB"),
  "jar-leaves": thing(<BeanJar x={50} y={86} s={0.85} stage={4} />, "#E8F4FB"),
  "jar-seed": thing(<BeanJar x={50} y={86} s={0.85} stage={0} />, "#E8F4FB"),
  // frogs
  frogspawn: thing(<FrogSpawn x={50} y={50} s={2.2} />, "#CFEAF0"),
  tadpole: thing(<Tadpole x={54} y={50} s={3.2} swim={false} />, "#CFEAF0"),
  "tadpole-legs": thing(<Tadpole x={54} y={50} s={3.2} legs={2} swim={false} />, "#CFEAF0"),
  froglet: thing(<Frog x={52} y={66} s={2.4} froglet />, "#CFEAF0"),
  frog: thing(<Frog x={50} y={70} s={2.8} />, "#CFEAF0"),
  // butterflies
  "leaf-egg": thing(<LemonLeaf x={8} y={54} s={2.2} egg />, "#E8F2D8"),
  caterpillar: thing(<Caterpillar x={22} y={60} s={1.6} munch={false} />, "#E8F2D8"),
  chrysalis: thing(<g transform="translate(50 20)"><Chrysalis x={0} y={0} s={2.4} /></g>, "#E8F2D8"),
  butterfly: thing(<Swallowtail x={50} y={50} s={1.4} flap={false} />, "#FFF4D8"),
  // hens and young animals
  egg: thing(<Egg x={50} y={78} s={2.4} />, "#FFF4D8"),
  "egg-hatching": thing(<Egg x={50} y={78} s={2.4} crack={2} />, "#FFF4D8"),
  chick: thing(<Chick x={50} y={78} s={2.8} />, "#FFF4D8"),
  hen: thing(<Hen x={46} y={84} s={1.3} />, "#FFF4D8"),
  "hen-sitting": thing(<StrawNest x={50} y={82} s={1.4}><Hen x={0} y={-4} s={0.9} sit /></StrawNest>, "#FFF4D8"),
  calf: thing(<g><Cow x={34} y={84} s={0.8} /><Cow x={60} y={86} s={0.8} calf /></g>, "#E4F4DC"),
  kid: thing(<g><Goat x={36} y={82} s={0.9} /><Goat x={66} y={84} s={0.9} kid /></g>, "#E4F4DC"),
  fish: thing(<Fish x={50} y={50} s={2.6} />, "#BFE4FA"),
  // habitats
  pond: thing(<g><rect y={50} width={100} height={50} fill="#5FB0C8" /><path d="M10 50 q-2 -24 4 -34 M18 50 q2 -20 6 -30" stroke="#4E8A3A" strokeWidth={3} fill="none" /><Frog x={66} y={52} s={1.4} /></g>, "#DDF0FF"),
  desert: thing(<g><rect y={60} width={100} height={40} fill="#F0D090" /><circle cx={78} cy={22} r={12} fill="#FFC21E" /><g transform="translate(46 92) scale(0.3) translate(-100 -230)"><Camel /></g></g>, "#CFE8F8"),
  mountain: thing(<g><path d="M0 100 L0 56 L24 50 L34 20 L44 18 L52 50 L100 56 L100 100Z" fill="#8A8A9A" /><g transform="translate(62 70) scale(0.22) translate(-100 -230)"><Ibex /></g></g>, "#CFE6F7"),
  forest: thing(<g><rect y={70} width={100} height={30} fill="#4E8A3A" />{[16, 40, 66, 88].map((x, i) => <g key={x}><path d={`M${x} 80 V40`} stroke="#6A4428" strokeWidth={4} /><circle cx={x} cy={36} r={16} fill={i % 2 ? "#2E7A3E" : "#3E9B5A"} /></g>)}</g>, "#CFE8F8"),
  // the cast
  anbessa: who(<Cub />),
  gugu: who(<Gugu />),
  hawi: who(<Wolf />),
  haben: who(<Ibex />),
  // the senses
  eye: sense("see"),
  ear: sense("hear"),
  nose: sense("smell"),
  tongue: sense("taste"),
  hand: sense("touch"),
  // the body
  body: body("skin"),
  skeleton: body("bones"),
  skull: body("bones", "skull"),
  ribs: body("bones", "ribs"),
  knee: body("bones", "knee"),
  muscles: body("muscles"),
  inside: body("inside"),
  heart: thing(<Heart x={50} y={54} s={2.6} beat={false} />, "#FDECEE"),
  "heart-fast": thing(<Heart x={50} y={54} s={2.6} fast />, "#FDECEE"),
  lungs: thing(<Lungs x={50} y={56} s={1.6} breathe={false} />, "#FDECEE"),
  fist: thing(<path d="M30 74 Q22 46 32 34 Q46 24 64 30 Q78 36 76 56 Q74 76 54 80Z M34 40 Q50 36 72 44 M32 52 Q50 48 76 56 M34 64 Q50 60 74 68" fill="#9A6646" stroke="#7E5236" strokeWidth={2} />, "#FFF4D8"),
  // teeth
  incisor: tooth("incisor"),
  canine: tooth("canine"),
  molar: tooth("molar"),
  smile: thing(<Smile x={50} y={54} s={0.62} />, "#FDECEE"),
  "smile-gap": thing(<Smile x={50} y={54} s={0.62} gap={4} />, "#FDECEE"),
  wolf: who(<Wolf mood="joy" />, "#E4F4DC"),
  // food
  injera: food("injera"),
  bread: food("bread"),
  maize: food("maize"),
  potato: food("potato"),
  beans: food("beans"),
  lentils: food("lentils"),
  "egg-food": food("egg"),
  milk: food("milk"),
  "fish-food": food("fish"),
  gomen: food("gomen"),
  carrot: food("carrot"),
  tomato: food("tomato"),
  banana: food("banana"),
  mango: food("mango"),
  orange: food("orange"),
  avocado: food("avocado"),
  go: thing(<GroupSign group="go" x={50} y={50} s={2} />),
  grow: thing(<GroupSign group="grow" x={50} y={50} s={2} />),
  glow: thing(<GroupSign group="glow" x={50} y={50} s={2} />),
  // materials
  "wood-spoon": mat("wood-spoon", 2, 56),
  "metal-spoon": mat("metal-spoon", 2, 56),
  key: mat("key", 2.4, 60),
  cap: mat("cap", 3, 62),
  basket: mat("basket", 2.2, 74),
  cloth: mat("cloth", 2.4, 70),
  pot: mat("pot", 2, 82),
  jerrycan: mat("jerrycan", 1.8, 84),
  "clay-ball": mat("clay-ball", 2.4, 74),
  "clay-boat": mat("clay-boat", 2, 64),
  coin: mat("coin", 3.4, 60),
  log: mat("log", 1, 60),
  // floating and sinking
  "tub-spoon": tub("wood-spoon", true),
  "tub-stone": tub("stone", false),
  "tub-key": tub("key", false),
  "tub-log": tub("log", true),
  "tub-orange": tub("orange", true),
  "tub-peeled": tub("orange-peeled", false),
  "tub-ball": tub("clay-ball", false),
  "tub-boat": tub("clay-boat", true),
  "tub-coin": tub("coin", false),
  "orange-whole": mat("orange", 2.6, 76),
  "orange-peeled": mat("orange-peeled", 2.8, 76),
  // changes
  hail: thing(<Hailstones x={50} y={70} s={2} n={9} />, "#BFD8EE"),
  ice: thing(<IceCube x={50} y={70} s={2} />, "#DDF0FF"),
  water: thing(<Puddle x={50} y={64} s={1.3} />, "#F4ECE0"),
  steam: thing(<SteamPot x={50} y={92} s={0.9} lid="off" />, "#B8C8DC"),
  "lid-drops": thing(<SteamPot x={40} y={110} s={0.9} lid="held" />, "#B8C8DC"),
  frost: thing(<g><rect y={60} width={100} height={40} fill="#8FCB80" /><Frost y={92} x0={4} x1={100} /><Frost y={74} x0={8} x1={100} /></g>, "#DDEEFF"),
  "butter-solid": thing(<ButterPan x={50} y={72} s={1.4} state="solid" />),
  "butter-melted": thing(<ButterPan x={50} y={72} s={1.4} state="liquid" />),
  "tea-sugar": thing(<TeaGlass x={50} y={86} s={1.3} sugar="heap" steam={false} />, "#FFF4D8"),
  "tea-sweet": thing(<TeaGlass x={50} y={86} s={1.3} sugar="gone" steam={false} />, "#FFF4D8"),
  "sand-water": thing(<TeaGlass x={50} y={86} s={1.3} sand steam={false} />, "#F4ECE0"),
  batter: thing(<Mitad x={50} y={56} s={0.55} injera="batter" fire={false} />, "#F4ECE0"),
  "injera-cooked": thing(<Mitad x={50} y={56} s={0.55} injera="eyes" fire={false} />, "#F4ECE0"),
  // weather, water and seasons (level 4)
  sun: thing(<SunDisc x={50} y={50} r={22} />, "#BFE4FA"),
  vapour: thing(<g><rect y={70} width={100} height={30} fill="#4FA8E0" /><Vapour x={50} y={66} n={3} s={1.8} /><SunDisc x={82} y={18} r={10} /></g>, "#BFE4FA"),
  "cloud-white": thing(<Fluffy x={50} y={50} s={0.9} color="#FFFFFF" />, "#8FC8F0"),
  rain: thing(<g><Fluffy x={50} y={34} s={0.8} color="#C8D4E4" /><path d="M30 56 l-4 12 M46 60 l-4 12 M62 56 l-4 12 M78 60 l-4 12" stroke="#2F7FC0" strokeWidth={3} strokeLinecap="round" /></g>, "#DDEEFA"),
  storm: thing(<StormTower x={50} y={50} s={0.55} bolt />, "#8A9AB8"),
  rainbow: thing(<g><Rainbow x={50} y={90} r={44} w={4} /></g>, "#BFE4FA"),
  wind: thing(<Pinwheel x={50} y={50} s={1.6} spin={false} />, "#DDF0FF"),
  "water-cycle": thing(<g transform="scale(0.25)"><WaterCycle step={4} /></g>, "#BFE4FA"),
  "rain-barrel": thing(<RainBarrel x={50} y={88} s={1.2} fill={0.7} />, "#E4F4DC"),
  filter: thing(<BottleFilter x={50} y={64} s={0.85} drip={false} />, "#F4ECE0"),
  // Earth and sky (level 5)
  earth: thing(<EarthBall x={50} y={50} r={36} turn={0.8} />, "#0E1440"),
  "earth-night": thing(<EarthBall x={50} y={50} r={36} turn={0.22} />, "#0E1440"),
  "moon-new": moon(0),
  "moon-crescent": moon(1),
  "moon-half": moon(2),
  "moon-full": moon(4),
  "moon-half-late": moon(6),
  orion: thing(<OrionBelt x={50} y={50} s={0.9} />, "#141A4A"),
  volcano: thing(<Volcano x={50} y={84} s={0.62} />, "#3A2A48"),
  "lava-lake": thing(<LavaLake x={50} y={56} s={0.42} />, "#2A2238"),
  basalt: thing(<Basalt x={50} y={60} s={1.4} />, "#E8E4EE"),
  "soil-jar": thing(<SoilJar x={50} y={88} s={1} />, "#F4ECE0"),
  // forces, light, sound and our planet (level 6)
  magnet: thing(<Magnet x={50} y={50} s={1.8} />, "#FFE8E8"),
  nail: small("nail"),
  clip: small("clip"),
  needle: small("needle"),
  "spoon-wood": small("spoon-wood"),
  "cup-plastic": small("cup-plastic"),
  "pot-alu": small("pot-alu", 2.2),
  paper: small("paper"),
  pulley: thing(<Well x={50} y={92} s={0.42} bucket="up" />, "#DDF0FF"),
  lever: thing(<Lever x={50} y={80} s={0.42} lifted />, "#E4F4DC"),
  ramp: thing(<RampBarrel x={50} y={86} s={0.4} at={0.6} />, "#E4F4DC"),
  cart: thing(<GoCart x={50} y={74} s={1} rope={false} />, "#E4F4DC"),
  torch: thing(<Torch x={14} y={50} s={0.6} len={70} />, "#141A3A"),
  krar: thing(<Krar x={50} y={92} s={0.9} />, "#F4ECFA"),
  kebero: thing(<Kebero x={50} y={86} s={1.2} />, "#F4ECFA"),
  "box-krar": thing(<BoxKrar x={50} y={66} s={0.85} tuned />, "#F4ECFA"),
  "plastic-bag": thing(<PlasticBag x={50} y={52} s={2.4} flap={false} />, "#DDF0FF"),
  "banana-peel": thing(<BananaPeel x={50} y={64} s={2.6} />, "#E8D8C0"),
  "peel-rotten": thing(<BananaPeel x={50} y={64} s={2.6} rotten />, "#E8D8C0"),
  "seedling-ring": thing(<RingSeedling x={50} y={76} s={1.6} />, "#E4F4DC"),
  "seedling-wilt": thing(<RingSeedling x={50} y={76} s={1.6} wilt />, "#F4E4C0"),
  "solar-lamp": thing(<SolarLamp x={50} y={84} s={1.4} />, "#1E2A50"),
  dam: thing(<g transform="translate(54 76) scale(0.4)"><Dam x={0} y={0} /></g>, "#BFE4FA"),
};
