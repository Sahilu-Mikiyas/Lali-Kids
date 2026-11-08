import { NextResponse, type NextRequest } from "next/server";

import { reportServerError } from "@/lib/alerts";
import { chapaConfigured } from "@/lib/payments/chapa";
import { confirmGift } from "@/lib/payments/gift-server";
import { confirmCoursePurchase } from "@/lib/courses/checkout";
import { isCourseRef, isGiftRef, isPlanRef } from "@/lib/payments/refs";
import { confirmPayment } from "@/lib/payments/subscription";

/**
 * Chapa calls this when a payment finishes (as a GET callback or a POST webhook).
 * We read only the reference from the request and confirm the payment with
 * Chapa's verify endpoint, so a forged request can't grant access.
 * Plan payments (lali-<plan>-…), gifts (lali-gift-…) and learning packages (lali-course-…) have
 * different shapes, so each goes only to its own table: a gift can never add days as a payment, a
 * payment can't open a gift, and neither can buy a package (or the other way round).
 */
async function handle(request: NextRequest) {
  if (!chapaConfigured()) return NextResponse.json({ ok: false }, { status: 503 });
  const q = request.nextUrl.searchParams;
  let txRef = q.get("trx_ref") ?? q.get("tx_ref");
  if (!txRef && request.method === "POST") {
    const body = (await request.json().catch(() => null)) as { tx_ref?: string; trx_ref?: string } | null;
    txRef = body?.tx_ref ?? body?.trx_ref ?? null;
  }
  const kind = isGiftRef(txRef) ? "gift" : isPlanRef(txRef) ? "plan" : isCourseRef(txRef) ? "course" : null;
  if (!txRef || !kind) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const outcome = kind === "gift" ? await confirmGift(txRef) : kind === "course" ? (await confirmCoursePurchase(txRef)).outcome : await confirmPayment(txRef);
    return NextResponse.json({ ok: true, kind, outcome });
  } catch (e) {
    console.error("[payments] callback failed", e);
    reportServerError(e, `/api/payments/chapa (${kind})`);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
