import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { QuizPlayer } from "@/components/courses/quiz-player";
import { SiteNav } from "@/components/site-chrome";
import { courseById, findQuiz } from "@/lib/courses/catalog";
import { publicQuiz } from "@/lib/courses/engine";
import { courseView } from "@/lib/courses/server";
import { loadFamily } from "@/lib/family";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Quiz", robots: { index: false } };

/**
 * A level quiz or the final test. The questions are sent without answers, and only for a level
 * the child has open (or passed, to try for more stars). The server scores the answers.
 */
async function Quiz({ params }: PageProps<"/[lang]/courses/[id]/quiz/[quiz]">) {
  await connection();
  const { id, quiz: quizId } = await params;
  const course = courseById(id);
  if (!course) notFound();
  const back = `/courses/${course.id}`;
  const family = await loadFamily().catch(() => null);
  if (!family) redirect(`/login?next=${encodeURIComponent(`/courses/${id}/quiz/${quizId}`)}`);
  const place = findQuiz(course, quizId);
  if (!place || place.kind === "practice") notFound();
  const [t, lang, view] = await Promise.all([getT(), getLang(), courseView(family, course)]);
  const started = Boolean(view.row) || view.access === "owned";
  const step = place.kind === "final" ? view.state.final.state : view.state.levels[place.level]?.state;
  if (!view.child || !view.ready || !view.on || view.access === "none" || !started || (step !== "open" && step !== "passed")) {
    const why = view.access === "none" ? t.courses.noAccess : step === "waiting" && view.state.opensAt ? t.courses.opensOn(fmtDate(lang, view.state.opensAt)) : t.courses.lessonLocked;
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]" data-quiz-locked="">
        <p className="text-lg">{why}</p>
        <Link href={back} className="btn btn-primary">
          {t.quiz.toMap}
        </Link>
      </div>
    );
  }
  const title = place.kind === "final" ? t.courses.finalTest : `${t.courses.level(place.level + 1)} · ${course.levels[place.level].title[lang]}`;
  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-16">
      <Link href={back} className="inline-block font-bold text-blue hover:underline">
        {t.courses.backToMap}
      </Link>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: course.color }}>
          {course.title[lang]}
        </p>
        <h1 className="font-display text-4xl font-black">{title}</h1>
        <p className="text-muted">{t.courses.quizFor(view.child.name)}</p>
      </div>
      <QuizPlayer
        courseId={course.id}
        quiz={publicQuiz(place.quiz, view.child.id)}
        mode={place.kind === "final" ? "final" : "quiz"}
        backHref={back}
        certificateHref={`/courses/${course.id}/certificate`}
        color={course.color}
      />
    </div>
  );
}

export default function QuizPage(props: PageProps<"/[lang]/courses/[id]/quiz/[quiz]">) {
  return (
    <>
      <SiteNav />
      <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)] px-4 pb-20 pt-28 sm:px-6">
        <Suspense fallback={<div className="mx-auto h-96 max-w-3xl animate-pulse rounded-[32px] bg-white" />}>
          <Quiz {...props} />
        </Suspense>
      </main>
    </>
  );
}
