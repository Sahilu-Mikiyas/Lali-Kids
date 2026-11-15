"use client";

import "./abdis-one-bucket-bath.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, NumberBadge, Place, vars } from "../../scenery";
import { Camel, TAP } from "./kit-cast";
import { LemonPlant } from "./kit-more";
import { Bubbles, Bucket, Drops, Foam, Glint, SoapBar, Towel } from "./kit-health";
import { Yard } from "./kit-places";
import { Hearts, Jerrycan, Sparkles, Speech } from "./kit-props";

/*
  "Abdi's One-Bucket Bath": one living picture per page (12 pages), in Ayan's dry, sunny home
  country near Jijiga: acacias, a termite hill, the water drum, one bucket warming in the sun.
  Abdi is a camel calf, so the "head, neck, tummy, knees and toes" foam goes on his long neck and
  knobbly knees. Keyframes: kit.css, kit-health.css and ./abdis-one-bucket-bath.css.
*/

/** Dust on Abdi (in his 200 x 240 camel box): blotches on the body and dark feet. */
function Dusty() {
  return (
    <g>
      <g fill="#8A6A44" opacity={0.55}>
        <ellipse cx={80} cy={160} rx={14} ry={8} />
        <ellipse cx={110} cy={174} rx={10} ry={6} />
        <ellipse cx={150} cy={130} rx={6} ry={8} />
        <ellipse cx={158} cy={86} rx={6} ry={4} />
      </g>
      <g fill="#3A2A1E">
        <ellipse cx={86} cy={226} rx={10} ry={5} />
        <ellipse cx={144} cy={226} rx={10} ry={5} />
      </g>
    </g>
  );
}

/** A baby goat, standing. */
function Kid({ x, y, s = 1, flip = false, color = "#F2EADC" }: { x: number; y: number; s?: number; flip?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="lali-hop" style={vars({ "--dur": "1.4s" })}>
        <path d="M-12 0 V-12 M-4 0 V-12 M8 0 V-12 M14 0 V-12" stroke="#6A5A4A" strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={0} cy={-16} rx={18} ry={9} fill={color} />
        <ellipse cx={18} cy={-26} rx={7} ry={6} fill={color} />
        <path d="M14 -31 l-3 -6 M20 -31 l1 -6" stroke="#6A5A4A" strokeWidth={2} strokeLinecap="round" />
        <ellipse cx={13} cy={-26} rx={4} ry={2} fill={color} transform="rotate(30 13 -26)" />
        <circle cx={20} cy={-27} r={1.2} fill="#1A0F0A" />
        <path d="M-18 -18 l-5 -3" stroke={color} strokeWidth={3} strokeLinecap="round" />
      </g>
    </g>
  );
}

function TermiteHill({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0 Q-18 -30 -8 -40 Q-6 -66 2 -70 Q10 -60 10 -40 Q22 -28 28 0Z" fill="#C98A5A" />
      <path d="M-4 -60 q6 10 2 24 M-14 -24 q8 4 10 18" stroke="#A86A3E" strokeWidth={2} fill="none" />
    </g>
  );
}

/** The big blue water drum. */
function Drum({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={26} ry={4} fill="#000" opacity={0.14} />
      <rect x={-24} y={-64} width={48} height={64} rx={6} fill="#2E6AD0" />
      <path d="M-24 -44 H24 M-24 -20 H24" stroke="#2456A8" strokeWidth={4} />
      <ellipse cx={0} cy={-64} rx={24} ry={5} fill="#2456A8" />
    </g>
  );
}

/** The well: a ring of stones. */
function Well({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={30} ry={9} fill="#8A8494" />
      <ellipse cx={0} cy={-2} rx={22} ry={6} fill="#2A3A5A" />
      <path d="M-30 0 Q0 14 30 0 L30 8 Q0 22 -30 8Z" fill="#9C98A6" />
    </g>
  );
}

/** A country yard in the dry lowlands: flat-topped acacias and sandy ground. */
function DryYard({ id, time = "day", children }: { id: string; time?: "day" | "evening"; children?: ReactNode }) {
  return (
    <Yard id={id} time={time} house={false}>
      <path d="M-10 230 Q200 214 410 230 L410 310 L-10 310Z" fill="#E8C690" opacity={0.6} />
      <Acacia x={350} y={232} s={0.9} />
      {children}
    </Yard>
  );
}

export default function AbdisOneBucketBath({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // All day with the baby goats: rolling in dust, climbing the termite hill.
    case 0:
      return (
        <g>
          <DryYard id={id}>
            <TermiteHill x={90} y={262} s={1} />
            <Place x={200} y={294} s={0.48} className="abdis-one-bucket-bath-roll" tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
              <Dusty />
            </Place>
            <Kid x={290} y={290} s={1} flip />
            <Kid x={320} y={270} s={0.8} color="#C9A07A" flip />
            <g className="abdis-one-bucket-bath-dust">
              <ellipse cx={180} cy={286} rx={40} ry={8} fill="#D9B07A" opacity={0.5} />
            </g>
          </DryYard>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Bath time, Abdi!" He hides behind the water drum: "Baths use too much water!"
    case 1:
      return (
        <g>
          <DryYard id={id} time="day">
            <Bucket x={120} y={286} s={1.2} steam />
            <Place x={190} y={294} s={0.5} tap={TAP.hooyo}>
              <Camel who="hooyo" mood="happy" />
            </Place>
            <Place x={300} y={294} s={0.4} flip tap={TAP.abdi}>
              <Camel who="abdi" mood="worried" />
              <Dusty />
            </Place>
            <Drum x={286} y={292} s={1} />
          </DryYard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Water is precious: Ayan carries it from the well. But Abdi is itchy, and his feet are black.
    case 2:
      return (
        <g>
          <DryYard id={id} time="day">
            <Well x={90} y={270} />
            <Place x={170} y={294} s={0.46} tap={TAP.ayan}>
              <Camel who="ayan" mood="happy" item={<Jerrycan x={0} y={20} s={0.8} />} />
            </Place>
            <Place x={290} y={294} s={0.44} flip className="hs-wobble" tap={TAP.abdi}>
              <Camel who="abdi" mood="worried" />
              <Dusty />
            </Place>
            <g className="abdis-one-bucket-bath-itch">
              <path d="M262 214 l6 -4 M270 222 l7 -2 M258 226 l5 2" stroke="#E2463F" strokeWidth={2} strokeLinecap="round" />
            </g>
          </DryYard>
          <Air kind="day" seed={7} />
        </g>
      );
    // "I know a trick: we can wash you well with just ONE bucket."
    case 3:
      return (
        <g>
          <DryYard id={id} time="day">
            <Place x={150} y={294} s={0.48} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" />
            </Place>
            <Bucket x={250} y={286} s={1.3} />
            <NumberBadge x={250} y={200} n="1" delay={0.8} color="#2E6AD0" />
            <Place x={330} y={294} s={0.36} flip tap={TAP.abdi}>
              <Camel who="abdi" mood="wow" />
              <Dusty />
            </Place>
          </DryYard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Three cups to wet him all over. Splash! It's warm!
    case 4:
      return (
        <g>
          <DryYard id={id} time="day">
            <Bucket x={340} y={286} s={1.1} />
            <Place x={180} y={294} s={0.58} className="lali-hop" tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" kneel />
            </Place>
            <Place x={290} y={294} s={0.5} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="happy" item={<PourCup />} />
            </Place>
            <Drops x={232} y={232} n={5} w={22} fall={30} />
          </DryYard>
          <Air kind="day" seed={11} />
        </g>
      );
    // Soap from the top down: head, neck, tummy, knees, and the toes, please!
    case 5:
      return (
        <g>
          <DryYard id={id} time="day">
            <SoapBar x={110} y={284} s={1.3} foam />
            <Place x={210} y={294} s={0.52} tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
              {[
                [160, 70, 0.4],
                [150, 128, 1.2],
                [96, 180, 2],
                [84, 200, 2.8],
                [86, 222, 3.6],
              ].map(([fx, fy, d]) => (
                <g key={d} className="lali-pop-in" style={vars({ "--delay": `${d}s` })}>
                  <Foam x={fx} y={fy} s={1.2} />
                </g>
              ))}
            </Place>
            <Bubbles x={210} y={200} n={8} spread={90} seed={5} up={-60} />
          </DryYard>
          <Air kind="day" seed={13} />
        </g>
      );
    // Between the toes: "There's a whole field in here!"
    case 6:
      return (
        <g>
          <DryYard id={id} time="day">
            <Place x={200} y={294} s={0.62} className="abdis-one-bucket-bath-giggle" tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" kneel />
              <Foam x={86} y={222} s={1.3} />
              <Foam x={144} y={222} s={1.3} />
              <Foam x={160} y={70} s={1} />
            </Place>
            <g className="abdis-one-bucket-bath-dust">
              <circle cx={150} cy={286} r={3} fill="#8A6A44" />
              <circle cx={262} cy={288} r={2.6} fill="#8A6A44" />
              <path d="M140 288 l-4 -6 M268 290 l4 -6" stroke="#5A8A3A" strokeWidth={2} />
            </g>
            <Bubbles x={200} y={260} n={7} spread={120} seed={8} />
          </DryYard>
          <Air kind="day" seed={15} />
        </g>
      );
    // Rinse, cup by cup, from the top down. Still a little water left!
    case 7:
      return (
        <g>
          <DryYard id={id} time="day">
            <Place x={180} y={294} s={0.58} tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" kneel />
              <Glint x={160} y={120} s={1.5} delay={1} />
              <Glint x={100} y={190} s={1.2} delay={1.8} />
            </Place>
            <Place x={290} y={294} s={0.5} flip tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" item={<PourCup />} />
            </Place>
            <Drops x={232} y={232} n={5} w={22} fall={30} />
            <Bucket x={345} y={290} s={1} fill={0.15} />
            <Glow2 />
          </DryYard>
          <Air kind="day" seed={17} />
        </g>
      );
    // "Hooyo's lemon tree is thirsty!" The last water goes round its roots. Glug, glug.
    case 8:
      return (
        <g>
          <DryYard id={id} time="day">
            <LemonPlant x={280} y={276} s={1.3} stage={4} />
            <Place x={170} y={294} s={0.48} tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" item={<Bucket x={10} y={30} s={0.8} fill={0.3} />} />
            </Place>
            <Drops x={252} y={260} n={4} w={16} fall={20} />
            <Hearts spots={[[280, 150, 1], [300, 136, 1.8]]} />
          </DryYard>
          <Air kind="day" seed={19} />
        </g>
      );
    // A towel, clean clothes, and short, neat nails.
    case 9:
      return (
        <g>
          <DryYard id={id} time="day">
            <Place x={150} y={294} s={0.54} tap={TAP.hooyo}>
              <Camel who="hooyo" mood="joy" />
            </Place>
            <Place x={260} y={294} s={0.46} flip tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
              <g transform="translate(92 168)">
                <Towel x={0} y={20} s={2.6} color="#FFD233" />
              </g>
            </Place>
            <Sparkles x={250} y={190} r={50} delay={0.8} n={5} />
          </DryYard>
          <Air kind="day" seed={21} />
        </g>
      );
    // He smells of soap and sunshine. "One bucket, and a drink for the lemon tree!"
    case 10:
      return (
        <g>
          <DryYard id={id} time="day">
            <LemonPlant x={310} y={276} s={1.1} stage={4} />
            <Place x={180} y={294} s={0.52} className="lali-hop" tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" />
              <Glint x={150} y={120} s={1.6} delay={0.4} />
              <Glint x={100} y={170} s={1.3} delay={1.2} />
              <Glint x={170} y={80} s={1.1} delay={2} />
            </Place>
            <Bubbles x={180} y={170} n={5} spread={80} seed={14} />
          </DryYard>
          <Air kind="day" seed={23} />
        </g>
      );
    // The next evening, Abdi comes running before Hooyo calls: "Bath time!"
    case 11:
      return (
        <g>
          <DryYard id={id} time="evening">
            <Bucket x={250} y={286} s={1.2} steam />
            <Place x={150} y={294} s={0.46} from={[60, 294]} dur={1.8} delay={0.3} tap={TAP.abdi}>
              <Camel who="abdi" mood="joy" walk />
              <Dusty />
            </Place>
            <Place x={320} y={294} s={0.5} flip tap={TAP.hooyo}>
              <Camel who="hooyo" mood="joy" />
            </Place>
            <Sparkles x={250} y={200} r={40} delay={2} n={5} />
          </DryYard>
          <Air kind="dusk" seed={25} />
        </g>
      );
    default:
      return null;
  }
}

/** A red cup tipped to pour (held by a camel, in its 200 x 240 box). */
function PourCup() {
  return (
    <g transform="translate(14 -14) rotate(60)" className="abdis-one-bucket-bath-pour">
      <path d="M-14 -34 L14 -34 L11 0 L-11 0Z" fill="#E2463F" />
      <ellipse cx={0} cy={-34} rx={14} ry={4} fill="#B8302A" />
    </g>
  );
}

/** A soft warm glow of the evening, low on the ground. */
function Glow2() {
  return <ellipse cx={200} cy={290} rx={160} ry={16} fill="#FFE2A0" opacity={0.25} />;
}
