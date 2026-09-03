import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site, services, formatPrice } from '@/site.config';
import { Cta } from '@/components/Chrome';
import { Star, Squiggle } from '@/components/Sketches';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.seoTitle, description: s.short };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const book = `${s.bookingUrl ?? site.bookingUrl}?service=${s.slug}`;
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      <article className="mx-auto max-w-6xl px-6 pb-8 pt-14 md:px-10 md:pt-20">
        <Link href="/services/" className="text-[15px] text-soft hover:text-ink">
          ← All consulting services
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
          <div>
            {s.popular && (
              <p className="mb-1 flex items-center gap-2 font-hand text-xl text-ink/80">
                <Star className="w-5 text-honey" /> most people start here
              </p>
            )}
            <h1 className="font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">{s.name}</h1>
            <p className="mt-2 font-display-sm text-3xl text-soft">{formatPrice(s)}</p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/85">{s.long}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Cta href={book} external>
                Book {s.name} · {formatPrice(s)}
              </Cta>
              <Link href="/prepare/" className="ul-hand text-[15px] font-medium">
                What we&rsquo;ll need from you
              </Link>
            </div>
          </div>
          <aside className="md:pt-14">
            <h2 className="font-display-sm text-2xl font-medium">What you get</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {s.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-hand text-lg text-soft">written, delivered by email, yours forever</p>
          </aside>
        </div>

        <Squiggle className="mt-16 h-4 w-full max-w-xs text-ink/30" />
        <h2 className="mt-8 font-display-sm text-2xl font-medium">Or maybe you meant</h2>
        <ul className="mt-4 grid gap-x-12 gap-y-3 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug} className="flex items-baseline justify-between gap-6">
              <Link href={`/services/${o.slug}/`} className="font-display-sm text-xl hover:text-soft">
                {o.name}
              </Link>
              <span className="text-[15px] tabular-nums text-soft">{formatPrice(o)}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
