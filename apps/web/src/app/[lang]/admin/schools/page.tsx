import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SiteNav } from "@/components/site-chrome";
import { requireAdmin } from "@/lib/admin";
import { allSchools, schoolsReady } from "@/lib/schools/server";
import { AddTeacherForm, EditSchoolForm, NewSchoolForm, RemoveTeacherButton } from "./forms";

export const metadata: Metadata = { title: "Schools" };

/** Schools, their licences and teachers (docs/SCHOOLS.md). Admins only. */
async function SchoolsContent() {
  await connection();
  if (!(await requireAdmin())) redirect("/account");
  const [ready, schools] = await Promise.all([schoolsReady(), allSchools()]);
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 pb-20 pt-32 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-black">Schools</h1>
          <p className="mt-2 text-lg text-muted">School licences open every pack for a school&rsquo;s classes until the end date. Teachers manage their classes at /teach.</p>
        </div>
        <Link href="/admin/stats" className="btn btn-plain !text-base">
          Pilot numbers
        </Link>
      </div>
      {!ready && (
        <p className="rounded-2xl bg-gold/20 p-4 font-bold text-[#7A3E00]" data-schools-not-ready="">
          Schools aren&rsquo;t available yet: migration 0015 needs to be applied (and the secret key set).
        </p>
      )}
      {ready && (
        <>
          <ul className="space-y-4">
            {schools.length === 0 && <li className="text-lg text-muted">No schools yet.</li>}
            {schools.map((s) => (
              <li key={s.id} className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]" data-school={s.name}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-black">{s.name}</p>
                    <p className="text-muted">
                      {[s.contact_name, s.contact_phone, s.contact_email].filter(Boolean).join(" · ") || "No contact yet"}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${s.open ? "bg-teal/15 text-teal" : "bg-coral/15 text-coral-deep"}`}>
                    {s.open ? `Open until ${s.ends_on}` : `Ended ${s.ends_on}`}
                  </span>
                </div>
                <p className="font-bold">
                  {s.pupils} of {s.seats} seats used · {s.classes} {s.classes === 1 ? "class" : "classes"}
                </p>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-muted">Teachers</p>
                  <ul className="mt-1 space-y-1">
                    {s.teachers.length === 0 && <li className="text-muted">None yet.</li>}
                    {s.teachers.map((tr) => (
                      <li key={tr.id} className="flex items-center gap-3">
                        <span className="font-bold">{tr.name ?? "Teacher"}</span>
                        <span className="font-mono text-xs text-muted">{tr.id.slice(0, 8)}</span>
                        <RemoveTeacherButton profileId={tr.id} />
                      </li>
                    ))}
                  </ul>
                </div>
                <AddTeacherForm schoolId={s.id} />
                <EditSchoolForm id={s.id} v={s} />
              </li>
            ))}
          </ul>
          <NewSchoolForm />
        </>
      )}
    </main>
  );
}

export default function AdminSchoolsPage() {
  return (
    <>
      <SiteNav />
      <Suspense fallback={<main className="mx-auto max-w-5xl px-4 pt-32" />}>
        <SchoolsContent />
      </Suspense>
    </>
  );
}
