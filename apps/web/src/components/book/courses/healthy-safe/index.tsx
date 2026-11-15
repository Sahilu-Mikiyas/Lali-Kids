"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Healthy & Safe stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's cast,
  places and props (./kit-cast.tsx, ./kit-places.tsx, ./kit-props.tsx, ./kit-more.tsx, ./kit.css,
  copied from Values & Character) and the health things in ./kit-health.tsx (+ ./kit-health.css).
  Loaded in the browser only (ssr: false), like the library's scenes.
*/
// Level 1: clean and healthy habits
const GugusSoapySong = dynamic(() => import("./gugus-soapy-song"), { ssr: false });
const AnbessasSparklySmile = dynamic(() => import("./anbessas-sparkly-smile"), { ssr: false });
const AbdisOneBucketBath = dynamic(() => import("./abdis-one-bucket-bath"), { ssr: false });
const HabensSneezyWeek = dynamic(() => import("./habens-sneezy-week"), { ssr: false });
const ShooFlyShoo = dynamic(() => import("./shoo-fly-shoo"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "gugus-soapy-song": GugusSoapySong,
  "anbessas-sparkly-smile": AnbessasSparklySmile,
  "abdis-one-bucket-bath": AbdisOneBucketBath,
  "habens-sneezy-week": HabensSneezyWeek,
  "shoo-fly-shoo": ShooFlyShoo,
};
