-- Story studio, age groups, and the games shelf.
--
-- Stories made in the studio live here (the three launch stories stay in the website code).
-- Games are web games hosted elsewhere and shown on Lali in a sealed-off frame.
-- All three tables are read and written only by the server with the secret key; the website
-- decides what each family may see.

-- Parents choose whether children see only their own age group or every age.
alter table public.profiles
  add column show_all_ages boolean not null default false,
  -- Minutes of games per child per day. 0 turns games off.
  add column games_minutes int not null default 20 check (games_minutes between 0 and 180);

create table public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_am text,
  category text not null default 'Bedtime' check (category in ('Bedtime', 'Maths', 'Values', 'English', 'Fidel')),
  age_bands text[] not null default '{3-5}' check (age_bands <@ array['3-5', '6-7', '8-9'] and cardinality(age_bands) > 0),
  color text not null default '#2B3A8C' check (color ~ '^#[0-9A-Fa-f]{6}$'),
  cover_page int not null default 0,
  is_free boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.story_pages (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories (id) on delete cascade,
  position int not null,
  text_en text not null default '',
  text_am text not null default '',
  image_path text,      -- in the private story-media bucket
  audio_en_path text,   -- recorded narration, English
  audio_am_path text    -- recorded narration, Amharic
);
create index story_pages_story_idx on public.story_pages (story_id, position);

create table public.games (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  title_am text,
  description text,
  url text not null check (url ~ '^(https://|/games/)'),
  age_bands text[] not null default '{3-5}' check (age_bands <@ array['3-5', '6-7', '8-9'] and cardinality(age_bands) > 0),
  color text not null default '#0FA3A3' check (color ~ '^#[0-9A-Fa-f]{6}$'),
  thumbnail_path text,  -- in the story-media bucket
  is_free boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- Time spent in games, for the daily limit and the grown-ups' corner.
create table public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.profiles (id) on delete cascade,
  child_id uuid references public.children (id) on delete cascade,
  game_id uuid not null references public.games (id) on delete cascade,
  started_at timestamptz not null default now(),
  seconds int not null default 0,
  best_score int
);
create index game_sessions_child_time_idx on public.game_sessions (child_id, started_at desc);
create index game_sessions_family_time_idx on public.game_sessions (family_id, started_at desc);

alter table public.stories enable row level security;
alter table public.story_pages enable row level security;
alter table public.games enable row level security;
alter table public.game_sessions enable row level security;

create policy "admins manage stories" on public.stories for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage story pages" on public.story_pages for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage games" on public.games for all using (public.is_admin()) with check (public.is_admin());
create policy "own game time" on public.game_sessions for select using (family_id = auth.uid() or public.is_admin());

-- Pictures, narration and game thumbnails. Private: the server hands out short-lived links.
insert into storage.buckets (id, name, public) values ('story-media', 'story-media', false)
on conflict (id) do nothing;

-- The first game: a small counting game hosted on Lali itself (apps/web/public/games/bee-count).
insert into public.games (slug, title, title_am, description, url, age_bands, color, is_free, status, sort)
values ('count-the-flowers', 'Count the Flowers', 'አበቦቹን ቁጠሩ', 'Count the flowers and tap the right number, in digits and Ge''ez numerals.', '/games/bee-count/index.html', '{3-5,6-7}', '#0FA3A3', true, 'published', 0)
on conflict (slug) do nothing;
