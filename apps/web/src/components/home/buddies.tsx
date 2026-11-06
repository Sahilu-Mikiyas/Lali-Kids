"use client";

import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useT } from "@/i18n/provider";
import { playTapSound, type TapSound } from "@/lib/tap-sound";

import { CubShape, GuguShape, type CubPose, type GuguPose, type Mood } from "../characters";

/*
  Anbessa and Gugu as page-sized friends you can poke: hover and they lean in, tap and they
  jump, giggle and say something. Each one is its own small layer, moved with transforms only.
*/

type Who = "cub" | "gugu";

const SOUNDS: Record<Who, TapSound> = { cub: "giggle", gugu: "boing" };

export function Buddy({
  who,
  pose,
  mood,
  look,
  lines,
  className = "",
  bubbleSide = "right",
  label,
  children,
}: {
  who: Who;
  pose?: CubPose | GuguPose;
  mood?: Mood;
  look?: number;
  /** What they say when tapped, in turn. */
  lines?: string[];
  className?: string;
  bubbleSide?: "left" | "right";
  label?: string;
  children?: ReactNode;
}) {
  const t = useT();
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLButtonElement>();
  const [say, setSay] = useState<string | null>(null);
  const [happy, setHappy] = useState(false);
  const turn = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const said = lines ?? (who === "cub" ? t.home.buddies.cubSays : t.home.buddies.guguSays);

  const tap = () => {
    playTapSound(SOUNDS[who]);
    setSay(said[turn.current++ % said.length]);
    setHappy(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSay(null);
      setHappy(false);
    }, 2200);
    if (reduce || !scope.current) return;
    animate(
      scope.current,
      who === "cub" ? { y: [0, 4, -34, 0, -8, 0], scaleY: [1, 0.86, 1.08, 0.94, 1.02, 1], scaleX: [1, 1.1, 0.94, 1.05, 1, 1] } : { y: [0, -40, 0, -14, 0], rotate: [0, -12, 10, -4, 0] },
      { duration: 0.75, ease: "easeOut" },
    );
  };

  const shape =
    who === "cub" ? (
      <CubShape pose={(pose as CubPose) ?? "sit"} mood={happy ? "joy" : mood} look={look} />
    ) : (
      <GuguShape pose={happy ? "hop" : ((pose as GuguPose) ?? "sit")} mood={happy ? "joy" : mood} />
    );

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={scope}
        type="button"
        onClick={tap}
        whileHover={reduce ? undefined : { y: -6, rotate: who === "cub" ? -4 : 4 }}
        whileTap={reduce ? undefined : { scale: 0.92 }}
        aria-label={label ?? (who === "cub" ? t.home.buddies.cub : t.home.buddies.gugu)}
        className="block w-full origin-bottom cursor-pointer"
      >
        <svg viewBox="0 0 200 240" className="block w-full overflow-visible" aria-hidden>
          {shape}
        </svg>
        {children}
      </motion.button>
      <AnimatePresence>
        {say && (
          <motion.p
            key={say}
            role="status"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className={`pointer-events-none absolute bottom-[88%] z-10 w-max max-w-44 rounded-2xl bg-white px-3 py-1.5 font-display text-base font-extrabold text-ink shadow-[0_4px_0_rgba(27,42,78,.15)] ${
              bubbleSide === "right" ? "left-[55%] origin-bottom-left" : "right-[55%] origin-bottom-right"
            }`}
          >
            {say}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
