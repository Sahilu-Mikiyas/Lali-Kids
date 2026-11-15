"use client";

import { Camel, Cub, Gugu, Ibex, TAP, Tsehay, Wolf } from "@/components/book/courses/healthy-safe/kit-cast";
import { Home, Yard } from "@/components/book/courses/healthy-safe/kit-places";
import { Cup, Hearts, Sparkles, Steam } from "@/components/book/courses/healthy-safe/kit-props";
import { CleaningBottle, Knife, MedicineBottle, PowerPole, Socket, Wire } from "@/components/book/courses/healthy-safe/kit-safety";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Round } from "./choice-rounds";

/*
  What Do We Do? (level 4: safe at home). Six moments with hot, sharp, medicine, cleaning and
  electric things; the child chooses the safe thing to do. Wrong answers are explained kindly.
*/

const COLOR = "#C9502E";

const ROUNDS: Round[] = [
  {
    say: { en: "A cup of hot tea is right at the edge of the table. Baby Dawit is crawling nearby.", am: "ትኩስ ሻይ ያለበት ስኒ በጠረጴዛው ጫፍ ላይ ነው። ሕፃኑ ዳዊት አጠገቡ ይድሃል።" },
    options: [
      { label: { en: "Tell a grown-up, so they move it to the middle", am: "ወደ መሃል እንዲያሸጋግሩት ለትልቅ ሰው መንገር" }, ok: true },
      { label: { en: "Leave it there", am: "እዚያው መተው" }, ok: false, note: { en: "Dawit could pull it down and get burnt. Hot things go in the middle, far from little hands.", am: "ዳዊት ጎትቶ ሊቃጠል ይችላል። ትኩስ ነገሮች ከትንንሽ እጆች ርቀው መሃል ይቀመጣሉ።" } },
      { label: { en: "Carry it yourself, fast", am: "ራስን ቶሎ መሸከም" }, ok: false, note: { en: "Hot drinks are for grown-ups to carry. Ask a grown-up instead.", am: "ትኩስ መጠጦችን የሚሸከሙት ትልልቆች ናቸው። በምትኩ ትልቅ ሰው ጠይቁ።" } },
    ],
    good: { en: "Yes! Hot tea in the middle of the table, far from little hands.", am: "አዎ! ትኩስ ሻይ ከትንንሽ እጆች ርቆ በጠረጴዛው መሃል።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <g transform="translate(220 230)">
          <rect x={-60} y={0} width={120} height={8} rx={2} fill="#9A6A3E" />
          <path d="M-50 8 V60 M50 8 V60" stroke="#7A4A2E" strokeWidth={5} />
          <g transform={s === "good" ? "translate(0 0)" : "translate(52 0)"}>
            <Cup x={0} y={0} s={1.4} />
            <Steam x={0} y={-14} />
          </g>
        </g>
        <Place x={100} y={294} s={0.44} tap={TAP.tsehay}>
          <Tsehay mood={s === "good" ? "joy" : "worried"} />
        </Place>
      </Home>
    ),
  },
  {
    say: { en: "Anbessa wants to help chop the onions. What can he do?", am: "አንበሳ ሽንኩርት በመክተፍ መርዳት ይፈልጋል። ምን ማድረግ ይችላል?" },
    options: [
      { label: { en: "Use the big sharp knife", am: "ትልቁን ስለታም ቢላ መጠቀም" }, ok: false, note: { en: "Sharp knives are grown-up things. There are lots of other ways to help!", am: "ስለታም ቢላ የትልልቆች ነው። ለመርዳት ሌሎች ብዙ መንገዶች አሉ!" } },
      { label: { en: "Wash the tomatoes instead", am: "በምትኩ ቲማቲሞቹን ማጠብ" }, ok: true },
    ],
    good: { en: "A helper's job with no knife. Grandma does the chopping.", am: "ያለ ቢላ የረዳት ሥራ። መክተፉን አያቴ ትሠራለች።" },
    scene: (id, s) => (
      <Home id={id} time="evening">
        <Knife x={240} y={262} s={1.2} />
        {s === "good" && (
          <g transform="translate(240 286)">
            <ellipse cx={0} cy={0} rx={26} ry={7} fill="#C9C2B4" />
            <circle cx={-8} cy={-4} r={6} fill="#E2463F" />
            <circle cx={6} cy={-4} r={6} fill="#D23A30" />
          </g>
        )}
        <Place x={130} y={294} s={0.48} tap={TAP.cub}>
          <Cub mood={s === "good" ? "joy" : "happy"} arm="up" />
        </Place>
      </Home>
    ),
  },
  {
    say: { en: "Abdi finds a bottle of pink medicine. It looks yummy!", am: "አብዲ ሮዝ መድኃኒት ያለበት ጠርሙስ አገኘ። የሚጣፍጥ ይመስላል!" },
    options: [
      { label: { en: "Take a little sip", am: "ትንሽ ፉት ማለት" }, ok: false, note: { en: "Medicine is not a sweet. Only a grown-up gives medicine, the right amount.", am: "መድኃኒት ከረሜላ አይደለም። መድኃኒትን ትክክለኛውን መጠን የሚሰጠው ትልቅ ሰው ብቻ ነው።" } },
      { label: { en: "Leave it and tell Hooyo", am: "ትቶ ለሁዮ መንገር" }, ok: true },
    ],
    good: { en: "Yes! If I'm not sure, I ask first. Hooyo puts it up high.", am: "አዎ! እርግጠኛ ካልሆንኩ መጀመሪያ እጠይቃለሁ። ሁዮ ከፍ ብላ ታስቀምጠዋለች።" },
    scene: (id, s) => (
      <Home id={id} time="day">
        <MedicineBottle x={240} y={280} s={1.4} spoon={false} />
        <Place x={140} y={294} s={0.48} tap={TAP.abdi}>
          <Camel who="abdi" mood={s === "good" ? "joy" : "happy"} />
        </Place>
        {s === "good" && (
          <Place x={330} y={294} s={0.52} flip tap={TAP.hooyo}>
            <Camel who="hooyo" mood="joy" />
          </Place>
        )}
      </Home>
    ),
  },
  {
    say: { en: "There's a blue bottle of bleach by the washing bowl.", am: "በልብስ ማጠቢያው አጠገብ ሰማያዊ የበረኪና ጠርሙስ አለ።" },
    options: [
      { label: { en: "Play with it as a toy", am: "እንደ መጫወቻ መጫወት" }, ok: false, note: { en: "Cleaning bottles can hurt your mouth, eyes and skin. They're for grown-ups.", am: "የጽዳት ጠርሙሶች አፍን፣ ዓይንንና ቆዳን ሊጎዱ ይችላሉ። የትልልቆች ናቸው።" } },
      { label: { en: "Don't touch; tell a grown-up", am: "አለመንካት፤ ለትልቅ ሰው መንገር" }, ok: true },
    ],
    good: { en: "Cleaning bottles are grown-up things. Up high they go!", am: "የጽዳት ጠርሙሶች የትልልቆች ናቸው። ከፍ ብለው ይቀመጣሉ!" },
    scene: (id, s) => (
      <Yard id={id} time="day">
        <CleaningBottle x={230} y={286} s={1.6} />
        <Place x={130} y={294} s={0.46} tap={TAP.haben}>
          <Ibex mood={s === "good" ? "joy" : "happy"} pose="point" />
        </Place>
        {s === "good" && <Sparkles x={230} y={240} r={30} delay={0.1} n={4} />}
      </Yard>
    ),
  },
  {
    say: { en: "Hawi sees a wire with its cover worn through, by the radio.", am: "ሀዊ በሬዲዮው አጠገብ ሽፋኑ የተላጠ ሽቦ አየች።" },
    options: [
      { label: { en: "Hands off, and tell a grown-up", am: "እጅ ማራቅና ለትልቅ ሰው መንገር" }, ok: true },
      { label: { en: "Try to fix it", am: "ለማስተካከል መሞከር" }, ok: false, note: { en: "Electricity can hurt badly. Wires and sockets: hands off, and tell a grown-up!", am: "ኤሌክትሪክ ክፉኛ ይጎዳል። ሽቦና ሶኬት፦ እጅ አርቅ፣ ለትልቅ ሰው ንገር!" } },
    ],
    good: { en: "Hands off! Grandpa switches it off and unplugs it.", am: "እጅ አርቅ! አባ ቶሎሳ አጥፍተው ይነቅሉታል።" },
    scene: (id, s) => (
      <Home id={id} time="evening">
        <Socket x={190} y={220} s={1.4} />
        <Wire x={200} y={240} s={1.2} worn={s !== "good"} />
        <Place x={110} y={294} s={0.46} tap={TAP.hawi}>
          <Wolf mood={s === "good" ? "joy" : "worried"} />
        </Place>
        {s === "good" && (
          <Place x={320} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
        )}
      </Home>
    ),
  },
  {
    say: { en: "Gugu's kite is stuck on the wires on top of a pole.", am: "የጉጉ ካይት በምሰሶው ላይ ባሉት ሽቦዎች ላይ ተያዘ።" },
    options: [
      { label: { en: "Climb up and get it", am: "ወጥቶ ማውረድ" }, ok: false, note: { en: "Never climb poles or pull at wires. The electricity office can get it down safely.", am: "ምሰሶ በፍጹም አትውጡ፤ ሽቦም አትጎትቱ። የመብራት ኃይል በደህና ያወርደዋል።" } },
      { label: { en: "Let go, and tell a grown-up", am: "መልቀቅና ለትልቅ ሰው መንገር" }, ok: true },
    ],
    good: { en: "Yes! And next time, fly kites in an open field, far from wires.", am: "አዎ! በሚቀጥለው ጊዜ ካይትን ከሽቦ ርቆ በሜዳ ላይ አብርሩ።" },
    scene: (id, s) => (
      <Yard id={id} time="day" house={false}>
        <PowerPole x={290} y={250} s={0.9} kite />
        <Place x={150} y={294} s={0.46} tap={TAP.gugu}>
          <Gugu mood={s === "good" ? "joy" : "worried"} pose="point" />
        </Place>
        {s === "good" && <Hearts spots={[[150, 170, 0.2]]} />}
      </Yard>
    ),
  },
];

export default function GrownUpThings({ lang, onDone }: DemoProps) {
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "What Do We Do?", am: "ምን እናድርግ?" }}
      goal={{ en: "Hot, sharp, medicine, cleaning and electric things: choose the safe thing to do.", am: "ትኩስ፣ ስለታም፣ መድኃኒት፣ የጽዳትና የኤሌክትሪክ ነገሮች፦ ደህና የሆነውን ምረጡ።" }}
      color={COLOR}
      rounds={ROUNDS}
      finale={{ en: "Six safe choices. Grown-up things are for grown-ups!", am: "ስድስት ደህና ምርጫዎች። የትልልቆች ነገሮች የትልልቆች ናቸው!" }}
      finaleScene={(id) => (
        <Home id={id} time="day">
          {[
            { x: 90, el: <Tsehay mood="joy" pose="wave" />, tap: TAP.tsehay },
            { x: 160, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
            { x: 240, el: <Camel who="abdi" mood="joy" />, tap: TAP.abdi },
            { x: 310, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
          ].map(({ x, el, tap }) => (
            <Place key={x} x={x} y={294} s={0.4} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Hearts spots={[[150, 150, 0.2], [200, 136, 0.8], [250, 150, 1.4]]} />
        </Home>
      )}
      onDone={onDone}
    />
  );
}
