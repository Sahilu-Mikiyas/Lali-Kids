"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the English Readers stories, by story id (story `scene: "lib-<id>"`).
  Each story has its own file here (./<id>.tsx with ./<id>.css); they share the course's kit,
  copied from English First Words: the cast (./cast.tsx), places (./places.tsx), props
  (./props.tsx), pictures (./things.tsx) and moves (./kit.css), plus the new pieces in ./more.tsx
  (./more.css). Loaded in the browser only (ssr: false), like the library's scenes.
*/
// Level 1: longer words and digraphs
const AyansShopLabels = dynamic(() => import("./ayans-shop-labels"), { ssr: false });
const GugusTongueTrick = dynamic(() => import("./gugus-tongue-trick"), { ssr: false });
const HawisClueHunt = dynamic(() => import("./hawis-clue-hunt"), { ssr: false });
const StopTruckStop = dynamic(() => import("./stop-truck-stop"), { ssr: false });
const TsehaysTrickyNotes = dynamic(() => import("./tsehays-tricky-notes"), { ssr: false });
// Level 2: long vowels
const AnbessasMagicE = dynamic(() => import("./anbessas-magic-e"), { ssr: false });
const GugusSweetBeets = dynamic(() => import("./gugus-sweet-beets"), { ssr: false });
const WaitForTheTrain = dynamic(() => import("./wait-for-the-train"), { ssr: false });
const FloatBoatFloat = dynamic(() => import("./float-boat-float"), { ssr: false });
// Level 3: reading little stories
const WhereIsMyHat = dynamic(() => import("./where-is-my-hat"), { ssr: false });
const HawisSportsDay = dynamic(() => import("./hawis-sports-day"), { ssr: false });
const WhereIsDimmet = dynamic(() => import("./where-is-dimmet"), { ssr: false });
const KiteInTheTree = dynamic(() => import("./kite-in-the-tree"), { ssr: false });
// Level 4: reading for meaning
const CoffeeSteps = dynamic(() => import("./coffee-steps"), { ssr: false });
const CluesForRain = dynamic(() => import("./clues-for-rain"), { ssr: false });
const StoryHand = dynamic(() => import("./story-hand"), { ssr: false });
const WhyBecause = dynamic(() => import("./why-because"), { ssr: false });
// Level 5: talking and asking
const AbdisFourQuestions = dynamic(() => import("./abdis-four-questions"), { ssr: false });
const GuguGoesShopping = dynamic(() => import("./gugu-goes-shopping"), { ssr: false });
const PretendClinic = dynamic(() => import("./pretend-clinic"), { ssr: false });
const ExcuseMeSorry = dynamic(() => import("./excuse-me-sorry"), { ssr: false });
const QuestionJar = dynamic(() => import("./question-jar"), { ssr: false });
// Level 6: writing
const BigLetterLittleDot = dynamic(() => import("./big-letter-little-dot"), { ssr: false });
const AndButChain = dynamic(() => import("./and-but-chain"), { ssr: false });
const PostcardFromTana = dynamic(() => import("./postcard-from-tana"), { ssr: false });
const GugusDiary = dynamic(() => import("./gugus-diary"), { ssr: false });

export const SCENES: Record<string, ComponentType<{ page: number }>> = {
  "ayans-shop-labels": AyansShopLabels,
  "gugus-tongue-trick": GugusTongueTrick,
  "hawis-clue-hunt": HawisClueHunt,
  "stop-truck-stop": StopTruckStop,
  "tsehays-tricky-notes": TsehaysTrickyNotes,
  "anbessas-magic-e": AnbessasMagicE,
  "gugus-sweet-beets": GugusSweetBeets,
  "wait-for-the-train": WaitForTheTrain,
  "float-boat-float": FloatBoatFloat,
  "where-is-my-hat": WhereIsMyHat,
  "hawis-sports-day": HawisSportsDay,
  "where-is-dimmet": WhereIsDimmet,
  "kite-in-the-tree": KiteInTheTree,
  "coffee-steps": CoffeeSteps,
  "clues-for-rain": CluesForRain,
  "story-hand": StoryHand,
  "why-because": WhyBecause,
  "abdis-four-questions": AbdisFourQuestions,
  "gugu-goes-shopping": GuguGoesShopping,
  "pretend-clinic": PretendClinic,
  "excuse-me-sorry": ExcuseMeSorry,
  "question-jar": QuestionJar,
  "big-letter-little-dot": BigLetterLittleDot,
  "and-but-chain": AndButChain,
  "postcard-from-tana": PostcardFromTana,
  "gugus-diary": GugusDiary,
};
