# Lali tech stack

Lali has three products that share one backend:

1. **The website** (`apps/web`): the public face of Lali and a full reading experience.
   Built to feel like a modern, animated storybook for kids and to convince parents.
2. **The mobile apps** (`apps/mobile`): Android and iOS, built by the mobile team.
3. **The backend**: accounts, subscriptions, the book library and protected delivery
   of book pages to every platform.

## The website

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript) | The standard for professional React sites. Pages are pre-rendered for speed and search engines; interactive parts run in the browser. |
| Styling | **Tailwind CSS 4** | Fast to build, consistent design tokens (colours, fonts) in one place: `src/app/globals.css`. |
| Animation | **Motion** (formerly Framer Motion) | Scroll-driven scenes, spring physics, 3D page turns and gestures, with reduced-motion support built in. |
| Characters | Hand-built **SVG** components | Sharp at any size, tiny to download, and animatable piece by piece (blinking eyes, fluttering wings). Later: **Rive** for richer character animation from the design team. |
| Fonts | Grandstander (display), Andika (made for early readers), Noto Sans Ethiopic | Self-hosted by Next.js, so no requests to Google from the browser. |
| Hosting | **Vercel** (or any Node host) | Built for Next.js: previews for every pull request, global CDN, image optimisation. |

### What is built (`apps/web`)

| Page | What it does |
|---|---|
| `/` | Animated home page. The hero turns from day to night as you scroll ("…and then, goodnight"), Lali the bee follows the mouse, letters fly out of a book that keeps turning its pages. Then: a working storybook, the four learning worlds, a star-counting game, "the endless feed vs a Lali story" for parents, a sample weekly progress note, videos and channels, plans and app-store badges. |
| `/stories` | The library: books that tilt toward the pointer. |
| `/stories/[id]` | The storybook reader: a two-page spread with real 3D page turns on wide screens, a swipeable single page on phones, read-to-me with word highlighting, tap a word to hear it, English and Amharic, arrow keys, and a star with confetti at The End. |

## The backend

| Layer | Choice | Why |
|---|---|---|
| Database, auth, files | **Supabase** (Postgres, Auth, Storage) | One hosted service; row-level security keeps each family's data private. Phone-number sign-in suits Ethiopia. |
| Server logic | Next.js **route handlers** and Supabase **edge functions** | Signed page delivery, payment webhooks, watermarking. |
| Payments | **Chapa** | Telebirr, CBE Birr, M-Pesa and cards in one integration. |
| Book processing | A worker using **MuPDF** | Turns uploaded PDFs into page images once, at upload time. |
| Admin | A protected `/admin` area in the website | Writers and illustrators upload books and stories without a developer. |
| Analytics | **PostHog** | Privacy-friendly; no ad trackers in a kids' product. |

## Protecting the books

The goal: a family can read every book they pay for, on the website and in the apps, but
cannot download a book and pass it to a thousand people.

**An honest limit:** nothing shown on a screen can be made 100% copy-proof. Someone can
always photograph the screen. What we can do is make copying slow, low quality, and
traceable, so that sharing at scale is not worth it. This is how Kindle, Scribd and
Netflix work.

### How it works

1. **The PDF never leaves our servers.** When a book is uploaded, a worker turns each page
   into an image (WebP, a sensible reading resolution, not print quality). The original
   PDF stays in private storage that no browser can reach.
2. **Pages are sent one at a time, only to a signed-in subscriber.** The reader asks for
   page 7 of book X; the server checks the session and the plan, then returns a link that
   works for about 60 seconds and only for that session.
3. **Every page is watermarked with the reader's identity.** A faint, repeated mark (for
   example the account's masked phone number and the date) is drawn into the image on the
   server. Any page that turns up online can be traced to the account that shared it.
4. **Drawn on a canvas, not offered as a file.** The browser reader paints pages on a
   `<canvas>`: no "Save image", no print button, no text to copy, right-click disabled.
   (This stops casual copying only; steps 1 to 3 are the real protection.)
5. **Limits that stop scraping.** A cap on pages per minute, a limit of devices per account
   (for example 3), and one active reading session per child profile. Unusual patterns
   (hundreds of pages in minutes, many cities) suspend the account for review.
6. **In the apps:** Android's `FLAG_SECURE` blocks screenshots and screen recording; iOS
   blurs the page when screen recording starts. Offline books are stored encrypted with a
   key tied to the device and stop opening when the subscription ends.
7. **Terms of use** forbid sharing, and the watermark gives evidence if it happens.

### Our own stories are even safer

Lali's own storybooks are not PDFs at all: they are text, vector art and narration that the
reader assembles live (like the reader already built). There is no file to download. The
PDF reader is for partner and publisher books that arrive as PDFs.

### What is built

| Piece | Where |
|---|---|
| Database tables and privacy rules | `supabase/migrations/0001_init.sql` |
| Sign-in with an emailed code | `apps/web/src/app/login` |
| Session refresh and sign-in redirects | `apps/web/src/proxy.ts` |
| PDF to page images (MuPDF + sharp) | `apps/web/src/lib/books/process.ts` |
| Page tokens, watermark, rate limit | `apps/web/src/lib/books/protect.ts`, `src/app/api/books/[id]/pages/[page]/route.ts` |
| Canvas reader | `apps/web/src/app/library/[slug]/reader.tsx` |
| Admin upload page | `apps/web/src/app/admin/books` |

Connecting it to a Supabase project: `docs/SETUP_SUPABASE.md`.

## Build order

1. ~~Supabase project: accounts, child profiles, plans, books table~~ done
2. ~~Protected PDF reader: upload worker, signed page endpoint, watermark, canvas reader~~ done
3. Chapa checkout and subscription status
4. Child profiles and the grown-ups' area on the website
5. Admin area for uploading Lali's own stories
6. Recorded narration with word timings for the storybook reader
7. Mobile apps connect to the same backend
