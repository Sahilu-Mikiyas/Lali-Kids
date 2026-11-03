import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { requireAdmin } from "@/lib/admin";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createStory } from "./actions";
import { Message, StoryFields } from "./fields";

export const metadata: Metadata = { title: "Story studio" };

async function StudioContent({ searchParams }: PageProps<"/[lang]/admin/stories">) {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const { message } = await searchParams;
  const { data: stories } = await createSupabaseAdmin()
    .from("stories")
    .select("id, slug, title_en, title_am, status, age_bands, category, is_free, story_pages(count)")
    .order("updated_at", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 pb-20 pt-32 sm:px-6">
      <div>
        <h1 className="font-display text-5xl font-black">Story studio</h1>
        <p className="mt-2 text-lg text-muted">
          Write a story in English and Amharic, add a picture and narration for each page, then publish it to the library. The
          three launch stories live in the website code and aren&rsquo;t listed here.
        </p>
      </div>
      <Message text={message} />

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-black">Stories</h2>
        {stories?.length ? (
          <ul className="divide-y-2 divide-line rounded-[28px] bg-white px-6 shadow-[0_6px_0_var(--color-line)]">
            {stories.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{s.title_en}</p>
                  <p className="text-sm text-muted">
                    {s.category} · ages {s.age_bands.join(", ")} · {(s.story_pages as unknown as { count: number }[])[0]?.count ?? 0} pages
                    {s.is_free ? " · free" : ""}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${s.status === "published" ? "bg-teal text-white" : "bg-line"}`}>
                  {s.status === "published" ? "Published" : "Draft"}
                </span>
                <Link href={`/admin/stories/${s.id}`} className="btn btn-plain !text-base">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No studio stories yet.</p>
        )}
      </section>

      <section className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]">
        <h2 className="font-display text-2xl font-black">New story</h2>
        <form action={createStory} className="space-y-4">
          <StoryFields />
          <button type="submit" className="btn btn-primary">
            Create and add pages
          </button>
        </form>
      </section>
    </main>
  );
}

export default function StudioPage(props: PageProps<"/[lang]/admin/stories">) {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
        <StudioContent {...props} />
      </Suspense>
    </>
  );
}
