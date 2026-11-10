"use client";

import "./wild-coffee-forest.css";

import { useId, type ReactNode } from "react";

import { Air, Depth, Place, rand, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { TAP, Wolf } from "./kit-cast";
import { Colobus, Envelope } from "./kit-culture";
import { CoffeeBush } from "./kit-land";
import { Sapling } from "./kit-past";
import { SkyFor, type Time } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Tall Trees, Little Coffee": one living picture per page (12 pages). Uncle Abebe's wild forest
  in the south-west; tall trees above and wild coffee in the shade below; the colobus leaping and
  the hornbill calling; the river kept flowing by the forest; Dawit and the axe; Desta goes to
  look; yellow bushes in the sun, heavy red ones in the shade; "it likes the shade"; the colobus
  mother and baby in the big tree; Dawit plants a tree instead; picking cherries; evening.
  Moves: wild-coffee-forest.css, kit.css, kit-land.css and lali-* (globals.css).
*/

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Uncle Abebe: a grown colobus in a white shawl and a green forest cap. */
function Uncle({ mood = "happy" as "happy" | "joy" | "wow" | "worried" }) {
  return (
    <g>
      <Colobus who="grandpa" mood={mood} />
      <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "6s" })}>
        <path d="M62 70 Q100 30 138 70 Q100 56 62 70Z" fill="#3E6A3A" />
        <path d="M120 64 Q148 62 152 70 Q134 70 120 68Z" fill="#2E5A2E" />
      </g>
    </g>
  );
}

/** Cousin Dawit: a young colobus in a blue shirt and a red cap. */
function Dawit({ mood = "happy" as "happy" | "joy" | "wow" | "worried", axe = false }) {
  return (
    <g>
      <Colobus who="desta" mood={mood} />
      <g className="lali-breathe">
        <path d="M64 180 Q100 170 136 180 L140 230 Q100 238 60 230Z" fill="#2F6FD0" />
      </g>
      <g className="lali-tilt" style={vars({ "--tilt": "6deg", "--dur": "6s" })}>
        <path d="M62 72 Q100 30 138 72 Q100 58 62 72Z" fill="#E2463F" />
      </g>
      {axe && (
        <g transform="translate(160 180) rotate(-30)">
          <rect x={-3} y={-60} width={6} height={70} rx={2} fill="#8A5A30" />
          <path d="M-2 -60 L-22 -66 L-22 -44 L-2 -48Z" fill="#9AA0AA" />
        </g>
      )}
    </g>
  );
}

/** A wild black-and-white colobus in the treetops, with a long white tail. */
function TreeColobus({ x, y, s = 1, flip = false, baby = false }: { x: number; y: number; s?: number; flip?: boolean; baby?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="boing">
        <g className="lali-tail" style={vars({ "--dur": "3s" })}>
          <path d="M-6 8 Q-14 30 -8 50" stroke="#1E1E26" strokeWidth={3} fill="none" strokeLinecap="round" />
          <ellipse cx={-8} cy={58} rx={5} ry={11} fill="#FFFFFF" />
        </g>
        <ellipse cx={0} cy={-2} rx={10} ry={13} fill="#1E1E26" />
        <path d="M-8 -10 Q-18 6 -12 18 Q-6 8 -4 -6Z" fill="#FFFFFF" />
        <path d="M8 -10 Q16 4 12 16 Q6 6 4 -6Z" fill="#FFFFFF" />
        <circle cx={4} cy={-20} r={7.4} fill="#1E1E26" />
        <circle cx={4} cy={-19} r={5.4} fill="none" stroke="#FFFFFF" strokeWidth={2} />
        <circle cx={4} cy={-19} r={3.6} fill="#4A4A54" />
        <circle cx={2.6} cy={-20} r={0.9} fill="#FFFFFF" />
        <circle cx={5.4} cy={-20} r={0.9} fill="#FFFFFF" />
        {baby && (
          <g>
            <ellipse cx={-2} cy={4} rx={5} ry={6} fill="#F8F4EC" />
            <circle cx={0} cy={-2} r={3.4} fill="#F0E4D4" />
            <circle cx={1} cy={-2.4} r={0.8} fill="#1B1B2A" />
          </g>
        )}
      </Tappable>
    </g>
  );
}

/** A silvery-cheeked hornbill: a big black-and-white bird with a huge curved bill. */
function Hornbill({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d="M-16 -4 L-34 4 L-30 -6Z" fill="#1E1E26" />
        <ellipse cx={-4} cy={-8} rx={16} ry={9} fill="#1E1E26" />
        <path d="M-12 -2 Q-4 2 6 -2" stroke="#FFFFFF" strokeWidth={3} fill="none" />
        <circle cx={10} cy={-14} r={7} fill="#1E1E26" />
        <path d="M14 -18 Q32 -20 38 -6 Q28 -12 14 -10Z" fill="#C9C2A8" />
        <path d="M14 -20 Q24 -26 32 -18 Q24 -20 14 -18Z" fill="#B0A888" />
        <circle cx={10} cy={-16} r={1.4} fill="#FFFFFF" />
      </Tappable>
    </g>
  );
}

/** A coffee bush in too much sun: yellow, crispy leaves and only a few cherries. */
function ThirstyBush({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const rnd = rand(Math.round(x + y));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 L0 -50 M0 -20 L-16 -34 M0 -30 L16 -44" stroke="#6A4A2A" strokeWidth={3} fill="none" />
      <g className="oe-droop">
        {Array.from({ length: 9 }, (_, i) => {
          const lx = r1((rnd() - 0.5) * 40);
          const ly = r1(-14 - rnd() * 42);
          return <ellipse key={i} cx={lx} cy={ly} rx={6} ry={3} fill={i % 2 ? "#C9B040" : "#B89A3A"} transform={`rotate(${r1((rnd() - 0.5) * 80)} ${lx} ${ly})`} />;
        })}
        <circle cx={6} cy={-30} r={2.6} fill="#D62F2F" />
        <circle cx={-8} cy={-24} r={2.6} fill="#D62F2F" />
      </g>
    </g>
  );
}

/** Inside the wild forest: giant trunks, a high roof of leaves and green shade. */
function Forest({ id, time = "day", sunny = false, children }: { id: string; time?: Time; sunny?: boolean; children?: ReactNode }) {
  const evening = time === "evening";
  return (
    <g>
      <SkyFor id={id} time={time} />
      {!sunny && <rect width={400} height={300} fill={evening ? "#2A3A3A" : "#2E5A3A"} opacity={0.75} />}
      <Depth z={-0.3}>
        {[60, 180, 300].map((x) => (
          <rect key={x} x={x - 6} y={60} width={12} height={180} fill="#4A3A2A" opacity={0.5} />
        ))}
      </Depth>
      {[20, 140, 260, 380].map((x, i) => (
        <g key={x}>
          <rect x={x - 14} y={20} width={28} height={230} fill={i % 2 ? "#6A4A30" : "#5A3E28"} />
          <path d={`M${x - 14} 250 q-14 4 -20 8 M${x + 14} 250 q14 4 20 8`} stroke="#5A3E28" strokeWidth={6} fill="none" />
        </g>
      ))}
      <g className="lali-sway" style={vars({ "--dur": "8s" })}>
        <path d="M-10 -10 L410 -10 L410 50 Q360 90 300 60 Q240 96 180 62 Q120 96 60 60 Q20 84 -10 60Z" fill={evening ? "#1E3A2A" : "#2E6A3A"} />
        <path d="M-10 40 Q40 70 90 46 Q150 80 210 50 Q270 80 330 48 Q380 70 410 44" stroke={evening ? "#2A4A32" : "#3E8A4A"} strokeWidth={10} fill="none" />
      </g>
      <path d="M-10 240 Q200 226 410 242 L410 310 L-10 310Z" fill={evening ? "#2E4A2A" : "#3E6A32"} />
      {children}
    </g>
  );
}

export default function WildCoffeeForest({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Uncle Abebe's wild forest in the south-west: "This is where coffee first grew, wild."
    case 0:
      return (
        <g>
          <Forest id={id}>
            <CoffeeBush x={200} y={252} s={1.2} />
          </Forest>
          <Place x={80} y={300} s={0.46} tap={TAP.elder}>
            <Uncle mood="joy" />
          </Place>
          <Place x={250} y={300} s={0.4} flip tap={TAP.ayan}>
            <Colobus mood="joy" wave />
          </Place>
          <Place x={330} y={300} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
        </g>
      );
    // Trees as big as houses hold up a roof of leaves; underneath, in the shade, wild coffee. Tall trees above, coffee below!
    case 1:
      return (
        <g>
          <Forest id={id}>
            {[70, 130, 200, 270, 330].map((x, i) => (
              <CoffeeBush key={x} x={x} y={262 + (i % 2) * 8} s={1.3} delay={-i * 0.6} />
            ))}
          </Forest>
          <path d="M392 30 V120 M384 112 l8 10 l8 -10" stroke="#FFFFFF" strokeWidth={3} fill="none" className="lali-pop-in" style={vars({ "--delay": "0.8s" })} />
          <path d="M392 170 V270 M384 178 l8 -10 l8 10" stroke="#FFFFFF" strokeWidth={3} fill="none" className="lali-pop-in" style={vars({ "--delay": "1.6s" })} />
        </g>
      );
    // A colobus leaps from branch to branch, its white tail flying. "Waa-waa!" A hornbill.
    case 2:
      return (
        <g>
          <Forest id={id}>
            <g className="cw-leap">
              <TreeColobus x={60} y={72} s={1.6} />
            </g>
            <path d="M260 120 Q320 112 380 124" stroke="#5A3E28" strokeWidth={8} strokeLinecap="round" fill="none" />
            <Hornbill x={330} y={120} s={1.6} flip />
          </Forest>
          <Speech x={300} y={170} w={92} h={32} tail="right" delay={1.2}>
            <text x={0} y={6} fontSize={15} fontWeight={700} textAnchor="middle" fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
              Waa-waa!
            </text>
          </Speech>
          <Place x={90} y={300} s={0.42} tap={TAP.ayan}>
            <Colobus mood="wow" wave />
          </Place>
          <Place x={180} y={300} s={0.38} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
        </g>
      );
    // A little river runs through the forest. "Its roots hold the water like a sponge."
    case 3:
      return (
        <g>
          <Forest id={id}>
            <path d="M-10 268 Q120 250 200 262 Q300 276 410 258 L410 290 Q300 306 200 292 Q100 280 -10 298Z" fill="#4FA8E0" />
            <g className="cw-flow">
              {[0, 80, 160, 240, 320, 400].map((x) => (
                <path key={x} d={`M${x} 278 q10 -4 20 0`} stroke="#DDF0FF" strokeWidth={2.4} fill="none" />
              ))}
            </g>
            {[20, 140, 260, 380].map((x) => (
              <path key={x} d={`M${x} 250 q-6 14 -2 24 M${x} 250 q8 12 4 24`} stroke="#5A3E28" strokeWidth={3} fill="none" />
            ))}
          </Forest>
          <Place x={200} y={250} s={0.38} tap={TAP.elder}>
            <Uncle mood="happy" />
          </Place>
        </g>
      );
    // Cousin Dawit with an axe, looking up at a giant tree: "More sun, more cherries!"
    case 4:
      return (
        <g>
          <Forest id={id}>
            <rect x={240} y={0} width={60} height={250} fill="#5A3E28" />
            <path d="M240 250 q-20 6 -30 10 M300 250 q20 6 30 10" stroke="#5A3E28" strokeWidth={8} fill="none" />
          </Forest>
          <Place x={150} y={300} s={0.46} tap={TAP.gugu}>
            <Dawit mood="happy" axe />
          </Place>
          <Speech x={90} y={90} w={110} h={48} tail="right" delay={0.8}>
            <circle cx={-26} cy={0} r={12} fill="#FFD233" />
            <path d="M-8 0 h10 M0 -6 l6 6 l-6 6" stroke="#1B2A4E" strokeWidth={2.4} fill="none" />
            {[18, 28, 38].map((cx, i) => (
              <circle key={cx} cx={cx} cy={i % 2 ? 6 : -4} r={5} fill="#D62F2F" />
            ))}
          </Speech>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Wait. Let's look first." Desta walks from the sunny edge into the deep shade.
    case 5:
      return (
        <g>
          <Forest id={id}>
            <rect x={0} y={0} width={120} height={300} fill="#FFF3C0" opacity={0.45} />
            <ThirstyBush x={50} y={262} s={1.2} />
            <CoffeeBush x={300} y={264} s={1.3} />
          </Forest>
          <g className="cw-walk">
            <Place x={230} y={300} s={0.42} tap={TAP.ayan}>
              <Colobus mood="happy" />
            </Place>
          </g>
          <Sign x={230} y={160} kind="?" delay={3} />
        </g>
      );
    // At the sunny edge: yellow, crispy leaves, few cherries. In the deep shade: dark green, heavy with red.
    case 6:
      return (
        <g>
          <rect width={200} height={300} fill="#F2D88A" />
          <rect x={200} width={200} height={300} fill="#2E5A3A" />
          <path d="M0 250 H200" stroke="#C8A06A" strokeWidth={60} />
          <path d="M200 250 H400" stroke="#3E6A32" strokeWidth={60} />
          <circle cx={60} cy={50} r={26} fill="#FFD233" />
          <ThirstyBush x={100} y={250} s={2.6} />
          <CoffeeBush x={300} y={250} s={2.8} />
          {[[280, 120], [320, 140], [300, 170], [340, 110], [260, 160]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={6} fill="#D62F2F" className="lali-pop-in" style={vars({ "--delay": `${1 + i * 0.3}s` })} />
          ))}
          <path d="M200 0 V300" stroke="#FFFFFF" strokeWidth={4} strokeDasharray="10 8" />
        </g>
      );
    // "Wild coffee doesn't want more sun. It likes the shade of the tall trees!" Uncle nods.
    case 7:
      return (
        <g>
          <Forest id={id}>
            <CoffeeBush x={200} y={256} s={1.3} />
          </Forest>
          <Place x={100} y={300} s={0.44} tap={TAP.ayan}>
            <Colobus mood="joy" clap />
          </Place>
          <Place x={300} y={300} s={0.46} flip tap={TAP.elder}>
            <Uncle mood="joy" />
          </Place>
          <Sparkles x={200} y={210} r={36} delay={0.8} />
        </g>
      );
    // "If this tree falls, where will the monkeys sleep?" A colobus mother holds her baby in the branches.
    case 8:
      return (
        <g>
          <Forest id={id}>
            <rect x={240} y={0} width={60} height={250} fill="#5A3E28" />
            <path d="M270 90 Q330 80 400 96" stroke="#5A3E28" strokeWidth={12} strokeLinecap="round" fill="none" />
            <TreeColobus x={340} y={86} s={1.8} flip baby />
            <Hornbill x={250} y={60} s={1} />
          </Forest>
          <Place x={80} y={300} s={0.4} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Place x={170} y={300} s={0.42} tap={TAP.gugu}>
            <Dawit mood="wow" />
          </Place>
          <Hearts spots={[[300, 40, 1]]} />
        </g>
      );
    // Dawit puts the axe down: "I'll plant a tree." They plant a young shade tree at the sunny edge.
    case 9:
      return (
        <g>
          <Forest id={id} sunny>
            <ThirstyBush x={80} y={262} />
            <ThirstyBush x={340} y={262} />
            <Sapling x={200} y={250} s={2} potted={false} />
            <path d="M176 252 Q200 244 224 252" stroke="#6A4A2A" strokeWidth={5} fill="none" />
          </Forest>
          <Place x={120} y={300} s={0.4} tap={TAP.gugu}>
            <Dawit mood="joy" />
          </Place>
          <Place x={290} y={300} s={0.44} flip tap={TAP.elder}>
            <Uncle mood="joy" />
          </Place>
          <Sparkles x={200} y={200} r={30} delay={1} />
        </g>
      );
    // The girls pick ripe red cherries from the shady bushes, one by one, for Desta's grandpa.
    case 10:
      return (
        <g>
          <Forest id={id}>
            <CoffeeBush x={200} y={252} s={2} />
            <g transform="translate(200 270)">
              <path d="M-24 -10 Q0 -14 24 -10 L18 12 Q0 16 -18 12Z" fill="#C9A060" stroke="#8A6A3A" strokeWidth={2} />
              {[-8, 0, 8].map((cx) => (
                <circle key={cx} cx={cx} cy={-10} r={4} fill="#D62F2F" />
              ))}
            </g>
            {[0, 1].map((i) => (
              <g key={i} className="cw-pick" style={vars({ "--delay": `${i}s` })}>
                <circle cx={196 + i * 10} cy={212} r={4.4} fill="#D62F2F" />
              </g>
            ))}
          </Forest>
          <Place x={90} y={300} s={0.42} tap={TAP.ayan}>
            <Colobus mood="joy" />
          </Place>
          <Place x={310} y={300} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </g>
      );
    // Evening: the colobus call, the hornbill flies home. "Wild coffee needs wild forest."
    case 11:
      return (
        <g>
          <Forest id={id} time="evening">
            <TreeColobus x={80} y={60} s={1.2} />
            <TreeColobus x={330} y={70} s={1.1} flip />
            <g className="oe-soar">
              <Hornbill x={210} y={50} s={1} />
            </g>
          </Forest>
          <Place x={150} y={300} s={0.42} tap={TAP.hawi}>
            <Wolf mood="happy" item={<Envelope x={0} y={0} s={0.5} />} />
          </Place>
          <Place x={250} y={300} s={0.42} flip tap={TAP.ayan}>
            <Colobus mood="happy" />
          </Place>
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
