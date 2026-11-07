import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";
import { currentTeacher, licenceOpen, schoolsReady, seatsUsed, teacherClasses } from "@/lib/schools/server";
import { currentProfile } from "@/lib/supabase/server";
import { CreateClassForm } from "./forms";
import { NotATeacher } from "./not-teacher";

export const metadata: Metadata = { title: "Teacher's corner", robots: { index: false } };

async function TeachContent() {
  await connection();
  const profile = await currentProfile();
  if (!profile) redirect("/login?next=/teach");
  const [me, t, lang, ready] = await Promise.all([currentTeacher(), getT(), getLang(), schoolsReady()]);
  if (!me) return <NotATeacher ready={ready} />;
  const [classes, used] = await Promise.all([teacherClasses(me.profile.id), seatsUsed(me.school.id)]);
  const open = licenceOpen(me.school);
  return (
    <div className="space-y-10" data-teach={me.school.id}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-black">{t.teach.title}</h1>
          <p className="mt-2 text-xl font-bold">{me.school.name}</p>
          <p className={`mt-1 font-bold ${open ? "text-teal" : "text-coral-deep"}`}>
            {open ? t.teach.licenceUntil(fmtDate(lang, me.school.ends_on)) : t.teach.licenceEnded(fmtDate(lang, me.school.ends_on))} · {t.teach.seats(used, me.school.seats)}
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-3xl font-black">{t.teach.classes}</h2>
        {classes.length === 0 && <p className="text-lg text-muted">{t.teach.noClasses}</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((c) => (
            <Link key={c.id} href={`/teach/${c.id}`} className="block rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1" data-class={c.code}>
              <p className="font-display text-2xl font-black">{c.name}</p>
              <p className="text-muted">
                {t.teach.ages(c.age_band)} · {t.teach.pupilsCount(c.pupils)}
              </p>
              <p className="mt-3 inline-block rounded-xl bg-sky-soft px-3 py-1 font-mono text-lg font-black tracking-wider text-blue">{c.code}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <CreateClassForm />
        <div className="rounded-[28px] bg-gold/15 p-6">
          <p className="font-bold">{t.teach.privacy}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeachPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto min-h-dvh max-w-5xl px-4 pb-20 pt-32 sm:px-6">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[32px] bg-white" />}>
          <TeachContent />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
