"use client";

import "./festival-calendar.css";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { Daisy } from "@/components/book/scenery";
import { Demera, GennaStick } from "@/components/book/courses/our-ethiopia/kit-more";
import { FestUmbrella, NewMoon } from "@/components/book/courses/our-ethiopia/kit-culture";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  The Festival Wheel (level 3). The Ethiopian year as a wheel: twelve months of thirty days and
  little Pagume. For each celebration the child taps its month: Enkutatash, New Year, on 1
  Meskerem (11 September); Meskel on 17 Meskerem (27 September); Genna on 29 Tahsas (7 January);
  Timket on 11 Tir (19 January); Ashenda in Nehase, as the Filseta fast ends (around 16 Nehase,
  late August). Each lands as a badge on the wheel. The last round asks about Eid: it follows the
  moon, so it moves round the wheel, about eleven days earlier every year.
  (Dates are for an ordinary year; in the year before a Gregorian leap year some fall a day later.)
*/

export const MONTHS: T[] = [
  { en: "Meskerem", am: "መስከረም" },
  { en: "Tikimt", am: "ጥቅምት" },
  { en: "Hidar", am: "ኅዳር" },
  { en: "Tahsas", am: "ታኅሣሥ" },
  { en: "Tir", am: "ጥር" },
  { en: "Yekatit", am: "የካቲት" },
  { en: "Megabit", am: "መጋቢት" },
  { en: "Miyazya", am: "ሚያዝያ" },
  { en: "Ginbot", am: "ግንቦት" },
  { en: "Sene", am: "ሰኔ" },
  { en: "Hamle", am: "ሐምሌ" },
  { en: "Nehase", am: "ነሐሴ" },
  { en: "Pagume", am: "ጳጉሜ" },
];

const CX = 200;
const CY = 150;
const R = 128;
const PAG = 10; // degrees for little Pagume
const BIG = (360 - PAG) / 12;
const startOf = (m: number) => -90 + (m < 12 ? m * BIG : 12 * BIG);
const spanOf = (m: number) => (m < 12 ? BIG : PAG);
const r1 = (n: number) => Math.round(n * 10) / 10;
const pt = (deg: number, r: number): [number, number] => [r1(CX + Math.cos((deg * Math.PI) / 180) * r), r1(CY + Math.sin((deg * Math.PI) / 180) * r)];
const COLORS = ["#FFE9A0", "#FFDCA8", "#FFE9A0", "#FFDCA8", "#FFE9A0", "#FFDCA8", "#FFE9A0", "#FFDCA8", "#FFE9A0", "#FFDCA8", "#FFE9A0", "#FFDCA8", "#F5B21E"];

type Fest = { key: string; name: T; when: T; month: number; icon: ReactNode };

const FESTS: Fest[] = [
  { key: "enkutatash", name: { en: "Enkutatash, New Year", am: "እንቁጣጣሽ፣ አዲስ ዓመት" }, when: { en: "New Year is on 1 Meskerem (11 September), as the rains end and the yellow daisies bloom.", am: "አዲስ ዓመት መስከረም 1 ነው፤ ዝናቡ ሲያልቅና ቢጫ አደይ አበባ ሲፈካ።" }, month: 0, icon: <Daisy x={0} y={10} h={14} s={1.2} /> },
  { key: "meskel", name: { en: "Meskel", am: "መስቀል" }, when: { en: "Meskel is on 17 Meskerem (27 September); the Demera bonfire is lit the evening before.", am: "መስቀል መስከረም 17 ነው፤ ደመራው በዋዜማው ምሽት ይለኮሳል።" }, month: 0, icon: <g transform="translate(0 16) scale(0.18)"><Demera x={0} y={0} lit /></g> },
  { key: "genna", name: { en: "Genna (Christmas)", am: "ገና" }, when: { en: "Genna is on 29 Tahsas (7 January), with church at night, the genna game and a feast.", am: "ገና ታኅሣሥ 29 ነው፤ በሌሊት ቤተ ክርስቲያን፣ የገና ጨዋታና ግብዣ አለው።" }, month: 3, icon: <g transform="translate(-4 10) scale(0.5)"><GennaStick ball /></g> },
  { key: "timket", name: { en: "Timket", am: "ጥምቀት" }, when: { en: "Timket is on 11 Tir (19 January): processions to the water, umbrellas, and a blessing with water.", am: "ጥምቀት ጥር 11 ነው፦ ወደ ውሃ የሚደረግ ሰልፍ፣ ጃንጥላዎችና በውሃ መባረክ።" }, month: 4, icon: <g transform="translate(0 -6) scale(0.4)"><FestUmbrella x={0} y={0} /></g> },
  { key: "ashenda", name: { en: "Ashenda", am: "አሸንዳ" }, when: { en: "Ashenda comes in Nehase, in late August, when girls in the north sing door to door in grass skirts.", am: "አሸንዳ በነሐሴ ይመጣል፤ በሰሜን ልጃገረዶች የሣር ቀሚስ ለብሰው ከቤት ወደ ቤት ሲዘፍኑ።" }, month: 11, icon: <g>{[-6, -2, 2, 6].map((dx) => <path key={dx} d={`M${dx} -6 l${dx * 0.4} 14`} stroke="#9AB82E" strokeWidth={2.4} strokeLinecap="round" />)}<path d="M-8 -6 H8" stroke="#E2463F" strokeWidth={3} /></g> },
];

function Wheel({ placed, onTap, glow }: { placed: Fest[]; onTap?: (m: number) => void; glow?: number | null }) {
  return (
    <g>
      {MONTHS.map((_, m) => {
        const a0 = startOf(m);
        const a1 = a0 + spanOf(m);
        const [x0, y0] = pt(a0, R);
        const [x1, y1] = pt(a1, R);
        const [i0, j0] = pt(a0, 44);
        const [i1, j1] = pt(a1, 44);
        const d = `M${i0} ${j0} L${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${i1} ${j1} A44 44 0 0 0 ${i0} ${j0}Z`;
        return (
          <path
            key={m}
            d={d}
            data-month={m}
            fill={glow === m ? "#A8E6B8" : COLORS[m]}
            stroke="#FFFFFF"
            strokeWidth={2}
            style={{ cursor: onTap ? "pointer" : undefined }}
            onClick={onTap ? () => onTap(m) : undefined}
          />
        );
      })}
      <circle cx={CX} cy={CY} r={44} fill="#FFFFFF" stroke="#F5B21E" strokeWidth={3} />
      {placed.map((f, k) => {
        const same = placed.filter((p) => p.month === f.month).indexOf(f);
        const [x, y] = pt(startOf(f.month) + spanOf(f.month) / 2 + (same ? 8 : 0), R - 26 - same * 6);
        return (
          <g key={f.key} transform={`translate(${x} ${y})`} pointerEvents="none" data-badge={k}>
            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 12 }}>
              <circle r={15} fill="#FFFFFF" stroke="#15803D" strokeWidth={2} />
              {f.icon}
            </motion.g>
          </g>
        );
      })}
    </g>
  );
}

function Labels({ lang }: { lang: "en" | "am" }) {
  return (
    <g pointerEvents="none">
      {MONTHS.map((m, i) => {
        const [x, y] = pt(startOf(i) + spanOf(i) / 2, i === 12 ? R + 12 : R - 52);
        return (
          <text key={i} x={x} y={y + 3} textAnchor="middle" fontSize={i === 12 ? 8 : 9.5} fontWeight={800} fill="#5A3A20" fontFamily={lang === "am" ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"}>
            {t(lang, m)}
          </text>
        );
      })}
    </g>
  );
}

export default function FestivalCalendar({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [tap, setTap] = useState<number | null>(null);
  const [placed, setPlaced] = useState<Fest[]>([]);
  const [eid, setEid] = useState<"moves" | "same" | null>(null);
  const [finished, setFinished] = useState(false);
  const inWheel = i < FESTS.length;
  const f = FESTS[Math.min(i, FESTS.length - 1)];
  const right = tap === f.month;

  const onTap = (m: number) => {
    if (!inWheel || tap !== null) return;
    setTap(m);
    if (m === f.month) {
      sound.good();
      setPlaced((p) => [...p, f]);
    } else sound.gentle();
  };

  return (
    <DemoFrame lang={lang} title={{ en: "The Festival Wheel", am: "የበዓላት መንኮራኩር" }} goal={{ en: "Thirteen months go round: tap the month of each celebration.", am: "አሥራ ሦስት ወራት ይዞራሉ፦ የእያንዳንዱን በዓል ወር ንኩ።" }} step={i} total={FESTS.length + 1} color="#15803D">
      <Stage label={t(lang, { en: "The thirteen months of the Ethiopian year", am: "የኢትዮጵያ ዓመት አሥራ ሦስቱ ወራት" })}>
        <rect width={400} height={300} fill="#FFF8E8" />
        <Wheel placed={placed} onTap={inWheel ? onTap : undefined} glow={tap !== null && right ? f.month : null} />
        <Labels lang={lang} />
        {!inWheel && (
          <g className={eid === "moves" ? "fc-moon" : undefined}>
            <NewMoon x={CX} y={CY - R + 20} s={0.9} />
          </g>
        )}
        <g pointerEvents="none">
          <text x={CX} y={CY + 5} textAnchor="middle" fontSize={13} fontWeight={900} fill="#15803D" fontFamily={lang === "am" ? "var(--font-noto-ethiopic), sans-serif" : "var(--font-grandstander), sans-serif"}>
            {t(lang, { en: "13 months", am: "13 ወራት" })}
          </text>
        </g>
      </Stage>
      {finished ? (
        <Finale lang={lang} text={{ en: "Thirteen months, full of celebrations!", am: "በበዓላት የተሞሉ አሥራ ሦስት ወራት!" }} onDone={onDone} color="#15803D" />
      ) : inWheel ? (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">
            {t(lang, { en: "When is ", am: "" })}
            {t(lang, f.name)}
            {t(lang, { en: "?", am: " መቼ ነው?" })}
          </p>
          {tap === null ? (
            <p className="mt-1 text-lg text-muted">{t(lang, { en: "Tap its month on the wheel.", am: "ወሩን በመንኮራኩሩ ላይ ንኩ።" })}</p>
          ) : right ? (
            <Feedback
              tone="great"
              action={
                <Next
                  color="#15803D"
                  onClick={() => {
                    setI((n) => n + 1);
                    setTap(null);
                  }}
                >
                  {t(lang, { en: "Next", am: "ቀጣይ" })}
                </Next>
              }
            >
              {t(lang, f.when)}
            </Feedback>
          ) : (
            <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setTap(null)}>{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
              {t(lang, { en: "Not that month. ", am: "ያ ወር አይደለም። " })}
              {t(lang, MONTHS[tap])}
              {t(lang, { en: " is a different time of year. Think: did it come before or after New Year?", am: " ሌላ የዓመቱ ጊዜ ነው። አስቡ፦ ከአዲስ ዓመት በፊት ነው ወይስ በኋላ?" })}
            </Feedback>
          )}
        </>
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, { en: "And Eid? Eid al-Fitr and Arefa follow the moon. Does Eid come in the same month every year?", am: "ዒድስ? ዒድ አል-ፈጥርና ዓረፋ ጨረቃን ይከተላሉ። ዒድ በየዓመቱ በአንድ ወር ይመጣል?" })}</p>
          {eid === "moves" ? (
            <Feedback tone="great" action={<Next color="#15803D" onClick={() => setFinished(true)}>{t(lang, { en: "Finish", am: "ጨርሱ" })}</Next>}>
              {t(lang, { en: "Yes, it moves! Eid follows the moon, so it comes about eleven days earlier every year, travelling all round the wheel.", am: "አዎ፣ ይንቀሳቀሳል! ዒድ ጨረቃን ስለሚከተል በየዓመቱ ወደ አሥራ አንድ ቀን ገደማ ቀድሞ ይመጣል፤ መንኮራኩሩን ሁሉ ይዞራል።" })}
            </Feedback>
          ) : eid === "same" ? (
            <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setEid(null)}>{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
              {t(lang, { en: "Remember Ayan waiting for the new moon. The moon's months are a little shorter than ours.", am: "አያን አዲሷን ጨረቃ ስትጠብቅ አስታውሱ። የጨረቃ ወራት ከእኛ ወራት ትንሽ ያጥራሉ።" })}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3">
              <Choice onClick={() => { setEid("same"); sound.gentle(); }}>{t(lang, { en: "Yes, always the same month", am: "አዎ፣ ሁልጊዜ በአንድ ወር" })}</Choice>
              <Choice onClick={() => { setEid("moves"); sound.good(); }}>{t(lang, { en: "No, it moves a little earlier every year", am: "አይ፣ በየዓመቱ ትንሽ ቀድሞ ይንቀሳቀሳል" })}</Choice>
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
