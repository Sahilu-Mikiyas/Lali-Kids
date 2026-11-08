"use client";

import type { ComponentType } from "react";

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {};
