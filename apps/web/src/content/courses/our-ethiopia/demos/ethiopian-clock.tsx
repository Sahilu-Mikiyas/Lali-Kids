"use client";

import type { ReactNode } from "react";

import { ClockFace, SunArc } from "@/components/book/courses/our-ethiopia/kit-crafts";
import { SkyFor } from "@/components/book/courses/our-ethiopia/kit-places";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  The Sunrise Clock (level 6). In Ethiopia the hours of the day are counted from sunrise: sunrise
  (about 6 in the morning on a watch) is 12 o'clock, one hour later is 1 o'clock, and so on; the
  night hours start again at sunset (about 6 in the evening on a watch, 12 o'clock at night the
  Ethiopian way). Near the equator the sun rises at about the same time all year, so this works
  well. Six questions: read the sun, then change between a watch and the Ethiopian clock (take
  away six, or add six).
*/

const n = (k: number): Option => ({ key: String(k), label: { en: `${k} o'clock`, am: `${k} ሰዓት` } });

/** The sky from sunrise to sunset with the sun `h` hours after sunrise, and an optional watch. */
function Sky({ h, watch, night = false }: { h: number; watch?: number; night?: boolean }): ReactNode {
  return (
    <g>
      <SkyFor id="ec" time={night ? "evening" : h < 1 ? "morning" : "day"} sun={[-200, -200]} />
      <path d="M-10 214 Q200 200 410 216 L410 310 L-10 310Z" fill="#6CC07C" />
      <SunArc hour={h} y={214} />
      <path d="M28 214 Q40 196 52 214Z" fill="#F5B21E" opacity={0.6} />
      <path d="M348 214 Q360 196 372 214Z" fill="#E07A2A" opacity={0.6} />
      {watch !== undefined && (
        <g transform="translate(346 86)">
          <rect x={-12} y={-50} width={24} height={100} rx={6} fill="#2B3A8C" />
          <circle r={34} fill="#C9D2E0" />
          <ClockFace x={0} y={0} r={28} hour={watch} />
        </g>
      )}
    </g>
  );
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "The sun is just coming up. What time is it, the Ethiopian way?", am: "ፀሐይ ገና እየወጣች ነው። በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው?" },
    right: "12",
    options: [n(6), n(12), n(1)],
    why: { en: "Sunrise is 12 o'clock. The day's hours start counting from here.", am: "ፀሐይ ስትወጣ 12 ሰዓት ነው። የቀኑ ሰዓቶች ከዚህ መቆጠር ይጀምራሉ።" },
    scene: () => <Sky h={0} />,
  },
  {
    prompt: { en: "The sun has been up for one hour. What time is it?", am: "ፀሐይ ከወጣች አንድ ሰዓት ሆኗል። ስንት ሰዓት ነው?" },
    right: "1",
    options: [n(1), n(7), n(2)],
    why: { en: "One hour after sunrise is 1 o'clock. Count from the sunrise!", am: "ፀሐይ ከወጣች ከአንድ ሰዓት በኋላ 1 ሰዓት ነው። ከፀሐይ መውጫ ቁጠሩ!" },
    scene: () => <Sky h={1} />,
  },
  {
    prompt: { en: "Liya's watch says 8 in the morning. What time is it, the Ethiopian way?", am: "የሊያ ሰዓት ጠዋት 8 ይላል። በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው?" },
    right: "2",
    options: [n(8), n(2), n(4)],
    why: { en: "Take away six: 8 on the watch is 2 o'clock the Ethiopian way. Two hours after sunrise.", am: "ስድስት ቀንሱ፦ በእጅ ሰዓት 8 በኢትዮጵያ አቆጣጠር 2 ሰዓት ነው። ፀሐይ ከወጣች ሁለት ሰዓት።" },
    scene: () => <Sky h={2} watch={8} />,
  },
  {
    prompt: { en: "The market opens at 3 o'clock, the Ethiopian way. What does the watch say?", am: "ገበያው በኢትዮጵያ አቆጣጠር 3 ሰዓት ይከፈታል። የእጅ ሰዓቱ ምን ይላል?" },
    right: "9",
    options: [n(3), n(6), n(9)],
    why: { en: "Add six: 3 o'clock the Ethiopian way is 9 in the morning on the watch.", am: "ስድስት ጨምሩ፦ በኢትዮጵያ አቆጣጠር 3 ሰዓት በእጅ ሰዓት ጠዋት 9 ነው።" },
    scene: (solved) => <Sky h={3} watch={solved ? 9 : undefined} />,
  },
  {
    prompt: { en: "The sun is high in the middle of the sky. The watch says 12. What time is it, the Ethiopian way?", am: "ፀሐይ በሰማዩ መሐል ከፍ ብላለች። የእጅ ሰዓቱ 12 ይላል። በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው?" },
    right: "6",
    options: [n(12), n(6), n(3)],
    why: { en: "Midday is 6 o'clock: six hours after sunrise.", am: "እኩለ ቀን 6 ሰዓት ነው፦ ፀሐይ ከወጣች ስድስት ሰዓት።" },
    scene: () => <Sky h={6} watch={12} />,
  },
  {
    prompt: { en: "The sun is setting, and the watch says 6 in the evening. What time is it, the Ethiopian way?", am: "ፀሐይ እየጠለቀች ነው፤ የእጅ ሰዓቱ ማታ 6 ይላል። በኢትዮጵያ አቆጣጠር ስንት ሰዓት ነው?" },
    right: "12",
    options: [n(6), n(12), n(9)],
    why: { en: "Sunset is 12 o'clock again, and the night hours start: 1 o'clock at night, 2 o'clock at night...", am: "ፀሐይ ስትጠልቅ እንደገና 12 ሰዓት ነው፤ የማታ ሰዓቶች ይጀምራሉ፦ ምሽት 1 ሰዓት፣ 2 ሰዓት..." },
    scene: () => <Sky h={12} watch={6} night />,
  },
];

export default function EthiopianClock({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "The Sunrise Clock", am: "የፀሐይ መውጫ ሰዓት" }}
      goal={{ en: "In Ethiopia we count the hours from sunrise. Read the sun!", am: "በኢትዮጵያ ሰዓቶችን ከፀሐይ መውጫ እንቆጥራለን። ፀሐይዋን አንብቡ!" }}
      rounds={ROUNDS}
      hint={{ en: "Count the hours from sunrise. Sunrise is 12; on a watch, it's about 6.", am: "ሰዓቶቹን ከፀሐይ መውጫ ቁጠሩ። ፀሐይ ስትወጣ 12 ሰዓት ነው፤ በእጅ ሰዓት 6 ገደማ ነው።" }}
      finale={{ en: "You can tell the time both ways!", am: "ሰዓትን በሁለቱም መንገድ ማወቅ ትችላላችሁ!" }}
      end={
        <g>
          <SkyFor id="ec-end" time="day" sun={[-200, -200]} />
          <path d="M-10 214 Q200 200 410 216 L410 310 L-10 310Z" fill="#6CC07C" />
          <ClockFace x={120} y={130} r={70} hour={2} geez />
          <ClockFace x={290} y={130} r={70} hour={8} />
        </g>
      }
      onDone={onDone}
    />
  );
}
