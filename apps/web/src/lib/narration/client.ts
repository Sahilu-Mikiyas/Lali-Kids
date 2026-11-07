"use client";

import { useCallback, useEffect, useState } from "react";

import type { Lang, Story } from "@/content/stories";
import { appAuthHeaders } from "@/lib/in-app";
import type { PageNarration, StoryNarration } from "./shared";

/** One page's recording for the reader: voice-actor narration, or a studio story's own clip. */
export type Clip = { url: string; narrator: string | null; wordTimes: number[] | null; durationMs: number | null };

/** Fetches the story's voice-actor narration (fresh links for an hour). Empty when there is none. */
export async function fetchNarration(storyId: string): Promise<StoryNarration> {
  try {
    const params = new URLSearchParams({ story: storyId });
    // Inside the app a paid launch story opens with a read pass in its address; it unlocks narration too.
    const pass = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("pass");
    if (pass) params.set("pass", pass);
    const r = await fetch(`/api/narration?${params}`, { headers: appAuthHeaders(), cache: "no-store" });
    if (!r.ok) return {};
    const body = (await r.json()) as { pages?: StoryNarration };
    return body.pages && typeof body.pages === "object" ? body.pages : {};
  } catch {
    return {};
  }
}

/**
 * The recording "Read to me" plays on each page: voice-actor narration first, then the clip a
 * studio story carries itself (or that the app's API merged in), else nothing (the browser's voice).
 */
export function useNarration(story: Story): (page: number, lang: Lang) => Clip | null {
  const [fetched, setFetched] = useState<StoryNarration>({});
  useEffect(() => {
    let alive = true;
    fetchNarration(story.id).then((n) => alive && setFetched(n));
    return () => {
      alive = false;
    };
  }, [story.id]);
  return useCallback(
    (page: number, lang: Lang): Clip | null => {
      const n: PageNarration | undefined = fetched[page]?.[lang];
      if (n?.url) return { url: n.url, narrator: n.narrator, wordTimes: n.wordTimes, durationMs: n.durationMs };
      const own = story.audio?.[page]?.[lang];
      if (!own) return null;
      return { url: own, narrator: story.narrators?.[page]?.[lang] ?? null, wordTimes: story.wordTimes?.[page]?.[lang] ?? null, durationMs: null };
    },
    [fetched, story.audio, story.narrators, story.wordTimes],
  );
}
