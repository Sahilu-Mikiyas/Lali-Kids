import type { Course } from "../types";

/* Our Ethiopia. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "our-ethiopia",
  title: { en: "Our Ethiopia", am: "ኢትዮጵያችን" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["6-7", "8-9"],
  color: "#15803D",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "our-ethiopia-final", questions: [] },
};

export default course;
