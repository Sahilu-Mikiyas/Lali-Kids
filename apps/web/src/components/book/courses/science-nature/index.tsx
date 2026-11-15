"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Science & Nature stories, by story id (story `scene: "lib-<id>"`). Each
  story has its own file here (./<id>.tsx with ./<id>.css); they share the course's kits: the cast,
  places, props and land copied from Our Ethiopia (./kit-cast.tsx, ./kit-places.tsx, ./kit-props.tsx,
  ./kit-more.tsx, ./kit-land.tsx, ./kit-crafts.tsx, ./kit-culture.tsx, ./kit.css, ./kit-land.css),
  and the science kits: living things (./kit-life.tsx), the body, senses and food (./kit-body.tsx),
  and materials and changes (./kit-stuff.tsx), with moves in ./kit-science.css. Loaded in the
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
};
