import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/*
  Animated scenes for the library stories: one file per story in this folder
  (src/components/book/library/<id>.tsx), default-exporting a component that takes { page }.
  A story uses them with `scene: "lib-<id>"`. Each scene file imports its own CSS file
  (./<id>.css) for its keyframes, so nobody edits globals.css. To add yours, uncomment its
  two lines below. Keep every "slot" comment line exactly as it is.
  Each scene is loaded with next/dynamic, so a page only downloads the scenes of the stories it
  shows. If your branch still has the older `// import X from "./x";` form of a slot line, take
  this `// const X = dynamic(() => import("./x"));` form when merging, then uncomment it.
*/
// Keeps the import in use while every slot is still commented out.
void dynamic;

// --- slot: fidel-be
// const FidelBe = dynamic(() => import("./fidel-be"));
// --- slot: fidel-se
// const FidelSe = dynamic(() => import("./fidel-se"));
// --- slot: fidel-re
// const FidelRe = dynamic(() => import("./fidel-re"));
// --- slot: fidel-te
// const FidelTe = dynamic(() => import("./fidel-te"));
// --- slot: fidel-ne
// const FidelNe = dynamic(() => import("./fidel-ne"));
// --- slot: ten-tukuls
// const TenTukuls = dynamic(() => import("./ten-tukuls"));
// --- slot: shapes-safari
// const ShapesSafari = dynamic(() => import("./shapes-safari"));
// --- slot: bigger-smaller
// const BiggerSmaller = dynamic(() => import("./bigger-smaller"));
// --- slot: market-money
// const MarketMoney = dynamic(() => import("./market-money"));
// --- slot: teff-patterns
// const TeffPatterns = dynamic(() => import("./teff-patterns"));
// --- slot: a-is-for-adey
// const AIsForAdey = dynamic(() => import("./a-is-for-adey"));
// --- slot: opposites
// const Opposites = dynamic(() => import("./opposites"));
// --- slot: weather-words
// const WeatherWords = dynamic(() => import("./weather-words"));
// --- slot: grandmas-kitchen
// const GrandmasKitchen = dynamic(() => import("./grandmas-kitchen"));
// --- slot: hello-feelings
// const HelloFeelings = dynamic(() => import("./hello-feelings"));
// --- slot: meskel-fire
// const MeskelFire = dynamic(() => import("./meskel-fire"));
// --- slot: timket-river
// const TimketRiver = dynamic(() => import("./timket-river"));
// --- slot: genna-game
// const GennaGame = dynamic(() => import("./genna-game"));
// --- slot: ashenda-song
// const AshendaSong = dynamic(() => import("./ashenda-song"));
// --- slot: tortoise-race
// const TortoiseRace = dynamic(() => import("./tortoise-race"));
// --- slot: why-hyena-laughs
// const WhyHyenaLaughs = dynamic(() => import("./why-hyena-laughs"));
// --- slot: clever-monkey
// const CleverMonkey = dynamic(() => import("./clever-monkey"));
// --- slot: coffee-kaldi
// const CoffeeKaldi = dynamic(() => import("./coffee-kaldi"));
// --- slot: big-sneeze
// const BigSneeze = dynamic(() => import("./big-sneeze"));
// --- slot: lost-kite
// const LostKite = dynamic(() => import("./lost-kite"));
// --- slot: learn-to-swim
// const LearnToSwim = dynamic(() => import("./learn-to-swim"));
// --- slot: grandpas-krar
// const GrandpasKrar = dynamic(() => import("./grandpas-krar"));
// --- slot: biggest-injera
// const BiggestInjera = dynamic(() => import("./biggest-injera"));
// --- slot: harar-hyenas
// const HararHyenas = dynamic(() => import("./harar-hyenas"));
// --- slot: new-baby-brother
// const NewBabyBrother = dynamic(() => import("./new-baby-brother"));
// --- slot: goodnight-simien
// const GoodnightSimien = dynamic(() => import("./goodnight-simien"));

export const LIBRARY_SCENES: Record<string, ComponentType<{ page: number }>> = {
  // --- slot: fidel-be
  // "fidel-be": FidelBe,
  // --- slot: fidel-se
  // "fidel-se": FidelSe,
  // --- slot: fidel-re
  // "fidel-re": FidelRe,
  // --- slot: fidel-te
  // "fidel-te": FidelTe,
  // --- slot: fidel-ne
  // "fidel-ne": FidelNe,
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
