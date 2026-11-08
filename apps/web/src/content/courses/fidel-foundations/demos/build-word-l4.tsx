"use client";

import type { DemoProps } from "../../types";
import { BuildWord } from "./shared/build-word";

/** Level 4: words from the new families: ዶሮ, ዳቦ, ዝሆን, ጀበና (each with look-alike decoys). */
export default function BuildWordL4(props: DemoProps) {
  return (
    <BuildWord
      {...props}
      words={[
        { word: "ዶሮ", pic: "hen", en: "hen", decoys: ["ዱ", "ረ"] },
        { word: "ዳቦ", pic: "loaf", en: "bread", decoys: ["ደ", "ቡ"] },
        { word: "ዝሆን", pic: "elephant", en: "elephant", decoys: ["ዘ", "ሀ"] },
        { word: "ጀበና", pic: "coffee", en: "coffee pot", decoys: ["ጃ", "ነ"] },
      ]}
    />
  );
}
