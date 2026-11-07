"use client";

import { motion } from "motion/react";

import { BeeShape, CubShape, GuguShape } from "../characters";
import { GiftBoxShape, LetterShape, TibebBand } from "./art";

/**
 * The top of the gift page: a highland morning. Lali the bee flies in from far away with a
 * letter, over the hills to Anbessa and Gugu, who are waiting by a big present.
 */
export function GiftHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#86d3ff_0%,#bfe8ff_55%,#fff1cf_100%)] pt-28">
      {/* sun and clouds */}
      <div aria-hidden className="gift-sun absolute right-[8%] top-24 h-24 w-24 rounded-full bg-[radial-gradient(circle,#FFE27A_0%,#FFC83D_60%,rgba(255,200,61,0)_72%)] sm:h-36 sm:w-36" />
      <div aria-hidden className="gift-cloud absolute left-[6%] top-32 h-10 w-36 rounded-full bg-white/80 shadow-[30px_-14px_0_6px_rgba(255,255,255,.8)]" />
      <div aria-hidden className="gift-cloud absolute right-[30%] top-44 hidden h-8 w-28 rounded-full bg-white/70 shadow-[24px_-10px_0_4px_rgba(255,255,255,.7)] [animation-delay:-9s] sm:block" />

      <div className="relative mx-auto grid max-w-6xl items-end gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} className="relative z-10 pb-6 lg:pb-24">
          <p className="inline-block rotate-[-2deg] rounded-full bg-white px-4 py-1.5 font-display font-black text-berry shadow-[0_4px_0_var(--color-line)]">🎁 {eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.6rem)] font-black leading-[1.02] text-ink">{title}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink/80 sm:text-xl">{sub}</p>
        </motion.div>

        <div aria-hidden className="relative mx-auto h-[250px] w-full max-w-[460px] sm:h-[330px]">
          {/* the dotted flight path from far away */}
          <svg viewBox="0 0 460 330" className="absolute inset-0 h-full w-full overflow-visible">
            <path className="gift-path" d="M-40 40 C 80 -10, 170 120, 250 70 S 360 40, 330 150" fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
          </svg>
          <div className="gift-fly absolute left-[52%] top-[6%] w-[70px] sm:w-[88px]">
            <svg viewBox="0 0 60 60" className="w-full overflow-visible">
              <g transform="translate(14 34) rotate(-8)">
                <LetterShape />
              </g>
              <path d="M30 24 L30 36" stroke="#1B2A4E" strokeWidth={1.6} />
              <g transform="translate(10 -4)">
                <BeeShape />
              </g>
            </svg>
          </div>
          {/* hills */}
          <svg viewBox="0 0 460 120" preserveAspectRatio="none" className="absolute inset-x-[-20%] bottom-0 h-[38%] w-[140%]">
            <path d="M0 70 Q90 20 200 54 T460 40 V120 H0Z" fill="#86D696" />
            <path d="M0 92 Q120 56 240 84 T460 74 V120 H0Z" fill="#4DBA74" />
          </svg>
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute bottom-[10%] left-[34%] w-[38%]"
            initial={{ scale: 0.4, y: 40, rotate: -12 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 10, delay: 0.25 }}
          >
            <g className="gift-bounce">
              <GiftBoxShape />
            </g>
          </motion.svg>
          <motion.svg viewBox="0 0 200 240" className="absolute bottom-[6%] left-[2%] w-[34%]" initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}>
            <CubShape pose="sit" mood="joy" />
          </motion.svg>
          <motion.svg viewBox="0 0 200 240" className="absolute bottom-[6%] right-[0%] w-[32%]" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}>
            <GuguShape pose="wave" mood="joy" />
          </motion.svg>
          <span className="gift-heart absolute bottom-[52%] left-[30%] text-2xl">💛</span>
          <span className="gift-heart absolute bottom-[58%] right-[26%] text-xl [animation-delay:-1.4s]">💚</span>
          <span className="gift-heart absolute bottom-[46%] right-[40%] text-lg [animation-delay:-2.6s]">❤️</span>
        </div>
      </div>
      <TibebBand height={18} className="relative" />
    </section>
  );
}
