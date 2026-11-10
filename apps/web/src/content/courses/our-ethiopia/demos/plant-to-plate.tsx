"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";

import { Place } from "@/components/book/scenery";
import { Cub, TAP } from "@/components/book/courses/our-ethiopia/kit-cast";
import { CoffeeBush, Enset, TeffClump } from "@/components/book/courses/our-ethiopia/kit-land";
import { Home } from "@/components/book/courses/our-ethiopia/kit-places";
import { Cup, Mesob, SnackBowl } from "@/components/book/courses/our-ethiopia/kit-props";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, sound, Stage, t, type T } from "./demo-kit";

/*
  From Plant to Plate (level 1). Four plants and four foods: tap a plant, then the food made from
  it. Teff (the highlands) makes injera; enset, the false banana (the green hills of the south and
  south-west), makes kocho, from the inside of its stem and root, not its fruit; coffee (first
  wild in the forests of the south-west) makes buna; barley (the cool high highlands) roasted
  becomes kolo. Each match lays the food on Grandma's table and says where the plant grows.
*/

type Key = "teff" | "enset" | "coffee" | "barley";
const KEYS: Key[] = ["teff", "enset", "coffee", "barley"];
const FOOD_ORDER: Key[] = ["coffee", "barley", "teff", "enset"];

const PLANT: Record<Key, T> = {
  teff: { en: "Teff", am: "ጤፍ" },
  enset: { en: "Enset (false banana)", am: "እንሰት" },
  coffee: { en: "Coffee", am: "ቡና (ተክሉ)" },
  barley: { en: "Barley", am: "ገብስ" },
};
const FOOD: Record<Key, T> = {
  teff: { en: "Injera", am: "እንጀራ" },
  enset: { en: "Kocho bread", am: "ቆጮ" },
  coffee: { en: "A cup of buna", am: "አንድ ስኒ ቡና" },
  barley: { en: "Kolo", am: "ቆሎ" },
};
const FACT: Record<Key, T> = {
  teff: { en: "Teff grows in the highlands. Its grains are tiny, and they make injera.", am: "ጤፍ በደጋ ይበቅላል። ቅንጣቶቹ በጣም ጥቃቅን ናቸው፤ እንጀራ ይሠሩበታል።" },
  enset: { en: "Enset grows in the green hills of the south and south-west. Kocho is made from the inside of its stem and root, not from its fruit.", am: "እንሰት በደቡብና በደቡብ ምዕራብ አረንጓዴ ኮረብቶች ይበቅላል። ቆጮ የሚሠራው ከግንዱና ከሥሩ ውስጥ ነው እንጂ ከፍሬው አይደለም።" },
  coffee: { en: "Coffee first grew wild in the forests of the south-west. Its roasted beans make buna, for grown-ups.", am: "ቡና መጀመሪያ በደቡብ ምዕራብ ደኖች በዱር በቀለ። የተቆላው ፍሬው ቡና ይሆናል፤ ለትልልቅ ሰዎች።" },
  barley: { en: "Barley grows high up in the cool highlands. Roasted, it becomes crunchy kolo.", am: "ገብስ ከፍ ብሎ በቀዝቃዛው ደጋ ይበቅላል። ሲቆላ ቁርጥም የሚል ቆሎ ይሆናል።" },
};

function Barley({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      {[-6, 0, 6].map((dx, i) => (
        <g key={dx} transform={`translate(${dx} 0) rotate(${(i - 1) * 10})`}>
          <path d="M0 0 V-30" stroke="#B8A04A" strokeWidth={1.6} />
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <ellipse cx={-2} cy={-30 - k * 5} rx={2} ry={3} fill="#E0C45A" />
              <ellipse cx={2} cy={-32 - k * 5} rx={2} ry={3} fill="#D8B84A" />
            </g>
          ))}
          <path d="M0 -48 V-58 M-2 -46 L-6 -56 M2 -46 L6 -56" stroke="#D8B84A" strokeWidth={1} />
        </g>
      ))}
    </g>
  );
}

function Kocho({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse cx={0} cy={2} rx={20} ry={6} fill="#C9C0A0" />
      <ellipse cx={0} cy={0} rx={18} ry={5} fill="#D8D0B0" />
      <path d="M-12 -1 h6 M2 1 h8 M-4 -2 h4" stroke="#B8AE88" strokeWidth={1.2} />
    </g>
  );
}

function PlantPic({ k }: { k: Key }): ReactNode {
  if (k === "teff") return <g transform="translate(20 34)"><TeffClump x={0} y={0} s={0.9} /></g>;
  if (k === "enset") return <g transform="translate(20 38) scale(0.3)"><Enset x={0} y={0} /></g>;
  if (k === "coffee") return <g transform="translate(20 38) scale(0.55)"><CoffeeBush x={0} y={0} /></g>;
  return <g transform="translate(20 38)"><Barley s={0.6} /></g>;
}

function FoodPic({ k }: { k: Key }): ReactNode {
  if (k === "teff") return <g transform="translate(20 34) scale(0.24)"><Mesob x={0} y={0} rx={70} /></g>;
  if (k === "enset") return <g transform="translate(20 24) scale(0.8)"><Kocho /></g>;
  if (k === "coffee") return <g transform="translate(20 26) scale(1.6)"><Cup x={0} y={0} full /></g>;
  return <g transform="translate(20 30) scale(0.6)"><SnackBowl x={0} y={0} kind="kolo" /></g>;
}

export default function PlantToPlate({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [plant, setPlant] = useState<Key | null>(null);
  const [matched, setMatched] = useState<Key[]>([]);
  const [last, setLast] = useState<Key | null>(null);
  const [oops, setOops] = useState(false);
  const done = matched.length === KEYS.length;

  const pickFood = (k: Key) => {
    if (!plant || matched.includes(k)) return;
    if (k === plant) {
      sound.good();
      setMatched((m) => [...m, k]);
      setLast(k);
      setOops(false);
      setPlant(null);
    } else {
      sound.gentle();
      setOops(true);
      setLast(null);
    }
  };

  const card = (side: "plant" | "food", k: Key) => {
    const isDone = matched.includes(k);
    const on = side === "plant" && plant === k;
    return (
      <button
        key={`${side}-${k}`}
        type="button"
        data-plant={side === "plant" ? k : undefined}
        data-food={side === "food" ? k : undefined}
        disabled={isDone}
        onClick={() => {
          if (side === "plant") {
            sound.tap();
            setPlant(k);
            setOops(false);
          } else pickFood(k);
        }}
        className="flex min-h-16 w-full items-center gap-2 rounded-2xl border-2 px-2 py-1 text-left font-display text-base font-extrabold leading-tight text-ink transition-transform active:translate-y-0.5 disabled:opacity-60"
        style={{ background: isDone ? "#E4F7EA" : on ? "#FFF4E0" : "#FFFFFF", borderColor: isDone ? "#2FA35A" : on ? "#F5B21E" : "#D3E4F4" }}
      >
        <svg width={44} height={44} viewBox="0 0 40 40" aria-hidden className="shrink-0">
          {side === "plant" ? <PlantPic k={k} /> : <FoodPic k={k} />}
        </svg>
        <span className="min-w-0">{t(lang, side === "plant" ? PLANT[k] : FOOD[k])}</span>
      </button>
    );
  };

  return (
    <DemoFrame lang={lang} title={{ en: "From Plant to Plate", am: "ከተክል እስከ ሳህን" }} goal={{ en: "Tap a plant, then tap the food that is made from it.", am: "አንድ ተክል ንኩ፤ ከዚያ ከእሱ የሚሠራውን ምግብ ንኩ።" }} step={matched.length} total={KEYS.length} color="#15803D">
      <Stage label={t(lang, { en: "Grandma's table", am: "የአያቴ ማዕድ" })}>
        <Home id={id} time="day">
          <rect x={60} y={214} width={280} height={12} rx={3} fill="#9A6236" />
          <path d="M80 226 V280 M320 226 V280" stroke="#7A4A26" strokeWidth={6} />
          {matched.map((k, i) => (
            <g key={k} transform={`translate(${86 + i * 64} 176) scale(1.4)`}>
              <motion.g initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <FoodPic k={k} />
              </motion.g>
            </g>
          ))}
          <Place x={200} y={296} s={0.4} tap={TAP.cub}>
            <Cub mood={done ? "joy" : "happy"} arm={done ? "up" : "none"} />
          </Place>
        </Home>
      </Stage>
      {done ? (
        <Finale lang={lang} text={{ en: "From the fields to the table: well done!", am: "ከማሳ እስከ ማዕድ፦ ጎበዝ!" }} onDone={onDone} color="#15803D" />
      ) : (
        <>
          {last && <Feedback tone="great">{t(lang, FACT[last])}</Feedback>}
          {oops && plant && <Feedback tone="gentle">{t(lang, { en: "Not that one. Which food is made from ", am: "ያ አይደለም። ከ" }) + t(lang, PLANT[plant]) + t(lang, { en: "?", am: " የሚሠራው የትኛው ምግብ ነው?" })}</Feedback>}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="grid gap-2">{KEYS.map((k) => card("plant", k))}</div>
            <div className="grid gap-2">{FOOD_ORDER.map((k) => card("food", k))}</div>
          </div>
          {!plant && <p className="mt-2 text-center text-base text-muted">{t(lang, { en: "Start with a plant on the left.", am: "በግራ ካለው ተክል ጀምሩ።" })}</p>}
        </>
      )}
    </DemoFrame>
  );
}
