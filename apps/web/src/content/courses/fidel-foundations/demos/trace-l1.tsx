"use client";

import type { DemoProps } from "../../types";
import { Trace } from "./shared/trace";

/** Level 1: trace ሀ, ለ and መ with a finger. */
export default function TraceL1(props: DemoProps) {
  return <Trace {...props} letters={["ሀ", "ለ", "መ"]} />;
}
