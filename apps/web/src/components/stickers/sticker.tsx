import { useId, type CSSProperties } from "react";

import { STAR_PATH } from "../characters";
import { StickerArt } from "./art";

export type StickerLook = "earned" | "golden" | "silhouette";

/**
 * A sticker: the drawing with a thick white die-cut border and a soft shadow, made by an SVG
 * filter that grows the drawing's outline. "golden" turns it gold with a gold border and
 * sparkles; "silhouette" is the soft empty-slot shape of a sticker not earned yet.
 * The pictures hold still inside stickers (no blinking), see .sticker-art in globals.css.
 */
export function Sticker({
  id,
  color,
  look = "earned",
  size = 96,
  className = "",
  style,
}: {
  id: string;
  color: string;
  look?: StickerLook;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const f = `sticker-f${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const golden = look === "golden" || (look === "earned" && id.startsWith("gold:"));
  const silhouette = look === "silhouette";
  return (
    <svg viewBox="-12 -12 144 144" width={size} height={size} className={`sticker-art block overflow-visible ${className}`} style={style} aria-hidden>
      <defs>
        <filter id={f} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius={silhouette ? 4 : 5.5} result="grow" />
          {silhouette ? (
            <>
              <feFlood floodColor="#E9DFC8" />
              <feComposite in2="grow" operator="in" result="outer" />
              <feFlood floodColor="#D9CBA8" />
              <feComposite in2="SourceAlpha" operator="in" result="inner" />
              <feMerge>
                <feMergeNode in="outer" />
                <feMergeNode in="inner" />
              </feMerge>
            </>
          ) : (
            <>
              <feGaussianBlur in="grow" stdDeviation={2.4} result="blur" />
              <feOffset in="blur" dy={3} result="drop" />
              <feFlood floodColor="#1B2A4E" floodOpacity={0.3} />
              <feComposite in2="drop" operator="in" result="shadow" />
              <feFlood floodColor={golden ? "#FFD54A" : "#FFFFFF"} />
              <feComposite in2="grow" operator="in" result="border" />
              {golden ? (
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0.18 0.36 0.07 0 0.56  0.15 0.3 0.06 0 0.4  0.05 0.1 0.02 0 0.04  0 0 0 1 0"
                  result="art"
                />
              ) : (
                <feOffset in="SourceGraphic" dx={0} dy={0} result="art" />
              )}
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="border" />
                <feMergeNode in="art" />
              </feMerge>
            </>
          )}
        </filter>
        {golden && (
          <linearGradient id={`${f}-sheen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0.3" stopColor="#fff" stopOpacity={0} />
            <stop offset="0.5" stopColor="#fff" stopOpacity={0.55} />
            <stop offset="0.7" stopColor="#fff" stopOpacity={0} />
          </linearGradient>
        )}
      </defs>
      <g filter={`url(#${f})`} opacity={silhouette ? 0.9 : 1}>
        <StickerArt id={id} color={color} />
      </g>
      {golden && (
        <g className="sticker-sparkles" fill="#FFF6C8" stroke="#E0A512" strokeWidth={0.8}>
          {[
            [6, 10, 0.55, 0],
            [112, 18, 0.45, 0.6],
            [104, 108, 0.6, 1.2],
            [12, 100, 0.4, 1.8],
            [60, -4, 0.5, 0.9],
          ].map(([x, y, s, d], i) => (
            <path
              key={i}
              d={STAR_PATH}
              transform={`translate(${x - 12 * s} ${y - 12 * s}) scale(${s})`}
              className="sticker-twinkle"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
