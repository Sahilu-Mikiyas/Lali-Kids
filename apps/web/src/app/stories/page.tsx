import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { BookCard } from "@/components/book-card";
import { Bee } from "@/components/characters";
import { ChildChooser } from "@/components/child-chooser";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { AGE_BANDS, type AgeBand } from "@/content/stories";
import { limitReached, loadFamily } from "@/lib/family";
import { forAge, shelfStories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Story library",
  description: "Illustrated, read-aloud stories in English and Amharic for kids aged 3 to 9.",
};

const isBand = (v: unknown): v is AgeBand => typeof v === "string" && (AGE_BANDS as string[]).includes(v);

async function Shelf({ searchParams }: { searchParams: PageProps<"/stories">["searchParams"] }) {
  await connection();
  const [{ age }, family] = await Promise.all([searchParams, loadFamily()]);
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

  const childBand = isBand(family?.current?.age_band) ? family.current.age_band : null;
  // A child's shelf stays on their age group unless a grown-up allowed every age.
  const lockedToChild = Boolean(childBand && family && !family.showAllAges);
  const band: AgeBand | null = lockedToChild ? childBand : age === "all" ? null : isBand(age) ? age : childBand;
  const stories = forAge(await shelfStories(family?.profile.id ?? null), band);

  return (
    <>
      {family && <ChildChooser childList={family.children} currentId={family.current?.id ?? null} stars={family.current?.stars ?? 0} />}
      <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="Age group">
        {lockedToChild ? (
          <p className="rounded-full bg-white px-4 py-2 font-bold shadow-[0_3px_0_var(--color-line)]">
            Stories for ages {childBand} <span className="font-normal text-muted">· a grown-up can show every age in the Grown-ups&rsquo; corner</span>
          </p>
        ) : (
          [null, ...AGE_BANDS].map((b) => (
            <Link
              key={b ?? "all"}
              href={`/stories?age=${b ?? "all"}`}
              aria-current={band === b ? "page" : undefined}
              className={`rounded-full px-4 py-2 font-bold shadow-[0_3px_0_var(--color-line)] transition ${band === b ? "bg-ink text-white" : "bg-white hover:-translate-y-0.5"}`}
            >
              {b ? `Ages ${b}` : "All ages"}
            </Link>
          ))
        )}
      </nav>
      {stories.length ? (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <BookCard key={s.id} story={s} index={i} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-[28px] bg-white p-8 text-center text-lg text-muted">New stories for this age group are on their way.</p>
      )}
      <div className="mt-4 h-4 rounded-md bg-gold shadow-[0_8px_0_var(--color-gold-deep)]" aria-hidden />
    </>
  );
}

export default function StoriesPage({ searchParams }: PageProps<"/stories">) {
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
          <Shelf searchParams={searchParams} />
        </Suspense>
        <p className="mt-10 text-center text-muted">New stories arrive every week. The full library opens with a Reader plan.</p>
      </main>
      <SiteFooter />
    </>
  );
}
