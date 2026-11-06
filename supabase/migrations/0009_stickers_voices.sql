-- Sticker book, Find Lali and family voices.
--
-- Stickers themselves need no table: a child earns a story's sticker by finishing it, so the
-- website works them out from `completions` (distinct item_id). What does need keeping:
--   lali_finds         the pages where a child found Lali the bee (finding her on every page of
--                      a story earns its golden sticker);
--   sticker_positions  where a child stuck each sticker in their album;
--   family_recordings  a grown-up's own voice reading a story, page by page, for their children.
--
-- All three are read by the family only (row-level security) and written only by the website's
-- server with the secret key, after it has checked who is signed in. Signed-in parents can't
-- insert, change or delete rows through the API directly.
--
-- No new security-definer functions are added here, so there is nothing new to revoke
-- execute on; the policies below only use auth.uid() and the existing children policy.

-- ---------------------------------------------------------------------------
-- Find Lali
-- ---------------------------------------------------------------------------
create table public.lali_finds (
  child_id uuid not null references public.children (id) on delete cascade,
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  page int not null check (page between 0 and 199),
  found_at timestamptz not null default now(),
  primary key (child_id, story_id, page)
);

-- ---------------------------------------------------------------------------
-- Where stickers were stuck in the album (x, y from 0 to 1 across the album page)
-- ---------------------------------------------------------------------------
create table public.sticker_positions (
  child_id uuid not null references public.children (id) on delete cascade,
  sticker_id text not null check (sticker_id ~ '^((story|gold):[a-z0-9-]{1,100}|m:(3|5|10|streak7))$'),
  album_page int not null check (album_page between 0 and 20),
  x real not null check (x between 0 and 1),
  y real not null check (y between 0 and 1),
  rotation real not null default 0 check (rotation between -30 and 30),
  updated_at timestamptz not null default now(),
  primary key (child_id, sticker_id)
);

-- ---------------------------------------------------------------------------
-- Family voices
-- ---------------------------------------------------------------------------
create table public.family_recordings (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.profiles (id) on delete cascade,
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  lang text not null check (lang in ('en', 'am')),
  page int not null check (page between 0 and 199),
  recorder_name text not null check (char_length(recorder_name) between 1 and 40),
  -- <family_id>/<story_id>/<lang>/<page>-<random>.<ext> in the private family-voices bucket
  path text not null unique,
  duration_ms int not null check (duration_ms between 1 and 61000),
  created_at timestamptz not null default now(),
  -- A file always sits in its own family's folder.
  check (split_part(path, '/', 1) = family_id::text)
);
create index family_recordings_story_idx on public.family_recordings (family_id, story_id, lang, page, created_at desc);

-- ---------------------------------------------------------------------------
-- Row-level security: the family reads its own rows; only the server writes.
-- ---------------------------------------------------------------------------
alter table public.lali_finds enable row level security;
alter table public.sticker_positions enable row level security;
alter table public.family_recordings enable row level security;

create policy "own children's finds" on public.lali_finds
  for select using (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()));
create policy "own children's sticker positions" on public.sticker_positions
  for select using (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()));
create policy "own family's recordings" on public.family_recordings
  for select using (family_id = auth.uid());

-- Belt and braces: no direct writes from browsers or the app, whatever policies are added later.
revoke insert, update, delete, truncate on public.lali_finds from anon, authenticated;
revoke insert, update, delete, truncate on public.sticker_positions from anon, authenticated;
revoke insert, update, delete, truncate on public.family_recordings from anon, authenticated;
revoke all on public.lali_finds, public.sticker_positions, public.family_recordings from anon;

-- ---------------------------------------------------------------------------
-- Storage: a private bucket for the recordings. No storage policies: nothing in it is
-- reachable by URL or through the client API; the server uploads with the secret key and
-- hands the family links that expire after 30 minutes.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('family-voices', 'family-voices', false, 4194304, array['audio/webm', 'audio/mp4', 'audio/x-m4a', 'audio/aac', 'audio/ogg', 'audio/mpeg'])
on conflict (id) do nothing;
