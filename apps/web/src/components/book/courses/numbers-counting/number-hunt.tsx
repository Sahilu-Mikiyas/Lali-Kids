"use client";

import "./number-hunt.css";

import { useId } from "react";

import { geez } from "@/content/courses/numbers-counting/numbers";
import { CubShape, GuguShape } from "../../../characters";
import { Air, BeeFlight, BeeHover, Bubble, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Bloom, Cheer, Cup, d, ETHIOPIC, GrannyShape, Hops, Land, LATIN, Market, NumberCard, NumTag, Orange, r1, spots, Tally, TAP_CUB, TAP_GUGU, TAP_TSEHAY, TsehayShape } from "./kit";

/*
  "Lali's Number Hunt": one living picture per page (13 pages). Every number Lali and Tsehay
  find is shown both ways, the Ge'ez numeral and the digit, next to the things it counts, and
  those things light up one by one as they are counted to check. Story keyframes are
  number-hunt-* in ./number-hunt.css; the kit's are nc-* in ./kit.css.
*/

const SAND = "#E9CF9C";

/** Writing in the sand: the sign drawn in brown, fading in as if traced. */
function SandSign({ x, y, text, size = 46, delay = 1, geezFont = false }: { x: number; y: number; text: string; size?: number; delay?: number; geezFont?: boolean }) {
  return (
    <g className="number-hunt-trace" style={d(delay)}>
      <Tappable reaction="grow" sound="chime">
        <text x={x} y={y} fontSize={size} fontFamily={geezFont ? ETHIOPIC : LATIN} fontWeight={800} fill="#8A5A2E" textAnchor="middle" opacity={0.85}>
          {text}
        </text>
      </Tappable>
    </g>
  );
}

/** A patch of smooth sand to write in. */
function SandPatch({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <ellipse cx={x} cy={y} rx={w / 2} ry={h / 2} fill={SAND} stroke="#D6B47A" strokeWidth={2} />;
}

/** A little brass bell, swinging. */
function Bell({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -10 V0" stroke="#6A4A2A" strokeWidth={2} />
      <g className="number-hunt-swing" style={d(delay)}>
        <Tappable reaction="wiggle" sound="chime">
          <path d="M-9 14 Q-9 0 0 0 Q9 0 9 14Z" fill="#E8B64A" stroke="#B88A2A" strokeWidth={1.6} />
          <circle cx={0} cy={16} r={2.6} fill="#B88A2A" />
        </Tappable>
      </g>
    </g>
  );
}

/** The blue bajaj (a three-wheeled taxi) with a number on its side. */
function Bajaj({ n }: { n: number }) {
  const heads = ["#F4EEE6", "#A8744A", "#D9A46A", "#3A2E2A"];
  return (
    <g>
      <ellipse cx={0} cy={2} rx={66} ry={6} fill="#000" opacity={0.14} />
      <path d="M-60 -10 Q-62 -66 -10 -70 L40 -70 Q60 -68 62 -40 L64 -10Z" fill="#2F6FD0" />
      <path d="M-50 -40 Q-48 -60 -12 -62 L30 -62 L30 -40Z" fill="#CFE8FF" />
      {heads.map((c, i) => (
        <g key={i} className="number-hunt-wave" style={d(0.4 + i * 0.3)}>
          <circle cx={-38 + i * 18} cy={-46} r={7} fill={c} />
          <circle cx={-40 + i * 18} cy={-48} r={1.2} fill="#1A0F0A" />
          <circle cx={-36 + i * 18} cy={-48} r={1.2} fill="#1A0F0A" />
        </g>
      ))}
      <rect x={-60} y={-24} width={124} height={14} rx={4} fill="#1F55A8" />
      <circle cx={46} cy={-50} r={10} fill="#fff" />
      <text x={46} y={-44} fontSize={16} fontFamily={LATIN} fontWeight={900} fill="#1F55A8" textAnchor="middle">
        {n}
      </text>
      {[-38, 40].map((x) => (
        <g key={x} transform={`translate(${x} -6)`}>
          <g className="nc-turn" style={vars({ "--dur": "0.6s" })}>
            <circle r={10} fill="#2A2A2A" />
            <circle r={4} fill="#9A9A9A" />
            <path d="M0 -8 V8 M-8 0 H8" stroke="#6A6A6A" strokeWidth={1.4} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** One hand, fingers up, each fingertip counted in turn (n0 is the first finger's number). */
function Hand({ x, y, n0, flip = false, start }: { x: number; y: number; n0: number; flip?: boolean; start: number }) {
  const fingers = [-26, -13, 0, 13, 26];
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <Tappable reaction="wiggle" sound="giggle">
        <ellipse cx={0} cy={10} rx={34} ry={30} fill="#7A4E36" />
        {fingers.map((fx, i) => (
          <g key={i} className="number-hunt-wiggle" style={d(start + i * 0.4)}>
            <rect x={fx - 5.5} y={i === 0 || i === 4 ? -36 : -52} width={11} height={i === 0 || i === 4 ? 40 : 56} rx={5.5} fill="#7A4E36" transform={i === 0 ? "rotate(-22 -26 0)" : undefined} />
          </g>
        ))}
      </Tappable>
      {fingers.map((fx, i) => {
        const tx = i === 0 ? fx - 12 : fx;
        const ty = i === 0 || i === 4 ? -46 : -62;
        return (
          <g key={i} transform={`scale(${flip ? -1 : 1} 1)`}>
            <NumTag x={flip ? -tx : tx} y={ty} n={n0 + i} delay={start + i * 0.4} s={0.5} />
          </g>
        );
      })}
    </g>
  );
}

export default function NumberHunt({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Lali found a strange mark on a flat stone: ፩. "That is one, the Ge'ez way. And this is one too: 1."
    case 0:
      return (
        <g>
          <Land id={id} time="dawn" />
          <ellipse cx={170} cy={252} rx={80} ry={22} fill="#A9A3B4" />
          <ellipse cx={164} cy={246} rx={70} ry={16} fill="#C2BDCB" />
          <text x={140} y={256} fontSize={30} fontFamily={ETHIOPIC} fontWeight={800} fill="#6A6474" textAnchor="middle">
            ፩
          </text>
          <SandSign x={196} y={258} text="1" size={30} delay={2.2} />
          <g className="lali-pop-in" style={d(1.4)}>
            <circle cx={140} cy={246} r={22} fill="none" stroke="#FFD233" strokeWidth={3} className="lali-pulse" />
          </g>
          <BeeHover x={150} y={190} s={1.3} />
          <Place x={320} y={292} s={0.44}>
            <GrannyShape />
          </Place>
          <NumberCard x={200} y={92} steps={[[1, 2.8]]} />
          <Air kind="day" seed={2} />
        </g>
      );
    // Grandma drew ፪ and 2. "Like two hats on one head." Lali flew two loops.
    case 1:
      return (
        <g>
          <Land id={id} />
          <SandPatch x={200} y={256} w={250} h={60} />
          <SandSign x={140} y={274} text="፪" size={50} delay={0.8} geezFont />
          <g className="lali-pop-in" style={d(2)}>
            <text x={200} y={268} fontSize={30} fontFamily={LATIN} fontWeight={900} fill="#2F5BD3" textAnchor="middle">
              =
            </text>
          </g>
          <SandSign x={260} y={274} text="2" size={50} delay={1.5} />
          <BeeFlight path="M150 140 C110 100 150 60 190 100 C230 140 270 100 250 70 C230 40 190 80 200 120 C210 160 180 160 150 140Z" dur={4} s={1.2} rest={[200, 120]} happy />
          <Place x={52} y={292} s={0.4}>
            <GrannyShape />
          </Place>
          <Place x={350} y={292} s={0.36} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Air kind="day" seed={4} />
        </g>
      );
    // On the church gate hung three bells, with a sign: ፫, 3.
    case 2:
      return (
        <g>
          <Land id={id} hills={false} />
          <path d="M-10 230 Q200 220 410 230 L410 310 L-10 310Z" fill="#7FC88A" />
          {/* the gate */}
          <g transform="translate(200 230)">
            <rect x={-90} y={-150} width={22} height={150} fill="#E8DCC8" />
            <rect x={68} y={-150} width={22} height={150} fill="#E8DCC8" />
            <path d="M-96 -150 Q0 -210 96 -150 L96 -136 Q0 -192 -96 -136Z" fill="#D9C2A0" />
            <path d="M0 -206 V-182 M-8 -196 H8" stroke="#E8B64A" strokeWidth={4} strokeLinecap="round" />
            <path d="M-68 -138 H68" stroke="#8A5A36" strokeWidth={4} />
          </g>
          {[-40, 0, 40].map((dx, i) => (
            <g key={i}>
              <Bell x={200 + dx} y={100} delay={-i * 0.5} />
              <NumTag x={200 + dx} y={146} n={i + 1} delay={1 + i * 0.6} s={0.6} />
            </g>
          ))}
          <NumTag x={200} y={58} n={3} delay={0.6} s={1.1} />
          <Place x={90} y={294} s={0.36} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" />
          </Place>
          <BeeHover x={312} y={200} s={1.1} flip />
          <Air kind="day" seed={6} />
        </g>
      );
    // A little blue bajaj rolled by with 4 on its side. Four passengers waving.
    case 3:
      return (
        <g>
          <Land id={id} hills={false} />
          <path d="M-10 214 Q200 206 410 214 L410 310 L-10 310Z" fill="#8ACB84" />
          <rect x={-10} y={238} width={420} height={40} fill="#6E6A72" />
          <path d="M0 258 H400" stroke="#fff" strokeWidth={3} strokeDasharray="18 14" />
          <g transform="translate(200 266)">
            <g className="nc-slide" style={vars({ "--fx": "-300px", "--fy": "0px", "--delay": "0.3s", "--dur": "1.8s" })}>
              <Tappable reaction="bounce" sound="boing">
                <Bajaj n={4} />
              </Tappable>
            </g>
          </g>
          {[0, 1, 2, 3].map((i) => (
            <NumTag key={i} x={162 + i * 18} y={190} n={i + 1} delay={2.4 + i * 0.5} s={0.5} />
          ))}
          <NumTag x={334} y={150} n={4} delay={4.6} s={1.1} />
          <BeeHover x={334} y={110} s={1} flip />
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // Oranges in piles with little signs. Tsehay found ፭ and 5 and counted: five!
    case 4: {
      const piles: [number, number][] = [
        [80, 3],
        [200, 5],
        [320, 2],
      ];
      return (
        <g>
          <Market id={id} />
          {piles.map(([x, n], k) => (
            <g key={k}>
              <rect x={x - 42} y={226} width={84} height={8} rx={4} fill="#8A5A36" />
              {spots(n, "heap", 18).map(([dx, dy], i) => (
                <g key={i} transform={`translate(${x + dx} ${218 + dy})`}>
                  <g className={n === 5 ? "nc-tap" : undefined} style={d(1.4 + i * 0.6)}>
                    <Orange x={0} y={0} s={1.1} />
                  </g>
                </g>
              ))}
              <g transform={`translate(${x} 248)`}>
                <rect x={-24} y={0} width={48} height={22} rx={4} fill="#FFFDF4" stroke="#8A5A36" strokeWidth={1.6} />
                <text x={-10} y={16} fontSize={14} fontFamily={ETHIOPIC} fontWeight={800} fill="#2A2414" textAnchor="middle">
                  {geez(n)}
                </text>
                <text x={11} y={16} fontSize={14} fontFamily={LATIN} fontWeight={900} fill="#2A2414" textAnchor="middle">
                  {n}
                </text>
              </g>
            </g>
          ))}
          {spots(5, "heap", 18).map(([dx, dy], i) => (
            <NumTag key={i} x={200 + dx} y={196 + dy} n={i + 1} delay={1.4 + i * 0.6} s={0.42} />
          ))}
          <Place x={140} y={304} s={0.24} tap={TAP_TSEHAY}>
            <TsehayShape pose="point" mood="joy" />
          </Place>
          <NumberCard x={200} y={92} steps={[[5, 4.6]]} s={0.9} />
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    }
    // A green gate with 6, six red flowers. A coffee tray with ፯ and seven cups.
    case 5:
      return (
        <g>
          <Land id={id} hills={false} />
          <path d="M-10 222 Q200 214 410 222 L410 310 L-10 310Z" fill="#8ACB84" />
          {/* the green gate */}
          <g transform="translate(100 226)">
            <rect x={-60} y={-110} width={120} height={110} rx={4} fill="#2E9A5A" />
            <path d="M-40 -110 V0 M-20 -110 V0 M0 -110 V0 M20 -110 V0 M40 -110 V0" stroke="#237A46" strokeWidth={3} />
            <circle cx={0} cy={-84} r={14} fill="#fff" />
            <text x={0} y={-77} fontSize={18} fontFamily={LATIN} fontWeight={900} fill="#237A46" textAnchor="middle">
              6
            </text>
          </g>
          <g transform="translate(100 262)">
            <path d="M-46 -8 L46 -8 L38 22 L-38 22Z" fill="#B5643A" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} className="lali-pop-in" style={d(0.8 + i * 0.4)}>
                <Bloom x={-35 + i * 14} y={-24 - (i % 2) * 8} s={1.2} color="#E2463F" />
              </g>
            ))}
          </g>
          <NumTag x={100} y={84} n={6} delay={3.4} />
          {/* the coffee tray */}
          <g transform="translate(296 250)">
            <ellipse cx={0} cy={6} rx={78} ry={18} fill="#8A5A36" />
            <ellipse cx={0} cy={2} rx={74} ry={15} fill="#A87448" />
            <text x={-66} y={10} fontSize={18} fontFamily={ETHIOPIC} fontWeight={800} fill="#FFF6D8">
              ፯
            </text>
            {spots(7, "grid", 24, 4).map(([dx, dy], i) => (
              <g key={i} className="lali-pop-in" style={d(3.6 + i * 0.3)}>
                <Cup x={dx + 8} y={dy * 0.75 + 6} s={1} />
              </g>
            ))}
          </g>
          <NumTag x={296} y={176} n={7} delay={6} />
          <BeeHover x={200} y={150} s={1} />
          <Air kind="day" seed={12} />
        </g>
      );
    // At school: 8 and ፰ on the board. Eight children on the bench.
    case 6: {
      const kids = ["#F4EEE6", "#A8744A", "#D9A46A", "#3A2E2A", "#C98A5A", "#F4EEE6", "#7A4E36", "#E8C08A"];
      return (
        <g>
          <rect width={400} height={300} fill="#F3E2C4" />
          <rect x={86} y={40} width={228} height={110} rx={8} fill="#2E5A44" stroke="#8A5A36" strokeWidth={8} />
          <g className="number-hunt-trace" style={d(0.6)}>
            <text x={160} y={118} fontSize={66} fontFamily={LATIN} fontWeight={900} fill="#F4F4EC" textAnchor="middle">
              8
            </text>
          </g>
          <g className="number-hunt-trace" style={d(1.4)}>
            <text x={250} y={118} fontSize={60} fontFamily={ETHIOPIC} fontWeight={800} fill="#F4F4EC" textAnchor="middle">
              ፰
            </text>
          </g>
          <path d="M-10 222 H410 V310 H-10Z" fill="#C99A64" />
          <rect x={40} y={232} width={320} height={10} rx={4} fill="#8A5A36" />
          <rect x={56} y={242} width={8} height={30} fill="#6A4028" />
          <rect x={336} y={242} width={8} height={30} fill="#6A4028" />
          {kids.map((c, i) => (
            <g key={i} transform={`translate(${66 + i * 38} 226)`}>
              <g className="nc-tap" style={d(2.2 + i * 0.45)}>
                <Tappable reaction="bounce" sound="giggle">
                  <rect x={-12} y={-30} width={24} height={30} rx={10} fill={["#E8513B", "#2F5BD3", "#F5B21E", "#2E9A8A"][i % 4]} />
                  <circle cx={0} cy={-40} r={12} fill={c} />
                  <circle cx={-4} cy={-42} r={1.6} fill="#1A0F0A" />
                  <circle cx={4} cy={-42} r={1.6} fill="#1A0F0A" />
                  <path d="M-4 -36 Q0 -33 4 -36" stroke="#1A0F0A" strokeWidth={1.2} fill="none" />
                </Tappable>
              </g>
              <NumTag x={0} y={-66} n={i + 1} delay={2.2 + i * 0.45} s={0.48} />
            </g>
          ))}
          <Place x={366} y={298} s={0.3} flip tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <BeeHover x={34} y={170} s={0.9} />
        </g>
      );
    }
    // A boy with 9 on his shirt kicked the ball up nine times.
    case 7:
      return (
        <g>
          <Land id={id} />
          <g transform="translate(200 160)">
            <g className="nc-jolt-loop" style={vars({ "--rise": "-60px", "--dur": "0.8s" })}>
              <Tappable reaction="spin" sound="boing">
                <circle r={13} fill="#fff" stroke="#2A2A2A" strokeWidth={1.6} />
                <path d="M0 -6 L5 -2 L3 5 L-3 5 L-5 -2Z" fill="#2A2A2A" />
              </Tappable>
            </g>
          </g>
          <Place x={210} y={294} s={0.5} tap={TAP_CUB}>
            <g>
              <CubShape pose="sit" mood="joy" look={0} />
              <path d="M62 170 Q100 160 138 170 L142 214 Q100 222 58 214Z" fill="#E8513B" />
              <text x={100} y={206} fontSize={34} fontFamily={LATIN} fontWeight={900} fill="#fff" textAnchor="middle">
                9
              </text>
            </g>
          </Place>
          <Tally total={9} count={9} at={[0.8, 1.6, 2.4, 3.2, 4, 4.8, 5.6, 6.4, 7.2]} />
          <Place x={60} y={294} s={0.32} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" />
          </Place>
          <Place x={340} y={294} s={0.34} flip tap={TAP_GUGU}>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Air kind="day" seed={14} />
        </g>
      );
    // Tsehay held up her hands and wiggled every finger. "Ten! 10 and ፲!"
    case 8:
      return (
        <g>
          <Land id={id} />
          <Hand x={130} y={206} n0={1} start={0.8} flip />
          <Hand x={270} y={206} n0={6} start={2.8} />
          <NumberCard x={200} y={68} steps={[[10, 5]]} s={1.05} />
          <Place x={200} y={300} s={0.34} tap={TAP_TSEHAY}>
            <TsehayShape mood="joy" pose="wave" />
          </Place>
          <Cheer pts={[[70, 110, 5.2], [330, 110, 5.4]]} />
          <Air kind="day" seed={16} />
        </g>
      );
    // Tsehay wrote in the sand: 1 is one line, ፩ has a little curl on top.
    case 9:
      return (
        <g>
          <Land id={id} time="dusk" />
          <SandPatch x={200} y={250} w={300} h={78} />
          <SandSign x={130} y={278} text="1" size={64} delay={0.8} />
          <SandSign x={270} y={278} text="፩" size={64} delay={2} geezFont />
          {/* the stick, moving from one to the other */}
          <g className="number-hunt-stick">
            <path d="M126 200 L150 140" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
          </g>
          <Place x={44} y={294} s={0.32} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" pose="point" />
          </Place>
          <BeeHover x={350} y={170} s={1} flip />
          <Air kind="dusk" seed={18} />
        </g>
      );
    // Lali looked at 10: "That is a 1 and a 0!" "But in Ge'ez, ten has its very own sign: ፲."
    case 10:
      return (
        <g>
          <Land id={id} time="dusk" />
          <SandPatch x={200} y={244} w={330} h={90} />
          <g transform="translate(150 270)">
            <g className="number-hunt-apart" style={vars({ "--x": "-22px" })}>
              <text x={-16} y={0} fontSize={62} fontFamily={LATIN} fontWeight={900} fill="#8A5A2E" textAnchor="middle">
                1
              </text>
            </g>
            <g className="number-hunt-apart" style={vars({ "--x": "22px" })}>
              <text x={20} y={0} fontSize={62} fontFamily={LATIN} fontWeight={900} fill="#8A5A2E" textAnchor="middle">
                0
              </text>
            </g>
          </g>
          <SandSign x={300} y={272} text="፲" size={62} delay={2.6} geezFont />
          <g className="lali-pop-in" style={d(3.2)}>
            <circle cx={300} cy={252} r={34} fill="none" stroke="#FFD233" strokeWidth={3} className="lali-pulse" />
          </g>
          <BeeHover x={150} y={170} s={1.3} />
          <Place x={354} y={180} s={0.26} flip>
            <GrannyShape />
          </Place>
          <Air kind="dusk" seed={20} />
        </g>
      );
    // Tsehay wrote 1 to 10 and ፩ to ፲. Lali sat on each number and counted it.
    case 11: {
      const xs = Array.from({ length: 10 }, (_, i) => 38 + i * 36);
      return (
        <g>
          <Land id={id} time="dusk" />
          <SandPatch x={200} y={240} w={392} h={100} />
          {xs.map((x, i) => (
            <g key={i}>
              <SandSign x={x} y={238} text={String(i + 1)} size={22} delay={0.3 + i * 0.12} />
              <SandSign x={x} y={274} text={geez(i + 1)} size={22} delay={0.4 + i * 0.12} geezFont />
            </g>
          ))}
          <Hops path={xs.map((x) => [x, 210] as [number, number])} start={1.8} step={0.55} h={22}>
            <BeeHover x={0} y={0} s={0.8} />
          </Hops>
          <Tally total={10} count={10} at={xs.map((_, i) => r1(2 + i * 0.55))} />
          <Air kind="dusk" seed={22} grass={false} />
        </g>
      );
    }
    // At night, Lali tried to count the stars. "The numbers never end!"
    case 12:
      return (
        <g>
          <Land id={id} time="night" sun={[340, 60]} />
          {([[80, 60], [150, 40], [220, 76]] as [number, number][]).map(([x, y], i) => (
            <NumTag key={i} x={x} y={y} n={i + 1} delay={0.8 + i * 0.7} s={0.6} color="#3B4BB0" />
          ))}
          <Bubble x={280} y={150} w={96} delay={3.4}>
            100… 1000…
          </Bubble>
          <BeeHover x={226} y={186} s={1.2} />
          <Place x={110} y={292} s={0.36} tap={TAP_TSEHAY}>
            <TsehayShape mood="happy" />
          </Place>
          <Air kind="night" seed={24} />
        </g>
      );
    default:
      return null;
  }
}
