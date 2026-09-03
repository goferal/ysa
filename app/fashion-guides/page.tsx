import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/site.config';
import { getFashionGuides } from '@/lib/content';
import { Cta, card } from '@/components/Chrome';
import { MagazineCover } from '@/components/Magazine';
import { Hanger } from '@/components/Sketches';

export const metadata: Metadata = {
  title: 'Fashion Guides: seasonal and occasion guides, sorted by archetype',
  description: 'Fashion guides that change with the season: what to buy this fall, what to wear to a wedding, sorted by Kibbe type, essence, and color season.',
};

export default function FashionGuides() {
  const guides = getFashionGuides();
  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-14 md:px-10 md:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="font-hand text-2xl text-ink/80">fashion guides</p>
            <h1 className="mt-2 font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">
              The ones that change with the season.
            </h1>
            <p className="mt-5 max-w-prose text-lg text-soft">
              Wedding guest, fall edit, holiday party: short, timely guides that take the season&rsquo;s trends and
              sort them by archetype, so you know which ones are yours.
            </p>
            <p className="mt-3 text-[15px] text-soft">
              The forever ones live under{' '}
              <Link href="/guides/" className="ul-hand text-ink">
                style guides
              </Link>
              .
            </p>
          </div>
          <Hanger className="mx-auto w-52 text-ink/60 md:w-64" />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        {guides.length === 0 ? (
          <p className="max-w-prose font-hand text-2xl text-ink/80">
            The first one is being written. Follow{' '}
            <a href={`https://instagram.com/${site.instagram}`} className="ul-hand" target="_blank" rel="noreferrer">
              @{site.instagram}
            </a>{' '}
            to hear when it lands.
          </p>
        ) : (
          <ul className="grid gap-12 md:grid-cols-2 md:gap-x-16">
            {guides.map((g, i) => (
              <li key={g.slug} className={`${card} flex gap-7`}>
                <Link href={`/fashion-guides/${g.slug}/`} className={`w-32 shrink-0 text-[11px] ${i % 2 ? 'rotate-2' : '-rotate-2'}`}>
                  <MagazineCover guide={g} index={i + 2} />
                </Link>
                <div>
                  <Link href={`/fashion-guides/${g.slug}/`} className="font-display-sm text-3xl font-medium leading-tight hover:text-soft">
                    {g.title}
                  </Link>
                  <p className="mt-2 text-soft">{g.subtitle}</p>
                  <p className="mt-3 text-[15px] text-soft">{g.pages} pages · PDF · <span className="text-ink">${g.price}</span></p>
                  <div className="mt-4">
                    <Cta href={g.buyUrl} external>Buy · ${g.price}</Cta>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
