"use client";

import type { DemoProps } from "../../types";
import { TrainGame, type Item } from "./letter-train";

/*
  "The Letter-Sound Train", n to z (level 4): the same first-sound game as level 3 (./letter-train.tsx),
  with eight new pictures. X is left out of the carriages: almost no English words a child knows
  start with the sound of x (it lives at the end, as in "box"), so it is traced, not hunted.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

const LETTERS = "nopqrstuvwyz".split("");
const ITEMS: Item[] = [
  { id: "nest", word: "nest", letter: "n", am: "የወፍ ጎጆ" },
  { id: "ox", word: "ox", letter: "o", am: "በሬ" },
  { id: "pot", word: "pot", letter: "p", am: "ድስት" },
  { id: "queen", word: "queen", letter: "q", am: "ንግሥት" },
  { id: "sun", word: "sun", letter: "s", am: "ፀሐይ" },
  { id: "van", word: "van", letter: "v", am: "ቫን (ትንሽ መኪና)" },
  { id: "yoyo", word: "yoyo", letter: "y", am: "ዮዮ (መጫወቻ)" },
  { id: "zebra", word: "zebra", letter: "z", am: "የሜዳ አህያ" },
];

export default function LetterTrainNZ(p: DemoProps) {
  return <TrainGame {...p} letters={LETTERS} items={ITEMS} />;
}
