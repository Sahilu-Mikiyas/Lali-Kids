-- Deleting a family's account.
--
-- Deleting the auth user removes the profile, and with it children, stars, settings, game time,
-- Telegram link and family voice rows (all `on delete cascade`). Two changes make that work cleanly:
--
-- 1. Payments are kept for the accounts, but no longer point at the deleted family.
-- 2. Books uploaded by an admin who is later deleted stay in the library (this used to block the
--    deletion with a foreign-key error).
--
-- The recording files themselves live in Storage and are removed by the website before the account
-- is deleted, plus an hourly sweep for folders whose family no longer exists (see
-- apps/web/src/lib/account.ts).

alter table public.payments alter column family_id drop not null;
alter table public.payments drop constraint payments_family_id_fkey;
alter table public.payments
  add constraint payments_family_id_fkey foreign key (family_id) references public.profiles (id) on delete set null;

alter table public.books drop constraint books_created_by_fkey;
alter table public.books
  add constraint books_created_by_fkey foreign key (created_by) references public.profiles (id) on delete set null;
