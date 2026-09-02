import Link from 'next/link';
import { site } from '@/site.config';
import { Squiggle } from './Sketches';

const nav = [
  { href: '/services/', label: 'Consulting' },
  { href: '/guides/', label: 'Style guides' },
  { href: '/fashion-guides/', label: 'Fashion guides' },
  { href: '/blog/', label: 'Blog' },
];

export function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 pt-6 md:px-10">
      <Link href="/" className="block" aria-label="Your Style Archetype, home">
        <img src="/logo-nav.png" alt="YSA · Your Style Archetype" width={464} height={193} className="h-14 w-auto md:h-16" />
      </Link>
      <nav aria-label="Main">
        <ul className="flex flex-wrap gap-x-7 gap-y-2 font-body text-[15px] tracking-wide text-soft">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
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
    <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:px-10">
      <Squiggle className="mb-10 h-4 w-full max-w-xs text-ink/40" />
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <div className="max-w-md">
          <img src="/logo.png" alt="YSA · Your Style Archetype" width={1858} height={774} className="h-14 w-auto" />
          <p className="mt-4 text-soft">{site.tagline}</p>
          <p className="mt-5 font-hand text-2xl text-ink/80">
            Dress like yourself. It suits you.
          </p>
        </div>
        <ul className="flex flex-col gap-2 text-[15px] text-soft">
          <li>
            <a href={`https://instagram.com/${site.instagram}`} className="hover:text-ink" target="_blank" rel="noreferrer">
              @{site.instagram}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              {site.email}
            </a>
          </li>
          <li>
            <Link href="/prepare/" className="hover:text-ink">
              What we need from you before a consult
            </Link>
          </li>
        </ul>
      </div>
      <p className="mt-12 text-xs text-soft/70">© {new Date().getFullYear()} {site.name}. Founded and run by a real person, with two very good helpers.</p>
    </footer>
  );
}

/** Drifting color washes behind a page. Place once per page, first child. */
export function Washes({ variant = 'home' }: { variant?: 'home' | 'quiet' }) {
  if (variant === 'quiet') {
    return (
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="wash wash-lilac" style={{ width: 520, height: 520, top: -160, right: -120 }} />
        <div className="wash wash-blush" style={{ width: 420, height: 420, top: '55%', left: -180 }} />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="wash wash-blush" style={{ width: 620, height: 620, top: -200, left: -160 }} />
      <div className="wash wash-lilac" style={{ width: 560, height: 560, top: 120, right: -200 }} />
      <div className="wash wash-sky" style={{ width: 480, height: 480, top: '48%', left: '30%' }} />
      <div className="wash wash-honey" style={{ width: 380, height: 380, top: '82%', right: '10%' }} />
    </div>
  );
}

/** A soft, pill-shaped call to action. Deliberately the only "button" shape on the site. */
export function Cta({
  href,
  children,
  tone = 'ink',
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: 'ink' | 'soft';
  external?: boolean;
}) {
  const cls =
    tone === 'ink'
      ? 'bg-ink text-mist hover:bg-soft'
      : 'bg-transparent text-ink ring-1 ring-ink/25 hover:ring-ink hover:text-soft';
  const props = external ? { target: '_blank', rel: 'noreferrer' } : {};
  return (
    <a
      href={href}
      {...props}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-[15px] font-medium tracking-wide transition-colors ${cls}`}
    >
      {children}
    </a>
  );
}
