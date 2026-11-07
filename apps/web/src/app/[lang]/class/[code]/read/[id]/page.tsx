import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

import { getStory } from "@/content/stories";
import { currentPupil, onShelf } from "@/lib/schools/server";
import { cleanCode } from "@/lib/schools/shared";
import { ClassReader } from "./class-reader";

export const metadata: Metadata = { title: "Class reading", robots: { index: false } };

/**
 * A book on the class tablet. Only for the pupil signed in with their pictures, only for a class
 * whose school licence is open, and only for stories on that class's shelf.
 */
async function Reader({ params }: PageProps<"/[lang]/class/[code]/read/[id]">) {
  await connection();
  const { code: raw, id } = await params;
  const code = cleanCode(decodeURIComponent(raw));
  if (!code) redirect("/class");
  const me = await currentPupil();
  if (!me || me.cls.code !== code) redirect(`/class/${code}`);
  const story = getStory(id);
  if (!story || !onShelf(me.cls.age_band, me.assigned, id)) notFound();
  return <ClassReader story={story} code={code} name={me.pupil.first_name} />;
}

export default function ClassReaderPage(props: PageProps<"/[lang]/class/[code]/read/[id]">) {
  return (
    <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,var(--color-sky-soft),var(--color-bg)_60%)]">
      <Suspense fallback={<div className="mx-auto mt-28 h-96 max-w-6xl animate-pulse rounded-[32px] bg-white" />}>
        <Reader {...props} />
      </Suspense>
    </main>
  );
}
