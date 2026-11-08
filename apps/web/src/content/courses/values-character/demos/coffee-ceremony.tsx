"use client";

import { useId, useState, type ReactNode } from "react";

import { AuntieSheep, Camel, Cub, Grandma, Gugu, TAP, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Home } from "@/components/book/courses/values-character/kit-places";
import { CoffeeTray, Cup, Hearth, Hearts, Incense, Jebena, Mortar, Qetema, RoastPan, Sheaf, SnackBowl, Sparkles, Speech, Steam } from "@/components/book/courses/values-character/kit-props";
import { Place, vars } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  The Coffee Ceremony (level 3: togetherness), from "Three Cups of Coffee". The child helps
  Grandma, step by step, by tapping the glowing thing: spread the grass, light the incense, roast
  the beans (three taps), carry the smell round, pound the beans (four taps), boil the jebena,
  then pour three rounds: abol (serving the eldest guest first), tona (news and worries shared)
  and bereka (blessings). Children get popcorn, not coffee.
*/

type Step = "grass" | "incense" | "roast" | "smell" | "grind" | "boil" | "abol" | "tona" | "bereka" | "end";
const STEPS: Step[] = ["grass", "incense", "roast", "smell", "grind", "boil", "abol", "tona", "bereka", "end"];

const SAY: Record<Step, T> = {
  grass: { en: "First, spread fresh green grass on the floor. Tap the floor!", am: "መጀመሪያ ትኩስ ቄጠማ ወለሉ ላይ እንጎዝጉዝ። ወለሉን ንኩ!" },
  incense: { en: "Light the incense, so the room smells sweet.", am: "ክፍሉ እንዲያውድ ዕጣኑን እናጫው።" },
  roast: { en: "Roast the green beans: tap the pan three times. Crackle, pop!", am: "አረንጓዴውን ቡና እንቁላው፦ ምጣዱን ሦስት ጊዜ ንኩ። ቋ፣ ቋ!" },
  smell: { en: "Carry the smoking pan round, so every guest can smell it.", am: "ሁሉም እንግዳ እንዲያሸተው የሚጨሰውን ምጣድ ይዘን እንዙር።" },
  grind: { en: "Pound the beans in the mortar: tap it four times.", am: "ቡናውን በሙቀጫ እንውቀጠው፦ አራት ጊዜ ንኩት።" },
  boil: { en: "Into the jebena it goes. Tap the jebena to boil the coffee.", am: "ወደ ጀበናው ገባ። ቡናው እንዲፈላ ጀበናውን ንኩ።" },
  abol: { en: "Abol, the first round! Serve the eldest guest first.", am: "አቦል፣ የመጀመሪያው ዙር! መጀመሪያ ከሁሉ ታላቁን እንግዳ እናስተናግድ።" },
  tona: { en: "Tona, the second round. Tap the jebena to pour again.", am: "ቶና፣ ሁለተኛው ዙር። እንደገና ለመቅዳት ጀበናውን ንኩ።" },
  bereka: { en: "Bereka, the third round: the blessing. Tap the jebena!", am: "በረካ፣ ሦስተኛው ዙር፦ ምርቃቱ። ጀበናውን ንኩ!" },
  end: { en: "Abol, tona, bereka!", am: "አቦል፣ ቶና፣ በረካ!" },
};

const GUESTS = [
  { key: "tolosa", x: 70, name: { en: "Grandpa Tolosa", am: "አባ ቶሎሳ" } },
  { key: "sheep", x: 140, name: { en: "Auntie Sheep", am: "እማማ በግ" } },
  { key: "hooyo", x: 210, name: { en: "Hooyo", am: "ሁዮ" } },
] as const;

/** A pulsing ring that says "tap here". */
function Glow({ x, y, r = 30 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} pointerEvents="none">
      <circle r={r} fill="none" stroke="#FFD233" strokeWidth={4} className="lali-pulse" style={vars({ "--dur": "1.2s" })} />
    </g>
  );
}

/** An invisible, finger-sized tap target. */
function Hit({ x, y, r = 34, onTap, label }: { x: number; y: number; r?: number; onTap: () => void; label: string }) {
  return <circle cx={x} cy={y} r={r} fill="transparent" onClick={onTap} style={{ cursor: "pointer" }} role="button" aria-label={label} />;
}

export default function CoffeeCeremony({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [s, setS] = useState(0);
  const [count, setCount] = useState(0);
  const [served, setServed] = useState<string[]>([]);
  const [hint, setHint] = useState<T | null>(null);
  const step = STEPS[s];
  const at = (k: Step) => STEPS.indexOf(k) <= s;

  const go = () => {
    sound.good();
    setS((n) => n + 1);
    setCount(0);
    setHint(null);
  };
  const tapTimes = (need: number) => {
    sound.tap();
    if (count + 1 >= need) go();
    else setCount((c) => c + 1);
  };
  const serve = (key: string) => {
    const nextKey = GUESTS[served.length]?.key;
    if (key === nextKey) {
      sound.good();
      const done = [...served, key];
      setServed(done);
      setHint(null);
      if (done.length === GUESTS.length) setTimeout(go, 700);
    } else if (!served.includes(key)) {
      sound.gentle();
      const who = GUESTS[served.length];
      setHint(
        served.length === 0
          ? { en: `${who.name.en} is the eldest. We serve elders first!`, am: `ከሁሉ ታላቁ ${who.name.am} ናቸው። መጀመሪያ ታላላቆችን እናስተናግዳለን!` }
          : { en: `Next comes ${who.name.en}: from the eldest down.`, am: `ቀጥሎ ${who.name.am}፦ ከታላቁ ወደ ታናሹ።` },
      );
    }
  };

  const roasted = at("smell");
  const brewing = at("abol");
  const fullCups = step === "abol" ? served.length : at("tona") ? 3 : 0;

  let target: ReactNode = null;
  if (step === "grass") target = <><Glow x={200} y={270} r={40} /><Hit x={200} y={270} r={60} onTap={go} label={t(lang, SAY.grass)} /></>;
  if (step === "incense") target = <><Glow x={34} y={272} /><Hit x={34} y={272} onTap={go} label={t(lang, SAY.incense)} /></>;
  if (step === "roast") target = <><Glow x={300} y={262} /><Hit x={300} y={262} onTap={() => tapTimes(3)} label={t(lang, SAY.roast)} /></>;
  if (step === "smell") target = <><Glow x={300} y={262} /><Hit x={300} y={262} onTap={go} label={t(lang, SAY.smell)} /></>;
  if (step === "grind") target = <><Glow x={260} y={260} /><Hit x={260} y={260} onTap={() => tapTimes(4)} label={t(lang, SAY.grind)} /></>;
  if (step === "boil" || step === "tona" || step === "bereka") target = <><Glow x={300} y={244} /><Hit x={300} y={244} onTap={go} label={t(lang, SAY[step])} /></>;

  return (
    <DemoFrame lang={lang} title={{ en: "The Coffee Ceremony", am: "የቡና ሥነ-ሥርዓት" }} goal={{ en: "Help Grandma make coffee for the neighbours. Tap whatever is glowing.", am: "አያቴን ለጎረቤቶች ቡና እንድታፈላ እንርዳት። የሚያበራውን ንኩ።" }} step={Math.min(s, STEPS.length - 1)} total={STEPS.length - 1} color="#6A3A22">
      <Stage label={t(lang, SAY[step])}>
        <Home id={id} time={at("bereka") ? "evening" : "day"} shelf={false}>
          {at("incense") && <Qetema x={200} y={262} w={320} />}
          {at("roast") ? (
            <Incense x={34} y={284} s={1.2} />
          ) : (
            <g transform="translate(34 284) scale(1.2)">
              <path d="M-10 0 L-6 -10 L6 -10 L10 0Z" fill="#B8683E" />
              <ellipse cx={0} cy={-10} rx={9} ry={3} fill="#8E4A2A" />
            </g>
          )}
          {GUESTS.map((g) => {
            const isServed = served.includes(g.key) || at("tona");
            const mood = step === "smell" || isServed ? "joy" : "happy";
            return (
              <g key={g.key}>
                <Place x={g.x} y={256} s={0.4} tap={g.key === "tolosa" ? TAP.elder : g.key === "sheep" ? TAP.sheep : TAP.mama}>
                  {g.key === "tolosa" ? <Wolf elder mood={mood} /> : g.key === "sheep" ? <AuntieSheep mood={step === "tona" ? "worried" : mood} /> : <Camel who="hooyo" mood={mood} kneel />}
                </Place>
                {isServed && (
                  <g transform={`translate(${g.x + 22} 242)`}>
                    <Cup x={0} y={0} s={1.2} />
                  </g>
                )}
                {step === "abol" && !served.includes(g.key) && (
                  <>
                    {GUESTS[served.length]?.key === g.key && hint && <Glow x={g.x} y={214} r={36} />}
                    <Hit x={g.x} y={214} r={36} onTap={() => serve(g.key)} label={t(lang, g.name)} />
                  </>
                )}
              </g>
            );
          })}
          <Place x={36} y={298} s={0.36} tap={TAP.gugu}>
            <Gugu mood={at("abol") ? "joy" : "happy"} />
          </Place>
          {at("abol") && <SnackBowl x={70} y={292} s={0.8} kind="popcorn" hop />}
          <CoffeeTray x={160} y={292} s={0.9} full={fullCups} cups={3} />
          {!roasted ? (
            <Hearth x={300} y={284} pot={false}>
              <g transform="translate(0 -14)">
                <RoastPan x={0} y={0} s={1.1} dark={count >= 2} />
              </g>
            </Hearth>
          ) : (
            <Hearth x={300} y={284} pot={false}>
              <g transform="translate(0 -10)">
                <Jebena x={0} y={0} s={0.9} steam={brewing} />
              </g>
            </Hearth>
          )}
          {step === "smell" && (
            <g transform="translate(0 196)">
              <g className="lali-move-in" style={vars({ "--fx": "300px", "--fy": "50px", "--dur": "2.4s", "--delay": "0s" })}>
                <RoastPan x={140} y={0} s={1} dark />
              </g>
            </g>
          )}
          {at("grind") && <Mortar x={260} y={284} s={1.1} />}
          <Place x={364} y={292} s={0.42} flip tap={TAP.grandma}>
            <Grandma arm={step === "abol" || step === "tona" || step === "bereka" ? "pour" : "down"} mood="joy" />
          </Place>
          {step === "tona" && (
            <Speech x={140} y={130} w={56} h={40} tail="down" delay={0.3}>
              <g transform="translate(-10 16) scale(0.5)">
                <Sheaf x={0} y={0} />
              </g>
              <path d="M12 -10 Q6 0 12 4 Q18 0 12 -10Z" fill="#7FC8F8" />
            </Speech>
          )}
          {at("bereka") && <Hearts spots={[[80, 170, 0.2], [140, 160, 0.8], [210, 170, 1.4], [300, 160, 2]]} />}
          {step === "end" && <Sparkles x={200} y={150} r={130} delay={0.1} n={10} />}
          {step === "end" && (
            <Place x={262} y={298} s={0.32} flip tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
          )}
          {(step === "roast" || step === "grind") && (
            <g transform="translate(300 60)">
              <rect x={-44} y={-16} width={88} height={30} rx={15} fill="#FFFFFF" opacity={0.9} />
              {Array.from({ length: step === "roast" ? 3 : 4 }, (_, k) => (
                <circle key={k} cx={(k - (step === "roast" ? 1 : 1.5)) * 18} cy={-1} r={6} fill={k < count ? "#6A3A22" : "#E6DCC8"} />
              ))}
            </g>
          )}
          {brewing && step !== "end" && <Steam x={300} y={200} />}
          {target}
        </Home>
      </Stage>

      {step === "end" ? (
        <Finale lang={lang} text={{ en: "Abol, tona, bereka! Coffee is for being together.", am: "አቦል፣ ቶና፣ በረካ! ቡና ለአብሮነት ነው።" }} onDone={onDone} color="#6A3A22" />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, SAY[step])}</p>
          {step === "abol" && (
            <div className="mt-3 flex flex-wrap gap-2">
              {GUESTS.map((g) => (
                <button key={g.key} type="button" data-guest={g.key} onClick={() => serve(g.key)} disabled={served.includes(g.key)} className="min-h-12 rounded-2xl border-2 border-line bg-white px-4 py-2 font-display text-lg font-extrabold text-ink disabled:border-[#2FA35A] disabled:bg-[#E4F7EA]">
                  {t(lang, g.name)}
                </button>
              ))}
            </div>
          )}
          {hint && <Feedback tone="gentle">{t(lang, hint)}</Feedback>}
          {step === "tona" && (
            <Feedback tone="great">
              {t(lang, { en: "In the second round, Auntie Sheep shares a worry: her teff must be cut before the rain. \"We'll help!\" says everyone.", am: "በሁለተኛው ዙር እማማ በግ ጭንቀቷን አካፈለች፦ ጤፏ ከዝናቡ በፊት መታጨድ አለበት። «እንረዳሻለን!» አሉ ሁሉም።" })}
            </Feedback>
          )}
          {step === "bereka" && (
            <Feedback tone="great">
              {t(lang, { en: "Bereka means blessing. \"May your house be full! May your children grow strong!\"", am: "በረካ ማለት በረከት ማለት ነው። «ቤታችሁ ይሙላ! ልጆቻችሁ ይደጉ!»" })}
            </Feedback>
          )}
          {step !== "abol" && step !== "tona" && step !== "bereka" && (
            <div className="mt-3 flex justify-end">
              <Next color="#6A3A22" onClick={() => (step === "roast" ? tapTimes(3) : step === "grind" ? tapTimes(4) : go())}>
                {t(lang, step === "roast" || step === "grind" ? { en: "Tap!", am: "ንኩ!" } : { en: "Do it", am: "እናድርግ" })}
              </Next>
            </div>
          )}
          {(step === "tona" || step === "bereka") && (
            <div className="mt-3 flex justify-end">
              <Next color="#6A3A22" onClick={go}>
                {t(lang, { en: "Pour", am: "ቅዱ" })}
              </Next>
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
