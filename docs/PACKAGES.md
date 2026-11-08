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
| 1 | Fidel Foundations (`fidel-foundations`) | 3–6 | **Launch** |
| 2 | Amharic Readers (`amharic-readers`) | 6–9 | Coming soon |
| 3 | Numbers & Counting (`numbers-counting`) | 3–6 | **Launch** |
| 4 | Maths Explorers (`maths-explorers`) | 6–9 | Coming soon |
| 5 | English First Words (`english-first-words`) | 3–6 | Coming soon |
| 6 | English Readers (`english-readers`) | 6–9 | Coming soon |
| 7 | Values & Character (`values-character`) | 3–9 | **Launch** |
| 8 | Our Ethiopia (`our-ethiopia`) | 5–9 | Coming soon |
| 9 | Science & Nature (`science-nature`) | 5–9 | Coming soon |
| 10 | Healthy & Safe (`healthy-safe`) | 3–7 | Coming soon |

The six Fidel stories become the first levels of Fidel Foundations and the six Numbers stories the
first levels of Numbers & Counting. The six English stories stay in the Story Garden library until
English First Words launches.

## VIP: one package at a time, by mastery

- **Per child**: each child has one active package at a time (siblings aren't held back).
- **Mastery**: a level unlocks after the previous level's quiz is passed (80%); the package is
  complete when the final test is passed (80%).
- **Pace**: at most one new level every 4 days, so a package takes at least about a month.
- Finished packages stay open while the family is VIP; only *starting* a new one is gated.
- Families who **bought** a package have no pace limit on it (mastery still unlocks levels).
