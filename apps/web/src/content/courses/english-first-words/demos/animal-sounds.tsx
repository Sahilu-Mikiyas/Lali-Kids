"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { DISPLAY, Frame, Hear, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Who Says Moo?" (level 2): the animal-sound match. The voice says an animal's sound in English
  ("Moo!") and three animals wait; the child taps the one that makes it, and the voice names it
  ("The cow says moo!"). A wrong tap says that animal's own name and sound, so it still teaches.
  Farm animals from Grandpa Tolosa's farm, and Ethiopia's own lion.
*/

type Animal = { id: string; sound: string; am: string };
const ANIMALS: Animal[] = [
  { id: "cow", sound: "Moo", am: "ላም" },
  { id: "sheep", sound: "Baa", am: "በግ" },
  { id: "dog", sound: "Woof", am: "ውሻ" },
  { id: "cat", sound: "Meow", am: "ድመት" },
  { id: "hen", sound: "Cluck", am: "ዶሮ" },
  { id: "donkey", sound: "Hee-haw", am: "አህያ" },
  { id: "horse", sound: "Neigh", am: "ፈረስ" },
  { id: "lion", sound: "Roar", am: "አንበሳ" },
];

export default function AnimalSounds({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<Animal | null>(null);
  const done = i >= ANIMALS.length;
  const a = ANIMALS[Math.min(i, ANIMALS.length - 1)];
  const choices = useMemo(() => {
    const others = shuffled(ANIMALS.filter((x) => x.id !== a.id), (i + 2) / 11).slice(0, 2);
    return shuffled([a, ...others], (i + 5) / 13);
  }, [a, i]);
  const call = `${a.sound}! Who says ${a.sound.toLowerCase()}?`;

  useEffect(() => {
    if (!done) say(call);
  }, [call, done]);

  const tap = (x: Animal) => {
    if (hit) return;
    if (x.id === a.id) {
      sfx.good();
      say(`The ${x.id} says ${x.sound.toLowerCase()}!`);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2000);
    } else {
      sfx.oops();
      say(`The ${x.id} says ${x.sound.toLowerCase()}.`);
      setWrong(x);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Who Says Moo?", am: "«Moo» የሚለው ማን ነው?" }}
      howTo={{ en: "Listen to the sound. Tap the animal that says it.", am: "ድምፁን አዳምጡ። ያንን ድምፅ የሚያሰማውን እንስሳ ንኩ።" }}
      total={ANIMALS.length}
      got={Math.min(i + (hit ? 1 : 0), ANIMALS.length)}
      done={done}
      onDone={onDone}
      color="#2E9A5B"
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-wrap justify-center gap-2" lang="en">
          {ANIMALS.map((x) => (
            <span key={x.id} className="flex items-center gap-1 rounded-xl bg-[#EAF7EE] px-2 py-1 text-base font-bold" style={DISPLAY}>
              <Pic id={x.id} size={28} />
              {x.id}: {x.sound.toLowerCase()}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.span key={a.id} initial={{ scale: 0.5 }} animate={{ scale: [0.5, 1.15, 1] }} className="rounded-3xl border-4 border-[#2E9A5B] bg-white px-5 py-2 text-4xl font-black text-[#2E9A5B]" style={DISPLAY} lang="en">
          {a.sound}!
        </motion.span>
        <Hear text={call} lang={lang} color="#2E9A5B" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {choices.map((x) => (
          <motion.button
            key={`${i}-${x.id}`}
            type="button"
            data-animal={x.id}
            data-choice={x.id === a.id ? "right" : "wrong"}
            onClick={() => tap(x)}
            animate={hit && x.id === a.id ? { y: [0, -16, 0, -8, 0] } : wrong?.id === x.id ? { x: [0, -6, 6, -4, 0] } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-1 rounded-3xl border-4 bg-white p-2 shadow-[0_5px_0_#D3E4F4] active:translate-y-0.5"
            style={{ borderColor: hit && x.id === a.id ? "#2FA35A" : wrong?.id === x.id ? "#E58A00" : "#FFFFFF" }}
          >
            <Pic id={x.id} size={84} />
            <span className="text-lg font-black leading-none" style={DISPLAY} lang="en">
              {hit || wrong?.id === x.id ? x.id : "?"}
            </span>
          </motion.button>
        ))}
      </div>
      {hit ? (
        <Note tone="good">
          <span lang="en" style={DISPLAY} className="font-bold">
            The {a.id} says {a.sound.toLowerCase()}!
          </span>
          {lang === "am" && ` (${a.am})`}
        </Note>
      ) : wrong ? (
        <Note tone="try">
          {t(lang, { en: `The ${wrong.id} says ${wrong.sound.toLowerCase()}. Who says ${a.sound.toLowerCase()}?`, am: `${wrong.id} (${wrong.am}) «${wrong.sound.toLowerCase()}» ይላል። «${a.sound.toLowerCase()}» የሚለው ማን ነው?` })}
        </Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Tap an animal.", am: "አንድ እንስሳ ንኩ።" })}</Note>
      )}
    </Frame>
  );
}
