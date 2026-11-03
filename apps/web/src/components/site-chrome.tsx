"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { LangSwitch } from "@/i18n/lang-switch";
import { useT } from "@/i18n/provider";
import { Bee } from "./characters";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const t = useT();
  const links = [
    { href: "/stories", label: t.nav.stories },
    { href: "/games", label: t.nav.games },
    { href: "/#worlds", label: t.nav.worlds },
    { href: "/account", label: t.nav.grownUps },
    { href: "/#plans", label: t.nav.plans },
  ];
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        solid ? "bg-white/85 shadow-[0_6px_30px_-12px_rgba(27,42,78,.25)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2" aria-label={t.nav.home}>
          <span className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
            <Bee size={40} />
          </span>
          <span className="font-display text-3xl font-black tracking-tight">Lali</span>
          <span className="font-ethiopic text-lg text-muted">ላሊ</span>
        </Link>
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-xl px-3 py-2 font-bold transition-colors hover:bg-white/70">
              {l.label}
            </Link>
          ))}
        </div>
        <LangSwitch className="ml-auto md:ml-0" />
        <Link href="/stories" className="btn btn-primary !px-4 !py-2.5 !text-base md:ml-2">
          {t.nav.start}
        </Link>
      </nav>
    </motion.header>
  );
}

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <Bee size={36} />
            <span className="font-display text-2xl font-black">Lali</span>
            <span className="font-ethiopic text-white/60">ላሊ</span>
          </div>
          <p className="max-w-sm">
            {t.footer.about}
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-display text-lg font-bold text-white">{t.footer.explore}</p>
          <Link href="/stories" className="block hover:text-white">{t.footer.library}</Link>
          <Link href="/games" className="block hover:text-white">{t.footer.games}</Link>
          <Link href="/#worlds" className="block hover:text-white">{t.footer.worlds}</Link>
          <Link href="/#watch" className="block hover:text-white">{t.footer.videos}</Link>
        </div>
        <div className="space-y-2">
          <p className="font-display text-lg font-bold text-white">{t.footer.grownUps}</p>
          <Link href="/#parents" className="block hover:text-white">{t.footer.why}</Link>
          <Link href="/#plans" className="block hover:text-white">{t.footer.plans}</Link>
          <Link href="/privacy" className="block hover:text-white">{t.footer.privacy}</Link>
          <Link href="/terms" className="block hover:text-white">{t.footer.terms}</Link>
          <p>{t.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}
