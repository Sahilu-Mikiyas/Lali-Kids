"use client";

import "./shoo-fly-shoo.css";

import { useId } from "react";

import { Air, Place, Rock, vars } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { Sack, WeaveBasket } from "./kit-more";
import { Bubbles, ClothCover, CoveredPot, Drops, Fly, RubbishHeap, SoapBar } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Dabo, Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Shoo, Fly, Shoo!": one living picture per page (12 pages), on the high meadows of the Bale
  Mountains with Hawi and Grandpa Tolosa, then at home. Flies buzz round little loops; when the
  bread is under the cloth they circle but can't land. Keyframes: kit.css, kit-health.css and
  ./shoo-fly-shoo.css.
*/


/** A little numbered circle for the plan's steps (inside a speech bubble). */
function NumberBadgeLike({ n }: { n: string }) {
  return (
    <g transform="translate(-24 -16)">
      <circle r={9} fill="#2E6AD0" />
      <text x={0} y={4} textAnchor="middle" fontSize={12} fontWeight={800} fill="#FFFFFF" fontFamily="var(--font-grandstander), sans-serif">
        {n}
      </text>
    </g>
  );
}

/** A cow, side view, facing left; `drink` lowers its head to the water. */
function Cow({ x, y, s = 1, drink = false, color = "#F2EADC", patch = "#5A3A2A" }: { x: number; y: number; s?: number; drink?: boolean; color?: string; patch?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-18 0 V-16 M-8 0 V-16 M16 0 V-16 M24 0 V-16" stroke={color} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={4} cy={-24} rx={28} ry={14} fill={color} />
      <ellipse cx={12} cy={-28} rx={9} ry={6} fill={patch} />
      <path d="M32 -30 q8 6 6 18" stroke={color} strokeWidth={2.4} fill="none" />
      <g className={drink ? "shoo-fly-shoo-drink" : "lali-head-bob"}>
        <ellipse cx={-28} cy={drink ? -14 : -30} rx={10} ry={8} fill={color} />
        <ellipse cx={-34} cy={drink ? -10 : -26} rx={6} ry={5} fill="#E8B8A8" />
        <path d={drink ? "M-26 -22 q-6 -6 -12 -4 M-24 -22 q4 -8 10 -6" : "M-26 -38 q-6 -6 -12 -4 M-24 -38 q4 -8 10 -6"} stroke="#D8CDB8" strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx={-28} cy={drink ? -17 : -33} r={1.4} fill="#1A0F0A" />
      </g>
    </g>
  );
}

/** A stream across the meadow, sparkling; `brown` makes it muddy where the cows splash. */
function Stream({ y }: { y: number }) {
  return (
    <g>
      <path d={`M-10 ${y} Q100 ${y - 10} 200 ${y} T410 ${y - 4} L410 ${y + 22} Q300 ${y + 30} 200 ${y + 22} T-10 ${y + 24}Z`} fill="#6CC0EC" />
      <g className="hs-flow" style={vars({ "--flow": "-40px", "--dur": "2s" })}>
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${i * 40} ${y + 10 + (i % 2) * 4} q8 -3 16 0`} stroke="#E8F7FF" strokeWidth={2} fill="none" strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

/** A water bottle (boiled water from home). */
function Bottle({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-7 0 L-7 -24 Q-7 -28 -3 -30 L-3 -34 L3 -34 L3 -30 Q7 -28 7 -24 L7 0Z" fill="#CFEAF8" stroke="#8FC0DC" />
      <rect x={-7} y={-16} width={14} height={14} fill="#9FD4F0" opacity={0.7} />
      <rect x={-4} y={-38} width={8} height={5} rx={1} fill="#2E6AD0" />
    </g>
  );
}

/** A picnic cloth with bread on it. */
function Picnic({ x, y, covered = false }: { x: number; y: number; covered?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-50 4 L-36 -10 L36 -10 L50 4Z" fill="#F4EEDC" />
      <path d="M-46 0 H46" stroke="#E2463F" strokeWidth={2} strokeDasharray="6 4" />
      <Dabo x={0} y={-6} s={0.8} />
      {covered && <ClothCover x={0} y={-2} s={1} color="#FFFDF4" />}
    </g>
  );
}

/** A rubbish pit at home, with a wooden lid. */
function Pit({ x, y, s = 1, open = false }: { x: number; y: number; s?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={30} ry={8} fill="#5A4030" />
      {open ? <rect x={10} y={-26} width={40} height={8} rx={2} fill="#9A6A3E" transform="rotate(-30 10 -26)" /> : <rect x={-34} y={-6} width={68} height={8} rx={2} fill="#9A6A3E" />}
    </g>
  );
}

/** The mesob with its tall woven lid on. */
function MesobLid({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={34} ry={5} fill="#000" opacity={0.14} />
      <path d="M-22 0 L-32 -30 L32 -30 L22 0Z" fill="#D9A04A" />
      <path d="M-34 -30 Q-30 -80 0 -92 Q30 -80 34 -30Z" fill="#E8B860" />
      <path d="M-30 -44 Q0 -54 30 -44 M-24 -64 Q0 -72 24 -64" stroke="#E2463F" strokeWidth={3} fill="none" />
      <path d="M-28 -54 Q0 -62 28 -54" stroke="#2E9A8A" strokeWidth={2.4} fill="none" />
      <circle cx={0} cy={-94} r={4} fill="#C98A3E" />
    </g>
  );
}

/** Several flies round a spot. */
function Flies({ x, y, n = 4, r = 24, seed = 0 }: { x: number; y: number; n?: number; r?: number; seed?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + seed;
        return <Fly key={i} x={Math.round(x + Math.cos(a) * r)} y={Math.round(y + Math.sin(a) * r * 0.6)} s={1.2} delay={i * 0.3} bx={10 + (i % 3) * 6} />;
      })}
    </g>
  );
}

export default function ShooFlyShoo({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Up to the meadow for a picnic: bread, roasted barley, a bottle of water from home.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={170} y={294} s={0.46} from={[80, 294]} dur={2} delay={0.3} tap={TAP.hawi}>
            <Wolf mood="joy" wag item={<WeaveBasket x={0} y={14} s={0.6} rows={4} />} arm="give" />
          </Place>
          <Place x={270} y={292} s={0.52} from={[180, 292]} dur={2} delay={0.5} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // A sparkling stream. "This water looks so clean." She bends to drink.
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Stream y={232} />
          <Place x={200} y={296} s={0.48} className="shoo-fly-shoo-bend" tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
          <Sparkles x={200} y={244} r={60} delay={0.6} n={6} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "Wait." Up the stream, cows drink and splash. "Let's drink ours from home."
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Stream y={232} />
          <Cow x={300} y={250} s={1} drink />
          <Cow x={245} y={238} s={0.7} color="#B8683E" patch="#F2EADC" />
          <Place x={110} y={290} s={0.48} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Place x={180} y={290} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Boiled water from the covered pot at home. Bread on the cloth. Bzzzz! A fly lands.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Picnic x={200} y={282} />
          <Fly x={200} y={262} s={1.4} />
          <Place x={110} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" item={<Bottle x={0} y={4} s={1} rot={-40} />} />
          </Place>
          <Place x={300} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Speech x={300} y={110} w={56} h={60} tail="down" delay={1}>
            <CoveredPot x={0} y={22} s={0.6} ladle={false} />
          </Speech>
          <Air kind="day" seed={9} />
        </g>
      );
    // It comes back, with its friends. Bzzz, bzzz, bzzz!
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Picnic x={200} y={282} />
          <Flies x={200} y={256} n={5} r={30} />
          <Place x={110} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="worried" arm="wave" />
          </Place>
          <Place x={300} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="worried" />
          </Place>
          <Air kind="day" seed={11} />
        </g>
      );
    // "Flies walk on dirty things, then on our food." "Yuck! But where are they coming from?"
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Picnic x={200} y={286} />
          <Flies x={200} y={262} n={3} r={24} />
          <Place x={110} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="worried" ears="flat" />
          </Place>
          <Place x={300} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
          <Speech x={200} y={110} w={120} h={56} tail="down" delay={0.6}>
            <RubbishHeap x={-34} y={14} s={0.7} />
            <path d="M-8 0 h18 l-5 -5 M10 0 l-5 5" stroke="#1B2A4E" strokeWidth={2.4} fill="none" strokeLinecap="round" />
            <Dabo x={36} y={10} s={0.5} />
            <Fly x={0} y={-14} s={1} />
          </Speech>
          <Sign x={110} y={150} kind="?" delay={1.8} />
          <Air kind="day" seed={13} />
        </g>
      );
    // Behind a big rock: a heap of old rubbish. A fly party!
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <RubbishHeap x={240} y={286} s={1.6} />
          <Flies x={240} y={250} n={6} r={36} seed={1} />
          <Rock x={170} y={290} s={1.3} />
          <Place x={110} y={294} s={0.44} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // "I have a plan! Cover the food; sit far from the rubbish; take the rubbish home."
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={200} y={294} s={0.5} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" wag />
          </Place>
          <Speech x={90} y={110} w={64} h={54} tail="right" delay={0.4}>
            <NumberBadgeLike n="1" />
            <ClothCover x={4} y={16} s={0.8} />
          </Speech>
          <Speech x={200} y={70} w={64} h={54} tail="down" delay={1.4}>
            <NumberBadgeLike n="2" />
            <path d="M-14 10 h28 l-6 -6 M14 10 l-6 6" stroke="#2E9A5B" strokeWidth={3} fill="none" strokeLinecap="round" />
          </Speech>
          <Speech x={310} y={110} w={64} h={54} tail="left" delay={2.4}>
            <NumberBadgeLike n="3" />
            <Sack x={4} y={22} s={0.6} />
          </Speech>
          <Air kind="day" seed={17} />
        </g>
      );
    // Rubbish in an old sack, tied tight. Bread under the cloth. The flies can't land.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Sack x={310} y={290} s={1.2} />
          <Place x={250} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Picnic x={140} y={284} covered />
          <Flies x={140} y={244} n={3} r={34} />
          <Place x={60} y={296} s={0.36} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Air kind="day" seed={19} />
        </g>
      );
    // Water from the bottle, hands washed with soap, then lift the cloth for each piece. Delicious!
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Picnic x={200} y={284} covered />
          <Place x={120} y={294} s={0.48} tap={TAP.hawi}>
            <Wolf mood="joy" arm="give" />
          </Place>
          <Drops x={176} y={200} n={4} w={14} fall={30} />
          <Bubbles x={176} y={210} n={5} spread={30} seed={3} />
          <SoapBar x={150} y={282} s={0.9} foam />
          <Place x={290} y={292} s={0.52} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" item={<Bottle x={0} y={0} s={1} rot={-120} />} />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // At home: the rubbish pit with its lid; injera under the mesob lid; the water pot covered.
    case 10:
      return (
        <g>
          <Home id={id} time="evening" />
          <MesobLid x={110} y={286} s={0.9} />
          <CoveredPot x={300} y={286} s={1.1} />
          <Place x={210} y={294} s={0.48} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Sparkles x={110} y={190} r={30} delay={0.8} n={4} />
          <Speech x={200} y={90} w={80} h={40} tail="down" delay={0.6}>
            <Pit x={0} y={6} s={0.8} />
          </Speech>
          <Air kind="dusk" seed={23} grass={false} />
        </g>
      );
    // One fly looks here and there, finds nothing, and buzzes away. "Shoo, fly, shoo!"
    case 11:
      return (
        <g>
          <Home id={id} time="evening" />
          <MesobLid x={110} y={286} s={0.9} />
          <CoveredPot x={300} y={286} s={1.1} />
          <g className="shoo-fly-shoo-away">
            <Fly x={250} y={150} s={1.6} bx={20} />
          </g>
          <Place x={200} y={294} s={0.5} className="shoo-fly-shoo-laugh" tap={TAP.hawi}>
            <Wolf mood="joy" arm="wave" wag />
          </Place>
          <Hearts spots={[[180, 160, 1.4], [200, 146, 2.2]]} />
          <Air kind="dusk" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
