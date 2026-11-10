"use client";

import { useId, type ReactNode } from "react";

import { BeeFlight, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { OpenBook, Pop, SayBubble, Txt, r1 } from "./kit-read";
import { MiniBook, StoryMap } from "./kit-tales";

/*
  "Our Mini Books": one living picture per page (12 pages), all in the classroom. Haben's mini
  book "ትንሿ ዋልያ" is drawn open page by page: the Simien cliffs, the mist, the little walia
  finding her mother, and ተፈጸመ. At the end the class library shelf holds everyone's books, with
  a tiny one from Lali at the end.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

/** A cast member shrunk for a book picture, feet at (0, 0). */
function Mini({ s = 0.2, flip = false, children }: { s?: number; flip?: boolean; children: ReactNode }) {
  return <g transform={`scale(${flip ? -s : s} ${s}) translate(-100 -230)`}>{children}</g>;
}

/** The Simien cliffs for Haben's pictures, centred on (0, 0). */
function Cliffs({ mist = false }: { mist?: boolean }) {
  return (
    <g>
      <path d="M-40 30 L-40 -10 L-24 -26 L-10 -6 L4 -30 L20 -12 L40 -20 V30Z" fill="#8A8496" />
      <path d="M-40 30 L-40 14 H40 V30Z" fill="#6E8A4A" />
      {mist && (
        <g fill="#E8ECF4" opacity={0.85} className="ar-read-bob">
          <ellipse cx={-14} cy={-2} rx={24} ry={8} />
          <ellipse cx={16} cy={8} rx={26} ry={9} />
        </g>
      )}
    </g>
  );
}

/** Haben's mini book open at a page: a sentence on the left, her picture on the right. */
function HabenPage({ lines, children, end = false }: { lines: string[]; children?: ReactNode; end?: boolean }) {
  return <OpenBook x={200} y={110} w={260} h={130} left={end ? [...lines, "", "ተፈጸመ።"] : lines} size={13} cover="#3E9B5A" delay={0.3} pic={<g transform="translate(66 12)">{children}</g>} />;
}

/** The classroom, with the class at their desks. */
function Room({ id, board, children }: { id: string; board?: ReactNode; children?: ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={board} />
      {children}
    </g>
  );
}

export default function OurMiniBooks({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Now we'll make our own books, for our class library!" She shows how to fold a paper into a little book.
    case 0:
      return (
        <Room id={id} board={<Txt text="የክፍላችን ቤተ መጻሕፍት" x={200} y={100} size={18} fill="#F4F1E6" />}>
          <Place x={330} y={252} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <MiniBook x={250} y={190} s={1.2} title="?" tilt={-6} />
          <Bench x={130} y={300} w={240} />
          {[
            { x: 50, el: <Gugu mood="joy" />, tap: TAP.gugu },
            { x: 110, el: <Ibex mood="joy" />, tap: TAP.haben },
            { x: 170, el: <Cub mood="joy" />, tap: TAP.cub },
            { x: 230, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={292} s={0.3} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </Room>
      );
    // A cover with a title and the author's name (ደራሲ), pages with a sentence and a picture, and ተፈጸመ.
    case 1:
      return (
        <Room id={id}>
          <MiniBook x={100} y={170} s={1.6} title="ርዕስ" author="ደራሲ፦ …" color="#C2410C" />
          <g transform="translate(200 170)">
            <Pop delay={0.8}>
              <rect x={-36} y={-50} width={72} height={100} rx={4} fill="#FFFDF6" stroke="#2F6FD6" strokeWidth={3} />
              <circle cx={0} cy={-14} r={16} fill="#DCE8FB" />
              <path d="M-24 22 H24 M-24 34 H16" stroke="#2F6FD6" strokeWidth={3} />
            </Pop>
          </g>
          <g transform="translate(300 170)">
            <Pop delay={1.4}>
              <rect x={-36} y={-50} width={72} height={100} rx={4} fill="#FFFDF6" stroke="#2E9A5B" strokeWidth={3} />
              <Txt text="ተፈጸመ" x={0} y={6} size={16} fill="#2E9A5B" />
            </Pop>
          </g>
          <Place x={360} y={294} s={0.32} flip tap={TAP.mama}>
            <Teacher mood="happy" />
          </Place>
        </Room>
      );
    // Everyone gets busy: Gugu's rhymes, Anbessa's longest words, Ayan's tree. Haben chews her pencil: "a little walia ibex."
    case 2:
      return (
        <Room id={id}>
          <MiniBook x={70} y={190} s={1} title="ግጥሞች" color="#E2463F" tilt={-6} />
          <MiniBook x={150} y={186} s={1} title="ረጃጅም ቃላት" color="#2F6FD6" />
          <MiniBook x={230} y={190} s={1} title="ዛፌ" color="#3E9B5A" tilt={6} />
          <Place x={330} y={294} s={0.44} flip tap={TAP.haben}>
            <Ibex mood="worried" pose="point" />
          </Place>
          <Place x={80} y={294} s={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={150} y={294} s={0.3} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={230} y={294} s={0.32} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <SayBubble x={300} y={140} text="ዋልያ!" size={16} tail="right" delay={1.4} />
        </Room>
      );
    // The cover: ትንሿ ዋልያ, and under it ደራሲ፦ ሐበን። It looks like a real book!
    case 3:
      return (
        <Room id={id}>
          <MiniBook x={210} y={150} s={2.6} title="ትንሿ ዋልያ" author="ደራሲ፦ ሐበን" color="#3E9B5A">
            <g transform="translate(2 4)">
              <Mini s={0.08}>
                <Ibex mood="joy" />
              </Mini>
            </g>
          </MiniBook>
          <Place x={80} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={210} y={150} r={80} delay={1} />
        </Room>
      );
    // Page one: ትንሿ ዋልያ በስሜን ተራሮች ትኖራለች። The high cliffs of the Simien.
    case 4:
      return (
        <Room id={id}>
          <HabenPage lines={["ገጽ ፩", "ትንሿ ዋልያ", "በስሜን ተራሮች", "ትኖራለች።"]}>
            <Cliffs />
            <g transform="translate(-4 14)">
              <Mini s={0.12}>
                <Ibex mood="joy" />
              </Mini>
            </g>
          </HabenPage>
          <Place x={80} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // Page two: the mist came, and the little walia got lost. Then she stops: "How does it end?"
    case 5:
      return (
        <Room id={id}>
          <HabenPage lines={["ገጽ ፪", "አንድ ቀን ጭጋግ", "መጣ፤ ትንሿ", "ዋልያ ጠፋች።"]}>
            <Cliffs mist />
          </HabenPage>
          <Place x={80} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="worried" />
          </Place>
          <Sign x={80} y={190} kind="?" delay={1.4} />
        </Room>
      );
    // Tsehay: "Use the story map! Who? Where? What went wrong? How does it end?" "…She finds her mother!"
    case 6:
      return (
        <Room id={id}>
          <StoryMap x={200} y={110} w={200} h={110} lit={3} />
          <Place x={90} y={294} s={0.44} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <SayBubble x={110} y={190} text="እናቷን ታገኛለች!" size={14} delay={1.2} />
        </Room>
      );
    // Page three: she found her mother by her voice. And on the last page: ተፈጸመ።
    case 7:
      return (
        <Room id={id}>
          <HabenPage lines={["ገጽ ፫", "እናቷን", "በድምፅዋ", "አገኘቻት።"]} end>
            <Cliffs />
            <g transform="translate(-14 14)">
              <Mini s={0.12}>
                <Ibex mood="joy" />
              </Mini>
            </g>
            <g transform="translate(12 14)">
              <Mini s={0.16} flip>
                <Ibex grown mood="joy" />
              </Mini>
            </g>
          </HabenPage>
          <Hearts spots={[[266, 80, 1.4], [280, 66, 1.8]]} />
          <Place x={80} y={294} s={0.44} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
        </Room>
      );
    // Reading time: each author in the special chair. Anbessa reads ቤተ መጻሕፍት, piece by piece, then all together.
    case 8:
      return (
        <Room id={id}>
          <g transform="translate(200 250)">
            <rect x={-30} y={-50} width={60} height={10} rx={3} fill="#C2410C" />
            <rect x={-30} y={-40} width={60} height={40} fill="#E07A1E" />
          </g>
          <Place x={200} y={262} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<MiniBook x={0} y={-10} s={0.5} color="#2F6FD6" />} />
          </Place>
          <SayBubble x={260} y={130} text="ቤተ መጻሕፍት!" size={16} tail="left" delay={0.8} />
          {[
            { x: 50, el: <Gugu mood="joy" />, tap: TAP.gugu },
            { x: 110, el: <Ibex mood="joy" />, tap: TAP.haben },
            { x: 290, el: <Wolf mood="joy" />, tap: TAP.hawi },
            { x: 350, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={296} s={0.3} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </Room>
      );
    // Haben reads hers slowly and from the heart. When the walia finds her mother, the class says "Ahhh!"
    case 9:
      return (
        <Room id={id}>
          <g transform="translate(200 250)">
            <rect x={-30} y={-50} width={60} height={10} rx={3} fill="#C2410C" />
            <rect x={-30} y={-40} width={60} height={40} fill="#E07A1E" />
          </g>
          <Place x={200} y={262} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <MiniBook x={250} y={190} s={0.8} title="ትንሿ ዋልያ" color="#3E9B5A" />
          <SayBubble x={100} y={170} text="አሃ!" size={18} delay={1.2} />
          <Hearts spots={[[80, 220, 1.6], [320, 220, 1.8], [100, 206, 2]]} />
          {[
            { x: 50, el: <Gugu mood="joy" />, tap: TAP.gugu },
            { x: 110, el: <Cub mood="joy" />, tap: TAP.cub },
            { x: 290, el: <Wolf mood="joy" />, tap: TAP.hawi },
            { x: 350, el: <Tsehay mood="joy" />, tap: TAP.tsehay },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={296} s={0.3} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </Room>
      );
    // All the mini books go on the shelf: የክፍላችን ቤተ መጻሕፍት. Then Lali brings the tiniest book of all.
    case 10:
      return (
        <Room id={id}>
          <g transform="translate(200 186)">
            <rect x={-150} y={0} width={300} height={10} rx={3} fill="#9A6236" />
            <rect x={-150} y={-64} width={8} height={74} fill="#9A6236" />
            <rect x={142} y={-64} width={8} height={74} fill="#9A6236" />
            <rect x={-90} y={-92} width={180} height={24} rx={6} fill="#FFFDF6" stroke="#9A6236" strokeWidth={2} />
            <Txt text="የክፍላችን ቤተ መጻሕፍት" x={0} y={-74} size={13} fill="#7A3A10" />
          </g>
          {["#E2463F", "#2F6FD6", "#3E9B5A", "#8A4FB0", "#F5B21E", "#2E9A8A"].map((c, i) => (
            <g key={c} className="lali-pop-in" style={vars({ "--delay": `${r1(0.3 + i * 0.25)}s` })}>
              <MiniBook x={90 + i * 40} y={152} s={0.6} color={c} />
            </g>
          ))}
          <g className="lali-pop-in" style={vars({ "--delay": "2.4s" })}>
            <MiniBook x={330} y={170} s={0.25} color="#F5B21E" />
          </g>
          <BeeFlight path="M380 60 C340 80 330 130 334 160" dur={3} s={0.8} rest={[334, 150]} trail={false} />
          <Place x={200} y={296} s={0.34} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
        </Room>
      );
    // "Every book was once just an idea in someone's head, like yours." "My first book. But not my last." ተፈጸመ።
    default:
      return (
        <Room id={id} board={<Txt text="ተፈጸመ።" x={200} y={102} size={34} fill="#F4F1E6" />}>
          <Place x={330} y={252} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
          <Place x={170} y={292} s={0.5} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <MiniBook x={230} y={210} s={1} title="ትንሿ ዋልያ" author="ደራሲ፦ ሐበን" color="#3E9B5A" />
          <Sparkles x={200} y={200} r={80} delay={0.8} n={7} />
        </Room>
      );
  }
}
