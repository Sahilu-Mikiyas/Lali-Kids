"use client";

import { EarthBall, SunDisc } from "@/components/book/courses/science-nature/kit-sky";
import type { DemoProps } from "../../types";
import { Rounds, type Round } from "./rounds-kit";

/*
  Day or Night? (level 5: day and night). The Earth as a ball lit by the Sun from the left, with
  Ethiopia as a red dot. Five rounds: is it day or night in Ethiopia (facing the Sun, then turned
  away)? What makes day and night (the Earth turning, not the Sun going round)? When it is evening
  in Ethiopia, is it morning or evening in America? Where does the Sun seem to rise?
*/

/** Space: the Sun on the left, the Earth on the right, with the red dot at `turn`. */
function Space({ turn, spin = false, sunrise = false }: { turn: number; spin?: boolean; sunrise?: boolean }) {
  return (
    <g>
      <rect width={400} height={300} fill="#0E1440" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} cx={(i * 71) % 400} cy={(i * 43) % 300} r={1.2} fill="#FFFFFF" opacity={0.7} />
      ))}
      <SunDisc x={70} y={150} r={40} />
      <path d="M120 130 H180 M120 150 H190 M120 170 H180" stroke="#FFE680" strokeWidth={3} strokeDasharray="8 6" opacity={0.7} />
      <EarthBall x={280} y={150} r={80} turn={turn} spin={spin} />
      {sunrise && (
        <g fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round">
          <path d="M280 52 Q350 60 368 110" />
          <path d="M360 100 L368 112 L374 98" />
        </g>
      )}
    </g>
  );
}

const DAY = { key: "day", label: { en: "Day", am: "ቀን" } };
const NIGHT = { key: "night", label: { en: "Night", am: "ሌሊት" } };

const ROUNDS: Round[] = [
  {
    prompt: { en: "The red dot is Ethiopia. Is it day or night there?", am: "ቀዩ ነጥብ ኢትዮጵያ ናት። እዚያ ቀን ነው ወይስ ሌሊት?" },
    right: "day",
    options: [DAY, NIGHT],
    why: { en: "Ethiopia faces the Sun, so it's daytime there.", am: "ኢትዮጵያ ፀሐይን ትመለከታለች፤ ስለዚህ እዚያ ቀን ነው።" },
    scene: () => <Space turn={0.8} />,
  },
  {
    prompt: { en: "The Earth has turned. Day or night in Ethiopia now?", am: "ምድር ዞራለች። አሁን በኢትዮጵያ ቀን ነው ወይስ ሌሊት?" },
    right: "night",
    options: [DAY, NIGHT],
    why: { en: "Ethiopia has turned away from the Sun: night time!", am: "ኢትዮጵያ ከፀሐይ ዞራለች፦ ሌሊት ነው!" },
    scene: () => <Space turn={0.22} />,
  },
  {
    prompt: { en: "What makes day and night?", am: "ቀንና ሌሊትን የሚያመጣው ምንድን ነው?" },
    right: "earth",
    options: [
      { key: "sun", label: { en: "The Sun goes round the Earth", am: "ፀሐይ በምድር ዙሪያ ትዞራለች" } },
      { key: "earth", label: { en: "The Earth turns round", am: "ምድር ትሽከረከራለች" } },
      { key: "cloud", label: { en: "Clouds cover the Sun", am: "ደመና ፀሐይን ይሸፍናል" } },
    ],
    why: { en: "The Earth spins round once every day, about 24 hours. The Sun only seems to move.", am: "ምድር በየቀኑ፣ በ24 ሰዓት ገደማ፣ አንድ ጊዜ ትሽከረከራለች። ፀሐይ የምትንቀሳቀስ ትመስላለች እንጂ አትንቀሳቀስም።" },
    scene: (ok) => <Space turn={0.8} spin={ok} />,
  },
  {
    prompt: { en: "It's evening in Ethiopia. What is it in America?", am: "በኢትዮጵያ ምሽት ነው። በአሜሪካ ምንድን ነው?" },
    right: "morning",
    options: [
      { key: "morning", label: { en: "Morning", am: "ጠዋት" } },
      { key: "evening", label: { en: "Evening too", am: "እሱም ምሽት" } },
    ],
    why: { en: "America is far round the Earth, so it is still morning there, turning towards the Sun.", am: "አሜሪካ በምድር ዙሪያ ሩቅ ናት፤ ስለዚህ እዚያ ገና ጠዋት ነው፤ ወደ ፀሐይ እየዞረች ነው።" },
    scene: () => <Space turn={0.95} />,
  },
  {
    prompt: { en: "As the Earth turns, where does the Sun seem to rise?", am: "ምድር ስትሽከረከር ፀሐይ ከየት የምትወጣ ትመስላለች?" },
    right: "east",
    options: [
      { key: "east", label: { en: "In the east", am: "ከምሥራቅ" } },
      { key: "west", label: { en: "In the west", am: "ከምዕራብ" } },
    ],
    why: { en: "The Sun seems to rise in the east and set in the west, every day.", am: "ፀሐይ በየቀኑ ከምሥራቅ የምትወጣ፣ በምዕራብ የምትጠልቅ ትመስላለች።" },
    scene: (ok) => <Space turn={0.8} sunrise={ok} />,
  },
];

export default function DayAndNight({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Day or Night?", am: "ቀን ወይስ ሌሊት?" }}
      goal={{ en: "Find out how the turning Earth makes day and night.", am: "የምትሽከረከረው ምድር ቀንና ሌሊትን እንዴት እንደምታመጣ እወቁ።" }}
      rounds={ROUNDS}
      hint={{ en: "Look again: the side facing the Sun is bright; the far side is dark.", am: "እንደገና ተመልከቱ፦ ፀሐይን የሚመለከተው ጎን ብሩህ ነው፤ ሌላኛው ጎን ጨለማ ነው።" }}
      finale={{ en: "The Earth turns round and round: day comes up and night comes down!", am: "ምድር ትዞራለች፣ ትዞራለች፦ ቀን ይመጣል፣ ሌሊት ይገባል!" }}
      end={<Space turn={0.8} spin />}
      onDone={onDone}
    />
  );
}
