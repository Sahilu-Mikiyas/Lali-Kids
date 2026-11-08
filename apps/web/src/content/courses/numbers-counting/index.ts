import type { Course } from "../types";

/* Numbers & Counting. Being written now: see docs/PACKAGES.md. */
const course: Course = {
  id: "numbers-counting",
  title: { en: "Numbers & Counting", am: "ቁጥሮችና መቁጠር" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["3-5", "6-7"],
  color: "#2F5BD3",
  priceEtb: 1500,
  status: "live",
  levels: [],
  finalTest: { id: "numbers-counting-final", questions: [] },
};

export default course;
