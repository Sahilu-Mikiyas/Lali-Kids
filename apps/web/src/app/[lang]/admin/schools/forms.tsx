"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { addTeacher, createSchool, removeTeacher, updateSchool, type AdminResult } from "./actions";

/* Admin forms for /admin/schools (English only, like the other admin pages). */

function useRun() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const run = (fn: () => Promise<AdminResult>, onOk?: () => void) =>
    start(async () => {
      const r = await fn().catch((e: unknown) => ({ ok: false, error: e instanceof Error ? e.message : "Something went wrong." }) as AdminResult);
      setNote(r.ok ? { ok: true, text: r.message ?? "Done." } : { ok: false, text: r.error });
      if (r.ok) onOk?.();
      router.refresh();
    });
  return { pending, note, run };
}

const input = "mt-1 w-full rounded-2xl border-2 border-line bg-white px-3 py-2";

type SchoolValues = { name: string; contact_name: string | null; contact_phone: string | null; contact_email: string | null; seats: number; ends_on: string };

function SchoolFields({ v }: { v?: SchoolValues }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block sm:col-span-2">
        <span className="font-bold">School name</span>
        <input name="name" required maxLength={120} defaultValue={v?.name} className={input} />
      </label>
      <label className="block">
        <span className="font-bold">Contact person</span>
        <input name="contact_name" maxLength={120} defaultValue={v?.contact_name ?? ""} className={input} />
      </label>
      <label className="block">
        <span className="font-bold">Contact phone</span>
        <input name="contact_phone" maxLength={40} defaultValue={v?.contact_phone ?? ""} className={input} />
      </label>
      <label className="block">
        <span className="font-bold">Contact email</span>
        <input name="contact_email" type="email" maxLength={200} defaultValue={v?.contact_email ?? ""} className={input} />
      </label>
      <label className="block">
        <span className="font-bold">Seats (pupil places)</span>
        <input name="seats" type="number" min={1} max={5000} required defaultValue={v?.seats ?? 30} className={input} />
      </label>
      <label className="block">
        <span className="font-bold">Licence ends (last day)</span>
        <input name="ends_on" type="date" required defaultValue={v?.ends_on} className={input} />
      </label>
    </div>
  );
}

function Note({ note }: { note: { ok: boolean; text: string } | null }) {
  if (!note) return null;
  return (
    <p className={`font-bold ${note.ok ? "text-teal" : "text-coral-deep"}`} role="status">
      {note.text}
    </p>
  );
}

export function NewSchoolForm() {
  const { pending, note, run } = useRun();
  return (
    <form
      className="space-y-4 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]"
      onSubmit={(e) => {
        e.preventDefault();
        const el = e.currentTarget;
        const form = new FormData(el);
        run(() => createSchool(form), () => el.reset());
      }}
    >
      <h2 className="font-display text-2xl font-black">Add a school</h2>
      <SchoolFields />
      <Note note={note} />
      <button type="submit" className="btn btn-primary !text-base" disabled={pending}>
        Add school
      </button>
    </form>
  );
}

export function EditSchoolForm({ id, v }: { id: string; v: SchoolValues }) {
  const { pending, note, run } = useRun();
  const [open, setOpen] = useState(false);
  if (!open)
    return (
      <button type="button" className="btn btn-plain !px-3 !py-1.5 !text-sm" onClick={() => setOpen(true)}>
        Edit school and licence
      </button>
    );
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        run(() => updateSchool(id, form), () => setOpen(false));
      }}
    >
      <SchoolFields v={v} />
      <Note note={note} />
      <div className="flex gap-3">
        <button type="submit" className="btn btn-primary !px-4 !py-2 !text-sm" disabled={pending}>
          Save
        </button>
        <button type="button" className="font-bold text-muted" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function AddTeacherForm({ schoolId }: { schoolId: string }) {
  const { pending, note, run } = useRun();
  return (
    <form
      className="flex flex-wrap items-end gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const el = e.currentTarget;
        const form = new FormData(el);
        run(() => addTeacher(schoolId, form), () => el.reset());
      }}
    >
      <label className="block min-w-60 flex-1">
        <span className="text-sm font-bold">Add a teacher by email</span>
        <input name="email" type="email" required placeholder="teacher@school.et" className={input} />
      </label>
      <button type="submit" className="btn btn-primary !px-4 !py-2 !text-sm" disabled={pending}>
        Make teacher
      </button>
      <div className="w-full">
        <Note note={note} />
      </div>
    </form>
  );
}

export function RemoveTeacherButton({ profileId }: { profileId: string }) {
  const { pending, run } = useRun();
  return (
    <button type="button" className="text-sm font-bold text-muted hover:text-coral-deep" disabled={pending} onClick={() => run(() => removeTeacher(profileId))}>
      Remove
    </button>
  );
}
