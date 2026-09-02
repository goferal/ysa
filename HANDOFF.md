# Handoff: Your Style Archetype site rebuild

Written September 2, 2026, at the end of a Cowork session. Read `CLAUDE.md` next; it has the conventions. This file is the story and the to-do list.

## Who and what

- **Client:** Claire, founder of Your Style Archetype (YSA), a style-consulting business. Currently on Shopify at yourstylearchetype.com. Nearly all traffic comes from Instagram (@yourstylearchetype, ~5.9k followers). She wants better SEO, a booking flow that isn't "buy, then email us photos," and a site she can eventually run herself by talking to Claude.
- **Project owner:** MC (goferal on GitHub). He drives design decisions and reviews with Claire.
- **Decision made:** replace Shopify with a static Next.js site. Guides sell through a checkout-link service (Lemon Squeezy recommended), consults book through an intake form with photo upload and payment (Tally + Stripe recommended). No cart, no database, no admin.
- **Do not suggest Squarespace.** MC hates it.

## Where things are

- **Repo:** https://github.com/goferal/ysa (created, empty as of handoff; Pages already set to "GitHub Actions"). The project has a local git history with two commits; it just needs `git remote add origin` + `git push -u origin main`.
- **Local copy:** `~/Desktop/repo/ysa/ysa-site/` on MC's Mac (unzipped from `ysa-site.zip` in the same folder).
- **Sibling repo:** https://github.com/goferal/reviews holds the pre-build site audit at `ysa/index.html`. Not part of this project.
- **Previews (Claude artifacts, static HTML snapshots of the build):** homepage, services, guides, and one service page were published from the session; they will go stale once the repo is live and are only useful as "what MC last approved."

## Stack

Next.js 15 static export (`output: 'export'`, trailing slashes), Tailwind 3, markdown content via gray-matter + remark. Node 22. `npm install && npm run dev` for local; `npm run build` produces `out/`. GitHub Actions workflow deploys `out/` to Pages on every push to `main`, building with `BASE_PATH=/ysa` so the preview works at `https://goferal.github.io/ysa/`. **When the real domain is pointed at Pages, remove that env line from `.github/workflows/deploy.yml`.**

## Design decisions (settled, don't relitigate without MC)

- Brand colors from Claire: `#ffe5e5` blush and `#4b1212` maroon. Page ground is a slightly lifted blush (`#fff3f3`) for reading; the pure brand blush appears in the drifting washes and magazine covers.
- Logo: Claire's black "YSA / YOUR STYLE ARCHETYPE" mark, cropped to transparent PNG, in `public/logo.png` and `public/logo-nav.png`. MC wants it black, not tinted. A maroon variant exists (`logo-maroon*.png`) but is unused.
- Type: Bodoni Moda for large headlines only (chosen to match the Didone serif in the logo). Karla for body and anything below ~28px (Bodoni hairlines vanish small). Caveat handwriting for short asides only.
- Look: warm, airy, hand-drawn. Drifting blurred color washes, ink-line SVG sketches (dress form, hanger, swatch fan, needle and thread), a wobbly squiggle divider, marker-highlight on one word. **No cards, no boxes, no left borders.** The only button shape is a rounded pill.
- Style guides render as tilted "magazine covers" generated from the guide title. Homepage shows them fanned in a stack.
- Homepage was cut to about half its original copy at MC's request: "too much text." Keep it terse. Every section ends in one action.
- Voice: Claire's company speaks as **we / our** (she plus two helpers). Warm, fun, quirky. Lead lines: "Confused about your style? Let us help." and "based on you, not trends."
- "Your Style Archetype" is Claire's coined term: the trio of Kibbe body type, Kitchener style essences, and color season. It's rendered as a dictionary entry on the homepage. Protect that framing.

## Content state

- **Services (8)** in `site.config.ts`, real prices from the Shopify site: Your Style Archetype $200 (featured), Kibbe Body Type Analysis $75, Color Season Analysis $50, Style Essence Analysis $100, Just Typing: Trio $75, Wardrobe Review $100, Personal Shopping (no price; "ask us"), Full Package $275. Each has a keyword `seoTitle` and its own page at `/services/<slug>/`.
- **Style guides:** only `soft-natural.md` exists (real product, $30, 28 pages). Rosters for all 10 Kibbe types, 7 essences, 4 seasons live in `site.config.ts` and show as "in the works" until a matching markdown file appears.
- **Fashion guides:** section exists, no published guides. `content/fashion/_fall-fashion-guide.md` is a draft showing the format (leading underscore = unpublished).
- **Blog:** three starter posts written in Claire's voice. She has two real posts on Shopify (one is intake instructions, now the `/prepare/` page) that could be migrated.
- **Testimonials:** four real ones pulled from the pinned "Client Reviews" Instagram carousel (April). Attributed as "Client"; add initials if Claire gets permission. There were eight in the carousel; only four were captured before the browser connection dropped.
- **Before & afters:** Claire is collecting them. `beforeAfters` array in `site.config.ts` is empty; the homepage section appears automatically when it isn't.

## Open items, in priority order

1. Push to `goferal/ysa` and confirm the Pages deploy is green. Check the live preview in real fonts; every render in the session was in fallback fonts, so Bodoni sizing has never been seen by a human. Expect to tune headline sizes.
2. Review with Claire. Things she must decide: booking tool (Tally + Stripe suggested), guide checkout (Lemon Squeezy suggested), Personal Shopping pricing, whether the softer look is right or the site should match her punchier Instagram feed (big condensed serif, red/yellow accents). MC's current call: drive the style from the logo, softer is fine.
3. Replace every `REPLACE_ME` link: `site.bookingUrl` and each guide's `buyUrl`.
4. Add an OG image (`public/og.jpg`) and reference it in `app/layout.tsx`.
5. Migrate Claire's existing blog posts and the remaining four Instagram reviews.
6. SEO content plan: one post per Kibbe type, essence, and season, each owning its keyword. The keyword list is in `CLAUDE.md`. Competitor reference: gabriellearruda.com (biggest in the space).
7. Domain: point yourstylearchetype.com at Pages, remove `BASE_PATH` from the workflow, update `site.url` if it changes.
8. Teach Claire the workflow: attach the repo to a Claude task, describe a change, review, publish. `CLAUDE.md` is written so her sessions don't need MC in the room.

## Things that went wrong, so you don't repeat them

- Cloud Cowork sessions can only push to repos attached at task creation. Create the task with `goferal/ysa` attached or you'll be handing MC zips.
- Claire's Mac (Intel) can't run local Cowork; cloud mode only.
- MC's git is old (no `git init -b`); his Terminal needed Files and Folders permission for Desktop.
- Static export fails if a dynamic route has zero params; `app/fashion-guides/[slug]` has a placeholder for that case. Keep it.
- `gray-matter` parses YAML dates into Date objects; `lib/content.ts` normalizes them. Don't remove that.
- Google Fonts don't load in the sandbox, so local screenshots there are never representative of type.
