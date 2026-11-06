"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Lang } from "@/content/stories";
import { tellApp } from "@/lib/in-app";
import { playPeel, playStick, playWhoosh } from "@/lib/sticker-sound";
import { dict } from "@/i18n/dict";
import { Sticker } from "./sticker";

export type RewardSticker = { id: string; color: string; title: Record<Lang, string> };

/** The little sticker book in the reader's top bar: new stickers fly into it. */
export function StickerBookButton({ lang, count, light = false }: { lang: Lang; count?: number; light?: boolean }) {
  const label = dict[lang].stickers.myBook;
  return (
    <Link
      href="/stickers"
      aria-label={label}
      title={label}
      data-sticker-book=""
      onClick={(e) => {
        if (tellApp({ type: "lali:stickers" })) e.preventDefault();
      }}
      className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full shadow-[0_3px_0_rgba(27,42,78,.18)] transition hover:-translate-y-0.5 ${light ? "bg-white/90" : "bg-white"}`}
    >
      <BookIcon />
      {count ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] font-black leading-none text-white tabular-nums">{count}</span>
      ) : null}
    </Link>
  );
}

export function BookIcon({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden>
      <rect x={5} y={4} width={22} height={25} rx={4} fill="#E8513B" />
      <rect x={5} y={4} width={5} height={25} rx={2.5} fill="#B83826" />
      <rect x={8} y={26} width={19} height={3} rx={1.5} fill="#FFFDF6" />
      <circle cx={18} cy={12} r={5} fill="#FFD54A" stroke="#fff" strokeWidth={1.8} />
      <rect x={13} y={18} width={10} height={6} rx={2} fill="#86D3FF" stroke="#fff" strokeWidth={1.6} transform="rotate(-8 18 21)" />
    </svg>
  );
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * The end of a story: each new sticker appears on a little sheet over the picture, peels off
 * and flies into the sticker book in the top bar, with sounds. Then `onDone` (the grown-ups
 * card comes after). Reduced motion: the sheet shows for a moment, no flying.
 */
export function StickerReward({ stickers, lang, reduce, onDone }: { stickers: RewardSticker[]; lang: Lang; reduce: boolean; onDone: () => void }) {
  const [i, setI] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);

  // Sit the sheet over the end picture (or the middle of the screen).
  useEffect(() => {
    const art = document.querySelector("[data-art-face='end'][data-live]")?.getBoundingClientRect();
    const raf = requestAnimationFrame(() =>
      setAt(art && art.width ? { x: art.left + art.width / 2, y: art.top + art.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 }),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!at) return;
    let alive = true;
    const run = async () => {
      const s = stickerRef.current;
      const sheet = sheetRef.current;
      if (!s || !sheet) return;
      if (reduce) {
        await wait(1400);
        return;
      }
      await sheet.animate(
        [
          { transform: "translate(-50%, -50%) scale(0.4) rotate(-8deg)", opacity: 0 },
          { transform: "translate(-50%, -50%) scale(1.06) rotate(2deg)", opacity: 1, offset: 0.7 },
          { transform: "translate(-50%, -50%) scale(1) rotate(-2deg)", opacity: 1 },
        ],
        { duration: 520, easing: "cubic-bezier(.3,1.4,.5,1)", fill: "forwards" },
      ).finished;
      await wait(650);
      if (!alive) return;
      // Peel: one corner lifts, the sticker curls up off the sheet and its shadow grows.
      playPeel();
      await s.animate(
        [
          { transform: "perspective(500px) rotateX(0deg) rotateZ(0deg) translateY(0) scale(1)", filter: "drop-shadow(0 1px 0 rgba(0,0,0,.15))" },
          { transform: "perspective(500px) rotateX(28deg) rotateZ(-10deg) translateY(-6px) scale(1.04)", offset: 0.5 },
          { transform: "perspective(500px) rotateX(0deg) rotateZ(6deg) translateY(-22px) scale(1.12)", filter: "drop-shadow(0 16px 12px rgba(0,0,0,.3))" },
        ],
        { duration: 560, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" },
      ).finished;
      if (!alive) return;
      const from = s.getBoundingClientRect();
      const book = document.querySelector("[data-sticker-book]");
      const to = book?.getBoundingClientRect();
      sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 250, fill: "forwards" });
      if (to && to.width) {
        playWhoosh();
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        const k = (to.width * 0.8) / from.width;
        await s.animate(
          [
            { transform: "translate(0, -22px) rotate(6deg) scale(1.12)" },
            { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) rotate(-14deg) scale(0.9)`, offset: 0.5 },
            { transform: `translate(${dx}px, ${dy}px) rotate(8deg) scale(${k})`, opacity: 1, offset: 0.92 },
            { transform: `translate(${dx}px, ${dy}px) rotate(8deg) scale(${k * 0.6})`, opacity: 0 },
          ],
          { duration: 1050, easing: "cubic-bezier(.45,0,.3,1)", fill: "forwards" },
        ).finished;
        if (!alive) return;
        playStick();
        book?.animate([{ transform: "scale(1)" }, { transform: "scale(1.35) rotate(-8deg)" }, { transform: "scale(1)" }], { duration: 520, easing: "cubic-bezier(.3,1.6,.5,1)" });
      }
      await wait(350);
    };
    run()
      .catch(() => {})
      .then(() => {
        if (!alive) return;
        if (i + 1 < stickers.length) setI(i + 1);
        else doneRef.current();
      });
    return () => {
      alive = false;
    };
  }, [at, i, reduce, stickers.length]);

  const s = stickers[i];
  if (!s || !at) return null;
  const t = dict[lang].stickers;
  const golden = s.id.startsWith("gold:");
  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-live="polite">
      <div
        key={s.id}
        ref={sheetRef}
        data-sticker-sheet={s.id}
        className="absolute w-[min(240px,70vw)] rounded-[22px] bg-[#FFFBF0] p-3 pb-2.5 text-center shadow-[0_14px_30px_-10px_rgba(0,0,0,.5),0_4px_0_#E6DEC9]"
        style={{ left: at.x, top: at.y, transform: "translate(-50%, -50%)", opacity: reduce ? 1 : 0 }}
      >
        <div className="rounded-[16px] border-2 border-dashed border-[#E2D4B0] bg-[repeating-linear-gradient(45deg,#FFF6DC_0_8px,#FFF1CF_8px_16px)] p-3">
          <div ref={stickerRef} className="mx-auto w-fit will-change-transform">
            <Sticker id={s.id} color={s.color} size={150} />
          </div>
        </div>
        <p className={`mt-2 text-sm font-black uppercase tracking-[0.1em] ${golden ? "text-gold-deep" : "text-coral"} ${lang === "am" ? "font-ethiopic" : "font-display"}`}>
          {golden ? t.newGolden : s.id.startsWith("m:") ? t.newSpecial : t.newSticker}
        </p>
        <p className={`text-[0.95rem] font-bold leading-tight text-ink ${lang === "am" ? "font-ethiopic" : ""}`}>{s.title[lang]}</p>
      </div>
    </div>
  );
}
