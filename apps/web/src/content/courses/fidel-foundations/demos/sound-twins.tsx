"use client";

import type { DemoProps } from "../../types";
import { SoundTwins as Twins } from "./shared/sound-twins";

/** Level 1: ሀ/ሐ, ሁ/ሑ, ሠ/ሰ, ሣ/ሳ, named the way Ethiopian children learn them. */
export default function SoundTwins(props: DemoProps) {
  return (
    <Twins
      {...props}
      pairs={[
        ["ሀ", "ሐ", "ha"],
        ["ሁ", "ሑ", "hu"],
        ["ሠ", "ሰ", "sa"],
        ["ሣ", "ሳ", "saa"],
      ]}
      ending={{
        en: "Same sound, different look: the hallelujah ሀ and the boat ሐ, the king's ሠ and the fire's ሰ.",
        am: "ድምፃቸው አንድ፣ መልካቸው ሁለት፦ ሀሌታው ሀ እና ሐመሩ ሐ፣ ንጉሡ ሠ እና እሳቱ ሰ።",
      }}
    />
  );
}
