"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the English First Words stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's cast
  (./cast.tsx), places (./places.tsx), props (./props.tsx), pictures (./things.tsx) and moves
  (./kit.css). Loaded in the browser only (ssr: false), like the library's scenes.
  The five English stories still on the library shelf (a-is-for-adey, grandmas-kitchen,
  hello-feelings, opposites, weather-words) keep their scenes in ../../library.
*/
// Level 1: hello, me and my family
const MyNameIs = dynamic(() => import("./my-name-is"), { ssr: false });

export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "my-name-is": MyNameIs,
};
