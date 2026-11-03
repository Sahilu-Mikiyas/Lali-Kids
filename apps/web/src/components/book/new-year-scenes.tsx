"use client";

import { useId } from "react";

import { CubShape, GuguShape } from "../characters";
import {
  Acacia,
  BeeFlight,
  BeeHover,
  Birds,
  Bubble,
  Butterfly,
  DayBackdrop,
  Daisy,
  DriftCloud,
  Fireflies,
  Grass,
  Heart,
  Hills,
  Moon,
  Mountains,
  NumberBadge,
  Place,
  rand,
  Sky,
  Stars,
  Sun,
  Tukul,
  vars,
  Water,
} from "./scenery";

/*
  "Anbessa and the New Year Flowers": one living picture per page (12 pages).
  The river pages share one side-on layout: banks at x < 80 and x > 320, with five
  stepping stones at x = 108, 154, 200, 246 and 292, all with their tops at y = 240.
*/

const STONES = [108, 154, 200, 246, 292];
const BANK_Y = 240;

function DaisyField({ seed, n, top, bottom, x0 = 0, x1 = 400, s = 1 }: { seed: number; n: number; top: number; bottom: number; x0?: number; x1?: number; s?: number }) {
  const rnd = rand(seed);
  const spots = Array.from({ length: n }, () => {
    const y = top + rnd() * (bottom - top);
    return { x: x0 + rnd() * (x1 - x0), y, d: -rnd() * 3, depth: (y - top) / Math.max(1, bottom - top) };
  }).sort((a, b) => a.y - b.y);
  return (
    <g>
      {spots.map((p, i) => (
        <Daisy key={i} x={Math.round(p.x)} y={Math.round(p.y)} h={10 + p.depth * 18} s={(0.45 + p.depth * 0.6) * s} delay={Math.round(p.d * 10) / 10} />
      ))}
    </g>
  );
}

/** The river pages: sky, far hills, the two banks and the water between. */
function RiverSide({ id, stones = true }: { id: string; stones?: boolean }) {
  return (
    <>
      <DayBackdrop id={id} sun={[350, 50]} hills={false} />
      <Hills back="#8FD39A" front="#74C987" backY={176} frontY={206} />
      <Acacia x={300} y={204} s={0.5} />
      <Acacia x={60} y={196} s={0.42} />
      <Water y={226} h={80} />
      {stones &&
        STONES.map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy={BANK_Y + 6} rx={22} ry={7} fill="#2F7FB4" opacity={0.5} />
            <path d={`M${x - 20} ${BANK_Y + 6} Q${x - 18} ${BANK_Y - 6} ${x} ${BANK_Y - 6} Q${x + 18} ${BANK_Y - 6} ${x + 20} ${BANK_Y + 6}Z`} fill={i % 2 ? "#A8A4B4" : "#9A96A8"} />
            <path d={`M${x - 10} ${BANK_Y - 2} Q${x - 2} ${BANK_Y - 6} ${x + 6} ${BANK_Y - 4}`} stroke="#fff" strokeOpacity={0.4} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          </g>
        ))}
      {/* banks */}
      <path d="M-10 236 Q40 230 78 238 Q86 260 78 300 L-10 300Z" fill="#5CBF73" />
      <path d="M410 236 Q360 230 322 238 Q314 260 322 300 L410 300Z" fill="#5CBF73" />
      <Grass y={250} n={5} x0={0} x1={70} seed={41} />
      <Grass y={250} n={5} x0={330} x1={400} seed={42} />
      <Daisy x={20} y={280} h={20} delay={-1} />
      <Daisy x={386} y={282} h={18} delay={-2} />
    </>
  );
}

function DarkWood({ id, lit = false }: { id: string; lit?: boolean }) {
  return (
    <>
      <Sky id={id} from="#1A1446" mid="#3A2C74" to={lit ? "#6F5AA8" : "#5A4590"} />
      <Stars seed={17} n={18} bottom={120} />
      <Moon x={330} y={50} r={16} sleepy />
      <Mountains far="#3A3070" mid="#2E2862" />
      {/* the wood: rows of acacias, darker in front */}
      {[30, 110, 190, 270, 350].map((x, i) => (
        <Acacia key={x} x={x} y={214 - (i % 2) * 8} s={0.9} leaf="#3A3A78" leafDark="#2E2E66" trunk="#2B2552" />
      ))}
      <path d="M-10 230 Q100 214 200 226 T410 222 L410 310 L-10 310Z" fill="#26224E" />
      {[-10, 80, 300, 390].map((x) => (
        <Acacia key={x} x={x} y={262} s={1.25} leaf="#221E48" leafDark="#1A1740" trunk="#1A1740" />
      ))}
      {/* eyes blinking in the dark */}
      {[
        [86, 196],
        [318, 186],
      ].map(([x, y], i) => (
        <g key={i} fill="#FFE27A">
          <ellipse cx={x} cy={y} rx={3.4} ry={4} className="lali-blink" style={{ animationDelay: `${-i * 1.7}s` }} />
          <ellipse cx={x + 11} cy={y} rx={3.4} ry={4} className="lali-blink" style={{ animationDelay: `${-i * 1.7}s` }} />
        </g>
      ))}
      <path d={`M-10 276 Q120 262 220 272 T410 268 L410 310 L-10 310Z`} fill={lit ? "#3B3672" : "#1E1A42"} />
      <Grass y={286} n={12} color="#141238" seed={51} />
    </>
  );
}

/** The coffee pot (jebena), on its little stove with glowing coals. */
function Jebena({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-20 0 L-16 -16 L16 -16 L20 0Z" fill="#8A5A3A" />
      <g fill="#FF8A3D">
        {[-8, 0, 8].map((dx, i) => (
          <path key={dx} d={`M${dx - 4} -16 Q${dx} -28 ${dx + 4} -16Z`} className="lali-flicker" style={vars({ "--delay": `${-i * 0.23}s` })} />
        ))}
      </g>
      <g transform="translate(0 -18)">
        <ellipse cx={0} cy={-18} rx={20} ry={19} fill="#2E2222" />
        <path d="M-6 -34 L-5 -54 L5 -54 L6 -34Z" fill="#2E2222" />
        <rect x={-7} y={-58} width={14} height={6} rx={3} fill="#4A3434" />
        <path d="M14 -26 Q30 -32 34 -46" stroke="#2E2222" strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M-6 -50 Q-22 -46 -18 -26" stroke="#2E2222" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M-12 -26 Q-8 -32 -2 -30" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none" strokeLinecap="round" />
        <g fill="#fff">
          {[0, 1.2].map((d) => (
            <circle key={d} cx={34} cy={-50} r={4} className="lali-smoke" style={vars({ "--delay": `${-d}s`, "--dur": "2.4s" })} />
          ))}
        </g>
      </g>
    </g>
  );
}

/** Little handle-less coffee cups (sini) on a low tray, steaming. */
function Cups({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-34} y={-8} width={68} height={8} rx={3} fill="#B9824E" />
      <rect x={-30} y={0} width={5} height={10} fill="#8A5E3A" />
      <rect x={25} y={0} width={5} height={10} fill="#8A5E3A" />
      {[-22, -7, 8, 23].map((cx, i) => (
        <g key={cx}>
          <path d={`M${cx - 6} -18 L${cx - 4} -8 L${cx + 4} -8 L${cx + 6} -18Z`} fill="#FFFDF4" />
          <path d={`M${cx - 5} -14 L${cx + 5} -14`} stroke="#2E9A8A" strokeWidth={1.6} />
          <circle cx={cx} cy={-24} r={3} fill="#fff" className="lali-smoke" style={vars({ "--delay": `${-i * 0.8}s`, "--dur": "3s" })} />
        </g>
      ))}
    </g>
  );
}

function Bouquet({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Daisy x={-8} y={0} h={30} delay={-0.4} />
      <Daisy x={6} y={0} h={36} delay={-1.2} />
      <Daisy x={0} y={0} h={24} delay={-2} />
      <Daisy x={14} y={0} h={26} delay={-0.8} />
      <Daisy x={-14} y={0} h={22} delay={-1.6} />
      <path d="M-10 -10 L10 -10 L4 4 L-4 4Z" fill="#E8513B" />
      <path d="M-8 -6 L8 -6" stroke="#F5B21E" strokeWidth={2} />
    </g>
  );
}

export function FlowerScene({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // High in the green mountains... lived a little lion cub called Anbessa.
    case 0:
      return (
        <>
          <DayBackdrop id={id} />
          <Acacia x={330} y={214} s={0.9} />
          <Tukul x={120} y={236} s={1.05} />
          <Grass y={262} n={16} seed={3} />
          <DaisyField seed={5} n={9} top={244} bottom={290} />
          <Place x={250} y={258} s={0.38} from={[130, 240]} dur={2.4} delay={0.7}>
            <CubShape pose="walk" />
          </Place>
          <Butterfly x={300} y={170} delay={-1} />
        </>
      );
    // Tomorrow is New Year! "I want to give Grandma the yellow New Year flowers."
    case 1:
      return (
        <>
          <DayBackdrop id={id} sun={[350, 48]} />
          <Tukul x={92} y={234} s={0.95} />
          <Grass y={262} n={14} seed={8} />
          <Place x={168} y={262} s={0.36}>
            <CubShape pose="sit" granny />
          </Place>
          <Place x={282} y={262} s={0.36} flip>
            <CubShape pose="stand" mood="joy" />
          </Place>
          {/* his wish, in a thought cloud */}
          <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
            <circle cx={300} cy={140} r={4} fill="#fff" />
            <circle cx={310} cy={124} r={7} fill="#fff" />
            <ellipse cx={322} cy={88} rx={46} ry={32} fill="#fff" />
            <circle cx={296} cy={78} r={20} fill="#fff" />
            <circle cx={344} cy={76} r={20} fill="#fff" />
          </g>
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <Daisy x={306} y={112} h={26} />
            <Daisy x={322} y={112} h={34} delay={-1} />
            <Daisy x={338} y={112} h={26} delay={-2} />
          </g>
        </>
      );
    // But the flowers grow far away, over the river and past the dark wood.
    case 2:
      return (
        <>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Sun x={340} y={52} r={20} />
          <DriftCloud y={50} s={0.6} dur={70} phase={0.4} />
          <Mountains y={-24} />
          {/* the golden hill, far away */}
          <path d="M200 150 Q300 92 420 132 L420 200 L200 200Z" fill="#F7D046" />
          <path d="M226 150 Q300 104 410 136" stroke="#FFE88A" strokeWidth={4} fill="none" opacity={0.7} className="lali-pulse" />
          <DaisyField seed={12} n={16} top={120} bottom={160} x0={250} x1={400} s={0.6} />
          {/* the dark wood */}
          {[150, 200, 250, 300, 350, 110].map((x, i) => (
            <Acacia key={x} x={x} y={182 + (i % 2) * 4} s={0.5} leaf="#2E5A4A" leafDark="#24493C" trunk="#24493C" />
          ))}
          <path d="M-10 182 Q140 168 420 186 L420 210 L-10 210Z" fill="#3E8F5A" />
          <Water y={200} h={22} />
          <path d="M-10 222 Q200 208 410 224 L410 310 L-10 310Z" fill="#5CBF73" />
          {/* the long way there */}
          <path d="M108 262 Q180 236 210 214 M232 196 Q262 176 300 150" stroke="#fff" strokeWidth={3} strokeDasharray="1 8" strokeLinecap="round" fill="none" />
          <Grass y={270} n={14} seed={13} />
          <Place x={88} y={278} s={0.4}>
            <CubShape pose="stand" mood="worried" look={2} />
          </Place>
        </>
      );
    // Buzz, buzz! Lali the bee zoomed down. "I know the way! Follow me!"
    case 3:
      return (
        <>
          <DayBackdrop id={id} birds={false} />
          <Acacia x={60} y={220} s={0.8} />
          <Grass y={262} n={16} seed={21} />
          <DaisyField seed={22} n={10} top={244} bottom={292} />
          <BeeFlight
            path="M90 140 C120 70 200 60 220 100 C232 126 268 132 268 108 C268 84 236 86 240 112 C246 150 320 150 340 104 C356 70 300 40 250 64 C200 90 120 180 90 140Z"
            dur={7}
            s={1.4}
            rest={[250, 96]}
          />
          <Place x={150} y={262} s={0.4}>
            <CubShape pose="stand" mood="joy" look={2} />
          </Place>
          <Bubble x={300} y={210} w={112} delay={1}>
            Follow me!
          </Bubble>
        </>
      );
    // Anbessa walked and walked to the river. Swoosh! "I am too little."
    case 4:
      return (
        <>
          <RiverSide id={id} />
          <g className="lali-shh" style={vars({ "--delay": "-1s" })}>
            <text x={210} y={208} fontSize={20} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#fff" stroke="#2F7FB4" strokeWidth={1} textAnchor="middle">
              Swoosh!
            </text>
          </g>
          <Place x={46} y={262} s={0.34} from={[-50, 262]} dur={2} delay={0.6}>
            <CubShape pose="walk" mood="worried" />
          </Place>
        </>
      );
    // Hop! Gugu the gelada jumped onto a stone. "Look, stepping stones! Let's count them!"
    case 5:
      return (
        <>
          <RiverSide id={id} />
          {STONES.map((x, i) => (
            <NumberBadge key={x} x={x} y={BANK_Y + 30} n={String(i + 1)} delay={1.6 + i * 0.5} color="#2B3A8C" />
          ))}
          <Place x={STONES[0]} y={BANK_Y - 4} s={0.28} className="lali-hop">
            <GuguShape pose="point" mood="joy" />
          </Place>
          <Place x={46} y={262} s={0.34}>
            <CubShape pose="stand" mood="wow" />
          </Place>
          <Bubble x={190} y={150} w={120} delay={0.9}>
            Let&rsquo;s count!
          </Bubble>
        </>
      );
    // Anbessa's legs went wobble, wobble. Gugu held his paw: "Little by little, step by step!"
    case 6:
      return (
        <>
          <DayBackdrop id={id} sun={[60, 50]} hills={false} />
          <Water y={196} h={60} />
          <path d="M-10 236 Q200 222 410 238 L410 310 L-10 310Z" fill="#5CBF73" />
          <Grass y={270} n={16} seed={61} />
          <Daisy x={30} y={290} h={26} delay={-0.4} />
          <Daisy x={370} y={288} h={24} delay={-1.4} />
          <Place x={146} y={286} s={0.56} className="lali-wobble">
            <CubShape pose="stand" mood="worried" look={3} />
          </Place>
          <Place x={276} y={288} s={0.5} flip>
            <GuguShape pose="wave" />
          </Place>
          <Bubble x={250} y={62} w={170} delay={1.2} tail="right">
            Step by step!
          </Bubble>
        </>
      );
    // One, two, three, four, FIVE! ... Anbessa crossed the river!
    case 7:
      return (
        <>
          <RiverSide id={id} />
          {STONES.map((x, i) => (
            <NumberBadge key={x} x={x} y={BANK_Y + 30} n={String(i + 1)} delay={0.8 + (i + 1) * (5 / 6)} color="#2B3A8C" />
          ))}
          <Place x={40} y={262} s={0.3} className="lali-hop">
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeHover x={200} y={120} s={1.3} />
          <g transform={`translate(352 ${BANK_Y + 2})`}>
            <g className="lali-cross" style={vars({ "--walk-delay": "0.8s", "--steps": 12 })}>
              <g transform="scale(0.3) translate(-100 -230)">
                <CubShape pose="walk" mood="joy" />
              </g>
            </g>
          </g>
        </>
      );
    // Next came the dark wood. The trees whispered, "Shhh." Anbessa felt scared again.
    case 8:
      return (
        <>
          <DarkWood id={id} />
          {[
            [120, 150, 0],
            [270, 140, -1.5],
          ].map(([x, y, d]) => (
            <g key={x} className="lali-shh" style={vars({ "--delay": `${d}s` })}>
              <text x={x} y={y} fontSize={20} fontFamily="var(--font-grandstander)" fontWeight={900} fill="#C9C2FF" textAnchor="middle">
                Shhh…
              </text>
            </g>
          ))}
          <Place x={200} y={284} s={0.4} className="lali-wobble">
            <CubShape pose="stand" mood="worried" look={-2} />
          </Place>
        </>
      );
    // Lali called her firefly friends. Blink, blink, blink! ... walked through the wood.
    case 9:
      return (
        <>
          <DarkWood id={id} lit />
          <Fireflies seed={71} n={16} top={150} bottom={270} />
          <Fireflies seed={72} n={8} top={200} bottom={280} x0={120} x1={320} />
          <g className="lali-pulse" style={vars({ "--dur": "2s" })}>
            <ellipse cx={200} cy={286} rx={150} ry={14} fill="#FFF27A" opacity={0.18} />
          </g>
          <BeeHover x={300} y={160} s={1.3} flip />
          <circle cx={300} cy={160} r={22} fill="#FFF27A" opacity={0.2} className="lali-pulse" />
          <Place x={250} y={286} s={0.38} from={[60, 286]} dur={3} delay={0.6}>
            <CubShape pose="walk" mood="happy" />
          </Place>
        </>
      );
    // A whole hill of yellow flowers, shining like the sun. He picked a big bunch for Grandma.
    case 10:
      return (
        <>
          <Sky id={id} from="#6FC6FF" mid="#BFE8FF" to="#FFF6D6" />
          <Sun x={200} y={70} r={30} />
          <DriftCloud y={40} s={0.7} dur={80} phase={0.2} />
          <Birds y={90} dur={20} phase={0.6} />
          <Mountains y={20} />
          <path d="M-10 190 Q120 130 220 160 T420 150 L420 310 L-10 310Z" fill="#F2C53D" />
          <path d="M-10 230 Q200 196 420 226 L420 310 L-10 310Z" fill="#8CCB5E" />
          <DaisyField seed={81} n={26} top={150} bottom={226} s={0.8} />
          <DaisyField seed={82} n={22} top={236} bottom={296} s={1.1} />
          <Place x={170} y={268} s={0.38} className="lali-hop">
            <CubShape pose="sit" mood="joy" />
          </Place>
          <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
            <Bouquet x={222} y={270} s={1.1} />
          </g>
          <Place x={316} y={270} s={0.32} flip>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <BeeFlight path="M60 130 C80 80 140 80 150 120 C158 150 120 160 112 130 C104 100 160 90 200 120 C240 150 300 120 320 100 C340 80 300 60 250 90 C200 120 100 180 60 130Z" dur={9} s={1.1} rest={[150, 120]} />
          <Butterfly x={60} y={200} color="#FF8FB1" />
          <Butterfly x={360} y={180} color="#B98CFF" delay={-1.2} />
        </>
      );
    // At home, Grandma made coffee and hugged him tight. "Happy New Year! You were brave!"
    default:
      return (
        <>
          <Sky id={id} from="#4A3C8C" mid="#E07A6A" to="#FFC27A" />
          <Stars seed={91} n={10} bottom={70} />
          <Sun x={330} y={170} r={22} face={false} />
          <Mountains far="#8A6AA8" mid="#6E5296" y={22} />
          <Hills back="#6FA86A" front="#5C9A5A" backY={218} frontY={246} />
          <Tukul x={64} y={234} s={0.95} glow />
          {/* the coffee ceremony: fresh grass and flowers on the ground */}
          <ellipse cx={210} cy={276} rx={170} ry={22} fill="#7FCB6A" />
          <DaisyField seed={92} n={12} top={262} bottom={292} x0={60} x1={360} s={0.8} />
          <Place x={140} y={274} s={0.4}>
            <CubShape pose="sit" granny mood="joy" />
          </Place>
          <Place x={188} y={276} s={0.36} className="lali-tilt">
            <CubShape pose="sit" mood="joy" />
          </Place>
          <Jebena x={244} y={278} />
          <Cups x={300} y={280} />
          <Place x={362} y={278} s={0.3} flip>
            <GuguShape pose="wave" mood="joy" />
          </Place>
          <Bouquet x={104} y={286} s={0.9} />
          <BeeHover x={230} y={150} s={1.2} />
          <Heart x={164} y={176} s={1.3} />
          <Heart x={200} y={160} s={1} delay={-1.4} />
          <Heart x={130} y={180} s={0.8} delay={-2.4} />
        </>
      );
  }
}
