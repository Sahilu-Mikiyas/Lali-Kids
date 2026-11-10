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

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "map-from-the-sky": MapFromTheSky,
  "smoking-water": SmokingWater,
  "lake-after-lake": LakeAfterLake,
  "salt-road": SaltRoad,
  "hawis-teff-seeds": HawisTeffSeeds,
};
