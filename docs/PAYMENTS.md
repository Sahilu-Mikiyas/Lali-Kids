# Payments (Chapa)

## How it works for a family

1. A signed-in parent opens **/subscribe** (from the plans on the home page, the library, or the Grown-ups' corner).
2. They pick Starter (400 birr), Family (650) or VIP (2,500) (`docs/PACKAGES.md`; the ids stay
   `reader`, `learner` and `vip`).
3. **Pay**: Lali creates a pending payment and sends them to Chapa's checkout, where they pay with
   Telebirr, CBE Birr, M-Pesa or a card. Lali never sees payment details.
4. Chapa sends them back to **/subscribe/done**, which confirms the payment with Chapa before
   showing "Thank you". Chapa also calls **/api/payments/chapa** in the background, so access is
   granted even if the parent closes the tab.
5. Each payment adds **30 days**. Nothing renews automatically. There is no free trial.

## Changing plans

The plans page shows exactly what a payment will do before the parent pays.

| Situation | What happens |
|---|---|
| Same plan | 30 days are added on top of the days left. |
| **Upgrade** (pricier plan) | Starts now. The days left on the old plan are turned into days on the new plan by their value, then 30 days are added. 20 Starter days (8,000/30 ≈ 267 birr) become 12.3 Family days, so the family gets 42.3 days of Family. |
| **Downgrade** (cheaper plan) | Waits until the current plan ends, then the new plan runs for 30 days. Nobody loses paid days. The Grown-ups' corner shows "Then Starter starts…". |

The database function `activate_payment` (`0006_plan_switching.sql`) applies these rules, and
`previewSwitch` in `apps/web/src/lib/payments/plans.ts` mirrors them for the preview.

## Receipts

The Grown-ups' corner lists every payment, and each has a printable receipt (save as PDF from
the print dialog) with the Chapa and Lali references.

## Why it's safe

- Access is only granted after Lali asks Chapa's verify endpoint, from the server, whether the
  payment succeeded, in birr, for at least the plan price. A forged callback or a tampered return
  link can't open anything.
- The database function `activate_payment` only counts a payment once, so the return page and the
  callback arriving together can't add 60 days.
- Payments and subscriptions are written only by the server. Families can read their own payments
  and nothing else.

## Setup (once)

1. Create a Chapa account at https://dashboard.chapa.co and finish business verification for live
   payments. Test mode works straight away.
2. In Chapa: **Settings → API keys**, copy the **secret key** (`CHASECK_TEST-…` for testing,
   `CHASECK-…` for live).
3. In Render: **lali-kids → Environment**, add `CHAPA_SECRET_KEY` with that value. Never paste it in
   chat or commit it.
4. Optional: in Chapa's webhook settings, set the URL to
   `https://lali-kids.onrender.com/api/payments/chapa` (or your own domain later).

Until `CHAPA_SECRET_KEY` is set, pressing Pay shows "Online payment isn't connected yet".

## Testing with Chapa's test mode

Use the test secret key, pay with Chapa's test numbers or cards on the checkout page, and check:

- you land on "Thank you" with the plan and end date;
- the Grown-ups' corner shows the plan and days left;
- a paid book in the library opens.

## Database

`supabase/migrations/0004_payments.sql`: the `payments` table, one subscription per family, and
the `activate_payment` function (callable only by the server). `0005_remove_trial.sql` removed the
free-trial function. `0006_plan_switching.sql` added the switching rules; `0012_gifts.sql` moved
them into `apply_plan_days`, shared by payments and gifts.

## Gifts

Relatives anywhere (the diaspora in the US, Europe and the Middle East, or next door) can pay for a
family's plan as a gift, **without a Lali account**.

1. **/gift** (public): the giver picks Starter, Family or VIP and a length of 1, 3, 6 or 12 months
   (6 months is 10% off, 12 months 15% off), writes their name and email, who it's for and an
   optional message (up to 300 characters). The page shows the price in birr and a rough US dollar
   amount from `USD_PER_ETB` in `apps/web/src/lib/payments/gift.ts`. **Update that number now and
   then**; it is only a guide. Chapa charges in birr (ETB) and the giver's card bank converts it.
2. **Pay** creates a pending row in `gifts` with a random code and sends the giver to Chapa's
   checkout with a reference `lali-gift-<24 hex>`.
3. Chapa returns the giver to **/gift/done?tx_ref=…**, which asks Chapa (server to server) whether
   the payment succeeded, in ETB, for the full price, and only then shows the gift card with the code
   (`LALI-XXXX-XXXX`, no 0/O or 1/I/L), share buttons for WhatsApp and Telegram (a ready message in
   English and Amharic with the redeem link), copy, and print / save as PDF. The page refreshes
   itself while Chapa is still confirming. The giver can open the same link again any time.
   Chapa's callback (`/api/payments/chapa`) also confirms gifts, in case the giver closes the tab.
4. A parent opens **/gift/redeem?code=…** (or "Have a gift code?" in the Grown-ups' corner and on
   the plans page), signs in, sees the gift, who it's from and exactly what it will do, and presses
   **Add to our plan**. The app does the same with `POST /api/mobile/gifts/redeem` (docs/MOBILE.md).
5. The days (**months × 30**) are added with **exactly the same rules as a payment** (same plan adds
   days, upgrade converts by value, downgrade waits): `activate_payment` and `redeem_gift` both call
   the database function `apply_plan_days`. The family sees "Thank you, {giver}!" with the new end
   date, and gets a Telegram note if they connected Telegram.

### Why it's safe

- Codes are drawn with `crypto.randomInt` from 31 characters: 31⁸ ≈ 850 billion possibilities.
- A code works only after Chapa confirms the full amount in ETB (`mark_gift_paid` checks the amount
  again), and only **once**: `redeem_gift` records who redeemed it and when, in one statement.
- Wrong codes are rate-limited per family: after 10 misses in an hour, every try is refused for the
  rest of the hour (`gift_attempts`).
- Plan payments (`lali-reader-…`, 18 hex) and gifts (`lali-gift-…`, 24 hex) can't be mistaken for
  each other: the callback sends each shape only to its own table, and the database refuses a
  payment reference that starts with `lali-gift-`.
- The gift card page opens only with the random Chapa reference in its address.
- `gifts` has row-level security: no public access; a family can read the gifts it redeemed; only
  the server writes.

### Refunds

Refunds are **not automated**. Policy: a gift that **hasn't been redeemed** can be refunded in full
on request from the giver's email address. The founder refunds it in the Chapa dashboard and makes
the code unusable (for example `update gifts set status = 'pending' where code = '…'`). A gift that
**has been redeemed** is not refunded, like an open plan. Note every refund in the Chapa dashboard.

### Admin

- **/admin/stats** shows gifts sold, gifts redeemed and gift revenue.
- **/admin/gifts** lists every gift (code, plan, months, giver, status) with **Copy code**, **Copy
  gift card link** and **Email the giver again** (opens your email app with the code and links
  filled in; Lali doesn't send email itself). A gift still waiting for payment has **Check with
  Chapa**, for when the callback was missed.

### Database

`supabase/migrations/0012_gifts.sql` (review before applying; a test block at the end runs inside a
transaction and rolls back): the `gifts` and `gift_attempts` tables, `apply_plan_days`,
`activate_payment` rewritten to use it (same behaviour), `mark_gift_paid`, `peek_gift` and
`redeem_gift`. Until it is applied, the gift page says "We couldn't start the payment" and the
redeem page "Gifts aren't switched on yet".

## Learning packages (bought once)

A family can buy a learning package (`docs/PACKAGES.md`) once, for its price (`priceEtb` in the
course, 1,500 birr at launch), and keep it for good: every child in the family can use it, each
with their own progress, and bought packages have no pace limit. VIP families get every package
without buying (one at a time per child).

1. On **/courses/<id>** a signed-in parent presses **Buy for 1,500 birr** (the app sends
   `POST /api/mobile/checkout {course}`). `beginCourseCheckout` (`apps/web/src/lib/courses/checkout.ts`)
   checks the package is ready and not already the family's, writes a pending row in
   `course_payments`, and sends the parent to Chapa's checkout with the reference
   `lali-course-<short code>-<20 hex>` (`COURSE_CODES` in `apps/web/src/lib/payments/refs.ts`, e.g.
   `lali-course-fidel-…`). The rate limit is shared with plan checkouts (10 per family per 10 minutes).
2. Chapa returns the parent to **/courses/done?tx_ref=…** and calls **/api/payments/chapa**.
   Either one asks Chapa's verify endpoint (success, ETB, the same reference), then calls the
   database function `buy_course` (`0016_plans_courses.sql`), which marks the payment paid only if
   the amount is at least the price, and adds the package to `family_courses`, once.
3. The package then shows as "Yours for good" in the catalogue and on its page.

**Three shapes of reference, kept apart.** Plans `lali-<reader|learner|vip>-<18 hex>`, gifts
`lali-gift-<24 hex>`, packages `lali-course-<code>-<20 hex>`. The callback sends each shape only to
its own table (`isPlanRef`, `isGiftRef`, `isCourseRef`); `/subscribe/done` accepts only plan
references, `/gift/done` only gift references and `/courses/done` only package references; the
database refuses a payment or a gift with a package reference and a package payment with any other.

**Refunds**: like gifts, not automated. A package can be refunded on request within a few days if
no child has passed its first level; remove the row from `family_courses` and refund in Chapa.

**Gifting a package** is not built yet (gifts are plans only). It would need a `course_id` on
`gifts` and a branch in `redeem_gift`; see `docs/PACKAGES.md`.

### Database

`supabase/migrations/0016_plans_courses.sql` (review before applying; a test block at the end runs
inside a transaction and rolls back): new plan prices, `course_payments`, `family_courses`,
`course_progress`, `quiz_attempts` and `buy_course`. Until it is applied, Buy answers "We couldn't
start the payment" and the package pages say packages are being switched on.

