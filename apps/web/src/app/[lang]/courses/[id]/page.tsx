import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ChildChooser } from "@/components/child-chooser";
import { BuyCourse, StartCourse } from "@/components/courses/course-actions";
import { LevelMap, type MapLevel } from "@/components/courses/level-map";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { agesLabel, type AgeBand } from "@/content/stories";
import type { Course } from "@/content/courses/types";
import { ALL_COURSES, courseById, isReady, lessonKey, publicLesson } from "@/lib/courses/catalog";
import { courseView, type CourseView } from "@/lib/courses/server";
import { loadFamily, type Family } from "@/lib/family";
import { formatBirr } from "@/lib/payments/plans";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";
import type { Dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";

export function generateStaticParams() {
  return ALL_COURSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/courses/[id]">): Promise<Metadata> {
  const c = courseById((await params).id);
  return { title: c ? c.title.en : "Learning package", description: c?.outcome.en || undefined };
}

/** What the family can do with this package now: buy it, start it (VIP), or carry on. */
function Actions({ course: c, view, family, t, lang }: { course: Course; view: CourseView | null; family: Family | null; t: Dict; lang: UiLang }) {
  const note = (text: string, attr: string) => (
    <p className="rounded-[24px] bg-white p-4 font-bold shadow-[0_4px_0_var(--color-line)]" data-course-note={attr}>
      {text}
    </p>
  );
  if (!isReady(c)) return note(c.status === "live" ? t.courses.notReady : t.courses.soonNote, "not-ready");
  if (!family || !view) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/login?next=${encodeURIComponent(`/courses/${c.id}`)}`} className="btn btn-primary">
          {t.courses.signIn}
        </Link>
        <span className="text-muted">{t.courses.buyOrVip(formatBirr(c.priceEtb))}</span>
      </div>
    );
  }
  if (!view.on) return note(t.courses.errors.off, "off");
  if (view.access === "none") {
    return (
      <div className="space-y-3 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)]" data-course-buy="">
        <p className="text-lg">{t.courses.noAccess}</p>
        <div className="flex flex-wrap items-start gap-3">
          <BuyCourse courseId={c.id} priceEtb={c.priceEtb} />
          <Link href="/subscribe?plan=vip" className="btn btn-plain">
            👑 {t.courses.orVip}
          </Link>
        </div>
      </div>
    );
  }
  if (!view.child) return note(family.children.length ? t.courses.pickChild : t.courses.addChild, "no-child");
  if (view.state.completed) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-[28px] bg-[#FFF4D2] p-5 shadow-[0_6px_0_var(--color-line)]" data-course-complete="">
        <p className="flex-1 font-display text-2xl font-black">🏆 {t.courses.completedBy(view.child.name, fmtDate(lang, view.state.completedAt!))}</p>
        <Link href={`/courses/${c.id}/certificate`} className="btn btn-primary" data-certificate-link="">
          {t.courses.seeCertificate}
        </Link>
      </div>
    );
  }
  if (view.access === "vip" && !view.row) {
    if (view.activeOther) {
      const other = courseById(view.activeOther);
      return (
        <div className="space-y-3 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)]" data-one-at-a-time={view.activeOther}>
          <p className="text-lg font-bold">{t.courses.oneAtATime(view.child.name, other?.title[lang] ?? view.activeOther)}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/courses/${view.activeOther}`} className="btn btn-primary">
              {t.courses.continueOther(other?.title[lang] ?? view.activeOther)}
            </Link>
            <BuyCourse courseId={c.id} priceEtb={c.priceEtb} />
          </div>
          <p className="text-sm text-muted">{t.courses.buyToSkip}</p>
        </div>
      );
    }
    return (
      <div className="space-y-2 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)]" data-vip-start="">
        <StartCourse courseId={c.id} label={t.courses.startVip(view.child.name)} />
        <p className="text-sm text-muted">{t.courses.startHint}</p>
      </div>
    );
  }
  return view.paced ? note(t.courses.paceNote, "pace") : null;
}

async function CourseContent({ params }: PageProps<"/[lang]/courses/[id]">) {
  await connection();
  const { id } = await params;
  const course = courseById(id);
  if (!course) notFound();
  const [family, t, lang] = await Promise.all([loadFamily().catch(() => null), getT(), getLang()]);
  const view = family ? await courseView(family, course) : null;
  const state = view?.state;
  // Lessons and quizzes open from the map once the child is in the package (or it's bought: it starts by itself).
  const live = Boolean(view && view.ready && view.on && view.child && !view.state.completed && (view.row || view.access === "owned"));
  const playable = (s: string) => (live || Boolean(view?.state.completed)) && (s === "open" || s === "passed");
  const levels: MapLevel[] = course.levels.map((l, i) => {
    const st = state?.levels[i];
    const s = st?.state ?? (i === 0 ? "open" : "locked");
    return {
      id: l.id,
      title: l.title,
      goal: l.goal,
      state: view?.row || view?.access === "owned" ? s : i === 0 && view?.ready ? "open" : "locked",
      stars: st?.stars ?? 0,
      best: st?.best ?? null,
      lessons: l.lessons.map((x) => {
        const p = publicLesson(x);
        return { ...p, done: Boolean(st?.lessonsDone.includes(lessonKey(x))), href: playable(s) ? `/courses/${course.id}/lesson/${p.key}` : null };
      }),
      quizHref: playable(s) && l.quiz.questions.length ? `/courses/${course.id}/quiz/${l.quiz.id}` : null,
    };
  });
  const fs = state?.final.state ?? "locked";
  const final = { state: fs, stars: state?.final.stars ?? 0, best: state?.final.best ?? null, href: playable(fs) && course.finalTest.questions.length ? `/courses/${course.id}/quiz/${course.finalTest.id}` : null };
  const canRead = family?.children.filter((c) => !c.readOnly) ?? [];

  return (
    <div className="space-y-6" data-course={course.id} data-access={view?.access ?? "signed-out"}>
      <div className="relative overflow-hidden rounded-[36px] p-6 text-white shadow-[0_8px_0_rgba(27,42,78,.25)] sm:p-8" style={{ background: course.color }}>
        <svg viewBox="0 0 400 160" className="pointer-events-none absolute -right-10 -top-6 h-48 w-96 opacity-25" aria-hidden>
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={60 + k * 90} cy={k % 2 ? 110 : 70} r={26} fill="#fff" />
          ))}
        </svg>
        <p className="relative text-sm font-bold uppercase tracking-[0.14em] text-white/80">
          {t.courses.ages(agesLabel(course.ages as AgeBand[]))} · {course.levels.length ? t.courses.levels(course.levels.length) : t.courses.writing}
        </p>
        <h1 className={`relative mt-1 font-display text-4xl font-black sm:text-5xl ${lang === "am" ? "font-ethiopic" : ""}`}>{course.title[lang]}</h1>
        {course.tagline[lang] && <p className="relative mt-2 text-xl font-bold">{course.tagline[lang]}</p>}
        <div className="relative mt-4 max-w-2xl rounded-[20px] bg-white/15 p-4">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/80">{t.courses.outcomeTitle}</p>
          <p className="mt-1 text-lg">{course.outcome[lang] || t.courses.outcomeSoon}</p>
        </div>
        <p className="relative mt-4 font-display text-xl font-black">
          {view?.access === "owned" ? `✓ ${t.courses.owned}` : view?.access === "vip" ? `👑 ${t.courses.inVip}` : t.courses.price(formatBirr(course.priceEtb))}
        </p>
      </div>

      {family && canRead.length > 1 && <ChildChooser childList={family.children} currentId={family.current?.id ?? null} stars={family.current?.stars ?? 0} />}

      <Actions course={course} view={view} family={family} t={t} lang={lang} />

      {course.levels.length > 0 ? (
        <LevelMap
          color={course.color}
          levels={levels}
          final={final}
          opensAt={state?.opensAt ?? null}
          opensLabel={state?.opensAt ? t.courses.opensOn(fmtDate(lang, state.opensAt)) : null}
        />
      ) : (
        <div className="grid place-items-center gap-3 rounded-[32px] bg-white p-10 text-center shadow-[0_8px_0_var(--color-line)]" data-course-empty="">
          <p className="text-5xl" aria-hidden>
            🐝✏️
          </p>
          <p className="max-w-md text-lg">{t.courses.emptyMap}</p>
        </div>
      )}
    </div>
  );
}

export default function CoursePage(props: PageProps<"/[lang]/courses/[id]">) {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[32px] bg-white" />}>
          <BackLink />
          <CourseContent {...props} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

async function BackLink() {
  const t = await getT();
  return (
    <Link href="/courses" className="mb-4 inline-block font-bold text-blue hover:underline">
      {t.courses.back}
    </Link>
  );
}
