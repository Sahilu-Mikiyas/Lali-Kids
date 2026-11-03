import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookCard } from "@/components/book-card";
import { SiteNav } from "@/components/site-chrome";
import { StoryBookWithProgress } from "@/components/storybook-with-progress";
import { getStory, STORIES, type Story } from "@/content/stories";
import { currentProfile } from "@/lib/supabase/server";
import { storyForReading } from "@/lib/stories";
import { getT } from "@/i18n/server";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/stories/[id]">): Promise<Metadata> {
  const story = getStory((await params).id);
  return story ? { title: story.title.en, description: story.pages[0].en } : { title: "Story" };
}

/** The book takes over the whole screen (its own close button leads back to the shelf). */
function Frame({ story }: { story: Story }) {
  return <StoryBookWithProgress story={story} />;
}

/** Stories made in the story studio: checked against the family's plan on every visit. */
async function StudioStory({ id }: { id: string }) {
  await connection();
  const profile = await currentProfile();
  const [access, t] = await Promise.all([storyForReading(id, profile?.id ?? null, profile?.role === "admin"), getT()]);
  if (!access) notFound();
  if ("story" in access) return <Frame story={access.story} />;
  return (
    <div className="mx-auto grid max-w-3xl items-center gap-8 md:grid-cols-2">
      <BookCard story={access.locked} />
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-black">{access.locked.title.en}</h1>
        <p className="text-lg text-muted">{t.shelf.lockedStory}</p>
        <Link href={profile ? "/subscribe?plan=reader" : `/login?next=${encodeURIComponent(`/stories/${id}`)}`} className="btn btn-primary">
          {profile ? t.shelf.seePlans : t.shelf.signIn}
        </Link>
      </div>
    </div>
  );
}

async function StoryContent({ params }: PageProps<"/[lang]/stories/[id]">) {
  const { id } = await params;
  const builtIn = getStory(id);
  return builtIn ? <Frame story={builtIn} /> : <StudioStory id={id} />;
}

export default function StoryPage(props: PageProps<"/[lang]/stories/[id]">) {
  return (
    <>
      <SiteNav />
      <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)] px-4 pb-20 pt-28 sm:px-6">
        <Suspense fallback={<div className="mx-auto h-96 max-w-6xl animate-pulse rounded-[32px] bg-white" />}>
          <StoryContent {...props} />
        </Suspense>
      </main>
    </>
  );
}
