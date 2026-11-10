"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import type { DemoProps } from "../../types";
import { DISPLAY, Frame, Hear, Note, say, sfx, t, type T } from "./kit";

/*
  "The Color Pot" (level 2): three paint pots, red, yellow and blue, and Lali's big mixing pot.
  First the child finds each color by its English name ("Tap the RED pot!"). Then the mixing:
  "Make ORANGE!" Pour two colors into the big pot and stir; the paint turns the new color and the
  voice says "Red and yellow make orange!". Wrong mixes are fun too: the pot shows what they make
  and names it, then empties for another try. Red + yellow = orange, yellow + blue = green,
  red + blue = purple: the real mixes of paint (the subtractive primaries children learn).
*/

type Base = "red" | "yellow" | "blue";
const BASE: Record<Base, string> = { red: "#E8413B", yellow: "#FFD233", blue: "#2F6FD0" };
const MIX: Record<string, { word: string; hex: string; am: string }> = {
  "red+yellow": { word: "orange", hex: "#F08A24", am: "ብርቱካናማ" },
  "blue+yellow": { word: "green", hex: "#2FA35A", am: "አረንጓዴ" },
  "blue+red": { word: "purple", hex: "#8E5BE0", am: "ወይን ጠጅ" },
};
const AM_BASE: Record<Base, string> = { red: "ቀይ", yellow: "ቢጫ", blue: "ሰማያዊ" };
const keyOf = (a: Base, b: Base) => [a, b].sort().join("+");

type Step = { kind: "find"; color: Base } | { kind: "mix"; want: string };
const STEPS: Step[] = [
  { kind: "find", color: "red" },
  { kind: "find", color: "blue" },
  { kind: "find", color: "yellow" },
  { kind: "mix", want: "orange" },
  { kind: "mix", want: "green" },
  { kind: "mix", want: "purple" },
];

/** A paint pot as a button. */
function Pot({ color, onClick, glow }: { color: Base; onClick: () => void; glow: boolean }) {
  return (
    <button type="button" data-pot={color} onClick={onClick} aria-label={color} className="flex flex-col items-center gap-1 rounded-2xl p-1 transition active:translate-y-0.5">
      <motion.svg viewBox="-40 -44 80 84" width={84} height={88} animate={{ scale: glow ? [1, 1.12, 1] : 1 }} transition={{ duration: 0.5 }}>
        <path d="M-30 -20 H30 L24 34 H-24Z" fill="#fff" stroke="#2A1A10" strokeWidth={2.4} strokeLinejoin="round" />
        <path d="M-29 -8 H29 L24 34 H-24Z" fill={BASE[color]} />
        <path d="M-29 -8 Q-20 4 -12 -8 Q-4 8 4 -8 Q12 4 20 -8 Q26 2 29 -8" fill={BASE[color]} />
        <path d="M-30 -20 H30 L24 34 H-24Z" fill="none" stroke="#2A1A10" strokeWidth={2.4} strokeLinejoin="round" />
        <path d="M-34 -26 Q0 -48 34 -26" stroke="#2A1A10" strokeWidth={2.4} fill="none" />
      </motion.svg>
      <span className="text-lg font-black" style={DISPLAY} lang="en">
        {color}
      </span>
    </button>
  );
}

export default function ColorPot({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [got, setGot] = useState(0);
  const [poured, setPoured] = useState<Base[]>([]);
  const [glow, setGlow] = useState<Base | null>(null);
  const [msg, setMsg] = useState<{ tone: "good" | "try"; text: T } | null>(null);
  const [locked, setLocked] = useState(false);
  const done = i >= STEPS.length;
  const step = STEPS[Math.min(i, STEPS.length - 1)];
  const prompt = step.kind === "find" ? `Tap the ${step.color} pot!` : `Make ${step.want}!`;

  useEffect(() => {
    if (!done) say(prompt);
  }, [prompt, done]);

  const advance = () => {
    setLocked(true);
    setTimeout(() => {
      setI((n) => n + 1);
      setPoured([]);
      setMsg(null);
      setGlow(null);
      setLocked(false);
    }, 1800);
  };

  const tap = (c: Base) => {
    if (locked) return;
    setGlow(c);
    if (step.kind === "find") {
      say(c);
      if (c === step.color) {
        sfx.good();
        setGot((g) => g + 1);
        setMsg({ tone: "good", text: { en: `Yes! ${c}!`, am: `ጎበዝ! ${c} ማለት ${AM_BASE[c]} ነው!` } });
        advance();
      } else {
        sfx.oops();
        setMsg({ tone: "try", text: { en: `That one is ${c}. Find ${step.color}!`, am: `ያ ${c} (${AM_BASE[c]}) ነው። ${step.color}ን ፈልጉ!` } });
      }
      return;
    }
    // mixing: pour two different colors
    sfx.tap();
    if (poured.length === 0 || (poured.length === 1 && poured[0] === c)) {
      setPoured([c]);
      say(c);
      return;
    }
    const pair: Base[] = [poured[0], c];
    setPoured(pair);
    const made = MIX[keyOf(pair[0], pair[1])];
    const line = `${pair[0][0].toUpperCase()}${pair[0].slice(1)} and ${pair[1]} make ${made.word}!`;
    say(line);
    if (made.word === step.want) {
      sfx.good();
      setGot((g) => g + 1);
      setMsg({ tone: "good", text: { en: line, am: `${line} (${AM_BASE[pair[0]]}ና ${AM_BASE[pair[1]]} ${made.am} ያደርጋሉ!)` } });
      advance();
    } else {
      sfx.oops();
      setLocked(true);
      setMsg({ tone: "try", text: { en: `${line} But we want ${step.want}. Try again!`, am: `${line} እኛ ግን ${step.want} እንፈልጋለን። እንደገና ሞክሩ!` } });
      setTimeout(() => {
        setPoured([]);
        setLocked(false);
      }, 2200);
    }
  };

  const potColor = poured.length === 2 ? MIX[keyOf(poured[0], poured[1])].hex : poured.length === 1 ? BASE[poured[0]] : "#F3EBDD";
  const wantHex = step.kind === "mix" ? Object.values(MIX).find((m) => m.word === step.want)?.hex : undefined;

  return (
    <Frame
      lang={lang}
      title={{ en: "The Color Pot", am: "የቀለም ድስት" }}
      howTo={{ en: "Listen and tap the paint. Then mix two colors in Lali's big pot!", am: "አዳምጡና ቀለሙን ንኩ። ከዚያ በላሊ ትልቅ ድስት ውስጥ ሁለት ቀለሞችን ቀላቅሉ!" }}
      total={STEPS.length}
      got={got}
      done={done}
      onDone={onDone}
      color="#8E5BE0"
      onAgain={() => {
        setI(0);
        setGot(0);
        setPoured([]);
        setMsg(null);
      }}
      ending={
        <p className="text-xl" style={DISPLAY} lang="en">
          red + yellow = orange · yellow + blue = green · red + blue = purple
        </p>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <span className="rounded-2xl border-2 bg-white px-4 py-1.5 text-2xl font-black" style={{ ...DISPLAY, borderColor: wantHex ?? (step.kind === "find" ? BASE[step.color] : "#8E5BE0"), color: wantHex ?? (step.kind === "find" ? BASE[step.color] : "#8E5BE0") }} lang="en">
          {prompt}
        </span>
        <Hear text={prompt} lang={lang} color="#8E5BE0" />
      </div>
      {lang === "am" && (
        <p className="mt-1 text-center text-base text-[#5B4636]">
          {step.kind === "find" ? `${step.color} ማለት ${AM_BASE[step.color]} ማለት ነው።` : `${step.want} ማለት ${Object.values(MIX).find((m) => m.word === step.want)?.am} ማለት ነው። ሁለት ቀለሞችን ቀላቅሉ።`}
        </p>
      )}
      <div className="mt-3 flex justify-center">
        <svg viewBox="-80 -70 160 120" width={220} height={165} aria-hidden>
          <ellipse cx={0} cy={42} rx={66} ry={8} fill="#000" opacity={0.12} />
          <path d="M-64 -24 Q-64 44 0 44 Q64 44 64 -24Z" fill="#6E4A30" />
          <ellipse cx={0} cy={-24} rx={64} ry={16} fill="#8A5A3A" />
          <motion.ellipse cx={0} cy={-22} rx={56} ry={12} animate={{ fill: potColor }} transition={{ duration: 0.8 }} />
          {poured.length > 0 && (
            <motion.path d="M-30 -24 Q0 -10 30 -24" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} fill="none" animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
          )}
          <path d="M40 -60 L14 -20" stroke="#9C6A3A" strokeWidth={6} strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-2 flex justify-center gap-2 sm:gap-4">
        {(["red", "yellow", "blue"] as Base[]).map((c) => (
          <Pot key={c} color={c} glow={glow === c} onClick={() => tap(c)} />
        ))}
      </div>
      {msg ? <Note tone={msg.tone}>{t(lang, msg.text)}</Note> : <Note tone="plain">{t(lang, step.kind === "find" ? { en: "Which pot is it?", am: "የትኛው ድስት ነው?" } : { en: "Tap one pot, then another.", am: "አንዱን ድስት ንኩ፤ ከዚያ ሌላውን።" })}</Note>}
    </Frame>
  );
}
