"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  This course's interactive demonstrations, by id (the ids the course's lessons use). Each loads
  in the browser only. The shared pieces they are built from (the frame, the English voice, the
  pictures) live in ./kit.tsx, copied from English First Words.
    level 1  digraph-detective (sh, ch, th, ck, ng fill the gap), blend-builder (build the blend at
             the start of a word, letter by letter), tricky-catch (look, say, cover, check the
             tricky words)
    level 2  magic-e-wand (cap to cape: the word and its picture change), vowel-team-sorter (ee, ai,
             oa baskets)
    level 3  read-along (a little story with the words lighting up, then who/what/where questions),
             sentence-scramble (put longer sentences back in order), now-or-done (-ing or -ed?)
    level 4  order-the-steps (first, next, then, last), because-match (why? because…)
    level 5  say-it-nicely (please, thank you, excuse me, sorry…), question-words (who, what, where,
             when, why, how), act-it-out (short dialogues: a new friend, the shop, the clinic)
    level 6  fix-the-sentence (capital letters and full stops), and-or-but (joining sentences),
             write-a-postcard (Dear…, sentences, Love…)
*/
export const DEMOS: Record<string, Demo> = {
  "digraph-detective": dynamic(() => import("./digraph-detective"), { ssr: false }),
  "blend-builder": dynamic(() => import("./blend-builder"), { ssr: false }),
  "tricky-catch": dynamic(() => import("./tricky-catch"), { ssr: false }),
  "magic-e-wand": dynamic(() => import("./magic-e-wand"), { ssr: false }),
  "vowel-team-sorter": dynamic(() => import("./vowel-team-sorter"), { ssr: false }),
  "read-along": dynamic(() => import("./read-along"), { ssr: false }),
  "sentence-scramble": dynamic(() => import("./sentence-scramble"), { ssr: false }),
  "now-or-done": dynamic(() => import("./now-or-done"), { ssr: false }),
  "order-the-steps": dynamic(() => import("./order-the-steps"), { ssr: false }),
  "because-match": dynamic(() => import("./because-match"), { ssr: false }),
  "say-it-nicely": dynamic(() => import("./say-it-nicely"), { ssr: false }),
  "question-words": dynamic(() => import("./question-words"), { ssr: false }),
  "act-it-out": dynamic(() => import("./act-it-out"), { ssr: false }),
  "fix-the-sentence": dynamic(() => import("./fix-the-sentence"), { ssr: false }),
  "and-or-but": dynamic(() => import("./and-or-but"), { ssr: false }),
  "write-a-postcard": dynamic(() => import("./write-a-postcard"), { ssr: false }),
};
