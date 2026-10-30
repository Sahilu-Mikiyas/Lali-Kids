import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { signPage } from "@/lib/books/protect";
import { createSupabaseAdmin, createSupabaseServer, currentProfile } from "@/lib/supabase/server";
import { BookReader } from "./reader";

export async function generateMetadata({ params }: PageProps<"/library/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("books").select("title").eq("slug", slug).single();
  return { title: data?.title ?? "Book" };
}

async function BookPageContent({ params }: PageProps<"/library/[slug]">) {
  const { slug } = await params;
  const profile = await currentProfile();
  if (!profile) redirect(`/login?next=/library/${slug}`);

  const supabase = await createSupabaseServer();
  const { data: book } = await supabase
    .from("books")
    .select("id, title, title_am, author, page_count, is_free, book_pages(page_number, width, height)")
    .eq("slug", slug)
    .eq("status", "ready")
    .single();
  if (!book) notFound();

  if (!book.is_free) {
    const { data: allowed } = await createSupabaseAdmin().rpc("has_active_subscription", { family: profile.id });
    if (!allowed) redirect("/#plans");
  }

  // Tokens are minted here, on the server, for this family only.
  const pages = [...(book.book_pages as { page_number: number; width: number; height: number }[])]
    .sort((a, b) => a.page_number - b.page_number)
    .map((p) => ({ n: p.page_number, w: p.width, h: p.height, t: signPage(profile.id, book.id, p.page_number) }));

  return (
    <main className="min-h-dvh bg-night px-3 pb-10 pt-4 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 pb-4">
        <Link href="/library" className="font-bold text-white/70 hover:text-white">
          ← Library
        </Link>
        <p className="min-w-0 truncate text-center font-display text-lg font-extrabold">
          {book.title}
          {book.author && <span className="font-body font-normal text-white/60"> · {book.author}</span>}
        </p>
        <p className="text-sm text-white/60">{book.page_count} pages</p>
      </div>
      <BookReader bookId={book.id} pages={pages} />
    </main>
  );
}

export default function BookPage(props: PageProps<"/library/[slug]">) {
  return (
    <Suspense fallback={<main className="grid min-h-dvh place-items-center text-muted">Loading…</main>}>
      <BookPageContent {...props} />
    </Suspense>
  );
}
