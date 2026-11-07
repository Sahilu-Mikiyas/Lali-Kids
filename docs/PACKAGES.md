# Lali packages

Every story belongs to one **pack** (`pack` on `Story` in `apps/web/src/content/stories.ts`;
`story` when left out). The plan a family pays for decides which packs open.

| Pack | What's in it | Ages | Opens with |
|---|---|---|---|
| **Story Garden** (`story`) | Picture books: bedtime, festivals, folk tales, everyday adventures, kindness and courage | 3–9 | Reader, Learner, VIP |
| **Fidel** (`fidel`) | The Amharic letters, a family at a time: sounds, chants, first words | 3–7 | Learner, VIP |
| **Numbers** (`numbers`) | Counting with Ge'ez numerals, shapes, sizes, patterns, money | 3–9 | Learner, VIP |
| **English** (`english`) | Letters, first words, opposites, feelings, everyday vocabulary | 3–7 | Learner, VIP |

| Plan | Price | Packs | Extras |
|---|---|---|---|
| **Free** | 0 | A few free stories from each pack | Stickers, Find Lali, read-along mic |
| **Reader** | 400 birr / 30 days | Story Garden | Printable activities for its stories, 1 child |
| **Learner** | 1,200 birr / 30 days | Story Garden + Fidel + Numbers + English | All printables, progress map, up to 2 children |
| **VIP** | 5,000 birr / 30 days | Everything | Everything in Learner, up to 4 children, printed book and live reading circle (run by the Lali team) |

Free stories stay open to everyone whatever their pack, so every pack has a taster.

## The 40-story launch library

| # | Story | Pack | Ages |
|---|---|---|---|
| 1 | Anbessa and the New Year Flowers | Story Garden | 3–7 (free) |
| 2 | Anbessa and the Lost Moon | Story Garden | 3–7 (free) |
| 3 | Gugu Counts the Sheep | Numbers | 3–7 (free) |
| 4 | Lali Shares the Honey | Story Garden | 3–7 (free) |
| 5 | Gugu and the Rainbow Puddle | English | 3–5 |
| 6 | The Fidel Train ሀ ሁ ሂ | Fidel | 3–5 |
| 7 | Anbessa's First Day at School | Story Garden | 3–7 |
| 8 | The Great Coffee Bean Mystery | Story Garden | 6–9 |
| 9 | Lali Visits Lalibela | Story Garden | 6–9 |
| 10–14 | The Busy Bees of በ · Seven Sheep for ሰ · Race to the River ረ · Tiny Turtle's Trip ተ · Nana's Night Market ነ | Fidel | 3–7 |
| 15–19 | Ten Tukuls · Gugu's Shapes Safari · Bigger, Smaller, Anbessa! · Lali's Market Money · The Teff Harvest Patterns | Numbers | 3–9 |
| 20–24 | A is for Adey Abeba · Opposites with Anbessa · Lali's Weather Words · What's in Grandma's Kitchen? · Hello, Feelings! | English | 3–7 |
| 25–28 | Meskel Fire · Timket by the River · The Genna Game · Ashenda's Song | Story Garden (festivals) | 3–9 |
| 29–32 | The Tortoise and the Lion's Race · Why the Hyena Laughs · The Clever Monkey · Kaldi and the Dancing Goats | Story Garden (folk tales) | 3–9 |
| 33–36 | Gugu's Big Sneeze · Lali and the Lost Kite · Anbessa Learns to Swim · Grandpa's Krar | Story Garden (adventures) | 3–7 |
| 37–40 | The Biggest Injera · The Night Visitors of Harar · Tsehay's New Baby Brother · Goodnight, Simien | Story Garden (family and bedtime) | 3–7 |

In each pack, the first story of the pack's set is free, so families can try it.

## In the code

- `apps/web/src/lib/packs.ts` holds the rules: `packsForPlan(planId)` and `canOpen(story, plan)`.
  The shelf, the reader (launch and studio stories, read passes), narration, printable activities
  and the app's API all ask it. The plan is read with `activePlanId` (`lib/payments/subscription.ts`).
- Studio stories get their pack from `stories.pack` (migration 0014), chosen in the story studio or
  following the world (Fidel → fidel, Maths → numbers, English → english, others → story). Before
  the migration is applied, studio stories count as `story`.
- `teaches` on a story (`fidel`, `numbers`, `words`) feeds the progress map and the printable sheets.
  Stories without it count by their pack.
- Printable activities: `/stories/<id>/activities`. Progress map: `/account/progress/<childId>`.
- **School licences** (`docs/SCHOOLS.md`) open every pack for a school's classes, and for its
  teachers' own accounts, until the licence's end date.
- **The child's name** (`{name}` in a page's text) and **story choices** (`choices` and `next` on
  a page) are described on `StoryPage` in `apps/web/src/content/stories.ts`; the helpers are in
  `apps/web/src/lib/story-path.ts`. "Which Way, Lali?" (`which-way-lali`) is the first story with
  choices; Ten Tukuls, Opposites and Hello, Feelings! say `{name}`. A `{name}` page always uses the
  browser's voice, because recorded narration can't say every name.
