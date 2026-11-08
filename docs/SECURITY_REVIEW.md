# Pre-launch security review

Phase 1 of `docs/LAUNCH_PLAN.md`. Every route handler, server action, the proxy, the mobile API,
and every SQL function and policy in `supabase/migrations/0001`–`0012` were read. Findings are
ranked by severity; each has the risk and what was changed. Database changes are in
`supabase/migrations/0013_prelaunch_fixes.sql`, **which is not applied yet** (see the end).

The end-to-end suite (`apps/web/e2e`, `npm run e2e`) checks most of these fixes on every run.

## High

### H1. The words of every paid story were in the public JavaScript
- **Finding.** Three browser components imported `src/content/stories.ts`: the shelf card (for the
  small `agesLabel` helper), and the home page's cinema and parents' sections (for titles and a
  colour). That pulled the whole module, with the text of all nine launch stories and, as they are
  added, all 31 library stories, into a 435 KB script loaded by the home page, the shelf and every
  story page. Anyone could read the paid stories without a plan by opening the script.
- **Fix.** `agesLabel` now lives in `src/lib/ages.ts`; the shelf card imports `PageArt` directly
  instead of through the whole storybook; the home page (a server component) passes the cinema
  only ids, titles, colours and page counts. The test *"paid stories' words are in no page and no
  script a visitor downloads"* downloads every script of the home page, the shelf and two story
  pages and fails if any paid page's text is in one.

### H2. Anyone could move the Telegram bot's webhook and the links in its messages
- **Finding.** `/api/cron/notify` takes no secret (pg_cron calls it), and it built the site's address
  from the request's `Host` / `X-Forwarded-Host` headers. It then (a) called Telegram's `setWebhook`
  with that address and the webhook secret, and (b) put it in the "Add 30 days" and "Open the
  stories" buttons sent to every connected parent. One request with a forged header could send all
  messages people write to the bot (including one-time link codes) to another site, together with
  the secret, and make the next reminders point families to a phishing payment page.
- **Fix.** The job uses `canonicalOrigin()` (`SITE_URL`, else `https://lali-kids.onrender.com`),
  never request headers. When `CRON_SECRET` is set on Render, the endpoint also requires it in the
  `x-lali-cron` header (timing-safe compare); 0013 makes the hourly job send it from Supabase Vault.
  Until both are set the job works as before (setup in `docs/OPERATIONS.md`).

## Medium

### M1. Open redirects after sign-in
- **Finding.** `/login?next=//evil.example` sent an already signed-in visitor straight to another
  site (only `startsWith("/")` was checked). `/auth/callback` and the sign-in action rejected `//`
  but not `/\evil.example`, which browsers read as `//evil.example`: an attacker could request a
  genuine Lali sign-in email for a parent whose link ends on their site. The sign-in action also
  built the email's link from the browser's `Origin` header.
- **Fix.** `src/lib/safe-next.ts` accepts only a path that resolves to this site (no `//`, no `\`,
  no control characters); used by the login page, the sign-in action and the callback. The email
  link now uses the site's own address (`originFrom`, i.e. `SITE_URL` when set). The `lali://auth`
  hand-off only forwards a code-shaped value and a truncated error.

### M2. Partner-book rate limit and audit trail could be skipped
- **Finding.** `/api/books/[id]/pages/[page]` counts `page_views` to allow 40 pages a minute, then
  records the view. The IP came from the first `X-Forwarded-For` entry, which the visitor controls;
  a value like `x` made the insert fail (the `ip` column is `inet`), silently, so the page was served
  without being counted. A family could download whole books at full speed with no trace.
- **Fix.** `clientIp()` (`src/lib/rate-limit.ts`) keeps only a valid IP (the last one, which the
  proxy adds), and a page is only served once its view is recorded (503 otherwise).

### M3. The sign-in session cookies could be read by scripts and travelled without `Secure`
- **Finding.** `@supabase/ssr` sets its cookies with `httpOnly: false` and no `Secure` by default.
  Nothing in the browser reads them (the site only talks to Supabase from the server), so any
  injected script could have taken over the session.
- **Fix.** `src/lib/supabase/cookie-options.ts` (`HttpOnly`, `Secure` in production, `SameSite=Lax`),
  used by the proxy and the server client. The sign-in test checks the cookie is `HttpOnly`. Note:
  `src/lib/supabase/client.ts` (a browser client, unused today) would no longer see the session.

### M4. No security headers (clickjacking, CSP)
- **Finding.** No `Content-Security-Policy`, no frame protection, no `nosniff`, no referrer policy,
  `X-Powered-By` sent. Any site could frame the Grown-ups' corner or plans page.
- **Fix.** `next.config.ts` sends on every page: a basic CSP (`default-src 'self'`; scripts and
  styles from the site only, `'unsafe-inline'` because Next's inline scripts need it without
  nonces; images `https:`; audio from Supabase Storage; frames `'self' https:` for the
  youtube-nocookie embeds and admins' HTTPS games; Google Fonts allowed; `object-src 'none'`;
  `base-uri 'self'`; `form-action 'self' https://checkout.chapa.co`; `frame-ancestors 'self'`),
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` (read
  passes in story addresses don't leak to other sites), `Permissions-Policy` (microphone for the
  site itself only), `Cross-Origin-Opener-Policy: same-origin-allow-popups`, and HSTS in
  production. The app's web view loads the reader as a top-level page, so `frame-ancestors` doesn't
  affect it. Lali's own games (`/games/<name>/…`) are excluded from frame protection because the
  site and the app's web build show them in frames. Every end-to-end test fails on a CSP violation.

### M5. Parents could write any column of their children and finished stories directly
- **Finding.** The policies on `children` and `completions` are `for all`, and Supabase grants all
  columns to signed-in users, so with the publishable key a parent could set `stars` to anything,
  insert completions with any date or a megabyte-long id (fake stickers, fake weekly notes,
  storage abuse). Only their own family's rows, but still not what the site allows.
- **Fix (0013).** Column grants: `children` insert (family, name, age group, language, avatar) and
  update (name, age group, language, avatar); `completions` insert (child, type, id) and update
  (`completed_at`, which "Allow more tonight" moves). New-row checks: child names 1–40 characters,
  story ids 1–100 characters. The website and the app now also refuse ids that aren't story ids.

### M6. Gift checkout could be flooded
- **Finding.** `/gift` needs no account; every press creates a `gifts` row and a Chapa checkout,
  with no limit.
- **Fix.** 10 gift checkouts per IP per 10 minutes and 200 in all; plan checkouts 10 per family per
  10 minutes (`src/lib/rate-limit.ts`, in memory; the message is the new `ops.tooMany`).

## Low

| # | Finding | Fix |
|---|---|---|
| L1 | Mobile `GET books/:slug` handed out links for any page range at once | At most 20 pages per call (`docs/MOBILE.md`; the app asks for 6) |
| L2 | The browser was sent to whatever `checkout_url` Chapa's API returned | Only `https://…chapa.co` addresses are followed |
| L3 | Family voices had no storage cap per family | 1,500 recordings per family (each ≤ 4 MB, ≤ 60 s) |
| L4 | `recordStoryFinished` and mobile `POST progress` accepted any string | Story-id shape required |
| L5 | `src/lib/supabase/server.ts` (secret-key client) wasn't marked server-only | `import "server-only"` |
| L6 | Wrong codes are counted when `/gift/redeem?code=` is opened | Not changed (needs a signed-in family; 10 per hour) |
| L7 | `X-Powered-By: Next.js` | `poweredByHeader: false` |

Two bugs found on the way (not security): "Allow more tonight" on the website used the server's
midnight (UTC) instead of Addis Ababa's, so it did nothing between 00:00 and 03:00 in Addis; and the
Grown-ups' gate drew its random sum on the server and again in the browser, a hydration error
(React #418) on every visit, which the new error alerts would have reported each time. Both fixed.

## Checked and found sound

- **Row-level security** is on for every table. Families read only their own rows; payments,
  subscriptions, gifts, game sessions, finds, sticker positions, recordings, reader stars and
  narration are written only by the server (`revoke … from anon, authenticated` in 0009/0011, and
  for the rest in 0013). `profiles` updates are limited to the settings columns (0008/0011), so a
  parent can't make themselves admin or set a Telegram chat.
- **Security-definer functions** all `set search_path = public`; every one except `is_admin()` (which
  only says whether the caller is an admin) has `execute` revoked from `public, anon, authenticated`.
- **Payments.** Access is granted only after the server asks Chapa's verify endpoint: status
  success, currency ETB, the same `tx_ref`, amount ≥ price (checked again in `activate_payment` /
  `mark_gift_paid`). Each reference counts once (`status = 'pending'` in the same `update`), so the
  callback and the return page together, or a replay, can't add days twice. Plan refs (18 hex) and
  gift refs (24 hex) are told apart in code and by a database check. A forged callback only makes
  the server ask Chapa again.
- **Gifts.** 31⁸ codes from `crypto.randomInt`; shown only after payment; redeemed once in one
  statement; wrong codes limited to 10 an hour per family; giver's message rendered as text (test).
- **Ownership before the secret key.** Every `createSupabaseAdmin()` use was traced: game sessions
  are looked up with `family_id` of the signed-in family; the reading child always comes from the
  family's own children (RLS), whatever `X-Lali-Child` says; voice deletes filter on `family_id`;
  voice and narration storage paths are built on the server from validated parts (no `..`
  possible); story, narration and book links are signed only after `storyForReading` /
  `storyOpenFor` / `has_active_subscription`. The e2e suite checks one family can't pick, delete or
  update another family's child or game session.
- **Admin.** Every admin page and server action calls `requireAdmin()` (role read from the
  database), `/api/admin/narration` uses `requestAdmin`; a parent is redirected (test).
- **Paid content.** Locked shelf cards and locked stories carry title and cover only, on the website
  and in the mobile API (test). Links: story pictures and narration 1 hour, family voices 30 min,
  book pages 90 s (watermarked, `no-store`), read passes 6 h and tied to one family and story, with
  the plan checked again on use.
- **Telegram.** The webhook requires the secret Telegram echoes back (timing-safe); everything
  user-written in messages (names, giver names) is HTML-escaped.
- **Secrets.** None is inlined in client scripts (the built chunks were searched for the secret,
  Chapa and bot keys); logs print setting names, never values.
- **Mobile API.** CORS `*` is safe because it uses Bearer tokens, not cookies; tokens are verified
  with `auth.getUser`.

## Known issues left for later

1. **Server actions accept 110 MB bodies** (`serverActions.bodySizeLimit`, for admins' PDF uploads),
   and that limit applies to public actions too, so large posts can use up memory on a small
   Render instance. Move book uploads to direct, signed uploads to Storage and lower the limit.
2. ~~**Child limits per plan** are advertised but not enforced.~~ Enforced since plans v2 (Starter 1, Family 3, VIP 4; `apps/web/src/lib/entitlements.ts`).
3. **Drawn scenes of paid launch stories** are ordinary scripts (now one per story); the pictures,
   not the words, can be fetched by someone who looks for them.
4. **Read passes are bearer links for 6 hours**; anyone given one can read that story while the
   family's plan is open. Shorter passes would need the app to refresh them.
5. **CSP allows inline scripts** (Next's own inline scripts); a nonce-based policy would make every
   page dynamic. **Supabase advisor (performance):** policies call `auth.uid()` per row instead of
   `(select auth.uid())`, and `books`/`book_pages` have two permissive select policies each.
6. **`originFrom` trusts `X-Forwarded-Host`** for Chapa return addresses and the mobile API's links
   (only the requester is affected). Set `SITE_URL` on Render.
7. The website's "finished story" doesn't check the bedtime limit on the server (the app's API
   does); `gift_attempts` and `page_views` are never cleaned up; the in-memory rate limits reset
   when the server restarts; the Grown-ups' gate is English only.

## Migration 0013 (review, then apply)

`supabase/migrations/0013_prelaunch_fixes.sql` changes nothing for existing rows and drops nothing:

1. `children`: revoke insert/update from `anon, authenticated`; grant insert on (family_id, name,
   age_band, preferred_lang, avatar) and update on (name, age_band, preferred_lang, avatar) to
   `authenticated`; check `char_length(name) between 1 and 40` (NOT VALID).
2. `completions`: revoke insert/update; grant insert on (child_id, item_type, item_id) and update
   on (completed_at); check `char_length(item_id) between 1 and 100` (NOT VALID).
3. Revoke TRUNCATE on every public table from `anon, authenticated`; revoke insert/update/delete on
   payments, subscriptions, gifts and game_sessions, and everything on notifications_sent and
   gift_attempts, from those roles (all were already blocked by RLS; this makes it explicit).
4. Re-schedule `lali-notify` (same name, schedule and address as 0008) to send
   `x-lali-cron: <Vault secret 'lali_cron_secret'>` (empty until the secret exists). Skipped with a
   notice if Vault or pg_cron isn't there.
5. Indexes `game_sessions (game_id)` and `page_views (book_id)` for cascading deletes.

It was tested on a local Postgres 16 with all migrations 0001–0013 and the API roles: parents can
still add, rename and delete their own children, finish stories (the star trigger still fires) and
move today's completions, and can no longer set stars, date completions, truncate, or write
payments; old rows that break the new checks stay. The checks are at the end of the file.

## What needs the live system to verify

- Render's `X-Forwarded-For`: after reading a partner book, `page_views.ip` should hold the reader's
  real IP (the rightmost valid entry is used).
- Set `SITE_URL`; create the Vault secret, apply 0013, set `CRON_SECRET` (order in
  `docs/OPERATIONS.md`); then `select command from cron.job where jobname = 'lali-notify'`, and a
  Telegram reminder arrives.
- Supabase **Authentication → URL Configuration → Redirect URLs** lists only Lali's addresses.
- With the CSP on the live site: Chapa checkout and return, a YouTube video, a studio story's
  pictures and narration, family voices, the games, and the app's reader web view on Android and
  iOS (including the microphone).
- Sign in and out on the live site with the new cookie flags.
- An admin with Telegram connected receives a test alert (`docs/OPERATIONS.md`).
- Chapa live mode: amounts and currency in the verify response.
