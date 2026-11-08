"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";

import { chooseChild } from "@/app/[lang]/account/actions";
import { buyCourse, chooseCourse } from "@/app/[lang]/courses/actions";
import { useT } from "@/i18n/provider";
import type { CourseCheckout } from "@/lib/courses/checkout";
import { formatBirr } from "@/lib/payments/plans";

/** "Buy for 1,500 birr": a pending payment, then Chapa's checkout. */
export function BuyCourse({ courseId, priceEtb }: { courseId: string; priceEtb: number }) {
  const t = useT();
  const [result, buy, pending] = useActionState<CourseCheckout | null, FormData>(buyCourse, null);
  const leaving = Boolean(result && "url" in result);
  useEffect(() => {
    if (result && "url" in result) window.location.assign(result.url);
  }, [result]);
  return (
    <form action={buy} className="space-y-2">
      <input type="hidden" name="course" value={courseId} />
      <button type="submit" className="btn btn-primary" disabled={pending || leaving} data-buy-course={courseId}>
        {pending ? t.subscribe.starting : leaving ? t.courses.buying : t.courses.buyFor(formatBirr(priceEtb))}
      </button>
      {result && "error" in result && (
        <p className="rounded-2xl bg-coral/10 p-3 text-coral" role="alert">
          {result.error}
        </p>
      )}
    </form>
  );
}

/** VIP: start this package for the reading child. */
export function StartCourse({ courseId, label }: { courseId: string; label: string }) {
  const t = useT();
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="btn btn-primary"
        disabled={pending}
        data-start-course={courseId}
        onClick={() =>
          start(async () => {
            const r = await chooseCourse(courseId);
            if (!r.ok) setError(t.courses.errors[r.error] ?? t.quiz.error);
            else router.refresh();
          })
        }
      >
        {label}
      </button>
      {error && (
        <p className="rounded-2xl bg-coral/10 p-3 text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** From the Grown-ups' corner: pick this child, then the catalogue. */
export function ChooseNext({ childId, label }: { childId: string; label: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      className="btn btn-primary !px-3 !py-1.5 !text-sm"
      disabled={pending}
      data-choose-next={childId}
      onClick={() =>
        start(async () => {
          await chooseChild(childId);
          router.push("/courses");
        })
      }
    >
      {label}
    </button>
  );
}
