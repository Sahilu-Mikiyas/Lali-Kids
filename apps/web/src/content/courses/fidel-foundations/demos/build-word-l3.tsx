"use client";

import type { DemoProps } from "../../types";
import { BuildWord } from "./shared/build-word";

/** Level 3: longer words, two to four fidel: ኤሊ, አበባ, ቀበሮ, አንበሳ (each with look-alike decoys). */
export default function BuildWordL3(props: DemoProps) {
  return (
    <BuildWord
      {...props}
      title={{ en: "Build longer words", am: "ረጃጅም ቃላትን ሥሩ" }}
      words={[
        { word: "ኤሊ", pic: "turtle", en: "turtle", decoys: ["አ", "ሉ"] },
        { word: "አበባ", pic: "flower", en: "flower", decoys: ["ኡ", "ቢ"] },
        { word: "ቀበሮ", pic: "fox", en: "fox", decoys: ["ቆ", "ራ"] },
        { word: "አንበሳ", pic: "lion", en: "lion", decoys: ["ና", "ሰ"] },
      ]}
    />
  );
}
