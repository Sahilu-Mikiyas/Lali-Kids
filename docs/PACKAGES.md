# Lali plans and learning packages (v2)

Decided with the founder on 8 November 2026. This replaces the earlier "packs" model.

## Monthly plans: the story library

| Plan (internal id) | Price | What it opens |
|---|---|---|
| **Starter** (`reader`) | 400 birr / month | The Story Garden library (picture books, about 25 at launch, 4 new a month), 1 child, stickers, Find Lali, the read-aloud mic, printables for these stories |
| **Family** (`learner`) | 650 birr / month | Everything in Starter + up to 3 children, games, family voices, narration, the progress map, the weekly Telegram note, offline reading in the app |
| **VIP** (`vip`) | 2,500 birr / month | Everything, up to 4 children, **every learning package** (one at a time per child, see below), printed book and live reading circle |

The internal ids stay `reader`, `learner` and `vip` so existing subscriptions, payments and gifts
keep working; only the names, prices and contents change.

**Free tasters:** about 5 picture books, plus the first story of each live learning package.

## Learning packages: buy once, keep for good

About **1,500 birr each**, bought once per family (every child in the family can use it, each with
their own progress). Each package is a **course**: 5–6 levels, each with 4–5 teaching stories,
interactive demonstrations, practice and a level quiz; then a final mastery test and a certificate.
About 25–30 stories, 40+ activities and 6+ quizzes per package; 6–10 weeks of learning at 3–4
sessions a week. Content format: `apps/web/src/content/courses/types.ts`.

| # | Package (id) | Ages | Status |
|---|---|---|---|
| 1 | Fidel Foundations (`fidel-foundations`) | 3–6 | **Live** (6 levels) |
| 2 | Amharic Readers (`amharic-readers`) | 6–9 | Being written |
| 3 | Numbers & Counting (`numbers-counting`) | 3–6 | **Live** (6 levels) |
| 4 | Maths Explorers (`maths-explorers`) | 6–9 | Being written |
| 5 | English First Words (`english-first-words`) | 3–6 | **Live** (6 levels) |
| 6 | English Readers (`english-readers`) | 6–9 | Being written |
| 7 | Values & Character (`values-character`) | 3–9 | **Live** (6 levels) |
| 8 | Our Ethiopia (`our-ethiopia`) | 5–9 | **Live** (6 levels) |
| 9 | Science & Nature (`science-nature`) | 5–9 | Coming soon |
| 10 | Healthy & Safe (`healthy-safe`) | 3–7 | Coming soon |

The six Fidel stories become the first levels of Fidel Foundations and the six Numbers stories the
first levels of Numbers & Counting. The five English library stories (`a-is-for-adey`, `grandmas-kitchen`,
`hello-feelings`, `opposites`, `weather-words`) are now lessons in English First Words.

## VIP: one package at a time, by mastery

- **Per child**: each child has one active package at a time (siblings aren't held back).
- **Mastery**: a level unlocks after the previous level's quiz is passed (80%); the package is
  complete when the final test is passed (80%).
- **Pace**: at most one new level every 4 days, so a package takes at least about a month.
- Finished packages stay open while the family is VIP; only *starting* a new one is gated.
- Families who **bought** a package have no pace limit on it (mastery still unlocks levels).

## Implementation notes (platform v2)

### Plans and what they open

One helper decides every gate: `apps/web/src/lib/entitlements.ts` (`familyEntitlements`). The
shelf and reader (`src/lib/stories.ts`), children (`src/lib/family.ts`), games (`src/lib/games.ts`),
family voices (`src/lib/voices/server.ts`), narration (`src/lib/narration/server.ts`), the progress
map, the weekly Telegram note (`/api/cron/notify`), the packages (`src/lib/courses/server.ts`) and the
app's API (`GET me` returns the same `entitlements` object) all ask it.

| What | No plan | Starter (`reader`) | Family (`learner`) | VIP (`vip`) |
|---|---|---|---|---|
| Children who can read | 1 | 1 | 3 | 4 |
| Story Garden library (`story` stories) | free stories and tasters | yes | yes | yes |
| Paid games | | | yes | yes |
| Recording family voices | | | yes | yes |
| Narration of paid stories | | | yes | yes |
| Progress map | | | yes | yes |
| Weekly Telegram note | | | yes | yes |
| Offline reading in the app (`entitlements.offline`, enforced by the app) | | | yes | yes |
| Learning packages | buy | buy | buy | all, one at a time per child |

- **Confirmed by the founder (10 November 2026):** no plan means 1 child; a teacher with an open
  school licence gets Family's gates; narration of free stories is open to everyone; offline reading
  (Family and VIP) is enforced by the app.
- **Children beyond the limit** are kept with all their stars, stickers and progress, but are
  read-only: they can't be chosen to read (`familyFor` only picks among the first N by age of the
  profile; `chooseChild` refuses them; the shelf's chooser shows them greyed with a lock), and
  adding a child is refused when the plan is full (website and `POST children` → `402`).
- Free things stay free: the free picture books and course tasters (with their narration), free
  games, and playing back voices already recorded. Plan reminders on Telegram go to everyone.
- **Schools** (`docs/SCHOOLS.md`): a teacher with an open school licence gets Family's gates on
  their own account. Pupils on a class tablet keep their class shelf, which still includes the
  Fidel and Numbers stories (a classroom licence, not a family plan).
- **Admins** get everything.
- **Free tasters**: `new-year-flowers`, `lost-moon`, `meskel-fire`, `big-sneeze`, `biggest-injera`
  (`isFree`), plus the `tasterStoryId` of each live package (`tasterIds()` in
  `src/lib/courses/catalog.ts`); course writers set it in their `index.ts`.
- **Course stories** (`course` set: the five Fidel library stories and `fidel-train` →
  `fidel-foundations`; the five Numbers stories and `gugu-counts` → `numbers-counting`; the five English library stories → `english-first-words`) are not on
  the library shelf; `/stories/<id>` shows "This story is part of …" with a link to the package.
  They open in the package's lessons, and their narration and the app's `GET stories/:id` work for
  families who have the package.

### Packages

| Piece | Where |
|---|---|
| Course data on the server (never sent whole to the browser), readiness, tasters, lesson ids | `apps/web/src/lib/courses/catalog.ts` |
| Quizzes without answers, scoring, stars, the level map's states, VIP's pace | `apps/web/src/lib/courses/engine.ts` |
| Access (bought / VIP / none), one-at-a-time, every write | `apps/web/src/lib/courses/server.ts` |
| Buying (Chapa) | `apps/web/src/lib/courses/checkout.ts`, `docs/PAYMENTS.md` |
| Pages | `/courses` (catalogue), `/courses/<id>` (level map), `/courses/<id>/lesson/<lessonId>`, `/courses/<id>/quiz/<quizId>`, `/courses/<id>/certificate`, `/courses/done` |
| Browser side: pictures (`art.tsx`) and demos of every course | `apps/web/src/components/courses/registry.tsx` |
| Level map, quiz player, lesson players, buy/start buttons | `apps/web/src/components/courses/*` |
| Server actions | `apps/web/src/app/[lang]/courses/actions.ts` |

- **Ready**: a package can be bought and played when it is `live` and has at least one level and a
  final test with questions. Live packages still being written show "Being written" in the
  catalogue and a friendly "levels are being written" card instead of the map.
- **Lesson ids**: `story-<storyId>`, `demo-<demoId>`, `practice-<quizId>`. Quiz ids must be unique
  across packages (`<course>-l1-quiz`, `<course>-final`, …): the app's `POST quizzes/:id/attempt`
  finds the package by the quiz id.
- **Lessons**: a story opens the normal reader (its close and "more stories" buttons go back to the
  package); The End counts the lesson (and the story's star as usual). A demo counts when it calls
  `onDone`. Practice runs the quiz player: each answer is checked on the server and the child sees
  right away whether it was right and the `explain`; nothing is recorded.
- **Quizzes**: level quizzes and the final test are sent without answers (choices in their written
  order; `order` items and the right side of `match` shuffled by an HMAC of the child, the quiz and
  the question, so only the server knows the right order). The player sends all the answers at the
  end; the server scores them against the course data (`passMark`, 0.8 when left out), records the
  attempt and the best score, and returns what was right with each `explain` for a gentle review.
  Stars: 3 for all right, 2 for 90 % or more, 1 for a pass. Attempts are rate-limited (30 per family
  per 10 minutes; practice checks 240).
- **Mastery**: passing the current level's quiz opens the next level; passing the last level's quiz
  opens the final test; passing that completes the package: a printable certificate
  (`/courses/<id>/certificate`) and a champion sticker (`course:<id>`, on the milestones page of
  the sticker book). Earlier levels stay open for practice and more stars.
- **VIP**: the child starts a package from its page ("Start this package with …"). Another package
  can start only when that one is completed (bought packages don't count). Each new level (and the
  final test) opens at most 4 days after the previous one opened: `level_unlocked_at` is set to
  `max(now, previous + 4 days)`, and the map says "The next level opens on …". Finished packages
  stay open while the family is VIP. If the family later buys the package, the pace stops.
- **Bought**: starts by itself on the first lesson or quiz; no pace, no one-at-a-time.
- **Grown-ups' corner**: each child's packages with level, best scores and certificate; for VIP a
  "Choose next package" button when the child has nothing in progress. The progress map shows the
  packages too.
- **Before migration 0016** the catalogue and maps still render; buying, starting and saving say
  packages are being switched on.
- **Not built yet**: gifting a package (gifts are plans only for now), receipts for package
  purchases in the Grown-ups' corner, and the app's own screens (the API is ready, `docs/MOBILE.md`).

### Testing

The end-to-end suite builds two tiny test packages (`apps/web/e2e/fixtures/`) into the test build
only (`NEXT_PUBLIC_LALI_E2E=1`); they are never in the catalogue. `e2e/courses.spec.ts` covers the
plan gates, buying with stubbed Chapa, the map, lessons, a quiz failed and passed, VIP's one package
at a time and the 4-day pace (the fake's `/__stub/travel` moves a family's dates back), and the
certificate and sticker.

