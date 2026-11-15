"use client";

import dynamic from "next/dynamic";

import type { Demo } from "../../types";

/*
  The Science & Nature demos, loaded in the browser only. They share ./demo-kit.tsx and
  ./rounds-kit.tsx (copied from Our Ethiopia) and draw with the course's scene kits
  (src/components/book/courses/science-nature/kit-*.tsx).
*/
// Level 1: living things
const BeanTimeLapse = dynamic(() => import("./bean-time-lapse"), { ssr: false });
const LifeCycleWheel = dynamic(() => import("./life-cycle-wheel"), { ssr: false });
const HabitatHomes = dynamic(() => import("./habitat-homes"), { ssr: false });
// Level 2: my body and my senses
const SenseDetective = dynamic(() => import("./sense-detective"), { ssr: false });
const BodyXray = dynamic(() => import("./body-xray"), { ssr: false });
const FoodPlate = dynamic(() => import("./food-plate"), { ssr: false });
// Level 3: materials and changes
const MaterialMatch = dynamic(() => import("./material-match"), { ssr: false });
const FloatOrSink = dynamic(() => import("./float-or-sink"), { ssr: false });
const MeltOrFreeze = dynamic(() => import("./melt-or-freeze"), { ssr: false });
// Level 4: weather, water and seasons
const WaterCycle = dynamic(() => import("./water-cycle"), { ssr: false });
const SaveWater = dynamic(() => import("./save-water"), { ssr: false });
// Level 5: Earth and sky
const DayAndNight = dynamic(() => import("./day-and-night"), { ssr: false });
const MoonPhases = dynamic(() => import("./moon-phases"), { ssr: false });
// Level 6: forces, light, sound and our planet
const MagnetTest = dynamic(() => import("./magnet-test"), { ssr: false });
const SimpleMachines = dynamic(() => import("./simple-machines"), { ssr: false });
const ShadowPlay = dynamic(() => import("./shadow-play"), { ssr: false });

/** This course's interactive demonstrations, by id. Use next/dynamic with { ssr: false } for each. */
export const DEMOS: Record<string, Demo> = {
  "bean-time-lapse": BeanTimeLapse,
  "life-cycle-wheel": LifeCycleWheel,
  "habitat-homes": HabitatHomes,
  "sense-detective": SenseDetective,
  "body-xray": BodyXray,
  "food-plate": FoodPlate,
  "material-match": MaterialMatch,
  "float-or-sink": FloatOrSink,
  "melt-or-freeze": MeltOrFreeze,
  "water-cycle": WaterCycle,
  "save-water": SaveWater,
  "day-and-night": DayAndNight,
  "moon-phases": MoonPhases,
  "magnet-test": MagnetTest,
  "simple-machines": SimpleMachines,
  "shadow-play": ShadowPlay,
};
