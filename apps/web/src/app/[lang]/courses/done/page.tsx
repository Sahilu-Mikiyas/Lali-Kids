import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";

import { AutoRefresh } from "@/app/[lang]/subscribe/done/auto-refresh";
import { Bee } from "@/components/characters";
import { SiteNav } from "@/components/site-chrome";
import { courseById } from "@/lib/courses/catalog";
import { confirmCoursePurchase, type CourseConfirmation } from "@/lib/courses/checkout";
import { isCourseRef } from "@/lib/payments/refs";
import { currentProfile } from "@/lib/supabase/server";
import { getLang, getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Package payment", robots: { index: false } };

/**
 * Where Chapa sends the parent after buying a learning package. Only package references
 * (lali-course-…) are accepted here; plan payments have /subscribe/done and gifts /gift/done.
 * Confirms with Chapa before celebrating.
 */
async function Done({ searchParams }: PageProps<"/[lang]/courses/done">) {
  await connection();
  const { tx_ref, app } = await searchParams;
  const txRef = isCourseRef(tx_ref) ? tx_ref : null;
  const [profile, t, lang] = await Promise.all([currentProfile(), getT(), getLang()]);
  let r: CourseConfirmation = { outcome: "unknown", courseId: null, familyId: null };
  if (txRef) {
    try {
      r = await confirmCoursePurchase(txRef);
    } catch {
      r = { ...r, outcome: "pending" };
    }
  }
  // The package's name is shown only to the family that bought it.
  const course = r.familyId && profile?.id === r.familyId ? courseById(r.courseId) : null;
  const ok = r.outcome === "paid" || r.outcome === "already";
  return (
    <div className="w-full space-y-5 rounded-[32px] bg-white p-8 text-center shadow-[0_8px_0_var(--color-line)]" data-course-done={r.outcome}>
      <div className="mx-auto w-fit animate-float">
        <Bee size={72} />
      </div>
      {ok ? (
        <>
          <h1 className="font-display text-4xl font-black">{t.courses.boughtThanks}</h1>
          {course && <p className="text-lg">{t.courses.boughtSub(course.title[lang])}</p>}
          <div className="flex flex-wrap justify-center gap-3">
            {app === "1" && (
              <a href="lali://courses" className="btn btn-primary">
                {t.done.backToApp}
              </a>
            )}
            <Link href={course ? `/courses/${course.id}` : "/courses"} className="btn btn-primary" data-open-package="">
              {t.courses.openPackage}
            </Link>
          </div>
        </>
      ) : r.outcome === "pending" ? (
        <>
          <h1 className="font-display text-3xl font-black">{t.done.checking}</h1>
          <p className="text-muted">{t.done.checkingSub}</p>
          <AutoRefresh label={t.done.auto} />
          <Link href={`/courses/done?tx_ref=${txRef}`} className="btn btn-primary">
            {t.done.again}
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl font-black">{t.done.notFound}</h1>
          <p className="text-muted">{t.done.notFoundSub}</p>
          <Link href="/courses" className="btn btn-primary">
            {t.courses.back}
          </Link>
        </>
      )}
    </div>
  );
}

export default function CourseDonePage(props: PageProps<"/[lang]/courses/done">) {
  return (
    <>
      <SiteNav />
      <main className="mx-auto grid min-h-dvh max-w-lg place-items-center px-4 pt-24 sm:px-6">
        <Suspense fallback={<p className="text-muted">…</p>}>
          <Done {...props} />
        </Suspense>
      </main>
    </>
  );
}
