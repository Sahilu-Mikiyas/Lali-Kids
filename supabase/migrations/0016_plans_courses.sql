-- Plans v2 and learning packages (docs/PACKAGES.md).
--
-- 1. New plan names and prices. The ids stay (reader, learner, vip) so subscriptions, payments and
--    gifts keep working: Starter 400, Family 650, VIP 2,500 birr. max_children follows the plans
--    (1, 3, 4); the website enforces it (src/lib/entitlements.ts).
-- 2. Learning packages, bought once per family:
--      course_payments  pending purchases (our Chapa reference lali-course-<code>-<20 hex>)
--      family_courses   the packages a family owns, written only by buy_course()
-- 3. Each child's progress through a package and every quiz attempt:
--      course_progress  one row per child and package (level, lessons done, best quiz scores,
--                       when it started, when the current level opened, when it was completed)
--      quiz_attempts    every level quiz and final test, scored on the server
--
-- Row-level security: a family reads its own rows (its children's progress); only the server
-- writes (no insert/update/delete grants or policies for anon or authenticated); anon has nothing.
-- buy_course() is security definer, like the gift functions, with execute revoked from public,
-- anon and authenticated.
--
-- Not applied automatically: review, then apply. A test block to run inside a transaction is at
-- the end of this file. Until it is applied the website still works: packages show in the
-- catalogue, buying says "We couldn't start the payment", and the player says packages are being
-- switched on.

-- ------------------------------------------------------------------------------------- 1. plans

update public.plans set name = 'Starter', price_etb = 400,  max_children = 1 where id = 'reader';
update public.plans set name = 'Family',  price_etb = 650,  max_children = 3 where id = 'learner';
update public.plans set name = 'VIP',     price_etb = 2500, max_children = 4 where id = 'vip';

-- ------------------------------------------------------------------------------ 2. packages

create table public.course_payments (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references public.profiles (id) on delete set null,
  course_id text not null check (course_id ~ '^[a-z0-9-]{1,60}$'),
  tx_ref text not null unique check (tx_ref ~ '^lali-course-[a-z0-9]{2,10}-[0-9a-f]{20}$'),
  amount_etb int not null check (amount_etb > 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  provider_ref text,                       -- Chapa's reference once paid
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index course_payments_family_idx on public.course_payments (family_id, created_at desc);

-- A plan payment's reference can never look like a package's (the callback tells them apart).
alter table public.payments
  add constraint payments_tx_ref_not_course check (tx_ref not like 'lali-course-%');
alter table public.gifts
  add constraint gifts_tx_ref_not_course check (tx_ref not like 'lali-course-%');

create table public.family_courses (
  family_id uuid not null references public.profiles (id) on delete cascade,
  course_id text not null check (course_id ~ '^[a-z0-9-]{1,60}$'),
  purchased_at timestamptz not null default now(),
  tx_ref text not null unique references public.course_payments (tx_ref),
  amount_etb int not null check (amount_etb > 0),
  primary key (family_id, course_id)
);

-- ------------------------------------------------------------------------------ 3. progress

create table public.course_progress (
  child_id uuid not null references public.children (id) on delete cascade,
  course_id text not null check (course_id ~ '^[a-z0-9-]{1,60}$'),
  -- Levels passed: 0 at the start; the number of levels when only the final test is left.
  current_level int not null default 0 check (current_level between 0 and 50),
  lessons_done text[] not null default '{}' check (cardinality(lessons_done) <= 500),
  -- { "<quiz id>": { "score": n, "total": n } }
  quiz_best jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  -- When the current level opened (may be in the future with VIP's pace: one new level every 4 days).
  level_unlocked_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (child_id, course_id)
);

create table public.quiz_attempts (
  id bigint generated always as identity primary key,
  child_id uuid not null references public.children (id) on delete cascade,
  course_id text not null check (course_id ~ '^[a-z0-9-]{1,60}$'),
  quiz_id text not null check (quiz_id ~ '^[a-z0-9-]{1,100}$'),
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  at timestamptz not null default now()
);
create index quiz_attempts_child_idx on public.quiz_attempts (child_id, at desc);

-- -------------------------------------------------------------------------- row-level security

alter table public.course_payments enable row level security;
alter table public.family_courses enable row level security;
alter table public.course_progress enable row level security;
alter table public.quiz_attempts enable row level security;

create policy "own package payments" on public.course_payments
  for select to authenticated using (family_id = (select auth.uid()) or public.is_admin());
create policy "own packages" on public.family_courses
  for select to authenticated using (family_id = (select auth.uid()) or public.is_admin());
create policy "own children's package progress" on public.course_progress
  for select to authenticated using (
    exists (select 1 from public.children c where c.id = course_progress.child_id and c.family_id = (select auth.uid()))
    or public.is_admin()
  );
create policy "own children's quiz attempts" on public.quiz_attempts
  for select to authenticated using (
    exists (select 1 from public.children c where c.id = quiz_attempts.child_id and c.family_id = (select auth.uid()))
    or public.is_admin()
  );

-- Written only by the website's server (the secret key). No write policies; the grants say the same.
revoke all on public.course_payments, public.family_courses, public.course_progress, public.quiz_attempts from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.course_payments, public.family_courses, public.course_progress, public.quiz_attempts from authenticated;
grant select on public.course_payments, public.family_courses, public.course_progress, public.quiz_attempts to authenticated;

-- ------------------------------------------------------------------------- buying a package

/*
  Records a package once Chapa has confirmed at least its price in birr (the website checks the
  currency and the reference with Chapa before calling this). Marks the pending payment paid and
  adds the package to the family, in one statement each. Safe to call more than once (the return
  page and the callback together): only the first call changes anything. Returns true when this
  call recorded it.
*/
create or replace function public.buy_course(p_tx_ref text, p_provider_ref text, p_amount numeric)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  pay public.course_payments;
begin
  update public.course_payments
     set status = 'paid', provider_ref = p_provider_ref, paid_at = now()
   where tx_ref = p_tx_ref and status = 'pending' and amount_etb <= p_amount and family_id is not null
  returning * into pay;
  if not found then
    return false;
  end if;

  insert into public.family_courses (family_id, course_id, purchased_at, tx_ref, amount_etb)
  values (pay.family_id, pay.course_id, now(), pay.tx_ref, pay.amount_etb)
  on conflict (family_id, course_id) do nothing;
  return true;
end;
$$;

revoke execute on function public.buy_course(text, text, numeric) from public, anon, authenticated;
grant execute on function public.buy_course(text, text, numeric) to service_role;

comment on table public.family_courses is
  'Learning packages a family bought (once, kept for good). Written only by buy_course() after Chapa confirms the payment.';
comment on table public.course_progress is
  'Each child''s progress through a learning package (docs/PACKAGES.md). Written only by the website''s server after it checks the family has the package and the level is open.';
comment on table public.quiz_attempts is
  'Every level quiz and final test, scored on the server against the course data. Written only by the server.';

-- ------------------------------------------------------------------------------------ test block
/*
  Run in the SQL editor AFTER applying this migration. Everything happens inside one transaction
  and is rolled back at the end, so nothing is kept. Each check raises an exception if it fails;
  if you see "ALL PACKAGE CHECKS PASSED" in the notices, every case worked.

begin;

do $$
declare
  fam uuid := gen_random_uuid();
  other uuid := gen_random_uuid();
  kid uuid;
  ok boolean;
  n int;
begin
  insert into auth.users (id, email, aud, role) values
    (fam, 'pkg-test-' || fam || '@example.com', 'authenticated', 'authenticated'),
    (other, 'pkg-test-' || other || '@example.com', 'authenticated', 'authenticated');
  insert into public.profiles (id, display_name) values (fam, 'Package test'), (other, 'Other family') on conflict (id) do nothing;
  insert into public.children (family_id, name, age_band) values (fam, 'Abeba', '3-5') returning id into kid;

  -- 1. Prices.
  if (select price_etb from public.plans where id = 'reader') <> 400
     or (select price_etb from public.plans where id = 'learner') <> 650
     or (select price_etb from public.plans where id = 'vip') <> 2500 then
    raise exception 'plan prices not updated';
  end if;

  -- 2. A package is bought once: a short payment is refused, the full one counts once.
  insert into public.course_payments (family_id, course_id, tx_ref, amount_etb)
  values (fam, 'fidel-foundations', 'lali-course-fidel-' || repeat('a', 20), 1500);
  if public.buy_course('lali-course-fidel-' || repeat('a', 20), 'chapa-test', 1000) then raise exception 'underpaid package accepted'; end if;
  if not public.buy_course('lali-course-fidel-' || repeat('a', 20), 'chapa-test', 1500) then raise exception 'package not recorded'; end if;
  if public.buy_course('lali-course-fidel-' || repeat('a', 20), 'chapa-test', 1500) then raise exception 'package counted twice'; end if;
  select count(*) into n from public.family_courses where family_id = fam and course_id = 'fidel-foundations';
  if n <> 1 then raise exception 'family_courses has % rows', n; end if;

  -- 3. References keep their shapes: a plan payment can't use a package reference.
  begin
    insert into public.payments (family_id, plan_id, tx_ref, amount_etb) values (fam, 'reader', 'lali-course-fidel-' || repeat('b', 20), 400);
    raise exception 'payment with a package reference accepted';
  exception when check_violation then null;
  end;
  begin
    insert into public.course_payments (family_id, course_id, tx_ref, amount_etb) values (fam, 'fidel-foundations', 'lali-reader-' || repeat('c', 18), 1500);
    raise exception 'package payment with a plan reference accepted';
  exception when check_violation then null;
  end;

  -- 4. Progress and attempts: the server writes; deleting the child removes them.
  insert into public.course_progress (child_id, course_id) values (kid, 'fidel-foundations');
  insert into public.quiz_attempts (child_id, course_id, quiz_id, score, total) values (kid, 'fidel-foundations', 'fidel-l1-quiz', 4, 5);
  begin
    insert into public.quiz_attempts (child_id, course_id, quiz_id, score, total) values (kid, 'fidel-foundations', 'fidel-l1-quiz', 6, 5);
    raise exception 'score above total accepted';
  exception when check_violation then null;
  end;

  -- 5. Row-level security as a signed-in parent: own rows only, and no writes.
  perform set_config('request.jwt.claims', json_build_object('sub', other, 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into n from public.course_progress;
  if n <> 0 then raise exception 'another family sees % progress rows', n; end if;
  select count(*) into n from public.family_courses;
  if n <> 0 then raise exception 'another family sees % packages', n; end if;
  begin
    insert into public.family_courses (family_id, course_id, tx_ref, amount_etb) values (other, 'numbers-counting', 'lali-course-numbers-' || repeat('d', 20), 1);
    raise exception 'a parent wrote family_courses';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.buy_course('lali-course-fidel-' || repeat('a', 20), 'x', 99999);
    raise exception 'a parent called buy_course';
  exception when insufficient_privilege then null;
  end;
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub', fam, 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into n from public.course_progress;
  if n <> 1 then raise exception 'the family sees % of its progress rows', n; end if;
  begin
    update public.course_progress set current_level = 9 where child_id = kid;
    raise exception 'a parent updated course_progress';
  exception when insufficient_privilege then null;
  end;
  reset role;

  raise notice 'ALL PACKAGE CHECKS PASSED';
end;
$$;

rollback;
*/
