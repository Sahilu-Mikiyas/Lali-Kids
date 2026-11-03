"use client";

import type { Story } from "@/content/stories";
import { STAR_PATH } from "../characters";
import { Scene } from "../scenes";
import { BeeFlight, Stars, vars } from "./scenery";

/** The page's uploaded picture (with a slow Ken Burns pan), its drawn scene, or a friendly placeholder. */
export function PageArt({ story, page }: { story: Story; page: number }) {
  const picture = story.pictures?.[page];
  if (picture) {
    return (
      <div className="h-full w-full overflow-hidden">
        {/* Short-lived private links; next/image would cache them under a public URL. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={picture}
          alt=""
          draggable={false}
          className="lali-kenburns h-full w-full select-none object-cover"
          style={{ animationDelay: `${-(page % 4) * 4}s` }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    );
  }
  if (story.scene) return <Scene kind={story.scene} page={page} />;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden>
      <rect width={400} height={300} fill="#FFF6DD" />
      <BeeFlight path="M120 150 C120 80 280 80 280 150 C280 220 120 220 120 150Z" dur={6} s={2} rest={[200, 150]} trailColor="#E8B64A" />
    </svg>
  );
}

/** The last picture: a big star for finishing, and Lali looping around it. */
export function EndArt() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="lali-end-sky" cx="0.5" cy="0.42" r="0.7">
          <stop offset="0" stopColor="#3B3F94" />
          <stop offset="1" stopColor="#141B45" />
        </radialGradient>
      </defs>
      <rect width={400} height={300} fill="url(#lali-end-sky)" />
      <Stars seed={5} n={34} bottom={300} />
      <circle cx={200} cy={140} r={78} fill="#FFD54A" opacity={0.14} className="lali-pulse" />
      <g className="lali-float" style={vars({ "--rise": "-10px", "--dur": "3.4s" })}>
        <path d={STAR_PATH} fill="#FFD54A" transform="translate(140 80) scale(5)" />
        <g fill="#7A4A00">
          <circle cx={186} cy={136} r={4.5} />
          <circle cx={214} cy={136} r={4.5} />
        </g>
        <path d="M188 152 Q200 162 212 152" stroke="#7A4A00" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      <BeeFlight path="M80 230 C80 140 320 120 330 200 C336 250 260 260 250 220 C240 180 300 170 310 210 C320 260 120 300 80 230Z" dur={9} s={1.5} rest={[320, 210]} />
    </svg>
  );
}
