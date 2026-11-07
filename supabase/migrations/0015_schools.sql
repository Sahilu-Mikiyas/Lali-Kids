-- Schools and classroom licences (docs/SCHOOLS.md).
--
-- NOT applied automatically: review, then apply. It only adds: new tables, their policies and
-- grants, and 'teacher' as an allowed profile role. Nothing existing is dropped or changed
-- (except that one check constraint, replaced by a wider one). The website works before and
-- after it: before, /teach and /admin/schools say schools aren't set up yet and class codes
-- are not found.
--
--   schools             a school's licence: name, contact, seats (pupil places), last day
--   teachers            which Lali account teaches at which school (admins set it)
--   classes             a teacher's class ("KG 2 Blue"), its age group and class code
--   pupils              a first name, an avatar and a picture password; nothing else
--   class_assignments   "This week: ..." stories a teacher picked for a class
--   pupil_completions   a pupil finished a story (their stars and the class progress table)
--   pupil_reader_stars  pages a pupil read aloud (the read-along microphone)
--
-- Who can do what:
--   - Teachers (signed in) can READ their own school, their own classes, and those classes'
--     pupils, assignments and progress. Admins can read everything.
--   - Nobody writes through the API: the website's server writes with the secret key after
--     checking the teacher owns the class, or (for pupils) after checking the signed classroom
--     cookie. Pupils have no database account and no direct access at all.
--   - Pupils' Find Lali finds and sticker positions are not kept (stars and reader stars are).
--
-- The policies use auth.uid() and the existing public.is_admin() (0001). No new
-- security-definer functions are added, so there is nothing new to revoke execute on.

-- ---------------------------------------------------------------------------
-- The teacher role
-- ---------------------------------------------------------------------------
-- 0001 allowed 'parent' and 'admin'. Parents still can't change their own role: the
-- "update own profile" policy (0001) keeps the role as it was, and 0011 grants parents update
-- on the settings columns only.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('parent', 'admin', 'teacher'));

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  contact_name text check (char_length(contact_name) <= 120),
  contact_phone text check (char_length(contact_phone) <= 40),
  contact_email text check (char_length(contact_email) <= 200),
  -- How many pupils the school's classes may hold together.
  seats int not null default 30 check (seats between 1 and 5000),
  -- The last day the licence works (Addis Ababa calendar day).
  ends_on date not null,
  created_at timestamptz not null default now()
);

create table public.teachers (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  school_id uuid not null references public.schools (id) on delete cascade,
  added_at timestamptz not null default now()
);
create index teachers_school_idx on public.teachers (school_id);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  teacher_id uuid not null references public.profiles (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  age_band text not null check (age_band in ('3-5', '6-7', '8-9')),
  -- LALI-KG2-7Q4: what the class tablet opens (/class/<code>).
  code text not null unique check (code ~ '^LALI-[A-Z0-9]{2,4}-[A-Z0-9]{3}$'),
  created_at timestamptz not null default now()
);
create index classes_teacher_idx on public.classes (teacher_id);
create index classes_school_idx on public.classes (school_id);

create table public.pupils (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  -- A first name only (no surname, no email, no photo).
  first_name text not null check (char_length(first_name) between 1 and 30),
  avatar text not null check (avatar ~ '^(cub|gugu|bee)-(coral|teal|blue|gold|berry|green|purple|orange)$'),
  -- The picture password: three of the nine animals (0-8), in order.
  picture smallint[] not null check (array_length(picture, 1) = 3 and 0 <= all (picture) and 8 >= all (picture)),
  -- Wrong picture passwords in a row; at 5 the pupil is locked until the teacher unlocks them.
  failed_tries smallint not null default 0 check (failed_tries between 0 and 100),
  locked_at timestamptz,
  last_active_at timestamptz,
  created_at timestamptz not null default now()
);
create index pupils_class_idx on public.pupils (class_id);

create table public.class_assignments (
  class_id uuid not null references public.classes (id) on delete cascade,
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  assigned_at timestamptz not null default now(),
  primary key (class_id, story_id)
);

create table public.pupil_completions (
  id bigint generated always as identity primary key,
  pupil_id uuid not null references public.pupils (id) on delete cascade,
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  completed_at timestamptz not null default now()
);
create index pupil_completions_pupil_time_idx on public.pupil_completions (pupil_id, completed_at desc);
create index pupil_completions_time_idx on public.pupil_completions (completed_at);

create table public.pupil_reader_stars (
  pupil_id uuid not null references public.pupils (id) on delete cascade,
  story_id text not null check (story_id ~ '^[a-z0-9-]{1,100}$'),
  page int not null check (page between 0 and 199),
  lang text not null check (lang in ('en', 'am')),
  how text not null default 'recorded' check (how in ('listened', 'recorded')),
  read_at timestamptz not null default now(),
  primary key (pupil_id, story_id, page)
);

-- ---------------------------------------------------------------------------
-- Row-level security: teachers read their own; admins read all; nobody writes
-- ---------------------------------------------------------------------------
alter table public.schools enable row level security;
alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.pupils enable row level security;
alter table public.class_assignments enable row level security;
alter table public.pupil_completions enable row level security;
alter table public.pupil_reader_stars enable row level security;

create policy "teachers see their school" on public.schools
  for select using (
    public.is_admin()
    or exists (select 1 from public.teachers t where t.school_id = schools.id and t.profile_id = auth.uid())
  );

create policy "teachers see themselves" on public.teachers
  for select using (profile_id = auth.uid() or public.is_admin());

create policy "teachers see their classes" on public.classes
  for select using (teacher_id = auth.uid() or public.is_admin());

create policy "teachers see their pupils" on public.pupils
  for select using (
    public.is_admin()
    or exists (select 1 from public.classes c where c.id = pupils.class_id and c.teacher_id = auth.uid())
  );

create policy "teachers see their assignments" on public.class_assignments
  for select using (
    public.is_admin()
    or exists (select 1 from public.classes c where c.id = class_assignments.class_id and c.teacher_id = auth.uid())
  );

create policy "teachers see their pupils' stories" on public.pupil_completions
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.pupils p join public.classes c on c.id = p.class_id
      where p.id = pupil_completions.pupil_id and c.teacher_id = auth.uid()
    )
  );

create policy "teachers see their pupils' reader stars" on public.pupil_reader_stars
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.pupils p join public.classes c on c.id = p.class_id
      where p.id = pupil_reader_stars.pupil_id and c.teacher_id = auth.uid()
    )
  );

-- Writes only from the website's server (the secret key bypasses row-level security). There are
-- no insert/update/delete policies, and the grants say the same, belt and braces.
revoke all on public.schools, public.teachers, public.classes, public.pupils, public.class_assignments,
  public.pupil_completions, public.pupil_reader_stars from anon;
revoke insert, update, delete, truncate, references, trigger on public.schools, public.teachers, public.classes,
  public.pupils, public.class_assignments, public.pupil_completions, public.pupil_reader_stars from authenticated;
grant select on public.schools, public.teachers, public.classes, public.pupils, public.class_assignments,
  public.pupil_completions, public.pupil_reader_stars to authenticated;

comment on table public.pupils is
  'Classroom pupils: a first name, an avatar and a picture password only (docs/SCHOOLS.md). Written only by the server.';
comment on column public.pupils.picture is
  'The picture password: three animal indexes (0-8) in order. Teachers see it to tell the child; 5 wrong tries lock the pupil.';

-- ---------------------------------------------------------------------------
-- Checks after applying (as a teacher: set local role authenticated; set local
-- request.jwt.claims = '{"sub":"<teacher profile id>"}'):
--   select count(*) from public.classes;            -- only their own classes
--   select count(*) from public.pupils;             -- only their own pupils
--   insert into public.classes ... ;                -- permission denied
--   update public.profiles set role = 'admin' ...;  -- 0 rows / refused by the policy
-- As anon every table above is permission denied.
-- ---------------------------------------------------------------------------
