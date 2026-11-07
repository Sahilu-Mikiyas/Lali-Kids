# Lali: phased plan to launch

## Phase 1: Pre-launch check (now)
- Security review of everything added recently: payments, gifts, voices, narration, admin, the
  mobile API and the proxy.
- Every main path tested end to end: sign up, children, reading, stickers, Find Lali, voices, mic,
  plans, gifts, receipts, account deletion, Amharic.
- Error alerts (errors reported to the admins' Telegram), a health check, and speed on a
  small, slow phone.
- Fix what is found; write `docs/KNOWN_ISSUES.md`.

## Phase 2: Packages (now)
- Each story has a pack (`docs/PACKAGES.md`); plans open packs (Reader: Story Garden; Learner
  and VIP: every pack).
- The shelf gets pack tabs; locked packs say which plan opens them; the plans page lists what
  each plan opens.

## Phase 3: The 40-story library (now, in parallel)
31 new stories in 7 sets, each animated page by page with the shared kit, tap-to-play, Find Lali,
a "For grown-ups" card and both languages. One file per story (`src/content/library`,
`src/components/book/library`), so the sets are written side by side.

## Phase 4: Learning and family features (now, in parallel)
- **Printable activities** for every story: a colouring page, a word search, letter or number
  tracing, a drawing prompt and questions, all printable.
- **Progress map** for each child: letters, numbers and words met, books read alone, stickers.
- **Story choices**: some pages let the child choose what happens next.
- **The child's name in stories**: `{name}` in a story's text becomes the reading child's name.
- **School and classroom licences**: a teacher account, class codes, and a class view.

## Phase 5: Final check (when phases 2–4 are merged)
- The pre-launch checks again on the whole site; every story page checked on a phone in both
  languages; the app checked against the live site.

## Needs the founder (blocks launch)
Render Starter plan, Chapa live mode, a domain, the Telegram bot token, the Amharic and legal
reviews, narrators, a real-phone test with children, and the app store builds.

## Then: the pilot
20–50 families for 2–4 weeks; watch the pilot numbers page; interview 10 parents.
