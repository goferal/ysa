import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const root = path.join(process.cwd(), 'content');

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  body: string; // raw markdown
};

export type Guide = {
  slug: string;
  /** kibbe | essence | season for style guides; fashion for the changing ones. */
  category: 'kibbe' | 'essence' | 'season' | 'fashion';
  title: string;
  subtitle: string;
  price: number;
  pages: number;
  /** Lemon Squeezy / Gumroad / Stripe checkout link. */
  buyUrl: string;
  cover?: string;
  contents: string[];
  body: string;
};

function toISODate(v: unknown): string {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
}

/** First paragraph of a markdown body, stripped of links/emphasis. */
export function excerpt(md: string, max = 220) {
  const para = md
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .find((s) => s && !s.startsWith('#')) ?? '';
  const plain = para.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
  return plain.length > max ? plain.slice(0, max).replace(/\s+\S*$/, '') + '…' : plain;
}

function readDir(kind: 'posts' | 'guides' | 'fashion') {
  const dir = path.join(root, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.md$/, ''), data, body: content };
    });
}

export function getPosts(): Post[] {
  return readDir('posts')
    .map(({ slug, data, body }) => ({
      slug,
      title: data.title ?? slug,
      date: toISODate(data.date),
      description: data.description ?? '',
      tags: data.tags ?? [],
      body,
    }))
    .filter((p) => !p.slug.startsWith('_'))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

function toGuide(kind: 'guides' | 'fashion') {
  return ({ slug, data, body }: { slug: string; data: Record<string, any>; body: string }): Guide => ({
    slug,
    category: kind === 'fashion' ? 'fashion' : (data.category ?? 'kibbe'),
    title: data.title ?? slug,
    subtitle: data.subtitle ?? '',
    price: Number(data.price ?? 0),
    pages: Number(data.pages ?? 0),
    buyUrl: data.buyUrl ?? '#',
    cover: data.cover,
    contents: data.contents ?? [],
    body,
  });
}

/** Style guides: the static, forever ones (Kibbe, essences, seasons). */
export function getGuides(): Guide[] {
  return readDir('guides').filter((g) => !g.slug.startsWith('_')).map(toGuide('guides'));
}
export function getGuide(slug: string) {
  return getGuides().find((g) => g.slug === slug);
}

/** Fashion guides: the seasonal, changing ones (wedding, fall, etc.). */
export function getFashionGuides(): Guide[] {
  return readDir('fashion')
    .filter((g) => !g.slug.startsWith('_'))
    .map(toGuide('fashion'))
    .sort((a, b) => a.title.localeCompare(b.title));
}
export function getFashionGuide(slug: string) {
  return getFashionGuides().find((g) => g.slug === slug);
}

/** Set by next.config.mjs from BASE_PATH (the /ysa Pages preview); empty on the real domain. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export async function renderMarkdown(md: string) {
  const out = await remark().use(html, { sanitize: false }).process(md);
  // <Link> adds basePath to JSX links; root-relative links written in markdown need it added here.
  return String(out).replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
}

export function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
