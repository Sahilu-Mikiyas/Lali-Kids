"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

import type { Lang } from "@/content/stories";
import { hash } from "@/lib/find-lali";
import { playStick } from "@/lib/sticker-sound";
import { earnedStickers, stickerCatalog, type StickerBasis, type StickerDef, type StickerPosition, type StickerStory } from "@/lib/stickers/catalog";
import { adoptServerBasis, placeSticker, useStickerBasis } from "@/lib/stickers/store";
import { playTapSound } from "@/lib/tap-sound";
import { useMedia } from "@/lib/use-media";
import { useLang } from "@/i18n/provider";
import { dict } from "@/i18n/dict";
import { Bee } from "../characters";
import { Sticker } from "./sticker";

/*
  The sticker book: album pages that turn, a soft silhouette in each empty slot, and earned
  stickers that wobble and shine when tapped. Drag a sticker to stick it anywhere on its own
  page; where it was put is saved (the server for a signed-in child, this browser otherwise).
*/

const PER_PAGE = 9;

type AlbumPage = { index: number; kind: number; title: string; hint: string; items: StickerDef[] };

function slotCenter(i: number): { x: number; y: number } {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return { x: (col + 0.5) / 3, y: 0.3 + row * 0.235 };
}

/** A sticker's resting tilt, the same every time. */
const tilt = (id: string) => ((hash(id) % 13) - 6) * 1.1;

function AlbumSheet({
  page,
  earned,
  positions,
  lang,
  turn,
}: {
  page: AlbumPage;
  earned: Set<string>;
  positions: Record<string, StickerPosition>;
  lang: Lang;
  turn: "next" | "prev" | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ id: string; x: number; y: number; ox: number; oy: number; sx: number; sy: number; moved: boolean; pointer: number } | null>(null);
  const [tapped, setTapped] = useState<Record<string, number>>({});
  const font = lang === "am" ? "font-ethiopic" : "font-display";

  const where = (d: StickerDef, i: number): StickerPosition => {
    const p = positions[d.id];
    if (p && p.page === page.index) return p;
    return { page: page.index, ...slotCenter(i), r: tilt(d.id) };
  };

  const toPage = (clientX: number, clientY: number) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: (clientX - r.left) / r.width, y: (clientY - r.top) / r.height };
  };

  const down = (e: ReactPointerEvent, d: StickerDef, at: StickerPosition) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const p = toPage(e.clientX, e.clientY);
    setDrag({ id: d.id, x: at.x, y: at.y, ox: p.x - at.x, oy: p.y - at.y, sx: e.clientX, sy: e.clientY, moved: false, pointer: e.pointerId });
  };
  const move = (e: ReactPointerEvent) => {
    if (!drag || e.pointerId !== drag.pointer) return;
    const p = toPage(e.clientX, e.clientY);
    const moved = drag.moved || Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 6;
    // Kept on its own page, with room for the sticker's edges.
    setDrag({ ...drag, moved, x: Math.min(0.88, Math.max(0.12, p.x - drag.ox)), y: Math.min(0.92, Math.max(0.12, p.y - drag.oy)) });
  };
  const up = (e: ReactPointerEvent, d: StickerDef, at: StickerPosition) => {
    if (!drag || e.pointerId !== drag.pointer) return;
    setDrag(null);
    if (!drag.moved) {
      // A tap: wobble and shine.
      playTapSound("boing");
      setTapped((t) => ({ ...t, [d.id]: (t[d.id] ?? 0) + 1 }));
      return;
    }
    playStick();
    placeSticker(d.id, { page: page.index, x: drag.x, y: drag.y, r: at.r ?? tilt(d.id) });
  };

  return (
    <div
      ref={ref}
      data-album-page={page.index}
      className={`relative aspect-[3/4] w-full select-none overflow-hidden rounded-[26px] bg-[#FFFBF0] shadow-[0_8px_0_#E6DEC9,0_22px_40px_-18px_rgba(27,42,78,.45)] ${turn === "next" ? "sticker-turn-next" : turn === "prev" ? "sticker-turn-prev" : ""}`}
    >
      {/* paper: soft dots and a stitched edge */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#F0E4C6_1.2px,transparent_1.3px)] [background-size:18px_18px] opacity-70" />
      <div className="pointer-events-none absolute inset-3 rounded-[20px] border-2 border-dashed border-[#EADBB5]" />
      <div className="relative px-5 pt-5 text-center sm:px-7 sm:pt-6">
        <h2 className={`text-[clamp(1.1rem,3.2vw,1.6rem)] font-black leading-tight text-ink ${font}`}>{page.title}</h2>
        <p className={`mx-auto mt-1 max-w-[30ch] text-[clamp(0.72rem,1.8vw,0.9rem)] leading-snug text-muted ${lang === "am" ? "font-ethiopic" : ""}`}>{page.hint}</p>
      </div>
      {/* empty slots, waiting */}
      {page.items.map((d, i) => {
        const c = slotCenter(i);
        const have = earned.has(d.id);
        return (
          <div
            key={`slot-${d.id}`}
            data-slot={d.id}
            className="pointer-events-none absolute flex w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
          >
            <div className={`aspect-square w-[88%] rounded-full ${have ? "border-2 border-dashed border-[#EADBB5]" : ""}`}>
              {!have && (
                <div className="sticker-wait h-full w-full" style={{ animationDelay: `${-i * 0.4}s` }} aria-label={dict[lang].stickers.notYet}>
                  <Sticker id={d.id} color={d.color} look="silhouette" size={100} style={{ width: "100%", height: "auto" }} />
                </div>
              )}
            </div>
            <p className={`mt-0.5 line-clamp-1 w-full text-center text-[clamp(0.55rem,1.3vw,0.72rem)] font-bold ${have ? "text-ink/70" : "text-ink/35"} ${lang === "am" ? "font-ethiopic" : ""}`}>
              {d.title[lang]}
            </p>
          </div>
        );
      })}
      {/* the stickers themselves, stuck wherever the child put them */}
      {page.items.map((d, i) => {
        if (!earned.has(d.id)) return null;
        const at = where(d, i);
        const dragging = drag?.id === d.id;
        const x = dragging ? drag.x : at.x;
        const y = dragging ? drag.y : at.y;
        const n = tapped[d.id] ?? 0;
        return (
          <div
            key={d.id}
            data-sticker-id={d.id}
            role="img"
            aria-label={d.title[lang]}
            onPointerDown={(e) => down(e, d, at)}
            onPointerMove={move}
            onPointerUp={(e) => up(e, d, at)}
            onPointerCancel={() => setDrag(null)}
            className={`absolute w-[31%] cursor-grab touch-none active:cursor-grabbing ${dragging ? "z-20" : "z-10"}`}
            style={
              {
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                transform: `translate(-50%, -54%) rotate(${dragging ? 0 : (at.r ?? 0)}deg) scale(${dragging ? 1.12 : 1})`,
                transition: dragging ? "transform .15s" : "transform .3s cubic-bezier(.3,1.5,.5,1)",
              } as CSSProperties
            }
          >
            <div key={n} className={`relative ${n ? "sticker-wobble" : ""} ${dragging ? "sticker-lifted" : ""}`}>
              <Sticker id={d.id} color={d.color} size={100} style={{ width: "100%", height: "auto" }} />
              {n > 0 && (
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                  <span className="sticker-shine" />
                </span>
              )}
            </div>
          </div>
        );
      })}
      <p className="pointer-events-none absolute inset-x-0 bottom-2.5 text-center text-xs font-bold text-ink/30 tabular-nums">{page.index + 1}</p>
    </div>
  );
}

/** The back of the book, when a spread has only one album page left. */
function BackPage({ lang }: { lang: Lang }) {
  return (
    <div className="relative grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-[26px] bg-gold/90 shadow-[0_8px_0_var(--color-gold-deep),0_22px_40px_-18px_rgba(27,42,78,.45)]">
      <div className="pointer-events-none absolute inset-3 rounded-[20px] border-2 border-dashed border-white/50" />
      <div className="text-center">
        <div className="mx-auto w-fit animate-float">
          <Bee size={110} />
        </div>
        <p className={`mt-3 text-2xl font-black text-ink ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{lang === "am" ? "ላሊ" : "Lali"}</p>
      </div>
    </div>
  );
}

export function StickerAlbum({ stories, serverBasis, childName }: { stories: StickerStory[]; serverBasis: StickerBasis | null; childName: string | null }) {
  const lang = useLang();
  const t = dict[lang].stickers;
  // A signed-in child's record came with the page.
  useState(() => {
    adoptServerBasis(serverBasis);
    return 0;
  });
  // Empty while the server renders; the browser fills it in (useSyncExternalStore).
  const basis = useStickerBasis();
  const wide = useMedia("(min-width: 768px)");

  const catalog = useMemo(() => stickerCatalog(stories), [stories]);
  const pagesOf = useMemo(() => new Map(stories.map((s) => [s.id, s.pageCount])), [stories]);
  const earned = useMemo(() => earnedStickers(basis, (id) => pagesOf.get(id)), [basis, pagesOf]);

  const pages = useMemo(() => {
    const list: AlbumPage[] = [];
    for (const kind of [0, 1, 2]) {
      const items = catalog.filter((d) => d.album === kind);
      for (let i = 0; i < items.length; i += PER_PAGE) {
        list.push({ index: list.length, kind, title: t.pages[kind], hint: t.pageHints[kind], items: items.slice(i, i + PER_PAGE) });
      }
    }
    return list;
  }, [catalog, t]);

  const per = wide ? 2 : 1;
  const spreads = Math.ceil(pages.length / per);
  const [at, setAt] = useState(0);
  const [turn, setTurn] = useState<"next" | "prev" | null>(null);
  const spread = Math.min(at, spreads - 1);
  const go = useCallback(
    (to: number) => {
      if (to < 0 || to >= spreads || to === spread) return;
      setTurn(to > spread ? "next" : "prev");
      setAt(to);
      playTapSound("pop");
    },
    [spread, spreads],
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(spread + 1);
      if (e.key === "ArrowLeft") go(spread - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, spread]);

  const shown = pages.slice(spread * per, spread * per + per);
  const count = catalog.filter((d) => earned.has(d.id)).length;
  const font = lang === "am" ? "font-ethiopic" : "font-display";

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] bg-white p-4 shadow-[0_6px_0_var(--color-line)] sm:p-5">
        <div className="min-w-0 flex-1">
          {childName && <p className="text-sm font-bold uppercase tracking-[0.1em] text-teal">{t.forChild(childName)}</p>}
          <p className={`text-2xl font-black text-ink sm:text-3xl ${font}`} data-sticker-count={count}>
            {t.count(count, catalog.length)}
          </p>
          <div className="mt-2 h-3.5 w-full max-w-md overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#F5B21E,#E8513B)] transition-[width] duration-700" style={{ width: `${(count / Math.max(1, catalog.length)) * 100}%` }} />
          </div>
        </div>
        <Link href="/stories" className="btn btn-primary !text-base">
          {t.readStory}
        </Link>
      </div>

      <div className="relative">
        <div className={`mx-auto grid gap-4 sm:gap-6 ${wide ? "max-w-[960px] grid-cols-2" : "max-w-[460px] grid-cols-1"}`}>
          {shown.map((p) => (
            <AlbumSheet key={`${p.index}-${spread}`} page={p} earned={earned} positions={basis.positions} lang={lang} turn={turn} />
          ))}
          {wide && shown.length === 1 && <BackPage lang={lang} />}
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label={t.prevPage}
            onClick={() => go(spread - 1)}
            disabled={spread === 0}
            className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink shadow-[0_5px_0_rgba(27,42,78,.22)] transition hover:-translate-y-0.5 disabled:opacity-25"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-bold text-muted tabular-nums">{t.pageOf(spread + 1, spreads)}</span>
          <button
            type="button"
            aria-label={t.nextPage}
            data-album-next=""
            onClick={() => go(spread + 1)}
            disabled={spread >= spreads - 1}
            className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-[0_5px_0_var(--color-gold-deep)] transition hover:-translate-y-0.5 disabled:bg-white disabled:opacity-25"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <p className={`text-center text-muted ${lang === "am" ? "font-ethiopic" : ""}`}>{t.dragHint}</p>
      {!serverBasis && <p className={`text-center text-sm text-muted ${lang === "am" ? "font-ethiopic" : ""}`}>{t.keptHere}</p>}
    </div>
  );
}
