"use client";

import "./gugus-soapy-song.css";

import { useId } from "react";

import { Air, Place, Sheep, vars } from "../../scenery";
import { Cub, Grandma, Gugu, TAP } from "./kit-cast";
import { BigHand, Bubbles, Drops, Glint, Latrine, Scrubber, SoapBar, Tissue, Towel } from "./kit-health";
import { Home, Yard } from "./kit-places";
import { Gursha, Hearts, Mesob, Notes, Sign, Sparkles, Speech, WashSet } from "./kit-props";

/*
  "Gugu's Soapy Song": one living picture per page (12 pages). Red clay on Gugu's paws stands in
  for germs; the close-ups show a big hand with the place to scrub glowing for each of the six
  steps, a second hand rubbing round, and bubbles rising. Keyframes: kit.css, kit-health.css and
  ./gugus-soapy-song.css.
*/

const CLAY = "#B8452A";

/** Little clay animals on a board: a cow, a goat and a wobbly lion. */
function ClayAnimals({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-44} y={-4} width={88} height={8} rx={3} fill="#9A6A3E" />
      <g fill={CLAY}>
        <g transform="translate(-26 -4)">
          <ellipse cx={0} cy={-8} rx={10} ry={6} />
          <circle cx={10} cy={-12} r={4} />
          <path d="M-7 -4 v4 M7 -4 v4" stroke={CLAY} strokeWidth={3} />
          <path d="M8 -16 l-2 -4 M12 -16 l2 -4" stroke={CLAY} strokeWidth={2} />
        </g>
        <g transform="translate(2 -4)">
          <ellipse cx={0} cy={-7} rx={8} ry={5} />
          <circle cx={8} cy={-11} r={3.4} />
          <path d="M-5 -3 v3 M5 -3 v3" stroke={CLAY} strokeWidth={2.6} />
        </g>
        <g transform="translate(28 -4)">
          <g className="gugus-soapy-song-wobble">
            <circle cx={0} cy={-10} r={9} fill="#A83A22" />
            <circle cx={0} cy={-10} r={6} />
            <ellipse cx={0} cy={-2} rx={7} ry={3} />
          </g>
        </g>
      </g>
    </g>
  );
}

/** Red clay on Gugu's two hands and feet (in his 200 x 240 box). */
function ClayPaws() {
  return (
    <g fill={CLAY} opacity={0.9}>
      <ellipse cx={70} cy={210} rx={9} ry={6} />
      <ellipse cx={130} cy={210} rx={9} ry={6} />
      <ellipse cx={62} cy={230} rx={10} ry={4} />
    </g>
  );
}

/** The close-up backdrop: a soft wall and a basin edge. */
function CloseUp({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-cu`} cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor="#E4F6FF" />
          <stop offset="1" stopColor="#B8E0F4" />
        </radialGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${id}-cu)`} />
      <path d="M-10 270 Q200 250 410 270 L410 310 L-10 310Z" fill="#C9C2B4" />
      <path d="M-10 270 Q200 250 410 270" stroke="#A8A090" strokeWidth={3} fill="none" />
    </g>
  );
}

/** Two big hands for a pair of steps: the place to scrub glows, the other hand rubs round, bubbles rise. */
function TwoSteps({ id, left, right, clay }: { id: string; left: { view: "palm" | "back"; zone: "palm" | "back" | "between" | "knuckles" | "thumb" | "tips"; at: [number, number] }; right: { view: "palm" | "back"; zone: "palm" | "back" | "between" | "knuckles" | "thumb" | "tips"; at: [number, number] }; clay: boolean }) {
  return (
    <g>
      <CloseUp id={id} />
      <BigHand x={130} y={280} s={1.45} view={left.view} zone={left.zone} clay={clay} />
      <Scrubber x={left.at[0]} y={left.at[1]} s={0.9} />
      <BigHand x={270} y={280} s={1.45} view={right.view} zone={right.zone} clay={clay} flip />
      <g style={vars({ "--delay": "-0.3s" })}>
        <Scrubber x={right.at[0]} y={right.at[1]} s={0.9} />
      </g>
      <Bubbles x={130} y={150} n={6} spread={60} seed={4} />
      <Bubbles x={270} y={150} n={6} spread={60} seed={9} delay={0.5} />
    </g>
  );
}

export default function GugusSoapySong({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Making little clay animals in Grandma's yard; red paws.
    case 0:
      return (
        <g>
          <Yard id={id} time="day" />
          <ClayAnimals x={200} y={282} />
          <Place x={120} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" />
            <ClayPaws />
          </Place>
          <Place x={290} y={294} s={0.46} flip tap={TAP.cub}>
            <Cub mood="joy" arm="hold" item={<circle r={7} fill={CLAY} />} />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "Lunch is ready! Wash your hands." Splash! Shake, shake. "Done!"
    case 1:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={310} y={292} s={0.5} flip tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <WashSet x={200} y={286} s={1.2} pour />
          <Place x={130} y={294} s={0.46} className="gugus-soapy-song-shake" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
            <ClayPaws />
          </Place>
          <Drops x={170} y={200} n={4} w={24} />
          <Air kind="day" seed={5} />
        </g>
      );
    // Clay between the fingers, round the thumbs, under every nail. "Oh!"
    case 2:
      return (
        <g>
          <CloseUp id={id} />
          <BigHand x={200} y={286} s={1.7} view="back" clay />
          <g className="lali-pop-in" style={vars({ "--delay": "0.8s" })}>
            <circle cx={150} cy={112} r={20} fill="none" stroke="#E2463F" strokeWidth={3} strokeDasharray="5 4" />
            <circle cx={172} cy={232} r={20} fill="none" stroke="#E2463F" strokeWidth={3} strokeDasharray="5 4" />
          </g>
          <Place x={318} y={298} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Place x={92} y={298} s={0.4} tap={TAP.grandma}>
            <Grandma arm="hold" />
          </Place>
        </g>
      );
    // "Germs hide in the very same places. Water alone can't chase them out." "I need soap!"
    case 3:
      return (
        <g>
          <Home id={id} time="day" />
          <Place x={120} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="raise" />
          </Place>
          <Place x={270} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="happy" pose="point" />
            <ClayPaws />
          </Place>
          <Sign x={250} y={150} kind="?" delay={0.4} />
          <Speech x={300} y={130} w={56} h={40} tail="left" delay={1.6}>
            <SoapBar x={0} y={8} s={1.2} foam />
          </Speech>
          <Air kind="day" seed={7} grass={false} />
        </g>
      );
    // Palm to palm; backs of the hands.
    case 4:
      return <TwoSteps id={id} left={{ view: "palm", zone: "palm", at: [130, 210] }} right={{ view: "back", zone: "back", at: [270, 212] }} clay />;
    // In between the fingers; backs of the fingers.
    case 5:
      return <TwoSteps id={id} left={{ view: "palm", zone: "between", at: [130, 156] }} right={{ view: "back", zone: "knuckles", at: [270, 170] }} clay />;
    // Each thumb; fingertips and nails. The clay is running away!
    case 6:
      return (
        <g>
          <TwoSteps id={id} left={{ view: "palm", zone: "thumb", at: [92, 214] }} right={{ view: "palm", zone: "tips", at: [270, 136] }} clay={false} />
          <g className="gugus-soapy-song-run">
            <circle cx={200} cy={262} r={4} fill={CLAY} />
            <circle cx={214} cy={266} r={3} fill={CLAY} />
          </g>
        </g>
      );
    // A little song, sung twice.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" />
          <WashSet x={200} y={286} s={1.2} />
          <Place x={150} y={294} s={0.48} className="gugus-soapy-song-sing" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Bubbles x={170} y={240} n={8} spread={70} seed={6} up={-70} />
          <Notes x={120} y={150} color="#2F6FD0" />
          <Place x={290} y={294} s={0.44} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Air kind="day" seed={9} />
        </g>
      );
    // Rinse with clean water, dry on a clean cloth. Not a speck left!
    case 8:
      return (
        <g>
          <CloseUp id={id} />
          <WashSet x={240} y={110} s={1.6} pour />
          <BigHand x={180} y={290} s={1.35} view="back" />
          <Drops x={200} y={190} n={5} w={40} fall={60} />
          <Towel x={330} y={250} s={1.6} />
          <Glint x={150} y={150} s={1.4} delay={0.6} />
          <Glint x={210} y={200} s={1.1} delay={1.4} />
          <Glint x={170} y={240} s={1.2} delay={2} />
        </g>
      );
    // "When do we wash?" Before eating, after the toilet, after the goats, after a sneeze.
    case 9:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={200} y={294} s={0.5} tap={TAP.gugu}>
            <Gugu mood="joy" pose="point" />
          </Place>
          <Place x={330} y={296} s={0.36} flip tap={TAP.cub}>
            <Cub mood="happy" />
          </Place>
          <Speech x={90} y={100} w={56} h={42} tail="right" delay={0.4}>
            <Mesob x={0} y={16} s={0.38} />
          </Speech>
          <Speech x={160} y={60} w={56} h={42} tail="down" delay={1.4}>
            <Latrine x={0} y={18} s={0.42} tap={false} />
          </Speech>
          <Speech x={240} y={60} w={56} h={42} tail="down" delay={2.4}>
            <Sheep x={0} y={10} s={0.5} />
          </Speech>
          <Speech x={310} y={100} w={56} h={42} tail="left" delay={3.4}>
            <Tissue x={0} y={10} s={1.4} />
          </Speech>
          <Air kind="day" seed={11} />
        </g>
      );
    // Injera and lentils; a gursha for Grandma with a clean hand.
    case 10:
      return (
        <g>
          <Home id={id} time="day" />
          <Mesob x={200} y={286} s={1} rx={64} />
          <Place x={100} y={294} s={0.5} tap={TAP.grandma}>
            <Grandma arm="feed" mood="joy" />
          </Place>
          <Place x={300} y={294} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" item={<Gursha s={1.4} />} />
          </Place>
          <Hearts spots={[[190, 160, 0.6], [214, 146, 1.4]]} />
          <Air kind="day" seed={13} grass={false} />
        </g>
      );
    // After the toilet, straight back to the soap, singing; everyone joins in.
    case 11:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Latrine x={90} y={262} s={1.1} />
          <Place x={200} y={294} s={0.46} className="gugus-soapy-song-sing" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Bubbles x={140} y={210} n={6} spread={40} seed={12} />
          <Place x={270} y={294} s={0.42} flip tap={TAP.cub}>
            <Cub mood="joy" arm="up" />
          </Place>
          <Place x={340} y={292} s={0.46} flip tap={TAP.grandma}>
            <Grandma arm="clap" mood="joy" />
          </Place>
          <Notes x={220} y={150} color="#2F6FD0" />
          <Sparkles x={200} y={150} r={60} delay={1.2} n={6} />
          <Air kind="day" seed={15} />
        </g>
      );
    default:
      return null;
  }
}
