"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { ANDIKA, Frame, Note, Pic, say, sfx, shuffled, t } from "./kit";

/*
  "The Vowel Team Sorter" (level 2): one word card at a time (tree, with its picture). The child
  reads it and taps the basket of its vowel team: ee, ai or oa. The card flies into the basket,
  the voice says the word, and the basket shows the words collected so far. Nine words.
  AMHARIC: first draft, to be checked by a native-speaking editor.
*/

type Team = "ee" | "ai" | "oa";
type W = { word: string; team: Team; pic: string };
const WORDS: W[] = [
  { word: "tree", team: "ee", pic: "tree" },
  { word: "rain", team: "ai", pic: "rain" },
  { word: "boat", team: "oa", pic: "boat" },
  { word: "sheep", team: "ee", pic: "sheep" },
  { word: "snail", team: "ai", pic: "snail" },
  { word: "goat", team: "oa", pic: "goat" },
  { word: "train", team: "ai", pic: "train" },
  { word: "soap", team: "oa", pic: "soap" },
  { word: "bee", team: "ee", pic: "bee" },
];
const TEAMS: { team: Team; color: string; en: string; am: string }[] = [
  { team: "ee", color: "#2E9A5B", en: "says ee", am: "«ኢ» ይላል" },
  { team: "ai", color: "#D9662B", en: "says ay", am: "«ኤይ» ይላል" },
  { team: "oa", color: "#2F6FD0", en: "says oh", am: "«ኦው» ይላል" },
];

export default function VowelTeamSorter({ lang, onDone }: DemoProps) {
  const order = useMemo(() => shuffled(WORDS, 0.37), []);
  const [i, setI] = useState(0);
  const [hit, setHit] = useState<Team | null>(null);
  const [wrong, setWrong] = useState<Team | null>(null);
  const done = i >= order.length;
  const w = order[Math.min(i, order.length - 1)];
  const sorted = order.slice(0, i + (hit ? 1 : 0));
  const k = w.word.indexOf(w.team);

  const pick = (team: Team) => {
    if (hit) return;
    if (team === w.team) {
      sfx.good();
      say(w.word, 0.8);
      setHit(team);
      setWrong(null);
      setTimeout(() => {
        setHit(null);
        setI((n) => n + 1);
      }, 1300);
    } else {
      sfx.oops();
      setWrong(team);
    }
  };

  return (
    <Frame
      lang={lang}
      title={{ en: "The Vowel Team Sorter", am: "የአናባቢ ቡድኖች መለያ" }}
      howTo={{ en: "Read the word. Which vowel team is in it? Tap its basket.", am: "ቃሉን አንብቡ። በውስጡ ያለው የትኛው የአናባቢ ቡድን ነው? ቅርጫቱን ንኩ።" }}
      total={order.length}
      got={sorted.length}
      done={done}
      onDone={onDone}
      color="#2E9A5B"
      onAgain={() => {
        setI(0);
        setWrong(null);
      }}
      ending={
        <div className="grid grid-cols-3 gap-2" lang="en">
          {TEAMS.map((x) => (
            <div key={x.team} className="rounded-2xl p-2" style={{ background: `${x.color}1A` }}>
              <p className="text-2xl font-bold" style={{ ...ANDIKA, color: x.color }}>
                {x.team}
              </p>
              {WORDS.filter((y) => y.team === x.team).map((y) => (
                <p key={y.word} className="text-lg font-bold" style={ANDIKA}>
                  {y.word}
                </p>
              ))}
            </div>
          ))}
        </div>
      }
    >
      <div className="flex min-h-[150px] items-center justify-center">
        <motion.div
          key={`${i}-${w.word}`}
          initial={{ y: -30, opacity: 0 }}
          animate={hit ? { y: 120, scale: 0.4, opacity: 0 } : wrong ? { x: [0, -8, 8, -4, 0], opacity: 1 } : { y: 0, opacity: 1 }}
          transition={{ duration: hit ? 0.7 : 0.4 }}
          className="flex flex-col items-center rounded-3xl border-4 bg-white px-6 py-2 shadow-[0_6px_0_#00000018]"
          style={{ borderColor: "#E3D5C3" }}
          lang="en"
          data-word={w.word}
        >
          <Pic id={w.pic} size={80} />
          <span className="text-4xl font-bold" style={ANDIKA}>
            {w.word.slice(0, k)}
            <span style={{ textDecoration: "underline" }}>{w.word.slice(k, k + 2)}</span>
            {w.word.slice(k + 2)}
          </span>
        </motion.div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {TEAMS.map((x) => (
          <motion.button
            key={x.team}
            type="button"
            data-choice={x.team === w.team ? "right" : "wrong"}
            onClick={() => pick(x.team)}
            animate={hit === x.team ? { scale: [1, 1.1, 1] } : wrong === x.team ? { x: [0, -6, 6, 0] } : {}}
            className="flex min-h-[132px] flex-col items-center rounded-b-[36px] rounded-t-xl border-4 bg-white p-2 shadow-[0_5px_0_#00000018]"
            style={{ borderColor: x.color }}
          >
            <span className="text-4xl font-bold" style={{ ...ANDIKA, color: x.color }} lang="en">
              {x.team}
            </span>
            <span className="text-sm text-[#5B4636]">{x[lang]}</span>
            <span className="mt-1 flex flex-wrap justify-center gap-0.5">
              {sorted
                .filter((y) => y.team === x.team)
                .map((y) => (
                  <Pic key={y.word} id={y.pic} size={26} />
                ))}
            </span>
          </motion.button>
        ))}
      </div>

      {hit ? (
        <Note tone="good">
          <span lang="en" style={ANDIKA} className="font-bold">
            {w.word}
          </span>
          {t(lang, { en: ` has ${w.team}!`, am: ` ${w.team} አለበት!` })}
        </Note>
      ) : wrong ? (
        <Note tone="try">{t(lang, { en: `Look again: is ${wrong} in "${w.word}"?`, am: `እንደገና ተመልከቱ፦ በ«${w.word}» ውስጥ ${wrong} አለ?` })}</Note>
      ) : (
        <Note tone="plain">{t(lang, { en: "Two vowels together make one long sound.", am: "ሁለት አናባቢዎች አብረው አንድ ረጅም ድምፅ ይሠራሉ።" })}</Note>
      )}
    </Frame>
  );
}
