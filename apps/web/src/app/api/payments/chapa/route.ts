import { NextResponse, type NextRequest } from "next/server";

import { chapaConfigured } from "@/lib/payments/chapa";
import { confirmPayment } from "@/lib/payments/subscription";

/**
 * Chapa calls this when a payment finishes (as a GET callback or a POST webhook).
 * We read only the reference from the request and confirm the payment with
 * Chapa's verify endpoint, so a forged request can't grant access.
 */
async function handle(request: NextRequest) {
  if (!chapaConfigured()) return NextResponse.json({ ok: false }, { status: 503 });
  const q = request.nextUrl.searchParams;
  let txRef = q.get("trx_ref") ?? q.get("tx_ref");
  if (!txRef && request.method === "POST") {
    const body = (await request.json().catch(() => null)) as { tx_ref?: string; trx_ref?: string } | null;
    txRef = body?.tx_ref ?? body?.trx_ref ?? null;
  }
  if (!txRef || !/^lali-[a-z]+-[0-9a-f]{18}$/.test(txRef)) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const outcome = await confirmPayment(txRef);
    return NextResponse.json({ ok: true, outcome });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
