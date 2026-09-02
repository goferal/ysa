import type { MetadataRoute } from 'next';
import { site, services } from '@/site.config';
import { getPosts, getGuides, getFashionGuides } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/services/', '/guides/', '/fashion-guides/', '/blog/', '/prepare/'].map((p) => ({ url: `${site.url}${p}` }));
  const posts = getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date }));
  const guides = getGuides().map((g) => ({ url: `${site.url}/guides/${g.slug}/` }));
  const svc = services.map((s) => ({ url: `${site.url}/services/${s.slug}/` }));
  const fashion = getFashionGuides().map((g) => ({ url: `${site.url}/fashion-guides/${g.slug}/` }));
  return [...pages, ...svc, ...posts, ...guides, ...fashion];
}
