/*
  Speed on a small, slow phone: 390x844, 4x CPU slowdown, "slow 4G" (150 ms round trip,
  1.6 Mbit/s down, 750 kbit/s up, as Lighthouse's mobile preset). For each page it reports first
  contentful paint, largest contentful paint, the JavaScript downloaded (compressed and not), and
  long tasks (count and total blocking time over 50 ms).

  Run against a production build: `npm run perf` (builds into .next-e2e, starts `next start` with
  the test stubs on port 3901), or PERF_BASE=http://localhost:3000 node e2e/perf.mjs against a
  server you started. Scripts the router prefetches for other pages count too, as on a phone.
  Each page is loaded RUNS times in a fresh context; the median is printed.
*/
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { chromium } from "@playwright/test";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const PORT = (await import("./support/env.cjs")).PERF_PORT;
const BASE = process.env.PERF_BASE || `http://localhost:${PORT}`;
const RUNS = Number(process.env.RUNS || 3);
const PAGES = (process.env.PERF_PAGES || "/,/stories,/stories/lost-moon").split(",");

async function startServer() {
  if (process.env.PERF_BASE) return null;
  const child = spawn(path.join(root, "node_modules/.bin/next"), ["start", "-p", String(PORT)], {
    cwd: root,
    env: { ...process.env, ...(await import("./support/env.cjs")).TEST_ENV, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(`${BASE}/api/health`)).status < 600) return child;
    } catch {}
    await sleep(500);
  }
  child.kill();
  throw new Error("server did not start");
}

async function measure(browser, url) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await ctx.addCookies([{ name: "lali-lang", value: "en", url: BASE }]);
  // The home page's video thumbnails come from YouTube, which a test machine may not reach.
  await ctx.route(/https:\/\/(i\.ytimg\.com|www\.youtube(-nocookie)?\.com)\/.*/, (r) => r.fulfill({ status: 204, body: "" }));
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  // "Before load": the scripts the page itself asks for while loading. The rest is lazy-loaded
  // parts (scenes, the recorder) and the router prefetching other pages' scripts.
  const js = { transfer: 0, decoded: 0, files: 0, beforeLoad: 0 };
  const types = new Map();
  const sentAt = new Map();
  let loadAt = Infinity;
  await cdp.send("Page.enable");
  cdp.on("Page.loadEventFired", (e) => (loadAt = e.timestamp));
  cdp.on("Network.requestWillBeSent", (e) => sentAt.set(e.requestId, e.timestamp));
  cdp.on("Network.responseReceived", (e) => types.set(e.requestId, e.type));
  cdp.on("Network.loadingFinished", (e) => {
    if (types.get(e.requestId) === "Script") {
      js.transfer += e.encodedDataLength;
      js.files++;
      if ((sentAt.get(e.requestId) ?? Infinity) <= loadAt) js.beforeLoad += e.encodedDataLength;
    }
  });
  cdp.on("Network.dataReceived", (e) => {
    if (types.get(e.requestId) === "Script") js.decoded += e.dataLength;
  });

  await page.addInitScript(() => {
    const w = window;
    w.__perf = { lcp: 0, long: 0, tbt: 0 };
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) w.__perf.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        w.__perf.long++;
        w.__perf.tbt += Math.max(0, e.duration - 50);
      }
    }).observe({ type: "longtask", buffered: true });
  });

  await page.goto(BASE + url, { waitUntil: "load", timeout: 120_000 });
  // Let late scripts and paints settle; then a tap ends LCP observation as a real visit would.
  await page.waitForLoadState("networkidle", { timeout: 60_000 }).catch(() => {});
  await sleep(1500);
  const r = await page.evaluate(() => {
    const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
    return { fcp, ...window.__perf };
  });
  await ctx.close();
  return { ...r, jsTransferKB: js.transfer / 1024, jsDecodedKB: js.decoded / 1024, jsFiles: js.files, jsBeforeLoadKB: js.beforeLoad / 1024 };
}

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

const server = await startServer();
const browser = await chromium.launch();
try {
  const rows = [];
  for (const url of PAGES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) runs.push(await measure(browser, url));
    const m = (k) => median(runs.map((r) => r[k]));
    rows.push({
      page: url,
      "FCP ms": Math.round(m("fcp")),
      "LCP ms": Math.round(m("lcp")),
      "JS KB before load (gzip)": Math.round(m("jsBeforeLoadKB")),
      "JS KB all (gzip)": Math.round(m("jsTransferKB")),
      "JS KB all (raw)": Math.round(m("jsDecodedKB")),
      "JS files": m("jsFiles"),
      "long tasks": m("long"),
      "TBT ms": Math.round(m("tbt")),
    });
  }
  console.table(rows);
  if (process.env.PERF_JSON) console.log(JSON.stringify(rows));
} finally {
  await browser.close();
  server?.kill();
}
