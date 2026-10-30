import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Bee } from "@/components/characters";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { createSupabaseAdmin, createSupabaseServer, currentProfile } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Your library" };

async function LibraryPageContent() {
  const profile = await currentProfile();
  if (!profile) redirect("/login?next=/library");

  const supabase = await createSupabaseServer();
  const [{ data: books }, { data: subscribed }] = await Promise.all([
    supabase.from("books").select("id, slug, title, title_am, author, page_count, is_free, category, age_band, cover_path").eq("status", "ready").order("created_at", { ascending: false }),
    createSupabaseAdmin().rpc("has_active_subscription", { family: profile.id }),
  ]);

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-display text-5xl font-black">Your library</h1>
            <p className="text-lg text-muted">
              {subscribed ? "Your plan is active. Every book is open." : "You're on the free shelf. Start a plan to open every book."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {profile.role === "admin" && (
              <Link href="/admin/books" className="btn btn-plain !text-base">
                Manage books
              </Link>
            )}
            <form action="/auth/signout" method="post">
              <button type="submit" className="font-bold text-muted hover:text-ink">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <h2 className="mt-12 font-display text-2xl font-black">Lali storybooks</h2>
        <p className="text-muted">
          Our own read-along stories.{" "}
          <Link href="/stories" className="font-bold text-coral">
            Open the storybook shelf →
          </Link>
        </p>

        <h2 className="mt-10 font-display text-2xl font-black">Picture books</h2>
        {books?.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((b) => {
              const locked = !b.is_free && !subscribed;
              return (
                <Link
                  key={b.id}
                  href={locked ? "/#plans" : `/library/${b.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] bg-sky-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element -- cover served by our own protected route */}
                    <img src={`/api/books/${b.id}/cover`} alt="" className="h-full w-full object-cover" draggable={false} />
                    {locked && <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-sm font-bold text-white">Plan needed</span>}
                    {b.is_free && <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 font-display text-sm font-black text-[#2A1A00]">Free</span>}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-lg font-extrabold leading-tight">{b.title}</p>
                    {b.title_am && <p className="font-ethiopic text-sm text-muted">{b.title_am}</p>}
                    <p className="mt-1 text-sm text-muted">
                      {b.page_count} pages · ages {b.age_band}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-white p-6 text-muted">
            <Bee size={48} /> Picture books are on their way. Read a Lali storybook in the meantime.
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <LibraryPageContent />
    </Suspense>
  );
}
