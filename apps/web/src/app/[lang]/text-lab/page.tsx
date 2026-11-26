import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LAB_FONT_VARS } from "@/components/text-lab/fonts";
import { TextLab, type LabStyle } from "@/components/text-lab/text-lab";
import { getStory } from "@/content/stories";
import { isLang } from "@/i18n/langs";

/*
  The text lab: the same pages of a story drawn full-bleed the way the reader draws them, with
  the words set in a few different ways, for choosing how the reader's words should look.
  Off unless the server runs with LALI_TEXT_LAB=1, so it never exists on the live site.
  ?style=a|b|c|d &page=<index> &active=<word> &amf=noto|serif|abyssinica|menbere &shot=1 &ghost=1
  ?specimen=1 shows the candidate faces side by side.
*/
export default function TextLabPage(props: PageProps<"/[lang]/text-lab">) {
  return (
    <Suspense>
      <Lab {...props} />
    </Suspense>
  );
}

const STYLES: LabStyle[] = ["a", "b", "c", "d"];
const AM_FACES = ["noto", "serif", "abyssinica", "menbere"] as const;

async function Lab({ params, searchParams }: PageProps<"/[lang]/text-lab">) {
  const { lang } = await params;
  const q = await searchParams;
  // Checked per request (after the request's own data), so a production build made without the
  // flag still serves the lab when the server is started with it, and never otherwise.
  if (process.env.LALI_TEXT_LAB !== "1") notFound();
  const one = (k: string) => (Array.isArray(q[k]) ? q[k][0] : q[k]) ?? "";
  const story = getStory(one("story") || "new-year-flowers");
  if (!story || !story.scene || !isLang(lang)) notFound();
  const style = (STYLES as string[]).includes(one("style")) ? (one("style") as LabStyle) : "a";
  const page = Math.max(0, Math.min(story.pages.length - 1, Number(one("page") || 0) || 0));
  const amf = (AM_FACES as readonly string[]).includes(one("amf")) ? (one("amf") as (typeof AM_FACES)[number]) : null;
  const active = one("active") === "" ? -1 : Number(one("active"));
  return (
    <div className={LAB_FONT_VARS}>
      <TextLab
        story={story}
        page={page}
        lang={lang}
        style={style}
        amFace={amf}
        active={Number.isFinite(active) ? active : -1}
        shot={one("shot") === "1"}
        ghost={one("ghost") === "1"}
        specimen={one("specimen") === "1"}
      />
    </div>
  );
}
