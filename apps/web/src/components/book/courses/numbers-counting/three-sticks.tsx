"use client";

import "./three-sticks.css";

import { useId } from "react";

import { CubShape, GuguShape } from "../../../characters";
import { Acacia, Air, BeeHover, Place, Rock, Sheep, vars } from "../../scenery";
import { Cheer, d, GrannyShape, Land, NumTag, r1, Room, Stick, TAP_CUB, TAP_GUGU } from "./kit";

/*
  "Gugu and the Three Sticks": one living picture per page (12 pages). The sticks are always
  the same three lengths (short 70, middle 110, long 150), so children can compare them page to
  page. Lining up the ends is drawn as a dashed start line; hand spans pop along the stick
  numbered; footprints count the steps on the two paths home. Story keyframes are
  three-sticks-* in ./three-sticks.css; the kit's are nc-* in ./kit.css.
*/

const LEN = { short: 70, mid: 110, long: 150 } as const;
const COL = { short: "#B5653A", mid: "#8A5A36", long: "#6A4A2A" } as const;

/** A sheep grazing nearby, small. */
function Grazer({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return <Sheep x={x} y={y} s={0.5} flip={flip} />;
}

/** A hand span: an arc from thumb to little finger, popping in with its number. */
function Span({ x, y, w, n, delay, color }: { x: number; y: number; w: number; n: number; delay: number; color: string }) {
  return (
    <g>
      <g className="lali-pop-in" style={d(delay)}>
        <path d={`M${x} ${y} Q${x + w / 2} ${y - w * 0.7} ${x + w} ${y}`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx={x} cy={y} r={3} fill={color} />
        <circle cx={x + w} cy={y} r={3} fill={color} />
      </g>
      <NumTag x={r1(x + w / 2)} y={r1(y - w * 0.55)} n={n} delay={delay + 0.1} s={0.5} color={color} />
    </g>
  );
}

/** A footprint (a paw print) that pops in on the path. */
function Print({ x, y, delay, color = "#6A4A2A" }: { x: number; y: number; delay: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={d(delay)}>
        <ellipse cx={0} cy={0} rx={4} ry={3} fill={color} opacity={0.7} />
        <circle cx={-3} cy={-4} r={1.3} fill={color} opacity={0.7} />
        <circle cx={0} cy={-5} r={1.3} fill={color} opacity={0.7} />
        <circle cx={3} cy={-4} r={1.3} fill={color} opacity={0.7} />
      </g>
    </g>
  );
}

/** Gugu holding a stick upright beside him (stick from his paw to the ground). */
function GuguWithStick({ x, y, len, s = 0.4, mood = "happy", className }: { x: number; y: number; len: number; s?: number; mood?: "happy" | "joy" | "wow" | "worried"; className?: string }) {
  return (
    <g>
      <g transform={`translate(${x + 34} ${y})`}>
        <g className={className}>
          <rect x={-3.5} y={-len} width={7} height={len} rx={3.5} fill={len === LEN.long ? COL.long : len === LEN.short ? COL.short : COL.mid} />
        </g>
      </g>
      <Place x={x} y={y} s={s} tap={TAP_GUGU}>
        <GuguShape pose="point" mood={mood} />
      </Place>
    </g>
  );
}

export default function ThreeSticks({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Gugu was going to help with the sheep. "Find a stick that is just right."
    case 0:
      return (
        <g>
          <Land id={id} time="dawn" />
          <Grazer x={250} y={226} />
          <Grazer x={300} y={236} flip />
          <Grazer x={350} y={222} />
          <Place x={90} y={292} s={0.44}>
            <GrannyShape />
          </Place>
          <Place x={190} y={294} s={0.4} className="lali-hop" tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={150} y={150} s={1} />
          <Air kind="day" seed={3} />
        </g>
      );
    // Three sticks under the tree. One lay high up the slope: "That one is the longest!"
    case 1:
      return (
        <g>
          <Land id={id} />
          <Acacia x={300} y={200} s={1.1} />
          <path d="M-10 210 Q200 150 410 120 L410 310 L-10 310Z" fill="#6CC27E" />
          <Stick x={210} y={160} len={LEN.short} a={-10} color={COL.short} />
          <Stick x={60} y={232} len={LEN.mid} a={-6} color={COL.mid} />
          <Stick x={110} y={262} len={LEN.long} a={-4} color={COL.long} />
          <g className="lali-pop-in" style={d(1.4)}>
            <circle cx={246} cy={154} r={46} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 5" />
          </g>
          <Place x={330} y={296} s={0.34} flip tap={TAP_GUGU}>
            <GuguShape pose="point" mood="joy" />
          </Place>
          <BeeHover x={80} y={150} s={1.1} />
          <g transform="translate(80 118)">
            <g className="lali-pop-in" style={d(2.4)}>
              <text fontSize={26} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#2F5BD3" textAnchor="middle">
                ?
              </text>
            </g>
          </g>
          <Air kind="day" seed={5} />
        </g>
      );
    // Side by side, ends against a flat stone. The one from up the hill was the shortest!
    case 2:
    case 3: {
      const order = page === 3;
      const rows: { k: keyof typeof LEN; y: number; from: [number, number] }[] = order
        ? [
            { k: "short", y: 190, from: [0, 0] },
            { k: "mid", y: 222, from: [0, 0] },
            { k: "long", y: 254, from: [0, 0] },
          ]
        : [
            { k: "mid", y: 190, from: [-30, 42] },
            { k: "short", y: 222, from: [130, -62] },
            { k: "long", y: 254, from: [20, 8] },
          ];
      return (
        <g>
          <Land id={id} />
          <path d="M-10 170 Q200 160 410 170 L410 310 L-10 310Z" fill="#6CC27E" />
          <Rock x={70} y={236} s={0.9} color="#A9A3B4" />
          <g className="lali-fade-in" style={d(order ? 0.2 : 2)}>
            <path d="M92 170 V272" stroke="#E8513B" strokeWidth={3} strokeDasharray="5 5" />
          </g>
          {rows.map(({ k, y, from }, i) => (
            <g key={k}>
              <g className={order ? "three-sticks-swap" : "nc-slide"} style={vars({ "--fx": `${from[0]}px`, "--fy": `${from[1]}px`, "--delay": `${r1(0.6 + i * 0.5)}s`, "--dur": "1s" })}>
                <Stick x={92} y={y} len={LEN[k]} color={COL[k]} />
              </g>
              {order && (
                <g className="lali-pop-in" style={d(1 + i * 0.6)}>
                  <path d={`M${92 + LEN[k]} ${y} V${y - 16}`} stroke="#2F5BD3" strokeWidth={2} strokeDasharray="3 3" />
                </g>
              )}
            </g>
          ))}
          {order ? (
            <>
              <NumTag x={92 + LEN.short + 22} y={190} n={1} delay={1.2} s={0.6} />
              <NumTag x={92 + LEN.mid + 22} y={222} n={2} delay={1.8} s={0.6} />
              <NumTag x={92 + LEN.long + 22} y={254} n={3} delay={2.4} s={0.6} />
              {/* the steps up to Grandma's door */}
              <g transform="translate(330 270)" className="lali-fade-in" style={d(2.8)}>
                <rect x={-30} y={-14} width={60} height={14} fill="#B9B3C2" />
                <rect x={-20} y={-28} width={50} height={14} fill="#C9C3D2" />
                <rect x={-10} y={-42} width={40} height={14} fill="#D9D3E2" />
              </g>
            </>
          ) : (
            <g className="lali-pop-in" style={d(2.6)}>
              <circle cx={92 + LEN.short / 2} cy={222} r={44} fill="none" stroke="#E8513B" strokeWidth={3} strokeDasharray="6 5" />
            </g>
          )}
          <Place x={340} y={296} s={0.34} flip tap={TAP_GUGU}>
            <GuguShape pose={order ? "wave" : "point"} mood={order ? "joy" : "wow"} />
          </Place>
          <BeeHover x={60} y={140} s={1} />
          <Air kind="day" seed={7 + page} />
        </g>
      );
    }
    // The short stick: he had to bend right down and could not reach. "Too short!"
    case 4:
      return (
        <g>
          <Land id={id} />
          <Grazer x={300} y={230} flip />
          <Grazer x={350} y={240} flip />
          <GuguWithStick x={140} y={292} len={LEN.short} mood="worried" className="three-sticks-poke" />
          <g className="lali-fade-in" style={d(1.4)}>
            <path d="M190 230 H280" stroke="#E8513B" strokeWidth={3} strokeDasharray="5 5" />
            <path d="M226 218 l12 24 M238 218 l-12 24" stroke="#E8513B" strokeWidth={3} strokeLinecap="round" />
          </g>
          <BeeHover x={80} y={150} s={1} />
          <Air kind="day" seed={11} />
        </g>
      );
    // The longest stick wobbled and bonked a branch. "Too long!"
    case 5:
      return (
        <g>
          <Land id={id} />
          <Acacia x={170} y={150} s={1.2} />
          <g className="three-sticks-wobble">
            <GuguWithStick x={140} y={292} len={LEN.long + 40} mood="wow" />
          </g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="nc-away" style={vars({ "--tx": `${-20 + i * 14}px`, "--ty": "90px", "--delay": `${1.2 + i * 0.3}s`, "--dur": "1.6s" })}>
              <ellipse cx={170 + i * 10} cy={110} rx={6} ry={3} fill="#3E9B5A" transform={`rotate(${i * 30} ${170 + i * 10} 110)`} />
            </g>
          ))}
          <Grazer x={320} y={236} flip />
          <Air kind="day" seed={13} />
        </g>
      );
    // The middle stick reached up to his shoulder. The sheep trotted along. "Just right!"
    case 6:
      return (
        <g>
          <Land id={id} />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${250 + i * 50} ${236 + (i % 2) * 8})`}>
              <g className="lali-move-in" style={vars({ "--fx": "120px", "--fy": "0px", "--delay": `${0.4 + i * 0.3}s`, "--dur": "2s" })}>
                <Grazer x={0} y={0} flip />
              </g>
            </g>
          ))}
          <GuguWithStick x={140} y={292} len={LEN.mid} mood="joy" />
          <Cheer pts={[[110, 130, 2.4], [200, 120, 2.6], [70, 160, 2.8]]} />
          <BeeHover x={210} y={160} s={1} />
          <Air kind="day" seed={15} />
        </g>
      );
    // Gugu measured: five hand spans. Anbessa, with his big paw: only four.
    case 7:
      return (
        <g>
          <Land id={id} />
          <path d="M-10 190 Q200 180 410 190 L410 310 L-10 310Z" fill="#6CC27E" />
          <Stick x={80} y={150} len={240} color={COL.mid} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Span key={i} x={80 + i * 48} y={140} w={48} n={i + 1} delay={0.8 + i * 0.5} color="#2E9A5A" />
          ))}
          <Stick x={80} y={240} len={240} color={COL.mid} />
          {[0, 1, 2, 3].map((i) => (
            <Span key={i} x={80 + i * 60} y={230} w={60} n={i + 1} delay={3.6 + i * 0.5} color="#E8513B" />
          ))}
          <Place x={40} y={170} s={0.22} tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Place x={40} y={290} s={0.24} tap={TAP_CUB}>
            <CubShape pose="sit" mood="joy" />
          </Place>
          <NumTag x={350} y={120} n={5} delay={3.4} color="#2E9A5A" />
          <NumTag x={350} y={210} n={4} delay={5.8} />
          <Air kind="day" seed={17} />
        </g>
      );
    // "The same stick, two answers?" Anbessa's paw is bigger, so it takes fewer.
    case 8:
      return (
        <g>
          <Land id={id} />
          {/* a small hand and a big paw, side by side */}
          <g transform="translate(140 170)">
            <ellipse cx={0} cy={0} rx={22} ry={26} fill="#5A3A2A" />
            {[-14, -5, 4, 13].map((x) => (
              <rect key={x} x={x - 3.5} y={-46} width={7} height={26} rx={3.5} fill="#5A3A2A" />
            ))}
            <rect x={-30} y={-6} width={8} height={20} rx={4} fill="#5A3A2A" transform="rotate(-40 -26 4)" />
          </g>
          <g transform="translate(260 170)">
            <ellipse cx={0} cy={0} rx={36} ry={40} fill="#F2B45A" />
            {[-24, -8, 8, 24].map((x) => (
              <ellipse key={x} cx={x} cy={-42} rx={10} ry={12} fill="#F2B45A" />
            ))}
            <ellipse cx={0} cy={8} rx={18} ry={14} fill="#FFDCA6" />
          </g>
          <NumTag x={140} y={98} n={5} delay={1} color="#2E9A5A" />
          <NumTag x={260} y={88} n={4} delay={1.6} />
          <Place x={200} y={296} s={0.4}>
            <GrannyShape mood="joy" />
          </Place>
          <Place x={60} y={296} s={0.3} tap={TAP_GUGU}>
            <GuguShape mood="wow" />
          </Place>
          <Place x={346} y={296} s={0.34} flip tap={TAP_CUB}>
            <CubShape pose="sit" mood="wow" />
          </Place>
          <Air kind="day" seed={19} />
        </g>
      );
    // Back to back, feet on the same line. Anbessa is taller. Gugu is shorter.
    case 9:
      return (
        <g>
          <Land id={id} />
          <g className="lali-fade-in" style={d(0.6)}>
            <path d="M120 294 H300" stroke="#E8513B" strokeWidth={4} strokeLinecap="round" />
          </g>
          <Place x={240} y={294} s={0.56} tap={TAP_CUB}>
            <CubShape pose="stand" mood="joy" />
          </Place>
          <Place x={168} y={294} s={0.4} flip tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <g className="lali-fade-in" style={d(1.8)}>
            <path d="M110 152 H330" stroke="#2F5BD3" strokeWidth={3} strokeDasharray="6 5" />
            <path d="M110 198 H330" stroke="#2E9A5A" strokeWidth={3} strokeDasharray="6 5" />
          </g>
          <BeeHover x={350} y={170} s={1} flip />
          <Air kind="day" seed={21} />
        </g>
      );
    // Two paths home: the winding one is ten steps, the straight one six.
    case 10: {
      const winding: [number, number][] = Array.from({ length: 10 }, (_, i) => {
        const t = i / 9;
        return [r1(60 + t * 280), r1(280 - t * 60 - Math.sin(t * Math.PI * 2) * 34)];
      });
      const straight: [number, number][] = Array.from({ length: 6 }, (_, i) => [r1(60 + (i / 5) * 280), r1(236 - (i / 5) * 16)]);
      return (
        <g>
          <Land id={id} time="dusk" />
          <path d={`M${winding.map(([x, y]) => `${x} ${y}`).join(" L")}`} stroke="#C9A26A" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
          <path d={`M${straight[0][0]} ${straight[0][1]} L${straight[5][0]} ${straight[5][1]}`} stroke="#D9B98A" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.7} />
          {winding.map(([x, y], i) => (
            <Print key={i} x={x} y={y} delay={0.6 + i * 0.35} color="#2F5BD3" />
          ))}
          {straight.map(([x, y], i) => (
            <Print key={i} x={x} y={y} delay={0.8 + i * 0.5} color="#E8513B" />
          ))}
          <NumTag x={200} y={290} n={10} delay={4.2} color="#2F5BD3" />
          <NumTag x={200} y={190} n={6} delay={3.8} />
          <g transform="translate(340 166) scale(0.7)">
            <path d="M-34 0 L-34 -32 Q0 -40 34 -32 L34 0Z" fill="#D89B62" />
            <path d="M-46 -28 Q0 -90 46 -28Z" fill="#D9AE4E" />
          </g>
          <Air kind="dusk" seed={23} />
        </g>
      );
    }
    // At bedtime Gugu lined up his toys: short, longer, longest. Goodnight, stick.
    case 11:
      return (
        <g>
          <Room id={id} night />
          <g className="lali-fade-in" style={d(0.4)}>
            <path d="M150 226 V286" stroke="#E8513B" strokeWidth={2.4} strokeDasharray="4 4" />
          </g>
          {([[40, 236, "#E8513B"], [70, 256, "#F5B21E"], [100, 276, "#2E9A8A"]] as [number, number, string][]).map(([len, y, c], i) => (
            <g key={i} className="nc-slide" style={vars({ "--fx": "60px", "--fy": "0px", "--delay": `${0.8 + i * 0.6}s` })}>
              <rect x={150} y={y - 6} width={len} height={12} rx={6} fill={c} />
            </g>
          ))}
          <rect x={330} y={110} width={7} height={LEN.mid} rx={3.5} fill={COL.mid} transform="rotate(6 333 220)" />
          <Place x={290} y={294} s={0.36} flip tap={TAP_GUGU}>
            <GuguShape mood="happy" />
          </Place>
          <Place x={70} y={294} s={0.36}>
            <GrannyShape />
          </Place>
          <Air kind="night" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
