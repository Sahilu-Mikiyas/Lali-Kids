/**
 * Our references sent to Chapa. Plan payments, gifts and learning-package purchases have different
 * shapes, so one can never be mistaken for another:
 *   plan     lali-<reader|learner|vip>-<18 hex>
 *   gift     lali-gift-<24 hex>
 *   package  lali-course-<short course code>-<20 hex>
 * The database checks the same thing (0012_gifts.sql, 0016_plans_courses.sql).
 */
export const PLAN_REF = /^lali-(reader|learner|vip)-[0-9a-f]{18}$/;
export const GIFT_REF = /^lali-gift-[0-9a-f]{24}$/;
export const COURSE_REF = /^lali-course-([a-z0-9]{2,10})-[0-9a-f]{20}$/;

export const isPlanRef = (v: unknown): v is string => typeof v === "string" && PLAN_REF.test(v);
export const isGiftRef = (v: unknown): v is string => typeof v === "string" && GIFT_REF.test(v);
export const isCourseRef = (v: unknown): v is string => typeof v === "string" && COURSE_REF.test(v);

/** Short course codes for package references (Chapa allows short references; the ids are long). */
export const COURSE_CODES: Record<string, string> = {
  "fidel-foundations": "fidel",
  "amharic-readers": "amread",
  "numbers-counting": "numbers",
  "maths-explorers": "maths",
  "english-first-words": "engwords",
  "english-readers": "engread",
  "values-character": "values",
  "our-ethiopia": "ethiopia",
  "science-nature": "science",
  "healthy-safe": "healthy",
  // The end-to-end suite's test packages (e2e/fixtures).
  "test-course-a": "testa",
  "test-course-b": "testb",
};

/** The course a package reference is for, or null. */
export function courseOfRef(ref: string): string | null {
  const m = COURSE_REF.exec(ref);
  if (!m) return null;
  return Object.entries(COURSE_CODES).find(([, code]) => code === m[1])?.[0] ?? null;
}
