"use client";

import { useState, type ReactNode } from "react";

import { Camel, TAP, Tsehay } from "@/components/book/courses/healthy-safe/kit-cast";
import { Banana, Candy, Canjeero, FoodBlob, Mango, Mug, Plate, SodaBottle, type PlateFood } from "@/components/book/courses/healthy-safe/kit-health";
import { Home } from "@/components/book/courses/healthy-safe/kit-places";
import { Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Build a Rainbow Plate (level 2), from "Tsehay's Rainbow Plate" and "Ayan's Running Breakfast".
  Two plates (Tsehay's lunch, Ayan's breakfast): tap foods from the tray until the plate has
  something for energy (injera, bread, canjeero), something to grow strong (lentils, egg, milk)
  and something to keep well (gomen, carrots, fruit). Sweets are "a sometimes treat", gently, and
  not added. Then choose a drink for a thirsty body: water or milk, not the fizzy drink.
*/

const COLOR = "#E2763A";

type Group = "energy" | "grow" | "well" | "treat";
type Food = { key: string; label: T; group: Group; plate?: PlateFood; side?: ReactNode; pic: ReactNode };

const svg = (el: ReactNode, vb = "-22 -22 44 44") => (
  <svg width={40} height={40} viewBox={vb} aria-hidden>
    {el}
  </svg>
);

const FOODS: Record<string, Food> = {
  injera: { key: "injera", label: { en: "Injera", am: "እንጀራ" }, group: "energy", pic: svg(<FoodBlob food="injera" s={1.4} />) },
  bread: { key: "bread", label: { en: "Bread", am: "ዳቦ" }, group: "energy", plate: "bread", pic: svg(<FoodBlob food="bread" s={1.3} />) },
  canjeero: { key: "canjeero", label: { en: "Canjeero", am: "ካንጀሮ" }, group: "energy", side: <Canjeero x={0} y={0} s={1.2} />, pic: svg(<Canjeero x={0} y={8} s={0.8} />) },
  misir: { key: "misir", label: { en: "Red lentils", am: "ቀይ ምስር" }, group: "grow", plate: "misir", pic: svg(<FoodBlob food="misir" s={1.4} />) },
  egg: { key: "egg", label: { en: "Egg", am: "እንቁላል" }, group: "grow", plate: "egg", pic: svg(<FoodBlob food="egg" s={1.2} />) },
  milk: { key: "milk", label: { en: "Milk", am: "ወተት" }, group: "grow", side: <Mug x={0} y={0} s={1.6} drink="milk" color="#FFFFFF" />, pic: svg(<Mug x={0} y={12} s={1.1} drink="milk" color="#FFFFFF" />) },
  gomen: { key: "gomen", label: { en: "Gomen (greens)", am: "ጎመን" }, group: "well", plate: "gomen", pic: svg(<FoodBlob food="gomen" s={1.4} />) },
  carrot: { key: "carrot", label: { en: "Carrots", am: "ካሮት" }, group: "well", plate: "carrot", pic: svg(<FoodBlob food="carrot" s={1.4} />) },
  banana: { key: "banana", label: { en: "Banana", am: "ሙዝ" }, group: "well", side: <Banana x={0} y={0} s={1.4} rot={-10} />, pic: svg(<Banana x={0} y={0} s={0.9} rot={-10} />) },
  mango: { key: "mango", label: { en: "Mango", am: "ማንጎ" }, group: "well", side: <Mango x={0} y={0} s={1.4} />, pic: svg(<Mango x={0} y={0} s={1.1} />) },
  sweets: { key: "sweets", label: { en: "Sweets", am: "ከረሜላ" }, group: "treat", pic: svg(<Candy x={0} y={0} s={0.9} />) },
};

const MEALS: { who: "tsehay" | "ayan"; say: T; tray: string[] }[] = [
  { who: "tsehay", say: { en: "Fill Tsehay's lunch plate: one food for energy, one to grow strong, one to keep well.", am: "የፀሐይን የምሳ ሳሕን ሙሉ፦ ለጉልበት አንድ፣ ለማደግ አንድ፣ ጤና ለመጠበቅ አንድ።" }, tray: ["injera", "sweets", "misir", "gomen", "egg", "carrot"] },
  { who: "ayan", say: { en: "Now Ayan's breakfast before the race: energy, growing, keeping well!", am: "አሁን ከሩጫው በፊት የአያን ቁርስ፦ ጉልበት፣ ማደግ፣ ጤና መጠበቅ!" }, tray: ["sweets", "canjeero", "egg", "banana", "milk", "mango"] },
];

const GROUP_NAME: Record<Exclude<Group, "treat">, T> = {
  energy: { en: "energy", am: "ጉልበት" },
  grow: { en: "growing strong", am: "ማደግ" },
  well: { en: "keeping well", am: "ጤና መጠበቅ" },
};

/** A sign for each food job: a bolt (energy), an arrow (grow), a heart (keep well). */
function JobSign({ g, on }: { g: Exclude<Group, "treat">; on: boolean }) {
  const fill = on ? (g === "energy" ? "#FFD233" : g === "grow" ? "#2E9A5B" : "#E2463F") : "#D3E4F4";
  return (
    <g>
      <circle r={16} fill="#FFFFFF" stroke={on ? fill : "#D3E4F4"} strokeWidth={3} />
      {g === "energy" && <path d="M2 -10 L-5 2 L0 2 L-2 10 L5 -2 L0 -2Z" fill={fill} />}
      {g === "grow" && <path d="M0 -10 L7 -2 L3 -2 L3 10 L-3 10 L-3 -2 L-7 -2Z" fill={fill} />}
      {g === "well" && <path d="M0 8 C-10 0 -8 -9 -2 -9 C0 -9 0 -7 0 -5 C0 -7 0 -9 2 -9 C8 -9 10 0 0 8Z" fill={fill} />}
    </g>
  );
}

export default function RainbowPlate({ lang, onDone }: DemoProps) {
  const [meal, setMeal] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [note, setNote] = useState<T | null>(null);
  const [drink, setDrink] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const inDrinks = meal >= MEALS.length;
  const m = MEALS[Math.min(meal, MEALS.length - 1)];
  const has = (g: Group) => chosen.some((k) => FOODS[k].group === g);
  const full = has("energy") && has("grow") && has("well");

  const pick = (k: string) => {
    const f = FOODS[k];
    if (f.group === "treat") {
      sound.gentle();
      setNote({ en: "Sweets are a sometimes treat, not a meal. Choose another food!", am: "ከረሜላ አልፎ አልፎ የሚበላ እንጂ ምግብ አይደለም። ሌላ ምግብ ምረጡ!" });
      return;
    }
    if (chosen.includes(k) || full) return;
    const wasNew = !has(f.group);
    sound.good();
    setChosen((c) => [...c, k]);
    setNote(wasNew ? null : { en: `That's another food for ${GROUP_NAME[f.group as Exclude<Group, "treat">].en}. Which job is still missing?`, am: `ይሄም ለ${GROUP_NAME[f.group as Exclude<Group, "treat">].am} ነው። የቀረው የትኛው ሥራ ነው?` });
  };

  const plateFoods = chosen.map((k) => FOODS[k].plate).filter(Boolean) as PlateFood[];
  const sides = chosen.filter((k) => FOODS[k].side);
  const injera = chosen.includes("injera");

  return (
    <DemoFrame lang={lang} title={{ en: "Build a Rainbow Plate", am: "የቀስተ ደመና ሳሕን ሥሩ" }} goal={{ en: "A little bit of every colour: energy, growing, keeping well.", am: "ከየቀለሙ ትንሽ ትንሽ፦ ጉልበት፣ ማደግ፣ ጤና መጠበቅ።" }} step={finished ? 3 : meal} total={3} color={COLOR}>
      <Stage label={t(lang, inDrinks ? { en: "A drink", am: "መጠጥ" } : m.say)}>
        <Home id="rp" time="day">
          {inDrinks || finished ? (
            <g>
              <Place x={110} y={294} s={0.5} tap={TAP.tsehay}>
                <Tsehay mood="joy" pose={drink ? "wave" : "sit"} />
              </Place>
              <Place x={300} y={294} s={0.5} flip tap={TAP.ayan}>
                <Camel who="ayan" mood="joy" />
              </Place>
              {drink === "water" && <Mug x={205} y={270} s={2.6} />}
              {drink === "milk" && <Mug x={205} y={270} s={2.6} drink="milk" color="#FFFFFF" />}
              {drink && <Sparkles x={205} y={220} r={50} delay={0.1} n={6} />}
            </g>
          ) : (
            <g>
              <Place x={70} y={296} s={0.4} tap={m.who === "tsehay" ? TAP.tsehay : TAP.ayan}>
                {m.who === "tsehay" ? <Tsehay mood={full ? "joy" : "happy"} /> : <Camel who="ayan" mood={full ? "joy" : "happy"} kneel />}
              </Place>
              <Plate x={205} y={250} s={1.7} foods={plateFoods} injera={injera || m.who === "tsehay"} />
              {sides.map((k, i) => (
                <g key={k} transform={`translate(${300 + (i % 2) * 40} ${200 + Math.floor(i / 2) * 50})`}>
                  {FOODS[k].side}
                </g>
              ))}
              {(["energy", "grow", "well"] as const).map((g, i) => (
                <g key={g} transform={`translate(${150 + i * 50} 56)`}>
                  <JobSign g={g} on={has(g)} />
                </g>
              ))}
              {full && <Sparkles x={205} y={220} r={70} delay={0.1} n={7} />}
            </g>
          )}
        </Home>
      </Stage>

      {finished ? (
        <Finale lang={lang} text={{ en: "Two rainbow meals and the best drinks!", am: "ሁለት የቀስተ ደመና ምግቦችና ምርጥ መጠጦች!" }} onDone={onDone} color={COLOR} />
      ) : inDrinks ? (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, { en: "After running, which drink is best for a thirsty body?", am: "ከሩጫ በኋላ ለተጠማ ሰውነት የትኛው መጠጥ ይሻላል?" })}</p>
          {drink && drink !== "soda" ? (
            <Feedback tone="great" action={<Next onClick={() => setFinished(true)} color={COLOR}>{t(lang, { en: "Finish", am: "ጨርሱ" })}</Next>}>
              {t(lang, drink === "water" ? { en: "Water is the best drink for thirsty bodies.", am: "ለተጠማ ሰውነት ከሁሉ የሚሻለው መጠጥ ውሃ ነው።" } : { en: "Milk is good too: it helps us grow strong. Water is best for thirst.", am: "ወተትም ጥሩ ነው፦ እንድናድግ ይረዳናል። ለጥማት ደግሞ ውሃ ይበልጣል።" })}
            </Feedback>
          ) : (
            <>
              {drink === "soda" && <Feedback tone="gentle">{t(lang, { en: "Fizzy drinks are full of sugar, which is bad for teeth: just a sometimes treat. Try another!", am: "ለስላሳ መጠጦች ብዙ ስኳር አላቸው፤ ለጥርስ ጎጂ ነው፦ አልፎ አልፎ ብቻ። ሌላ ሞክሩ!" })}</Feedback>}
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  { key: "soda", label: { en: "Sweet fizzy drink", am: "ጣፋጭ ለስላሳ መጠጥ" }, pic: svg(<SodaBottle x={0} y={20} s={0.8} />) },
                  { key: "water", label: { en: "Water", am: "ውሃ" }, pic: svg(<Mug x={0} y={12} s={1.1} />) },
                  { key: "milk", label: { en: "Milk", am: "ወተት" }, pic: svg(<Mug x={0} y={12} s={1.1} drink="milk" color="#FFFFFF" />) },
                ].map((o) => (
                  <Choice
                    key={o.key}
                    pic={o.pic}
                    tone={drink === o.key ? "soft" : "plain"}
                    onClick={() => {
                      if (o.key === "soda") sound.gentle();
                      else sound.good();
                      setDrink(o.key);
                    }}
                  >
                    {t(lang, o.label)}
                  </Choice>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <p className="font-display text-xl font-extrabold text-ink">{t(lang, m.say)}</p>
          {full ? (
            <Feedback
              tone="great"
              action={
                <Next
                  onClick={() => {
                    setMeal((n) => n + 1);
                    setChosen([]);
                    setNote(null);
                  }}
                  color={COLOR}
                >
                  {t(lang, { en: "Next", am: "ቀጣይ" })}
                </Next>
              }
            >
              {t(lang, { en: "A rainbow plate! Energy, growing and keeping well, all together.", am: "የቀስተ ደመና ሳሕን! ጉልበት፣ ማደግና ጤና መጠበቅ፣ ሁሉም በአንድ ላይ።" })}
            </Feedback>
          ) : (
            note && <Feedback tone="gentle">{t(lang, note)}</Feedback>
          )}
          {!full && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {m.tray.map((k) => {
                const f = FOODS[k];
                const on = chosen.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    data-food={k}
                    disabled={on}
                    onClick={() => pick(k)}
                    className="flex min-h-14 w-full items-center gap-2 rounded-2xl border-2 px-2 py-2 text-left font-display text-base font-extrabold leading-snug text-ink transition-transform active:translate-y-0.5 disabled:opacity-60"
                    style={{ background: on ? "#E4F7EA" : "#FFFFFF", borderColor: on ? "#2FA35A" : "#D3E4F4" }}
                  >
                    <span className="shrink-0">{f.pic}</span>
                    <span className="min-w-0 flex-1">{t(lang, f.label)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </DemoFrame>
  );
}
