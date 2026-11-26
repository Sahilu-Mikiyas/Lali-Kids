"use client";

import { motion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useScene, useStill } from "./live";

/*
  Scroll-linked touches for the home page's lower sections. Both only move things (transforms),
  never hide them, so nothing ever stands between a reader and the words; with reduced motion
  they rest in place (useScene).

  - Lift: rises into place as it scrolls up into view; `i` staggers a row of cards so they
    arrive one after another like a wave, and `tilt` lets it settle from a slight angle.
  - Depth: drifts at its own speed while it passes through the screen, so headings, cards and
    decorations sit at different depths (parallax). Positive speed lags behind the page.
*/

export function Lift({ children, i = 0, rise = 56, tilt = 0, className }: { children: ReactNode; i?: number; rise?: number; tilt?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.62"] });
  const still = useStill();
  const from = Math.min(0.45, i * 0.12);
  const y = useScene(scrollYProgress, [from, 1], [rise, 0], still, 0);
  const rotate = useScene(scrollYProgress, [from, 1], [tilt, 0], still, 0);
  const scale = useScene(scrollYProgress, [from, 1], [0.96, 1], still, 1);
  return (
    <motion.div ref={ref} style={{ y, rotate, scale }} className={className}>
      {children}
    </motion.div>
  );
}

export function Depth({ children, speed = 0.1, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const still = useStill();
  const d = speed * 260;
  const y = useScene(scrollYProgress, [0, 1], [d, -d], still, 0);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
