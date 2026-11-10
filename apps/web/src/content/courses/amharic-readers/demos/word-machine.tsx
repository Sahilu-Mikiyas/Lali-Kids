"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, useLater, type T } from "./shared/kit";

/*
  Level 3, "The word machine" (after "One Goat, Many Goats" and "Whose Is It?"): a word drops
  into the machine. Six levers change its ending: many (ኦች / ዎች), my (-ኤ), your to a boy (-ህ),
  your to a girl (-ሽ), his (-ኡ), her (-ዋ). The task says which word to make; pull a lever and
  the machine shows the new word with its ending in colour. A wrong lever still makes a real
  word (and says which one it made), so the child learns from every pull. Eight words, then onDone.
*/

type Form = "many" | "my" | "yourM" | "yourF" | "his" | "her";
const FORMS: Form[] = ["many", "my", "yourM", "yourF", "his", "her"];
const COLORS: Record<Form, string> = { many: "#C2410C", my: "#E07A1E", yourM: "#2F6FD6", yourF: "#D0457E", his: "#2E8A4A", her: "#8A4FB0" };
const LEVER: Record<Form, T> = {
  many: { en: "many", am: "ብዙ" },
  my: { en: "my", am: "የእኔ" },
  yourM: { en: "your (boy)", am: "ያንተ" },
  yourF: { en: "your (girl)", am: "ያንቺ" },
  his: { en: "his", am: "የእሱ" },
  her: { en: "her", am: "የእሷ" },
};

/** Each word and its six forms, as [stem, ending] so the ending can be coloured. */
const WORDS: Record<string, { pic: string; en: string; f: Record<Form, [string, string]> }> = {
  ፍየል: { pic: "goat", en: "goat", f: { many: ["ፍየ", "ሎች"], my: ["ፍየ", "ሌ"], yourM: ["ፍየል", "ህ"], yourF: ["ፍየል", "ሽ"], his: ["ፍየ", "ሉ"], her: ["ፍየ", "ሏ"] } },
  ዶሮ: { pic: "hen", en: "hen", f: { many: ["ዶሮ", "ዎች"], my: ["ዶሮ", "ዬ"], yourM: ["ዶሮ", "ህ"], yourF: ["ዶሮ", "ሽ"], his: ["ዶሮ", "ው"], her: ["ዶሮ", "ዋ"] } },
  ቤት: { pic: "house", en: "house", f: { many: ["ቤ", "ቶች"], my: ["ቤ", "ቴ"], yourM: ["ቤት", "ህ"], yourF: ["ቤት", "ሽ"], his: ["ቤ", "ቱ"], her: ["ቤ", "ቷ"] } },
  ቦርሳ: { pic: "bag", en: "bag", f: { many: ["ቦርሳ", "ዎች"], my: ["ቦርሳ", "ዬ"], yourM: ["ቦርሳ", "ህ"], yourF: ["ቦርሳ", "ሽ"], his: ["ቦርሳ", "ው"], her: ["ቦርሳ", "ዋ"] } },
  ኳስ: { pic: "ball", en: "ball", f: { many: ["ኳ", "ሶች"], my: ["ኳ", "ሴ"], yourM: ["ኳስ", "ህ"], yourF: ["ኳስ", "ሽ"], his: ["ኳ", "ሱ"], her: ["ኳ", "ሷ"] } },
  ደብተር: { pic: "notebook", en: "notebook", f: { many: ["ደብተ", "ሮች"], my: ["ደብተ", "ሬ"], yourM: ["ደብተር", "ህ"], yourF: ["ደብተር", "ሽ"], his: ["ደብተ", "ሩ"], her: ["ደብተ", "ሯ"] } },
  ሎሚ: { pic: "lemon", en: "lemon", f: { many: ["ሎሚ", "ዎች"], my: ["ሎሚ", "ዬ"], yourM: ["ሎሚ", "ህ"], yourF: ["ሎሚ", "ሽ"], his: ["ሎሚ", "ው"], her: ["ሎሚ", "ዋ"] } },
};

const TASKS: { word: keyof typeof WORDS; form: Form; ask: T }[] = [
  { word: "ፍየል", form: "many", ask: { en: "Lots of goats! Make the word for many.", am: "ብዙ ፍየሎች! «ብዙ» የሚለውን ቃል ሥሩ።" } },
  { word: "ቤት", form: "my", ask: { en: "Anbessa says: this is MY house.", am: "አንበሳ ይላል፦ ይሄ የእኔ ቤት ነው።" } },
  { word: "ቦርሳ", form: "yourF", ask: { en: "Ask Haben (a girl): is this YOUR bag?", am: "ሐበንን ጠይቁ፦ ይሄ ያንቺ ቦርሳ ነው?" } },
  { word: "ኳስ", form: "yourM", ask: { en: "Ask Gugu (a boy): is this YOUR ball?", am: "ጉጉን ጠይቁ፦ ይሄ ያንተ ኳስ ነው?" } },
  { word: "ቤት", form: "her", ask: { en: "This is Tsehay's house: HER house.", am: "ይሄ የፀሐይ ቤት ነው፦ የእሷ ቤት።" } },
  { word: "ደብተር", form: "his", ask: { en: "This is Anbessa's notebook: HIS notebook.", am: "ይሄ የአንበሳ ደብተር ነው፦ የእሱ ደብተር።" } },
  { word: "ዶሮ", form: "many", ask: { en: "Grandma has lots of hens. Make the word for many.", am: "አያቴ ብዙ ዶሮዎች አሏት። «ብዙ» የሚለውን ቃል ሥሩ።" } },
  { word: "ሎሚ", form: "many", ask: { en: "The list says many lemons. Make it!", am: "ዝርዝሩ ብዙ ሎሚ ይላል። ሥሩት!" } },
];

const COPY = {
  title: { en: "The word machine", am: "የቃላት ማሽን" } satisfies T,
  howTo: { en: "Read what to make. Pull the right lever to change the ending.", am: "ምን እንደምትሠሩ አንብቡ። መጨረሻውን ለመቀየር ትክክለኛውን መዘውር ጎትቱ።" } satisfies T,
  made: { en: "You made", am: "የሠራችሁት" } satisfies T,
  tryOther: { en: "That's a real word too, but not the one we need. Try another lever!", am: "ይሄም እውነተኛ ቃል ነው፤ ግን የምንፈልገው አይደለም። ሌላ መዘውር ሞክሩ!" } satisfies T,
  ending: { en: "Eight words made! A little ending changes a lot.", am: "ስምንት ቃላት ተሠሩ! ትንሽ መጨረሻ ብዙ ይቀይራል።" } satisfies T,
};

export default function WordMachine({ lang, onDone }: DemoProps) {
  const [t, setT] = useState(0);
  const [made, setMade] = useState<Form | null>(null);
  const [ok, setOk] = useState(false);
  const [got, setGot] = useState(0);
  const later = useLater();
  const task = TASKS[t];
  const word = WORDS[task.word];
  const done = got === TASKS.length;

  const pull = (f: Form) => {
    if (ok) return;
    setMade(f);
    const [a, b] = word.f[f];
    later(() => say(a + b), 350);
    if (f === task.form) {
      setOk(true);
      sfx.good();
      later(() => {
        setGot((g) => g + 1);
        if (t + 1 < TASKS.length) {
          setT(t + 1);
          setMade(null);
          setOk(false);
        }
      }, 2000);
    } else {
      sfx.oops();
    }
  };

  const out = made ? word.f[made] : null;

  return (
    <Frame lang={lang} title={COPY.title} howTo={COPY.howTo} total={TASKS.length} got={got} done={done} onDone={onDone} ending={<p className="text-base">{COPY.ending[lang]}</p>}>
      <div className="mx-auto flex max-w-[420px] flex-col">
        <motion.p key={`ask${t}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-3 rounded-2xl bg-[#FFF1C2] px-3 py-2 text-center text-[18px] font-bold" style={lang === "am" ? FIDEL : undefined}>
          {task.ask[lang]}
        </motion.p>
        <div className="relative rounded-[28px] bg-[#5A6A7A] p-3 shadow-[0_6px_0_#3A4A5A]">
          <div className="flex items-center justify-between gap-2">
            <motion.div key={`in${t}`} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2">
              <Pic id={word.pic} size={44} />
              <span className="text-[30px] font-bold" style={FIDEL}>
                {task.word}
              </span>
            </motion.div>
            <motion.span animate={{ rotate: made ? 360 : 0 }} transition={{ duration: 0.6 }} className="text-3xl text-[#FFD233]" key={`gear${made}${t}`}>
              ⚙
            </motion.span>
            <div className="flex min-h-[64px] min-w-[120px] items-center justify-center rounded-2xl bg-[#2A3A4A] px-3 py-2">
              {out && (
                <motion.span key={`out${made}${t}`} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[30px] font-bold" style={FIDEL} data-out="">
                  <span className="text-white">{out[0]}</span>
                  <span style={{ color: made ? (made === "her" || made === "yourF" ? "#FFB0D0" : made === "his" ? "#9FE0A8" : made === "yourM" ? "#9CC0FF" : "#FFB27A") : undefined }}>{out[1]}</span>
                </motion.span>
              )}
            </div>
          </div>
          {made && !ok && <p className="mt-2 text-center text-sm text-white">{COPY.tryOther[lang]}</p>}
          {ok && lang === "en" && <p className="mt-2 text-center text-sm text-white">{LEVER[task.form].en} {word.en}</p>}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {FORMS.map((f) => (
            <motion.button
              key={f}
              type="button"
              data-lever={f}
              onClick={() => pull(f)}
              whileTap={{ y: 6 }}
              className="flex flex-col items-center rounded-2xl bg-white px-1 py-2 shadow-[0_4px_0_#00000018]"
              style={{ borderTop: `6px solid ${COLORS[f]}` }}
            >
              <span className="text-[18px] font-bold" style={{ ...FIDEL, color: COLORS[f] }}>
                {LEVER[f].am}
              </span>
              {lang === "en" && <span className="text-xs text-[#5B4636]">{LEVER[f].en}</span>}
            </motion.button>
          ))}
        </div>
      </div>
    </Frame>
  );
}
