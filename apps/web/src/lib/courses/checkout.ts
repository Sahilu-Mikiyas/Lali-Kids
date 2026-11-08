import "server-only";

import { randomBytes } from "node:crypto";

import { dict } from "@/i18n/dict";
import type { UiLang } from "@/i18n/langs";
import { chapaConfigured, createCheckout, verifyPayment } from "@/lib/payments/chapa";
import { COURSE_CODES, isCourseRef } from "@/lib/payments/refs";
import { allow } from "@/lib/rate-limit";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { courseById, isReady } from "./catalog";
import { ownedCourses } from "./server";

/*
  Buying a learning package (docs/PAYMENTS.md): a one-time Chapa payment of the package's price.
  1. A pending row in `course_payments` with our reference `lali-course-<code>-<20 hex>`.
  2. Chapa's checkout; it returns the parent to /courses/done?tx_ref=… and calls
     /api/payments/chapa in the background.
  3. Either one asks Chapa's verify endpoint (success, ETB, same reference), then the database
     function `buy_course` marks the payment paid and adds the package to `family_courses`, once.
*/

export type CourseCheckout = { url: string } | { error: string };
type Payer = { id: string; display_name: string | null; email?: string | null };

export async function beginCourseCheckout(payer: Payer, courseId: string, origin: string, lang: UiLang, fromApp = false): Promise<CourseCheckout> {
  const t = dict[lang];
  const course = courseById(courseId);
  const code = course ? COURSE_CODES[course.id] : null;
  if (!course || !code || !isReady(course)) return { error: t.courses.cantBuy };
  if (!allow(`pay:${payer.id}`, 10, 10 * 60_000)) return { error: t.ops.tooMany };
  if (!chapaConfigured()) return { error: t.errors.noChapa };
  if (!hasSecretKey()) return { error: t.errors.noRecord };
  if ((await ownedCourses(payer.id)).has(course.id)) return { error: t.courses.alreadyOwned };

  const txRef = `lali-course-${code}-${randomBytes(10).toString("hex")}`;
  const admin = createSupabaseAdmin();
  const { error } = await admin.from("course_payments").insert({ family_id: payer.id, course_id: course.id, tx_ref: txRef, amount_etb: course.priceEtb });
  if (error) {
    console.error("[courses] could not create a package payment", error.message);
    return { error: t.errors.couldntStart };
  }
  const [first, ...rest] = (payer.display_name || "Lali parent").trim().split(/\s+/);
  try {
    const url = await createCheckout({
      txRef,
      amountEtb: course.priceEtb,
      email: payer.email ?? "",
      firstName: first || "Lali",
      lastName: rest.join(" ") || "Parent",
      callbackUrl: `${origin}/api/payments/chapa`,
      returnUrl: `${origin}/courses/done?tx_ref=${txRef}${fromApp ? "&app=1" : ""}`,
      title: "Lali package",
      description: `Lali learning package ${code}`,
    });
    return { url };
  } catch (err) {
    console.error("[courses]", err instanceof Error ? err.message : err);
    await admin.from("course_payments").update({ status: "failed" }).eq("tx_ref", txRef);
    return { error: t.errors.couldntStart };
  }
}

export type CourseConfirmation = { outcome: "paid" | "already" | "pending" | "unknown"; courseId: string | null; familyId: string | null };

/** Confirms a package payment with Chapa and, if it really succeeded, records the package for the family (once). */
export async function confirmCoursePurchase(txRef: string): Promise<CourseConfirmation> {
  if (!isCourseRef(txRef) || !hasSecretKey()) return { outcome: "unknown", courseId: null, familyId: null };
  const admin = createSupabaseAdmin();
  const { data: pay, error } = await admin.from("course_payments").select("status, course_id, family_id").eq("tx_ref", txRef).maybeSingle();
  if (error || !pay) return { outcome: "unknown", courseId: null, familyId: null };
  const base = { courseId: pay.course_id as string, familyId: pay.family_id as string };
  if (pay.status === "paid") return { outcome: "already", ...base };

  const result = await verifyPayment(txRef);
  if (!result.paid) return { outcome: "pending", ...base };
  const { data: bought, error: rpcError } = await admin.rpc("buy_course", { p_tx_ref: txRef, p_provider_ref: result.reference ?? "", p_amount: result.amountEtb });
  if (rpcError) throw new Error(`Could not record the package: ${rpcError.message}`);
  return { outcome: bought ? "paid" : "already", ...base };
}
