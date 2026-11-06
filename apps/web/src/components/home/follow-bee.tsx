"use client";

import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useT } from "@/i18n/provider";
import { playTapSound } from "@/lib/tap-sound";

import { BeeShape } from "../characters";

/*
  "Follow Lali": once you scroll past the hero, Lali the bee flies to whichever part of the
  page you are looking at and hovers beside it. Sections opt in with a `data-bee` attribute
  naming their spot below. Tap her and she says something about that part of the page.

  She is one small fixed element moved with transforms; between flights only her CSS bob runs.
*/

/** x and y are fractions of the screen; `hello` means there is room for her to say hi on arrival. */
type Spot = { x: number; y: number; hello?: boolean; band?: boolean };

// Where Lali hovers for each section. She keeps to the right-hand margin, away from the
// headings, except over the scenery bands, where she joins Anbessa and Gugu in the sky.
const SPOTS: Record<string, Spot> = {
  try: { x: 0.9, y: 0.2, hello: true },
  morning: { x: 0.5, y: 0.3, hello: true, band: true },
  worlds: { x: 0.9, y: 0.26 },
  stars: { x: 0.9, y: 0.2, hello: true },
  parents: { x: 0.92, y: 0.22 },
  report: { x: 0.955, y: 0.3 },
  afternoon: { x: 0.4, y: 0.3, hello: true, band: true },
  watch: { x: 0.72, y: 0.18, hello: true },
  plans: { x: 0.94, y: 0.3 },
  bedtime: { x: 0.8, y: 0.18, hello: true },
};

const SIZE = 52;

export function FollowBee() {
  const t = useT();
  const reduce = useReducedMotion();
  const [spot, setSpot] = useState<string | null>(null);
  // What she is saying, and where: a line only shows while she is still at that spot.
  const [said_, setSaid] = useState<{ spot: string; text: string } | null>(null);
  const line = said_ && said_.spot === spot ? said_.text : null;
  const [face, setFace] = useState(1);
  const x = useMotionValue(0);
  const y = useMotionValue(-80);
  const button = useRef<HTMLButtonElement>(null);
  const said = useRef(new Set<string>());
  const hush = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Which section is in the middle of the screen.
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-bee]")];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const visible = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target, e.intersectionRatio);
          else visible.delete(e.target);
        }
        let best: Element | null = null;
        let top = Infinity;
        // The topmost section crossing the line wins.
        for (const el of visible.keys()) {
          const r = el.getBoundingClientRect().top;
          if (r < top) {
            top = r;
            best = el;
          }
        }
        setSpot(best ? (best as HTMLElement).dataset.bee ?? null : null);
      },
      { rootMargin: "-38% 0px -52% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Fly there: a little arc, turning to face the way she goes.
  useEffect(() => {
    const go = () => {
      const s = spot ? SPOTS[spot] : null;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // On phones there is no margin: she waits in the top corner, under the menu.
      const phone = w < 640 && !s?.band;
      const tx = !s ? w - SIZE - 24 : phone ? w - SIZE - 6 : Math.min(w - SIZE - 10, Math.max(10, s.x * w - SIZE / 2));
      const ty = !s ? -90 : phone ? 96 : Math.max(76, s.y * h);
      const fx = x.get();
      const fy = y.get();
      if (Math.abs(tx - fx) > 4) setFace(tx < fx ? -1 : 1);
      if (reduce) {
        x.set(tx);
        y.set(ty);
        return;
      }
      const dur = Math.min(1.6, 0.7 + Math.hypot(tx - fx, ty - fy) / 900);
      const lift = Math.min(fy, ty) - 60 - Math.abs(tx - fx) * 0.08;
      animate(x, tx, { duration: dur, ease: [0.45, 0, 0.3, 1] });
      animate(y, fy < -40 || ty < -40 ? [fy, ty] : [fy, Math.max(70, lift), ty], { duration: dur, ease: "easeInOut" });
    };
    go();
    window.addEventListener("resize", go);
    return () => window.removeEventListener("resize", go);
  }, [spot, reduce, x, y]);

  const say = useCallback(
    (at: string, ms: number) => {
      const text = t.home.bee.lines[at];
      if (!text) return;
      setSaid({ spot: at, text });
      if (hush.current) clearTimeout(hush.current);
      hush.current = setTimeout(() => setSaid(null), ms);
    },
    [t],
  );

  // The first time she reaches a section on a big screen, she says hello to it.
  useEffect(() => {
    if (!spot || !SPOTS[spot]?.hello || said.current.has(spot) || window.innerWidth < 900) return;
    said.current.add(spot);
    const hello = setTimeout(() => say(spot, 2500), 1100);
    return () => clearTimeout(hello);
  }, [spot, say]);

  const tap = () => {
    playTapSound("buzz");
    if (spot) say(spot, 2600);
    if (!reduce && button.current) {
      button.current.animate(
        [
          { transform: "translate(0,0) rotate(0deg)" },
          { transform: "translate(14px,-16px) rotate(-120deg)" },
          { transform: "translate(0,-28px) rotate(-240deg)" },
          { transform: "translate(0,0) rotate(-360deg)" },
        ],
        { duration: 800, easing: "ease-in-out" },
      );
    }
  };

  const onRight = spot ? SPOTS[spot].x > 0.5 : true;
  return (
    <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-40" data-music-quiet>
      <motion.div animate={{ opacity: spot ? 1 : 0, scale: spot ? 1 : 0.4 }} transition={{ duration: 0.4 }}>
        <button
          ref={button}
          type="button"
          onClick={tap}
          tabIndex={spot ? 0 : -1}
          aria-label={t.home.bee.label}
          className={`block ${spot ? "pointer-events-auto" : ""}`}
          style={{ width: SIZE, height: SIZE }}
        >
          <span className="block h-full w-full transition-transform duration-300" style={{ transform: `scaleX(${face})` }}>
            <svg viewBox="0 0 40 40" className="home-bee-bob block h-full w-full drop-shadow-[0_6px_6px_rgba(27,42,78,.25)]" aria-hidden>
              <BeeShape />
            </svg>
          </span>
        </button>
        <AnimatePresence>
          {line && (
            <motion.p
              key={line}
              role="status"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 420, damping: 20 }}
              className={`absolute top-1 w-max max-w-52 rounded-2xl bg-white px-3 py-1.5 font-display text-base font-extrabold text-ink shadow-[0_4px_0_rgba(27,42,78,.15),0_10px_24px_-10px_rgba(27,42,78,.4)] ${
                onRight ? "right-full mr-2 origin-right" : "left-full ml-2 origin-left"
              }`}
            >
              {line}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
