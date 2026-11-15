"use client";

import { useState, type ReactNode } from "react";

import { Grandma, Gugu, TAP } from "@/components/book/courses/healthy-safe/kit-cast";
import { Yard } from "@/components/book/courses/healthy-safe/kit-places";
import { Ball, Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { Bajaj, CrossingSign, Minibus, Road } from "@/components/book/courses/healthy-safe/kit-safety";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Round } from "./choice-rounds";
import { Next, sound, t } from "./demo-kit";

/*
  Cross with a Grown-Up (level 5), from "Hold My Hand, Gugu!". Five moments at the roadside; each
  time the child decides whether to wait or cross. Gugu is always with Grandma, holding hands, at
  the zebra crossing. Then the routine itself: tap the steps in order (hold hands, stop at the
  edge, look both ways, listen, walk across when it's clear). Answers carry data-choice.
*/

const COLOR = "#2E9A8A";
const ZEBRA = 200;

function Street({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <Yard id={id} time="day" house={false}>
      <Road y={200} h={60} zebra={ZEBRA} />
      <rect x={-10} y={260} width={420} height={50} fill="#C9C2B4" />
      <CrossingSign x={252} y={280} s={0.7} />
      {children}
    </Yard>
  );
}

function Pair({ alone = false, joy = false }: { alone?: boolean; joy?: boolean }) {
  return (
    <g>
      {!alone && (
        <Place x={170} y={298} s={0.4} tap={TAP.grandma}>
          <Grandma arm="hold" mood={joy ? "joy" : "happy"} />
        </Place>
      )}
      <Place x={212} y={300} s={0.32} tap={TAP.gugu}>
        <Gugu mood={joy ? "joy" : "happy"} />
      </Place>
    </g>
  );
}

const WAIT = { en: "Wait", am: "መጠበቅ" };
const CROSS = { en: "Cross now", am: "አሁን መሻገር" };

const ROUNDS: Round[] = [
  {
    say: { en: "A blue minibus is coming. Gugu and Grandma are at the crossing. What do they do?", am: "ሰማያዊ ሚኒባስ እየመጣ ነው። ጉጉና አያቴ ማቋረጫው ጋ ናቸው። ምን ያድርጉ?" },
    options: [
      { label: WAIT, ok: true },
      { label: CROSS, ok: false, note: { en: "Something is coming! Cars can't stop quickly. Wait until the road is clear.", am: "የሚመጣ ነገር አለ! መኪኖች ቶሎ አይቆሙም። መንገዱ ጸጥ እስኪል ጠብቁ።" } },
    ],
    good: { en: "Wait! Let it go past first.", am: "ጠብቁ! መጀመሪያ ይለፍ።" },
    scene: (id, s) => (
      <Street id={id}>
        <Minibus x={s === "good" ? 360 : 90} y={236} s={0.8} />
        <Pair />
      </Street>
    ),
  },
  {
    say: { en: "Gugu looked this way: clear. But a bajaj is coming from the other way!", am: "ጉጉ ወደዚህ ተመለከተ፦ ጸጥ ነው። ግን ከሌላው በኩል ባጃጅ እየመጣ ነው!" },
    options: [
      { label: CROSS, ok: false, note: { en: "Look both ways, and again! A bajaj is coming from the other side.", am: "በሁለቱም በኩል ተመልከቱ፤ እንደገናም! ከሌላው በኩል ባጃጅ እየመጣ ነው።" } },
      { label: WAIT, ok: true },
    ],
    good: { en: "Yes: look both ways before you cross.", am: "አዎ፦ ከመሻገር በፊት በሁለቱም በኩል ተመልከቱ።" },
    scene: (id, s) => (
      <Street id={id}>
        <Bajaj x={s === "good" ? 40 : 320} y={254} s={0.9} flip />
        <Pair />
      </Street>
    ),
  },
  {
    say: { en: "The cars have stopped at the stripes. Gugu looks both ways and listens: all clear.", am: "መኪኖቹ ከመስመሩ በፊት ቆመዋል። ጉጉ በሁለቱም በኩል ተመልክቶ አዳመጠ፦ ሁሉም ጸጥ ነው።" },
    options: [
      { label: WAIT, ok: false, note: { en: "It's clear and the cars have stopped. Now you can cross, holding hands.", am: "ጸጥ ነው፤ መኪኖቹም ቆመዋል። አሁን እጅ ተያይዛችሁ መሻገር ትችላላችሁ።" } },
      { label: CROSS, ok: true },
    ],
    good: { en: "Now! Walk, don't run, all the way across.", am: "አሁን! ሳትሮጡ በእርምጃ እስከ ማዶ።" },
    scene: (id, s) => (
      <Street id={id}>
        <Minibus x={90} y={236} s={0.8} />
        <Bajaj x={320} y={254} s={0.9} flip />
        {s === "good" ? (
          <g>
            <Place x={190} y={250} s={0.34} tap={TAP.grandma}>
              <Grandma arm="hold" mood="joy" />
            </Place>
            <Place x={222} y={252} s={0.26} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
          </g>
        ) : (
          <Pair />
        )}
      </Street>
    ),
  },
  {
    say: { en: "Gugu is at the road by himself. Grandma is still in the shop.", am: "ጉጉ ብቻውን መንገዱ ጋ ነው። አያቴ ገና ሱቅ ውስጥ ናት።" },
    options: [
      { label: { en: "Wait for Grandma", am: "አያቴን መጠበቅ" }, ok: true },
      { label: { en: "Cross on his own", am: "ብቻውን መሻገር" }, ok: false, note: { en: "Little ones always cross with a grown-up, holding hands.", am: "ትንንሾች ሁልጊዜ ከትልቅ ሰው ጋር እጅ ተያይዘው ይሻገራሉ።" } },
    ],
    good: { en: "Wait for a grown-up, then hold hands.", am: "ትልቅ ሰው ጠብቁ፤ ከዚያ እጅ ያዙ።" },
    scene: (id, s) => (
      <Street id={id}>
        <Pair alone={s !== "good"} joy={s === "good"} />
      </Street>
    ),
  },
  {
    say: { en: "Oh no, Gugu's ball rolls into the road!", am: "ኧረ፣ የጉጉ ኳስ ወደ መንገዱ ተንከባለለ!" },
    options: [
      { label: { en: "Run after it", am: "ተከትሎ መሮጥ" }, ok: false, note: { en: "Never run into the road after a ball. A grown-up will get it when it's safe.", am: "ኳስ ተከትሎ በፍጹም ወደ መንገድ አትሩጡ። ደህና ሲሆን ትልቅ ሰው ያመጣዋል።" } },
      { label: { en: "Stay on the side and ask Grandma", am: "ዳር ላይ ቆይቶ አያቴን መጠየቅ" }, ok: true },
    ],
    good: { en: "Stay on the side. Grandma gets it when the road is clear.", am: "ዳር ላይ ቆዩ። መንገዱ ጸጥ ሲል አያቴ ታመጣዋለች።" },
    scene: (id, s) => (
      <Street id={id}>
        <Ball x={s === "good" ? 150 : 210} y={s === "good" ? 290 : 232} s={0.7} />
        <Pair />
      </Street>
    ),
  },
];

const STEPS = [
  { key: "hold", label: { en: "Hold hands", am: "እጅ ያዝ" } },
  { key: "stop", label: { en: "Stop at the edge", am: "ዳሩ ላይ ቁም" } },
  { key: "look", label: { en: "Look both ways", am: "በሁለቱም በኩል ተመልከት" } },
  { key: "listen", label: { en: "Listen", am: "አዳምጥ" } },
  { key: "walk", label: { en: "Walk across when it's clear", am: "ጸጥ ሲል በእርምጃ ተሻገር" } },
];
const PILE = ["look", "walk", "hold", "listen", "stop"];

export default function CrossTheRoad({ lang, onDone }: DemoProps) {
  const [n, setN] = useState(0);
  const [oops, setOops] = useState(false);
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Cross with a Grown-Up", am: "ከትልቅ ሰው ጋር መሻገር" }}
      goal={{ en: "Wait, or cross? Stop, look, listen, hold hands!", am: "መጠበቅ ወይስ መሻገር? ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ!" }}
      color={COLOR}
      rounds={ROUNDS}
      cols={2}
      ending={(id, finish) => ({
        scene: (
          <Street id={id}>
            <Pair joy={n >= STEPS.length} />
            {n >= STEPS.length && <Sparkles x={200} y={200} r={70} delay={0.1} n={7} />}
          </Street>
        ),
        controls: (
          <div className="mt-4">
            <p className="font-display text-xl font-extrabold text-ink">
              {t(lang, n >= STEPS.length ? { en: "That's how we cross, every time!", am: "ሁልጊዜ የምንሻገረው እንዲህ ነው!" } : { en: "Now tap the steps in order.", am: "አሁን ደረጃዎቹን በቅደም ተከተል ንኩ።" })}
            </p>
            {oops && n < STEPS.length && <p className="mt-1 text-lg text-muted">{t(lang, { en: "Not yet: what comes first?", am: "ገና ነው፦ መጀመሪያ ምን ይመጣል?" })}</p>}
            {n >= STEPS.length ? (
              <div className="mt-3">
                <Next onClick={finish} color={COLOR}>
                  {t(lang, { en: "Finish", am: "ጨርሱ" })}
                </Next>
              </div>
            ) : (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {PILE.map((k) => {
                  const at = STEPS.findIndex((x) => x.key === k);
                  const done = at < n;
                  return (
                    <button
                      key={k}
                      type="button"
                      data-step={k}
                      disabled={done}
                      onClick={() => {
                        if (at === n) {
                          sound.good();
                          setN((x) => x + 1);
                          setOops(false);
                        } else {
                          sound.gentle();
                          setOops(true);
                        }
                      }}
                      className="min-h-12 w-full rounded-2xl border-2 px-3 py-2 text-left font-display text-base font-extrabold text-ink disabled:opacity-60"
                      style={{ background: done ? "#E4F7EA" : "#FFFFFF", borderColor: done ? "#2FA35A" : "#D3E4F4" }}
                    >
                      {done ? `${at + 1}. ` : ""}
                      {t(lang, STEPS[at].label)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ),
      })}
      finale={{ en: "Stop, look, listen, hold hands. Road safe!", am: "ቁም፣ ተመልከት፣ አዳምጥ፣ እጅ ያዝ። በመንገድ ደህና!" }}
      finaleScene={(id) => (
        <Street id={id}>
          <Pair joy />
          <Sparkles x={200} y={200} r={70} delay={0.1} n={7} />
        </Street>
      )}
      onDone={onDone}
    />
  );
}
