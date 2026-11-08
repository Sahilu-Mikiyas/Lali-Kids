"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  The Values & Character demos, loaded in the browser only. They share ./demo-kit.tsx and draw
  with the course's scene kit (src/components/book/courses/values-character/kit-*.tsx).
*/
// Level 1
const GreetingGame = dynamic(() => import("./greeting-game"), { ssr: false });
const KindWords = dynamic(() => import("./kind-words"), { ssr: false });
// Level 2
const WhatWouldYouDo = dynamic(() => import("./what-would-you-do"), { ssr: false });
const EverythingHasAHome = dynamic(() => import("./everything-has-a-home"), { ssr: false });
// Level 3
const SharingScale = dynamic(() => import("./sharing-scale"), { ssr: false });
const CoffeeCeremony = dynamic(() => import("./coffee-ceremony"), { ssr: false });

/** This course's interactive demonstrations, by id. Use next/dynamic with { ssr: false } for each. */
export const DEMOS: Record<string, Demo> = {
  "greeting-game": GreetingGame,
  "kind-words": KindWords,
  "what-would-you-do": WhatWouldYouDo,
  "everything-has-a-home": EverythingHasAHome,
  "sharing-scale": SharingScale,
  "coffee-ceremony": CoffeeCeremony,
};
