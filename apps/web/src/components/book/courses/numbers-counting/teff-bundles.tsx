"use client";

import "./teff-bundles.css";

import { useId, type ReactNode } from "react";

import { geez } from "@/content/courses/numbers-counting/numbers";
import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { d, ETHIOPIC, GrannyShape, Land, LATIN, NUM, NumberCard, NumTag, r1, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";
import { Bundle, Stalk } from "./kit-more";

/*
  "Bundles of Ten": one living picture per page (12 pages) at the teff harvest. Every
  two-digit number is drawn as bundles of ten (tied in the middle) and loose stalks; a
  tens-and-ones board shows the bundles on the left with their digit, the loose ones on the
  right with theirs, so 23 reads as "2 bundles, 3 loose", with ፳፫ beside it. Story keyframes
  are teff-bundles-* in ./teff-bundles.css; the kit's are nc-* in ./kit.css.
*/

function Field({ id, time = "day", children }: { id: string; time?: "day" | "dusk" | "night"; children: ReactNode }) {
  return (
    <g>
      <Land id={id} time={time} hills={false} />
      <path d="M-10 196 Q200 184 410 196 L410 310 L-10 310Z" fill={time === "night" ? "#4A3A24" : "#9A7448"} />
      <g stroke={time === "night" ? "#3A2A18" : "#7A5A34"} strokeWidth={1.4} opacity={0.6}>
        {Array.from({ length: 30 }, (_, i) => (
          <path key={i} d={`M${r1((i * 41) % 400)} ${r1(206 + ((i * 17) % 90))} l-3 -8`} />
        ))}
      </g>
      {children}
      <Air kind={time} seed={29} grass={false} />
    </g>
  );
}

/** Some bundles and loose stalks in a row, starting at x. */
function Pile({ x, y, tens, ones, s = 1, pop = 0, step = 0.3 }: { x: number; y: number; tens: number; ones: number; s?: number; pop?: number; step?: number }) {
  return (
    <g>
      {Array.from({ length: tens }, (_, i) => {
        const b = <Bundle x={x + i * 26 * s} y={y} s={s} />;
        return pop ? (
          <g key={i} className="lali-pop-in" style={d(pop + i * step)}>
            {b}
          </g>
        ) : (
          <g key={i}>{b}</g>
        );
      })}
      {Array.from({ length: ones }, (_, i) => {
        const st = <Stalk x={x + tens * 26 * s + 8 + i * 9 * s} y={y} h={46 * s} />;
        return pop ? (
          <g key={i} className="lali-pop-in" style={d(pop + tens * step + i * step)}>
            {st}
          </g>
        ) : (
          <g key={i}>{st}</g>
        );
      })}
    </g>
  );
}

/** The tens-and-ones board: bundles on the left, loose stalks on the right, a digit under each. */
function Board({ x, y, tens, ones, delay = 1 }: { x: number; y: number; tens: number; ones: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-110} y={-70} width={220} height={120} rx={12} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={3} />
      <path d="M0 -62 V42" stroke="#8A5A36" strokeWidth={2} strokeDasharray="5 5" />
      <Bundle x={-90} y={-46} s={0.4} />
      <Stalk x={18} y={-46} h={18} />
      <Pile x={-90} y={10} tens={tens} ones={0} s={0.7} />
      <Pile x={-6} y={10} tens={0} ones={ones} s={0.8} />
      <g className="lali-pop-in" style={d(delay)}>
        <text x={-55} y={40} fontSize={28} fontFamily={LATIN} fontWeight={900} fill="#C98A0A" textAnchor="middle">
          {tens}
        </text>
      </g>
      <g className="lali-pop-in" style={d(delay + 0.4)}>
        <text x={55} y={40} fontSize={28} fontFamily={LATIN} fontWeight={900} fill={NUM} textAnchor="middle">
          {ones}
        </text>
      </g>
    </g>
  );
}

/** A small grey donkey (feet at 0, 0), facing right. */
function Donkey() {
  return (
    <g>
      <ellipse cx={0} cy={2} rx={34} ry={5} fill="#000" opacity={0.12} />
      <g className="lali-breathe">
        {[-20, -10, 12, 22].map((x) => (
          <rect key={x} x={x} y={-26} width={6} height={26} rx={3} fill="#6E6A72" />
        ))}
        <ellipse cx={0} cy={-34} rx={34} ry={16} fill="#8E8A94" />
        <path d="M28 -40 L42 -66 L54 -60 L40 -34Z" fill="#8E8A94" />
        <ellipse cx={50} cy={-62} rx={10} ry={8} fill="#8E8A94" />
        <path d="M44 -70 l-2 -14 l6 12 M50 -70 l2 -14 l3 14" stroke="#6E6A72" strokeWidth={4} strokeLinecap="round" />
        <circle cx={52} cy={-64} r={1.8} fill="#1A0F0A" />
        <path d="M-34 -36 q-8 10 -4 20" stroke="#6E6A72" strokeWidth={3} fill="none" />
      </g>
    </g>
  );
}

export default function TeffBundles({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A great big heap of teff stalks. "How many? One, two, three… oh, I've lost count!"
    case 0:
      return (
        <Field id={id}>
          {Array.from({ length: 40 }, (_, i) => (
            <Stalk key={i} x={r1(130 + ((i * 37) % 140))} y={r1(250 + ((i * 13) % 26))} h={40 + (i % 3) * 6} a={((i * 23) % 50) - 25} />
          ))}
          <g className="lali-pop-in" style={d(1.4)}>
            <text x={200} y={170} fontSize={40} fontFamily={LATIN} fontWeight={900} fill="#2F5BD3" textAnchor="middle">
              ?
            </text>
          </g>
          <Place x={60} y={296} s={0.36} className="teff-bundles-dizzy" tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <Place x={340} y={298} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
        </Field>
      );
    // Count ten, then tie them together. One bundle is ten.
    case 1:
      return (
        <Field id={id}>
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <g className="teff-bundles-gather" style={vars({ "--fx": `${(i - 4.5) * 22}px`, "--delay": "4s" })}>
                <g className="lali-pop-in" style={d(0.6 + i * 0.3)}>
                  <Stalk x={200 + (i - 4.5) * 4} y={250} h={52} />
                </g>
              </g>
              <g className="teff-bundles-hide" style={d(4)}>
                <NumTag x={200 + (i - 4.5) * 26} y={180} n={i + 1} delay={0.7 + i * 0.3} s={0.45} />
              </g>
            </g>
          ))}
          <g className="lali-pop-in" style={d(4.6)}>
            <rect x={194} y={222} width={12} height={5} rx={2} fill="#8A4A2A" />
          </g>
          <NumTag x={200} y={160} n={10} delay={5} s={1.1} />
          <Place x={330} y={294} s={0.4} flip>
            <GrannyShape mood="joy" />
          </Place>
        </Field>
      );
    // Two bundles: ten, twenty! Three bundles: ten, twenty, thirty!
    case 2:
      return (
        <Field id={id}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.6 + i * 1)}>
                <Bundle x={130 + i * 70} y={270} s={1.5} />
              </g>
              <NumTag x={130 + i * 70} y={170} n={(i + 1) * 10} delay={1 + i} s={0.8} />
            </g>
          ))}
          <Place x={50} y={296} s={0.32} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
        </Field>
      );
    // Two bundles and three loose: "Ten, twenty… twenty-one, twenty-two, twenty-three!"
    case 3:
      return (
        <Field id={id}>
          <Pile x={120} y={270} tens={2} ones={3} s={1.5} pop={0.6} step={0.6} />
          {[10, 20, 21, 22, 23].map((n, i) => (
            <NumTag key={n} x={i < 2 ? 120 + i * 39 : 206 + (i - 2) * 13.5} y={i < 2 ? 170 : 186 - (i - 2) * 14} n={n} delay={1 + i * 0.6} s={i < 2 ? 0.7 : 0.5} />
          ))}
          <NumberCard x={300} y={100} steps={[[23, 4.4]]} s={0.85} />
          <Place x={50} y={298} s={0.3} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="joy" />
          </Place>
        </Field>
      );
    // "The 2 says how many bundles. The 3 says how many loose." ፳፫.
    case 4:
      return (
        <Field id={id}>
          <Board x={200} y={170} tens={2} ones={3} delay={1} />
          <g className="lali-pop-in" style={d(2.2)}>
            <rect x={110} y={240} width={190} height={50} rx={14} fill="#FFFDF4" />
            <text x={160} y={276} fontSize={36} fontFamily={LATIN} fontWeight={900} textAnchor="middle">
              <tspan fill="#C98A0A">2</tspan>
              <tspan fill={NUM}>3</tspan>
            </text>
            <text x={250} y={276} fontSize={32} fontFamily={ETHIOPIC} fontWeight={800} textAnchor="middle">
              <tspan fill="#C98A0A">፳</tspan>
              <tspan fill={NUM}>፫</tspan>
            </text>
          </g>
          <Place x={360} y={294} s={0.34} flip>
            <GrannyShape />
          </Place>
        </Field>
      );
    // Anbessa swapped them round: three bundles and two loose. Thirty-two, much more than twenty-three.
    case 5:
      return (
        <Field id={id}>
          <Pile x={60} y={250} tens={2} ones={3} s={1.1} />
          <Pile x={230} y={250} tens={3} ones={2} s={1.1} pop={0.8} />
          <NumTag x={100} y={150} n={23} delay={1.6} />
          <g className="lali-pop-in" style={d(2.2)}>
            <text x={190} y={160} fontSize={34} fontFamily={LATIN} fontWeight={900} fill="#1B2A4E" textAnchor="middle">
              &lt;
            </text>
          </g>
          <NumTag x={280} y={150} n={32} delay={2} />
          <Place x={200} y={298} s={0.3} tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
        </Field>
      );
    // Twenty-nine and one more: ten loose ones! Tie them: three bundles, thirty.
    case 6:
      return (
        <Field id={id}>
          <Pile x={80} y={260} tens={2} ones={0} s={1.3} />
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} className="teff-bundles-gather" style={vars({ "--fx": `${(i - 4.5) * 12}px`, "--delay": "2.4s" })}>
              <g className={i === 9 ? "nc-slide" : undefined} style={i === 9 ? vars({ "--fx": "80px", "--fy": "-100px", "--delay": "0.8s" }) : undefined}>
                <Stalk x={230 + (i - 4.5) * 2} y={260} h={58} />
              </g>
            </g>
          ))}
          <g className="lali-pop-in" style={d(3)}>
            <rect x={224} y={226} width={12} height={5} rx={2} fill="#8A4A2A" />
          </g>
          <BeeHover x={300} y={140} s={1} flip />
          <NumberCard x={200} y={96} steps={[[29, 0], [30, 3.2]]} s={0.85} />
        </Field>
      );
    // Counting bundles by tens: ten, twenty, thirty, forty, fifty.
    case 7:
      return (
        <Field id={id}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <Bundle x={80 + i * 60} y={270} s={1.4} />
              <NumTag x={80 + i * 60} y={174} n={(i + 1) * 10} delay={0.8 + i * 0.5} s={0.75} />
            </g>
          ))}
          <BeeHover x={340} y={120} s={1} />
        </Field>
      );
    // Gugu's donkey: four bundles and seven loose. Forty-seven, ፵፯.
    case 8:
      return (
        <Field id={id}>
          <g transform="translate(150 276)">
            <Tappable reaction="wiggle" sound="pop">
              <Donkey />
            </Tappable>
            <g transform="translate(-30 -48)">
              <Pile x={0} y={0} tens={4} ones={0} s={0.7} />
            </g>
          </g>
          <Pile x={250} y={280} tens={0} ones={7} s={1} pop={0.8} step={0.3} />
          <NumberCard x={290} y={100} steps={[[40, 0.6], [47, 3.2]]} s={0.85} />
          <Place x={50} y={296} s={0.3} tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
        </Field>
      );
    // Five bundles and five loose: fifty-five.
    case 9:
      return (
        <Field id={id} time="dusk">
          <Pile x={70} y={270} tens={5} ones={5} s={1.2} pop={0.6} step={0.35} />
          <NumberCard x={200} y={100} steps={[[55, 4.4]]} s={0.85} />
          <g className="lali-pop-in" style={d(4.8)}>
            <text x={320} y={110} fontSize={26} fontFamily={ETHIOPIC} fontWeight={800} fill={NUM} textAnchor="middle">
              {geez(55)}
            </text>
          </g>
        </Field>
      );
    // Ten bundles in a tall stack: ten, twenty … ninety, one HUNDRED. ፻.
    case 10:
      return (
        <Field id={id} time="dusk">
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} className="lali-pop-in" style={d(0.5 + i * 0.35)}>
              <Bundle x={110 + (i % 5) * 44} y={i < 5 ? 286 : 236} s={1.1} />
            </g>
          ))}
          <NumberCard x={200} y={100} steps={[[10, 0.6], [20, 0.95], [30, 1.3], [40, 1.65], [50, 2], [60, 2.35], [70, 2.7], [80, 3.05], [90, 3.4], [100, 3.75]]} s={0.95} />
          <Place x={350} y={296} s={0.34} flip>
            <GrannyShape mood="joy" />
          </Place>
        </Field>
      );
    // By the fire: a hundred stalks, all counted, all tied.
    case 11:
      return (
        <Field id={id} time="night">
          <g transform="translate(320 270)">
            {Array.from({ length: 10 }, (_, i) => (
              <Bundle key={i} x={-40 + (i % 4) * 22} y={-Math.floor(i / 4) * 32} s={0.8} />
            ))}
          </g>
          <g transform="translate(170 280)">
            <ellipse cx={0} cy={0} rx={50} ry={12} fill="#FFB84A" opacity={0.2} className="lali-pulse" />
            <path d="M-12 -2 Q-16 -20 -4 -30 Q-4 -18 2 -16 Q0 -32 10 -40 Q10 -24 14 -2Z" fill="#FF8A3A" className="lali-flicker" />
          </g>
          <Place x={70} y={294} s={0.34} tap={TAP_CUB}>
            <CubShape pose="sit" mood="happy" />
          </Place>
          <Place x={240} y={298} s={0.28} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <NumTag x={300} y={140} n={100} delay={1} color="#3B4BB0" />
        </Field>
      );
    default:
      return null;
  }
}
