import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";

import { BookCard } from "@/components/book-card";
import { PackIcon, PACK_COLOR } from "@/components/packs/pack-icon";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { Sticker } from "@/components/stickers/sticker";
import { agesLabel, AGE_BANDS, type AgeBand } from "@/content/stories";
import { FIDEL_CHART, fidelFamily, geez } from "@/lib/activities";
import { familyCourses, type ChildCourse } from "@/lib/courses/server";
import { fmtDate } from "@/i18n/format";
import { loadFamily } from "@/lib/family";
import { packOf } from "@/lib/packs";
import { monthGrid, progressMap, suggestNext } from "@/lib/progress-map";
import { addisDay, storyStickerId } from "@/lib/stickers/catalog";
import { loadStickerBasis, stickerStories, summarise } from "@/lib/stickers/server";
import { shelfStories } from "@/lib/stories";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getLang, getT } from "@/i18n/server";
import { Avatar } from "../../controls";

export const metadata: Metadata = { title: "Reading map" };

const isBand = (v: unknown): v is AgeBand => typeof v === "string" && (AGE_BANDS as string[]).includes(v);

function Card({ title, sub, children, className = "", id }: { title: string; sub?: string; children: ReactNode; className?: string; id?: string }) {
  return (
    <section className={`rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)] sm:p-6 ${className}`} data-progress={id}>
      <h2 className="font-display text-2xl font-black">{title}</h2>
      {sub && <p className="mt-1 text-muted">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({ value, label, sub, colour }: { value: ReactNode; label: string; sub?: string; colour: string }) {
  return (
    <div className="rounded-[24px] p-4 text-white shadow-[0_5px_0_rgba(27,42,78,.18)]" style={{ background: colour }}>
      <p className="font-display text-4xl font-black tabular-nums leading-none">{value}</p>
      <p className="mt-1 font-bold leading-tight">{label}</p>
      {sub && <p className="mt-0.5 text-sm text-white/80">{sub}</p>}
    </div>
  );
}

async function ProgressContent({ params }: PageProps<"/[lang]/account/progress/[childId]">) {
  await connection();
  const [{ childId }, family, t, lang] = await Promise.all([params, loadFamily(), getT(), getLang()]);
  if (!family) redirect(`/login?next=${encodeURIComponent(`/account/progress/${childId}`)}`);
  // Only the family's own children: the list comes from their own account (row-level security too).
  const child = family.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]" data-progress-missing="">
        <p className="text-lg">{t.progress.notFound}</p>
        <Link href="/account" className="btn btn-plain">
          {t.progress.back}
        </Link>
      </div>
    );
  }

  // The progress map comes with Family and VIP (src/lib/entitlements.ts).
  if (!family.entitlements.progressMap) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]" data-progress-locked="">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sky-soft">
          <Avatar kind={child.avatar} size={64} />
        </div>
        <h1 className="font-display text-3xl font-black">{t.progress.title(child.name)}</h1>
        <p className="text-lg">{t.gates.progressMap(t.plans.names.learner)}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/subscribe?plan=learner" className="btn btn-primary">
            {t.gates.upgrade(t.plans.names.learner)}
          </Link>
          <Link href="/account" className="btn btn-plain">
            {t.progress.back}
          </Link>
        </div>
      </div>
    );
  }

  const supabase = await createSupabaseServer();
  const courseList = (await familyCourses(family).catch(() => ({}) as Record<string, ChildCourse[]>))[child.id] ?? [];
  const [basis, stories, shelf] = await Promise.all([loadStickerBasis(supabase, child.id), stickerStories(family.profile.id), shelfStories(family.profile.id)]);
  const pages = new Map(stories.map((s) => [s.id, s.pageCount]));
  const map = progressMap(basis, (id) => pages.get(id));
  const stickers = summarise(stories, basis);
  const titles = new Map(stories.map((s) => [s.id, s]));
  const band = isBand(child.age_band) ? child.age_band : null;
  const next = suggestNext(shelf, map.finished, band);

  const today = addisDay(new Date().toISOString());
  const [year, month] = today.split("-").map(Number);
  const weeks = monthGrid(year, month);
  const daysThisMonth = [...map.days].filter((d) => d.startsWith(today.slice(0, 7))).length;
  const monthName = new Date(Date.UTC(year, month - 1, 15)).toLocaleDateString(lang === "am" ? "am-ET" : "en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  const half = Math.ceil(FIDEL_CHART.length / 2);

  return (
    <div className="space-y-6" data-progress-child={child.id}>
      <div>
        <Link href="/account" className="font-bold text-blue hover:underline">
          {t.progress.back}
        </Link>
        <div className="mt-4 flex items-center gap-4">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white shadow-[0_5px_0_var(--color-line)]">
            <Avatar kind={child.avatar} size={64} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl">{t.progress.title(child.name)}</h1>
            <p className="mt-1 text-lg text-muted">{t.progress.sub}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat value={map.finished.length} label={t.progress.finished} colour="#2F5BD3" />
        <Stat value={map.readAloudBooks} label={t.progress.readAloud} sub={t.progress.readAloudSub(map.readAloudPages)} colour="#1E9E5A" />
        <Stat value={t.progress.stickersOf(stickers.count, stickers.total)} label={t.progress.stickers} colour="#D63B72" />
      </div>

      {courseList.length > 0 && (
        <Card title={t.courses.progressTitle} sub={t.courses.progressSub} id="courses">
          <ul className="grid gap-3 sm:grid-cols-2">
            {courseList.map((c) => (
              <li key={c.courseId} className="rounded-2xl border-2 border-line p-4" data-progress-course={c.courseId}>
                <p className="flex items-center gap-2 font-display text-xl font-black">
                  <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                  {c.title[lang]}
                </p>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-line" aria-hidden>
                  <div className="h-full rounded-full" style={{ width: `${c.completedAt ? 100 : c.levels ? Math.round((c.level / (c.levels + 1)) * 100) : 0}%`, background: c.color }} />
                </div>
                <p className="mt-2 text-sm text-muted">{c.completedAt ? t.courses.completedOn(fmtDate(lang, c.completedAt)) : t.courses.levelOf(Math.min(c.level + 1, c.levels), c.levels)}</p>
                {c.scores.length > 0 && <p className="mt-1 text-sm">{c.scores.map((s) => t.courses.scoreLine(s.label === "final" ? t.courses.finalShort : t.courses.levelShort(Number(s.label)), s.score, s.total)).join(" · ")}</p>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {next ? (
        <section className="grid items-center gap-6 rounded-[28px] bg-ink p-5 text-white shadow-[0_6px_0_#0d1530] sm:grid-cols-[minmax(0,240px)_1fr] sm:p-6" data-progress-next={next.id}>
          <BookCard story={next} menu={false} />
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold">{t.progress.suggestion}</p>
            <p className="font-display text-3xl font-black leading-tight">{t.progress.nextTry(next.title[lang])}</p>
            <p className="flex items-center gap-2 text-white/80">
              <PackIcon pack={packOf(next)} size={28} />
              {t.progress.nextWhy(t.packs.names[packOf(next)], agesLabel(next.ageBands))}
            </p>
            <Link href={`/stories/${next.id}`} className="btn btn-primary">
              {t.progress.readIt}
            </Link>
          </div>
        </section>
      ) : (
        <p className="rounded-[28px] bg-white p-6 text-center text-lg font-bold shadow-[0_6px_0_var(--color-line)]">{t.progress.allRead}</p>
      )}

      <Card id="fidel" title={t.progress.fidel} sub={map.fidel.size ? t.progress.fidelSub : t.progress.fidelNone}>
        <div className="grid gap-x-6 gap-y-1 lg:grid-cols-2" data-fidel-chart="">
          {[FIDEL_CHART.slice(0, half), FIDEL_CHART.slice(half)].map((col, ci) => (
            <div key={ci} className="space-y-1">
              {col.map((base) => {
                const met = map.fidel.has(base);
                return (
                  <div key={base} className={`grid grid-cols-7 gap-1 rounded-xl p-0.5 ${met ? "progress-lit bg-gold" : ""}`} data-fidel-row={base} data-met={met || undefined}>
                    {fidelFamily(base).map((f) => (
                      <span
                        key={f}
                        className={`grid aspect-square place-items-center rounded-lg font-ethiopic text-lg sm:text-xl ${met ? "bg-white font-bold text-ink" : "bg-sky-soft/60 text-muted/60"}`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card id="numbers" title={t.progress.numbers} sub={t.progress.numbersSub}>
          <div className="grid grid-cols-5 gap-2" data-numbers="">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n, i) => {
              const met = map.numbers.has(n);
              return (
                <span
                  key={n}
                  className={`grid aspect-square place-items-center rounded-2xl text-center leading-none ${met ? "progress-lit progress-pop bg-gold text-[#2A1A00]" : "bg-sky-soft/60 text-muted/60"}`}
                  style={met ? { animationDelay: `${i * 0.05}s, ${i * 0.05}s` } : undefined}
                  data-number={n}
                  data-met={met || undefined}
                >
                  <span>
                    <span className="block font-display text-2xl font-black">{n}</span>
                    <span className="block font-ethiopic text-lg">{geez(n)}</span>
                  </span>
                </span>
              );
            })}
          </div>
        </Card>

        <Card id="words" title={t.progress.words} sub={map.words.length ? undefined : t.progress.wordsNone}>
          <div className="flex flex-wrap gap-2" data-words="">
            {map.words.map((w, i) => (
              <span key={w} className="progress-pop rounded-full px-3 py-1.5 font-display text-lg font-extrabold text-white shadow-[0_3px_0_rgba(27,42,78,.2)]" style={{ background: PACK_COLOR.english, animationDelay: `${i * 0.04}s` }}>
                {w}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card id="books" title={t.progress.finishedList}>
          {map.finished.length ? (
            <ul className="flex flex-wrap gap-3" data-books="">
              {map.finished.map((id) => {
                const s = titles.get(id);
                if (!s) return null;
                return (
                  <li key={id} className="flex w-full items-center gap-3 rounded-2xl bg-sky-soft/50 p-2 pr-3 sm:w-[calc(50%-0.375rem)]">
                    <Sticker id={storyStickerId(id)} color={s.color} size={52} />
                    <span className={`min-w-0 text-sm font-bold leading-tight ${lang === "am" ? "font-ethiopic" : ""}`}>{s.title[lang]}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-muted">{t.progress.noBooks}</p>
          )}
        </Card>

        <Card id="days" title={t.progress.days} sub={t.progress.daysSub(daysThisMonth)}>
          <p className="mb-2 font-bold">{monthName}</p>
          <div className="grid grid-cols-7 gap-1.5 text-center" data-calendar="">
            {t.progress.weekdays.map((d, i) => (
              <span key={i} className="text-xs font-bold text-muted">
                {d}
              </span>
            ))}
            {weeks.flat().map((day, i) => {
              if (!day) return <span key={i} />;
              const read = map.days.has(day);
              const isToday = day === today;
              return (
                <span key={day} className={`grid aspect-square place-items-center rounded-full text-sm ${isToday ? "ring-2 ring-blue" : ""}`} data-day={day} data-read={read || undefined}>
                  {read ? (
                    <span className="progress-pop grid h-[78%] w-[78%] place-items-center rounded-full bg-teal font-bold text-white shadow-[0_2px_0_var(--color-teal-deep)]">{Number(day.slice(8))}</span>
                  ) : (
                    <span className="text-muted/70">{Number(day.slice(8))}</span>
                  )}
                </span>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function ProgressPage(props: PageProps<"/[lang]/account/progress/[childId]">) {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 pb-10 pt-32 sm:px-6">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[32px] bg-white" />}>
          <ProgressContent {...props} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
