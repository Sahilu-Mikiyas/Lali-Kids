"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Our Ethiopia stories, by story id (story `scene: "lib-<id>"`). Each story
  has its own file here (./<id>.tsx with ./<id>.css); they share the course's kits: the cast,
  places and props copied from Values & Character (./kit-cast.tsx, ./kit-places.tsx,
  ./kit-props.tsx, ./kit-more.tsx, ./kit.css), the land of Ethiopia (./kit-land.tsx) and its
  peoples and celebrations (./kit-culture.tsx). Loaded in the browser only (ssr: false).
*/
// Level 1: our land
const MapFromTheSky = dynamic(() => import("./map-from-the-sky"), { ssr: false });
const SmokingWater = dynamic(() => import("./smoking-water"), { ssr: false });
const LakeAfterLake = dynamic(() => import("./lake-after-lake"), { ssr: false });
const SaltRoad = dynamic(() => import("./salt-road"), { ssr: false });
const HawisTeffSeeds = dynamic(() => import("./hawis-teff-seeds"), { ssr: false });
// Level 2: our peoples and languages
const ManyHellos = dynamic(() => import("./many-hellos"), { ssr: false });
const AHomeForEveryPlace = dynamic(() => import("./a-home-for-every-place"), { ssr: false });
const GrandmasNewNetela = dynamic(() => import("./grandmas-new-netela"), { ssr: false });
const HawisLetter = dynamic(() => import("./hawis-letter"), { ssr: false });
// Level 3: our celebrations
const TheLittlestMonth = dynamic(() => import("./the-littlest-month"), { ssr: false });
const FreshGrassForIrreecha = dynamic(() => import("./fresh-grass-for-irreecha"), { ssr: false });
const WaitingForTheEidMoon = dynamic(() => import("./waiting-for-the-eid-moon"), { ssr: false });
const DestasFichee = dynamic(() => import("./destas-fichee"), { ssr: false });

// Level 4: stories from our history
const AksumTallStones = dynamic(() => import("./aksum-tall-stones"), { ssr: false });
const TheKindKingOfAksum = dynamic(() => import("./the-kind-king-of-aksum"), { ssr: false });
const CastlesOfGondar = dynamic(() => import("./castles-of-gondar"), { ssr: false });
const GatesOfHarar = dynamic(() => import("./gates-of-harar"), { ssr: false });
const EveryonesVictory = dynamic(() => import("./everyones-victory"), { ssr: false });

// Level 5: our wildlife and nature
const WaliaOnTheLedge = dynamic(() => import("./walia-on-the-ledge"), { ssr: false });
const TheWolfAndTheDog = dynamic(() => import("./the-wolf-and-the-dog"), { ssr: false });
const TheChurchForest = dynamic(() => import("./the-church-forest"), { ssr: false });
const WildCoffeeForest = dynamic(() => import("./wild-coffee-forest"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "map-from-the-sky": MapFromTheSky,
  "smoking-water": SmokingWater,
  "lake-after-lake": LakeAfterLake,
  "salt-road": SaltRoad,
  "hawis-teff-seeds": HawisTeffSeeds,
  "many-hellos": ManyHellos,
  "a-home-for-every-place": AHomeForEveryPlace,
  "grandmas-new-netela": GrandmasNewNetela,
  "hawis-letter": HawisLetter,
  "the-littlest-month": TheLittlestMonth,
  "fresh-grass-for-irreecha": FreshGrassForIrreecha,
  "waiting-for-the-eid-moon": WaitingForTheEidMoon,
  "destas-fichee": DestasFichee,
  "aksum-tall-stones": AksumTallStones,
  "the-kind-king-of-aksum": TheKindKingOfAksum,
  "castles-of-gondar": CastlesOfGondar,
  "gates-of-harar": GatesOfHarar,
  "everyones-victory": EveryonesVictory,
  "walia-on-the-ledge": WaliaOnTheLedge,
  "the-wolf-and-the-dog": TheWolfAndTheDog,
  "the-church-forest": TheChurchForest,
  "wild-coffee-forest": WildCoffeeForest,
};
