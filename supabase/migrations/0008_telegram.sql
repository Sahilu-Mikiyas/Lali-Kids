-- Telegram: plan reminders and the weekly progress note.
--
-- A parent connects Telegram from the Grown-ups' corner: Lali makes a one-time code, the parent
-- opens t.me/<bot>?start=<code>, and the bot saves the chat. Every hour the database pings
-- /api/cron/notify, which sends whatever is due. notifications_sent makes each message go once.

alter table public.profiles
  add column telegram_chat_id bigint,
  add column telegram_link_code text unique,
  add column telegram_link_expires timestamptz,
  -- Language of the website and of Lali's messages.
  add column ui_lang text not null default 'en' check (ui_lang in ('en', 'am'));

create table public.notifications_sent (
  family_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,        -- 'renew-3', 'renew-1', 'weekly'
  key text not null,         -- e.g. the plan end date, or the week
  sent_at timestamptz not null default now(),
  primary key (family_id, kind, key)
);
alter table public.notifications_sent enable row level security;
-- Written and read only by the server.

-- Signed-in parents may only change their own settings, never their role or Telegram link.
revoke update on public.profiles from authenticated, anon;
grant update (display_name, nightly_limit, show_all_ages, games_minutes, ui_lang) on public.profiles to authenticated;

create extension if not exists pg_net;
create extension if not exists pg_cron;

-- Hourly, at 7 minutes past. The endpoint does nothing when nothing is due.
select cron.schedule(
  'lali-notify',
  '7 * * * *',
  $$ select net.http_get('https://lali-kids.onrender.com/api/cron/notify', timeout_milliseconds := 60000) $$
);
