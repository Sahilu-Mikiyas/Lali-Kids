"use client";

import "./gugu-asks-for-help.css";

import { useId, type ReactNode } from "react";

import { Air, BeeHover, Mountains, Place, vars } from "../../scenery";
import { Tappable } from "../../tappable";
import { Gugu, Papa, TAP, Tsehay, Wolf } from "./kit-cast";
import { SkyFor } from "./kit-places";
import { Hearts, Kite, Sandals, Sign, Sparkles, Speech } from "./kit-props";

/*
  "Gugu Asks for Help": one living picture per page (12 pages) under one very big fig tree, drawn
  large enough to climb. The kite (and later a sandal) hang in its top branches, and the thin
  branch that creaks is on the right. Keyframes: kit.css and ./gugu-asks-for-help.css.
*/

/** The big fig tree: a thick trunk, a strong low branch, a thin branch out to the right. */
function BigTree({ id, kite = true, sandal = false, bend = false, children }: { id: string; kite?: boolean; sandal?: boolean; bend?: boolean; children?: ReactNode }) {
  return (
    <g>
      <SkyFor id={id} time="day" />
      <Mountains />
      <path d="M-10 230 Q200 214 410 230 L410 310 L-10 310Z" fill="#8FCB80" />
      <path d="M-10 262 Q200 250 410 262 L410 310 L-10 310Z" fill="#E3B77C" />
      <g transform="translate(150 262)">
        <path d="M-24 0 Q-14 -80 -20 -150 L20 -150 Q14 -80 26 0Z" fill="#7A5236" />
        <path d="M-6 -110 Q-60 -130 -110 -128" stroke="#7A5236" strokeWidth={14} strokeLinecap="round" fill="none" />
        <g className={bend ? "gugu-asks-for-help-creak" : undefined}>
          <path d="M10 -120 Q90 -136 170 -122" stroke="#7A5236" strokeWidth={6} strokeLinecap="round" fill="none" />
        </g>
        <g className="lali-sway" style={vars({ "--dur": "6s" })}>
          <Tappable reaction="wiggle" sound="pop">
            <g fill="#2D7D47">
              <circle cx={-80} cy={-170} r={50} />
              <circle cx={60} cy={-180} r={56} />
              <circle cx={0} cy={-210} r={60} />
            </g>
            <g fill="#3E9B5A">
              <circle cx={-70} cy={-180} r={36} />
              <circle cx={60} cy={-192} r={40} />
              <circle cx={0} cy={-222} r={44} />
            </g>
          </Tappable>
        </g>
        {kite && (
          <g transform="translate(70 -200) rotate(30)">
            <Kite x={0} y={0} s={0.7} />
          </g>
        )}
        {sandal && (
          <g transform="translate(-40 -170) rotate(40)">
            <Sandals x={0} y={0} s={1} one stars={false} color="#2F6FD0" />
          </g>
        )}
      </g>
      {children}
    </g>
  );
}

export default function GuguAsksForHelp({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Whoosh! The wind grabs Gugu's kite and tangles it high in the big fig tree.
    case 0:
      return (
        <g>
          <BigTree id={id} kite={false} />
          <g transform="translate(220 62)">
            <g className="gugu-asks-for-help-blow">
              <g transform="rotate(30)">
                <Kite x={0} y={0} s={0.7} />
              </g>
            </g>
          </g>
          <g stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.8}>
            <path d="M20 120 q30 -10 60 0" className="lali-drift" style={vars({ "--dur": "3s" })} />
          </g>
          <Place x={300} y={292} s={0.46} flip tap={TAP.gugu}>
            <Gugu mood="wow" pose="point" />
          </Place>
          <Air kind="day" seed={3} />
        </g>
      );
    // "I can get it myself!" He jumps. Boing! Not even close.
    case 1:
      return (
        <g>
          <BigTree id={id} />
          <Place x={230} y={292} s={0.46} className="lali-hop" tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Air kind="day" seed={5} />
        </g>
      );
    // He throws his sandal… and it gets stuck too.
    case 2:
      return (
        <g>
          <BigTree id={id} sandal />
          <Place x={250} y={292} s={0.46} tap={TAP.gugu}>
            <Gugu mood="worried" pose="point" />
          </Place>
          <g transform="translate(240 300)">
            <Sandals x={0} y={0} s={1} one stars={false} color="#2F6FD0" />
          </g>
          <Sign x={110} y={70} kind="!" delay={0.6} color="#E2463F" />
          <Air kind="day" seed={7} />
        </g>
      );
    // Tsehay: "Shall I get my Papa?" "No! I can do it MYSELF."
    case 3:
      return (
        <g>
          <BigTree id={id} sandal />
          <Place x={240} y={292} s={0.46} tap={TAP.gugu}>
            <Gugu mood="worried" pose="no" />
          </Place>
          <Place x={340} y={294} s={0.4} flip tap={TAP.tsehay}>
            <Tsehay mood="worried" pose="point" />
          </Place>
          <Air kind="day" seed={9} />
        </g>
      );
    // He climbs out along the thin branch. Creeeak! It bends. Gugu freezes.
    case 4:
    // Can't go forward, scared to go back. Lali: "This is the time to ask."
    case 5:
    // "Asking means you're smart enough to know when you need a friend. Asking is brave too!"
    case 6:
      return (
        <g>
          <BigTree id={id} sandal bend>
            <g transform="translate(250 146)">
              <g className={page === 4 ? "gugu-asks-for-help-creak" : "vc-tremble"}>
                <Place x={0} y={0} s={0.34} tap={TAP.gugu}>
                  <Gugu mood="worried" />
                </Place>
              </g>
            </g>
          </BigTree>
          {page >= 5 && <BeeHover x={300} y={110} s={1.1} flip />}
          {page === 6 && (
            <Speech x={330} y={60} w={56} h={40} tail="left" delay={0.8}>
              <circle cx={-8} cy={0} r={8} fill="#5A3A2A" />
              <circle cx={10} cy={0} r={8} fill="#B8742E" />
              <path d="M-2 0 H4" stroke="#F5B21E" strokeWidth={3} />
            </Speech>
          )}
          {page === 4 && <Sign x={330} y={90} kind="!" delay={1} color="#E2463F" />}
          <Air kind="day" seed={11 + page} />
        </g>
      );
    // "HELP! Please, can someone help me?" Tsehay, Papa and Grandpa Tolosa come running.
    case 7:
      return (
        <g>
          <BigTree id={id} sandal bend>
            <g transform="translate(250 146)">
              <Place x={0} y={0} s={0.34} tap={TAP.gugu}>
                <Gugu mood="wow" pose="wave" />
              </Place>
            </g>
          </BigTree>
          <Place x={60} y={292} s={0.48} from={[-40, 292]} dur={1.4} delay={0.4} tap={TAP.papa}>
            <Papa mood="worried" />
          </Place>
          <Place x={330} y={292} s={0.48} from={[450, 292]} dur={1.8} delay={0.6} flip tap={TAP.elder}>
            <Wolf elder mood="wow" />
          </Place>
          <Place x={260} y={296} s={0.36} from={[440, 296]} dur={1.4} delay={0.2} flip tap={TAP.tsehay}>
            <Tsehay mood="worried" />
          </Place>
          <Air kind="day" seed={19} />
        </g>
      );
    // Papa, step by step: "One paw back. Now the other." Down into Papa's arms.
    case 8:
      return (
        <g>
          <BigTree id={id} sandal />
          <Place x={250} y={292} s={0.52} flip tap={TAP.papa}>
            <Papa mood="happy" pose="wave" />
          </Place>
          <g className="gugu-asks-for-help-down">
            <Place x={160} y={180} s={0.34} tap={TAP.gugu}>
              <Gugu mood="happy" />
            </Place>
          </g>
          <Place x={340} y={292} s={0.44} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // Grandpa's long stick, a little twist: down floats the kite, down drops the sandal. Plop!
    case 9:
      return (
        <g>
          <BigTree id={id} kite={false} />
          <Place x={290} y={292} s={0.5} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="wave" />
          </Place>
          <path d="M270 200 L230 70" stroke="#7A5236" strokeWidth={5} strokeLinecap="round" />
          <g transform="translate(220 70)">
            <g className="gugu-asks-for-help-float">
              <g transform="rotate(10)">
                <Kite x={0} y={0} s={0.7} />
              </g>
            </g>
          </g>
          <g transform="translate(110 290)">
            <g className="vc-drop" style={vars({ "--fy": "-190px", "--delay": "1s" })}>
              <Sandals x={0} y={0} s={1} one stars={false} color="#2F6FD0" />
            </g>
          </g>
          <Place x={150} y={294} s={0.4} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Air kind="day" seed={23} />
        </g>
      );
    // "I should have asked at the start." "Even I ask for help!"
    case 10:
      return (
        <g>
          <BigTree id={id} kite={false} />
          <Place x={140} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={270} y={292} s={0.52} flip className="gugu-asks-for-help-laugh" tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={350} y={296} s={0.36} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Hearts spots={[[200, 170, 0.6], [220, 156, 1.4]]} />
          <Air kind="day" seed={25} />
        </g>
      );
    // The kite flies again, with Gugu, Tsehay and Grandpa all holding the string.
    case 11:
      return (
        <g>
          <SkyFor id={id} time="day" sun={[60, 60]} />
          <Mountains />
          <path d="M-10 230 Q200 214 410 230 L410 310 L-10 310Z" fill="#8FCB80" />
          <path d="M-10 262 Q200 250 410 262 L410 310 L-10 310Z" fill="#E3B77C" />
          <Kite x={260} y={70} s={1} sx={-90} sy={170} />
          <Place x={140} y={294} s={0.44} tap={TAP.gugu}>
            <Gugu mood="joy" pose="wave" />
          </Place>
          <Place x={200} y={296} s={0.36} tap={TAP.tsehay}>
            <Tsehay mood="joy" pose="hop" />
          </Place>
          <Place x={80} y={292} s={0.48} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Sparkles x={260} y={80} r={40} delay={0.6} n={6} />
          <Air kind="day" seed={27} />
        </g>
      );
    default:
      return null;
  }
}
