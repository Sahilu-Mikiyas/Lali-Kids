"use server";

import { refresh } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { confirmGift } from "@/lib/payments/gift-server";
import { isGiftRef } from "@/lib/payments/refs";

/** Asks Chapa again about a gift that is still waiting (for example if the callback was missed). */
export async function recheckGift(form: FormData): Promise<void> {
  if (!(await requireAdmin())) return;
  const txRef = String(form.get("tx_ref") ?? "");
  if (!isGiftRef(txRef)) return;
  await confirmGift(txRef).catch((e) => console.error("[admin gifts] recheck failed", e));
  refresh();
}
