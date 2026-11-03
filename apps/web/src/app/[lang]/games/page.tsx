import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { ChildChooser } from "@/components/child-chooser";
import { GameCard } from "@/components/game-card";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { AGE_BANDS, type AgeBand } from "@/content/stories";
import { loadFamily } from "@/lib/family";
import { secondsPlayedToday, shelfGames } from "@/lib/games";
import { getT } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Games",
  description: "Short, clever games for kids aged 3 to 9, with a daily time limit set by grown-ups.",
};

const isBand = (v: unknown): v is AgeBand => typeof v === "string" && (AGE_BANDS as string[]).includes(v);

async function Arcade({ searchParams }: { searchParams: PageProps<"/[lang]/games">["searchParams"] }) {
  await connection();
  const [{ age }, family, t] = await Promise.all([searchParams, loadFamily(), getT()]);
  const child = family?.current ?? null;
  const childBand = isBand(child?.age_band) ? child.age_band : null;
  const lockedToChild = Boolean(childBand && family && !family.showAllAges);
  const band: AgeBand | null = lockedToChild ? childBand : age === "all" ? null : isBand(age) ? age : childBand;
  const [all, played] = await Promise.all([shelfGames(family?.profile.id ?? null), child ? secondsPlayedToday(child.id) : Promise.resolve(0)]);
  const games = band ? all.filter((g) => g.ageBands.includes(band)) : all;
  const minutesLeft = family && child ? Math.max(0, Math.ceil((family.gamesMinutes * 60 - played) / 60)) : null;

  return (
    <>
      {family && <ChildChooser childList={family.children} currentId={child?.id ?? null} stars={child?.stars ?? 0} />}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {lockedToChild ? (
          <p className="rounded-full bg-white px-4 py-2 font-bold shadow-[0_3px_0_var(--color-line)]">{t.games.forAges(childBand ?? "")}</p>
        ) : (
          [null, ...AGE_BANDS].map((b) => (
            <Link
              key={b ?? "all"}
              href={`/games?age=${b ?? "all"}`}
              aria-current={band === b ? "page" : undefined}
              className={`rounded-full px-4 py-2 font-bold shadow-[0_3px_0_var(--color-line)] transition ${band === b ? "bg-ink text-white" : "bg-white hover:-translate-y-0.5"}`}
            >
              {b ? t.shelf.ages(b) : t.shelf.allAges}
            </Link>
          ))
        )}
        {minutesLeft !== null && (
          <span className="ml-auto rounded-full bg-gold px-4 py-2 font-bold">
            {family?.gamesMinutes === 0 ? t.games.off : t.games.left(minutesLeft)}
          </span>
        )}
      </div>
      {games.length ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-[28px] bg-white p-8 text-center text-lg text-muted">{t.games.empty}</p>
      )}
    </>
  );
}

export default async function GamesPage({ searchParams }: PageProps<"/[lang]/games">) {
  const t = await getT();
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-display text-5xl font-black sm:text-6xl">{t.games.title}</h1>
            <p className="text-lg text-muted">
              {t.games.sub}
            </p>
          </div>
          <div className="animate-float">
            <Bee size={84} />
          </div>
        </div>
        <Suspense fallback={<div className="mt-12 h-64 animate-pulse rounded-[32px] bg-white" />}>
          <Arcade searchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
