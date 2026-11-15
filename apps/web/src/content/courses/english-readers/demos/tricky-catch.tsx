"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, say, sfx, shuffled, t } from "./kit";

/*
  "Look, Say, Cover, Check" (level 1): the tricky words he, she, we, you, they, was, said, have,
  do, to, come, here, learned Tsehay's way. A word card shows (Look) and the voice reads it
  (Say: the child says it too); then a hand covers it (Cover); four word cards appear and the child
  taps the one that was under the hand (Check). Eight rounds. It works without a voice too: the
  word is shown before it is covered.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

const ALL = ["he", "she", "we", "you", "they", "was", "said", "have", "do", "to", "come", "here"];
const ROUNDS = ["said", "was", "come", "they", "have", "here", "you", "do"];
const PURPLE = "#8E5BE0";
type Step = "look" | "cover" | "check";

export default function TrickyCatch({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [step, setStep] = useState<Step>("look");
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const word = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const cards = useMemo(() => shuffled([word, ...shuffled(ALL.filter((x) => x !== word), (i + 7) / 19).slice(0, 3)], (i + 1) / 23), [word, i]);

  // Look and say, then cover, then check.
  useEffect(() => {
    if (done) return;
    setStep("look");
    const a = setTimeout(() => say(word, 0.75), 400);
    const b = setTimeout(() => setStep("cover"), 2200);
    const c = setTimeout(() => setStep("check"), 3200);
    return () => [a, b, c].forEach(clearTimeout);
  }, [i, word, done]);

  const pick = (c: string) => {
    if (hit || step !== "check") return;
    if (c === word) {
      sfx.good();
      say(word, 0.8);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 1500);
    } else {
      sfx.oops();
      setWrong(c);
    }
  };

  const steps: { k: Step | "say"; en: string; am: string }[] = [
    { k: "look", en: "Look", am: "ተመልከቱ" },
    { k: "say", en: "say", am: "በሉ" },
    { k: "cover", en: "cover", am: "ሸፍኑ" },
    { k: "check", en: "check", am: "አረጋግጡ" },
  ];
  const on = (k: Step | "say") => (k === "say" ? step === "look" : k === step);

  return (
    <Frame
      lang={lang}
      title={{ en: "Look, Say, Cover, Check", am: "ተመልከቱ፣ በሉ፣ ሸፍኑ፣ አረጋግጡ" }}
      howTo={{ en: "Look at the tricky word and say it. When it is covered, find it again!", am: "አታላዩን ቃል ተመልከቱና በሉት። ሲሸፈን እንደገና ፈልጉት!" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={PURPLE}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {ALL.map((x) => (
            <span key={x} className="rounded-xl bg-[#F1EAFB] px-3 py-1 text-xl font-bold" style={ANDIKA}>
              {x}
            </span>
          ))}
        </div>
      }
    >
      <div className="mb-3 flex justify-center gap-1">
        {steps.map((s) => (
          <span key={s.k} className="rounded-full px-3 py-1 text-sm font-bold" style={{ background: on(s.k) ? PURPLE : "#EFE7DA", color: on(s.k) ? "#FFFFFF" : "#8A7660" }}>
            {s[lang]}
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid h-[104px] w-[220px] place-items-center rounded-3xl border-4 bg-white" style={{ borderColor: PURPLE }} data-step={step}>
        <span className="text-5xl font-bold" style={ANDIKA} lang="en">
          {hit || step === "look" ? word : ""}
        </span>
        <AnimatePresence>
          {step !== "look" && !hit && (
            <motion.div key={`hand-${i}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} className="absolute inset-1 grid place-items-center rounded-2xl text-6xl" style={{ background: "#C88A5A" }} aria-hidden>
              <svg width={64} height={64} viewBox="-16 -16 32 32">
                <path d="M-8 8 V-6 Q-8 -9 -5 -9 Q-2 -9 -2 -6 V-10 Q-2 -13 1 -13 Q4 -13 4 -10 V-6 Q4 -9 7 -9 Q10 -9 10 -6 V6 Q10 12 2 12 H-2 Q-8 12 -8 8Z" fill="#F3D3B8" stroke="#2A1A10" strokeWidth={1.2} />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2" lang="en">
        {cards.map((c) => (
          <motion.button
            key={`${i}-${c}`}
            type="button"
            data-choice={c === word ? "right" : "wrong"}
            disabled={step !== "check"}
            onClick={() => pick(c)}
            animate={wrong === c ? { x: [0, -6, 6, -4, 0] } : { opacity: step === "check" ? 1 : 0.35 }}
            className="rounded-2xl border-4 bg-white py-3 text-3xl font-bold shadow-[0_5px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: hit && c === word ? "#2FA35A" : wrong === c ? "#E58A00" : "#FFFFFF" }}
          >
            {c}
          </motion.button>
        ))}
      </div>

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {word}!
          </span>{" "}
          {t(lang, { en: "You checked it. Look, say, cover, check!", am: "አረጋገጣችሁ! Look, say, cover, check!" })}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `That says "${wrong}". Which one was under the hand?`, am: `ያ «${wrong}» ይላል። ከእጁ ሥር የነበረው የትኛው ነው?` })}</Note>
      ) : (
        <Note tone="plain">{step === "look" ? t(lang, { en: "Look at the word. Say it out loud!", am: "ቃሉን ተመልከቱ። ጮክ ብላችሁ በሉት!" }) : t(lang, { en: "Covered! Now find it.", am: "ተሸፈነ! አሁን ፈልጉት።" })}</Note>
      )}
    </Frame>
  );
}
