import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { AnimalPicture, PupilAvatarBadge } from "@/components/schools/pictures";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getStory } from "@/content/stories";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";
import { canonicalOrigin } from "@/lib/origin";
import { classAssignments, classProgress, classPupilsForTeacher, classShelf, currentTeacher, schoolsReady, teacherClass } from "@/lib/schools/server";
import { ANIMALS } from "@/lib/schools/shared";
import { currentProfile } from "@/lib/supabase/server";
import { AddPupilForm, AssignButton, DeleteClassButton, PupilActions } from "../forms";
import { NotATeacher } from "../not-teacher";

export const metadata: Metadata = { title: "Class", robots: { index: false } };

async function ClassContent({ params }: PageProps<"/[lang]/teach/[classId]">) {
  await connection();
  const profile = await currentProfile();
  const { classId } = await params;
  if (!profile) redirect(`/login?next=/teach/${classId}`);
  const [me, t, lang] = await Promise.all([currentTeacher(), getT(), getLang()]);
  if (!me) return <NotATeacher ready={await schoolsReady()} />;
  const cls = await teacherClass(me.profile.id, classId);
  if (!cls) notFound();
  const [pupils, assignments] = await Promise.all([classPupilsForTeacher(cls.id), classAssignments(cls.id)]);
  const progress = await classProgress(pupils);
  const byPupil = new Map(progress.map((p) => [p.pupilId, p]));
  const assigned = assignments.map((a) => a.story_id);
  const shelf = classShelf(cls.age_band, assigned);
  const tabletUrl = `${canonicalOrigin().replace(/^https?:\/\//, "")}/class/${cls.code}`;
  const animal = (i: number) => t.classTablet.animals[ANIMALS[i]] ?? ANIMALS[i];

  return (
    <div className="space-y-10" data-teach-class={cls.code}>
      <div>
        <Link href="/teach" className="font-bold text-blue hover:underline print-hide">
          {t.teach.back}
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl font-black">{cls.name}</h1>
            <p className="mt-1 text-lg text-muted">
              {me.school.name} · {t.teach.ages(cls.age_band)} · {t.teach.pupilsCount(pupils.length)}
            </p>
          </div>
          <div className="rounded-[24px] bg-white px-5 py-3 text-center shadow-[0_6px_0_var(--color-line)]">
            <p className="text-sm font-bold uppercase tracking-wider text-muted">{t.teach.code}</p>
            <p className="font-mono text-3xl font-black tracking-wider text-blue" data-class-code={cls.code}>
              {cls.code}
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-sky-soft p-4 font-bold">
          {t.teach.tablet}: {t.teach.tabletSub(tabletUrl)}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-black">{t.teach.pupils}</h2>
        <p className="text-muted">{t.teach.pupilsSub}</p>
        {pupils.length === 0 ? (
          <p className="text-lg">{t.teach.noPupils}</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {pupils.map((p) => (
              <li key={p.id} className={`flex gap-4 rounded-[24px] bg-white p-4 shadow-[0_4px_0_var(--color-line)] ${p.locked_at ? "ring-4 ring-coral/40" : ""}`} data-teach-pupil={p.first_name}>
                <PupilAvatarBadge avatar={p.avatar} size={56} />
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="font-display text-2xl font-black">{p.first_name}</p>
                  <div className="flex items-center gap-1.5" aria-label={`${t.teach.picturePassword}: ${p.picture.map(animal).join(", ")}`} data-picture={p.picture.join(",")}>
                    <span className="mr-1 text-sm font-bold text-muted">{t.teach.picturePassword}</span>
                    {p.picture.map((a, i) => (
                      <span key={i} className="grid h-10 w-10 place-items-center rounded-xl bg-bg" title={animal(a)}>
                        <AnimalPicture animal={a} size={34} />
                      </span>
                    ))}
                  </div>
                  {p.locked_at && <p className="text-sm font-bold text-coral-deep">{t.teach.locked}</p>}
                  <PupilActions pupilId={p.id} name={p.first_name} locked={Boolean(p.locked_at)} />
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="print-hide max-w-xl">
          <AddPupilForm classId={cls.id} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-black">{t.teach.progress}</h2>
        <p className="text-muted">{t.teach.progressSub}</p>
        <div className="overflow-x-auto rounded-[24px] bg-white shadow-[0_4px_0_var(--color-line)]">
          <table className="w-full min-w-[520px] text-left" data-progress-table="">
            <thead className="bg-sky-soft text-sm uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">{t.teach.colPupil}</th>
                <th className="px-4 py-3">{t.teach.colFinished}</th>
                <th className="px-4 py-3">{t.teach.colStars}</th>
                <th className="px-4 py-3">{t.teach.colLast}</th>
              </tr>
            </thead>
            <tbody>
              {pupils.map((p) => {
                const r = byPupil.get(p.id);
                return (
                  <tr key={p.id} className="border-t border-line" data-progress-row={p.first_name}>
                    <td className="px-4 py-3 font-bold">{p.first_name}</td>
                    <td className="px-4 py-3 tabular-nums" data-finished={r?.finished ?? 0} title={(r?.stories ?? []).map((id) => getStory(id)?.title[lang] ?? id).join(", ")}>
                      {r?.finished ?? 0}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      <span className="text-gold">★</span> {r?.stars ?? 0}
                    </td>
                    <td className="px-4 py-3">{r?.lastActive ? fmtDate(lang, r.lastActive, "short") : t.teach.never}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-black">{t.teach.thisWeek}</h2>
        <p className="text-muted">{t.teach.thisWeekSub}</p>
        {assigned.length === 0 ? (
          <p className="text-lg">{t.teach.noneAssigned}</p>
        ) : (
          <ul className="flex flex-wrap gap-3" data-assigned-list="">
            {assigned.map((id) => {
              const s = getStory(id)!;
              return (
                <li key={id} className="flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-2 shadow-[0_3px_0_var(--color-line)]">
                  <span className="h-7 w-7 rounded-full" style={{ background: s.color }} aria-hidden />
                  <span className={`font-bold ${lang === "am" ? "font-ethiopic" : ""}`}>{s.title[lang]}</span>
                  <AssignButton classId={cls.id} storyId={id} assigned />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="space-y-4 print-hide">
        <h2 className="font-display text-3xl font-black">{t.teach.shelf}</h2>
        <p className="text-muted">{t.teach.shelfSub(shelf.length)}</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shelf.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-[20px] bg-white p-3 shadow-[0_3px_0_var(--color-line)]">
              <span className="h-10 w-10 shrink-0 rounded-xl" style={{ background: s.color }} aria-hidden />
              <span className={`min-w-0 flex-1 font-bold leading-tight ${lang === "am" ? "font-ethiopic" : ""}`}>{s.title[lang]}</span>
              <Link href={`/stories/${s.id}`} className="text-sm font-bold text-blue hover:underline">
                {t.teach.preview}
              </Link>
              <AssignButton classId={cls.id} storyId={s.id} assigned={assigned.includes(s.id)} />
            </li>
          ))}
        </ul>
      </section>

      <div className="print-hide">
        <DeleteClassButton classId={cls.id} />
      </div>
    </div>
  );
}

export default function TeachClassPage(props: PageProps<"/[lang]/teach/[classId]">) {
  return (
    <>
      <div className="print-hide">
        <SiteNav />
      </div>
      <main className="mx-auto min-h-dvh max-w-5xl px-4 pb-20 pt-32 sm:px-6">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[32px] bg-white" />}>
          <ClassContent {...props} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
