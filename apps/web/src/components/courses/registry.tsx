"use client";

import type { ComponentType } from "react";

import type { ArtProps, Demo, Pic } from "@/content/courses/types";
import { ART as fidelFoundations } from "@/content/courses/fidel-foundations/art";
import { ART as amharicReaders } from "@/content/courses/amharic-readers/art";
import { ART as numbersCounting } from "@/content/courses/numbers-counting/art";
import { ART as mathsExplorers } from "@/content/courses/maths-explorers/art";
import { ART as englishFirstWords } from "@/content/courses/english-first-words/art";
import { ART as englishReaders } from "@/content/courses/english-readers/art";
import { ART as valuesCharacter } from "@/content/courses/values-character/art";
import { ART as ourEthiopia } from "@/content/courses/our-ethiopia/art";
import { ART as scienceNature } from "@/content/courses/science-nature/art";
import { ART as healthySafe } from "@/content/courses/healthy-safe/art";
import { DEMOS as fidelFoundationsDemos } from "@/content/courses/fidel-foundations/demos";
import { DEMOS as amharicReadersDemos } from "@/content/courses/amharic-readers/demos";
import { DEMOS as numbersCountingDemos } from "@/content/courses/numbers-counting/demos";
import { DEMOS as mathsExplorersDemos } from "@/content/courses/maths-explorers/demos";
import { DEMOS as englishFirstWordsDemos } from "@/content/courses/english-first-words/demos";
import { DEMOS as englishReadersDemos } from "@/content/courses/english-readers/demos";
import { DEMOS as valuesCharacterDemos } from "@/content/courses/values-character/demos";
import { DEMOS as ourEthiopiaDemos } from "@/content/courses/our-ethiopia/demos";
import { DEMOS as scienceNatureDemos } from "@/content/courses/science-nature/demos";
import { DEMOS as healthySafeDemos } from "@/content/courses/healthy-safe/demos";
import { FIXTURE_ART, FIXTURE_DEMOS } from "../../../e2e/fixtures/client";

/*
  The browser side of the learning packages: each course's quiz pictures (art.tsx) and
  demonstrations (demos/index.tsx). Neither holds answers; the quizzes themselves come from the
  server without them. The test packages' pictures only exist in the end-to-end build.
*/

const TEST = process.env.NEXT_PUBLIC_LALI_E2E === "1";

const ARTS: Record<string, Record<string, ComponentType<ArtProps>>> = {
  "fidel-foundations": fidelFoundations,
  "amharic-readers": amharicReaders,
  "numbers-counting": numbersCounting,
  "maths-explorers": mathsExplorers,
  "english-first-words": englishFirstWords,
  "english-readers": englishReaders,
  "values-character": valuesCharacter,
  "our-ethiopia": ourEthiopia,
  "science-nature": scienceNature,
  "healthy-safe": healthySafe,
  ...(TEST ? FIXTURE_ART : {}),
};

const DEMOS: Record<string, Record<string, Demo>> = {
  "fidel-foundations": fidelFoundationsDemos,
  "amharic-readers": amharicReadersDemos,
  "numbers-counting": numbersCountingDemos,
  "maths-explorers": mathsExplorersDemos,
  "english-first-words": englishFirstWordsDemos,
  "english-readers": englishReadersDemos,
  "values-character": valuesCharacterDemos,
  "our-ethiopia": ourEthiopiaDemos,
  "science-nature": scienceNatureDemos,
  "healthy-safe": healthySafeDemos,
  ...(TEST ? FIXTURE_DEMOS : {}),
};

export function demoFor(courseId: string, demoId: string): Demo | null {
  return DEMOS[courseId]?.[demoId] ?? null;
}

/** A quiz picture: the course's art, drawn `count` times (in a tidy cluster), or a friendly dot when missing. */
export function PicView({ courseId, pic, size = 64 }: { courseId: string; pic: Pic; size?: number }) {
  const Art = ARTS[courseId]?.[pic.art];
  const n = Math.max(1, Math.min(20, pic.count ?? 1));
  const each = n > 1 ? Math.max(28, Math.round(size / Math.sqrt(n) + 10)) : size;
  return (
    <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-1" data-pic={pic.art} data-pic-count={n}>
      {Array.from({ length: n }, (_, i) =>
        Art ? (
          <Art key={i} size={each} />
        ) : (
          <span key={i} className="inline-block rounded-full bg-gold" style={{ width: each * 0.6, height: each * 0.6 }} aria-hidden />
        ),
      )}
    </span>
  );
}
