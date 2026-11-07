"use client";

import { useState, useTransition } from "react";

import { AnimalPicture, PupilAvatarBadge } from "@/components/schools/pictures";
import { useLang, useT } from "@/i18n/provider";
import { ANIMALS, PICTURE_LENGTH, type PupilCard } from "@/lib/schools/shared";
import { playTapSound } from "@/lib/tap-sound";
import { pupilSignIn, pupilSignOut } from "../actions";

/**
 * The class tablet before anyone signs in: every pupil's avatar and first name. A child taps
 * theirs, then their three animal pictures in order.
 */
export function ClassTablet({ code, pupils }: { code: string; pupils: PupilCard[] }) {
  const t = useT().classTablet;
  const am = useLang() === "am";
  const [who, setWho] = useState<PupilCard | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const [pending, start] = useTransition();

  const choose = (i: number) => {
    if (!who || pending || picked.length >= PICTURE_LENGTH) return;
    playTapSound("pop");
    const next = [...picked, i];
    setPicked(next);
    setMessage(null);
    if (next.length < PICTURE_LENGTH) return;
    start(async () => {
      const r = await pupilSignIn(code, who.id, next).catch(() => ({ ok: false as const, error: "unknown" as const }));
      if (r.ok) {
        playTapSound("chime");
        // A fresh page load, so nothing from the last child's visit is left in the reader.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(`/class/${code}`);
        return;
      }
      setPicked([]);
      setShake((s) => s + 1);
      if (r.error === "locked") {
        setMessage(t.locked);
        setWho({ ...who, locked: true });
      } else if (r.error === "rate") setMessage(t.tooMany);
      else if (r.error === "closed") setMessage(t.closed);
      else setMessage(t.wrong);
    });
  };

  if (!who) {
    return (
      <section aria-label={t.title}>
        <h1 className="text-center font-display text-4xl font-black sm:text-5xl">{t.title}</h1>
        <p className={`mt-2 text-center text-xl font-bold text-muted ${am ? "font-ethiopic" : ""}`}>{t.sub}</p>
        {pupils.length === 0 ? (
          <p className="mt-10 text-center text-lg">{t.nobody}</p>
        ) : (
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6">
            {pupils.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  data-pupil={p.id}
                  onClick={() => {
                    playTapSound("pop");
                    setWho(p);
                    setPicked([]);
                    setMessage(p.locked ? t.locked : null);
                  }}
                  className="flex w-full flex-col items-center gap-2 rounded-[24px] bg-white p-3 shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1 active:translate-y-0.5 active:shadow-none"
                >
                  <PupilAvatarBadge avatar={p.avatar} size={76} />
                  <span className="w-full truncate text-center font-display text-lg font-black">{p.firstName}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl" aria-label={t.yourPictures(who.firstName)}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            setWho(null);
            setPicked([]);
            setMessage(null);
          }}
          className="btn btn-plain !px-4 !py-2 !text-base"
        >
          ← {t.back}
        </button>
      </div>
      <div className="mt-5 flex flex-col items-center gap-3 text-center">
        <PupilAvatarBadge avatar={who.avatar} size={104} />
        <h1 className={`font-display text-3xl font-black ${am ? "font-ethiopic" : ""}`}>{t.yourPictures(who.firstName)}</h1>
      </div>

      {/* the three pictures so far */}
      <div key={shake} className={`mt-5 flex justify-center gap-3 ${shake ? "school-shake" : ""}`} data-picked-count={picked.length}>
        {Array.from({ length: PICTURE_LENGTH }, (_, i) => (
          <span key={i} className={`grid h-20 w-20 place-items-center rounded-[20px] border-4 ${picked[i] !== undefined ? "border-gold bg-white" : "border-dashed border-[#D9D2BC] bg-white/60"}`}>
            {picked[i] !== undefined && <AnimalPicture animal={picked[i]} size={60} className="school-pop" />}
          </span>
        ))}
      </div>

      <p className={`mt-4 min-h-[1.75rem] text-center text-lg font-bold text-coral-deep ${am ? "font-ethiopic" : ""}`} role="status" data-tablet-message={message ?? ""}>
        {message}
      </p>

      {!who.locked && (
        <div className="mt-2 grid grid-cols-3 gap-3 sm:gap-4">
          {ANIMALS.map((a, i) => (
            <button
              key={a}
              type="button"
              aria-label={t.animals[a]}
              data-animal-btn={i}
              disabled={pending}
              onClick={() => choose(i)}
              className="grid aspect-square place-items-center rounded-[24px] bg-white shadow-[0_6px_0_var(--color-line)] transition hover:-translate-y-1 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
            >
              <AnimalPicture animal={i} size={88} />
            </button>
          ))}
        </div>
      )}
      {picked.length > 0 && !pending && (
        <p className="mt-4 text-center">
          <button type="button" className="font-bold text-blue underline underline-offset-4" onClick={() => setPicked([])}>
            {t.again}
          </button>
        </p>
      )}
    </section>
  );
}

/** "Finished! Next friend": signs the pupil out on this tablet and shows the class again. */
export function FinishedButton({ code }: { code: string }) {
  const t = useT().classTablet;
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      data-pupil-finished=""
      className="btn btn-primary w-full !text-base sm:w-auto"
      onClick={() =>
        start(async () => {
          await pupilSignOut();
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- a fresh page for the next child
          window.location.assign(`/class/${code}`);
        })
      }
    >
      {t.finished}
    </button>
  );
}
