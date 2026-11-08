"use client";

import Link from "next/link";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { checkPractice, finishLesson, sendQuiz } from "@/app/[lang]/courses/actions";
import { Bee } from "@/components/characters";
import type { Pic } from "@/content/courses/types";
import { useLang, useT } from "@/i18n/provider";
import { confetti } from "@/lib/confetti";
import type { Answer, Item, PublicQuestion, PublicQuiz, QuestionResult } from "@/lib/courses/engine";
import { geez } from "@/lib/courses/numerals";
import { tellApp } from "@/lib/in-app";
import { playTapSound } from "@/lib/tap-sound";
import { PicView } from "./registry";

/*
  The quiz player (docs/PACKAGES.md): big, friendly and bilingual, every question read aloud with
  the browser's voice. It never has the answers: practice asks the server about each answer as it
  goes (nothing is recorded); a level quiz or the final test is sent whole at the end, scored on
  the server, then the child sees how it went and, gently, what the right answers were.
*/

type Mode = "practice" | "quiz" | "final";
type Attempt = { score: number; total: number; passed: boolean; results: QuestionResult[]; advanced: boolean; completed: boolean; stars: number; opensAt: string | null };

const PAIR_COLORS = ["#2F5BD3", "#E8513B", "#0E8C80", "#D63B72", "#F5B21E", "#7A4FD3"];

function speak(text: string, lang: "en" | "am") {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "am" ? "am-ET" : "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch {
    /* no voice: the words are on the screen */
  }
}

function Label({ item, courseId, size = 56 }: { item: Item; courseId: string; size?: number }) {
  const lang = useLang();
  return (
    <span className="flex flex-col items-center justify-center gap-1">
      {item.pic && <PicView courseId={courseId} pic={item.pic} size={size} />}
      {item.label && <span className={`font-display text-xl font-black leading-tight ${lang === "am" ? "font-ethiopic" : ""}`}>{item.label[lang]}</span>}
    </span>
  );
}

const bigBtn = "rounded-[24px] bg-white p-4 shadow-[0_6px_0_var(--color-line)] transition active:translate-y-1 active:shadow-[0_2px_0_var(--color-line)] disabled:opacity-60";

/* ---------------------------------------------------------------- one question */

function ChoiceQ({ q, courseId, onAnswer, busy }: { q: Extract<PublicQuestion, { kind: "choice" }>; courseId: string; onAnswer: (a: Answer) => void; busy: boolean }) {
  return (
    <div className={`grid gap-4 ${q.options.length > 2 ? "grid-cols-2" : "grid-cols-2"}`}>
      {q.options.map((o, i) => (
        <button key={i} type="button" disabled={busy} className={`${bigBtn} min-h-28`} data-option={i} onClick={() => onAnswer(i)}>
          <Label item={o} courseId={courseId} size={72} />
        </button>
      ))}
    </div>
  );
}

function CountQ({ q, onAnswer, busy }: { q: Extract<PublicQuestion, { kind: "count" }>; onAnswer: (a: Answer) => void; busy: boolean }) {
  const t = useT().quiz;
  const [typed, setTyped] = useState("");
  if (q.numerals !== "digits") {
    return (
      <div className="grid grid-cols-5 gap-2.5" data-numerals={q.numerals}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <button key={n} type="button" disabled={busy} className={`${bigBtn} !p-2`} data-number={n} aria-label={String(n)} onClick={() => onAnswer(n)}>
            <span className="block font-ethiopic text-2xl font-bold leading-none">{geez(n)}</span>
            {q.numerals === "both" && <span className="mt-1 block text-sm font-bold text-muted">{n}</span>}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-xs space-y-3" data-numerals="digits">
      <output className="block h-16 rounded-[20px] bg-white text-center font-display text-5xl font-black leading-[4rem] shadow-inner" aria-live="polite" data-typed="">
        {typed || " "}
      </output>
      <div className="grid grid-cols-3 gap-2.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button key={n} type="button" disabled={busy} className={`${bigBtn} !p-3 font-display text-3xl font-black`} data-digit={n} onClick={() => setTyped((v) => (v.length < 3 ? v + n : v))}>
            {n}
          </button>
        ))}
        <button type="button" disabled={busy} className={`${bigBtn} !p-3 text-xl font-bold`} onClick={() => setTyped((v) => v.slice(0, -1))} aria-label={t.clear}>
          ⌫
        </button>
        <button type="button" disabled={busy} className={`${bigBtn} !p-3 font-display text-3xl font-black`} data-digit={0} onClick={() => setTyped((v) => (v && v.length < 3 ? v + "0" : v))}>
          0
        </button>
        <button type="button" disabled={busy || !typed} className="btn btn-primary !rounded-[24px] !p-3 !text-2xl" data-count-ok="" onClick={() => onAnswer(Number(typed))}>
          ✓
        </button>
      </div>
    </div>
  );
}

function OrderQ({ q, courseId, onAnswer, busy }: { q: Extract<PublicQuestion, { kind: "order" }>; courseId: string; onAnswer: (a: Answer) => void; busy: boolean }) {
  const t = useT().quiz;
  const [order, setOrder] = useState<number[]>(() => q.items.map((_, i) => i));
  const [picked, setPicked] = useState<number | null>(null);
  const tap = (shown: number) => {
    playTapSound("pop");
    if (picked === null) return setPicked(shown);
    if (picked !== shown) {
      const a = order.indexOf(picked);
      const b = order.indexOf(shown);
      const next = [...order];
      [next[a], next[b]] = [next[b], next[a]];
      setOrder(next);
    }
    setPicked(null);
  };
  return (
    <div className="space-y-4">
      <p className="text-center text-muted">{t.tapInOrder}</p>
      <Reorder.Group axis="y" values={order} onReorder={setOrder} className="mx-auto max-w-sm space-y-3" data-order-list="">
        {order.map((shown, pos) => (
          <Reorder.Item key={shown} value={shown} className="touch-none" data-order-item={shown}>
            <button
              type="button"
              disabled={busy}
              onClick={() => tap(shown)}
              className={`${bigBtn} flex w-full items-center gap-4 !py-3 ${picked === shown ? "ring-4 ring-gold" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky-soft font-display text-xl font-black">{pos + 1}</span>
              <span className="flex-1">
                <Label item={q.items[shown]} courseId={courseId} size={44} />
              </span>
              <span className="text-2xl text-muted" aria-hidden>
                ⠿
              </span>
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div className="text-center">
        <button type="button" disabled={busy} className="btn btn-primary" data-order-done="" onClick={() => onAnswer(order)}>
          {t.done}
        </button>
      </div>
    </div>
  );
}

function MatchQ({ q, courseId, onAnswer, busy }: { q: Extract<PublicQuestion, { kind: "match" }>; courseId: string; onAnswer: (a: Answer) => void; busy: boolean }) {
  const t = useT().quiz;
  const [pairs, setPairs] = useState<(number | null)[]>(() => q.left.map(() => null));
  const [left, setLeft] = useState<number | null>(null);
  const colorOfLeft = (i: number) => (pairs[i] === null ? null : PAIR_COLORS[i % PAIR_COLORS.length]);
  const leftOfRight = (r: number) => pairs.indexOf(r);
  const tapLeft = (i: number) => {
    playTapSound("pop");
    if (pairs[i] !== null) {
      setPairs(pairs.map((p, k) => (k === i ? null : p)));
      return setLeft(null);
    }
    setLeft(i === left ? null : i);
  };
  const tapRight = (r: number) => {
    playTapSound("pop");
    const owner = leftOfRight(r);
    if (left === null) {
      if (owner >= 0) setPairs(pairs.map((p, k) => (k === owner ? null : p)));
      return;
    }
    setPairs(pairs.map((p, k) => (k === left ? r : k === owner ? null : p)));
    setLeft(null);
  };
  const complete = pairs.every((p) => p !== null);
  return (
    <div className="space-y-4">
      <p className="text-center text-muted">{t.tapPairs}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {q.left.map((item, i) => {
            const c = colorOfLeft(i);
            return (
              <button key={i} type="button" disabled={busy} data-match-left={i} onClick={() => tapLeft(i)} className={`${bigBtn} w-full ${left === i ? "ring-4 ring-gold" : ""}`} style={c ? { boxShadow: `0 6px 0 ${c}`, outline: `4px solid ${c}` } : undefined}>
                <Label item={item} courseId={courseId} size={44} />
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {q.right.map((item, r) => {
            const owner = leftOfRight(r);
            const c = owner >= 0 ? PAIR_COLORS[owner % PAIR_COLORS.length] : null;
            return (
              <button key={r} type="button" disabled={busy} data-match-right={r} onClick={() => tapRight(r)} className={`${bigBtn} w-full`} style={c ? { boxShadow: `0 6px 0 ${c}`, outline: `4px solid ${c}` } : undefined}>
                <Label item={item} courseId={courseId} size={44} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <button type="button" disabled={busy || !complete} className="btn btn-primary" data-match-done="" onClick={() => onAnswer(pairs as number[])}>
          {t.done}
        </button>
      </div>
    </div>
  );
}

function TrueFalseQ({ onAnswer, busy }: { onAnswer: (a: Answer) => void; busy: boolean }) {
  const t = useT().quiz;
  return (
    <div className="grid grid-cols-2 gap-4">
      <button type="button" disabled={busy} className={`${bigBtn} !bg-[#E6F7EC] py-6`} data-tf="yes" onClick={() => onAnswer(true)}>
        <span className="block text-5xl" aria-hidden>
          👍
        </span>
        <span className="font-display text-2xl font-black">{t.yes}</span>
      </button>
      <button type="button" disabled={busy} className={`${bigBtn} !bg-[#FDECEA] py-6`} data-tf="no" onClick={() => onAnswer(false)}>
        <span className="block text-5xl" aria-hidden>
          👎
        </span>
        <span className="font-display text-2xl font-black">{t.no}</span>
      </button>
    </div>
  );
}

/** The right answer, in what the player showed. */
function RightAnswer({ q, right, courseId }: { q: PublicQuestion; right: Answer; courseId: string }) {
  const t = useT().quiz;
  const lang = useLang();
  if (q.kind === "choice" && typeof right === "number" && q.options[right]) return <Label item={q.options[right]} courseId={courseId} size={56} />;
  if (q.kind === "count" && typeof right === "number")
    return <span className="font-display text-4xl font-black">{q.numerals === "digits" ? right : q.numerals === "geez" ? geez(right) : `${geez(right)} (${right})`}</span>;
  if (q.kind === "truefalse") return <span className="font-display text-3xl font-black">{right ? t.yes : t.no}</span>;
  if (q.kind === "order" && Array.isArray(right))
    return (
      <ol className="flex flex-wrap items-center justify-center gap-2">
        {right.map((shown, i) => (
          <li key={i} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-1.5 font-bold">
            <span className="text-muted">{i + 1}.</span> {q.items[shown]?.label?.[lang] ?? <Label item={q.items[shown]} courseId={courseId} size={32} />}
          </li>
        ))}
      </ol>
    );
  if (q.kind === "match" && Array.isArray(right))
    return (
      <ul className="space-y-1.5">
        {right.map((r, i) => (
          <li key={i} className="flex items-center justify-center gap-2 font-bold">
            <Label item={q.left[i]} courseId={courseId} size={28} /> <span aria-hidden>↔</span> <Label item={q.right[r]} courseId={courseId} size={28} />
          </li>
        ))}
      </ul>
    );
  return null;
}

function QuestionView({ q, courseId, onAnswer, busy }: { q: PublicQuestion; courseId: string; onAnswer: (a: Answer) => void; busy: boolean }) {
  switch (q.kind) {
    case "choice":
      return <ChoiceQ q={q} courseId={courseId} onAnswer={onAnswer} busy={busy} />;
    case "count":
      return <CountQ q={q} onAnswer={onAnswer} busy={busy} />;
    case "order":
      return <OrderQ q={q} courseId={courseId} onAnswer={onAnswer} busy={busy} />;
    case "match":
      return <MatchQ q={q} courseId={courseId} onAnswer={onAnswer} busy={busy} />;
    case "truefalse":
      return <TrueFalseQ onAnswer={onAnswer} busy={busy} />;
  }
}

function Panel({ children, tone = "white" }: { children: ReactNode; tone?: "white" | "gold" | "sky" }) {
  const bg = tone === "gold" ? "bg-[#FFF4D2]" : tone === "sky" ? "bg-sky-soft" : "bg-white";
  return <div className={`quiz-pop rounded-[32px] ${bg} p-6 text-center shadow-[0_8px_0_var(--color-line)] sm:p-8`}>{children}</div>;
}

/* ---------------------------------------------------------------- the player */

export function QuizPlayer({ courseId, quiz, mode, lessonKey, backHref, certificateHref, color }: { courseId: string; quiz: PublicQuiz; mode: Mode; lessonKey?: string; backHref: string; certificateHref?: string; color: string }) {
  const t = useT().quiz;
  const lang = useLang();
  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<QuestionResult | null>(null);
  const [gotIt, setGotIt] = useState(false);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [review, setReview] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const q = quiz.questions[at];
  const total = quiz.questions.length;
  const spoke = useRef(-1);

  const read = useCallback(() => q && speak(q.prompt[lang], lang), [q, lang]);
  useEffect(() => {
    if (!q || spoke.current === at) return;
    spoke.current = at;
    read();
  }, [at, q, read]);

  const finishPractice = useCallback(async () => {
    setDone(true);
    confetti(0.4);
    if (lessonKey) {
      if (!tellApp({ type: "lali:lesson-done", courseId, lessonId: lessonKey })) await finishLesson(courseId, lessonKey).catch(() => null);
    }
  }, [courseId, lessonKey]);

  const answer = async (a: Answer) => {
    if (busy || !q) return;
    playTapSound("pop");
    if (mode === "practice") {
      setBusy(true);
      const r = await checkPractice(courseId, quiz.id, at, a).catch(() => null);
      setBusy(false);
      if (!r || !r.ok) return setError(t.error);
      setFeedback(r.result);
      if (r.result.correct) speak(t.right, lang);
      return;
    }
    const all = [...answers, a];
    setAnswers(all);
    if (at + 1 < total) {
      setGotIt(true);
      setTimeout(() => {
        setGotIt(false);
        setAt(at + 1);
      }, 450);
      return;
    }
    setBusy(true);
    const r = await sendQuiz(courseId, quiz.id, all).catch(() => null);
    setBusy(false);
    if (!r || !r.ok) return setError(t.error);
    setAttempt(r.attempt);
    if (r.attempt.passed) {
      confetti(0.35);
      speak(t.passed, lang);
    }
  };

  const nextPractice = () => {
    setFeedback(null);
    if (at + 1 < total) setAt(at + 1);
    else void finishPractice();
  };

  const restart = () => {
    setAt(0);
    setAnswers([]);
    setAttempt(null);
    setReview(false);
    spoke.current = -1;
  };

  if (!total) {
    return (
      <Panel>
        <p className="text-lg">{t.empty}</p>
        <Link href={backHref} className="btn btn-plain mt-4">
          {t.toMap}
        </Link>
      </Panel>
    );
  }

  if (error) {
    return (
      <Panel>
        <p className="text-lg" role="alert">
          {error}
        </p>
        <Link href={backHref} className="btn btn-plain mt-4">
          {t.toMap}
        </Link>
      </Panel>
    );
  }

  if (done) {
    return (
      <Panel tone="gold">
        <div className="mx-auto w-fit animate-float">
          <Bee size={80} />
        </div>
        <h2 className="mt-2 font-display text-4xl font-black" data-practice-done="">
          {t.practiceDone}
        </h2>
        <Link href={backHref} className="btn btn-primary mt-5">
          {t.toMap}
        </Link>
      </Panel>
    );
  }

  if (attempt && !review) {
    const need = Math.ceil(quiz.passMark * attempt.total);
    return (
      <Panel tone={attempt.passed ? "gold" : "sky"}>
        <div className="mx-auto w-fit animate-float">
          <Bee size={88} />
        </div>
        {attempt.passed ? (
          <>
            <p className="mt-2 text-4xl" aria-label={`${attempt.stars} stars`}>
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className={`quiz-star inline-block ${i < attempt.stars ? "text-gold" : "text-line"}`} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                  ★
                </span>
              ))}
            </p>
            <h2 className="font-display text-4xl font-black" data-quiz-result="passed">
              {attempt.completed ? t.passedFinal : t.passed}
            </h2>
            <p className="mt-2 text-lg">{attempt.completed ? t.passedFinalSub(attempt.score, attempt.total) : t.passedSub(attempt.score, attempt.total)}</p>
          </>
        ) : (
          <>
            <h2 className="mt-2 font-display text-4xl font-black" data-quiz-result="not-yet">
              {t.notYet}
            </h2>
            <p className="mt-2 text-lg">{t.notYetSub(attempt.score, attempt.total, need)}</p>
          </>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {attempt.completed && certificateHref && (
            <Link href={certificateHref} className="btn btn-primary" data-certificate-link="">
              {t.certificate}
            </Link>
          )}
          {attempt.results.some((r) => !r.correct) && (
            <button type="button" className="btn btn-plain" onClick={() => setReview(true)} data-quiz-review="">
              {t.review}
            </button>
          )}
          {!attempt.passed && (
            <button type="button" className="btn btn-plain" onClick={restart}>
              {t.again}
            </button>
          )}
          <Link href={backHref} className={`btn ${attempt.passed && !attempt.completed ? "btn-primary" : "btn-plain"}`} data-quiz-back="">
            {t.toMap}
          </Link>
        </div>
      </Panel>
    );
  }

  if (attempt && review) {
    return (
      <div className="space-y-4">
        {quiz.questions.map((qq, i) => {
          const r = attempt.results[i];
          return (
            <div key={i} className={`rounded-[24px] p-5 ${r?.correct ? "bg-[#E6F7EC]" : "bg-white"} shadow-[0_5px_0_var(--color-line)]`} data-review={i}>
              <p className="font-display text-xl font-black">
                {r?.correct ? "✓ " : "• "}
                {qq.prompt[lang]}
              </p>
              {r && !r.correct && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-bold text-muted">{t.answerWas}</p>
                  <RightAnswer q={qq} right={r.right} courseId={courseId} />
                  {r.explain && <p className="text-muted">{r.explain[lang]}</p>}
                </div>
              )}
            </div>
          );
        })}
        <div className="flex flex-wrap justify-center gap-3">
          {!attempt.passed && (
            <button type="button" className="btn btn-primary" onClick={restart}>
              {t.again}
            </button>
          )}
          <Link href={backHref} className="btn btn-plain">
            {t.toMap}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5" data-quiz={quiz.id} data-quiz-mode={mode}>
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-white shadow-inner" aria-hidden>
          <motion.div className="h-full rounded-full" style={{ background: color }} animate={{ width: `${(at / total) * 100}%` }} />
        </div>
        <span className="text-sm font-bold text-muted" data-question-count="">
          {t.question(at + 1, total)}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={at} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="space-y-5">
          <div className="flex items-start gap-3 rounded-[28px] bg-white p-5 shadow-[0_6px_0_var(--color-line)]">
            <p className={`flex-1 font-display text-2xl font-black leading-snug sm:text-3xl ${lang === "am" ? "font-ethiopic" : ""}`} data-question-kind={q.kind}>
              {q.prompt[lang]}
            </p>
            <button type="button" onClick={read} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sky-soft text-2xl" aria-label={t.listen} title={t.listen}>
              🔊
            </button>
          </div>
          {"pic" in q && q.pic && q.kind !== "choice" ? (
            <div className="grid min-h-24 place-items-center rounded-[28px] bg-[#FFFBEF] p-4">
              <PicView courseId={courseId} pic={q.pic as Pic} size={q.kind === "count" ? 96 : 120} />
            </div>
          ) : q.kind === "choice" && q.pic ? (
            <div className="grid place-items-center rounded-[28px] bg-[#FFFBEF] p-4">
              <PicView courseId={courseId} pic={q.pic} size={120} />
            </div>
          ) : null}
          {feedback ? (
            <Panel tone={feedback.correct ? "gold" : "sky"}>
              <p className="font-display text-3xl font-black" data-feedback={feedback.correct ? "right" : "try"}>
                {feedback.correct ? t.right : t.tryNote}
              </p>
              {!feedback.correct && (
                <div className="mt-3">
                  <RightAnswer q={q} right={feedback.right} courseId={courseId} />
                </div>
              )}
              {feedback.explain && <p className="mt-3 text-lg">{feedback.explain[lang]}</p>}
              <button type="button" className="btn btn-primary mt-5" onClick={nextPractice} data-next="">
                {at + 1 < total ? t.next : t.done}
              </button>
            </Panel>
          ) : (
            <QuestionView q={q} courseId={courseId} onAnswer={answer} busy={busy || gotIt} />
          )}
        </motion.div>
      </AnimatePresence>
      {gotIt && (
        <p className="quiz-pop text-center font-display text-2xl font-black text-teal" aria-live="polite">
          {t.gotIt}
        </p>
      )}
      {busy && <p className="text-center text-muted">{t.sending}</p>}
    </div>
  );
}
