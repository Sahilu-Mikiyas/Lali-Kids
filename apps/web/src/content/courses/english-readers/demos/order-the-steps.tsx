"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, shuffled, t, type T } from "./kit";

/*
  "First, Next, Then, Last" (level 4: sequencing). Four picture cards for a job, muddled. The child
  taps them in order; each one jumps into the next slot under its order word (First, Next, Then,
  Last) and the voice reads its English step. A card out of turn wobbles back. Four jobs: the
  coffee ceremony, planting a seed, getting ready for school and the thirsty crow.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Step = { pic: string; en: string; am: string };
type Job = { title: T; steps: Step[] };
const JOBS: Job[] = [
  {
    title: { en: "Making coffee", am: "ቡና ማፍላት" },
    steps: [
      { pic: "beans-green", en: "Wash the beans.", am: "ፍሬውን እጠቡ።" },
      { pic: "pan", en: "Roast the beans.", am: "ፍሬውን ቁሉ።" },
      { pic: "mortar", en: "Grind the beans.", am: "ፍሬውን ውቀጡ።" },
      { pic: "jebena", en: "Boil the coffee.", am: "ቡናውን አፍሉ።" },
    ],
  },
  {
    title: { en: "Planting a seed", am: "ዘር መትከል" },
    steps: [
      { pic: "seed", en: "Plant the seed.", am: "ዘሩን ትከሉ።" },
      { pic: "water", en: "Water it.", am: "ውሃ አጠጡት።" },
      { pic: "seedling", en: "A shoot comes up.", am: "ቡቃያ ይወጣል።" },
      { pic: "flower", en: "It flowers!", am: "ያብባል!" },
    ],
  },
  {
    title: { en: "Ready for school", am: "ለትምህርት መዘጋጀት" },
    steps: [
      { pic: "sun", en: "Wake up.", am: "ተነሡ።" },
      { pic: "tap", en: "Wash your face.", am: "ፊታችሁን ታጠቡ።" },
      { pic: "bread", en: "Eat breakfast.", am: "ቁርስ ብሉ።" },
      { pic: "bag", en: "Go to school.", am: "ወደ ትምህርት ቤት ሂዱ።" },
    ],
  },
  {
    title: { en: "The thirsty crow", am: "የተጠማው ቁራ" },
    steps: [
      { pic: "crow", en: "The crow is thirsty.", am: "ቁራው ተጠምቷል።" },
      { pic: "jug", en: "The water is low.", am: "ውሃው ዝቅ ብሏል።" },
      { pic: "rock", en: "She drops in stones.", am: "ድንጋዮችን ትጥላለች።" },
      { pic: "water", en: "She drinks!", am: "ትጠጣለች!" },
    ],
  },
];
const ORDER = ["First", "Next", "Then", "Last"];
const BROWN = "#7A4A26";

export default function OrderTheSteps({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [placed, setPlaced] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = i >= JOBS.length;
  const job = JOBS[Math.min(i, JOBS.length - 1)];
  const complete = placed >= 4;
  const cards = useMemo(() => shuffled(job.steps.map((s, k) => ({ s, k })), (i + 5) / 23), [job, i]);

  const tap = (k: number) => {
    if (complete || k < placed) return;
    if (k === placed) {
      sfx.tap();
      say(`${ORDER[k]}. ${job.steps[k].en}`, 0.85);
      const n = placed + 1;
      setPlaced(n);
      setWrong(null);
      if (n >= 4) {
        sfx.good();
        setTimeout(() => {
          setPlaced(0);
          setI((x) => x + 1);
        }, 2600);
      }
    } else {
      sfx.oops();
      setWrong(k);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "First, Next, Then, Last", am: "መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ" }}
      howTo={{ en: "The pictures are muddled. Tap them in order: what happens first?", am: "ሥዕሎቹ ተደበላልቀዋል። በቅደም ተከተል ንኩ፦ መጀመሪያ ምን ይሆናል?" }}
      total={JOBS.length}
      got={Math.min(i + (complete ? 1 : 0), JOBS.length)}
      done={done}
      onDone={onDone}
      color={BROWN}
      onAgain={() => {
        setI(0);
        setPlaced(0);
        setWrong(null);
      }}
      ending={
        <p className="text-lg font-bold" style={ANDIKA} lang="en">
          First, next, then, last!
        </p>
      }
    >
      <p className="text-center text-xl font-bold" style={{ color: BROWN }}>
        {job.title[lang]}
      </p>
      <div className="mt-2 grid grid-cols-4 gap-1.5" data-placed={placed}>
        {ORDER.map((o, k) => (
          <div key={o} className="flex flex-col items-center">
            <span className="text-sm font-bold" style={{ ...ANDIKA, color: BROWN }} lang="en">
              {o}
            </span>
            <div className="mt-1 grid h-[86px] w-full place-items-center rounded-2xl border-4 border-dashed bg-white" style={{ borderColor: k < placed ? "#2FA35A" : "#E3D5C3" }}>
              {k < placed && (
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center">
                  <Pic id={job.steps[k].pic} size={50} />
                  <span className="px-1 text-center text-[11px] font-bold leading-tight" style={ANDIKA} lang="en">
                    {job.steps[k].en}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {cards.map(({ s, k }) => (
          <motion.button
            key={`${i}-${k}`}
            type="button"
            data-choice={k === placed ? "right" : "wrong"}
            disabled={k < placed}
            onClick={() => tap(k)}
            animate={wrong === k ? { x: [0, -6, 6, -4, 0] } : { opacity: k < placed ? 0.2 : 1 }}
            className="grid h-[86px] place-items-center rounded-2xl border-4 bg-white shadow-[0_4px_0_#00000018]"
            style={{ borderColor: wrong === k ? "#E58A00" : "#FFFFFF" }}
            aria-label={s.en}
          >
            <Pic id={s.pic} size={60} />
          </motion.button>
        ))}
      </div>

      {complete ? (
        <Note tone="good">{t(lang, { en: "First, next, then, last: in order!", am: "መጀመሪያ፣ ቀጥሎ፣ ከዚያ፣ በመጨረሻ፦ በቅደም ተከተል!" })}</Note>
      ) : wrong !== null ? (
        <Note tone="try">{t(lang, { en: "Not yet! What has to happen before that?", am: "ገና ነው! ከዚያ በፊት ምን መሆን አለበት?" })}</Note>
      ) : (
        <Note tone="plain">
          <span lang="en" style={ANDIKA} className="font-bold">
            {ORDER[Math.min(placed, 3)]}…
          </span>
          {lang === "am" && ` (${["መጀመሪያ", "ቀጥሎ", "ከዚያ", "በመጨረሻ"][Math.min(placed, 3)]}…)`}
        </Note>
      )}
    </Frame>
  );
}
