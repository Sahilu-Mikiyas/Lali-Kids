"use client";

import type { DemoProps } from "../../types";
import { BuildWord } from "./shared/build-word";

/** Level 2: first words from letters already learnt: ቤት, ሰላም, ቡና, ሽሮ (each with two look-alike decoys). */
export default function BuildWordL2(props: DemoProps) {
  return (
    <BuildWord
      {...props}
      words={[
        { word: "ቤት", pic: "house", en: "home", decoys: ["ቢ", "ተ"] },
        { word: "ሰላም", pic: "hello", en: "hello (peace)", decoys: ["ሳ", "ለ"] },
        { word: "ቡና", pic: "coffee", en: "coffee", decoys: ["በ", "ነ"] },
        { word: "ሽሮ", pic: "shiro", en: "shiro", decoys: ["ሸ", "ረ"] },
      ]}
    />
  );
}
