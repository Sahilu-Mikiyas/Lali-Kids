"use client";

import "./mirror-wings.css";

import { useId, type ReactNode } from "react";

import { Daisy, Flower, Place, vars } from "../../scenery";
import { Camel, Mama, TAP, Tsehay } from "./kit-cast";
import { d, r1 } from "./kit";
import { Mark } from "./kit-maths";
import { Butterfly2, Tibeb } from "./kit-measure";
import { Fence, Yard } from "./kit-places";

/*
  "Mirror Wings": one living picture per page (12 pages) in Tsehay's garden after the rains.
  Butterflies, paint prints and the tibeb border all show a dashed blue line of symmetry; the
  half that is copied appears by unfolding (a horizontal flip about the line).
*/

function Garden({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Yard id={id} time="day" house tree fig={360}>
      {Array.from({ length: 9 }, (_, i) => (
        <Flower key={i} x={r1(30 + i * 40)} y={290 - (i % 2) * 10} h={24 + (i % 3) * 6} color={["#FF6FA0", "#F5B21E", "#E2463F"][i % 3]} delay={-i * 0.4} />
      ))}
      {children}
    </Yard>
  );
}

const Line = ({ x, y1, y2, delay = 1 }: { x: number; y1: number; y2: number; delay?: number }) => (
  <g className="lali-fade-in" style={vars({ "--delay": `${delay}s`, "--dur": "0.6s" })}>
    <path d={`M${x} ${y1} V${y2}`} stroke="#2F5BD3" strokeWidth={2.6} strokeDasharray="6 5" />
  </g>
);

/** A sheet of paper with a paint blot butterfly: one half painted, the other appearing as it unfolds. */
function PaintPrint({ x, y, unfold = 1.6 }: { x: number; y: number; unfold?: number }) {
  const half = (
    <g>
      <path d="M0 -6 C-24 -34 -54 -24 -48 -4 C-42 10 -16 8 0 0Z" fill="#E2463F" />
      <path d="M0 2 C-16 6 -36 18 -28 30 C-20 40 -4 24 0 8Z" fill="#F5B21E" />
      <circle cx={-30} cy={-12} r={6} fill="#2F5BD3" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-70} y={-50} width={140} height={100} rx={4} fill="#FFFDF4" stroke="#C9C2B4" />
      {half}
      <g transform="scale(-1 1)">
        <g className="mw-unfold" style={d(unfold)}>
          {half}
        </g>
      </g>
      <path d="M0 -50 V50" stroke="#C9C2B4" strokeWidth={1} />
    </g>
  );
}

export default function MirrorWings({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // After the rains: flowers and butterflies; Ayan and Abdi tiptoe after one.
    case 0:
      return (
        <Garden id={id}>
          <g className="mw-flutter">
            <Butterfly2 x={220} y={120} s={1} />
          </g>
          <Place x={90} y={296} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" walk />
          </Place>
          <Place x={150} y={300} s={0.36} tap={TAP.ayan}>
            <Camel who="abdi" mood="wow" walk />
          </Place>
        </Garden>
      );
    // The butterfly lands: the left wing is just like the right wing.
    case 1:
      return (
        <Garden id={id}>
          <Daisy x={200} y={250} h={70} s={1.4} />
          <Butterfly2 x={200} y={140} s={2} flap={false} />
          <Place x={70} y={296} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
        </Garden>
      );
    // The line of symmetry down the middle.
    case 2:
      return (
        <Garden id={id}>
          <Butterfly2 x={200} y={140} s={2} flap={false} />
          <Line x={200} y1={60} y2={230} delay={1} />
          <Place x={340} y={296} s={0.3} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Garden>
      );
    // Fold, paint one half, press, open: a paper butterfly with matching wings.
    case 3:
      return (
        <Garden id={id}>
          <PaintPrint x={200} y={140} unfold={1.6} />
          <Line x={200} y1={84} y2={196} delay={3} />
          <Place x={70} y={296} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </Garden>
      );
    // Faces are nearly symmetrical too.
    case 4:
      return (
        <Garden id={id}>
          <Place x={130} y={290} s={0.5} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={290} y={296} s={0.36} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={d(1)}>
            <g transform="translate(200 100)">
              <circle r={36} fill="#FFFDF4" stroke="#C9C2B4" />
              <circle cx={-12} cy={-6} r={4} fill="#1B2A4E" />
              <circle cx={12} cy={-6} r={4} fill="#1B2A4E" />
              <path d="M0 -2 V8 M-10 16 Q0 22 10 16" stroke="#1B2A4E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            </g>
          </g>
          <Line x={200} y1={56} y2={144} delay={1.8} />
        </Garden>
      );
    // The tibeb border on Mama's netela matches on both sides of its middle.
    case 5:
      return (
        <Garden id={id}>
          <rect x={60} y={100} width={280} height={110} fill="#FFFDF4" />
          <Tibeb x={60} y={196} w={280} h={28} />
          <Line x={200} y1={92} y2={222} delay={1.4} />
          <Place x={350} y={296} s={0.34} flip tap={TAP.mama}>
            <Mama mood="happy" />
          </Place>
        </Garden>
      );
    // A torn paper: the halves don't match. Not symmetrical!
    case 6:
      return (
        <Garden id={id}>
          <path d="M150 80 L250 80 L262 120 L240 150 L268 200 L150 200 L140 150 Z" fill="#FFFDF4" stroke="#C9C2B4" />
          <Line x={200} y1={70} y2={210} delay={1} />
          <Mark x={300} y={90} ok={false} delay={1.8} />
          <Place x={80} y={300} s={0.36} tap={TAP.ayan}>
            <Camel who="abdi" mood="worried" />
          </Place>
        </Garden>
      );
    // Half a butterfly and a mirror on the line: the whole butterfly appears.
    case 7:
      return (
        <Garden id={id}>
          <Butterfly2 x={200} y={140} s={2} half flap={false} />
          <g className="lali-fade-in" style={vars({ "--delay": "1.4s", "--dur": "1s" })}>
            <g transform="translate(200 140) scale(-2 2)" opacity={0.6}>
              <path d="M0 -4 C-20 -30 -46 -22 -40 -4 C-36 8 -14 6 0 0Z" fill="#F5961E" />
              <path d="M0 2 C-14 6 -30 16 -24 26 C-18 34 -4 20 0 6Z" fill="#F5961E" opacity={0.85} />
              <circle cx={-26} cy={-10} r={5} fill="#2F5BD3" />
              <circle cx={-16} cy={18} r={3.4} fill="#2F5BD3" />
            </g>
          </g>
          <rect x={198} y={60} width={6} height={170} rx={2} fill="#B8D4E4" stroke="#7AA8C8" />
          <Place x={70} y={296} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </Garden>
      );
    // {name}: finish Abdi's butterfly: a big spot near the top, a small one at the bottom.
    case 8:
      return (
        <Garden id={id}>
          <Butterfly2 x={200} y={140} s={2} half flap={false} />
          <g transform="translate(200 140) scale(-2 2)">
            <path d="M0 -4 C-20 -30 -46 -22 -40 -4 C-36 8 -14 6 0 0Z" fill="none" stroke="#F5961E" strokeWidth={1} strokeDasharray="3 2" />
            <path d="M0 2 C-14 6 -30 16 -24 26 C-18 34 -4 20 0 6Z" fill="none" stroke="#F5961E" strokeWidth={1} strokeDasharray="3 2" />
            <g className="lali-pop-in" style={d(1.6)}>
              <circle cx={-26} cy={-10} r={5} fill="#2F5BD3" />
            </g>
            <g className="lali-pop-in" style={d(2.4)}>
              <circle cx={-16} cy={18} r={3.4} fill="#2F5BD3" />
            </g>
          </g>
          <Line x={200} y1={60} y2={230} delay={0.6} />
        </Garden>
      );
    // A folded strip, half a person cut out: a whole row of paper friends.
    case 9:
      return (
        <Garden id={id}>
          {Array.from({ length: 5 }, (_, i) => (
            <g key={i} transform={`translate(${r1(100 + i * 50)} 170)`}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.3)}>
                <circle cx={0} cy={-34} r={10} fill="#FFFDF4" stroke="#C9C2B4" />
                <path d="M-14 -22 H14 L12 0 H-12Z M-25 -20 H25 V-14 H-25Z M-10 0 V24 H-2 V0 M2 0 V24 H10 V0" fill="#FFFDF4" stroke="#C9C2B4" />
              </g>
            </g>
          ))}
          <Place x={350} y={296} s={0.46} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </Garden>
      );
    // Paper butterflies and friends on the fence, dancing in the wind.
    case 10:
      return (
        <Garden id={id}>
          <Fence y={250} from={20} to={380} />
          {[80, 160, 240, 320].map((x, i) => (
            <g key={x} className="mw-sway" style={vars({ "--delay": `${-i * 0.4}s` })}>
              <Butterfly2 x={x} y={200} s={0.7} flap={false} colors={i % 2 ? ["#E2463F", "#F5B21E"] : ["#F5961E", "#2F5BD3"]} />
            </g>
          ))}
        </Garden>
      );
    // A real butterfly lands on a paper one: twins!
    case 11:
      return (
        <Garden id={id}>
          <PaintPrint x={200} y={150} unfold={0} />
          <g className="mw-land">
            <Butterfly2 x={200} y={150} s={0.6} />
          </g>
          <Place x={70} y={296} s={0.46} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.36} flip tap={TAP.ayan}>
            <Camel who="abdi" mood="joy" />
          </Place>
        </Garden>
      );
    default:
      return null;
  }
}
