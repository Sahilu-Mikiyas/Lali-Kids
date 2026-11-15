"use client";

import { useState } from "react";

import { Camel, Cub, Grandma, Gugu, Ibex, Papa, TAP, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import { Yard } from "@/components/book/courses/healthy-safe/kit-places";
import { Hearts, Notes, Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { Dog, FlatCap, MarketStall, Phone, PuppyBasket, Well } from "@/components/book/courses/healthy-safe/kit-safety";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Round } from "./choice-rounds";
import { Next, sound, t, type T } from "./demo-kit";

/*
  Safe Outside (level 5), from "Lost at the Market", "Still as a Tree", "The Well Has a Lid" and
  "Ask Before You Go". Six moments outside; the child picks the safe thing to do. Then a little
  practice of what to say when lost: tap the three things in order (my name, my grown-up's name,
  their phone number). Nothing is frightening; the people in it are kind.
*/

const COLOR = "#B85A8A";

const ROUNDS: Round[] = [
  {
    say: { en: "In the busy market, Anbessa can't see Grandma any more. What first?", am: "በተጨናነቀው ገበያ አንበሳ አያቴን ማየት አልቻለም። መጀመሪያ ምን ያድርግ?" },
    options: [
      { label: { en: "Run everywhere to look", am: "በየቦታው እየሮጡ መፈለግ" }, ok: false, note: { en: "Running about makes it harder to be found. Stop, and stay where you are.", am: "መሯሯጥ መገኘትን ያከብዳል። ቁሙ፤ ባላችሁበት ቆዩ።" } },
      { label: { en: "Stop and stay where he is", am: "ቆሞ ባለበት መቆየት" }, ok: true },
    ],
    good: { en: "Stop, stay… and then say!", am: "ቁም፣ ቆይ… ከዚያ ተናገር!" },
    scene: (id) => (
      <Yard id={id} time="day" house={false}>
        <MarketStall x={90} y={262} s={0.9} />
        <MarketStall x={310} y={262} s={0.9} awning="#8A5AB8" />
        <Place x={200} y={298} s={0.44} className="hs-still" tap={TAP.cub}>
          <Cub mood="worried" />
        </Place>
      </Yard>
    ),
  },
  {
    say: { en: "Who is a good person to ask for help?", am: "እርዳታ ለመጠየቅ ጥሩ ሰው ማን ነው?" },
    options: [
      { label: { en: "A mother with children, or someone working in a shop", am: "ልጆች ያሏት እናት ወይም በሱቅ የሚሠራ ሰው" }, ok: true },
      { label: { en: "Walk off to find someone far away", am: "ርቆ ሄዶ ሰው መፈለግ" }, ok: false, note: { en: "Stay close to where you got lost. Ask someone right there: a mother with children, or a shopkeeper.", am: "በጠፋችሁበት አካባቢ ቆዩ። እዚያው ያለን ሰው ጠይቁ፦ ልጆች ያሏትን እናት ወይም ባለሱቅ።" } },
    ],
    good: { en: "Yes: a mother with children, or someone working in a shop.", am: "አዎ፦ ልጆች ያሏት እናት ወይም በሱቅ የሚሠራ ሰው።" },
    scene: (id) => (
      <Yard id={id} time="day" house={false}>
        <MarketStall x={300} y={262} s={0.9} awning="#2E9A8A" />
        <Place x={300} y={300} s={0.48} flip tap={TAP.hooyo}>
          <Camel who="hooyo" shawl="#F5B21E" mood="happy" />
        </Place>
        <Place x={250} y={302} s={0.3} flip tap={TAP.ayan}>
          <Camel who="ayan" mood="joy" />
        </Place>
        <Place x={130} y={300} s={0.42} tap={TAP.cub}>
          <Cub mood="happy" arm="up" />
        </Place>
      </Yard>
    ),
  },
  {
    say: { en: "A big dog you don't know trots up to you.", am: "የማታውቁት ትልቅ ውሻ ወደ እናንተ እየሮጠ መጣ።" },
    options: [
      { label: { en: "Run away fast", am: "በፍጥነት መሸሽ" }, ok: false, note: { en: "Dogs like to chase things that run. Stand still instead.", am: "ውሾች የሚሮጥን ማባረር ይወዳሉ። በምትኩ ጸጥ ብላችሁ ቁሙ።" } },
      { label: { en: "Pat its head", am: "ራሱን መዳበስ" }, ok: false, note: { en: "A dog you don't know might not want a pat. Leave it alone.", am: "የማታውቁት ውሻ መዳበስ ላይፈልግ ይችላል። ተዉት።" } },
      { label: { en: "Stand still as a tree", am: "እንደ ዛፍ ጸጥ ብሎ መቆም" }, ok: true },
    ],
    good: { en: "Still as a tree! Arms down, eyes on your feet. The dog gets bored and goes.", am: "እንደ ዛፍ ጸጥ! እጅ ወደ ታች፣ ዓይን እግር ላይ። ውሻው ሰልችቶት ይሄዳል።" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <g transform={s === "good" ? "translate(60 0)" : undefined}>
          <Dog x={290} y={292} s={1.2} flip />
        </g>
        <Place x={140} y={294} s={0.46} className={s === "good" ? "hs-still" : undefined} tap={TAP.haben}>
          <Ibex mood="happy" />
        </Place>
      </Yard>
    ),
  },
  {
    say: { en: "The lid of the well is open, and Abdi's ball is by the edge.", am: "የጉድጓዱ ክዳን ክፍት ነው፤ የአብዲ ኳስ ዳሩ ላይ ነው።" },
    options: [
      { label: { en: "Lean over and grab it", am: "ጎንበስ ብሎ መያዝ" }, ok: false, note: { en: "Never lean over a well. Near water, a grown-up stays near!", am: "በጉድጓድ ላይ በፍጹም ጎንበስ አትበሉ። ውሃ አጠገብ፣ ትልቅ ሰው ከአጠገብ!" } },
      { label: { en: "Stay back and fetch a grown-up", am: "ራቅ ብሎ ትልቅ ሰው መጥራት" }, ok: true },
    ],
    good: { en: "Yes! Aabo gets the ball and shuts the lid.", am: "አዎ! አቦ ኳሱን አውጥተው ክዳኑን ይዘጋሉ።" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <Well x={260} y={272} s={1.2} open={s !== "good"} />
        <Place x={120} y={294} s={0.44} tap={TAP.abdi}>
          <Camel who="abdi" mood="happy" />
        </Place>
        {s === "good" && (
          <Place x={350} y={294} s={0.5} flip tap={TAP.hooyo}>
            <Camel who="aabo" mood="joy" />
          </Place>
        )}
      </Yard>
    ),
  },
  {
    say: { en: "A kind neighbour says, \"Come and see my puppies!\" Hawi's grandpa is inside.", am: "አንድ ደግ ጎረቤት «ነይ ቡችሎቼን እዪ!» አሉ። የሀዊ አያት ቤት ውስጥ ናቸው።" },
    options: [
      { label: { en: "Go straight away", am: "ወዲያው መሄድ" }, ok: false, note: { en: "Your grown-up needs to know where you are. Ask before you go!", am: "ትልቅ ሰዋችሁ የት እንዳላችሁ ማወቅ አለበት። ከመሄድ በፊት ጠይቁ!" } },
      { label: { en: "Ask Grandpa first", am: "መጀመሪያ አያትን መጠየቅ" }, ok: true },
    ],
    good: { en: "Ask before you go! Then they all go together.", am: "ከመሄድ በፊት ጠይቅ! ከዚያ ሁሉም አብረው ይሄዳሉ።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <PuppyBasket x={320} y={292} s={0.9} />
        <Place x={130} y={294} s={0.44} tap={TAP.hawi}>
          <Wolf mood="joy" />
        </Place>
        <Place x={240} y={294} s={0.48} flip tap={TAP.papa}>
          <Papa mood="joy" />
          <FlatCap />
        </Place>
        {s === "good" && (
          <Place x={60} y={292} s={0.44} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
        )}
      </Yard>
    ),
  },
  {
    say: { en: "Someone Gugu doesn't know offers him sweets to come with them.", am: "ጉጉ የማያውቀው ሰው ከእሱ ጋር እንዲሄድ ከረሜላ ሰጠው።" },
    options: [
      { label: { en: "Say \"No, thank you\" and go to his grown-up", am: "«አይ፣ አመሰግናለሁ» ብሎ ወደ ትልቅ ሰው መሄድ" }, ok: true },
      { label: { en: "Take the sweets and go", am: "ከረሜላውን ይዞ መሄድ" }, ok: false, note: { en: "With someone you don't know, you never go: not for sweets, not for anything.", am: "ከማታውቁት ሰው ጋር በፍጹም አትሄዱም፦ ለከረሜላም፣ ለምንም።" } },
    ],
    good: { en: "Yes! \"No, thank you,\" then straight to Grandma.", am: "አዎ! «አይ፣ አመሰግናለሁ»፤ ከዚያ በቀጥታ ወደ አያቴ።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={s === "good" ? 230 : 160} y={296} s={0.4} flip={s === "good"} tap={TAP.gugu}>
          <Gugu mood="happy" pose={s === "good" ? "sit" : "point"} />
        </Place>
        {s === "good" && (
          <Place x={300} y={294} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="bless" mood="joy" />
          </Place>
        )}
        {s === "good" && <Hearts spots={[[260, 170, 0.4]]} />}
      </Yard>
    ),
  },
];

const SAY: { key: string; label: T }[] = [
  { key: "name", label: { en: "My name is…", am: "ስሜ… ነው" } },
  { key: "grownup", label: { en: "My grown-up is…", am: "የኔ ትልቅ ሰው… ነው" } },
  { key: "phone", label: { en: "Their phone number is…", am: "ስልክ ቁጥራቸው… ነው" } },
];
const SAY_PILE = ["phone", "name", "grownup"];

export default function SafeOutside({ lang, onDone }: DemoProps) {
  const [n, setN] = useState(0);
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Safe Outside", am: "ከቤት ውጭ ደህና" }}
      goal={{ en: "Markets, dogs, wells and new places: choose the safe thing.", am: "ገበያ፣ ውሻ፣ ጉድጓድና አዲስ ቦታ፦ ደህና የሆነውን ምረጡ።" }}
      color={COLOR}
      rounds={ROUNDS}
      ending={(id, finish) => ({
        scene: (
          <Yard id={id} time="day" house={false}>
            <MarketStall x={300} y={262} s={0.9} awning="#2E9A8A" />
            <Place x={150} y={298} s={0.46} className={n < SAY.length ? undefined : "lali-hop"} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Notes x={180} y={170} color="#8A5AB8" n={Math.min(4, n + 1)} />
            {n >= SAY.length && <Phone x={300} y={200} s={2} ring />}
            {n >= SAY.length && <Sparkles x={200} y={180} r={60} delay={0.1} n={6} />}
          </Yard>
        ),
        controls: (
          <div className="mt-4">
            <p className="font-display text-xl font-extrabold text-ink">
              {t(lang, n >= SAY.length ? { en: "Now practise it at home with your own names and number!", am: "አሁን በራሳችሁ ስምና ቁጥር ቤት ተለማመዱት!" } : { en: "If you're lost, what do you say? Tap them in order.", am: "ብትጠፉ ምን ትላላችሁ? በቅደም ተከተል ንኩ።" })}
            </p>
            {n >= SAY.length ? (
              <div className="mt-3">
                <Next onClick={finish} color={COLOR}>
                  {t(lang, { en: "Finish", am: "ጨርሱ" })}
                </Next>
              </div>
            ) : (
              <div className="mt-3 grid gap-2">
                {SAY_PILE.map((k) => {
                  const at = SAY.findIndex((x) => x.key === k);
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
                        } else sound.gentle();
                      }}
                      className="min-h-12 w-full rounded-2xl border-2 px-3 py-2 text-left font-display text-base font-extrabold text-ink disabled:opacity-60"
                      style={{ background: done ? "#E4F7EA" : "#FFFFFF", borderColor: done ? "#2FA35A" : "#D3E4F4" }}
                    >
                      {done ? `${at + 1}. ` : ""}
                      {t(lang, SAY[at].label)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ),
      })}
      finale={{ en: "Safe outside: stop, stay, say, and ask before you go!", am: "ከቤት ውጭ ደህና፦ ቁም፣ ቆይ፣ ተናገር፤ ከመሄድም በፊት ጠይቅ!" }}
      finaleScene={(id) => (
        <Yard id={id} time="day">
          {[
            { x: 90, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 160, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 240, el: <Camel who="abdi" mood="joy" />, tap: TAP.abdi },
            { x: 310, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[150, 150, 0.2], [200, 136, 0.8], [250, 150, 1.4]]} />
        </Yard>
      )}
      onDone={onDone}
    />
  );
}
