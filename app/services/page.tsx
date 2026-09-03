import type { Metadata } from 'next';
import Link from 'next/link';
import { site, services, formatPrice } from '@/site.config';
import { Cta, card } from '@/components/Chrome';
import { Hanger, Squiggle, Star } from '@/components/Sketches';

export const metadata: Metadata = {
  title: 'Online Image Consulting: Kibbe body type, color analysis & style essences',
  description:
    'Online image consulting from $50: Kibbe body type analysis, color season analysis, Kitchener style essence analysis, wardrobe review, personal shopping, and Your Style Archetype (all three in one).',
};

export default function Services() {
  const ysa = services.find((s) => s.popular)!;
  const rest = services.filter((s) => !s.popular);
  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-14 md:px-10 md:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="font-hand text-2xl text-ink/80">consulting services</p>
            <h1 className="mt-2 font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">
              Pick the question you&rsquo;re stuck on.
            </h1>
            <p className="mt-5 max-w-prose text-lg text-soft">
              Every consult is written, not a call, so you can reread it as often as you like. You book, we send
              you a short list of photos and questions, you send them back, and within a week you have your
              analysis and the reasoning behind it.
            </p>
            <p className="mt-3 text-[15px] text-soft">
              Curious what we&rsquo;ll ask for?{' '}
              <Link href="/prepare/" className="ul-hand text-ink">
                Here&rsquo;s exactly what we need
              </Link>
              .
            </p>
          </div>
          <Hanger className="mx-auto w-52 text-ink/60 md:w-64" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <Row s={ysa} />
        <Squiggle className="my-10 h-4 w-full max-w-md text-ink/30" />
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-16">
          {rest.map((s) => (
            <Row key={s.slug} s={s} compact />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-6 pt-4 md:px-10">
        <p className="max-w-prose font-hand text-2xl text-ink/80">
          Not sure which? Message us on Instagram{' '}
          <a href={`https://instagram.com/${site.instagram}`} className="ul-hand" target="_blank" rel="noreferrer">
            @{site.instagram}
          </a>
          . We&rsquo;ll point you to the right one, even if it&rsquo;s the cheaper one.
        </p>
      </section>
    </div>
  );
}

function Row({ s, compact }: { s: (typeof services)[number]; compact?: boolean }) {
  return (
    <article id={s.slug} className={`${card} scroll-mt-24`}>
      {s.popular && (
        <p className="mb-1 flex items-center gap-2 font-hand text-xl text-ink/80">
          <Star className="w-5 text-honey" /> most people start here
        </p>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className={`font-display font-medium leading-tight ${compact ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>
          <Link href={`/services/${s.slug}/`} className="hover:text-soft">
            {s.name}
          </Link>
        </h2>
        <span className={`font-display tabular-nums text-soft ${compact ? 'text-2xl' : 'text-3xl'}`}>{formatPrice(s)}</span>
      </div>
      <p className="mt-2 max-w-prose text-soft">{s.short}</p>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <Cta href={`/services/${s.slug}/`} tone={s.popular ? 'ink' : 'soft'}>
          {s.popular ? 'See what you get' : 'Details'}
        </Cta>
        <a href={`${s.bookingUrl ?? site.bookingUrl}?service=${s.slug}`} target="_blank" rel="noreferrer" className="ul-hand text-[15px] font-medium">
          Book now
        </a>
      </div>
    </article>
  );
}
