# Lali roadmap

The goal of the first six months is to answer two questions with real families:

1. Do kids come back to Lali on their own?
2. Do parents keep paying after the first month?

Everything else (full animation, more learning worlds, VIP extras) waits until both
answers are yes.

## Done so far

- [x] Name and mascot (Lali, Lali the bee), brand notes
- [x] Research on the best kids' YouTube channels (`docs/research/youtube-channels.md`)
- [x] Website: animated home page, story library, storybook reader with 3D page turns and read-along
- [x] Backend: database with privacy rules, email-code sign-in, protected PDF book reader
      (server-side rendering, watermark, 90-second page tokens, rate limit, canvas reader), admin upload
- [x] Mobile app foundation (Expo) for the mobile team
- [x] Deployed to Render at https://lali-kids.onrender.com (auto-deploys from `main`)

## Next steps, in order

### Phase 1: Connect and launch the site (this week)

- [ ] Connect Supabase: run the SQL, set the keys on Render and in the coding environment,
      switch the magic-link email to a code (`docs/SETUP_SUPABASE.md`)
- [ ] Make the founder account an admin; upload one test PDF; confirm the reader end to end
- [ ] Reset the Supabase database password (it was partly shared in a chat)
- [ ] Buy the domain (`lalikids.com` or `lali.et`) and point it at Render
- [ ] Secure the social handles: YouTube, TikTok, Telegram, Instagram, Facebook
- [ ] Ethiopian trademark search for "Lali"

### Phase 2: Content and channels (weeks 2–6)

- [ ] Hire: 1 illustrator, 1 Amharic writer/editor, 2 narrators (English, Amharic)
- [ ] Native-speaker review of the three existing stories' Amharic text
- [ ] Story bible: characters, world, tone, reading levels by age band
- [ ] Produce 10 illustrated, narrated storybooks in both languages
- [ ] Record narration with word timings so read-along uses real voices, not the browser's
- [ ] Launch YouTube and TikTok with 3 short animated story clips; add links in `src/content/links.ts`
- [ ] Telegram channel for parents (biggest reach in Ethiopia)

### Phase 3: Accounts, payments, parents (weeks 4–10)

- [x] Child profiles and the grown-ups' area on the website (bedtime limit, progress)
- [x] Chapa checkout (Telebirr, CBE Birr, cards) with server-side verification (`docs/PAYMENTS.md`)
- [x] Fair plan switching (upgrades by value, downgrades after the current plan), payment history and receipts
- [ ] Renewal reminder emails (needs an email sender)
- [x] Draft privacy policy and terms (`/privacy`, `/terms`), pending legal review
- [ ] Weekly progress note by email
- [x] Story studio: admins add stories (both languages, pictures, narration) without a developer
- [x] Stories and games by age group (3–5, 6–7, 8–9); parents choose own-age or every age
- [x] Games shelf: web games in a sealed-off frame, daily time limit per child (`docs/GAMES.md`)
- [ ] Subject packs (English, Maths, Fidel, Values) once the first pack has content
- [ ] PostHog analytics for the pilot metrics

### Phase 4: Pilot (weeks 10–16)

- [ ] 100 paying families on the Reader plan
- [ ] 1–2 private schools in Addis on a classroom licence
- [ ] Measure weekly: stories finished per child, days active, sign-up-to-paid, month-1 renewal
- [ ] Interview 20 parents; adjust prices and plans

### Phase 5: Apps and growth (after the pilot)

- [ ] Mobile team: connect the Expo app to the same backend; offline downloads;
      Android screenshot blocking; publish to Play Store, then App Store
- [ ] Learning worlds: English, Maths, Values (the Learner plan)
- [ ] "Fidelblocks": a Numberblocks-style series where each fidel family is a character
- [ ] VIP extras: printed books, live reading circles
- [ ] Afaan Oromo and Tigrinya editions

## Success targets for the pilot

| Metric | Target |
|---|---|
| Kids active 3+ days a week | 40% |
| Signed-up families who pay | 25% |
| Month-1 renewal | 70% |
| Stories finished per active child per week | 4 |

These targets are starting guesses and will be revised after the first parent interviews.
