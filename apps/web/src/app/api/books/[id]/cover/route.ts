import { NextResponse, type NextRequest } from "next/server";

import { PAGES_BUCKET } from "@/lib/books/process";
import { requestUser } from "@/lib/supabase/request-user";
import { createSupabaseAdmin } from "@/lib/supabase/server";

/** Covers are small and unwatermarked, but still only for signed-in families. */
export async function GET(request: NextRequest, { params }: RouteContext<"/api/books/[id]/cover">) {
  const { id } = await params;
  // The website sends its session cookie; the app sends its access token.
  const me = await requestUser(request);
  if (!me) return new NextResponse(null, { status: 401 });

  const admin = createSupabaseAdmin();
  const { data: book } = await admin.from("books").select("cover_path, status").eq("id", id).single();
  if (!book?.cover_path || book.status !== "ready") return new NextResponse(null, { status: 404 });
  const { data: file } = await admin.storage.from(PAGES_BUCKET).download(book.cover_path);
  if (!file) return new NextResponse(null, { status: 404 });

  return new NextResponse(await file.arrayBuffer(), {
    headers: { "Content-Type": "image/webp", "Cache-Control": "private, max-age=3600" },
  });
}
