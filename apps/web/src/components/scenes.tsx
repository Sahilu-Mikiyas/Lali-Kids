"use client";

import type { SceneKind } from "@/content/stories";
import { Air } from "./book/scenery";
import { LostMoonScene } from "./book/lost-moon-scenes";
import { CountingScene } from "./book/counting-scenes";
import { HoneyScene } from "./book/honey-scenes";
import { FlowerScene } from "./book/new-year-scenes";
import { RainbowPuddleScene } from "./book/rainbow-puddle-scenes";
import { FidelTrainScene } from "./book/fidel-train-scenes";
import { FirstDayScene } from "./book/first-day-scenes";
import { CoffeeMysteryScene } from "./book/coffee-mystery-scenes";
import { LalibelaScene } from "./book/lalibela-scenes";

/*
  The drawn pictures for the stories. Each page is its own living picture: the background
  keeps moving, and what the page says happens a moment after it opens. Each story's
  scenes live in their own file in ./book; the moon, counting and honey stories add their
  own air (pollen, motes, near grass) page by page.
*/

/** Pollen, motes and near grass in front of each New Year picture. */
const AIR: Partial<Record<SceneKind, (page: number) => "day" | "dusk" | "night">> = {
  newyear: (p) => (p === 8 || p === 9 ? "night" : p === 11 ? "dusk" : "day"),
};

/** The picture for one page of a story. Fills its box, cropping to keep a 4:3 scene. */
export function Scene({ kind, page, className }: { kind: SceneKind; page: number; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className ?? "block h-full w-full"} aria-hidden>
      {kind === "moon" && <LostMoonScene page={page} />}
      {kind === "count" && <CountingScene page={page} />}
      {kind === "share" && <HoneyScene page={page} />}
      {kind === "newyear" && <FlowerScene page={page} />}
      {kind === "rainbow" && <RainbowPuddleScene page={page} />}
      {kind === "fideltrain" && <FidelTrainScene page={page} />}
      {kind === "firstday" && <FirstDayScene page={page} />}
      {kind === "coffee" && <CoffeeMysteryScene page={page} />}
      {kind === "lalibela" && <LalibelaScene page={page} />}
      {AIR[kind] && <Air kind={AIR[kind](page)} seed={page * 7 + 3} />}
    </svg>
  );
}
