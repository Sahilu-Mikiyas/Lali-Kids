"use client";

import "./the-note-detectives.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Grandma, TAP } from "./kit-cast";
import { Fence, Yard } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { Note, Pop, Txt, WordCard, r1 } from "./kit-read";
import { Thing } from "./things";

/*
  "The Note Detectives": one living picture per page (12 pages), all in Grandma's yard and back
  yard: the hen house, the gate, the well, the fence and the woodpile. Each note is drawn on the
  page with its question word beside it in a coloured card (when, where, what, why), so the
  child sees which question each note answers.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and tnd-* (./the-note-detectives.css).
*/

const Q = { who: "#8A4FB0", what: "#2E9A5B", where: "#2F7FB8", when: "#C2410C", why: "#D9822B" };

/** A question-word card in its colour. */
function Ask({ text, x, y, color, delay = 1.6, glow = true }: { text: string; x: number; y: number; color: string; delay?: number; glow?: boolean }) {
  return <WordCard text={text} x={x} y={y} size={22} color={color} paper="#FFFFFF" delay={delay} glow={glow} />;
}

/** A magnifying glass, held up. */
function Glass({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M8 8 L22 22" stroke="#7A4A26" strokeWidth={6} strokeLinecap="round" />
      <circle r={12} fill="#DDF2FF" fillOpacity={0.6} stroke="#4A4A5A" strokeWidth={4} />
    </g>
  );
}

/** The little hen house: a hut with an open door and the hen's basket. */
function HenHouse({ x, y, empty = true }: { x: number; y: number; empty?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-46 -60 L0 -96 L46 -60Z" fill="#B07A44" stroke="#7A4A26" strokeWidth={2} />
      <rect x={-40} y={-60} width={80} height={60} fill="#E3B77C" stroke="#9A6E44" strokeWidth={2} />
      <rect x={-16} y={-40} width={32} height={40} rx={4} fill="#5A3A26" />
      <g transform="translate(0 -6)">
        <path d="M-14 0 Q0 8 14 0 L12 -8 H-12Z" fill="#D9A04A" stroke="#8A5A2E" strokeWidth={1.4} />
        {!empty && <Thing id="hen" y={-14} s={0.3} />}
      </g>
    </g>
  );
}

/** The well: a round stone wall with a bucket on a rope. */
function Well({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-30 -56 V-30 M30 -56 V-30 M-36 -58 H36" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
      <path d="M0 -58 V-40" stroke="#5A4A3A" strokeWidth={1.6} />
      <rect x={-7} y={-40} width={14} height={11} rx={2} fill="#8A97A8" />
      <ellipse cx={0} cy={-30} rx={36} ry={9} fill="#2A3A4A" />
      <path d="M-36 -30 V0 Q0 10 36 0 V-30" fill="#9C98A6" />
      <path d="M-36 -18 Q0 -8 36 -18 M-20 -30 V0 M8 -28 V4" stroke="#7E7A8C" strokeWidth={2} fill="none" />
    </g>
  );
}

/** A pile of firewood logs. */
function Woodpile({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[
        [-36, 0],
        [-12, 0],
        [12, 0],
        [36, 0],
        [-24, -20],
        [0, -20],
        [24, -20],
        [-12, -40],
        [12, -40],
      ].map(([dx, dy], i) => (
        <g key={i}>
          <circle cx={dx} cy={dy - 10} r={11} fill="#9A6236" stroke="#6E4024" strokeWidth={2} />
          <circle cx={dx} cy={dy - 10} r={5} fill="none" stroke="#C99A64" strokeWidth={1.6} />
        </g>
      ))}
    </g>
  );
}

/** The red hen on her round straw nest; `chicks` peep out around her. */
function Nest({ x, y, s = 1, eggs = false, chicks = 0, children }: { x: number; y: number; s?: number; eggs?: boolean; chicks?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={44} ry={12} fill="#E3C46A" />
      <g stroke="#C9A040" strokeWidth={2} fill="none">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${-40 + i * 10} 4 q4 -8 8 -2`} />
        ))}
      </g>
      {eggs && (
        <g>
          {[-16, 0, 16].map((dx) => (
            <ellipse key={dx} cx={dx} cy={-4} rx={7} ry={9} fill="#F6E7D2" stroke="#C9B48E" strokeWidth={1.2} />
          ))}
        </g>
      )}
      <g className={chicks ? undefined : "tnd-sit"}>
        <Thing id="hen" y={eggs ? -30 : -24} s={0.85} />
      </g>
      {Array.from({ length: chicks }, (_, i) => {
        const a = -1.2 + (i / Math.max(1, chicks - 1)) * 2.4;
        return (
          <g key={i} transform={`translate(${r1(Math.sin(a) * 58)} ${r1(10 + Math.cos(a) * 6)})`}>
            <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.6 + i * 0.3)}s` })}>
              <g className="lali-hop" style={vars({ "--delay": `${r1(-i * 0.3)}s`, "--dur": "1.2s" })}>
                <Thing id="chick" s={0.3} />
              </g>
            </g>
          </g>
        );
      })}
      {children}
    </g>
  );
}

export default function TheNoteDetectives({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Grandma looks into the hen house. The red hen's basket is empty! "Where is my red hen?"
    case 0:
      return (
        <Yard id={id} time="morning" house={false}>
          <HenHouse x={250} y={240} />
          <Sign x={250} y={120} kind="?" delay={1} />
          <Place x={120} y={292} s={0.5} tap={TAP.grandma}>
            <Grandma mood="worried" />
          </Place>
          <BeeHover x={340} y={170} s={0.7} flip />
          <Air kind="day" seed={3} />
        </Yard>
      );
    // "We'll be detectives. Detectives ask questions: ማን? ምን? የት? መቼ?"
    case 1:
      return (
        <Yard id={id} time="morning">
          <Ask text="ማን?" x={70} y={70} color={Q.who} delay={0.6} glow={false} />
          <Ask text="ምን?" x={160} y={60} color={Q.what} delay={0.9} glow={false} />
          <Ask text="የት?" x={250} y={60} color={Q.where} delay={1.2} glow={false} />
          <Ask text="መቼ?" x={340} y={70} color={Q.when} delay={1.5} glow={false} />
          <Place x={150} y={292} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<Glass s={0.9} />} />
          </Place>
          <Place x={270} y={292} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={5} />
        </Yard>
      );
    // On the gate, a note from Tsehay: ዶሮዋን ጧት አየኋት። "መቼ? ጧት: in the morning!"
    case 2:
      return (
        <Yard id={id} time="morning">
          <Fence y={238} from={-10} to={410} gate={200} />
          <Note lines={["ዶሮዋን ጧት", "አየኋት።"]} x={200} y={150} w={120} size={17} delay={0.4} />
          <Ask text="መቼ?" x={320} y={90} color={Q.when} delay={1.8} />
          <Txt text="ጧት" x={320} y={130} size={20} fill={Q.when} />
          <Place x={90} y={294} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={300} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub mood="happy" arm="reach" item={<Glass s={0.8} />} />
          </Place>
          <Air kind="day" seed={7} />
        </Yard>
      );
    // By the well, from Gugu: ዶሮዋ ወደ ጓሮ ሄደች። "የት? ጓሮ, the back yard!"
    case 3:
      return (
        <Yard id={id} time="day">
          <Well x={250} y={250} />
          <Note lines={["ዶሮዋ ወደ ጓሮ", "ሄደች።"]} x={250} y={130} w={130} size={17} delay={0.4} tilt={2} />
          <Ask text="የት?" x={90} y={90} color={Q.where} delay={1.8} />
          <Txt text="ጓሮ" x={90} y={130} size={20} fill={Q.where} />
          <Place x={110} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<Glass s={0.8} />} />
          </Place>
          <Place x={350} y={294} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Air kind="day" seed={9} />
        </Yard>
      );
    // In the back yard, from Haben: ዶሮዋ ገለባ ተሸከመች። "ምን? Straw! But why would a hen carry straw?"
    case 4:
      return (
        <Yard id={id} time="day" house={false}>
          <Fence y={210} from={-10} to={410} />
          <Note lines={["ዶሮዋ ገለባ", "ተሸከመች።"]} x={200} y={150} w={120} size={17} delay={0.4} tilt={-2} />
          <Ask text="ምን?" x={320} y={80} color={Q.what} delay={1.8} />
          <Txt text="ገለባ" x={320} y={120} size={20} fill={Q.what} />
          <g stroke="#E3C46A" strokeWidth={2.4} strokeLinecap="round">
            {[
              [150, 262],
              [180, 270],
              [214, 258],
              [250, 268],
            ].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y} l14 -4`} />
            ))}
          </g>
          <Place x={90} y={294} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Sign x={90} y={176} kind="?" delay={2.4} />
          <Place x={320} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Air kind="day" seed={11} />
        </Yard>
      );
    // Anbessa lays the three notes side by side. In the morning… to the back yard… straw… "She's making something!"
    case 5:
      return (
        <Yard id={id} time="day" house={false}>
          <Note lines={["ጧት"]} x={90} y={90} w={84} size={18} delay={0.4} tilt={-4} />
          <Note lines={["ጓሮ"]} x={200} y={80} w={84} size={18} delay={0.8} />
          <Note lines={["ገለባ"]} x={310} y={90} w={84} size={18} delay={1.2} tilt={4} />
          <g className="lali-fade-in" style={vars({ "--delay": "1.8s" })}>
            <path d="M134 90 H156 M244 90 H266" stroke="#2F7FB8" strokeWidth={3} strokeLinecap="round" />
            <path d="M150 84 L157 90 L150 96 M260 84 L267 90 L260 96" stroke="#2F7FB8" strokeWidth={3} fill="none" strokeLinecap="round" />
          </g>
          <g transform="translate(200 150)">
            <Pop delay={2.4}>
              <circle r={22} fill="#FFFDF6" stroke="#E3C46A" strokeWidth={3} />
              <Txt text="!" x={0} y={9} size={26} fill="#C2410C" />
            </Pop>
          </g>
          <Place x={200} y={294} s={0.5} tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Place x={330} y={294} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Air kind="day" seed={13} />
        </Yard>
      );
    // They tiptoe round. Behind the woodpile, a soft, sleepy clucking. Ayan peeks round the corner.
    case 6:
      return (
        <Yard id={id} time="day" house={false}>
          <Woodpile x={250} y={258} />
          <g transform="translate(300 200)">
            <g className="tnd-cluck">
              <path d="M0 0 q6 -6 12 0 M4 -10 q6 -6 12 0" stroke="#7A4A26" strokeWidth={2} fill="none" />
            </g>
          </g>
          <Place x={170} y={294} s={0.44} className="tnd-tiptoe" tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Place x={80} y={294} s={0.42} className="tnd-tiptoe" tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Air kind="day" seed={15} />
        </Yard>
      );
    // There she is: the red hen, on a round nest of straw! "Found her!" The hen just blinks.
    case 7:
      return (
        <Yard id={id} time="day" house={false}>
          <Woodpile x={90} y={258} />
          <Nest x={240} y={252} s={1.1} />
          <Sparkles x={240} y={210} r={56} delay={1} n={6} />
          <Place x={350} y={294} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={160} y={294} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Air kind="day" seed={17} />
        </Yard>
      );
    // Grandma: "Now I know ለምን! She is sitting on her eggs. She wanted a quiet, secret place."
    case 8:
      return (
        <Yard id={id} time="day" house={false}>
          <Nest x={220} y={252} s={1.1} eggs />
          <Ask text="ለምን?" x={220} y={96} color={Q.why} delay={0.8} />
          <Place x={90} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma mood="joy" arm="bless" />
          </Place>
          <Place x={350} y={294} s={0.4} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <Air kind="day" seed={19} />
        </Yard>
      );
    // "When will the chicks come out?" "In about three weeks." Every day the detectives bring water and grain.
    case 9:
      return (
        <Yard id={id} time="evening" house={false}>
          <Nest x={210} y={252} s={1} />
          <g transform="translate(200 60)">
            {Array.from({ length: 21 }, (_, i) => (
              <g key={i} transform={`translate(${r1(-150 + (i % 11) * 30)} ${i < 11 ? 0 : 30})`}>
                <g className="lali-pop-in" style={vars({ "--delay": `${r1(0.3 + i * 0.12)}s` })}>
                  {i % 2 ? <circle r={8} fill="#FFD233" /> : <path d="M-6 -8 A9 9 0 1 0 6 6 A7 7 0 0 1 -6 -8Z" fill="#F8EDC4" />}
                </g>
              </g>
            ))}
          </g>
          <Place x={90} y={294} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" arm="give" item={<ellipse cx={0} cy={0} rx={9} ry={5} fill="#5BB8E8" />} />
          </Place>
          <Place x={330} y={294} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" />
          </Place>
          <Air kind="dusk" seed={21} />
        </Yard>
      );
    // One morning: peep, peep! Seven fluffy yellow chicks! The red hen proudly leads them out.
    case 10:
      return (
        <Yard id={id} time="morning" house={false}>
          <Nest x={200} y={250} s={1.1} chicks={7} />
          <Place x={70} y={294} s={0.4} className="lali-hop" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={340} y={294} s={0.4} flip className="lali-hop" tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Txt text="7" x={200} y={120} size={40} fill="#E3A511" />
          <Air kind="day" seed={23} />
        </Yard>
      );
    // Ayan writes the last note and pins it on the gate: ዶሮዋ ሰባት ጫጩቶች አሏት!
    default:
      return (
        <Yard id={id} time="day">
          <Fence y={238} from={-10} to={410} gate={160} />
          <Note lines={["ዶሮዋ ሰባት", "ጫጩቶች አሏት!"]} x={160} y={146} w={140} size={17} delay={0.6} pin="#2E9A5B" glow />
          <Nest x={300} y={270} s={0.8} chicks={7} />
          <Place x={60} y={296} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={240} y={296} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={380} y={296} s={0.42} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <BeeHover x={250} y={100} s={0.8} />
        </Yard>
      );
  }
}
