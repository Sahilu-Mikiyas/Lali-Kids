import type { Course } from "../types";

/* Healthy & Safe. Coming soon: shown in the catalogue only. */
const course: Course = {
  id: "healthy-safe",
  title: { en: "Healthy & Safe", am: "ጤናማና ደህንነቱ የተጠበቀ" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["3-5", "6-7"],
  color: "#EA580C",
  priceEtb: 1500,
  status: "soon",
  levels: [],
  finalTest: { id: "healthy-safe-final", questions: [] },
};

export default course;
