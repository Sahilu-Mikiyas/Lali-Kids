"use client";

import dynamic from "next/dynamic";

import type { SceneKind } from "@/content/stories";
import { Air } from "./book/scenery";
import { LIBRARY_SCENES } from "./book/library";

/*
  Each story's scenes are loaded only when that story is drawn (next/dynamic: rendered on the
  server too, and the script is fetched in parallel), so a page ships the scenes it shows and not
  all forty stories' pictures. Library stories load theirs the same way (./book/library).
*/
const LostMoonScene = dynamic(() => import("./book/lost-moon-scenes").then((m) => m.LostMoonScene));
const CountingScene = dynamic(() => import("./book/counting-scenes").then((m) => m.CountingScene));
const HoneyScene = dynamic(() => import("./book/honey-scenes").then((m) => m.HoneyScene));
const FlowerScene = dynamic(() => import("./book/new-year-scenes").then((m) => m.FlowerScene));
const RainbowPuddleScene = dynamic(() => import("./book/rainbow-puddle-scenes").then((m) => m.RainbowPuddleScene));
const FidelTrainScene = dynamic(() => import("./book/fidel-train-scenes").then((m) => m.FidelTrainScene));
const FirstDayScene = dynamic(() => import("./book/first-day-scenes").then((m) => m.FirstDayScene));
const CoffeeMysteryScene = dynamic(() => import("./book/coffee-mystery-scenes").then((m) => m.CoffeeMysteryScene));
const LalibelaScene = dynamic(() => import("./book/lalibela-scenes").then((m) => m.LalibelaScene));

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
      {kind.startsWith("lib-") && LIBRARY_SCENES[kind.slice(4)] && <LibraryScene kind={kind} page={page} />}
      {AIR[kind] && <Air kind={AIR[kind](page)} seed={page * 7 + 3} />}
    </svg>
  );
}

/** A library story's scene (src/components/book/library/<id>.tsx). */
function LibraryScene({ kind, page }: { kind: string; page: number }) {
  const Comp = LIBRARY_SCENES[kind.slice(4)];
  return Comp ? <Comp page={page} /> : null;
}
