"use client";

import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

/*
  Small shared pieces that bring the home page's sections to life:

  - usePointerLook: a character turns its eyes and leans towards the mouse pointer.
  - Drift: a handful of particles (pollen, petals, leaves, fireflies, dust) floating
    through a section, CSS transforms only, paused off screen by `data-asleep`.
  - FlyBy: a butterfly (or Lali) that crosses between two sections.
  - Edge: a torn-paper or rolling-hill edge where one section meets the next.
  - Twinkles: little stars that sparkle on a card while it is hovered.
*/

const v = (o: Record<string, string | number>) => o as CSSProperties;

/**
 * Where the pointer is, seen from `ref`: `look` is -3..3 (for pupils), and `lean` a
 * springy rotation in degrees. Only on devices with a mouse; React re-renders only when
 * the look step changes.
 */
export function usePointerLook(ref: RefObject<HTMLElement | null>, maxLean = 5): { look: number; lean: MotionValue<number> } {
  const [look, setLook] = useState(0);
  const raw = useMotionValue(0);
  const lean = useSpring(raw, { stiffness: 80, damping: 14 });
  const last = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let near = true;
    const io =
      typeof IntersectionObserver !== "undefined" && ref.current
        ? new IntersectionObserver(([e]) => {
            near = e.isIntersecting;
          })
        : null;
    if (ref.current) io?.observe(ref.current);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !near) return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / Math.max(200, innerWidth * 0.35);
      const k = Math.max(-1, Math.min(1, dx));
      raw.set(k * maxLean);
      const step = Math.round(k * 3);
      if (step !== last.current) {
        last.current = step;
        setLook(step);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      io?.disconnect();
    };
  }, [ref, raw, maxLean]);
  return { look, lean };
}

export type DriftKind = "pollen" | "petal" | "leaf" | "firefly" | "dust" | "star";

const DRIFT_STYLE: Record<DriftKind, string> = {
  pollen: "h-1.5 w-1.5 rounded-full bg-[#FFF3B0] shadow-[0_0_6px_2px_rgba(255,240,170,.6)]",
  petal: "h-2.5 w-1.5 rounded-full bg-[#FFD23F]",
  leaf: "h-2.5 w-3.5 rounded-[0_100%_0_100%] bg-[#6CC27A]",
  firefly: "h-1.5 w-1.5 rounded-full bg-[#FFF6A8] shadow-[0_0_10px_4px_rgba(255,236,120,.55)]",
  dust: "h-1 w-1 rounded-full bg-white/80",
  star: "h-1 w-1 rounded-full bg-white",
};

/** A few particles drifting through their parent (which must be positioned). Fixed layout, so server and browser agree. */
export function Drift({ kind, n = 7, area = [0, 0, 100, 100], className = "", tint }: { kind: DriftKind; n?: number; area?: [number, number, number, number]; className?: string; tint?: string }) {
  const [x0, y0, x1, y1] = area;
  const anim = kind === "firefly" ? "home-firefly" : kind === "leaf" || kind === "petal" ? "home-fall" : kind === "star" ? "home-twinkle" : "home-mote";
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className={`${anim} absolute block ${DRIFT_STYLE[kind]}`}
          style={v({
            left: `${x0 + (((i * 37 + 11) % 100) / 100) * (x1 - x0)}%`,
            top: `${y0 + (((i * 59 + 23) % 100) / 100) * (y1 - y0)}%`,
            "--d": `${-((i * 1.7) % 9)}s`,
            "--dur": `${(kind === "firefly" ? 4 : kind === "star" ? 2.6 : 9) + (i % 4) * 1.3}s`,
            "--dx": `${i % 2 ? 40 : -34}px`,
            ...(tint ? { background: i % 2 ? tint : undefined } : {}),
          })}
        />
      ))}
    </div>
  );
}

/** A butterfly that crosses its parent now and then, flapping. */
export function FlyBy({ color = "#FF8FB1", top = "20%", dur = 16, delay = 0, reverse = false, className = "" }: { color?: string; top?: string; dur?: number; delay?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={`home-flyby pointer-events-none absolute left-0 ${className}`} style={v({ top, "--dur": `${dur}s`, "--d": `${delay}s`, animationDirection: reverse ? "reverse" : "normal" })} aria-hidden>
      <div className="home-flyby-bob">
        <svg viewBox="0 0 20 20" className="h-6 w-6 overflow-visible" style={reverse ? { transform: "scaleX(-1)" } : undefined}>
          <g className="home-flap-l">
            <path d="M10 9 C7 2 1 0 1 4 C0 8 5 10 10 10Z M10 10 C5 10 2 14 4 16 C6 18 9 14 10 11Z" fill={color} stroke="#2B1A3A" strokeWidth={0.8} />
          </g>
          <g className="home-flap-r">
            <path d="M10 9 C13 2 19 0 19 4 C20 8 15 10 10 10Z M10 10 C15 10 18 14 16 16 C14 18 11 14 10 11Z" fill={color} stroke="#2B1A3A" strokeWidth={0.8} />
          </g>
          <rect x={9.3} y={6} width={1.4} height={9} rx={0.7} fill="#2B1A3A" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Where two sections meet: `tear` is a torn paper edge, `hills` rolling hills with a soft
 * rim of light. `color` is the colour of the section it belongs to (the one below).
 */
export function Edge({ kind, color, className = "", flip = false }: { kind: "tear" | "hills"; color: string; className?: string; flip?: boolean }) {
  if (kind === "tear") {
    let d = "M0 30";
    for (let x = 0, i = 0; x <= 1200; x += 24, i++) d += ` L${x} ${10 + ((i * 7) % 11) + (i % 3) * 3}`;
    d += " L1200 40 L0 40Z";
    return (
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={`pointer-events-none absolute inset-x-0 h-6 w-full sm:h-8 ${flip ? "top-0 rotate-180" : "-top-[23px] sm:-top-[31px]"} ${className}`} aria-hidden>
        <path d={d} fill="#000" opacity={0.06} transform="translate(0 -3)" />
        <path d={d} fill={color} />
        <path d={d.replace(" L1200 40 L0 40Z", "")} stroke="#fff" strokeOpacity={0.7} strokeWidth={1.5} fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className={`pointer-events-none absolute inset-x-0 -top-[39px] h-10 w-full sm:-top-[59px] sm:h-[60px] ${className}`} aria-hidden>
      <path d="M0 60 V40 C120 10 260 8 380 30 C520 56 640 10 800 18 C960 26 1060 50 1200 30 V60Z" fill={color} opacity={0.55} />
      <path d="M0 60 V48 C160 24 300 30 440 44 C600 60 720 30 880 34 C1020 38 1100 52 1200 44 V60Z" fill={color} />
      <path d="M0 48 C160 24 300 30 440 44 C600 60 720 30 880 34 C1020 38 1100 52 1200 44" stroke="#fff" strokeOpacity={0.5} strokeWidth={2} fill="none" />
    </svg>
  );
}

/** Little stars that pop out round a card while it is hovered (the parent needs `group`). */
export function Twinkles({ color = "#F5B21E" }: { color?: string }) {
  const spots = [
    [8, 12],
    [88, 8],
    [94, 70],
    [6, 82],
    [50, -4],
  ];
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {spots.map(([x, y], i) => (
        <svg
          key={i}
          viewBox="-10 -10 20 20"
          className="home-twinkle-hover absolute h-4 w-4 opacity-0 group-hover:opacity-100"
          style={v({ left: `${x}%`, top: `${y}%`, "--d": `${-i * 0.3}s` })}
        >
          <path d="M0 -10 Q1.6 -1.6 10 0 Q1.6 1.6 0 10 Q-1.6 1.6 -10 0 Q-1.6 -1.6 0 -10Z" fill={i % 2 ? "#fff" : color} />
        </svg>
      ))}
    </span>
  );
}

/** A squash-and-stretch with a burst of sparkles, for a tap on a card or picture. */
export function boop(el: HTMLElement | null, colors = ["#FFE27A", "#FFFFFF", "#FFB3CF", "#9FE3FF"]) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.animate(
    [
      { transform: "scale(1,1)" },
      { transform: "scale(1.06,.92)", offset: 0.2 },
      { transform: "scale(.97,1.04)", offset: 0.5 },
      { transform: "scale(1.01,.99)", offset: 0.75 },
      { transform: "scale(1,1)" },
    ],
    { duration: 520, easing: "ease-out" },
  );
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.className = "home-spark";
    s.style.background = colors[i % colors.length];
    s.style.left = `${r.width / 2}px`;
    s.style.top = `${r.height / 2}px`;
    el.append(s);
    const a = (i / 8) * Math.PI * 2;
    const d = Math.min(r.width, r.height) * 0.45 + Math.random() * 20;
    s.animate(
      [
        { transform: "translate(-50%,-50%) scale(.3)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(1) rotate(120deg)`, opacity: 0 },
      ],
      { duration: 650, easing: "cubic-bezier(.2,.7,.3,1)" },
    ).onfinish = () => s.remove();
  }
}
