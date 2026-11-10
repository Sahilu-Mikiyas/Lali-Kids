"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";

import { Acacia, Mountains, Place, Rain, Tukul } from "@/components/book/scenery";
import { Grandma, TAP, Wolf } from "@/components/book/courses/our-ethiopia/kit-cast";
import { Aqal, Cloth, DorzeHouse, Gabi, Hidmo, MatRoll } from "@/components/book/courses/our-ethiopia/kit-culture";
import { Enset, HighlandFarm, PackCamel } from "@/components/book/courses/our-ethiopia/kit-land";
import { SkyFor } from "@/components/book/courses/our-ethiopia/kit-places";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Homes and Clothes for Every Place (level 2). Six little problems: a home for the rainy green
  highlands (the tukul's pointed thatch sheds the rain), the stony north with few trees (the
  hidmo's thick stone walls and flat roof for drying grain), the bamboo hills of the Gamo
  highlands (the tall woven Dorze house), the wide dry plain where families move with their
  camels (the aqal, packed onto a camel); then what to wrap round you on a cold highland
  morning (a thick gabi) and what Grandma wears to church on a sunny holiday (a light netela).
*/

type Opt = "tukul" | "hidmo" | "dorze" | "aqal" | "gabi" | "netela";
type Round = { place: T; right: Opt; options: Opt[]; why: T; scene: (id: string, solved: boolean) => ReactNode };

const NAME: Record<Opt, T> = {
  tukul: { en: "A round tukul with a pointed grass roof", am: "ሾጣጣ የሣር ጣሪያ ያለው ክብ ጎጆ" },
  hidmo: { en: "A stone hidmo with a flat roof", am: "ጠፍጣፋ ጣሪያ ያለው የድንጋይ ሕድሞ" },
  dorze: { en: "A tall woven Dorze house", am: "ከቀርከሃ የተሠራ ረጅም የዶርዜ ቤት" },
  aqal: { en: "An aqal of mats that packs onto a camel", am: "ግመል ላይ የሚጫን የምንጣፍ አቃል" },
  gabi: { en: "A thick, warm gabi", am: "ወፍራምና ሞቃት ጋቢ" },
  netela: { en: "A light netela", am: "ቀላል ነጠላ" },
};

function OptPic({ o }: { o: Opt }): ReactNode {
  switch (o) {
    case "tukul":
      return <g transform="translate(22 40) scale(0.36)"><Tukul x={0} y={0} smoke={false} /></g>;
    case "hidmo":
      return <g transform="translate(22 36) scale(0.26)"><Hidmo x={0} y={0} /></g>;
    case "dorze":
      return <g transform="translate(22 42) scale(0.22)"><DorzeHouse x={0} y={0} /></g>;
    case "aqal":
      return <g transform="translate(22 36) scale(0.3)"><Aqal x={0} y={0} /></g>;
    case "gabi":
      return <g transform="translate(22 30) scale(0.6)"><Gabi x={0} y={0} /></g>;
    case "netela":
      return <g transform="translate(6 8) scale(0.5)"><Cloth x={0} y={0} w={60} h={50} tibeb={["#2E9A8A", "#F5B21E"]} /></g>;
  }
}

const ROUNDS: Round[] = [
  {
    place: { en: "The green highlands, where the big rains pour in kiremt.", am: "በክረምት ትልቁ ዝናብ የሚወርድበት አረንጓዴው ደጋ።" },
    right: "tukul",
    options: ["hidmo", "tukul", "aqal"],
    why: { en: "The tukul's pointed roof sheds the rain, so it stays dry inside.", am: "የጎጆው ሾጣጣ ጣሪያ ዝናቡን ያወርዳል፤ ውስጡም ደረቅ ይሆናል።" },
    scene: (id, solved) => (
      <g>
        <HighlandFarm id={id} season="kiremt" />
        {solved && <Tukul x={200} y={260} s={1.1} />}
        <Rain />
      </g>
    ),
  },
  {
    place: { en: "The stony mountains of the north, with few trees but lots of stones.", am: "ዛፍ ጥቂት፣ ድንጋይ ግን ብዙ የሆነባቸው የሰሜን ድንጋያማ ተራሮች።" },
    right: "hidmo",
    options: ["hidmo", "dorze", "tukul"],
    why: { en: "A hidmo is built of the stones that lie all around. Its flat roof is for drying grain in the sun.", am: "ሕድሞ በዙሪያው ካሉት ድንጋዮች ይሠራል። ጠፍጣፋ ጣሪያው እህል በፀሐይ ለማድረቅ ነው።" },
    scene: (id, solved) => (
      <g>
        <SkyFor id={id} time="day" />
        <Mountains far="#B7C6E6" mid="#8EA8D4" />
        <path d="M-10 200 Q200 180 410 200 L410 310 L-10 310Z" fill="#A8A08A" />
        {[50, 100, 300, 350].map((x, i) => (
          <ellipse key={x} cx={x} cy={236 + (i % 2) * 14} rx={16} ry={9} fill="#8A8A96" />
        ))}
        {solved && <Hidmo x={200} y={262} s={1.1} />}
      </g>
    ),
  },
  {
    place: { en: "The Gamo highlands in the south, with bamboo and big enset plants.", am: "ቀርከሃና ትልልቅ እንሰት ያሉበት በደቡብ ያለው የጋሞ ደጋ።" },
    right: "dorze",
    options: ["aqal", "hidmo", "dorze"],
    why: { en: "Dorze houses are woven from bamboo and thatched with enset leaves, and can be taller than a giraffe!", am: "የዶርዜ ቤቶች ከቀርከሃ ይሠራሉ፤ በእንሰት ቅጠል ይከደናሉ፤ ከቀጭኔም ሊረዝሙ ይችላሉ!" },
    scene: (id, solved) => (
      <g>
        <SkyFor id={id} time="day" />
        <Mountains far="#B7C6E6" mid="#8EA8D4" />
        <path d="M-10 210 Q200 196 410 212 L410 310 L-10 310Z" fill="#6AA84E" />
        <Enset x={60} y={262} s={1} />
        <Enset x={340} y={258} s={0.9} delay={-1} />
        {solved && <DorzeHouse x={200} y={270} s={1.2} />}
      </g>
    ),
  },
  {
    place: { en: "A wide, dry plain where families move with their camels and goats to find water and grass.", am: "ቤተሰቦች ውሃና ሣር ፍለጋ ከግመሎቻቸውና ከፍየሎቻቸው ጋር የሚዘዋወሩበት ሰፊና ደረቅ ሜዳ።" },
    right: "aqal",
    options: ["tukul", "aqal", "hidmo"],
    why: { en: "An aqal is made of bent sticks and mats. It can be packed onto a camel and moved.", am: "አቃል ከተጣመሙ እንጨቶችና ከምንጣፎች ይሠራል። ተጠቅልሎ ግመል ላይ ተጭኖ ይንቀሳቀሳል።" },
    scene: (id, solved) => (
      <g>
        <SkyFor id={id} time="day" />
        <path d="M-10 180 Q200 168 410 182 L410 310 L-10 310Z" fill="#E0B878" />
        <Acacia x={340} y={204} s={0.5} />
        <PackCamel x={90} y={262} s={1} load={false} walk={false} />
        {solved && (
          <g>
            <Aqal x={220} y={262} s={1.1} />
            <g transform="translate(90 200)">
              <MatRoll x={0} y={0} s={0.6} />
            </g>
          </g>
        )}
      </g>
    ),
  },
  {
    place: { en: "A cold, misty morning high in the highlands. What do you wrap round you?", am: "ከፍ ባለው ደጋ ላይ ቀዝቃዛና ጭጋጋማ ጠዋት። ምን ትለብሳላችሁ?" },
    right: "gabi",
    options: ["netela", "gabi"],
    why: { en: "A gabi has four layers of cotton: as warm as a blanket.", am: "ጋቢ አራት ድርብ ጥጥ ነው፤ እንደ ብርድ ልብስ ይሞቃል።" },
    scene: (id, solved) => (
      <g>
        <HighlandFarm id={id} season="meskel" time="morning" />
        <rect width={400} height={300} fill="#FFFFFF" opacity={0.35} />
        <Place x={200} y={298} s={0.52} tap={TAP.elder}>
          <Wolf elder={solved} mood={solved ? "joy" : "worried"} />
        </Place>
      </g>
    ),
  },
  {
    place: { en: "A sunny holiday morning at church. What does Grandma wear round her shoulders?", am: "ፀሐያማ የበዓል ጠዋት በቤተ ክርስቲያን። አያቴ ትከሻዋ ላይ ምን ታደርጋለች?" },
    right: "netela",
    options: ["netela", "gabi"],
    why: { en: "A netela is thin and light, with a woven tibeb border: just right for a sunny day.", am: "ነጠላ ቀጭንና ቀላል ነው፤ የተሠራ ጥለት አለው፤ ለፀሐያማ ቀን ልክ ነው።" },
    scene: (id, solved) => (
      <g>
        <HighlandFarm id={id} season="meskel" />
        <Place x={200} y={298} s={0.52} tap={TAP.grandma}>
          <Grandma mood={solved ? "joy" : "happy"} arm={solved ? "raise" : "down"} />
        </Place>
      </g>
    ),
  },
];

export default function HomesAndPlaces({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Opt | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const right = pick === r.right;

  return (
    <DemoFrame lang={lang} title={{ en: "A Home for Every Place", am: "ለየቦታው የሚስማማ ቤት" }} goal={{ en: "Choose the home, or the clothes, that fit each place.", am: "ለእያንዳንዱ ቦታ የሚስማማውን ቤት ወይም ልብስ ምረጡ።" }} step={i} total={ROUNDS.length} color="#15803D">
      <Stage label={done ? undefined : t(lang, r.place)}>
        {done ? (
          <g>
            <HighlandFarm id={`${id}-end`} season="meskel" />
            <Tukul x={70} y={262} s={0.6} />
            <Hidmo x={160} y={268} s={0.5} />
            <DorzeHouse x={250} y={272} s={0.55} />
            <Aqal x={340} y={268} s={0.6} />
          </g>
        ) : (
          <g key={`${i}-${right}`}>
            {r.scene(`${id}-${i}`, right)}
            {right && (
              <motion.circle cx={200} cy={150} r={20} fill="none" stroke="#FFD233" strokeWidth={4} initial={{ r: 10, opacity: 1 }} animate={{ r: 140, opacity: 0 }} transition={{ duration: 1 }} />
            )}
          </g>
        )}
      </Stage>
      {done ? (
        <Finale lang={lang} text={{ en: "Every home fits its place!", am: "እያንዳንዱ ቤት ለቦታው ይስማማል!" }} onDone={onDone} color="#15803D" />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, r.place)}</p>
          {pick && right ? (
            <Feedback
              tone="great"
              action={
                <Next
                  color="#15803D"
                  onClick={() => {
                    setI((n) => n + 1);
                    setPick(null);
                  }}
                >
                  {t(lang, i === ROUNDS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next place", am: "ቀጣዩ ቦታ" })}
                </Next>
              }
            >
              {t(lang, r.why)}
            </Feedback>
          ) : pick ? (
            <Feedback tone="gentle" action={<Next color="#C98A0A" onClick={() => setPick(null)}>{t(lang, { en: "Try another", am: "ሌላ ሞክሩ" })}</Next>}>
              {t(lang, { en: "Hmm, would that work here? Think about the rain, the stones, the plants, and whether the family moves.", am: "እምም፣ ያ እዚህ ይሠራል? ስለ ዝናቡ፣ ስለ ድንጋዮቹ፣ ስለ ተክሎቹ፣ ቤተሰቡም ይዘዋወር እንደሆነ አስቡ።" })}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3">
              {r.options.map((o) => (
                <Choice
                  key={o}
                  pic={
                    <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden>
                      <OptPic o={o} />
                    </svg>
                  }
                  onClick={() => {
                    setPick(o);
                    if (o === r.right) sound.good();
                    else sound.gentle();
                  }}
                >
                  {t(lang, NAME[o])}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
