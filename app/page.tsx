import Link from 'next/link';
import { site, services, formatPrice, testimonials } from '@/site.config';
import { getPosts, getGuides } from '@/lib/content';
import { Cta, Kicker, Ticker, sheet } from '@/components/Chrome';
import { MagazineStack, type SoonEntry } from '@/components/Magazine';
import { Quiz } from '@/components/Quiz';
import { DressForm, SwatchFan, Thread, QuoteMark, Star } from '@/components/Sketches';

/** Covers that fill the fan until their guides exist: one of each kind. */
const soon: SoonEntry[] = [
  { name: 'Soft Dramatic', kind: 'kibbe' },
  { name: 'Romantic', kind: 'essence' },
  { name: 'Autumn', kind: 'season' },
];

const coverLines = [
  '10 Kibbe body types',
  '7 style essences',
  '4 color seasons',
  '1 archetype: yours',
  'written analyses, not calls',
  'based on you, not trends',
];

export default function Home() {
  const [latest] = getPosts();
  const guides = getGuides();
  const ysa = services.find((s) => s.popular)!;
  const quote = testimonials[0];

  return (
    <div className="relative overflow-hidden">

      {/* The cover */}
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-12 md:px-10 md:pb-20 md:pt-20">
        <p className="kicker text-ink/70">Confused about your style? Let us help.</p>
        <div className="relative mt-5">
          <h1 className="font-display text-[3.4rem] leading-[0.95] tracking-tight md:text-[6.5rem] lg:text-[7.5rem] [text-wrap:balance]">
            Dress for <span className="hl">you</span>, not the trends.
          </h1>
          <DressForm className="pointer-events-none absolute -right-2 -top-8 hidden w-24 text-ink/50 lg:block" />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Cta href={`/services/${ysa.slug}/`}>Get Your Style Archetype · {formatPrice(ysa)}</Cta>
          <Link href="/services/" className="ul-hand text-[15px] font-medium">
            All consulting
          </Link>
          <p className="font-hand text-xl text-ink/80">your lines, your colors, your mood</p>
        </div>
      </section>

      <Ticker items={coverLines} />

      {/* 01 The idea */}
      <section id="idea" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-14 md:px-10 md:py-20">
        <Kicker n="01">The idea</Kicker>
        <p className="mt-6 max-w-3xl font-display text-[1.75rem] leading-[1.15] md:text-[2.5rem] [text-wrap:balance]">
          Your Style Archetype <span className="font-hand text-[0.6em] text-soft">(n.)</span> the trio of your Kibbe body
          type, your Kitchener style essences, and your color season, read together.
        </p>
        <p className="mt-3 font-hand text-xl text-soft">yes, we coined it</p>
        <div className="mt-12 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-3">
          <Lens sketch={<DressForm className="h-16 text-ink/60" />} title="Kibbe body type" text="your lines" href="/services/kibbe-body-type-analysis/" />
          <Lens sketch={<Thread className="h-16 text-ink/60" />} title="Style essences" text="your mood" href="/services/style-essence-analysis/" />
          <Lens sketch={<SwatchFan className="h-16 text-ink/60" />} title="Color season" text="your coloring" href="/services/color-season-analysis/" />
        </div>
      </section>

      {/* 02 Consulting, laid out like a contents page */}
      <section id="consulting" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-14 md:px-10 md:py-20">
        <Kicker n="02">Consulting</Kicker>
        <div className={`${sheet} mt-6`}>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <h2 className="font-display text-[2rem] leading-tight md:text-[3rem] [text-wrap:balance]">Pick the question you&rsquo;re stuck on.</h2>
            <p className="font-hand text-xl text-ink/80">written, delivered in about a week</p>
          </div>
          <ol className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="group flex items-baseline gap-4 py-4 md:gap-6">
                  <span className="w-7 shrink-0 font-display text-lg tabular-nums text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-semibold group-hover:text-soft md:text-xl">{s.name}</span>
                  {s.popular && (
                    <span className="hidden items-center gap-1.5 font-hand text-lg text-ink/70 sm:inline-flex">
                      <Star className="w-4 text-honey" /> most people start here
                    </span>
                  )}
                  <span aria-hidden="true" className="mx-1 flex-1 border-b border-dotted border-ink/30" />
                  <span className="font-display text-xl tabular-nums md:text-2xl">{formatPrice(s)}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Cta href={`/services/${ysa.slug}/`}>Start with Your Style Archetype</Cta>
            <Link href="/services/" className="ul-hand text-[15px] font-medium">
              Every consult, explained
            </Link>
          </div>
        </div>
      </section>

      {/* 03 The handbooks, on a maroon band */}
      <section id="handbooks" className="bg-ink text-mist">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <Kicker n="03" tone="light">
            The handbooks
          </Kicker>
          <div className="mt-8 grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-[2.2rem] leading-[1.05] md:text-[3.5rem] [text-wrap:balance]">
                Already know your type? Take the handbook.
              </h2>
              <p className="mt-5 font-hand text-2xl text-blush/90">one per type, essence, and season. yours forever.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Cta href="/guides/" tone="blush">
                  Browse the style guides
                </Cta>
                <Link href="/fashion-guides/" className="text-[15px] font-medium text-blush underline decoration-blush/40 underline-offset-4 hover:decoration-blush">
                  Fashion guides
                </Link>
              </div>
            </div>
            <MagazineStack guides={guides} soon={soon} />
          </div>
        </div>
      </section>

      {/* 04 The quiz */}
      <section id="quiz" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-14 md:px-10 md:py-20">
        <Kicker n="04">The quiz</Kicker>
        <div className={`${sheet} mt-6`}>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <h2 className="font-display text-[2rem] leading-tight md:text-[2.75rem] [text-wrap:balance]">Which archetype might you be?</h2>
              <p className="mt-4 font-hand text-xl text-ink/80">four questions, one hunch, zero commitment</p>
            </div>
            <Quiz guideSlugs={guides.map((g) => g.slug)} />
          </div>
        </div>
      </section>

      {/* 05 Kind words · 06 From the notes */}
      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <Kicker n="05">Kind words</Kicker>
            <figure className="relative mt-8 pt-8">
              <QuoteMark className="absolute left-0 top-0 w-10 text-ink/40" />
              <blockquote className="font-display text-[1.6rem] leading-[1.2] text-ink/90 md:text-[2.1rem] [text-wrap:pretty]">
                {quote.quote.split(/(?<=[.!])\s/).slice(0, 2).join(' ')}
              </blockquote>
              <figcaption className="mt-4 font-hand text-xl text-ink/80">
                — {quote.name}, <span className="text-soft">{quote.detail}</span>
              </figcaption>
            </figure>
          </div>
          {latest && (
            <div>
              <Kicker n="06">From the notes</Kicker>
              <h2 className="mt-8 font-display text-[1.6rem] leading-[1.2] md:text-[2.1rem] [text-wrap:balance]">
                <Link href={`/blog/${latest.slug}/`} className="hover:text-soft">
                  {latest.title}
                </Link>
              </h2>
              <div className="mt-5 flex gap-6">
                <Link href={`/blog/${latest.slug}/`} className="ul-hand text-[15px] font-medium">
                  Keep reading
                </Link>
                <Link href="/blog/" className="text-[15px] text-soft hover:text-ink">
                  All posts
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Close */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-4 md:px-10">
        <div className="border-t border-ink/15 pt-12 md:pt-16">
          <h2 className="font-display text-[2.4rem] leading-[1] md:text-[4.5rem] [text-wrap:balance]">Still guessing? Let&rsquo;s stop that.</h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Cta href={`/services/${ysa.slug}/`}>Get Your Style Archetype</Cta>
            <p className="text-soft">
              or DM us{' '}
              <a href={`https://instagram.com/${site.instagram}`} className="ul-hand text-ink" target="_blank" rel="noreferrer">
                @{site.instagram}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Lens({ sketch, title, text, href }: { sketch: React.ReactNode; title: string; text: string; href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="h-16">{sketch}</div>
      <h3 className="mt-4 text-lg font-semibold group-hover:text-soft">{title}</h3>
      <p className="mt-1 font-hand text-xl text-soft">{text}</p>
    </Link>
  );
}
