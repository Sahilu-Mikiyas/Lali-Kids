import type { Story } from "../../../stories";
import alwaysRoom from "./always-room";
import ayansRedSandals from "./ayans-red-sandals";
import ballInTheGarden from "./ball-in-the-garden";
import deboDay from "./debo-day";
import gugusMagicWords from "./gugus-magic-words";
import hawiSaysHello from "./hawi-says-hello";
import promiseIsAPromise from "./promise-is-a-promise";
import tallestTower from "./tallest-tower";
import theBestBite from "./the-best-bite";
import threeCupsOfCoffee from "./three-cups-of-coffee";
import tsehaysLittleHands from "./tsehays-little-hands";
import whoAteTheBread from "./who-ate-the-bread";

/** This course's teaching stories, in any order (the course decides the order). */
export const STORIES: Story[] = [
  // Level 1: respect and kindness at home
  tallestTower,
  gugusMagicWords,
  tsehaysLittleHands,
  hawiSaysHello,
  // Level 2: honesty and responsibility
  whoAteTheBread,
  promiseIsAPromise,
  ayansRedSandals,
  ballInTheGarden,
  // Level 3: sharing and hospitality
  theBestBite,
  alwaysRoom,
  threeCupsOfCoffee,
  deboDay,
];
