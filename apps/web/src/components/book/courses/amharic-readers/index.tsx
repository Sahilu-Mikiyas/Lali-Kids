"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Amharic Readers stories, by story id. Shared pieces: the cast and
  places (./kit-cast, ./kit-places, ./kit-more, ./kit-props, copied from Values & Character),
  things (./things, copied from Fidel Foundations, with more added) and the reading pieces
  (./kit-read: word cards, sentence strips, words in parts, notes, signs, books, library, market).
*/
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "anbessas-longest-word": dynamic(() => import("./anbessas-longest-word"), { ssr: false }),
  "little-wa-tails": dynamic(() => import("./little-wa-tails"), { ssr: false }),
  "swim-or-main": dynamic(() => import("./swim-or-main"), { ssr: false }),
  "tsehays-smooth-reading": dynamic(() => import("./tsehays-smooth-reading"), { ssr: false }),
  "the-note-detectives": dynamic(() => import("./the-note-detectives"), { ssr: false }),
  "ayans-mixed-up-pages": dynamic(() => import("./ayans-mixed-up-pages"), { ssr: false }),
  "the-answer-is-hiding": dynamic(() => import("./the-answer-is-hiding"), { ssr: false }),
  "anbessa-no-peeking": dynamic(() => import("./anbessa-no-peeking"), { ssr: false }),
  "hawis-why-book": dynamic(() => import("./hawis-why-book"), { ssr: false }),
  "gugus-market-list": dynamic(() => import("./gugus-market-list"), { ssr: false }),
  "lost-and-found-box": dynamic(() => import("./lost-and-found-box"), { ssr: false }),
  "gugus-opposite-day": dynamic(() => import("./gugus-opposite-day"), { ssr: false }),
  "habens-word-tree": dynamic(() => import("./habens-word-tree"), { ssr: false }),
};
