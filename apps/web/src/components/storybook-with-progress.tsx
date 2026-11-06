"use client";

import { useCallback } from "react";

import { recordStoryFinished } from "@/app/[lang]/account/actions";
import type { Story } from "@/content/stories";
import { tellApp } from "@/lib/in-app";
import { StoryBook } from "./storybook";

/** The storybook, plus saving a finished story to the signed-in child's record. */
export function StoryBookWithProgress({ story }: { story: Story }) {
  const onFinish = useCallback((id: string) => {
    // Inside the Lali app, the app records the star with the family's account.
    if (tellApp({ type: "lali:finished", storyId: id })) return;
    // Signed-out visitors keep their stars in the browser; nothing to save.
    recordStoryFinished(id).catch(() => {});
  }, []);
  return <StoryBook story={story} onFinish={onFinish} />;
}
