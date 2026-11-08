"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "fidel-seven-hats": dynamic(() => import("./fidel-seven-hats"), { ssr: false }),
  "fidel-boat-ha": dynamic(() => import("./fidel-boat-ha"), { ssr: false }),
  "fidel-cow-lemon": dynamic(() => import("./fidel-cow-lemon"), { ssr: false }),
  "fidel-king-se": dynamic(() => import("./fidel-king-se"), { ssr: false }),
  "fidel-shh-shiro": dynamic(() => import("./fidel-shh-shiro"), { ssr: false }),
  "fidel-fox-knock": dynamic(() => import("./fidel-fox-knock"), { ssr: false }),
  "fidel-che-trees": dynamic(() => import("./fidel-che-trees"), { ssr: false }),
  "fidel-hide-nye": dynamic(() => import("./fidel-hide-nye"), { ssr: false }),
  "fidel-a-name": dynamic(() => import("./fidel-a-name"), { ssr: false }),
  "fidel-ke-drums": dynamic(() => import("./fidel-ke-drums"), { ssr: false }),
  "fidel-we-water": dynamic(() => import("./fidel-we-water"), { ssr: false }),
  "fidel-ze-swing": dynamic(() => import("./fidel-ze-swing"), { ssr: false }),
  "fidel-ye-whose": dynamic(() => import("./fidel-ye-whose"), { ssr: false }),
  "fidel-ge-gugu": dynamic(() => import("./fidel-ge-gugu"), { ssr: false }),
  "fidel-te-che-shoe": dynamic(() => import("./fidel-te-che-shoe"), { ssr: false }),
  "fidel-tse-sun": dynamic(() => import("./fidel-tse-sun"), { ssr: false }),
  "fidel-fe-post": dynamic(() => import("./fidel-fe-post"), { ssr: false }),
  "fidel-kwa-ball": dynamic(() => import("./fidel-kwa-ball"), { ssr: false }),
  "fidel-parade": dynamic(() => import("./fidel-parade"), { ssr: false }),
  "fidel-word-space": dynamic(() => import("./fidel-word-space"), { ssr: false }),
  "fidel-little-book": dynamic(() => import("./fidel-little-book"), { ssr: false }),
  "fidel-expression": dynamic(() => import("./fidel-expression"), { ssr: false }),
  "fidel-shopping-list": dynamic(() => import("./fidel-shopping-list"), { ssr: false }),
};
