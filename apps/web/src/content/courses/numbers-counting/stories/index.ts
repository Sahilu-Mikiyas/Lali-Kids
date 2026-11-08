import type { Story } from "../../../stories";

import blueMinibus from "./blue-minibus";
import cheekyGoats from "./cheeky-goats";
import coffeeCups from "./coffee-cups";
import countByFives from "./count-by-fives";
import doubleHalf from "./double-half";
import fiveBirds from "./five-birds";
import gugusDay from "./gugus-day";
import hidingSheep from "./hiding-sheep";
import hundredSteps from "./hundred-steps";
import koloStall from "./kolo-stall";
import nothingLeft from "./nothing-left";
import numberHunt from "./number-hunt";
import plusParty from "./plus-party";
import sevenDays from "./seven-days";
import shapeKitchen from "./shape-kitchen";
import steppingStones from "./stepping-stones";
import teffBundles from "./teff-bundles";
import tenAndMore from "./ten-and-more";
import threeSticks from "./three-sticks";
import whoHasMore from "./who-has-more";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [
  // levels 1-3
  coffeeCups,
  numberHunt,
  nothingLeft,
  shapeKitchen,
  threeSticks,
  tenAndMore,
  blueMinibus,
  steppingStones,
  whoHasMore,
  // level 4
  fiveBirds,
  hidingSheep,
  plusParty,
  cheekyGoats,
  // level 5
  koloStall,
  gugusDay,
  sevenDays,
  // level 6
  teffBundles,
  hundredSteps,
  countByFives,
  doubleHalf,
];
