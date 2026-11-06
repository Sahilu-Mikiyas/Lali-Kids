"use client";

import type { Story } from "@/content/stories";
import { STAR_PATH } from "../characters";
import { Scene } from "../scenes";
import { BeeFlight, Pollen, Stars, vars } from "./scenery";

/** The page's uploaded picture (with a slow Ken Burns pan), its drawn scene, or a friendly placeholder. */
export function PageArt({ story, page }: { story: Story; page: number }) {
  const picture = story.pictures?.[page];
  if (picture) {
    return (
      <div className="h-full w-full overflow-hidden">
        <div className="h-full w-full" data-depth={0.6}>
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
      {/* rays of glory behind the star */}
      <g className="lali-burst-rays" fill="#FFE9A0" opacity={0.16}>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          const p = (r: number, d: number) => `${Math.round(200 + Math.cos(a + d) * r)} ${Math.round(140 + Math.sin(a + d) * r)}`;
          return <path key={i} d={`M200 140 L${p(190, -0.12)} L${p(190, 0.12)}Z`} />;
        })}
      </g>
      <circle cx={200} cy={140} r={78} fill="#FFD54A" opacity={0.14} className="lali-pulse" />
      <g className="lali-float" style={vars({ "--rise": "-10px", "--dur": "3.4s" })}>
        <g className="lali-pop-in" style={vars({ "--delay": "0.15s" })} data-end-star="">
          <path d={STAR_PATH} fill="#FFD54A" transform="translate(140 80) scale(5)" />
          <g fill="#7A4A00">
            <circle cx={186} cy={136} r={4.5} className="lali-blink" />
            <circle cx={214} cy={136} r={4.5} className="lali-blink" />
          </g>
          <path d="M188 152 Q200 162 212 152" stroke="#7A4A00" strokeWidth={4} fill="none" strokeLinecap="round" />
          <circle cx={176} cy={150} r={5} fill="#FF9A6B" opacity={0.55} />
          <circle cx={224} cy={150} r={5} fill="#FF9A6B" opacity={0.55} />
        </g>
      </g>
      {/* Lali circles the star, doing a happy loop-the-loop on the way round */}
      <BeeFlight path="M200 40 C290 40 320 110 300 170 C280 230 120 240 100 170 C80 110 110 40 200 40Z" dur={7} s={1.5} rest={[300, 170]} trail={false} happy />
      <Pollen seed={8} n={8} color="#FFE9A0" top={40} bottom={280} />
    </svg>
  );
}
