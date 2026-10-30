"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PageInfo = { n: number; w: number; h: number; t: string };

/**
 * Draws book pages on a canvas. Pages arrive one at a time from our own
 * endpoint, already watermarked for this family, and are never exposed as
 * image files: no "save image", no printing, no text to copy.
 */
export function BookReader({ bookId, pages }: { bookId: string; pages: PageInfo[] }) {
  const [index, setIndex] = useState(0);
  // Which page is drawn and what went wrong, keyed by page so a turn resets them without an effect.
  const [drawn, setDrawn] = useState<{ n: number; error?: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cache = useRef(new Map<number, ImageBitmap>());
  const page = pages[index];

  const fetchPage = useCallback(
    async (p: PageInfo): Promise<ImageBitmap> => {
      const hit = cache.current.get(p.n);
      if (hit) return hit;
      const res = await fetch(`/api/books/${bookId}/pages/${p.n}?t=${encodeURIComponent(p.t)}`, { cache: "no-store", credentials: "same-origin" });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Could not load page ${p.n}`);
      }
      const bmp = await createImageBitmap(await res.blob());
      cache.current.set(p.n, bmp);
      // Keep only a few pages in memory.
      for (const k of [...cache.current.keys()]) if (Math.abs(k - p.n) > 2) {
        cache.current.get(k)?.close();
        cache.current.delete(k);
      }
      return bmp;
    },
    [bookId],
  );

  useEffect(() => {
    if (!page) return;
    let cancelled = false;
    fetchPage(page)
      .then((bmp) => {
        if (cancelled) return;
        const canvas = canvasRef.current!;
        canvas.width = bmp.width;
        canvas.height = bmp.height;
        canvas.getContext("2d")!.drawImage(bmp, 0, 0);
        setDrawn({ n: page.n });
        // Warm the next page.
        const next = pages[index + 1];
        if (next) fetchPage(next).catch(() => {});
      })
      .catch((e: Error) => {
        if (!cancelled) setDrawn({ n: page.n, error: e.message });
      });
    return () => {
      cancelled = true;
    };
  }, [page, index, pages, fetchPage]);

  // Arrow keys turn pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, pages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  // Print shows a blank page; the stylesheet below hides the canvas.
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "@media print { .lali-reader { display: none !important } body::after { content: 'Lali books cannot be printed.' } }";
    document.head.append(style);
    return () => style.remove();
  }, []);

  if (!page) return <p className="text-center text-white/70">This book has no pages yet.</p>;

  return (
    <div className="lali-reader mx-auto max-w-6xl select-none" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
      <div className="relative mx-auto overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]" style={{ maxWidth: "min(100%, calc((100dvh - 150px) * " + page.w / page.h + "))" }}>
        <canvas ref={canvasRef} className="block h-auto w-full" style={{ aspectRatio: `${page.w} / ${page.h}` }} aria-label={`Page ${page.n}`} />
        {(drawn?.n !== page.n || drawn.error) && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 text-ink">
            {drawn?.n === page.n && drawn.error ? (
              <span className="max-w-xs text-center font-bold text-coral">{drawn.error}</span>
            ) : (
              <span className="font-display text-xl font-extrabold">Turning the page…</span>
            )}
          </div>
        )}
        {/* Invisible layer over the canvas, so long-press and drag have nothing to grab. */}
        <div className="absolute inset-0" aria-hidden />
      </div>

      <div className="mx-auto mt-5 flex max-w-xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="btn btn-plain !text-base disabled:opacity-30"
          aria-label="Previous page"
        >
          ← Back
        </button>
        <span className="font-display text-lg font-extrabold tabular-nums">
          {page.n} / {pages.length}
        </span>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(i + 1, pages.length - 1))}
          disabled={index === pages.length - 1}
          className="btn btn-primary !text-base disabled:opacity-30"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
