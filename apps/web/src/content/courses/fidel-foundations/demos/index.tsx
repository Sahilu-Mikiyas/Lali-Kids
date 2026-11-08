"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  This course's interactive demonstrations, by id (the ids the course's lessons use). Each loads
  in the browser only. The shared pieces they are built from live in ./shared.
    level 1  seven-hats (the seven forms of ሀ ለ መ), trace-l1 (trace ሀ ለ መ), sound-twins (memory game of sound-alikes)
    level 2  seven-hats-l2 (the forms of ረ ሰ ሸ ቀ በ), letter-baskets (first letters of pictures), build-word-l2 (ቤት ሰላም ቡና ሽሮ)
    level 3  slow-fast (blend 2–3-part words), trace-l3 (trace ቸ ነ አ), build-word-l3 (ኤሊ አበባ ቀበሮ አንበሳ)
    level 4  seven-hats-l4 (the forms of ከ ወ ዘ የ ደ ገ ጀ), letter-baskets-l4, build-word-l4 (ዶሮ ዳቦ ዝሆን ጀበና)
    level 5  trace-l5 (trace ጠ ጨ ፈ), sound-twins-l5 (ጸ ፀ, አ ዐ), fidel-chart (find a letter: family, then form)
    level 6  space-words (tap where words end), build-sentence (word tiles into a sentence), read-and-pick
*/
export const DEMOS: Record<string, Demo> = {
  "seven-hats": dynamic(() => import("./seven-hats"), { ssr: false }),
  "trace-l1": dynamic(() => import("./trace-l1"), { ssr: false }),
  "sound-twins": dynamic(() => import("./sound-twins"), { ssr: false }),
  "seven-hats-l2": dynamic(() => import("./seven-hats-l2"), { ssr: false }),
  "letter-baskets": dynamic(() => import("./letter-baskets"), { ssr: false }),
  "build-word-l2": dynamic(() => import("./build-word-l2"), { ssr: false }),
  "slow-fast": dynamic(() => import("./slow-fast"), { ssr: false }),
  "trace-l3": dynamic(() => import("./trace-l3"), { ssr: false }),
  "build-word-l3": dynamic(() => import("./build-word-l3"), { ssr: false }),
  "seven-hats-l4": dynamic(() => import("./seven-hats-l4"), { ssr: false }),
  "letter-baskets-l4": dynamic(() => import("./letter-baskets-l4"), { ssr: false }),
  "build-word-l4": dynamic(() => import("./build-word-l4"), { ssr: false }),
  "trace-l5": dynamic(() => import("./trace-l5"), { ssr: false }),
  "sound-twins-l5": dynamic(() => import("./sound-twins-l5"), { ssr: false }),
  "fidel-chart": dynamic(() => import("./fidel-chart"), { ssr: false }),
  "space-words": dynamic(() => import("./space-words"), { ssr: false }),
  "build-sentence": dynamic(() => import("./build-sentence"), { ssr: false }),
  "read-and-pick": dynamic(() => import("./read-and-pick"), { ssr: false }),
};
