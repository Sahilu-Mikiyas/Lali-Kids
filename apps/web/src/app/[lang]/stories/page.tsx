import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { BookCard } from "@/components/book-card";
import { Bee } from "@/components/characters";
import { ChildChooser } from "@/components/child-chooser";
import { BookIcon } from "@/components/stickers/sticker-reward";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { AGE_BANDS, type AgeBand } from "@/content/stories";
import { limitReached, loadFamily } from "@/lib/family";
import { forAge, shelfStories } from "@/lib/stories";
import { getT } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Story library",
  description: "Illustrated, read-aloud stories in English and Amharic for kids aged 3 to 9.",
};

const isBand = (v: unknown): v is AgeBand => typeof v === "string" && (AGE_BANDS as string[]).includes(v);

async function Shelf({ searchParams }: { searchParams: PageProps<"/[lang]/stories">["searchParams"] }) {
  await connection();
  const [{ age }, family, t] = await Promise.all([searchParams, loadFamily(), getT()]);
  if (limitReached(family)) {
    return (
      <div className="mx-auto mt-12 max-w-xl space-y-4 rounded-[32px] bg-night p-10 text-center text-white">
        <div className="mx-auto w-fit animate-float">
          <Bee size={80} />
        </div>
        <p className="font-display text-4xl font-black">{t.shelf.goodnightTitle(family?.current?.name ?? "")}</p>
        <p className="text-lg text-white/80">{t.shelf.goodnightSub}</p>
        <p className="font-ethiopic text-xl text-gold">መልካም ሌሊት!</p>
        <Link href="/account" className="inline-block text-sm font-bold text-white/60 hover:text-white">
          {t.shelf.goodnightLimit}
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
      <div className="flex flex-wrap items-end gap-x-4">
        {family && (
          <div className="min-w-0 flex-1">
            <ChildChooser childList={family.children} currentId={family.current?.id ?? null} stars={family.current?.stars ?? 0} />
          </div>
        )}
        <Link
          href="/stickers"
          data-shelf-stickers=""
          className="mt-8 flex items-center gap-2 rounded-2xl bg-white py-2 pl-2 pr-4 font-display text-lg font-extrabold shadow-[0_4px_0_var(--color-line)] transition hover:-translate-y-0.5"
        >
          <BookIcon size={40} />
          {t.stickers.myBook}
        </Link>
      </div>
      <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="Age group">
        {lockedToChild ? (
          <p className="rounded-full bg-white px-4 py-2 font-bold shadow-[0_3px_0_var(--color-line)]">
            {t.shelf.forAges(childBand ?? "")} <span className="font-normal text-muted">· {t.shelf.lockedHint}</span>
          </p>
        ) : (
          [null, ...AGE_BANDS].map((b) => (
            <Link
              key={b ?? "all"}
              href={`/stories?age=${b ?? "all"}`}
              aria-current={band === b ? "page" : undefined}
              className={`rounded-full px-4 py-2 font-bold shadow-[0_3px_0_var(--color-line)] transition ${band === b ? "bg-ink text-white" : "bg-white hover:-translate-y-0.5"}`}
            >
              {b ? t.shelf.ages(b) : t.shelf.allAges}
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
        <p className="mt-10 rounded-[28px] bg-white p-8 text-center text-lg text-muted">{t.shelf.empty}</p>
      )}
      <div className="mt-4 h-4 rounded-md bg-gold shadow-[0_8px_0_var(--color-gold-deep)]" aria-hidden />
    </>
  );
}

export default async function StoriesPage({ searchParams }: PageProps<"/[lang]/stories">) {
  const t = await getT();
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-display text-5xl font-black sm:text-6xl">{t.shelf.title}</h1>
            <p className="text-lg text-muted">
              {t.shelf.sub}
            </p>
          </div>
          <div className="animate-float">
            <Bee size={84} />
          </div>
        </div>
        <Suspense fallback={<div className="mt-12 h-64 animate-pulse rounded-[32px] bg-white" />}>
          <Shelf searchParams={searchParams} />
        </Suspense>
        <p className="mt-10 text-center text-muted">{t.shelf.more}</p>
      </main>
      <SiteFooter />
    </>
  );
}
