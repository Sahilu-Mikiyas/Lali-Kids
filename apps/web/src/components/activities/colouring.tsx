"use client";

import { useState } from "react";

import type { SceneKind } from "@/content/stories";
import { useT } from "@/i18n/provider";
import { Scene } from "../scenes";

/**
 * The colouring page: one of the story's own pictures as outlines. Drawn scenes are rendered
 * in "colouring" mode (globals.css: every fill white, every stroke black and thicker, nothing
 * moving); uploaded pictures go through a line-drawing filter. Grown-ups can pick another
 * picture with the arrows (they don't print).
 */
export function ColouringPage({ scene, pictures, pageCount, start }: { scene?: SceneKind; pictures?: (string | null)[]; pageCount: number; start: number }) {
  const t = useT();
  const [page, setPage] = useState(start);
  const go = (d: number) => setPage((p) => (p + d + pageCount) % pageCount);
  const picture = pictures?.[page];
  return (
    <div className="space-y-[0.8em]">
      <div className="colouring-frame relative aspect-[4/3] w-full overflow-hidden rounded-[1em] border-[0.15em] border-black bg-white" data-colouring-page={page}>
        {scene ? (
          <div className="colouring h-full w-full">
            <Scene kind={scene} page={page} />
          </div>
        ) : picture ? (
          <>
            {/* Short-lived private links; next/image would cache them under a public URL. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={picture} alt="" className="colouring-photo h-full w-full object-cover" />
            <svg width={0} height={0} className="absolute" aria-hidden>
              <filter id="colouring-lines" colorInterpolationFilters="sRGB">
                <feColorMatrix type="saturate" values="0" />
                <feConvolveMatrix order={3} kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
                <feColorMatrix type="matrix" values="-6 0 0 0 1  -6 0 0 0 1  -6 0 0 0 1  0 0 0 1 0" />
                <feComponentTransfer>
                  <feFuncR type="discrete" tableValues="0 1 1" />
                  <feFuncG type="discrete" tableValues="0 1 1" />
                  <feFuncB type="discrete" tableValues="0 1 1" />
                </feComponentTransfer>
              </filter>
            </svg>
          </>
        ) : (
          <div className="grid h-full place-items-center text-[3em]" aria-hidden>
            🖍️
          </div>
        )}
      </div>
      {pageCount > 1 && (
        <div className="print-hide flex items-center justify-center gap-3 font-body text-base" data-colouring-arrows="">
          <button type="button" className="btn btn-plain !px-4 !py-2" onClick={() => go(-1)} aria-label={t.activities.prevPicture}>
            ←
          </button>
          <span className="min-w-28 text-center font-bold tabular-nums text-muted">{t.activities.pictureOf(page + 1, pageCount)}</span>
          <button type="button" className="btn btn-plain !px-4 !py-2" onClick={() => go(1)} aria-label={t.activities.nextPicture}>
            →
          </button>
        </div>
      )}
    </div>
  );
}

/** "Print or save as PDF". */
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="btn btn-primary" onClick={() => window.print()} data-print="">
      <span aria-hidden>🖨️</span> {label}
    </button>
  );
}
