import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { STORIES } from "@/content/stories";
import { requireAdmin } from "@/lib/admin";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { NarrationStudio, type StudioStory } from "./studio";

export const metadata: Metadata = { title: "Narration" };

/** Studio stories with their page text (launch stories come from the code). */
async function studioStories(): Promise<StudioStory[]> {
  if (!hasSecretKey()) return [];
  const { data, error } = await createSupabaseAdmin()
    .from("stories")
    .select("slug, title_en, title_am, is_free, status, story_pages(position, text_en, text_am)")
    .order("updated_at", { ascending: false });
  if (error) return [];
  type Row = { slug: string; title_en: string; title_am: string | null; is_free: boolean; status: string; story_pages: { position: number; text_en: string; text_am: string }[] };
  return ((data ?? []) as Row[]).map((r) => ({
    id: r.slug,
    title: { en: r.title_en, am: r.title_am || r.title_en },
    isFree: r.is_free,
    kind: r.status === "published" ? "studio" : "draft",
    pages: [...r.story_pages].sort((a, b) => a.position - b.position).map((p) => ({ en: p.text_en, am: p.text_am || p.text_en })),
  }));
}

async function NarrationContent({ searchParams }: PageProps<"/[lang]/admin/narration">) {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const { story } = await searchParams;
  const stories: StudioStory[] = [
    ...STORIES.map((s) => ({ id: s.id, title: s.title, isFree: s.isFree, kind: "launch" as const, pages: s.pages })),
    ...(await studioStories()),
  ];
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 pb-20 pt-32 sm:px-6">
      <div>
        <h1 className="font-display text-5xl font-black">Narration</h1>
        <p className="mt-2 text-lg text-muted">
          Recordings by our voice actors, page by page, in English and Amharic. Upload a clip for each page (MP3, M4A, WAV or WebM, up to
          15&nbsp;MB; nothing is converted), then time the words: play the clip and tap at the start of each word, so the words light up
          exactly as they&rsquo;re read. Works for the launch stories and for <Link href="/admin/stories" className="font-bold text-blue hover:underline">studio stories</Link>.
        </p>
      </div>
      <NarrationStudio stories={stories} initialStory={typeof story === "string" ? story : undefined} />
    </main>
  );
}

export default function NarrationPage(props: PageProps<"/[lang]/admin/narration">) {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
        <NarrationContent {...props} />
      </Suspense>
    </>
  );
}
