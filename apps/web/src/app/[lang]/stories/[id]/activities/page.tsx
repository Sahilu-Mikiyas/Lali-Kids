import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ColouringPage, PrintButton } from "@/components/activities/colouring";
import { AnswerKeySheet, CertificateSheet, EnglishSheets, FidelSheet, GardenSheet, NumbersSheets, QuestionsSheet, Sheet, WordSearchSheet } from "@/components/activities/sheets";
import { PackIcon } from "@/components/packs/pack-icon";
import { LockedStory } from "@/components/packs/locked-story";
import { SiteNav } from "@/components/site-chrome";
import { getStory, type Story } from "@/content/stories";
import { recallQuestions, wordSearches } from "@/lib/activities";
import { packOf } from "@/lib/packs";
import { verifyReadPass } from "@/lib/read-pass";
import { storyForReading } from "@/lib/stories";
import { currentProfile } from "@/lib/supabase/server";
import { getLang, getT } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/stories/[id]/activities">): Promise<Metadata> {
  const story = getStory((await params).id);
  return { title: story ? `Printable activities: ${story.title.en}` : "Printable activities" };
}

/**
 * The picture that colours in best for each launch story (clear shapes, not too busy).
 * Other stories start on their cover; grown-ups can pick another with the arrows.
 */
const COLOURING_PAGE: Record<string, number> = {
  "new-year-flowers": 6,
  "lost-moon": 5,
  "gugu-counts": 12,
  "lali-shares": 11,
  "rainbow-puddle": 11,
  "fidel-train": 1,
  "first-day": 6,
  "coffee-mystery": 12,
  "lali-lalibela": 7,
};

function Pack({ story }: { story: Story }) {
  return <PackIcon pack={packOf(story)} size={36} />;
}

async function Activities({ params, searchParams }: PageProps<"/[lang]/stories/[id]/activities">) {
  await connection();
  const [{ id }, { pass }] = await Promise.all([params, searchParams]);
  const profile = await currentProfile();
  const familyId = profile?.id ?? verifyReadPass(typeof pass === "string" ? pass : undefined, id);
  const [access, t, lang] = await Promise.all([storyForReading(id, familyId, profile?.role === "admin"), getT(), getLang()]);
  if (!access) notFound();
  if (!("story" in access)) {
    return (
      <div className="px-4 pb-20 pt-28 sm:px-6">
        <LockedStory story={access.locked} planId={access.planId} signedIn={Boolean(profile)} next={`/stories/${id}/activities`} t={t} lang={lang} title={t.activities.lockedTitle} />
      </div>
    );
  }

  const story = access.story;
  const pack = packOf(story);
  const ws = wordSearches(story);
  const recall = recallQuestions(story);
  const start = Math.min(COLOURING_PAGE[story.id] ?? story.coverPage, story.pages.length - 1);
  const contents = [
    { id: "colouring", label: t.activities.colouring },
    { id: "words-en", label: t.activities.wordSearch },
    { id: "words-am", label: t.activities.wordSearchAm },
    ...(pack === "fidel" ? [{ id: "fidel", label: t.activities.fidel }] : []),
    ...(pack === "numbers" ? [{ id: "numbers", label: t.activities.numbers }] : []),
    ...(pack === "english" ? [{ id: "english", label: t.activities.english }] : []),
    ...(pack === "story" ? [{ id: "garden", label: t.activities.garden }] : []),
    { id: "questions", label: t.activities.questions },
    { id: "certificate", label: t.activities.certificate },
    { id: "answers", label: t.activities.answers },
  ];

  return (
    <div className="activities" data-activities={story.id} data-pack={pack}>
      <div className="print-hide mx-auto max-w-[210mm] px-4 pb-6 pt-28 sm:px-6">
        <Link href={`/stories/${story.id}`} className="font-bold text-blue hover:underline">
          {t.activities.back}
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Pack story={story} />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-4xl font-black leading-tight">{t.activities.title}</h1>
            <p className={`text-xl font-bold ${lang === "am" ? "font-ethiopic" : ""}`}>{story.title[lang]}</p>
          </div>
        </div>
        <p className="mt-3 text-lg text-muted">{t.activities.sub}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <PrintButton label={t.activities.print} />
          <p className="text-sm text-muted">
            {t.activities.tip} {t.activities.print1}
          </p>
        </div>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label={t.activities.contents}>
          {contents.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full bg-white px-3 py-1.5 text-sm font-bold shadow-[0_3px_0_var(--color-line)] hover:-translate-y-0.5">
              {c.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="print-sheets mx-auto flex max-w-[210mm] flex-col gap-6 px-4 pb-24 sm:px-6">
        <Sheet id="colouring" title={t.activities.colouring} sub={t.activities.colouringSub} t={t} lang={lang}>
          <ColouringPage scene={story.scene} pictures={story.pictures} pageCount={story.pages.length} start={start} />
          <p className={`mt-[1em] text-center text-[1.2em] font-bold ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{story.title[lang]}</p>
        </Sheet>
        <WordSearchSheet ws={ws.en} lang="en" title={`${t.activities.wordSearch} · English`} t={t} uiLang={lang} />
        <WordSearchSheet ws={ws.am} lang="am" title={`${t.activities.wordSearch} · አማርኛ`} t={t} uiLang={lang} />
        {pack === "fidel" && <FidelSheet story={story} t={t} lang={lang} />}
        {pack === "numbers" && <NumbersSheets story={story} t={t} lang={lang} />}
        {pack === "english" && <EnglishSheets story={story} t={t} lang={lang} />}
        {pack === "story" && <GardenSheet t={t} lang={lang} />}
        <QuestionsSheet story={story} recall={recall} t={t} lang={lang} />
        <CertificateSheet story={story} t={t} lang={lang} />
        <AnswerKeySheet ws={ws} t={t} uiLang={lang} />
      </div>
    </div>
  );
}

export default function ActivitiesPage(props: PageProps<"/[lang]/stories/[id]/activities">) {
  return (
    <>
      <div className="print-hide">
        <SiteNav />
      </div>
      <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)]">
        <Suspense fallback={<div className="mx-auto mt-28 h-96 max-w-3xl animate-pulse rounded-[32px] bg-white" />}>
          <Activities {...props} />
        </Suspense>
      </main>
    </>
  );
}
