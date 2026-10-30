import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { BookCard } from "@/components/book-card";
import { Bee } from "@/components/characters";
import { ChildChooser } from "@/components/child-chooser";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { STORIES } from "@/content/stories";
import { limitReached, loadFamily } from "@/lib/family";

export const metadata: Metadata = {
  title: "Story library",
  description: "Illustrated, read-aloud stories in English and Amharic for kids aged 3 to 9.",
};

async function Shelf() {
  const family = await loadFamily();
  if (limitReached(family)) {
    return (
      <div className="mx-auto mt-12 max-w-xl space-y-4 rounded-[32px] bg-night p-10 text-center text-white">
        <div className="mx-auto w-fit animate-float">
          <Bee size={80} />
        </div>
        <p className="font-display text-4xl font-black">That&rsquo;s all for tonight, {family?.current?.name}</p>
        <p className="text-lg text-white/80">Lali is going to sleep. Close your eyes and dream about the moon. See you tomorrow!</p>
        <p className="font-ethiopic text-xl text-gold">መልካም ሌሊት!</p>
        <Link href="/account" className="inline-block text-sm font-bold text-white/60 hover:text-white">
          Grown-ups: change the bedtime limit
        </Link>
      </div>
    );
  }
  return (
    <>
      {family && <ChildChooser childList={family.children} currentId={family.current?.id ?? null} stars={family.current?.stars ?? 0} />}
      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s, i) => (
          <BookCard key={s.id} story={s} index={i} />
        ))}
      </div>
      <div className="mt-4 h-4 rounded-md bg-gold shadow-[0_8px_0_var(--color-gold-deep)]" aria-hidden />
    </>
  );
}

export default function StoriesPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-display text-5xl font-black sm:text-6xl">The story library</h1>
            <p className="text-lg text-muted">
              Every book is illustrated and read aloud, with the words lighting up as they&rsquo;re read. Switch any story between
              English and Amharic. <span className="font-ethiopic">ተረቶችን በአማርኛና በእንግሊዝኛ ያንብቡ።</span>
            </p>
          </div>
          <div className="animate-float">
            <Bee size={84} />
          </div>
        </div>
        <Suspense fallback={<div className="mt-12 h-64 animate-pulse rounded-[32px] bg-white" />}>
          <Shelf />
        </Suspense>
        <p className="mt-10 text-center text-muted">New stories arrive every week. The full library opens with a Reader plan.</p>
      </main>
      <SiteFooter />
    </>
  );
}
