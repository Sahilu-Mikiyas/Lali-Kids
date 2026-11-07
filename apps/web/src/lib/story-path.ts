import type { Lang, Story, StoryPage } from "@/content/stories";

/*
  Two phase-4 reader features as plain functions (no story data, no browser APIs, safe anywhere):

  1. The child's name. Story text may say `{name}`; the reader shows the reading child's name,
     or a friendly default. Stored text always keeps `{name}`.
  2. Story choices. A page with `choices` lets the child pick the next page; `next` on a page
     sends the reader elsewhere (the end of a branch). `storyPath` turns the picks so far into
     the run of pages this read goes through.
*/

export const NAME_TOKEN = "{name}";
export const DEFAULT_NAME: Record<Lang, string> = { en: "friend", am: "ጓደኛ" };
/** Child names are 1–40 characters (the database checks the same). */
const MAX_NAME = 40;

/** A child's name as the reader shows it: trimmed, single-spaced, at most 40 characters. */
export function cleanName(name: string | null | undefined): string | null {
  const n = (name ?? "").replace(/[\s\u0000-\u001f]+/g, " ").trim().slice(0, MAX_NAME).trim();
  return n || null;
}

export function hasName(text: string | null | undefined): boolean {
  return Boolean(text && text.includes(NAME_TOKEN));
}

/** Whether any page of the story says `{name}` (in either language). */
export function storyHasName(story: Pick<Story, "pages">): boolean {
  return story.pages.some((p) => hasName(p.en) || hasName(p.am));
}

/** The text with `{name}` replaced: the child's name, or the default for the language. */
export function fillName(text: string, name: string | null | undefined, lang: Lang): string {
  if (!hasName(text)) return text;
  return text.split(NAME_TOKEN).join(cleanName(name) ?? DEFAULT_NAME[lang]);
}

/**
 * The page's words after filling in the name, and which of them are (part of) the name, so the
 * read-along microphone can count the child's own name however the speech service spells it.
 * Words are split on single spaces, the same way the reader splits them.
 */
export function nameWords(text: string, name: string | null | undefined, lang: Lang): { text: string; words: string[]; nameAt: Set<number> } {
  const filled = cleanName(name) ?? DEFAULT_NAME[lang];
  const words: string[] = [];
  const nameAt = new Set<number>();
  for (const raw of text.split(" ")) {
    if (!raw.includes(NAME_TOKEN)) {
      words.push(raw);
      continue;
    }
    const parts = raw.split(NAME_TOKEN).join(filled).split(" ");
    for (const p of parts) {
      nameAt.add(words.length);
      words.push(p);
    }
  }
  return { text: words.join(" "), words, nameAt };
}

/** A copy of the story with every `{name}` filled in (pages and the grown-ups' card). */
export function withName<T extends Pick<Story, "pages" | "grownUps">>(story: T, name: string | null | undefined): T {
  if (!storyHasName(story) && !JSON.stringify(story.grownUps ?? "").includes(NAME_TOKEN)) return story;
  const page = (p: StoryPage): StoryPage => ({ ...p, en: fillName(p.en, name, "en"), am: fillName(p.am, name, "am") });
  const g = story.grownUps;
  return {
    ...story,
    pages: story.pages.map(page),
    grownUps: g && {
      talkAbout: { en: g.talkAbout.en.map((q) => fillName(q, name, "en")), am: g.talkAbout.am.map((q) => fillName(q, name, "am")) },
      activity: { en: fillName(g.activity.en, name, "en"), am: fillName(g.activity.am, name, "am") },
    },
  };
}

/* ---------------------------------------------------------------- story choices */

/** The page that follows `page` when the child picked `pick` (an option index) there. */
function after(pages: StoryPage[], page: number, pick: number | undefined): number {
  const p = pages[page];
  const options = p?.choices?.options ?? [];
  if (options.length) return options[pick !== undefined && options[pick] ? pick : 0].goTo;
  return typeof p?.next === "number" ? p.next : page + 1;
}

export type StoryPath = {
  /** Page indexes in reading order, for this read. */
  seq: number[];
  /**
   * Where in `seq` the first choice the child hasn't made yet is, or -1. Pages after it follow
   * the first option for now (so the dots have something to show) and change once they choose.
   */
  open: number;
};

/**
 * The pages this read goes through, given the picks so far ({ page index: option index }).
 * A story without choices is simply every page in order. A page is never visited twice, so a
 * mistake in a story's `goTo`/`next` can't loop forever.
 */
export function storyPath(story: Pick<Story, "pages">, picks: Record<number, number> = {}): StoryPath {
  const pages = story.pages;
  const seq: number[] = [];
  const seen = new Set<number>();
  let open = -1;
  let p = 0;
  while (p >= 0 && p < pages.length && !seen.has(p)) {
    seen.add(p);
    seq.push(p);
    if (pages[p].choices?.options.length && picks[p] === undefined && open < 0) open = seq.length - 1;
    p = after(pages, p, picks[p]);
  }
  return { seq, open };
}

/** Whether the story has any choices. */
export function hasChoices(story: Pick<Story, "pages">): boolean {
  return story.pages.some((p) => Boolean(p.choices?.options.length));
}

/**
 * Every path through the story (for checks and the docs): each a list of page indexes.
 * Choices multiply, so this stops at 64 paths.
 */
export function allPaths(story: Pick<Story, "pages">): number[][] {
  const out: number[][] = [];
  const walk = (picks: Record<number, number>) => {
    if (out.length >= 64) return;
    const { seq, open } = storyPath(story, picks);
    if (open < 0) {
      out.push(seq);
      return;
    }
    const page = seq[open];
    story.pages[page].choices!.options.forEach((_, i) => walk({ ...picks, [page]: i }));
  };
  walk({});
  return out;
}
