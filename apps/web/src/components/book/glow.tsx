"use client";

import { useId } from "react";

import { vars } from "./scenery";

/**
 * A soft round glow that fades out to nothing at its edge (a radial gradient, so on a
 * dark sky it never reads as a grey disc). Used by the moon, counting and honey scenes.
 */
export function Glow({ x, y, r, color = "#FFF3C0", strength = 0.5, pulse = true, dur = 4 }: { x: number; y: number; r: number; color?: string; strength?: number; pulse?: boolean; dur?: number }) {
  const gid = `${useId().replace(/:/g, "")}-glow`;
  return (
    <>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0" stopColor={color} stopOpacity={strength} />
          <stop offset="0.45" stopColor={color} stopOpacity={strength * 0.4} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${gid})`} className={pulse ? "lali-pulse" : undefined} style={pulse ? vars({ "--dur": `${dur}s` }) : undefined} />
    </>
  );
}
