import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { PrintButton } from "@/app/[lang]/account/receipt/[ref]/print-button";
import { Bee, Cub, Gugu } from "@/components/characters";
import { courseById } from "@/lib/courses/catalog";
import { progressRows } from "@/lib/courses/server";
import { loadFamily } from "@/lib/family";
import { fmtDate } from "@/i18n/format";
import { getLang, getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Certificate", robots: { index: false } };

/** The printable certificate for a child who passed a package's final test. Only the family's own children. */
async function Certificate({ params, searchParams }: PageProps<"/[lang]/courses/[id]/certificate">) {
  await connection();
  const [{ id }, { child: wanted }] = await Promise.all([params, searchParams]);
  const course = courseById(id);
  if (!course) notFound();
  const family = await loadFamily().catch(() => null);
  if (!family) redirect(`/login?next=${encodeURIComponent(`/courses/${id}/certificate`)}`);
  const [t, lang] = await Promise.all([getT(), getLang()]);
  const child = family.children.find((c) => c.id === wanted) ?? family.current;
  const row = child ? (await progressRows([child.id])).find((r) => r.course_id === course.id) : null;
  if (!child || !row?.completed_at) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]" data-certificate-missing="">
        <p className="text-lg">{t.courses.noCertificate}</p>
        <Link href={`/courses/${course.id}`} className="btn btn-primary">
          {t.quiz.toMap}
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="course-certificate relative mx-auto aspect-[1.414] w-full max-w-4xl overflow-hidden rounded-[28px] bg-paper p-3 shadow-[0_10px_0_var(--color-line)] print:rounded-none print:shadow-none" data-certificate={course.id}>
        <div className="relative flex h-full flex-col items-center justify-center rounded-[22px] border-[6px] p-6 text-center sm:p-10" style={{ borderColor: course.color }}>
          <div className="pointer-events-none absolute inset-2 rounded-[16px] border-2 border-dashed" style={{ borderColor: course.color, opacity: 0.4 }} aria-hidden />
          <span className="absolute left-5 top-5 hidden sm:block" aria-hidden>
            <Cub size={70} />
          </span>
          <span className="absolute bottom-4 right-5 hidden sm:block" aria-hidden>
            <Gugu size={70} />
          </span>
          <span className="course-seal" aria-hidden>
            <Bee size={56} />
          </span>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-muted sm:text-sm">{t.courses.certTitle}</p>
          <p className="mt-3 text-base sm:text-lg">{t.courses.certLine}</p>
          <p className="my-2 font-display text-4xl font-black sm:text-6xl" style={{ color: course.color }} data-certificate-name="">
            {child.name}
          </p>
          <p className="text-base sm:text-lg">{t.courses.certDid}</p>
          <p className={`mt-2 font-display text-2xl font-black sm:text-4xl ${lang === "am" ? "font-ethiopic" : ""}`} data-certificate-course="">
            {course.title[lang]}
          </p>
          <p className="mt-3 text-sm text-muted sm:text-base">{t.courses.certDate(fmtDate(lang, row.completed_at))}</p>
          <p className="mt-4 font-ethiopic text-lg font-bold text-gold-deep">ጎበዝ! · {t.courses.certWellDone}</p>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-4xl rounded-2xl bg-white p-3 text-center font-bold shadow-[0_4px_0_var(--color-line)] print:hidden" data-course-sticker="">
        🌟 {t.courses.stickerEarned(course.title[lang])}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
        <PrintButton label={t.courses.print} />
        <Link href={`/courses/${course.id}`} className="btn btn-plain">
          {t.quiz.toMap}
        </Link>
        <Link href="/stickers" className="btn btn-plain">
          {t.stickers.myBook}
        </Link>
      </div>
    </>
  );
}

export default function CertificatePage(props: PageProps<"/[lang]/courses/[id]/certificate">) {
  return (
    <main className="min-h-dvh bg-bg px-4 py-10 sm:px-6 print:bg-white print:p-0">
      <Suspense fallback={<div className="mx-auto aspect-[1.414] max-w-4xl animate-pulse rounded-[28px] bg-white" />}>
        <Certificate {...props} />
      </Suspense>
    </main>
  );
}
