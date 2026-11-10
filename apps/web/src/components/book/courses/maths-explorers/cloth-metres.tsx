"use client";

import "./cloth-metres.css";

import { useId, type ReactNode } from "react";

import { Daisy, Place, vars } from "../../scenery";
import { AuntieSheep, Gugu, Mama, TAP, Tsehay } from "./kit-cast";
import { d, Land, Market, r1 } from "./kit";
import { Label, Mark, SumCard } from "./kit-maths";
import { Cloth, Measure, MetreStick, Ribbon, Ruler } from "./kit-measure";
import { Home } from "./kit-places";

/*
  "Metres of Cloth": one living picture per page (12 pages) at Auntie Sheep's cloth stall and
  at home. The metre stick (striped every 10 cm) is laid end after end along the cloth; the
  centimetre ruler measures small things from 0. Story keyframes: cm-* in ./cloth-metres.css.
*/

function Stall({ id, children }: { id: string; children: ReactNode }) {
  return (
    <g>
      <Market id={id} />
      <g>
        {[
          ["#FFFDF4", "#2E9A5A"],
          ["#F5D27A", "#E2463F"],
          ["#7FC8F0", "#F5B21E"],
          ["#FFFDF4", "#E2463F"],
        ].map(([c, b], i) => (
          <g key={i} transform={`translate(${70 + i * 22} 120)`}>
            <rect x={0} y={0} width={18} height={70} fill={c} stroke="#D9CBB4" />
            <rect x={0} y={60} width={18} height={4} fill={b} />
          </g>
        ))}
      </g>
      <rect x={40} y={200} width={320} height={10} rx={3} fill="#8A5A36" />
      {children}
    </g>
  );
}

/** A hand span: an open hand drawn flat, `w` across. Left at (x, y). */
function Span({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M0 0 Q${w / 2} -10 ${w} 0`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={0} r={3} fill={color} />
      <circle cx={w} cy={0} r={3} fill={color} />
    </g>
  );
}

export default function ClothMetres({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // New Year is coming: Auntie Sheep's stall full of rolls of cloth.
    case 0:
      return (
        <Stall id={id}>
          <Cloth x={160} y={186} len={150} />
          <Place x={330} y={296} s={0.38} flip tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <Place x={70} y={296} s={0.36} from={[-40, 296]} tap={TAP.mama}>
            <Mama mood="happy" />
          </Place>
          <Place x={140} y={298} s={0.3} from={[0, 298]} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
        </Stall>
      );
    // "This much!" Tsehay's arms and Auntie Sheep's arms are not the same.
    case 1:
      return (
        <Stall id={id}>
          <g className="lali-fade-in" style={d(0.8)}>
            <path d="M80 150 H170" stroke="#2F5BD3" strokeWidth={5} strokeLinecap="round" />
            <Label x={125} y={140} text="?" size={20} color="#2F5BD3" delay={null} />
          </g>
          <g className="lali-fade-in" style={d(1.6)}>
            <path d="M200 140 H340" stroke="#E8513B" strokeWidth={5} strokeLinecap="round" />
            <Label x={270} y={130} text="?" size={20} color="#E8513B" delay={null} />
          </g>
          <Mark x={200} y={96} ok={false} delay={2.4} />
          <Place x={120} y={296} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Place x={290} y={296} s={0.4} flip tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
        </Stall>
      );
    // Hand spans: six for Gugu, eight for Tsehay, on the same table.
    case 2:
      return (
        <Stall id={id}>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={`g${i}`} className="lali-pop-in" style={d(0.6 + i * 0.3)}>
              <Span x={r1(70 + i * 43)} y={188} w={43} color="#8A5A36" />
            </g>
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <g key={`t${i}`} className="lali-pop-in" style={d(2.6 + i * 0.25)}>
              <Span x={r1(70 + i * 32.25)} y={170} w={32.25} color="#2F5BD3" />
            </g>
          ))}
          <Label x={140} y={244} text="6" size={26} color="#8A5A36" delay={2.4} />
          <Label x={260} y={244} text="8" size={26} color="#2F5BD3" delay={4.8} />
          <Place x={60} y={298} s={0.3} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Place x={340} y={298} s={0.3} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </Stall>
      );
    // The metre stick: the same everywhere in the world.
    case 3:
      return (
        <Stall id={id}>
          <g className="lali-pop-in" style={d(0.8)}>
            <MetreStick x={110} y={170} w={180} />
          </g>
          <Measure x={200} y={130} n={1} unit="m" delay={1.6} />
          <Place x={330} y={296} s={0.38} flip tap={TAP.sheep}>
            <AuntieSheep mood="happy" />
          </Place>
          <Place x={70} y={298} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
        </Stall>
      );
    // One metre, two metres, three metres: start right at the end.
    case 4:
      return (
        <Stall id={id}>
          <Cloth x={60} y={176} len={270} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <g className="cm-lay" style={d(0.8 + i * 1)}>
                <MetreStick x={60 + i * 90} y={150} w={90} />
              </g>
              <Measure x={105 + i * 90} y={118} n={i + 1} unit="m" delay={1.3 + i * 1} size={16} color="#E8513B" />
            </g>
          ))}
          <Place x={350} y={298} s={0.32} flip tap={TAP.sheep}>
            <AuntieSheep mood="happy" />
          </Place>
        </Stall>
      );
    // Two metres for the dress and one for the scarf: 2 m + 1 m = 3 m.
    case 5:
      return (
        <Stall id={id}>
          <Cloth x={70} y={176} len={170} />
          <g className="cm-slide">
            <Cloth x={250} y={176} len={80} color="#FFFDF4" />
          </g>
          <SumCard x={200} y={110} tokens={["2 m", "+", "1 m", "=", "3 m"]} start={1.4} size={22} hl={{ 4: "#E8513B" }} />
          <Place x={60} y={298} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={340} y={296} s={0.36} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
        </Stall>
      );
    // Two ribbons, ends lined up: the yellow is longer, the green is shorter.
    case 6:
      return (
        <Stall id={id}>
          <path d="M90 120 V190" stroke="#1B2A4E" strokeWidth={2} strokeDasharray="4 3" />
          <g className="cm-in" style={vars({ "--fx": "40px" })}>
            <Ribbon x={90} y={140} len={210} color="#F5B21E" />
          </g>
          <g className="cm-in" style={vars({ "--fx": "-30px", "--delay": "1.2s" })}>
            <Ribbon x={90} y={170} len={130} color="#2E9A5A" />
          </g>
          <Mark x={330} y={140} ok delay={2.6} s={0.7} />
          <Place x={330} y={298} s={0.3} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
        </Stall>
      );
    // A ruler in centimetres: the pencil is 15 cm. 100 cm make 1 m.
    case 7:
      return (
        <Stall id={id}>
          <Ruler x={70} y={170} w={260} to={20} every={5} />
          <g className="cm-in" style={vars({ "--fx": "0px", "--fy": "-30px" })}>
            <path d="M70 160 H253 L265 156 L253 152 H70Z" fill="#F5B21E" stroke="#B8902A" />
            <path d="M253 152 L265 156 L253 160Z" fill="#E8D2A6" />
          </g>
          <Measure x={160} y={124} n={15} unit="cm" delay={1.8} />
          <Label x={200} y={244} text="100 cm = 1 m" size={20} color="#E8513B" delay={2.8} />
        </Stall>
      );
    // A button is 2 cm; Gugu's tail is 40 cm.
    case 8:
      return (
        <Stall id={id}>
          <Ruler x={70} y={170} w={260} to={20} every={5} />
          <g className="lali-pop-in" style={d(0.8)}>
            <circle cx={83} cy={158} r={13} fill="#E2463F" />
            <circle cx={79} cy={156} r={1.6} fill="#fff" />
            <circle cx={87} cy={156} r={1.6} fill="#fff" />
          </g>
          <Measure x={110} y={120} n={2} unit="cm" delay={1.4} size={18} />
          <Measure x={280} y={120} n={40} unit="cm" delay={2.6} size={18} color="#8A5A36" />
          <Place x={330} y={298} s={0.32} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Stall>
      );
    // {name}: the ribbon starts at 0 and ends at 12: twelve centimetres.
    case 9:
      return (
        <Stall id={id}>
          <Ruler x={70} y={170} w={260} to={20} every={2} />
          <g className="cm-in" style={vars({ "--fx": "60px" })}>
            <Ribbon x={70} y={158} len={156} color="#F5B21E" />
          </g>
          <path d="M70 140 V170 M226 140 V170" stroke="#E8513B" strokeWidth={2} strokeDasharray="4 3" />
          <Measure x={148} y={112} n={12} unit="cm" delay={2} />
        </Stall>
      );
    // At home: two metres, one metre and twelve centimetres, nothing wasted.
    case 10:
      return (
        <Home id={id} shelf={false}>
          <Cloth x={60} y={200} len={150} h={30} />
          <Cloth x={230} y={200} len={80} h={30} />
          <Ribbon x={150} y={240} len={60} color="#F5B21E" />
          <Measure x={130} y={160} n={2} unit="m" delay={0.8} size={16} />
          <Measure x={270} y={160} n={1} unit="m" delay={1.2} size={16} />
          <Measure x={180} y={266} n={12} unit="cm" delay={1.6} size={14} color="#E8513B" />
          <Place x={350} y={300} s={0.36} flip tap={TAP.mama}>
            <Mama mood="happy" />
          </Place>
        </Home>
      );
    // New Year's morning: the new dress among the Meskel daisies.
    case 11:
      return (
        <g>
          <Land id={id} time="dawn" />
          {Array.from({ length: 12 }, (_, i) => (
            <Daisy key={i} x={r1(30 + ((i * 67) % 340))} y={r1(240 + ((i * 29) % 50))} h={22 + (i % 3) * 6} delay={-i * 0.3} />
          ))}
          <g className="cm-twirl">
            <Place x={200} y={290} s={0.42} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
          </g>
          <Place x={320} y={292} s={0.38} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
        </g>
      );
    default:
      return null;
  }
}
