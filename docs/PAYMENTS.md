# Payments (Chapa)

## How it works for a family

1. A signed-in parent opens **/subscribe** (from the plans on the home page, the library, or the Grown-ups' corner).
2. They pick Reader (400 birr), Learner (1,200) or VIP (5,000).
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
| **Upgrade** (pricier plan) | Starts now. The days left on the old plan are turned into days on the new plan by their value, then 30 days are added. 20 Reader days (about 267 birr) become 6.7 Learner days, so the family gets 36.7 days of Learner. |
| **Downgrade** (cheaper plan) | Waits until the current plan ends, then the new plan runs for 30 days. Nobody loses paid days. The Grown-ups' corner shows "Then Reader starts…". |

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
free-trial function.
