import "server-only";

import { COURSES } from "@/content/courses";
import type { Course, CourseId, Lesson, Quiz } from "@/content/courses/types";
import { getStory } from "@/content/stories";
import { TEST_COURSES } from "@/content/test-fixtures";

/*
  The learning packages on the server (docs/PACKAGES.md). Course data holds the quiz answers, so
  it never goes to the browser as it is: pages pass on only what they need (see engine.ts for
  quizzes without answers). The end-to-end suite's test packages are known here (so their pages
  work in the test build) but never listed in the catalogue.
*/

/** Every package the server knows, the test ones included in the test build. */
export const ALL_COURSES: Course[] = [...COURSES, ...TEST_COURSES];

/** The ten packages, in catalogue order. */
export const CATALOGUE: Course[] = COURSES;

export function courseById(id: string | null | undefined): Course | null {
  return ALL_COURSES.find((c) => c.id === id) ?? null;
}

/** Ready to buy and use: live, with at least one level and a final test (the launch packages are still being written). */
export function isReady(c: Course): boolean {
  return c.status === "live" && c.levels.length > 0 && c.finalTest.questions.length > 0;
}

/** Stories everyone may read as a taste of a live package. */
export function tasterIds(): Set<string> {
  return new Set(ALL_COURSES.filter((c) => c.status === "live" && c.tasterStoryId).map((c) => c.tasterStoryId!));
}

/** A lesson's id: `story-<storyId>`, `demo-<demoId>` or `practice-<quizId>`. */
export function lessonKey(l: Lesson): string {
  return l.kind === "practice" ? `practice-${l.quiz.id}` : `${l.kind}-${l.id}`;
}

export const isLessonKey = (v: unknown): v is string => typeof v === "string" && /^(story|demo|practice)-[a-z0-9-]{1,100}$/.test(v);
export const isQuizId = (v: unknown): v is string => typeof v === "string" && /^[a-z0-9-]{1,100}$/.test(v);

/** A lesson in a course, with the index of its level. */
export function findLesson(course: Course, key: string): { level: number; lesson: Lesson } | null {
  for (const [level, l] of course.levels.entries()) {
    const lesson = l.lessons.find((x) => lessonKey(x) === key);
    if (lesson) return { level, lesson };
  }
  return null;
}

export type QuizPlace = { quiz: Quiz; kind: "level" | "final" | "practice"; level: number };

/** Where a quiz sits in a course: a level's quiz, a practice round in a level, or the final test (level = number of levels). */
export function findQuiz(course: Course, quizId: string): QuizPlace | null {
  for (const [level, l] of course.levels.entries()) {
    if (l.quiz.id === quizId) return { quiz: l.quiz, kind: "level", level };
    for (const lesson of l.lessons) if (lesson.kind === "practice" && lesson.quiz.id === quizId) return { quiz: lesson.quiz, kind: "practice", level };
  }
  if (course.finalTest.id === quizId) return { quiz: course.finalTest, kind: "final", level: course.levels.length };
  return null;
}

/** The course a quiz id belongs to (quiz ids are unique across packages). */
export function courseOfQuiz(quizId: string): { course: Course; place: QuizPlace } | null {
  for (const course of ALL_COURSES) {
    const place = findQuiz(course, quizId);
    if (place) return { course, place };
  }
  return null;
}

/** A lesson as the level map shows it: title and kind, no answers. */
export type PublicLesson = { key: string; kind: Lesson["kind"]; title: Record<"en" | "am", string>; color?: string };

export function publicLesson(l: Lesson): PublicLesson {
  if (l.kind === "story") {
    const s = getStory(l.id);
    return { key: lessonKey(l), kind: "story", title: s?.title ?? { en: l.id, am: l.id }, color: s?.color };
  }
  if (l.kind === "demo") return { key: lessonKey(l), kind: "demo", title: l.title };
  return { key: lessonKey(l), kind: "practice", title: l.quiz.title ?? { en: "Practice", am: "ልምምድ" } };
}

/** The catalogue card of a package: everything but the lessons and quizzes. */
export type CourseCard = {
  id: CourseId;
  title: Record<"en" | "am", string>;
  tagline: Record<"en" | "am", string>;
  outcome: Record<"en" | "am", string>;
  ages: string[];
  color: string;
  priceEtb: number;
  status: Course["status"];
  ready: boolean;
  levels: number;
};

export function courseCard(c: Course): CourseCard {
  return { id: c.id, title: c.title, tagline: c.tagline, outcome: c.outcome, ages: c.ages, color: c.color, priceEtb: c.priceEtb, status: c.status, ready: isReady(c), levels: c.levels.length };
}
