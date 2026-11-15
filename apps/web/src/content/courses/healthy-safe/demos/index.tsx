"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  The Healthy & Safe demos, loaded in the browser only. They share ./demo-kit.tsx,
  ./choice-rounds.tsx and ./order-kit.tsx (copied from Values & Character and Our Ethiopia) and
  draw with the course's scene kit (src/components/book/courses/healthy-safe/kit-*.tsx).
*/
// Level 1
const HandwashSteps = dynamic(() => import("./handwash-steps"), { ssr: false });
const BrushTeeth = dynamic(() => import("./brush-teeth"), { ssr: false });
const GermStoppers = dynamic(() => import("./germ-stoppers"), { ssr: false });
// Level 2
const RainbowPlate = dynamic(() => import("./rainbow-plate"), { ssr: false });
const BedtimeRoutine = dynamic(() => import("./bedtime-routine"), { ssr: false });
// Level 3
const FeelingsClues = dynamic(() => import("./feelings-clues"), { ssr: false });
const SafeOrTell = dynamic(() => import("./safe-or-tell"), { ssr: false });
// Level 4
const SpotTheDangers = dynamic(() => import("./spot-the-dangers"), { ssr: false });
const GrownUpThings = dynamic(() => import("./grown-up-things"), { ssr: false });
// Level 5
const CrossTheRoad = dynamic(() => import("./cross-the-road"), { ssr: false });
const SafeOutside = dynamic(() => import("./safe-outside"), { ssr: false });
// Level 6
const ClinicVisit = dynamic(() => import("./clinic-visit"), { ssr: false });
const GetWell = dynamic(() => import("./get-well"), { ssr: false });

/** This course's interactive demonstrations, by id. Use next/dynamic with { ssr: false } for each. */
export const DEMOS: Record<string, Demo> = {
  "handwash-steps": HandwashSteps,
  "brush-teeth": BrushTeeth,
  "germ-stoppers": GermStoppers,
  "rainbow-plate": RainbowPlate,
  "bedtime-routine": BedtimeRoutine,
  "feelings-clues": FeelingsClues,
  "safe-or-tell": SafeOrTell,
  "spot-the-dangers": SpotTheDangers,
  "grown-up-things": GrownUpThings,
  "cross-the-road": CrossTheRoad,
  "safe-outside": SafeOutside,
  "clinic-visit": ClinicVisit,
  "get-well": GetWell,
};
