"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  This course's interactive demonstrations, by id (the ids the course's lessons use). Each loads
  in the browser only. The shared pieces they are built from (the frame, the English voice, the
  pictures) live in ./kit.tsx.
    level 1  hello-friends (what do we say? hello, goodbye, please, thank you, good morning, good night)
             touch-your-nose (a body game with Anbessa)
    level 2  color-pot (find red, yellow, blue; mix orange, green, purple)
             animal-sounds (who says moo? the animal-sound match)
    level 3  letter-train (first sounds, a to m), trace-letters (trace big and little a to m),
             big-and-small (match capital and small letters)
*/
export const DEMOS: Record<string, Demo> = {
  "hello-friends": dynamic(() => import("./hello-friends"), { ssr: false }),
  "touch-your-nose": dynamic(() => import("./touch-your-nose"), { ssr: false }),
  "color-pot": dynamic(() => import("./color-pot"), { ssr: false }),
  "animal-sounds": dynamic(() => import("./animal-sounds"), { ssr: false }),
  "letter-train": dynamic(() => import("./letter-train"), { ssr: false }),
  "trace-letters": dynamic(() => import("./trace-letters"), { ssr: false }),
  "big-and-small": dynamic(() => import("./big-and-small"), { ssr: false }),
};
