import type { ReactNode } from "react";

import { BeeShape } from "@/components/characters";
import { Sticker } from "@/components/stickers/sticker";
import type { Lang, Story } from "@/content/stories";
import type { Dict } from "@/i18n/dict";
import type { WordSearch, Recall } from "@/lib/activities";
import { countingRows, fidelFamily, geez, hashSeed, seeded, storyEnglish, storyFidel, storyNumbers, storyWords } from "@/lib/activities";
import { storyStickerId } from "@/lib/stickers/catalog";
import { COLOUR_THING, Icon, iconFor } from "./icons";

/*
  The printable sheets. Each is an A4 page (210 × 297 mm) on paper; on screen it keeps the same
  shape and scales to the width, because every size inside is in em of a font that follows the
  sheet's width (see .print-sheet in globals.css).
*/

const ethiopicFont = { fontFamily: "var(--font-noto-ethiopic), 'Nyala', serif" };
const latinFont = { fontFamily: "var(--font-andika), system-ui, sans-serif" };

/** One A4 sheet with Lali's mark, a title, and a line for the child's name. */
export function Sheet({ id, title, sub, t, lang, children, name = true }: { id: string; title: string; sub?: string; t: Dict; lang: Lang; children: ReactNode; name?: boolean }) {
  return (
    <section className="print-sheet" id={id} data-sheet={id}>
      <div className={`print-sheet-inner ${lang === "am" ? "font-ethiopic" : ""}`}>
        <header className="flex items-start gap-[0.8em] border-b-[0.12em] border-black pb-[0.6em]">
          <svg viewBox="0 0 40 40" className="h-[2.6em] w-[2.6em] shrink-0" aria-hidden>
            <BeeShape />
          </svg>
          <div className="min-w-0 flex-1">
            <h2 className={`text-[1.7em] font-black leading-tight ${lang === "am" ? "" : "font-display"}`}>{title}</h2>
            {sub && <p className="mt-[0.15em] text-[0.95em] leading-snug">{sub}</p>}
          </div>
          {name && (
            <p className="mt-[0.4em] w-[13em] shrink-0 text-[0.95em] font-bold">
              {t.activities.nameLine}: <span className="inline-block w-[8.5em] border-b-[0.1em] border-black" />
            </p>
          )}
        </header>
        <div className="sheet-body mt-[1em] flex flex-1 flex-col">{children}</div>
        <footer className="mt-auto flex justify-between pt-[0.6em] text-[0.7em] text-black/60">
          <span>Lali · ላሊ</span>
          <span>lali.et</span>
        </footer>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- word search

export function WordSearchGrid({ ws, lang, cell, answers = false }: { ws: WordSearch; lang: Lang; cell: number; answers?: boolean }) {
  const on = new Set(answers ? ws.words.flatMap((w) => w.cells.map(([r, c]) => `${r},${c}`)) : []);
  return (
    <div
      className="grid w-fit border-[0.12em] border-black"
      style={{ gridTemplateColumns: `repeat(${ws.size}, ${cell}em)`, ...(lang === "am" ? ethiopicFont : latinFont) }}
      data-word-grid={lang}
      data-answers={answers || undefined}
    >
      {ws.grid.flatMap((row, r) =>
        row.map((ch, c) => (
          <span
            key={`${r}-${c}`}
            className={`grid place-items-center border-[0.04em] border-black/25 font-bold ${on.has(`${r},${c}`) ? "ws-answer" : ""}`}
            style={{ height: `${cell}em`, lineHeight: 1 }}
          >
            <span style={{ fontSize: `${cell * (lang === "am" ? 0.5 : 0.55)}em` }}>{ch}</span>
          </span>
        )),
      )}
    </div>
  );
}

export function WordSearchSheet({ ws, lang, title, t, uiLang }: { ws: WordSearch; lang: Lang; title: string; t: Dict; uiLang: Lang }) {
  const cell = lang === "am" ? 4.2 : 3.4;
  return (
    <Sheet id={`words-${lang}`} title={title} sub={t.activities.wordSearchSub} t={t} lang={uiLang}>
      <div className="flex flex-1 flex-col items-center gap-[1.4em]">
        <div style={{ fontSize: "1em" }}>
          <WordSearchGrid ws={ws} lang={lang} cell={cell} />
        </div>
        <ul className="grid w-full grid-cols-3 gap-x-[1em] gap-y-[0.5em]" style={lang === "am" ? ethiopicFont : latinFont}>
          {ws.words.map((w) => (
            <li key={w.word} className="flex items-center gap-[0.5em] text-[1.35em] font-bold">
              <span className="inline-block h-[0.8em] w-[0.8em] shrink-0 rounded-[0.15em] border-[0.1em] border-black" />
              {w.word}
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}

export function AnswerKeySheet({ ws, t, uiLang }: { ws: Record<Lang, WordSearch>; t: Dict; uiLang: Lang }) {
  return (
    <Sheet id="answers" title={t.activities.answers} sub={t.activities.answersSub} t={t} lang={uiLang} name={false}>
      <div className="flex flex-col items-center gap-[2em]">
        <div className="space-y-[0.5em]">
          <p className="font-bold">{t.activities.wordSearch} · English</p>
          <WordSearchGrid ws={ws.en} lang="en" cell={2.3} answers />
        </div>
        <div className="space-y-[0.5em]">
          <p className="font-bold">{t.activities.wordSearch} · አማርኛ</p>
          <WordSearchGrid ws={ws.am} lang="am" cell={2.9} answers />
        </div>
      </div>
    </Sheet>
  );
}

// ---------------------------------------------------------------- tracing

/** A letter, number or word drawn with a dotted outline, ready to trace. */
function Dotted({ text, font, size = 74, w = 100, h = 100, y = 76 }: { text: string; font: "ethiopic" | "latin"; size?: number; w?: number; h?: number; y?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-full w-full" aria-hidden>
      <line x1={0} x2={w} y1={y} y2={y} stroke="#000" strokeWidth={0.6} opacity={0.5} />
      <line x1={0} x2={w} y1={y - size * 0.42} y2={y - size * 0.42} stroke="#000" strokeWidth={0.5} strokeDasharray="2 3" opacity={0.35} />
      <text
        x={w / 2}
        y={y}
        textAnchor="middle"
        fontSize={size}
        fill="none"
        stroke="#000"
        strokeWidth={1.3}
        strokeDasharray="2.2 2.8"
        strokeLinecap="round"
        style={font === "ethiopic" ? ethiopicFont : latinFont}
      >
        {text}
      </text>
    </svg>
  );
}

/** A box with handwriting lines (a base line and a dotted middle line). */
function WriteBox({ className = "" }: { className?: string }) {
  return (
    <div className={`relative rounded-[0.4em] border-[0.08em] border-black/50 ${className}`}>
      <span className="absolute inset-x-[0.3em] top-[45%] border-t-[0.06em] border-dashed border-black/40" />
      <span className="absolute inset-x-[0.3em] top-[76%] border-t-[0.08em] border-black/70" />
    </div>
  );
}

export function FidelSheet({ story, t, lang }: { story: Story; t: Dict; lang: Lang }) {
  const families = storyFidel(story).slice(0, 3);
  return (
    <Sheet id="fidel" title={t.activities.fidel} sub={t.activities.fidelSub} t={t} lang={lang}>
      <div className="flex flex-col gap-[1.3em]">
        {families.map((base) => {
          const forms = fidelFamily(base);
          return (
            <div key={base} className="space-y-[0.4em]" data-fidel-family={base}>
              <p className="flex items-center gap-[0.5em] text-[1.1em] font-bold">
                <span className="grid h-[1.8em] w-[1.8em] place-items-center rounded-full border-[0.1em] border-black text-[1.2em]" style={ethiopicFont}>
                  {base}
                </span>
                {t.activities.family(base)}
              </p>
              <div className="grid grid-cols-7 gap-[0.35em]">
                {forms.map((f) => (
                  <div key={f} className="aspect-square rounded-[0.4em] border-[0.08em] border-black/50">
                    <Dotted text={f} font="ethiopic" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-[0.35em]">
                {forms.map((f) => (
                  <WriteBox key={f} className="aspect-square" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}

// ---------------------------------------------------------------- numbers

/** The thing to count in a story: its sheep, stars or flowers, or stars. */
function countThing(story: Story): string {
  for (const w of storyWords(story, "en", 30)) {
    const icon = iconFor(w);
    if (icon && !["house", "book", "car", "train", "cup"].includes(icon)) return icon;
  }
  return "star";
}

export function NumbersSheets({ story, t, lang }: { story: Story; t: Dict; lang: Lang }) {
  const rows = countingRows(story);
  const thing = countThing(story);
  const nums = storyNumbers(story);
  const rnd = seeded(hashSeed(`${story.id}:draw`));
  const small = [...new Set(nums.filter((n) => n <= 6))];
  const pool = small.length >= 2 ? small : [2, 3, 4, 5];
  const first = pool[Math.floor(rnd() * pool.length)];
  const rest = pool.filter((n) => n !== first);
  const draw = [first, rest[Math.floor(rnd() * rest.length)]];
  return (
    <>
      <Sheet id="numbers" title={t.activities.numbers} sub={t.activities.numbersSub} t={t} lang={lang}>
        <p className="mb-[0.5em] text-[1.15em] font-black">{t.activities.countThem}</p>
        <div className="flex flex-col gap-[0.7em]">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-[1em] rounded-[0.6em] border-[0.08em] border-black/50 p-[0.5em]" data-count-row={row.n}>
              <div className="flex min-w-0 flex-1 flex-wrap gap-[0.25em]">
                {Array.from({ length: row.n }, (_, k) => (
                  <Icon key={k} name={thing} size="3.6em" />
                ))}
              </div>
              <div className="flex shrink-0 gap-[0.5em]">
                {row.choices.map((c) => (
                  <span key={c} className="grid h-[3.3em] w-[3.3em] place-items-center rounded-full border-[0.1em] border-black text-center leading-none">
                    <span className="text-[1.5em] font-black" style={latinFont}>
                      {c}
                    </span>
                    <span className="text-[1.35em]" style={ethiopicFont}>
                      {geez(c)}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[1.2em] grid flex-1 grid-cols-2 gap-[1em]">
          {draw.map((n, i) => (
            <div key={i} className="flex min-h-[14em] flex-col rounded-[0.8em] border-[0.12em] border-black p-[0.6em]">
              <p className="text-[1.15em] font-black">
                {t.activities.drawN(n)} <span style={ethiopicFont}>({geez(n)})</span>
              </p>
              <div className="mt-[0.4em] flex items-center gap-[0.3em] opacity-70">
                <Icon name={thing} size="2em" />
              </div>
            </div>
          ))}
        </div>
      </Sheet>
      <Sheet id="numbers-trace" title={t.activities.traceNumbers} sub={t.activities.traceNumbersSub} t={t} lang={lang}>
        <div className="grid grid-cols-5 gap-[0.6em]">
          {Array.from({ length: 10 }, (_, k) => k + 1).map((n) => (
            <div key={n} className={`rounded-[0.6em] border-[0.08em] p-[0.3em] ${nums.includes(n) ? "border-black" : "border-black/40"}`}>
              <div className="aspect-square">
                <Dotted text={String(n)} font="latin" />
              </div>
              <div className="aspect-square">
                <Dotted text={geez(n)} font="ethiopic" size={66} />
              </div>
              <div className="mt-[0.2em] flex flex-wrap justify-center gap-[0.15em]">
                {Array.from({ length: n }, (_, d) => (
                  <span key={d} className="h-[0.55em] w-[0.55em] rounded-full border-[0.08em] border-black" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[1.2em] grid grid-cols-5 gap-[0.6em]">
          {Array.from({ length: 10 }, (_, k) => (
            <WriteBox key={k} className="aspect-[1/1.2]" />
          ))}
        </div>
      </Sheet>
    </>
  );
}

// ---------------------------------------------------------------- English

export function EnglishSheets({ story, t, lang }: { story: Story; t: Dict; lang: Lang }) {
  const words = storyEnglish(story, 6);
  const colours = words.filter((w) => COLOUR_THING[w]).slice(0, 6);
  // Picture words: the taught words that have a picture, then the story's own words.
  const pictured = [...new Set([...words, ...storyWords(story, "en", 30).map((w) => w.toLowerCase())])]
    .filter((w) => !COLOUR_THING[w] && iconFor(w))
    // One word per picture.
    .filter((w, i, all) => all.findIndex((o) => iconFor(o) === iconFor(w)) === i)
    .slice(0, colours.length ? 4 : 5);
  const rnd = seeded(hashSeed(`${story.id}:match`));
  // The words in another order (rotated, so no word sits next to its own picture).
  const turn = pictured.length > 1 ? 1 + Math.floor(rnd() * (pictured.length - 1)) : 0;
  const shuffled = pictured.map((_, i) => pictured[(i + turn) % pictured.length]);
  return (
    <>
      <Sheet id="english" title={t.activities.english} sub={t.activities.englishSub} t={t} lang={lang}>
        <div className="flex flex-col gap-[0.6em]">
          {words.map((w) => {
            const icon = COLOUR_THING[w] ?? iconFor(w);
            return (
              <div key={w} className="flex items-center gap-[0.8em]" data-trace-word={w}>
                <span className="grid h-[4.4em] w-[4.4em] shrink-0 place-items-center rounded-[0.6em] border-[0.08em] border-black/50">
                  {icon ? <Icon name={icon} size="3.6em" /> : <span className="text-[1.6em] font-black" style={latinFont}>{w[0].toUpperCase()}</span>}
                </span>
                <div className="h-[5.6em] flex-1">
                  <Dotted text={w} font="latin" size={70} w={360} h={100} y={74} />
                </div>
              </div>
            );
          })}
        </div>
      </Sheet>
      {(pictured.length >= 3 || colours.length > 0) && (
        <Sheet id="english-match" title={pictured.length >= 3 ? t.activities.match : t.activities.colourWord} sub={pictured.length >= 3 ? t.activities.matchSub : t.activities.colourWordSub} t={t} lang={lang}>
          {pictured.length >= 3 && (
            <div className="grid grid-cols-[1fr_4em_1fr] items-center gap-y-[0.8em]" data-match="">
              {pictured.map((w, i) => (
                <div key={w} className="contents">
                  <span className="flex items-center justify-start gap-[0.6em]">
                    <span className="grid h-[4.6em] w-[4.6em] place-items-center rounded-[0.6em] border-[0.08em] border-black/50">
                      <Icon name={iconFor(w)!} size="3.8em" />
                    </span>
                    <span className="h-[0.7em] w-[0.7em] rounded-full bg-black" />
                  </span>
                  <span />
                  <span className="flex items-center justify-end gap-[0.6em] text-[1.6em] font-bold" style={latinFont}>
                    <span className="h-[0.45em] w-[0.45em] rounded-full bg-black" />
                    {shuffled[i]}
                  </span>
                </div>
              ))}
            </div>
          )}
          {colours.length > 0 && (
            <div className={pictured.length >= 3 ? "mt-[1.6em]" : ""}>
              {pictured.length >= 3 && (
                <>
                  <p className="text-[1.3em] font-black">{t.activities.colourWord}</p>
                  <p className="mb-[0.6em]">{t.activities.colourWordSub}</p>
                </>
              )}
              <div className="grid grid-cols-3 gap-[0.8em]" data-colour-words="">
                {colours.map((c) => (
                  <div key={c} className="flex flex-col items-center rounded-[0.6em] border-[0.08em] border-black/50 p-[0.4em]">
                    <Icon name={COLOUR_THING[c]} size="5.4em" />
                    <span className="text-[1.4em] font-bold" style={latinFont}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Sheet>
      )}
    </>
  );
}

// ---------------------------------------------------------------- Story Garden

export function GardenSheet({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <Sheet id="garden" title={t.activities.garden} sub={t.activities.gardenSub} t={t} lang={lang}>
      <div className="h-[24em] rounded-[1em] border-[0.15em] border-black" data-draw-box="" />
      <h3 className={`mt-[1.2em] text-[1.4em] font-black ${lang === "am" ? "" : "font-display"}`}>{t.activities.next}</h3>
      <p className="text-[0.95em]">{t.activities.nextSub}</p>
      <div className="mt-[0.5em] h-[15em] rounded-[1em] border-[0.15em] border-dashed border-black" />
      <div className="mt-[0.8em] space-y-[1.6em]">
        <div className="border-b-[0.08em] border-black/70" />
        <div className="border-b-[0.08em] border-black/70" />
      </div>
    </Sheet>
  );
}

// ---------------------------------------------------------------- questions

export function QuestionsSheet({ story, recall, t, lang }: { story: Story; recall: Recall[]; t: Dict; lang: Lang }) {
  const g = story.grownUps;
  return (
    <Sheet id="questions" title={t.activities.questions} t={t} lang={lang}>
      {g && (
        <>
          <h3 className={`text-[1.3em] font-black ${lang === "am" ? "" : "font-display"}`}>{t.activities.talk}</h3>
          <ol className="mt-[0.4em] space-y-[0.5em]">
            {g.talkAbout[lang].map((q, i) => (
              <li key={i} className="flex gap-[0.6em] leading-snug" data-talk="">
                <span className="grid h-[1.6em] w-[1.6em] shrink-0 place-items-center rounded-full border-[0.1em] border-black font-black">{i + 1}</span>
                <span className="pt-[0.1em]">{q}</span>
              </li>
            ))}
          </ol>
        </>
      )}
      <h3 className={`mt-[1.2em] text-[1.3em] font-black ${lang === "am" ? "" : "font-display"}`}>{t.activities.recall}</h3>
      <ol className="mt-[0.4em] space-y-[0.9em]">
        {recall.map((q, i) => (
          <li key={q.key} className="space-y-[0.3em]" data-recall={q.key}>
            <p className="flex gap-[0.6em] font-bold">
              <span className="grid h-[1.6em] w-[1.6em] shrink-0 place-items-center rounded-full bg-black font-black text-white print-keep">{i + 1}</span>
              <span className="pt-[0.1em]">{t.activities[q.key]}</span>
            </p>
            <div className="ml-[2.2em] border-b-[0.08em] border-black/70 pt-[1.3em]" />
            {q.hint[lang] && (
              <p className="ml-[2.2em] text-[0.78em] text-black/65">
                {t.activities.hint}: {q.hint[lang]}
              </p>
            )}
          </li>
        ))}
      </ol>
      {g && (
        <>
          <h3 className={`mt-[1.2em] text-[1.3em] font-black ${lang === "am" ? "" : "font-display"}`}>{t.activities.tryThis}</h3>
          <p className="mt-[0.3em] rounded-[0.6em] border-[0.08em] border-black/50 p-[0.6em] leading-snug">{g.activity[lang]}</p>
        </>
      )}
      <div className="mt-[1.2em] flex min-h-[9em] flex-1 flex-col rounded-[1em] border-[0.12em] border-dashed border-black p-[0.6em]" data-draw-box="">
        <p className="font-bold">{t.activities.drawIt}</p>
      </div>
    </Sheet>
  );
}

// ---------------------------------------------------------------- certificate

export function CertificateSheet({ story, t, lang }: { story: Story; t: Dict; lang: Lang }) {
  return (
    <Sheet id="certificate" title={t.activities.certificate} t={t} lang={lang} name={false}>
      <div className="cert flex flex-1 flex-col items-center justify-center rounded-[1.4em] border-[0.35em] border-double border-black p-[2em] text-center" data-certificate="">
        <div className="flex items-center gap-[0.6em]">
          {[0, 1, 2].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-[2.4em] w-[2.4em]" aria-hidden>
              <path d="M12 1.8l3 6.5 7 .8-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L2 9.1l7-.8z" fill="#FFD54A" stroke="#000" strokeWidth={1.2} strokeLinejoin="round" className="print-colour" />
            </svg>
          ))}
        </div>
        <p className={`mt-[0.3em] text-[4.4em] font-black leading-none ${lang === "am" ? "" : "font-display"}`}>{t.activities.certificate}</p>
        <div className="mt-[1.4em] w-[70%] border-b-[0.12em] border-black pb-[0.2em] text-[0.8em] text-black/60">&nbsp;</div>
        <p className="mt-[0.2em] text-[0.9em] text-black/60">{t.activities.nameLine}</p>
        <p className="mt-[1.2em] text-[1.3em]">{t.activities.certFor}</p>
        <p className={`text-[2em] font-black leading-tight ${lang === "am" ? "font-ethiopic" : "font-display"}`}>{story.title[lang]}</p>
        <div className="print-colour mt-[1.2em]" data-cert-sticker="">
          <Sticker id={storyStickerId(story.id)} color={story.color} size={230} className="mx-auto !h-[14em] !w-[14em]" />
        </div>
        <p className="mt-[0.4em] text-[0.9em] text-black/60">{t.activities.certSticker}</p>
        <div className="mt-[2em] grid w-full grid-cols-2 gap-[2em] text-left text-[0.9em]">
          <p>
            <span className="block border-b-[0.1em] border-black pb-[1.6em]" />
            {t.activities.certSigned}
          </p>
          <p>
            <span className="block border-b-[0.1em] border-black pb-[1.6em]" />
            {t.activities.certDate}
          </p>
        </div>
      </div>
    </Sheet>
  );
}
