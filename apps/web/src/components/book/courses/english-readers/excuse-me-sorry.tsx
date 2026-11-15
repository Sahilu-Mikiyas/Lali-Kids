"use client";

import "./excuse-me-sorry.css";

import { useId, type ReactNode } from "react";

import { Place, vars } from "../../scenery";
import { Camel, FONT, Gugu, Ibex, Papa, TAP, Tsehay } from "./cast";
import { Label } from "./more";
import { TownStreet } from "./places";
import { Hearts, SayBubble, Sign } from "./props";
import { Thing } from "./things";

/*
  "Excuse Me or Sorry?": one living picture per page (12 pages), inside a crowded country bus: the
  windows with the hills sliding past, the seats, the bags, and a hen in a basket. The two
  phrases appear as tags: excuse me (before) in blue, sorry (after) in orange.
  Keyframes: ./kit.css, ./more.css and ./excuse-me-sorry.css (ems-*).
*/

const BLUE = "#2F6FD0";
const ORANGE = "#E8513B";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

/** Inside the bus: windows with the country passing by, a handrail and the floor. */
function Bus({ children, stopped = false }: { children?: ReactNode; stopped?: boolean }) {
  return (
    <>
      <rect width={400} height={300} fill="#E8DCC8" />
      <rect y={0} width={400} height={22} fill="#C9C4D6" />
      <path d="M-10 36 H410" stroke="#9AA0A6" strokeWidth={4} />
      {[20, 140, 260].map((x) => (
        <g key={x}>
          <clipPath id={`ems-w${x}`}>
            <rect x={x} y={50} width={110} height={80} rx={10} />
          </clipPath>
          <rect x={x} y={50} width={110} height={80} rx={10} fill="#BFE6FA" />
          <g clipPath={`url(#ems-w${x})`}>
            <g className={stopped ? undefined : "ems-pass"}>
              <path d={`M${x - 40} 110 Q${x + 20} 88 ${x + 60} 102 T${x + 160} 98 V132 H${x - 40}Z`} fill="#8FCB80" />
            </g>
          </g>
          <rect x={x} y={50} width={110} height={80} rx={10} fill="none" stroke="#9AA0A6" strokeWidth={4} />
        </g>
      ))}
      <rect y={226} width={400} height={80} fill="#7A7A86" />
      <path d="M0 226 H400" stroke="#5A5A66" strokeWidth={3} />
      {/* seat backs */}
      {[60, 340].map((x) => (
        <rect key={x} x={x - 40} y={176} width={80} height={56} rx={10} fill="#2E8A5A" stroke="#1F6A44" strokeWidth={3} />
      ))}
      <g className={stopped ? undefined : "ems-rumble"}>{children}</g>
    </>
  );
}

const GuguAt = ({ x = 200, y = 290, s = 0.4, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false, className }: { x?: number; y?: number; s?: number; mood?: M; pose?: "sit" | "wave" | "point" | "hop" | "no"; flip?: boolean; className?: string }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu} className={className}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);
const TsehayAt = ({ x = 120, y = 290, s = 0.38, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.tsehay}>
    <Tsehay mood={mood} />
  </Place>
);
const Lady = ({ x = 300, y = 288, mood = "happy" as "happy" | "joy" | "wow", flip = true }) => (
  <Place x={x} y={y} s={0.46} flip={flip} tap={TAP.haben}>
    <Ibex grown mood={mood} />
  </Place>
);
const Man = ({ x = 300, y = 288, mood = "happy" as "happy" | "joy" | "wow" | "worried", flip = true }) => (
  <Place x={x} y={y} s={0.42} flip={flip} tap={TAP.papa}>
    <Camel who="aabo" mood={mood} />
  </Place>
);
/** The hen in her basket (or out of it). */
const Hen = ({ x, y, out = false }: { x: number; y: number; out?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    {!out && (
      <g>
        <path d="M-22 -10 H22 L18 16 H-18Z" fill="#C98A4A" stroke="#2A1A10" strokeWidth={1.4} />
        <g transform="translate(0 -18) scale(0.4)">
          <Thing id="hen" />
        </g>
      </g>
    )}
  </g>
);

export default function ExcuseMeSorry({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // A full bus to town: people, bags, and a hen in a basket.
    case 0:
      return (
        <g>
          <Bus>
            <Hen x={60} y={200} />
            <Place x={150} y={290} s={0.44} tap={TAP.papa}>
              <Papa mood="happy" />
            </Place>
            <TsehayAt x={220} mood="joy" />
            <GuguAt x={280} mood="joy" pose="wave" />
            <Lady x={350} />
          </Bus>
        </g>
      );
    // "I know two polite words: excuse me and sorry!"
    case 1:
      return (
        <g>
          <Bus>
            <Label x={130} y={150} text="excuse me" delay={0.6} size={15} hiColor={BLUE} />
            <Label x={270} y={150} text="sorry" delay={1} size={15} />
            <GuguAt x={200} mood="joy" pose="point" />
            <Sign x={240} y={190} kind="?" delay={1.6} />
          </Bus>
        </g>
      );
    // He wants to get past: "Sorry! Sorry!" "Sorry for what?"
    case 2:
      return (
        <g>
          <Bus>
            <GuguAt x={170} mood="happy" />
            <Lady x={270} mood="wow" />
            <SayBubble x={160} y={170} lines={["Sorry! Sorry!"]} size={13} tail="down" delay={0.4} color={ORANGE} />
            <SayBubble x={290} y={150} lines={["Sorry for what?"]} size={12} tail="down" delay={1.4} />
          </Bus>
        </g>
      );
    // BUMP! He stands on a man's foot. "Excuse me!" The man frowns.
    case 3:
      return (
        <g>
          <Bus>
            <g className="ems-bump">
              <GuguAt x={200} mood="wow" />
            </g>
            <Man x={290} mood="worried" />
            <text x={200} y={150} fontSize={22} fontFamily={FONT} fontWeight={900} fill="#5A5A66" textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "0.2s" })}>
              BUMP!
            </text>
            <SayBubble x={160} y={190} lines={["Excuse me!"]} size={13} tail="down" delay={0.8} color={BLUE} />
          </Bus>
        </g>
      );
    // Tsehay: excuse me BEFORE, sorry AFTER.
    case 4:
      return (
        <g>
          <Bus>
            <g transform="translate(200 150)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
                <rect x={-120} y={-26} width={110} height={52} rx={10} fill="#FFFDF6" stroke={BLUE} strokeWidth={3} />
                <text x={-65} y={-4} fontSize={13} fontFamily={FONT} fontWeight={900} fill={BLUE} textAnchor="middle">
                  BEFORE
                </text>
                <text x={-65} y={16} fontSize={13} fontFamily={FONT} fontWeight={800} fill="#2A1A10" textAnchor="middle">
                  excuse me
                </text>
              </g>
              <g className="lali-pop-in" style={vars({ "--delay": "1.2s" })}>
                <rect x={10} y={-26} width={110} height={52} rx={10} fill="#FFFDF6" stroke={ORANGE} strokeWidth={3} />
                <text x={65} y={-4} fontSize={13} fontFamily={FONT} fontWeight={900} fill={ORANGE} textAnchor="middle">
                  AFTER
                </text>
                <text x={65} y={16} fontSize={13} fontFamily={FONT} fontWeight={800} fill="#2A1A10" textAnchor="middle">
                  sorry
                </text>
              </g>
            </g>
            <TsehayAt x={140} y={292} s={0.4} mood="joy" />
            <GuguAt x={260} y={292} s={0.38} mood="wow" flip />
          </Bus>
        </g>
      );
    // "I'm sorry I stood on your foot." "That's OK."
    case 5:
      return (
        <g>
          <Bus>
            <GuguAt x={190} mood="worried" />
            <Man x={290} mood="happy" />
            <SayBubble x={180} y={170} lines={["I'm sorry I stood", "on your foot."]} size={11} tail="down" delay={0.4} color={ORANGE} />
            <SayBubble x={300} y={140} lines={["That's OK."]} size={12} tail="down" delay={1.6} />
          </Bus>
        </g>
      );
    // "Excuse me, please." The lady moves her bag. "Thank you!"
    case 6:
      return (
        <g>
          <Bus>
            <Lady x={280} mood="joy" />
            <g transform="translate(230 266)">
              <g className="ems-bag">
                <rect x={-16} y={-14} width={32} height={26} rx={5} fill="#8E5BE0" stroke="#2A1A10" strokeWidth={1.4} />
              </g>
            </g>
            <GuguAt x={150} mood="joy" />
            <SayBubble x={150} y={170} lines={["Excuse me, please."]} size={12} tail="down" delay={0.4} color={BLUE} />
            <SayBubble x={240} y={130} lines={["Thank you!"]} size={12} tail="down" delay={1.8} />
          </Bus>
        </g>
      );
    // An old woman with a big basket. "Would you like to sit down?"
    case 7:
      return (
        <g>
          <Bus>
            <Place x={290} y={290} s={0.44} flip tap={TAP.grandma}>
              <Camel who="halima" mood="happy" />
            </Place>
            <GuguAt x={160} mood="happy" pose="wave" className="ems-stand" />
            <SayBubble x={160} y={160} lines={["Would you like", "to sit down?"]} size={12} tail="down" delay={0.6} />
          </Bus>
        </g>
      );
    // "Thank you, little one." "You're welcome." Papa winks.
    case 8:
      return (
        <g>
          <Bus>
            <Place x={60} y={244} s={0.36} tap={TAP.grandma}>
              <Camel who="halima" mood="joy" kneel />
            </Place>
            <GuguAt x={200} mood="joy" />
            <Place x={300} y={290} s={0.44} flip tap={TAP.papa}>
              <Papa mood="joy" />
            </Place>
            <SayBubble x={200} y={170} lines={["You're welcome."]} size={12} tail="down" delay={0.8} />
            <Hearts spots={[[100, 150, 1.4], [116, 136, 1.8]]} />
          </Bus>
        </g>
      );
    // The hen lands on Gugu's head! "Excuse me, hen! May I have my head back?"
    case 9:
      return (
        <g>
          <Bus>
            <Hen x={70} y={200} out />
            <GuguAt x={200} mood="wow" />
            <g transform="translate(200 186)">
              <g className="ems-flap">
                <Thing id="hen" s={0.5} />
              </g>
            </g>
            <SayBubble x={290} y={170} lines={["Excuse me, hen!"]} size={12} tail="left" delay={0.8} color={BLUE} />
          </Bus>
        </g>
      );
    // Everyone laughs. "Sorry!" At the market: "Well done, Gugu."
    case 10:
      return (
        <g>
          <TownStreet id={id}>
            <Place x={140} y={294} s={0.46} tap={TAP.papa}>
              <Papa mood="joy" />
            </Place>
            <TsehayAt x={220} y={296} mood="joy" />
            <GuguAt x={290} y={296} mood="joy" pose="wave" flip />
            <SayBubble x={150} y={160} lines={["Well done, Gugu."]} size={12} tail="down" delay={0.6} />
          </TownStreet>
        </g>
      );
    // Excuse me before, sorry after!
    default:
      return (
        <g>
          <Bus stopped>
            <Label x={130} y={150} text="Excuse me before" delay={0.4} size={15} />
            <Label x={270} y={170} text="sorry after!" delay={1} size={15} rot={4} />
            <TsehayAt x={150} mood="joy" />
            <GuguAt x={250} mood="joy" flip />
          </Bus>
        </g>
      );
  }
}
