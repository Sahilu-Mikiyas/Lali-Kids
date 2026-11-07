import "server-only";

import { randomBytes, randomInt } from "node:crypto";

import { dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { esc, sendMessage, telegramConfigured } from "@/lib/telegram";
import { chapaConfigured, chapaSettingNames, createCheckout, verifyPayment } from "./chapa";
import { CODE_ALPHABET, DAYS_PER_MONTH, giftPrice, isGiftMonths, MESSAGE_MAX, normalizeGiftCode, type GiftMonths } from "./gift";
import { planById, previewSwitch, type PlanId, type SwitchPreview } from "./plans";
import { isGiftRef } from "./refs";
import { asCurrentPlan, familyPlan } from "./subscription";

/** A random code like LALI-XK7M-P2QA, from the unambiguous alphabet. */
export function newGiftCode(): string {
  const pick = () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  const part = () => Array.from({ length: 4 }, pick).join("");
  return `LALI-${part()}-${part()}`;
}

export type GiftInput = { plan: string; months: number; giverName: string; giverEmail: string; recipient: string; message: string };
export type GiftField = "plan" | "months" | "name" | "email" | "recipient" | "message";
export type GiftCheckoutResult = { url: string } | { error: string; field?: GiftField };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const oneLine = (s: string, max: number) => s.replace(/\s+/g, " ").trim().slice(0, max);

type CleanGift = { plan: PlanId; months: GiftMonths; giverName: string; giverEmail: string; recipient: string; message: string | null };

/** Checks what the giver typed. Returns the clean values or the first problem. */
export function cleanGiftInput(input: GiftInput, lang: UiLang): CleanGift | { error: string; field: GiftField } {
  const e = dict[lang].gift.errors;
  const plan = planById(input.plan);
  if (!plan) return { error: e.plan, field: "plan" };
  if (!isGiftMonths(input.months)) return { error: e.months, field: "months" };
  const giverName = oneLine(input.giverName, 60);
  if (!giverName) return { error: e.name, field: "name" };
  const giverEmail = input.giverEmail.trim().toLowerCase();
  if (giverEmail.length > 200 || !EMAIL.test(giverEmail)) return { error: e.email, field: "email" };
  const recipient = oneLine(input.recipient, 80);
  if (!recipient) return { error: e.recipient, field: "recipient" };
  const message = input.message.trim().replace(/\r\n/g, "\n");
  if ([...message].length > MESSAGE_MAX) return { error: e.message, field: "message" };
  return { plan: plan.id, months: Number(input.months) as GiftMonths, giverName, giverEmail, recipient, message: message || null };
}

/** Creates a pending gift and returns Chapa's checkout page. No Lali account needed. */
export async function beginGiftCheckout(input: GiftInput, origin: string, lang: UiLang): Promise<GiftCheckoutResult> {
  const errs = dict[lang].errors;
  const clean = cleanGiftInput(input, lang);
  if ("error" in clean) return clean;
  if (!chapaConfigured()) {
    const seen = chapaSettingNames();
    console.error(`[gifts] CHAPA_SECRET_KEY is not set on the server. Chapa-related settings seen: ${seen.length ? seen.join(", ") : "none"}`);
    return { error: errs.noChapa };
  }
  if (!hasSecretKey()) {
    console.error("[gifts] SUPABASE_SECRET_KEY is not set on the server");
    return { error: errs.noRecord };
  }

  const { total } = giftPrice(clean.plan, clean.months);
  const txRef = `lali-gift-${randomBytes(12).toString("hex")}`;
  const admin = createSupabaseAdmin();
  let inserted = false;
  for (let attempt = 0; attempt < 4 && !inserted; attempt++) {
    const { error } = await admin.from("gifts").insert({
      code: newGiftCode(),
      plan_id: clean.plan,
      months: clean.months,
      amount_etb: total,
      giver_name: clean.giverName,
      giver_email: clean.giverEmail,
      recipient_label: clean.recipient,
      message: clean.message,
      tx_ref: txRef,
    });
    if (!error) inserted = true;
    else if (error.code !== "23505") {
      // 23505 is a duplicate code: astronomically rare, so just draw another.
      console.error("[gifts] could not create gift", error.message);
      return { error: errs.couldntStart };
    }
  }
  if (!inserted) return { error: errs.couldntStart };

  const plan = planById(clean.plan)!;
  const [first, ...rest] = clean.giverName.split(" ");
  try {
    const url = await createCheckout({
      txRef,
      amountEtb: total,
      email: clean.giverEmail,
      firstName: first || "Lali",
      lastName: rest.join(" ") || "Giver",
      callbackUrl: `${origin}/api/payments/chapa`,
      returnUrl: `${origin}/gift/done?tx_ref=${txRef}`,
      title: "Lali gift",
      description: `Lali ${plan.name} gift for ${clean.months} ${clean.months === 1 ? "month" : "months"}`,
    });
    return { url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Chapa could not start the payment.";
    console.error("[gifts]", message);
    // The gift stays pending and its code is never shown, so it can't be redeemed.
    return { error: message };
  }
}

export type GiftConfirmation = "paid" | "already" | "pending" | "short" | "unknown";

/**
 * Confirms a gift payment with Chapa (server to server). A gift becomes valid only when Chapa
 * says it succeeded, in ETB, for at least the gift's price. Safe to call from the return page and
 * the callback at the same time: the database only counts it once.
 */
export async function confirmGift(txRef: string): Promise<GiftConfirmation> {
  if (!isGiftRef(txRef) || !hasSecretKey()) return "unknown";
  const admin = createSupabaseAdmin();
  const { data: gift } = await admin.from("gifts").select("status, amount_etb").eq("tx_ref", txRef).maybeSingle();
  if (!gift) return "unknown";
  if (gift.status !== "pending") return "already";

  const result = await verifyPayment(txRef);
  if (!result.paid) return "pending";
  if (result.amountEtb < gift.amount_etb) {
    console.error(`[gifts] ${txRef}: Chapa confirmed ${result.amountEtb} ETB, gift costs ${gift.amount_etb}`);
    return "short";
  }

  const { data: marked, error } = await admin.rpc("mark_gift_paid", {
    p_tx_ref: txRef,
    p_provider_ref: result.reference ?? "",
    p_amount: result.amountEtb,
  });
  if (error) throw new Error(`Could not record the gift: ${error.message}`);
  return marked ? "paid" : "already";
}

export type GiftCard = {
  code: string;
  planId: PlanId;
  months: GiftMonths;
  giverName: string;
  giverEmail: string;
  recipient: string;
  message: string | null;
  status: "pending" | "paid" | "redeemed";
  amountEtb: number;
  redeemedAt: string | null;
  txRef: string;
};

/** The gift behind a Chapa reference, for the giver's own page. The code is only shown once paid. */
export async function giftByRef(txRef: string): Promise<GiftCard | null> {
  if (!isGiftRef(txRef) || !hasSecretKey()) return null;
  const { data } = await createSupabaseAdmin()
    .from("gifts")
    .select("code, plan_id, months, giver_name, giver_email, recipient_label, message, status, amount_etb, redeemed_at, tx_ref")
    .eq("tx_ref", txRef)
    .maybeSingle();
  if (!data) return null;
  return {
    code: data.code,
    planId: data.plan_id,
    months: data.months,
    giverName: data.giver_name,
    giverEmail: data.giver_email,
    recipient: data.recipient_label,
    message: data.message,
    status: data.status,
    amountEtb: data.amount_etb,
    redeemedAt: data.redeemed_at,
    txRef: data.tx_ref,
  };
}

// ------------------------------------------------------------------------------- redeeming

export type GiftErrorCode = "format" | "invalid" | "used" | "usedMine" | "rate" | "off";

export type GiftPeek =
  | {
      ok: true;
      code: string;
      planId: PlanId;
      months: GiftMonths;
      giverName: string;
      recipient: string;
      message: string | null;
      preview: SwitchPreview;
      /** The family's current plan, for wording the preview. */
      currentPlanId: PlanId | null;
    }
  | { ok: false; error: GiftErrorCode; code?: string };

export type GiftRedeemed =
  | {
      ok: true;
      planId: PlanId;
      months: GiftMonths;
      giverName: string;
      kind: SwitchPreview["kind"];
      /** When the gifted plan starts (later than today only for a downgrade). */
      startsAt: string;
      /** When the gifted plan's days run out. */
      endsAt: string;
    }
  | { ok: false; error: GiftErrorCode };

type PeekRow = { ok: boolean; error?: string; mine?: boolean; plan_id?: string; months?: number; giver_name?: string; recipient_label?: string; message?: string | null };

function errorCode(row: { error?: string; mine?: boolean } | null): GiftErrorCode {
  if (row?.error === "rate") return "rate";
  if (row?.error === "used") return row.mine ? "usedMine" : "used";
  return "invalid";
}

/** What a code would give this family, before they press "Add to our plan". */
export async function peekGift(rawCode: string, familyId: string, nowMs: number): Promise<GiftPeek> {
  const code = normalizeGiftCode(rawCode);
  if (!code) return { ok: false, error: "format" };
  if (!hasSecretKey()) return { ok: false, error: "off", code };
  const admin = createSupabaseAdmin();
  const { data, error } = await admin.rpc("peek_gift", { p_code: code, p_family: familyId });
  if (error) {
    console.error("[gifts] peek failed", error.message);
    return { ok: false, error: "off", code };
  }
  const row = data as PeekRow | null;
  if (!row?.ok || !planById(row.plan_id) || !isGiftMonths(row.months)) return { ok: false, error: errorCode(row), code };
  const months = row.months as GiftMonths;
  const current = asCurrentPlan(await familyPlan(familyId));
  return {
    ok: true,
    code,
    planId: row.plan_id as PlanId,
    months,
    giverName: row.giver_name ?? "",
    recipient: row.recipient_label ?? "",
    message: row.message ?? null,
    preview: previewSwitch(current, row.plan_id as PlanId, nowMs, months * DAYS_PER_MONTH),
    currentPlanId: current?.planId ?? null,
  };
}

type RedeemRow = PeekRow & { kind?: SwitchPreview["kind"]; current_period_end?: string; next_plan_id?: string | null; next_days?: number | string };

/**
 * Redeems a code for a family, once, with the same rules as a payment (apply_plan_days in the
 * database). Wrong codes are rate-limited per family. Sends a Telegram note if they connected it.
 */
export async function redeemGift(rawCode: string, familyId: string): Promise<GiftRedeemed> {
  const code = normalizeGiftCode(rawCode);
  if (!code) return { ok: false, error: "format" };
  if (!hasSecretKey()) return { ok: false, error: "off" };
  const admin = createSupabaseAdmin();
  const { data, error } = await admin.rpc("redeem_gift", { p_code: code, p_family: familyId });
  if (error) {
    console.error("[gifts] redeem failed", error.message);
    return { ok: false, error: "off" };
  }
  const row = data as RedeemRow | null;
  if (!row?.ok || !row.current_period_end || !planById(row.plan_id) || !isGiftMonths(row.months)) return { ok: false, error: errorCode(row) };

  const periodEnd = new Date(row.current_period_end).getTime();
  const later = row.kind === "downgrade";
  const result: GiftRedeemed = {
    ok: true,
    planId: row.plan_id as PlanId,
    months: row.months as GiftMonths,
    giverName: row.giver_name ?? "",
    kind: row.kind ?? "renew",
    startsAt: later ? new Date(periodEnd).toISOString() : new Date().toISOString(),
    endsAt: later ? new Date(periodEnd + Number(row.next_days ?? 0) * 86_400_000).toISOString() : new Date(periodEnd).toISOString(),
  };
  await tellFamily(familyId, result).catch((e) => console.error("[gifts] telegram note failed", e));
  return result;
}

/** "🎁 Hana gave you Lali Learner for 3 months!" on Telegram, if the family connected it. */
async function tellFamily(familyId: string, gift: Extract<GiftRedeemed, { ok: true }>) {
  if (!telegramConfigured()) return;
  const { data } = await createSupabaseAdmin().from("profiles").select("telegram_chat_id, ui_lang").eq("id", familyId).maybeSingle();
  if (!data?.telegram_chat_id) return;
  const t = dict[data.ui_lang === "am" ? "am" : "en"];
  await sendMessage(data.telegram_chat_id, t.gift.telegram(esc(gift.giverName), t.plans.names[gift.planId], t.gift.months(gift.months)));
}
