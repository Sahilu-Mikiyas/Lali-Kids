import type { Story } from "../../../stories";
import fidelSevenHats from "./fidel-seven-hats";
import fidelBoatHa from "./fidel-boat-ha";
import fidelCowLemon from "./fidel-cow-lemon";
import fidelKingSe from "./fidel-king-se";
import fidelShhShiro from "./fidel-shh-shiro";
import fidelFoxKnock from "./fidel-fox-knock";
import fidelCheTrees from "./fidel-che-trees";
import fidelHideNye from "./fidel-hide-nye";
import fidelAName from "./fidel-a-name";
import fidelKeDrums from "./fidel-ke-drums";
import fidelWeWater from "./fidel-we-water";
import fidelZeSwing from "./fidel-ze-swing";
import fidelYeWhose from "./fidel-ye-whose";
import fidelGeGugu from "./fidel-ge-gugu";
import fidelTeCheShoe from "./fidel-te-che-shoe";
import fidelTseSun from "./fidel-tse-sun";
import fidelFePost from "./fidel-fe-post";
import fidelKwaBall from "./fidel-kwa-ball";
import fidelParade from "./fidel-parade";
import fidelWordSpace from "./fidel-word-space";
import fidelLittleBook from "./fidel-little-book";
import fidelExpression from "./fidel-expression";
import fidelShoppingList from "./fidel-shopping-list";

/*
  This course's teaching stories, in any order (the course decides the order).
  The course also uses six stories that live elsewhere: fidel-train (src/content/stories.ts) and
  fidel-be, fidel-se, fidel-re, fidel-te, fidel-ne (src/content/library/).
  All Amharic here is a first draft for a native-speaking editor; each file lists its least-sure lines.
*/
export const STORIES: Story[] = [
  // levels 1–3
  fidelSevenHats,
  fidelBoatHa,
  fidelCowLemon,
  fidelKingSe,
  fidelShhShiro,
  fidelFoxKnock,
  fidelCheTrees,
  fidelHideNye,
  fidelAName,
  // level 4
  fidelKeDrums,
  fidelWeWater,
  fidelZeSwing,
  fidelYeWhose,
  fidelGeGugu,
  // level 5
  fidelTeCheShoe,
  fidelTseSun,
  fidelFePost,
  fidelKwaBall,
  fidelParade,
  // level 6
  fidelWordSpace,
  fidelLittleBook,
  fidelExpression,
  fidelShoppingList,
];
