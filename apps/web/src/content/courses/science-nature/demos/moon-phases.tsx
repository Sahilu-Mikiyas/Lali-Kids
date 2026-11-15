"use client";

import { MoonPhase } from "@/components/book/courses/science-nature/kit-sky";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./rounds-kit";

/*
  Ayan's Moon Diary (level 5: Moon phases and calendars). Tap the Moon's shapes in the order we see
  them over about a month: dark new moon, thin crescent, half moon, full moon, half again (lit on the
  other side), and back to a thin crescent. Each lands in the diary row. The Moon doesn't change
  shape: we see different amounts of its sunlit half.
*/

const PH = [0, 1, 2, 4, 6, 7];

const STEPS: Step[] = [
  { key: "new", label: { en: "New moon: dark", am: "አዲስ ጨረቃ፦ ጨለማ" }, fact: { en: "The sunlit side faces away from us, so we hardly see the Moon at all.", am: "በፀሐይ የበራው ጎኗ ከእኛ ዞሯል፤ ስለዚህ ጨረቃን ብዙም አናያትም።" }, pic: <MoonPhase x={22} y={22} r={16} phase={0} glow={false} /> },
  { key: "thin", label: { en: "A thin crescent", am: "ቀጭን ጨረቃ" }, fact: { en: "A few days later, a thin bright curve appears in the evening sky.", am: "ከጥቂት ቀናት በኋላ ቀጭን ብሩህ ጥምዝ በምሽት ሰማይ ላይ ይታያል።" }, pic: <MoonPhase x={22} y={22} r={16} phase={1} glow={false} /> },
  { key: "half", label: { en: "Half moon", am: "ግማሽ ጨረቃ" }, fact: { en: "About a week after the new moon, we see half of it lit.", am: "ከአዲሷ ጨረቃ ከሳምንት ገደማ በኋላ ግማሿ በርቶ እናያለን።" }, pic: <MoonPhase x={22} y={22} r={16} phase={2} glow={false} /> },
  { key: "full", label: { en: "Full moon", am: "ሙሉ ጨረቃ" }, fact: { en: "About two weeks in, the whole sunlit side faces us: a round, bright moon.", am: "ከሁለት ሳምንት ገደማ በኋላ በፀሐይ የበራው ሙሉ ጎኗ ወደ እኛ ይዞራል፦ ክብና ብሩህ ጨረቃ።" }, pic: <MoonPhase x={22} y={22} r={16} phase={4} glow={false} /> },
  { key: "half2", label: { en: "Half again, the other side", am: "እንደገና ግማሽ፣ በሌላኛው ጎን" }, fact: { en: "Now it gets smaller each night, lit on the other side.", am: "አሁን በየሌሊቱ እያነሰች ትሄዳለች፤ በሌላኛው ጎን በርታ።" }, pic: <MoonPhase x={22} y={22} r={16} phase={6} glow={false} /> },
  { key: "thin2", label: { en: "A thin crescent again", am: "እንደገና ቀጭን ጨረቃ" }, fact: { en: "Then dark again, and a new month begins: about 29 and a half days.", am: "ከዚያ እንደገና ትጨልማለች፤ አዲስ ወርም ይጀምራል፦ ወደ 29 ቀን ተኩል ገደማ።" }, pic: <MoonPhase x={22} y={22} r={16} phase={7} glow={false} /> },
];

/** The diary: a night sky with six spots in a row, filled as the shapes are placed. */
function Diary({ placed }: { placed: number }) {
  return (
    <g>
      <rect width={400} height={300} fill="#141A4A" />
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={(i * 67) % 400} cy={(i * 29) % 120} r={1.1} fill="#FFFFFF" opacity={0.6} />
      ))}
      <rect x={20} y={150} width={360} height={110} rx={12} fill="#F4F0E0" />
      {PH.map((p, i) => (
        <g key={i}>
          <circle cx={50 + i * 60} cy={205} r={24} fill="none" stroke="#C9C0A8" strokeWidth={2} strokeDasharray="4 4" />
          {i < placed && <MoonPhase x={50 + i * 60} y={205} r={22} phase={p} glow={false} />}
        </g>
      ))}
      {placed > 0 && <MoonPhase x={200} y={70} r={40} phase={PH[placed - 1]} />}
    </g>
  );
}

export default function MoonPhases({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "The Moon Diary", am: "የጨረቃ ማስታወሻ" }}
      goal={{ en: "Put the Moon's shapes in order, from one new moon to the next.", am: "የጨረቃን ቅርጾች ከአንድ አዲስ ጨረቃ እስከ ቀጣዩ በቅደም ተከተል አስቀምጡ።" }}
      steps={STEPS}
      pile={["full", "thin2", "new", "half2", "thin", "half"]}
      hint={{ en: "Not yet. It grows first: thin, then half, then round. Then it shrinks.", am: "ገና ነው። መጀመሪያ ታድጋለች፦ ቀጭን፣ ከዚያ ግማሽ፣ ከዚያ ክብ። ከዚያ ታንሳለች።" }}
      finale={{ en: "Thin, then half, then round, and back again!", am: "ቀጭን፣ ግማሽ፣ ሙሉ፣ ደግሞም ይመለሳል!" }}
      stage={(placed) => <Diary placed={placed} />}
      onDone={onDone}
    />
  );
}
