"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "Why? Because!" (level 4: cause and effect). A sentence beginning with a picture ("The ground is
  wet because…") and three endings. The child taps the ending that gives the reason; the whole
  sentence is read aloud, joined with because. Six sentences.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type R = { start: string; pic: string; right: string; wrong: [string, string]; am: string };
const ROUNDS: R[] = [
  { start: "The ground is wet", pic: "rain", right: "it rained.", wrong: ["the sun is hot.", "I am hungry."], am: "መሬቱ እርጥብ ነው፤ ምክንያቱም ዘነበ።" },
  { start: "The bees are busy", pic: "bee", right: "there are lots of flowers.", wrong: ["it is night.", "the cat is asleep."], am: "ንቦቹ ሥራ በዝቶባቸዋል፤ ምክንያቱም ብዙ አበቦች አሉ።" },
  { start: "Gugu's toe hurts", pic: "rock", right: "he kicked a rock.", wrong: ["he ate a mango.", "he sang a song."], am: "የጉጉ ጣት ያመዋል፤ ምክንያቱም ድንጋይ መታ።" },
  { start: "The crow can drink", pic: "crow", right: "the stones pushed the water up.", wrong: ["the pot is empty.", "the crow is asleep."], am: "ቁራው መጠጣት ይችላል፤ ምክንያቱም ድንጋዮቹ ውሃውን ወደ ላይ ገፉት።" },
  { start: "Ayan took the washing in", pic: "washing", right: "she saw dark clouds.", wrong: ["it was sunny.", "she wanted to play."], am: "አያን ልብሱን አስገባች፤ ምክንያቱም ጥቁር ደመና አየች።" },
  { start: "Hawi got a gold star", pic: "star", right: "she helped Gugu.", wrong: ["she ran away.", "she fell asleep."], am: "ሀዊ የወርቅ ኮከብ አገኘች፤ ምክንያቱም ጉጉን ረዳች።" },
];
const GREEN = "#2E9A5B";

export default function BecauseMatch({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const options = useMemo(() => shuffled([r.right, ...r.wrong], (i + 3) / 19), [r, i]);

  const pick = (o: string) => {
    if (hit) return;
    if (o === r.right) {
      sfx.good();
      say(`${r.start} because ${r.right}`, 0.85);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2600);
    } else {
      sfx.oops();
      setWrong(o);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Why? Because!", am: "ለምን? ምክንያቱም!" }}
      howTo={{ en: "Read the start of the sentence. Which ending tells us why?", am: "የዓረፍተ ነገሩን መጀመሪያ አንብቡ። ለምን እንደሆነ የሚነግረን የትኛው መጨረሻ ነው?" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={GREEN}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="flex flex-col gap-1 text-base font-bold" style={ANDIKA} lang="en">
          {ROUNDS.map((x) => (
            <span key={x.start}>
              {x.start} <span style={{ color: GREEN }}>because</span> {x.right}
            </span>
          ))}
        </div>
      }
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div key={i} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl border-4 bg-white p-1" style={{ borderColor: GREEN }}>
          <Pic id={r.pic} size={80} />
        </motion.div>
      </div>
      <p className="mt-3 text-center text-2xl font-bold leading-snug" style={ANDIKA} lang="en" data-round={i}>
        {r.start} <span style={{ color: GREEN }}>because</span> {hit ? <span className="rounded-lg bg-[#E4F7EA] px-1">{r.right}</span> : "…"}
      </p>
      <div className="mt-3 flex flex-col gap-2" lang="en">
        {options.map((o) => (
          <motion.button
            key={`${i}-${o}`}
            type="button"
            data-choice={o === r.right ? "right" : "wrong"}
            onClick={() => pick(o)}
            animate={wrong === o ? { x: [0, -6, 6, -4, 0] } : {}}
            className="rounded-2xl border-4 bg-white px-3 py-2 text-xl font-bold shadow-[0_4px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: hit && o === r.right ? "#2FA35A" : wrong === o ? "#E58A00" : "#FFFFFF" }}
          >
            …because {o}
          </motion.button>
        ))}
      </div>
      {hit ? (
        <Note tone="good">{lang === "am" ? r.am : t(lang, { en: "That's the reason!", am: "" })}</Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: "Does that make it happen? Try another reason.", am: "ያ እንዲሆን ያደርጋል? ሌላ ምክንያት ሞክሩ።" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Because tells us why.", am: "Because (ምክንያቱም) ለምን እንደሆነ ይነግረናል።" })}</Note>
      )}
    </Frame>
  );
}
