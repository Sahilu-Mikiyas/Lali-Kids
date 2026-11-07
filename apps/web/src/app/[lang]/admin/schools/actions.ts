"use server";

import { requireAdmin } from "@/lib/admin";
import { revalidate } from "@/lib/revalidate";
import { schoolsReady } from "@/lib/schools/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

/*
  Schools and their licences (admin only; docs/SCHOOLS.md). A school has a name, a contact, a
  number of pupil places (seats) and the last day its licence works. Teachers are Lali accounts
  (they sign in like parents, once) that an admin links to a school here, which gives them the
  `teacher` role.
*/

export type AdminResult = { ok: true; message?: string } | { ok: false; error: string };

const text = (form: FormData, key: string, max: number) => String(form.get(key) ?? "").replace(/\s+/g, " ").trim().slice(0, max) || null;

function schoolFields(form: FormData): { ok: true; row: Record<string, unknown> } | { ok: false; error: string } {
  const name = text(form, "name", 120);
  const seats = Number(form.get("seats"));
  const endsOn = String(form.get("ends_on") ?? "");
  if (!name) return { ok: false, error: "The school needs a name." };
  if (!Number.isInteger(seats) || seats < 1 || seats > 5000) return { ok: false, error: "Seats must be a whole number from 1 to 5000." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(endsOn) || Number.isNaN(Date.parse(endsOn))) return { ok: false, error: "Choose the licence's end date." };
  const email = text(form, "contact_email", 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "That contact email doesn't look right." };
  return { ok: true, row: { name, seats, ends_on: endsOn, contact_name: text(form, "contact_name", 120), contact_phone: text(form, "contact_phone", 40), contact_email: email } };
}

async function guard(): Promise<string | null> {
  if (!(await requireAdmin())) return "Admins only.";
  if (!(await schoolsReady())) return "Migration 0015 isn't applied yet.";
  return null;
}

export async function createSchool(form: FormData): Promise<AdminResult> {
  const no = await guard();
  if (no) return { ok: false, error: no };
  const f = schoolFields(form);
  if (!f.ok) return f;
  const { error } = await createSupabaseAdmin().from("schools").insert(f.row);
  revalidate("/admin/schools");
  return error ? { ok: false, error: error.message } : { ok: true, message: "School added." };
}

export async function updateSchool(schoolId: string, form: FormData): Promise<AdminResult> {
  const no = await guard();
  if (no) return { ok: false, error: no };
  const f = schoolFields(form);
  if (!f.ok) return f;
  const { error } = await createSupabaseAdmin().from("schools").update(f.row).eq("id", schoolId);
  revalidate("/admin/schools");
  return error ? { ok: false, error: error.message } : { ok: true, message: "Saved." };
}

/** The account with this email address, if it has signed in to Lali at least once. */
async function userIdByEmail(email: string): Promise<string | null> {
  const want = email.trim().toLowerCase();
  const admin = createSupabaseAdmin();
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data) return null;
    const hit = data.users.find((u) => u.email?.toLowerCase() === want);
    if (hit) return hit.id;
    if (data.users.length < 1000) return null;
  }
  return null;
}

export async function addTeacher(schoolId: string, form: FormData): Promise<AdminResult> {
  const no = await guard();
  if (no) return { ok: false, error: no };
  const email = text(form, "email", 200);
  if (!email) return { ok: false, error: "Enter the teacher's email." };
  const id = await userIdByEmail(email);
  if (!id) return { ok: false, error: "No Lali account with that email yet. Ask the teacher to sign in once at /login, then add them." };
  const db = createSupabaseAdmin();
  const { data: profile } = await db.from("profiles").select("id, role").eq("id", id).maybeSingle();
  if (!profile) return { ok: false, error: "That account has no profile yet." };
  const { error } = await db.from("teachers").upsert({ profile_id: id, school_id: schoolId }, { onConflict: "profile_id" });
  if (error) return { ok: false, error: error.message };
  // Admins stay admins (they can use the teacher's corner too).
  if (profile.role !== "admin") await db.from("profiles").update({ role: "teacher" }).eq("id", id);
  revalidate("/admin/schools");
  return { ok: true, message: `${email} is now a teacher.` };
}

export async function removeTeacher(profileId: string): Promise<AdminResult> {
  const no = await guard();
  if (no) return { ok: false, error: no };
  const db = createSupabaseAdmin();
  const { error } = await db.from("teachers").delete().eq("profile_id", profileId);
  if (error) return { ok: false, error: error.message };
  await db.from("profiles").update({ role: "parent" }).eq("id", profileId).eq("role", "teacher");
  revalidate("/admin/schools");
  return { ok: true, message: "Teacher removed." };
}
