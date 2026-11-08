"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DemoProps } from "../../types";
import { DemoShell, shakeAnim, sound, useRounds, useShake, type L } from "./ui";

/*
  "Pay at the market" (money, level 5). Each round has something to buy and its price. The
  child taps coins from the purse (one-birr coins and fifty-santim coins) onto the counter;
  the counter shows how much is there in birr and santim as they go (two fifty-santim coins
  make one birr). Tap a coin on the counter to take it back. Press "Pay" when it is exactly
  right. Prices: 3 birr, 1 birr 50 santim, 5 birr, 2 birr 50 santim.
*/

type Coin = "birr" | "s50";
const VALUE: Record<Coin, number> = { birr: 100, s50: 50 };
const ROUNDS: { item: L; emoji: string; price: number }[] = [
  { item: { en: "a cup of kolo", am: "አንድ ኩባያ ቆሎ" }, emoji: "🥣", price: 300 },
  { item: { en: "a banana", am: "አንድ ሙዝ" }, emoji: "🍌", price: 150 },
  { item: { en: "a mango", am: "አንድ ማንጎ" }, emoji: "🥭", price: 500 },
  { item: { en: "a bag of oranges", am: "አንድ ከረጢት ብርቱካን" }, emoji: "🍊", price: 250 },
];

const T = {
  title: { en: "Pay at the market", am: "በገበያ ክፈሉ" },
  buy: { en: "Buy {item}. It costs {price}.", am: "{item} ግዙ። ዋጋው {price} ነው።" },
  purse: { en: "Your purse: tap a coin to put it on the counter.", am: "ቦርሳችሁ፦ ሳንቲም ነክታችሁ ጠረጴዛው ላይ አስቀምጡ።" },
  counter: { en: "On the counter:", am: "ጠረጴዛው ላይ፦" },
  pay: { en: "Pay", am: "ክፈሉ" },
  tooMuch: { en: "That is too much. Take a coin back.", am: "ይሄ ይበዛል። አንድ ሳንቲም መልሱ።" },
  tooLittle: { en: "Not enough yet. Add a coin.", am: "ገና አይበቃም። ሳንቲም ጨምሩ።" },
  summary: { en: "One birr is a hundred santim; two fifty-santim coins make one birr. Count the coins, then pay!", am: "አንድ ብር መቶ ሳንቲም ነው፤ ሁለት ባለ ሃምሳ ሳንቲሞች አንድ ብር ይሆናሉ። ሳንቲሞቹን ቁጠሩ፣ ከዚያ ክፈሉ!" },
} satisfies Record<string, L>;

/** Money as words: "2 birr 50 santim". */
function money(santim: number, lang: "en" | "am") {
  const b = Math.floor(santim / 100);
  const s = santim % 100;
  const birr = lang === "am" ? "ብር" : "birr";
  const sant = lang === "am" ? "ሳንቲም" : "santim";
  if (!b) return `${s} ${sant}`;
  return s ? `${b} ${birr} ${s} ${sant}` : `${b} ${birr}`;
}

function CoinView({ kind, size = 46 }: { kind: Coin; size?: number }) {
  const birr = kind === "birr";
  return (
    <svg width={size} height={size} viewBox="-15 -15 30 30" aria-hidden>
      <circle r={14} fill={birr ? "#B8902A" : "#9A9A9A"} />
      <circle r={12} fill={birr ? "#E8C15A" : "#D9D9D9"} />
      <text y={birr ? 5 : 3.6} fontSize={birr ? 14 : 10} fontWeight={900} fill="#5A3A10" textAnchor="middle" fontFamily="var(--font-grandstander)">
        {birr ? "1" : "50"}
      </text>
    </svg>
  );
}

export default function CoinShop({ lang, onDone }: DemoProps) {
  const { round, cheer, finished, win, again } = useRounds(ROUNDS.length, onDone);
  const r = ROUNDS[round];
  const [tray, setTray] = useState<Coin[]>([]);
  const [msg, setMsg] = useState<"" | "tooMuch" | "tooLittle">("");
  const [seen, setSeen] = useState(round);
  const [shake, nudge] = useShake();
  if (seen !== round) {
    setSeen(round);
    setTray([]);
    setMsg("");
  }
  const total = tray.reduce((s, c) => s + VALUE[c], 0);

  const put = (c: Coin) => {
    if (tray.length >= 10) return;
    sound("chime");
    setMsg("");
    setTray((t) => [...t, c]);
  };
  const back = (i: number) => {
    sound("pop");
    setMsg("");
    setTray((t) => t.filter((_, k) => k !== i));
  };
  const pay = () => {
    if (total === r.price) win();
    else {
      nudge();
      setMsg(total > r.price ? "tooMuch" : "tooLittle");
    }
  };

  return (
    <DemoShell
      lang={lang}
      title={T.title}
      round={round}
      rounds={ROUNDS.length}
      cheer={cheer}
      finished={finished}
      summary={T.summary[lang]}
      onAgain={again}
      task={
        <span>
          <span className="mr-1 text-3xl" aria-hidden>
            {r.emoji}
          </span>
          {T.buy[lang].replace("{item}", r.item[lang]).replace("{price}", money(r.price, lang))}
          {msg && <span className="block text-sm text-coral">{T[msg][lang]}</span>}
        </span>
      }
    >
      <motion.div className="rounded-3xl border-4 border-[#8A5A36] bg-[#C99A64] p-3" animate={shakeAnim(shake)}>
        <p className="text-sm font-bold text-white">{T.counter[lang]}</p>
        <div className="mt-1 flex min-h-[60px] flex-wrap items-center gap-1">
          <AnimatePresence>
            {tray.map((c, i) => (
              <motion.button key={`${round}-${i}-${c}`} type="button" onClick={() => back(i)} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} aria-label={c === "birr" ? "1 birr" : "50 santim"}>
                <CoinView kind={c} size={40} />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-1 text-right font-display text-2xl font-black text-white" aria-live="polite">
          {total ? money(total, lang) : "0"}
        </p>
      </motion.div>
      <p className="mt-3 text-sm font-bold text-muted">{T.purse[lang]}</p>
      <div className="mt-1 flex items-center justify-center gap-4">
        <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => put("birr")} className="flex flex-col items-center rounded-2xl bg-white p-2 shadow" aria-label={lang === "am" ? "1 ብር" : "1 birr"} data-coin="birr">
          <CoinView kind="birr" size={56} />
          <span className="text-xs font-bold text-muted">{lang === "am" ? "1 ብር" : "1 birr"}</span>
        </motion.button>
        <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => put("s50")} className="flex flex-col items-center rounded-2xl bg-white p-2 shadow" aria-label={lang === "am" ? "50 ሳንቲም" : "50 santim"} data-coin="s50">
          <CoinView kind="s50" size={48} />
          <span className="text-xs font-bold text-muted">{lang === "am" ? "50 ሳንቲም" : "50 santim"}</span>
        </motion.button>
        <button type="button" className="btn btn-primary" onClick={pay}>
          {T.pay[lang]}
        </button>
      </div>
    </DemoShell>
  );
}
