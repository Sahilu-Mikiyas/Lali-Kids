-- Gift plans: relatives anywhere pay for a family's Lali plan, without a Lali account.
--
-- 1. The giver pays on /gift through Chapa (in birr). The gift row is created as 'pending' with a
--    random code (LALI-XXXX-XXXX) that is only shown once Chapa confirms the full amount in ETB.
-- 2. A parent signs in and redeems the code on /gift/redeem. The days (months x 30) are added
--    with exactly the same rules as a payment, because activate_payment and redeem_gift now share
--    one function, apply_plan_days:
--      same plan  -> the days are added on top of the days left;
--      upgrade    -> starts now, the days left are converted by value, then the days are added;
--      downgrade  -> waits until the current plan ends (kept in next_plan_id / next_days).
-- 3. Each code can be redeemed once. Wrong codes are rate-limited per family (10 misses an hour).
--
-- Not applied automatically: review, then apply. A test block to run inside a transaction is at
-- the end of this file.

-- ---------------------------------------------------------------------------------------- tables

create table public.gifts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^LALI-[A-HJKMNP-Z2-9]{4}-[A-HJKMNP-Z2-9]{4}$'),
  plan_id text not null references public.plans (id),
  months int not null check (months in (1, 3, 6, 12)),
  amount_etb int not null check (amount_etb > 0),
  giver_name text not null check (char_length(giver_name) between 1 and 60),
  giver_email text not null check (char_length(giver_email) between 3 and 200),
  recipient_label text not null check (char_length(recipient_label) between 1 and 80),
  message text check (message is null or char_length(message) <= 300),
  tx_ref text not null unique check (tx_ref ~ '^lali-gift-[0-9a-f]{24}$'),
  status text not null default 'pending' check (status in ('pending', 'paid', 'redeemed')),
  provider_ref text,                      -- Chapa's reference once paid
  paid_at timestamptz,
  redeemed_by uuid references public.profiles (id) on delete set null,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);
create index gifts_created_idx on public.gifts (created_at desc);
create index gifts_redeemed_by_idx on public.gifts (redeemed_by);

-- A plan payment's reference can never look like a gift's (the callback tells them apart by prefix).
alter table public.payments
  add constraint payments_tx_ref_not_gift check (tx_ref not like 'lali-gift-%');

-- Wrong codes tried by each family, for rate limiting.
create table public.gift_attempts (
  id bigint generated always as identity primary key,
  family_id uuid not null references public.profiles (id) on delete cascade,
  tried_at timestamptz not null default now()
);
create index gift_attempts_family_idx on public.gift_attempts (family_id, tried_at desc);

-- -------------------------------------------------------------------------- row-level security

alter table public.gifts enable row level security;
-- No public access. A family can read the gifts it redeemed. Everything else is the server's.
create policy "own redeemed gifts" on public.gifts
  for select using (status = 'redeemed' and redeemed_by = auth.uid());

alter table public.gift_attempts enable row level security;
-- Written and read only by the server.

-- ------------------------------------------------------------------- one rule for adding days

/*
  Adds p_days of p_plan to a family, with the plan-switching rules from 0006.
  Returns what it did: 'new', 'renew', 'upgrade' or 'downgrade'.
  p_provider is written only when a new plan starts (as before); p_provider_ref is always written.
*/
create or replace function public.apply_plan_days(
  p_family uuid,
  p_plan text,
  p_days numeric,
  p_provider text default 'chapa',
  p_provider_ref text default null
)
returns text
language plpgsql
security definer set search_path = public
as $$
declare
  sub public.subscriptions;
  new_price numeric;
  cur_price numeric;
  next_price numeric;
  left_days numeric;
begin
  if p_days is null or p_days <= 0 then
    raise exception 'apply_plan_days: days must be positive';
  end if;

  perform public.settle_subscription(p_family);
  select * into sub from public.subscriptions where family_id = p_family for update;
  select price_etb into new_price from public.plans where id = p_plan;
  if new_price is null then
    raise exception 'apply_plan_days: unknown plan %', p_plan;
  end if;

  if sub.id is null or sub.status not in ('trialing', 'active') or sub.current_period_end <= now() then
    -- No open plan: start fresh.
    insert into public.subscriptions (family_id, plan_id, status, current_period_end, provider, provider_ref)
    values (p_family, p_plan, 'active', now() + p_days * interval '1 day', p_provider, p_provider_ref)
    on conflict (family_id) do update
       set plan_id = excluded.plan_id, status = 'active', current_period_end = excluded.current_period_end,
           next_plan_id = null, next_days = 0, provider = excluded.provider, provider_ref = excluded.provider_ref;
    return 'new';
  end if;

  select price_etb into cur_price from public.plans where id = sub.plan_id;

  if p_plan = sub.plan_id then
    update public.subscriptions
       set current_period_end = current_period_end + p_days * interval '1 day', provider_ref = p_provider_ref
     where id = sub.id;
    return 'renew';
  end if;

  if new_price > cur_price then
    left_days := extract(epoch from (sub.current_period_end - now())) / 86400.0;
    update public.subscriptions
       set plan_id = p_plan,
           status = 'active',
           current_period_end = now() + (left_days * cur_price / new_price + p_days) * interval '1 day',
           provider_ref = p_provider_ref
     where id = sub.id;
    return 'upgrade';
  end if;

  if sub.next_plan_id is null or sub.next_plan_id = p_plan then
    update public.subscriptions
       set next_plan_id = p_plan, next_days = coalesce(next_days, 0) + p_days, provider_ref = p_provider_ref
     where id = sub.id;
  else
    -- A different plan was already waiting: convert its days by value, then add the new days.
    select price_etb into next_price from public.plans where id = sub.next_plan_id;
    update public.subscriptions
       set next_plan_id = p_plan, next_days = next_days * next_price / new_price + p_days, provider_ref = p_provider_ref
     where id = sub.id;
  end if;
  return 'downgrade';
end;
$$;

-- Same signature and behaviour as 0006: 30 days per confirmed payment, counted once.
create or replace function public.activate_payment(p_tx_ref text, p_provider_ref text, p_amount numeric)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  pay public.payments;
  k text;
begin
  update public.payments
     set status = 'paid', provider_ref = p_provider_ref, paid_at = now()
   where tx_ref = p_tx_ref and status = 'pending' and amount_etb <= p_amount
  returning * into pay;
  if not found then
    return false;
  end if;

  k := public.apply_plan_days(pay.family_id, pay.plan_id, 30, 'chapa', p_provider_ref);

  update public.payments set kind = k where id = pay.id;
  return true;
end;
$$;

-- --------------------------------------------------------------------------------------- gifts

/*
  Marks a gift paid once Chapa has confirmed at least its full price in birr (the website checks
  the currency with Chapa before calling this). Safe to call more than once: only the first counts.
*/
create or replace function public.mark_gift_paid(p_tx_ref text, p_provider_ref text, p_amount numeric)
returns boolean
language plpgsql
security definer set search_path = public
as $$
begin
  update public.gifts
     set status = 'paid', provider_ref = p_provider_ref, paid_at = now()
   where tx_ref = p_tx_ref and status = 'pending' and amount_etb <= p_amount;
  return found;
end;
$$;

-- True when the family has tried 10 or more wrong codes in the last hour.
create or replace function public.gift_rate_limited(p_family uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select count(*) >= 10 from public.gift_attempts
   where family_id = p_family and tried_at > now() - interval '1 hour';
$$;

/*
  What a code would give, before redeeming it. A wrong code counts towards the rate limit.
  Returns { ok, error?: 'rate' | 'invalid' | 'used', plan_id, months, giver_name, recipient_label,
  message, mine }. 'invalid' also covers gifts that are not paid yet.
*/
create or replace function public.peek_gift(p_code text, p_family uuid)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  g public.gifts;
begin
  if public.gift_rate_limited(p_family) then
    return jsonb_build_object('ok', false, 'error', 'rate');
  end if;
  select * into g from public.gifts where code = upper(trim(p_code)) and status in ('paid', 'redeemed');
  if not found then
    insert into public.gift_attempts (family_id) values (p_family);
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;
  if g.status = 'redeemed' then
    return jsonb_build_object('ok', false, 'error', 'used', 'mine', g.redeemed_by = p_family);
  end if;
  return jsonb_build_object(
    'ok', true, 'plan_id', g.plan_id, 'months', g.months, 'giver_name', g.giver_name,
    'recipient_label', g.recipient_label, 'message', g.message
  );
end;
$$;

/*
  Redeems a paid gift for a family, once. The days (months x 30) go through apply_plan_days, so a
  gift follows exactly the same rules as a payment. A wrong code counts towards the rate limit.
  Returns { ok, error?: 'rate' | 'invalid' | 'used', kind, plan_id, months, giver_name,
  current_period_end, next_plan_id, next_days }.
*/
create or replace function public.redeem_gift(p_code text, p_family uuid)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  g public.gifts;
  sub public.subscriptions;
  k text;
begin
  if public.gift_rate_limited(p_family) then
    return jsonb_build_object('ok', false, 'error', 'rate');
  end if;

  update public.gifts
     set status = 'redeemed', redeemed_by = p_family, redeemed_at = now()
   where code = upper(trim(p_code)) and status = 'paid'
  returning * into g;

  if not found then
    if exists (select 1 from public.gifts where code = upper(trim(p_code)) and status = 'redeemed') then
      return jsonb_build_object('ok', false, 'error', 'used');
    end if;
    insert into public.gift_attempts (family_id) values (p_family);
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;

  k := public.apply_plan_days(p_family, g.plan_id, g.months * 30, 'gift', g.tx_ref);
  select * into sub from public.subscriptions where family_id = p_family;

  return jsonb_build_object(
    'ok', true, 'kind', k, 'plan_id', g.plan_id, 'months', g.months, 'giver_name', g.giver_name,
    'current_period_end', sub.current_period_end, 'next_plan_id', sub.next_plan_id, 'next_days', sub.next_days
  );
end;
$$;

-- ----------------------------------------------------------------- only the server may call these

revoke execute on function public.apply_plan_days(uuid, text, numeric, text, text) from public, anon, authenticated;
revoke execute on function public.activate_payment(text, text, numeric) from public, anon, authenticated;
revoke execute on function public.mark_gift_paid(text, text, numeric) from public, anon, authenticated;
revoke execute on function public.gift_rate_limited(uuid) from public, anon, authenticated;
revoke execute on function public.peek_gift(text, uuid) from public, anon, authenticated;
revoke execute on function public.redeem_gift(text, uuid) from public, anon, authenticated;
grant execute on function public.apply_plan_days(uuid, text, numeric, text, text) to service_role;
grant execute on function public.activate_payment(text, text, numeric) to service_role;
grant execute on function public.mark_gift_paid(text, text, numeric) to service_role;
grant execute on function public.gift_rate_limited(uuid) to service_role;
grant execute on function public.peek_gift(text, uuid) to service_role;
grant execute on function public.redeem_gift(text, uuid) to service_role;

-- ------------------------------------------------------------------------------------ test block
/*
  Run in the SQL editor AFTER applying this migration. Everything happens inside one transaction
  and is rolled back at the end, so nothing is kept. Each check raises an exception if it fails;
  if you see "ALL GIFT CHECKS PASSED" in the notices, every case worked.

begin;

do $$
declare
  fam uuid := gen_random_uuid();
  r jsonb;
  s public.subscriptions;
  ends_before timestamptz;
begin
  -- A throwaway family (the auth user cascades to the profile; both are rolled back).
  insert into auth.users (id, email, aud, role) values (fam, 'gift-test-' || fam || '@example.com', 'authenticated', 'authenticated');
  insert into public.profiles (id, display_name) values (fam, 'Gift test') on conflict (id) do nothing;

  insert into public.gifts (code, plan_id, months, amount_etb, giver_name, giver_email, recipient_label, tx_ref, status, paid_at) values
    ('LALI-TEST-AAAA', 'learner', 1, 1200, 'Aunt Hana', 'hana@example.com', 'Abeba''s family', 'lali-gift-' || repeat('a', 24), 'paid', now()),
    ('LALI-TEST-BBBB', 'reader',  3, 1200, 'Uncle Dawit', 'dawit@example.com', 'Abeba''s family', 'lali-gift-' || repeat('b', 24), 'paid', now()),
    ('LALI-TEST-CCCC', 'learner', 1, 1200, 'Grandma Tigist', 'tigist@example.com', 'Abeba''s family', 'lali-gift-' || repeat('c', 24), 'paid', now()),
    ('LALI-TEST-DDDD', 'vip',     1, 5000, 'Not paid yet', 'x@example.com', 'Abeba''s family', 'lali-gift-' || repeat('d', 24), 'pending', null);

  -- Start: 20 days of Reader.
  insert into public.subscriptions (family_id, plan_id, status, current_period_end, provider)
  values (fam, 'reader', 'active', now() + interval '20 days', 'chapa');

  -- 1. Upgrade by gift: Learner for 1 month. 20 Reader days = 20 x 400 / 1200 = 6.67 Learner days, + 30.
  r := public.redeem_gift('LALI-TEST-AAAA', fam);
  select * into s from public.subscriptions where family_id = fam;
  if not (r->>'ok')::boolean or r->>'kind' <> 'upgrade' or s.plan_id <> 'learner'
     or abs(extract(epoch from (s.current_period_end - now())) / 86400.0 - (20.0 * 400 / 1200 + 30)) > 0.01 then
    raise exception 'upgrade by gift failed: % / %', r, row_to_json(s);
  end if;
  if (select redeemed_by from public.gifts where code = 'LALI-TEST-AAAA') <> fam
     or (select redeemed_at from public.gifts where code = 'LALI-TEST-AAAA') is null then
    raise exception 'redeemed_by / redeemed_at not recorded';
  end if;

  -- 2. Downgrade by gift: Reader for 3 months waits until Learner ends. Learner's end date is unchanged.
  ends_before := s.current_period_end;
  r := public.redeem_gift('LALI-TEST-BBBB', fam);
  select * into s from public.subscriptions where family_id = fam;
  if not (r->>'ok')::boolean or r->>'kind' <> 'downgrade' or s.plan_id <> 'learner' or s.current_period_end <> ends_before
     or s.next_plan_id <> 'reader' or s.next_days <> 90 then
    raise exception 'downgrade by gift failed: % / %', r, row_to_json(s);
  end if;

  -- 3. Same-plan gift: Learner for 1 month adds 30 days to Learner; the waiting Reader days stay.
  r := public.redeem_gift('LALI-TEST-CCCC', fam);
  select * into s from public.subscriptions where family_id = fam;
  if not (r->>'ok')::boolean or r->>'kind' <> 'renew' or s.plan_id <> 'learner'
     or s.current_period_end <> ends_before + interval '30 days' or s.next_days <> 90 then
    raise exception 'same-plan gift failed: % / %', r, row_to_json(s);
  end if;

  -- 4. A code used twice fails, and changes nothing.
  ends_before := s.current_period_end;
  r := public.redeem_gift('LALI-TEST-AAAA', fam);
  select * into s from public.subscriptions where family_id = fam;
  if (r->>'ok')::boolean or r->>'error' <> 'used' or s.current_period_end <> ends_before then
    raise exception 'second use of a code did not fail: %', r;
  end if;

  -- Extra: an unpaid gift can't be redeemed, and wrong codes are rate-limited after 10 misses.
  r := public.redeem_gift('LALI-TEST-DDDD', fam);
  if (r->>'ok')::boolean or r->>'error' <> 'invalid' then raise exception 'unpaid gift was accepted: %', r; end if;
  for i in 1..9 loop perform public.peek_gift('LALI-NOPE-NOPE', fam); end loop;
  r := public.peek_gift('LALI-TEST-CCCC', fam);
  if r->>'error' <> 'rate' then raise exception 'rate limit did not apply: %', r; end if;

  -- Extra: plan payments behave as before (same plan adds 30 days, kind is recorded).
  delete from public.gift_attempts where family_id = fam;
  insert into public.payments (family_id, plan_id, tx_ref, amount_etb) values (fam, 'learner', 'lali-learner-' || repeat('e', 18), 1200);
  if not public.activate_payment('lali-learner-' || repeat('e', 18), 'chapa-test', 1200) then raise exception 'payment not activated'; end if;
  if public.activate_payment('lali-learner-' || repeat('e', 18), 'chapa-test', 1200) then raise exception 'payment counted twice'; end if;
  select * into s from public.subscriptions where family_id = fam;
  if s.current_period_end <> ends_before + interval '30 days'
     or (select kind from public.payments where tx_ref = 'lali-learner-' || repeat('e', 18)) <> 'renew' then
    raise exception 'payment after refactor failed: %', row_to_json(s);
  end if;

  raise notice 'ALL GIFT CHECKS PASSED';
end;
$$;

rollback;
*/
