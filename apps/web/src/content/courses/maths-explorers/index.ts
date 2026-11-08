import type { Course } from "../types";

/* Maths Explorers. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "maths-explorers",
  title: { en: "Maths Explorers", am: "የሒሳብ አሳሾች" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["6-7", "8-9"],
  color: "#1E40AF",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "maths-explorers-final", questions: [] },
};

export default course;
