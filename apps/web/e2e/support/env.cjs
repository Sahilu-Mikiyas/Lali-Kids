/*
  Environment for the end-to-end tests and the speed check: a fake Supabase and Chapa
  (stub-fetch.cjs, preloaded into the server) instead of the live services.
  NEXT_PUBLIC_* values are baked in at build time, so `npm run e2e` builds with these too,
  into its own folder (DIST_DIR) so the real build in .next is left alone.
*/
const path = require("node:path");

const STUB = path.join(__dirname, "stub-fetch.cjs");
const DIST_DIR = ".next-e2e";
const E2E_PORT = 3900;
const PERF_PORT = 3901;
/** Only for the cron test: the hourly job's secret header. */
const CRON_SECRET = "e2e-cron-secret";

const TEST_ENV = {
  NEXT_PUBLIC_SUPABASE_URL: "https://stub.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_stub",
  SUPABASE_SECRET_KEY: "sb_secret_stub",
  CHAPA_SECRET_KEY: "CHASECK_TEST-stub",
  CRON_SECRET,
  SITE_URL: "",
  NEXT_TELEMETRY_DISABLED: "1",
  // Builds the test-only learning packages (e2e/fixtures) into the site; never set elsewhere.
  NEXT_PUBLIC_LALI_E2E: "1",
  NEXT_DIST_DIR: DIST_DIR,
  NODE_OPTIONS: `--require ${STUB}`,
};

exports.STUB = STUB;
exports.DIST_DIR = DIST_DIR;
exports.E2E_PORT = E2E_PORT;
exports.PERF_PORT = PERF_PORT;
exports.CRON_SECRET = CRON_SECRET;
exports.TEST_ENV = TEST_ENV;
