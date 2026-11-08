import type { ComponentType } from "react";

import type { AgeBand, Lang } from "../stories";

/*
  Learning packages ("courses"): buy once (about 1,500 birr), kept for good, or included in VIP one at
  a time per child. See docs/PACKAGES.md. A course is a ladder of levels; each level has lessons
  (teaching stories, interactive demonstrations, practice) and a level quiz; the course ends with a
  final test and a certificate.

  Content lives in src/content/courses/<courseId>/:
    index.ts           the Course (levels, lessons, quizzes)
    stories/<id>.ts    teaching stories (type Story, with `course: <courseId>`), listed in stories/index.ts
    demos/<id>.tsx     interactive demonstrations (DemoProps), listed in demos/index.tsx
    art.tsx            small pictures for quiz questions: Record<string, ComponentType<ArtProps>>
  and their animated scenes in src/components/book/courses/<courseId>/<storyId>.tsx (+ .css),
  listed in that folder's index.tsx (next/dynamic with { ssr: false }), with `scene: "lib-<storyId>"`.
*/

export type T = Record<Lang, string>;

export type CourseId =
  | "fidel-foundations"
  | "amharic-readers"
  | "numbers-counting"
  | "maths-explorers"
  | "english-first-words"
  | "english-readers"
  | "values-character"
  | "our-ethiopia"
  | "science-nature"
  | "healthy-safe";

/** A small picture for a quiz question or answer: an id in the course's art.tsx, optionally drawn N times. */
export type Pic = { art: string; count?: number };

export type ArtProps = { size?: number; className?: string };

export type Question =
  /** Pick the right answer (words and/or pictures). */
  | { kind: "choice"; prompt: T; pic?: Pic; options: { label?: T; pic?: Pic }[]; answer: number; explain?: T }
  /** Count the things in the picture and tap the number (digits, Ge'ez numerals, or both). */
  | { kind: "count"; prompt: T; pic: Pic; answer: number; numerals?: "digits" | "geez" | "both"; explain?: T }
  /** Put these in the right order (given here in the correct order; shown shuffled). */
  | { kind: "order"; prompt: T; items: { label?: T; pic?: Pic }[]; explain?: T }
  /** Match each left item to its right item (given here as correct pairs; right side shown shuffled). */
  | { kind: "match"; prompt: T; pairs: { left: { label?: T; pic?: Pic }; right: { label?: T; pic?: Pic } }[]; explain?: T }
  /** Yes or no. */
  | { kind: "truefalse"; prompt: T; pic?: Pic; answer: boolean; explain?: T };

export type Quiz = {
  id: string;
  title?: T;
  /** Share of questions right to pass; 0.8 when left out. */
  passMark?: number;
  questions: Question[];
};

export type Lesson =
  /** A teaching story (its id in this course's stories). */
  | { kind: "story"; id: string }
  /** An interactive demonstration (its id in this course's demos). */
  | { kind: "demo"; id: string; title: T }
  /** A short practice round (not scored for mastery, just for fun and feedback). */
  | { kind: "practice"; quiz: Quiz };

export type Level = {
  id: string;
  title: T;
  /** What the child can do after this level, in one line. */
  goal: T;
  lessons: Lesson[];
  /** Must be passed (passMark) to unlock the next level. */
  quiz: Quiz;
};

export type Course = {
  id: CourseId;
  title: T;
  tagline: T;
  /** One paragraph for parents: what the child will be able to do at the end. */
  outcome: T;
  ages: AgeBand[];
  color: string;
  priceEtb: number;
  /** "live" can be bought and used; "soon" shows in the catalogue as coming soon. */
  status: "live" | "soon";
  levels: Level[];
  finalTest: Quiz;
  /** The first story, readable by everyone as a taster. */
  tasterStoryId?: string;
};

export type DemoProps = { lang: Lang; onDone: () => void };
export type Demo = ComponentType<DemoProps>;
