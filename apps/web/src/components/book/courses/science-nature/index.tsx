"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Science & Nature stories, by story id (story `scene: "lib-<id>"`). Each
  story has its own file here (./<id>.tsx with ./<id>.css); they share the course's kits: the cast,
  places, props and land copied from Our Ethiopia (./kit-cast.tsx, ./kit-places.tsx, ./kit-props.tsx,
  ./kit-more.tsx, ./kit-land.tsx, ./kit-crafts.tsx, ./kit-culture.tsx, ./kit.css, ./kit-land.css),
  and the science kits: living things (./kit-life.tsx), the body, senses and food (./kit-body.tsx),
  materials and changes (./kit-stuff.tsx), weather, Earth and sky (./kit-sky.tsx), and forces,
  light, sound and our planet (./kit-forces.tsx), with moves in ./kit-science.css. Loaded in the
  browser only (ssr: false).
*/
// Level 1: living things
const IsItAlive = dynamic(() => import("./is-it-alive"), { ssr: false });
const ThreeBeanJars = dynamic(() => import("./three-bean-jars"), { ssr: false });
const JellyInThePond = dynamic(() => import("./jelly-in-the-pond"), { ssr: false });
const HolesInTheLemonLeaves = dynamic(() => import("./holes-in-the-lemon-leaves"), { ssr: false });
const TwentyOneDays = dynamic(() => import("./twenty-one-days"), { ssr: false });
// Level 2: my body and my senses
const TheSmellDetective = dynamic(() => import("./the-smell-detective"), { ssr: false });
const HabensBones = dynamic(() => import("./habens-bones"), { ssr: false });
const GugusRedHeart = dynamic(() => import("./gugus-red-heart"), { ssr: false });
const TsehaysWobblyTooth = dynamic(() => import("./tsehays-wobbly-tooth"), { ssr: false });
// Level 3: materials and changes
const TheLeakyBasket = dynamic(() => import("./the-leaky-basket"), { ssr: false });
const WillItFloat = dynamic(() => import("./will-it-float"), { ssr: false });
const IceFromTheSky = dynamic(() => import("./ice-from-the-sky"), { ssr: false });
const CanItChangeBack = dynamic(() => import("./can-it-change-back"), { ssr: false });
// Level 4: weather, water and seasons
const WhereDidThePuddleGo = dynamic(() => import("./where-did-the-puddle-go"), { ssr: false });
const HawisRainbow = dynamic(() => import("./hawis-rainbow"), { ssr: false });
const KitesAndClouds = dynamic(() => import("./kites-and-clouds"), { ssr: false });
const EveryDropCounts = dynamic(() => import("./every-drop-counts"), { ssr: false });
// Level 5: Earth and sky
const WhereDoesTheSunGo = dynamic(() => import("./where-does-the-sun-go"), { ssr: false });
const OurStarTheSun = dynamic(() => import("./our-star-the-sun"), { ssr: false });
const AyansMoonDiary = dynamic(() => import("./ayans-moon-diary"), { ssr: false });
const FireMountain = dynamic(() => import("./fire-mountain"), { ssr: false });
// Level 6: forces, light, sound and our planet
const TheGoCart = dynamic(() => import("./the-go-cart"), { ssr: false });
const GrandmasLostNeedle = dynamic(() => import("./grandmas-lost-needle"), { ssr: false });
const TheVillageWell = dynamic(() => import("./the-village-well"), { ssr: false });
const TsehaysShadow = dynamic(() => import("./tsehays-shadow"), { ssr: false });
const TheKrarSings = dynamic(() => import("./the-krar-sings"), { ssr: false });
const TheBagInTheTree = dynamic(() => import("./the-bag-in-the-tree"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "is-it-alive": IsItAlive,
  "three-bean-jars": ThreeBeanJars,
  "jelly-in-the-pond": JellyInThePond,
  "holes-in-the-lemon-leaves": HolesInTheLemonLeaves,
  "twenty-one-days": TwentyOneDays,
  "the-smell-detective": TheSmellDetective,
  "habens-bones": HabensBones,
  "gugus-red-heart": GugusRedHeart,
  "tsehays-wobbly-tooth": TsehaysWobblyTooth,
  "the-leaky-basket": TheLeakyBasket,
  "will-it-float": WillItFloat,
  "ice-from-the-sky": IceFromTheSky,
  "can-it-change-back": CanItChangeBack,
  "where-did-the-puddle-go": WhereDidThePuddleGo,
  "hawis-rainbow": HawisRainbow,
  "kites-and-clouds": KitesAndClouds,
  "every-drop-counts": EveryDropCounts,
  "where-does-the-sun-go": WhereDoesTheSunGo,
  "our-star-the-sun": OurStarTheSun,
  "ayans-moon-diary": AyansMoonDiary,
  "fire-mountain": FireMountain,
  "the-go-cart": TheGoCart,
  "grandmas-lost-needle": GrandmasLostNeedle,
  "the-village-well": TheVillageWell,
  "tsehays-shadow": TsehaysShadow,
  "the-krar-sings": TheKrarSings,
  "the-bag-in-the-tree": TheBagInTheTree,
};
