"use client";

import Link from "next/link";
import { createElement, useCallback, useState } from "react";

import { finishLesson } from "@/app/[lang]/courses/actions";
import { recordStoryFinished } from "@/app/[lang]/account/actions";
import { Bee } from "@/components/characters";
import { StoryBook } from "@/components/storybook";
import type { Story } from "@/content/stories";
import { useLang, useT } from "@/i18n/provider";
import { confetti } from "@/lib/confetti";
import { tellApp } from "@/lib/in-app";
import { demoFor } from "./registry";

/** Saves a finished lesson: on the website with the family's session, in the app through its API. */
async function saveLesson(courseId: string, lessonId: string) {
  if (tellApp({ type: "lali:lesson-done", courseId, lessonId })) return;
  await finishLesson(courseId, lessonId).catch(() => null);
}

/** A teaching story in the normal reader. Reaching The End counts the lesson (and the story's star). */
export function CourseStory({ story, courseId, lessonId, backHref }: { story: Story; courseId: string; lessonId: string; backHref: string }) {
  const onFinish = useCallback(
    (id: string) => {
      void saveLesson(courseId, lessonId);
      if (!tellApp({ type: "lali:finished", storyId: id })) recordStoryFinished(id).catch(() => {});
    },
    [courseId, lessonId],
  );
  return <StoryBook story={story} onFinish={onFinish} backHref={backHref} />;
}

/** An interactive demonstration from the course; its `onDone` counts the lesson. */
export function CourseDemo({ courseId, demoId, lessonId, backHref, title }: { courseId: string; demoId: string; lessonId: string; backHref: string; title: string }) {
  const t = useT();
  const lang = useLang();
  const [done, setDone] = useState(false);
  const Demo = demoFor(courseId, demoId);
  const onDone = useCallback(() => {
    if (done) return;
    setDone(true);
    confetti(0.4);
    void saveLesson(courseId, lessonId);
  }, [courseId, lessonId, done]);
  return (
    <div className="space-y-5" data-demo-lesson={demoId}>
      <h1 className={`font-display text-4xl font-black ${lang === "am" ? "font-ethiopic" : ""}`}>{title}</h1>
      <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_8px_0_var(--color-line)]">
        {Demo ? createElement(Demo, { lang, onDone }) : <p className="p-10 text-center text-lg text-muted">{t.courses.demoMissing}</p>}
      </div>
      {done && (
        <div className="quiz-pop flex flex-wrap items-center gap-4 rounded-[28px] bg-[#FFF4D2] p-5 shadow-[0_6px_0_var(--color-line)]" data-lesson-finished="">
          <span className="animate-float">
            <Bee size={56} />
          </span>
          <p className="flex-1 font-display text-3xl font-black">{t.courses.lessonDone}</p>
          <Link href={backHref} className="btn btn-primary">
            {t.quiz.toMap}
          </Link>
        </div>
      )}
    </div>
  );
}
