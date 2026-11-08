"use client";

import type { DemoProps } from "../../types";
import { LetterBaskets, type BasketRound } from "./shared/letter-baskets";

/** Level 4: first letters of pictures from the ከ ወ ዐ ዘ ደ ገ ጀ families. */
const ROUNDS: BasketRound[] = [
  {
    baskets: ["ዶ", "ካ", "ዝ"],
    items: [
      { pic: "hen", word: "ዶሮ", first: "ዶ", en: "hen" },
      { pic: "carrot", word: "ካሮት", first: "ካ", en: "carrot" },
      { pic: "elephant", word: "ዝሆን", first: "ዝ", en: "elephant" },
    ],
  },
  {
    baskets: ["ግ", "ው", "ጅ"],
    items: [
      { pic: "water", word: "ውሃ", first: "ው", en: "water" },
      { pic: "hyena", word: "ጅብ", first: "ጅ", en: "hyena" },
      { pic: "camel", word: "ግመል", first: "ግ", en: "camel" },
    ],
  },
  {
    baskets: ["ኬ", "ድ", "ዓ"],
    items: [
      { pic: "cat", word: "ድመት", first: "ድ", en: "cat" },
      { pic: "fish", word: "ዓሣ", first: "ዓ", en: "fish" },
      { pic: "cake", word: "ኬክ", first: "ኬ", en: "cake" },
    ],
  },
];

export default function LetterBasketsL4(props: DemoProps) {
  return <LetterBaskets {...props} rounds={ROUNDS} />;
}
