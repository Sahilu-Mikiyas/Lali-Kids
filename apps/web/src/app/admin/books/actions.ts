"use server";

import { revalidatePath } from "next/cache";

import { processBook, SOURCES_BUCKET } from "@/lib/books/process";
import { createSupabaseAdmin, currentProfile } from "@/lib/supabase/server";

export type UploadResult = { ok: true; title: string; pageCount: number } | { ok: false; error: string };

function slugify(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "book";
}

/** Admins only: stores the PDF privately, renders its pages, and lists the book. */
export async function uploadBook(_prev: UploadResult | null, form: FormData): Promise<UploadResult> {
  const profile = await currentProfile();
  if (!profile || profile.role !== "admin") return { ok: false, error: "Only Lali admins can upload books." };

  const file = form.get("pdf");
  const title = String(form.get("title") ?? "").trim();
  if (!(file instanceof File) || file.type !== "application/pdf") return { ok: false, error: "Choose a PDF file." };
  if (!title) return { ok: false, error: "Give the book a title." };
  if (file.size > 100 * 1024 * 1024) return { ok: false, error: "PDFs must be under 100 MB." };

  const admin = createSupabaseAdmin();
  const { data: book, error } = await admin
    .from("books")
    .insert({
      slug: `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`,
      title,
      title_am: String(form.get("title_am") ?? "").trim() || null,
      author: String(form.get("author") ?? "").trim() || null,
      description: String(form.get("description") ?? "").trim() || null,
      language: String(form.get("language") ?? "en"),
      age_band: String(form.get("age_band") ?? "3-5"),
      category: String(form.get("category") ?? "story"),
      is_free: form.get("is_free") === "on",
      created_by: profile.id,
    })
    .select("id")
    .single();
  if (error || !book) return { ok: false, error: error?.message ?? "Could not create the book." };

  const sourcePath = `books/${book.id}/source.pdf`;
  const { error: upErr } = await admin.storage.from(SOURCES_BUCKET).upload(sourcePath, file, { contentType: "application/pdf" });
  if (upErr) {
    await admin.from("books").update({ status: "failed" }).eq("id", book.id);
    return { ok: false, error: `Upload failed: ${upErr.message}` };
  }

  try {
    const { pageCount } = await processBook(book.id, sourcePath);
    revalidatePath("/library");
    revalidatePath("/admin/books");
    return { ok: true, title, pageCount };
  } catch (e) {
    await admin.from("books").update({ status: "failed" }).eq("id", book.id);
    return { ok: false, error: e instanceof Error ? e.message : "Processing failed." };
  }
}

export async function setBookStatus(bookId: string, status: "ready" | "hidden") {
  const profile = await currentProfile();
  if (!profile || profile.role !== "admin") return;
  await createSupabaseAdmin().from("books").update({ status }).eq("id", bookId);
  revalidatePath("/library");
  revalidatePath("/admin/books");
}
