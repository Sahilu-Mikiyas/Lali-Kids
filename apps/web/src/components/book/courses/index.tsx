"use client";

import type { ComponentType } from "react";

import { SCENES as fidelFoundations } from "./fidel-foundations";
import { SCENES as amharicReaders } from "./amharic-readers";
import { SCENES as numbersCounting } from "./numbers-counting";
import { SCENES as mathsExplorers } from "./maths-explorers";
import { SCENES as englishFirstWords } from "./english-first-words";
import { SCENES as englishReaders } from "./english-readers";
import { SCENES as valuesCharacter } from "./values-character";
import { SCENES as ourEthiopia } from "./our-ethiopia";
import { SCENES as scienceNature } from "./science-nature";
import { SCENES as healthySafe } from "./healthy-safe";

/** Scenes of every course's stories, by story id (used with `scene: "lib-<storyId>"`). */
export const COURSE_SCENES: Record<string, ComponentType<{ page: number }>> = { ...fidelFoundations, ...amharicReaders, ...numbersCounting, ...mathsExplorers, ...englishFirstWords, ...englishReaders, ...valuesCharacter, ...ourEthiopia, ...scienceNature, ...healthySafe };
