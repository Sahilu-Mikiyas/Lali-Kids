"use client";

import "./hawis-why-book.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, Sun, vars } from "../../scenery";
import { Gugu, TAP, Wolf } from "./kit-cast";
import { Yard } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { ClosedBook, Library, OpenBook, Pop, Table, Txt, WordCard } from "./kit-read";

/*
  "Hawi's Why Book": one living picture per page (12 pages): Hawi's yard below the Bale
  mountains, the library, and the table where Hawi and Gugu make their own book. The fact book
  "Mountain Animals" is drawn open with a little picture for each answer (the wolf on the high
  moorland, its long nose at a mole-rat's hole, hunting under the sun, geladas asleep on a cliff
  ledge). ምክንያቱም ("because") glows every time an answer begins.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and hwb-* (./hawis-why-book.css).
*/

/** A cast member shrunk for a book picture, feet at (0, 0). */
function Mini({ s = 0.2, flip = false, children }: { s?: number; flip?: boolean; children: ReactNode }) {
  return <g transform={`scale(${flip ? -s : s} ${s}) translate(-100 -230)`}>{children}</g>;
}

/** A giant mole-rat peeking from its hole, centred on (0, 0). */
function MoleRat({ peek = true }: { peek?: boolean }) {
  return (
    <g>
      <ellipse cx={0} cy={4} rx={12} ry={4} fill="#5A3A26" />
      <g className={peek ? "hwb-peek" : undefined}>
        <ellipse cx={0} cy={-2} rx={7} ry={6} fill="#B08060" />
        <circle cx={-2.5} cy={-4} r={1} fill="#2A1A10" />
        <circle cx={2.5} cy={-4} r={1} fill="#2A1A10" />
        <rect x={-2} y={0} width={4} height={3} fill="#FFF4D6" />
      </g>
    </g>
  );
}

/** The open fact book with lines on the left and a picture on the right; `because` glows ምክንያቱም. */
function FactBook({ lines, because = true, children, cover = "#3E7A3A", x = 200, y = 92 }: { lines: string[]; because?: boolean; children?: ReactNode; cover?: string; x?: number; y?: number }) {
  return (
    <g>
      <OpenBook x={x} y={y} w={260} h={124} left={lines} size={12} cover={cover} delay={0.3} pic={<g transform="translate(64 8)">{children}</g>} />
      {because && <WordCard text="ምክንያቱም" x={x} y={y + 80} size={18} color="#C2410C" delay={1.4} glow />}
    </g>
  );
}

/** The high Bale moorland for book pictures: a green slope and a far peak. */
function Moor() {
  return (
    <g>
      <path d="M-46 22 L-18 -18 L0 -2 L20 -24 L46 22Z" fill="#9DB0D8" />
      <path d="M-46 30 Q0 4 46 26 V34 H-46Z" fill="#8FCB80" />
    </g>
  );
}

export default function HawisWhyBook({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandpa Tolosa gives Hawi a new book: የተራራ እንስሳት. On the first page, an Ethiopian wolf, just like Hawi!
    case 0:
      return (
        <Yard id={id} time="day">
          <g transform="translate(200 120)">
            <Pop delay={0.4}>
              <ClosedBook x={0} y={0} w={110} h={132} title="የተራራ እንስሳት" color="#3E7A3A" size={11}>
                <g transform="translate(4 30)">
                  <Moor />
                  <g transform="translate(0 24)">
                    <Mini s={0.2}>
                      <Wolf mood="happy" />
                    </Mini>
                  </g>
                </g>
              </ClosedBook>
            </Pop>
          </g>
          <Place x={110} y={292} s={0.46} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={310} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="give" />
          </Place>
          <Air kind="day" seed={3} />
        </Yard>
      );
    // "ለምን? Why do wolves live so high up?" She is a wolf, but she doesn't know! Her ears droop.
    case 1:
      return (
        <Yard id={id} time="day">
          <WordCard text="ለምን?" x={250} y={90} size={28} delay={0.6} color="#2F7FB8" glow />
          <Place x={140} y={292} s={0.46} tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" />
          </Place>
          <Place x={260} y={292} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Sign x={140} y={170} kind="?" delay={1.4} />
          <Air kind="day" seed={5} />
        </Yard>
      );
    // "Nobody knows everything. But you can read and find out." Why? Because… let's read and see!
    case 2:
      return (
        <Yard id={id} time="day">
          <WordCard text="ለምን?" x={140} y={70} size={24} delay={0.4} color="#2F7FB8" />
          <WordCard text="ምክንያቱም…" x={270} y={70} size={24} delay={1.2} color="#C2410C" glow />
          <g className="lali-fade-in" style={vars({ "--delay": "0.9s" })}>
            <path d="M176 70 H206 M198 63 L207 70 L198 77" stroke="#7A5236" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <Place x={140} y={292} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={300} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
          <Air kind="day" seed={7} />
        </Yard>
      );
    // የኢትዮጵያ ተኩላ … ምክንያቱም የሚበላቸው ፍልፈሎች እዚያ ብዙ ናቸው። Because the mole-rats live up there!
    case 3:
      return (
        <Yard id={id} time="day">
          <FactBook lines={["የኢትዮጵያ ተኩላ", "የሚኖረው", "በከፍተኛ ተራሮች", "ላይ ነው፤"]}>
            <Moor />
            <g transform="translate(-14 26)">
              <Mini s={0.16}>
                <Wolf mood="happy" />
              </Mini>
            </g>
            <g transform="translate(18 24)">
              <MoleRat />
            </g>
          </FactBook>
          <Place x={90} y={292} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={320} y={292} s={0.38} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Air kind="day" seed={9} />
        </Yard>
      );
    // "Why is its nose so long?" …ምክንያቱም ፍልፈሎችን ከጉድጓዳቸው አጠገብ ለመያዝ ይረዳዋል።
    case 4:
      return (
        <Yard id={id} time="day">
          <FactBook lines={["አፍንጫው", "ረጅምና ቀጭን", "ነው፤"]}>
            <path d="M-40 24 H40" stroke="#8FCB80" strokeWidth={8} />
            <g transform="translate(-10 22)">
              <g className="hwb-sniff">
                <Mini s={0.2}>
                  <Wolf mood="wow" />
                </Mini>
              </g>
            </g>
            <g transform="translate(22 22)">
              <MoleRat />
            </g>
          </FactBook>
          <Place x={90} y={292} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Place x={320} y={292} s={0.38} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Air kind="day" seed={11} />
        </Yard>
      );
    // "Why does it hunt in the day?" …ምክንያቱም ፍልፈሎች የሚወጡት በቀን ነው። Only a few hundred are left.
    case 5:
      return (
        <Yard id={id} time="day">
          <FactBook lines={["በቀን ያድናል፤"]}>
            <Moor />
            <Sun x={-26} y={-30} r={9} face={false} />
            <g transform="translate(-4 26)">
              <Mini s={0.16}>
                <Wolf mood="happy" />
              </Mini>
            </g>
            <g transform="translate(24 26)">
              <MoleRat />
            </g>
          </FactBook>
          <Place x={90} y={292} s={0.42} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={320} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={13} />
        </Yard>
      );
    // Geladas! "That's ME!" …ማታ በገደል ዳር ይተኛሉ፤ ምክንያቱም እዚያ ጅብና ነብር ሊደርሱባቸው አይችሉም።
    case 6:
      return (
        <Yard id={id} time="evening">
          <FactBook lines={["ጭላዳዎች", "ሣር ይበላሉ።", "ማታ በገደል", "ዳር ይተኛሉ፤"]} cover="#7A4A26">
            <path d="M-6 -40 L30 -40 L30 34 L-6 34Z" fill="#8A8496" />
            <path d="M-6 -6 H34" stroke="#6A6476" strokeWidth={4} />
            <circle cx={18} cy={-30} r={5} fill="#F8EDC4" />
            <g transform="translate(14 -6)">
              <Mini s={0.13}>
                <Gugu mood="happy" />
              </Mini>
            </g>
            <g transform="translate(-26 30)">
              <path d="M-10 0 Q-8 -10 2 -10 Q10 -10 10 0Z" fill="#7A6A4A" />
            </g>
          </FactBook>
          <Place x={320} y={292} s={0.42} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={90} y={292} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Air kind="dusk" seed={15} />
        </Yard>
      );
    // "Why is my chest red?" The book only says ደረታቸው ላይ ቀይ ምልክት አለ። No ምክንያቱም. "The book doesn't say!"
    case 7:
      return (
        <Yard id={id} time="day">
          <FactBook lines={["ደረታቸው ላይ", "ቀይ ምልክት", "አለ።"]} because={false} cover="#7A4A26">
            <Mini s={0.24}>
              <Gugu mood="happy" />
            </Mini>
          </FactBook>
          <g transform="translate(200 172)">
            <Pop delay={1.4}>
              <rect x={-60} y={-16} width={120} height={32} rx={8} fill="#FFFDF6" stroke="#C2410C" strokeWidth={2} opacity={0.6} />
              <Txt text="ምክንያቱም" x={0} y={6} size={16} fill="#C2410C" opacity={0.5} />
              <path d="M-60 14 L60 -14" stroke="#E2463F" strokeWidth={3} />
            </Pop>
          </g>
          <Place x={320} y={292} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Place x={90} y={292} s={0.42} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Air kind="day" seed={17} />
        </Yard>
      );
    // "When one book doesn't say, we look in another. Let's go to the library."
    case 8:
      return (
        <Library id={id}>
          <WordCard text="ቤተ መጻሕፍት" x={200} y={40} size={20} delay={0.4} />
          <Place x={160} y={290} s={0.38} from={[40, 290]} delay={0.4} dur={1.8} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={240} y={292} s={0.34} from={[110, 292]} delay={0.6} dur={1.8} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={330} y={290} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="wave" />
          </Place>
        </Library>
      );
    // A big gelada book: the red patch helps geladas talk. A bright red chest says "I'm healthy and strong"!
    case 9:
      return (
        <Library id={id}>
          <FactBook lines={["ቀዩ ምልክት", "ጭላዳዎች", "እርስ በርሳቸው", "እንዲግባቡ", "ይረዳቸዋል።"]} because={false} cover="#C2410C" y={96}>
            <Mini s={0.26}>
              <Gugu mood="joy" />
            </Mini>
            <g className="hwb-glow">
              <circle cx={0} cy={-18} r={7} fill="#FF5A5A" opacity={0.5} />
            </g>
          </FactBook>
          <Place x={300} y={292} s={0.46} flip className="hwb-puff" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={100} y={290} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={300} y={220} r={34} delay={1.2} />
        </Library>
      );
    // "Let's make our own Why Book!" A question with ለምን? and an answer with ምክንያቱም. Gugu draws the pictures.
    case 10:
      return (
        <Yard id={id} time="evening">
          <Table x={200} y={230} w={170}>
            <g transform="translate(-34 -4)">
              <rect x={-30} y={-24} width={60} height={24} fill="#FFFDF6" stroke="#D8C49A" />
              <Txt text="ለምን?" x={0} y={-8} size={11} fill="#2F7FB8" />
            </g>
            <g transform="translate(34 -4)">
              <rect x={-30} y={-24} width={60} height={24} fill="#FFFDF6" stroke="#D8C49A" />
              <Txt text="ምክንያቱም" x={0} y={-8} size={10} fill="#C2410C" />
            </g>
          </Table>
          <Place x={100} y={292} s={0.44} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={310} y={292} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <BeeHover x={200} y={140} s={0.8} />
          <Air kind="dusk" seed={19} />
        </Yard>
      );
    // The last page: ሀዊና ጉጉ ለምን ጓደኛሞች ሆኑ? ምክንያቱም ሁለቱም ማንበብ ይወዳሉ!
    default:
      return (
        <Yard id={id} time="evening">
          <OpenBook
            x={200}
            y={100}
            w={280}
            h={130}
            left={["ሀዊና ጉጉ", "ለምን ጓደኛሞች", "ሆኑ?", "ምክንያቱም", "ሁለቱም ማንበብ", "ይወዳሉ!"]}
            size={12}
            cover="#2F7FB8"
            delay={0.3}
            pic={
              <g transform="translate(70 40)">
                <g transform="translate(-18 0)">
                  <Mini s={0.22}>
                    <Wolf mood="joy" />
                  </Mini>
                </g>
                <g transform="translate(20 0)">
                  <Mini s={0.2}>
                    <Gugu mood="joy" />
                  </Mini>
                </g>
              </g>
            }
          />
          <Place x={100} y={292} s={0.44} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={300} y={292} s={0.4} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sparkles x={200} y={100} r={120} delay={1.6} n={7} />
          <Air kind="dusk" seed={21} />
        </Yard>
      );
  }
}
