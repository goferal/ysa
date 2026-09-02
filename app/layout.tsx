import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/site.config';
import { Nav, Footer } from '@/components/Chrome';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Personalized style consulting & style guides`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;0,6..96,700;1,6..96,600&family=Karla:wght@400;500;600&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain relative min-h-screen font-body text-ink">
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
