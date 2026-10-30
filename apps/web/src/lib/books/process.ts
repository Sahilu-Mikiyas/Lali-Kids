import "server-only";

import sharp from "sharp";

import { createSupabaseAdmin } from "@/lib/supabase/server";

/** Reading resolution. Sharp on a tablet, not good enough to print. */
export const PAGE_WIDTH = 1400;
export const COVER_WIDTH = 600;
export const PAGES_BUCKET = "book-pages";
export const SOURCES_BUCKET = "book-sources";

export type RenderedPage = { pageNumber: number; webp: Buffer; width: number; height: number };

/** Turns every page of a PDF into a WebP image. The PDF bytes never leave the server. */
export async function renderPdf(pdf: Uint8Array, onPage?: (page: RenderedPage) => Promise<void>): Promise<RenderedPage[]> {
  // mupdf is an ES module with top-level await, so it is loaded on demand.
  const mupdf = await import("mupdf");
  const doc = mupdf.Document.openDocument(pdf, "application/pdf");
  const count = doc.countPages();
  const pages: RenderedPage[] = [];
  for (let i = 0; i < count; i++) {
    const page = doc.loadPage(i);
    const [x0, , x1] = page.getBounds();
    const scale = PAGE_WIDTH / (x1 - x0);
    const pixmap = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
    const png = Buffer.from(pixmap.asPNG());
    pixmap.destroy();
    page.destroy();
    const image = sharp(png);
    const { width = PAGE_WIDTH, height = 0 } = await image.metadata();
    const webp = await image.webp({ quality: 80 }).toBuffer();
    const rendered = { pageNumber: i + 1, webp, width, height };
    pages.push(rendered);
    if (onPage) await onPage(rendered);
  }
  doc.destroy();
  return pages;
}

export function pageObjectPath(bookId: string, pageNumber: number) {
  return `books/${bookId}/pages/${String(pageNumber).padStart(4, "0")}.webp`;
}

/**
 * Processes an uploaded PDF: renders pages, stores them in the private bucket,
 * records page sizes, and marks the book ready. Runs on the server after upload.
 */
export async function processBook(bookId: string, sourcePath: string): Promise<{ pageCount: number }> {
  const admin = createSupabaseAdmin();
  const { data: file, error } = await admin.storage.from(SOURCES_BUCKET).download(sourcePath);
  if (error || !file) throw new Error(`Could not read the uploaded PDF: ${error?.message ?? "no file"}`);

  const pdf = new Uint8Array(await file.arrayBuffer());
  let coverPath: string | null = null;

  const pages = await renderPdf(pdf, async (page) => {
    const path = pageObjectPath(bookId, page.pageNumber);
    const { error: upErr } = await admin.storage.from(PAGES_BUCKET).upload(path, page.webp, { contentType: "image/webp", upsert: true });
    if (upErr) throw new Error(`Could not store page ${page.pageNumber}: ${upErr.message}`);
    const { error: rowErr } = await admin
      .from("book_pages")
      .upsert({ book_id: bookId, page_number: page.pageNumber, object_path: path, width: page.width, height: page.height });
    if (rowErr) throw new Error(`Could not record page ${page.pageNumber}: ${rowErr.message}`);

    if (page.pageNumber === 1) {
      const cover = await sharp(page.webp).resize({ width: COVER_WIDTH }).webp({ quality: 80 }).toBuffer();
      coverPath = `books/${bookId}/cover.webp`;
      await admin.storage.from(PAGES_BUCKET).upload(coverPath, cover, { contentType: "image/webp", upsert: true });
    }
  });

  const { error: bookErr } = await admin
    .from("books")
    .update({ page_count: pages.length, cover_path: coverPath, status: "ready" })
    .eq("id", bookId);
  if (bookErr) throw new Error(bookErr.message);
  return { pageCount: pages.length };
}
