import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/site-chrome";
import { StoryBookWithProgress } from "@/components/storybook-with-progress";
import { getStory, STORIES } from "@/content/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[id]">): Promise<Metadata> {
  const story = getStory((await params).id);
  return story ? { title: story.title.en, description: story.pages[0].en } : {};
}

export default async function StoryPage({ params }: PageProps<"/stories/[id]">) {
  const story = getStory((await params).id);
  if (!story) notFound();

  return (
    <>
      <SiteNav />
      <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)] px-4 pb-20 pt-28 sm:px-6">
        <div className="mx-auto mb-8 flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/stories" className="font-bold text-muted hover:text-ink">
            ← All stories
          </Link>
          <p className="text-sm font-bold text-muted">Tip: use the arrow keys or swipe to turn pages</p>
        </div>
        <StoryBookWithProgress story={story} />
      </main>
    </>
  );
}
