"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  The Our Ethiopia demos, loaded in the browser only. They share ./demo-kit.tsx and draw with the
  course's scene kits (src/components/book/courses/our-ethiopia/kit-*.tsx).
*/
// Level 1: our land
const MapPuzzle = dynamic(() => import("./map-puzzle"), { ssr: false });
const RainOrSun = dynamic(() => import("./rain-or-sun"), { ssr: false });
const PlantToPlate = dynamic(() => import("./plant-to-plate"), { ssr: false });
// Level 2: our peoples and languages
const GreetingsWheel = dynamic(() => import("./greetings-wheel"), { ssr: false });
const TwoScripts = dynamic(() => import("./two-scripts"), { ssr: false });
const HomesAndPlaces = dynamic(() => import("./homes-and-places"), { ssr: false });
// Level 3: our celebrations
const FestivalCalendar = dynamic(() => import("./festival-calendar"), { ssr: false });
const FestivalSuitcase = dynamic(() => import("./festival-suitcase"), { ssr: false });
// Level 4: stories from our history
const HistoryTimeline = dynamic(() => import("./history-timeline"), { ssr: false });
const CarveFromRock = dynamic(() => import("./carve-from-rock"), { ssr: false });
// Level 5: our wildlife and nature
const WhoLivesWhere = dynamic(() => import("./who-lives-where"), { ssr: false });
const ParkRanger = dynamic(() => import("./park-ranger"), { ssr: false });
// Level 6: our food, crafts, music and inventions
const InjeraSteps = dynamic(() => import("./injera-steps"), { ssr: false });
const InstrumentBand = dynamic(() => import("./instrument-band"), { ssr: false });
const EthiopianClock = dynamic(() => import("./ethiopian-clock"), { ssr: false });

/** This course's interactive demonstrations, by id. Use next/dynamic with { ssr: false } for each. */
export const DEMOS: Record<string, Demo> = {
  "map-puzzle": MapPuzzle,
  "rain-or-sun": RainOrSun,
  "plant-to-plate": PlantToPlate,
  "greetings-wheel": GreetingsWheel,
  "two-scripts": TwoScripts,
  "homes-and-places": HomesAndPlaces,
  "festival-calendar": FestivalCalendar,
  "festival-suitcase": FestivalSuitcase,
  "history-timeline": HistoryTimeline,
  "carve-from-rock": CarveFromRock,
  "who-lives-where": WhoLivesWhere,
  "park-ranger": ParkRanger,
  "injera-steps": InjeraSteps,
  "instrument-band": InstrumentBand,
  "ethiopian-clock": EthiopianClock,
};
