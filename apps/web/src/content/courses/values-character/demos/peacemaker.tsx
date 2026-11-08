"use client";

import { Cub, Gugu, TAP, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { StormCloud } from "@/components/book/courses/values-character/kit-more";
import { FigTree, Yard } from "@/components/book/courses/values-character/kit-places";
import { Hearts, Kite, Sparkles, Speech } from "@/components/book/courses/values-character/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { ChoiceRounds, type Round, type RoundState } from "./choice-rounds";

/*
  Be the Peacemaker (level 5: sorry and forgiving), from "The Little Peacemakers". Gugu and Hawi
  both want to fly the one kite. The child leads the peace the way the elders do (shimgilina):
  sit down and calm down, one speaker at a time with the speaking stick, listen, find a fair way,
  then sorry and forgiving. With each good step the two storm clouds shrink.
*/

const COLOR = "#D9822B";

/** The speaking stick, upright in a paw. */
const STICK = (
  <g>
    <rect x={-2.5} y={-40} width={5} height={60} rx={2.5} fill="#7A5236" />
    <circle cx={0} cy={-40} r={4} fill="#8A6040" />
  </g>
);

/** The picture for step `k`: clouds shrink as the peace grows. */
function scene(k: number, id: string, s: RoundState, opts: { stick?: "hawi" | "gugu"; speak?: "hawi" | "gugu" } = {}) {
  const calm = k + (s === "good" ? 1 : 0); // 0 to 5
  const size = Math.max(0, 1 - calm / 5);
  const sitting = calm >= 1;
  const together = calm >= 5;
  return (
    <Yard id={id} time="day" house={false}>
      <FigTree x={200} y={250} s={1.1} />
      {together ? <Kite x={200} y={60} s={0.6} sx={-30} sy={190} /> : <Kite x={200} y={232} s={0.45} />}
      <Place x={together ? 150 : sitting ? 140 : 160} y={294} s={0.44} tap={TAP.gugu}>
        <Gugu mood={together ? "joy" : calm >= 3 ? "happy" : "worried"} pose={together ? "wave" : opts.stick === "gugu" ? "point" : "sit"} item={opts.stick === "gugu" ? STICK : undefined} />
      </Place>
      <Place x={together ? 250 : sitting ? 260 : 240} y={294} s={0.44} flip tap={TAP.hawi}>
        <Wolf mood={together ? "joy" : calm >= 3 ? "happy" : "worried"} ears={calm >= 2 ? "up" : "flat"} wag={together} arm={opts.stick === "hawi" ? "give" : undefined} item={opts.stick === "hawi" ? STICK : undefined} />
      </Place>
      {size > 0 && <StormCloud x={150} y={150} size={size} bolt={calm === 0} />}
      {size > 0 && <StormCloud x={250} y={150} size={size} bolt={calm === 0} />}
      {opts.speak && s !== "oops" && (
        <Speech x={opts.speak === "gugu" ? 140 : 260} y={186} w={44} h={34} tail="down" delay={0.3}>
          <path d="M0 8 C-12 0 -10 -9 -4 -9 C-1 -9 0 -7 0 -5 C0 -7 1 -9 4 -9 C10 -9 12 0 0 8Z" fill="#2F6FD0" />
        </Speech>
      )}
      <Place x={50} y={296} s={0.36} tap={TAP.cub}>
        <Cub mood={together ? "joy" : "happy"} />
      </Place>
      <Place x={354} y={296} s={0.34} flip tap={TAP.tsehay}>
        <Tsehay mood={together ? "joy" : "happy"} pose={k === 1 && s === "good" ? "point" : "sit"} />
      </Place>
      {s === "good" && <Sparkles x={200} y={170} r={50} delay={0.2} n={5} />}
      {together && <Hearts spots={[[200, 190, 0.4], [220, 176, 1.2]]} />}
    </Yard>
  );
}

const ROUNDS: Round[] = [
  {
    say: { en: "Gugu and Hawi are both pulling the kite string. \"MINE!\" \"MINE!\" What do the peacemakers do first?", am: "ጉጉና ሀዊ ሁለቱም የካይቱን ገመድ ይጎትታሉ። «የእኔ ነው!» «የእኔ ነው!» አስታራቂዎቹ መጀመሪያ ምን ያደርጋሉ?" },
    options: [
      { label: { en: "Shout even louder: \"STOP IT!\"", am: "በበለጠ መጮህ፦ «አቁሙ!»" }, ok: false, note: { en: "More shouting makes the storm bigger. Peace starts quietly.", am: "ብዙ ጩኸት ማዕበሉን ያባብሳል። ሰላም በጸጥታ ይጀምራል።" } },
      { label: { en: "\"Let's sit down in the shade and take a slow breath.\"", am: "«ጥላው ሥር ቁጭ ብለን ቀስ ብለን እንተንፍስ።»" }, ok: true },
      { label: { en: "Grab the kite and run away with it.", am: "ካይቱን ነጥቆ መሮጥ።" }, ok: false, note: { en: "Now there are three cross friends instead of two!", am: "አሁን ከሁለት ይልቅ ሦስት የተናደዱ ጓደኞች ሆኑ!" } },
    ],
    good: { en: "They sit down. A slow breath in, and out. The storm clouds get a little smaller.", am: "ተቀመጡ። ቀስ ብለው ተነፈሱ። የማዕበሉ ደመናዎች ትንሽ አነሱ።" },
    scene: (id, s) => scene(0, id, s),
  },
  {
    say: { en: "Who talks first?", am: "መጀመሪያ ማን ይናገራል?" },
    options: [
      { label: { en: "Everybody at once, as loud as they can.", am: "ሁሉም በአንድ ጊዜ፣ በቻሉት መጠን ጮክ ብለው።" }, ok: false, note: { en: "If everyone talks, nobody listens. Try one at a time.", am: "ሁሉም ከተናገረ ማንም አያዳምጥም። አንድ በአንድ እንሞክር።" } },
      { label: { en: "Whoever holds the speaking stick. The other one listens.", am: "የመናገሪያውን ዱላ የያዘ። ሌላው ያዳምጣል።" }, ok: true },
      { label: { en: "Whoever is the biggest.", am: "ትልቁ።" }, ok: false, note: { en: "Big or small, everyone gets a turn to speak.", am: "ትልቅም ይሁን ትንሽ፣ ሁሉም የመናገር ተራ አለው።" } },
    ],
    good: { en: "Tsehay gives the stick to Hawi. Gugu listens with both ears.", am: "ፀሐይ ዱላውን ለሀዊ ሰጠች። ጉጉ በሁለቱም ጆሮዎቹ አዳመጠ።" },
    scene: (id, s) => scene(1, id, s, { stick: s === "good" ? "hawi" : undefined }),
  },
  {
    say: { en: "Hawi says: \"I made the kite with Papa. When you grabbed it, I felt sad.\" Now Gugu has the stick. What does he say?", am: "ሀዊ፦ «ካይቱን ከአባቴ ጋር ነው የሠራሁት። ስትነጥቀኝ አዘንኩ» አለች። አሁን ዱላው ጉጉ ጋ ነው። ምን ይላል?" },
    options: [
      { label: { en: "\"That's silly.\"", am: "«ይህ ሞኝነት ነው።»" }, ok: false, note: { en: "Hawi's feeling is real. A peacemaker never laughs at a feeling.", am: "የሀዊ ስሜት እውነት ነው። አስታራቂ በስሜት አይስቅም።" } },
      { label: { en: "\"I didn't know! I just really wanted a turn. I felt left out.\"", am: "«አላውቅም ነበር! ተራ በጣም ፈልጌ ነው። የተገለልኩ መሰለኝ።»" }, ok: true },
      { label: { en: "Say nothing and walk off.", am: "ምንም ሳይናገሩ መሄድ።" }, ok: false, note: { en: "Then the quarrel stays inside. Saying how we feel helps it out.", am: "እንዲያ ከሆነ ጠቡ ውስጥ ይቀራል። ስሜታችንን መናገር ያስወጣዋል።" } },
    ],
    good: { en: "Now they both understand. Listen, speak, and find a way!", am: "አሁን ሁለቱም ተረዳዱ። እናዳምጥ፣ እንናገር፣ መንገድ እንፈልግ!" },
    scene: (id, s) => scene(2, id, s, { stick: "gugu", speak: s === "good" ? "gugu" : undefined }),
  },
  {
    say: { en: "What would be fair?", am: "ፍትሐዊው ምንድን ነው?" },
    options: [
      { label: { en: "The bigger one keeps the kite.", am: "ትልቁ ካይቱን ይውሰድ።" }, ok: false, note: { en: "That's fair for one, not for both. Look for a way that works for everyone.", am: "ይህ ለአንዱ ብቻ ነው ፍትሐዊ። ለሁሉም የሚሆን መንገድ እንፈልግ።" } },
      { label: { en: "Nobody flies it, ever.", am: "ማንም አያብረው።" }, ok: false, note: { en: "Then nobody is happy, and the kite is sad too!", am: "እንዲያ ከሆነ ማንም አይደሰትም፤ ካይቱም ያዝናል!" } },
      { label: { en: "Take turns: twenty counts each, and the one waiting holds the string.", am: "በተራ፦ እያንዳንዱ ሃያ እስኪቆጠር፣ የሚጠብቀው ገመዱን ይይዛል።" }, ok: true },
    ],
    good: { en: "Turns! Hawi first, because she made it, and Gugu holds the string. Then they swap.", am: "በተራ! ሀዊ ስለሠራችው መጀመሪያ፤ ጉጉ ገመዱን ይይዛል። ከዚያ ይቀያየራሉ።" },
    scene: (id, s) => scene(3, id, s),
  },
  {
    say: { en: "One last step before they play.", am: "ከመጫወታቸው በፊት አንድ የመጨረሻ ደረጃ።" },
    options: [
      { label: { en: "\"Sorry I grabbed.\" \"I forgive you.\" Then shake hands.", am: "«ስለነጠቅኩ ይቅርታ።» «ይቅር ብዬሃለሁ።» ከዚያ መጨባበጥ።" }, ok: true },
      { label: { en: "Stay cross all afternoon.", am: "ከሰዓት በኋላ ሁሉ ተኮራርፎ መቆየት።" }, ok: false, note: { en: "Staying cross is heavy, like carrying a stone. Put it down!", am: "ኩርፊያ እንደ ድንጋይ ይከብዳል። እናውርደው!" } },
      { label: { en: "Pretend nothing happened.", am: "ምንም እንዳልሆነ ማስመሰል።" }, ok: false, note: { en: "Something did happen. A sorry and a forgiving close it properly.", am: "አንድ ነገር ሆኗል። ይቅርታና ይቅር መባባል በደንብ ይዘጋዋል።" } },
    ],
    good: { en: "Saying sorry, forgiving, and playing again! The storm clouds are gone, and the kite flies high.", am: "ይቅርታ መጠየቅ፣ ይቅር ማለት፣ እንደገና መጫወት! የማዕበሉ ደመናዎች ጠፉ፤ ካይቱም ከፍ ብሎ በረረ።" },
    scene: (id, s) => scene(4, id, s),
  },
];

export default function Peacemaker({ lang, onDone }: DemoProps) {
  return (
    <ChoiceRounds
      lang={lang}
      title={{ en: "Be the Peacemaker", am: "አስታራቂ እንሁን" }}
      goal={{ en: "Lead the peace the way the elders do: one good step at a time.", am: "ሽማግሌዎች እንደሚያደርጉት ሰላምን እንምራ፦ አንድ በአንድ ደረጃ።" }}
      color={COLOR}
      rounds={ROUNDS}
      finale={{ en: "Little elders with big wisdom: you made the peace!", am: "ትንንሽ ሽማግሌዎች፣ ትልቅ ጥበብ፦ ሰላም አወረዳችሁ!" }}
      finaleScene={(id) => scene(5, id, "ask")}
      onDone={onDone}
    />
  );
}
