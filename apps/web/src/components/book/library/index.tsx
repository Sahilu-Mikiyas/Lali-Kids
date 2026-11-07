import type { ComponentType } from "react";

/*
  Animated scenes for the library stories: one file per story in this folder
  (src/components/book/library/<id>.tsx), default-exporting a component that takes { page }.
  A story uses them with `scene: "lib-<id>"`. Each scene file imports its own CSS file
  (./<id>.css) for its keyframes, so nobody edits globals.css. To add yours, uncomment its
  two lines below. Keep every "slot" comment line exactly as it is.
*/

// --- slot: fidel-be
import FidelBe from "./fidel-be";
// --- slot: fidel-se
import FidelSe from "./fidel-se";
// --- slot: fidel-re
import FidelRe from "./fidel-re";
// --- slot: fidel-te
import FidelTe from "./fidel-te";
// --- slot: fidel-ne
import FidelNe from "./fidel-ne";
// --- slot: ten-tukuls
// import TenTukuls from "./ten-tukuls";
// --- slot: shapes-safari
// import ShapesSafari from "./shapes-safari";
// --- slot: bigger-smaller
// import BiggerSmaller from "./bigger-smaller";
// --- slot: market-money
// import MarketMoney from "./market-money";
// --- slot: teff-patterns
// import TeffPatterns from "./teff-patterns";
// --- slot: a-is-for-adey
// import AIsForAdey from "./a-is-for-adey";
// --- slot: opposites
// import Opposites from "./opposites";
// --- slot: weather-words
// import WeatherWords from "./weather-words";
// --- slot: grandmas-kitchen
// import GrandmasKitchen from "./grandmas-kitchen";
// --- slot: hello-feelings
// import HelloFeelings from "./hello-feelings";
// --- slot: meskel-fire
// import MeskelFire from "./meskel-fire";
// --- slot: timket-river
// import TimketRiver from "./timket-river";
// --- slot: genna-game
// import GennaGame from "./genna-game";
// --- slot: ashenda-song
// import AshendaSong from "./ashenda-song";
// --- slot: tortoise-race
// import TortoiseRace from "./tortoise-race";
// --- slot: why-hyena-laughs
// import WhyHyenaLaughs from "./why-hyena-laughs";
// --- slot: clever-monkey
// import CleverMonkey from "./clever-monkey";
// --- slot: coffee-kaldi
// import CoffeeKaldi from "./coffee-kaldi";
// --- slot: big-sneeze
// import BigSneeze from "./big-sneeze";
// --- slot: lost-kite
// import LostKite from "./lost-kite";
// --- slot: learn-to-swim
// import LearnToSwim from "./learn-to-swim";
// --- slot: grandpas-krar
// import GrandpasKrar from "./grandpas-krar";
// --- slot: biggest-injera
// import BiggestInjera from "./biggest-injera";
// --- slot: harar-hyenas
// import HararHyenas from "./harar-hyenas";
// --- slot: new-baby-brother
// import NewBabyBrother from "./new-baby-brother";
// --- slot: goodnight-simien
// import GoodnightSimien from "./goodnight-simien";

export const LIBRARY_SCENES: Record<string, ComponentType<{ page: number }>> = {
  // --- slot: fidel-be
  "fidel-be": FidelBe,
  // --- slot: fidel-se
  "fidel-se": FidelSe,
  // --- slot: fidel-re
  "fidel-re": FidelRe,
  // --- slot: fidel-te
  "fidel-te": FidelTe,
  // --- slot: fidel-ne
  "fidel-ne": FidelNe,
  // --- slot: ten-tukuls
  // "ten-tukuls": TenTukuls,
  // --- slot: shapes-safari
  // "shapes-safari": ShapesSafari,
  // --- slot: bigger-smaller
  // "bigger-smaller": BiggerSmaller,
  // --- slot: market-money
  // "market-money": MarketMoney,
  // --- slot: teff-patterns
  // "teff-patterns": TeffPatterns,
  // --- slot: a-is-for-adey
  // "a-is-for-adey": AIsForAdey,
  // --- slot: opposites
  // "opposites": Opposites,
  // --- slot: weather-words
  // "weather-words": WeatherWords,
  // --- slot: grandmas-kitchen
  // "grandmas-kitchen": GrandmasKitchen,
  // --- slot: hello-feelings
  // "hello-feelings": HelloFeelings,
  // --- slot: meskel-fire
  // "meskel-fire": MeskelFire,
  // --- slot: timket-river
  // "timket-river": TimketRiver,
  // --- slot: genna-game
  // "genna-game": GennaGame,
  // --- slot: ashenda-song
  // "ashenda-song": AshendaSong,
  // --- slot: tortoise-race
  // "tortoise-race": TortoiseRace,
  // --- slot: why-hyena-laughs
  // "why-hyena-laughs": WhyHyenaLaughs,
  // --- slot: clever-monkey
  // "clever-monkey": CleverMonkey,
  // --- slot: coffee-kaldi
  // "coffee-kaldi": CoffeeKaldi,
  // --- slot: big-sneeze
  // "big-sneeze": BigSneeze,
  // --- slot: lost-kite
  // "lost-kite": LostKite,
  // --- slot: learn-to-swim
  // "learn-to-swim": LearnToSwim,
  // --- slot: grandpas-krar
  // "grandpas-krar": GrandpasKrar,
  // --- slot: biggest-injera
  // "biggest-injera": BiggestInjera,
  // --- slot: harar-hyenas
  // "harar-hyenas": HararHyenas,
  // --- slot: new-baby-brother
  // "new-baby-brother": NewBabyBrother,
  // --- slot: goodnight-simien
  // "goodnight-simien": GoodnightSimien,
};
