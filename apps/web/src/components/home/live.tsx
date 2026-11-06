"use client";

import { MotionConfig, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { useMedia } from "@/lib/use-media";

/*
  Keeps the home page light on small phones.

  - useAwake marks a block as asleep while it is well off screen (data-asleep): globals.css
    pauses every CSS animation inside it, so only what you can see moves.
  - <HomeMotion> makes Motion follow the reduced-motion setting: no movement, only fades.
  - useScene maps scroll progress to a style value that simply rests at `rest` with reduced
    motion. It is always a motion value, so the server and the browser render the same thing.
*/

/** 1 while the reader asks for reduced motion, else 0 (0 during hydration, like the server). */
export function useStill(): MotionValue<number> {
  const still = useMotionValue(0);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  useEffect(() => still.set(reduced ? 1 : 0), [reduced, still]);
  return still;
}

export function useScene(progress: MotionValue<number>, input: number[], output: number[], still: MotionValue<number>, rest?: number): MotionValue<number>;
export function useScene(progress: MotionValue<number>, input: number[], output: string[], still: MotionValue<number>, rest?: string): MotionValue<string>;
export function useScene(progress: MotionValue<number>, input: number[], output: number[] | string[], still: MotionValue<number>, rest?: number | string): MotionValue<number> | MotionValue<string> {
  const end = rest ?? output[output.length - 1];
  const moving = useTransform(progress, input, output as number[]);
  return useTransform([moving, still] as MotionValue[], ([m, s]) => (s ? end : m)) as MotionValue<number>;
}

export function useAwake<T extends HTMLElement>(margin = "200px") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.removeAttribute("data-asleep");
        else el.setAttribute("data-asleep", "");
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return ref;
}

export function HomeMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
