"use client";

import "./habens-rainbow-dress.css";

import { useId } from "react";

import { Glow } from "../../glow";
import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, Gugu, Ibex, TAP, Teacher, Wolf } from "./cast";
import { Board, Club, Home } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, Speech, WordCard } from "./props";
import { Thing } from "./things";

/*
  "Haben's Rainbow Dress": one living picture per page (12 pages). Haben (a walia ibex kid) finds
  one thing of each color around the house; each page shows where it was (on the bed, on the
  chair, by the door, in the basket, under the table, by the window) with an English card ("a red
  dress"), and she wears everything she has found, so by page 6 she wears all of it at once.
  Her white holiday dress has a woven tibeb border in every color. Clothes are drawn over the
  ibex in her 200 x 240 box by <Outfit> (her head holds still: .efw-still).
  Keyframes: ./kit.css (efw-*) and ./habens-rainbow-dress.css (hrd-*).
*/

const C = { red: "#E8413B", yellow: "#FFD233", blue: "#2F6FD0", green: "#2FA35A", orange: "#F08A24", purple: "#8E5BE0" };
const TIBEB = [C.red, C.yellow, C.blue, C.green, C.orange, C.purple];

type Wear = { dress?: "red" | "white"; hat?: boolean; shoes?: boolean; scarf?: boolean; socks?: boolean; bag?: boolean };

/** Haben's clothes, drawn over the ibex (200 x 240 box). */
function Outfit({ w }: { w: Wear }) {
  return (
    <g>
      {w.socks && (
        <g fill={C.orange}>
          <rect x={75} y={204} width={16} height={18} rx={4} />
          <rect x={109} y={204} width={16} height={18} rx={4} />
          <path d="M75 210 h16 M109 210 h16" stroke="#fff" strokeWidth={2} />
        </g>
      )}
      {w.dress && (
        <g>
          <path d="M64 168 Q100 158 136 168 L146 214 Q100 224 54 214Z" fill={w.dress === "red" ? C.red : "#FFFDF4"} />
          {w.dress === "red" ? (
            <path d="M58 206 Q100 216 142 206" stroke="#FFD233" strokeWidth={3} strokeDasharray="4 3" fill="none" />
          ) : (
            <g>
              {TIBEB.map((c, i) => (
                <path key={c} d={`M${56 + i * 0.4} ${200 + i * 2.4} Q100 ${210 + i * 2.4} ${144 - i * 0.4} ${200 + i * 2.4}`} stroke={c} strokeWidth={2.6} fill="none" />
              ))}
              <path d="M100 168 V200" stroke={C.green} strokeWidth={3} />
              <path d="M100 168 V200" stroke={C.yellow} strokeWidth={1.2} strokeDasharray="2 2" />
            </g>
          )}
        </g>
      )}
      {w.shoes && (
        <g fill={C.blue}>
          <ellipse cx={83} cy={226} rx={13} ry={6.5} />
          <ellipse cx={117} cy={226} rx={13} ry={6.5} />
        </g>
      )}
      {w.scarf && (
        <g>
          <path d="M58 152 Q100 176 142 152 L138 172 Q100 196 62 172Z" fill={C.green} />
          <path d="M126 168 L140 206 L128 208 L118 172Z" fill={C.green} />
          <path d="M62 170 Q100 192 138 170" stroke="#FFD233" strokeWidth={1.6} strokeDasharray="3 3" fill="none" />
        </g>
      )}
      {w.bag && (
        <g>
          <path d="M136 160 L156 192" stroke={C.purple} strokeWidth={3} />
          <rect x={146} y={188} width={24} height={20} rx={5} fill={C.purple} />
          <rect x={150} y={194} width={16} height={7} rx={2} fill="#B48CF0" />
        </g>
      )}
      {w.hat && (
        <g>
          <ellipse cx={100} cy={66} rx={34} ry={8} fill="#E3B23C" />
          <path d="M78 66 Q78 40 100 40 Q122 40 122 66Z" fill={C.yellow} />
          <path d="M79 58 Q100 63 121 58" stroke={C.red} strokeWidth={4} fill="none" />
        </g>
      )}
    </g>
  );
}

/** Haben, dressed in `w`, holding her head still so the clothes stay put. */
function Haben({ x, y, s = 0.5, w = {}, mood = "happy", flip = false, className, pose = "sit" }: { x: number; y: number; s?: number; w?: Wear; mood?: "happy" | "joy" | "wow" | "worried" | "sad"; flip?: boolean; className?: string; pose?: "sit" | "wave" }) {
  return (
    <Place x={x} y={y} s={s} flip={flip} className={className} tap={TAP.haben}>
      <g className="efw-still">
        <Ibex mood={mood} pose={pose} />
      </g>
      <Outfit w={w} />
    </Place>
  );
}

/** One of the THINGS sitting in the room, tappable. */
function Furniture({ id, x, y, s = 1 }: { id: string; x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Tappable reaction="wiggle" sound="pop">
        <Thing id={id} s={s} />
      </Tappable>
    </g>
  );
}

/** A thing found somewhere, popping out with a sparkle. */
function Found({ id, x, y, s = 0.5, delay = 0.6 }: { id: string; x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="hrd-found" style={vars({ "--delay": `${delay}s` })}>
        <Tappable reaction="bounce" sound="chime">
          <Thing id={id} s={s} />
        </Tappable>
      </g>
      <Sparkles x={0} y={0} r={26} delay={delay + 0.4} n={5} />
    </g>
  );
}

/** A little blob of paint color, for the color cards and Haben's thoughts. */
function Blob({ x, y, color, r = 10, delay = 0.6 }: { x: number; y: number; color: string; r?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="lali-pop-in" style={vars({ "--delay": `${delay}s` })}>
        <path d={`M0 ${-r} Q${r} ${-r} ${r} 0 Q${r} ${r} 0 ${r} Q${-r} ${r} ${-r} 0 Q${-r} ${-r} 0 ${-r}Z`} fill={color} stroke="#fff" strokeWidth={2} />
      </g>
    </g>
  );
}

/** Haben's white holiday dress on a hanger, its tibeb border in every color. */
function HolidayDress({ x, y, s = 1, glow = false }: { x: number; y: number; s?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow && <Glow x={0} y={30} r={60} color="#FFF3C0" strength={0.6} dur={2.4} />}
      <Tappable reaction="wiggle" sound="chime">
        <path d="M0 -40 V-34 M-18 -24 L0 -34 L18 -24" stroke="#7A5236" strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d="M-12 -28 L-26 -20 L-20 -6 L-12 -10 L-30 52 H30 L12 -10 L20 -6 L26 -20 L12 -28 Q0 -20 -12 -28Z" fill="#FFFDF4" stroke="#E3D5C3" strokeWidth={1.4} />
        {TIBEB.map((c, i) => (
          <path key={c} d={`M${-29 + i * 0.3} ${38 + i * 2.4} H${29 - i * 0.3}`} stroke={c} strokeWidth={2.4} />
        ))}
        <path d="M0 -22 V30" stroke={C.green} strokeWidth={3} />
        <path d="M0 -22 V30" stroke={C.yellow} strokeWidth={1.2} strokeDasharray="2 2" />
      </Tappable>
    </g>
  );
}

const HOME_WALL: [string, string] = ["#F2E2C4", "#E2C8A0"];

export default function HabensRainbowDress({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Tomorrow is Color Day! Wear your favorite color." But Haben loves them all.
    case 0:
      return (
        <g>
          <Club id={id} time="day">
            <Board x={300} y={96} lines={["Color Day!", "Wear your", "favorite color."]} size={12} h={80} />
            <Place x={352} y={292} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <Haben x={230} y={292} s={0.44} mood="wow" />
            <Place x={140} y={290} s={0.34} tap={TAP.cub}>
              <Cub mood="joy" />
            </Place>
            <g className="hrd-orbit">
              {TIBEB.map((c, i) => (
                <Blob key={c} x={180 + i * 20} y={150 + (i % 2) * 12} color={c} r={8} delay={1.2 + i * 0.2} />
              ))}
            </g>
            <Sign x={262} y={190} kind="?" delay={2.6} />
          </Club>
          <Air kind="day" seed={2} />
        </g>
      );
    // "RED! A red dress, on the bed."
    case 1:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false}>
            <Furniture id="bed" x={110} y={244} s={1.5} />
            <Found id="dress" x={110} y={210} s={0.6} delay={0.6} />
            <Haben x={268} y={294} s={0.5} w={{ dress: "red" }} mood="joy" className="efw-twirl" />
            <WordCard x={300} y={110} word="a red dress" color={C.red} size={15} delay={1.6} />
          </Home>
        </g>
      );
    // "YELLOW! A yellow hat, on the chair."
    case 2:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false}>
            <Furniture id="chair" x={110} y={236} s={1.3} />
            <Found id="hat" x={104} y={200} s={0.6} delay={0.6} />
            <Haben x={268} y={294} s={0.5} w={{ dress: "red", hat: true }} mood="joy" />
            <WordCard x={290} y={100} word="a yellow hat" color="#C99A00" size={15} delay={1.6} />
          </Home>
        </g>
      );
    // "BLUE! Blue shoes, by the door."
    case 3:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false} door="closed">
            <g transform="translate(140 262)">
              <g className="hrd-found" style={vars({ "--delay": "0.6s" })}>
                <Tappable reaction="bounce" sound="chime">
                  <ellipse cx={-12} cy={0} rx={14} ry={7} fill={C.blue} />
                  <ellipse cx={14} cy={2} rx={14} ry={7} fill={C.blue} />
                </Tappable>
              </g>
              <Sparkles x={0} y={0} r={26} delay={1} n={5} />
            </g>
            <Haben x={276} y={294} s={0.5} w={{ dress: "red", hat: true, shoes: true }} mood="joy" className="hrd-stomp" />
            <WordCard x={290} y={100} word="blue shoes" color={C.blue} size={15} delay={1.6} />
          </Home>
        </g>
      );
    // "GREEN! A green scarf, in the basket."
    case 4:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL}>
            <Furniture id="basket" x={110} y={248} s={1.1} />
            <g transform="translate(110 222)">
              <g className="hrd-found" style={vars({ "--delay": "0.6s" })}>
                <path d="M-26 0 Q-10 -18 6 -4 Q20 8 30 -10 L34 2 Q20 22 4 8 Q-10 -6 -22 10Z" fill={C.green} />
              </g>
              <Sparkles x={0} y={-4} r={28} delay={1} n={5} />
            </g>
            <Haben x={276} y={294} s={0.5} w={{ dress: "red", hat: true, shoes: true, scarf: true }} mood="joy" />
            <WordCard x={300} y={92} word="a green scarf" color={C.green} size={15} delay={1.6} />
          </Home>
        </g>
      );
    // "ORANGE! Orange socks, under the table. PURPLE! A purple bag, by the window."
    case 5:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false} win={[312, 96]}>
            <Furniture id="table" x={110} y={246} s={1.2} />
            <Found id="socks" x={110} y={268} s={0.4} delay={0.6} />
            <Found id="bag" x={312} y={150} s={0.4} delay={1.6} />
            <Haben x={210} y={294} s={0.46} w={{ dress: "red", hat: true, shoes: true, scarf: true, socks: true, bag: true }} mood="joy" />
            <WordCard x={92} y={150} word="orange socks" color={C.orange} size={13} delay={1.2} />
            <WordCard x={330} y={210} word="a purple bag" color={C.purple} size={13} delay={2.2} />
          </Home>
        </g>
      );
    // The mirror: "Too much! You look like a whole market!"
    case 6:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false}>
            <g transform="translate(150 196)">
              <rect x={-48} y={-90} width={96} height={130} rx={46} fill="#9A6236" />
              <rect x={-42} y={-84} width={84} height={118} rx={40} fill="#CFEAF6" />
              <path d="M-26 -60 L-10 -76 M-20 -40 L4 -64" stroke="#fff" strokeWidth={4} opacity={0.6} strokeLinecap="round" />
            </g>
            <g opacity={0.75}>
              <Haben x={150} y={226} s={0.36} w={{ dress: "red", hat: true, shoes: true, scarf: true, socks: true, bag: true }} mood="wow" flip />
            </g>
            <Haben x={240} y={296} s={0.48} w={{ dress: "red", hat: true, shoes: true, scarf: true, socks: true, bag: true }} mood="wow" />
            <Place x={336} y={294} s={0.52} flip tap={TAP.mama}>
              <Ibex grown mood="joy" />
            </Place>
            <SayBubble x={320} y={120} lines={["Too much!"]} size={16} tail="down" delay={1} color={C.red} />
          </Home>
        </g>
      );
    // "Choose just ONE color." She can't: "But I love them all."
    case 7:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false}>
            <Place x={320} y={294} s={0.52} flip tap={TAP.mama}>
              <Ibex grown mood="happy" />
            </Place>
            <Haben x={170} y={296} s={0.5} w={{ dress: "red" }} mood="sad" />
            <Speech x={110} y={120} w={130} h={56} think tail="right" delay={0.6}>
              <g className="hrd-choose">
                {TIBEB.map((c, i) => (
                  <circle key={c} cx={-50 + i * 20} cy={0} r={8} fill={c} />
                ))}
              </g>
            </Speech>
            <SayBubble x={290} y={130} lines={["Choose just", "ONE color."]} size={12} tail="down" delay={1.6} />
          </Home>
        </g>
      );
    // Her white holiday dress, with the tibeb in every color.
    case 8:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false} win={[312, 92]}>
            <HolidayDress x={312} y={186} s={1.3} glow />
            <Haben x={160} y={296} s={0.5} w={{ dress: "red" }} mood="wow" />
            <Sparkles x={312} y={210} r={60} delay={0.8} n={8} />
            <Sign x={196} y={170} kind="!" delay={1.6} color={C.orange} />
          </Home>
        </g>
      );
    // "A WHITE dress with ALL my colors!" She twirls.
    case 9:
      return (
        <g>
          <Home id={id} time="day" wall={HOME_WALL} shelf={false}>
            <Glow x={200} y={230} r={120} color="#FFF3C0" strength={0.5} dur={3} />
            <g className="hrd-swirl">
              {TIBEB.map((c, i) => {
                const a = (i / 6) * Math.PI * 2;
                return <Blob key={c} x={Math.round(200 + Math.cos(a) * 90)} y={Math.round(200 + Math.sin(a) * 50)} color={c} r={9} delay={0.4 + i * 0.15} />;
              })}
            </g>
            <Haben x={200} y={296} s={0.56} w={{ dress: "white" }} mood="joy" className="efw-twirl" />
            <WordCard x={330} y={90} word="white" color="#9A8A70" size={16} delay={1.4} />
          </Home>
        </g>
      );
    // Color Day: yellow, red, green. "What is your favorite color, Haben?"
    case 10:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={120} y={290} s={0.36} tap={TAP.cub}>
              <Cub mood="joy" />
              <g transform="translate(100 28)">
                <ellipse cx={0} cy={0} rx={40} ry={9} fill="#E3B23C" />
                <path d="M-24 0 Q-24 -28 0 -28 Q24 -28 24 0Z" fill={C.yellow} />
              </g>
            </Place>
            <Place x={170} y={290} s={0.34} tap={TAP.hawi}>
              <Wolf mood="joy" dress={C.red} />
            </Place>
            <Place x={222} y={292} s={0.36} tap={TAP.gugu}>
              <Gugu mood="joy" />
              <path d="M54 232 C48 200 58 176 72 170 Q100 186 128 170 C142 176 152 200 146 232Z" fill={C.green} />
              <path d="M60 50 Q100 4 140 50 Q100 36 60 50Z" fill={C.green} />
            </Place>
            <Haben x={290} y={292} s={0.42} w={{ dress: "white" }} mood="happy" />
            <Place x={356} y={292} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" />
            </Place>
            <SayBubble x={300} y={130} lines={["What is your", "favorite color?"]} size={12} tail="down" delay={0.8} />
            <WordCard x={120} y={190} word="yellow" color="#C99A00" size={11} delay={1.6} />
            <WordCard x={170} y={150} word="red" color={C.red} size={11} delay={1.9} />
            <WordCard x={222} y={190} word="green" color={C.green} size={11} delay={2.2} />
          </Club>
          <Air kind="day" seed={10} />
        </g>
      );
    // "All of them!" Everyone claps.
    default:
      return (
        <g>
          <Club id={id} time="day">
            <Place x={110} y={290} s={0.34} className="lali-hop" tap={TAP.cub}>
              <Cub mood="joy" arm="up" />
            </Place>
            <Place x={160} y={290} s={0.32} tap={TAP.hawi}>
              <Wolf mood="joy" dress={C.red} wag />
            </Place>
            <Haben x={240} y={294} s={0.54} w={{ dress: "white" }} mood="joy" className="efw-twirl" />
            <Place x={346} y={292} s={0.42} flip tap={TAP.mama}>
              <Teacher mood="joy" pose="wave" />
            </Place>
            <SayBubble x={240} y={110} lines={["All of them!"]} size={18} tail="down" delay={0.6} color={C.purple} />
            <g className="hrd-swirl">
              {TIBEB.map((c, i) => (
                <Blob key={c} x={150 + i * 36} y={58} color={c} r={9} delay={1.2 + i * 0.15} />
              ))}
            </g>
            <Hearts spots={[[200, 190, 1.4], [282, 186, 2]]} />
            <BeeHover x={330} y={170} s={0.9} flip />
          </Club>
          <Air kind="day" seed={11} />
        </g>
      );
  }
}
