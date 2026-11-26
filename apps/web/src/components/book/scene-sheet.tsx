"use client";

import { useEffect, useState } from "react";

import type { SceneKind } from "@/content/stories";
import { Scene, SceneBody } from "../scenes";
import { BleedScene, fitScene, useEdges } from "./bleed";
import { leafLayout } from "./leaf-layout";

/*
  The scene sheet: drawn scenes alone, without any words, for the tools that look at them
  (scripts/scene-edges.mjs samples each page's edge colours; the reader's edge check draws each
  page full-bleed at a given screen size and looks for gaps and seams). Only served when the
  server runs with LALI_SCENE_SHEET=1 (see src/app/[lang]/stories/scene-sheet/page.tsx).
*/

declare global {
  interface Window {
    __sheetShow?: (page: number) => void;
  }
}

/** Every page of a scene at 400 x 300, one under the other, on the story's colour. */
export function RawSheet({ kind, pages, color }: { kind: SceneKind; pages: number; color: string }) {
  return (
    <div style={{ width: 400 }}>
      {Array.from({ length: pages }, (_, i) => (
        <div key={i} data-sheet-page={i} style={{ width: 400, height: 300, background: color, overflow: "hidden" }}>
          <Scene kind={kind} page={i} />
        </div>
      ))}
    </div>
  );
}

/** One page drawn full-bleed as the reader draws it in a `w` x `h` screen, on magenta (any gap shows). */
export function BleedSheet({ kind, w, h, color }: { kind: SceneKind; w: number; h: number; color: string }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    window.__sheetShow = setPage;
  }, []);
  const edges = useEdges(kind, page);
  const L = leafLayout(w, h);
  const fit = fitScene(w, h, L.region, L.anchorY);
  return (
    <div data-sheet-frame={edges ? page : "loading"} style={{ width: w, height: h, background: "#FF00FF", position: "relative", overflow: "hidden" }}>
      {edges && (
        <div style={{ position: "absolute", inset: 0 }} data-color={color}>
          <BleedScene key={page} w={w} h={h} fit={fit} edges={edges}>
            <SceneBody kind={kind} page={page} />
          </BleedScene>
        </div>
      )}
      <div data-sheet-fit={JSON.stringify({ ...fit, region: L.region, panel: L.panel })} hidden />
    </div>
  );
}
