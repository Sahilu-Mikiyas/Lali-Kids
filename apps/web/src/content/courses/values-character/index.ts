import type { Course } from "../types";

/* Values & Character. Being written now: see docs/PACKAGES.md. */
const course: Course = {
  id: "values-character",
  title: { en: "Values & Character", am: "ሥነ-ምግባርና መልካም ጠባይ" },
  tagline: { en: "", am: "" },
  outcome: { en: "", am: "" },
  ages: ["3-5", "6-7", "8-9"],
  color: "#D63B72",
  priceEtb: 1500,
  status: "live",
  levels: [],
  finalTest: { id: "values-character-final", questions: [] },
};

export default course;
