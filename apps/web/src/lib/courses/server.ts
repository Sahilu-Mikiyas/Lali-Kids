import "server-only";

import { cache } from "react";

import type { Course, CourseId } from "@/content/courses/types";
import { familyEntitlements } from "@/lib/entitlements";
import type { Child, Family } from "@/lib/family";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { courseById, findLesson, findQuiz, isReady } from "./catalog";
import { checkQuestion, courseState, nextUnlock, scoreQuiz, starsFor, passMarkOf, type CourseState, type ProgressRow, type QuestionResult, type Scored } from "./engine";

/*
  Learning packages for a family (docs/PACKAGES.md): who may use which package, each child's
  progress, and every write. All writes use the secret key, and only after checking, on the
  server, that the child is the family's own and may read (familyFor), that the family has the
  package (bought, or VIP), and that the lesson or quiz is in a level that is open.

  Tables (migration 0016): family_courses (bought packages), course_payments (pending purchases),
  course_progress (one row per child and package) and quiz_attempts. Before the migration is
  applied every read comes back empty and writes answer "off", so the pages still render.
*/

const db = () => createSupabaseAdmin();

export const coursesReady = cache(async (): Promise<boolean> => {
  if (!hasSecretKey()) return false;
  const { error } = await db().from("course_progress").select("child_id").limit(1);
  return !error;
});

/** The packages a family bought (kept for good). */
export const ownedCourses = cache(async (familyId: string): Promise<Set<string>> => {
  if (!hasSecretKey()) return new Set();
  const { data, error } = await db().from("family_courses").select("course_id").eq("family_id", familyId);
  return new Set(error ? [] : ((data ?? []) as { course_id: string }[]).map((r) => r.course_id));
});

export type Access = "owned" | "vip" | "none";

/** How a family has a package: bought (no pace), included in VIP (one at a time, paced), or not at all. */
export function accessTo(courseId: string, owned: Set<string>, vip: boolean): Access {
  return owned.has(courseId) ? "owned" : vip ? "vip" : "none";
}

/** Whether a family may open a package's stories at all (story reader, narration): bought or VIP. */
export async function familyHasCourse(familyId: string | null, courseId: string, role?: string | null): Promise<boolean> {
  if (!familyId) return false;
  const [ent, owned] = await Promise.all([familyEntitlements(familyId, role), ownedCourses(familyId)]);
  return accessTo(courseId, owned, ent.allCourses) !== "none";
}

/** Every package row of these children (the family's own, checked by the caller). */
export async function progressRows(childIds: string[]): Promise<ProgressRow[]> {
  if (!childIds.length || !(await coursesReady())) return [];
  const { data, error } = await db().from("course_progress").select("*").in("child_id", childIds);
  return error ? [] : ((data ?? []) as ProgressRow[]);
}

export type CourseView = {
  course: Course;
  child: Child | null;
  ready: boolean;
  /** Migration 0016 is applied (progress can be saved). */
  on: boolean;
  access: Access;
  /** VIP's pace applies (included in VIP, not bought). */
  paced: boolean;
  row: ProgressRow | null;
  state: CourseState;
  /** The child's package in progress under VIP, if it is another one. */
  activeOther: CourseId | null;
  /** VIP and nothing else in progress: the child can start this one now. */
  canStart: boolean;
};

/** One package as one child sees it. */
export async function courseView(family: Family, course: Course, child: Child | null = family.current): Promise<CourseView> {
  const [on, owned] = await Promise.all([coursesReady(), ownedCourses(family.profile.id)]);
  const access = accessTo(course.id, owned, family.entitlements.allCourses);
  const rows = child && !child.readOnly ? await progressRows([child.id]) : [];
  const row = rows.find((r) => r.course_id === course.id) ?? null;
  // VIP: one package at a time per child. Bought packages and finished ones don't count.
  const other = rows.find((r) => r.course_id !== course.id && !r.completed_at && !owned.has(r.course_id) && courseById(r.course_id));
  const paced = access === "vip";
  return {
    course,
    child,
    ready: isReady(course),
    on,
    access,
    paced,
    row,
    state: courseState(course, row, paced),
    activeOther: (other?.course_id as CourseId | undefined) ?? null,
    canStart: on && isReady(course) && access === "vip" && !row && !other && Boolean(child && !child.readOnly),
  };
}

export type CourseError = "signin" | "child" | "notReady" | "noAccess" | "notStarted" | "oneAtATime" | "locked" | "notFound" | "off";
export type Result<T> = ({ ok: true } & T) | { ok: false; error: CourseError; opensAt?: string | null; activeOther?: string | null };

const fail = (error: CourseError, extra: { opensAt?: string | null; activeOther?: string | null } = {}) => ({ ok: false as const, error, ...extra });

async function insertRow(childId: string, courseId: string): Promise<ProgressRow | null> {
  const now = new Date().toISOString();
  const row = { child_id: childId, course_id: courseId, current_level: 0, lessons_done: [], quiz_best: {}, started_at: now, level_unlocked_at: now, completed_at: null };
  const { data, error } = await db().from("course_progress").upsert(row, { onConflict: "child_id,course_id", ignoreDuplicates: true }).select("*");
  if (error) return null;
  const list = (data ?? []) as ProgressRow[];
  if (list[0]) return list[0];
  const again = await progressRows([childId]);
  return again.find((r) => r.course_id === courseId) ?? null;
}

/** The view, with the child's row created when the package is bought (bought packages start by themselves). */
async function usable(family: Family, courseId: string): Promise<Result<{ view: CourseView; row: ProgressRow }>> {
  const course = courseById(courseId);
  if (!course) return fail("notFound");
  const child = family.current;
  if (!child) return fail("child");
  const view = await courseView(family, course, child);
  if (!view.ready) return fail("notReady");
  if (!view.on) return fail("off");
  if (view.access === "none") return fail("noAccess");
  let row = view.row;
  if (!row) {
    if (view.access !== "owned") return fail("notStarted", { activeOther: view.activeOther });
    row = await insertRow(child.id, course.id);
    if (!row) return fail("off");
    view.row = row;
    view.state = courseState(course, row, view.paced);
  }
  return { ok: true, view, row };
}

/** VIP: start a package for the reading child (one at a time). Bought packages start by themselves. */
export async function startCourse(family: Family, courseId: string): Promise<Result<{ view: CourseView }>> {
  const course = courseById(courseId);
  if (!course) return fail("notFound");
  if (!family.current) return fail("child");
  const view = await courseView(family, course);
  if (!view.ready) return fail("notReady");
  if (!view.on) return fail("off");
  if (view.access === "none") return fail("noAccess");
  if (view.row) return { ok: true, view };
  if (view.access === "vip" && view.activeOther) return fail("oneAtATime", { activeOther: view.activeOther });
  const row = await insertRow(family.current.id, course.id);
  if (!row) return fail("off");
  return { ok: true, view: { ...view, row, state: courseState(course, row, view.paced), canStart: false } };
}

const openStep = (s: string) => s === "open" || s === "passed";

/** A lesson finished (a story read to The End, a demonstration done, a practice round played). */
export async function lessonDone(family: Family, courseId: string, key: string): Promise<Result<{ lessonsDone: string[] }>> {
  const u = await usable(family, courseId);
  if (!u.ok) return u;
  const found = findLesson(u.view.course, key);
  if (!found) return fail("notFound");
  const step = u.view.state.levels[found.level];
  if (!openStep(step.state)) return fail("locked", { opensAt: u.view.state.opensAt });
  const done = new Set(u.row.lessons_done ?? []);
  if (!done.has(key)) {
    done.add(key);
    const { error } = await db().from("course_progress").update({ lessons_done: [...done] }).eq("child_id", u.row.child_id).eq("course_id", u.row.course_id);
    if (error) return fail("off");
  }
  return { ok: true, lessonsDone: [...done] };
}

/** Practice: checks one answer and says what was right. Nothing is recorded. */
export async function practiceCheck(family: Family, courseId: string, quizId: string, index: number, answer: unknown): Promise<Result<{ result: QuestionResult }>> {
  const u = await usable(family, courseId);
  if (!u.ok) return u;
  const place = findQuiz(u.view.course, quizId);
  if (!place || place.kind !== "practice") return fail("notFound");
  if (!openStep(u.view.state.levels[place.level]?.state ?? "locked")) return fail("locked", { opensAt: u.view.state.opensAt });
  const q = place.quiz.questions[index];
  if (!Number.isInteger(index) || !q) return fail("notFound");
  return { ok: true, result: checkQuestion(q, answer, u.row.child_id, quizId, index) };
}

export type Attempt = Scored & { advanced: boolean; completed: boolean; stars: number; opensAt: string | null };

/**
 * A level quiz or the final test: scored on the server against the course. Passing the current
 * level's quiz opens the next level (with VIP's pace, at most one new level every 4 days);
 * passing the final test completes the package (certificate and sticker).
 */
export async function submitQuiz(family: Family, courseId: string, quizId: string, answers: unknown): Promise<Result<{ attempt: Attempt }>> {
  const u = await usable(family, courseId);
  if (!u.ok) return u;
  const { course, state } = u.view;
  const place = findQuiz(course, quizId);
  if (!place || place.kind === "practice") return fail("notFound");
  const step = place.kind === "final" ? state.final : state.levels[place.level];
  if (!step || !openStep(step.state)) return fail("locked", { opensAt: state.opensAt });
  if (!place.quiz.questions.length) return fail("notReady");

  const scored = scoreQuiz(place.quiz, answers, u.row.child_id);
  const now = Date.now();
  const at = new Date(now).toISOString();
  await db().from("quiz_attempts").insert({ child_id: u.row.child_id, course_id: course.id, quiz_id: quizId, score: scored.score, total: scored.total, at });

  const best = { ...(u.row.quiz_best ?? {}) };
  const prev = best[quizId];
  if (!prev || scored.score / scored.total > prev.score / prev.total) best[quizId] = { score: scored.score, total: scored.total };
  const update: Partial<ProgressRow> = { quiz_best: best };
  let advanced = false;
  let completed = false;
  if (scored.passed && place.kind === "level" && place.level === u.row.current_level) {
    update.current_level = place.level + 1;
    update.level_unlocked_at = nextUnlock(u.row, u.view.paced, now);
    advanced = true;
  }
  if (scored.passed && place.kind === "final" && !u.row.completed_at) {
    update.completed_at = at;
    completed = true;
  }
  const { error } = await db().from("course_progress").update(update).eq("child_id", u.row.child_id).eq("course_id", course.id);
  if (error) return fail("off");
  const after = courseState(course, { ...u.row, ...update } as ProgressRow, u.view.paced, now);
  return {
    ok: true,
    attempt: { ...scored, advanced, completed, stars: starsFor(scored, passMarkOf(place.quiz)), opensAt: after.opensAt },
  };
}

/** Each child's packages, for the Grown-ups' corner, the progress map and the app. */
export type ChildCourse = {
  courseId: CourseId;
  title: Record<"en" | "am", string>;
  color: string;
  access: Access;
  level: number;
  levels: number;
  completedAt: string | null;
  startedAt: string;
  opensAt: string | null;
  scores: { quizId: string; label: string; score: number; total: number }[];
};

export async function familyCourses(family: Family): Promise<Record<string, ChildCourse[]>> {
  const kids = family.children;
  const [rows, owned] = await Promise.all([progressRows(kids.map((c) => c.id)), ownedCourses(family.profile.id)]);
  const out: Record<string, ChildCourse[]> = Object.fromEntries(kids.map((c) => [c.id, []]));
  for (const r of rows) {
    const course = courseById(r.course_id);
    if (!course || !out[r.child_id]) continue;
    const access = accessTo(course.id, owned, family.entitlements.allCourses);
    const st = courseState(course, r, access === "vip");
    const labels = new Map<string, string>([...course.levels.map((l, i) => [l.quiz.id, `${i + 1}`] as const), [course.finalTest.id, "final"]]);
    out[r.child_id].push({
      courseId: course.id,
      title: course.title,
      color: course.color,
      access,
      level: st.currentLevel,
      levels: course.levels.length,
      completedAt: r.completed_at,
      startedAt: r.started_at,
      opensAt: st.opensAt,
      scores: Object.entries(r.quiz_best ?? {})
        .filter(([id]) => labels.has(id))
        .map(([quizId, b]) => ({ quizId, label: labels.get(quizId)!, score: b.score, total: b.total })),
    });
  }
  return out;
}

/** The packages a child finished, for the sticker book (course stickers). */
export async function finishedCourses(childId: string): Promise<string[]> {
  return (await progressRows([childId])).filter((r) => r.completed_at && courseById(r.course_id)).map((r) => r.course_id);
}
