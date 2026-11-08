import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { agesLabel, type AgeBand } from "@/content/stories";
import { CATALOGUE, courseCard, isReady } from "@/lib/courses/catalog";
import { ownedCourses, progressRows } from "@/lib/courses/server";
import { loadFamily } from "@/lib/family";
import { formatBirr } from "@/lib/payments/plans";
import { getLang, getT } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Learning packages",
  description: "Step-by-step learning packages for children aged 3 to 9: Fidel, numbers, values and more. Buy once and keep it, or get every package with VIP.",
};

/** The ten learning packages, with what each costs (or that VIP includes it) for this family. */
async function Catalogue() {
  await connection();
  const [family, t, lang] = await Promise.all([loadFamily().catch(() => null), getT(), getLang()]);
  const owned = family ? await ownedCourses(family.profile.id) : new Set<string>();
  const rows = family?.current ? await progressRows([family.current.id]) : [];
  const vip = Boolean(family?.entitlements.allCourses);
  const active = rows.find((r) => !r.completed_at && !owned.has(r.course_id));

  return (
    <>
      {family?.current && vip && (
        <p className="mt-6 rounded-[24px] bg-white p-4 font-bold shadow-[0_4px_0_var(--color-line)]" data-choosing-for={family.current.id}>
          👑 {t.courses.catalogueChild(family.current.name)}
        </p>
      )}
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-catalogue="">
        {CATALOGUE.map((c, i) => {
          const card = courseCard(c);
          const ready = isReady(c);
          const row = rows.find((r) => r.course_id === c.id);
          const status = owned.has(c.id) ? t.courses.owned : row?.completed_at ? t.courses.completed : row ? t.courses.inProgress : null;
          return (
            <li key={c.id} className="course-card-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <Link
                href={`/courses/${c.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_8px_0_var(--color-line)] transition hover:-translate-y-1"
                data-course-card={c.id}
                data-course-status={ready ? "live" : c.status === "live" ? "writing" : "soon"}
              >
                <div className="relative h-28 overflow-hidden" style={{ background: c.color }}>
                  <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                    {[0, 1, 2, 3, 4].map((k) => (
                      <circle key={k} cx={30 + k * 62} cy={k % 2 ? 78 : 58} r={18 - (k % 2) * 3} fill="#fff" opacity={0.22 + k * 0.08} />
                    ))}
                    <path d="M30 58 C60 100, 90 100, 92 78 S140 40, 154 58 S200 100, 216 78 S262 40, 278 58" fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" opacity={0.85} />
                  </svg>
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-ink">{t.courses.ages(agesLabel(c.ages as AgeBand[]))}</span>
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-sm font-bold ${ready ? "bg-ink text-white" : "bg-white/90 text-ink"}`}>
                    {ready ? t.courses.live : c.status === "live" ? t.courses.writing : t.courses.soon}
                  </span>
                  <span className="absolute bottom-2 right-5 transition-transform group-hover:-translate-y-1 group-hover:rotate-6" aria-hidden>
                    <Bee size={40} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h2 className={`font-display text-2xl font-black leading-tight ${lang === "am" ? "font-ethiopic" : ""}`}>{card.title[lang]}</h2>
                  {card.tagline[lang] && <p className="font-bold" style={{ color: c.color }}>{card.tagline[lang]}</p>}
                  <p className="flex-1 text-muted">{card.outcome[lang] || t.courses.outcomeSoon}</p>
                  {card.levels > 0 && <p className="text-sm font-bold text-muted">{t.courses.levels(card.levels)}</p>}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {status ? (
                      <span className="rounded-full bg-teal/15 px-3 py-1.5 font-bold text-teal">✓ {status}</span>
                    ) : vip ? (
                      <span className="rounded-full bg-gold/25 px-3 py-1.5 font-bold" data-in-vip="">
                        👑 {t.courses.inVip}
                      </span>
                    ) : (
                      <span className="rounded-full bg-sky-soft px-3 py-1.5 font-display text-lg font-black" data-price={c.priceEtb}>
                        {ready ? t.courses.buyFor(formatBirr(c.priceEtb)) : t.courses.price(formatBirr(c.priceEtb))}
                      </span>
                    )}
                    {vip && active?.course_id === c.id && <span className="text-sm font-bold text-muted">{t.courses.activeNow}</span>}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default async function CoursesPage() {
  const t = await getT();
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal">{t.courses.eyebrow}</p>
            <h1 className="font-display text-5xl font-black sm:text-6xl">{t.courses.title}</h1>
            <p className="text-lg text-muted">{t.courses.sub}</p>
          </div>
          <div className="animate-float">
            <Bee size={84} />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {t.courses.how.map((h, i) => (
            <p key={i} className="rounded-[24px] bg-white p-4 shadow-[0_4px_0_var(--color-line)]">
              <b className="block font-display text-lg">{h.title}</b>
              <span className="text-muted">{h.text}</span>
            </p>
          ))}
        </div>
        <Suspense fallback={<div className="mt-8 h-96 animate-pulse rounded-[32px] bg-white" />}>
          <Catalogue />
        </Suspense>
        <p className="mt-10 text-center">
          <Link href="/subscribe?plan=vip" className="btn btn-plain">
            👑 {t.courses.vipLink}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
