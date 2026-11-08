import "server-only";

import { createHash, createHmac } from "node:crypto";

import type { Course, Pic, Question, Quiz, T } from "@/content/courses/types";

/*
  Quizzes and mastery, on the server (docs/PACKAGES.md).

  - The browser gets a quiz without its answers (`publicQuiz`): choices in their written order,
    "order" items and the right-hand side of "match" shuffled by a permutation only the server can
    work out (an HMAC of the child, the quiz and the question).
  - The browser sends answers in what it showed: a choice's index, a number, true/false, the shown
    indexes in the chosen order ("order"), or for each left item the shown right item ("match").
    `scoreQuiz` checks them against the course and says, per question, what was right.
  - `courseState` turns a child's progress row into the level map: passed, open, waiting (VIP's
    pace) or locked, with stars from the best score.
*/

export const PASS_MARK = 0.8;
/** VIP pace: at most one new level every 4 days. */
export const PACE_DAYS = 4;
const DAY = 86_400_000;

export type Item = { label?: T; pic?: Pic };
export type PublicQuestion =
  | { kind: "choice"; prompt: T; pic?: Pic; options: Item[] }
  | { kind: "count"; prompt: T; pic: Pic; numerals: "digits" | "geez" | "both" }
  | { kind: "order"; prompt: T; items: Item[] }
  | { kind: "match"; prompt: T; left: Item[]; right: Item[] }
  | { kind: "truefalse"; prompt: T; pic?: Pic };
export type PublicQuiz = { id: string; title?: T; passMark: number; questions: PublicQuestion[] };

/** One answer, in the terms of what the player showed. */
export type Answer = number | boolean | number[] | null;
export type QuestionResult = { correct: boolean; right: Answer; explain?: T };

function secret(): string {
  const base = process.env.PAGE_TOKEN_SECRET || process.env.SUPABASE_SECRET_KEY || "lali-dev-only";
  return createHash("sha256").update(`lali-quiz:${base}`).digest("base64url");
}

/** display[i] = the written index of the item shown at position i. Never the written order (n ≥ 2). */
export function permutation(seed: string, n: number): number[] {
  const out = Array.from({ length: n }, (_, i) => i);
  if (n < 2) return out;
  const bytes = createHmac("sha256", secret()).update(seed).digest();
  for (let i = n - 1; i > 0; i--) {
    const j = bytes[(n - 1 - i) % bytes.length] % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.every((v, i) => v === i)) out.push(out.shift()!);
  return out;
}

const seedOf = (childId: string, quizId: string, q: number) => `${childId}:${quizId}:${q}`;
const permFor = (childId: string, quizId: string, q: number, n: number) => permutation(seedOf(childId, quizId, q), n);

export const passMarkOf = (quiz: Quiz) => (typeof quiz.passMark === "number" && quiz.passMark > 0 && quiz.passMark <= 1 ? quiz.passMark : PASS_MARK);

/** A quiz as the player sees it: no answers, no explanations. */
export function publicQuiz(quiz: Quiz, childId: string): PublicQuiz {
  return {
    id: quiz.id,
    title: quiz.title,
    passMark: passMarkOf(quiz),
    questions: quiz.questions.map((q, i): PublicQuestion => {
      switch (q.kind) {
        case "choice":
          return { kind: "choice", prompt: q.prompt, pic: q.pic, options: q.options.map((o) => ({ label: o.label, pic: o.pic })) };
        case "count":
          return { kind: "count", prompt: q.prompt, pic: q.pic, numerals: q.numerals ?? "digits" };
        case "order": {
          const p = permFor(childId, quiz.id, i, q.items.length);
          return { kind: "order", prompt: q.prompt, items: p.map((k) => ({ label: q.items[k].label, pic: q.items[k].pic })) };
        }
        case "match": {
          const p = permFor(childId, quiz.id, i, q.pairs.length);
          return { kind: "match", prompt: q.prompt, left: q.pairs.map((x) => ({ label: x.left.label, pic: x.left.pic })), right: p.map((k) => ({ label: q.pairs[k].right.label, pic: q.pairs[k].right.pic })) };
        }
        case "truefalse":
          return { kind: "truefalse", prompt: q.prompt, pic: q.pic };
      }
    }),
  };
}

const isIndexList = (v: unknown, n: number): v is number[] =>
  Array.isArray(v) && v.length === n && v.every((x) => Number.isInteger(x) && x >= 0 && x < n) && new Set(v).size === n;

/** Whether one answer is right, and the right answer in the player's terms. */
export function checkQuestion(q: Question, answer: unknown, childId: string, quizId: string, index: number): QuestionResult {
  switch (q.kind) {
    case "choice":
      return { correct: answer === q.answer, right: q.answer, explain: q.explain };
    case "count":
      return { correct: typeof answer === "number" && answer === q.answer, right: q.answer, explain: q.explain };
    case "truefalse":
      return { correct: answer === q.answer, right: q.answer, explain: q.explain };
    case "order": {
      const p = permFor(childId, quizId, index, q.items.length);
      // The shown positions, in the written (right) order.
      const right = q.items.map((_, k) => p.indexOf(k));
      const correct = isIndexList(answer, q.items.length) && answer.every((shown, pos) => p[shown] === pos);
      return { correct, right, explain: q.explain };
    }
    case "match": {
      const p = permFor(childId, quizId, index, q.pairs.length);
      const right = q.pairs.map((_, k) => p.indexOf(k));
      const correct = isIndexList(answer, q.pairs.length) && answer.every((shown, left) => p[shown] === left);
      return { correct, right, explain: q.explain };
    }
  }
}

export type Scored = { score: number; total: number; passed: boolean; results: QuestionResult[] };

export function scoreQuiz(quiz: Quiz, answers: unknown, childId: string): Scored {
  const list = Array.isArray(answers) ? answers : [];
  const results = quiz.questions.map((q, i) => checkQuestion(q, list[i], childId, quiz.id, i));
  const score = results.filter((r) => r.correct).length;
  const total = quiz.questions.length;
  return { score, total, passed: total > 0 && score / total >= passMarkOf(quiz), results };
}

/** 3 stars for every answer right, 2 for 90% or more, 1 for a pass. */
export function starsFor(best: { score: number; total: number } | null | undefined, passMark = PASS_MARK): number {
  if (!best || !best.total) return 0;
  const r = best.score / best.total;
  if (r < passMark) return 0;
  return r >= 1 ? 3 : r >= 0.9 ? 2 : 1;
}

/* ---------------------------------------------------------------- progress and the level map */

export type ProgressRow = {
  child_id: string;
  course_id: string;
  current_level: number;
  lessons_done: string[] | null;
  quiz_best: Record<string, { score: number; total: number }> | null;
  started_at: string;
  level_unlocked_at: string;
  completed_at: string | null;
};

export type StepState = "passed" | "open" | "waiting" | "locked";

export type CourseState = {
  started: boolean;
  completed: boolean;
  completedAt: string | null;
  /** Levels passed so far (the final test counts as the level after the last). */
  currentLevel: number;
  levels: { id: string; state: StepState; stars: number; best: { score: number; total: number } | null; lessonsDone: string[] }[];
  final: { state: StepState; best: { score: number; total: number } | null; stars: number };
  /** When the waiting step opens (VIP's pace), else null. */
  opensAt: string | null;
};

/**
 * The level map for one child. `paced`: VIP's "one new level every 4 days" applies (the family
 * didn't buy the package). Without a row, nothing has started: the first level shows as open
 * when the child could start, so the map invites them in.
 */
export function courseState(course: Course, row: ProgressRow | null, paced: boolean, now = Date.now()): CourseState {
  const best = row?.quiz_best ?? {};
  const done = new Set(row?.lessons_done ?? []);
  const cl = row ? Math.max(0, Math.min(row.current_level, course.levels.length)) : 0;
  const unlockAt = row ? Date.parse(row.level_unlocked_at) : now;
  const waiting = Boolean(row) && paced && unlockAt > now;
  const stepState = (i: number): StepState => (i < cl ? "passed" : i === cl ? (waiting ? "waiting" : "open") : "locked");
  const levels = course.levels.map((l, i) => {
    const b = best[l.quiz.id] ?? null;
    return {
      id: l.id,
      state: stepState(i),
      stars: i < cl ? Math.max(1, starsFor(b, passMarkOf(l.quiz))) : 0,
      best: b,
      lessonsDone: l.lessons.map((x) => (x.kind === "practice" ? `practice-${x.quiz.id}` : `${x.kind}-${x.id}`)).filter((k) => done.has(k)),
    };
  });
  const fb = best[course.finalTest.id] ?? null;
  const completed = Boolean(row?.completed_at);
  return {
    started: Boolean(row),
    completed,
    completedAt: row?.completed_at ?? null,
    currentLevel: cl,
    levels,
    final: { state: completed ? "passed" : stepState(course.levels.length), best: fb, stars: completed ? Math.max(1, starsFor(fb, passMarkOf(course.finalTest))) : 0 },
    opensAt: waiting ? new Date(unlockAt).toISOString() : null,
  };
}

/** When the next step opens after passing the current one: now, or with VIP's pace 4 days after the current one opened. */
export function nextUnlock(row: ProgressRow, paced: boolean, now = Date.now()): string {
  if (!paced) return new Date(now).toISOString();
  return new Date(Math.max(now, Date.parse(row.level_unlocked_at) + PACE_DAYS * DAY)).toISOString();
}
