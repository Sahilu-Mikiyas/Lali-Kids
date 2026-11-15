"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, shuffled, t, type T } from "./kit";

/*
  "Act It Out" (level 5: short dialogues). Three little conversations (a new friend at school, the
  shop, the clinic) play line by line in speech bubbles. At each of the child's turns, two or three
  replies are offered; the right one joins the conversation and is read aloud. A dialogue to read
  and then act out with someone at home.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Turn = { them: string; replies: string[] };
type Talk = { title: T; pic: string; who: T; turns: Turn[] };
const TALKS: Talk[] = [
  {
    title: { en: "A new friend", am: "አዲስ ጓደኛ" },
    pic: "ball",
    who: { en: "Lensa", am: "ለንሳ" },
    turns: [
      { them: "Hello! What's your name?", replies: ["My name is Abdi.", "I am at school."] },
      { them: "How old are you?", replies: ["I'm six.", "Yes, please!"] },
      { them: "Do you want to play?", replies: ["Yes, please!", "It's ten birr."] },
    ],
  },
  {
    title: { en: "At the shop", am: "ሱቅ ውስጥ" },
    pic: "shop",
    who: { en: "Hooyo", am: "ሁዮ" },
    turns: [
      { them: "Hello! Can I help you?", replies: ["Yes. May I have some soap, please?", "My foot hurts."] },
      { them: "Here you are.", replies: ["How much is it?", "Good night!"] },
      { them: "It's ten birr.", replies: ["Here you are. Thank you!", "I'm six."] },
    ],
  },
  {
    title: { en: "At the clinic", am: "ክሊኒክ ውስጥ" },
    pic: "stethoscope",
    who: { en: "The nurse", am: "ነርሷ" },
    turns: [
      { them: "Hello. What's wrong?", replies: ["My ear hurts.", "I like mango."] },
      { them: "When did it start?", replies: ["Yesterday.", "Blue."] },
      { them: "Sit down, please.", replies: ["Thank you.", "Excuse me, hen!"] },
    ],
  },
];
const TEAL = "#0E8C80";

export default function ActItOut({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [turn, setTurn] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= TALKS.length;
  const talk = TALKS[Math.min(i, TALKS.length - 1)];
  const finished = turn >= talk.turns.length;
  const cur = talk.turns[Math.min(turn, talk.turns.length - 1)];
  const options = useMemo(() => shuffled(cur.replies, (i * 3 + turn + 2) / 13), [cur, i, turn]);

  const pick = (o: string) => {
    if (finished) return;
    if (o === cur.replies[0]) {
      sfx.good();
      say(o, 0.85);
      setWrong(null);
      const n = turn + 1;
      setTurn(n);
      if (n < talk.turns.length) setTimeout(() => say(talk.turns[n].them, 0.85), 1600);
      else
        setTimeout(() => {
          setTurn(0);
          setI((x) => x + 1);
        }, 2600);
    } else {
      sfx.oops();
      setWrong(o);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Act It Out", am: "ተውኑት" }}
      howTo={{ en: "Read what they say. Tap your answer to keep the talk going!", am: "የሚሉትን አንብቡ። ንግግሩ እንዲቀጥል መልሳችሁን ንኩ!" }}
      total={TALKS.length}
      got={Math.min(i + (finished ? 1 : 0), TALKS.length)}
      done={done}
      onDone={onDone}
      color={TEAL}
      onAgain={() => {
        setI(0);
        setTurn(0);
        setWrong(null);
      }}
      ending={<p className="text-lg">{t(lang, { en: "Now act them out with someone at home!", am: "አሁን ከቤተሰባችሁ ጋር ተውኗቸው!" })}</p>}
    >
      <div className="flex items-center justify-center gap-2">
        <Pic id={talk.pic} size={44} />
        <p className="text-xl font-bold" style={{ color: TEAL }}>
          {talk.title[lang]}
        </p>
      </div>
      <div className="mt-2 flex min-h-[200px] flex-col gap-2 rounded-3xl bg-white p-3" lang="en" data-turn={turn}>
        {talk.turns.slice(0, Math.min(turn + 1, talk.turns.length)).map((tn, k) => (
          <div key={`${i}-${k}`} className="flex flex-col gap-1">
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[85%] self-start rounded-2xl rounded-bl-none bg-[#EAF1FC] px-3 py-1.5 text-lg font-bold" style={ANDIKA}>
              <span className="mr-1 text-sm text-[#5B6A8A]">{talk.who[lang]}:</span>
              {tn.them}
            </motion.p>
            {k < turn && (
              <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[85%] self-end rounded-2xl rounded-br-none bg-[#E4F7EA] px-3 py-1.5 text-lg font-bold" style={ANDIKA}>
                {tn.replies[0]}
              </motion.p>
            )}
          </div>
        ))}
      </div>
      {!finished && (
        <div className="mt-3 flex flex-col gap-2" lang="en">
          {options.map((o) => (
            <motion.button
              key={`${i}-${turn}-${o}`}
              type="button"
              data-choice={o === cur.replies[0] ? "right" : "wrong"}
              onClick={() => pick(o)}
              animate={wrong === o ? { x: [0, -6, 6, -4, 0] } : {}}
              className="rounded-2xl border-4 bg-white px-3 py-2 text-lg font-bold shadow-[0_4px_0_#00000018] active:translate-y-0.5"
              style={{ ...ANDIKA, borderColor: wrong === o ? "#E58A00" : "#FFFFFF" }}
            >
              {o}
            </motion.button>
          ))}
        </div>
      )}
      {finished ? (
        <Note tone="good">{t(lang, { en: "A whole conversation in English!", am: "ሙሉ የእንግሊዝኛ ንግግር!" })}</Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: "Does that answer the question? Read it again.", am: "ያ ጥያቄውን ይመልሳል? እንደገና አንብቡት።" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Your turn!", am: "የእናንተ ተራ!" })}</Note>
      )}
    </Frame>
  );
}
