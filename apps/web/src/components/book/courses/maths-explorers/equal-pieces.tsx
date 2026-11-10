"use client";

import "./equal-pieces.css";

import { useId, type ReactNode } from "react";

import { BeeHover, Place } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { d, LATIN } from "./kit";
import { Fraction, Label, Loaf, Mark, Round } from "./kit-maths";
import { Home, Yard } from "./kit-places";
import { Hearts, Mesob } from "./kit-props";

/*
  "Equal Pieces, Please!": one living picture per page (12 pages) in Grandma's house at
  breakfast, and in the yard for the dust-drawing game. Round ambasha and injera are cut with
  lines from the centre (halves, quarters) or with an off-centre cut (not halves); the dabo
  loaf is cut into slices that slide apart; shaded parts and the written fraction (½, ¼, ⅓)
  pop in after the cut. Story keyframes: ep-* in ./equal-pieces.css.
*/

const AMBASHA = "#D9964A";
const INJERA = "#E9C98A";

function Kitchen({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Home id={id} time="morning" shelf>
      {children}
    </Home>
  );
}

/** A round ambasha: golden, with the pattern pressed into its top. */
function Ambasha({ x, y, r = 56, cuts = [], shade = [], chord, at = 1 }: { x: number; y: number; r?: number; cuts?: number[]; shade?: number[]; chord?: number; at?: number }) {
  return (
    <g>
      <Round x={x} y={y} r={r} cuts={cuts} shade={shade} chord={chord} at={at} color={AMBASHA} shadeColor="#F5D27A" eyes={false} />
      <g transform={`translate(${x} ${y})`} stroke="#B8742E" strokeWidth={2} fill="none" opacity={0.55}>
        <circle r={r * 0.32} />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} d={`M${Math.round(Math.cos((a * Math.PI) / 180) * r * 0.4)} ${Math.round(Math.sin((a * Math.PI) / 180) * r * 0.4)} L${Math.round(Math.cos((a * Math.PI) / 180) * r * 0.75)} ${Math.round(Math.sin((a * Math.PI) / 180) * r * 0.75)}`} />
        ))}
      </g>
    </g>
  );
}

/** A plus or equals sign between fractions. */
function Op({ x, y, t, delay }: { x: number; y: number; t: string; delay: number }) {
  return <Label x={x} y={y + 9} text={t} size={28} color="#1B2A4E" delay={delay} />;
}

export default function EqualPieces({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A big round ambasha for Saturday breakfast. "Show me where to cut it in half."
    case 0:
      return (
        <Kitchen id={id}>
          <Mesob x={200} y={250} s={1} rx={70} stews={0} middle={false} />
          <Ambasha x={200} y={214} r={50} />
          <Place x={70} y={300} s={0.4} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
          <Place x={300} y={300} s={0.3} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={360} y={300} s={0.3} flip tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
        </Kitchen>
      );
    // One big piece, one small piece. "That's not a half!"
    case 1:
      return (
        <Kitchen id={id}>
          <g className="ep-apart">
            <Ambasha x={200} y={160} r={70} chord={30} at={0.8} />
          </g>
          <Mark x={300} y={90} ok={false} delay={2} />
          <Label x={150} y={260} text="?" size={30} color="#E2463F" delay={2.2} />
          <Place x={60} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="worried" pose="point" />
          </Place>
          <Place x={340} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
        </Kitchen>
      );
    // Fold the injera edge to edge, cut along the fold: two equal halves. ½.
    case 2:
      return (
        <Kitchen id={id}>
          <g className="ep-fold">
            <Round x={170} y={160} r={72} cuts={[90, 270]} shade={[0]} at={1.4} color={INJERA} />
          </g>
          <Fraction x={300} y={150} top={1} bottom={2} delay={2.6} />
          <Mark x={300} y={230} ok delay={3} />
          <Place x={60} y={300} s={0.36} tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
        </Kitchen>
      );
    // Four of us: fold again, four equal parts. Each is a quarter. ¼.
    case 3:
      return (
        <Kitchen id={id}>
          <Round x={170} y={160} r={72} cuts={[0, 90, 180, 270]} shade={[0]} at={1} color={INJERA} />
          <Fraction x={300} y={150} top={1} bottom={4} delay={2.2} />
          <Place x={340} y={300} s={0.32} flip from={[460, 300]} dur={1.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <BeeHover x={300} y={240} s={1} flip />
          <Place x={50} y={300} s={0.28} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Kitchen>
      );
    // Two quarters make one half.
    case 4:
      return (
        <Kitchen id={id}>
          <Round x={100} y={140} r={52} cuts={[0, 90, 180, 270]} shade={[0, 1]} at={0.6} color={INJERA} />
          <Fraction x={186} y={140} top={1} bottom={4} delay={1.6} size={22} />
          <Op x={216} y={140} t="+" delay={1.8} />
          <Fraction x={246} y={140} top={1} bottom={4} delay={2} size={22} />
          <Op x={276} y={140} t="=" delay={2.4} />
          <Fraction x={308} y={140} top={1} bottom={2} delay={2.8} size={22} color="#E8513B" />
          <Place x={200} y={300} s={0.32} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
        </Kitchen>
      );
    // A long loaf for three. "Halves are for two. For three we need thirds."
    case 5:
      return (
        <Kitchen id={id}>
          <Loaf x={200} y={190} w={220} />
          <g className="lali-fade-in" style={d(1)}>
            <path d="M200 140 V200" stroke="#E2463F" strokeWidth={3} strokeDasharray="6 5" />
          </g>
          <Mark x={200} y={110} ok={false} delay={1.6} s={0.8} />
          <Label x={130} y={240} text="3" size={30} color="#2F5BD3" delay={2.4} />
          <Place x={60} y={300} s={0.36} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={340} y={300} s={0.3} flip tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
        </Kitchen>
      );
    // Three equal slices: each is one third. ⅓.
    case 6:
      return (
        <Kitchen id={id}>
          <Loaf x={190} y={190} w={210} parts={3} gap={14} shade={[0]} at={0.8} />
          <Fraction x={200} y={92} top={1} bottom={3} delay={2.2} />
          <Mark x={270} y={92} ok delay={2.6} s={0.8} />
          <Place x={60} y={300} s={0.32} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
        </Kitchen>
      );
    // Four pieces, all different sizes: not quarters.
    case 7:
      return (
        <Kitchen id={id}>
          <Round x={180} y={160} r={72} cuts={[0, 50, 200, 250]} at={0.8} color={INJERA} />
          <Mark x={300} y={100} ok={false} delay={2} />
          <Place x={330} y={300} s={0.32} flip tap={TAP.cub}>
            <Cub mood="wow" />
          </Place>
          <Place x={60} y={300} s={0.3} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
        </Kitchen>
      );
    // The dust game: equal or not equal?
    case 8:
      return (
        <Yard id={id} house={false}>
          <g stroke="#7A4A26" strokeWidth={3} fill="none" strokeLinecap="round">
            <rect x={64} y={200} width={60} height={60} className="lali-fade-in" style={d(0.4)} />
            <path d="M64 200 L124 260" className="lali-fade-in" style={d(1)} />
            <circle cx={200} cy={230} r={32} className="lali-fade-in" style={d(1.8)} />
            <path d="M218 202 V258" className="lali-fade-in" style={d(2.4)} />
            <rect x={260} y={206} width={76} height={48} className="lali-fade-in" style={d(3.2)} />
            <path d="M298 206 V254" className="lali-fade-in" style={d(3.8)} />
          </g>
          <Mark x={94} y={180} ok delay={1.4} s={0.8} />
          <Mark x={200} y={180} ok={false} delay={2.8} s={0.8} />
          <Mark x={298} y={180} ok delay={4.2} s={0.8} />
          <Place x={360} y={300} s={0.34} flip tap={TAP.grandma}>
            <Grandma arm="raise" mood="joy" />
          </Place>
          <Place x={40} y={300} s={0.26} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </Yard>
      );
    // {name}: a round ambasha cut into four equal pieces: each is a quarter.
    case 9:
      return (
        <Kitchen id={id}>
          <Ambasha x={170} y={160} r={72} cuts={[45, 135, 225, 315]} shade={[1]} at={0.8} />
          <Fraction x={310} y={150} top={1} bottom={4} delay={2.4} />
          <BeeHover x={320} y={240} s={1.2} flip />
        </Kitchen>
      );
    // Everyone eats; a fair share each.
    case 10:
      return (
        <Kitchen id={id}>
          <Mesob x={200} y={258} s={1.1} rx={74} stews={3} />
          <Place x={60} y={300} s={0.34} tap={TAP.grandma}>
            <Grandma arm="feed" mood="joy" />
          </Place>
          <Place x={140} y={240} s={0.26} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <Place x={262} y={240} s={0.26} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={340} y={300} s={0.3} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Hearts spots={[[200, 150, 1], [160, 120, 1.6], [240, 124, 2.2]]} />
        </Kitchen>
      );
    // "Can I have half of yours too?" Everyone laughs; Grandma gives him a quarter.
    case 11:
      return (
        <Kitchen id={id}>
          <g className="ep-pass">
            <Round x={140} y={180} r={40} cuts={[0, 90, 180, 270]} shade={[0]} at={0.2} color={AMBASHA} eyes={false} />
          </g>
          <g className="lali-pop-in" style={d(2.4)}>
            <text x={260} y={120} fontSize={28} fontFamily={LATIN} fontWeight={900} fill="#E8513B" textAnchor="middle">
              ¼
            </text>
          </g>
          <Place x={70} y={300} s={0.38} className="ep-laugh" tap={TAP.grandma}>
            <Grandma arm="hold" mood="joy" />
          </Place>
          <Place x={300} y={300} s={0.32} flip className="ep-laugh" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
        </Kitchen>
      );
    default:
      return null;
  }
}
