"use client";

import "./ayans-mixed-up-pages.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Tsehay } from "./kit-cast";
import { Bench, Classroom, Seedling } from "./kit-more";
import { Village, Yard } from "./kit-places";
import { Sign, Sparkles, WateringCan } from "./kit-props";
import { HILITE, Pop, Txt, WordCard, r1, textW } from "./kit-read";
import { Thing } from "./things";

/*
  "Ayan's Mixed-Up Pages": one living picture per page (12 pages): Ayan's yard, the windy
  village path, a close look at each page of her little book (its order word glowing), the
  four pages in a row, the classroom with a ladder of order words, and the grown tree. Each page
  of the little book has a small picture: digging, putting the seedling in, covering it, watering.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and amp-* (./ayans-mixed-up-pages.css).
*/

type Step = "dig" | "put" | "cover" | "water" | "grow";
const PAGES: Record<Step, { order: string; rest: string[] }> = {
  dig: { order: "መጀመሪያ", rest: ["ጉድጓድ ቆፈርን።"] },
  put: { order: "ከዚያ", rest: ["ችግኙን ጉድጓዱ", "ውስጥ አስገባን።"] },
  cover: { order: "ቀጥሎ", rest: ["በአፈር ሸፈንነው።"] },
  water: { order: "በመጨረሻ", rest: ["ውሃ አጠጣነው።"] },
  grow: { order: "በመጨረሻም", rest: ["ዛፋችን አደገ!"] },
};

/** The little picture on a page of Ayan's book, centred on (0, 0). */
function StepPic({ step }: { step: Step }) {
  return (
    <g>
      <path d="M-34 10 H34" stroke="#C99A64" strokeWidth={3} />
      {step === "dig" && (
        <g>
          <ellipse cx={-4} cy={10} rx={14} ry={4} fill="#5A3A26" />
          <path d="M-14 6 q-6 -6 -12 -2 q-4 6 2 8" fill="#8A5A3A" />
          <g transform="translate(14 -2) rotate(20)">
            <rect x={-2} y={-24} width={4} height={22} fill="#9A6236" />
            <path d="M-7 -2 H7 L5 10 H-5Z" fill="#8A97A8" />
          </g>
        </g>
      )}
      {step === "put" && (
        <g>
          <ellipse cx={0} cy={10} rx={14} ry={4} fill="#5A3A26" />
          <Seedling x={0} y={10} s={0.8} />
        </g>
      )}
      {step === "cover" && (
        <g>
          <path d="M-16 10 Q0 0 16 10Z" fill="#8A5A3A" />
          <Seedling x={0} y={6} s={0.8} />
        </g>
      )}
      {step === "water" && (
        <g>
          <path d="M-16 10 Q0 2 16 10Z" fill="#6A4A2A" />
          <Seedling x={-4} y={7} s={0.8} />
          <WateringCan x={16} y={0} s={0.55} pour />
        </g>
      )}
      {step === "grow" && (
        <g>
          <Seedling x={0} y={10} s={0.8} grown={1} />
        </g>
      )}
    </g>
  );
}

/** One page of Ayan's book: a picture on top, then the sentence with its order word (lit when asked). */
function BookPage({ step, x, y, s = 1, tilt = 0, lit = false, num, delay = null }: { step: Step; x: number; y: number; s?: number; tilt?: number; lit?: boolean; num?: number; delay?: number | null }) {
  const pg = PAGES[step];
  const lines = [pg.order, ...pg.rest];
  const w = Math.max(96, ...lines.map((l) => textW(l, 12) + 16));
  const h = 70 + lines.length * 16;
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${tilt}) scale(${s})`}>
      <Pop delay={delay}>
        <rect x={r1(-w / 2 + 3)} y={r1(-h / 2 + 3)} width={r1(w)} height={h} rx={4} fill="#000" opacity={0.14} />
        <rect x={r1(-w / 2)} y={r1(-h / 2)} width={r1(w)} height={h} rx={4} fill="#FFFDF6" stroke="#D8C49A" strokeWidth={1.4} />
        <g transform={`translate(0 ${r1(-h / 2 + 34)})`}>
          <StepPic step={step} />
        </g>
        {lines.map((l, i) => {
          const yy = -h / 2 + 66 + i * 16;
          return (
            <g key={i}>
              {i === 0 && lit && <rect x={r1(-textW(l, 12) / 2 - 4)} y={r1(yy - 12)} width={r1(textW(l, 12) + 8)} height={16} rx={4} fill={HILITE} className="ar-read-glow" />}
              <Txt text={l} x={0} y={yy} size={12} weight={i === 0 ? 800 : 600} fill={i === 0 ? "#C2410C" : "#3A2A1E"} />
            </g>
          );
        })}
        {num !== undefined && (
          <g transform={`translate(${r1(w / 2 - 10)} ${r1(h / 2 - 10)})`}>
            <circle r={8} fill="#2F7FB8" />
            <Txt text={String(num)} x={0} y={4} size={11} fill="#fff" />
          </g>
        )}
      </Pop>
    </g>
  );
}

/** The little book tied up with a red string. */
function TiedBook({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[3, 2, 1, 0].map((k) => (
        <rect key={k} x={-30 + k * 3} y={-38 + k * 3} width={60} height={76} rx={3} fill="#FFFDF6" stroke="#D8C49A" />
      ))}
      <path d="M-30 0 H36 M3 -38 V44" stroke="#E2463F" strokeWidth={3} />
      <Txt text="ዛፍ ተከልን" x={3} y={-14} size={10} fill="#2E7A2E" />
    </g>
  );
}

export default function AyansMixedUpPages({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Ayan has made her very first book: ዛፍ ተከልን, We Planted a Tree. Four pages, tied with a red string.
    case 0:
      return (
        <Yard id={id} time="morning">
          <TiedBook x={210} y={150} s={1.3} />
          <WordCard text="ዛፍ ተከልን" x={210} y={60} size={22} delay={0.8} glow />
          <Place x={110} y={294} s={0.46} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={330} y={294} s={0.5} flip tap={TAP.ayan}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={260} y={294} s={0.3} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Seedling x={40} y={240} s={1} grown={0.2} />
          <Air kind="day" seed={3} />
        </Yard>
      );
    // A big wind comes. Whoosh! The red string snaps, and the pages fly up into the air.
    case 1:
      return (
        <Village id={id} time="morning">
          <g stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.8}>
            {[60, 110, 160].map((y, i) => (
              <path key={y} d={`M${20 + i * 30} ${y} q40 -16 80 0 t80 0`} className="amp-gust" style={vars({ "--delay": `${-i * 0.4}s` })} />
            ))}
          </g>
          {(["dig", "put", "cover", "water"] as Step[]).map((st, i) => (
            <g key={st} transform={`translate(${170 + i * 50} ${110 + (i % 2) * 40})`}>
              <g className="ar-read-blow" style={vars({ "--bx": `${30 + i * 10}px`, "--by": `${-40 - i * 8}px`, "--br": `${120 + i * 60}deg`, "--delay": `${-i * 0.7}s`, "--dur": "3.4s" })}>
                <BookPage step={st} x={0} y={0} s={0.45} tilt={i * 20 - 30} />
              </g>
            </g>
          ))}
          <Place x={110} y={292} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={50} y={292} s={0.3} tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" />
          </Place>
          <Air kind="day" seed={5} />
        </Village>
      );
    // They find all four: in a bush, under a cart, on a goat! But now the pages are all mixed up.
    case 2:
      return (
        <Village id={id} time="morning">
          <g transform="translate(70 240)">
            <circle cx={0} cy={-14} r={22} fill="#3E9B5A" />
            <circle cx={18} cy={-8} r={16} fill="#2D7D47" />
          </g>
          <BookPage step="water" x={70} y={210} s={0.4} tilt={-20} delay={0.6} />
          <g transform="translate(200 250)">
            <rect x={-40} y={-30} width={80} height={20} fill="#9A6236" />
            <circle cx={-26} cy={-6} r={12} fill="#5A3A26" />
            <circle cx={26} cy={-6} r={12} fill="#5A3A26" />
          </g>
          <BookPage step="dig" x={200} y={240} s={0.36} tilt={10} delay={1} />
          <g transform="translate(320 250)">
            <Thing id="goat" s={0.8} />
          </g>
          <BookPage step="cover" x={316} y={208} s={0.36} tilt={-8} delay={1.4} />
          <BookPage step="put" x={200} y={110} s={0.5} tilt={6} delay={1.8} />
          <Sign x={260} y={90} kind="?" delay={2.4} />
          <Place x={130} y={294} s={0.4} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Place x={260} y={294} s={0.28} className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Air kind="day" seed={7} />
        </Village>
      );
    // ከዚያ ችግኙን ጉድጓዱ ውስጥ አስገባን። "This can't be first. It says ከዚያ: then!"
    case 3:
      return (
        <Yard id={id} time="day" house={false}>
          <BookPage step="put" x={230} y={130} s={1.25} lit delay={0.4} />
          <Place x={90} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Sign x={350} y={70} kind="!" delay={1.6} color="#C2410C" />
          <Air kind="day" seed={9} />
        </Yard>
      );
    // መጀመሪያ ጉድጓድ ቆፈርን። "First! This one goes at the front," says Abdi.
    case 4:
      return (
        <Yard id={id} time="day" house={false}>
          <BookPage step="dig" x={230} y={130} s={1.25} lit delay={0.4} />
          <g transform="translate(320 70)">
            <Pop delay={1.4}>
              <circle r={18} fill="#2F7FB8" />
              <Txt text="1" x={0} y={7} size={20} fill="#fff" />
            </Pop>
          </g>
          <Place x={90} y={294} s={0.36} className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Place x={350} y={294} s={0.44} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={11} />
        </Yard>
      );
    // በመጨረሻ ውሃ አጠጣነው። "At last we watered it." This one goes at the very end.
    case 5:
      return (
        <Yard id={id} time="day" house={false}>
          <BookPage step="water" x={230} y={130} s={1.25} lit delay={0.4} />
          <g transform="translate(320 70)">
            <Pop delay={1.4}>
              <circle r={18} fill="#2F7FB8" />
              <Txt text="4" x={0} y={7} size={20} fill="#fff" />
            </Pop>
          </g>
          <Place x={90} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Air kind="day" seed={13} />
        </Yard>
      );
    // ቀጥሎ በአፈር ሸፈንነው። Where does it go? "You can't cover it before it's in the hole!"
    case 6:
      return (
        <Yard id={id} time="day" house={false}>
          <BookPage step="cover" x={250} y={120} s={1.1} lit delay={0.4} />
          <BookPage step="put" x={110} y={110} s={0.6} tilt={-6} delay={1.2} />
          <g className="lali-fade-in" style={vars({ "--delay": "1.8s" })}>
            <path d="M150 116 Q176 96 196 112" stroke="#2F7FB8" strokeWidth={3} fill="none" strokeLinecap="round" />
            <path d="M188 104 L197 112 L186 116" stroke="#2F7FB8" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <Place x={100} y={294} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Sign x={100} y={190} kind="?" delay={0.8} />
          <Air kind="day" seed={15} />
        </Yard>
      );
    // She lays the pages in a row: first, then, next, at last. Dig, put in, cover, water. It makes sense!
    case 7:
      return (
        <Yard id={id} time="day" house={false}>
          {(["dig", "put", "cover", "water"] as Step[]).map((st, i) => (
            <BookPage key={st} step={st} x={62 + i * 92} y={110} s={0.78} lit num={i + 1} delay={r1(0.4 + i * 0.6)} />
          ))}
          <Place x={200} y={294} s={0.48} className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.3} flip className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sparkles x={200} y={110} r={150} delay={3} n={7} />
          <Air kind="day" seed={17} />
        </Yard>
      );
    // At school: "These little words are like the steps of a ladder."
    case 8:
      return (
        <g>
          <Classroom
            id={id}
            board={
              <g>
                <path d="M124 136 L140 44 M174 136 L190 44" stroke="#C9B48E" strokeWidth={4} />
                {["በመጨረሻ", "ቀጥሎ", "ከዚያ", "መጀመሪያ"].map((w, i) => (
                  <g key={w} className="lali-fade-in" style={vars({ "--delay": `${r1(1.8 - i * 0.4)}s` })}>
                    <path d={`M${r1(126 + (3 - i) * 4.4)} ${60 + i * 22} H${r1(178 + (3 - i) * 4.4)}`} stroke="#C9B48E" strokeWidth={3} />
                    <Txt text={w} x={206} y={65 + i * 22} size={14} fill="#F4F1E6" anchor="start" />
                  </g>
                ))}
              </g>
            }
          />
          <Place x={330} y={252} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={210} y={262} s={0.42} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <BookPage step="dig" x={150} y={212} s={0.45} delay={0.4} />
          <Bench x={110} y={300} w={200} />
          <Place x={60} y={292} s={0.3} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={120} y={292} s={0.3} tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
        </g>
      );
    // Gugu: "At last I woke up. First I ate my breakfast…" "Eat breakfast while you're asleep?"
    case 9:
      return (
        <g>
          <Classroom id={id} />
          <g transform="translate(130 196)">
            <Pop delay={0.6}>
              <rect x={-56} y={-26} width={112} height={52} rx={26} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
              <g transform="translate(-26 4)">
                <rect x={-16} y={-6} width={32} height={10} rx={3} fill="#4A7FD0" />
                <circle cx={-10} cy={-10} r={6} fill="#E8B88A" />
                <path d="M-10 -24 q4 -4 8 0 M-4 -30 q4 -4 8 0" stroke="#7A5236" strokeWidth={1.6} fill="none" />
              </g>
              <g transform="translate(24 4)">
                <ellipse cx={0} cy={0} rx={16} ry={5} fill="#D8B27E" />
                <ellipse cx={0} cy={-2} rx={12} ry={3} fill="#C9A06A" />
              </g>
              <Txt text="?" x={0} y={8} size={22} fill="#E2463F" />
            </Pop>
          </g>
          <Place x={130} y={294} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={250} y={294} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={320} y={294} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </g>
      );
    // A new string, and a number on every page: 1, 2, 3, 4. "Now the wind can never mix them up again!"
    case 10:
      return (
        <Yard id={id} time="evening">
          {(["dig", "put", "cover", "water"] as Step[]).map((st, i) => (
            <BookPage key={st} step={st} x={140 + i * 24} y={140 - i * 6} s={0.8} tilt={-6 + i * 4} num={i + 1} delay={r1(0.3 + i * 0.4)} />
          ))}
          <g className="lali-fade-in" style={vars({ "--delay": "2.2s" })}>
            <path d="M120 140 H260" stroke="#2E9A5B" strokeWidth={4} />
          </g>
          <Place x={320} y={294} s={0.48} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <BeeHover x={60} y={150} s={0.7} />
          <Air kind="dusk" seed={19} />
        </Yard>
      );
    // Weeks later the little tree has new leaves. Page 5: በመጨረሻም ዛፋችን አደገ!
    default:
      return (
        <Yard id={id} time="day">
          <Seedling x={210} y={250} s={2.2} grown={0.9} />
          <BookPage step="grow" x={90} y={110} s={0.95} lit num={5} delay={0.8} />
          <Place x={120} y={294} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={310} y={294} s={0.5} flip tap={TAP.ayan}>
            <Camel who="hooyo" mood="joy" />
          </Place>
          <Place x={260} y={294} s={0.3} flip className="lali-hop" tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <Sparkles x={210} y={160} r={50} delay={1.6} />
          <Air kind="day" seed={21} />
        </Yard>
      );
  }
}
