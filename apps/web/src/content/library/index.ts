import type { Story } from "../stories";

/*
  The story library: one file per story in this folder (src/content/library/<id>.ts), each with a
  default export of type Story. Slots are pre-placed so many stories can be added at the same time
  without merge conflicts: to add yours, uncomment its two lines below (the import and the entry).
  Keep every "slot" comment line exactly as it is.
*/

// --- slot: fidel-be
import fidelBe from "./fidel-be";
// --- slot: fidel-se
import fidelSe from "./fidel-se";
// --- slot: fidel-re
import fidelRe from "./fidel-re";
// --- slot: fidel-te
import fidelTe from "./fidel-te";
// --- slot: fidel-ne
import fidelNe from "./fidel-ne";
// --- slot: ten-tukuls
import tenTukuls from "./ten-tukuls";
// --- slot: shapes-safari
import shapesSafari from "./shapes-safari";
// --- slot: bigger-smaller
import biggerSmaller from "./bigger-smaller";
// --- slot: market-money
import marketMoney from "./market-money";
// --- slot: teff-patterns
import teffPatterns from "./teff-patterns";
// --- slot: a-is-for-adey
import aIsForAdey from "./a-is-for-adey";
// --- slot: opposites
import opposites from "./opposites";
// --- slot: weather-words
import weatherWords from "./weather-words";
// --- slot: grandmas-kitchen
import grandmasKitchen from "./grandmas-kitchen";
// --- slot: hello-feelings
import helloFeelings from "./hello-feelings";
// --- slot: meskel-fire
// import meskelFire from "./meskel-fire";
// --- slot: timket-river
// import timketRiver from "./timket-river";
// --- slot: genna-game
// import gennaGame from "./genna-game";
// --- slot: ashenda-song
// import ashendaSong from "./ashenda-song";
// --- slot: tortoise-race
// import tortoiseRace from "./tortoise-race";
// --- slot: why-hyena-laughs
// import whyHyenaLaughs from "./why-hyena-laughs";
// --- slot: clever-monkey
// import cleverMonkey from "./clever-monkey";
// --- slot: coffee-kaldi
// import coffeeKaldi from "./coffee-kaldi";
// --- slot: big-sneeze
// import bigSneeze from "./big-sneeze";
// --- slot: lost-kite
// import lostKite from "./lost-kite";
// --- slot: learn-to-swim
// import learnToSwim from "./learn-to-swim";
// --- slot: grandpas-krar
// import grandpasKrar from "./grandpas-krar";
// --- slot: biggest-injera
// import biggestInjera from "./biggest-injera";
// --- slot: harar-hyenas
// import hararHyenas from "./harar-hyenas";
// --- slot: new-baby-brother
// import newBabyBrother from "./new-baby-brother";
// --- slot: goodnight-simien
// import goodnightSimien from "./goodnight-simien";
// --- slot: which-way-lali
import whichWayLali from "./which-way-lali";

export const LIBRARY: Story[] = [
  // --- slot: fidel-be
  fidelBe,
  // --- slot: fidel-se
  fidelSe,
  // --- slot: fidel-re
  fidelRe,
  // --- slot: fidel-te
  fidelTe,
  // --- slot: fidel-ne
  fidelNe,
  // --- slot: ten-tukuls
  tenTukuls,
  // --- slot: shapes-safari
  shapesSafari,
  // --- slot: bigger-smaller
  biggerSmaller,
  // --- slot: market-money
  marketMoney,
  // --- slot: teff-patterns
  teffPatterns,
  // --- slot: a-is-for-adey
  aIsForAdey,
  // --- slot: opposites
  opposites,
  // --- slot: weather-words
  weatherWords,
  // --- slot: grandmas-kitchen
  grandmasKitchen,
  // --- slot: hello-feelings
  helloFeelings,
  // --- slot: meskel-fire
  // meskelFire,
  // --- slot: timket-river
  // timketRiver,
  // --- slot: genna-game
  // gennaGame,
  // --- slot: ashenda-song
  // ashendaSong,
  // --- slot: tortoise-race
  // tortoiseRace,
  // --- slot: why-hyena-laughs
  // whyHyenaLaughs,
  // --- slot: clever-monkey
  // cleverMonkey,
  // --- slot: coffee-kaldi
  // coffeeKaldi,
  // --- slot: big-sneeze
  // bigSneeze,
  // --- slot: lost-kite
  // lostKite,
  // --- slot: learn-to-swim
  // learnToSwim,
  // --- slot: grandpas-krar
  // grandpasKrar,
  // --- slot: biggest-injera
  // biggestInjera,
  // --- slot: harar-hyenas
  // hararHyenas,
  // --- slot: new-baby-brother
  // newBabyBrother,
  // --- slot: goodnight-simien
  // goodnightSimien,
  // --- slot: which-way-lali
  whichWayLali,
];
