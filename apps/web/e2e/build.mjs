/*
  Builds the site for the end-to-end tests and the speed check: the same production build, but
  with the fake Supabase settings from support/env.cjs, into .next-e2e so the real build in
  .next is left alone. Skipped with E2E_SKIP_BUILD=1 (when nothing changed since the last run).
*/
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DIST_DIR, TEST_ENV } from "./support/env.cjs";

if (process.env.E2E_SKIP_BUILD === "1") process.exit(0);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// The stub is only for the running server, not the build.
const { NODE_OPTIONS: _omit, ...env } = TEST_ENV;
void _omit;
const r = spawnSync(path.join(root, "node_modules/.bin/next"), ["build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, ...env, NEXT_DIST_DIR: DIST_DIR },
});
process.exit(r.status ?? 1);
