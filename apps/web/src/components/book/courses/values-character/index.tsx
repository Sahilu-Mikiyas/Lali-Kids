"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Values & Character stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's cast,
  places and props (./kit-cast.tsx, ./kit-places.tsx, ./kit-props.tsx, ./kit-more.tsx, ./kit.css).
  Loaded in the browser only (ssr: false), like the library's scenes.
*/
// Level 1: respect and kindness at home
const TallestTower = dynamic(() => import("./tallest-tower"), { ssr: false });
const GugusMagicWords = dynamic(() => import("./gugus-magic-words"), { ssr: false });
const TsehaysLittleHands = dynamic(() => import("./tsehays-little-hands"), { ssr: false });
const HawiSaysHello = dynamic(() => import("./hawi-says-hello"), { ssr: false });
// Level 2: honesty and responsibility
const WhoAteTheBread = dynamic(() => import("./who-ate-the-bread"), { ssr: false });
const PromiseIsAPromise = dynamic(() => import("./promise-is-a-promise"), { ssr: false });
const AyansRedSandals = dynamic(() => import("./ayans-red-sandals"), { ssr: false });
const BallInTheGarden = dynamic(() => import("./ball-in-the-garden"), { ssr: false });
// Level 3: sharing and hospitality
const TheBestBite = dynamic(() => import("./the-best-bite"), { ssr: false });
const AlwaysRoom = dynamic(() => import("./always-room"), { ssr: false });
const ThreeCupsOfCoffee = dynamic(() => import("./three-cups-of-coffee"), { ssr: false });
const DeboDay = dynamic(() => import("./debo-day"), { ssr: false });
// Level 4: courage and perseverance
const HawisFirstBasket = dynamic(() => import("./hawis-first-basket"), { ssr: false });
const HabenReadsAloud = dynamic(() => import("./haben-reads-aloud"), { ssr: false });
const GuguAsksForHelp = dynamic(() => import("./gugu-asks-for-help"), { ssr: false });
const AyansLemonTree = dynamic(() => import("./ayans-lemon-tree"), { ssr: false });
// Level 5: feelings, forgiveness and friendship
const HawisStormyDay = dynamic(() => import("./hawis-stormy-day"), { ssr: false });
const TheTornLamb = dynamic(() => import("./the-torn-lamb"), { ssr: false });
const AbdiPlaysToo = dynamic(() => import("./abdi-plays-too"), { ssr: false });
const LittlePeacemakers = dynamic(() => import("./little-peacemakers"), { ssr: false });
const MissingAabo = dynamic(() => import("./missing-aabo"), { ssr: false });
// Level 6: caring for others and our world
const TheEdirBox = dynamic(() => import("./the-edir-box"), { ssr: false });
const LittleWeaverBird = dynamic(() => import("./little-weaver-bird"), { ssr: false });
const CleanSpring = dynamic(() => import("./clean-spring"), { ssr: false });
const EverybodysHolidays = dynamic(() => import("./everybodys-holidays"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "tallest-tower": TallestTower,
  "gugus-magic-words": GugusMagicWords,
  "tsehays-little-hands": TsehaysLittleHands,
  "hawi-says-hello": HawiSaysHello,
  "who-ate-the-bread": WhoAteTheBread,
  "promise-is-a-promise": PromiseIsAPromise,
  "ayans-red-sandals": AyansRedSandals,
  "ball-in-the-garden": BallInTheGarden,
  "the-best-bite": TheBestBite,
  "always-room": AlwaysRoom,
  "three-cups-of-coffee": ThreeCupsOfCoffee,
  "debo-day": DeboDay,
  "hawis-first-basket": HawisFirstBasket,
  "haben-reads-aloud": HabenReadsAloud,
  "gugu-asks-for-help": GuguAsksForHelp,
  "ayans-lemon-tree": AyansLemonTree,
  "hawis-stormy-day": HawisStormyDay,
  "the-torn-lamb": TheTornLamb,
  "abdi-plays-too": AbdiPlaysToo,
  "little-peacemakers": LittlePeacemakers,
  "missing-aabo": MissingAabo,
  "the-edir-box": TheEdirBox,
  "little-weaver-bird": LittleWeaverBird,
  "clean-spring": CleanSpring,
  "everybodys-holidays": EverybodysHolidays,
};
