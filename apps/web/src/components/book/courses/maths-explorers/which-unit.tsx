"use client";

import "./which-unit.css";

import { useId, type ReactNode } from "react";

import { BeeHover, Place, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { d, r1, Scale } from "./kit";
import { Label, Mark } from "./kit-maths";
import { Jug, Measure, MetreStick, Pumpkin, Ruler, Weight } from "./kit-measure";
import { Yard } from "./kit-places";
import { Notes } from "./kit-props";

/*
  "Gugu Measures Everything": one living picture per page (12 pages) in the school garden.
  Each measuring job shows its tool (tape, scale, jug, ruler) and the answer with its unit.
*/

function Garden({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Yard id={id} house={false} tree fig={50}>
      <rect x={150} y={232} width={190} height={22} rx={6} fill="#7A5232" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${170 + i * 30} 236 q-4 -10 0 -16 q4 6 0 16`} fill="#4EA05A" />
      ))}
      {children}
    </Yard>
  );
}

/** A blue plastic water drum, base centred at (x, y). */
function Drum({ x, y, s = 1, ruler = false }: { x: number; y: number; s?: number; ruler?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-24 0 V-60 H24 V0Z" fill="#2F6FD0" />
      <ellipse cx={0} cy={-60} rx={24} ry={6} fill="#5B8FE0" />
      <ellipse cx={0} cy={-60} rx={18} ry={4} fill="#9ED8FF" />
      <path d="M-24 -20 H24 M-24 -40 H24" stroke="#1B4FA0" strokeWidth={2} />
      {ruler && <rect x={4} y={-86} width={7} height={46} fill="#F5D27A" stroke="#B8902A" transform="rotate(8)" />}
    </g>
  );
}

export default function WhichUnit({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Garden day: a tape, a ruler, a scale and a jug; Gugu grabs the ruler.
    case 0:
      return (
        <Garden id={id}>
          <g transform="translate(200 150)">
            <g className="lali-pop-in" style={d(0.6)}>
              <MetreStick x={-130} y={0} w={60} />
            </g>
            <g className="lali-pop-in" style={d(0.9)}>
              <Ruler x={-50} y={-10} w={50} to={10} every={5} />
            </g>
            <g className="lali-pop-in" style={d(1.2)}>
              <Weight x={40} y={10} s={1.4} />
            </g>
            <g className="lali-pop-in" style={d(1.5)}>
              <Jug x={100} y={14} s={0.6} />
            </g>
          </g>
          <Place x={80} y={300} s={0.34} tap={TAP.mama}>
            <Teacher mood="happy" pose="wave" />
          </Place>
          <Place x={330} y={298} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Garden>
      );
    // "I'll measure everything!" A leaf 6 cm, a beetle 2 cm.
    case 1:
      return (
        <Garden id={id}>
          <Ruler x={80} y={146} w={240} to={10} every={1} />
          <path d="M80 136 Q130 112 152 136 Q130 152 80 136Z" fill="#4EA05A" className="lali-pop-in" style={d(0.6)} />
          <Measure x={150} y={104} n={6} unit="cm" delay={1.2} size={16} />
          <g className="lali-pop-in" style={d(2)}>
            <ellipse cx={104} cy={196} rx={24} ry={10} fill="#2A2420" />
          </g>
          <Measure x={260} y={196} n={2} unit="cm" delay={2.4} size={16} />
          <Place x={350} y={298} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Garden>
      );
    // A ruler in the water drum: how much does it hold? Nobody knows.
    case 2:
      return (
        <Garden id={id}>
          <Drum x={200} y={240} s={1.5} ruler />
          <Mark x={280} y={120} ok={false} delay={1.6} />
          <Label x={200} y={110} text="?" size={30} color="#E8513B" delay={1} />
          <Place x={70} y={298} s={0.3} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Place x={340} y={298} s={0.3} flip className="wu-giggle" tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Garden>
      );
    // Long, heavy, or how much does it hold? Then choose the tool.
    case 3:
      return (
        <Garden id={id}>
          {[
            [100, <MetreStick key="m" x={-30} y={0} w={60} />],
            [200, <Weight key="w" x={0} y={12} s={1.4} />],
            [300, <Jug key="j" x={0} y={18} s={0.6} />],
          ].map(([x, tool], i) => (
            <g key={i} transform={`translate(${x as number} 120)`}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.6)}>
                <circle r={34} fill="#FFFDF4" stroke="#2F5BD3" strokeWidth={2} />
                {tool as ReactNode}
              </g>
            </g>
          ))}
          <Place x={200} y={300} s={0.36} tap={TAP.mama}>
            <Teacher mood="happy" pose="point" />
          </Place>
        </Garden>
      );
    // The garden bed is long: the tape says 4 metres.
    case 4:
      return (
        <Garden id={id}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 0.5)}>
                <MetreStick x={150 + i * 47.5} y={222} w={47.5} />
              </g>
              <Label x={174 + i * 47.5} y={206} text={String(i + 1)} size={14} color="#E8513B" delay={0.8 + i * 0.5} />
            </g>
          ))}
          <Measure x={245} y={150} n={4} unit="m" delay={2.8} />
          <Place x={100} y={298} s={0.3} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={50} y={298} s={0.28} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </Garden>
      );
    // The pumpkin is heavy: 3 kilograms on the scale.
    case 5:
      return (
        <Garden id={id}>
          <Scale x={200} y={250} left={<Pumpkin s={1.2} />} right={<g>{[0, 1, 2].map((i) => <Weight key={i} x={(i - 1) * 15} s={0.75} />)}</g>} tilt={0} from={-12} delay={1} />
          <Measure x={200} y={110} n={3} unit="kg" delay={2.2} />
          <Place x={350} y={298} s={0.3} flip tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
        </Garden>
      );
    // Ayan fills the drum with the jug: fifty litres.
    case 6:
      return (
        <Garden id={id}>
          <Drum x={220} y={240} s={1.5} />
          <g className="wu-pour">
            <Jug x={150} y={170} s={0.8} fill={1} liquid="#9ED8FF" />
          </g>
          <Measure x={220} y={110} n={50} unit="L" delay={2} />
          <Place x={80} y={298} s={0.3} tap={TAP.ayan}>
            <Camel who="ayan" mood="joy" />
          </Place>
        </Garden>
      );
    // The ruler for the seedlings: 8 centimetres tall.
    case 7:
      return (
        <Garden id={id}>
          <g transform="translate(200 230) rotate(-90)">
            <Ruler x={0} y={0} w={120} to={10} every={2} />
          </g>
          <g transform="translate(180 230)">
            <path d="M0 0 V-96" stroke="#3E8A3A" strokeWidth={3} />
            <path d="M0 -60 q-16 -6 -20 -18 q14 0 20 18 M0 -80 q16 -6 20 -18 q-14 0 -20 18" fill="#4EA05A" />
          </g>
          <Measure x={290} y={140} n={8} unit="cm" delay={1.4} />
          <Place x={70} y={298} s={0.32} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Garden>
      );
    // The game: potatoes kilograms, rope metres, bucket litres.
    case 8:
      return (
        <Garden id={id}>
          <Measure x={100} y={110} n="?" unit="kg" delay={0.8} size={18} />
          <Measure x={200} y={90} n="?" unit="m" delay={1.6} size={18} />
          <Measure x={300} y={110} n="?" unit="L" delay={2.4} size={18} />
          <Place x={200} y={300} s={0.34} tap={TAP.mama}>
            <Teacher mood="joy" pose="wave" />
          </Place>
          <Place x={80} y={298} s={0.26} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={320} y={298} s={0.26} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </Garden>
      );
    // {name}: a pencil cm, a sack kg, a jerrycan L.
    case 9:
      return (
        <Garden id={id}>
          <Measure x={100} y={110} n="" unit="cm" delay={0.8} size={24} />
          <Measure x={200} y={110} n="" unit="kg" delay={1.6} size={24} color="#C98A0A" />
          <Measure x={300} y={110} n="" unit="L" delay={2.4} size={24} color="#2E9A5A" />
          <BeeHover x={200} y={180} s={1.2} />
        </Garden>
      );
    // The class board: 4 m, 3 kg, 50 L, 8 cm.
    case 10:
      return (
        <Garden id={id}>
          <rect x={90} y={60} width={220} height={110} rx={6} fill="#2E4A3A" stroke="#8A5A3A" strokeWidth={6} />
          {["4 m", "3 kg", "50 L", "8 cm"].map((t, i) => (
            <g key={t} className="lali-fade-in" style={vars({ "--delay": `${r1(0.6 + i * 0.6)}s`, "--dur": "0.6s" })}>
              <text x={i % 2 ? 250 : 150} y={i < 2 ? 104 : 148} fontSize={26} fontFamily="var(--font-grandstander), sans-serif" fontWeight={900} fill="#F4F4EC" textAnchor="middle">
                {t}
              </text>
            </g>
          ))}
          <Place x={350} y={300} s={0.32} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
        </Garden>
      );
    // "Next time I'll ask the question first." A little dance in the garden.
    case 11:
      return (
        <Garden id={id}>
          <g className="wu-dance">
            <Place x={200} y={296} s={0.36} tap={TAP.gugu}>
              <Gugu mood="joy" pose="hop" />
            </Place>
          </g>
          <Notes x={240} y={190} color="#E8513B" />
          <Place x={330} y={298} s={0.3} flip tap={TAP.mama}>
            <Teacher mood="joy" />
          </Place>
        </Garden>
      );
    default:
      return null;
  }
}
