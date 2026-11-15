"use client";

import "./the-go-cart.css";

import { useId } from "react";

import { Air, Place, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP, Teacher, Tsehay } from "./kit-cast";
import { Pop } from "./kit-life";
import { Yard } from "./kit-places";
import { Sign, Sparkles } from "./kit-props";
import { GoCart } from "./kit-forces";

/*
  "The Go-Cart": one living picture per page (12 pages). The cart that won't move by itself; a push
  from behind; a pull with the rope; Tsehay aboard: a bigger push; far on the smooth road, near on the
  grass; friction: rubbing slows things; rubbing hands get warm; rolling faster down the slope; feet
  down to stop; the stick brake; friction helps us walk; rides for everyone. Keyframes: kit.css,
  kit-science.css and ./the-go-cart.css.
*/

/** A big arrow for a push or a pull. */
function Arrow({ x, y, dir = 1, color = "#E2783A" }: { x: number; y: number; dir?: 1 | -1; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      <path d="M-24 0 H18 M8 -10 L20 0 L8 10" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export default function TheGoCart({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Ready, steady… go!" Nothing happens: the cart just sits there.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <GoCart x={210} y={278} s={1.4} />
          <Place x={100} y={294} s={0.46} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={320} y={294} s={0.44} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Sign x={210} y={180} kind="?" delay={1.4} />
        </g>
      );
    // A push from behind: off it rolls! Push it, pull it, watch it go!
    case 1:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="snk-slide" style={vars({ "--from": "-100px", "--dur": "2.4s" })}>
            <GoCart x={260} y={278} s={1.4} roll />
            <Place x={160} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="joy" arm="reach" />
            </Place>
            <Arrow x={235} y={200} />
          </g>
        </g>
      );
    // Gugu pulls the rope: the cart rolls towards him.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="snk-slide" style={vars({ "--from": "-90px", "--dur": "2.4s" })}>
            <GoCart x={170} y={278} s={1.4} roll />
          </g>
          <Place x={320} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Arrow x={250} y={210} />
        </g>
      );
    // Tsehay climbs in; the cart hardly moves. Heavier things need a bigger push!
    case 3:
      return (
        <g>
          <Yard id={id} time="day" />
          <GoCart x={230} y={278} s={1.4}>
            <Place x={0} y={-20} s={0.3} tap={TAP.tsehay}>
              <Tsehay mood="joy" pose="wave" />
            </Place>
          </GoCart>
          <g className="sn-heavy">
            <Place x={120} y={294} s={0.46} tap={TAP.cub}>
              <Cub mood="worried" arm="reach" />
            </Place>
          </g>
          <Arrow x={170} y={226} />
          <Arrow x={170} y={246} />
        </g>
      );
    // On the smooth road it rolls far; on the grass it stops quickly.
    case 4:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <rect y={130} width={400} height={20} fill="#8FCB80" />
          <rect y={150} width={400} height={50} fill="#B0B4BA" />
          <path d="M0 175 H400" stroke="#F4F4EE" strokeWidth={3} strokeDasharray="18 14" />
          <rect y={200} width={400} height={100} fill="#6CB45A" />
          {Array.from({ length: 30 }, (_, i) => (
            <path key={i} d={`M${(i * 13) % 400} ${210 + ((i * 7) % 80)} l-3 -8 M${(i * 13) % 400} ${210 + ((i * 7) % 80)} l3 -8`} stroke="#4E9A3A" strokeWidth={2} />
          ))}
          <g className="snk-slide" style={vars({ "--from": "-260px", "--dur": "3s" })}>
            <GoCart x={330} y={180} s={1} roll rope={false} />
          </g>
          <g className="snk-slide" style={vars({ "--from": "-80px", "--dur": "1.2s" })}>
            <GoCart x={150} y={280} s={1} rope={false} />
          </g>
          <Sign x={210} y={240} kind="?" delay={2} />
        </g>
      );
    // Friction: the wheels rub against the ground, and rough grass rubs more than a smooth road.
    case 5:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <g transform="translate(200 170)">
            <circle r={60} fill="#5A3A2A" />
            <path d="M-56 0 H56 M0 -56 V56" stroke="#C08A4A" strokeWidth={6} />
          </g>
          <path d="M-10 232 L410 232 L410 300 L-10 300Z" fill="#6CB45A" />
          {[150, 170, 190, 210, 230, 250].map((x) => (
            <path key={x} d={`M${x} 232 l-4 -12 M${x} 232 l4 -10`} stroke="#4E9A3A" strokeWidth={3} />
          ))}
          <Arrow x={110} y={250} dir={-1} color="#E2463F" />
          <Place x={350} y={298} s={0.36} flip tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // Rub your hands together, fast: they get warm. Friction makes heat too.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" />
          <g className="sgc-rub">
            <Place x={200} y={294} s={0.56} tap={TAP.gugu}>
              <Gugu mood="wow" />
            </Place>
          </g>
          <g transform="translate(200 200)">
            {[-14, 0, 14].map((dx, i) => (
              <path key={dx} d={`M${dx} 0 q4 -6 0 -12 q-4 -6 0 -12`} stroke="#F0602A" strokeWidth={2.4} fill="none" className="sn-steam" style={vars({ "--delay": `${-i * 0.5}s` })} />
            ))}
          </g>
        </g>
      );
    // Down the slope, faster and faster, with Gugu inside. "How do I stop?"
    case 7:
      return (
        <g>
          <rect width={400} height={300} fill="#BFE4FA" />
          <path d="M-10 100 L410 260 L410 300 L-10 300Z" fill="#8FCB80" />
          <g className="sgc-down">
            <g transform="rotate(21)">
              <GoCart x={0} y={0} s={1.1} roll rope={false}>
                <Place x={0} y={-20} s={0.28} tap={TAP.gugu}>
                  <Gugu mood="wow" pose="hop" />
                </Place>
              </GoCart>
            </g>
          </g>
          <Air kind="day" seed={3} />
          <Place x={360} y={298} s={0.36} flip tap={TAP.cub}>
            <Cub mood="worried" arm="up" />
          </Place>
        </g>
      );
    // "Put your feet down!" Gugu drags his feet; the cart slows and stops.
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <GoCart x={220} y={278} s={1.4} rope={false}>
            <Place x={0} y={-20} s={0.3} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
          </GoCart>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={160 - i * 14} cy={284} r={6 + i * 2} fill="#D8B888" opacity={0.7} className="sgc-dust" style={vars({ "--delay": `${i * 0.2}s` })} />
          ))}
          <Place x={100} y={294} s={0.44} tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
        </g>
      );
    // A brake: a stick that rubs on a wheel. "Brakes use friction!"
    case 9:
      return (
        <g>
          <rect width={400} height={300} fill="#F4EBD8" />
          <rect x={60} y={70} width={280} height={60} rx={6} fill="#C08A4A" stroke="#8A5A2A" strokeWidth={4} />
          <circle cx={300} cy={100} r={7} fill="#5A3A2A" />
          <g transform="translate(180 180)">
            <circle r={60} fill="#5A3A2A" />
            <path d="M-56 0 H56 M0 -56 V56" stroke="#C08A4A" strokeWidth={6} />
          </g>
          <g className="sgc-brake">
            <path d="M300 100 L232 146" stroke="#7A4A26" strokeWidth={12} strokeLinecap="round" />
          </g>
          <Pop x={240} y={140} delay={1.2}>
            <Sparkles x={0} y={0} r={20} delay={0} n={4} />
          </Pop>
          <Place x={80} y={298} s={0.36} tap={TAP.cub}>
            <Cub mood="joy" />
          </Place>
        </g>
      );
    // Friction helps us walk: without it our feet would slip, like on ice or wet mud.
    case 10:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <path d="M200 250 Q260 240 340 254 Q300 270 200 266Z" fill="#8A6A44" />
          <path d="M226 254 Q250 250 270 253 M290 258 Q306 257 318 259" stroke="#D8C8B0" strokeWidth={2.4} strokeLinecap="round" opacity={0.8} />
          <g className="sgc-slip">
            <Place x={270} y={260} s={0.36} tap={TAP.gugu}>
              <Gugu mood="wow" pose="hop" />
            </Place>
          </g>
          <Place x={100} y={294} s={0.46} tap={TAP.mama}>
            <Teacher pose="point" />
          </Place>
        </g>
      );
    // Rides all afternoon: pushes and pulls to start, the brake to stop. Even Grandma!
    case 11:
      return (
        <g>
          <Yard id={id} time="evening" />
          <g className="sgc-ride">
            <GoCart x={200} y={280} s={1.4} roll>
              <Place x={0} y={-20} s={0.3} tap={TAP.grandma}>
                <Grandma arm="clap" />
              </Place>
            </GoCart>
          </g>
          <Place x={90} y={294} s={0.42} tap={TAP.cub}>
            <Cub mood="joy" arm="reach" />
          </Place>
          <Place x={330} y={294} s={0.42} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Air kind="dusk" seed={4} />
        </g>
      );
    default:
      return null;
  }
}

