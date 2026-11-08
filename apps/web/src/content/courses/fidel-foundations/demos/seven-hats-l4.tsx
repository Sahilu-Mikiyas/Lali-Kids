"use client";

import type { DemoProps } from "../../types";
import { SevenForms } from "./shared/seven-forms";

/** Level 4: the seven hats on ከ, ወ, ዘ, የ, ደ, ገ and ጀ. */
export default function SevenHatsL4(props: DemoProps) {
  return <SevenForms {...props} families={["ከ", "ወ", "ዘ", "የ", "ደ", "ገ", "ጀ"]} />;
}
