import type { Story } from "../../../stories";
import alwaysRoom from "./always-room";
import ayansLemonTree from "./ayans-lemon-tree";
import ayansRedSandals from "./ayans-red-sandals";
import ballInTheGarden from "./ball-in-the-garden";
import deboDay from "./debo-day";
import guguAsksForHelp from "./gugu-asks-for-help";
import gugusMagicWords from "./gugus-magic-words";
import habenReadsAloud from "./haben-reads-aloud";
import hawiSaysHello from "./hawi-says-hello";
import hawisFirstBasket from "./hawis-first-basket";
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
  // Level 4: courage and perseverance
  hawisFirstBasket,
  habenReadsAloud,
  guguAsksForHelp,
  ayansLemonTree,
  // Level 5: feelings, forgiveness and friendship
  // Level 6: caring for others and our world
];
