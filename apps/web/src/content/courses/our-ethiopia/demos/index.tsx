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
};
