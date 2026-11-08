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
};
