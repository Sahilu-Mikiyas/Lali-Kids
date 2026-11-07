import { defineConfig, devices } from "@playwright/test";

import { E2E_PORT, TEST_ENV } from "./e2e/support/env.cjs";
import type { TestOptions } from "./e2e/support/fixtures";

/*
  End-to-end tests (e2e/*.spec.ts) against a production build with a fake Supabase and Chapa.
  `npm run e2e` builds (e2e/build.mjs) and runs every test in English and Amharic on a
  390x844 phone. See docs/OPERATIONS.md.
*/
const phone = {
  ...devices["Pixel 7"],
  viewport: { width: 390, height: 844 },
  screen: { width: 390, height: 844 },
  // Chromium's fake microphone, for the "I'll read!" recorder.
  permissions: ["microphone"],
  launchOptions: { args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"] },
};

export default defineConfig<TestOptions>({
  testDir: "./e2e",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  outputDir: "./test-results",
  use: {
    baseURL: `http://localhost:${E2E_PORT}`,
    trace: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: "en", use: { ...phone, locale: "en-GB", uiLang: "en" } },
    { name: "am", use: { ...phone, locale: "am-ET", uiLang: "am" } },
  ],
  webServer: {
    command: `node_modules/.bin/next start -p ${E2E_PORT}`,
    url: `http://localhost:${E2E_PORT}/api/health`,
    env: { ...TEST_ENV, PORT: String(E2E_PORT) },
    reuseExistingServer: false,
    timeout: 60_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
