import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { SiteNav } from "@/components/site-chrome";
import { createSupabaseAdmin, currentProfile } from "@/lib/supabase/server";
import { UploadForm } from "./upload-form";
import { setBookStatus } from "./actions";

export const metadata: Metadata = { title: "Books admin" };

async function AdminBooksPageContent() {
  const profile = await currentProfile();
  if (!profile) redirect("/login?next=/admin/books");
  if (profile.role !== "admin") redirect("/library");

  const { data: books } = await createSupabaseAdmin()
    .from("books")
    .select("id, slug, title, page_count, status, is_free, category, age_band, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 pt-28 sm:px-6">
        <h1 className="font-display text-4xl font-black">Books</h1>
        <p className="mt-2 text-muted">Upload a PDF. Lali turns it into protected pages; the PDF itself is never served.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <UploadForm />
          <div className="space-y-3">
            {(books ?? []).map((b) => (
              <div key={b.id} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_0_var(--color-line)]">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{b.title}</p>
                  <p className="text-sm text-muted">
                    {b.page_count} pages · {b.category} · ages {b.age_band} · {b.is_free ? "free" : "paid"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    b.status === "ready" ? "bg-teal/15 text-teal" : b.status === "failed" ? "bg-coral/15 text-coral" : "bg-line text-muted"
                  }`}
                >
                  {b.status}
                </span>
                {(b.status === "ready" || b.status === "hidden") && (
                  <form action={setBookStatus.bind(null, b.id, b.status === "ready" ? "hidden" : "ready")}>
                    <button type="submit" className="btn btn-plain !px-3 !py-1.5 !text-sm">
                      {b.status === "ready" ? "Hide" : "Show"}
                    </button>
                  </form>
                )}
              </div>
            ))}
            {!books?.length && <p className="text-muted">No books yet.</p>}
          </div>
        </div>
      </main>
    </>
  );
}

export default function AdminBooksPage() {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <AdminBooksPageContent />
    </Suspense>
  );
}
