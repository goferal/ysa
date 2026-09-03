import Link from 'next/link';
import { site } from '@/site.config';

/** Set by next.config.mjs from BASE_PATH (the /ysa Pages preview); empty on the real domain. */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nav = [
  { href: '/services/', label: 'Consulting' },
  { href: '/guides/', label: 'Style guides' },
  { href: '/fashion-guides/', label: 'Fashion guides' },
  { href: '/blog/', label: 'Blog' },
];

/** Masthead: the logo centered like a magazine nameplate, the nav as a ruled strip beneath it. */
export function Nav() {
  return (
    <header className="relative z-10 mx-auto max-w-6xl px-6 pt-6 md:px-10">
      <div className="grid items-center gap-y-3 md:grid-cols-[1fr_auto_1fr]">
        <p className="kicker hidden text-ink/60 md:block">Online consults · worldwide</p>
        <Link href="/" className="block justify-self-center" aria-label="Your Style Archetype, home">
          <img src={`${base}/logo-nav.png`} alt="YSA · Your Style Archetype" width={464} height={193} className="h-16 w-auto md:h-24" />
        </Link>
        <p className="kicker hidden text-right text-ink/60 md:block">based on you, not trends</p>
      </div>
      <nav aria-label="Main" className="mt-5 border-y border-ink/20 py-3">
        <ul className="kicker flex flex-wrap justify-center gap-x-8 gap-y-2 text-ink/80">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              Instagram
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-20 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border-t border-ink/20 pt-10">
        <div className="max-w-md">
          <img src={`${base}/logo.png`} alt="YSA · Your Style Archetype" width={1858} height={774} className="h-12 w-auto" />
          <p className="mt-4 text-soft">{site.tagline}</p>
          <p className="mt-3 font-hand text-2xl text-ink/80">Dress like yourself. It suits you.</p>
        </div>
        <ul className="kicker flex flex-col gap-3 text-ink/70">
          <li>
            <a href={`https://instagram.com/${site.instagram}`} className="hover:text-ink" target="_blank" rel="noreferrer">
              @{site.instagram}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="normal-case tracking-normal hover:text-ink">
              {site.email}
            </a>
          </li>
          <li>
            <Link href="/prepare/" className="hover:text-ink">
              What we need from you
            </Link>
          </li>
        </ul>
      </div>
      <p className="mt-12 text-xs text-soft/70">© {new Date().getFullYear()} {site.name}. Founded and run by a real person, with two very good helpers.</p>
    </footer>
  );
}

/** Numbered section label, magazine style: "02 — Consulting". */
export function Kicker({ n, children, tone = 'ink' }: { n?: string; children: React.ReactNode; tone?: 'ink' | 'light' }) {
  return (
    <p className={`kicker flex items-center gap-3 ${tone === 'light' ? 'text-blush/80' : 'text-ink/70'}`}>
      {n && <span className="font-display text-base normal-case tracking-normal text-inherit">{n}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}

/** A maroon strip of cover lines that slides by. Reduced-motion users get it standing still. */
export function Ticker({ items }: { items: string[] }) {
  const track = items.map((t, i) => (
    <span key={i} className="flex items-center gap-8">
      <span>{t}</span>
      <span aria-hidden="true" className="text-honey">
        ✦
      </span>
    </span>
  ));
  return (
    <div className="ticker kicker bg-ink py-3 text-blush">
      <p className="sr-only">{items.join('. ')}.</p>
      <div className="ticker__track" aria-hidden="true">
        {track}
      </div>
      <div className="ticker__track" aria-hidden="true">
        {track}
      </div>
    </div>
  );
}

/**
 * A white "sheet": a printed page lying on the blush. The consult contents and
 * the quiz live on these. Put it on the wrapper element itself.
 */
export const sheet = 'rounded-[4px] bg-white/95 p-6 shadow-sheet ring-1 ring-ink/10 sm:p-8 md:p-12';

/** Softer white card for product rows on inner pages. */
export const card = 'rounded-[1.5rem] bg-white/90 p-6 shadow-card ring-1 ring-ink/5';

/** A soft, pill-shaped call to action. Deliberately the only "button" shape on the site. */
export function Cta({
  href,
  children,
  tone = 'ink',
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: 'ink' | 'soft' | 'blush';
  external?: boolean;
}) {
  const cls = {
    ink: 'bg-ink text-mist hover:bg-soft',
    soft: 'bg-blush text-ink hover:bg-rose',
    blush: 'bg-blush text-ink hover:bg-mist',
  }[tone];
  const className = `inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-[15px] font-medium tracking-wide transition-colors ${cls}`;
  // Internal links go through <Link> so they pick up basePath (the /ysa preview), like the nav does.
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const props = external ? { target: '_blank', rel: 'noreferrer' } : {};
  return (
    <a href={href} {...props} className={className}>
      {children}
    </a>
  );
}
