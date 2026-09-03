# Your Style Archetype — site guide

Static Next.js site for yourstylearchetype.com. Everything is content-driven; there is no database and no admin.

## Where things live
- `site.config.ts` — prices, service copy (short + long + what's included), SEO titles, booking link, Instagram, email, the YSA definition, the guide rosters (all Kibbe types / essences / seasons), before-and-afters, testimonials. **If a price changes, change it here only.**
- `content/posts/*.md` — blog posts. Front-matter: `title`, `date` (YYYY-MM-DD), `description`, `tags`. Filename becomes the URL (`/blog/<filename>/`). Newest post is featured on the homepage. Start a filename with `_` to keep a draft unpublished.
- `content/guides/*.md` — the forever style guides (Kibbe types, style essences, color seasons). Front-matter: `title`, `subtitle`, `category` (kibbe | essence | season), `price`, `pages`, `buyUrl` (Lemon Squeezy/Gumroad checkout link), `contents` (list). Body is the sales copy. **The filename must match the `slug` in `rosters` in `site.config.ts`** (e.g. `soft-dramatic.md`, `romantic-essence.md`, `autumn.md`) so it replaces the "in the works" entry. Guides render as magazine covers, drawn automatically from the title.
- `content/fashion/*.md` — fashion guides, the changing seasonal ones (wedding guest, fall edit). Same front-matter minus `category`. `_fall-fashion-guide.md` is a draft showing the format.
- `app/prepare/page.tsx` — the "what we need from you" photo instructions.
- `app/services/[slug]/page.tsx` — one SEO page per service, generated from `site.config.ts` (`seoTitle` is the <title>).
- `components/Sketches.tsx` — hand-drawn SVG illustrations. `components/Magazine.tsx` — the magazine covers and the fan of them. `components/Quiz.tsx` — the four-question archetype quiz on the homepage. `components/Chrome.tsx` — masthead nav, footer, kicker, ticker, sheet/card classes, the pill button.

## Voice
Warm, fun, positive, personal, a little quirky. The company says **we / our** (founder plus two helpers), never "I". Lead with "Confused about your style? Let us help." and "based on you, not trends." Always describe Your Style Archetype as *the trio of your Kibbe body type, style essences, and color season*; it is the coined term and the brand.

## SEO
Target phrases: Kibbe, Kibbe body types, Kibbe body type analysis, Kibbe <type> (all 10), color analysis, online color analysis, <season> color palette, Kitchener style essences, <essence> style essence, style archetypes, style guides, fashion guides, image consultant / online image consulting. Blog posts should each own one of these in the title and first paragraph. Every guide and service already has a keyword title.

## Design rules (keep these)
- Brand colors: #ffe5e5 (blush) and #4b1212 (maroon), on paper white. Everything else in `tailwind.config.ts` derives from them.
- Editorial, like a fashion magazine: a centered masthead with a ruled nav, numbered uppercase kickers (`Kicker`) with hairline rules between sections, white "sheets" (`sheet`) that read as printed pages for the consult contents and the quiz, one full-bleed maroon band (the handbooks), and the ticker strip of cover lines. The ground is warm paper white; blush is an accent (covers, the ticker, text on the maroon band), never a background wash. Ink sketches and a little Caveat handwriting stay.
- Copy is scarce. Homepage sections get one headline and at most one line; no paragraphs. Big type does the talking.
- Fonts: Abril Fatface for display (bold Didone that reads at any size; Bodoni Moda was too hairline on the live site), Karla for body and kickers, Caveat for asides. Never set a weight above 400 on `font-display`; the face has one weight and heavier only fakes it.
- Products on inner pages sit in soft white cards (`card`). Nothing else gets a box or a left border; horizontal hairline rules are the editorial idiom and are fine.
- The only button shape is the rounded pill (`Cta`, tones `ink` / `soft` / `blush`).
- The quiz (`components/Quiz.tsx`) gives a hunch that points at a consult, never a verdict. Keep the "not an analysis" line.

## Common tasks
- **New post:** add `content/posts/my-post.md` with front-matter, commit, push. Done.
- **New style guide:** add `content/guides/<roster-slug>.md` with a `buyUrl`. It appears in the stack, replaces its "in the works" entry on the guides page, and gets its own page.
- **New fashion guide:** add `content/fashion/<name>.md`.
- **Before & afters:** put images in `public/before-after/` and add entries to `beforeAfters` in `site.config.ts`; the homepage section appears automatically.
- **Change a price:** edit `site.config.ts`.
- **Change the booking form:** `site.config.bookingUrl`. Each service can override with its own `bookingUrl`.

## Build & deploy
The GitHub Pages workflow builds with `BASE_PATH=/ysa` so the preview works at goferal.github.io/ysa/. When the real domain is pointed at Pages, remove that env line from `.github/workflows/deploy.yml` and add the domain under Settings → Pages → Custom domain.
`npm install`, `npm run build` → static site in `out/`. GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes to GitHub Pages on every push to `main`. Point the domain at Pages, or deploy `out/` anywhere static (Netlify, Vercel, Cloudflare).

## Before launch (TODOs)
- Replace `REPLACE_ME` links: `site.config.bookingUrl` (Tally form with photo upload + Stripe) and each guide's `buyUrl`.
- Testimonials are real (from the pinned Instagram reviews post); add names/initials if clients are OK with it.
- Add a real OG image at `public/og.jpg` and reference it in `app/layout.tsx`.
- Logo is in `public/logo.png` (maroon, transparent) and `public/logo-nav.png`. Original black version is what Claire sent; regenerate from it if the color changes.
