"use client";

import "./map-from-the-sky.css";

import { useId, type ReactNode } from "react";

import { CubShape } from "../../../characters";
import { Acacia, Air, BeeHover, Birds, Depth, DriftCloud, Mountains, Place, Sky, Stars, Sun, Tukul, vars } from "../../scenery";
import { Camel, Cub, Gugu, Ibex, TAP, Teacher, Wolf } from "./kit-cast";
import { Pencil } from "./kit-culture";
import { Amora, CoffeeBush, DallolPools, EthiopiaMap, Eucalyptus, Flamingo, Lobelia, PLACES, RiftView, SaltFlat, SimienEdge, WildGelada, WildIbex } from "./kit-land";
import { Classroom } from "./kit-more";
import { SkyFor } from "./kit-places";
import { Sparkles } from "./kit-props";

/*
  "The Map from the Sky": one living picture per page (13 pages). A classroom map that is only a
  blob; a ride on Amora the bearded vulture over Addis Ababa, the highlands and Lake Tana, the
  Simien, the Danakil, the Rift Valley lakes, the Bale Mountains, the coffee forests and the
  lowlands; then the real map, filled in by every friend. Keyframes: kit.css, kit-land.css and
  ./map-from-the-sky.css.
*/

/** Anbessa and Lali riding on Amora's back (drawn in Amora's own units). */
function Riders({ mood = "joy" }: { mood?: "joy" | "wow" | "happy" | "worried" }) {
  return (
    <g>
      <g transform="translate(-6 -2) scale(0.24) translate(-100 -230)">
        <CubShape pose="sit" mood={mood} />
      </g>
      <g transform="translate(24 -40)">
        <BeeHover x={0} y={0} s={0.7} />
      </g>
    </g>
  );
}

/** Amora flying across the picture with his riders, soaring gently. */
function Flying({ x, y, s = 0.8, mood, flip = false }: { x: number; y: number; s?: number; mood?: "joy" | "wow" | "happy" | "worried"; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="oe-soar" style={vars({ "--dur": "3.6s", "--rise": "-7px" })}>
        <Amora riders={<Riders mood={mood} />} />
      </g>
    </g>
  );
}

/** The paper on the classroom wall; `children` is drawn in the 400 x 300 picture-map's units. */
function WallPaper({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x={92} y={20} width={216} height={158} rx={4} fill="#FFFBEE" stroke="#C9B48A" strokeWidth={2} />
      <circle cx={100} cy={28} r={4} fill="#E2463F" />
      <circle cx={300} cy={28} r={4} fill="#E2463F" />
      <g transform="translate(100 24) scale(0.5)">{children}</g>
    </g>
  );
}

/** Addis Ababa from the air: rows of roofs, ribbon roads, green hills round it. */
function City() {
  const roofs = ["#E2463F", "#7FC8C0", "#F5B21E", "#FFFFFF", "#9AA6C8", "#D89B62"];
  return (
    <g>
      <path d="M-10 170 Q100 130 210 150 T410 140 L410 310 L-10 310Z" fill="#7CBF6A" />
      <path d="M-10 196 Q200 176 410 200 L410 310 L-10 310Z" fill="#CFC6B4" />
      {Array.from({ length: 34 }, (_, i) => {
        const x = 10 + (i % 17) * 23 + (i > 16 ? 10 : 0);
        const y = i > 16 ? 236 : 208;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect x={-8} y={-12} width={16} height={12} fill="#F4EEDC" />
            <path d="M-10 -12 L0 -20 L10 -12Z" fill={roofs[i % roofs.length]} className={i % 5 === 0 ? "mfs-twinkle" : undefined} style={vars({ "--delay": `${-i * 0.4}s` })} />
          </g>
        );
      })}
      <path d="M-10 262 Q100 250 200 262 T410 254" stroke="#8A8A96" strokeWidth={6} fill="none" />
      <path d="M200 310 Q210 260 260 230 T380 196" stroke="#8A8A96" strokeWidth={5} fill="none" />
      <g className="mfs-car">
        <rect x={0} y={258} width={8} height={4} rx={1} fill="#2F6FD0" />
      </g>
      <Eucalyptus x={30} y={186} s={0.4} />
      <Eucalyptus x={380} y={180} s={0.36} delay={-1} />
    </g>
  );
}

/** Green highlands from above, with a deep gorge, and Lake Tana with the river flowing out. */
function HighlandsAndTana() {
  return (
    <g>
      <rect x={-10} y={110} width={420} height={200} fill="#8CC97A" />
      {[
        [20, 130, "#D9B24A"],
        [90, 150, "#A8C670"],
        [30, 200, "#6AB052"],
        [120, 230, "#E0BC5A"],
        [300, 250, "#A8C670"],
        [340, 210, "#D9B24A"],
      ].map(([x, y, c], i) => (
        <path key={i} d={`M${x} ${y} l60 -6 l8 30 l-62 6Z`} fill={c as string} opacity={0.9} />
      ))}
      <path d="M-10 262 Q60 250 120 270 Q160 282 230 262" stroke="#6A5A3A" strokeWidth={10} fill="none" />
      <path d="M-10 262 Q60 250 120 270 Q160 282 230 262" stroke="#3E8A4E" strokeWidth={4} fill="none" />
      <ellipse cx={270} cy={160} rx={110} ry={42} fill="#4FA8E0" />
      <ellipse cx={250} cy={152} rx={60} ry={18} fill="#7FC4EE" opacity={0.6} />
      <ellipse cx={300} cy={150} rx={12} ry={6} fill="#3E8A4E" />
      <ellipse cx={244} cy={170} rx={8} ry={4} fill="#3E8A4E" />
      <path d="M300 200 Q320 230 300 260 T320 310" stroke="#3E8FD8" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M300 200 Q320 230 300 260 T320 310" stroke="#BFE4FA" strokeWidth={2} strokeDasharray="6 10" fill="none" className="mfs-flow" />
      <Tukul x={60} y={190} s={0.26} />
      <Tukul x={150} y={210} s={0.22} smoke={false} />
    </g>
  );
}

/** The friends' stickers on the finished map, in the map's own units. */
function Stickers({ delay = 0.6 }: { delay?: number }) {
  const at = (p: [number, number], el: ReactNode, d: number, s = 0.16) => (
    <g transform={`translate(${p[0]} ${p[1]})`}>
      <g className="oe-pin" style={vars({ "--delay": `${d}s` })}>
        <circle r={20} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
        <g transform={`scale(${s}) translate(-100 -140)`}>{el}</g>
      </g>
    </g>
  );
  return (
    <g>
      {at(PLACES.bale, <Wolf mood="joy" />, delay)}
      {at([PLACES.jijiga[0] + 14, PLACES.jijiga[1] + 30], <Camel who="ayan" mood="joy" />, delay + 0.6, 0.15)}
      {at([PLACES.mekelle[0] - 10, PLACES.mekelle[1] - 4], <Ibex mood="joy" />, delay + 1.2)}
      {at([PLACES.addis[0] - 30, PLACES.addis[1] + 6], <Cub mood="joy" />, delay + 1.8)}
    </g>
  );
}

export default function MapFromTheSky({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // An empty paper on the wall; Anbessa draws a blob with one tukul. "Is that ALL of Ethiopia?"
    case 0:
      return (
        <g>
          <Classroom id={id}>
            <rect x={92} y={20} width={216} height={158} rx={4} fill="#FFFBEE" stroke="#C9B48A" strokeWidth={2} />
            <circle cx={100} cy={28} r={4} fill="#E2463F" />
            <circle cx={300} cy={28} r={4} fill="#E2463F" />
            <g className="mfs-draw">
              <path d="M150 100 Q150 60 200 58 Q250 60 252 100 Q250 140 200 142 Q150 140 150 100Z" fill="none" stroke="#2B3A8C" strokeWidth={3} strokeLinecap="round" />
            </g>
            <Tukul x={200} y={118} s={0.3} smoke={false} />
          </Classroom>
          <Place x={56} y={292} s={0.46} tap={TAP.grandma}>
            <Teacher mood="happy" pose="point" />
          </Place>
          <Place x={176} y={296} s={0.42} tap={TAP.cub}>
            <Cub mood="worried" arm="hold" item={<Pencil x={0} y={0} s={1.4} rot={20} />} />
          </Place>
          <g className="mfs-tilt">
            <Place x={300} y={296} s={0.42} flip tap={TAP.gugu}>
              <Gugu mood="wow" pose="point" />
            </Place>
          </g>
        </g>
      );
    // Lali knows someone with very big wings: Amora, a bearded vulture, on the cliff.
    case 1:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Mountains far="#B7C6E6" mid="#8EA8D4" />
          <Depth z={-0.2}>
            <path d="M200 310 L210 170 Q230 150 260 150 L330 150 Q350 160 360 180 L410 310Z" fill="#8A7A6A" />
            <path d="M210 170 Q230 150 260 150 L330 150 Q350 160 360 180" stroke="#6A5A4A" strokeWidth={4} fill="none" />
          </Depth>
          <path d="M-10 250 Q120 236 220 254 L220 310 L-10 310Z" fill="#8FCB80" />
          <g transform="translate(290 128) scale(0.62)">
            <g className="lali-breathe">
              <Amora flap={false} />
            </g>
          </g>
          <Place x={110} y={292} s={0.46} tap={TAP.cub}>
            <Cub mood="wow" look={4} arm="up" />
          </Place>
          <BeeHover x={190} y={150} s={1.1} />
          <Sparkles x={290} y={120} r={50} delay={0.6} n={5} />
          <Air kind="day" seed={3} />
        </g>
      );
    // Up over Addis Ababa, the capital in the highlands. "Look down, look round: this is our land!"
    case 2:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#E8F6FF" />
          <Sun x={340} y={50} r={20} />
          <Depth z={-0.3}>
            <City />
          </Depth>
          <DriftCloud y={70} s={0.6} dur={40} phase={0.2} />
          <DriftCloud y={110} s={0.45} dur={34} phase={0.7} />
          <Flying x={170} y={110} s={0.8} mood="joy" />
          <Birds y={60} dur={20} />
        </g>
      );
    // North over highlands, teff fields and gorges; Lake Tana, and the Abay flowing out.
    case 3:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#E8F6FF" />
          <Depth z={-0.3}>
            <HighlandsAndTana />
          </Depth>
          <DriftCloud y={60} s={0.5} dur={44} phase={0.4} />
          <Flying x={130} y={80} s={0.7} mood="wow" />
        </g>
      );
    // The Simien: cliffs like castles, geladas on the edge, a walia leaping. Cold!
    case 4:
      return (
        <g>
          <SimienEdge id={id} time="morning">
            <WildGelada x={60} y={252} s={1.2} />
            <WildGelada x={92} y={250} s={1} flip />
            <WildGelada x={130} y={248} s={0.9} />
            <WildIbex x={330} y={242} s={1.2} flip leap />
          </SimienEdge>
          <g className="mfs-shiver">
            <Flying x={220} y={110} s={0.66} mood="worried" />
          </g>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Down to the Danakil: white salt, yellow and green pools, hot wobbling air.
    case 5:
      return (
        <g>
          <SaltFlat id={id}>
            <DallolPools x={130} y={250} s={0.9} />
          </SaltFlat>
          <Flying x={260} y={110} s={0.66} mood="wow" />
          <g fill="#FFFFFF" opacity={0.4}>
            {[90, 200, 310].map((x, i) => (
              <path key={x} d={`M${x} 200 q6 -10 0 -20 q-6 -10 0 -20`} stroke="#FFFFFF" strokeWidth={2} fill="none" className="oe-shimmer" style={vars({ "--delay": `${-i * 0.4}s` })} />
            ))}
          </g>
        </g>
      );
    // Too hot! South-west into the Rift Valley, between two walls of hills. "Count its lakes!"
    case 6:
      return (
        <g>
          <RiftView
            id={id}
            lakes={[
              [150, 178, 26, 6, "#58B4E6"],
              [220, 184, 22, 5, "#B98A5A"],
              [270, 178, 14, 4, "#7FC4D8"],
            ]}
          />
          <Flying x={210} y={96} s={0.7} mood="happy" />
          <g transform="translate(234 74)">
            <g className="mfs-drip">
              <path d="M0 0 Q-3 5 0 7 Q3 5 0 0Z" fill="#7FC8F8" />
            </g>
          </g>
          <Air kind="day" seed={9} />
        </g>
      );
    // One, two, three, four… lakes like beads; flamingos rise like a cloud; fishing boats bob.
    case 7:
      return (
        <g>
          <Sky id={id} from="#7FCFFF" mid="#B8E6FF" to="#E8F6FF" />
          <Depth z={-0.4}>
            <path d="M-10 120 L60 100 L120 116 L-10 150Z M410 116 L340 96 L280 112 L410 146Z" fill="#8EA8C8" />
          </Depth>
          <rect x={-10} y={140} width={420} height={170} fill="#D9C08A" />
          {[
            [70, 170, 50, 14, "#58B4E6", 1],
            [190, 210, 46, 13, "#B98A5A", 2],
            [300, 180, 38, 11, "#7FC4D8", 3],
            [250, 262, 60, 16, "#3E8FCC", 4],
          ].map(([x, y, rx, ry, c, n]) => (
            <g key={n as number}>
              <ellipse cx={x as number} cy={y as number} rx={rx as number} ry={ry as number} fill={c as string} />
              <g className="lali-pop-in" style={vars({ "--delay": `${0.5 + (n as number) * 0.6}s` })}>
                <circle cx={x as number} cy={(y as number) - (ry as number) - 12} r={10} fill="#FFFFFF" stroke="#1B2A4E" strokeWidth={2} />
                <text x={x as number} y={(y as number) - (ry as number) - 7.5} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1B2A4E" fontFamily="var(--font-grandstander), sans-serif">
                  {n}
                </text>
              </g>
            </g>
          ))}
          <g className="mfs-flock">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path key={i} d={`M${290 + i * 9} ${150 - (i % 2) * 8} q4 -4 8 0 q4 -4 8 0`} stroke="#F59AB0" strokeWidth={2.6} fill="none" strokeLinecap="round" />
            ))}
          </g>
          {[280, 296, 312].map((x, i) => (
            <Flamingo key={x} x={x} y={186} s={0.5} delay={-i * 0.5} flip={i === 1} />
          ))}
          <g className="oe-bob" style={vars({ "--dur": "2s" })}>
            <path d="M54 172 l30 0 l-4 6 l-22 0Z" fill="#8A5A30" />
          </g>
          <Flying x={120} y={84} s={0.56} mood="joy" />
        </g>
      );
    // The Bale Mountains: giant lobelias on the high plateau, a deep forest below, a red wolf trotting.
    case 8:
      return (
        <g>
          <SkyFor id={id} time="day" />
          <Depth z={-0.4}>
            <path d="M-10 160 L80 120 L200 112 L320 118 L410 150 L410 200 L-10 200Z" fill="#9AA86A" />
          </Depth>
          <path d="M-10 190 Q200 170 410 186 L410 310 L-10 310Z" fill="#A8B470" />
          <path d="M-10 250 Q100 230 200 246 T410 236 L410 310 L-10 310Z" fill="#2E6A3A" />
          {[30, 80, 130, 180, 230, 280, 330, 380].map((x, i) => (
            <ellipse key={x} cx={x} cy={262 + (i % 2) * 8} rx={30} ry={18} fill={i % 2 ? "#3A7A42" : "#2E6A3A"} />
          ))}
          <Lobelia x={60} y={214} s={0.8} />
          <Lobelia x={110} y={206} s={0.6} delay={-1} />
          <Lobelia x={330} y={210} s={0.75} delay={-2} />
          <g className="mfs-trot">
            <Place x={200} y={222} s={0.22} tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <Flying x={250} y={92} s={0.6} mood="joy" />
          <g transform="translate(276 64)">
            <g className="lali-wave" style={vars({ "--dur": "0.5s" })}>
              <circle r={4} fill="#FFD48A" />
            </g>
          </g>
        </g>
      );
    // Home over the coffee forests of the south-west, then the wide dry lowlands with camels and goats.
    case 9:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <Depth z={-0.3}>
            <path d="M-10 180 Q100 150 200 170 L200 310 L-10 310Z" fill="#3A7A42" />
            {[20, 70, 120, 170].map((x, i) => (
              <ellipse key={x} cx={x} cy={170 + (i % 2) * 10} rx={30} ry={20} fill={i % 2 ? "#2E6A3A" : "#4A8A4E"} />
            ))}
          </Depth>
          <CoffeeBush x={60} y={262} s={1} />
          <CoffeeBush x={130} y={270} s={0.9} delay={-1} />
          <path d="M200 170 Q300 160 410 170 L410 310 L200 310Z" fill="#E0B878" />
          <Acacia x={340} y={200} s={0.4} />
          {[0, 1, 2].map((i) => (
            <g key={i} className="mfs-camels" style={vars({ "--delay": `${-i * 0.8}s` })}>
              <Place x={250 + i * 34} y={250 + (i % 2) * 6} s={0.16} tap={TAP.ayan}>
                <Camel who="aabo" walk mood="happy" />
              </Place>
            </g>
          ))}
          <Flying x={210} y={90} s={0.56} mood="happy" />
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
    // Sunset: Amora lands; "High lands and low lands… all of it is Ethiopia." Anbessa slides down.
    case 10:
      return (
        <g>
          <SkyFor id={id} time="evening" />
          <Stars seed={4} n={8} top={10} bottom={60} />
          <Mountains far="#9A6A9E" mid="#7A5A8E" />
          <Depth z={-0.2}>
            <path d="M200 310 L210 170 Q230 150 260 150 L330 150 Q350 160 360 180 L410 310Z" fill="#6A5A6A" />
          </Depth>
          <path d="M-10 250 Q120 236 220 254 L220 310 L-10 310Z" fill="#7A9A62" />
          <g transform="translate(290 128) scale(0.62)">
            <Amora flap={false} />
          </g>
          <Place x={210} y={268} s={0.4} from={[262, 140]} dur={1.6} delay={0.4} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <BeeHover x={150} y={200} s={1} />
          <Air kind="dusk" seed={14} />
        </g>
      );
    // The new map: mountains, the valley of lakes, Tana and its river, the Danakil, Addis in the middle.
    case 11:
      return (
        <g>
          <Classroom id={id}>
            <WallPaper>
              <EthiopiaMap id={`${id}-m`} sea={false} />
              <circle cx={PLACES.addis[0]} cy={PLACES.addis[1]} r={7} fill="#FFFFFF" stroke="#E2463F" strokeWidth={4} className="lali-pulse" />
            </WallPaper>
          </Classroom>
          <Place x={70} y={296} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="up" item={<Pencil x={0} y={0} s={1.4} rot={-20} />} />
          </Place>
          <Place x={330} y={292} s={0.46} flip tap={TAP.grandma}>
            <Teacher mood="joy" />
          </Place>
          <Sparkles x={200} y={100} r={80} delay={0.8} n={7} />
        </g>
      );
    // Friends add where their families come from: a wolf on Bale, a camel in the east, an ibex in the north.
    case 12:
      return (
        <g>
          <Classroom id={id}>
            <WallPaper>
              <EthiopiaMap id={`${id}-m`} sea={false} />
              <Stickers />
            </WallPaper>
          </Classroom>
          {[
            { x: 44, el: <Wolf mood="joy" arm="wave" />, tap: TAP.hawi, s: 0.36 },
            { x: 104, el: <Camel who="ayan" mood="joy" />, tap: TAP.ayan, s: 0.34 },
            { x: 166, el: <Cub mood="joy" arm="up" />, tap: TAP.cub, s: 0.36 },
            { x: 236, el: <Ibex mood="joy" pose="wave" />, tap: TAP.haben, s: 0.36 },
            { x: 296, el: <Gugu mood="joy" pose="wave" />, tap: TAP.gugu, s: 0.34 },
            { x: 356, el: <Teacher mood="joy" />, tap: TAP.grandma, s: 0.38 },
          ].map(({ x, el, tap, s }) => (
            <Place key={x} x={x} y={298} s={s} flip={x > 200} tap={tap}>
              {el}
            </Place>
          ))}
          <BeeHover x={330} y={60} s={1} flip />
        </g>
      );
    default:
      return null;
  }
}
