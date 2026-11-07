"use client";

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
  this `// const X = dynamic(() => import("./x"), { ssr: false });` form when merging, then uncomment it.
*/
// Keeps the import in use while every slot is still commented out.
void dynamic;

/*
  Scenes load in the browser only (ssr: false). Rendering them on the server too made the first
  browser render differ from the server's while a scene's code was still loading (a hydration
  error). Until a scene arrives, its picture area just shows the story's colour. (The options must
  be written inline as an object literal for next/dynamic.)
*/

// --- slot: fidel-be
const FidelBe = dynamic(() => import("./fidel-be"), { ssr: false });
// --- slot: fidel-se
const FidelSe = dynamic(() => import("./fidel-se"), { ssr: false });
// --- slot: fidel-re
const FidelRe = dynamic(() => import("./fidel-re"), { ssr: false });
// --- slot: fidel-te
const FidelTe = dynamic(() => import("./fidel-te"), { ssr: false });
// --- slot: fidel-ne
const FidelNe = dynamic(() => import("./fidel-ne"), { ssr: false });
// --- slot: ten-tukuls
const TenTukuls = dynamic(() => import("./ten-tukuls"), { ssr: false });
// --- slot: shapes-safari
const ShapesSafari = dynamic(() => import("./shapes-safari"), { ssr: false });
// --- slot: bigger-smaller
const BiggerSmaller = dynamic(() => import("./bigger-smaller"), { ssr: false });
// --- slot: market-money
const MarketMoney = dynamic(() => import("./market-money"), { ssr: false });
// --- slot: teff-patterns
const TeffPatterns = dynamic(() => import("./teff-patterns"), { ssr: false });
// --- slot: a-is-for-adey
const AIsForAdey = dynamic(() => import("./a-is-for-adey"), { ssr: false });
// --- slot: opposites
const Opposites = dynamic(() => import("./opposites"), { ssr: false });
// --- slot: weather-words
const WeatherWords = dynamic(() => import("./weather-words"), { ssr: false });
// --- slot: grandmas-kitchen
const GrandmasKitchen = dynamic(() => import("./grandmas-kitchen"), { ssr: false });
// --- slot: hello-feelings
const HelloFeelings = dynamic(() => import("./hello-feelings"), { ssr: false });
// --- slot: meskel-fire
const MeskelFire = dynamic(() => import("./meskel-fire"), { ssr: false });
// --- slot: timket-river
const TimketRiver = dynamic(() => import("./timket-river"), { ssr: false });
// --- slot: genna-game
const GennaGame = dynamic(() => import("./genna-game"), { ssr: false });
// --- slot: ashenda-song
const AshendaSong = dynamic(() => import("./ashenda-song"), { ssr: false });
// --- slot: tortoise-race
const TortoiseRace = dynamic(() => import("./tortoise-race"), { ssr: false });
// --- slot: why-hyena-laughs
const WhyHyenaLaughs = dynamic(() => import("./why-hyena-laughs"), { ssr: false });
// --- slot: clever-monkey
const CleverMonkey = dynamic(() => import("./clever-monkey"), { ssr: false });
// --- slot: coffee-kaldi
const CoffeeKaldi = dynamic(() => import("./coffee-kaldi"), { ssr: false });
// --- slot: big-sneeze
const BigSneeze = dynamic(() => import("./big-sneeze"), { ssr: false });
// --- slot: lost-kite
const LostKite = dynamic(() => import("./lost-kite"), { ssr: false });
// --- slot: learn-to-swim
const LearnToSwim = dynamic(() => import("./learn-to-swim"), { ssr: false });
// --- slot: grandpas-krar
const GrandpasKrar = dynamic(() => import("./grandpas-krar"), { ssr: false });
// --- slot: biggest-injera
const BiggestInjera = dynamic(() => import("./biggest-injera"), { ssr: false });
// --- slot: harar-hyenas
const HararHyenas = dynamic(() => import("./harar-hyenas"), { ssr: false });
// --- slot: new-baby-brother
const NewBabyBrother = dynamic(() => import("./new-baby-brother"), { ssr: false });
// --- slot: goodnight-simien
const GoodnightSimien = dynamic(() => import("./goodnight-simien"), { ssr: false });
// --- slot: which-way-lali
const WhichWayLali = dynamic(() => import("./which-way-lali"), { ssr: false });

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
  "ten-tukuls": TenTukuls,
  // --- slot: shapes-safari
  "shapes-safari": ShapesSafari,
  // --- slot: bigger-smaller
  "bigger-smaller": BiggerSmaller,
  // --- slot: market-money
  "market-money": MarketMoney,
  // --- slot: teff-patterns
  "teff-patterns": TeffPatterns,
  // --- slot: a-is-for-adey
  "a-is-for-adey": AIsForAdey,
  // --- slot: opposites
  "opposites": Opposites,
  // --- slot: weather-words
  "weather-words": WeatherWords,
  // --- slot: grandmas-kitchen
  "grandmas-kitchen": GrandmasKitchen,
  // --- slot: hello-feelings
  "hello-feelings": HelloFeelings,
  // --- slot: meskel-fire
  "meskel-fire": MeskelFire,
  // --- slot: timket-river
  "timket-river": TimketRiver,
  // --- slot: genna-game
  "genna-game": GennaGame,
  // --- slot: ashenda-song
  "ashenda-song": AshendaSong,
  // --- slot: tortoise-race
  "tortoise-race": TortoiseRace,
  // --- slot: why-hyena-laughs
  "why-hyena-laughs": WhyHyenaLaughs,
  // --- slot: clever-monkey
  "clever-monkey": CleverMonkey,
  // --- slot: coffee-kaldi
  "coffee-kaldi": CoffeeKaldi,
  // --- slot: big-sneeze
  "big-sneeze": BigSneeze,
  // --- slot: lost-kite
  "lost-kite": LostKite,
  // --- slot: learn-to-swim
  "learn-to-swim": LearnToSwim,
  // --- slot: grandpas-krar
  "grandpas-krar": GrandpasKrar,
  // --- slot: biggest-injera
  "biggest-injera": BiggestInjera,
  // --- slot: harar-hyenas
  "harar-hyenas": HararHyenas,
  // --- slot: new-baby-brother
  "new-baby-brother": NewBabyBrother,
  // --- slot: goodnight-simien
  "goodnight-simien": GoodnightSimien,
  // --- slot: which-way-lali
  "which-way-lali": WhichWayLali,
};
