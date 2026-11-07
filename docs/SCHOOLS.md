# School and classroom licences

Phase 4 of `docs/LAUNCH_PLAN.md`. A school buys a licence; its teachers make classes; children
read on a shared classroom tablet without an email address, signing in with three animal pictures.

## How it works

1. **The Lali team (admin) adds the school** on `/admin/schools`: name, contact (person, phone,
   email), **seats** (pupil places across all its classes) and the **last day** of the licence.
2. **The teacher signs in to Lali once** (`/login`, like a parent). The admin then types the
   teacher's email in the school's card ("Make teacher"): the account gets the `teacher` role and
   a row in `teachers`. Removing a teacher sets the role back to `parent` (admins stay admins).
3. **The teacher's corner** (`/teach`, linked from the Grown-ups' corner):
   - create classes ("KG 2 Blue", with an age group); each gets a short **class code** such as
     `LALI-KG2-7Q4` (the middle part from the class name, three random letters or digits with no
     0/O or 1/I/L);
   - add pupils by **first name only**, choosing an avatar (a Lali character on one of 8 colours);
     each pupil gets a random **picture password**: 3 of 9 animals, in order. The teacher sees
     each child's three pictures to tell them (or prints the page);
   - **This week**: assign stories; they come first on the class shelf;
   - **the class shelf**: every launch-library story for the class's age group (plus anything
     assigned). The school licence opens every pack, so the teacher can also read them all on
     their own account (`/stories/<id>`);
   - **class progress**: stories finished, read-aloud stars and last active, per pupil;
   - unlock a locked pupil, give new pictures, remove a pupil, delete the class.
4. **The classroom tablet**: open `/class/<code>` (or `/class` and type the code). It shows the
   class's avatars and first names. A child taps theirs, then their three pictures. Right: their
   shelf ("Hi, Abeba!", their stars, This week, the class shelf). Each book opens in the normal
   reader with their name in it (bookplate, `{name}`), and **Finished! Next friend** signs them
   out for the next child.

**Rules.** Packs open for pupils (and for the school's teachers) while the licence is open,
i.e. up to and including its end date (Addis Ababa day). After that, `/class/<code>` says the
licence has ended and pupils can't sign in; teachers still see their classes and progress.
Seats are checked when a pupil is added. Games and partner (PDF) books are not part of a school
licence.

## Security

- **Pupils have no database account.** Everything they do goes through the website's server,
  which writes with the secret key after checking a signed cookie.
- **The pupil session** is `lali-pupil`: `pupilId.classId.expiry.HMAC` (SHA-256, key derived
  from `PAGE_TOKEN_SECRET` or `SUPABASE_SECRET_KEY`), HttpOnly, `SameSite=Lax`, `Secure` in
  production, 4 hours. It carries no name. Every use checks again that the pupil is in that class
  and not locked, and that the school's licence is open (`currentPupil` in
  `apps/web/src/lib/schools/server.ts`).
- **Scoped to the classroom reader.** The reader's API calls only act as the pupil when the
  page is the classroom reader (`/class/<code>/read/<story>` adds `X-Lali-Pupil: 1`); every other
  page and API ignores the pupil cookie. The pupil can read only stories on their class shelf and
  can write only their own finished stories and reader stars.
- **Picture passwords** are 3 of 9 animals (504 orders). Wrong tries are counted per pupil in the
  database: **5 in a row lock the pupil** until the teacher presses Unlock; a right one resets
  the count. A second, in-memory limit allows 60 sign-in tries per device address per 10 minutes.
- **Class codes** can be guessed in principle (three random characters), so wrong codes are
  limited to 12 per address per 10 minutes, and a class page only shows first names and avatars.
- **Teachers** can only change their own classes: every action in `apps/web/src/app/[lang]/teach/actions.ts`
  checks the signed-in teacher, then that the class (or the pupil's class) is theirs. Admin
  actions call `requireAdmin()`. A parent can't make themselves a teacher (the profile policy
  keeps the role, and only the server sets it).
- **Row-level security** (migration 0015): teachers can read their school, their own classes and
  those classes' pupils, assignments and progress; admins read all; nobody writes through the
  API (no insert/update/delete grants or policies for `anon` or `authenticated`); `anon` has no
  access at all.

## Reader stars and stickers for pupils

- **Stars** (finished stories, `pupil_completions`) and **read-aloud stars**
  (`pupil_reader_stars`) are kept and show on the pupil's shelf and in the progress table.
- **Story stickers and milestones** are worked out from finished stories, so they show at The
  End. **Find Lali finds and sticker album positions are not kept for pupils** (scoped out: a
  shared tablet has no album), and the sticker book, family voices and printables are hidden in
  the classroom reader.
- Voice-actor narration works for stories on the class shelf.

## Privacy note for schools

Lali keeps as little about children as it can:

- **A first name only**, an avatar (a drawn character and a colour) and a picture password. No
  surname, no email, no phone number, no photo, no date of birth.
- **What they read**: which stories each child finished, which pages they read aloud (a star,
  not a recording: the read-aloud microphone records on the tablet only, unless a grown-up turns
  on the browser's speech service, which is a family setting and off on class tablets), and when
  they were last active.
- Only the class's teacher (and the Lali team) can see a class. Teachers can remove a pupil,
  which deletes their reading record; deleting a class deletes its pupils and their records;
  ending the school's relationship with Lali deletes everything (`delete from schools where id = …`
  cascades).
- The tablet session cookie holds only random ids and an expiry.

## Database: migration 0015 (review, then apply)

`supabase/migrations/0015_schools.sql` adds `schools`, `teachers`, `classes`, `pupils`,
`class_assignments`, `pupil_completions` and `pupil_reader_stars`, their row-level security and
grants, and allows `teacher` in `profiles.role` (replacing the check from 0001). It drops nothing
else. **It is not applied.** Before it is, the website degrades gracefully: `/teach` says classes
are being set up, `/admin/schools` says the migration is needed, class codes are not found, and
the pilot numbers page shows zeros for schools. It has not been run against a live database yet:
apply it to a Supabase branch first and run the checks at the end of the file.

## In the code

| What | Where |
|---|---|
| Rules and shapes (animals, avatars, codes) | `apps/web/src/lib/schools/shared.ts` |
| Server reads and writes, licence check, pupil session | `apps/web/src/lib/schools/server.ts`, `session.ts` |
| Admin | `apps/web/src/app/[lang]/admin/schools/` |
| Teacher's corner | `apps/web/src/app/[lang]/teach/` |
| Class tablet and reader | `apps/web/src/app/[lang]/class/` |
| Pictures (animals, avatars) | `apps/web/src/components/schools/pictures.tsx` |
| Pilot numbers (school counts) | `apps/web/src/app/[lang]/admin/stats/page.tsx` |
| Tests | `apps/web/e2e/schools.spec.ts` (fake Supabase in `e2e/support/stub-fetch.cjs`) |
