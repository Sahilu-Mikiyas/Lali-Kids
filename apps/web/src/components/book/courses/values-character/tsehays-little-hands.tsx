"use client";

import "./tsehays-little-hands.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Baby, Gugu, Mama, TAP, Tsehay, Wolf } from "./kit-cast";
import { Home, Yard } from "./kit-places";
import { Broom, Cradle, Hearth, Hearts, Jerrycan, LentilTray, Notes, SnackBowl, Sparkles, Speech, Steam, Tick, WaterPot, Zzz } from "./kit-props";

/*
  "Tsehay's Little Hands": one living picture per page (11 pages), inside the family's round
  house, then out in the yard. The same four jobs sit in the room all morning (the broom, the
  tray of lentils, the empty water pot, the cradle), and children can watch Tsehay do them one
  by one until each has a tick. Keyframes: kit.css (vc-*) and ./tsehays-little-hands.css.
*/

/** A small clay jug carried in a paw. */
function Jug() {
  return (
    <g>
      <path d="M-6 -12 L6 -12 L8 4 Q0 8 -8 4Z" fill="#B8683E" />
      <path d="M6 -10 Q12 -8 10 -2" stroke="#B8683E" strokeWidth={2.6} fill="none" />
    </g>
  );
}

/** The squares of a hopscotch game chalked on the ground. */
function Hopscotch({ x, y }: { x: number; y: number }) {
  const sq = (dx: number, dy: number, k: number) => <rect key={k} x={dx - 14} y={dy - 9} width={28} height={18} fill="none" stroke="#FFFDF4" strokeWidth={2} />;
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.9}>
      {sq(0, 0, 1)}
      {sq(30, 0, 2)}
      {sq(60, -8, 3)}
      {sq(60, 10, 4)}
      {sq(90, 0, 5)}
      {sq(120, -8, 6)}
      {sq(120, 10, 7)}
    </g>
  );
}

export default function TsehaysLittleHands({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Mama does everything at once: rocks the baby, cooks the shiro, sweeps, fetches the water.
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <Hearth x={96} y={270} />
          <Broom x={330} y={258} s={1.1} />
          <WaterPot x={372} y={272} s={0.8} fill={0} />
          <Place x={210} y={292} s={0.52} className="tsehays-little-hands-busy" tap={TAP.mama}>
            <Mama baby="awake" mood="worried" />
          </Place>
          <Place x={290} y={298} s={0.32} flip tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          {[
            [166, 140, 0.6],
            [240, 126, 1.2],
            [292, 150, 1.8],
          ].map(([sx, sy, d]) => (
            <g key={sx} transform={`translate(${sx} ${sy})`}>
              <g className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>
                <path d="M-6 -6 l12 12 M6 -6 l-12 12" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.7} className="lali-twinkle" />
              </g>
            </g>
          ))}
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // Mama falls asleep. Tsehay: "I wish I could help. But my hands are so little."
    case 1:
      return (
        <g>
          <Home id={id} time="morning" />
          <Cradle x={110} y={276} s={1.1}>
            <Baby face="sleep" s={1.1} />
          </Cradle>
          <Place x={300} y={292} s={0.5} flip tap={TAP.mama}>
            <Mama sleepy mood="happy" />
          </Place>
          <Zzz x={280} y={170} color="#7A5A8E" />
          <Place x={200} y={296} s={0.38} tap={TAP.tsehay}>
            <Tsehay mood="worried" pose="wave" />
          </Place>
          <Speech x={170} y={150} w={44} h={36} think tail="right" delay={1}>
            <g transform="translate(0 2)">
              <ellipse cx={-6} cy={0} rx={6} ry={7} fill="#5A3A2A" />
              <ellipse cx={7} cy={0} rx={6} ry={7} fill="#5A3A2A" />
            </g>
          </Speech>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Gugu and Hawi call from the door. Tsehay whispers: "Soon! First, a surprise for Mama."
    case 2:
      return (
        <g>
          <Home id={id} time="morning" door="open" />
          <Place x={86} y={250} s={0.3} tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Place x={116} y={252} s={0.28} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={200} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Speech x={250} y={150} w={46} h={38} tail="left" delay={1.2}>
            <g transform="translate(0 3)">
              <rect x={-10} y={-8} width={20} height={16} rx={2} fill="#E2463F" />
              <path d="M0 -8 V8 M-10 0 H10" stroke="#FFD233" strokeWidth={3} />
              <path d="M0 -8 q-8 -8 -8 0 M0 -8 q8 -8 8 0" stroke="#FFD233" strokeWidth={2.4} fill="none" />
            </g>
          </Speech>
          <Place x={324} y={292} s={0.48} flip tap={TAP.mama}>
            <Mama sleepy />
          </Place>
          <Zzz x={306} y={174} color="#7A5A8E" />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // The broom is taller than Tsehay! A little at a time, corner by corner. Swish, swish.
    case 3:
      return (
        <g>
          <Home id={id} time="morning" />
          <g className="tsehays-little-hands-across">
            <Place x={160} y={294} s={0.42} tap={TAP.tsehay}>
              <Tsehay mood="joy" />
            </Place>
            <g transform="translate(212 290)">
              <Broom x={0} y={0} s={1.5} sweep />
            </g>
            <g fill="#D9B880">
              {[0, 0.5, 1].map((d) => (
                <circle key={d} cx={226} cy={290} r={5} className="vc-puff" style={vars({ "--delay": `${-d}s`, "--px": "18px" })} />
              ))}
            </g>
          </g>
          <Place x={330} y={292} s={0.46} flip tap={TAP.mama}>
            <Mama sleepy />
          </Place>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // The lentils: sharp eyes and small fingers, just right for tiny stones. Pick, pick, pick!
    case 4:
      return (
        <g>
          <Home id={id} time="day" />
          <LentilTray x={214} y={270} s={1.5} stones={4} />
          <Place x={160} y={296} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <g transform="translate(240 230)">
            <g className="vc-rise" style={vars({ "--dur": "2.4s", "--dx": "20px" })}>
              <circle r={2.4} fill="#6A6A72" />
            </g>
          </g>
          <BeeHover x={290} y={196} s={0.9} flip />
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // The water: back and forth with her own little jug, ten times. Splash! She wipes it up.
    case 5:
      return (
        <g>
          <Home id={id} time="day" door="open" />
          <Jerrycan x={140} y={278} s={1.1} />
          <WaterPot x={300} y={276} s={1.1} fill={0.8} />
          <g className="tsehays-little-hands-trips">
            <Place x={230} y={294} s={0.4} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
              <g transform="translate(160 84) scale(2)">
                <Jug />
              </g>
            </Place>
          </g>
          <g fill="#7FC8F8">
            {[0, 0.4, 0.8].map((d, i) => (
              <circle key={d} cx={286 + i * 8} cy={214} r={2.4} className="vc-rise" style={vars({ "--delay": `${-d}s`, "--dur": "1.4s", "--dx": `${(i - 1) * 8}px` })} />
            ))}
          </g>
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} transform={`translate(${140 + i * 14} 60)`}>
              <circle r={4.6} fill="#FFFFFF" opacity={0.6} className="lali-pop-in" style={vars({ "--delay": `${0.6 + i * 0.4}s` })} />
            </g>
          ))}
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // Dawit wakes crying. Tsehay rocks the cradle and sings Mama's lullaby: "Eshururu…"
    case 6:
      return (
        <g>
          <Home id={id} time="day" />
          <Cradle x={190} y={280} s={1.3} rock>
            <g className="tsehays-little-hands-cry">
              <Baby face="cry" s={1.1} />
            </g>
            <g className="tsehays-little-hands-hush">
              <Baby face="sleep" s={1.1} />
            </g>
          </Cradle>
          <Place x={116} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="happy" pose="point" />
          </Place>
          <Notes x={150} y={180} color="#7A5A8E" />
          <Place x={334} y={292} s={0.46} flip tap={TAP.mama}>
            <Mama sleepy mood="worried" />
          </Place>
          <Air kind="day" seed={15} grass={false} />
        </g>
      );
    // Mama wakes: who swept, who cleaned the lentils, who filled the pot, who sang Dawit to sleep?
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <Broom x={70} y={268} s={0.9} />
          <Tick x={70} y={196} delay={0.6} />
          <LentilTray x={150} y={278} s={0.8} stones={0} />
          <Tick x={150} y={246} delay={1.2} />
          <WaterPot x={350} y={276} s={0.9} />
          <Tick x={350} y={210} delay={1.8} />
          <Cradle x={260} y={280} s={0.9}>
            <Baby face="sleep" />
          </Cradle>
          <Tick x={260} y={226} delay={2.4} />
          <Place x={208} y={290} s={0.5} tap={TAP.mama}>
            <Mama mood="wow" />
          </Place>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // "These did!" Tsehay holds up her little hands. Mama hugs her: "Little hands can help a lot!"
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={240} y={292} s={0.56} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={156} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="wave" />
          </Place>
          <Sparkles x={196} y={150} r={46} delay={0.8} n={7} />
          <Hearts spots={[[200, 180, 1], [226, 168, 2], [178, 160, 2.8]]} />
          <BeeHover x={330} y={150} s={1} flip />
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // Mama isn't tired any more: kolo for your friends! Crackle, crackle in the pan.
    case 9:
      return (
        <g>
          <Home id={id} time="day" />
          <Hearth x={200} y={274} pot={false}>
            <g transform="translate(0 -18)">
              <ellipse cx={0} cy={0} rx={34} ry={7} fill="#4A4A50" />
              <ellipse cx={0} cy={-2} rx={30} ry={5} fill="#5E5E66" />
              {Array.from({ length: 16 }, (_, i) => (
                <ellipse key={i} cx={-24 + (i % 8) * 7} cy={-3 + Math.floor(i / 8) * 2} rx={2.4} ry={1.6} fill={i % 2 ? "#B8742E" : "#9A5A20"} className="vc-pop" style={vars({ "--delay": `${-(i % 5) * 0.3}s`, "--dur": "0.8s" })} />
              ))}
              <Steam x={0} y={-8} />
            </g>
          </Hearth>
          <Place x={300} y={292} s={0.5} flip tap={TAP.mama}>
            <Mama mood="joy" />
          </Place>
          <Place x={110} y={294} s={0.42} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <SnackBowl x={150} y={276} s={1} kind="kolo" />
          <Air kind="day" seed={21} grass={false} />
        </g>
      );
    // Hopscotch and kolo outside: Mama with Dawit on her back, Tsehay hopping highest of all.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" />
          <Hopscotch x={130} y={268} />
          <Place x={140} y={274} s={0.36} className="lali-hop" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="hop" />
          </Place>
          <Place x={252} y={282} s={0.44} className="tsehays-little-hands-hop" tap={TAP.mama}>
            <Mama mood="joy" back />
          </Place>
          <Place x={50} y={296} s={0.34} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <SnackBowl x={86} y={290} s={0.8} kind="kolo" />
          <Place x={350} y={296} s={0.34} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <BeeHover x={200} y={150} s={1} />
          <Air kind="day" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
