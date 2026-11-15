"use client";

import { useEffect, useState } from "react";

import { LightRays, NumberBadge } from "@/components/book/scenery";
import { BeanJar, JarTag } from "@/components/book/courses/science-nature/kit-life";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Grow a Bean (level 1: what plants need). A time-lapse: set the water (none, a little, enough) and
  the light (dark, shade, sunny) with two sliders, then watch ten days go by in a few seconds. Three
  challenges, like Teacher Meron's class: grow a strong green bean (enough water, sunny); find out
  what happens with no water (it never starts); find out what happens in the dark (it grows long,
  thin and pale, using up the food packed in the seed). In the shade it grows green but smaller and
  leans toward the light.
*/

const WATER: T[] = [
  { en: "No water", am: "ውሃ የለም" },
  { en: "A little", am: "ትንሽ" },
  { en: "Enough", am: "በቂ" },
];
const LIGHT: T[] = [
  { en: "Dark", am: "ጨለማ" },
  { en: "Shade", am: "ጥላ" },
  { en: "Sunny", am: "ፀሐያማ" },
];

type Challenge = { goal: T; ok: (w: number, l: number) => boolean; yes: T; no: (w: number, l: number) => T };

const CHALLENGES: Challenge[] = [
  {
    goal: { en: "Challenge 1: grow a strong, green bean.", am: "ፈተና 1፦ ጠንካራና አረንጓዴ ባቄላ አብቅሉ።" },
    ok: (w, l) => w === 2 && l === 2,
    yes: { en: "Strong and green! Enough water to grow, and sunlight for the leaves to make food.", am: "ጠንካራና አረንጓዴ! ለማደግ በቂ ውሃ፣ ቅጠሎቹም ምግብ እንዲሠሩ የፀሐይ ብርሃን።" },
    no: (w, l) =>
      w === 0
        ? { en: "Nothing happened: without water, a seed can't start growing. Add water and try again.", am: "ምንም አልሆነም፦ ያለ ውሃ ዘር ማደግ አይጀምርም። ውሃ ጨምሩና እንደገና ሞክሩ።" }
        : l < 2
          ? { en: "It grew, but it isn't strong and green. Leaves need more light. Try again.", am: "አደገ፤ ግን ጠንካራና አረንጓዴ አይደለም። ቅጠሎች ተጨማሪ ብርሃን ያስፈልጋቸዋል። እንደገና ሞክሩ።" }
          : { en: "Green, but small: a little water isn't enough. Give it enough water and try again.", am: "አረንጓዴ ነው፤ ግን ትንሽ፦ ትንሽ ውሃ አይበቃም። በቂ ውሃ ስጡትና እንደገና ሞክሩ።" },
  },
  {
    goal: { en: "Challenge 2: what happens with NO water? Try it.", am: "ፈተና 2፦ ውሃ ከሌለ ምን ይሆናል? ሞክሩት።" },
    ok: (w) => w === 0,
    yes: { en: "Ten days, and the dry bean is still just a bean. Water wakes the seed up.", am: "አሥር ቀን፤ ደረቁ ባቄላ አሁንም ባቄላ ብቻ ነው። ውሃ ዘሩን ይቀሰቅሰዋል።" },
    no: () => ({ en: "That one had water. Slide the water all the way down to none, and grow again.", am: "ያኛው ውሃ ነበረው። ውሃውን እስከ «ውሃ የለም» ድረስ ዝቅ አድርጉና እንደገና አብቅሉ።" }),
  },
  {
    goal: { en: "Challenge 3: what happens in the DARK (with water)? Try it.", am: "ፈተና 3፦ በጨለማ (ከውሃ ጋር) ምን ይሆናል? ሞክሩት።" },
    ok: (w, l) => l === 0 && w > 0,
    yes: { en: "Tall, thin and pale yellow! In the dark it uses up the food packed in the seed, stretching to find light.", am: "ረጅም፣ ቀጭንና ገርጣ ቢጫ! በጨለማ ውስጥ ብርሃን ፍለጋ እየተዘረጋ በዘሩ ውስጥ የታሸገውን ምግብ ይጨርሳል።" },
    no: (w) =>
      w === 0
        ? { en: "Give it some water this time, so it can start, and keep it dark.", am: "በዚህ ጊዜ እንዲጀምር ትንሽ ውሃ ስጡት፤ ጨለማም አድርጉት።" }
        : { en: "Slide the light all the way down to dark, and grow again.", am: "ብርሃኑን እስከ «ጨለማ» ድረስ ዝቅ አድርጉና እንደገና አብቅሉ።" },
  },
];

/** How tall the bean grows by `day` (0–10) with this water and light. */
function stageFor(day: number, water: number, light: number) {
  if (water === 0) return 0;
  const max = water === 1 ? 3 : light === 1 ? 4 : 5;
  return Math.min(max, Math.floor(day / 2));
}

export default function BeanTimeLapse({ lang, onDone }: DemoProps) {
  const [water, setWater] = useState(1);
  const [light, setLight] = useState(1);
  const [day, setDay] = useState(0);
  const [growing, setGrowing] = useState(false);
  const [grown, setGrown] = useState(false);
  const [c, setC] = useState(0);
  const [finished, setFinished] = useState(false);
  const ch = CHALLENGES[Math.min(c, CHALLENGES.length - 1)];
  const success = grown && ch.ok(water, light);

  useEffect(() => {
    if (!growing) return;
    const id = window.setInterval(() => {
      setDay((d) => {
        if (d >= 10) {
          window.clearInterval(id);
          setGrowing(false);
          setGrown(true);
          return d;
        }
        return d + 1;
      });
    }, 260);
    return () => window.clearInterval(id);
  }, [growing]);

  useEffect(() => {
    if (!grown) return;
    if (ch.ok(water, light)) sound.good();
    else sound.gentle();
    // only when a grow finishes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grown]);

  const grow = () => {
    sound.tap();
    setDay(0);
    setGrown(false);
    setGrowing(true);
  };

  const change = (k: "water" | "light", v: number) => {
    if (growing) return;
    if (k === "water") setWater(v);
    else setLight(v);
    setGrown(false);
    setDay(0);
  };

  const stage = stageFor(day, water, light);
  const sky = light === 0 ? "#2A2440" : light === 1 ? "#9FB8C8" : "#BFE4FA";

  const slider = (k: "water" | "light", v: number, names: T[], color: string) => (
    <label className="block rounded-2xl border-2 border-[#D3E4F4] bg-white px-4 py-3">
      <span className="flex items-center justify-between font-display text-lg font-extrabold text-ink">
        <span>{t(lang, k === "water" ? { en: "Water", am: "ውሃ" } : { en: "Light", am: "ብርሃን" })}</span>
        <span style={{ color }}>{t(lang, names[v])}</span>
      </span>
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={v}
        data-slider={k}
        disabled={growing}
        onChange={(e) => change(k, Number(e.target.value))}
        className="mt-2 h-8 w-full cursor-pointer"
        style={{ accentColor: color }}
        aria-label={t(lang, k === "water" ? { en: "Water", am: "ውሃ" } : { en: "Light", am: "ብርሃን" })}
      />
    </label>
  );

  return (
    <DemoFrame lang={lang} title={{ en: "Grow a Bean", am: "ባቄላ እናብቅል" }} goal={finished ? CHALLENGES[2].goal : ch.goal} step={finished ? 3 : c} total={3}>
      <Stage label={t(lang, { en: "A bean in a glass jar", am: "በብልቃጥ ውስጥ ያለ ባቄላ" })}>
        <rect width={400} height={300} fill={sky} />
        {light === 2 && <LightRays x={60} y={20} n={5} />}
        {light === 2 && <circle cx={60} cy={40} r={26} fill="#FFD54A" />}
        <rect y={250} width={400} height={50} fill={light === 0 ? "#3A3048" : "#A8743A"} />
        <BeanJar x={200} y={250} s={2.4} stage={stage} dark={light === 0} dry={water === 0} lean={light === 1 ? -14 : 0} label={<JarTag kind={water === 0 ? "dry" : "water"} />} />
        <NumberBadge x={330} y={50} n={String(day)} delay={0} color="#2FA35A" />
        <text x={330} y={92} textAnchor="middle" fontSize={14} fontWeight={800} fill={light === 0 ? "#FFFFFF" : "#1B2A4E"} fontFamily="var(--font-grandstander), sans-serif">
          {t(lang, { en: "days", am: "ቀናት" })}
        </text>
      </Stage>
      {finished ? (
        <Finale lang={lang} text={{ en: "Water to wake it, light to make it green and strong: you're a plant scientist!", am: "ለመቀስቀስ ውሃ፣ አረንጓዴና ጠንካራ ለማድረግ ብርሃን፦ የተክል ሳይንቲስት ናችሁ!" }} onDone={onDone} />
      ) : (
        <>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {slider("water", water, WATER, "#2F6FD0")}
            {slider("light", light, LIGHT, "#E8A800")}
          </div>
          {grown ? (
            <Feedback
              tone={success ? "great" : "gentle"}
              action={
                success ? (
                  <Next
                    onClick={() => {
                      setGrown(false);
                      setDay(0);
                      if (c === CHALLENGES.length - 1) setFinished(true);
                      else setC(c + 1);
                    }}
                  >
                    {t(lang, c === CHALLENGES.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next challenge", am: "ቀጣዩ ፈተና" })}
                  </Next>
                ) : undefined
              }
            >
              {t(lang, success ? ch.yes : ch.no(water, light))}
            </Feedback>
          ) : null}
          {!success && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                data-grow=""
                disabled={growing}
                onClick={grow}
                className="min-h-14 rounded-2xl px-6 py-3 font-display text-xl font-extrabold text-white transition-transform active:translate-y-1 disabled:opacity-60"
                style={{ background: "#2FA35A", boxShadow: "0 5px 0 #1F7A40" }}
              >
                {t(lang, growing ? { en: "Growing…", am: "እያደገ ነው…" } : { en: "Grow for 10 days", am: "ለ10 ቀን አብቅሉ" })}
              </button>
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
