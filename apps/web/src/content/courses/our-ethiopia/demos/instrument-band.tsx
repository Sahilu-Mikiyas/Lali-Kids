"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { Kebero, Krar, Masinqo, Washint } from "@/components/book/courses/our-ethiopia/kit-crafts";
import { Classroom } from "@/components/book/courses/our-ethiopia/kit-more";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Next, Stage, t, type T } from "./demo-kit";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Meet the Band (level 6). First, tap each of four Ethiopian instruments to hear a little sound
  made in the browser (an imitation, not a recording) and learn how it is played: the krar (a
  lyre with five or six strings, plucked), the masinqo (one string over a diamond-shaped box,
  played with a bow), the washint (a bamboo flute, blown) and the kebero (a big drum covered in
  skin, beaten). Then four questions: which one do you bow, blow, pluck, beat?
*/

type Inst = "krar" | "masinqo" | "washint" | "kebero";
const INSTS: Inst[] = ["krar", "masinqo", "washint", "kebero"];

const NAME: Record<Inst, T> = {
  krar: { en: "Krar", am: "ክራር" },
  masinqo: { en: "Masinqo", am: "ማሲንቆ" },
  washint: { en: "Washint", am: "ዋሽንት" },
  kebero: { en: "Kebero", am: "ከበሮ" },
};

const HOW: Record<Inst, T> = {
  krar: { en: "A lyre with a round bowl and five or six strings. You pluck it.", am: "ክብ ሳጥንና አምስት ወይም ስድስት ክሮች ያሉት። በጣት ይመታል።" },
  masinqo: { en: "One string stretched over a diamond-shaped box. You play it with a bow.", am: "ባለ አራት ማዕዘን ሳጥን ላይ የተወጠረ አንድ ክር። በቀስት ይጫወቱታል።" },
  washint: { en: "A long bamboo flute. Shepherds blow it in the hills.", am: "ረጅም የቀርከሃ ዋሽንት። እረኞች በኮረብታ ላይ ይነፉታል።" },
  kebero: { en: "A big drum covered in skin. You beat it, at celebrations and in church.", am: "በቆዳ የተሸፈነ ትልቅ ከበሮ። በበዓላትና በቤተ ክርስቲያን ይመታል።" },
};

function Pic({ k, play = false }: { k: Inst; play?: boolean }): ReactNode {
  if (k === "krar") return <Krar x={0} y={0} play={play} />;
  if (k === "masinqo") return <Masinqo x={0} y={0} play={play} />;
  if (k === "washint") return <Washint x={0} y={0} rot={-30} play={play} />;
  return <Kebero x={0} y={0} play={play} />;
}

function Icon({ k }: { k: Inst }) {
  const tr: Record<Inst, string> = {
    krar: "translate(22 42) scale(0.48)",
    masinqo: "translate(22 42) scale(0.42)",
    washint: "translate(16 42) scale(0.5)",
    kebero: "translate(22 38) scale(0.6)",
  };
  return (
    <g transform={tr[k]}>
      <Pic k={k} />
    </g>
  );
}

let ctx: AudioContext | null = null;

/** A short made-up sound for each instrument, with the Web Audio API (silent if it is missing). */
function play(k: Inst) {
  try {
    if (typeof window === "undefined") return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = ctx ?? new AC();
    const c = ctx;
    const now = c.currentTime;
    const out = c.createGain();
    out.gain.value = 0.25;
    out.connect(c.destination);
    const note = (freq: number, start: number, dur: number, type: OscillatorType, attack = 0.01, vibrato = 0) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      o.frequency.value = freq;
      if (vibrato) {
        const lfo = c.createOscillator();
        const lg = c.createGain();
        lfo.frequency.value = 5.5;
        lg.gain.value = vibrato;
        lfo.connect(lg).connect(o.frequency);
        lfo.start(now + start);
        lfo.stop(now + start + dur);
      }
      g.gain.setValueAtTime(0.0001, now + start);
      g.gain.exponentialRampToValueAtTime(1, now + start + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      o.connect(g).connect(out);
      o.start(now + start);
      o.stop(now + start + dur + 0.05);
    };
    if (k === "krar") [392, 440, 523, 587, 659].forEach((f, i) => note(f, i * 0.16, 0.9, "triangle"));
    if (k === "masinqo") {
      note(294, 0, 1.4, "sawtooth", 0.25, 6);
      note(330, 1.3, 0.9, "sawtooth", 0.2, 6);
    }
    if (k === "washint") [587, 659, 784, 659].forEach((f, i) => note(f, i * 0.32, 0.36, "sine", 0.06, 8));
    if (k === "kebero") {
      [0, 0.45, 0.7, 1.1].forEach((s) => {
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(140, now + s);
        o.frequency.exponentialRampToValueAtTime(55, now + s + 0.3);
        g.gain.setValueAtTime(1, now + s);
        g.gain.exponentialRampToValueAtTime(0.0001, now + s + 0.4);
        o.connect(g).connect(out);
        o.start(now + s);
        o.stop(now + s + 0.45);
      });
    }
  } catch {
    /* no sound: the pictures and words still teach */
  }
}

const opt = (k: Inst): Option => ({ key: k, label: NAME[k], pic: <Icon k={k} /> });

const ROUNDS: Round[] = [
  {
    prompt: { en: "Which one do you play with a bow?", am: "በቀስት የሚጫወቱት የትኛውን ነው?" },
    right: "masinqo",
    options: [opt("krar"), opt("masinqo"), opt("kebero")],
    why: { en: "The masinqo: one string, a bow, and a long singing note, like a voice.", am: "ማሲንቆ፦ አንድ ክር፣ ቀስት፣ እንደ ድምፅ የሚዘምር ረጅም ዜማ።" },
    scene: (solved) => <Band hi={solved ? "masinqo" : undefined} />,
  },
  {
    prompt: { en: "Which one do you blow?", am: "የሚነፋው የትኛው ነው?" },
    right: "washint",
    options: [opt("washint"), opt("kebero"), opt("masinqo")],
    why: { en: "The washint, a bamboo flute, sounds like a bird in the hills.", am: "ዋሽንት፣ የቀርከሃ ዋሽንት፣ በኮረብታ ላይ እንዳለ ወፍ ይሰማል።" },
    scene: (solved) => <Band hi={solved ? "washint" : undefined} />,
  },
  {
    prompt: { en: "Which one has a round bowl and strings that you pluck?", am: "ክብ ሳጥንና በጣት የሚመቱ ክሮች ያሉት የትኛው ነው?" },
    right: "krar",
    options: [opt("masinqo"), opt("washint"), opt("krar")],
    why: { en: "The krar! Tring, trang, trong.", am: "ክራር! ትሪንግ፣ ትራንግ፣ ትሮንግ።" },
    scene: (solved) => <Band hi={solved ? "krar" : undefined} />,
  },
  {
    prompt: { en: "Which one keeps the beat, like a heart?", am: "እንደ ልብ ምት ምቱን የሚጠብቀው የትኛው ነው?" },
    right: "kebero",
    options: [opt("kebero"), opt("krar"), opt("washint")],
    why: { en: "The kebero, the big drum. Played softly, it holds the whole band together.", am: "ከበሮ፣ ትልቁ ከበሮ። በቀስታ ሲመታ ባንዱን በሙሉ አንድ ያደርጋል።" },
    scene: (solved) => <Band hi={solved ? "kebero" : undefined} />,
  },
];

/** The four instruments in a row on the classroom floor; `hi` lifts and plays one. */
function Band({ hi }: { hi?: Inst }) {
  const xs: Record<Inst, number> = { krar: 70, masinqo: 160, washint: 250, kebero: 330 };
  return (
    <Classroom id="ib">
      {INSTS.map((k) => (
        <g key={k} transform={`translate(${xs[k]} 270) scale(${hi === k ? 1.5 : 1.1})`}>
          {hi === k && <ellipse cx={0} cy={-30} rx={44} ry={50} fill="#FFF3C0" opacity={0.7} />}
          <Pic k={k} play={hi === k} />
        </g>
      ))}
    </Classroom>
  );
}

export default function InstrumentBand({ lang, onDone }: DemoProps) {
  const [heard, setHeard] = useState<Inst[]>([]);
  const [now, setNow] = useState<Inst | null>(null);
  const [quiz, setQuiz] = useState(false);
  if (quiz) {
    return (
      <Rounds
        lang={lang}
        title={{ en: "Meet the Band", am: "ባንዱን ተዋወቁ" }}
        goal={{ en: "Now, which instrument is it?", am: "አሁን፣ የትኛው መሣሪያ ነው?" }}
        rounds={ROUNDS}
        hint={{ en: "Listen again in your head: is it plucked, bowed, blown or beaten?", am: "በአእምሮአችሁ እንደገና አዳምጡ፦ በጣት ነው፣ በቀስት ነው፣ በመንፋት ነው ወይስ በመምታት?" }}
        finale={{ en: "Pluck, bow, beat and blow: you know the whole band!", am: "በጣት መምታት፣ በቀስት መሳብ፣ ከበሮ መምታትና መንፋት፦ ባንዱን በሙሉ ታውቃላችሁ!" }}
        end={<Band hi="kebero" />}
        onDone={onDone}
      />
    );
  }
  const all = heard.length === INSTS.length;
  return (
    <DemoFrame lang={lang} title={{ en: "Meet the Band", am: "ባንዱን ተዋወቁ" }} goal={{ en: "Tap each instrument to hear it and learn how it is played.", am: "እያንዳንዱን መሣሪያ ንኩ፤ ድምፁን ስሙ፤ እንዴት እንደሚጫወቱት ተማሩ።" }} step={heard.length} total={INSTS.length}>
      <Stage label={t(lang, { en: "Four instruments", am: "አራት መሣሪያዎች" })}>
        <Band hi={now ?? undefined} />
      </Stage>
      {now && (
        <motion.div key={now} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Feedback tone="great" action={all ? <Next onClick={() => setQuiz(true)}>{t(lang, { en: "Play the game", am: "ጨዋታውን ተጫወቱ" })}</Next> : undefined}>
            <span className="font-extrabold">{t(lang, NAME[now])}:</span> {t(lang, HOW[now])}
          </Feedback>
        </motion.div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {INSTS.map((k) => (
          <button
            key={k}
            type="button"
            data-inst={k}
            onClick={() => {
              play(k);
              setNow(k);
              setHeard((h) => (h.includes(k) ? h : [...h, k]));
            }}
            className="flex min-h-16 w-full items-center gap-2 rounded-2xl border-2 px-3 py-2 text-left font-display text-lg font-extrabold text-ink transition-transform active:translate-y-0.5"
            style={{ background: now === k ? "#FFF4E0" : heard.includes(k) ? "#E4F7EA" : "#FFFFFF", borderColor: now === k ? "#F5B21E" : heard.includes(k) ? "#2FA35A" : "#D3E4F4" }}
          >
            <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden className="shrink-0">
              <Icon k={k} />
            </svg>
            <span>{t(lang, NAME[k])}</span>
          </button>
        ))}
      </div>
      {!all && <p className="mt-2 text-center text-base text-muted">{t(lang, { en: `Instruments heard: ${heard.length} of 4`, am: `የተሰሙ መሣሪያዎች፦ ${heard.length}/4` })}</p>}
    </DemoFrame>
  );
}
