"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the English First Words stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's cast
  (./cast.tsx), places (./places.tsx), props (./props.tsx), pictures (./things.tsx) and moves
  (./kit.css). Loaded in the browser only (ssr: false), like the library's scenes.
  The five English stories still on the library shelf (a-is-for-adey, grandmas-kitchen,
  hello-feelings, opposites, weather-words) keep their scenes in ../../library.
*/
// Level 1: hello, me and my family
const MyNameIs = dynamic(() => import("./my-name-is"), { ssr: false });
const GoodMorningGugu = dynamic(() => import("./good-morning-gugu"), { ssr: false });
const ThisIsMyFamily = dynamic(() => import("./this-is-my-family"), { ssr: false });
const LaliSays = dynamic(() => import("./lali-says"), { ssr: false });
const HabensRainbowDress = dynamic(() => import("./habens-rainbow-dress"), { ssr: false });
const CountThemHome = dynamic(() => import("./count-them-home"), { ssr: false });
const NameSounds = dynamic(() => import("./name-sounds"), { ssr: false });
const ISpyWithLali = dynamic(() => import("./i-spy-with-lali"), { ssr: false });
const SoundHunt = dynamic(() => import("./sound-hunt"), { ssr: false });
const LetterKite = dynamic(() => import("./letter-kite"), { ssr: false });
const MoveOxMove = dynamic(() => import("./move-ox-move"), { ssr: false });
const WobblyTooth = dynamic(() => import("./wobbly-tooth"), { ssr: false });
const VanToTheVet = dynamic(() => import("./van-to-the-vet"), { ssr: false });
const XMarksTheSpot = dynamic(() => import("./x-marks-the-spot"), { ssr: false });
const SayItSlowly = dynamic(() => import("./say-it-slowly"), { ssr: false });
const RhymeShow = dynamic(() => import("./rhyme-show"), { ssr: false });
const StopTheVan = dynamic(() => import("./stop-the-van"), { ssr: false });
const SnapWords = dynamic(() => import("./snap-words"), { ssr: false });

export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "my-name-is": MyNameIs,
  "good-morning-gugu": GoodMorningGugu,
  "this-is-my-family": ThisIsMyFamily,
  "lali-says": LaliSays,
  "habens-rainbow-dress": HabensRainbowDress,
  "count-them-home": CountThemHome,
  "name-sounds": NameSounds,
  "i-spy-with-lali": ISpyWithLali,
  "sound-hunt": SoundHunt,
  "letter-kite": LetterKite,
  "move-ox-move": MoveOxMove,
  "wobbly-tooth": WobblyTooth,
  "van-to-the-vet": VanToTheVet,
  "x-marks-the-spot": XMarksTheSpot,
  "say-it-slowly": SayItSlowly,
  "rhyme-show": RhymeShow,
  "stop-the-van": StopTheVan,
  "snap-words": SnapWords,
};
