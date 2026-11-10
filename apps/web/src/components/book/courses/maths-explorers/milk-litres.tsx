"use client";

import { useId, type ReactNode } from "react";

import { Place } from "../../scenery";
import { TAP, Wolf } from "./kit-cast";
import { d, r1 } from "./kit";
import { Label, Mark, Ox, SumCard } from "./kit-maths";
import { Glass, Jug, Measure, MilkCan } from "./kit-measure";
import { Home, Yard } from "./kit-places";
import { Hearth, Jerrycan } from "./kit-props";
import { Spring } from "./kit-things";

/*
  "Litres of Milk": one living picture per page (12 pages) in Hawi's yard in the Bale
  Mountains and at home. The clear jug holds one litre (or two) and fills from the bottom when
  the page opens; four tea glasses make a litre; the yellow jerrycan holds twenty.
*/

const MILK = "#FFFFFF";

function Farm({ id, time = "morning", children }: { id: string; time?: "morning" | "day" | "evening"; children: ReactNode }) {
  return (
    <Yard id={id} time={time} house>
      {children}
    </Yard>
  );
}

export default function MilkLitres({ page }: { page: number }) {
  const id = useId().replace(/:/g, "");
  switch (page) {
    // Early morning: milking the two cows into the wooden pail.
    case 0:
      return (
        <Farm id={id}>
          <Ox x={140} y={250} s={1.1} color="#8A5A3A" />
          <Ox x={250} y={240} s={0.95} color="#F2EDE2" />
          <g transform="translate(176 268)">
            <path d="M-14 0 L-12 -20 H12 L14 0Z" fill="#8A5A36" />
            <ellipse cx={0} cy={-20} rx={12} ry={3} fill={MILK} />
          </g>
          <Place x={70} y={298} s={0.32} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={340} y={298} s={0.36} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Label x={200} y={150} text="?" size={30} color="#2F5BD3" delay={1.2} />
        </Farm>
      );
    // A clear jug that holds one litre when it is full.
    case 1:
      return (
        <Farm id={id}>
          <Jug x={200} y={240} s={2} fill={1} at={1} liquid={MILK} />
          <Measure x={200} y={90} n={1} unit="L" delay={2.6} />
          <Place x={330} y={298} s={0.38} flip tap={TAP.elder}>
            <Wolf elder mood="happy" arm="give" />
          </Place>
        </Farm>
      );
    // Two jugs from the first cow: two litres.
    case 2:
      return (
        <Farm id={id}>
          <Jug x={150} y={250} s={1.5} fill={1} at={0.8} liquid={MILK} />
          <Jug x={240} y={250} s={1.5} fill={1} at={2.2} liquid={MILK} />
          <Label x={150} y={150} text="1" size={22} color="#2F5BD3" delay={1.6} />
          <Label x={240} y={150} text="2" size={22} color="#2F5BD3" delay={3} />
          <Measure x={200} y={90} n={2} unit="L" delay={3.4} />
          <Place x={60} y={298} s={0.32} tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </Farm>
      );
    // Three more from the second cow: 2 L + 3 L = 5 L.
    case 3:
      return (
        <Farm id={id}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Jug key={i} x={80 + i * 60} y={250} s={1.1} fill={1} at={0.6 + i * 0.4} liquid={i < 2 ? "#FFF6E2" : MILK} />
          ))}
          <SumCard x={200} y={110} tokens={["2 L", "+", "3 L", "=", "5 L"]} start={2.8} size={24} hl={{ 4: "#E8513B" }} />
        </Farm>
      );
    // Four tea glasses empty the one-litre jug.
    case 4:
      return (
        <Farm id={id}>
          <Jug x={110} y={250} s={1.5} fill={0} liquid={MILK} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <g className="lali-pop-in" style={d(0.8 + i * 0.6)}>
                <Glass x={190 + i * 40} y={250} s={1.6} liquid={MILK} />
              </g>
              <Label x={190 + i * 40} y={204} text={String(i + 1)} size={16} color="#2F5BD3" delay={1 + i * 0.6} />
            </g>
          ))}
          <SumCard x={200} y={110} tokens={["4", "→", "1 L"]} start={3.6} size={24} hl={{ 2: "#E8513B" }} />
          <Place x={50} y={298} s={0.28} tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
        </Farm>
      );
    // Full, half full, empty: which holds the most now?
    case 5:
      return (
        <Farm id={id}>
          <Jug x={110} y={250} s={1.5} fill={1} liquid={MILK} />
          <Jug x={200} y={250} s={1.5} fill={0.5} liquid={MILK} />
          <Jug x={290} y={250} s={1.5} fill={0} liquid={MILK} />
          <Mark x={110} y={130} ok delay={1.4} s={0.8} />
          <Place x={350} y={298} s={0.3} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
        </Farm>
      );
    // The yellow jerrycan from the spring: twenty litres.
    case 6:
      return (
        <Farm id={id} time="day">
          <Spring x={80} y={240} />
          <Jerrycan x={200} y={260} s={1.8} />
          <Measure x={200} y={120} n={20} unit="L" delay={1} />
          <Place x={150} y={298} s={0.3} tap={TAP.hawi}>
            <Wolf mood="happy" />
          </Place>
          <Place x={270} y={298} s={0.36} flip tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
        </Farm>
      );
    // The tall thin bottle and the short fat pot hold the same.
    case 7:
      return (
        <Home id={id} shelf={false}>
          <g transform="translate(140 250)">
            <path d="M-10 0 V-60 Q-10 -66 -4 -68 V-78 H4 V-68 Q10 -66 10 -60 V0Z" fill="#DDF2FF" opacity={0.6} stroke="#7AA8C8" />
            <rect x={-9} y={-58} width={18} height={58} fill={MILK} className="mq-fillup" />
          </g>
          <g transform="translate(250 250)">
            <path d="M-34 0 Q-38 -26 -30 -30 H30 Q38 -26 34 0Z" fill="#DDF2FF" opacity={0.6} stroke="#7AA8C8" />
          </g>
          <g transform="translate(250 250)">
            <rect x={-33} y={-26} width={66} height={26} fill={MILK} className="mq-fillup" style={{ animationDelay: "2.4s" }} />
          </g>
          <Label x={200} y={150} text="=" size={34} color="#E8513B" delay={3.8} />
          <Place x={60} y={300} s={0.32} tap={TAP.hawi}>
            <Wolf mood="wow" />
          </Place>
        </Home>
      );
    // Half a litre for the neighbour's baby: up to the middle mark.
    case 8:
      return (
        <Farm id={id} time="day">
          <Jug x={200} y={250} s={2} fill={0.5} at={0.8} liquid={MILK} />
          <Measure x={200} y={90} n="½" unit="L" delay={2.2} />
          <Place x={70} y={298} s={0.32} tap={TAP.hawi}>
            <Wolf mood="happy" arm="give" />
          </Place>
        </Farm>
      );
    // {name}: two 2-litre jugs: 2 L + 2 L = 4 L.
    case 9:
      return (
        <Farm id={id} time="day">
          <Jug x={150} y={250} s={1.6} cap={2} fill={1} at={0.8} liquid={MILK} />
          <Jug x={250} y={250} s={1.6} cap={2} fill={1} at={1.8} liquid={MILK} />
          <SumCard x={200} y={100} tokens={["2 L", "+", "2 L", "=", "4 L"]} start={2.8} size={24} hl={{ 4: "#E8513B" }} />
          <MilkCan x={340} y={262} s={1.2} />
        </Farm>
      );
    // Evening: warm milk on the fire, one glass each, four glasses, one litre.
    case 10:
      return (
        <Home id={id} time="evening" shelf={false}>
          <Hearth x={200} y={258} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} className="lali-pop-in" style={d(1 + i * 0.4)}>
              <Glass x={r1(130 + i * 46)} y={286} s={1.2} liquid={MILK} />
            </g>
          ))}
          <Place x={70} y={300} s={0.34} tap={TAP.elder}>
            <Wolf elder mood="happy" />
          </Place>
          <Place x={330} y={300} s={0.3} flip tap={TAP.hawi}>
            <Wolf mood="joy" />
          </Place>
        </Home>
      );
    // A real milk measurer, with a white milk moustache.
    case 11:
      return (
        <Home id={id} time="night" shelf={false}>
          <Place x={140} y={300} s={0.4} tap={TAP.elder}>
            <Wolf elder mood="joy" />
          </Place>
          <Place x={260} y={300} s={0.4} flip tap={TAP.hawi}>
            <Wolf mood="joy" wag />
          </Place>
          <g className="lali-pop-in" style={d(1.2)}>
            <path d="M252 266 q8 6 16 0" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
          <Glass x={300} y={286} s={1.2} fill={0.2} liquid={MILK} />
        </Home>
      );
    default:
      return null;
  }
}
