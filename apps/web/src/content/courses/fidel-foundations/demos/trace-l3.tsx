"use client";

import type { DemoProps } from "../../types";
import { Trace } from "./shared/trace";

/** Level 3: trace ቸ, ነ and አ with a finger. */
export default function TraceL3(props: DemoProps) {
  return <Trace {...props} letters={["ቸ", "ነ", "አ"]} />;
}
