import type { Story } from "../../../stories";
import ayansShopLabels from "./ayans-shop-labels";
import gugusTongueTrick from "./gugus-tongue-trick";
import hawisClueHunt from "./hawis-clue-hunt";
import stopTruckStop from "./stop-truck-stop";
import tsehaysTrickyNotes from "./tsehays-tricky-notes";
import anbessasMagicE from "./anbessas-magic-e";
import gugusSweetBeets from "./gugus-sweet-beets";
import waitForTheTrain from "./wait-for-the-train";
import floatBoatFloat from "./float-boat-float";
import whereIsMyHat from "./where-is-my-hat";
import hawisSportsDay from "./hawis-sports-day";
import whereIsDimmet from "./where-is-dimmet";
import kiteInTheTree from "./kite-in-the-tree";
import coffeeSteps from "./coffee-steps";
import cluesForRain from "./clues-for-rain";
import storyHand from "./story-hand";
import whyBecause from "./why-because";
import abdisFourQuestions from "./abdis-four-questions";
import guguGoesShopping from "./gugu-goes-shopping";
import pretendClinic from "./pretend-clinic";
import excuseMeSorry from "./excuse-me-sorry";
import questionJar from "./question-jar";
import bigLetterLittleDot from "./big-letter-little-dot";
import andButChain from "./and-but-chain";
import postcardFromTana from "./postcard-from-tana";
import gugusDiary from "./gugus-diary";

/** This course's teaching stories, in any order (the course decides the order in ../index.ts). */
export const STORIES: Story[] = [
  // level 1: longer words and digraphs
  ayansShopLabels,
  gugusTongueTrick,
  hawisClueHunt,
  stopTruckStop,
  tsehaysTrickyNotes,
  // level 2: long vowels
  anbessasMagicE,
  gugusSweetBeets,
  waitForTheTrain,
  floatBoatFloat,
  // level 3: reading little stories
  whereIsMyHat,
  hawisSportsDay,
  whereIsDimmet,
  kiteInTheTree,
  // level 4: reading for meaning
  coffeeSteps,
  cluesForRain,
  storyHand,
  whyBecause,
  // level 5: talking and asking
  abdisFourQuestions,
  guguGoesShopping,
  pretendClinic,
  excuseMeSorry,
  questionJar,
  // level 6: writing
  bigLetterLittleDot,
  andButChain,
  postcardFromTana,
  gugusDiary,
];
