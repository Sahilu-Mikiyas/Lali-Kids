"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import type { Story } from "@/content/stories";
import { Scene } from "./scenes";

const TAG: Record<Story["category"], string> = {
  Bedtime: "bg-coral",
  Maths: "bg-blue",
  Values: "bg-berry",
  English: "bg-teal",
};

/** A book on the shelf that tilts toward the pointer and opens when tapped. */
export function BookCard({ story, index = 0 }: { story: Story; index?: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotY = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 220, damping: 18 });
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 220, damping: 18 });
  const glare = useTransform(mx, (x) => `radial-gradient(circle at ${20 + x * 60}% 20%, rgba(255,255,255,.35), transparent 45%)`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 140, damping: 16, delay: index * 0.08 }}
      className="[perspective:900px]"
    >
      <Link
        href={`/stories/${story.id}`}
        aria-label={`Read ${story.title.en}`}
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
          style={{ rotateX: rotX, rotateY: rotY, background: story.color }}
          className="relative overflow-hidden rounded-l-md rounded-r-[22px] shadow-[inset_12px_0_0_rgba(0,0,0,.18),inset_15px_0_0_rgba(255,255,255,.14),0_18px_30px_-12px_rgba(27,42,78,.5)] transition-shadow group-hover:shadow-[inset_12px_0_0_rgba(0,0,0,.18),inset_15px_0_0_rgba(255,255,255,.14),0_30px_45px_-15px_rgba(27,42,78,.6)]"
        >
          <div className="aspect-[4/3] pl-3">
            <Scene kind={story.scene} page={story.coverPage} />
          </div>
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
          <span className={`rounded-full px-2.5 py-0.5 text-xs text-white ${TAG[story.category]}`}>{story.category}</span>
          Ages {story.ages}
          <span className="ml-auto text-coral opacity-0 transition-opacity group-hover:opacity-100">Open →</span>
        </div>
      </Link>
    </motion.div>
  );
}
