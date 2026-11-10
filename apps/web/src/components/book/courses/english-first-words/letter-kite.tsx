"use client";

import "./letter-kite.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Mountains, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Grandma, Gugu, TAP } from "./cast";
import { FruitTree, Home, Yard } from "./places";
import { LetterCard, SayBubble, Sign, Sparkles, Speech, WordCard } from "./props";
import { Thing } from "./things";

/*
  "The K-L-M Kite": one living picture per page (12 pages). The kite is the star: a paper diamond
  with a big K, L and M painted on it (the letters appear on it as they are painted), a ribbon
  tail and a long string back to the friends' paws. It dances in the wind, gets caught in the
  prickly lemon tree, and is freed with Grandma's ladder: "l" for ladder. Every "k", "l" and "m"
  word gets its English card.
  Keyframes: ./kit.css (efw-*) and ./letter-kite.css (lk-*).
*/

const GOLD = "#C99A00";
const ANDIKA = "var(--font-andika), var(--font-grandstander), sans-serif";

/** The kite, centred on (x, y): a diamond with the letters painted so far, and a ribbon tail. */
function Kite({ x, y, s = 1, letters = "KLM", dance = true, stuck = false }: { x: number; y: number; s?: number; letters?: string; dance?: boolean; stuck?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={stuck ? "lk-stuck" : dance ? "efw-kite" : undefined}>
        <Tappable reaction="wiggle" sound="chime">
          <path d="M0 -44 L34 -4 L0 44 L-34 -4Z" fill="#FFF3C0" stroke="#7A5236" strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M0 -44 V44 M-34 -4 H34" stroke="#7A5236" strokeWidth={2} />
          <path d="M0 -44 L34 -4 L0 -4Z" fill="#E8513B" opacity={0.25} />
          <path d="M0 -4 L-34 -4 L0 44Z" fill="#2F6FD0" opacity={0.2} />
          {letters.includes("K") && (
            <text x={-14} y={-12} fontSize={20} fontFamily={ANDIKA} fontWeight={700} fill="#E8513B" textAnchor="middle">
              K
            </text>
          )}
          {letters.includes("L") && (
            <text x={14} y={-12} fontSize={20} fontFamily={ANDIKA} fontWeight={700} fill={GOLD} textAnchor="middle">
              L
            </text>
          )}
          {letters.includes("M") && (
            <text x={0} y={24} fontSize={20} fontFamily={ANDIKA} fontWeight={700} fill="#8E5BE0" textAnchor="middle">
              M
            </text>
          )}
          <g className="efw-flick">
            <path d="M0 44 Q-10 58 2 70 Q12 82 -2 96" stroke="#7A5236" strokeWidth={1.6} fill="none" />
            <path d="M-4 56 l-8 -4 l2 9Z M2 70 l8 -4 l-2 9Z M-2 84 l-8 -4 l2 9Z" fill="#2E9A5B" />
          </g>
        </Tappable>
      </g>
    </g>
  );
}

/** The kite string from the friends' paws (fx, fy) to the kite (kx, ky). */
function KiteString({ fx, fy, kx, ky }: { fx: number; fy: number; kx: number; ky: number }) {
  return <path d={`M${fx} ${fy} Q${(fx + kx) / 2 + 30} ${(fy + ky) / 2 + 40} ${kx} ${ky}`} stroke="#FFFDF6" strokeWidth={1.4} fill="none" />;
}

/** Lines of wind blowing across. */
function Wind({ y = 80 }: { y?: number }) {
  return (
    <g stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" fill="none" opacity={0.8}>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${-20 + i * 50} ${y + i * 26} q40 -10 80 0 q20 6 30 -6`} className="lk-wind" style={vars({ "--delay": `${i * 0.6}s` })} />
      ))}
    </g>
  );
}

/** Grandma's wooden ladder, leaning, foot at (x, y). */
function Ladder({ x, y, h = 130 }: { x: number; y: number; h?: number }) {
  const rungs = Math.floor(h / 22);
  return (
    <g transform={`translate(${x} ${y}) rotate(8)`}>
      <Tappable reaction="wiggle" sound="pop">
        <path d={`M-14 0 L-10 ${-h} M14 0 L10 ${-h}`} stroke="#9C6A3A" strokeWidth={5} strokeLinecap="round" />
        {Array.from({ length: rungs }, (_, i) => (
          <path key={i} d={`M-13 ${-12 - i * 22} H13`} stroke="#C98A4A" strokeWidth={4} strokeLinecap="round" />
        ))}
      </Tappable>
    </g>
  );
}

export default function LetterKite({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Kite weather! Sticks, paper and a long, long string.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" tree fig={330}>
            <Wind y={60} />
            <g transform="translate(200 262) rotate(-70)">
              <Kite x={0} y={0} s={0.9} letters="" dance={false} />
            </g>
            <Place x={110} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" arm="hold" />
            </Place>
            <Place x={290} y={294} s={0.44} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
          </Yard>
          <Air kind="day" seed={2} />
        </g>
      );
    // K says "k": KITE. L says "l": LION, that's me!
    case 1:
      return (
        <g>
          <Yard id={id} time="day" tree fig={330}>
            <Kite x={200} y={180} s={1.5} letters="KL" dance={false} />
            <Place x={90} y={294} s={0.48} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <WordCard x={64} y={70} word="kite" pic="kite" color="#E8513B" size={14} delay={1} />
            <WordCard x={330} y={70} word="lion" pic="lion" color={GOLD} size={14} delay={2.2} />
          </Yard>
          <Air kind="day" seed={3} />
        </g>
      );
    // M says "mmm": MONKEY. "Geladas are monkeys, you know."
    case 2:
      return (
        <g>
          <Yard id={id} time="day" tree fig={330}>
            <Kite x={200} y={180} s={1.5} letters="KLM" dance={false} />
            <Place x={320} y={296} s={0.5} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <Place x={86} y={294} s={0.44} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <WordCard x={320} y={70} word="monkey" pic="monkey" color="#8E5BE0" size={14} delay={1} />
            <Sparkles x={200} y={190} r={60} delay={1.4} n={6} />
          </Yard>
          <Air kind="day" seed={4} />
        </g>
      );
    // Up, up, up! Fly, kite, fly! K, L, M in the sky!
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <Wind y={150} />
            <KiteString fx={130} fy={226} kx={270} ky={100} />
            <Kite x={270} y={80} s={0.9} />
            <Place x={110} y={296} s={0.42} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={60} y={296} s={0.4} className="lali-hop" tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <BeeHover x={340} y={150} s={0.9} flip />
          </Yard>
          <Air kind="day" seed={5} />
        </g>
      );
    // Over the mango tree… then a gust pulls it down, down, down.
    case 4:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FruitTree x={250} y={250} s={1.1} fruit="mango" />
            <Wind y={70} />
            <g className="lk-fall">
              <Kite x={260} y={60} s={0.8} />
            </g>
            <Place x={80} y={296} s={0.42} tap={TAP.gugu}>
              <Gugu mood="wow" pose="point" />
            </Place>
            <Place x={130} y={296} s={0.4} tap={TAP.cub}>
              <Cub mood="wow" />
            </Place>
            <WordCard x={350} y={180} word="mango" pic="mango" color="#8E5BE0" size={13} delay={0.8} />
          </Yard>
          <Air kind="day" seed={6} />
        </g>
      );
    // Stuck in the lemon tree! The branches are thin and prickly. "Ouch!"
    case 5:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FruitTree x={220} y={262} s={1.5} fruit="lemon">
              <Kite x={20} y={-150} s={0.6} stuck />
            </FruitTree>
            <Place x={160} y={226} s={0.34} className="lk-wobble" tap={TAP.gugu}>
              <Gugu mood="worried" />
            </Place>
            <SayBubble x={110} y={130} lines={["Ouch!"]} size={16} tail="right" delay={1.4} color="#E8513B" />
            <Place x={320} y={296} s={0.42} flip tap={TAP.cub}>
              <Cub mood="worried" look={-3} />
            </Place>
          </Yard>
          <Air kind="day" seed={7} />
        </g>
      );
    // He jumps; he tries a stick. Too short!
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FruitTree x={220} y={262} s={1.5} fruit="lemon">
              <Kite x={20} y={-150} s={0.6} stuck />
            </FruitTree>
            <Place x={230} y={296} s={0.46} className="lk-jump" tap={TAP.cub}>
              <Cub mood="happy" arm="up" item={<path d="M0 0 L-6 -60" stroke="#7A5236" strokeWidth={4} strokeLinecap="round" />} />
            </Place>
            <Place x={120} y={296} s={0.42} tap={TAP.gugu}>
              <Gugu mood="sad" />
            </Place>
            <Sign x={300} y={150} kind="?" delay={1.6} />
          </Yard>
          <Air kind="day" seed={8} />
        </g>
      );
    // Anbessa looks at the L: "l", "l"… LADDER!
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FruitTree x={250} y={262} s={1.5} fruit="lemon">
              <Kite x={20} y={-150} s={0.6} stuck />
            </FruitTree>
            <Place x={110} y={298} s={0.5} tap={TAP.cub}>
              <Cub mood="wow" look={3} />
            </Place>
            <LetterCard x={74} y={70} letter="L" color={GOLD} delay={0.4} say />
            <Speech x={150} y={150} w={70} h={70} think tail="left" delay={1.4}>
              <g transform="scale(0.7)">
                <Thing id="ladder" />
              </g>
            </Speech>
            <WordCard x={330} y={210} word="ladder" color={GOLD} size={15} delay={2.4} />
          </Yard>
          <Air kind="day" seed={9} />
        </g>
      );
    // Up the ladder, step by step. Plop! A lemon falls. "L for lemon!"
    case 8:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <FruitTree x={230} y={262} s={1.5} fruit="lemon">
              <Kite x={20} y={-150} s={0.6} />
            </FruitTree>
            <Ladder x={200} y={270} h={140} />
            <Place x={212} y={170} s={0.36} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={140} y={292} s={0.46} tap={TAP.grandma}>
              <Grandma mood="joy" arm="hold" />
            </Place>
            <g transform="translate(290 120)">
              <g className="lk-plop">
                <ellipse cx={0} cy={0} rx={9} ry={7} fill="#FFE04A" stroke="#C9A82A" strokeWidth={1.4} />
              </g>
            </g>
            <WordCard x={340} y={70} word="lemon" pic="lemon" color={GOLD} size={14} delay={2} />
            <Place x={330} y={296} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
          </Yard>
          <Air kind="day" seed={10} />
        </g>
      );
    // High over the mountains.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false}>
            <g transform="translate(0 30)">
              <Mountains far="#9DB0D8" mid="#7A94C4" snow />
            </g>
            <Wind y={50} />
            <KiteString fx={110} fy={230} kx={290} ky={74} />
            <Kite x={290} y={60} s={0.8} />
            <Place x={100} y={296} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={50} y={296} s={0.38} tap={TAP.gugu}>
              <Gugu mood="joy" pose="wave" />
            </Place>
            <WordCard x={200} y={130} word="mountains" pic="mountain" color="#8E5BE0" size={14} delay={1} />
          </Yard>
          <Air kind="day" seed={11} />
        </g>
      );
    // The moon comes up. "m", "m", MOON!
    case 10:
      return (
        <g>
          <Yard id={id} time="evening" house={false}>
            <Glow x={330} y={56} r={60} color="#FFF6D8" strength={0.6} dur={3} />
            <KiteString fx={130} fy={230} kx={220} ky={130} />
            <Kite x={220} y={116} s={0.7} />
            <Place x={120} y={296} s={0.42} from={[240, 296]} dur={4} tap={TAP.cub}>
              <Cub mood="happy" arm="up" />
            </Place>
            <Place x={70} y={296} s={0.4} from={[190, 296]} dur={4} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <WordCard x={330} y={130} word="moon" pic="moon" color="#8E5BE0" size={14} delay={1.4} />
          </Yard>
          <Air kind="dusk" seed={12} />
        </g>
      );
    // Lemon juice: K for kite, L for ladder and lemon, M for moon.
    default:
      return (
        <g>
          <Home id={id} time="night" shelf={false}>
            <Glow x={200} y={230} r={130} color="#FFB547" strength={0.35} dur={4} />
            <Kite x={330} y={150} s={0.8} dance={false} />
            <Place x={180} y={292} s={0.48} tap={TAP.grandma}>
              <Grandma mood="joy" arm="hold" item={<Thing id="water" s={0.3} />} />
            </Place>
            <Place x={90} y={294} s={0.4} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <Place x={262} y={294} s={0.4} flip tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            {(["K", "L", "M"] as const).map((l, i) => (
              <LetterCard key={l} x={70 + i * 76} y={64} letter={l} color={["#E8513B", GOLD, "#8E5BE0"][i]} s={0.85} delay={0.5 + i * 0.5} />
            ))}
          </Home>
        </g>
      );
  }
}
