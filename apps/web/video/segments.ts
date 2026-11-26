/*
  What the video says besides the story itself, and how a page's words are cut into caption
  lines. Shared by the stage page (src/app/[lang]/video-stage) and the recorder (record.mjs
  reads the same rules through plan.mjs, which keeps a copy of captionLines; keep them alike).
*/

/** A page's words (split exactly like the reader, on single spaces) in caption lines of about 50 characters, broken after punctuation when possible. */
export function captionLines(text: string, max = 50): string[][] {
  const words = text.split(" ");
  const lines: string[][] = [];
  let line: string[] = [];
  let len = 0;
  for (const w of words) {
    if (line.length && len + 1 + w.length > max) {
      lines.push(line);
      line = [];
      len = 0;
    }
    line.push(w);
    len += (len ? 1 : 0) + w.length;
    // A sentence end closes the line once it is reasonably full.
    if (len > max * 0.55 && /[.!?።…»”"]$/.test(w)) {
      lines.push(line);
      line = [];
      len = 0;
    }
  }
  if (line.length) lines.push(line);
  return lines;
}

export const END_CARD = {
  en: {
    tagline: "A Lali story",
    title: "The End!",
    lines: ["Did you share something today?", "Read more stories, in English and Amharic, with Lali."],
    url: "lali-kids.onrender.com",
  },
  am: {
    tagline: "የላሊ ታሪክ",
    title: "ተፈጸመ!",
    lines: ["ዛሬ ምን አካፈላችሁ?", "ተጨማሪ ታሪኮችን በአማርኛና በእንግሊዝኛ ከላሊ ጋር አንብቡ።"],
    url: "lali-kids.onrender.com",
  },
} as const;

/*
  The vertical promo for parents (1080×1920, see video/README.md and video/promo-plan.mjs).
  Its main lines are the home book's last page (t.home.try.pitch in src/i18n/dict.ts); these
  are the few extra words only the video shows.
*/
export const PROMO_BEATS = ["hook", "pages", "values", "proof", "end"] as const;
export type PromoBeat = (typeof PROMO_BEATS)[number];

/**
 * The pages that turn in the "pages" beat, and the pages behind each values word: only pages
 * whose pictures have no English words in them (pages 3-6 and 8 do), so both videos can use them.
 */
export const PROMO_PAGES = [1, 9, 10];
export const PROMO_VALUE_PAGES = [11, 9, 1, 2, 7];

export const PROMO = {
  en: {
    care: "Every Lali story is made with care.",
    over: (n: number) => `Over ${n}`,
    stories: "stories",
    proofSub: "in English and Amharic, for ages 3 to 9",
    url: "lali-kids.onrender.com",
  },
  am: {
    care: "እያንዳንዱ የላሊ ተረት በጥንቃቄ የተሰራ ነው።",
    over: (n: number) => `ከ${n} በላይ`,
    stories: "ተረቶች",
    proofSub: "በአማርኛና በእንግሊዝኛ፣ ከ3 እስከ 9 ዓመት ለሆኑ ልጆች",
    url: "lali-kids.onrender.com",
  },
};
