"use client";

import "./lake-after-lake.css";

import { useId } from "react";

import { Acacia, Air, BeeHover, Depth, Mountains, NumberBadge, Place, Sky, Stars, vars } from "../../scenery";
import { AuntieSheep, Cub, Grandma, Papa, TAP } from "./kit-cast";
import { Amora, Bus, Croc, Enset, Flamingo, Hippo, LakeView, Marabou, Papyrus, Pelican, RIFT_LAKES, RiftView, WindowFace } from "./kit-land";
import { SkyFor } from "./kit-places";
import { Sign, Sparkles, Speech } from "./kit-props";

/*
  "Lake After Lake": one living picture per page (12 pages). The bus south from Addis Ababa into
  the Rift Valley, counting lakes: Ziway; Langano, Abijata and Shala; the long dusty stretch;
  Hawassa's fish market; enset hills and red-brown Abaya; the forest springs of Arba Minch; up the
  hill to see far; Abaya and Chamo with the Bridge of God between; crocodiles and hippos, watched
  from far away; seven lakes on a string. Keyframes: kit.css, kit-land.css and ./lake-after-lake.css.
*/

const LAKE_COLORS = RIFT_LAKES.map(([, , , c]) => c);

/** A wooden fishing boat with a little sail. */
function Boat({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="oe-bob" style={vars({ "--dur": "2.6s", "--delay": `${delay}s` })}>
        <path d="M-20 0 L20 0 L14 8 L-14 8Z" fill="#8A5A30" />
        <path d="M0 0 V-26 L14 -6Z" fill="#FFFFFF" />
        <path d="M0 0 V-26" stroke="#5A3A20" strokeWidth={1.6} />
      </g>
    </g>
  );
}

/** A cow grazing by the road. */
function Cow({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-14 0 V-10 M-8 0 V-10 M8 0 V-10 M14 0 V-10" stroke="#5A3A26" strokeWidth={3} />
      <ellipse cx={0} cy={-16} rx={18} ry={9} fill="#B8875A" />
      <ellipse cx={-4} cy={-18} rx={6} ry={4} fill="#FFFFFF" />
      <g className="lali-head-bob">
        <ellipse cx={20} cy={-12} rx={6} ry={5} fill="#B8875A" />
        <path d="M17 -16 q-2 -6 -6 -6 M23 -16 q2 -6 6 -6" stroke="#E8DCC0" strokeWidth={2} fill="none" />
      </g>
    </g>
  );
}

/** Seven lakes threaded on a string like beads, north to south. */
function LakeBeads({ y = 150, delay = 0.4 }: { y?: number; delay?: number }) {
  return (
    <g>
      <path d={`M40 ${y - 20} Q200 ${y + 40} 360 ${y - 20}`} stroke="#8A6A4A" strokeWidth={2} fill="none" />
      {LAKE_COLORS.map((c, i) => {
        const t = i / 6;
        const x = 40 + t * 320;
        const yy = y - 20 + Math.sin(t * Math.PI) * 30;
        return (
          <g key={i} className="lali-pop-in" style={vars({ "--delay": `${delay + i * 0.35}s` })}>
            <ellipse cx={Math.round(x)} cy={Math.round(yy)} rx={18} ry={13} fill={c} stroke="#FFFFFF" strokeWidth={3} />
            <text x={Math.round(x)} y={Math.round(yy) + 5} textAnchor="middle" fontSize={14} fontWeight={900} fill="#FFFFFF" fontFamily="var(--font-grandstander), sans-serif">
              {i + 1}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function LakeAfterLake({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The bus leaves Addis Ababa before sunrise. "Are we nearly there?" "Not even close!"
    case 0:
      return (
        <g>
          <Sky id={id} from="#26307A" mid="#8A6AA8" to="#FFC08A" />
          <Stars seed={3} n={16} top={6} bottom={80} />
          <Depth z={-0.3}>
            <g fill="#4A3E6A">
              {Array.from({ length: 16 }, (_, i) => (
                <rect key={i} x={i * 26} y={170 - ((i * 37) % 50)} width={22} height={140} />
              ))}
            </g>
            <g fill="#FFE27A">
              {Array.from({ length: 14 }, (_, i) => (
                <rect key={i} x={8 + i * 26} y={186 - ((i * 37) % 50)} width={5} height={5} className="lali-twinkle" style={vars({ "--delay": `${-i * 0.3}s` })} />
              ))}
            </g>
          </Depth>
          <rect x={-10} y={250} width={420} height={60} fill="#5A5A6A" />
          <path d="M-10 276 H410" stroke="#FFE27A" strokeWidth={3} strokeDasharray="16 14" />
          <Bus x={200} y={270} s={0.9} faces={[undefined, <WindowFace key="c" kind="cub" />, <WindowFace key="g" kind="granny" />]} />
          <g transform="translate(174 200)">
            <g className="laf-yawn">
              <path d="M0 0 q6 -6 12 0 q6 -6 12 0" stroke="#FFFFFF" strokeWidth={2} fill="none" />
            </g>
          </g>
        </g>
      );
    // Down into the Rift Valley: "lakes like beads on a string. Can you find seven?"
    case 1:
      return (
        <g>
          <RiftView
            id={id}
            time="morning"
            lakes={[
              [130, 176, 16, 4, LAKE_COLORS[0]],
              [180, 182, 12, 3, LAKE_COLORS[1]],
              [214, 178, 10, 3, LAKE_COLORS[2]],
              [244, 182, 12, 3, LAKE_COLORS[3]],
            ]}
          >
            <path d="M-10 290 Q120 250 200 236 T420 206" stroke="#8A8A96" strokeWidth={10} fill="none" />
            <g className="laf-down">
              <Bus x={100} y={262} s={0.36} />
            </g>
          </RiftView>
          <Sparkles x={190} y={178} r={60} delay={0.8} n={6} />
          <Air kind="day" seed={3} />
        </g>
      );
    // Lake ONE: Ziway. Fishing boats, tall birds on one leg in the reeds.
    case 2:
      return (
        <g>
          <LakeView id={id} time="morning" water={LAKE_COLORS[0]}>
            <Boat x={250} y={200} s={1} />
            <Boat x={320} y={210} s={0.8} delay={-1} />
            <Papyrus x={40} y={240} s={1} />
            <Papyrus x={80} y={250} s={0.8} delay={-0.6} />
          </LakeView>
          <Marabou x={120} y={262} s={1.1} />
          <Pelican x={180} y={236} s={1} />
          <Place x={330} y={300} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <NumberBadge x={200} y={120} n="1" delay={0.8} />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // Langano (tea-brown, children splashing), Abijata (pink flamingos), Shala (deep, hot springs steaming).
    case 3:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#F2FBFF" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <rect x={-10} y={176} width={420} height={140} fill="#D9C08A" />
          <ellipse cx={70} cy={230} rx={70} ry={22} fill={LAKE_COLORS[1]} />
          {[46, 86].map((x, i) => (
            <g key={x} className="laf-splash" style={vars({ "--delay": `${-i * 0.35}s` })}>
              <path d={`M${x - 6} 230 l-4 -10 M${x + 6} 230 l4 -10`} stroke="#5A3A26" strokeWidth={3} strokeLinecap="round" />
              <circle cx={x} cy={224} r={5.4} fill="#5A3A26" />
              <path d={`M${x - 12} 232 q4 -6 8 0 M${x + 4} 232 q4 -6 8 0`} stroke="#FFFFFF" strokeWidth={2} fill="none" />
            </g>
          ))}
          <ellipse cx={200} cy={250} rx={70} ry={20} fill={LAKE_COLORS[2]} />
          {[176, 192, 210, 226].map((x, i) => (
            <Flamingo key={x} x={x} y={256} s={0.7} flip={i % 2 === 1} delay={-i * 0.4} />
          ))}
          <ellipse cx={334} cy={226} rx={64} ry={22} fill={LAKE_COLORS[3]} />
          <g fill="#FFFFFF">
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={300 + i * 8} cy={210} r={6} className="lali-smoke" style={vars({ "--delay": `${-i * 1.1}s` })} />
            ))}
          </g>
          <NumberBadge x={70} y={190} n="2" delay={0.6} />
          <NumberBadge x={200} y={198} n="3" delay={1.2} />
          <NumberBadge x={334} y={186} n="4" delay={1.8} />
          <Acacia x={130} y={200} s={0.4} />
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // No lakes for a long time: acacias, dust and cows. Anbessa slumps: "This game is too hard."
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#5A6A8A" />
          <g>
            <rect x={30} y={30} width={340} height={150} rx={14} fill="#BFE4FA" />
            <g clipPath={`url(#${id}-win)`}>
              <defs>
                <clipPath id={`${id}-win`}>
                  <rect x={30} y={30} width={340} height={150} rx={14} />
                </clipPath>
              </defs>
              <rect x={30} y={120} width={340} height={60} fill="#D9C08A" />
              <g className="oe-scroll" style={vars({ "--by": "-200px", "--dur": "5s" })}>
                {[60, 160, 260, 360, 460, 560].map((x, i) => (
                  <g key={x}>
                    <Acacia x={x} y={130} s={0.5} />
                    {i % 2 === 0 && <Cow x={x + 50} y={160} s={0.9} flip={i % 4 === 0} />}
                  </g>
                ))}
              </g>
              <g fill="#E8D8B0" opacity={0.7}>
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={100 + i * 90} cy={150} r={14} className="lali-smoke" style={vars({ "--delay": `${-i}s` })} />
                ))}
              </g>
            </g>
            <rect x={30} y={30} width={340} height={150} rx={14} fill="none" stroke="#2A3A5A" strokeWidth={8} />
          </g>
          <rect x={-10} y={190} width={420} height={120} fill="#2F5FA8" />
          <rect x={-10} y={196} width={420} height={6} fill="#2A4A8A" />
          <Place x={130} y={300} s={0.5} tap={TAP.cub}>
            <Cub mood="sad" look={-2} />
          </Place>
          <Place x={270} y={298} s={0.5} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Sign x={170} y={170} kind="?" delay={1.2} />
        </g>
      );
    // "Keep looking!" Lake FIVE: Hawassa, with marabou storks waiting at the fish market.
    case 5:
      return (
        <g>
          <LakeView id={id} time="day" water={LAKE_COLORS[4]}>
            <Boat x={280} y={196} s={0.9} />
          </LakeView>
          <path d="M-10 250 Q200 236 410 252 L410 310 L-10 310Z" fill="#C9A86A" />
          <g transform="translate(200 254)">
            <rect x={-40} y={-10} width={80} height={10} rx={2} fill="#8A5A30" />
            {[-28, -12, 4, 20].map((fx) => (
              <path key={fx} d={`M${fx} -14 q8 -6 14 0 q-6 6 -14 0Z M${fx + 14} -14 l5 -4 l0 8Z`} fill="#9AB0C8" />
            ))}
          </g>
          <Place x={250} y={298} s={0.38} flip tap={TAP.papa}>
            <Papa mood="joy" pose="wave" />
          </Place>
          <g className="laf-shoo">
            <Marabou x={120} y={270} s={1.4} />
          </g>
          <Marabou x={330} y={268} s={1.2} flip />
          <BeeHover x={170} y={130} s={1} />
          <NumberBadge x={60} y={140} n="5" delay={0.8} />
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Green hills of enset; then a long lake, red-brown like the earth: Lake SIX, Abaya.
    case 6:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Depth z={-0.4}>
            <path d="M-10 170 Q100 140 200 158 T410 150 L410 200 L-10 200Z" fill="#6AA84E" />
          </Depth>
          <path d="M60 196 Q200 180 380 192 Q300 214 80 210Z" fill={LAKE_COLORS[5]} />
          <path d="M-10 210 Q200 200 410 214 L410 310 L-10 310Z" fill="#7CBF5A" />
          <path d="M-10 290 Q200 270 410 286" stroke="#8A8A96" strokeWidth={12} fill="none" />
          <Enset x={50} y={270} s={0.9} />
          <Enset x={340} y={266} s={1} delay={-1.5} />
          <Enset x={110} y={262} s={0.6} delay={-0.7} />
          <g className="oe-drive" style={vars({ "--from": "-120px", "--to": "160px", "--dur": "7s" })}>
            <Bus x={180} y={286} s={0.4} />
          </g>
          <NumberBadge x={220} y={170} n="6" delay={1} />
          <Air kind="day" seed={11} />
        </g>
      );
    // Arba Minch: a thick forest hides the last lake; Auntie Almaz shows the bubbling springs.
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#2E5A3A" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <rect x={i * 48 - 6} y={0} width={14} height={250} fill="#5A4030" />
              <ellipse cx={i * 48} cy={30 + (i % 3) * 20} rx={46} ry={40} fill={i % 2 ? "#3A7A42" : "#2E6A3A"} />
            </g>
          ))}
          <path d="M-10 230 Q200 214 410 232 L410 310 L-10 310Z" fill="#4E8A4A" />
          <g transform="translate(200 250)">
            <ellipse cx={0} cy={0} rx={44} ry={10} fill="#7FC4EE" />
            {[-16, 0, 16].map((sx, i) => (
              <circle key={sx} cx={sx} cy={-2} r={3} fill="#FFFFFF" className="oe-bubble" style={vars({ "--delay": `${-i * 0.4}s` })} />
            ))}
          </g>
          <Place x={100} y={298} s={0.44} tap={TAP.sheep}>
            <AuntieSheep mood="joy" />
          </Place>
          <Place x={300} y={298} s={0.4} flip tap={TAP.cub}>
            <Cub mood="wow" look={-3} />
          </Place>
          <Place x={350} y={296} s={0.36} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Air kind="day" seed={13} />
        </g>
      );
    // "To see far, you must go up high!" Anbessa remembers Amora, and points at the hill.
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <path d="M180 310 Q260 100 340 120 Q380 130 420 200 L420 310Z" fill="#4E8A4A" />
          <path d="M-10 240 Q120 226 200 250 L200 310 L-10 310Z" fill="#6AA84E" />
          <path d="M250 310 Q280 220 330 130" stroke="#C9A86A" strokeWidth={6} strokeDasharray="8 6" fill="none" />
          <Place x={110} y={296} s={0.48} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Speech x={110} y={120} w={80} h={56} tail="down" delay={0.6} think>
            <g transform="scale(0.24)">
              <Amora />
            </g>
          </Speech>
          <BeeHover x={220} y={180} s={1} />
          <Air kind="day" seed={15} />
        </g>
      );
    // From the top: two lakes at once, Abaya and Chamo, and the Bridge of God between them.
    case 9:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#9DB0D8" />
          <path d="M-10 150 Q200 136 410 150 L410 310 L-10 310Z" fill="#6AA84E" />
          <path d="M-10 168 Q90 156 176 170 Q186 196 160 222 Q60 230 -10 226Z" fill={LAKE_COLORS[5]} />
          <path d="M410 168 Q310 156 226 170 Q216 196 242 222 Q340 230 410 226Z" fill={LAKE_COLORS[6]} />
          <g className="laf-bridge">
            <path d="M150 230 Q170 196 186 172 Q201 160 216 172 Q232 196 252 230Z" fill="#3E8A4E" />
            <path d="M186 172 Q201 160 216 172" stroke="#6AB052" strokeWidth={4} fill="none" />
          </g>
          <path d="M-10 256 Q200 236 410 258 L410 310 L-10 310Z" fill="#4E8A4A" />
          {[
            { x: 120, el: <AuntieSheep mood="joy" />, tap: TAP.sheep, s: 0.34 },
            { x: 200, el: <Cub mood="wow" arm="up" />, tap: TAP.cub, s: 0.36 },
            { x: 280, el: <Grandma mood="joy" arm="raise" />, tap: TAP.grandma, s: 0.36 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={300} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <Sparkles x={200} y={190} r={40} delay={1} n={5} />
          <Air kind="day" seed={17} />
        </g>
      );
    // SEVEN: Lake Chamo! Crocodiles sunning with open mouths, hippos blowing bubbles, watched from far away.
    case 10:
      return (
        <g>
          <LakeView id={id} time="day" water={LAKE_COLORS[6]} island={false} />
          <path d="M-10 230 Q120 218 260 236 L260 260 Q120 248 -10 258Z" fill="#C9B07A" />
          <Croc x={70} y={244} s={0.9} />
          <Croc x={180} y={250} s={0.75} flip />
          <Hippo x={300} y={210} s={1.2} />
          <Hippo x={350} y={232} s={0.9} />
          <path d="M240 310 Q320 250 410 246 L410 310Z" fill="#4E8A4A" />
          <Place x={330} y={290} s={0.3} flip tap={TAP.cub}>
            <Cub mood="wow" arm="up" />
          </Place>
          <Place x={380} y={286} s={0.3} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <NumberBadge x={200} y={140} n="7" delay={0.8} />
          <Sparkles x={200} y={140} r={40} delay={1.2} n={6} />
        </g>
      );
    // On the bus home: seven lakes, north to south, counted on his claws.
    case 11:
      return (
        <g>
          <Sky id={id} from="#5A4A9E" mid="#F08A6A" to="#FFD08A" />
          <LakeBeads y={96} />
          <rect x={-10} y={200} width={420} height={110} fill="#8A8A96" />
          <Bus x={200} y={262} s={0.95} faces={[<WindowFace key="g" kind="granny" />, <WindowFace key="c" kind="cub" />]} />
          <Air kind="dusk" seed={19} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
