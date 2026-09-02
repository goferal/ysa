import type { Metadata } from 'next';
import Link from 'next/link';
import { rosters, type Category } from '@/site.config';
import { getGuides } from '@/lib/content';
import { Washes, Cta } from '@/components/Chrome';
import { MagazineCover } from '@/components/Magazine';
import { Squiggle } from '@/components/Sketches';

export const metadata: Metadata = {
  title: 'Kibbe Style Guides, Style Essence Guides & Color Season Guides',
  description:
    'Downloadable style guides for every Kibbe body type, Kitchener style essence, and color season: silhouettes, fabrics, outfit formulas, and a shopping checklist.',
};

export default function Guides() {
  const guides = getGuides();
  const bySlug = new Map(guides.map((g) => [g.slug, g]));
  const cats = Object.keys(rosters) as Category[];

  return (
    <div className="relative overflow-hidden">
      <Washes variant="quiet" />
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-14 md:px-10 md:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="font-hand text-2xl text-ink/80">style guides</p>
            <h1 className="mt-2 font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">
              Already know your type? Here&rsquo;s the handbook.
            </h1>
            <p className="mt-5 max-w-prose text-lg text-soft">
              These are the forever guides: one per Kibbe body type, one per style essence, one per color season.
              Each is the reference we wish existed when we started. Instant download, yours to keep.
            </p>
            <p className="mt-3 text-[15px] text-soft">
              Looking for the seasonal ones?{' '}
              <Link href="/fashion-guides/" className="ul-hand text-ink">
                Fashion guides are over here
              </Link>
              .
            </p>
          </div>
          {guides[0] && (
            <div className="mx-auto w-40 -rotate-3 text-[13px] md:w-52">
              <MagazineCover guide={guides[0]} />
            </div>
          )}
        </div>
      </section>

      {cats.map((cat, ci) => {
        const r = rosters[cat];
        return (
          <section key={cat} className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-12">
            {ci > 0 && <Squiggle className="mb-10 h-3 w-full max-w-xs text-ink/30" />}
            <h2 className="font-display-sm text-3xl font-medium md:text-4xl">{r.label}</h2>
            <p className="mt-2 max-w-prose text-soft">{r.blurb}</p>
            {(() => {
              const have = r.types.filter((t) => bySlug.has(t.slug));
              const soon = r.types.filter((t) => !bySlug.has(t.slug));
              return (
                <>
                  {have.length > 0 && (
                    <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-8">
                      {have.map((t, i) => {
                        const g = bySlug.get(t.slug)!;
                        return (
                          <li key={t.slug} className="w-36">
                            <Link href={`/guides/${g.slug}/`} className={`block text-[11px] transition-transform hover:-translate-y-1 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                              <MagazineCover guide={g} index={i} />
                              <p className="mt-3 font-display-sm text-xl leading-tight">{t.name}</p>
                              <p className="text-sm text-soft">${g.price} · {g.pages} pages</p>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {soon.length > 0 && (
                    <p className="mt-7 max-w-3xl text-[15px] leading-relaxed text-soft">
                      <span className="font-hand text-xl text-ink/80">in the works: </span>
                      {soon.map((t) => t.name).join(' · ')}
                    </p>
                  )}
                </>
              );
            })()}
          </section>
        );
      })}

      <section className="mx-auto max-w-6xl px-6 pb-6 pt-8 md:px-10">
        <p className="max-w-prose font-hand text-2xl text-ink/80">Not sure which you are? Get typed first, then come back.</p>
        <div className="mt-5">
          <Cta href="/services/just-typing-trio/" tone="soft">
            Just Typing: Trio · $75
          </Cta>
        </div>
      </section>
    </div>
  );
}
