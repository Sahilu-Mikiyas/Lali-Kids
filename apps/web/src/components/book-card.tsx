"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { useLang, useT } from "@/i18n/provider";
import type { Story } from "@/content/stories";
import { agesLabel } from "@/lib/ages";
import { packOf, planForPack } from "@/lib/packs";
import { PackIcon } from "./packs/pack-icon";
import { PageArt } from "./book/page-art";

const TAG: Record<Story["category"], string> = {
  Bedtime: "bg-coral",
  Maths: "bg-blue",
  Values: "bg-berry",
  English: "bg-teal",
  Fidel: "bg-gold-deep",
};

/** A book on the shelf that tilts toward the pointer and opens when tapped. */
export function BookCard({ story, index = 0, href, menu = true }: { story: Story; index?: number; href?: string; menu?: boolean }) {
  const t = useT();
  const am = useLang() === "am";
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotY = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 220, damping: 18 });
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 220, damping: 18 });
  const glare = useTransform(mx, (x) => `radial-gradient(circle at ${20 + x * 60}% 20%, rgba(255,255,255,.35), transparent 45%)`);
  const pack = packOf(story);
  const opensWith = t.plans.names[planForPack(pack)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 140, damping: 16, delay: index * 0.08 }}
      className="relative [perspective:900px] focus-within:z-30"
    >
      <Link
        // A locked story's page says which pack it's in and which plan opens it.
        href={href ?? `/stories/${story.id}`}
        aria-label={story.locked ? t.packs.openWith(story.title.en, opensWith) : `Read ${story.title.en}`}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="group block"
      >
        <motion.div
          // Tapping a book gives it a little squeeze, as if it is about to open.
          whileTap={{ scale: 0.95, rotateY: -10 }}
          style={{ rotateX: rotX, rotateY: rotY, background: story.color, transformOrigin: "0% 50%" }}
          className="relative overflow-hidden rounded-l-md rounded-r-[22px] shadow-[inset_12px_0_0_rgba(0,0,0,.18),inset_15px_0_0_rgba(255,255,255,.14),0_18px_30px_-12px_rgba(27,42,78,.5)] transition-shadow group-hover:shadow-[inset_12px_0_0_rgba(0,0,0,.18),inset_15px_0_0_rgba(255,255,255,.14),0_30px_45px_-15px_rgba(27,42,78,.6)]"
        >
          <div className="aspect-[4/3] pl-3">
            <PageArt story={story} page={story.coverPage} />
          </div>
          {story.locked && (
            <span className="absolute left-6 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-ink shadow" data-card-lock={planForPack(pack)}>
              {t.packs.lockedChip(opensWith)}
            </span>
          )}
          <div className="space-y-0.5 py-4 pl-6 pr-4 text-white">
            <h3 className="font-display text-xl font-extrabold leading-tight">{story.title.en}</h3>
            <p className="font-ethiopic text-sm text-white/85">{story.title.am}</p>
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
            style={{ background: glare }}
          />
        </motion.div>
        <div className="mt-3 flex items-center gap-2 text-sm font-bold text-muted">
          <PackIcon pack={pack} size={22} />
          <span className={`rounded-full px-2.5 py-0.5 text-xs text-white ${TAG[story.category]}`}>{story.category}</span>
          {t.shelf.ages(agesLabel(story.ageBands))}
          <span className="ml-auto text-coral opacity-0 transition-opacity group-hover:opacity-100">{story.locked ? (am ? "ክፈት →" : "Unlock →") : am ? "አንብብ →" : "Open →"}</span>
        </div>
      </Link>
      {menu && <CardMenu storyId={story.id} />}
    </motion.div>
  );
}

/** The ⋯ button on a shelf card: read the story, or open its printable activities. */
function CardMenu({ storyId }: { storyId: string }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <div ref={ref} className="absolute right-3 top-3 z-10">
      <button
        type="button"
        aria-label={t.packs.menu}
        aria-expanded={open}
        aria-controls={id}
        data-card-menu=""
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow transition hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <circle cx={5} cy={12} r={2.2} fill="currentColor" />
          <circle cx={12} cy={12} r={2.2} fill="currentColor" />
          <circle cx={19} cy={12} r={2.2} fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div id={id} role="menu" className="pack-pop absolute right-0 top-11 w-56 overflow-hidden rounded-2xl bg-white p-1.5 text-ink shadow-[0_14px_30px_-10px_rgba(27,42,78,.45)]">
          <Link role="menuitem" href={`/stories/${storyId}`} className="block rounded-xl px-3 py-2.5 font-bold hover:bg-sky-soft">
            📖 {t.packs.read}
          </Link>
          <Link role="menuitem" href={`/stories/${storyId}/activities`} className="block rounded-xl px-3 py-2.5 font-bold hover:bg-sky-soft" data-card-activities="">
            🖍️ {t.packs.activities}
          </Link>
        </div>
      )}
    </div>
  );
}
