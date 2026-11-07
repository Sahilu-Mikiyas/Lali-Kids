import "server-only";

import { randomInt } from "node:crypto";
import { cookies } from "next/headers";
import { cache } from "react";

import { getStory, STORIES, type Story } from "@/content/stories";
import type { PlanId } from "@/lib/payments/plans";
import { addisDay, EMPTY_BASIS, isStoryId, type StickerBasis } from "@/lib/stickers/catalog";
import { hasSecretKey } from "@/lib/supabase/env";
import { createSupabaseAdmin, currentProfile } from "@/lib/supabase/server";
import { PUPIL_COOKIE, verifyPupilSession } from "./session";
import { ANIMALS, CODE_LETTERS, codePrefix, isPupilAvatar, MAX_TRIES, PICTURE_LENGTH, type AgeGroup, type PupilAvatar, type PupilCard } from "./shared";

/*
  Schools and classroom licences on the server (docs/SCHOOLS.md, migration 0015).

  Everything here uses the secret key, after checking who is asking: the teacher's own classes
  (teacher_id = the signed-in profile), or the pupil named by the signed classroom cookie. Pupils
  never talk to the database themselves. Until migration 0015 is applied the tables are missing:
  `schoolsReady()` says so, reads come back empty and writes report "not ready", so nothing breaks.
*/

export type School = {
  id: string;
  name: string;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  seats: number;
  /** The last day of the licence (YYYY-MM-DD), Addis Ababa time. */
  ends_on: string;
  created_at: string;
};

export type ClassRow = { id: string; school_id: string; teacher_id: string; name: string; age_band: AgeGroup; code: string; created_at: string };
export type PupilRow = {
  id: string;
  class_id: string;
  first_name: string;
  avatar: PupilAvatar;
  picture: number[];
  failed_tries: number;
  locked_at: string | null;
  last_active_at: string | null;
  created_at: string;
};

const db = () => createSupabaseAdmin();
const today = (now = Date.now()) => addisDay(new Date(now).toISOString());

/** Whether the school's licence is open today (the end date is the last day it works). */
export function licenceOpen(school: Pick<School, "ends_on"> | null | undefined, now = Date.now()): boolean {
  return Boolean(school?.ends_on && school.ends_on >= today(now));
}

/** Whether migration 0015 is applied (and the secret key set), once per request. */
export const schoolsReady = cache(async (): Promise<boolean> => {
  if (!hasSecretKey()) return false;
  const { error } = await db().from("schools").select("id").limit(1);
  return !error;
});

/* ---------------------------------------------------------------- teachers */

/** The school a teacher teaches at, or null (not a teacher, or before the migration). */
export const teacherSchool = cache(async (profileId: string): Promise<School | null> => {
  if (!(await schoolsReady())) return null;
  const { data: t } = await db().from("teachers").select("school_id").eq("profile_id", profileId).maybeSingle();
  if (!t?.school_id) return null;
  const { data } = await db().from("schools").select("*").eq("id", t.school_id).maybeSingle();
  return (data as School | null) ?? null;
});

export type Teacher = { profile: NonNullable<Awaited<ReturnType<typeof currentProfile>>>; school: School };

/**
 * The signed-in teacher and their school, or null. A teacher is a profile with the `teacher`
 * role (or an admin) that the Lali team linked to a school on /admin/schools.
 */
export async function currentTeacher(): Promise<Teacher | null> {
  const profile = await currentProfile();
  if (!profile || (profile.role !== "teacher" && profile.role !== "admin")) return null;
  const school = await teacherSchool(profile.id);
  return school ? { profile, school } : null;
}

/**
 * The plan a teacher's school licence counts as while it is open: every pack, so a teacher can
 * read the class shelf on their own account. Null otherwise.
 */
export async function schoolPlanFor(profileId: string): Promise<PlanId | null> {
  const school = await teacherSchool(profileId).catch(() => null);
  return licenceOpen(school) ? "learner" : null;
}

export async function teacherClasses(profileId: string): Promise<(ClassRow & { pupils: number })[]> {
  if (!(await schoolsReady())) return [];
  const { data } = await db().from("classes").select("*").eq("teacher_id", profileId).order("created_at");
  const list = (data ?? []) as ClassRow[];
  if (!list.length) return [];
  const { data: pupils } = await db()
    .from("pupils")
    .select("class_id")
    .in(
      "class_id",
      list.map((c) => c.id),
    );
  const count = new Map<string, number>();
  for (const p of pupils ?? []) count.set(p.class_id, (count.get(p.class_id) ?? 0) + 1);
  return list.map((c) => ({ ...c, pupils: count.get(c.id) ?? 0 }));
}

/** One of this teacher's classes (null if it isn't theirs). */
export async function teacherClass(profileId: string, classId: string): Promise<ClassRow | null> {
  if (!(await schoolsReady()) || !/^[0-9a-f-]{36}$/i.test(classId)) return null;
  const { data } = await db().from("classes").select("*").eq("id", classId).eq("teacher_id", profileId).maybeSingle();
  return (data as ClassRow | null) ?? null;
}

/** Pupils used across the school's classes, for its seats. */
export async function seatsUsed(schoolId: string): Promise<number> {
  const { data: cls } = await db().from("classes").select("id").eq("school_id", schoolId);
  const ids = (cls ?? []).map((c) => c.id);
  if (!ids.length) return 0;
  const { data } = await db().from("pupils").select("id").in("class_id", ids);
  return data?.length ?? 0;
}

/** A fresh class code (LALI-KG2-7Q4) that no class has yet. */
export async function newClassCode(className: string): Promise<string> {
  for (let i = 0; i < 12; i++) {
    const tail = Array.from({ length: 3 }, () => CODE_LETTERS[randomInt(CODE_LETTERS.length)]).join("");
    const code = `LALI-${codePrefix(className)}-${tail}`;
    const { data } = await db().from("classes").select("id").eq("code", code).maybeSingle();
    if (!data) return code;
  }
  throw new Error("Could not make a class code");
}

/** Three different animals, at random, for a new pupil's picture password. */
export function newPicture(): number[] {
  const pool = ANIMALS.map((_, i) => i);
  const out: number[] = [];
  while (out.length < PICTURE_LENGTH) out.push(pool.splice(randomInt(pool.length), 1)[0]);
  return out;
}

export async function classPupilsForTeacher(classId: string): Promise<PupilRow[]> {
  const { data } = await db().from("pupils").select("*").eq("class_id", classId).order("first_name");
  return ((data ?? []) as PupilRow[]).map((p) => ({ ...p, avatar: isPupilAvatar(p.avatar) ? p.avatar : "cub-coral", picture: (p.picture ?? []).map(Number) }));
}

export async function classAssignments(classId: string): Promise<{ story_id: string; assigned_at: string }[]> {
  const { data } = await db().from("class_assignments").select("story_id, assigned_at").eq("class_id", classId).order("assigned_at", { ascending: false });
  return ((data ?? []) as { story_id: string; assigned_at: string }[]).filter((a) => getStory(a.story_id));
}

export type ProgressRow = { pupilId: string; finished: number; stories: string[]; stars: number; lastActive: string | null };

/** The class progress table: stories finished, read-aloud stars and last active, per pupil. */
export async function classProgress(pupils: Pick<PupilRow, "id" | "last_active_at">[]): Promise<ProgressRow[]> {
  const ids = pupils.map((p) => p.id);
  if (!ids.length) return [];
  const [{ data: done }, { data: stars }] = await Promise.all([
    db().from("pupil_completions").select("pupil_id, story_id, completed_at").in("pupil_id", ids),
    db().from("pupil_reader_stars").select("pupil_id, read_at").in("pupil_id", ids),
  ]);
  return pupils.map((p) => {
    const mine = (done ?? []).filter((d) => d.pupil_id === p.id);
    const read = (stars ?? []).filter((s) => s.pupil_id === p.id);
    const times = [p.last_active_at, ...mine.map((d) => d.completed_at), ...read.map((s) => s.read_at)].filter((t): t is string => Boolean(t));
    return {
      pupilId: p.id,
      finished: new Set(mine.map((d) => d.story_id)).size,
      stories: [...new Set(mine.map((d) => d.story_id))],
      stars: read.length,
      lastActive: times.length ? times.sort().at(-1)! : null,
    };
  });
}

/* ---------------------------------------------------------------- the class shelf */

/** The class shelf: the launch library for the class's age group, this week's stories first. */
export function classShelf(ageBand: AgeGroup, assigned: string[]): Story[] {
  const picked = assigned.map((id) => getStory(id)).filter((s): s is Story => Boolean(s));
  const rest = STORIES.filter((s) => s.ageBands.includes(ageBand) && !assigned.includes(s.id));
  return [...picked, ...rest];
}

/** Whether a pupil of this class may open the story: on the class shelf (or assigned to it). */
export function onShelf(ageBand: AgeGroup, assigned: string[], storyId: string): boolean {
  const s = getStory(storyId);
  return Boolean(s && (s.ageBands.includes(ageBand) || assigned.includes(storyId)));
}

/* ---------------------------------------------------------------- the class tablet */

export type ClassForTablet = { cls: ClassRow; school: School; open: boolean };

/** A class by its code, with its school, or null. */
export async function classByCode(code: string): Promise<ClassForTablet | null> {
  if (!(await schoolsReady())) return null;
  const { data } = await db().from("classes").select("*").eq("code", code).maybeSingle();
  if (!data) return null;
  const cls = data as ClassRow;
  const { data: school } = await db().from("schools").select("*").eq("id", cls.school_id).maybeSingle();
  if (!school) return null;
  return { cls, school: school as School, open: licenceOpen(school as School) };
}

/** What the tablet shows before sign-in: first names and avatars only. */
export async function tabletPupils(classId: string): Promise<PupilCard[]> {
  const { data } = await db().from("pupils").select("id, first_name, avatar, locked_at").eq("class_id", classId).order("first_name");
  return (data ?? []).map((p) => ({ id: p.id, firstName: p.first_name, avatar: isPupilAvatar(p.avatar) ? p.avatar : "cub-coral", locked: Boolean(p.locked_at) }));
}

export type PictureResult = { ok: true } | { ok: false; error: "wrong"; triesLeft: number } | { ok: false; error: "locked" | "closed" | "unknown" };

/**
 * Checks a pupil's picture password. Five wrong tries in a row lock the pupil until their teacher
 * unlocks them; a right one resets the count.
 */
export async function checkPicture(classId: string, pupilId: string, picture: number[]): Promise<PictureResult> {
  const { data } = await db().from("pupils").select("id, class_id, picture, failed_tries, locked_at").eq("id", pupilId).eq("class_id", classId).maybeSingle();
  if (!data) return { ok: false, error: "unknown" };
  if (data.locked_at) return { ok: false, error: "locked" };
  const want = ((data.picture ?? []) as number[]).map(Number);
  const right = want.length === PICTURE_LENGTH && want.every((n, i) => n === picture[i]);
  if (right) {
    await db().from("pupils").update({ failed_tries: 0, last_active_at: new Date().toISOString() }).eq("id", pupilId);
    return { ok: true };
  }
  const tries = Number(data.failed_tries ?? 0) + 1;
  const lock = tries >= MAX_TRIES;
  await db()
    .from("pupils")
    .update({ failed_tries: tries, ...(lock ? { locked_at: new Date().toISOString() } : {}) })
    .eq("id", pupilId);
  return lock ? { ok: false, error: "locked" } : { ok: false, error: "wrong", triesLeft: MAX_TRIES - tries };
}

export type PupilSession = { pupil: Pick<PupilRow, "id" | "first_name" | "avatar" | "class_id">; cls: ClassRow; school: School; assigned: string[] };

/**
 * The pupil signed in on this device, from the classroom cookie: only while the cookie is
 * genuine, the pupil is still in that class and not locked, and the school's licence is open.
 */
export const currentPupil = cache(async (): Promise<PupilSession | null> => {
  if (!hasSecretKey()) return null;
  const raw = (await cookies()).get(PUPIL_COOKIE)?.value;
  const s = verifyPupilSession(raw);
  if (!s || !(await schoolsReady())) return null;
  const { data: pupil } = await db().from("pupils").select("id, first_name, avatar, class_id, locked_at").eq("id", s.pupilId).eq("class_id", s.classId).maybeSingle();
  if (!pupil || pupil.locked_at) return null;
  const { data: cls } = await db().from("classes").select("*").eq("id", s.classId).maybeSingle();
  if (!cls) return null;
  const { data: school } = await db().from("schools").select("*").eq("id", cls.school_id).maybeSingle();
  if (!school || !licenceOpen(school as School)) return null;
  const assigned = (await classAssignments(cls.id)).map((a) => a.story_id);
  return { pupil: { id: pupil.id, first_name: pupil.first_name, avatar: pupil.avatar, class_id: pupil.class_id }, cls: cls as ClassRow, school: school as School, assigned };
});

/** The classroom reader only acts as the pupil when the page says so (X-Lali-Pupil: 1). */
export async function pupilForRequest(request: Request): Promise<PupilSession | null> {
  if (request.headers.get("x-lali-pupil") !== "1") return null;
  return currentPupil();
}

/** A pupil finished a story: one row, like a family's completions (it drives their stars). */
export async function recordPupilFinish(pupilId: string, storyId: string): Promise<boolean> {
  if (!isStoryId(storyId)) return false;
  const now = new Date().toISOString();
  const { error } = await db().from("pupil_completions").insert({ pupil_id: pupilId, story_id: storyId });
  await db().from("pupils").update({ last_active_at: now }).eq("id", pupilId);
  return !error;
}

/** A page the pupil read aloud (a reader star), the latest time kept. */
export async function savePupilReaderStar(pupilId: string, storyId: string, page: number, lang: "en" | "am", how: "listened" | "recorded"): Promise<boolean> {
  const { error } = await db()
    .from("pupil_reader_stars")
    .upsert({ pupil_id: pupilId, story_id: storyId, page, lang, how, read_at: new Date().toISOString() }, { onConflict: "pupil_id,story_id,page" });
  return !error;
}

/**
 * The pupil's record for the reader's stickers: finished stories and reader stars. Find Lali
 * finds and sticker positions aren't kept for pupils (docs/SCHOOLS.md).
 */
export async function pupilBasis(pupilId: string): Promise<{ basis: StickerBasis; stars: number }> {
  const [{ data: done }, { data: reads }] = await Promise.all([
    db().from("pupil_completions").select("story_id, completed_at").eq("pupil_id", pupilId),
    db().from("pupil_reader_stars").select("story_id, page").eq("pupil_id", pupilId),
  ]);
  const byStory: Record<string, number[]> = {};
  for (const r of reads ?? []) (byStory[r.story_id] ??= []).push(r.page);
  return {
    basis: {
      ...EMPTY_BASIS,
      finished: [...new Set((done ?? []).map((d) => d.story_id))],
      days: [...new Set((done ?? []).map((d) => addisDay(d.completed_at)))],
      reads: byStory,
    },
    stars: done?.length ?? 0,
  };
}

/* ---------------------------------------------------------------- admin */

export type SchoolSummary = School & { teachers: { id: string; name: string | null }[]; classes: number; pupils: number; open: boolean };

export async function allSchools(): Promise<SchoolSummary[]> {
  if (!(await schoolsReady())) return [];
  const [{ data: schools }, { data: teachers }, { data: classes }, { data: pupils }] = await Promise.all([
    db().from("schools").select("*").order("created_at", { ascending: false }),
    db().from("teachers").select("profile_id, school_id"),
    db().from("classes").select("id, school_id"),
    db().from("pupils").select("class_id"),
  ]);
  const ids = [...new Set((teachers ?? []).map((t) => t.profile_id))];
  const { data: profiles } = ids.length ? await db().from("profiles").select("id, display_name").in("id", ids) : { data: [] as { id: string; display_name: string | null }[] };
  const classSchool = new Map((classes ?? []).map((c) => [c.id, c.school_id]));
  return ((schools ?? []) as School[]).map((s) => ({
    ...s,
    teachers: (teachers ?? []).filter((t) => t.school_id === s.id).map((t) => ({ id: t.profile_id, name: profiles?.find((p) => p.id === t.profile_id)?.display_name ?? null })),
    classes: (classes ?? []).filter((c) => c.school_id === s.id).length,
    pupils: (pupils ?? []).filter((p) => classSchool.get(p.class_id) === s.id).length,
    open: licenceOpen(s),
  }));
}

/** For the pilot numbers page. Zeros before the migration. */
export async function schoolCounts(weekAgoIso: string): Promise<{ ready: boolean; schools: number; open: number; teachers: number; classes: number; pupils: number; activePupils: number; storiesThisWeek: number }> {
  const zero = { ready: false, schools: 0, open: 0, teachers: 0, classes: 0, pupils: 0, activePupils: 0, storiesThisWeek: 0 };
  if (!(await schoolsReady())) return zero;
  const [{ data: schools }, { data: teachers }, { data: classes }, { data: pupils }, { data: done }] = await Promise.all([
    db().from("schools").select("id, ends_on"),
    db().from("teachers").select("profile_id"),
    db().from("classes").select("id"),
    db().from("pupils").select("id, last_active_at"),
    db().from("pupil_completions").select("pupil_id").gte("completed_at", weekAgoIso),
  ]);
  const active = new Set([...(done ?? []).map((d) => d.pupil_id), ...(pupils ?? []).filter((p) => p.last_active_at && p.last_active_at >= weekAgoIso).map((p) => p.id)]);
  return {
    ready: true,
    schools: schools?.length ?? 0,
    open: ((schools ?? []) as Pick<School, "ends_on">[]).filter((s) => licenceOpen(s)).length,
    teachers: teachers?.length ?? 0,
    classes: classes?.length ?? 0,
    pupils: pupils?.length ?? 0,
    activePupils: active.size,
    storiesThisWeek: done?.length ?? 0,
  };
}
