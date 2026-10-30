-- Lali database: families, children, subscriptions and the protected book library.
-- Run this in the Supabase SQL editor (or `supabase db push`). It is safe to run once.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Families (one row per signed-in grown-up)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  phone text,
  role text not null default 'parent' check (role in ('parent', 'admin')),
  created_at timestamptz not null default now()
);

-- Create the profile row the moment someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''), new.phone);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Children
-- ---------------------------------------------------------------------------
create table public.children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  age_band text not null check (age_band in ('3-5', '6-7', '8-9')),
  preferred_lang text not null default 'en' check (preferred_lang in ('en', 'am')),
  stars int not null default 0,
  created_at timestamptz not null default now()
);
create index children_family_idx on public.children (family_id);

-- ---------------------------------------------------------------------------
-- Plans and subscriptions
-- ---------------------------------------------------------------------------
create table public.plans (
  id text primary key,                 -- 'reader', 'learner', 'vip'
  name text not null,
  price_etb int not null,
  max_children int not null,
  max_devices int not null,
  worlds text[] not null default '{}'  -- which learning worlds are included
);

insert into public.plans (id, name, price_etb, max_children, max_devices, worlds) values
  ('reader',  'Reader',  400,  1, 2, '{story}'),
  ('learner', 'Learner', 1200, 2, 3, '{story,english,maths,values}'),
  ('vip',     'VIP',     5000, 4, 4, '{story,english,maths,values}');

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.profiles (id) on delete cascade,
  plan_id text not null references public.plans (id),
  status text not null check (status in ('trialing', 'active', 'past_due', 'cancelled')),
  current_period_end timestamptz not null,
  provider text,                        -- 'chapa'
  provider_ref text,                    -- Chapa transaction reference
  created_at timestamptz not null default now()
);
create index subscriptions_family_idx on public.subscriptions (family_id);

-- Is this family allowed to read paid content right now?
create or replace function public.has_active_subscription(family uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions
    where family_id = family
      and status in ('trialing', 'active')
      and current_period_end > now()
  );
$$;

-- ---------------------------------------------------------------------------
-- Books (partner and publisher PDFs, served one watermarked page at a time)
-- ---------------------------------------------------------------------------
create table public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  title_am text,
  author text,
  description text,
  language text not null default 'en' check (language in ('en', 'am', 'bilingual')),
  age_band text not null check (age_band in ('3-5', '6-7', '8-9')),
  category text not null check (category in ('story', 'english', 'maths', 'values')),
  cover_path text,                      -- object path in the private 'book-pages' bucket
  page_count int not null default 0,
  is_free boolean not null default false,
  status text not null default 'processing' check (status in ('processing', 'ready', 'failed', 'hidden')),
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.book_pages (
  book_id uuid not null references public.books (id) on delete cascade,
  page_number int not null,
  object_path text not null,            -- 'books/<book_id>/pages/0007.webp' in the private bucket
  width int not null,
  height int not null,
  primary key (book_id, page_number)
);

-- Every page served is logged: this drives the rate limit and makes leaks traceable.
create table public.page_views (
  id bigint generated always as identity primary key,
  family_id uuid not null references public.profiles (id) on delete cascade,
  child_id uuid references public.children (id) on delete set null,
  book_id uuid not null references public.books (id) on delete cascade,
  page_number int not null,
  device_id text,
  ip inet,
  viewed_at timestamptz not null default now()
);
create index page_views_family_time_idx on public.page_views (family_id, viewed_at desc);

-- Devices a family reads on (capped per plan).
create table public.devices (
  id text not null,                     -- random id kept in the browser or app
  family_id uuid not null references public.profiles (id) on delete cascade,
  label text,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  primary key (family_id, id)
);

-- Reading progress for the storybook reader and the book reader.
create table public.reading_progress (
  child_id uuid not null references public.children (id) on delete cascade,
  item_type text not null check (item_type in ('story', 'book')),
  item_id text not null,
  last_page int not null default 0,
  completed_count int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (child_id, item_type, item_id)
);

-- ---------------------------------------------------------------------------
-- Row-level security: each family sees only its own rows.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.books enable row level security;
alter table public.book_pages enable row level security;
alter table public.page_views enable row level security;
alter table public.devices enable row level security;
alter table public.reading_progress enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "own profile" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "update own profile" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

create policy "own children" on public.children
  for all using (family_id = auth.uid()) with check (family_id = auth.uid());

create policy "plans are public" on public.plans
  for select using (true);

create policy "own subscriptions" on public.subscriptions
  for select using (family_id = auth.uid() or public.is_admin());
-- Subscriptions are written only by the server (payment webhooks) with the secret key.

create policy "books catalogue" on public.books
  for select using (status = 'ready' or public.is_admin());
create policy "admins manage books" on public.books
  for all using (public.is_admin()) with check (public.is_admin());

-- Page records (not the images) are visible so the reader knows sizes and counts.
create policy "pages of visible books" on public.book_pages
  for select using (exists (select 1 from public.books b where b.id = book_id and (b.status = 'ready' or public.is_admin())));
create policy "admins manage pages" on public.book_pages
  for all using (public.is_admin()) with check (public.is_admin());

create policy "own page views" on public.page_views
  for select using (family_id = auth.uid() or public.is_admin());
-- Page views are inserted by the server when it serves a page.

create policy "own devices" on public.devices
  for all using (family_id = auth.uid()) with check (family_id = auth.uid());

create policy "own children's progress" on public.reading_progress
  for all using (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()))
  with check (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()));

-- ---------------------------------------------------------------------------
-- Storage: two private buckets. Nothing in them is reachable by URL.
-- Page images reach the browser only through the website's watermarking endpoint.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values
  ('book-sources', 'book-sources', false, 104857600),  -- original PDFs, 100 MB max
  ('book-pages',   'book-pages',   false, 10485760)    -- rendered pages and covers
on conflict (id) do nothing;

-- Only admins may upload sources through the client; the server uses the secret key for everything else.
create policy "admins upload sources" on storage.objects
  for insert with check (bucket_id = 'book-sources' and public.is_admin());
create policy "admins read sources" on storage.objects
  for select using (bucket_id = 'book-sources' and public.is_admin());
