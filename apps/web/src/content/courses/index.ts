import type { Course, CourseId } from "./types";
import fidelFoundations from "./fidel-foundations";
import amharicReaders from "./amharic-readers";
import numbersCounting from "./numbers-counting";
import mathsExplorers from "./maths-explorers";
import englishFirstWords from "./english-first-words";
import englishReaders from "./english-readers";
import valuesCharacter from "./values-character";
import ourEthiopia from "./our-ethiopia";
import scienceNature from "./science-nature";
import healthySafe from "./healthy-safe";

/** Every learning package, in catalogue order. */
export const COURSES: Course[] = [fidelFoundations, amharicReaders, numbersCounting, mathsExplorers, englishFirstWords, englishReaders, valuesCharacter, ourEthiopia, scienceNature, healthySafe];

export function getCourse(id: string | null | undefined): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export type { CourseId };
