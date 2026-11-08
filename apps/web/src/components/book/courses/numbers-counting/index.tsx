"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for this course's stories, by story id. Each loads in the browser only
  (next/dynamic with ssr: false; the options must be an inline object literal). The shared
  drawing kit is ./kit.tsx.
*/
const CoffeeCups = dynamic(() => import("./coffee-cups"), { ssr: false });
const NumberHunt = dynamic(() => import("./number-hunt"), { ssr: false });
const NothingLeft = dynamic(() => import("./nothing-left"), { ssr: false });
const ShapeKitchen = dynamic(() => import("./shape-kitchen"), { ssr: false });
const ThreeSticks = dynamic(() => import("./three-sticks"), { ssr: false });
const TenAndMore = dynamic(() => import("./ten-and-more"), { ssr: false });
const BlueMinibus = dynamic(() => import("./blue-minibus"), { ssr: false });
const SteppingStones = dynamic(() => import("./stepping-stones"), { ssr: false });
const WhoHasMore = dynamic(() => import("./who-has-more"), { ssr: false });
const FiveBirds = dynamic(() => import("./five-birds"), { ssr: false });
const HidingSheep = dynamic(() => import("./hiding-sheep"), { ssr: false });
const PlusParty = dynamic(() => import("./plus-party"), { ssr: false });
const CheekyGoats = dynamic(() => import("./cheeky-goats"), { ssr: false });
const KoloStall = dynamic(() => import("./kolo-stall"), { ssr: false });
const GugusDay = dynamic(() => import("./gugus-day"), { ssr: false });
const SevenDays = dynamic(() => import("./seven-days"), { ssr: false });
const TeffBundles = dynamic(() => import("./teff-bundles"), { ssr: false });
const HundredSteps = dynamic(() => import("./hundred-steps"), { ssr: false });
const CountByFives = dynamic(() => import("./count-by-fives"), { ssr: false });
const DoubleHalf = dynamic(() => import("./double-half"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "coffee-cups": CoffeeCups,
  "number-hunt": NumberHunt,
  "nothing-left": NothingLeft,
  "shape-kitchen": ShapeKitchen,
  "three-sticks": ThreeSticks,
  "ten-and-more": TenAndMore,
  "blue-minibus": BlueMinibus,
  "stepping-stones": SteppingStones,
  "who-has-more": WhoHasMore,
  "five-birds": FiveBirds,
  "hiding-sheep": HidingSheep,
  "plus-party": PlusParty,
  "cheeky-goats": CheekyGoats,
  "kolo-stall": KoloStall,
  "gugus-day": GugusDay,
  "seven-days": SevenDays,
  "teff-bundles": TeffBundles,
  "hundred-steps": HundredSteps,
  "count-by-fives": CountByFives,
  "double-half": DoubleHalf,
};
