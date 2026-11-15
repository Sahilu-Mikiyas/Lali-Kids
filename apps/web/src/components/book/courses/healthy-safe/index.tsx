"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the Healthy & Safe stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's cast,
  places and props (./kit-cast.tsx, ./kit-places.tsx, ./kit-props.tsx, ./kit-more.tsx, ./kit.css,
  copied from Values & Character) and the health things in ./kit-health.tsx (+ ./kit-health.css).
  Loaded in the browser only (ssr: false), like the library's scenes.
*/
// Level 1: clean and healthy habits
const GugusSoapySong = dynamic(() => import("./gugus-soapy-song"), { ssr: false });
const AnbessasSparklySmile = dynamic(() => import("./anbessas-sparkly-smile"), { ssr: false });
const AbdisOneBucketBath = dynamic(() => import("./abdis-one-bucket-bath"), { ssr: false });
const HabensSneezyWeek = dynamic(() => import("./habens-sneezy-week"), { ssr: false });
const ShooFlyShoo = dynamic(() => import("./shoo-fly-shoo"), { ssr: false });
// Level 2: food, sleep and moving
const TsehaysRainbowPlate = dynamic(() => import("./tsehays-rainbow-plate"), { ssr: false });
const AyansRunningBreakfast = dynamic(() => import("./ayans-running-breakfast"), { ssr: false });
const WaterForTheTeam = dynamic(() => import("./water-for-the-team"), { ssr: false });
const HabensSleepyMoon = dynamic(() => import("./habens-sleepy-moon"), { ssr: false });
// Level 3: my feelings, and my body belongs to me
const GugusTummyButterflies = dynamic(() => import("./gugus-tummy-butterflies"), { ssr: false });
const HawisHelpingHand = dynamic(() => import("./hawis-helping-hand"), { ssr: false });
const MyBodyBelongsToMe = dynamic(() => import("./my-body-belongs-to-me"), { ssr: false });
const SurpriseOrSecret = dynamic(() => import("./surprise-or-secret"), { ssr: false });
// Level 4: safe at home
const HotHotStepBack = dynamic(() => import("./hot-hot-step-back"), { ssr: false });
const TheBrokenCup = dynamic(() => import("./the-broken-cup"), { ssr: false });
const AbdiAsksFirst = dynamic(() => import("./abdi-asks-first"), { ssr: false });
const HawisKiteAndTheWire = dynamic(() => import("./hawis-kite-and-the-wire"), { ssr: false });
// Level 5: safe outside
const HoldMyHandGugu = dynamic(() => import("./hold-my-hand-gugu"), { ssr: false });
const TheWellHasALid = dynamic(() => import("./the-well-has-a-lid"), { ssr: false });
const StillAsATree = dynamic(() => import("./still-as-a-tree"), { ssr: false });
const LostAtTheMarket = dynamic(() => import("./lost-at-the-market"), { ssr: false });
const AskBeforeYouGo = dynamic(() => import("./ask-before-you-go"), { ssr: false });
// Level 6: when we're sick
const HabenTellsTeacher = dynamic(() => import("./haben-tells-teacher"), { ssr: false });
const AbdiAtTheHealthPost = dynamic(() => import("./abdi-at-the-health-post"), { ssr: false });
const DawitsVaccineDay = dynamic(() => import("./dawits-vaccine-day"), { ssr: false });
const OnlyFromAGrownUp = dynamic(() => import("./only-from-a-grown-up"), { ssr: false });

/** Animated scenes for this course's stories, by story id. Use dynamic(() => import("./<id>"), { ssr: false }). */
export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "gugus-soapy-song": GugusSoapySong,
  "anbessas-sparkly-smile": AnbessasSparklySmile,
  "abdis-one-bucket-bath": AbdisOneBucketBath,
  "habens-sneezy-week": HabensSneezyWeek,
  "shoo-fly-shoo": ShooFlyShoo,
  "tsehays-rainbow-plate": TsehaysRainbowPlate,
  "ayans-running-breakfast": AyansRunningBreakfast,
  "water-for-the-team": WaterForTheTeam,
  "habens-sleepy-moon": HabensSleepyMoon,
  "gugus-tummy-butterflies": GugusTummyButterflies,
  "hawis-helping-hand": HawisHelpingHand,
  "my-body-belongs-to-me": MyBodyBelongsToMe,
  "surprise-or-secret": SurpriseOrSecret,
  "hot-hot-step-back": HotHotStepBack,
  "the-broken-cup": TheBrokenCup,
  "abdi-asks-first": AbdiAsksFirst,
  "hawis-kite-and-the-wire": HawisKiteAndTheWire,
  "hold-my-hand-gugu": HoldMyHandGugu,
  "the-well-has-a-lid": TheWellHasALid,
  "still-as-a-tree": StillAsATree,
  "lost-at-the-market": LostAtTheMarket,
  "ask-before-you-go": AskBeforeYouGo,
  "haben-tells-teacher": HabenTellsTeacher,
  "abdi-at-the-health-post": AbdiAtTheHealthPost,
  "dawits-vaccine-day": DawitsVaccineDay,
  "only-from-a-grown-up": OnlyFromAGrownUp,
};
