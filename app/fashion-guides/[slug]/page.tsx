import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/site.config';
import { getFashionGuides as getGuides, getFashionGuide as getGuide, renderMarkdown } from '@/lib/content';
import { Washes, Cta } from '@/components/Chrome';
import { MagazineCover } from '@/components/Magazine';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const all = getGuides().map((g) => ({ slug: g.slug }));
  // Static export needs at least one param; this placeholder renders a "nothing yet" page.
  return all.length ? all : [{ slug: 'coming-soon' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return { title: g.title, description: g.subtitle };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-32 md:px-10">
        <p className="font-hand text-2xl text-ink/80">fashion guides</p>
        <h1 className="mt-2 font-display text-[2.3rem]">The first one is on its way.</h1>
        <p className="mt-4 text-soft"><Link href="/fashion-guides/" className="ul-hand text-ink">Back to fashion guides</Link></p>
      </div>
    );
  }
  const body = await renderMarkdown(g.body);

  return (
    <div className="relative overflow-hidden">
      <Washes variant="quiet" />
      <article className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-10 md:pt-24">
        <Link href="/fashion-guides/" className="text-[15px] text-soft hover:text-ink">
          ← All fashion guides
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
          <div>
            <p className="font-hand text-2xl text-ink/80">fashion guide</p>
            <h1 className="mt-3 font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">
              {g.title}
            </h1>
            <p className="mt-5 text-lg text-soft">{g.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Cta href={g.buyUrl} external>
                Buy the guide · {`$${g.price}`}
              </Cta>
              <span className="text-[15px] text-soft">{g.pages} pages · PDF · instant download</span>
            </div>
            <div className="prose-ysa mt-12" dangerouslySetInnerHTML={{ __html: body }} />
          </div>
          <aside className="md:pt-24">
            <div className="mx-auto w-52 -rotate-2 text-[15px]"><MagazineCover guide={g} /></div>
            <h2 className="mt-10 font-display-sm text-2xl font-medium">Inside</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {g.contents.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
    </div>
  );
}
