import type { Metadata } from 'next';
import { site } from '@/site.config';
import { Washes } from '@/components/Chrome';
import { Squiggle } from '@/components/Sketches';

export const metadata: Metadata = {
  title: 'What we need from you before a consult',
  description: 'The photos and answers we need for a Kibbe body type, color season, or style essences analysis.',
};

const sets = [
  {
    name: 'For a Kibbe body type analysis',
    items: [
      'A full-length photo, front, standing naturally, in fitted clothes (leggings and a fitted top are perfect)',
      'The same from the side',
      'Arms slightly away from your body so we can see your outline',
      'Plain background, natural light if you can, phone at about chest height',
      'Your height',
    ],
  },
  {
    name: 'For a color season analysis',
    items: [
      'A close-up of your face in daylight, no makeup, hair pulled back',
      'No filters, no editing, and not in direct harsh sun',
      'A photo of your eyes up close',
      'A photo of your natural hair color, or a description if it is dyed',
      'Optional: a photo of you in a color you love and one you feel washed out in',
    ],
  },
  {
    name: 'For a style essences analysis',
    items: [
      'Three to five photos of outfits you felt great in',
      'Three to five images (from anywhere) of styles you are drawn to',
      'A few sentences on how you want to feel when you are dressed',
    ],
  },
];

export default function Prepare() {
  return (
    <div className="relative overflow-hidden">
      <Washes variant="quiet" />
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-10 md:pt-24">
        <p className="font-hand text-2xl text-ink/80">before we start</p>
        <h1 className="mt-3 max-w-3xl font-display text-[2.3rem] leading-[1.05] md:text-[3.3rem] [text-wrap:balance]">
          What we need from you.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-soft">
          Good photos are most of the work, honestly. The booking form asks for these, so you can gather them first and
          upload them as you book, or send them afterwards to{' '}
          <a href={`mailto:${site.email}`} className="ul-hand text-ink">
            {site.email}
          </a>
          .
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="max-w-3xl space-y-14">
          {sets.map((s, i) => (
            <div key={s.name}>
              {i > 0 && <Squiggle className="mb-12 h-3 w-full max-w-xs text-ink/30" />}
              <h2 className="font-display-sm text-3xl font-medium">{s.name}</h2>
              <ul className="mt-5 space-y-2.5 text-[17px]">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="font-hand text-2xl text-ink/80">
            Booked a package? Send all of the above. We&rsquo;ll start as soon as it lands.
          </p>
        </div>
      </section>
    </div>
  );
}
