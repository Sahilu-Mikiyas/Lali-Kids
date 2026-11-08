import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { gameBySlug } from "@/lib/games";
import { getT } from "@/i18n/server";
import { currentProfile } from "@/lib/supabase/server";
import { GamePlayer } from "../game-player";

export const metadata: Metadata = { title: "Play" };

async function GameContent({ params }: PageProps<"/[lang]/games/[slug]">) {
  await connection();
  const { slug } = await params;
  const profile = await currentProfile();
  const [game, t] = await Promise.all([gameBySlug(slug, profile?.id ?? null, profile?.role === "admin"), getT()]);
  if (!game) notFound();
  if (game.locked) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[32px] bg-white p-10 text-center shadow-[0_8px_0_var(--color-line)]">
        <h1 className="font-display text-4xl font-black">{game.title}</h1>
        <p className="text-lg text-muted">{t.games.lockedFamily}</p>
        <Link href={profile ? "/subscribe?plan=learner" : `/login?next=${encodeURIComponent(`/games/${slug}`)}`} className="btn btn-primary">
          {profile ? t.shelf.seePlans : t.shelf.signIn}
        </Link>
      </div>
    );
  }
  return <GamePlayer slug={game.slug} url={game.url} title={game.title} color={game.color} />;
}

export default async function GamePage(props: PageProps<"/[lang]/games/[slug]">) {
  const t = await getT();
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
        <Link href="/games" className="mb-6 inline-block font-bold text-muted hover:text-ink">
          {t.games.all}
        </Link>
        <Suspense fallback={<div className="aspect-video w-full animate-pulse rounded-[28px] bg-white" />}>
          <GameContent {...props} />
        </Suspense>
      </main>
    </>
  );
}
