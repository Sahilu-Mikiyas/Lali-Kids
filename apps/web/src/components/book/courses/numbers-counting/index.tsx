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
};
