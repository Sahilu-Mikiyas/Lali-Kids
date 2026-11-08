import type { Course } from "../types";

/* English Readers. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "english-readers",
  title: { en: "English Readers", am: "የእንግሊዝኛ አንባቢዎች" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["6-7", "8-9"],
  color: "#0F766E",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "english-readers-final", questions: [] },
};

export default course;
