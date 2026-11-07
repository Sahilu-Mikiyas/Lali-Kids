-- Pre-launch security fixes (see docs/SECURITY_REVIEW.md).
--
-- NOT applied automatically: review, then apply. Every statement is safe to run on the live
-- database: nothing is dropped, no existing row is changed, and the new checks are NOT VALID
-- (they apply to new and changed rows only, so old rows can't make the migration fail).
--
-- 1. children: signed-in parents may only write the columns the website writes. Before, the
--    "own children" policy (for all) let a parent set any column of their own children through
--    the API, including `stars`. Row-level security still decides *which* rows.
-- 2. completions: the same for finished stories (insert child/type/id; move completed_at, which
--    "Allow more tonight" does), and story ids of at most 100 characters.
-- 3. Belt and braces: no TRUNCATE for browsers or the app on any table (row-level security does
--    not cover TRUNCATE), and no direct writes to the server-only tables.
-- 4. The hourly job sends a secret header (from Supabase Vault) so /api/cron/notify can refuse
--    other callers once CRON_SECRET is set on Render. Order: apply this, then create the Vault
--    secret, then set CRON_SECRET on Render to the same value (docs/OPERATIONS.md). Until both
--    exist the job keeps working exactly as before.
-- 5. Two indexes for foreign keys that deletes cascade through (Supabase's performance advisor).

-- ------------------------------------------------------------------------------- 1. children

revoke insert, update on public.children from anon, authenticated;
grant insert (family_id, name, age_band, preferred_lang, avatar) on public.children to authenticated;
grant update (name, age_band, preferred_lang, avatar) on public.children to authenticated;

alter table public.children
  add constraint children_name_length check (char_length(name) between 1 and 40) not valid;

-- ---------------------------------------------------------------------------- 2. completions

revoke insert, update on public.completions from anon, authenticated;
grant insert (child_id, item_type, item_id) on public.completions to authenticated;
grant update (completed_at) on public.completions to authenticated;

-- Length only (the website and the app now also check the shape): a stricter rule would make
-- "Allow more tonight" fail on any older row with an unusual id, because NOT VALID checks still
-- apply when a row is updated.
alter table public.completions
  add constraint completions_item_id_length check (char_length(item_id) between 1 and 100) not valid;

-- ------------------------------------------------------------------ 3. server-only, no truncate

revoke truncate on all tables in schema public from anon, authenticated;

-- Written only by the server with the secret key (no policies allow writes; this makes it explicit).
revoke insert, update, delete on public.payments, public.subscriptions, public.gifts, public.game_sessions from anon, authenticated;
revoke all on public.notifications_sent, public.gift_attempts from anon, authenticated;

-- ------------------------------------------------------------------- 4. the hourly job's secret

do $$
begin
  if to_regclass('vault.decrypted_secrets') is not null and exists (select 1 from pg_extension where extname = 'pg_cron') then
    -- Same name as 0008, so this replaces that job (same schedule and address, plus the header).
    perform cron.schedule(
      'lali-notify',
      '7 * * * *',
      $job$
        select net.http_get(
          url := 'https://lali-kids.onrender.com/api/cron/notify',
          headers := jsonb_build_object(
            'x-lali-cron',
            coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'lali_cron_secret' limit 1), '')
          ),
          timeout_milliseconds := 60000
        )
      $job$
    );
  else
    raise notice 'Vault or pg_cron not found: the hourly job is left as it was.';
  end if;
end;
$$;

-- ------------------------------------------------------------------------------ 5. indexes

create index if not exists game_sessions_game_idx on public.game_sessions (game_id);
create index if not exists page_views_book_idx on public.page_views (book_id);

-- ------------------------------------------------------------------------------ checks
/*
  After applying, as a signed-in parent through the API (or in the SQL editor with
  `set local role authenticated; set local request.jwt.claims = '{"sub":"<a family id>"}';`):
    update children set stars = 999 where id = '<own child>';         -- ERROR: permission denied
    insert into completions (child_id, item_type, item_id, completed_at)
      values ('<own child>', 'story', 'lost-moon', now());               -- ERROR: permission denied
    insert into completions (child_id, item_type, item_id)
      values ('<own child>', 'story', 'lost-moon');                      -- works
  And: select jobname, command from cron.job where jobname = 'lali-notify';  -- shows the header
*/
