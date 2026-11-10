"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for this course's stories, by story id. Each loads in the browser only
  (next/dynamic with ssr: false; the options must be an inline object literal). The shared
  drawing kits: ./kit.tsx and ./kit-more.tsx (from Numbers & Counting), ./kit-cast.tsx,
  ./kit-places.tsx, ./kit-props.tsx and ./kit-things.tsx (from Values & Character), and this
  course's maths pictures in ./kit-maths.tsx.
*/
const FillTenFirst = dynamic(() => import("./fill-ten-first"), { ssr: false });
const GebetaDoubles = dynamic(() => import("./gebeta-doubles"), { ssr: false });
const NumberFamily = dynamic(() => import("./number-family"), { ssr: false });
const HawassaBus = dynamic(() => import("./hawassa-bus"), { ssr: false });
const TolosasRiddles = dynamic(() => import("./tolosas-riddles"), { ssr: false });
const ThreeRounds = dynamic(() => import("./three-rounds"), { ssr: false });
const OxenPairs = dynamic(() => import("./oxen-pairs"), { ssr: false });
const MarketPiles = dynamic(() => import("./market-piles"), { ssr: false });
const WeddingChairs = dynamic(() => import("./wedding-chairs"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "fill-ten-first": FillTenFirst,
  "gebeta-doubles": GebetaDoubles,
  "number-family": NumberFamily,
  "hawassa-bus": HawassaBus,
  "tolosas-riddles": TolosasRiddles,
  "three-rounds": ThreeRounds,
  "oxen-pairs": OxenPairs,
  "market-piles": MarketPiles,
  "wedding-chairs": WeddingChairs,
};
