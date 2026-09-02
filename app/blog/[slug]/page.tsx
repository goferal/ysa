import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPost, renderMarkdown, formatDate } from '@/lib/content';
import { Washes, Cta } from '@/components/Chrome';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    openGraph: { type: 'article', publishedTime: p.date, title: p.title, description: p.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const body = await renderMarkdown(p.body);

  return (
    <div className="relative overflow-hidden">
      <Washes variant="quiet" />
      <article className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-10 md:pt-24">
        <Link href="/blog/" className="text-[15px] text-soft hover:text-ink">
          ← All posts
        </Link>
        <header className="mt-8 max-w-3xl">
          <p className="text-sm text-soft">{formatDate(p.date)}</p>
          <h1 className="mt-2 font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">{p.title}</h1>
          {p.description && <p className="mt-5 text-lg text-soft">{p.description}</p>}
        </header>
        <div className="prose-ysa mt-12" dangerouslySetInnerHTML={{ __html: body }} />
        <footer className="mt-16 max-w-prose">
          <p className="font-hand text-2xl text-ink/80">Want this applied to you, specifically?</p>
          <div className="mt-4">
            <Cta href="/services/">See the consults</Cta>
          </div>
        </footer>
      </article>
    </div>
  );
}
