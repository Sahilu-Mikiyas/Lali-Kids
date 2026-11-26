"use client";

import { useState } from "react";

import type { Story } from "@/content/stories";
import { STAR_PATH } from "../characters";
import { Scene, SceneBody } from "../scenes";
import { BleedScene, fallbackEdges, fitScene, flatEdges, useEdges, type Fit, type Rect } from "./bleed";
import { BookplateArt } from "./choices";
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
      <EndArtBody />
    </svg>
  );
}

/** The night sky at the edges of the ending picture, carried on across a wide screen. */
export const END_SKY = "#141B45";

function EndArtBody() {
  return (
    <>
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
    </>
  );
}

/** A friendly placeholder for a page with no picture: Lali looping on cream paper. */
function PlaceholderBody() {
  return (
    <>
      <rect width={400} height={300} fill="#FFF6DD" />
      <BeeFlight path="M120 150 C120 80 280 80 280 150 C280 220 120 220 120 150Z" dur={6} s={2} rest={[200, 150]} trailColor="#E8B64A" />
    </>
  );
}

/**
 * A page's picture filling a whole `w` x `h` page of the full-screen reader, edge to edge (see
 * ./bleed.tsx): its important part fits `region`, and the scene's own sky and ground carry it
 * to the edges. `what`: a story page, the bookplate or the ending.
 */
export function BleedArt({
  story,
  page,
  what = "page",
  w,
  h,
  region,
  anchorY,
  fit: given,
}: {
  story: Story;
  page: number;
  what?: "page" | "plate" | "end";
  w: number;
  h: number;
  region: Rect;
  anchorY: number;
  /** Where the drawn scene goes, when the layout has placed it already (see leafLayout). */
  fit?: Fit;
}) {
  const picture = what === "page" ? story.pictures?.[page] : null;
  const kind = what === "page" && !picture ? story.scene : undefined;
  const sampled = useEdges(kind, page);
  if (picture) return <BleedPicture src={picture} page={page} w={w} h={h} region={region} anchorY={anchorY} />;
  const fit = given ?? fitScene(w, h, region, anchorY);
  const edges =
    what === "end" ? flatEdges(END_SKY) : what === "plate" ? flatEdges(story.color) : kind ? (sampled ?? fallbackEdges(story.color)) : flatEdges("#FFF6DD");
  return (
    <BleedScene w={w} h={h} fit={fit} edges={edges}>
      {what === "end" ? <EndArtBody /> : what === "plate" ? <BookplateArt story={story} bare /> : kind ? <SceneBody kind={kind} page={page} /> : <PlaceholderBody />}
    </BleedScene>
  );
}

/**
 * An uploaded picture (a studio story, a page of a PDF book) on a full-screen page: the whole
 * picture fits the free part of the page (cropped by at most a little, so words drawn into a
 * book page are never cut off), over a soft, blurred copy of itself that fills the rest.
 */
function BleedPicture({ src, page, w, h, region, anchorY }: { src: string; page: number; w: number; h: number; region: Rect; anchorY: number }) {
  const [ratio, setRatio] = useState(4 / 3);
  // Fit inside the region, then grow up to 12% (cropping a sliver) but never past covering it.
  const contain = Math.min(region.w / ratio, region.h);
  const cover = Math.max(region.w / ratio, region.h);
  let ph = Math.min(contain * 1.12, cover);
  let pw = ph * ratio;
  // Nearly covering the whole page anyway: cover it and skip the blurred copy's edges.
  const whole = Math.max(w / ratio, h);
  if (ph * 1.06 >= whole && pw * 1.06 >= w) {
    ph = whole;
    pw = whole * ratio;
  }
  const left = pw >= w ? (w - pw) / 2 : Math.min(Math.max(0, region.x + (region.w - pw) / 2), w - pw);
  const top = ph >= h ? (h - ph) / 2 : Math.min(Math.max(0, region.y + (region.h - ph) * anchorY), h - ph);
  // Soft edges wherever the picture stops short of the page's edge.
  const fade = (from: string, on: boolean) => (on ? `linear-gradient(${from}, transparent, #000 5%)` : "linear-gradient(#000, #000)");
  const mask = [fade("to right", left > 0.5), fade("to left", left + pw < w - 0.5), fade("to bottom", top > 0.5), fade("to top", top + ph < h - 0.5)].join(", ");
  const noMenu = (e: { preventDefault: () => void }) => e.preventDefault();
  return (
    <div className="absolute inset-0 overflow-hidden" data-bleed-picture="">
      {/* The blurred copy is drawn small and scaled up: a small blur is cheap, even on old phones. */}
      {/* Short-lived private links; next/image would cache them under a public URL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        onContextMenu={noMenu}
        className="pointer-events-none absolute left-0 top-0 h-1/4 w-1/4 origin-top-left select-none object-cover"
        style={{ transform: "scale(4.4) translate(-2.5%, -2.5%)", filter: "blur(7px) saturate(1.1) brightness(0.92)" }}
      />
      <div className="absolute overflow-hidden" style={{ left, top, width: pw, height: ph, maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}>
        <div className="h-full w-full" data-depth={0.6}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            draggable={false}
            ref={(i) => {
              // Already loaded (from the cache, or before the page woke up): no load event comes.
              if (i?.complete && i.naturalWidth && i.naturalHeight) setRatio(i.naturalWidth / i.naturalHeight);
            }}
            onLoad={(e) => {
              const i = e.currentTarget;
              if (i.naturalWidth && i.naturalHeight) setRatio(i.naturalWidth / i.naturalHeight);
            }}
            className="lali-kenburns h-full w-full select-none object-cover"
            style={{ animationDelay: `${-(page % 4) * 4}s` }}
            onContextMenu={noMenu}
          />
        </div>
      </div>
    </div>
  );
}
