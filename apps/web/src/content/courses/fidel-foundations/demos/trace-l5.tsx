"use client";

import type { DemoProps } from "../../types";
import { Trace } from "./shared/trace";

/** Level 5: trace ጠ, ጨ and ፈ with a finger. */
export default function TraceL5(props: DemoProps) {
  return <Trace {...props} letters={["ጠ", "ጨ", "ፈ"]} />;
}
