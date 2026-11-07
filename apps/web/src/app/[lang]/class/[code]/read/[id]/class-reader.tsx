"use client";

import { useCallback } from "react";

import { StoryBook } from "@/components/storybook";
import type { Story } from "@/content/stories";
import { markClassroom } from "@/lib/schools/classroom";
import { pupilFinished } from "../../../actions";

// Before the reader's first requests: they act as the signed-in pupil, not as a family.
markClassroom();

/** The storybook on a classroom tablet: the pupil's name, their stars, and back to the class shelf. */
export function ClassReader({ story, code, name }: { story: Story; code: string; name: string }) {
  const onFinish = useCallback((id: string) => {
    pupilFinished(id).catch(() => {});
  }, []);
  return <StoryBook story={story} onFinish={onFinish} childName={name} classroom={{ shelfHref: `/class/${code}` }} />;
}
