"use client";

import "./gugus-opposite-day.css";

import { useId } from "react";

import { Rain, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP } from "./kit-cast";
import { Home } from "./kit-places";
import { Hearth, Hearts, Sparkles } from "./kit-props";
import { Note, Pop, SayBubble, WordCard, r1 } from "./kit-read";

/*
  "Gugu's Opposite Day": one living picture per page (12 pages), all in and around Grandma's round
  house: breakfast, the note on the table, the open window and the rain pouring in, putting it
  right by the fire, and the opposite-card game. Opposites are always shown as a pair of cards
  joined by a two-headed arrow.
  Keyframes: lali-* (globals.css), ar-* (./kit.css, ./kit-read.css) and god-* (./gugus-opposite-day.css).
*/

const NOTE = ["ዝናብ ሊዘንብ ነው።", "መስኮቱን ዝጋ።", "ልብሶቹን ወደ ውስጥ", "አስገባ።"];

/** Two opposite words on cards, joined by a two-headed arrow, centred on (x, y). */
function Pair({ a, b, x, y, delay = 0.6, size = 20, gap = 110 }: { a: string; b: string; x: number; y: number; delay?: number; size?: number; gap?: number }) {
  return (
    <g>
      <WordCard text={a} x={x - gap / 2} y={y} size={size} delay={delay} color="#2F6FD6" />
      <g className="lali-fade-in" style={vars({ "--delay": `${r1(delay + 0.3)}s` })}>
        <path d={`M${x - 16} ${y} H${x + 16} M${x - 10} ${y - 6} L${x - 17} ${y} L${x - 10} ${y + 6} M${x + 10} ${y - 6} L${x + 17} ${y} L${x + 10} ${y + 6}`} stroke="#8A4FB0" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <WordCard text={b} x={x + gap / 2} y={y} size={size} delay={delay + 0.5} color="#C2410C" />
    </g>
  );
}

/** A square window in the wall with two wooden shutters, open or shut; rain can come in. */
function Window({ x, y, open = false, rain = false }: { x: number; y: number; open?: boolean; rain?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-34} y={-30} width={68} height={60} fill={rain ? "#7E8CA8" : "#BDE6FF"} stroke="#8A5A3A" strokeWidth={4} />
      {rain && (
        <g stroke="#EAF2FF" strokeWidth={1.6} strokeLinecap="round">
          <path d="M-20 -24 l-4 12 M-4 -20 l-4 12 M12 -26 l-4 12 M24 -14 l-4 12 M-14 4 l-4 12 M6 2 l-4 12" className="lali-rain" style={vars({ "--dur": "0.7s" })} />
        </g>
      )}
      {open ? (
        <g>
          <path d="M-34 -30 L-56 -24 V24 L-34 30Z" fill="#9A6236" stroke="#6E4024" strokeWidth={2} />
          <path d="M34 -30 L56 -24 V24 L34 30Z" fill="#9A6236" stroke="#6E4024" strokeWidth={2} />
        </g>
      ) : (
        <g>
          <rect x={-34} y={-30} width={34} height={60} fill="#9A6236" stroke="#6E4024" strokeWidth={2} />
          <rect x={0} y={-30} width={34} height={60} fill="#9A6236" stroke="#6E4024" strokeWidth={2} />
          <circle cx={-4} cy={0} r={2.4} fill="#F5B21E" />
          <circle cx={4} cy={0} r={2.4} fill="#F5B21E" />
        </g>
      )}
    </g>
  );
}

/** A folded pile of blankets (or a wet, drooping one). */
function Blankets({ x, y, wet = false, s = 1 }: { x: number; y: number; wet?: boolean; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-30} y={-12} width={60} height={12} rx={4} fill={wet ? "#3A5FA0" : "#4A7FD0"} />
      <rect x={-28} y={-24} width={56} height={12} rx={4} fill={wet ? "#A03A3A" : "#E2463F"} />
      <rect x={-26} y={-36} width={52} height={12} rx={4} fill={wet ? "#A08A2A" : "#F5B21E"} />
      {wet && (
        <g fill="#5BB8E8">
          {[-20, 0, 18].map((dx, i) => (
            <ellipse key={dx} cx={dx} cy={4} rx={2} ry={3} className="ar-read-fall" style={vars({ "--delay": `${-i * 0.3}s`, "--dur": "1s" })} />
          ))}
        </g>
      )}
    </g>
  );
}

/** Puddles on the floor. */
function Puddles() {
  return (
    <g fill="#7FB8E0" opacity={0.75}>
      <ellipse cx={300} cy={262} rx={34} ry={7} className="god-spread" />
      <ellipse cx={230} cy={280} rx={24} ry={5} className="god-spread" style={vars({ "--delay": "0.6s" })} />
      <ellipse cx={340} cy={286} rx={18} ry={4} className="god-spread" style={vars({ "--delay": "1.2s" })} />
    </g>
  );
}

export default function GugusOppositeDay({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Today is Opposite Day!" At breakfast Gugu says, "Good night, everyone!" Anbessa giggles into his tea.
    case 0:
      return (
        <g>
          <Home id={id} time="morning" />
          <SayBubble x={150} y={150} text="ደህና እደሩ!" size={20} delay={0.8} />
          <g transform="translate(150 106)">
            <Pop delay={1.4}>
              <path d="M-8 -12 A13 13 0 1 0 8 10 A10 10 0 0 1 -8 -12Z" fill="#F8EDC4" stroke="#C9B48E" strokeWidth={1.4} />
            </Pop>
          </g>
          <Place x={150} y={292} s={0.42} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={270} y={292} s={0.46} flip className="god-giggle" tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<path d="M-7 -8 L7 -8 L5 4 L-5 4Z" fill="#FFF8EE" stroke="#2E9A8A" strokeWidth={1.6} />} />
          </Place>
        </g>
      );
    // "Sit down," says Grandma. Gugu stands up. "Come inside!" He goes outside. "I'M SPEAKING QUIETLY!"
    case 1:
      return (
        <g>
          <Home id={id} time="morning" door="open" />
          <Pair a="ቁጭ በል" b="ተነሣ" x={230} y={60} delay={0.4} size={18} gap={130} />
          <Pair a="ውስጥ" b="ውጭ" x={230} y={120} delay={1.4} size={18} gap={110} />
          <Place x={96} y={236} s={0.36} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="hop" />
          </Place>
          <Place x={320} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="wow" arm="raise" />
          </Place>
        </g>
      );
    // Grandma leaves a note: ዝናብ ሊዘንብ ነው። መስኮቱን ዝጋ። ልብሶቹን ወደ ውስጥ አስገባ።
    case 2:
      return (
        <g>
          <Home id={id} time="day" door="open" win={[80, 80]} />
          <Window x={300} y={100} />
          <Note lines={NOTE} x={220} y={190} w={150} size={15} delay={0.6} pin={null} />
          <Place x={100} y={290} s={0.5} from={[200, 290]} delay={1.6} dur={2} tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Place x={330} y={292} s={0.38} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="wave" />
          </Place>
        </g>
      );
    // "Opposite Day!" He opens the window wide, and carries the blankets outside too!
    case 3:
      return (
        <g>
          <Home id={id} time="day" door="open" win={[80, 80]} />
          <Window x={300} y={100} open />
          <Pair a="ዝጋ" b="ክፈት" x={250} y={176} delay={0.6} size={18} />
          <Place x={120} y={292} s={0.42} from={[240, 292]} delay={0.6} dur={1.8} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<Blankets x={0} y={10} s={0.5} />} />
          </Place>
        </g>
      );
    // The sky goes dark; down comes the rain. It pours in through the window and soaks the blankets. "Oh no."
    case 4:
      return (
        <g>
          <Home id={id} time="day" door="open" rain win={[80, 80]} />
          <Window x={300} y={100} open rain />
          <g stroke="#9FD4F0" strokeWidth={2} strokeLinecap="round" opacity={0.85}>
            {[0, 1, 2, 3, 4].map((k) => (
              <path key={k} d={`M${290 + k * 6} ${130 + (k % 2) * 10} l-6 18`} className="ar-read-fall" style={vars({ "--delay": `${-k * 0.2}s`, "--dur": "0.6s" })} />
            ))}
          </g>
          <Puddles />
          <Blankets x={96} y={232} wet />
          <SayBubble x={200} y={180} text="ወይኔ!" size={18} delay={1.6} />
          <Place x={200} y={294} s={0.42} tap={TAP.gugu}>
            <Gugu mood="sad" />
          </Place>
          <Rain />
        </g>
      );
    // Anbessa runs in. "A note means what it says!" Gugu reads it again, slowly: ዝጋ, close. አስገባ, bring in.
    case 5:
      return (
        <g>
          <Home id={id} time="day" door="open" rain win={[80, 80]} />
          <Window x={300} y={100} open rain />
          <Puddles />
          <Note lines={NOTE} x={190} y={110} w={160} size={15} delay={0.3} pin={null} glow />
          <g className="lali-fade-in" style={vars({ "--delay": "1.4s" })}>
            <rect x={156} y={102} width={42} height={4} rx={2} fill="#E2463F" />
            <rect x={190} y={142} width={50} height={4} rx={2} fill="#E2463F" />
          </g>
          <Place x={110} y={292} s={0.44} from={[10, 292]} delay={0.2} dur={1.2} tap={TAP.cub}>
            <Cub mood="worried" arm="reach" />
          </Place>
          <Place x={250} y={294} s={0.42} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
        </g>
      );
    // They put it right: close the window, bring the blankets in, hang them by the fire until they're dry.
    case 6:
      return (
        <g>
          <Home id={id} time="day" door="closed" rain win={[80, 80]} />
          <Window x={300} y={100} />
          <Hearth x={200} y={262} pot={false} />
          <g transform="translate(200 206)">
            <path d="M-60 0 H60" stroke="#7A5236" strokeWidth={3} />
            <g className="god-dry">
              <rect x={-50} y={0} width={30} height={34} rx={3} fill="#4A7FD0" />
              <rect x={-14} y={0} width={30} height={30} rx={3} fill="#E2463F" />
              <rect x={22} y={0} width={30} height={34} rx={3} fill="#F5B21E" />
            </g>
          </g>
          <Pair a="ክፍት" b="ዝግ" x={130} y={44} delay={0.4} size={16} gap={96} />
          <Pair a="ውጭ" b="ውስጥ" x={300} y={44} delay={1} size={16} gap={96} />
          <Pair a="እርጥብ" b="ደረቅ" x={210} y={158} delay={1.8} size={16} gap={110} />
          <Place x={80} y={292} s={0.42} tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Place x={330} y={292} s={0.4} flip tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
        </g>
      );
    // Gugu tells Grandma everything. "I'm sorry." Grandma hugs him. "Thank you for telling me."
    case 7:
      return (
        <g>
          <Home id={id} time="evening" door="closed" win={[80, 80]} />
          <Window x={300} y={100} />
          <Place x={230} y={292} s={0.52} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="wrap" />
          </Place>
          <Place x={170} y={294} s={0.38} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <SayBubble x={120} y={170} text="ይቅርታ።" size={18} delay={0.8} />
          <Hearts spots={[[200, 180, 1.4], [220, 166, 1.8], [186, 160, 2.2]]} />
        </g>
      );
    // Grandma makes word cards: ትልቅ, ትንሽ, ረጅም, አጭር, ሞቃት, ቀዝቃዛ, ላይ, ታች, ክፍት, ዝግ, ፈጣን, ቀርፋፋ.
    case 8:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} win={[340, 80]} />
          {["ትልቅ", "ትንሽ", "ረጅም", "አጭር", "ሞቃት", "ቀዝቃዛ", "ላይ", "ታች", "ክፍት", "ዝግ", "ፈጣን", "ቀርፋፋ"].map((w, i) => (
            <WordCard key={w} text={w} x={62 + (i % 4) * 82} y={50 + Math.floor(i / 4) * 46} size={16} delay={r1(0.3 + i * 0.15)} tilt={((i * 7) % 5) - 2} color={i % 2 ? "#C2410C" : "#2F6FD6"} />
          ))}
          <Place x={200} y={292} s={0.5} tap={TAP.grandma}>
            <Grandma mood="joy" arm="clap" />
          </Place>
          <Place x={90} y={292} s={0.38} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={320} y={292} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </g>
      );
    // ትልቅ: Anbessa stretches up big. ትንሽ: Gugu curls up small. ፈጣን: zoom! ቀርፋፋ: like tortoises.
    case 9:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} win={[340, 80]} />
          <Pair a="ትልቅ" b="ትንሽ" x={110} y={50} delay={0.4} size={17} gap={92} />
          <Pair a="ፈጣን" b="ቀርፋፋ" x={292} y={96} delay={1.2} size={17} gap={104} />
          <Place x={100} y={292} s={0.6} className="god-stretch" tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={190} y={294} s={0.26} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <g transform="translate(300 270)">
            <g className="lali-move-in" style={vars({ "--fx": "-40px", "--fy": "0px", "--dur": "6s", "--delay": "0.5s" })}>
              <ellipse cx={0} cy={0} rx={22} ry={13} fill="#6A8A3A" stroke="#4A6A2A" strokeWidth={2} />
              <path d="M-12 -4 L0 -10 L12 -4 M-8 4 L0 -2 L8 4" stroke="#4A6A2A" strokeWidth={1.6} fill="none" />
              <circle cx={24} cy={2} r={6} fill="#9AB06A" />
              <circle cx={26} cy={0} r={1.2} fill="#2A1A10" />
            </g>
          </g>
          <g stroke="#8A4FB0" strokeWidth={2.4} strokeLinecap="round" opacity={0.6}>
            <path d="M230 200 h-26 M236 210 h-34 M230 220 h-26" className="god-zoom" />
          </g>
        </g>
      );
    // The last card: ደስተኛ, happy. Its opposite: ያዘነ, sad. Gugu tries a sad face, but his mouth keeps smiling!
    case 10:
      return (
        <g>
          <Home id={id} time="evening" shelf={false} win={[340, 80]} />
          <Pair a="ደስተኛ" b="ያዘነ" x={200} y={60} delay={0.4} size={22} gap={140} />
          <Place x={200} y={292} s={0.5} tap={TAP.gugu}>
            <g className="god-flip-a">
              <Gugu mood="sad" />
            </g>
            <g className="god-flip-b">
              <Gugu mood="joy" />
            </g>
          </Place>
          <Place x={80} y={292} s={0.42} className="god-giggle" tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
          <Place x={330} y={292} s={0.48} flip tap={TAP.grandma}>
            <Grandma mood="joy" />
          </Place>
        </g>
      );
    // Bedtime. "ደህና እደር, Gugu." Gugu almost says good morning, then smiles: "ደህና እደሪ, Grandma. Opposite Day is over!"
    default:
      return (
        <g>
          <Home id={id} time="night" win={[300, 80]} />
          <g transform="translate(200 268)">
            <rect x={-90} y={-8} width={180} height={18} rx={8} fill="#D9B880" />
            <path d="M-70 -14 Q0 -26 90 -12 L90 6 Q0 12 -70 6Z" fill="#4A7FD0" />
          </g>
          <SayBubble x={290} y={170} text="ደህና እደር!" size={16} tail="right" delay={0.6} />
          <SayBubble x={110} y={170} text="ደህና እደሪ!" size={16} delay={1.8} />
          <Place x={140} y={270} s={0.36} tap={TAP.gugu}>
            <Gugu mood="happy" />
          </Place>
          <Place x={320} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="bless" />
          </Place>
          <Sparkles x={300} y={80} r={30} delay={2.4} />
        </g>
      );
  }
}
