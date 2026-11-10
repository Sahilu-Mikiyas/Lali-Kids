"use client";

import { useId, useState, type ReactNode } from "react";

import { Place, Rain, Sun } from "@/components/book/scenery";
import { TAP, Wolf } from "@/components/book/courses/our-ethiopia/kit-cast";
import { CoffeeBush, HighlandFarm, Ox, TeffClump, Waterfall } from "@/components/book/courses/our-ethiopia/kit-land";
import { TeffField } from "@/components/book/courses/our-ethiopia/kit-places";
import { Sheaf, Sickle } from "@/components/book/courses/our-ethiopia/kit-props";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Rain or Sun? (level 1). Six pictures from a year on a highland farm; for each, the child says
  whether it happens in kiremt (the big rains, about Sene to Meskerem) or in bega (the dry, sunny
  time after the rains). Teff is sown in the wet fields of kiremt and cut and threshed in bega;
  rivers and waterfalls are fullest in kiremt; coffee cherries turn red and are picked in bega.
  A wrong answer shows why, kindly, and the child tries again.
*/

type Season = "kiremt" | "bega";
type Card = { season: Season; text: T; why: T; pic: (id: string) => ReactNode };

const CARDS: Card[] = [
  {
    season: "kiremt",
    text: { en: "Big grey clouds, and rain almost every afternoon.", am: "ትልልቅ ግራጫ ደመናዎች፣ ከሰዓት በኋላ ማለት ይቻላል በየቀኑ ዝናብ።" },
    why: { en: "That's kiremt, the time of the big rains.", am: "ያ ክረምት ነው፤ የትልቁ ዝናብ ጊዜ።" },
    pic: (id) => (
      <g>
        <HighlandFarm id={id} season="kiremt" />
        <Rain heavy />
      </g>
    ),
  },
  {
    season: "bega",
    text: { en: "Cutting the golden teff with sickles.", am: "ወርቃማውን ጤፍ በማጭድ ማጨድ።" },
    why: { en: "Teff ripens in the sunny days after the rains, so it is cut in bega.", am: "ጤፍ ከዝናቡ በኋላ ባሉት ፀሐያማ ቀናት ይበስላል፤ ስለዚህ በበጋ ይታጨዳል።" },
    pic: (id) => (
      <g>
        <TeffField id={id} time="day" cut={0.35} />
        <Sheaf x={70} y={266} s={1.2} />
        <Place x={220} y={296} s={0.44} tap={TAP.hawi}>
          <Wolf mood="joy" arm="give" item={<Sickle swing />} />
        </Place>
      </g>
    ),
  },
  {
    season: "kiremt",
    text: { en: "Sowing tiny teff seeds on the wet, muddy field.", am: "ጥቃቅኖቹን የጤፍ ዘሮች በእርጥቡና በጭቃማው ማሳ ላይ መዝራት።" },
    why: { en: "Teff needs rain to grow, so it is sown in kiremt.", am: "ጤፍ ለማደግ ዝናብ ያስፈልገዋል፤ ስለዚህ በክረምት ይዘራል።" },
    pic: (id) => (
      <g>
        <HighlandFarm id={id} season="kiremt" />
        <path d="M-10 230 Q200 214 410 232 L410 310 L-10 310Z" fill="#6A4A30" />
        <Place x={200} y={296} s={0.46} tap={TAP.elder}>
          <Wolf elder mood="happy" arm="give" />
        </Place>
        <g fill="#F5D27A">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={236 + i * 8} cy={236 + (i % 3) * 8} r={1.6} />
          ))}
        </g>
        <Rain />
      </g>
    ),
  },
  {
    season: "kiremt",
    text: { en: "Rivers grow wide and brown, and the Blue Nile Falls roar.", am: "ወንዞች ይሰፋሉ፣ ይደፈርሳሉ፤ የጢስ ዓባይ ፏፏቴም ያገሣል።" },
    why: { en: "All that rain fills the rivers: the falls are biggest in kiremt.", am: "ያ ሁሉ ዝናብ ወንዞቹን ይሞላል፤ ፏፏቴው ትልቁ የሚሆነው በክረምት ነው።" },
    pic: () => (
      <g>
        <rect width={400} height={300} fill="#8E9CB8" />
        <Waterfall x={200} y={110} w={280} h={110} />
        <rect x={-10} y={240} width={420} height={70} fill="#9A7A52" />
      </g>
    ),
  },
  {
    season: "bega",
    text: { en: "Oxen walking round and round on the threshing floor.", am: "በሬዎች በአውድማው ላይ እየዞሩ ሲያበራዩ።" },
    why: { en: "Threshing comes after the harvest, in the dry days of bega.", am: "ማበራየት ከመከሩ በኋላ፣ በበጋው ደረቅ ቀናት ይመጣል።" },
    pic: (id) => (
      <g>
        <HighlandFarm id={id} season="bega" />
        <ellipse cx={200} cy={262} rx={150} ry={34} fill="#D8B060" stroke="#9A7A52" strokeWidth={4} />
        <Ox x={150} y={272} s={1} />
        <Ox x={250} y={262} s={1} flip color="#5A3A2A" />
      </g>
    ),
  },
  {
    season: "bega",
    text: { en: "Picking ripe red coffee cherries.", am: "የበሰሉ ቀይ የቡና ፍሬዎችን መልቀም።" },
    why: { en: "Coffee cherries ripen and are picked after the rains, in bega.", am: "የቡና ፍሬ ከዝናቡ በኋላ፣ በበጋ ይበስላል፤ ይለቀማልም።" },
    pic: (id) => (
      <g>
        <HighlandFarm id={id} season="bega" />
        <CoffeeBush x={130} y={280} s={2} />
        <CoffeeBush x={280} y={286} s={1.7} delay={-1} />
      </g>
    ),
  },
];

const SEASON: Record<Season, T> = {
  kiremt: { en: "Kiremt: the big rains", am: "ክረምት፦ ትልቁ ዝናብ" },
  bega: { en: "Bega: dry and sunny", am: "በጋ፦ ደረቅና ፀሐያማ" },
};

function Icon({ s }: { s: Season }) {
  return (
    <svg width={40} height={40} viewBox="-20 -20 40 40" aria-hidden>
      {s === "kiremt" ? (
        <g>
          <ellipse cx={-2} cy={-4} rx={14} ry={8} fill="#7E8CA8" />
          <ellipse cx={6} cy={-8} rx={9} ry={7} fill="#8E9CB8" />
          <path d="M-8 6 l-2 6 M0 6 l-2 6 M8 6 l-2 6" stroke="#3E8FD8" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <circle r={9} fill="#FFD233" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M0 -12 V-17" stroke="#F5B21E" strokeWidth={2.4} strokeLinecap="round" transform={`rotate(${a})`} />
          ))}
        </g>
      )}
    </svg>
  );
}

export default function RainOrSun({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Season | null>(null);
  const done = i >= CARDS.length;
  const c = CARDS[Math.min(i, CARDS.length - 1)];
  const right = pick === c.season;

  return (
    <DemoFrame lang={lang} title={{ en: "Rain or Sun?", am: "ዝናብ ወይስ ፀሐይ?" }} goal={{ en: "Does it happen in kiremt, the big rains, or in bega, the dry time?", am: "በክረምት፣ በትልቁ ዝናብ ነው የሚሆነው ወይስ በበጋ፣ በደረቁ ጊዜ?" }} step={i} total={CARDS.length} color="#15803D">
      <Stage label={done ? undefined : t(lang, c.text)}>
        {done ? (
          <g>
            <HighlandFarm id={`${id}-end`} season="meskel" />
            <Sun x={300} y={60} r={24} />
            {[60, 110, 160, 210, 260, 310, 360].map((x, k) => (
              <TeffClump key={x} x={x} y={270} s={1.5} delay={-k * 0.3} />
            ))}
          </g>
        ) : (
          <g key={i}>{c.pic(`${id}-${i}`)}</g>
        )}
      </Stage>
      {done ? (
        <Finale lang={lang} text={{ en: "Rain to grow, sun to ripen: you know the seasons!", am: "ዝናብ ያበቅላል፣ ፀሐይ ያበስላል፦ ወቅቶቹን ታውቃላችሁ!" }} onDone={onDone} color="#15803D" />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, c.text)}</p>
          {pick && right ? (
            <Feedback tone="great" action={<Next onClick={() => { setI((n) => n + 1); setPick(null); }} color="#15803D">{t(lang, i === CARDS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next picture", am: "ቀጣዩ ሥዕል" })}</Next>}>
              {t(lang, c.why)}
            </Feedback>
          ) : pick ? (
            <Feedback tone="gentle" action={<Next onClick={() => setPick(null)} color="#C98A0A">{t(lang, { en: "Try again", am: "እንደገና ሞክሩ" })}</Next>}>
              {t(lang, { en: "Not this time. Think: is it rainy or sunny? ", am: "በዚህ ጊዜ አይደለም። አስቡ፦ ዝናባማ ነው ወይስ ፀሐያማ? " }) + t(lang, c.why)}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(["kiremt", "bega"] as const).map((s) => (
                <Choice
                  key={s}
                  pic={<Icon s={s} />}
                  onClick={() => {
                    setPick(s);
                    if (s === c.season) sound.good();
                    else sound.gentle();
                  }}
                >
                  {t(lang, SEASON[s])}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
