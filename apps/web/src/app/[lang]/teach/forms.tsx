"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { PupilAvatarBadge } from "@/components/schools/pictures";
import { useT } from "@/i18n/provider";
import { AGE_GROUPS, PUPIL_AVATARS, type PupilAvatar } from "@/lib/schools/shared";
import { addPupil, changePupil, createClass, deleteClass, setAssignment, type TeachResult } from "./actions";

/* The teacher's corner forms and buttons (/teach). Each calls a server action that checks the teacher. */

function useAction() {
  const t = useT().teach;
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (fn: () => Promise<TeachResult>, then?: (r: TeachResult) => void) =>
    start(async () => {
      setError(null);
      const r = await fn().catch(() => ({ ok: false, error: "failed" }) as TeachResult);
      if (!r.ok) setError(r.error === "seats" ? t.seatsFull : t.error);
      then?.(r);
      router.refresh();
    });
  return { pending, error, run };
}

export function CreateClassForm() {
  const t = useT().teach;
  const { pending, error, run } = useAction();
  const router = useRouter();
  return (
    <form
      className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        run(
          () => createClass(form),
          (r) => r.ok && r.id && router.push(`/teach/${r.id}`),
        );
      }}
    >
      <h2 className="font-display text-2xl font-black">{t.newClass}</h2>
      <label className="block">
        <span className="font-bold">{t.className}</span>
        <input id="class-name" name="name" required maxLength={60} placeholder={t.classNameHint} className="mt-1 w-full rounded-2xl border-2 border-line px-4 py-2.5 text-lg" />
      </label>
      <label className="block">
        <span className="font-bold">{t.ageGroup}</span>
        <select id="class-age" name="age_band" defaultValue="3-5" className="mt-1 w-full rounded-2xl border-2 border-line bg-white px-4 py-2.5 text-lg">
          {AGE_GROUPS.map((a) => (
            <option key={a} value={a}>
              {t.ages(a)}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="font-bold text-coral-deep">{error}</p>}
      <button type="submit" className="btn btn-primary !text-base" disabled={pending}>
        {t.create}
      </button>
    </form>
  );
}

export function AddPupilForm({ classId }: { classId: string }) {
  const t = useT().teach;
  const { pending, error, run } = useAction();
  const [avatar, setAvatar] = useState<PupilAvatar>(PUPIL_AVATARS[0]);
  return (
    <form
      className="space-y-3 rounded-[28px] bg-white p-6 shadow-[0_6px_0_var(--color-line)]"
      onSubmit={(e) => {
        e.preventDefault();
        const el = e.currentTarget;
        const form = new FormData(el);
        form.set("avatar", avatar);
        run(
          () => addPupil(classId, form),
          (r) => {
            if (r.ok) {
              el.reset();
              setAvatar(PUPIL_AVATARS[(PUPIL_AVATARS.indexOf(avatar) + 5) % PUPIL_AVATARS.length]);
            }
          },
        );
      }}
    >
      <h3 className="font-display text-xl font-black">{t.addPupil}</h3>
      <label className="block">
        <span className="font-bold">{t.firstName}</span>
        <input id="pupil-name" name="first_name" required maxLength={30} autoComplete="off" className="mt-1 w-full rounded-2xl border-2 border-line px-4 py-2.5 text-lg" />
      </label>
      <fieldset>
        <legend className="font-bold">{t.avatar}</legend>
        <div className="mt-2 grid grid-cols-6 gap-2 sm:grid-cols-8">
          {PUPIL_AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              aria-label={a}
              aria-pressed={a === avatar}
              onClick={() => setAvatar(a)}
              className={`grid place-items-center rounded-full p-0.5 transition ${a === avatar ? "ring-4 ring-gold" : "opacity-80 hover:opacity-100"}`}
            >
              <PupilAvatarBadge avatar={a} size={40} />
            </button>
          ))}
        </div>
      </fieldset>
      {error && <p className="font-bold text-coral-deep">{error}</p>}
      <button type="submit" className="btn btn-primary !text-base" disabled={pending}>
        {t.add}
      </button>
    </form>
  );
}

export function PupilActions({ pupilId, name, locked }: { pupilId: string; name: string; locked: boolean }) {
  const t = useT().teach;
  const { pending, error, run } = useAction();
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2 print-hide">
      {locked && (
        <button type="button" className="btn btn-primary !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => run(() => changePupil(pupilId, "unlock"))} data-unlock={pupilId}>
          {t.unlock}
        </button>
      )}
      <button type="button" className="btn btn-plain !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => run(() => changePupil(pupilId, "pictures"))}>
        {t.newPictures}
      </button>
      {confirm ? (
        <span className="flex items-center gap-2 text-sm">
          <span>{t.removeConfirm(name)}</span>
          <button type="button" className="font-bold text-coral-deep" disabled={pending} onClick={() => run(() => changePupil(pupilId, "remove"))}>
            {t.yes}
          </button>
          <button type="button" className="font-bold text-muted" onClick={() => setConfirm(false)}>
            {t.cancel}
          </button>
        </span>
      ) : (
        <button type="button" className="text-sm font-bold text-muted hover:text-coral-deep" onClick={() => setConfirm(true)}>
          {t.remove}
        </button>
      )}
      {error && <span className="text-sm font-bold text-coral-deep">{error}</span>}
    </div>
  );
}

export function AssignButton({ classId, storyId, assigned }: { classId: string; storyId: string; assigned: boolean }) {
  const t = useT().teach;
  const { pending, run } = useAction();
  return (
    <button
      type="button"
      disabled={pending}
      data-assign={storyId}
      data-assigned={assigned ? "" : undefined}
      onClick={() => run(() => setAssignment(classId, storyId, !assigned))}
      className={`btn !px-3 !py-1.5 !text-sm ${assigned ? "btn-plain" : "btn-primary"}`}
    >
      {assigned ? t.unassign : t.assign}
    </button>
  );
}

export function DeleteClassButton({ classId }: { classId: string }) {
  const t = useT().teach;
  const router = useRouter();
  const { pending, run } = useAction();
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <span className="flex flex-wrap items-center gap-3">
      <span className="font-bold">{t.deleteClassConfirm}</span>
      <button type="button" className="btn btn-primary !px-3 !py-1.5 !text-sm" disabled={pending} onClick={() => run(() => deleteClass(classId), (r) => r.ok && router.push("/teach"))}>
        {t.yes}
      </button>
      <button type="button" className="font-bold text-muted" onClick={() => setConfirm(false)}>
        {t.cancel}
      </button>
    </span>
  ) : (
    <button type="button" className="font-bold text-muted hover:text-coral-deep" onClick={() => setConfirm(true)}>
      {t.deleteClass}
    </button>
  );
}
