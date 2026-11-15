"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { SkyFor } from "@/components/book/courses/our-ethiopia/kit-places";
import { Castle, CityGate, Flag, Mosque, Stela } from "@/components/book/courses/our-ethiopia/kit-past";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./rounds-kit";

/*
  The Story Ribbon (level 4). Six moments from long ago, to put in order on a ribbon of time,
  oldest first: the tall stones of Aksum (about 1,700 years ago); the king of Aksum welcomes the
  Prophet's companions, and Negash (about 1,400 years ago, around 615); the rock churches of
  Lalibela (about 800 years ago); the wall and gates of Harar (about 470 years ago, the 1550s);
  the castles of Gondar (about 390 years ago, from the 1630s); the victory of Adwa (1896, about
  130 years ago). Round numbers only: the point is the order, and that they are all ours.
*/

/** A rock church seen from above: a cross carved down into the rock. */
function RockCross({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <rect x={-22} y={-22} width={44} height={44} rx={4} fill="#7A4A30" />
      <path d="M-6 -18 H6 V-6 H18 V6 H6 V18 H-6 V6 H-18 V-6 H-6Z" fill="#C9805A" />
      <path d="M-4 -14 H4 V-4 H14 V4 H4 V14 H-4 V4 H-14 V-4 H-4Z" fill="none" stroke="#E0A07A" strokeWidth={1.4} />
    </g>
  );
}

const PIC: Record<string, ReactNode> = {
  aksum: <Stela x={0} y={22} h={40} w={14} />,
  hijra: <Mosque x={0} y={16} s={0.3} />,
  lalibela: <RockCross s={0.7} />,
  harar: <CityGate x={0} y={18} s={0.24} w={120} />,
  gondar: <Castle x={0} y={18} s={0.22} />,
  adwa: <Flag x={-4} y={20} s={0.5} />,
};

const STEPS: Step[] = [
  {
    key: "aksum",
    label: { en: "Aksum's tall stones", am: "የአክሱም ረጃጅም ሐውልቶች" },
    fact: { en: "About 1,700 years ago, the kings of Aksum raised tall stones carved from one piece of rock.", am: "ከ1,700 ዓመት ገደማ በፊት የአክሱም ነገሥታት ከአንድ ድንጋይ የተቀረጹ ረጃጅም ሐውልቶችን አቆሙ።" },
  },
  {
    key: "hijra",
    label: { en: "The kind king of Aksum welcomes guests", am: "ደጉ የአክሱም ንጉሥ እንግዶችን ተቀበለ" },
    fact: { en: "About 1,400 years ago, the king welcomed the Prophet's companions, who were in danger, and kept them safe. The old mosque at Negash remembers them.", am: "ከ1,400 ዓመት ገደማ በፊት ንጉሡ በችግር ላይ የነበሩትን የነቢዩን ባልደረቦች ተቀብሎ ጠበቃቸው። በነጋሽ ያለው ጥንታዊ መስጊድ ያስታውሳቸዋል።" },
  },
  {
    key: "lalibela",
    label: { en: "Lalibela's rock churches", am: "የላሊበላ ውቅር አብያተ ክርስቲያናት" },
    fact: { en: "About 800 years ago, churches were carved down into the solid rock at Lalibela.", am: "ከ800 ዓመት ገደማ በፊት በላሊበላ አብያተ ክርስቲያናት ከአንድ ዐለት ወደ ታች ተፈልፍለው ተሠሩ።" },
  },
  {
    key: "harar",
    label: { en: "Harar's wall and gates", am: "የሐረር ግንብና በሮች" },
    fact: { en: "About 470 years ago, a strong wall with gates was built round Harar, a city of many mosques.", am: "ከ470 ዓመት ገደማ በፊት ብዙ መስጊዶች ባሏት በሐረር ዙሪያ በሮች ያሉት ጠንካራ ግንብ ተሠራ።" },
  },
  {
    key: "gondar",
    label: { en: "Gondar's castles", am: "የጎንደር ግንቦች" },
    fact: { en: "About 390 years ago, King Fasilides began building castles at Gondar.", am: "ከ390 ዓመት ገደማ በፊት ንጉሥ ፋሲለደስ በጎንደር ግንቦችን መሥራት ጀመሩ።" },
  },
  {
    key: "adwa",
    label: { en: "The victory of Adwa", am: "የዓድዋ ድል" },
    fact: { en: "In 1896, people from every part of the country came together at Adwa and won. A victory we all share.", am: "በ1888 ዓ.ም. ከሀገሩ ሁሉ የመጡ ሰዎች በዓድዋ አንድ ሆነው አሸነፉ። የሁላችንም ድል።" },
  },
];

const PILE = ["gondar", "aksum", "adwa", "lalibela", "hijra", "harar"];

export default function HistoryTimeline({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "The Story Ribbon", am: "የታሪክ ሪባን" }}
      goal={{ en: "Put our stories from long ago in order, oldest first.", am: "የጥንት ታሪኮቻችንን ከጥንቱ ጀምራችሁ በቅደም ተከተል አስቀምጡ።" }}
      steps={STEPS.map((s) => ({ ...s, pic: <g transform="translate(22 22)">{PIC[s.key]}</g> }))}
      pile={PILE}
      hint={{ en: "Not yet: which one happened longer ago than that?", am: "ገና ነው፦ ከዚያ በፊት የሆነው የትኛው ነው?" }}
      finale={{ en: "A long ribbon of stories, and they are all ours!", am: "ረጅም የታሪክ ሪባን፤ ሁሉም የኛ ናቸው!" }}
      onDone={onDone}
      stage={(placed) => (
        <g>
          <SkyFor id="ht" time="day" />
          <path d="M-10 230 Q200 214 410 232 L410 310 L-10 310Z" fill="#9CC27A" />
          <path d="M10 196 Q200 176 390 196" stroke="#E2463F" strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M10 196 Q200 176 390 196" stroke="#F5B21E" strokeWidth={3} strokeDasharray="6 6" fill="none" />
          <text x={22} y={232} fontSize={13} fontWeight={800} fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
            {lang === "am" ? "ጥንት" : "long ago"}
          </text>
          <text x={378} y={232} textAnchor="end" fontSize={13} fontWeight={800} fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
            {lang === "am" ? "ዛሬ" : "today"}
          </text>
          {STEPS.map((s, i) => {
            const x = 44 + i * 62;
            const y = 190 - Math.sin((i / 5) * Math.PI) * 14;
            return (
              <g key={s.key} transform={`translate(${x} ${y})`}>
                <circle r={7} fill={i < placed ? "#2FA35A" : "#FFFFFF"} stroke="#1B2A4E" strokeWidth={2} />
                {i < placed && (
                  <motion.g initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                    <g transform="translate(0 -52) scale(1.4)">
                      <circle r={22} fill="#FFFDF4" stroke="#C9B48A" strokeWidth={2} />
                      {PIC[s.key]}
                    </g>
                  </motion.g>
                )}
              </g>
            );
          })}
        </g>
      )}
    />
  );
}
