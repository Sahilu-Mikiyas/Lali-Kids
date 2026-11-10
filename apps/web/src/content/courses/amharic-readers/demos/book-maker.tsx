"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

import type { DemoProps } from "../../types";
import { FIDEL, Frame, Pic, say, sfx, shuffled, useLater, type T } from "./shared/kit";

/*
  Level 6, "Make a mini book" (after "Our Mini Books"): choose what your book is about (your cat
  or your goat). Then three pages: each has a picture and two sentences; pick the one that is
  right for the page: it matches the picture, it has its mark at the end, and the doing-word is
  last. The last page says ተፈጸመ (the end). Then the finished book is shown, page by page.
  Five stars (cover, three pages, the end), then onDone. Amharic is a first draft.
*/

type Page = { pic: string; right: string; wrong: string; en: string; why: T };
const BOOKS: { title: string; en: string; pic: string; color: string; pages: Page[] }[] = [
  {
    title: "ድመቴ",
    en: "My Cat",
    pic: "cat",
    color: "#8A4FB0",
    pages: [
      { pic: "cat", right: "ድመቴ ትንሽ ናት።", wrong: "ድመቴ ትንሽ ናት", en: "My cat is small.", why: { en: "A sentence needs its mark at the end.", am: "ዓረፍተ ነገር መጨረሻ ላይ ምልክት ያስፈልገዋል።" } },
      { pic: "milk", right: "ድመቴ ወተት ትጠጣለች።", wrong: "ድመቴ ዳቦ ትበላለች።", en: "My cat drinks milk.", why: { en: "Look at the picture!", am: "ሥዕሉን ተመልከቱ!" } },
      { pic: "ball", right: "ድመቴ በኳስ ትጫወታለች!", wrong: "ትጫወታለች በኳስ ድመቴ!", en: "My cat plays with a ball!", why: { en: "The doing-word goes at the end.", am: "ድርጊቱ መጨረሻ ላይ ይገባል።" } },
    ],
  },
  {
    title: "ፍየሌ",
    en: "My Goat",
    pic: "goat",
    color: "#2E9A5B",
    pages: [
      { pic: "goat", right: "ፍየሌ ነጭ ናት።", wrong: "ፍየሌ ነጭ ናት", en: "My goat is white.", why: { en: "A sentence needs its mark at the end.", am: "ዓረፍተ ነገር መጨረሻ ላይ ምልክት ያስፈልገዋል።" } },
      { pic: "grass", right: "ፍየሌ ሣር ትበላለች።", wrong: "ፍየሌ ዓሣ ትበላለች።", en: "My goat eats grass.", why: { en: "Look at the picture!", am: "ሥዕሉን ተመልከቱ!" } },
      { pic: "bell", right: "ፍየሌ ቃጭል አላት!", wrong: "አላት ቃጭል ፍየሌ!", en: "My goat has a bell!", why: { en: "The doing-word goes at the end.", am: "ድርጊቱ መጨረሻ ላይ ይገባል።" } },
    ],
  },
];

const END = { right: "ተፈጸመ።", wrong: "ለውድ አያቴ፣" };

const COPY = {
  title: { en: "Make a mini book", am: "ትንሽ መጽሐፍ ሥሩ" } satisfies T,
  howTo: { en: "Choose your book. On each page, pick the sentence that is right.", am: "መጽሐፋችሁን ምረጡ። በእያንዳንዱ ገጽ ትክክለኛውን ዓረፍተ ነገር ምረጡ።" } satisfies T,
  choose: { en: "What is your book about?", am: "መጽሐፋችሁ ስለ ምንድን ነው?" } satisfies T,
  author: { en: "Author: me", am: "ደራሲ፦ እኔ" } satisfies T,
  page: { en: "Page", am: "ገጽ" } satisfies T,
  last: { en: "The last page:", am: "የመጨረሻው ገጽ፦" } satisfies T,
  ending: { en: "Your own mini book: a cover, three pages and ተፈጸመ!", am: "የራሳችሁ ትንሽ መጽሐፍ፦ ሽፋን፣ ሦስት ገጾችና ተፈጸመ!" } satisfies T,
};

export default function BookMaker({ lang, onDone }: DemoProps) {
  const [b, setB] = useState<number | null>(null);
  const [p, setP] = useState(0);
  const [ok, setOk] = useState(false);
  const [why, setWhy] = useState<T | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [got, setGot] = useState(0);
  const later = useLater();
  const book = b === null ? null : BOOKS[b];
  const isEnd = book !== null && p === book.pages.length;
  const page = book && !isEnd ? book.pages[p] : null;
  const options = useMemo(() => (page ? shuffled([page.right, page.wrong], p * 0.31 + 0.52) : shuffled([END.right, END.wrong], 0.44)), [page, p]);
  const done = got === 5;

  const chooseBook = (i: number) => {
    sfx.good();
    say(BOOKS[i].title);
    setB(i);
    setGot(1);
  };

  const pick = (s: string) => {
    if (!book || ok) return;
    const right = page ? page.right : END.right;
    if (s === right) {
      setOk(true);
      setWhy(null);
      sfx.good();
      say(s);
      later(() => {
        setGot((g) => g + 1);
        setOk(false);
        if (isEnd) {
          say(`${book.title}። ${book.pages.map((x) => x.right).join(" ")} ${END.right}`);
        } else setP(p + 1);
      }, 1500);
    } else {
      sfx.oops();
      setWrong(s);
      setWhy(page ? page.why : { en: "That is how a letter starts, not how a book ends.", am: "ይህ ደብዳቤ የሚጀምርበት ነው፤ መጽሐፍ የሚያልቅበት አይደለም።" });
      later(() => setWrong(null), 600);
    }
  };

  return (
    <Frame
      lang={lang}
      title={COPY.title}
      howTo={COPY.howTo}
      total={5}
      got={got}
      done={done}
      onDone={onDone}
      ending={
        book && (
          <div>
            <div className="mx-auto mb-3 flex max-w-[360px] flex-wrap justify-center gap-2">
              {book.pages.map((x, i) => (
                <div key={i} className="flex w-[104px] flex-col items-center rounded-lg border-2 bg-[#FFFDF6] p-1" style={{ borderColor: book.color }}>
                  <Pic id={x.pic} size={44} />
                  <span className="text-[12px] leading-snug" style={FIDEL}>
                    {x.right}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-base">{COPY.ending[lang]}</p>
          </div>
        )
      }
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center">
        {!book ? (
          <>
            <p className="text-base font-bold text-[#5B4636]" style={lang === "am" ? FIDEL : undefined}>
              {COPY.choose[lang]}
            </p>
            <div className="mt-3 grid w-full grid-cols-2 gap-3">
              {BOOKS.map((x, i) => (
                <button key={i} type="button" data-book={i} onClick={() => chooseBook(i)} className="flex flex-col items-center rounded-r-2xl rounded-l-md border-l-[10px] bg-white px-2 py-3 shadow-[0_4px_0_#00000018]" style={{ borderColor: x.color }}>
                  <Pic id={x.pic} size={72} />
                  <span className="text-[24px] font-bold" style={{ ...FIDEL, color: x.color }}>
                    {x.title}
                  </span>
                  {lang === "en" && <span className="text-xs text-[#7A6A5A]">{x.en}</span>}
                  <span className="text-[11px] text-[#7A6A5A]" style={lang === "am" ? FIDEL : undefined}>
                    {COPY.author[lang]}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm font-bold" style={{ ...(lang === "am" ? FIDEL : {}), color: book.color }}>
              <span style={FIDEL}>{book.title}</span> · {isEnd ? COPY.last[lang] : `${COPY.page[lang]} ${p + 1}`}
            </p>
            <motion.div key={p} initial={{ rotateY: -40, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} className="mt-2 flex min-h-[120px] w-full flex-col items-center justify-center rounded-md border-2 bg-[#FFFDF6] p-2" style={{ borderColor: book.color }}>
              {page ? <Pic id={page.pic} size={84} /> : <span className="text-[30px] font-bold" style={{ ...FIDEL, color: book.color }}>{ok ? END.right : "…"}</span>}
              {page && ok && (
                <span className="text-[20px] font-bold" style={FIDEL}>
                  {page.right}
                </span>
              )}
              {lang === "en" && page && ok && <span className="text-xs text-[#7A6A5A]">{page.en}</span>}
            </motion.div>
            <div className="mt-3 grid w-full grid-cols-1 gap-2">
              {options.map((s) => (
                <motion.button
                  key={`${p}-${s}`}
                  type="button"
                  data-sentence={page ? (s === page.right ? "right" : "wrong") : s === END.right ? "right" : "wrong"}
                  onClick={() => pick(s)}
                  animate={wrong === s ? { x: [0, -8, 8, -6, 0] } : {}}
                  className="rounded-2xl bg-white px-3 py-2 text-[20px] font-bold shadow-[0_4px_0_#00000018]"
                  style={FIDEL}
                >
                  {s}
                </motion.button>
              ))}
            </div>
            <p className="mt-2 min-h-[24px] text-center text-sm text-[#C2410C]" style={lang === "am" ? FIDEL : undefined}>
              {why ? why[lang] : ""}
            </p>
          </>
        )}
      </div>
    </Frame>
  );
}
