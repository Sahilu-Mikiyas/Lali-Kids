# Telegram reminders and weekly notes

Parents can connect Telegram in the Grown-ups' corner. Lali's bot then sends:

- a reminder **3 days** and **1 day** before their plan ends, and a note the day it ends, each with
  an "Add 30 days" button;
- a **weekly note** on Sunday evenings (Addis Ababa time): stories read, minutes of games and stars
  for each child.

Messages are in English or Amharic, following the parent's website language.

## Setup (once, about 3 minutes)

1. In Telegram, open **@BotFather**, send `/newbot`, and follow the steps. Suggested name
   *Lali*, username something like `LaliKidsBot`. BotFather replies with a **token**.
2. Optional, in BotFather: `/setuserpic` (the Lali bee), `/setdescription`
   ("Reminders and weekly reading notes from Lali").
3. In Render: **lali-kids → Environment**, add `TELEGRAM_BOT_TOKEN` with the token. Never paste
   the token in chat or commit it.

That's all. Within the hour, Lali registers its webhook with Telegram by itself, and the
**Telegram** card appears in the Grown-ups' corner.

## How it works

- Connecting: the Grown-ups' corner makes a one-time code (valid 30 minutes) and opens
  `t.me/<bot>?start=<code>`; when the parent presses Start, the bot links that chat to the family.
  Sending `/stop` to the bot disconnects.
- Every hour, the database (`pg_cron`, `0008_telegram.sql`) calls `/api/cron/notify`, which sends
  whatever is due. Each message is written to `notifications_sent` first, so nothing is ever
  sent twice, however often the endpoint is called.
- Telegram's calls to `/api/telegram/webhook` carry a secret derived from the bot token; other
  calls are refused.
