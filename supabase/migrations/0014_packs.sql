-- Packages (docs/PACKAGES.md): every story belongs to one pack, and the family's plan decides
-- which packs open. Launch stories carry their pack in the code (src/content/stories.ts); this
-- gives stories made in the story studio a pack too.
--
--   story    the Story Garden: picture books (Reader, Learner, VIP)
--   fidel    the Amharic letters (Learner, VIP)
--   numbers  counting with Ge'ez numerals (Learner, VIP)
--   english  first English words (Learner, VIP)
--
-- Free stories stay open to everyone whatever their pack. The website treats a missing column
-- as `story`, so it works before and after this migration.

alter table public.stories
  add column if not exists pack text not null default 'story';

alter table public.stories
  drop constraint if exists stories_pack_check;

alter table public.stories
  add constraint stories_pack_check check (pack in ('story', 'fidel', 'numbers', 'english'));

-- Existing studio stories: the pack follows their world.
update public.stories
set pack = case category
    when 'Fidel' then 'fidel'
    when 'Maths' then 'numbers'
    when 'English' then 'english'
    else 'story'
  end
where pack = 'story';

comment on column public.stories.pack is
  'Which package the story belongs to: story (Story Garden), fidel, numbers or english. The plan decides which packs open.';
