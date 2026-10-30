# Lali tech stack

The aim is one small team shipping to the web first, then Android and iOS, without
writing the product three times.

**Web first.** Most parents will arrive from a YouTube, TikTok or Telegram link, and
a website opens instantly with nothing to install. The same Expo codebase builds the
website now and the Play Store and App Store apps later.

| Web address | What it shows |
|---|---|
| `/` | Public landing page: videos, social links, free stories, app store buttons |
| `/read` | The kids' bookshelf |
| `/story/<id>` | The story reader (shareable link to one story) |
| `/parents` | Grown-ups' corner |

Channel and app-store links live in `apps/mobile/src/content/links.ts`. Anything left
empty shows as "coming soon" on the site.

## Summary

| Layer | Choice | Why |
|---|---|---|
| Website and apps | **Expo (React Native) + Expo Router**, TypeScript | One codebase for the web, Android and iOS. Over-the-air updates without app store reviews. |
| Animation | **React Native Reanimated** and **react-native-svg** | Smooth 60fps animation on cheap Android phones. Characters are vector art, so they stay sharp and small to download. |
| Hosting | Static site on **Render**, **Netlify** or **Cloudflare Pages** | `npx expo export -p web` produces plain files; any static host works. |
| Backend | **Supabase** (Postgres, auth, file storage, edge functions) | Hosted, cheap to start, no servers to run. Row-level security keeps each family's data private. |
| Payments | **Chapa** (Telebirr, CBE Birr, M-Pesa, cards) | One integration covers the payment methods Ethiopian parents use. Webhooks go to a Supabase edge function that turns on the subscription. |
| Story content | JSON files plus images and audio in Supabase Storage | Writers and illustrators publish through a simple admin page. The app downloads whole stories for offline reading. |
| Narration | **Recorded human narration** with word timings | Phones rarely have an Amharic voice, and a warm human voice is part of the product. Device text-to-speech is only a stand-in for now. |
| Builds and releases | **EAS Build, Submit and Update** | Cloud builds, so nobody needs a Mac or Android Studio. |
| Analytics | **PostHog** (self-serve, privacy-friendly) | Measure the pilot targets: stories finished, days active, conversion, renewal. No ad trackers in a kids' app. |

## How a story is stored

```text
stories/lost-moon/
  story.json        title, category, ages, pages (English and Amharic text)
  pages/0.webp      illustration for each page (or a vector scene)
  audio/en/0.m4a    narration per page and language
  audio/en/0.json   word timings: [{ "word": "One", "start": 0.00, "end": 0.32 }, ...]
```

The reader plays the audio and highlights each word from the timings file. Until
recordings exist, it uses the phone's voice where one is available and otherwise
lights words up on a steady beat.

## Offline first

- Stories are downloaded as a bundle and kept on the phone (expo-file-system).
- Progress, stars and settings are saved on the phone (expo-sqlite) and synced to
  Supabase when there is a connection.
- The app works fully offline after the first download, which matters with Ethiopian
  data prices.

## Child safety and privacy

- No ads, no external links, no chat, no user-generated content in the kids' area.
- Settings and payments sit behind a grown-ups' gate.
- We collect the minimum: a parent's phone or email, child first name and age band.
- Design to the spirit of COPPA and GDPR-K, since the diaspora market will need it.

## What is built so far (`apps/mobile`)

- Home: tonight's story, bookshelf, stars, bedtime mode, English and Amharic switch
- Story reader: animated page pictures, page turns, read-to-me with word highlighting,
  tap a word to hear it, star reward and confetti at the end
- Bedtime limit: after a set number of stories Lali says goodnight until tomorrow
- Grown-ups' corner behind a maths question: progress, bedtime limit, language, reset
- Three sample stories: *Anbessa and the Lost Moon*, *Gugu Counts the Sheep*,
  *Lali Shares the Honey*

## Next to build

1. Story bundles from Supabase with offline download
2. Parent accounts (phone number sign-in) and child profiles
3. Chapa checkout and subscription status
4. Recorded narration with word timings
5. Admin page for uploading stories
