import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { StickerAlbum } from "@/components/stickers/sticker-album";
import { loadFamily } from "@/lib/family";
import type { StickerBasis } from "@/lib/stickers/catalog";
import { loadStickerBasis, stickerCourses, stickerStories } from "@/lib/stickers/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getT } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Sticker book",
  description: "Every Lali story has a sticker to earn. Collect them, peel them and stick them in your sticker book.",
};

/** The album, for the child who's reading (signed in) or for this browser (signed out). */
async function Album() {
  await connection();
  const family = await loadFamily().catch(() => null);
  const stories = await stickerStories(family?.profile.id ?? null);
  let basis: StickerBasis | null = null;
  if (family?.current) basis = await loadStickerBasis(await createSupabaseServer(), family.current.id).catch(() => null);
  return <StickerAlbum stories={stories} serverBasis={basis} childName={basis ? (family?.current?.name ?? null) : null} courses={stickerCourses()} />;
}

export default async function StickersPage() {
  const t = await getT();
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-display text-5xl font-black sm:text-6xl">{t.stickers.title}</h1>
            <p className="text-lg text-muted">{t.stickers.sub}</p>
          </div>
          <div className="animate-float">
            <Bee size={84} />
          </div>
        </div>
        <Suspense fallback={<div className="mt-8 aspect-[3/2] animate-pulse rounded-[32px] bg-white" />}>
          <Album />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
