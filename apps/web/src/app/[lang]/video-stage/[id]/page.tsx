import { notFound } from "next/navigation";
import { Suspense } from "react";

import { VideoStage, type StageSegment } from "@/components/video/stage";
import { getStory } from "@/content/stories";
import { isLang } from "@/i18n/langs";
import { captionLines, END_CARD } from "../../../../../video/segments";

/*
  One segment of a story video, for the recorder (apps/web/video/record.mjs). Off unless the
  server runs with LALI_VIDEO_STAGE=1, so it never exists on the live site.
  ?seg=intro | end | <page index>
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
