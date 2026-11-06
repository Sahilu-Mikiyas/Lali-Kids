"use client";

import { createContext, useCallback, useContext, useRef, type MouseEvent, type ReactNode } from "react";

import { playTapSound, type TapSound } from "@/lib/tap-sound";

/*
  Tap-to-play for the drawn pictures.

  Wrap anything inside a scene's SVG and it reacts when a child taps it:

    <Tappable reaction="bounce" sound="giggle">
      <CubShape pose="sit" />
    </Tappable>

    reaction  "bounce" | "spin" | "wiggle" | "grow" | "loop"   (default "bounce")
    sound     "pop" | "boing" | "chime" | "giggle" | "buzz" | "baa" | "none"   (default "pop")
    sparkle   a little burst of stars where the finger landed (default true)

  - Characters placed with <Place> are tappable already (Anbessa giggles and bounces,
    Gugu waves, Grandma glows, Lali loops), so you only need this for other things.
    Pass <Place tap={false}> to turn that off, or <Place tap={{ reaction, sound }}> to change it.
  - While it plays, the wrapper has the class `lali-tapped`, so a drawing can show a
    special face or move a limb with CSS (see `.lali-tapped` in globals.css).
  - Taps only work inside the reader (<TapZone>); on covers and shelf cards the
    wrapper is a plain <g>, so a tap there still opens the book.
  - Don't put a `transform` attribute on the same element you wrap: the reaction
    animates the wrapper itself. Position things inside it, or outside it with a <g>.
  - Reduced motion: no movement or sparkles, just the sound.
*/

export type TapReaction = "bounce" | "spin" | "wiggle" | "grow" | "loop";

export type TappableProps = {
  reaction?: TapReaction;
  sound?: TapSound;
  sparkle?: boolean;
  children: ReactNode;
};

const TapOn = createContext(false);

/** Turns taps on for the pictures inside (the reader's open pages). */
export function TapZone({ enabled = true, children }: { enabled?: boolean; children: ReactNode }) {
  return <TapOn.Provider value={enabled}>{children}</TapOn.Provider>;
}

const MOVES: Record<TapReaction, { frames: Keyframe[]; ms: number; origin: string }> = {
  bounce: {
    origin: "50% 100%",
    ms: 720,
    frames: [
      { transform: "translateY(0) scale(1, 1)" },
      { transform: "translateY(0) scale(1.12, 0.86)", offset: 0.14 },
      { transform: "translateY(-26px) scale(0.92, 1.1)", offset: 0.42 },
      { transform: "translateY(0) scale(1.1, 0.9)", offset: 0.68 },
      { transform: "translateY(-6px) scale(0.98, 1.02)", offset: 0.84 },
      { transform: "translateY(0) scale(1, 1)" },
    ],
  },
  spin: {
    origin: "50% 50%",
    ms: 800,
    frames: [
      { transform: "rotate(0) scale(1)" },
      { transform: "rotate(200deg) scale(1.15)", offset: 0.55 },
      { transform: "rotate(380deg) scale(0.97)", offset: 0.85 },
      { transform: "rotate(360deg) scale(1)" },
    ],
  },
  wiggle: {
    origin: "50% 100%",
    ms: 760,
    frames: [
      { transform: "rotate(0)" },
      { transform: "rotate(-9deg)", offset: 0.15 },
      { transform: "rotate(8deg)", offset: 0.35 },
      { transform: "rotate(-6deg)", offset: 0.55 },
      { transform: "rotate(4deg)", offset: 0.75 },
      { transform: "rotate(0)" },
    ],
  },
  grow: {
    origin: "50% 50%",
    ms: 700,
    frames: [
      { transform: "scale(1)" },
      { transform: "scale(1.28)", offset: 0.35 },
      { transform: "scale(0.94)", offset: 0.65 },
      { transform: "scale(1.04)", offset: 0.85 },
      { transform: "scale(1)" },
    ],
  },
  // A loop-the-loop: up, over and round, turning as it goes.
  loop: {
    origin: "50% 50%",
    ms: 950,
    frames: [
      { transform: "translate(0px, 0px) rotate(0deg)" },
      { transform: "translate(18px, -14px) rotate(-90deg)", offset: 0.25 },
      { transform: "translate(0px, -32px) rotate(-180deg)", offset: 0.5 },
      { transform: "translate(-18px, -14px) rotate(-270deg)", offset: 0.75 },
      { transform: "translate(0px, 0px) rotate(-360deg)" },
    ],
  },
};

const SPARK = "M0 -5 Q1 -1 5 0 Q1 1 0 5 Q-1 1 -5 0 Q-1 -1 0 -5Z";
const SPARK_COLORS = ["#FFD54A", "#FFFFFF", "#FF8FB1", "#7FD3FF"];
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A little burst of stars at a point on the screen, drawn into the picture's SVG. */
function burst(svg: SVGSVGElement, clientX: number, clientY: number) {
  const m = svg.getScreenCTM();
  if (!m) return;
  const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
  const NS = "http://www.w3.org/2000/svg";
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + Math.random() * 0.6;
    const dist = 18 + Math.random() * 16;
    const el = document.createElementNS(NS, "path");
    el.setAttribute("d", SPARK);
    el.setAttribute("fill", SPARK_COLORS[i % SPARK_COLORS.length]);
    el.style.pointerEvents = "none";
    el.style.transformBox = "fill-box";
    el.style.transformOrigin = "center";
    const g = document.createElementNS(NS, "g");
    g.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
    g.append(el);
    svg.append(g);
    const dx = Math.cos(a) * dist;
    const dy = Math.sin(a) * dist - 6;
    el.animate(
      [
        { transform: "translate(0, 0) scale(0.3) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.7}px, ${dy * 0.7}px) scale(1.1) rotate(60deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2) rotate(120deg)`, opacity: 0 },
      ],
      { duration: 620 + Math.random() * 200, easing: "cubic-bezier(.2,.7,.3,1)" },
    ).onfinish = () => g.remove();
  }
}

export function Tappable({ reaction = "bounce", sound = "pop", sparkle = true, children }: TappableProps) {
  const on = useContext(TapOn);
  const ref = useRef<SVGGElement>(null);
  const busy = useRef(false);

  const onClick = useCallback(
    (e: MouseEvent<SVGGElement>) => {
      const el = ref.current;
      if (!el) return;
      playTapSound(sound);
      if (reduced()) return;
      if (sparkle && el.ownerSVGElement) burst(el.ownerSVGElement, e.clientX, e.clientY);
      if (busy.current) return;
      busy.current = true;
      const move = MOVES[reaction];
      el.style.transformOrigin = move.origin;
      el.classList.add("lali-tapped");
      const a = el.animate(move.frames, { duration: move.ms, easing: "ease-in-out" });
      // Limb moves and faces (CSS, under .lali-tapped) run a little longer than the hop.
      setTimeout(() => {
        el.classList.remove("lali-tapped");
        busy.current = false;
      }, Math.max(move.ms, 1200));
      a.onfinish = () => {
        a.cancel();
      };
    },
    [reaction, sound, sparkle],
  );

  if (!on) return <g>{children}</g>;
  return (
    <g ref={ref} onClick={onClick} className="lali-tappable">
      {children}
    </g>
  );
}
