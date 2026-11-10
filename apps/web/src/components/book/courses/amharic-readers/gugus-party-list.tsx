"use client";

import { useId, type ReactNode } from "react";

import { Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Classroom } from "./kit-more";
import { Yard } from "./kit-places";
import { Hearts, Sign, Sparkles } from "./kit-props";
import { Note, Pop, SayBubble, Table, Txt, r1 } from "./kit-read";
import { Thing } from "./things";

/*
  "Gugu's Party List": one living picture per page (12 pages), in the classroom (with bunting on
  the last pages), plus Hawi's yard where she bakes with Grandpa Tolosa. Gugu's list is drawn on
  paper: first all run together, then with spaces, a ፣ between things (in blue) and ። at the end
  (in orange), then one line per child with ፦.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and art-* (./kit-tales.css).
*/

/** The classroom with the children on the floor at the front. */
function Room({ id, board, party = false, children }: { id: string; board?: ReactNode; party?: boolean; children?: ReactNode }) {
  return (
    <g>
      <Classroom id={id} board={board} />
      {party && (
        <g>
          <path d="M0 24 Q100 50 200 24 T400 24" stroke="#7A5236" strokeWidth={1.5} fill="none" />
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M${16 + i * 34} ${30 + Math.round(Math.sin((i / 11) * Math.PI * 2) * 6)} l8 14 l8 -14Z`} fill={["#2E9A5B", "#F5B21E", "#E2463F"][i % 3]} />
          ))}
        </g>
      )}
      {children}
    </g>
  );
}

/** The list on its paper; lines are given as coloured pieces. */
function ListPaper({ x = 200, y = 130, lines, w = 220, size = 16, glow = false, tilt = -2 }: { x?: number; y?: number; lines: [string, string][][]; w?: number; size?: number; glow?: boolean; tilt?: number }) {
  const h = lines.length * size * 1.5 + 24;
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <Pop delay={0.3}>
        {glow && <rect x={-w / 2 - 6} y={-h / 2 - 6} width={w + 12} height={h + 12} rx={8} fill="#FFE27A" className="ar-read-glow" />}
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} fill="#FFFDF6" stroke="#B9A47A" strokeWidth={2} />
        {lines.map((parts, i) => (
          <text key={i} x={-w / 2 + 14} y={r1(-h / 2 + 18 + size + i * size * 1.5 - size * 0.3)} fontSize={size} fontWeight={700} style={{ fontFamily: "var(--font-noto-ethiopic), 'Noto Sans Ethiopic', sans-serif" }}>
            {parts.map(([t, c], k) => (
              <tspan key={k} fill={c}>
                {t}
              </tspan>
            ))}
          </text>
        ))}
      </Pop>
    </g>
  );
}

const INK = "#2B3A6E";
const COMMA = "#2F6FD6";
const STOP = "#C2410C";
const GOOD: [string, string][] = [
  ["ዳቦ", INK],
  ["፣ ", COMMA],
  ["ሙዝ", INK],
  ["፣ ", COMMA],
  ["ብርቱካን", INK],
  ["፣", COMMA],
];
const GOOD2: [string, string][] = [
  ["ሻይና ስኒዎች", INK],
  ["።", STOP],
];
const WHO: [string, string][][] = [
  [["ሀዊ፦ ዳቦ", INK], ["።", STOP]],
  [["አያን፦ ሙዝ", INK], ["።", STOP]],
  [["ሐበን፦ ብርቱካን", INK], ["።", STOP]],
  [["አንበሳ፦ ስኒዎች", INK], ["።", STOP]],
];

export default function GugusPartyList({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The last day of term: a party! "Who will write the list?" Gugu's hand shoots up first. "Me! Me!"
    case 0:
      return (
        <Room id={id} board={<Txt text="ግብዣ!" x={200} y={102} size={36} fill="#F4F1E6" />}>
          <Place x={340} y={252} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Place x={180} y={292} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <SayBubble x={210} y={170} text="እኔ! እኔ!" size={18} delay={0.6} />
          <Place x={80} y={294} s={0.34} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </Room>
      );
    // Ideas everywhere: bread, bananas, oranges, tea, cups. Gugu scribbles faster and faster.
    case 1:
      return (
        <Room id={id}>
          {(["bread", "banana", "orange", "cup", "coffee"] as const).map((t, i) => (
            <g key={t} transform={`translate(${70 + i * 66} ${150 + (i % 2) * 20})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.3 + i * 0.4)}s` })}>
                <Thing id={t} s={0.36} />
              </g>
            </g>
          ))}
          <Place x={200} y={292} s={0.42} className="art-shiver" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Room>
      );
    // His list: ዳቦሙዝብርቱካንሻይስኒ. "What does it say?" "It's one long, long word!"
    case 2:
      return (
        <Room id={id}>
          <ListPaper lines={[[["ዳቦሙዝብርቱካንሻይስኒ", INK]]]} w={250} size={18} />
          <Place x={120} y={294} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={250} y={294} s={0.34} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Place x={320} y={294} s={0.4} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Sign x={250} y={200} kind="?" delay={1} />
        </Room>
      );
    // Ayan: "ዳቦሙዝ… what's a ዳቦሙዝ? And ሻይስኒ… a new kind of tea?" The whole class giggles, Gugu too.
    case 3:
      return (
        <Room id={id}>
          <ListPaper lines={[[["ዳቦሙዝ", "#E2463F"], ["ብርቱካን", INK], ["ሻይስኒ", "#E2463F"]]]} w={250} size={18} />
          <SayBubble x={110} y={190} text="ሻይስኒ?" size={16} delay={0.8} />
          <Place x={90} y={294} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={250} y={294} s={0.4} className="art-shiver" tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
        </Room>
      );
    // "Words need space to breathe: a space between words, a ፣ between things, ። at the end."
    case 4:
      return (
        <Room
          id={id}
          board={
            <>
              <Txt text="ክፍተት" x={140} y={100} size={20} fill="#F4F1E6" />
              <Txt text="፣" x={210} y={100} size={30} fill="#9CC0FF" />
              <Txt text="።" x={262} y={100} size={30} fill="#FFB27A" />
            </>
          }
        >
          <Place x={340} y={252} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="happy" pose="point" />
          </Place>
          <Place x={180} y={292} s={0.42} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Room>
      );
    // Slowly this time: ዳቦ… ፣ ሙዝ… ፣ ብርቱካን… ፣ ሻይና ስኒዎች… and ። at the very end.
    case 5:
      return (
        <Room id={id}>
          <ListPaper lines={[GOOD, GOOD2]} w={240} size={18} />
          <Place x={200} y={294} s={0.42} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // ዳቦ፣ ሙዝ፣ ብርቱካን፣ ሻይና ስኒዎች። Now everyone can read it!
    case 6:
      return (
        <Room id={id}>
          <ListPaper lines={[GOOD, GOOD2]} w={240} size={18} glow />
          <Place x={90} y={294} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={300} y={294} s={0.38} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Sparkles x={200} y={130} r={110} delay={1} />
        </Room>
      );
    // "Who brings what?" One line each: ሀዊ፦ ዳቦ። አያን፦ ሙዝ። ሐበን፦ ብርቱካን። አንበሳ፦ ስኒዎች።
    case 7:
      return (
        <Room id={id}>
          <ListPaper lines={WHO} w={180} size={16} y={140} tilt={0} />
          <Place x={350} y={252} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
          <Place x={70} y={294} s={0.4} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
        </Room>
      );
    // "What about you, Gugu?" He adds one more line: ጉጉ፦ ግጥም!
    case 8:
      return (
        <Room id={id}>
          <ListPaper lines={[...WHO, [["ጉጉ፦ ግጥም", "#8A4FB0"], ["!", STOP]]]} w={180} size={16} y={140} tilt={0} glow />
          <Place x={70} y={294} s={0.4} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={330} y={294} s={0.38} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Room>
      );
    // Hawi reads her line to Grandpa Tolosa, ሀዊ፦ ዳቦ። "Bread it is," and they bake a big round loaf.
    case 9:
      return (
        <Yard id={id} time="evening">
          <Note lines={["ሀዊ፦ ዳቦ።"]} x={200} y={90} w={110} size={18} delay={0.4} />
          <Thing id="bread" x={200} y={240} s={0.6} />
          <Place x={110} y={292} s={0.42} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={300} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Hearts spots={[[200, 190, 1.4], [216, 176, 1.8]]} />
        </Yard>
      );
    // Party day: everything is there. Gugu ticks each thing on his list. Not one thing missing!
    case 10:
      return (
        <Room id={id} party>
          <Table x={200} y={200} w={220}>
            <Thing id="bread" x={-80} y={-14} s={0.3} />
            <Thing id="banana" x={-40} y={-14} s={0.3} />
            <Thing id="orange" x={0} y={-14} s={0.26} />
            <Thing id="cup" x={40} y={-12} s={0.26} />
            <Thing id="cup" x={70} y={-12} s={0.26} />
          </Table>
          {[-80, -40, 0, 55].map((dx, i) => (
            <g key={dx} transform={`translate(${200 + dx} 160)`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.5)}s` })}>
                <path d="M-6 0 l4 5 l9 -11" stroke="#2E9A5B" strokeWidth={3.4} fill="none" strokeLinecap="round" />
              </g>
            </g>
          ))}
          <Place x={60} y={294} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={330} y={294} s={0.34} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
        </Room>
      );
    // Gugu stands up for his part: «ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!» Everyone laughs and claps.
    default:
      return (
        <Room id={id} party board={<Txt text="ዶሮ በላች ሽሮ፣ ሸሸች ከቀበሮ!" x={200} y={100} size={14} fill="#F4F1E6" />}>
          <Place x={200} y={290} s={0.44} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          {[
            { x: 50, el: <Wolf mood="joy" wag />, tap: TAP.hawi },
            { x: 110, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan },
            { x: 290, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben },
            { x: 350, el: <Cub mood="joy" arm="up" />, tap: TAP.cub },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={294} s={0.32} className="lali-hop" tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <Sparkles x={200} y={180} r={60} delay={1} />
        </Room>
      );
  }
}
