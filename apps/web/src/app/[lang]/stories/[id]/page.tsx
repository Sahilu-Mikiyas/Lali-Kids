import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LockedStory } from "@/components/packs/locked-story";
import { SiteNav } from "@/components/site-chrome";
import { StoryBookWithProgress } from "@/components/storybook-with-progress";
import { getStory, STORIES, type Story } from "@/content/stories";
import { currentProfile } from "@/lib/supabase/server";
import { verifyReadPass } from "@/lib/read-pass";
import { storyForReading } from "@/lib/stories";
import { getLang, getT } from "@/i18n/server";
import { fillName } from "@/lib/story-path";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/stories/[id]">): Promise<Metadata> {
  const story = getStory((await params).id);
  return story ? { title: story.title.en, description: story.isFree ? fillName(story.pages[0].en, null, "en") : undefined } : { title: "Story" };
}

/** The book takes over the whole screen (its own close button leads back to the shelf). */
function Frame({ story }: { story: Story }) {
  return <StoryBookWithProgress story={story} />;
}

/** Stories made in the story studio: checked against the family's plan on every visit. */
async function StudioStory({ id, pass }: { id: string; pass?: string }) {
  await connection();
  const profile = await currentProfile();
  // Inside the Lali app there's no website session; the app sends a read pass instead.
  const familyId = profile?.id ?? verifyReadPass(pass, id);
  const [access, t, lang] = await Promise.all([storyForReading(id, familyId, profile?.role === "admin"), getT(), getLang()]);
  if (!access) notFound();
  if ("story" in access) return <Frame story={access.story} />;
  return <LockedStory story={access.locked} planId={access.planId} signedIn={Boolean(profile)} next={`/stories/${id}`} t={t} lang={lang} />;
}

async function StoryContent({ params, searchParams }: PageProps<"/[lang]/stories/[id]">) {
  const { id } = await params;
  const builtIn = getStory(id);
  // Free launch stories are static pages; paid ones are checked against the plan on every visit.
  if (builtIn?.isFree) return <Frame story={builtIn} />;
  const { pass } = await searchParams;
  return <StudioStory id={id} pass={typeof pass === "string" ? pass : undefined} />;
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
