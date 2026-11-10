"use client";

import "./swim-or-main.css";

import { useId, type ReactNode } from "react";

import { Acacia, Air, BeeHover, Depth, Place, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom, GennaStick } from "./kit-more";
import { Yard } from "./kit-places";
import { Sign, Sparkles, WaterPot } from "./kit-props";
import { Note, OpenSky, Pop, SayBubble, Strip, Txt, WordCard } from "./kit-read";

/*
  "Swimming or Main?": one living picture per page (12 pages). Hawi's yard with Grandpa Tolosa,
  the classroom, and Lake Langano (brown water "the colour of tea") with its main gate and the
  roped swimming place. The two ways of saying a word are drawn the same way everywhere: a
  feather for soft (ላልቶ) and two pressing arrows for strong (ጠብቆ); a little picture of what
  each one means pops up beside it.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and som-* (./swim-or-main.css).
*/

const SOFT = "#2E9A5B";
const STRONG = "#C2410C";

/** The soft sign: a feather. Centred on (x, y). */
function Soft({ x, y, s = 1, delay = 1 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Pop delay={delay}>
        <g className="som-float">
          <path d="M-14 12 Q-10 -6 10 -14 Q6 2 -14 12Z" fill="#E8F7EC" stroke={SOFT} strokeWidth={2} />
          <path d="M-14 12 L6 -8" stroke={SOFT} strokeWidth={1.6} />
        </g>
      </Pop>
    </g>
  );
}

/** The strong sign: two arrows pressing on a bar. Centred on (x, y). */
function Strong({ x, y, s = 1, delay = 1 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Pop delay={delay}>
        <rect x={-3} y={-12} width={6} height={24} rx={2} fill={STRONG} />
        <g className="som-press-l">
          <path d="M-20 0 H-8 M-12 -5 L-7 0 L-12 5" stroke={STRONG} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="som-press-r">
          <path d="M20 0 H8 M12 -5 L7 0 L12 5" stroke={STRONG} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Pop>
    </g>
  );
}

/** A swimmer's head and arm in a patch of water: what soft ዋና means. */
function SwimPic({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={8} rx={26} ry={8} fill="#5BB8E8" />
      <g className="som-stroke">
        <path d="M6 2 Q16 -14 26 -4" stroke="#8A5634" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
      <circle cx={-4} cy={-2} r={9} fill="#8A5634" />
      <path d="M-13 -4 Q-4 -14 5 -4" fill="#2A1A10" />
      <path d="M-24 10 q6 -4 12 0 t12 0 t12 0 t12 0" stroke="#fff" strokeWidth={2} fill="none" />
    </g>
  );
}

/** A big gate with a star over it: what strong ዋና (main) means. */
function GatePic({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-22} y={-20} width={6} height={32} fill="#7A5236" />
      <rect x={16} y={-20} width={6} height={32} fill="#7A5236" />
      <rect x={-26} y={-26} width={52} height={8} rx={2} fill="#C2410C" />
      <path d="M-16 12 V-14 H16 V12" fill="#F5D27A" opacity={0.6} />
      <path d="M0 -40 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#F5B21E" />
    </g>
  );
}

/** A picture in a round frame (what a word means), popping up beside a word card. */
function Meaning({ x, y, delay = 1.4, children }: { x: number; y: number; delay?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Pop delay={delay}>
        <circle r={30} fill="#FFFDF6" stroke="#E3D5C3" strokeWidth={2} />
        {children}
      </Pop>
    </g>
  );
}

/** Lake Langano: far hills, wide tea-brown water, a sandy shore and acacias. */
function Langano({ id, time = "day", children }: { id: string; time?: "day" | "evening"; children?: ReactNode }) {
  return (
    <>
      <OpenSky id={id} sun={time === "day" ? [330, 46] : [80, 120]} />
      {time === "evening" && <rect width={400} height={300} fill="#FF9A4A" opacity={0.22} />}
      <Depth z={-0.3}>
        <path d="M-10 132 Q80 104 170 120 T410 112 L410 150 L-10 150Z" fill="#9DB0D8" />
      </Depth>
      <path d="M-10 146 Q200 136 410 146 L410 232 Q200 222 -10 232Z" fill="#A98A64" />
      <path d="M-10 146 Q200 136 410 146 L410 160 Q200 150 -10 160Z" fill="#C2A27A" opacity={0.7} />
      <g stroke="#F4E6CC" strokeWidth={2.2} fill="none" opacity={0.85} strokeLinecap="round">
        {[
          [30, 178],
          [110, 196],
          [200, 168],
          [260, 206],
          [320, 184],
          [150, 214],
          [60, 210],
          [350, 162],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q12 -4 24 0 t24 0`} className="lali-ripple" style={vars({ "--delay": `${-i * 0.6}s` })} />
        ))}
      </g>
      <path d="M-10 226 Q200 214 410 226" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} fill="none" />
      <path d="M-10 226 Q200 214 410 226 L410 310 L-10 310Z" fill="#E8C690" />
      <Acacia x={40} y={226} s={0.6} />
      <Acacia x={370} y={224} s={0.5} />
      {children}
    </>
  );
}

/** The lake's entrance: two posts and a board across the top reading ዋና በር. */
function MainGate({ x, glow = false }: { x: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={-70} y={110} width={10} height={130} fill="#7A5236" />
      <rect x={60} y={110} width={10} height={130} fill="#7A5236" />
      {glow && <rect x={-80} y={92} width={160} height={36} rx={8} fill="#FFE27A" className="ar-read-glow" />}
      <rect x={-76} y={96} width={152} height={28} rx={5} fill="#FFF4D6" stroke="#7A5236" strokeWidth={3} />
      <Txt text="ዋና በር" x={0} y={117} size={20} />
    </g>
  );
}

export default function SwimOrMain({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Hawi runs home waving a note: ቅዳሜ ዋና እንሄዳለን። ፎጣ አምጡ። "Grandpa Tolosa, read it with me!"
    case 0:
      return (
        <Yard id={id} time="day" tree fig={60}>
          <Note lines={["ቅዳሜ ዋና እንሄዳለን።", "ፎጣ አምጡ።"]} x={200} y={100} w={180} size={16} delay={0.4} tilt={-2} />
          <Place x={170} y={292} s={0.46} from={[40, 292]} delay={0.4} dur={1.8} tap={TAP.hawi}>
            <Wolf mood="joy" wag arm="wave" />
          </Place>
          <Place x={300} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <BeeHover x={340} y={160} s={0.7} flip />
          <Air kind="day" seed={3} />
        </Yard>
      );
    // Hawi reads ዋና strongly, "wan-na", like "the main gate". "Going 'main'? Main what? And a towel?"
    case 1:
      return (
        <Yard id={id} time="day" tree fig={60}>
          <WordCard text="ዋና" x={150} y={100} size={38} delay={0.4} />
          <Strong x={150} y={150} delay={1} />
          <g transform="translate(270 110)">
            <Pop delay={1.6}>
              <path d="M-60 -36 H60 Q72 -36 72 -24 V24 Q72 36 60 36 H-60 Q-72 36 -72 24 V-24 Q-72 -36 -60 -36Z" fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={-40} cy={46} r={5} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
              <circle cx={-50} cy={58} r={3} fill="#fff" stroke="#1B2A4E" strokeWidth={2} />
              <GatePic x={-26} y={10} s={0.9} />
              <Txt text="?" x={36} y={16} size={34} fill="#4A6FA8" />
            </Pop>
          </g>
          <Place x={170} y={292} s={0.46} tap={TAP.hawi}>
            <Wolf mood="worried" />
          </Place>
          <Place x={320} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={5} />
        </Yard>
      );
    // "Say it softly: wa-na." "ዋና… swimming! We're going swimming!" Her bead necklace jingles.
    case 2:
      return (
        <Yard id={id} time="day" tree fig={60}>
          <WordCard text="ዋና" x={150} y={100} size={38} delay={0.4} />
          <Soft x={150} y={150} delay={1} />
          <Meaning x={270} y={100} delay={1.8}>
            <SwimPic x={0} y={2} s={0.9} />
          </Meaning>
          <Place x={170} y={292} s={0.46} className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag arm="wave" />
          </Place>
          <Place x={320} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Sparkles x={170} y={180} r={36} delay={2.2} />
          <Air kind="day" seed={7} />
        </Yard>
      );
    // "One way is soft: ላልቶ. One is strong: ጠብቆ. Fidel doesn't show it. Read it all, and the sentence will tell!"
    case 3:
      return (
        <Yard id={id} time="day" tree fig={60}>
          <WordCard text="ላልቶ" x={110} y={56} size={20} delay={0.4} color={SOFT} />
          <WordCard text="ጠብቆ" x={290} y={56} size={20} delay={0.8} color={STRONG} />
          <WordCard text="ዋና" x={110} y={110} size={30} delay={1.2} />
          <WordCard text="ዋና" x={290} y={110} size={30} delay={1.4} />
          <Soft x={110} y={150} delay={1.8} />
          <Strong x={290} y={150} delay={2} />
          <Meaning x={170} y={110} delay={2.4}>
            <SwimPic x={0} y={2} s={0.8} />
          </Meaning>
          <Meaning x={350} y={110} delay={2.6}>
            <GatePic x={0} y={10} s={0.8} />
          </Meaning>
          <Place x={140} y={292} s={0.44} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Place x={290} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="bless" />
          </Place>
          <Air kind="day" seed={9} />
        </Yard>
      );
    // Teacher Meron writes: መልካም ገና! (strong: Genna, Christmas) and ገና አልበላሁም። (soft: not yet).
    case 4:
      return (
        <g>
          <Classroom
            id={id}
            board={
              <>
                <Txt text="መልካም ገና!" x={200} y={78} size={22} fill="#F4F1E6" />
                <Txt text="ገና አልበላሁም።" x={200} y={118} size={22} fill="#F4F1E6" />
              </>
            }
          />
          <Strong x={86} y={74} s={0.8} delay={1} />
          <Soft x={86} y={114} s={0.8} delay={1.6} />
          <g transform="translate(318 80)">
            <Pop delay={1.4}>
              <GennaStick ball />
            </Pop>
          </g>
          <g transform="translate(318 120)">
            <Pop delay={2}>
              <ellipse cx={0} cy={0} rx={18} ry={6} fill="#F4F1EA" stroke="#C9B48E" strokeWidth={2} />
            </Pop>
          </g>
          <Place x={340} y={250} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Bench x={170} y={300} w={300} />
          {[
            { x: 60, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.3 },
            { x: 130, el: <Gugu mood="happy" />, tap: TAP.gugu, s: 0.3 },
            { x: 200, el: <Ibex mood="happy" />, tap: TAP.haben, s: 0.3 },
            { x: 270, el: <Tsehay mood="joy" />, tap: TAP.tsehay, s: 0.3 },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={292} s={k.s} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </g>
      );
    // Gugu: ጉጉ «ሰላም» አለ። (soft, "said") and ውሃ አለ። (strong, "there is"). He mixes them up, then gets it.
    case 5:
      return (
        <g>
          <Classroom id={id} board={<Txt text="አለ  ·  አለ" x={200} y={100} size={30} fill="#F4F1E6" />} />
          <Strip words={["ጉጉ", "«ሰላም»", "አለ።"]} x={170} y={182} size={20} delay={0.6} lit={2} />
          <Strip words={["ውሃ", "አለ።"]} x={170} y={226} size={20} delay={2} lit={1} />
          <Soft x={290} y={176} s={0.8} delay={1.6} />
          <Strong x={290} y={220} s={0.8} delay={2.8} />
          <WaterPot x={350} y={240} s={0.7} />
          <Place x={60} y={294} s={0.36} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Sign x={60} y={170} kind="?" delay={0.8} />
        </g>
      );
    // Saturday: the class goes to Lake Langano. The lake is wide; its water is brown, the colour of tea.
    case 6:
      return (
        <Langano id={id}>
          {[
            { x: 90, el: <Wolf elder mood="joy" />, tap: TAP.elder, s: 0.46 },
            { x: 160, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.38 },
            { x: 220, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu, s: 0.34 },
            { x: 280, el: <Ibex mood="joy" />, tap: TAP.haben, s: 0.38 },
            { x: 340, el: <Teacher mood="happy" pose="wave" />, tap: TAP.mama, s: 0.42 },
          ].map((k, i) => (
            <Place key={k.x} x={k.x} y={292} s={k.s} from={[k.x - 160, 292]} delay={0.2 + i * 0.15} dur={2} tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <BeeHover x={200} y={90} s={0.8} />
          <Air kind="day" seed={11} />
        </Langano>
      );
    // At the entrance: ዋና በር. "A swimming door! Let's swim right here!" Gugu starts to pull off his shirt.
    case 7:
      return (
        <Langano id={id}>
          <MainGate x={200} glow />
          <Place x={200} y={294} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<path d="M-10 -8 h20 l4 18 h-28z" fill="#E2463F" />} />
          </Place>
          <SayBubble x={290} y={186} text="ዋና በር!" size={18} tail="left" delay={1} />
          <Place x={340} y={294} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={13} />
        </Langano>
      );
    // "Wait! In ዋና በር, ዋና is strong: the main gate." The other sign: ልጆች፣ ዋና እዚህ ብቻ!
    case 8:
      return (
        <Langano id={id}>
          <MainGate x={110} />
          <Strong x={110} y={84} delay={0.8} />
          <g transform="translate(290 0)">
            <rect x={-4} y={130} width={8} height={100} fill="#7A5236" />
            <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              <rect x={-84} y={100} width={168} height={48} rx={6} fill="#E9F7E4" stroke="#2E7A2E" strokeWidth={3} />
              <Txt text="ልጆች፣ ዋና እዚህ ብቻ!" x={0} y={130} size={15} fill="#1E5A1E" />
            </g>
            <Soft x={96} y={124} delay={2} />
            <g className="som-arrow">
              <path d="M30 170 H70 M60 160 L72 170 L60 180" stroke="#2E7A2E" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <Place x={190} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" arm="wave" />
          </Place>
          <Place x={110} y={294} s={0.36} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={15} />
        </Langano>
      );
    // A calm, shallow place with a rope round it. They splash and swim. Gugu floats on his back.
    case 9:
      return (
        <Langano id={id}>
          <g>
            {[
              { x: 120, el: <Wolf mood="joy" />, tap: TAP.hawi },
              { x: 190, el: <Ibex mood="joy" />, tap: TAP.haben },
              { x: 270, el: <Tsehay mood="joy" />, tap: TAP.tsehay },
            ].map((k, i) => (
              <g key={k.x} className="ar-read-bob" style={vars({ "--delay": `${-i * 0.7}s` })}>
                <Place x={k.x} y={232} s={0.3} tap={k.tap}>
                  {k.el}
                </Place>
              </g>
            ))}
            <g className="ar-read-bob" style={vars({ "--dur": "3.4s" })}>
              <g transform="translate(336 196) rotate(-80)">
                <Place x={0} y={0} s={0.3} tap={TAP.gugu}>
                  <Gugu mood="joy" />
                </Place>
              </g>
            </g>
          </g>
          <path d="M60 208 Q200 200 380 208 L380 240 Q200 234 60 240Z" fill="#8FA8A8" opacity={0.85} />
          <path d="M60 208 Q200 200 380 208" stroke="#fff" strokeWidth={2.4} fill="none" opacity={0.8} />
          <path d="M60 236 V182 M380 236 V182" stroke="#7A5236" strokeWidth={4} fill="none" />
          <path d="M60 186 Q210 176 380 186" stroke="#F5B21E" strokeWidth={2.4} strokeDasharray="6 5" fill="none" />
          <Place x={40} y={294} s={0.48} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <g fill="#FFFFFF">
            {[150, 230, 300].map((x, i) => (
              <circle key={x} cx={x} cy={210} r={3} className="lali-pulse" style={vars({ "--delay": `${-i * 0.4}s` })} />
            ))}
          </g>
        </Langano>
      );
    // Lunch: "You kept everyone in the safe place. How?" "I read the whole sentence, not just one word!"
    case 10:
      return (
        <Langano id={id}>
          <ellipse cx={200} cy={270} rx={130} ry={20} fill="#4A7FD0" opacity={0.8} />
          <g transform="translate(200 266)">
            <ellipse cx={0} cy={0} rx={30} ry={8} fill="#D8B27E" />
            <ellipse cx={0} cy={-2} rx={24} ry={5} fill="#C9A06A" />
          </g>
          <Place x={120} y={290} s={0.46} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Place x={280} y={290} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Strip words={["ሙሉውን", "አንብቡ"]} x={200} y={90} size={24} delay={1} />
          <Air kind="day" seed={17} />
        </Langano>
      );
    // "Then that's ዋናው ነገር: the main thing!" "ዋና and ዋና!" Read it all, and the sentence will tell!
    default:
      return (
        <Langano id={id} time="evening">
          <Strip words={["ዋናው", "ነገር"]} x={200} y={80} size={30} delay={0.6} lit={0} />
          <Strong x={130} y={124} delay={1.8} />
          <Meaning x={268} y={128} delay={2.2}>
            <GatePic x={0} y={10} s={0.8} />
          </Meaning>
          {[
            { x: 70, el: <Teacher mood="joy" />, tap: TAP.mama, s: 0.42 },
            { x: 150, el: <Wolf mood="joy" wag arm="wave" />, tap: TAP.hawi, s: 0.42 },
            { x: 230, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu, s: 0.34 },
            { x: 300, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.36 },
            { x: 360, el: <Wolf elder mood="joy" />, tap: TAP.elder, s: 0.44 },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={294} s={k.s} tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <Air kind="dusk" seed={19} />
        </Langano>
      );
  }
}

