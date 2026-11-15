"use client";

import type { ReactNode } from "react";

import { ButterPan, HotCold, IceCube, Puddle, SteamPot } from "@/components/book/courses/science-nature/kit-stuff";
import type { DemoProps } from "../../types";
import { Rounds, type Option, type Round } from "./rounds-kit";

/*
  Warm It or Cool It (level 3: melting, freezing, boiling and condensing). Six changes: for each,
  should we warm it or cool it? Ice to water (warm), water to ice (cool: a freezer), solid kibe to
  runny (warm), melted kibe to solid (cool), water to vapour (warm: boil it, a grown-up's job), and
  vapour back to drops (cool: a cool lid). The picture shows before and after.
*/

const WARM: Option = { key: "warm", label: { en: "Warm it", am: "አሙቁት" }, pic: <HotCold kind="hot" x={22} y={22} s={1.3} /> };
const COOL: Option = { key: "cool", label: { en: "Cool it", am: "አቀዝቅዙት" }, pic: <HotCold kind="cold" x={22} y={22} s={1.3} /> };

/** Before → after, side by side, with the warm or cool sign in the middle once solved. */
function Change({ before, after, ok, kind }: { before: ReactNode; after: ReactNode; ok: boolean; kind: "hot" | "cold" }) {
  return (
    <g>
      <rect width={400} height={300} fill={ok ? (kind === "hot" ? "#FFF0E4" : "#E8F4FF") : "#F4EBD8"} />
      <g transform="translate(110 0)">{before}</g>
      <path d="M180 160 H220 M208 148 L222 160 L208 172" stroke="#7C3AED" strokeWidth={5} fill="none" strokeLinecap="round" />
      {ok && <HotCold kind={kind} x={200} y={110} s={1.5} />}
      <g transform="translate(290 0)" opacity={ok ? 1 : 0.25}>
        {after}
      </g>
    </g>
  );
}

const ROUNDS: Round[] = [
  {
    prompt: { en: "Turn the ice into water.", am: "በረዶውን ውሃ አድርጉት።" },
    right: "warm",
    options: [WARM, COOL],
    why: { en: "Warm ice melts into water, like the hailstones in the sun.", am: "የሞቀ በረዶ ቀልጦ ውሃ ይሆናል፤ በፀሐይ ላይ እንደነበሩት በረዶዎች።" },
    scene: (ok) => <Change ok={ok} kind="hot" before={<IceCube x={0} y={190} s={2.6} />} after={<Puddle x={0} y={190} s={1.4} />} />,
  },
  {
    prompt: { en: "Turn the water into ice.", am: "ውሃውን በረዶ አድርጉት።" },
    right: "cool",
    options: [WARM, COOL],
    why: { en: "Cool it a lot, in a freezer, and water freezes into ice.", am: "በጣም አቀዝቅዙት፣ በማቀዝቀዣ ውስጥ፤ ውሃም ቀዝቅዞ በረዶ ይሆናል።" },
    scene: (ok) => <Change ok={ok} kind="cold" before={<Puddle x={0} y={190} s={1.4} />} after={<IceCube x={0} y={190} s={2.6} />} />,
  },
  {
    prompt: { en: "Make the hard kibe runny for cooking.", am: "ጠንካራውን ቅቤ ለማብሰል ፈሳሽ አድርጉት።" },
    right: "warm",
    options: [COOL, WARM],
    why: { en: "Warm butter melts: solid becomes liquid. (A hot pan is a grown-up's job.)", am: "የሞቀ ቅቤ ይቀልጣል፦ ጠጣር ፈሳሽ ይሆናል። (ትኩስ ምጣድ የትልቅ ሰው ሥራ ነው።)" },
    scene: (ok) => <Change ok={ok} kind="hot" before={<ButterPan x={0} y={190} s={1.8} state="solid" />} after={<ButterPan x={0} y={190} s={1.8} state="liquid" />} />,
  },
  {
    prompt: { en: "Make the melted kibe solid again.", am: "የቀለጠውን ቅቤ እንደገና ጠጣር አድርጉት።" },
    right: "cool",
    options: [WARM, COOL],
    why: { en: "Cool melted butter sets solid again. Melting is a change that can go back!", am: "የቀለጠ ቅቤ ሲቀዘቅዝ እንደገና ይረጋል። መቅለጥ ሊመለስ የሚችል ለውጥ ነው!" },
    scene: (ok) => <Change ok={ok} kind="cold" before={<ButterPan x={0} y={190} s={1.8} state="liquid" />} after={<ButterPan x={0} y={190} s={1.8} state="solid" />} />,
  },
  {
    prompt: { en: "Send the water up into the air.", am: "ውሃውን ወደ አየር ላኩት።" },
    right: "warm",
    options: [COOL, WARM],
    why: { en: "Heat water and it turns into water vapour, a gas we can't see. (Boiling is a grown-up's job.)", am: "ውሃን ስታሞቁት ልናየው የማንችል ጋዝ፣ እንፋሎት ይሆናል። (ማፍላት የትልቅ ሰው ሥራ ነው።)" },
    scene: (ok) => <Change ok={ok} kind="hot" before={<Puddle x={0} y={190} s={1.4} />} after={<SteamPot x={0} y={230} s={1.1} lid="off" />} />,
  },
  {
    prompt: { en: "Turn the steam back into drops of water.", am: "እንፋሎቱን ተመልሶ የውሃ ጠብታ አድርጉት።" },
    right: "cool",
    options: [WARM, COOL],
    why: { en: "When water vapour touches something cool, like a lid, it turns back into drops.", am: "እንፋሎት እንደ ክዳን ያለ ቀዝቃዛ ነገር ሲነካ ተመልሶ ጠብታ ይሆናል።" },
    scene: (ok) => <Change ok={ok} kind="cold" before={<SteamPot x={0} y={230} s={1.1} lid="off" />} after={<SteamPot x={-10} y={250} s={1} lid="held" />} />,
  },
];

export default function MeltOrFreeze({ lang, onDone }: DemoProps) {
  return (
    <Rounds
      lang={lang}
      title={{ en: "Warm It or Cool It", am: "አሙቁት ወይስ አቀዝቅዙት" }}
      goal={{ en: "To make each change, should we warm it or cool it?", am: "እያንዳንዱን ለውጥ ለማምጣት ማሞቅ ነው ወይስ ማቀዝቀዝ?" }}
      rounds={ROUNDS}
      hint={{ en: "Not that way. Think of ice in the sun, and butter on a cool plate.", am: "በዚያ አይደለም። በፀሐይ ላይ ያለ በረዶንና በቀዝቃዛ ሳህን ላይ ያለ ቅቤን አስቡ።" }}
      finale={{ en: "Warm to melt, cool to set: you've got it!", am: "ለማቅለጥ አሙቁ፣ ለማርጋት አቀዝቅዙ፦ ገባችሁ!" }}
      end={ROUNDS[0].scene(true)}
      onDone={onDone}
    />
  );
}
