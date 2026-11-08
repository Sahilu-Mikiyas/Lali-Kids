"use client";

import "./promise-is-a-promise.css";

import { useId } from "react";

import { GuguShape } from "../../../characters";
import { Air, BeeFlight, BeeHover, Place, vars } from "../../scenery";
import { Camel, GeladaSleepEyes, Gugu, NETELA, OnHead, Papa, TAP, Tsehay, Wolf } from "./kit-cast";
import { Home, Village, Yard } from "./kit-places";
import { Bedroll, Drum, Hearts, Jerrycan, Notes, Sign, Sparkles, Speech } from "./kit-props";

/*
  "A Promise Is a Promise": one living picture per page (12 pages). The yellow jerrycan is the
  promise: it waits by Hawi's door, shows up in Gugu's thoughts at the wedding, and is carried
  home by two friends, one handle each. The wedding (a bride and groom in white and gold, a
  drummer, flags) dances in at the edge of the pictures and finally comes up their own road.
  Keyframes: kit.css (vc-*) and ./promise-is-a-promise.css.
*/

/** The bride: a gelada in a white dress with a gold crown and a gold-edged netela. */
function Bride() {
  return (
    <g>
      <GuguShape mood="joy" pose="wave" />
      <g className="lali-breathe">
        <path d="M50 176 Q100 160 150 176 L156 232 Q100 240 44 232Z" fill={NETELA} />
        <path d="M48 222 Q100 232 152 222" stroke="#E8B830" strokeWidth={5} fill="none" />
      </g>
      <OnHead>
        <path d="M44 90 Q46 26 100 22 Q154 26 156 90 Q140 50 100 48 Q60 50 44 90Z" fill={NETELA} />
        <path d="M74 30 L80 12 L90 26 L100 8 L110 26 L120 12 L126 30Z" fill="#F5C21E" />
        <circle cx={100} cy={16} r={3} fill="#E2463F" />
      </OnHead>
    </g>
  );
}

/** The groom: a gelada in a white gabi with a gold-edged cape. */
function Groom() {
  return (
    <g>
      <GuguShape mood="joy" pose="wave" />
      <path d="M44 150 C50 120 74 110 100 110 C126 110 150 120 156 150 L160 228 L40 228Z" fill="#FBF8F0" />
      <path d="M44 150 C50 120 74 110 100 110 C126 110 150 120 156 150" stroke="#E8B830" strokeWidth={5} fill="none" />
      <path d="M100 116 V228" stroke="#E8B830" strokeWidth={3} />
    </g>
  );
}

/** A drummer: Papa with the wedding drum. */
function Drummer() {
  return (
    <g>
      <Papa mood="joy" pose="wave" />
      <g transform="translate(100 196) scale(1.6)">
        <Drum x={0} y={0} />
      </g>
    </g>
  );
}

/** The village well: a stone ring with a wooden frame and a bucket. */
function Well({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={34} ry={8} fill="#8E8AA0" />
      <path d="M-34 0 L-34 -24 Q0 -34 34 -24 L34 0 Q0 10 -34 0Z" fill="#A8A4B8" />
      <path d="M-34 -12 Q0 -20 34 -12" stroke="#8E8AA0" strokeWidth={2} fill="none" />
      <ellipse cx={0} cy={-24} rx={34} ry={7} fill="#5A6A8A" />
      <path d="M-28 -24 V-70 M28 -24 V-70 M-32 -70 H32" stroke="#8A5A30" strokeWidth={5} strokeLinecap="round" />
      <path d="M0 -70 V-46" stroke="#C9B89A" strokeWidth={1.4} />
      <path d="M-7 -46 H7 L5 -36 H-5Z" fill="#7A5236" />
    </g>
  );
}

/** Feast flags across the top of the picture. */
function Flags() {
  const colors = ["#2FA35A", "#FFD233", "#E2463F"];
  return (
    <g>
      <path d="M0 40 Q200 90 400 36" stroke="#7A5236" strokeWidth={1.4} fill="none" />
      {Array.from({ length: 12 }, (_, i) => {
        const t = (i + 0.5) / 12;
        const x = Math.round(400 * t);
        const y = Math.round((1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 90 + t * t * 36);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M-7 0 L7 0 L0 13Z" fill={colors[i % 3]} className="promise-is-a-promise-flag" style={vars({ "--delay": `${-i * 0.2}s` })} />
          </g>
        );
      })}
    </g>
  );
}

/** Sound rings from the drums. */
function Booms({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#E2463F" strokeWidth={2.4}>
      {[0, 0.5, 1].map((d) => (
        <circle key={d} r={14} className="lali-ring" style={vars({ "--delay": `${-d}s` })} />
      ))}
    </g>
  );
}

/** The wedding party, dancing (drummer, groom, bride), centred on x. */
function Wedding({ x, y, s = 0.4 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Place x={-70 * (s / 0.4)} y={0} s={s} className="lali-hop" tap={TAP.papa}>
        <Drummer />
      </Place>
      <Place x={0} y={0} s={s} className="promise-is-a-promise-dance" tap={TAP.mama}>
        <Groom />
      </Place>
      <Place x={60 * (s / 0.4)} y={0} s={s} className="promise-is-a-promise-dance" tap={TAP.mama}>
        <Bride />
      </Place>
      <Booms x={-70 * (s / 0.4)} y={-60 * (s / 0.4)} />
    </g>
  );
}

export default function PromiseIsAPromise({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // "Will you help me carry the water tomorrow?" "I promise! Right after breakfast!"
    case 0:
      return (
        <g>
          <Yard id={id} time="evening" />
          <Jerrycan x={200} y={286} s={1.2} />
          <Place x={130} y={294} s={0.46} tap={TAP.hawi}>
            <Wolf mood="happy" wag />
          </Place>
          <Place x={280} y={294} s={0.48} flip tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Sparkles x={204} y={180} r={34} delay={1} n={6} />
          <Air kind="dusk" seed={3} />
        </g>
      );
    // Next morning: drums! Boom-boom-ba-boom! A wedding dancing down the road.
    case 1:
      return (
        <g>
          <Home id={id} time="morning" door="open" />
          <Booms x={96} y={170} />
          <Notes x={86} y={150} color="#FFFFFF" />
          <g transform="translate(250 270)">
            <ellipse cx={0} cy={0} rx={30} ry={7} fill="#B8683E" />
            <ellipse cx={0} cy={-3} rx={24} ry={4} fill="#F2E2C2" />
          </g>
          <Place x={300} y={294} s={0.5} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Sign x={230} y={160} kind="!" delay={0.8} color="#E2463F" />
          <Air kind="day" seed={5} grass={false} />
        </g>
      );
    // "A wedding!" His friends run to watch; Gugu too. Then he stops: Hawi is waiting.
    case 2:
      return (
        <g>
          <Village id={id} time="day" />
          <Flags />
          <g className="promise-is-a-promise-run-right">
            <Place x={290} y={292} s={0.34} tap={TAP.tsehay}>
              <Tsehay pose="hop" mood="joy" />
            </Place>
            <Place x={350} y={294} s={0.43} tap={TAP.ayan}>
              <Camel who="ayan" mood="joy" walk />
            </Place>
          </g>
          <Place x={170} y={294} s={0.48} tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Speech x={100} y={140} w={56} h={52} think tail="right" delay={1.2}>
            <g transform="translate(-2 20) scale(0.7)">
              <Jerrycan x={0} y={0} />
            </g>
          </Speech>
          <Air kind="day" seed={7} />
        </g>
      );
    // The dancing one way, Hawi's road the other. "Just one dance…" A promise is a promise!
    case 3:
      return (
        <g>
          <Village id={id} time="day" />
          <Flags />
          <Wedding x={80} y={262} s={0.26} />
          <g transform="translate(330 250)">
            <path d="M-50 20 Q0 -10 40 -60" stroke="#EEC890" strokeWidth={16} fill="none" strokeLinecap="round" />
            <Place x={20} y={-40} s={0.2} tap={TAP.hawi}>
              <Wolf mood="sad" />
            </Place>
            <Jerrycan x={44} y={-40} s={0.5} />
          </g>
          <Place x={210} y={296} s={0.5} className="promise-is-a-promise-torn" tap={TAP.gugu}>
            <Gugu mood="worried" />
          </Place>
          <Air kind="day" seed={9} />
        </g>
      );
    // He dances, but he isn't having fun: he keeps thinking of Hawi with the heavy jerrycan.
    case 4:
      return (
        <g>
          <Village id={id} time="day" />
          <Flags />
          <Wedding x={250} y={290} s={0.36} />
          <Place x={90} y={294} s={0.46} className="lali-wobble" tap={TAP.gugu}>
            <Gugu pose="wave" mood="sad" />
          </Place>
          <Speech x={110} y={120} w={64} h={58} think tail="left" delay={1.2}>
            <g transform="translate(-6 24)">
              <g transform="scale(0.12) translate(-100 -230)">
                <Wolf mood="sad" />
              </g>
            </g>
            <g transform="translate(16 22) scale(0.45)">
              <Jerrycan x={0} y={0} />
            </g>
          </Speech>
          <Air kind="day" seed={11} />
        </g>
      );
    // He turns round and runs: past the wedding, past the market, all the way to Hawi's house.
    case 5:
      return (
        <g>
          <Village id={id} time="day" />
          <g className="promise-is-a-promise-dash">
            <Place x={200} y={290} s={0.5} tap={TAP.gugu}>
              <Gugu pose="hop" mood="joy" />
            </Place>
            <g stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.8}>
              <path d="M140 230 h-30 M146 250 h-40 M140 270 h-30" />
            </g>
          </g>
          <BeeHover x={300} y={160} s={1} />
          <Air kind="day" seed={13} />
        </g>
      );
    // Hawi waiting on her jerrycan: "I thought you forgot." "I'm sorry I'm late. Let's go!"
    case 6:
      return (
        <g>
          <Yard id={id} time="day" />
          <Jerrycan x={272} y={290} s={1.3} />
          <Place x={272} y={240} s={0.42} flip tap={TAP.hawi}>
            <Wolf mood="sad" ears="flat" />
          </Place>
          <Place x={130} y={294} s={0.48} from={[-40, 294]} dur={1.4} delay={0.3} tap={TAP.gugu}>
            <Gugu pose="wave" mood="worried" />
          </Place>
          <Speech x={186} y={150} w={44} h={36} tail="left" delay={2}>
            <path d="M0 9 C-12 0 -10 -11 -2 -11 C0 -11 0 -9 0 -7 C0 -9 0 -11 2 -11 C10 -11 12 0 0 9Z" fill="#FF8FB1" />
            <rect x={-9} y={-4} width={18} height={6} rx={3} fill="#F2D3A2" transform="rotate(-30)" />
          </Speech>
          <Air kind="day" seed={15} />
        </g>
      );
    // Together to the well, and together home with the full jerrycan, one handle each.
    case 7:
      return (
        <g>
          <Yard id={id} time="day" house={false} />
          <Well x={330} y={256} />
          <g className="promise-is-a-promise-carry">
            <Place x={150} y={294} s={0.46} tap={TAP.gugu}>
              <Gugu mood="joy" />
            </Place>
            <Jerrycan x={198} y={274} s={1.1} />
            <Place x={246} y={294} s={0.44} flip tap={TAP.hawi}>
              <Wolf mood="joy" wag />
            </Place>
          </g>
          <Hearts spots={[[198, 190, 0.8], [220, 176, 1.8]]} />
          <BeeHover x={90} y={160} s={1} />
          <Air kind="day" seed={17} />
        </g>
      );
    // Grandpa Tolosa, leaning on his stick: "When your word is strong, friends can lean on it."
    case 8:
      return (
        <g>
          <Yard id={id} time="day" />
          <Place x={250} y={292} s={0.56} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="bless" />
          </Place>
          <Place x={150} y={294} s={0.46} tap={TAP.gugu}>
            <Gugu mood="joy" />
          </Place>
          <Place x={70} y={296} s={0.38} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Jerrycan x={340} y={290} s={0.9} />
          <Sparkles x={150} y={180} r={36} delay={1} n={6} />
          <Air kind="day" seed={19} />
        </g>
      );
    // Boom-boom-ba-boom! The wedding is coming up their road. "Let's all go and see!"
    case 9:
      return (
        <g>
          <Village id={id} time="day" />
          <Flags />
          <g className="promise-is-a-promise-arrive">
            <Wedding x={110} y={276} s={0.3} />
          </g>
          <Place x={330} y={294} s={0.46} flip tap={TAP.elder}>
            <Wolf elder mood="joy" arm="give" />
          </Place>
          <Place x={250} y={296} s={0.36} flip tap={TAP.gugu}>
            <Gugu mood="wow" />
          </Place>
          <Place x={200} y={298} s={0.32} flip tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
          <Air kind="day" seed={21} />
        </g>
      );
    // The bride and groom dance past. Clapping, jumping, and Grandpa dancing with his stick.
    case 10:
      return (
        <g>
          <Village id={id} time="day" sun={[60, 60]} />
          <Flags />
          <Wedding x={200} y={270} s={0.36} />
          <Place x={60} y={298} s={0.36} className="lali-hop" tap={TAP.gugu}>
            <Gugu pose="wave" mood="joy" />
          </Place>
          <Place x={330} y={298} s={0.34} flip className="lali-hop" tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <Place x={372} y={296} s={0.4} flip className="promise-is-a-promise-dance" tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Sparkles x={200} y={150} r={80} delay={0.6} n={8} />
          <Air kind="day" seed={23} />
        </g>
      );
    // That night: "Next time I'll keep it, even if there are drums." A promise is a promise!
    case 11:
      return (
        <g>
          <Home id={id} time="night" />
          <Bedroll x={180} y={282} w={170} color="#2FA35A" />
          <Place x={150} y={288} s={0.42} tap={TAP.gugu}>
            <g className="vc-still">
              <GuguShape mood="happy" />
              <GeladaSleepEyes />
            </g>
          </Place>
          <BeeFlight path="M240 180 C280 130 340 140 330 190 C320 240 250 230 240 180Z" dur={5} s={1} rest={[300, 170]} happy />
          <Air kind="night" seed={25} grass={false} />
        </g>
      );
    default:
      return null;
  }
}
