"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  Amharic Readers' interactive demonstrations, by id (the ids the course's lessons use). Each loads
  in the browser only. Shared pieces (the frame, sounds with an Amharic voice or a chime, pictures)
  are in ./shared/kit.
    level 1  piece-by-piece (long words in parts, then together), wa-tails (find the letter with
             the wa tail), smooth-reader (tap each word slowly, then read smoothly with a highlight
             that follows the reading; soft and strong ዋና)
    level 2  find-the-answer (tap the sentence that answers), story-order (first, then, next, at
             last), what-next (predict from a clue)
    level 3  word-machine (plural and my/your/his/her endings), word-tree (word families and ቤት
             words), opposite-pairs
*/
export const DEMOS: Record<string, Demo> = {
  "piece-by-piece": dynamic(() => import("./piece-by-piece"), { ssr: false }),
  "wa-tails": dynamic(() => import("./wa-tails"), { ssr: false }),
  "smooth-reader": dynamic(() => import("./smooth-reader"), { ssr: false }),
  "find-the-answer": dynamic(() => import("./find-the-answer"), { ssr: false }),
  "story-order": dynamic(() => import("./story-order"), { ssr: false }),
  "what-next": dynamic(() => import("./what-next"), { ssr: false }),
  "word-machine": dynamic(() => import("./word-machine"), { ssr: false }),
  "word-tree": dynamic(() => import("./word-tree"), { ssr: false }),
  "opposite-pairs": dynamic(() => import("./opposite-pairs"), { ssr: false }),
};
