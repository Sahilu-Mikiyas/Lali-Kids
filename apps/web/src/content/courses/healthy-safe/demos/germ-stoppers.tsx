"use client";

import { Camel, Cub, Gugu, Ibex, TAP, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import { ClothCover, CoveredPot, Fly, Latrine, SneezeSpray, SoapBar, Bubbles } from "@/components/book/courses/healthy-safe/kit-health";
import { Home, Yard } from "@/components/book/courses/healthy-safe/kit-places";
import { Mesob, Sparkles, WashSet } from "@/components/book/courses/healthy-safe/kit-props";
import { Place } from "@/components/book/scenery";
import { ART } from "../art";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Opt, type Round } from "./choice-rounds";
import type { T } from "./demo-kit";

/*
  Germ Stoppers (level 1). Six everyday moments; the child picks what stops the germs: wash hands
  with soap before eating and after the toilet and after playing with animals, sneeze into the
  elbow, drink boiled water from the covered pot, cover the food from flies. Wrong answers are
  explained kindly and the child tries again.
*/

const COLOR = "#2F8FD0";

function Pic({ id }: { id: string }) {
  const A = ART[id];
  return A ? <A size={44} /> : null;
}

const opt = (label: T, pic: string, ok: boolean, note?: T): Opt => ({ label, pic: <Pic id={pic} />, ok, note });

const ROUNDS: Round[] = [
  {
    say: { en: "Lunch is ready! What do Gugu and Anbessa do first?", am: "ምሳ ደርሷል! ጉጉና አንበሳ መጀመሪያ ምን ያደርጋሉ?" },
    options: [
      opt({ en: "Start eating straight away", am: "ወዲያው መብላት" }, "mesob", false, { en: "Their hands have been playing in the clay! Germs would go in with the food.", am: "እጆቻቸው በጭቃ ሲጫወቱ ነበር! ጀርሞች ከምግቡ ጋር ይገባሉ።" }),
      opt({ en: "Wash their hands with soap", am: "እጃቸውን በሳሙና መታጠብ" }, "soap", true),
      opt({ en: "Wipe their hands on their clothes", am: "እጃቸውን በልብሳቸው መጥረግ" }, "clay-hands", false, { en: "Wiping doesn't take the germs away. Soap and water do.", am: "መጥረግ ጀርሞችን አያስወግድም። ሳሙናና ውሃ ግን ያስወግዳሉ።" }),
    ],
    good: { en: "Yes! Soap and water before we eat, every time.", am: "አዎ! ከመብላታችን በፊት ሁልጊዜ ሳሙናና ውሃ።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Mesob x={200} y={286} s={0.9} rx={60} />
        <WashSet x={110} y={286} s={1.1} pour={s === "good"} />
        {s === "good" && <Bubbles x={110} y={240} n={6} spread={40} seed={2} />}
        <Place x={290} y={294} s={0.42} flip tap={TAP.gugu}>
          <Gugu mood="joy" />
        </Place>
        <Place x={340} y={296} s={0.38} flip tap={TAP.cub}>
          <Cub mood="happy" />
        </Place>
      </Home>
    ),
  },
  {
    say: { en: "Abdi has just used the toilet. What next?", am: "አብዲ አሁን መጸዳጃ ተጠቅሞ ወጣ። ቀጥሎ ምን ያድርግ?" },
    options: [
      opt({ en: "Go straight back to play", am: "በቀጥታ ወደ ጨዋታ መመለስ" }, "football", false, { en: "Germs from the toilet would come too. First, the soap!", am: "ከመጸዳጃው ጀርሞች አብረው ይመጣሉ። መጀመሪያ ሳሙና!" }),
      opt({ en: "Shake his hands dry", am: "እጁን አራግፎ ማድረቅ" }, "splash", false, { en: "Shaking doesn't wash anything off. He needs soap and water.", am: "ማራገፍ ምንም አያጥብም። ሳሙናና ውሃ ያስፈልገዋል።" }),
      opt({ en: "Wash his hands with soap", am: "እጁን በሳሙና መታጠብ" }, "soap", true),
    ],
    good: { en: "Right! After the toilet, always wash with soap.", am: "ትክክል! ከመጸዳጃ በኋላ ሁልጊዜ በሳሙና መታጠብ።" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <Latrine x={120} y={270} s={1.3} />
        <Place x={250} y={294} s={0.46} flip tap={TAP.abdi}>
          <Camel who="abdi" mood={s === "good" ? "joy" : "happy"} />
        </Place>
        {s === "good" && <Bubbles x={168} y={210} n={6} spread={30} seed={5} />}
      </Yard>
    ),
  },
  {
    say: { en: "Ah… ah… Haben feels a sneeze coming! Where should it go?", am: "ሀ… ሀ… ሐበን ማስነጠስ እየመጣባት ነው! ወዴት ይሂድ?" },
    options: [
      opt({ en: "Into the air", am: "ወደ አየር" }, "sneeze-air", false, { en: "Then the tiny drops fly out onto everyone nearby.", am: "ያኔ ጥቃቅን ጠብታዎቹ አጠገቡ ባለው ሰው ሁሉ ላይ ይበራሉ።" }),
      opt({ en: "Into her elbow", am: "ወደ ክርኗ" }, "elbow-sneeze", true),
      opt({ en: "Into her hands", am: "ወደ እጆቿ" }, "sneeze-hands", false, { en: "Then the germs are on her hands, and on everything she touches.", am: "ያኔ ጀርሞቹ እጆቿ ላይ፣ በምትነካውም ሁሉ ላይ ይሆናሉ።" }),
    ],
    good: { en: "Into the elbow! The drops stay in her sleeve.", am: "ወደ ክርን! ጠብታዎቹ በእጅጌዋ ውስጥ ይቀራሉ።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Place x={200} y={294} s={0.56} tap={TAP.haben}>
          <Ibex mood={s === "good" ? "joy" : "wow"} />
        </Place>
        <SneezeSpray x={190} y={200} s={1.3} caught={s === "good"} />
      </Home>
    ),
  },
  {
    say: { en: "Hawi is thirsty after playing. Which water should she drink?", am: "ሀዊ ከጨዋታ በኋላ ተጠምታለች። የትኛውን ውሃ ትጠጣ?" },
    options: [
      opt({ en: "Water from the stream", am: "የጅረት ውሃ" }, "stream", false, { en: "It looks clean, but it can carry germs from animals. Not without boiling!", am: "ንጹሕ ይመስላል፤ ግን ከእንስሳት ጀርም ሊይዝ ይችላል። ሳይፈላ አይሆንም!" }),
      opt({ en: "Boiled water from the covered pot", am: "ከተከደነው እንስራ የፈላ ውሃ" }, "water-pot", true),
      opt({ en: "Water from a puddle", am: "የኩሬ ውሃ" }, "puddle", false, { en: "Puddle water is dirty. It isn't for drinking.", am: "የኩሬ ውሃ ቆሻሻ ነው። ለመጠጥ አይሆንም።" }),
    ],
    good: { en: "Yes! Boiled, cooled and kept covered: safe to drink.", am: "አዎ! የፈላ፣ የቀዘቀዘና የተከደነ፦ ለመጠጥ ደህና ነው።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <CoveredPot x={140} y={286} s={1.4} lid={s !== "good"} />
        <Place x={260} y={294} s={0.48} flip tap={TAP.hawi}>
          <Wolf mood={s === "good" ? "joy" : "happy"} />
        </Place>
        {s === "good" && <Sparkles x={140} y={210} r={40} delay={0.2} n={5} />}
      </Home>
    ),
  },
  {
    say: { en: "Flies are buzzing round the injera. What helps?", am: "ዝንቦች በእንጀራው ዙሪያ እያንዣበቡ ነው። ምን ይረዳል?" },
    options: [
      opt({ en: "Cover the food", am: "ምግቡን መክደን" }, "food-covered", true),
      opt({ en: "Leave it out in the open", am: "ክፍት አድርጎ መተው" }, "food-flies", false, { en: "Flies walk on dirty things, then on the food. Let's keep them off.", am: "ዝንቦች ቆሻሻ ላይ ይሄዳሉ፤ ከዚያ ምግቡ ላይ። እናርቃቸው።" }),
      opt({ en: "Put the rubbish next to it", am: "ቆሻሻውን አጠገቡ ማስቀመጥ" }, "rubbish", false, { en: "Rubbish brings even more flies! It goes in the pit, with the lid on.", am: "ቆሻሻ ብዙ ዝንቦችን ያመጣል! ወደ ጉድጓዱ ይገባል፤ ክዳኑም ይዘጋል።" }),
    ],
    good: { en: "Covered! Now the flies can't land.", am: "ተከደነ! አሁን ዝንቦች ማረፍ አይችሉም።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Mesob x={200} y={286} s={1} rx={60} />
        {s === "good" ? <ClothCover x={200} y={222} s={2} color="#FFFDF4" /> : null}
        <Fly x={170} y={190} s={1.6} />
        <Fly x={230} y={180} s={1.6} delay={0.5} />
        <Fly x={210} y={210} s={1.4} delay={0.9} />
      </Home>
    ),
  },
  {
    say: { en: "Ayan played with the baby goats. Now she wants a snack.", am: "አያን ከግልገሎቹ ፍየሎች ጋር ተጫወተች። አሁን መክሰስ ትፈልጋለች።" },
    options: [
      opt({ en: "Eat it now", am: "አሁን መብላት" }, "mesob", false, { en: "Animals carry germs on their fur. Hands first!", am: "እንስሳት በፀጉራቸው ላይ ጀርም ይይዛሉ። መጀመሪያ እጅ!" }),
      opt({ en: "Wash her hands with soap first", am: "መጀመሪያ እጇን በሳሙና መታጠብ" }, "soap", true),
    ],
    good: { en: "Yes! After playing with animals, soap and water.", am: "አዎ! ከእንስሳት ጋር ከተጫወትን በኋላ ሳሙናና ውሃ።" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <Place x={180} y={294} s={0.5} tap={TAP.ayan}>
          <Camel who="ayan" mood={s === "good" ? "joy" : "happy"} />
        </Place>
        <SoapBar x={300} y={286} s={1.6} foam={s === "good"} />
        {s === "good" && <Bubbles x={300} y={250} n={6} spread={40} seed={8} />}
      </Yard>
    ),
  },
];

export default function GermStoppers({ lang, onDone }: DemoProps) {
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Germ Stoppers", am: "ጀርም አስቆሚዎች" }}
      goal={{ en: "Choose what stops the germs.", am: "ጀርሞችን የሚያስቆመውን ምረጡ።" }}
      color={COLOR}
      rounds={ROUNDS}
      finale={{ en: "Six germs stopped! You're a germ stopper.", am: "ስድስት ጀርሞች ቆሙ! እናንተ ጀርም አስቆሚዎች ናችሁ።" }}
      finaleScene={(id) => (
        <Yard id={id} time="day">
          {[
            { x: 90, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 160, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 240, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 310, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Bubbles x={200} y={200} n={9} spread={240} seed={11} up={-80} />
        </Yard>
      )}
      onDone={onDone}
    />
  );
}
