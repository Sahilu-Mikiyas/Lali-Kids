"use server";

import { headers } from "next/headers";

import { dict } from "@/i18n/dict";
import { langFromCookie } from "@/i18n/server";
import { isLessonKey, isQuizId } from "@/lib/courses/catalog";
import { beginCourseCheckout, type CourseCheckout } from "@/lib/courses/checkout";
import type { QuestionResult } from "@/lib/courses/engine";
import { lessonDone, practiceCheck, startCourse, submitQuiz, type Attempt, type CourseError } from "@/lib/courses/server";
import { loadFamily } from "@/lib/family";
import { originFrom } from "@/lib/origin";
import { allow } from "@/lib/rate-limit";
import { revalidate } from "@/lib/revalidate";

/*
  The learning packages' server actions. Each one loads the signed-in family (its own children,
  the reading child, its plan) and leaves every rule to src/lib/courses/server.ts, which writes
  with the secret key only after checking.
*/

export type ActionError = { ok: false; error: CourseError; opensAt?: string | null; activeOther?: string | null };
const isCourseId = (v: unknown): v is string => typeof v === "string" && /^[a-z0-9-]{1,60}$/.test(v);

export async function buyCourse(_prev: CourseCheckout | null, form: FormData): Promise<CourseCheckout | null> {
  const [family, lang, h] = await Promise.all([loadFamily(), langFromCookie(), headers()]);
  if (!family) return { error: dict[lang].errors.signInAgain };
  const courseId = String(form.get("course") ?? "");
  if (!isCourseId(courseId)) return { error: dict[lang].courses.cantBuy };
  return beginCourseCheckout(family.profile, courseId, originFrom(h), lang);
}

export async function chooseCourse(courseId: string): Promise<{ ok: true } | ActionError> {
  const family = await loadFamily();
  if (!family) return { ok: false, error: "signin" };
  if (!isCourseId(courseId)) return { ok: false, error: "notFound" };
  const r = await startCourse(family, courseId);
  if (!r.ok) return r;
  revalidate(`/courses/${courseId}`);
  revalidate("/account");
  return { ok: true };
}

export async function finishLesson(courseId: string, key: string): Promise<{ ok: true } | ActionError> {
  const family = await loadFamily();
  if (!family) return { ok: false, error: "signin" };
  if (!isCourseId(courseId) || !isLessonKey(key)) return { ok: false, error: "notFound" };
  const r = await lessonDone(family, courseId, key);
  if (!r.ok) return r;
  revalidate(`/courses/${courseId}`);
  return { ok: true };
}

export async function checkPractice(courseId: string, quizId: string, index: number, answer: unknown): Promise<{ ok: true; result: QuestionResult } | ActionError> {
  const family = await loadFamily();
  if (!family) return { ok: false, error: "signin" };
  if (!isCourseId(courseId) || !isQuizId(quizId)) return { ok: false, error: "notFound" };
  if (!allow(`practice:${family.profile.id}`, 240, 10 * 60_000)) return { ok: false, error: "locked" };
  return practiceCheck(family, courseId, quizId, index, answer);
}

export async function sendQuiz(courseId: string, quizId: string, answers: unknown): Promise<{ ok: true; attempt: Attempt } | ActionError> {
  const family = await loadFamily();
  if (!family) return { ok: false, error: "signin" };
  if (!isCourseId(courseId) || !isQuizId(quizId) || !Array.isArray(answers) || answers.length > 100) return { ok: false, error: "notFound" };
  // Plenty for a child, too few to guess every answer by brute force.
  if (!allow(`quiz:${family.profile.id}`, 30, 10 * 60_000)) return { ok: false, error: "locked" };
  const r = await submitQuiz(family, courseId, quizId, answers);
  if (r.ok) {
    revalidate(`/courses/${courseId}`);
    revalidate("/account");
  }
  return r;
}
