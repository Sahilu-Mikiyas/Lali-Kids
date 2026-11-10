"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the English Readers stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's kit,
  copied from English First Words: the cast (./cast.tsx), places (./places.tsx), props
  (./props.tsx), pictures (./things.tsx) and moves (./kit.css), plus the new pieces in ./more.tsx
  (./more.css). Loaded in the browser only (ssr: false), like the library's scenes.
*/
// Level 1: longer words and digraphs
const AyansShopLabels = dynamic(() => import("./ayans-shop-labels"), { ssr: false });
const GugusTongueTrick = dynamic(() => import("./gugus-tongue-trick"), { ssr: false });
const HawisClueHunt = dynamic(() => import("./hawis-clue-hunt"), { ssr: false });
const StopTruckStop = dynamic(() => import("./stop-truck-stop"), { ssr: false });
const TsehaysTrickyNotes = dynamic(() => import("./tsehays-tricky-notes"), { ssr: false });
// Level 2: long vowels
const AnbessasMagicE = dynamic(() => import("./anbessas-magic-e"), { ssr: false });
const GugusSweetBeets = dynamic(() => import("./gugus-sweet-beets"), { ssr: false });
const WaitForTheTrain = dynamic(() => import("./wait-for-the-train"), { ssr: false });
const FloatBoatFloat = dynamic(() => import("./float-boat-float"), { ssr: false });

export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "ayans-shop-labels": AyansShopLabels,
  "gugus-tongue-trick": GugusTongueTrick,
  "hawis-clue-hunt": HawisClueHunt,
  "stop-truck-stop": StopTruckStop,
  "tsehays-tricky-notes": TsehaysTrickyNotes,
  "anbessas-magic-e": AnbessasMagicE,
  "gugus-sweet-beets": GugusSweetBeets,
  "wait-for-the-train": WaitForTheTrain,
  "float-boat-float": FloatBoatFloat,
};
