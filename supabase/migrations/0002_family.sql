-- Family settings and story completions for the grown-ups' area.

-- How many stories a child may finish per night before Lali says goodnight. 0 = no limit.
alter table public.profiles add column nightly_limit int not null default 3 check (nightly_limit between 0 and 20);

-- Which character the child picked as their avatar.
alter table public.children add column avatar text not null default 'cub' check (avatar in ('cub', 'gugu', 'bee'));

-- One row every time a child finishes a story or a book. Drives stars, the nightly
-- limit and the weekly note.
create table public.completions (
  id bigint generated always as identity primary key,
  child_id uuid not null references public.children (id) on delete cascade,
  item_type text not null check (item_type in ('story', 'book')),
  item_id text not null,
  completed_at timestamptz not null default now()
);
create index completions_child_time_idx on public.completions (child_id, completed_at desc);

alter table public.completions enable row level security;
create policy "own children's completions" on public.completions
  for all using (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()))
  with check (exists (select 1 from public.children c where c.id = child_id and c.family_id = auth.uid()));

-- Finishing a story earns a star.
create or replace function public.award_star()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.children set stars = stars + 1 where id = new.child_id;
  return new;
end;
$$;

create trigger on_completion_award_star
  after insert on public.completions
  for each row execute function public.award_star();
