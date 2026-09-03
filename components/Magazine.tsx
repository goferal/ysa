import Link from 'next/link';
import type { Guide } from '@/lib/content';
import { DressForm, Hanger, SwatchFan, Thread } from './Sketches';

type Cover = Pick<Guide, 'title' | 'pages' | 'price'> & { label?: string };

/**
 * A style guide drawn as a magazine cover: soft wash background, a small
 * ink sketch, and the title hand-lettered. Sized by its container.
 */
const washes = [
  'from-blush via-lilac to-rose',
  'from-sky via-lilac to-blush',
  'from-lilac via-blush to-honey/60',
  'from-honey/50 via-blush to-lilac',
];
const sketches = [DressForm, Hanger, SwatchFan, Thread];

export function MagazineCover({ guide, index = 0, className = '', soon = false }: { guide: Cover; index?: number; className?: string; soon?: boolean }) {
  const Sketch = sketches[index % sketches.length];
  const wash = washes[index % washes.length];
  const words = guide.title.replace(/ (kibbe )?style guide$/i, '').replace(/ guide$/i, '');
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-[3px] bg-gradient-to-br ${wash} shadow-[0_18px_40px_-18px_rgba(75,18,18,0.35)] ${className}`}
    >
      {/* spine */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-ink/10 to-transparent" />
      <p className="absolute left-[12%] top-[7%] text-[0.55em] uppercase tracking-[0.22em] text-ink/60">{guide.label ?? 'Style guide'}</p>
      <Sketch className="absolute right-[6%] top-[14%] h-[38%] text-ink/55" />
      <p className="absolute bottom-[9%] left-[12%] right-[8%] font-display text-[1.5em] leading-[1] text-ink [text-wrap:balance]">
        {words}
      </p>
      <p className="absolute bottom-[3%] left-[12%] text-[0.55em] tracking-wide text-ink/55">
        {soon ? 'in the works' : `${guide.pages} pages · $${guide.price}`}
      </p>
    </div>
  );
}

export type SoonEntry = { name: string; kind: 'kibbe' | 'essence' | 'season' };

/** A roster entry drawn as a cover before its guide exists: just the name, the kind in the label. */
function soonCover({ name, kind }: SoonEntry): Cover {
  const label = { kibbe: 'Kibbe style guide', essence: 'Style essence guide', season: 'Color season guide' }[kind];
  return { title: name, label, pages: 0, price: 0 };
}

/**
 * Guides fanned out like magazines on a table. Real guides first, then
 * "in the works" covers to fill the fan to four. Each cover is a link.
 */
export function MagazineStack({ guides, soon = [] }: { guides: Guide[]; soon?: SoonEntry[] }) {
  const items = [
    ...guides.map((g) => ({ key: g.slug, cover: g as Cover, href: `/guides/${g.slug}/`, soon: false })),
    ...soon.map((s) => ({ key: `soon-${s.kind}-${s.name}`, cover: soonCover(s), href: '/guides/', soon: true })),
  ].slice(0, 4);
  const tilts = ['-rotate-6', 'rotate-2', '-rotate-1', 'rotate-5'];
  const offsets = ['left-0 top-8', 'left-[22%] top-0', 'left-[44%] top-10', 'left-[62%] top-3'];
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md text-[14px] sm:text-[16px]">
      {items.map((it, i) => (
        <Link
          key={it.key}
          href={it.href}
          aria-label={it.soon ? `${it.cover.title} ${it.cover.label} (in the works)` : it.cover.title}
          className={`absolute w-[42%] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 ${tilts[i]} ${offsets[i]}`}
          style={{ zIndex: i + 1 }}
        >
          <MagazineCover guide={it.cover} index={i} soon={it.soon} />
        </Link>
      ))}
    </div>
  );
}
