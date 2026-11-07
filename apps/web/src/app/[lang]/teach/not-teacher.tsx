import Link from "next/link";

import { getT } from "@/i18n/server";

/** Shown to signed-in people who aren't (yet) a teacher at a school with a licence. */
export async function NotATeacher({ ready }: { ready: boolean }) {
  const t = await getT();
  return (
    <div className="mx-auto max-w-xl rounded-[28px] bg-white p-8 text-center shadow-[0_6px_0_var(--color-line)]" data-not-teacher="">
      <h1 className="font-display text-4xl font-black">{t.teach.title}</h1>
      <p className="mt-4 text-lg font-bold">{ready ? t.teach.notTeacher : t.teach.notReady}</p>
      {ready && <p className="mt-2 text-muted">{t.teach.notTeacherSub}</p>}
      <Link href="/account" className="btn btn-plain mt-6 !text-base">
        {t.nav.grownUps}
      </Link>
    </div>
  );
}
