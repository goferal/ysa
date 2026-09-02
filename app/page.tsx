import Link from 'next/link';
import { site, services, formatPrice, testimonials, beforeAfters } from '@/site.config';
import { getPosts, getGuides } from '@/lib/content';
import { Washes, Cta } from '@/components/Chrome';
import { MagazineStack } from '@/components/Magazine';
import { DressForm, SwatchFan, Thread, Arrow, Squiggle, QuoteMark, Star } from '@/components/Sketches';

export default function Home() {
  const [latest] = getPosts();
  const guides = getGuides();
  const ysa = services.find((s) => s.popular)!;
  const menu = services.filter((s) => !s.popular && s.slug !== 'full-package');
  const quote = testimonials[0];

  return (
    <div className="relative overflow-hidden">
      <Washes />

      {/* 1. The question, and the answer */}
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.25fr_0.75fr]">
          <div className="max-w-2xl">
            <p className="font-hand text-2xl text-ink/80">confused about your style?</p>
            <h1 className="mt-2 font-display text-[2.5rem] leading-[1.05] md:text-[4rem] [text-wrap:balance]">
              Let us help. Dress for <span className="hl">you</span>, not the trends.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-soft">
              Style consulting and guides based on your body type, style essences, and color season. Not trends.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta href={`/services/${ysa.slug}/`}>Get Your Style Archetype · {formatPrice(ysa)}</Cta>
              <Link href="/services/" className="ul-hand text-[15px] font-medium">
                All consulting services
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-44 text-ink/70 md:w-60">
            <DressForm className="w-full" />
            <p className="absolute -right-6 top-6 rotate-6 font-hand text-xl leading-tight text-ink/80 md:-right-14">
              your lines,
              <br />
              your colors,
              <br />
              your mood
            </p>
          </div>
        </div>
      </section>

      {/* 2. The coined term, as a dictionary entry */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <div className="max-w-3xl">
          <p className="font-display text-[1.9rem] leading-snug md:text-[2.4rem]">
            <span>Your Style Archetype</span>{' '}
            <span className="font-hand text-2xl text-soft">(n.)</span>{' '}
            <span className="italic text-ink/85">
              the trio of your Kibbe body type, your Kitchener style essences, and your color season, read
              together.
            </span>
          </p>
          <p className="mt-3 font-hand text-xl text-soft">yes, we coined it</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <Lens
            sketch={<DressForm className="h-20 text-ink/60" />}
            title="Kibbe body type"
            text="Your lines. Which silhouettes fall into place."
            href="/services/kibbe-body-type-analysis/"
          />
          <Lens
            sketch={<Thread className="h-20 text-ink/60" />}
            title="Style essences"
            text="Your mood. The details that feel like you."
            href="/services/style-essence-analysis/"
          />
          <Lens
            sketch={<SwatchFan className="h-20 text-ink/60" />}
            title="Color season"
            text="Your coloring. The palette that makes you look awake."
            href="/services/color-season-analysis/"
          />
        </div>
      </section>

      {/* 3. The menu */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="font-hand text-2xl text-ink/80">consulting services</p>
            <h2 className="mt-2 font-display text-[1.9rem] leading-tight md:text-[2.5rem] [text-wrap:balance]">
              Pick the question you&rsquo;re stuck on.
            </h2>
            <p className="mt-5 max-w-sm text-soft">
              Written analyses, delivered in about a week. Book, send photos, done.
            </p>
            <div className="relative mt-8 inline-block">
              <Cta href="/services/">All services &amp; prices</Cta>
              <Arrow className="absolute -right-12 -top-5 w-10 -scale-x-100 text-ink/70" />
              <span className="absolute -right-28 -top-10 font-hand text-lg text-ink/80">start here</span>
            </div>
          </div>
          <ul className="self-center">
            <li className="relative py-4">
              <Star className="absolute -left-9 top-5 w-6 text-honey" />
              <div className="flex items-baseline justify-between gap-6">
                <Link href={`/services/${ysa.slug}/`} className="font-display-sm text-3xl font-medium hover:text-soft">
                  {ysa.name}
                </Link>
                <span className="font-display-sm text-2xl tabular-nums">{formatPrice(ysa)}</span>
              </div>
              <p className="mt-1 font-hand text-lg text-ink/80">most people start here</p>
            </li>
            <Squiggle className="h-3 w-full text-ink/25" />
            {menu.map((s) => (
              <li key={s.slug} className="py-3">
                <div className="flex items-baseline justify-between gap-6">
                  <Link href={`/services/${s.slug}/`} className="font-display-sm text-2xl hover:text-soft">
                    {s.name}
                  </Link>
                  <span className="font-display-sm text-xl tabular-nums text-soft">{formatPrice(s)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Guides, as a stack of magazines */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <MagazineStack guides={guides} />
          <div>
            <p className="font-hand text-2xl text-ink/80">style guides</p>
            <h2 className="mt-2 font-display text-[1.9rem] leading-tight md:text-[2.5rem] [text-wrap:balance]">
              Already know your type? Take the handbook.
            </h2>
            <p className="mt-5 max-w-sm text-soft">
              One per Kibbe type, style essence, and color season. Instant download, yours forever.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Cta href="/guides/" tone="soft">
                Browse the style guides
              </Cta>
              <Link href="/fashion-guides/" className="ul-hand text-[15px] font-medium">
                Fashion guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before & after (hidden until there are some) */}
      {beforeAfters.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
          <p className="font-hand text-2xl text-ink/80">before &amp; after</p>
          <ul className="mt-6 grid gap-10 md:grid-cols-3">
            {beforeAfters.slice(0, 3).map((b) => (
              <li key={b.name}>
                <div className="grid grid-cols-2 gap-2">
                  <img src={b.before} alt={`${b.name} before`} className="aspect-[3/4] w-full rounded-[1rem_2rem_1rem_2rem] object-cover" />
                  <img src={b.after} alt={`${b.name} after`} className="aspect-[3/4] w-full rounded-[2rem_1rem_2rem_1rem] object-cover" />
                </div>
                <p className="mt-3 font-display-sm text-xl">{b.name}</p>
                <p className="font-hand text-lg text-soft">{b.archetype}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 6. One kind word, one latest post */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <figure className="relative pt-8">
            <QuoteMark className="absolute left-0 top-0 w-10 text-ink/40" />
            <blockquote className="font-display-sm text-2xl leading-snug text-ink/90 md:text-3xl [text-wrap:pretty]">
              {quote.quote.split(/(?<=[.!])\s/).slice(0, 2).join(' ')}
            </blockquote>
            <figcaption className="mt-4 font-hand text-xl text-ink/80">
              — {quote.name}, <span className="text-soft">{quote.detail}</span>
            </figcaption>
          </figure>
          {latest && (
            <article>
              <p className="font-hand text-2xl text-ink/80">from the blog</p>
              <h2 className="mt-2 font-display-sm text-3xl font-medium leading-tight md:text-4xl [text-wrap:balance]">
                <Link href={`/blog/${latest.slug}/`} className="hover:text-soft">
                  {latest.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-prose text-soft">{latest.description}</p>
              <div className="mt-4 flex gap-6">
                <Link href={`/blog/${latest.slug}/`} className="ul-hand text-[15px] font-medium">
                  Keep reading
                </Link>
                <Link href="/blog/" className="text-[15px] text-soft hover:text-ink">
                  All posts
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* 7. Close */}
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-10 md:px-10 md:pt-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-[1.9rem] leading-tight md:text-[2.5rem] [text-wrap:balance]">
            Still guessing? Let&rsquo;s stop that.
          </h2>
          <p className="mt-4 text-soft">
            Not sure which consult? DM us{' '}
            <a href={`https://instagram.com/${site.instagram}`} className="ul-hand text-ink" target="_blank" rel="noreferrer">
              @{site.instagram}
            </a>
            . We&rsquo;ll point you to the right one.
          </p>
          <div className="mt-7">
            <Cta href={`/services/${ysa.slug}/`}>Get Your Style Archetype</Cta>
          </div>
        </div>
      </section>
    </div>
  );
}

function Lens({ sketch, title, text, href }: { sketch: React.ReactNode; title: string; text: string; href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="h-20">{sketch}</div>
      <h3 className="mt-4 font-display-sm text-2xl font-medium group-hover:text-soft">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-soft">{text}</p>
    </Link>
  );
}
