"use client";

import { Bed, Mug } from "@/components/book/courses/healthy-safe/kit-health";
import { Camel, TAP } from "@/components/book/courses/healthy-safe/kit-cast";
import { HealthPost, HealthWorker, MedicineBottle, Scale, Stethoscope, Sticker, Thermometer } from "@/components/book/courses/healthy-safe/kit-safety";
import { Home } from "@/components/book/courses/healthy-safe/kit-places";
import { Sparkles } from "@/components/book/courses/healthy-safe/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Order, type Step } from "./order-kit";

/*
  A Visit to the Health Post (level 6), from "Abdi at the Health Post". Put the visit in order:
  wait your turn, the scale, the thermometer, the stethoscope, "say aaah", the health worker
  tells your grown-up what to do, then rest and drinks at home. Each step shows what happens and
  why it doesn't hurt.
*/

const COLOR = "#2E9A8A";

const STEPS: Step[] = [
  { key: "wait", label: { en: "Wait your turn", am: "ተራን መጠበቅ" }, fact: { en: "Sit on the bench with your grown-up. Count the pictures on the wall!", am: "ከትልቅ ሰዋችሁ ጋር ወንበሩ ላይ ተቀመጡ። ግድግዳው ላይ ያሉትን ሥዕሎች ቁጠሩ!" }, pic: <rect x={8} y={24} width={28} height={6} rx={2} fill="#9A6A3E" /> },
  { key: "scale", label: { en: "Stand on the scale", am: "ሚዛኑ ላይ መቆም" }, fact: { en: "It shows how much you've grown.", am: "ምን ያህል እንዳደጋችሁ ያሳያል።" }, pic: <Scale x={22} y={42} s={0.42} /> },
  { key: "temp", label: { en: "Thermometer under your arm", am: "ቴርሞሜትር በብብት ሥር" }, fact: { en: "It checks if you're hot. It doesn't hurt at all.", am: "ትኩሳት እንዳለ ያያል። ምንም አያምም።" }, pic: <Thermometer x={22} y={24} s={1} /> },
  { key: "listen", label: { en: "Listen with the stethoscope", am: "በስቴቶስኮፕ ማዳመጥ" }, fact: { en: "A bit cold! Breathe in… and out. Deep breath, I'm brave!", am: "ትንሽ ይቀዘቅዛል! ተንፍሱ… አውጡ። በጥልቅ ተንፍስ፣ ጎበዝ ነኝ!" }, pic: <Stethoscope x={20} y={22} s={0.8} /> },
  { key: "aah", label: { en: "Open wide: \"Aaah!\"", am: "አፍን ከፍቶ፦ «አ!»" }, fact: { en: "The health worker looks at your throat.", am: "የጤና ባለሙያዋ ጉሮሮአችሁን ታያለች።" }, pic: <ellipse cx={22} cy={24} rx={12} ry={9} fill="#8A2F1E" /> },
  { key: "tell", label: { en: "The health worker tells your grown-up what to do", am: "የጤና ባለሙያዋ ለትልቅ ሰዋችሁ ምን እንደሚደረግ ትነግራለች" }, fact: { en: "Medicine, if it's needed, is given by your grown-up, the right amount.", am: "መድኃኒት ካስፈለገ ትልቅ ሰዋችሁ ትክክለኛውን መጠን ይሰጣል።" }, pic: <MedicineBottle x={20} y={40} s={0.7} spoon={false} /> },
  { key: "rest", label: { en: "Rest and drink at home", am: "ቤት ማረፍና መጠጣት" }, fact: { en: "Sleep, water and soft food help your body get better.", am: "እንቅልፍ፣ ውሃና ለስላሳ ምግብ ሰውነት እንዲሻለው ይረዳሉ።" }, pic: <Mug x={22} y={36} s={1} /> },
];

const PILE = ["listen", "rest", "wait", "aah", "scale", "tell", "temp"];

export default function ClinicVisit({ lang, onDone }: DemoProps) {
  return (
    <Order
      lang={lang}
      title={{ en: "A Visit to the Health Post", am: "ወደ ጤና ኬላ ጉብኝት" }}
      goal={{ en: "Tap what happens, in order. Nothing to worry about!", am: "የሚሆነውን በቅደም ተከተል ንኩ። የሚያስጨንቅ ነገር የለም!" }}
      steps={STEPS}
      pile={PILE}
      hint={{ en: "Not yet: what happens before that?", am: "ገና ነው፦ ከዚያ በፊት ምን ይሆናል?" }}
      finale={{ en: "Brave and well looked after!", am: "ጎበዝና በደንብ የተንከባከቡት!" }}
      color={COLOR}
      onDone={onDone}
      stage={(placed) =>
        placed >= 7 ? (
          <Home id="cv" time="day">
            <Bed x={170} y={286} s={1.3} color="#2E8A5A">
              <Place x={-30} y={-6} s={0.3} tap={TAP.abdi}>
                <Camel who="abdi" mood="joy" kneel />
              </Place>
            </Bed>
            <Mug x={270} y={282} s={1.2} />
            <Sparkles x={200} y={200} r={70} delay={0.1} n={6} />
          </Home>
        ) : (
          <HealthPost id="cv">
            {placed === 0 && (
              <g transform="translate(160 262)">
                <rect x={-70} y={0} width={140} height={8} rx={2} fill="#9A6A3E" />
                <path d="M-60 8 V30 M60 8 V30" stroke="#7A4A2E" strokeWidth={5} />
              </g>
            )}
            {placed === 1 && <Scale x={150} y={296} s={1.2} />}
            <Place x={150} y={placed === 1 ? 286 : 294} s={0.44} tap={TAP.abdi}>
              <Camel who="abdi" mood={placed >= 4 ? "joy" : placed === 3 ? "wow" : "happy"} kneel={placed === 0} />
              {placed === 2 && <Thermometer x={110} y={150} s={1.4} rot={40} />}
              {placed >= 6 && <Sticker x={164} y={58} s={1.6} />}
            </Place>
            <Place x={300} y={292} s={0.52} flip tap={TAP.teacher}>
              <HealthWorker mood="joy" pose={placed === 3 ? "point" : placed === 5 ? "wave" : "sit"} item={placed === 3 ? <Stethoscope x={0} y={0} s={1.2} /> : placed === 5 ? <MedicineBottle x={0} y={10} s={1} spoon={false} /> : undefined} />
            </Place>
          </HealthPost>
        )
      }
    />
  );
}
