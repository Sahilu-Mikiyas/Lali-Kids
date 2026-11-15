"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, shuffled, t, type T } from "./kit";

/*
  "Say It Nicely" (level 5: polite phrases). A little moment is described (in the child's language)
  with a picture; the child taps what to say in English: please, thank you, excuse me, sorry,
  you're welcome, may I…? Eight moments; the voice says the phrase.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type R = { moment: T; pic: string; right: string; others: [string, string] };
const ROUNDS: R[] = [
  { moment: { en: "You want some bread at the shop.", am: "ሱቅ ውስጥ ዳቦ ትፈልጋላችሁ።" }, pic: "bread", right: "May I have some bread, please?", others: ["Sorry!", "You're welcome."] },
  { moment: { en: "Hooyo gives you an orange.", am: "ሁዮ ብርቱካን ሰጠቻችሁ።" }, pic: "orange", right: "Thank you!", others: ["Excuse me.", "Sorry!"] },
  { moment: { en: "You need to get past someone on the bus.", am: "አውቶቡስ ውስጥ አንድን ሰው አልፋችሁ መሄድ አለባችሁ።" }, pic: "bus", right: "Excuse me, please.", others: ["Thank you!", "You're welcome."] },
  { moment: { en: "You stood on someone's foot.", am: "የአንድን ሰው እግር ረገጣችሁ።" }, pic: "foot", right: "I'm sorry!", others: ["Excuse me.", "May I?"] },
  { moment: { en: "Your friend says, \"Thank you!\"", am: "ጓደኛችሁ «Thank you!» አላችሁ።" }, pic: "heart", right: "You're welcome.", others: ["Sorry!", "Please."] },
  { moment: { en: "You want to borrow a pencil.", am: "እርሳስ መዋስ ትፈልጋላችሁ።" }, pic: "pencil", right: "May I use your pencil, please?", others: ["Thank you!", "Sorry!"] },
  { moment: { en: "You want to ask the teacher something.", am: "መምህሯን አንድ ነገር መጠየቅ ትፈልጋላችሁ።" }, pic: "book", right: "Excuse me, Teacher.", others: ["You're welcome.", "Sorry!"] },
  { moment: { en: "You spilled water on the table.", am: "ጠረጴዛው ላይ ውሃ ደፋችሁ።" }, pic: "water", right: "Oops, I'm sorry!", others: ["Excuse me.", "Thank you!"] },
];
const ORANGE = "#D9662B";

export default function SayItNicely({ lang, onDone }: DemoProps) {
  const [i, setI] = useState(0);
  const [hit, setHit] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = i >= ROUNDS.length;
  const r = ROUNDS[Math.min(i, ROUNDS.length - 1)];
  const options = useMemo(() => shuffled([r.right, ...r.others], (i + 2) / 17), [r, i]);

  const pick = (o: string) => {
    if (hit) return;
    if (o === r.right) {
      sfx.good();
      say(o, 0.85);
      setHit(true);
      setWrong(null);
      setTimeout(() => {
        setHit(false);
        setI((n) => n + 1);
      }, 2000);
    } else {
      sfx.oops();
      setWrong(o);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "Say It Nicely", am: "በጨዋነት ተናገሩ" }}
      howTo={{ en: "What do you say? Tap the polite words.", am: "ምን ትላላችሁ? የጨዋነት ቃላቱን ንኩ።" }}
      total={ROUNDS.length}
      got={Math.min(i + (hit ? 1 : 0), ROUNDS.length)}
      done={done}
      onDone={onDone}
      color={ORANGE}
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <p className="text-lg font-bold" style={ANDIKA} lang="en">
          Please, thank you, excuse me, sorry, you&apos;re welcome!
        </p>
      }
    >
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-[0_4px_0_#00000014]">
        <Pic id={r.pic} size={72} />
        <p className="text-xl font-bold leading-snug" data-round={i}>
          {r.moment[lang]}
        </p>
      </motion.div>
      <div className="mt-3 flex flex-col gap-2" lang="en">
        {options.map((o) => (
          <motion.button
            key={`${i}-${o}`}
            type="button"
            data-choice={o === r.right ? "right" : "wrong"}
            onClick={() => pick(o)}
            animate={wrong === o ? { x: [0, -6, 6, -4, 0] } : hit && o === r.right ? { scale: [1, 1.05, 1] } : {}}
            className="rounded-2xl border-4 bg-white px-3 py-2 text-xl font-bold shadow-[0_4px_0_#00000018] active:translate-y-0.5"
            style={{ ...ANDIKA, borderColor: hit && o === r.right ? "#2FA35A" : wrong === o ? "#E58A00" : "#FFFFFF" }}
          >
            {o}
          </motion.button>
        ))}
      </div>
      {hit ? (
        <Note tone="good">{t(lang, { en: "That's the kind thing to say!", am: "ትክክለኛው የጨዋነት አባባል ይኸው ነው!" })}</Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: "Hmm, does that fit? Think about what just happened.", am: "እም፣ ይገጥማል? አሁን የሆነውን አስቡ።" })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Excuse me before, sorry after!", am: "Excuse me በፊት፣ sorry በኋላ!" })}</Note>
      )}
    </Frame>
  );
}
