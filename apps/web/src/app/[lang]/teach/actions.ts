"use server";

import { getStory } from "@/content/stories";
import { revalidate } from "@/lib/revalidate";
import { currentTeacher, newClassCode, newPicture, seatsUsed, teacherClass } from "@/lib/schools/server";
import { cleanFirstName, isAgeGroup, isPupilAvatar } from "@/lib/schools/shared";
import { createSupabaseAdmin } from "@/lib/supabase/server";

/*
  The teacher's corner (/teach). Every action checks the signed-in teacher first, then that the
  class is one of theirs, and only then writes with the secret key (docs/SCHOOLS.md).
*/

export type TeachResult = { ok: true; id?: string } | { ok: false; error: "auth" | "invalid" | "seats" | "failed" };

const ok = (id?: string): TeachResult => ({ ok: true, id });
const fail = (error: Extract<TeachResult, { ok: false }>["error"]): TeachResult => ({ ok: false, error });

export async function createClass(form: FormData): Promise<TeachResult> {
  const me = await currentTeacher();
  if (!me) return fail("auth");
  const name = String(form.get("name") ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
  const age = form.get("age_band");
  if (!name || !isAgeGroup(age)) return fail("invalid");
  const code = await newClassCode(name).catch(() => null);
  if (!code) return fail("failed");
  const { data, error } = await createSupabaseAdmin()
    .from("classes")
    .insert({ school_id: me.school.id, teacher_id: me.profile.id, name, age_band: age, code })
    .select("id")
    .single();
  if (error || !data) return fail("failed");
  revalidate("/teach");
  return ok(data.id);
}

export async function deleteClass(classId: string): Promise<TeachResult> {
  const me = await currentTeacher();
  if (!me) return fail("auth");
  if (!(await teacherClass(me.profile.id, classId))) return fail("invalid");
  const { error } = await createSupabaseAdmin().from("classes").delete().eq("id", classId).eq("teacher_id", me.profile.id);
  revalidate("/teach");
  return error ? fail("failed") : ok();
}

export async function addPupil(classId: string, form: FormData): Promise<TeachResult> {
  const me = await currentTeacher();
  if (!me) return fail("auth");
  if (!(await teacherClass(me.profile.id, classId))) return fail("invalid");
  const firstName = cleanFirstName(form.get("first_name"));
  const avatar = form.get("avatar");
  if (!firstName || !isPupilAvatar(avatar)) return fail("invalid");
  if ((await seatsUsed(me.school.id)) >= me.school.seats) return fail("seats");
  const { data, error } = await createSupabaseAdmin()
    .from("pupils")
    .insert({ class_id: classId, first_name: firstName, avatar, picture: newPicture() })
    .select("id")
    .single();
  if (error || !data) return fail("failed");
  revalidate(`/teach/${classId}`);
  return ok(data.id);
}

/** The pupil, if they are in one of this teacher's classes. */
async function ownPupil(teacherId: string, pupilId: string): Promise<{ id: string; class_id: string } | null> {
  if (!/^[0-9a-f-]{36}$/i.test(pupilId)) return null;
  const { data } = await createSupabaseAdmin().from("pupils").select("id, class_id").eq("id", pupilId).maybeSingle();
  if (!data || !(await teacherClass(teacherId, data.class_id))) return null;
  return data;
}

type PupilChange = "unlock" | "pictures" | "remove";

export async function changePupil(pupilId: string, change: PupilChange): Promise<TeachResult> {
  const me = await currentTeacher();
  if (!me) return fail("auth");
  const pupil = await ownPupil(me.profile.id, pupilId);
  if (!pupil) return fail("invalid");
  const db = createSupabaseAdmin().from("pupils");
  const { error } =
    change === "remove"
      ? await db.delete().eq("id", pupil.id)
      : change === "unlock"
        ? await db.update({ locked_at: null, failed_tries: 0 }).eq("id", pupil.id)
        : await db.update({ picture: newPicture(), locked_at: null, failed_tries: 0 }).eq("id", pupil.id);
  revalidate(`/teach/${pupil.class_id}`);
  return error ? fail("failed") : ok();
}

export async function setAssignment(classId: string, storyId: string, assigned: boolean): Promise<TeachResult> {
  const me = await currentTeacher();
  if (!me) return fail("auth");
  if (!getStory(storyId) || !(await teacherClass(me.profile.id, classId))) return fail("invalid");
  const db = createSupabaseAdmin().from("class_assignments");
  const { error } = assigned
    ? await db.upsert({ class_id: classId, story_id: storyId, assigned_at: new Date().toISOString() }, { onConflict: "class_id,story_id" })
    : await db.delete().eq("class_id", classId).eq("story_id", storyId);
  revalidate(`/teach/${classId}`);
  return error ? fail("failed") : ok();
}
