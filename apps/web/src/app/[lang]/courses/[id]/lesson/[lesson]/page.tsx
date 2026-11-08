import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";

import { CourseDemo, CourseStory } from "@/components/courses/lesson-players";
import { QuizPlayer } from "@/components/courses/quiz-player";
import { SiteNav } from "@/components/site-chrome";
import { getStory } from "@/content/stories";
import { courseById, findLesson } from "@/lib/courses/catalog";
import { publicQuiz } from "@/lib/courses/engine";
import { courseView } from "@/lib/courses/server";
import { loadFamily } from "@/lib/family";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Lesson", robots: { index: false } };

function Note({ children, back, label }: { children: ReactNode; back: string; label: string }) {
  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]" data-lesson-locked="">
      <p className="text-lg">{children}</p>
      <Link href={back} className="btn btn-primary">
        {label}
      </Link>
    </div>
  );
}

/**
 * One lesson of a learning package, for the reading child. Checked on the server first: the
 * family has the package (bought, or VIP with this package started), and the lesson's level is
 * open. Only then is the story (or the practice round, without answers) sent to the browser.
 */
async function Lesson({ params }: PageProps<"/[lang]/courses/[id]/lesson/[lesson]">) {
  await connection();
  const { id, lesson: key } = await params;
  const course = courseById(id);
  if (!course) notFound();
  const back = `/courses/${course.id}`;
  const family = await loadFamily().catch(() => null);
  if (!family) redirect(`/login?next=${encodeURIComponent(`/courses/${id}/lesson/${key}`)}`);
  const [t, lang] = await Promise.all([getT(), getLang()]);
  const found = findLesson(course, key);
  if (!found) notFound();
  const view = await courseView(family, course);
  const started = Boolean(view.row) || view.access === "owned";
  const step = view.state.levels[found.level]?.state;
  if (!view.child || !view.ready || !view.on || view.access === "none" || !started || (step !== "open" && step !== "passed")) {
    const why =
      view.access === "none" ? t.courses.noAccess : !view.child ? t.courses.addChild : step === "waiting" && view.state.opensAt ? t.courses.opensOn(fmtDate(lang, view.state.opensAt)) : t.courses.lessonLocked;
    return (
      <Note back={back} label={t.quiz.toMap}>
        {why}
      </Note>
    );
  }

  const l = found.lesson;
  if (l.kind === "story") {
    const story = getStory(l.id);
    if (!story) notFound();
    return <CourseStory story={story} courseId={course.id} lessonId={key} backHref={back} />;
  }
  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-16">
      <Link href={back} className="inline-block font-bold text-blue hover:underline">
        {t.courses.backToMap}
      </Link>
      {l.kind === "demo" ? (
        <CourseDemo courseId={course.id} demoId={l.id} lessonId={key} backHref={back} title={l.title[lang]} />
      ) : (
        <>
          <h1 className="font-display text-4xl font-black">{l.quiz.title?.[lang] ?? t.courses.kinds.practice}</h1>
          <QuizPlayer courseId={course.id} quiz={publicQuiz(l.quiz, view.child.id)} mode="practice" lessonKey={key} backHref={back} color={course.color} />
        </>
      )}
    </div>
  );
}

export default function LessonPage(props: PageProps<"/[lang]/courses/[id]/lesson/[lesson]">) {
  return (
    <>
      <SiteNav />
      <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)] px-4 pb-20 pt-28 sm:px-6">
        <Suspense fallback={<div className="mx-auto h-96 max-w-6xl animate-pulse rounded-[32px] bg-white" />}>
          <Lesson {...props} />
        </Suspense>
      </main>
    </>
  );
}
