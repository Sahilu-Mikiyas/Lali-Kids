import type { Course } from "../types";

/* Amharic Readers. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "amharic-readers",
  title: { en: "Amharic Readers", am: "የአማርኛ አንባቢዎች" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["6-7", "8-9"],
  color: "#C2410C",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "amharic-readers-final", questions: [] },
};

export default course;
