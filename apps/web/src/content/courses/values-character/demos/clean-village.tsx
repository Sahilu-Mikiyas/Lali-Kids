"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";

import { Cub, Gugu, Ibex, TAP, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Litter, NoLitterSign, Sack, Seedling, Spring } from "@/components/book/courses/values-character/kit-more";
import { SkyFor } from "@/components/book/courses/values-character/kit-places";
import { Hearts, Sparkles, WateringCan } from "@/components/book/courses/values-character/kit-props";
import { Mountains, Place, vars } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sound, Stage, t } from "./demo-kit";

/*
  Our Village, Our Hands! (level 6: keeping the village clean, trees and water), from "Clean
  Water, Green Hill". Three jobs in one picture: tap the rubbish to put it in the sack, tap the
  marked spots on the bare hill to plant seedlings, then tap each seedling to water it. As the
  work is done the spring clears and the hill turns green. Every target is big enough for a
  small finger.
*/

const COLOR = "#2FA35A";
const SACK: [number, number] = [86, 292];

const LITTER: { x: number; y: number; kind: "bag" | "bottle"; rot: number }[] = [
  { x: 150, y: 262, kind: "bag", rot: 0 },
  { x: 196, y: 270, kind: "bottle", rot: 70 },
  { x: 244, y: 262, kind: "bag", rot: -10 },
  { x: 288, y: 274, kind: "bottle", rot: -50 },
  { x: 330, y: 248, kind: "bag", rot: 10 },
  { x: 120, y: 236, kind: "bottle", rot: 20 },
];

/** Where seedlings go on the hill. */
const SPOTS: [number, number][] = [
  [96, 168],
  [168, 146],
  [240, 144],
  [312, 156],
];

type Phase = "collect" | "plant" | "water" | "done";

export default function CleanVillage({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<Phase>("collect");
  const [got, setGot] = useState<number[]>([]);
  const [planted, setPlanted] = useState<number[]>([]);
  const [watered, setWatered] = useState<number[]>([]);
  const [pouring, setPouring] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const collectDone = got.length === LITTER.length;
  const plantDone = planted.length === SPOTS.length;
  const waterDone = watered.length === SPOTS.length;
  const step = phase === "collect" ? 0 : phase === "plant" ? 1 : phase === "water" ? 2 : 3;
  const green = phase === "done" || waterDone;

  const pick = (k: number) => {
    if (phase !== "collect" || got.includes(k)) return;
    sound.tap();
    const n = [...got, k];
    setGot(n);
    if (n.length === LITTER.length) sound.good();
  };
  const spot = (k: number) => {
    if (phase === "plant" && !planted.includes(k)) {
      sound.tap();
      const n = [...planted, k];
      setPlanted(n);
      if (n.length === SPOTS.length) sound.good();
    } else if (phase === "water" && !watered.includes(k)) {
      sound.tap();
      setPouring(k);
      const n = [...watered, k];
      setWatered(n);
      if (n.length === SPOTS.length) sound.good();
    }
  };

  const hill = green ? "#6FBF6A" : "#C7955E";
  const say = {
    collect: { en: `Tap the rubbish to put it in the sack. (${got.length} of ${LITTER.length})`, am: `ቆሻሻውን ነክተን ወደ ማቅ እናስገባ። (${got.length} ከ${LITTER.length})` },
    plant: { en: `Tap the marked spots on the hill to plant a seedling. (${planted.length} of ${SPOTS.length})`, am: `ችግኝ ለመትከል በኮረብታው ላይ ያሉትን ምልክቶች እንንካ። (${planted.length} ከ${SPOTS.length})` },
    water: { en: `Tap each seedling to give it water. (${watered.length} of ${SPOTS.length})`, am: `ውሃ ለማጠጣት እያንዳንዱን ችግኝ እንንካ። (${watered.length} ከ${SPOTS.length})` },
    done: { en: "", am: "" },
  }[phase];

  return (
    <DemoFrame lang={lang} title={{ en: "Our Village, Our Hands!", am: "መንደራችን፣ በእጃችን!" }} goal={{ en: "Clean the spring, plant the hill, water the trees.", am: "ምንጩን እናጽዳ፣ ኮረብታውን እንትከል፣ ዛፎቹን እናጠጣ።" }} step={finished ? 3 : step} total={3} color={COLOR}>
      <Stage label={t(lang, say)}>
        <SkyFor id={id} time={green ? "morning" : "day"} />
        <Mountains far="#B7C6E6" mid="#9DB0D8" />
        <path d="M-10 230 Q80 140 200 132 Q320 130 410 186 L410 310 L-10 310Z" fill={hill} style={{ transition: "fill 1.2s" }} />
        {!green && <path d="M130 170 q-6 24 -16 50 M260 150 q6 30 -4 70" stroke="#A87A48" strokeWidth={3} fill="none" strokeLinecap="round" />}
        {/* Seedling spots on the hill. */}
        {SPOTS.map(([x, y], k) => {
          const isPlanted = planted.includes(k);
          const isWatered = watered.includes(k);
          const active = (phase === "plant" && !isPlanted) || (phase === "water" && !isWatered);
          return (
            <g key={k} data-spot={k} onClick={() => spot(k)} style={{ cursor: active ? "pointer" : undefined }} role={active ? "button" : undefined} aria-label={active ? t(lang, phase === "plant" ? { en: "Plant here", am: "እዚህ እንትከል" } : { en: "Water this seedling", am: "ይህን ችግኝ እናጠጣ" }) : undefined}>
              <circle cx={x} cy={y - 14} r={24} fill="#FFFFFF" opacity={0.001} />
              {!isPlanted && <ellipse cx={x} cy={y} rx={14} ry={5} fill="none" stroke={phase === "plant" ? "#FFF6DC" : "#A87A48"} strokeWidth={2.4} strokeDasharray="5 4" className={phase === "plant" ? "lali-pulse" : undefined} style={vars({ "--dur": "1.4s" })} />}
              {isPlanted && <Seedling x={x} y={y} s={isWatered ? 1.1 : 0.9} grown={isWatered ? 0.8 : 0} />}
              {pouring === k && (
                <g key={`p${k}`} className="lali-fade-out" style={vars({ "--delay": "1.4s" })}>
                  <WateringCan x={x + 26} y={y - 34} s={0.9} pour />
                </g>
              )}
            </g>
          );
        })}
        <path d="M-10 236 Q200 222 410 236 L410 310 L-10 310Z" fill={green ? "#9CCB86" : "#E3B77C"} style={{ transition: "fill 1.2s" }} />
        <g transform="translate(230 272) scale(0.75)">
          <Spring x={0} y={0} dirty={!collectDone} bright={collectDone} />
        </g>
        {collectDone && <NoLitterSign x={370} y={282} s={0.8} />}
        <Sack x={SACK[0]} y={SACK[1]} s={1.3 + got.length * 0.05} />
        {/* The rubbish: each piece flies into the sack when tapped. */}
        {LITTER.map((l, k) => {
          const gone = got.includes(k);
          return (
            <motion.g
              key={k}
              data-item={k}
              onClick={() => pick(k)}
              initial={false}
              animate={gone ? { x: SACK[0] - l.x, y: SACK[1] - 30 - l.y, opacity: 0, scale: 0.4 } : { x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeIn" }}
              style={{ cursor: gone ? undefined : "pointer", pointerEvents: gone ? "none" : undefined }}
              role={gone ? undefined : "button"}
              aria-label={gone ? undefined : t(lang, { en: "Pick up the rubbish", am: "ቆሻሻውን እናንሣ" })}
            >
              <circle cx={l.x} cy={l.y - 8} r={22} fill="#FFFFFF" opacity={0.001} />
              <Litter x={l.x} y={l.y} kind={l.kind} rot={l.rot} s={1.2} />
            </motion.g>
          );
        })}
        <Place x={40} y={296} s={0.4} tap={TAP.cub}>
          <Cub mood={green ? "joy" : "happy"} arm={phase === "collect" ? "reach" : "none"} />
        </Place>
        {phase !== "collect" && (
          <Place x={360} y={200} s={0.24} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        )}
        {green && (
          <>
            <Place x={150} y={300} s={0.32} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={310} y={300} s={0.32} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Sparkles x={220} y={150} r={100} delay={0.2} n={9} />
            <Hearts spots={[[230, 210, 0.6]]} />
          </>
        )}
      </Stage>

      {finished ? (
        <Finale lang={lang} text={{ en: "A clean spring and a green hill: our village, our hands!", am: "ንጹሕ ምንጭና አረንጓዴ ኮረብታ፦ መንደራችን፣ በእጃችን!" }} onDone={onDone} color={COLOR} />
      ) : phase === "collect" && collectDone ? (
        <Feedback tone="great" action={<Next onClick={() => setPhase("plant")} color={COLOR}>{t(lang, { en: "Next job", am: "ቀጣዩ ሥራ" })}</Next>}>
          {t(lang, { en: "The spring is clean and sparkling! And a sign reminds everyone: rubbish goes in the bin.", am: "ምንጩ ንጹሕ ሆኖ ያበራል! ምልክቱም ሁሉንም ያስታውሳል፦ ቆሻሻ ወደ ቆሻሻ ማጠራቀሚያ ነው።" })}
        </Feedback>
      ) : phase === "plant" && plantDone ? (
        <Feedback tone="great" action={<Next onClick={() => setPhase("water")} color={COLOR}>{t(lang, { en: "Next job", am: "ቀጣዩ ሥራ" })}</Next>}>
          {t(lang, { en: "Dig, plant, press! Four little trees on the hill. Their roots will hold the soil when it rains.", am: "መቆፈር፣ መትከል፣ መጫን! በኮረብታው ላይ አራት ትንንሽ ዛፎች። ዝናብ ሲዘንብ ሥሮቻቸው አፈሩን ይይዛሉ።" })}
        </Feedback>
      ) : phase === "water" && waterDone ? (
        <Feedback
          tone="great"
          action={
            <Next
              onClick={() => {
                setPhase("done");
                setFinished(true);
              }}
              color={COLOR}
            >
              {t(lang, { en: "Finish", am: "ጨርሱ" })}
            </Next>
          }
        >
          {t(lang, { en: "Watering, waiting, watching! The hill is turning green.", am: "ውሃ ማጠጣት፣ መጠበቅ፣ ማየት! ኮረብታው አረንጓዴ እየሆነ ነው።" })}
        </Feedback>
      ) : (
        <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, say)}</p>
      )}
    </DemoFrame>
  );
}
