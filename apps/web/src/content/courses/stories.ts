import type { Story } from "../stories";
import { STORIES as fidelFoundations } from "./fidel-foundations/stories";
import { STORIES as amharicReaders } from "./amharic-readers/stories";
import { STORIES as numbersCounting } from "./numbers-counting/stories";
import { STORIES as mathsExplorers } from "./maths-explorers/stories";
import { STORIES as englishFirstWords } from "./english-first-words/stories";
import { STORIES as englishReaders } from "./english-readers/stories";
import { STORIES as valuesCharacter } from "./values-character/stories";
import { STORIES as ourEthiopia } from "./our-ethiopia/stories";
import { STORIES as scienceNature } from "./science-nature/stories";
import { STORIES as healthySafe } from "./healthy-safe/stories";

/** Every course's teaching stories (each has `course` set). */
export const COURSE_STORIES: Story[] = [...fidelFoundations, ...amharicReaders, ...numbersCounting, ...mathsExplorers, ...englishFirstWords, ...englishReaders, ...valuesCharacter, ...ourEthiopia, ...scienceNature, ...healthySafe];
