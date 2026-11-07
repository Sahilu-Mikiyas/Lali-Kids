"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Lang, Story } from "@/content/stories";
import { setFindHints, useFindHints } from "@/lib/stickers/store";
import { uploadVoice, type VoicesStatus } from "@/lib/voices/client";
import { MAX_BYTES, MAX_SECONDS, RECORDING_TYPES, type FamilyVoice } from "@/lib/voices/shared";
import { dict } from "@/i18n/dict";
import { MathsGate } from "../maths-gate";
import { MicListenSetting } from "../mic-listen-setting";

/*
  "Record your voice": a grown-up reads the story page by page for their own children.
  Behind the maths question. The microphone is asked for only when they first tap record,
  after a line explaining why. MediaRecorder records Opus/WebM where it can and MP4/AAC on
  Safari, up to 60 seconds and 4 MB a page; each kept take is uploaded straight away.
*/

type Step = "gate" | "menu" | "name" | "record" | "done";
type Phase = "idle" | "explain" | "recording" | "review" | "saving" | "saved";
type Take = { blob: Blob; url: string; durationMs: number };
type Problem = "blocked" | "unsupported" | "tooBig" | "failed" | "unavailable" | null;

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function pickType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  return RECORDING_TYPES.find((t) => MediaRecorder.isTypeSupported?.(t)) ?? "";
}

export function RecordVoiceModal({
  story,
  lang,
  status,
  voices,
  onClose,
  onSaved,
}: {
  story: Story;
  lang: Lang;
  status: VoicesStatus;
  voices: FamilyVoice[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const t = dict[lang].voices;
  const fl = dict[lang].findLali;
  const hints = useFindHints();
  const [step, setStep] = useState<Step>("gate");
  const [name, setName] = useState("");
  const [recLang, setRecLang] = useState<Lang>(lang);
  const [page, setPage] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [take, setTake] = useState<Take | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [problem, setProblem] = useState<Problem>(null);
  const [playing, setPlaying] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const [savedAny, setSavedAny] = useState(false);

  const stream = useRef<MediaStream | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const player = useRef<HTMLAudioElement | null>(null);
  const takeUrl = useRef<string | null>(null);
  const total = story.pages.length;

  const already = (l: Lang, p: number) => saved.has(`${l}:${p}`) || Boolean(voices.find((v) => v.name === name)?.pages[l]?.[p]);

  const stopPlayer = useCallback(() => {
    player.current?.pause();
    player.current = null;
    setPlaying(false);
  }, []);

  const dropTake = useCallback(() => {
    if (takeUrl.current) URL.revokeObjectURL(takeUrl.current);
    takeUrl.current = null;
    setTake(null);
  }, []);

  const release = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.ondataavailable = null;
      recorder.current.onstop = null;
      recorder.current.stop();
    }
    recorder.current = null;
    stream.current?.getTracks().forEach((tr) => tr.stop());
    stream.current = null;
  }, []);

  // Let go of the microphone and any playback when the modal closes.
  useEffect(
    () => () => {
      release();
      player.current?.pause();
      if (takeUrl.current) URL.revokeObjectURL(takeUrl.current);
    },
    [release],
  );

  const close = () => {
    release();
    stopPlayer();
    if (savedAny) onSaved();
    onClose();
  };

  // Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  const stop = useCallback(() => {
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  }, []);

  const begin = async () => {
    setProblem(null);
    stopPlayer();
    dropTake();
    if (typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setProblem("unsupported");
      return;
    }
    try {
      if (!stream.current) stream.current = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      setPhase("idle");
      setProblem("blocked");
      return;
    }
    const type = pickType();
    let rec: MediaRecorder;
    try {
      rec = new MediaRecorder(stream.current, type ? { mimeType: type, audioBitsPerSecond: 64_000 } : { audioBitsPerSecond: 64_000 });
    } catch {
      rec = new MediaRecorder(stream.current);
    }
    recorder.current = rec;
    const chunks: Blob[] = [];
    let size = 0;
    const t0 = performance.now();
    rec.ondataavailable = (e) => {
      if (!e.data.size) return;
      chunks.push(e.data);
      size += e.data.size;
      // Never let a clip outgrow the upload limit.
      if (size > MAX_BYTES * 0.95) stop();
    };
    rec.onstop = () => {
      const durationMs = Math.min(MAX_SECONDS * 1000, performance.now() - t0);
      const blob = new Blob(chunks, { type: rec.mimeType || type || "audio/webm" });
      recorder.current = null;
      if (blob.size > MAX_BYTES) {
        setPhase("idle");
        setProblem("tooBig");
        return;
      }
      const url = URL.createObjectURL(blob);
      takeUrl.current = url;
      setTake({ blob, url, durationMs });
      setPhase("review");
    };
    rec.start(250);
    setElapsed(0);
    setPhase("recording");
    tick.current = setInterval(() => {
      const ms = performance.now() - t0;
      setElapsed(ms);
      if (ms >= MAX_SECONDS * 1000) stop();
    }, 200);
  };

  const record = async () => {
    // Explain why, the first time, unless the browser already allowed the microphone.
    if (!stream.current && phase !== "explain") {
      let granted = false;
      try {
        const p = await navigator.permissions?.query({ name: "microphone" as PermissionName });
        granted = p?.state === "granted";
      } catch {
        // Not every browser can say; ask with the explanation.
      }
      if (!granted) {
        setPhase("explain");
        return;
      }
    }
    await begin();
  };

  const listen = () => {
    if (!take) return;
    if (playing) {
      stopPlayer();
      return;
    }
    const a = new Audio(take.url);
    player.current = a;
    a.onended = () => setPlaying(false);
    setPlaying(true);
    a.play().catch(() => setPlaying(false));
  };

  const keep = async () => {
    if (!take) return;
    stopPlayer();
    setPhase("saving");
    setProblem(null);
    const r = await uploadVoice(take, { storyId: story.id, lang: recLang, page, name });
    if (!r.ok) {
      setPhase("review");
      setProblem(r.error === "too-big" ? "tooBig" : r.error === "unavailable" ? "unavailable" : "failed");
      return;
    }
    setSaved((s) => new Set(s).add(`${recLang}:${page}`));
    setSavedAny(true);
    setPhase("saved");
    setTimeout(() => goTo(page + 1), 700);
  };

  const goTo = (p: number) => {
    stop();
    stopPlayer();
    dropTake();
    setProblem(null);
    setPhase("idle");
    setElapsed(0);
    if (p >= total) {
      release();
      setStep("done");
      return;
    }
    setPage(Math.max(0, p));
  };

  const font = lang === "am" ? "font-ethiopic" : "";
  const display = lang === "am" ? "font-ethiopic" : "font-display";
  const problemText = problem && { blocked: t.micBlocked, unsupported: t.noMic, tooBig: t.tooBig, failed: t.failed, unavailable: t.unavailable }[problem];

  let content: React.ReactNode;
  if (step === "gate") {
    content = <MathsGate lang={lang} onPass={() => setStep("menu")} />;
  } else if (step === "menu") {
    content = (
      <div className="space-y-5">
        <h2 className={`text-2xl font-black ${display}`}>{t.forGrownUps}</h2>
        <div className="space-y-3 rounded-[22px] bg-sky-soft p-4">
          <h3 className={`text-lg font-black ${display}`}>🎙️ {t.record}</h3>
          <p className="text-[0.95rem] leading-snug text-muted">{t.intro}</p>
          {status === "signed-out" ? (
            <div className="space-y-2 rounded-2xl bg-white p-3" data-voice-signin="">
              <p className="font-bold">{t.signIn}</p>
              <p className="text-sm text-muted">{t.signInSub}</p>
              <Link href={`/login?next=${encodeURIComponent(`/stories/${story.id}`)}`} className="btn btn-primary !py-2 !text-base">
                {t.signInBtn}
              </Link>
            </div>
          ) : status === "unavailable" ? (
            <p className="rounded-2xl bg-white p-3 text-sm text-muted">{t.unavailable}</p>
          ) : (
            <button type="button" className="btn btn-primary !text-base" disabled={status === "loading"} onClick={() => setStep("name")}>
              {t.start}
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border-2 border-line p-4">
          <div className="min-w-0 flex-1">
            <p className={`font-black ${display}`}>🐝 {fl.hints}</p>
            <p className="text-sm text-muted">{fl.hintsSub}</p>
          </div>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                type="button"
                aria-pressed={hints === v}
                onClick={() => setFindHints(v)}
                className={`rounded-xl border-2 px-3 py-1.5 font-bold transition ${hints === v ? "border-teal bg-teal text-white" : "border-line hover:border-ink"}`}
              >
                {v ? fl.on : fl.off}
              </button>
            ))}
          </div>
        </div>
        <MicListenSetting lang={lang} card={false} />
      </div>
    );
  } else if (step === "name") {
    content = (
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            setName(name.trim().slice(0, 40));
            setStep("record");
          }
        }}
      >
        <h2 className={`text-2xl font-black ${display}`}>{t.whoReads}</h2>
        <div className="flex flex-wrap gap-2">
          {t.names.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={name === n}
              onClick={() => setName(n)}
              className={`rounded-full border-2 px-4 py-2 font-bold transition ${name === n ? "border-coral bg-coral text-white" : "border-line bg-white hover:border-ink"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="text-sm font-bold text-muted">{t.otherName}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            maxLength={40}
            className="mt-1 w-full rounded-2xl border-2 border-line bg-white px-4 py-3 text-lg outline-none focus:border-ink"
            data-voice-name=""
          />
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted">{t.readingIn}</span>
          {(["en", "am"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={recLang === l}
              onClick={() => setRecLang(l)}
              className={`rounded-xl border-2 px-3 py-1.5 font-bold ${recLang === l ? "border-ink bg-ink text-white" : "border-line"} ${l === "am" ? "font-ethiopic" : ""}`}
            >
              {l === "en" ? "English" : "አማርኛ"}
            </button>
          ))}
        </div>
        <button type="submit" className="btn btn-primary w-full !text-base" disabled={!name.trim()}>
          {t.start}
        </button>
      </form>
    );
  } else if (step === "record") {
    const left = Math.max(0, MAX_SECONDS * 1000 - elapsed);
    const ring = 2 * Math.PI * 44;
    content = (
      <div className="space-y-4" data-voice-step={phase}>
        <div className="flex items-center justify-between gap-2 pr-8 text-sm font-bold text-muted">
          <span className={font}>{t.page(page + 1, total)}</span>
          <span className="rounded-full bg-gold/25 px-3 py-0.5 text-ink">🎙️ {name}</span>
        </div>
        <div className={`max-h-[34vh] overflow-y-auto rounded-[20px] bg-paper p-4 text-[1.15rem] leading-relaxed text-paper-ink shadow-[inset_0_0_0_2px_var(--color-paper-line)] ${recLang === "am" ? "font-ethiopic" : ""}`}>
          {story.pages[page][recLang]}
        </div>
        {phase === "explain" ? (
          <div className="space-y-3 rounded-[20px] bg-sky-soft p-4" data-mic-why="">
            <p className="leading-snug">{t.micWhy}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary !py-2 !text-base" onClick={begin}>
                🎙️ {t.micAllow}
              </button>
              <button type="button" className="btn btn-plain !py-2 !text-base" onClick={() => setPhase("idle")}>
                {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="relative grid h-[104px] w-[104px] place-items-center">
              <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 -rotate-90" aria-hidden>
                <circle cx={50} cy={50} r={44} fill="none" stroke="#E6DEC9" strokeWidth={6} />
                {phase === "recording" && (
                  <circle cx={50} cy={50} r={44} fill="none" stroke="#E8513B" strokeWidth={6} strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - elapsed / (MAX_SECONDS * 1000))} />
                )}
              </svg>
              {phase === "recording" ? (
                <button type="button" onClick={stop} aria-label={t.stopBtn} data-voice="stop" className="grid h-20 w-20 place-items-center rounded-full bg-ink text-white shadow-[0_5px_0_rgba(0,0,0,.25)] active:translate-y-1">
                  <span className="text-3xl leading-none">■</span>
                </button>
              ) : phase === "review" || phase === "saving" || phase === "saved" ? (
                <button type="button" onClick={listen} aria-label={playing ? t.pauseBtn : t.listenBtn} data-voice="listen" disabled={phase !== "review"} className="grid h-20 w-20 place-items-center rounded-full bg-teal text-white shadow-[0_5px_0_var(--color-teal-deep)] active:translate-y-1 disabled:opacity-60">
                  <span className="text-3xl leading-none">{playing ? "■" : "▶"}</span>
                </button>
              ) : (
                <button type="button" onClick={record} aria-label={t.recordBtn} data-voice="record" className="grid h-20 w-20 place-items-center rounded-full bg-coral text-white shadow-[0_5px_0_var(--color-coral-deep)] active:translate-y-1">
                  <span className="text-4xl leading-none">●</span>
                </button>
              )}
            </div>
            <p className={`min-h-6 text-center text-sm font-bold ${font} ${phase === "recording" ? "text-coral" : "text-muted"}`} aria-live="polite">
              {phase === "recording" ? (
                <>
                  <span className="voice-dot mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-coral align-middle" /> {fmt(elapsed)} · {fmt(left)}
                </>
              ) : phase === "review" ? (
                `${t.listenBtn} · ${fmt(take?.durationMs ?? 0)}`
              ) : phase === "saving" ? (
                t.saving
              ) : phase === "saved" ? (
                <span className="text-teal">{t.saved}</span>
              ) : already(recLang, page) ? (
                <span className="text-teal">✓ {t.already}</span>
              ) : (
                `${t.tapRecord} ${t.limit}`
              )}
            </p>
            {phase === "review" && (
              <div className="flex flex-wrap justify-center gap-2">
                <button type="button" className="btn btn-plain !py-2 !text-base" onClick={() => void record()} data-voice="again">
                  ↺ {t.again}
                </button>
                <button type="button" className="btn btn-primary !py-2 !text-base" onClick={keep} data-voice="keep">
                  ✓ {t.keep}
                </button>
              </div>
            )}
          </div>
        )}
        {problemText && (
          <p className="rounded-2xl bg-coral/10 p-3 text-center text-sm font-bold text-coral-deep" role="alert" data-voice-problem={problem ?? ""}>
            {problemText}
          </p>
        )}
        <div className="flex items-center justify-between gap-2 border-t-2 border-line pt-3">
          <button type="button" className="font-bold text-muted hover:text-ink disabled:opacity-30" disabled={page === 0 || phase === "recording" || phase === "saving"} onClick={() => goTo(page - 1)}>
            ← {t.back}
          </button>
          <button type="button" className="font-bold text-blue hover:underline disabled:opacity-30" disabled={phase === "recording" || phase === "saving"} onClick={() => goTo(page + 1)} data-voice="next">
            {page + 1 >= total ? t.finish : already(recLang, page) ? `${t.next} →` : `${t.skip} →`}
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="space-y-4 text-center" data-voice-done="">
        <p className="text-5xl">💛</p>
        <h2 className={`text-2xl font-black ${display}`}>{t.done(name)}</h2>
        <p className="text-muted">{t.doneSub(name)}</p>
        <button type="button" className="btn btn-primary !text-base" onClick={close}>
          {t.close}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[85] grid place-items-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-6 sm:px-6" lang={lang}>
      <div className="lali-fade absolute inset-0 bg-[#0B1030]/60" onClick={close} aria-hidden />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={t.record}
        data-record-voice=""
        className={`lali-card-in relative max-h-full w-full max-w-md overflow-y-auto rounded-[28px] bg-[#FFFBF0] p-5 text-left text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)] sm:p-6 ${font}`}
      >
        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-2xl leading-none text-muted transition hover:bg-black/5 hover:text-ink"
        >
          ×
        </button>
        {content}
      </section>
    </div>
  );
}
