-- Payments through Chapa, and the free trial.
-- Each successful payment adds 30 days of access. Plans do not renew automatically.

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.profiles (id) on delete cascade,
  plan_id text not null references public.plans (id),
  tx_ref text not null unique,           -- our reference, sent to Chapa
  amount_etb int not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  provider_ref text,                     -- Chapa's reference once paid
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index payments_family_idx on public.payments (family_id, created_at desc);

alter table public.payments enable row level security;
create policy "own payments" on public.payments
  for select using (family_id = auth.uid() or public.is_admin());
-- Payments are written only by the server with the secret key.

-- One subscription row per family keeps "what plan am I on" simple.
create unique index subscriptions_one_per_family on public.subscriptions (family_id);

/*
  Marks a payment paid and extends the family's access by 30 days.
  Safe to call more than once for the same tx_ref (webhook + return page):
  only the first call changes anything.
*/
create or replace function public.activate_payment(p_tx_ref text, p_provider_ref text, p_amount numeric)
returns boolean
language plpgsql
security definer set search_path = public
as $$
declare
  pay public.payments;
  base timestamptz;
begin
  update public.payments
     set status = 'paid', provider_ref = p_provider_ref, paid_at = now()
   where tx_ref = p_tx_ref and status = 'pending' and amount_etb <= p_amount
  returning * into pay;

  if not found then
    return false;
  end if;

  select greatest(current_period_end, now()) into base
    from public.subscriptions
   where family_id = pay.family_id and status in ('trialing', 'active');

  insert into public.subscriptions (family_id, plan_id, status, current_period_end, provider, provider_ref)
  values (pay.family_id, pay.plan_id, 'active', coalesce(base, now()) + interval '30 days', 'chapa', p_provider_ref)
  on conflict (family_id) do update
     set plan_id = excluded.plan_id,
         status = 'active',
         current_period_end = excluded.current_period_end,
         provider = 'chapa',
         provider_ref = excluded.provider_ref;
  return true;
end;
$$;

-- Starts the 7-day free trial, once per family. Returns false if already used.
create or replace function public.start_trial(p_family uuid, p_plan text)
returns boolean
language plpgsql
security definer set search_path = public
as $$
begin
  if exists (select 1 from public.subscriptions where family_id = p_family)
     or exists (select 1 from public.payments where family_id = p_family and status = 'paid') then
    return false;
  end if;
  insert into public.subscriptions (family_id, plan_id, status, current_period_end, provider)
  values (p_family, p_plan, 'trialing', now() + interval '7 days', 'trial');
  return true;
end;
$$;

-- Only the website's server may call these.
revoke execute on function public.activate_payment(text, text, numeric) from public, anon, authenticated;
revoke execute on function public.start_trial(uuid, text) from public, anon, authenticated;
grant execute on function public.activate_payment(text, text, numeric) to service_role;
grant execute on function public.start_trial(uuid, text) to service_role;
