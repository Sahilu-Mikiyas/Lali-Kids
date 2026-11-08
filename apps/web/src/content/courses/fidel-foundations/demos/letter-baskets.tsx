"use client";

import type { DemoProps } from "../../types";
import { LetterBaskets as Baskets, type BasketRound } from "./shared/letter-baskets";

/** Level 2: first letters of pictures from the ረ ሰ ሸ ቀ በ families. */
const ROUNDS: BasketRound[] = [
  {
    baskets: ["ሽ", "ቆ", "ቡ"],
    items: [
      { pic: "onion", word: "ሽንኩርት", first: "ሽ", en: "onion" },
      { pic: "coffee", word: "ቡና", first: "ቡ", en: "coffee" },
      { pic: "kolo", word: "ቆሎ", first: "ቆ", en: "roasted grain" },
    ],
  },
  {
    baskets: ["ሰ", "በ", "ር"],
    items: [
      { pic: "sheep", word: "በግ", first: "በ", en: "sheep" },
      { pic: "dove", word: "ርግብ", first: "ር", en: "dove" },
      { pic: "clock", word: "ሰዓት", first: "ሰ", en: "clock" },
    ],
  },
  {
    baskets: ["ሻ", "ሮ", "ቅ"],
    items: [
      { pic: "pomegranate", word: "ሮማን", first: "ሮ", en: "pomegranate" },
      { pic: "butter", word: "ቅቤ", first: "ቅ", en: "butter" },
      { pic: "scarf", word: "ሻሽ", first: "ሻ", en: "headscarf" },
    ],
  },
];

export default function LetterBaskets(props: DemoProps) {
  return <Baskets {...props} rounds={ROUNDS} />;
}
