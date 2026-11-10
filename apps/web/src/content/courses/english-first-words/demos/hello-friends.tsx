"use client";

import { useId, useMemo, useState } from "react";

import { Camel, Cub, CubSleepy, Grandma, Gugu, TAP, Wolf } from "@/components/book/courses/english-first-words/cast";
import { Home, Yard } from "@/components/book/courses/english-first-words/places";
import { Hearts, SayBubble, Sparkles } from "@/components/book/courses/english-first-words/props";
import { Thing } from "@/components/book/courses/english-first-words/things";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { DISPLAY, Frame, Note, say, sfx, shuffled, SpeakerIcon, t, type T } from "./kit";

/*
  "Hello, Goodbye!" (level 1): six little moments with the friends. Hawi comes in at the door, Gugu
  goes home, Grandma gives warm bread, Ayan has oranges you would like, the sun comes up, the moon
  comes out. The child taps what to say; every card says its English words out loud. The right
  one makes the friend smile and pops up in a speech bubble; another one gets a kind clue.
*/

type Moment = {
  scene: "come" | "go" | "give" | "ask" | "morning" | "night";
  say: string;
  gloss: T;
  wrong: { say: string; gloss: T }[];
  intro: T;
  clue: T;
};

const MOMENTS: Moment[] = [
  {
    scene: "come",
    say: "Hello!",
    gloss: { en: "", am: "ሰላም!" },
    wrong: [
      { say: "Goodbye!", gloss: { en: "", am: "ደህና ሁን!" } },
      { say: "Thank you!", gloss: { en: "", am: "አመሰግናለሁ!" } },
    ],
    intro: { en: "Knock, knock! Hawi comes in. What do we say?", am: "ኳ፣ ኳ! ሀዊ ገባች። ምን እንላለን?" },
    clue: { en: "Hawi is coming IN. When someone comes, we say hello!", am: "ሀዊ እየገባች ነው። አንድ ሰው ሲመጣ «Hello!» እንላለን።" },
  },
  {
    scene: "go",
    say: "Goodbye!",
    gloss: { en: "", am: "ደህና ሁን!" },
    wrong: [
      { say: "Hello!", gloss: { en: "", am: "ሰላም!" } },
      { say: "Please!", gloss: { en: "", am: "እባክህ!" } },
    ],
    intro: { en: "Gugu is going home. What do we say?", am: "ጉጉ ወደ ቤቱ እየሄደ ነው። ምን እንላለን?" },
    clue: { en: "Gugu is GOING. When someone goes, we say goodbye!", am: "ጉጉ እየሄደ ነው። አንድ ሰው ሲሄድ «Goodbye!» እንላለን።" },
  },
  {
    scene: "give",
    say: "Thank you!",
    gloss: { en: "", am: "አመሰግናለሁ!" },
    wrong: [
      { say: "Good night!", gloss: { en: "", am: "ደህና እደሪ!" } },
      { say: "Goodbye!", gloss: { en: "", am: "ደህና ሁኚ!" } },
    ],
    intro: { en: "Grandma gives you warm bread. What do we say?", am: "አያቴ ትኩስ ዳቦ ሰጠችን። ምን እንላለን?" },
    clue: { en: "When someone GIVES us something, we say thank you!", am: "አንድ ሰው አንድ ነገር ሲሰጠን «Thank you!» እንላለን።" },
  },
  {
    scene: "ask",
    say: "Please may I have one?",
    gloss: { en: "", am: "እባክሽ አንድ ልውሰድ?" },
    wrong: [
      { say: "Good morning!", gloss: { en: "", am: "እንደምን አደርሽ!" } },
      { say: "Thank you!", gloss: { en: "", am: "አመሰግናለሁ!" } },
    ],
    intro: { en: "Ayan has oranges. You would like one. What do we say?", am: "አያን ብርቱካኖች አሏት። አንድ ትፈልጋላችሁ። ምን እንላለን?" },
    clue: { en: "When we ASK for something, we say please!", am: "አንድ ነገር ስንጠይቅ «Please» እንላለን።" },
  },
  {
    scene: "morning",
    say: "Good morning!",
    gloss: { en: "", am: "እንደምን አደርሽ!" },
    wrong: [
      { say: "Good night!", gloss: { en: "", am: "ደህና እደሪ!" } },
      { say: "Goodbye!", gloss: { en: "", am: "ደህና ሁኚ!" } },
    ],
    intro: { en: "The sun is coming up. Grandma wakes up. What do we say?", am: "ፀሐይ እየወጣች ነው። አያቴ ነቃች። ምን እንላለን?" },
    clue: { en: "Look at the sky: the sun is coming up. In the morning we say good morning!", am: "ሰማዩን ተመልከቱ፦ ፀሐይ እየወጣች ነው። ጠዋት «Good morning!» እንላለን።" },
  },
  {
    scene: "night",
    say: "Good night!",
    gloss: { en: "", am: "ደህና እደሪ!" },
    wrong: [
      { say: "Good morning!", gloss: { en: "", am: "እንደምን አደርሽ!" } },
      { say: "Hello!", gloss: { en: "", am: "ሰላም!" } },
    ],
    intro: { en: "The moon is out. It's time for bed. What do we say?", am: "ጨረቃ ወጥታለች። የመኝታ ሰዓት ነው። ምን እንላለን?" },
    clue: { en: "Look at the sky: it's night. At bedtime we say good night!", am: "ሰማዩን ተመልከቱ፦ ማታ ነው። ስንተኛ «Good night!» እንላለን።" },
  },
];

/** The picture for a moment; `happy` once the child has said the right thing. */
function Picture({ m, happy }: { m: Moment; happy: boolean }) {
  const id = useId().replace(/:/g, "");
  const mood = happy ? "joy" : "happy";
  switch (m.scene) {
    case "come":
      return (
        <Home id={id} time="day" door="open">
          <Place x={98} y={264} s={0.44} tap={TAP.hawi}>
            <Wolf mood={mood} arm={happy ? "wave" : undefined} wag={happy} />
          </Place>
          <Place x={270} y={292} s={0.5} flip tap={TAP.cub}>
            <Cub mood={mood} arm={happy ? "up" : "none"} />
          </Place>
          {happy && <SayBubble x={250} y={150} lines={[m.say]} size={18} tail="down" delay={0} />}
        </Home>
      );
    case "go":
      return (
        <Yard id={id} time="evening">
          <Place x={300} y={290} s={0.42} tap={TAP.gugu}>
            <Gugu mood={mood} pose="wave" />
          </Place>
          <Place x={110} y={292} s={0.48} tap={TAP.cub}>
            <Cub mood={mood} arm={happy ? "up" : "none"} />
          </Place>
          {happy && <SayBubble x={130} y={160} lines={[m.say]} size={18} tail="down" delay={0} />}
        </Yard>
      );
    case "give":
      return (
        <Home id={id} time="day">
          <Place x={130} y={292} s={0.52} tap={TAP.grandma}>
            <Grandma mood={mood} arm="hold" item={<Thing id="loaf" s={0.4} />} />
          </Place>
          <Place x={280} y={292} s={0.5} flip tap={TAP.cub}>
            <Cub mood={mood} arm="reach" />
          </Place>
          {happy && <SayBubble x={290} y={150} lines={[m.say]} size={18} tail="down" delay={0} />}
          {happy && <Hearts spots={[[200, 200, 0.2], [214, 186, 0.8]]} />}
        </Home>
      );
    case "ask":
      return (
        <Yard id={id} time="day" house={false}>
          <g transform="translate(250 270)">
            <ellipse cx={0} cy={0} rx={40} ry={10} fill="#B8802A" />
            {[-24, -8, 8, 24, -16, 0, 16].map((x, i) => (
              <circle key={i} cx={x} cy={i < 4 ? -8 : -20} r={8} fill="#F08A24" stroke="#C8641A" strokeWidth={1} />
            ))}
          </g>
          <Place x={320} y={292} s={0.5} flip tap={TAP.ayan}>
            <Camel who="ayan" mood={mood} item={happy ? <Thing id="orange" s={0.3} /> : undefined} />
          </Place>
          <Place x={110} y={292} s={0.48} tap={TAP.cub}>
            <Cub mood={mood} arm="give" />
          </Place>
          {happy && <SayBubble x={150} y={150} lines={["Please may I", "have one?"]} size={15} tail="down" delay={0} />}
        </Yard>
      );
    case "morning":
      return (
        <Yard id={id} time="morning" sun={[80, 100]}>
          <Place x={150} y={292} s={0.5} tap={TAP.grandma}>
            <Grandma mood={mood} arm={happy ? "raise" : "down"} />
          </Place>
          <Place x={270} y={292} s={0.48} flip tap={TAP.cub}>
            <Cub mood={mood} arm={happy ? "up" : "none"} />
          </Place>
          {happy && <SayBubble x={270} y={150} lines={[m.say]} size={18} tail="down" delay={0} />}
        </Yard>
      );
    default:
      return (
        <Home id={id} time="night" shelf={false}>
          <rect x={60} y={252} width={170} height={20} rx={8} fill="#4A7FD0" />
          <Place x={110} y={278} s={0.44} tap={TAP.cub}>
            <CubSleepy />
          </Place>
          <path d="M100 238 Q150 222 226 236 L230 270 L104 270Z" fill="#E2463F" />
          <Place x={320} y={290} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood={mood} arm={happy ? "raise" : "down"} />
          </Place>
          {happy && <SayBubble x={170} y={170} lines={[m.say]} size={18} tail="down" delay={0} />}
        </Home>
      );
  }
}

export default function HelloFriends({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [got, setGot] = useState(0);
  const [right, setRight] = useState(false);
  const [miss, setMiss] = useState<string | null>(null);
  const done = i >= MOMENTS.length;
  const m = MOMENTS[Math.min(i, MOMENTS.length - 1)];
  const options = useMemo(() => shuffled([{ say: m.say, gloss: m.gloss, ok: true }, ...m.wrong.map((w) => ({ ...w, ok: false }))], (i + 1) / 9), [m, i]);

  const pick = (o: (typeof options)[number]) => {
    if (right) return;
    say(o.say);
    if (o.ok) {
      sfx.good();
      setRight(true);
      setMiss(null);
      setGot((g) => Math.max(g, i + 1));
    } else {
      sfx.oops();
      setMiss(o.say);
    }
  };
  const next = () => {
    setRight(false);
    setMiss(null);
    setI((n) => n + 1);
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Hello, Goodbye!", am: "Hello፣ Goodbye!" }}
      howTo={{ en: "What do we say? Tap the words. Each card says them in English.", am: "ምን እንላለን? ቃላቱን ንኩ። እያንዳንዱ ካርድ ቃላቱን በእንግሊዝኛ ይናገራል።" }}
      total={MOMENTS.length}
      got={got}
      done={done}
      onDone={onDone}
      onAgain={() => {
        setI(0);
        setGot(0);
        setRight(false);
        setMiss(null);
      }}
      ending={<p className="text-xl">{t(lang, { en: "Hello, please, thank you, goodbye, good morning and good night!", am: "Hello፣ please፣ thank you፣ goodbye፣ good morning እና good night!" })}</p>}
    >
      <div className="overflow-hidden rounded-[24px] border-4 border-white bg-[#CFEAF6] shadow-[0_8px_24px_rgba(27,42,78,0.15)]">
        <svg viewBox="0 0 400 300" className="block h-auto w-full" role="img" aria-label={t(lang, m.intro)}>
          <g key={`${i}-${right}`}>
            <Picture m={m} happy={right} />
            {right && <Sparkles x={200} y={150} r={90} delay={0.1} n={7} />}
          </g>
        </svg>
      </div>
      <p className="mt-3 text-center text-xl font-bold leading-snug">{t(lang, m.intro)}</p>
      <div className="mt-3 grid gap-2.5">
        {options.map((o) => (
          <button
            key={o.say}
            type="button"
            data-choice={o.ok ? "right" : "wrong"}
            onClick={() => pick(o)}
            disabled={right && !o.ok}
            className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border-2 bg-white px-4 py-2.5 text-left shadow-[0_4px_0_#D3E4F4] transition active:translate-y-0.5 disabled:opacity-40"
            style={{ borderColor: right && o.ok ? "#2FA35A" : miss === o.say ? "#E58A00" : "#D3E4F4" }}
          >
            <span className="min-w-0">
              <span className="block text-2xl font-black leading-tight" style={DISPLAY} lang="en">
                {o.say}
              </span>
              {lang === "am" && o.gloss.am && <span className="block text-base text-[#5B4636]">{o.gloss.am}</span>}
            </span>
            <span aria-hidden className="shrink-0">
              <SpeakerIcon size={26} color="#0E8C80" />
            </span>
          </button>
        ))}
      </div>
      {right ? (
        <div className="mt-3 flex justify-center">
          <button type="button" data-next="" onClick={next} className="rounded-full bg-[#0E8C80] px-6 py-2.5 text-lg font-bold text-white shadow-[0_4px_0_#0A6A61] active:translate-y-0.5">
            {t(lang, i === MOMENTS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next", am: "ቀጣይ" })}
          </button>
        </div>
      ) : (
        miss && <Note tone="try">{t(lang, m.clue)}</Note>
      )}
    </Frame>
  );
}
