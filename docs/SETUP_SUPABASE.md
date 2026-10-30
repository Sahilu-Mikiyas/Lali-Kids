# Connecting Lali to Supabase

Everything below takes about ten minutes. You only do it once.

## 1. Create the database tables

1. Open your project at https://supabase.com/dashboard.
2. In the left menu, click **SQL Editor**, then **New query**.
3. Open the file `supabase/migrations/0001_init.sql` from this repo, copy all of it, paste it
   into the editor and click **Run**.
4. Do the same with `supabase/migrations/0002_family.sql` (child avatars, the bedtime
   limit, and story completions that award stars).
5. You should see "Success. No rows returned". If it says something already exists, the
   file was already run; that is fine.

This creates: families, children, plans (Reader 400 / Learner 1,200 / VIP 5,000), subscriptions,
books, pages, page views (for rate limiting and leak tracing), devices and reading progress,
plus privacy rules so each family only ever sees its own data. It also creates two private
storage buckets, `book-sources` and `book-pages`, that no browser can reach directly.

## 2. Turn on email sign-in with a code

1. **Authentication → Providers → Email**: make sure Email is enabled.
2. **Authentication → Email Templates → Magic Link**: replace `{{ .ConfirmationURL }}` in the
   template with `{{ .Token }}` so the email contains a 6-digit code instead of a link.
   (Codes work better than links on phones that open email in one app and the browser in another.)

Phone-number sign-in (SMS via Twilio or similar) can be added later; it costs money per message.

## 3. Get the keys

**Project Settings → API Keys.** You need:

| Key | Looks like | Where it goes |
|---|---|---|
| Project URL | `https://xxxx.supabase.co` | `NEXT_PUBLIC_SUPABASE_URL` |
| Publishable key | `sb_publishable_…` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` |
| Secret key | `sb_secret_…` | `SUPABASE_SECRET_KEY` (server only, never in the browser) |

Also make up `PAGE_TOKEN_SECRET`: any long random string (for example 40 random characters).
It signs the short-lived page links.

Where to put them:

- **For the cloud coding sessions:** in the environment's settings, under secrets or
  environment variables, using the names above. Also add `ixaojdpmorlsbfkgbajm.supabase.co`
  (your project's host) and `api.supabase.com` to the allowed network domains.
- **For local development:** copy `apps/web/.env.example` to `apps/web/.env.local` and fill it in.
- **For hosting (Vercel):** Project → Settings → Environment Variables.

Never paste keys into chat, GitHub issues or commit messages. If a key leaks, rotate it in
**Project Settings → API Keys**.

## 4. Make yourself an admin

Sign in once on the website (`/login`) so your profile row exists. Then in the SQL editor:

```sql
update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'you@example.com');
```

Admins can open `/admin/books` to upload PDFs.

## 5. Try it

1. Open `/admin/books`, upload a small PDF, tick "Free sample", and submit. Lali renders every
   page on the server and marks the book ready.
2. Open `/library`. The book appears. Open it: pages are drawn on a canvas, each one carrying a
   faint watermark with your masked email and the date. Right-click, drag, print and "save image"
   do nothing useful.
3. Untick "Free sample" on a book (hide and re-upload, or edit `is_free` in the table) and it
   will ask for a plan until a subscription row exists for the family. Payments (Chapa) will
   create those rows automatically; until then you can insert one by hand:

```sql
insert into public.subscriptions (family_id, plan_id, status, current_period_end)
values ((select id from auth.users where email = 'you@example.com'), 'reader', 'trialing', now() + interval '7 days');
```

## What is protected, and how

| Threat | What stops it |
|---|---|
| Downloading the PDF | It lives in a private bucket and is never sent to any browser. |
| Saving page images | Pages come from `/api/books/<id>/pages/<n>` with a token that works for 90 seconds for that one family, book and page, and are drawn on a canvas with `no-store`. |
| Scraping a whole book | At most 40 pages per family per minute; every page served is logged with the family, device and IP. |
| Sharing screenshots | Every page is watermarked with the reader's masked identity and the date, so a leak traces back to one account. |
| Reading without paying | The server checks for an active subscription on every page unless the book is marked free. |
| Reading the SQL rules around | Row-level security is enforced by Postgres itself, not by the website. |

Nothing on a screen is 100% copy-proof (a phone camera always works). The aim is to make
copying slow, low quality and traceable, which is the same approach Kindle and Netflix take.
