"use client";

import type { DemoProps } from "../../types";
import { SoundTwins } from "./shared/sound-twins";

/** Level 5: the last sound-alikes, ጸ/ፀ and አ/ዐ, in two forms each. */
export default function SoundTwinsL5(props: DemoProps) {
  return (
    <SoundTwins
      {...props}
      pairs={[
        ["ጸ", "ፀ", "tsa"],
        ["ጹ", "ፁ", "tsu"],
        ["አ", "ዐ", "a"],
        ["ኣ", "ዓ", "aa"],
      ]}
      ending={{
        en: "Same sound, different look: the prayer ጸ and the sun ፀ, the alpha አ and the eye ዐ.",
        am: "ድምፃቸው አንድ፣ መልካቸው ሁለት፦ ጸሎቱ ጸ እና ፀሐዩ ፀ፣ አልፋው አ እና ዓይኑ ዐ።",
      }}
    />
  );
}
