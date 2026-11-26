import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PromoStage } from "@/components/video/promo";
import { VideoStage, type StageSegment } from "@/components/video/stage";
import { getStory, STORIES, type Story } from "@/content/stories";
import { dict } from "@/i18n/dict";
import { isLang } from "@/i18n/langs";
import { captionLines, END_CARD, PROMO_BEATS, PROMO_PAGES, type PromoBeat } from "../../../../../video/segments";

/*
  One segment of a story video, for the recorder (apps/web/video/record.mjs). Off unless the
  server runs with LALI_VIDEO_STAGE=1, so it never exists on the live site.
  ?seg=intro | end | <page index>, or a beat of the vertical promo: promo-hook | promo-pages |
  promo-values | promo-proof | promo-end (1080x1920, video/promo-plan.mjs).
*/
export default function VideoStagePage(props: PageProps<"/[lang]/video-stage/[id]">) {
  if (process.env.LALI_VIDEO_STAGE !== "1") notFound();
  return (
    <Suspense>
      <Segment {...props} />
    </Suspense>
  );
}

async function Segment({ params, searchParams }: PageProps<"/[lang]/video-stage/[id]">) {
  const { lang, id } = await params;
  const story = getStory(id);
  if (!story || !story.scene || !isLang(lang)) notFound();
  const seg = String((await searchParams).seg ?? "0");
  if (seg.startsWith("promo-")) {
    const beat = seg.slice(6) as PromoBeat;
    if (!PROMO_BEATS.includes(beat)) notFound();
    // Only what the picture needs: no story's text goes to the page but the promo's own pages.
    const bare = (s: Story): Story => ({ id: s.id, title: s.title, category: s.category, ageBands: s.ageBands, color: s.color, scene: s.scene, coverPage: s.coverPage, isFree: s.isFree, pages: [] });
    const covers = STORIES.filter((s) => s.scene && s.id !== story.id).slice(0, 24).map(bare);
    const { hook, values, contrast, cta } = dict[lang].home.try.pitch;
    return (
      <PromoStage
        beat={beat}
        lang={lang}
        copy={{ hook, values, contrast, cta }}
        story={bare(story)}
        pageCount={story.pages.length}
        pages={PROMO_PAGES.map((n) => story.pages[n][lang])}
        // (both languages of those pages: their English says who the characters are, for their colours)
        both={PROMO_PAGES.map((n) => ({ en: story.pages[n].en, am: story.pages[n].am }))}
        covers={covers}
      />
    );
  }
  const end = END_CARD[lang];
  let segment: StageSegment;
  if (seg === "intro") {
    segment = { kind: "intro", title: story.title[lang], scene: story.scene, coverPage: story.coverPage ?? 0, tagline: end.tagline };
  } else if (seg === "end") {
    segment = { kind: "end", title: end.title, lines: end.lines, url: end.url };
  } else {
    const page = Number(seg);
    const text = story.pages[page]?.[lang];
    if (text === undefined) notFound();
    segment = { kind: "page", scene: story.scene, page, lines: captionLines(text, lang === "am" ? 34 : 50) };
  }
  return <VideoStage segment={segment} lang={lang} />;
}
