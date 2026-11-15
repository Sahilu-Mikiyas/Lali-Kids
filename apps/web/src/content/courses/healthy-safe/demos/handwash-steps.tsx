"use client";

import { useRef, useState } from "react";

import { BigHand, Bubbles, Drops, Glint, Scrubber, SoapBar, Towel, type HandZone } from "@/components/book/courses/healthy-safe/kit-health";
import { WashSet } from "@/components/book/courses/healthy-safe/kit-props";
import type { DemoProps } from "../../types";
import { DemoFrame, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  The Six-Step Handwash (level 1), from "Gugu's Soapy Song". Wet the hands, soap, then the six
  scrubbing steps of the WHO handwashing technique (palm to palm, the backs of the hands, in
  between the fingers, the backs of the fingers, round each thumb, fingertips and nails), then
  rinse and dry on a clean cloth. On each scrubbing step the place to scrub glows; the child rubs
  the picture with a finger (or the mouse) or taps "Scrub!" until the bubbles are done. The song
  bar fills across the six steps: the whole scrub lasts about as long as a little song sung
  twice (about 20 seconds when done for real).
*/

const COLOR = "#2F8FD0";

type Kind = "wet" | "soap" | "scrub" | "rinse" | "dry";
type StepDef = { kind: Kind; label: T; tip: T; view?: "palm" | "back"; zone?: HandZone; at?: [number, number]; button: T };

const SCRUB: T = { en: "Scrub!", am: "ፈግፍጉ!" };

const STEPS: StepDef[] = [
  { kind: "wet", label: { en: "Wet your hands with clean water", am: "እጃችሁን በንጹሕ ውሃ አርጥቡ" }, tip: { en: "Tap the jug to pour.", am: "ለማፍሰስ ማስታጠቢያውን ንኩ።" }, button: { en: "Pour water", am: "ውሃ አፍስሱ" } },
  { kind: "soap", label: { en: "Rub on the soap", am: "ሳሙና ቀቡ" }, tip: { en: "Water alone can't chase the germs out. Soap can!", am: "ውሃ ብቻውን ጀርሞችን አያስወጣም። ሳሙና ግን ይችላል!" }, button: { en: "Use the soap", am: "ሳሙና ተጠቀሙ" } },
  { kind: "scrub", view: "palm", zone: "palm", at: [200, 196], label: { en: "1. Palm to palm", am: "1. መዳፍ ከመዳፍ" }, tip: { en: "Rub round and round.", am: "ዙሪያ ዙሪያ እሹ።" }, button: SCRUB },
  { kind: "scrub", view: "back", zone: "back", at: [200, 196], label: { en: "2. The backs of your hands", am: "2. የእጅ ጀርባ" }, tip: { en: "One hand over the other, then swap.", am: "አንዱን እጅ በሌላው ላይ፣ ከዚያ ቀያይሩ።" }, button: SCRUB },
  { kind: "scrub", view: "palm", zone: "between", at: [200, 126], label: { en: "3. In between the fingers", am: "3. በጣቶች መካከል" }, tip: { en: "Lace your fingers like a little fence.", am: "ጣቶቻችሁን እንደ ትንሽ አጥር አጠላልፉ።" }, button: SCRUB },
  { kind: "scrub", view: "back", zone: "knuckles", at: [200, 146], label: { en: "4. The backs of the fingers", am: "4. የጣቶች ጀርባ" }, tip: { en: "Curl your fingers and rub them in the other palm.", am: "ጣቶቻችሁን አጥፋችሁ በሌላው መዳፍ ውስጥ እሹ።" }, button: SCRUB },
  { kind: "scrub", view: "palm", zone: "thumb", at: [152, 206], label: { en: "5. Round each thumb", am: "5. አውራ ጣቶችን ዙሪያቸውን" }, tip: { en: "Hold the thumb and twist round it.", am: "አውራ ጣቱን ይዛችሁ ዙሪያውን አሽከርክሩ።" }, button: SCRUB },
  { kind: "scrub", view: "palm", zone: "tips", at: [200, 110], label: { en: "6. Fingertips and nails", am: "6. የጣት ጫፎችና ጥፍሮች" }, tip: { en: "Scratch them on the other palm, so nothing hides under the nails.", am: "ከጥፍር ሥር ምንም እንዳይደበቅ በሌላው መዳፍ ላይ ፈግፍጉ።" }, button: SCRUB },
  { kind: "rinse", label: { en: "Rinse off the bubbles", am: "አረፋውን አለቅልቁ" }, tip: { en: "The germs slide away with the bubbles.", am: "ጀርሞቹ ከአረፋው ጋር ታጥበው ይሄዳሉ።" }, button: { en: "Pour water", am: "ውሃ አፍስሱ" } },
  { kind: "dry", label: { en: "Dry on a clean cloth", am: "በንጹሕ ጨርቅ አድርቁ" }, tip: { en: "Clean hands, all done!", am: "ንጹሕ እጆች፣ ተጠናቀቀ!" }, button: { en: "Dry my hands", am: "እጄን አድርቅ" } },
];

const NEED = 100;

export default function HandwashSteps({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [rub, setRub] = useState(0);
  const last = useRef<{ x: number; y: number } | null>(null);
  // The rubbing so far on this step, kept in a ref too so quick pointer moves never advance twice.
  const rubRef = useRef(0);
  const s = STEPS[Math.min(i, STEPS.length - 1)];
  const scrubsDone = Math.max(0, Math.min(6, i - 2)) + (s.kind === "scrub" ? Math.min(1, rub / NEED) : 0);
  const done = i >= STEPS.length;

  const advance = () => {
    sound.good();
    rubRef.current = 0;
    setI((n) => n + 1);
    setRub(0);
  };
  const addRub = (n: number) => {
    if (s.kind !== "scrub" || done || rubRef.current >= NEED) return;
    rubRef.current = Math.min(NEED, rubRef.current + n);
    setRub(rubRef.current);
    if (rubRef.current >= NEED) window.setTimeout(advance, 450);
  };
  const press = () => {
    if (s.kind === "scrub") {
      sound.tap();
      addRub(34);
    } else advance();
  };

  return (
    <DemoFrame lang={lang} title={{ en: "The Six-Step Handwash", am: "ስድስቱ የእጅ መታጠቢያ ደረጃዎች" }} goal={{ en: "Wet, soap, scrub every hiding place, rinse and dry.", am: "አርጥቡ፣ ሳሙና ቀቡ፣ ሁሉንም መደበቂያ ፈግፍጉ፣ አለቅልቁ፣ አድርቁ።" }} step={Math.min(i, STEPS.length)} total={STEPS.length} color={COLOR}>
      <div
        onPointerDown={(e) => {
          last.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!last.current || s.kind !== "scrub") return;
          const d = Math.hypot(e.clientX - last.current.x, e.clientY - last.current.y);
          if (d > 12) {
            last.current = { x: e.clientX, y: e.clientY };
            addRub(4);
          }
        }}
        onPointerUp={() => {
          last.current = null;
        }}
        onPointerLeave={() => {
          last.current = null;
        }}
        style={{ touchAction: s.kind === "scrub" ? "none" : "auto" }}
      >
        <Stage label={t(lang, s.label)}>
          <defs>
            <radialGradient id="hw-bg" cx="0.5" cy="0.45" r="0.7">
              <stop offset="0" stopColor="#E4F6FF" />
              <stop offset="1" stopColor="#B8E0F4" />
            </radialGradient>
          </defs>
          <rect width={400} height={300} fill="url(#hw-bg)" />
          <path d="M-10 280 Q200 262 410 280 L410 310 L-10 310Z" fill="#C9C2B4" />
          {done ? (
            <g>
              <BigHand x={200} y={290} s={1.7} view="palm" />
              <Glint x={170} y={140} s={1.6} />
              <Glint x={230} y={190} s={1.2} delay={0.8} />
              <Glint x={190} y={230} s={1.4} delay={1.6} />
            </g>
          ) : (
            <g>
              <BigHand x={200} y={290} s={1.7} view={s.view ?? "back"} zone={s.kind === "scrub" ? s.zone : "none"} clay={i < 2} foam={s.kind === "scrub" && rub > 30} />
              {s.kind === "scrub" && s.at && <Scrubber x={s.at[0]} y={s.at[1]} s={1.1} />}
              {s.kind === "scrub" && rub > 0 && <Bubbles x={200} y={150} n={Math.min(9, 2 + Math.floor(rub / 12))} spread={110} seed={i} />}
              {(s.kind === "wet" || s.kind === "rinse") && (
                <g>
                  <WashSet x={290} y={120} s={1.8} pour />
                  <Drops x={230} y={150} n={5} w={50} fall={70} />
                </g>
              )}
              {s.kind === "soap" && <SoapBar x={300} y={250} s={2.2} foam />}
              {s.kind === "dry" && <Towel x={310} y={240} s={2.4} />}
            </g>
          )}
          {/* the song bar: fills across the six scrubbing steps */}
          <g transform="translate(40 22)">
            <rect x={0} y={0} width={320} height={12} rx={6} fill="#FFFFFF" opacity={0.85} />
            <rect x={0} y={0} width={Math.round((320 * scrubsDone) / 6)} height={12} rx={6} fill="#2F8FD0" />
            <g transform={`translate(${Math.round((320 * scrubsDone) / 6)} 6)`}>
              <circle r={10} fill="#FFD233" stroke="#E8A800" strokeWidth={1.4} />
              <path d="M-2 4 V-5 L4 -6 V2" stroke="#5A3410" strokeWidth={1.6} fill="none" />
              <circle cx={-3.5} cy={4} r={2} fill="#5A3410" />
              <circle cx={2.5} cy={2.5} r={2} fill="#5A3410" />
            </g>
          </g>
        </Stage>
      </div>
      {done ? (
        <Finale
          lang={lang}
          text={{ en: "Sparkling clean hands!", am: "የሚያበሩ ንጹሕ እጆች!" }}
          onDone={onDone}
          color={COLOR}
        >
          <p className="mt-2 text-lg leading-snug text-ink">
            {t(lang, { en: "Wash like this before eating, after the toilet, after playing outside or with animals, and after a sneeze.", am: "እንዲህ የምንታጠበው ከመብላት በፊት፣ ከመጸዳጃ በኋላ፣ ውጭ ወይም ከእንስሳት ጋር ከተጫወትን በኋላና ካስነጠሰን በኋላ ነው።" })}
          </p>
        </Finale>
      ) : (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, s.label)}</p>
          <p className="mt-1 text-lg leading-snug text-muted">{t(lang, s.tip)}</p>
          {s.kind === "scrub" && (
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#D3E4F4]" aria-hidden>
              <div className="h-full rounded-full transition-[width]" style={{ width: `${Math.min(100, rub)}%`, background: COLOR }} />
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            <Next onClick={press} color={s.kind === "scrub" ? "#2FA35A" : COLOR}>
              {t(lang, s.button)}
            </Next>
          </div>
          {s.kind === "scrub" && <p className="mt-2 text-base text-muted">{t(lang, { en: "Or rub the picture with your finger!", am: "ወይም ሥዕሉን በጣታችሁ እሹ!" })}</p>}
        </div>
      )}
    </DemoFrame>
  );
}
