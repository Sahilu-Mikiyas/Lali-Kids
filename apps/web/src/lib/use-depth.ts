"use client";

import { useEffect, useRef, type RefObject } from "react";

/*
  Depth for the pictures: layers marked `data-depth` (see <Depth> in book/scenery.tsx)
  drift a little with the mouse on desktop, or with the phone's tilt. Far layers move
  less than near ones, so the scene opens up like a pop-up book.

  It writes one transform per layer straight to the DOM in a requestAnimationFrame loop
  that sleeps once the layers have settled: no React renders, transforms only.
*/

/** How far the nearest layer (depth 1) moves, in scene units (the 400 × 300 picture). */
const AMP_X = 7;
const AMP_Y = 3;

type IOSOrientation = { requestPermission?: () => Promise<"granted" | "denied"> };

let tiltAsked = false;

/**
 * iOS only lets a page read the tilt after the person allows it, and the question may only
 * be asked from a tap. Call this from a tap handler; it does nothing elsewhere or the second time.
 */
export function askForTilt() {
  if (tiltAsked || typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;
  tiltAsked = true;
  const req = (window.DeviceOrientationEvent as unknown as IOSOrientation).requestPermission;
  if (typeof req === "function") req.call(window.DeviceOrientationEvent).catch(() => {});
}

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/** Drive the `data-depth` layers inside `root`. `refreshKey` changes when the layers change. */
export function useDepth(root: RefObject<HTMLElement | null>, enabled: boolean, refreshKey: unknown) {
  const state = useRef({ tx: 0, ty: 0, x: 0, y: 0, raf: 0, els: [] as { el: HTMLElement | SVGElement; d: number }[], stale: true, kick: () => {} });

  useEffect(() => {
    state.current.stale = true;
    state.current.kick();
  }, [refreshKey]);

  useEffect(() => {
    const s = state.current;
    const collect = () => {
      const r = root.current;
      s.els = r ? Array.from(r.querySelectorAll<HTMLElement | SVGElement>("[data-depth]")).map((el) => ({ el, d: Number(el.dataset.depth) || 0 })) : [];
      s.stale = false;
    };
    const write = () => {
      for (const { el, d } of s.els) {
        if (!el.isConnected) {
          s.stale = true;
          continue;
        }
        el.style.transform = `translate(${(s.x * d * AMP_X).toFixed(2)}px, ${(s.y * d * AMP_Y).toFixed(2)}px)`;
      }
    };
    if (!enabled) {
      s.x = s.y = s.tx = s.ty = 0;
      collect();
      write();
      s.kick = () => {};
      return;
    }
    const frame = () => {
      s.raf = 0;
      if (s.stale) collect();
      s.x += (s.tx - s.x) * 0.07;
      s.y += (s.ty - s.y) * 0.07;
      write();
      if (Math.abs(s.tx - s.x) > 0.002 || Math.abs(s.ty - s.y) > 0.002) s.raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (s.raf) return;
      // Layers come and go with the pages; look again each time the drift wakes up.
      s.stale = true;
      s.raf = requestAnimationFrame(frame);
    };
    s.kick = () => {
      // New layers start where the old ones were.
      s.stale = true;
      kick();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      s.tx = clamp((e.clientX / innerWidth - 0.5) * -2);
      s.ty = clamp((e.clientY / innerHeight - 0.5) * -2);
      kick();
    };
    const onLeave = () => {
      s.tx = s.ty = 0;
      kick();
    };

    // Tilt: measured from how the phone was held when the book opened, and that resting
    // angle slowly follows the hands, so a child lying down still gets a level picture.
    let base: { b: number; g: number } | null = null;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      const landscape = Math.abs((screen.orientation?.angle ?? 0) % 180) === 90;
      const lr = landscape ? e.beta : e.gamma;
      const fb = landscape ? e.gamma : e.beta;
      if (!base) base = { b: fb, g: lr };
      base.b += (fb - base.b) * 0.01;
      base.g += (lr - base.g) * 0.01;
      s.tx = clamp(-(lr - base.g) / 22);
      s.ty = clamp(-(fb - base.b) / 22);
      kick();
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onTilt);
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.kick = () => {};
    };
  }, [enabled, root]);
}
