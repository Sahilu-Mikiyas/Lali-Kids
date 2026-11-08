"use client";

import type { DemoProps } from "../../types";
import { SevenForms } from "./shared/seven-forms";

/** Level 1: Grandma's seven hats on ሀ, ለ and መ. */
export default function SevenHats(props: DemoProps) {
  return <SevenForms {...props} families={["ሀ", "ለ", "መ"]} />;
}
