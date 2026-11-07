/**
 * Our references sent to Chapa. Plan payments and gifts have different shapes, so one can never
 * be mistaken for the other: a plan ref names a real plan and has 18 hex digits, a gift ref says
 * "gift" and has 24. The database checks the same thing (0012_gifts.sql).
 */
export const PLAN_REF = /^lali-(reader|learner|vip)-[0-9a-f]{18}$/;
export const GIFT_REF = /^lali-gift-[0-9a-f]{24}$/;

export const isPlanRef = (v: unknown): v is string => typeof v === "string" && PLAN_REF.test(v);
export const isGiftRef = (v: unknown): v is string => typeof v === "string" && GIFT_REF.test(v);
