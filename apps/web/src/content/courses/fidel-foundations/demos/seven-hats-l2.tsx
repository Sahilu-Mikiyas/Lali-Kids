"use client";

import type { DemoProps } from "../../types";
import { SevenForms } from "./shared/seven-forms";

/** Level 2: the seven hats on the new families ረ, ሰ, ሸ, ቀ and በ. */
export default function SevenHatsL2(props: DemoProps) {
  return <SevenForms {...props} families={["ረ", "ሰ", "ሸ", "ቀ", "በ"]} />;
}
