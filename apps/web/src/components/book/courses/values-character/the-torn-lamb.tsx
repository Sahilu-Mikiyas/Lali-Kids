"use client";

import "./the-torn-lamb.css";

import { useId } from "react";

import { Air, BeeHover, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Grandma, Gugu, TAP, Tsehay } from "./kit-cast";
import { HouseFront, Home, Village, Yard } from "./kit-places";
import { Hearts, Sign, Sparkles, Speech } from "./kit-props";

/*
  "The Torn Lamb": one living picture per page (11 pages). Tsehay's cloth lamb (white wool, a
  pink face, red stitching) is the thread: carried everywhere, torn in the tug, mended by Gugu
  with big crooked stitches, and hugged again. Keyframes: kit.css and ./the-torn-lamb.css.
*/

/** The cloth lamb, about 30 wide, centred on (0, 0). `torn` takes off a leg; `mended` sews it back with big stitches. */
function Lamb({ s = 1, torn = false, mended = false }: { s?: number; torn?: boolean; mended?: boolean }) {
  return (
    <g transform={`scale(${s})`}>
      <Tappable reaction="wiggle" sound="baa">
        {!torn && <rect x={-8} y={4} width={4} height={8} rx={2} fill="#F2C9C0" />}
        <rect x={2} y={4} width={4} height={8} rx={2} fill="#F2C9C0" />
        <g fill="#FFFFFF" stroke="#E0D8CC" strokeWidth={1}>
          <circle cx={-6} cy={2} r={8} />
          <circle cx={4} cy={0} r={9} />
          <circle cx={-2} cy={-6} r={7} />
          <circle cx={8} cy={6} r={6} />
        </g>
        <ellipse cx={14} cy={-4} rx={6} ry={6.5} fill="#F2C9C0" />
        <ellipse cx={10} cy={-9} rx={4} ry={2} fill="#F2C9C0" transform="rotate(-30 10 -9)" />
        <circle cx={15.5} cy={-5} r={1.2} fill="#2A1A10" />
        <path d="M13 -1 q2 1.4 4 0" stroke="#B8665A" strokeWidth={1} fill="none" />
        <path d="M-4 -2 l3 3 M2 4 l3 -3" stroke="#E2463F" strokeWidth={1.2} strokeDasharray="1.5 1.5" />
        {torn && (
          <g fill="#FFFFFF" stroke="#E8E8F0" strokeWidth={0.6}>
            <circle cx={-8} cy={9} r={3} />
            <circle cx={-5} cy={11} r={2.4} />
          </g>
        )}
        {mended && <path d="M-10 4 l2 3 M-7 4 l2 3 M-4 4 l2 3" stroke="#2F6FD0" strokeWidth={1.6} strokeLinecap="round" />}
      </Tappable>
    </g>
  );
}

/** The loose leg of the lamb, lying on the ground. */
function LooseLeg() {
  return (
    <g>
      <rect x={-2} y={-5} width={4} height={10} rx={2} fill="#F2C9C0" transform="rotate(70)" />
      <circle cx={4} cy={0} r={3} fill="#FFFFFF" />
    </g>
  );
}

export default function TheTornLamb({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // The lamb goes everywhere with Tsehay. Grandma sewed it when she was a baby.
    case 0:
      return (
        <g>
          <Village id={id} time="day" />
          <Place x={200} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(200 270)">
            <Lamb s={1.8} />
          </g>
          <Hearts spots={[[220, 190, 0.6], [196, 176, 1.6]]} />
          <BeeHover x={300} y={180} s={1} flip />
          <Air kind="day" seed={3} />
        </g>
      );
    // "Let's play tug-of-war with your lamb!" "No, Gugu, it's special!" Pull… pull…
    case 1:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <g className="the-torn-lamb-tug">
            <Place x={120} y={294} s={0.46} tap={TAP.tsehay}>
              <Tsehay mood="worried" pose="point" />
            </Place>
            <Place x={290} y={294} s={0.46} flip tap={TAP.gugu}>
              <Gugu mood="joy" pose="point" />
            </Place>
            <g transform="translate(205 236)">
              <Lamb s={1.6} />
            </g>
          </g>
          <Air kind="day" seed={5} />
        </g>
      );
    // RIIIP! The leg tears off, and white stuffing puffs out. Everything goes quiet.
    case 2:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={110} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={300} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <g transform="translate(180 256)">
            <Lamb s={1.6} torn />
          </g>
          <g transform="translate(250 278)">
            <g className="vc-drop" style={vars({ "--fy": "-40px", "--delay": "0.6s" })}>
              <LooseLeg />
            </g>
          </g>
          <g fill="#FFFFFF">
            {[0, 0.4, 0.8].map((d, i) => (
              <circle key={d} cx={170 + i * 8} cy={268} r={4} className="vc-puff" style={vars({ "--delay": `${-d}s`, "--px": `${(i - 1) * 10}px` })} />
            ))}
          </g>
          <Sign x={200} y={170} kind="!" delay={0.5} color="#E2463F" />
          <Air kind="day" seed={7} />
        </g>
      );
    // "You broke him!" "Sorry. Now can we play?" Tsehay turns her back.
    case 3:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={130} y={294} s={0.48} flip tap={TAP.tsehay}>
            <Tsehay mood="sad" tear />
          </Place>
          <g transform="translate(110 262)">
            <Lamb s={1.4} torn />
          </g>
          <Place x={290} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="worried" pose="wave" />
          </Place>
          <Speech x={250} y={150} w={40} h={34} tail="right" delay={0.8}>
            <path d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#FF8FB1" transform="scale(0.7)" />
          </Speech>
          <Air kind="day" seed={9} />
        </g>
      );
    // Gugu asks Grandma why she's still cross. "Was it a little sorry, or a big sorry?"
    case 4:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={130} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="sad" />
          </Place>
          <Place x={280} y={292} s={0.52} flip tap={TAP.grandma}>
            <Grandma mood="happy" arm="hold" />
          </Place>
          <g transform="translate(220 142)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
              <circle r={14} fill="#FFFFFF" stroke="#7FA6D8" strokeWidth={2} />
              <path d="M0 6 C-6 2 -5 -4 -1 -4 C0 -4 0 -3 0 -2 C0 -3 0 -4 1 -4 C5 -4 6 2 0 6Z" fill="#FF8FB1" />
            </g>
            <g transform="translate(38 -6)">
              <g className="lali-pop-in" style={vars({ "--delay": "1.4s" })}>
                <circle r={20} fill="#FFFFFF" stroke="#7FA6D8" strokeWidth={2} />
                <path d="M0 12 C-14 2 -12 -10 -2 -10 C0 -10 0 -8 0 -6 C0 -8 0 -10 2 -10 C12 -10 14 2 0 12Z" fill="#E2463F" />
              </g>
            </g>
          </g>
          <Air kind="dusk" seed={11} grass={false} />
        </g>
      );
    // "A big sorry means you understand how she feels, and try to put it right." "Teach me to sew?"
    case 5:
      return (
        <g>
          <Home id={id} time="evening" />
          <Place x={150} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
          </Place>
          <Place x={280} y={292} s={0.52} flip tap={TAP.grandma}>
            <Grandma mood="joy" arm="hold" item={<g><path d="M-8 -6 L8 6" stroke="#9AA4B0" strokeWidth={2} /><circle cx={6} cy={-4} r={4} fill="#2F6FD0" /></g>} />
          </Place>
          <Sparkles x={210} y={180} r={30} delay={1} n={5} />
          <Air kind="dusk" seed={13} grass={false} />
        </g>
      );
    // At Tsehay's door: "I'm really sorry. Can I try to mend him?" A long look, then a nod.
    case 6:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <HouseFront x={280} y={254} door="open">
            <Place x={0} y={0} s={0.34} tap={TAP.tsehay}>
              <Tsehay mood="happy" />
            </Place>
          </HouseFront>
          <Place x={120} y={294} s={0.48} tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" />
          </Place>
          <Speech x={170} y={150} w={44} h={36} tail="left" delay={0.6}>
            <path d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#E2463F" />
          </Speech>
          <Air kind="day" seed={15} />
        </g>
      );
    // In and out, in and out. Gugu pokes his finger twice, but doesn't give up.
    case 7:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={130} y={294} s={0.44} tap={TAP.tsehay}>
            <Tsehay mood="happy" />
          </Place>
          <g transform="translate(200 256)">
            <Lamb s={2} torn />
            <g className="the-torn-lamb-sew">
              <path d="M-16 10 L-26 -6" stroke="#9AA4B0" strokeWidth={2} />
              <path d="M-26 -6 Q-40 -20 -30 -30" stroke="#2F6FD0" strokeWidth={1.4} fill="none" />
            </g>
          </g>
          <Place x={280} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" />
          </Place>
          <Place x={350} y={290} s={0.44} flip tap={TAP.grandma}>
            <Grandma mood="happy" />
          </Place>
          <Air kind="day" seed={17} grass={false} />
        </g>
      );
    // The leg is back on: big crooked stitches, but strong. "He looks a bit funny now."
    case 8:
      return (
        <g>
          <Home id={id} time="day" />
          <g transform="translate(200 236)">
            <g className="lali-pop-in" style={vars({ "--delay": "0.4s" })}>
              <Lamb s={2.4} mended />
            </g>
          </g>
          <Sparkles x={200} y={220} r={40} delay={0.8} n={6} />
          <Place x={110} y={294} s={0.46} tap={TAP.tsehay}>
            <Tsehay mood="wow" />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="wave" />
          </Place>
          <Air kind="day" seed={19} grass={false} />
        </g>
      );
    // A hug for the lamb, then for Gugu. "He looks brave now. I forgive you, Gugu."
    case 9:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Place x={170} y={294} s={0.5} tap={TAP.tsehay}>
            <Tsehay mood="joy" />
          </Place>
          <g transform="translate(170 266)">
            <Lamb s={1.6} mended />
          </g>
          <Place x={250} y={294} s={0.48} flip tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Hearts spots={[[210, 180, 0.4], [230, 166, 1.2], [196, 160, 2]]} />
          <Air kind="day" seed={21} />
        </g>
      );
    // "Next time I'll ask first." "Next time, tug-of-war with a rope!" Say sorry, forgive, play again.
    case 10:
      return (
        <g>
          <Yard id={id} time="evening" house={false} />
          <path d="M120 250 Q200 258 290 250" stroke="#C9A24A" strokeWidth={4} fill="none" />
          <Place x={110} y={294} s={0.46} className="the-torn-lamb-pull" tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="point" />
          </Place>
          <Place x={300} y={294} s={0.46} flip className="the-torn-lamb-pull" tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <g transform="translate(200 290)">
            <Lamb s={1.2} mended />
          </g>
          <BeeHover x={200} y={180} s={1} />
          <Air kind="dusk" seed={23} />
        </g>
      );
    default:
      return null;
  }
}
