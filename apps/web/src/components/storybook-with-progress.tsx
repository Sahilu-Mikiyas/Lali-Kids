"use client";

import { useCallback } from "react";

import { recordStoryFinished } from "@/app/account/actions";
import type { Story } from "@/content/stories";
import { StoryBook } from "./storybook";

/** The storybook, plus saving a finished story to the signed-in child's record. */
export function StoryBookWithProgress({ story }: { story: Story }) {
  const onFinish = useCallback((id: string) => {
    // Signed-out visitors keep their stars in the browser; nothing to save.
    recordStoryFinished(id).catch(() => {});
  }, []);
  return <StoryBook story={story} onFinish={onFinish} />;
}
