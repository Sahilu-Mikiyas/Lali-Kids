"use client";

import type { DemoProps } from "../../types";
import { TraceGame } from "./trace-letters";

/*
  "Trace the Letters", n to z (level 4): the same tracing pad as level 3 (./trace-letters.tsx).
  X is the one letter whose word does not start with it: "box" ENDS with x, and the voice says so.
*/

const LETTERS = "nopqrstuvwxyz".split("");
const WORD: Record<string, string> = { n: "nest", o: "ox", p: "pot", q: "queen", r: "rock", s: "sun", t: "tomato", u: "umbrella", v: "van", w: "window", x: "box", y: "yoyo", z: "zebra" };

export default function TraceLettersNZ(p: DemoProps) {
  return <TraceGame {...p} letters={LETTERS} words={WORD} lines={{ x: "Box! Box ends with X." }} />;
}
