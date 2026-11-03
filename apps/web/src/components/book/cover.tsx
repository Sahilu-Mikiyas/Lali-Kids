"use client";

import type { Story } from "@/content/stories";
import { Bee } from "../characters";
import { PageArt } from "./page-art";

/** The front of the book: the story's colour, its picture in a frame, and the title in both languages. */
export function CoverFront({ story, scale = 1 }: { story: Story; scale?: number }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-r-[18px] rounded-l-[6px] text-white"
      style={{
        background: `radial-gradient(120% 80% at 30% 0%, color-mix(in oklab, ${story.color} 70%, white), ${story.color} 55%, color-mix(in oklab, ${story.color} 75%, black))`,
        boxShadow: "inset 14px 0 0 rgba(0,0,0,.16), inset 18px 0 0 rgba(255,255,255,.12), inset 0 0 0 6px rgba(255,255,255,.08)",
        padding: `${22 * scale}px ${22 * scale}px ${18 * scale}px ${34 * scale}px`,
        gap: 12 * scale,
      }}
    >
      {/* a scatter of little stars, printed on the cloth */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden>
        <defs>
          <pattern id={`cover-dots-${story.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.6" fill="#fff" />
            <circle cx="18" cy="16" r="1" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cover-dots-${story.id})`} />
      </svg>
      <div className="relative w-full flex-1 overflow-hidden rounded-[14px] border-[5px] border-white/85 shadow-[0_8px_20px_rgba(0,0,0,.25)]">
        <PageArt story={story} page={story.coverPage} />
      </div>
      <div className="relative w-full text-center">
        <p className="font-display font-black leading-[1.05] [text-shadow:0_3px_0_rgba(0,0,0,.2)]" style={{ fontSize: Math.max(20, 34 * scale) }}>
          {story.title.en}
        </p>
        <p className="mt-1 font-ethiopic font-bold text-white/90" style={{ fontSize: Math.max(15, 22 * scale) }}>
          {story.title.am}
        </p>
      </div>
      <div className="relative flex items-center gap-2 font-display font-black text-white/90" style={{ fontSize: Math.max(13, 16 * scale) }}>
        <span className="animate-float">
          <Bee size={Math.max(22, 30 * scale)} />
        </span>
        Lali · ላሊ
      </div>
    </div>
  );
}

/** Inside of the cover: patterned endpaper. */
export function CoverBack({ color }: { color: string }) {
  return (
    <div
      className="h-full w-full rounded-l-[18px] rounded-r-[6px]"
      style={{
        background: `repeating-linear-gradient(45deg, color-mix(in oklab, ${color} 22%, #FFF8E8) 0 14px, color-mix(in oklab, ${color} 32%, #FFF8E8) 14px 28px)`,
        boxShadow: "inset -14px 0 20px -10px rgba(0,0,0,.3)",
      }}
    />
  );
}
