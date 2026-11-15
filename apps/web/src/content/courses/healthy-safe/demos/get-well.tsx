"use client";

import { Camel, Grandma, Gugu, Ibex, Mama, TAP, Teacher, Tsehay, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import { Classroom } from "@/components/book/courses/healthy-safe/kit-more";
import { Bed, Mug } from "@/components/book/courses/healthy-safe/kit-health";
import { Home } from "@/components/book/courses/healthy-safe/kit-places";
import { Hearts, Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { HealthPost, HealthWorker, MedicineBottle, VaccineCard } from "@/components/book/courses/healthy-safe/kit-safety";
import { Glow } from "@/components/book/glow";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Round } from "./choice-rounds";

/*
  Getting Better (level 6), from "Haben Tells Her Teacher", "Dawit's Vaccine Day" and "Only from a
  Grown-Up". Six moments: telling a grown-up when you feel unwell, what vaccines do, medicine only
  from a grown-up (the right amount, never someone else's), resting and drinking, and helping a
  sick family member. Gentle, never scary; no needles are drawn.
*/

const COLOR = "#3A8A5A";

const ROUNDS: Round[] = [
  {
    say: { en: "At school, Haben's head feels hot and her tummy hurts.", am: "ትምህርት ቤት የሐበን ራስ ሞቀ፤ ሆዷም አመማት።" },
    options: [
      { label: { en: "Keep quiet until home time", am: "እስከ ቤት ሰዓት ዝም ማለት" }, ok: false, note: { en: "Telling is never a fuss. When your body feels wrong, tell a grown-up.", am: "መናገር መቼም ማስቸገር አይደለም። ሰውነታችሁ ሲያማችሁ ለትልቅ ሰው ንገሩ።" } },
      { label: { en: "Tell Teacher Meron", am: "ለመምህርት መሮን መንገር" }, ok: true },
    ],
    good: { en: "Yes! When my body feels wrong, I tell a grown-up.", am: "አዎ! ሰውነቴ ሲያመኝ ለትልቅ ሰው እነግራለሁ።" },
    scene: (id, s) => (
      <Classroom id={id}>
        <Glow x={150} y={240} r={34} color="#FF9A7A" strength={s === "good" ? 0.2 : 0.5} dur={2} />
        <Place x={150} y={294} s={0.46} tap={TAP.haben}>
          <Ibex mood={s === "good" ? "happy" : "sad"} pose={s === "good" ? "point" : "sit"} />
        </Place>
        <Place x={290} y={290} s={0.52} flip tap={TAP.teacher}>
          <Teacher mood="happy" pose={s === "good" ? "wave" : "sit"} />
        </Place>
      </Classroom>
    ),
  },
  {
    say: { en: "What does a vaccine do?", am: "ክትባት ምን ያደርጋል?" },
    options: [
      { label: { en: "It teaches the body to fight some bad illnesses", am: "ሰውነትን አንዳንድ ከባድ በሽታዎችን እንዲከላከል ያስተምራል" }, ok: true },
      { label: { en: "It's a punishment", am: "ቅጣት ነው" }, ok: false, note: { en: "Never a punishment! A vaccine is like a shield that helps keep you well.", am: "በፍጹም ቅጣት አይደለም! ክትባት ጤነኛ እንድትሆኑ የሚረዳ ጋሻ ነው።" } },
    ],
    good: { en: "A little pinch, a strong shield!", am: "ትንሽ ቁንጥጫ፣ ጠንካራ ጋሻ!" },
    scene: (id, s) => (
      <HealthPost id={id}>
        <VaccineCard x={200} y={150} s={1.4} ticks={s === "good" ? 4 : 3} />
        <Place x={120} y={294} s={0.52} tap={TAP.mama}>
          <Mama mood="joy" baby="awake" />
        </Place>
        <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
          <HealthWorker mood="joy" />
        </Place>
      </HealthPost>
    ),
  },
  {
    say: { en: "Gugu's medicine tastes sweet. Can he have five spoonfuls?", am: "የጉጉ መድኃኒት ይጣፍጣል። አምስት ማንኪያ ይውሰድ?" },
    options: [
      { label: { en: "Yes, more is better", am: "አዎ፣ ብዙ ይሻላል" }, ok: false, note: { en: "Too much medicine can make you very ill. The right amount, at the right time, from a grown-up.", am: "ብዙ መድኃኒት በጣም ያሳምማል። ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው።" } },
      { label: { en: "No: just the right amount, from a grown-up", am: "አይ፦ ትክክለኛው መጠን ብቻ፣ ከትልቅ ሰው" }, ok: true },
    ],
    good: { en: "The right amount, at the right time, from a grown-up!", am: "ትክክለኛው መጠን፣ በትክክለኛው ጊዜ፣ ከትልቅ ሰው!" },
    scene: (id) => (
      <Home id={id} time="day">
        <Place x={140} y={294} s={0.46} tap={TAP.gugu}>
          <Gugu mood="happy" />
        </Place>
        <Place x={280} y={294} s={0.52} flip tap={TAP.grandma}>
          <Grandma arm="hold" item={<MedicineBottle x={0} y={20} s={1} />} />
        </Place>
      </Home>
    ),
  },
  {
    say: { en: "Tsehay has a cough. She finds her cousin's old cough medicine.", am: "ፀሐይ ሳል ይዟታል። የአጎቷን ልጅ የድሮ የሳል መድኃኒት አገኘች።" },
    options: [
      { label: { en: "Take some of it", am: "ከእሱ መውሰድ" }, ok: false, note: { en: "We never take anyone else's medicine. A health worker says what's right for you.", am: "የሌላውን መድኃኒት በፍጹም አንወስድም። ለእናንተ የሚሆነውን የጤና ባለሙያ ይናገራል።" } },
      { label: { en: "Leave it and tell Mama", am: "ትቶ ለእማማ መንገር" }, ok: true },
    ],
    good: { en: "Yes! Never someone else's medicine. Mama will help.", am: "አዎ! የሌላውን መድኃኒት በፍጹም። እማማ ትረዳለች።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <MedicineBottle x={230} y={282} s={1.3} spoon={false} color="#7FC8F8" />
        <Place x={140} y={294} s={0.46} tap={TAP.tsehay}>
          <Tsehay mood={s === "good" ? "joy" : "happy"} />
        </Place>
        {s === "good" && (
          <Place x={320} y={294} s={0.5} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
        )}
      </Home>
    ),
  },
  {
    say: { en: "Hawi has a cold. What helps her body get better?", am: "ሀዊ ጉንፋን ይዟታል። ሰውነቷ እንዲሻለው ምን ይረዳል?" },
    options: [
      { label: { en: "Rest, sleep and plenty of water", am: "እረፍት፣ እንቅልፍና ብዙ ውሃ" }, ok: true },
      { label: { en: "Running about all day", am: "ቀኑን ሙሉ መሯሯጥ" }, ok: false, note: { en: "When we're poorly, our bodies need rest. Play can wait until you're better.", am: "ስንታመም ሰውነታችን እረፍት ይፈልጋል። ጨዋታ እስክትድኑ ይጠብቃል።" } },
    ],
    good: { en: "Rest, sleep and water: the body's helpers.", am: "እረፍት፣ እንቅልፍና ውሃ፦ የሰውነት ረዳቶች።" },
    scene: (id) => (
      <Home id={id} time="evening">
        <Bed x={170} y={286} s={1.3} color="#C9622B">
          <Place x={-30} y={-6} s={0.32} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
        </Bed>
        <Mug x={270} y={282} s={1.2} />
      </Home>
    ),
  },
  {
    say: { en: "Ayan's Hooyo is sick in bed. How can Ayan help?", am: "የአያን ሁዮ ታማ ተኝታለች። አያን እንዴት ልትረዳ ትችላለች?" },
    options: [
      { label: { en: "Bring water, play quietly, wash her hands", am: "ውሃ ማምጣት፣ በጸጥታ መጫወት፣ እጅ መታጠብ" }, ok: true },
      { label: { en: "Give Hooyo her medicine herself", am: "መድኃኒቱን ራሷ ለሁዮ መስጠት" }, ok: false, note: { en: "Medicine is a grown-up job. Ayan can remind Hooyo, or tell Aabo, that it's medicine time.", am: "መድኃኒት የትልልቆች ሥራ ነው። አያን የመድኃኒት ሰዓት መድረሱን ለሁዮ ማስታወስ ወይም ለአቦ መንገር ትችላለች።" } },
    ],
    good: { en: "Kind helping: water, quiet, clean hands and lots of love.", am: "ደግ እርዳታ፦ ውሃ፣ ጸጥታ፣ ንጹሕ እጅና ብዙ ፍቅር።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <Place x={260} y={294} s={0.52} flip tap={TAP.hooyo}>
          <Camel who="hooyo" mood="happy" kneel />
        </Place>
        <Place x={140} y={294} s={0.46} tap={TAP.ayan}>
          <Camel who="ayan" mood="joy" item={s === "good" ? <Mug x={0} y={20} s={1.2} /> : undefined} />
        </Place>
        {s === "good" && <Hearts spots={[[200, 170, 0.2], [220, 156, 1]]} />}
      </Home>
    ),
  },
];

export default function GetWell({ lang, onDone }: DemoProps) {
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Getting Better", am: "መዳን" }}
      goal={{ en: "When we're sick: tell, rest, and medicine only from a grown-up.", am: "ስንታመም፦ መናገር፣ ማረፍ፣ መድኃኒትም ከትልቅ ሰው ብቻ።" }}
      color={COLOR}
      rounds={ROUNDS}
      finale={{ en: "Six good choices for getting better!", am: "ለመዳን ስድስት ጥሩ ምርጫዎች!" }}
      finaleScene={(id) => (
        <Home id={id} time="day">
          {[
            { x: 90, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 160, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu },
            { x: 240, el: <Tsehay mood="joy" pose="hop" />, tap: TAP.tsehay },
            { x: 310, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Sparkles x={200} y={160} r={80} delay={0.1} n={7} />
        </Home>
      )}
      onDone={onDone}
    />
  );
}
