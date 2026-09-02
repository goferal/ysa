import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, formatDate } from '@/lib/content';
import { Washes } from '@/components/Chrome';
import { Thread } from '@/components/Sketches';

export const metadata: Metadata = {
  title: 'Notes on Kibbe, color seasons, and dressing like yourself',
  description: 'Plain-language notes on the Kibbe system, color seasons, style essences, and building a wardrobe that suits you.',
};

export default function Blog() {
  const posts = getPosts();
  return (
    <div className="relative overflow-hidden">
      <Washes variant="quiet" />
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-10 md:pt-24">
        <div className="grid items-end gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="font-hand text-2xl text-ink/80">the blog</p>
            <h1 className="mt-3 font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">
              Things we keep explaining, written down once.
            </h1>
          </div>
          <Thread className="mx-auto w-56 text-ink/60 md:w-72" />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <ul className="max-w-3xl space-y-12">
          {posts.map((p) => (
            <li key={p.slug}>
              <p className="text-sm text-soft">{formatDate(p.date)}</p>
              <Link href={`/blog/${p.slug}/`} className="mt-1 block font-display-sm text-3xl font-medium leading-tight hover:text-soft [text-wrap:balance]">
                {p.title}
              </Link>
              <p className="mt-2 max-w-prose text-soft">{p.description}</p>
              {p.tags.length > 0 && (
                <p className="mt-2 font-hand text-lg text-ink/80">{p.tags.join(' · ')}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
