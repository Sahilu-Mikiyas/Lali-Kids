import { expect, ready, test } from "./support/fixtures";

test("games: free games open in a sealed frame, paid ones are locked without their address", async ({ page, t }) => {
  await page.goto("/games");
  await expect(page.locator('a[href="/games/count-the-flowers"]')).toBeVisible();
  // Paid games come with the Family plan (learner).
  const locked = page.locator('a[href="/subscribe?plan=learner"]', { hasText: "Paid Puzzle" });
  await expect(locked).toContainText(t.games.withFamily);
  expect(await page.content()).not.toContain("games.example.com");

  await page.locator('a[href="/games/count-the-flowers"]').click();
  await ready(page);
  const frame = page.locator("iframe[src='/games/bee-count/index.html']");
  await expect(frame).toBeVisible();
  // Lali's own games run without same-origin rights, so they can't reach the family's session.
  await expect(frame).toHaveAttribute("sandbox", "allow-scripts allow-pointer-lock");
  await expect(page.frameLocator("iframe[src='/games/bee-count/index.html']").locator("body")).not.toBeEmpty();
});

test("games: signed in, the free game plays and the paid one stays closed", async ({ page, signIn }) => {
  await signIn();
  await page.goto("/games/count-the-flowers");
  await ready(page);
  await expect(page.locator("iframe[src='/games/bee-count/index.html']")).toBeVisible();
  // The paid game's page can't be opened without a plan.
  await page.goto("/games/paid-puzzle");
  await expect(page.locator("iframe[src^='https://games.example.com']")).toHaveCount(0);
});
