import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Bee } from "@/components/characters";
import { getT } from "@/i18n/server";
import { cleanCode } from "@/lib/schools/shared";

export const metadata: Metadata = { title: "Class reading", robots: { index: false } };

/** Typing the class code once on a classroom tablet: /class?code=… goes to /class/<code>. */
async function CodeForm({ searchParams }: PageProps<"/[lang]/class">) {
  const [{ code }, t] = await Promise.all([searchParams, getT()]);
  const c = cleanCode(code);
  if (c) redirect(`/class/${c}`);
  return (
    <form action="/class" method="get" className="mx-auto mt-6 flex max-w-md flex-col gap-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
      <label htmlFor="class-code" className="font-bold">
        {t.classTablet.enterCode}
      </label>
      <input
        id="class-code"
        name="code"
        required
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
        placeholder={t.classTablet.codeHint}
        className="rounded-2xl border-2 border-line px-4 py-3 font-display text-2xl font-black uppercase tracking-wider"
      />
      {typeof code === "string" && code && <p className="font-bold text-coral-deep">{t.classTablet.notFound}</p>}
      <button type="submit" className="btn btn-primary">
        {t.classTablet.go}
      </button>
    </form>
  );
}

export default async function ClassCodePage(props: PageProps<"/[lang]/class">) {
  const t = await getT();
  return (
    <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)] px-4 pb-16 pt-16 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Bee size={72} />
        <h1 className="font-display text-4xl font-black">{t.classTablet.codeTitle}</h1>
      </div>
      <Suspense fallback={<div className="mx-auto mt-6 h-56 max-w-md animate-pulse rounded-[28px] bg-white" />}>
        <CodeForm {...props} />
      </Suspense>
    </main>
  );
}
