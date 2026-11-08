import type { Course } from "../types";

/* Science & Nature. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "science-nature",
  title: { en: "Science & Nature", am: "ሳይንስና ተፈጥሮ" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["6-7", "8-9"],
  color: "#7C3AED",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "science-nature-final", questions: [] },
};

export default course;
