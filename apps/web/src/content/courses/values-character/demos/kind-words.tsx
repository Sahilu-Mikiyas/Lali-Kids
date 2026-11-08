"use client";

import { useId, useState, type ReactNode } from "react";

import { Camel, Cub, Grandma, Gugu, Ibex, TAP, Tsehay, Wolf } from "@/components/book/courses/values-character/kit-cast";
import { Village, Yard } from "@/components/book/courses/values-character/kit-places";
import { Crumbs, Dabo, Hearts, Kite, SnackBowl, Sparkles, Speech } from "@/components/book/courses/values-character/kit-props";
import { Place } from "@/components/book/scenery";
import type { DemoProps } from "../../types";
import { Choice, DemoFrame, Feedback, Finale, Next, sound, Stage, t, type T } from "./demo-kit";

/*
  Magic Words (level 1): please, thank you, sorry. Six little moments; the child picks the word
  that fits. Each right word opens one of the six doors along the top of the picture. A word
  that doesn't fit is explained kindly (what that word is for), and the child tries again.
  Thank-yous come with a bonus: how a friend's family says it in their language.
*/

type Word = "please" | "thanks" | "sorry";

const WORDS: Record<Word, { label: T; job: T }> = {
  please: { label: { en: "Please", am: "እባክህ / እባክሽ" }, job: { en: "\"Please\" is for asking for something.", am: "«እባክህ/ሽ» አንድ ነገር ለመጠየቅ ነው።" } },
  thanks: { label: { en: "Thank you", am: "አመሰግናለሁ" }, job: { en: "\"Thank you\" is for when someone gives you something or helps you.", am: "«አመሰግናለሁ» አንድ ሰው ሲሰጠን ወይም ሲረዳን ነው።" } },
  sorry: { label: { en: "Sorry", am: "ይቅርታ" }, job: { en: "\"Sorry\" is for when we make a mistake or hurt someone.", am: "«ይቅርታ» ስንሳሳት ወይም ሰውን ስንጎዳ ነው።" } },
};

type Moment = { word: Word; say: T; great: T; bonus?: T; scene: (good: boolean) => ReactNode };

const MOMENTS: Moment[] = [
  {
    word: "thanks",
    say: { en: "Grandma gives you a piece of warm bread.", am: "አያቴ ትኩስ ዳቦ ቆርሳ ሰጠችን።" },
    great: { en: "Grandma smiles: \"You're welcome, my dear.\"", am: "አያቴ ፈገግ አለች፦ «ምንም አይደል፣ ልጄ።»" },
    bonus: { en: "In Amharic: Amesegnalehu!", am: "በአማርኛ፦ አመሰግናለሁ!" },
    scene: (good) => (
      <>
        <Place x={140} y={292} s={0.5} tap={TAP.grandma}>
          <Grandma arm="hold" mood={good ? "joy" : "happy"} item={<g transform="scale(0.5)"><Dabo x={0} y={6} /></g>} />
        </Place>
        <Place x={280} y={294} s={0.46} flip tap={TAP.cub}>
          <Cub mood={good ? "joy" : "wow"} />
        </Place>
      </>
    ),
  },
  {
    word: "please",
    say: { en: "You are thirsty, and Tsehay has the water jug.", am: "ጠምቶናል፤ የውሃው ማንቆርቆሪያ ደግሞ ፀሐይ ጋ ነው።" },
    great: { en: "Tsehay pours you a cup of cool water.", am: "ፀሐይ ቀዝቃዛ ውሃ በኩባያ ቀዳችልን።" },
    scene: (good) => (
      <>
        <Place x={140} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={good ? "joy" : "happy"} arm={good ? "give" : "none"} />
        </Place>
        <Place x={270} y={294} s={0.46} flip tap={TAP.tsehay}>
          <Tsehay mood={good ? "joy" : "happy"} pose="wave" />
        </Place>
        <g transform="translate(230 196)">
          <path d="M-8 -14 L8 -14 L10 6 Q0 10 -10 6Z" fill="#B8683E" />
          <path d="M8 -12 Q16 -10 14 -2" stroke="#B8683E" strokeWidth={3} fill="none" />
        </g>
      </>
    ),
  },
  {
    word: "sorry",
    say: { en: "Oops! You bumped into Gugu and his kolo spilled.", am: "ውይ! ጉጉን ገጭተነው ቆሎው ተደፋ።" },
    great: { en: "Gugu says: \"That's all right!\" and you pick up the kolo together.", am: "ጉጉ «ችግር የለም!» አለ፤ ቆሎውን አብረን ለቀምን።" },
    scene: (good) => (
      <>
        <Place x={150} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={good ? "happy" : "worried"} arm={good ? "reach" : "none"} />
        </Place>
        <Place x={280} y={294} s={0.46} flip tap={TAP.gugu}>
          <Gugu mood={good ? "joy" : "sad"} />
        </Place>
        {good ? <SnackBowl x={214} y={288} kind="kolo" /> : <Crumbs x={214} y={284} n={14} seed={3} />}
      </>
    ),
  },
  {
    word: "thanks",
    say: { en: "Hawi helps you carry your heavy school bag.", am: "ሀዊ ከባዱን የትምህርት ቤት ቦርሳችንን አገዘችን።" },
    great: { en: "Hawi wags her tail. Helping a friend feels good!", am: "ሀዊ ጭራዋን አወዛወዘች። ጓደኛን መርዳት ደስ ያሰኛል!" },
    bonus: { en: "Hawi's family says: Galatoomi!", am: "የሀዊ ቤተሰብ «ገለቶሚ!» ይላሉ።" },
    scene: (good) => (
      <>
        <Place x={140} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={good ? "joy" : "happy"} />
        </Place>
        <Place x={270} y={294} s={0.46} flip tap={TAP.hawi}>
          <Wolf mood={good ? "joy" : "happy"} wag={good} arm="give" item={<rect x={-12} y={-12} width={24} height={20} rx={4} fill="#2F6FD0" />} />
        </Place>
      </>
    ),
  },
  {
    word: "please",
    say: { en: "You would love a turn with Haben's kite.", am: "የሐበንን ካይት ተራ ቢደርሰን ደስ ይለናል።" },
    great: { en: "Haben hands you the string: \"Your turn!\"", am: "ሐበን ክሩን ሰጠችን፦ «የእናንተ ተራ!»" },
    scene: (good) => (
      <>
        <Kite x={good ? 160 : 250} y={80} s={0.8} sx={good ? -20 : 10} sy={150} />
        <Place x={140} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={good ? "joy" : "happy"} arm={good ? "up" : "none"} />
        </Place>
        <Place x={270} y={294} s={0.46} flip tap={TAP.haben}>
          <Ibex mood="joy" pose="wave" />
        </Place>
      </>
    ),
  },
  {
    word: "sorry",
    say: { en: "You forgot to give back the pencil you borrowed from Ayan.", am: "ከአያን የተዋስነውን እርሳስ መመለስ ረሳን።" },
    great: { en: "Ayan smiles: \"Thank you for bringing it back!\"", am: "አያን ፈገግ አለች፦ «ስለመለሳችሁልኝ አመሰግናለሁ!»" },
    scene: (good) => (
      <>
        <Place x={140} y={294} s={0.46} tap={TAP.cub}>
          <Cub mood={good ? "happy" : "worried"} arm="give" item={<path d="M-12 4 L12 -4 L14 -1 L-10 7Z" fill="#F5B21E" stroke="#C98A0A" />} />
        </Place>
        <Place x={280} y={294} s={0.58} flip tap={TAP.ayan}>
          <Camel who="ayan" mood={good ? "joy" : "worried"} />
        </Place>
      </>
    ),
  },
];

/** The three words as pictures (a giving paw, a heart, a mended heart), centred on (0, 0). */
function WordShape({ word }: { word: Word }) {
  return (
    <g>
      {word === "please" && (
        <g>
          <ellipse cx={0} cy={3} rx={10} ry={7} fill="#5A3A2A" />
          <path d="M-8 -1 l-2 -7 M-3 -3 l-1 -8 M3 -3 l1 -8 M8 -1 l2 -7" stroke="#5A3A2A" strokeWidth={3.4} strokeLinecap="round" />
          <circle cx={0} cy={0} r={3} fill="#FFD233" />
        </g>
      )}
      {word === "thanks" && <path d="M0 10 C-13 0 -11 -12 -2 -12 C0 -12 0 -10 0 -8 C0 -10 0 -12 2 -12 C11 -12 13 0 0 10Z" fill="#E2463F" />}
      {word === "sorry" && (
        <g>
          <path d="M0 10 C-13 0 -11 -12 -2 -12 C0 -12 0 -10 0 -8 C0 -10 0 -12 2 -12 C11 -12 13 0 0 10Z" fill="#FF8FB1" />
          <rect x={-10} y={-4} width={20} height={7} rx={3.5} fill="#F2D3A2" transform="rotate(-30)" />
        </g>
      )}
    </g>
  );
}

function WordPic({ word, size = 34 }: { word: Word; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-14 -14 28 28" aria-hidden>
      <WordShape word={word} />
    </svg>
  );
}

/** The six doors along the top: open for each word found. */
function Doors({ open }: { open: number }) {
  return (
    <g>
      {Array.from({ length: 6 }, (_, k) => {
        const x = 44 + k * 50;
        const isOpen = k < open;
        return (
          <g key={k} transform={`translate(${x} 62)`}>
            <path d="M-16 0 L-16 -34 Q0 -44 16 -34 L16 0Z" fill={isOpen ? "#FFE9A0" : "#5A3A26"} />
            {isOpen ? (
              <g>
                <path d="M16 0 L16 -34 L24 -32 L24 2Z" fill="#8A5A3A" />
                <circle cx={0} cy={-14} r={5} fill="#FFD233" className="lali-pulse" />
              </g>
            ) : (
              <g>
                <path d="M-14 0 L-14 -32 Q0 -41 14 -32 L14 0Z" fill="#8A5A3A" />
                <circle cx={9} cy={-15} r={2} fill="#F5B21E" />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function KindWords({ lang, onDone }: DemoProps) {
  const id = useId().replace(/:/g, "");
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Word | null>(null);
  const [tried, setTried] = useState<Word[]>([]);
  const done = i >= MOMENTS.length;
  const m = MOMENTS[Math.min(i, MOMENTS.length - 1)];
  const good = pick === m.word;

  const choose = (w: Word) => {
    setPick(w);
    if (w === m.word) sound.good();
    else {
      sound.gentle();
      setTried((x) => [...x, w]);
    }
  };
  const next = () => {
    setI((n) => n + 1);
    setPick(null);
    setTried([]);
  };

  return (
    <DemoFrame lang={lang} title={{ en: "Magic Words", am: "አስማተኛ ቃላት" }} goal={{ en: "Please, thank you or sorry? Pick the word that opens the door.", am: "እባክህ፣ አመሰግናለሁ ወይስ ይቅርታ? በሩን የሚከፍተውን ቃል ምረጡ።" }} step={i} total={MOMENTS.length} color="#2E9A8A">
      <Stage label={done ? undefined : t(lang, m.say)}>
        {done ? (
          <Village id={id} time="day">
            <Doors open={6} />
            <Place x={60} y={294} s={0.36} tap={TAP.grandma}>
              <Grandma mood="joy" arm="raise" />
            </Place>
            <Place x={120} y={296} s={0.3} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="hop" />
            </Place>
            <Place x={176} y={296} s={0.32} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={230} y={296} s={0.32} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={282} y={296} s={0.3} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
            <Place x={330} y={296} s={0.3} flip tap={TAP.haben}>
              <Ibex mood="joy" pose="wave" />
            </Place>
            <Place x={376} y={296} s={0.38} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <Sparkles x={200} y={120} r={120} delay={0.2} n={9} />
          </Village>
        ) : (
          <Yard id={id} time="day" house={false}>
            <Doors open={i + (good ? 1 : 0)} />
            <g key={`${i}-${pick ?? "x"}`}>
              {m.scene(good)}
              {pick && (
                <Speech x={200} y={150} w={46} h={40} tail="left" delay={0}>
                  <WordShape word={pick} />
                </Speech>
              )}
              {good && <Hearts spots={[[200, 196, 0.4], [222, 184, 1.2]]} />}
            </g>
          </Yard>
        )}
      </Stage>

      {done ? (
        <Finale lang={lang} text={{ en: "Six doors open! Little words, big magic.", am: "ስድስት በሮች ተከፈቱ! ትንንሽ ቃላት፣ ትልቅ አስማት።" }} onDone={onDone} color="#2E9A8A" />
      ) : (
        <>
          <p className="mt-4 font-display text-xl font-extrabold text-ink">{t(lang, m.say)}</p>
          {pick && good ? (
            <Feedback tone="great" action={<Next onClick={next} color="#2E9A8A">{t(lang, i === MOMENTS.length - 1 ? { en: "Finish", am: "ጨርሱ" } : { en: "Next", am: "ቀጣይ" })}</Next>}>
              <p>{t(lang, m.great)}</p>
              {m.bonus && <p className="mt-1 font-display font-extrabold text-teal-deep">{t(lang, m.bonus)}</p>}
            </Feedback>
          ) : pick ? (
            <Feedback tone="gentle" action={<Next onClick={() => setPick(null)} color="#C98A0A">{t(lang, { en: "Try another word", am: "ሌላ ቃል ሞክሩ" })}</Next>}>
              {t(lang, WORDS[pick].job)} {t(lang, { en: "Which word fits here?", am: "እዚህ የሚስማማው የትኛው ቃል ነው?" })}
            </Feedback>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {(["please", "thanks", "sorry"] as Word[]).map((w) => (
                <Choice key={w} onClick={() => choose(w)} pic={<WordPic word={w} />} tone={tried.includes(w) ? "soft" : "plain"}>
                  {t(lang, WORDS[w].label)}
                </Choice>
              ))}
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
