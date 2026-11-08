"use client";

import type { DemoProps } from "../../types";
import { BuildWord } from "./shared/build-word";

/*
  Level 6, "Build a sentence": the picture shows what happens; drag (or tap) the word tiles into
  order to say it, ending with the word that carries the four dots ።. One decoy word each. Every
  sentence uses only letters from levels 1–5.
*/
export default function BuildSentence(props: DemoProps) {
  return (
    <BuildWord
      {...props}
      title={{ en: "Build a sentence", am: "ዓረፍተ ነገር ሥሩ" }}
      howTo={{ en: "Put the words in order to tell what the picture shows. The word with ። goes last!", am: "ሥዕሉ የሚያሳየውን ለመናገር ቃላቱን በቅደም ተከተል አስቀምጡ። አራት ነጥብ ያለው ቃል መጨረሻ ላይ ይሄዳል!" }}
      ending={{ en: "Five sentences, every word in its place!", am: "አምስት ዓረፍተ ነገሮች፤ እያንዳንዱ ቃል በቦታው!" }}
      next={{ en: "Next sentence", am: "ቀጣዩ ዓረፍተ ነገር" }}
      words={[
        { word: "ድመት ተኛች።", parts: ["ድመት", "ተኛች።"], pic: "cat", en: "The cat is sleeping.", decoys: ["ዶሮ"] },
        { word: "ዓሣ ዋኘ።", parts: ["ዓሣ", "ዋኘ።"], pic: "fish", en: "The fish swam.", decoys: ["ሮጠ።"] },
        { word: "ፈረስ ሮጠ።", parts: ["ፈረስ", "ሮጠ።"], pic: "horse", en: "The horse ran.", decoys: ["ፍየል"] },
        { word: "ዶሮ ዳቦ በላች።", parts: ["ዶሮ", "ዳቦ", "በላች።"], pic: "hen", en: "The hen ate the bread.", decoys: ["ድመት"] },
        { word: "ጉጉ ኳስ አለው።", parts: ["ጉጉ", "ኳስ", "አለው።"], pic: "ball", en: "Gugu has a ball.", decoys: ["ቤት"] },
      ]}
    />
  );
}
