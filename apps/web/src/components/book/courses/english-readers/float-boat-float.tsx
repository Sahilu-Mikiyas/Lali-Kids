"use client";

import "./float-boat-float.css";

import { useId, type ReactNode } from "react";

import { Air, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Cub, FONT, Grandma, Gugu, TAP, Tsehay } from "./cast";
import { at, HiWord, Stream } from "./more";
import { Home } from "./places";
import { Hearts, SayBubble, Sign, Sparkles, Speech } from "./props";
import { Thing } from "./things";

/*
  "Float, Boat, Float!": one living picture per page (12 pages), by the stream that runs past the
  yard after the big rain. The stone sinks, the leaf boat is eaten, the paper boat gets soggy, and
  Tsehay's reed boat, a little tankwa like the papyrus boats on Lake Tana, floats all the way. The
  oa in each word is blue.
  Keyframes: ./kit.css, ./more.css and ./float-boat-float.css (fbf-*).
*/

const OA = "#2F6FD0";
type M = "happy" | "joy" | "wow" | "worried" | "sad";

const TsehayAt = ({ x = 200, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.tsehay}>
    <Tsehay mood={mood} pose={pose} />
  </Place>
);
const GuguAt = ({ x = 200, y = 294, s = 0.42, mood = "happy" as M, pose = "sit" as "sit" | "wave" | "point" | "hop" | "no", flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.gugu}>
    <Gugu mood={mood} pose={pose} />
  </Place>
);
const Anbessa = ({ x = 200, y = 296, s = 0.4, mood = "happy" as M, flip = false }) => (
  <Place x={x} y={y} s={s} flip={flip} tap={TAP.cub}>
    <Cub mood={mood} />
  </Place>
);

/** A little tankwa: a bundle of reeds tied at the front and back, its prow turned up. */
function Tankwa({ s = 1, passenger }: { s?: number; passenger?: string }) {
  return (
    <g transform={`scale(${s})`}>
      <Tappable reaction="bounce" sound="pop">
        {passenger && (
          <g transform="translate(0 -12) scale(0.3)">
            <Thing id={passenger} />
          </g>
        )}
        <path d="M-40 -14 Q-30 6 0 6 Q30 6 44 -10 Q48 -18 42 -22 Q34 -6 0 -6 Q-30 -6 -36 -20 Q-44 -22 -40 -14Z" fill="#C9A24A" stroke="#2A1A10" strokeWidth={1.8} />
        <path d="M-34 -10 Q0 0 38 -10 M-30 -4 Q0 4 34 -4" stroke="#9C7A2A" strokeWidth={1.4} fill="none" />
        <path d="M-28 -12 V2 M28 -12 V2" stroke="#6A8A3A" strokeWidth={3} />
      </Tappable>
    </g>
  );
}

/** A folded paper boat. */
const PaperBoat = ({ soggy = false }: { soggy?: boolean }) => (
  <g>
    <path d="M-24 -4 H24 L16 8 H-16Z" fill={soggy ? "#D8D2C4" : "#FFFDF6"} stroke="#2A1A10" strokeWidth={1.6} />
    <path d="M-10 -4 L0 -24 L10 -4Z" fill={soggy ? "#CFC8B8" : "#F4EEDC"} stroke="#2A1A10" strokeWidth={1.6} />
  </g>
);

/** A floating thing on the stream at (x, y), bobbing. */
function Afloat({ x, y, children, drift = false, dur = 9 }: { x: number; y: number; children: ReactNode; drift?: boolean; dur?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={drift ? "enr-drift-by" : undefined} style={vars({ "--from": "-90px", "--to": "90px", "--dur": `${dur}s` })}>
        <g className="enr-bob">{children}</g>
      </g>
    </g>
  );
}

export default function FloatBoatFloat({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Let's have a boat race!" b-oa-t, boat.
    case 0:
      return (
        <g>
          <Stream id={id} time="morning">
            <HiWord x={200} y={80} word="boat" hi={at("boat", "oa")} pic="boat" color={OA} delay={0.8} size={22} />
            <TsehayAt x={140} y={222} mood="joy" pose="wave" />
            <GuguAt x={250} y={222} s={0.38} mood="joy" flip />
          </Stream>
          <Air kind="day" seed={2} grass={false} />
        </g>
      );
    // A flat stone, a big leaf, and Tsehay not sure yet.
    case 1:
      return (
        <g>
          <Stream id={id}>
            <GuguAt x={110} y={222} mood="joy" pose="point" />
            <g transform="translate(150 150)">
              <g className="lali-pop-in" style={vars({ "--delay": "0.6s" })}>
                <ellipse rx={18} ry={8} fill="#9C98A6" stroke="#2A1A10" strokeWidth={1.6} />
              </g>
            </g>
            <Anbessa x={210} y={224} mood="joy" />
            <g transform="translate(240 150) rotate(-20)">
              <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
                <Thing id="leaf" s={0.5} />
              </g>
            </g>
            <TsehayAt x={300} y={222} mood="worried" flip />
            <Sign x={300} y={130} kind="?" delay={1.6} />
          </Stream>
          <Air kind="day" seed={3} grass={false} />
        </g>
      );
    // PLOP! The stone goes straight to the bottom. "Float, boat, float!"
    case 2:
      return (
        <g>
          <Stream id={id}>
            <g transform="translate(200 250)">
              <g className="enr-sink" style={vars({ "--sink": "30px" })}>
                <ellipse rx={18} ry={8} fill="#9C98A6" stroke="#2A1A10" strokeWidth={1.6} />
              </g>
              {[0, 1].map((i) => (
                <ellipse key={i} rx={14 + i * 10} ry={4 + i * 3} fill="none" stroke="#FFFFFF" strokeWidth={2} className="fbf-ring" style={vars({ "--delay": `${1.6 + i * 0.3}s` })} />
              ))}
            </g>
            <text x={200} y={204} fontSize={24} fontFamily={FONT} fontWeight={900} fill={OA} textAnchor="middle" className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              PLOP!
            </text>
            <HiWord x={200} y={70} word="float" hi={at("float", "oa")} color={OA} delay={2} size={22} />
            <GuguAt x={110} y={222} mood="sad" />
            <Anbessa x={300} y={224} mood="joy" flip />
          </Stream>
          <Air kind="day" seed={4} grass={false} />
        </g>
      );
    // The leaf boat floats… until a goat gobbles it up. g-oa-t, goat!
    case 3:
      return (
        <g>
          <Stream id={id}>
            <Afloat x={200} y={252}>
              <g className="fbf-eaten">
                <g transform="rotate(-80)">
                  <Thing id="leaf" s={0.5} />
                </g>
              </g>
            </Afloat>
            <g transform="translate(290 222)">
              <g className="fbf-munch">
                <Thing id="goat" s={0.9} />
              </g>
            </g>
            <HiWord x={150} y={80} word="goat" hi={at("goat", "oa")} pic="goat" color={OA} delay={1.6} size={20} />
            <Anbessa x={110} y={224} mood="wow" />
          </Stream>
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // The paper boat gets soggy and sinks, slowly, slowly.
    case 4:
      return (
        <g>
          <Stream id={id}>
            <g transform="translate(220 248)">
              <g className="enr-sink" style={vars({ "--sink": "26px", "--dur": "5s", "--delay": "1.4s" })}>
                <PaperBoat soggy />
              </g>
            </g>
            <GuguAt x={120} y={226} mood="sad" />
            <TsehayAt x={300} y={222} mood="worried" flip />
          </Stream>
          <Air kind="day" seed={6} grass={false} />
        </g>
      );
    // Tsehay remembers Grandma's story: the tankwa on Lake Tana, papyrus reeds tied tight.
    case 5:
      return (
        <g>
          <Stream id={id}>
            <Speech x={200} y={90} w={210} h={110} think delay={0.4}>
              <g>
                <rect x={-96} y={-46} width={192} height={92} rx={14} fill="#8EC8EC" />
                <path d="M-96 -10 Q-40 -30 0 -18 T96 -14 V-46 H-96Z" fill="#9CCB86" />
                <g transform="translate(0 10)">
                  <g className="enr-bob">
                    <Tankwa s={1.4} />
                  </g>
                </g>
              </g>
            </Speech>
            <TsehayAt x={150} y={224} mood="wow" />
            <Sparkles x={200} y={90} r={80} delay={1.4} n={6} />
          </Stream>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // She picks a bundle of reeds and ties them tight, just like a tankwa.
    case 6:
      return (
        <g>
          <Stream id={id}>
            <g transform="translate(200 196)">
              <g className="lali-pop-in" style={vars({ "--delay": "1s" })}>
                <Tankwa s={1.3} />
              </g>
            </g>
            <TsehayAt x={130} y={226} mood="joy" pose="point" />
            <g transform="translate(270 196)">
              <g className="fbf-tie">
                <path d="M0 0 q12 -10 24 0 q-12 10 -24 0Z" fill="none" stroke="#6A8A3A" strokeWidth={3} />
              </g>
            </g>
            <Sparkles x={200} y={190} r={50} delay={1.6} n={6} />
          </Stream>
          <Air kind="day" seed={8} grass={false} />
        </g>
      );
    // It floats! Past a fat toad on a log. "Croak!"
    case 7:
      return (
        <g>
          <Stream id={id}>
            <g transform="translate(290 244)">
              <rect x={-36} y={-6} width={72} height={14} rx={7} fill="#8A5A36" stroke="#2A1A10" strokeWidth={1.4} />
              <g transform="translate(0 -14)">
                <Thing id="toad" s={0.46} />
              </g>
            </g>
            <Afloat x={180} y={256} drift>
              <Tankwa s={1.1} />
            </Afloat>
            <HiWord x={180} y={80} word="toad" hi={at("toad", "oa")} pic="toad" color={OA} delay={1.2} size={20} />
            <SayBubble x={300} y={170} lines={["Croak!"]} size={14} tail="down" delay={1.8} />
            <Anbessa x={100} y={226} mood="joy" />
          </Stream>
          <Air kind="day" seed={9} grass={false} />
        </g>
      );
    // Over a little waterfall, splash! The goat runs beside it. Still floating!
    case 8:
      return (
        <g>
          <Stream id={id} fall>
            <g transform="translate(240 236)">
              <g className="fbf-over">
                <Tankwa s={1} />
              </g>
            </g>
            <g transform="translate(130 222)">
              <g className="fbf-trot">
                <Thing id="goat" s={0.8} />
              </g>
            </g>
            <text x={236} y={176} fontSize={18} fontFamily={FONT} fontWeight={900} fill={OA} className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
              Splash!
            </text>
            <TsehayAt x={330} y={224} s={0.36} mood="joy" pose="wave" flip />
          </Stream>
          <Air kind="day" seed={10} grass={false} />
        </g>
      );
    // Reed boats for everyone. Gugu's passenger: a bar of soap!
    case 9:
      return (
        <g>
          <Stream id={id}>
            <Afloat x={130} y={250} drift dur={10}>
              <Tankwa s={0.9} passenger="soap" />
            </Afloat>
            <Afloat x={250} y={262} drift dur={12}>
              <Tankwa s={0.8} />
            </Afloat>
            <HiWord x={200} y={80} word="soap" hi={at("soap", "oa")} pic="soap" color={OA} delay={1} size={20} />
            <GuguAt x={90} y={226} s={0.36} mood="joy" pose="wave" />
            <Anbessa x={200} y={226} s={0.34} mood="joy" />
            <TsehayAt x={300} y={224} s={0.36} mood="joy" flip />
          </Stream>
          <Air kind="day" seed={11} grass={false} />
        </g>
      );
    // Home, muddy from ears to toes: "Wash, and hang up your coat!"
    case 10:
      return (
        <g>
          <Home id={id} time="evening">
            <g transform="translate(330 120)">
              <path d="M-4 -40 h8" stroke="#7A5236" strokeWidth={5} />
              <g className="lali-sway">
                <Thing id="coat" s={0.6} />
              </g>
            </g>
            <HiWord x={250} y={70} word="coat" hi={at("coat", "oa")} color={OA} delay={1.4} size={20} />
            <Place x={290} y={294} s={0.44} flip tap={TAP.grandma}>
              <Grandma arm="hold" mood="joy" item={<Thing id="soap" s={0.4} />} />
            </Place>
            {[100, 160, 210].map((x, i) => (
              <g key={x}>
                {i === 0 && <TsehayAt x={x} y={296} s={0.36} mood="joy" />}
                {i === 1 && <GuguAt x={x} y={296} s={0.36} mood="joy" />}
                {i === 2 && <Anbessa x={x} y={298} s={0.34} mood="joy" />}
                <g fill="#7A5A3A" opacity={0.8}>
                  <circle cx={x - 10} cy={268} r={5} />
                  <circle cx={x + 8} cy={280} r={4} />
                  <circle cx={x + 2} cy={252} r={3} />
                </g>
              </g>
            ))}
            <Hearts spots={[[250, 170, 1.8], [266, 156, 2.2]]} />
          </Home>
        </g>
      );
    // o and a say oh.
    default:
      return (
        <g>
          <Stream id={id} time="evening">
            {["boat", "goat", "toad", "soap", "coat"].map((w, i) => (
              <HiWord key={w} x={80 + i * 60} y={100} word={w} hi={at(w, "oa")} pic={w} color={OA} delay={0.3 + i * 0.25} size={14} w={56} />
            ))}
            <Afloat x={200} y={256} drift>
              <Tankwa s={1} />
            </Afloat>
            <TsehayAt x={150} y={224} s={0.38} mood="joy" pose="wave" />
            <GuguAt x={260} y={224} s={0.36} mood="joy" flip />
          </Stream>
          <Air kind="dusk" seed={12} grass={false} />
        </g>
      );
  }
}
