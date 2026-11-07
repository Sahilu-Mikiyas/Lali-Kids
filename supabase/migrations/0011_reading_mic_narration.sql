-- Reading aloud and voice narration.
--
-- 1. The read-along microphone: a child reads a page aloud and earns a small "reader star".
--      profiles.mic_listen  the parent's choice to let the browser's speech service listen to
--                           their child read (it sends audio to the browser maker). Off by default;
--                           without it the reader only records on the device and plays it back.
--      reader_stars         pages a child read aloud. Reading every page of a book aloud earns
--                           the "I read it myself" sticker (worked out by the website, like the
--                           other stickers), and the weekly Telegram note counts them.
--
-- 2. Narration by voice actors, for the launch stories (drawn in code) and studio stories alike:
--      story_narrations     one recording per story, language and page, with the start time of
--                           each word in milliseconds (word_times) so the words light up exactly.
--      narration bucket     private; the server hands out links that expire after an hour, and
--                           only for stories the family may open (free stories: anyone).
--
-- Every table is written only by the website's server with the secret key (admins upload through
-- the website's admin page, which checks the role first). Signed-in parents and visitors cannot
-- insert, change or delete rows through the API directly.
--
-- No new security-definer functions are added, so there is nothing new to revoke execute on.

-- ---------------------------------------------------------------------------
-- The microphone setting, per family
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column mic_listen boolean not null default false;

-- Parents may change it themselves, like their other settings (the list from 0008, plus mic_listen).
revoke update on public.profiles from authenticated, anon;
grant update (display_name, nightly_limit, show_all_ages, games_minutes, ui_lang, mic_listen) on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- Reader stars: pages a child read aloud (the latest time is kept)
-- ---------------------------------------------------------------------------
create table public.reader_stars (
  child_id uuid not null references public.children (id) on delete cascade,
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  page int not null check (page between 0 and 199),
  lang text not null check (lang in ('en', 'am')),
  -- 'listened': the browser's speech service heard it; 'recorded': recorded on the device and played back.
  how text not null default 'recorded' check (how in ('listened', 'recorded')),
  read_at timestamptz not null default now(),
  primary key (child_id, story_id, page)
);
create index reader_stars_week_idx on public.reader_stars (child_id, read_at);

alter table public.reader_stars enable row level security;
create policy "own children's reader stars" on public.reader_stars
  for select using (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()));

revoke insert, update, delete, truncate on public.reader_stars from anon, authenticated;
revoke all on public.reader_stars from anon;

-- The "I read it myself" sticker can be stuck in the album like the others.
alter table public.sticker_positions drop constraint if exists sticker_positions_sticker_id_check;
alter table public.sticker_positions
  add constraint sticker_positions_sticker_id_check
  check (sticker_id ~ '^((story|gold):[a-z0-9-]{1,100}|m:(3|5|10|streak7|readself))$');

-- ---------------------------------------------------------------------------
-- Narration by voice actors
-- ---------------------------------------------------------------------------
create table public.story_narrations (
  -- The story's slug: a launch story's id in the website code, or a studio story's slug.
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  lang text not null check (lang in ('en', 'am')),
  page int not null check (page between 0 and 199),
  narrator text not null check (char_length(narrator) between 1 and 60),
  -- <story_id>/<lang>/<page>-<random>.<ext> in the private narration bucket
  path text not null unique,
  duration_ms int not null check (duration_ms between 1 and 600000),
  -- Start time of each word of the page in milliseconds, in order ([] until an admin has timed it).
  word_times jsonb not null default '[]'::jsonb check (jsonb_typeof(word_times) = 'array' and jsonb_array_length(word_times) <= 600),
  -- Copied from the story when the clip is saved, so the policy below can tell free stories apart
  -- (launch stories live in code, not in a table). The server checks access itself as well.
  story_is_free boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (story_id, lang, page),
  check (split_part(path, '/', 1) = story_id)
);

alter table public.story_narrations enable row level security;

-- Anyone may read the rows of free stories; families with an open plan (the same rule as
-- has_active_subscription, which browsers may not call) and admins may read them all.
-- The rows only hold timings and a private path: playback still needs a link from the server.
create policy "narration of stories the family can open" on public.story_narrations
  for select using (
    story_is_free
    or public.is_admin()
    or exists (
      select 1 from public.subscriptions s
      where s.family_id = auth.uid()
        and s.status in ('trialing', 'active')
        and s.current_period_end + coalesce(case when s.next_plan_id is not null then s.next_days end, 0) * interval '1 day' > now()
    )
  );

-- Only the server writes (admins upload through the website, which checks the role).
revoke insert, update, delete, truncate on public.story_narrations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: a private bucket for narration, 15 MB a file. No storage policies: nothing in it is
-- reachable by URL or through the client API; the server uploads with the secret key and hands
-- out links that expire after an hour.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'narration', 'narration', false, 15728640,
  array['audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/x-m4a', 'audio/m4a', 'audio/aac', 'audio/wav', 'audio/x-wav', 'audio/wave', 'audio/vnd.wave', 'audio/webm']
)
on conflict (id) do nothing;
