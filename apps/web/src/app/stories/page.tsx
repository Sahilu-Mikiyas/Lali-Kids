import type { Metadata } from "next";

import { BookCard } from "@/components/book-card";
import { Bee } from "@/components/characters";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { STORIES } from "@/content/stories";

export const metadata: Metadata = {
  title: "Story library",
  description: "Illustrated, read-aloud stories in English and Amharic for kids aged 3 to 9.",
};

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
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s, i) => (
            <BookCard key={s.id} story={s} index={i} />
          ))}
        </div>
        <div className="mt-4 h-4 rounded-md bg-gold shadow-[0_8px_0_var(--color-gold-deep)]" aria-hidden />
        <p className="mt-10 text-center text-muted">New stories arrive every week. The full library opens with a Reader plan.</p>
      </main>
      <SiteFooter />
    </>
  );
}
