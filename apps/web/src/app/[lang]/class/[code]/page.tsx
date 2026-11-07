import type { Metadata } from "next";
import { headers } from "next/headers";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { PageArt } from "@/components/book/page-art";
import { PupilAvatarBadge } from "@/components/schools/pictures";
import type { Story } from "@/content/stories";
import { getLang, getT } from "@/i18n/server";
import { allow, clientIp } from "@/lib/rate-limit";
import { classByCode, classShelf, currentPupil, pupilBasis, tabletPupils } from "@/lib/schools/server";
import { cleanCode } from "@/lib/schools/shared";
import { ClassTablet, FinishedButton } from "./tablet";

export const metadata: Metadata = { title: "Class reading", robots: { index: false } };

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-lg rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]">
      <p className="text-xl font-bold">{children}</p>
      <Link href="/class" className="btn btn-plain mt-6 !text-base">
        ←
      </Link>
    </div>
  );
}

/** A shelf card for the class tablet: the cover picture and title only (no story text). */
function ShelfCard({ story, href, lang }: { story: Story; href: string; lang: "en" | "am" }) {
  const cover: Story = { ...story, pages: story.pages.map(() => ({ en: "", am: "" })), grownUps: undefined, teaches: undefined, lali: undefined };
  return (
    // A plain link: each book opens with a fresh page load (see the reader).
    <a href={href} className="group block overflow-hidden rounded-[24px] bg-white shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1" data-shelf-story={story.id}>
      <div className="aspect-[4/3]" style={{ background: story.color }}>
        <PageArt story={cover} page={story.coverPage} />
      </div>
      <p className={`px-4 py-3 text-lg font-black leading-tight ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{story.title[lang]}</p>
    </a>
  );
}

async function ClassContent({ params }: PageProps<"/[lang]/class/[code]">) {
  await connection();
  const [{ code: raw }, t, lang] = await Promise.all([params, getT(), getLang()]);
  const code = cleanCode(decodeURIComponent(raw));
  const found = code ? await classByCode(code).catch(() => null) : null;
  if (!code || !found) {
    // Class codes are short, so wrong ones are limited per address: nobody can list the classes.
    const ip = clientIp(await headers()) ?? "unknown";
    return <Note>{allow(`class-miss:${ip}`, 12, 10 * 60_000) ? t.classTablet.notFound : t.classTablet.tooMany}</Note>;
  }
  if (!found.open) return <Note>{t.classTablet.closed}</Note>;

  const me = await currentPupil();
  if (!me || me.cls.id !== found.cls.id) {
    const pupils = await tabletPupils(found.cls.id);
    return (
      <>
        <p className="mb-4 text-center font-bold text-muted" data-class-name={found.cls.name}>
          {found.cls.name}
        </p>
        <ClassTablet code={code} pupils={pupils} />
      </>
    );
  }

  const [{ stars }] = await Promise.all([pupilBasis(me.pupil.id)]);
  const shelf = classShelf(me.cls.age_band, me.assigned);
  const week = shelf.filter((s) => me.assigned.includes(s.id));
  const rest = shelf.filter((s) => !me.assigned.includes(s.id));
  const href = (id: string) => `/class/${code}/read/${id}`;
  return (
    <div data-pupil-shelf={me.pupil.id}>
      <div className="flex flex-wrap items-center gap-4 rounded-[28px] bg-white p-4 shadow-[0_6px_0_var(--color-line)]">
        <PupilAvatarBadge avatar={me.pupil.avatar} size={64} />
        <div className="min-w-[11rem] flex-1">
          <p className="font-display text-3xl font-black">{t.classTablet.hello(me.pupil.first_name)}</p>
          <p className="font-bold text-muted">
            {found.cls.name} · <span className="text-gold">★</span> {stars}
          </p>
        </div>
        <FinishedButton code={code} />
      </div>
      {week.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-3xl font-black">{t.classTablet.thisWeek}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {week.map((s) => (
              <ShelfCard key={s.id} story={s} href={href(s.id)} lang={lang} />
            ))}
          </div>
        </section>
      )}
      <section className="mt-10">
        <h2 className="font-display text-3xl font-black">{t.classTablet.shelf}</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {rest.map((s) => (
            <ShelfCard key={s.id} story={s} href={href(s.id)} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}

/** The class tablet: /class/LALI-KG2-7Q4 (docs/SCHOOLS.md). */
export default function ClassPage(props: PageProps<"/[lang]/class/[code]">) {
  return (
    <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)] px-4 pb-16 pt-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Suspense fallback={<div className="mx-auto h-96 max-w-3xl animate-pulse rounded-[32px] bg-white" />}>
          <ClassContent {...props} />
        </Suspense>
      </div>
    </main>
  );
}
