-- Fair plan switching.
--
-- Same plan: adds 30 days.
-- Upgrade (pricier plan): starts now. The days left on the old plan are turned into days on
--   the new plan by their value in birr, then 30 days are added.
--   Example: 20 Reader days (20 x 400/30 birr) = 6.7 Learner days, so 36.7 Learner days.
-- Downgrade (cheaper plan): waits until the current plan ends, so nobody loses paid days.
--   The waiting days are kept in next_plan_id / next_days and start automatically.

alter table public.subscriptions
  add column next_plan_id text references public.plans (id),
  add column next_days numeric not null default 0;

alter table public.payments
  add column kind text check (kind in ('new', 'renew', 'upgrade', 'downgrade'));

-- Starts a waiting (downgraded) plan once the current one has ended.
create or replace function public.settle_subscription(p_family uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.subscriptions
     set plan_id = next_plan_id,
         current_period_end = current_period_end + next_days * interval '1 day',
         status = 'active',
         next_plan_id = null,
         next_days = 0
   where family_id = p_family
     and next_plan_id is not null
     and current_period_end <= now();
end;
$$;

-- Access is open while the current plan or a waiting plan still has time.
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
      and current_period_end + coalesce(case when next_plan_id is not null then next_days end, 0) * interval '1 day' > now()
  );
$$;

create or replace function public.activate_payment(p_tx_ref text, p_provider_ref text, p_amount numeric)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  pay public.payments;
  sub public.subscriptions;
  new_price numeric;
  cur_price numeric;
  next_price numeric;
  left_days numeric;
  k text;
begin
  update public.payments
     set status = 'paid', provider_ref = p_provider_ref, paid_at = now()
   where tx_ref = p_tx_ref and status = 'pending' and amount_etb <= p_amount
  returning * into pay;
  if not found then
    return false;
  end if;

  perform public.settle_subscription(pay.family_id);
  select * into sub from public.subscriptions where family_id = pay.family_id for update;
  select price_etb into new_price from public.plans where id = pay.plan_id;

  if sub.id is null or sub.status not in ('trialing', 'active') or sub.current_period_end <= now() then
    -- No open plan: start fresh.
    k := 'new';
    insert into public.subscriptions (family_id, plan_id, status, current_period_end, provider, provider_ref)
    values (pay.family_id, pay.plan_id, 'active', now() + interval '30 days', 'chapa', p_provider_ref)
    on conflict (family_id) do update
       set plan_id = excluded.plan_id, status = 'active', current_period_end = excluded.current_period_end,
           next_plan_id = null, next_days = 0, provider = 'chapa', provider_ref = excluded.provider_ref;
  else
    select price_etb into cur_price from public.plans where id = sub.plan_id;
    if pay.plan_id = sub.plan_id then
      k := 'renew';
      update public.subscriptions
         set current_period_end = current_period_end + interval '30 days', provider_ref = p_provider_ref
       where id = sub.id;
    elsif new_price > cur_price then
      k := 'upgrade';
      left_days := extract(epoch from (sub.current_period_end - now())) / 86400.0;
      update public.subscriptions
         set plan_id = pay.plan_id,
             status = 'active',
             current_period_end = now() + (left_days * cur_price / new_price + 30) * interval '1 day',
             provider_ref = p_provider_ref
       where id = sub.id;
    else
      k := 'downgrade';
      if sub.next_plan_id is null or sub.next_plan_id = pay.plan_id then
        update public.subscriptions
           set next_plan_id = pay.plan_id, next_days = coalesce(next_days, 0) + 30, provider_ref = p_provider_ref
         where id = sub.id;
      else
        -- A different plan was already waiting: convert its days by value, then add 30.
        select price_etb into next_price from public.plans where id = sub.next_plan_id;
        update public.subscriptions
           set next_plan_id = pay.plan_id, next_days = next_days * next_price / new_price + 30, provider_ref = p_provider_ref
         where id = sub.id;
      end if;
    end if;
  end if;

  update public.payments set kind = k where id = pay.id;
  return true;
end;
$$;

revoke execute on function public.settle_subscription(uuid) from public, anon, authenticated;
revoke execute on function public.activate_payment(text, text, numeric) from public, anon, authenticated;
revoke execute on function public.has_active_subscription(uuid) from public, anon, authenticated;
grant execute on function public.settle_subscription(uuid) to service_role;
grant execute on function public.activate_payment(text, text, numeric) to service_role;
grant execute on function public.has_active_subscription(uuid) to service_role;
