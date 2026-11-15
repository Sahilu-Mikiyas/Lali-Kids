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
    level 4  story-map (characters, setting, problem, ending), chapter-sort (which chapter?)
    level 5  riddle-box (እንቆቅልሽ / ምን አውቅልሽ), rhyme-match (same ending), clap-beat (a poem
             clapped word by word, then read with the beat)
    level 6  sentence-builder (word order and ። ? !), letter-writer (the parts of a letter in
             order), book-maker (a mini book: pages, marks and ተፈጸመ)
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
  "story-map": dynamic(() => import("./story-map"), { ssr: false }),
  "chapter-sort": dynamic(() => import("./chapter-sort"), { ssr: false }),
  "riddle-box": dynamic(() => import("./riddle-box"), { ssr: false }),
  "rhyme-match": dynamic(() => import("./rhyme-match"), { ssr: false }),
  "clap-beat": dynamic(() => import("./clap-beat"), { ssr: false }),
  "sentence-builder": dynamic(() => import("./sentence-builder"), { ssr: false }),
  "letter-writer": dynamic(() => import("./letter-writer"), { ssr: false }),
  "book-maker": dynamic(() => import("./book-maker"), { ssr: false }),
};
