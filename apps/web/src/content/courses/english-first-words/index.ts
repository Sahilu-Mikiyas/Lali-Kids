import type { Course } from "../types";

/* English First Words. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "english-first-words",
  title: { en: "English First Words", am: "የመጀመሪያ የእንግሊዝኛ ቃላት" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["3-5", "6-7"],
  color: "#0E8C80",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "english-first-words-final", questions: [] },
};

export default course;
