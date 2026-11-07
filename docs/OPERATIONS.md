# Running Lali: alerts, health, tests and speed

## Error alerts on Telegram

Errors are sent to the **admins' Telegram**: every profile with `role = 'admin'` that has connected
Telegram in the Grown-ups' corner (the same bot as the parents' reminders, `docs/TELEGRAM.md`).

- **Server errors.** `src/instrumentation.ts` (`onRequestError`) catches errors in pages, route
  handlers, server actions and the proxy. The mobile API and the Chapa callback, which catch their
  own errors, report them too (`reportServerError` in `src/lib/alerts.ts`).
- **Browser errors.** `src/components/error-reporter.tsx` (in the root layout) sends uncaught errors
  and rejected promises to `POST /api/client-error`; `src/app/[lang]/error.tsx` shows families a
  calm "Something went wrong" page with *Try again* and reports what broke.
- **What an alert holds.** Server or browser, the method and path **without the query string**, the
  error message, and for browser errors the script file and line. Anything that looks like an
  email, a gift code, a payment reference, a token, a key or an id is blanked. No IP, user, cookie
  or header is sent or stored.
- **Limits.** The same error at most once every 15 minutes (the next alert says how many repeats
  there were), 30 alerts an hour in all. `/api/client-error` takes at most 2 KB, 10 reports a minute
  per address and 120 in all, and always answers `204`. Browser-extension noise is dropped.
- **No bot, no problem.** Without `TELEGRAM_BOT_TOKEN`, `SUPABASE_SECRET_KEY` or a connected admin,
  nothing is sent and nothing else changes. Errors are always written to the Render log too
  (`[error] …`).

To receive alerts: sign in with the admin account, open the Grown-ups' corner, press **Connect
Telegram**. To test: in Render's shell, or locally against the live site,
`curl -X POST https://lali-kids.onrender.com/api/client-error -H 'content-type: application/json' -d '{"message":"Test alert","path":"/test"}'`
(a browser alert for `/test` arrives within seconds).

## Health check

`GET /api/health` (no sign-in, never cached):

| Answer | Meaning |
|---|---|
| `200 {"ok":true,"database":"reachable","ms":…}` | The site is up and read one public row from the database. |
| `503 {"ok":false,"database":"unreachable","ms":…}` | The site is up but the database didn't answer within 3 seconds. |
| `200 {"ok":true,"database":"not configured"}` | Supabase settings are missing (local builds). |
| No answer / Render error page | The site itself is down. |

Point an uptime monitor (UptimeRobot, Better Stack, or Render's own health check path) at it,
every 5 minutes, alerting on anything but 200. On Render: **lali-kids → Settings → Health Check
Path** = `/api/health`.

## The hourly job's secret

`/api/cron/notify` (reminders, weekly notes, removing deleted families' voice files) only sends what
is due, so extra calls do no harm, but once set up only the database's job can run it:

1. Apply `supabase/migrations/0013_prelaunch_fixes.sql` (the job then sends an empty header).
2. In the Supabase SQL editor, once (choose your own long random value; don't commit or paste it in
   chat): `select vault.create_secret('<random value>', 'lali_cron_secret');`
3. In Render: **lali-kids → Environment**, add `CRON_SECRET` with the same value.

From then on other callers get `403`. To check: `select status, return_message, start_time from
cron.job_run_details order by start_time desc limit 5;` and, for the HTTP answer,
`select status_code, content from net._http_response order by created desc limit 5;`.

Also set `SITE_URL=https://lali-kids.onrender.com` (or the real domain later): it is used for
Chapa's return links, sign-in emails, the bot's webhook and the links in Telegram messages.

## What to do when…

**The site is down** (monitor: no answer). Render dashboard → lali-kids → *Events* and *Logs*. A
failed deploy: *Rollback* to the last good one. Out of memory: look for large uploads in the logs;
restart (*Manual Deploy → Restart service*). Free instances sleep: the first visit takes ~1 minute.

**The database is unreachable** (`503` from `/api/health`). status.supabase.com; the Supabase
dashboard (a paused project needs *Restore*). Families see errors; payments stay safe because
Chapa's callback is retried and the return page can be opened again.

**A family paid but the plan isn't open.** Find the payment: `select tx_ref, status, created_at
from payments where family_id = '<id>' order by created_at desc;`. If it is `pending`, opening
`https://lali-kids.onrender.com/subscribe/done?tx_ref=<tx_ref>` asks Chapa again and adds the days
if Chapa says it succeeded (it can't count twice). For a gift, use **/admin/gifts → Check with
Chapa**. If Chapa itself says failed, the family wasn't charged; ask them to try again.

**Reminders or weekly notes stopped.** Check the job (queries above). `403`: `CRON_SECRET` on
Render and the Vault secret differ. Telegram errors in the Render log (`[telegram] … failed`): the
bot token was revoked; set the new one, and the webhook is re-registered within the hour.

**Alerts flood in.** The same error is grouped (one per 15 minutes); a storm is capped at 30 an hour.
Open the Render log for the full error, fix or roll back. Browser alerts can be sent by anyone
(that's how browsers report), so a burst from one page with an odd message may be noise.

**A family asks to delete their account.** They can do it themselves in the Grown-ups' corner
(type DELETE / ሰርዝ). It removes the sign-in, children, stars, settings, Telegram link and voice
recordings; payments stay for the accounts, without the family. An admin can also delete the user
in Supabase → Authentication; the hourly job then removes their voice files.

**A secret leaked.** Supabase secret key: create a new one (Settings → API keys), set
`SUPABASE_SECRET_KEY` on Render, delete the old key. Book-page links and the app's read passes are
derived from it (or from `PAGE_TOKEN_SECRET`) and stop working at once, which is fine. Chapa key:
roll it in the Chapa dashboard, update `CHAPA_SECRET_KEY`. Bot token: `/revoke` in @BotFather, update
`TELEGRAM_BOT_TOKEN`.

**Someone is scraping partner books.** `select family_id, count(*) from page_views where viewed_at >
now() - interval '1 day' group by 1 order by 2 desc limit 10;`. The watermark on each page shows the
account's last 4 characters. Pages are limited to 40 a minute per family.

## End-to-end tests

`cd apps/web && npm run e2e` builds the site into `.next-e2e` with fake settings and runs
`e2e/*.spec.ts` with Playwright on a 390×844 phone, once in English and once in Amharic, on port
3900 (about 3 minutes with the build; `E2E_SKIP_BUILD=1 npm run e2e` reuses the last build). Nothing
reaches Supabase, Chapa, Telegram or YouTube: `e2e/support/stub-fetch.cjs` is preloaded into the
server and fakes them in memory, and the browser gets stand-ins for Chapa's page and YouTube. Each
test signs in as its own new family (`stub.<uuid>.parent` / `.admin` tokens), so they run in
parallel. Tests fail on any uncaught page error or Content-Security-Policy violation.

Covered: home and the language switch; the shelf (age filter, locks, no paid words in any page or
script); reading a free story to The End with Find Lali and the sticker; the record-and-listen
microphone (Chromium's fake microphone); sign-in with a code, wrong codes, `next=` redirects; plans
and the Chapa hand-off and return; forged references; a gift from payment to redemption, and a
second redemption refused; the Grown-ups' corner (maths gate, add a child, delete the account);
admin pages refused to parents; games; the 404 page; security headers; health, client errors, the
cron secret, the Telegram webhook, the mobile API (locks, tokens, one family can't touch another's
child or game session), read passes, voices and stickers signed out.

When a test fails, `npx playwright show-trace test-results/<test>/trace.zip` replays it.

## Speed

`cd apps/web && npm run perf` (or `E2E_SKIP_BUILD=1 npm run perf`) loads the home page, the shelf
and a story on a 390×844 phone with 4× CPU slowdown and "slow 4G" (150 ms, 1.6 Mbit/s), on a
production build with the same fake services, and prints the median of each figure.

Before and after this review (median of 6 loads each, before and after measured alternately on the
same machine; "before load" is the JavaScript the page asks for while it loads, "all" adds
lazy-loaded parts and scripts prefetched for other pages):

| Page | FCP | LCP | JS before load (gzip) | JS all (gzip / raw) | Long tasks / TBT |
|---|---|---|---|---|---|
| Home `/` | 1,908 → **1,596 ms** | 1,908 → **1,596 ms** | 406 → **354 KB** | 406 → 354 KB / 1,336 → 1,062 KB | 30 / 858 ms → 38 / 952 ms |
| Shelf `/stories` | 1,776 → **1,468 ms** | 1,776 → **1,468 ms** | 357 → **334 KB** | 411 → 447 KB / 1,350 → 1,347 KB | 36 / 989 ms → 43 / 1,182 ms |
| Story `/stories/lost-moon` | 1,160 → **964 ms** | 4,240 → **3,984 ms** | 354 → 413 KB | 429 → **413 KB** / 1,398 → **1,224 KB** | 5 / 375 ms → 5 / 298 ms |

Blocking time varies by ±40 % between runs on a shared machine; read it as "about the same".

What changed:
- **Scenes load per story** (`src/components/scenes.tsx` and the library registry
  `src/components/book/library/index.tsx` use `next/dynamic`): a story page downloads only its own
  pictures. Before, every page carried every story's scenes and text in one 435 KB script, and each
  of the 31 library stories would have added about 40 KB more to *every* page.
- **No story text in shared scripts** (finding H1), which also took ~50 KB (gzip) off the home page.
- **The 200 KB Ethiopic font is no longer preloaded** on every page; Amharic pages fetch it as
  soon as their text needs it (text shows at once with the fallback font). This is most of the
  earlier first paint.
- The grown-ups' recorder, the music button and the following bee load after the page.

Still slow: the story page's largest paint (~4 s) is the page's words, which fade in word by word
once the page's JavaScript has run; showing the words before that would need a change to the
reading design. The shelf now prefetches each story's scripts after load (more data, faster
opening); `prefetch={false}` on the shelf cards would save data on metered connections.
