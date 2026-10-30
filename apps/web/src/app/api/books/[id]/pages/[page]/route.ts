import { NextResponse, type NextRequest } from "next/server";

import { PAGES_BUCKET } from "@/lib/books/process";
import { maskIdentity, PAGES_PER_MINUTE, verifyPage, watermark } from "@/lib/books/protect";
import { createSupabaseAdmin, createSupabaseServer } from "@/lib/supabase/server";

/**
 * Serves one page image to one signed-in family.
 * Order of checks: signed in -> token valid -> book readable on this plan ->
 * not fetching too fast. Then the page is watermarked for this family and sent
 * with no-store so nothing caches it.
 */
export async function GET(request: NextRequest, { params }: RouteContext<"/api/books/[id]/pages/[page]">) {
  const { id, page: pageStr } = await params;
  const page = Number(pageStr);
  if (!Number.isInteger(page) || page < 1) return NextResponse.json({ error: "Bad page" }, { status: 400 });

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to read" }, { status: 401 });

  if (!verifyPage(request.nextUrl.searchParams.get("t"), user.id, id, page)) {
    return NextResponse.json({ error: "This page link has expired. Reopen the book." }, { status: 403 });
  }

  const admin = createSupabaseAdmin();
  const { data: book } = await admin.from("books").select("id, is_free, status, page_count").eq("id", id).single();
  if (!book || book.status !== "ready" || page > book.page_count) return NextResponse.json({ error: "No such page" }, { status: 404 });

  if (!book.is_free) {
    const { data: allowed } = await admin.rpc("has_active_subscription", { family: user.id });
    if (!allowed) return NextResponse.json({ error: "This book needs a Lali plan" }, { status: 402 });
  }

  const since = new Date(Date.now() - 60_000).toISOString();
  const { count } = await admin.from("page_views").select("id", { count: "exact", head: true }).eq("family_id", user.id).gte("viewed_at", since);
  if ((count ?? 0) >= PAGES_PER_MINUTE) {
    return NextResponse.json({ error: "Slow down a little. Try again in a minute." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  const { data: row } = await admin.from("book_pages").select("object_path").eq("book_id", id).eq("page_number", page).single();
  if (!row) return NextResponse.json({ error: "No such page" }, { status: 404 });
  const { data: file, error } = await admin.storage.from(PAGES_BUCKET).download(row.object_path);
  if (error || !file) return NextResponse.json({ error: "Page unavailable" }, { status: 500 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  await admin.from("page_views").insert({
    family_id: user.id,
    book_id: id,
    page_number: page,
    device_id: request.cookies.get("lali-device")?.value ?? null,
    ip,
  });

  const mark = `Lali · ${maskIdentity(user.phone || user.email, user.id)} · ${new Date().toISOString().slice(0, 10)}`;
  const image = await watermark(Buffer.from(await file.arrayBuffer()), mark);

  return new NextResponse(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "private, no-store",
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
