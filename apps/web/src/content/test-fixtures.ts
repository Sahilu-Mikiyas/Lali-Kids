import type { Course } from "./courses/types";
import type { Story } from "./stories";
import { FIXTURE_COURSES, FIXTURE_STORIES } from "../../e2e/fixtures/course";

/*
  The end-to-end suite's test packages (e2e/fixtures). Only the test build sets
  NEXT_PUBLIC_LALI_E2E=1 (e2e/support/env.cjs); everywhere else these lists are empty and the
  fixtures are dropped from the bundle. They are never listed in the catalogue.
*/
export const E2E_FIXTURES = process.env.NEXT_PUBLIC_LALI_E2E === "1";

export const TEST_COURSES: Course[] = E2E_FIXTURES ? FIXTURE_COURSES : [];
export const TEST_STORIES: Story[] = E2E_FIXTURES ? FIXTURE_STORIES : [];
