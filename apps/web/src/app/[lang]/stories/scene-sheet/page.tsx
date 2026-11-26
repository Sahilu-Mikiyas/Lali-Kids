import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BleedSheet, RawSheet } from "@/components/book/scene-sheet";
import { STORIES, type SceneKind } from "@/content/stories";

/*
  The drawn scenes alone (never any words), for scripts/scene-edges.mjs and the reader's edge
  check. Off unless the server runs with LALI_SCENE_SHEET=1, so it never exists on the live site.
    ?list=1                          every drawn scene: kind, pages, colour (JSON)
    ?scene=<kind>                    every page at 400 x 300
    ?scene=<kind>&w=2560&h=1080      one page full-bleed in that screen (window.__sheetShow(page))
*/
export default function SceneSheetPage(props: PageProps<"/[lang]/stories/scene-sheet">) {
  if (process.env.LALI_SCENE_SHEET !== "1") notFound();
  return (
    <Suspense>
      <Sheet {...props} />
    </Suspense>
  );
}

function scenes() {
  const out = new Map<SceneKind, { kind: SceneKind; pages: number; color: string; story: string }>();
  for (const s of STORIES) {
    if (!s.scene) continue;
    const had = out.get(s.scene);
    if (!had || had.pages < s.pages.length) out.set(s.scene, { kind: s.scene, pages: s.pages.length, color: s.color, story: s.id });
  }
  return [...out.values()];
}

async function Sheet({ searchParams }: PageProps<"/[lang]/stories/scene-sheet">) {
  const q = await searchParams;
  const all = scenes();
  if (q.list) return <pre id="scene-list">{JSON.stringify(all)}</pre>;
  const one = all.find((s) => s.kind === q.scene);
  if (!one) notFound();
  const w = Number(q.w);
  const h = Number(q.h);
  if (w > 0 && h > 0) return <BleedSheet kind={one.kind} w={w} h={h} color={one.color} />;
  return <RawSheet kind={one.kind} pages={one.pages} color={one.color} />;
}
