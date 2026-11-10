"use client";

import "./little-wa-tails.css";

import { useId } from "react";

import { Person } from "../../library/festival-kit";
import { Acacia, Air, BeeFlight, BeeHover, Place, Rock, vars } from "../../scenery";
import { Camel, Gugu, Ibex, TAP, Teacher, Tsehay, Wolf } from "./kit-cast";
import { Bench, Classroom } from "./kit-more";
import { Home, Village } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { Note, OpenSky, Parts, Pop, SayBubble, Signpost, Txt, WordCard, r1 } from "./kit-read";
import { Thing } from "./things";

/*
  "The Little Wa Tails": one living picture per page (12 pages). Haben's home at breakfast, the
  classroom, the walk through the village (the water tap, a runner, Ayan at the back, a rest
  under an acacia), the fork with two signs, and the waterfall with its rainbow. Every "wa" word
  appears on a card or a sign as the class finds it.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and lwt-* (./little-wa-tails.css).
*/

/** The village water tap: a pipe with a spout, a dripping drop and a little sign. */
function WaterTap({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-6} y={-70} width={12} height={70} fill="#8A97A8" />
      <path d="M-6 -66 H22 Q30 -66 30 -58 V-50" stroke="#8A97A8" strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={-14} y={-80} width={28} height={8} rx={3} fill="#C2410C" />
      <g fill="#5BB8E8">
        {[0, 1, 2].map((k) => (
          <ellipse key={k} cx={30} cy={-44} rx={3} ry={4} className="ar-read-fall" style={vars({ "--delay": `${-k * 0.4}s`, "--dur": "1.2s" })} />
        ))}
      </g>
      <ellipse cx={30} cy={2} rx={22} ry={6} fill="#5BB8E8" opacity={0.6} />
      <rect x={-34} y={0} width={86} height={8} rx={3} fill="#9C98A6" />
    </g>
  );
}

/** The fork in the path: a dirt road that splits left and right, with a signpost on each side. */
function Fork({ id, glow }: { id: string; glow?: boolean }) {
  return (
    <>
      <OpenSky id={id} sun={[60, 50]} />
      <path d="M-10 170 Q120 140 210 150 T410 146 L410 310 L-10 310Z" fill="#8FCB80" />
      <path d="M170 310 Q190 250 200 214 Q180 190 60 180 L40 192 Q160 204 170 220 Q150 270 120 310Z" fill="#E3B77C" />
      <path d="M200 214 Q230 190 350 176 L370 188 Q250 204 220 226Z" fill="#E3B77C" />
      <Acacia x={330} y={170} s={0.5} />
      <Acacia x={70} y={160} s={0.4} />
      <Signpost x={110} y={230} text="ወደ ገበያ" dir="left" size={16} pole={80} delay={0.4} />
      <Signpost x={300} y={232} text="ወደ ፏፏቴው" dir="right" size={16} pole={82} delay={0.8} glow={glow} />
    </>
  );
}

/** The waterfall: a cliff, falling water, a pool and a rainbow in the spray. */
function Waterfall({ id, rainbow = true }: { id: string; rainbow?: boolean }) {
  return (
    <>
      <OpenSky id={id} sun={[340, 44]} />
      <path d="M-10 90 Q60 60 140 70 L150 230 L-10 240Z" fill="#7E6A5A" />
      <path d="M260 70 Q340 56 410 80 L410 240 L250 230Z" fill="#7E6A5A" />
      <path d="M-10 90 Q60 60 140 70 L140 84 Q60 74 -10 104Z M260 70 Q340 56 410 80 L410 94 Q340 70 260 84Z" fill="#5BA85A" />
      <rect x={140} y={70} width={120} height={160} fill="#BFE7FF" />
      <g stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" opacity={0.9}>
        {[150, 166, 182, 198, 214, 230, 246].map((x, i) => (
          <path key={x} d={`M${x} ${80 + (i % 3) * 18} v34`} className="ar-read-fall" style={vars({ "--delay": `${r1(-i * 0.17)}s`, "--dur": "0.9s" })} />
        ))}
        {[158, 190, 222, 250].map((x, i) => (
          <path key={x} d={`M${x} ${150 + (i % 2) * 16} v30`} className="ar-read-fall" style={vars({ "--delay": `${r1(-i * 0.23)}s`, "--dur": "0.8s" })} />
        ))}
      </g>
      {rainbow && (
        <g opacity={0.6} fill="none" strokeWidth={5} className="lali-fade-in" style={vars({ "--delay": "0.6s", "--dur": "1.6s" })}>
          {["#E2463F", "#FFB020", "#FFD233", "#3E9B5A", "#2F6FD6"].map((c, i) => (
            <path key={c} d={`M${110 + i * 6} 236 A${100 - i * 6} ${90 - i * 6} 0 0 1 ${300 - i * 6} 236`} stroke={c} />
          ))}
        </g>
      )}
      <path d="M-10 226 Q200 210 410 226 L410 310 L-10 310Z" fill="#6CC07C" />
      <ellipse cx={200} cy={240} rx={110} ry={16} fill="#5BB8E8" />
      <g fill="#FFFFFF" opacity={0.7}>
        {[150, 190, 230, 260].map((x, i) => (
          <circle key={x} cx={x} cy={234} r={6} className="lali-pulse" style={vars({ "--delay": `${-i * 0.3}s` })} />
        ))}
      </g>
      <Rock x={92} y={250} s={0.8} />
      <Rock x={320} y={252} s={0.7} />
    </>
  );
}

export default function LittleWaTails({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // ጧት, early morning. Haben is too excited to eat: today the class walks to the waterfall!
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <WordCard text="ጧት" x={312} y={160} size={30} delay={0.6} glow />
          <g transform="translate(250 262)">
            <ellipse cx={0} cy={0} rx={26} ry={8} fill="#D9A04A" />
            <ellipse cx={0} cy={-3} rx={22} ry={6} fill="#F4E2C4" />
          </g>
          <Place x={170} y={292} s={0.52} className="lali-hop" tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Sparkles x={170} y={160} r={34} delay={1.2} />
          <BeeHover x={80} y={170} s={0.8} />
        </g>
      );
    // Teacher Meron writes ጧ: ጠ with a little tail. "You know ኳ and ጓ. Today we find their cousins."
    case 1:
      return (
        <g>
          <Classroom
            id={id}
            board={
              <>
                <Txt text="ጠ → ጧ" x={200} y={86} size={34} fill="#F4F1E6" />
                <Txt text="ኳ  ጓ  ጧት" x={200} y={124} size={22} fill="#F4F1E6" opacity={0.85} />
              </>
            }
          />
          <g transform="translate(246 70)">
            <g className="lwt-tail">
              <circle r={10} fill="none" stroke="#FFE27A" strokeWidth={3} />
            </g>
          </g>
          <Place x={340} y={250} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="joy" pose="point" />
          </Place>
          <Bench x={170} y={300} w={300} />
          {[
            { x: 60, el: <Gugu mood="happy" />, tap: TAP.gugu },
            { x: 120, el: <Tsehay mood="happy" />, tap: TAP.tsehay },
            { x: 190, el: <Ibex mood="joy" />, tap: TAP.haben },
            { x: 260, el: <Camel who="ayan" mood="happy" />, tap: TAP.ayan },
          ].map((k, i) => (
            <Place key={k.x} x={k.x} y={292} s={i === 3 ? 0.34 : 0.3} tap={k.tap}>
              {k.el}
            </Place>
          ))}
        </g>
      );
    // The village water tap, drip, drip. "ቧ… ን… ቧ… ቧንቧ! Two tails in one word!"
    case 2:
      return (
        <Village id={id} time="morning">
          <WaterTap x={260} y={252} />
          <Parts parts={["ቧ", "ን", "ቧ"]} x={260} y={120} size={30} spread={22} delay={0.6} step={0.6} />
          <Place x={140} y={292} s={0.48} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Note lines={["ቧንቧ"]} x={70} y={190} w={70} size={16} tilt={-6} delay={3.6} pin={null} />
          <Air kind="day" seed={3} />
        </Village>
      );
    // A runner jogs past in green, yellow and red: ሯጭ. "ሯ! That's ረ with a tail!" Gugu runs too.
    case 3:
      return (
        <Village id={id} time="morning">
          <g transform="translate(230 284) scale(1.45)">
            <g className="lali-move-in" style={vars({ "--fx": "-140px", "--fy": "0px", "--dur": "3s", "--delay": "0.2s" })}>
              <g className="lali-hop" style={vars({ "--dur": "0.5s" })}>
                <Person kind="man" skin={1} dress="#2E9A5B" />
                <rect x={-20} y={-56} width={40} height={9} fill="#FFD233" />
                <rect x={-20} y={-47} width={40} height={9} fill="#E2463F" />
                <rect x={-16} y={-46} width={32} height={18} rx={3} fill="#FFFDF6" />
                <Txt text="ሯጭ" x={0} y={-32} size={13} />
              </g>
            </g>
          </g>
          <Place x={110} y={292} s={0.38} from={[20, 292]} delay={0.8} dur={2.4} tap={TAP.gugu}>
            <Gugu mood="joy" pose="hop" />
          </Place>
          <SayBubble x={110} y={176} text="ሯ!" size={22} delay={2.6} />
          <Place x={340} y={292} s={0.42} flip tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Air kind="day" seed={5} />
        </Village>
      );
    // Ayan is at the very back, watching a beetle. "Ayan, don't stay at the back!" Haben writes ኋላ.
    case 4:
      return (
        <Village id={id} time="day">
          <Place x={330} y={290} s={0.44} flip tap={TAP.mama}>
            <Teacher mood="wow" pose="wave" />
          </Place>
          <Place x={250} y={292} s={0.36} flip tap={TAP.haben}>
            <Ibex mood="happy" />
          </Place>
          <Place x={80} y={290} s={0.44} tap={TAP.ayan}>
            <Camel who="ayan" mood="wow" />
          </Place>
          <g transform="translate(140 282)">
            <g className="lwt-beetle">
              <ellipse cx={0} cy={0} rx={7} ry={5} fill="#2E6A3E" />
              <path d="M0 -5 V5" stroke="#1A3A22" strokeWidth={1} />
              <circle cx={7} cy={0} r={2.6} fill="#1A3A22" />
            </g>
          </g>
          <WordCard text="ኋላ" x={190} y={140} size={30} delay={1.6} glow />
          <BeeHover x={40} y={180} s={0.7} />
          <Air kind="day" seed={9} />
        </Village>
      );
    // A rest under a tree. Haben shares her kolo. "Thank you, ጓደኛ!" Haben writes ጓደኛ.
    case 5:
      return (
        <Village id={id} time="day">
          <Acacia x={200} y={250} s={1.1} />
          <Place x={150} y={292} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={250} y={292} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(200 270)">
            <Thing id="kolo" s={0.32} />
          </g>
          <WordCard text="ጓደኛ" x={200} y={120} size={28} delay={1.4} glow />
          <Air kind="day" seed={11} />
        </Village>
      );
    // The path splits in two. "You lead the way today. Which path goes to the waterfall?"
    case 6:
      return (
        <g>
          <Fork id={id} />
          <Place x={160} y={296} s={0.38} tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" />
          </Place>
          <Place x={250} y={296} s={0.42} flip tap={TAP.ayan}>
            <Camel who="ayan" mood="worried" />
          </Place>
          <Sign x={200} y={170} kind="?" delay={1.2} />
          <Place x={350} y={296} s={0.42} flip tap={TAP.mama}>
            <Teacher mood="happy" />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // Haben reads: ወደ ገበያ, to the market. ወደ ፏ… ፏ… ቴ… ፏፏቴ! "This way!"
    case 7:
      return (
        <g>
          <Fork id={id} glow />
          <Parts parts={["ፏ", "ፏ", "ቴ"]} x={200} y={60} size={30} spread={22} delay={1.2} step={0.6} />
          <Place x={230} y={298} s={0.48} tap={TAP.haben}>
            <Ibex mood="joy" pose="point" />
          </Place>
          <Place x={130} y={298} s={0.36} tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Air kind="day" seed={15} />
        </g>
      );
    // Down the path, a rushing, roaring sound. Gugu covers his ears. Lali buzzes ahead.
    case 8:
      return (
        <g>
          <OpenSky id={id} sun={[70, 50]} />
          <path d="M-10 150 Q200 120 410 150 L410 310 L-10 310Z" fill="#7FBF6A" />
          <path d="M120 310 Q170 240 300 160 L340 166 Q220 250 210 310Z" fill="#E3B77C" />
          <g transform="translate(330 120)">
            <g className="lwt-roar">
              {[0, 1, 2].map((k) => (
                <path key={k} d={`M${k * 12} 0 q6 -10 0 -20 M${k * 12} 0 q6 10 0 20`} stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.8} />
              ))}
            </g>
          </g>
          <BeeFlight path="M150 150 C220 120 280 110 340 120" dur={4} s={0.9} rest={[300, 120]} trail />
          <Place x={240} y={240} s={0.32} tap={TAP.haben}>
            <Ibex mood="joy" />
          </Place>
          <Place x={180} y={280} s={0.38} tap={TAP.gugu}>
            <Gugu mood="wow" pose="no" />
          </Place>
          <Place x={110} y={300} s={0.4} tap={TAP.ayan}>
            <Camel who="ayan" mood="happy" walk />
          </Place>
          <Air kind="day" seed={17} />
        </g>
      );
    // The waterfall! White water tumbles, a rainbow in the spray. "The water says ፏ… ፏ…!"
    case 9:
      return (
        <g>
          <Waterfall id={id} />
          <SayBubble x={110} y={150} text="ፏ… ፏ…!" size={20} delay={1.4} />
          <Place x={90} y={296} s={0.46} tap={TAP.haben}>
            <Ibex mood="joy" pose="wave" />
          </Place>
          <Place x={300} y={296} s={0.38} flip className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <BeeHover x={250} y={150} s={0.8} />
        </g>
      );
    // By the water Haben reads her list: ጧት, ቧንቧ, ሯጭ, ኋላ, ጓደኛ, ፏፏቴ. Six words with tails!
    case 10:
      return (
        <g>
          <Waterfall id={id} rainbow={false} />
          <Note lines={["ጧት  ቧንቧ", "ሯጭ  ኋላ", "ጓደኛ  ፏፏቴ"]} x={200} y={140} w={150} size={18} delay={0.6} pin="#2F7FB8" />
          {[
            { x: 70, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.36 },
            { x: 140, el: <Ibex mood="joy" pose="point" />, tap: TAP.haben, s: 0.44 },
            { x: 260, el: <Tsehay mood="joy" />, tap: TAP.tsehay, s: 0.34 },
            { x: 330, el: <Gugu mood="joy" />, tap: TAP.gugu, s: 0.34 },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={294} s={k.s} tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <g transform="translate(200 204)">
            <Pop delay={2}>
              <Txt text="6" x={0} y={0} size={22} fill="#C2410C" />
            </Pop>
          </g>
        </g>
      );
    // Walking home: "You found the way for us." Haben writes one more word: ጓደኞቼ, my friends.
    default:
      return (
        <Village id={id} time="evening">
          <WordCard text="ጓደኞቼ" x={200} y={110} size={30} delay={0.8} glow />
          {[
            { x: 70, el: <Wolf mood="joy" wag />, tap: TAP.hawi, s: 0.36 },
            { x: 140, el: <Camel who="ayan" mood="joy" walk />, tap: TAP.ayan, s: 0.38 },
            { x: 210, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben, s: 0.46 },
            { x: 280, el: <Tsehay mood="joy" pose="wave" />, tap: TAP.tsehay, s: 0.34 },
            { x: 340, el: <Gugu mood="joy" pose="hop" />, tap: TAP.gugu, s: 0.34 },
          ].map((k) => (
            <Place key={k.x} x={k.x} y={292} s={k.s} tap={k.tap}>
              {k.el}
            </Place>
          ))}
          <BeeHover x={300} y={150} s={0.8} flip />
          <Air kind="dusk" seed={19} />
        </Village>
      );
  }
}

