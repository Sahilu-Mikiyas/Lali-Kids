"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Amharic Readers stories, by story id. Shared pieces: the cast and
  places (./kit-cast, ./kit-places, ./kit-more, ./kit-props, copied from Values & Character),
  things (./things, copied from Fidel Foundations, with more added) and the reading pieces
  (./kit-read: word cards, sentence strips, words in parts, notes, signs, books, library, market)
  and the folktale and writing pieces (./kit-tales: people, the lion, the cold mountain, castles,
  the post office, story maps, mini books).
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
  "grandmas-lions-whisker": dynamic(() => import("./grandmas-lions-whisker"), { ssr: false }),
  "arha-and-the-far-fire": dynamic(() => import("./arha-and-the-far-fire"), { ssr: false }),
  "abdis-lost-goat": dynamic(() => import("./abdis-lost-goat"), { ssr: false }),
  "tsehays-story-map": dynamic(() => import("./tsehays-story-map"), { ssr: false }),
  "grandmas-riddle-night": dynamic(() => import("./grandmas-riddle-night"), { ssr: false }),
  "gugus-rhyme-day": dynamic(() => import("./gugus-rhyme-day"), { ssr: false }),
  "habens-clapping-poem": dynamic(() => import("./habens-clapping-poem"), { ssr: false }),
  "a-poem-for-grandma": dynamic(() => import("./a-poem-for-grandma"), { ssr: false }),
  "abdis-sentence-builders": dynamic(() => import("./abdis-sentence-builders"), { ssr: false }),
  "anbessas-letter-to-grandma": dynamic(() => import("./anbessas-letter-to-grandma"), { ssr: false }),
  "gugus-party-list": dynamic(() => import("./gugus-party-list"), { ssr: false }),
  "our-mini-books": dynamic(() => import("./our-mini-books"), { ssr: false }),
};
