'use client';

import { useState } from 'react';
import Link from 'next/link';
import { services, formatPrice } from '@/site.config';
import { Cta } from './Chrome';

type Answer = [label: string, value: string];
type Question = { key: 'family' | 'lean' | 'season' | 'essence'; q: string; a: Answer[] };

/** Four quick questions. The result is a hunch that points at a consult, never a verdict. */
const questions: Question[] = [
  {
    key: 'family',
    q: 'Your frame, honestly:',
    a: [
      ['Long, sharp, angular', 'Dramatic'],
      ['Broad shoulders, relaxed, a little bony', 'Natural'],
      ['Balanced, symmetrical, nothing extreme', 'Classic'],
      ['Petite, with sharp or mixed details', 'Gamine'],
      ['Soft, rounded, curvy', 'Romantic'],
    ],
  },
  {
    key: 'lean',
    q: 'Now add a touch of…',
    a: [
      ['Softness: curve, roundness', 'soft'],
      ['Sharpness: length, edge', 'sharp'],
      ['Neither. It is what it is.', 'pure'],
    ],
  },
  {
    key: 'season',
    q: 'The colors that make you look rested:',
    a: [
      ['Clear and cool: true red, icy pink, black and white', 'Winter'],
      ['Warm and rich: rust, olive, mustard', 'Autumn'],
      ['Soft and cool: dusty rose, slate, mauve', 'Summer'],
      ['Warm and light: peach, coral, warm ivory', 'Spring'],
    ],
  },
  {
    key: 'essence',
    q: 'The compliment you’d rather get:',
    a: [
      ['Striking', 'Dramatic'],
      ['Effortless', 'Natural'],
      ['Polished', 'Classic'],
      ['Romantic', 'Romantic'],
      ['Playful', 'Gamine'],
      ['Ethereal', 'Ethereal'],
    ],
  },
];

/** Family + yin/yang lean → the Kibbe type it points toward. */
const kibbe: Record<string, Record<string, string>> = {
  Dramatic: { soft: 'Soft Dramatic', sharp: 'Dramatic', pure: 'Dramatic' },
  Natural: { soft: 'Soft Natural', sharp: 'Flamboyant Natural', pure: 'Natural' },
  Classic: { soft: 'Soft Classic', sharp: 'Dramatic Classic', pure: 'Soft Classic' },
  Gamine: { soft: 'Soft Gamine', sharp: 'Flamboyant Gamine', pure: 'Flamboyant Gamine' },
  Romantic: { soft: 'Romantic', sharp: 'Soft Dramatic', pure: 'Romantic' },
};

const linkCls = 'text-sm text-soft underline-offset-4 hover:text-ink hover:underline';

export function Quiz({ guideSlugs }: { guideSlugs: string[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const trio = services.find((s) => s.slug === 'just-typing-trio');
  const ysa = services.find((s) => s.popular);

  if (step >= questions.length) {
    const type = kibbe[answers.family]?.[answers.lean] ?? answers.family;
    const slug = type.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        <p className="kicker text-ink/60">Our hunch</p>
        <p className="mt-3 font-display text-[1.75rem] leading-[1.1] md:text-[2.5rem] [text-wrap:balance]">
          {type} lines, {answers.season} coloring, a {answers.essence} essence.
        </p>
        <p className="mt-4 max-w-prose text-soft">
          Four questions make a hunch, not an analysis. If that made you sit up, it&rsquo;s worth confirming.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          {trio && (
            <Cta href={`/services/${trio.slug}/`}>
              Confirm it · {trio.name} {formatPrice(trio)}
            </Cta>
          )}
          {ysa && (
            <Link href={`/services/${ysa.slug}/`} className="ul-hand text-[15px] font-medium">
              Get the full archetype · {formatPrice(ysa)}
            </Link>
          )}
        </div>
        {guideSlugs.includes(slug) && (
          <p className="mt-6 font-hand text-xl text-ink/80">
            There&rsquo;s a handbook for that:{' '}
            <Link href={`/guides/${slug}/`} className="ul-hand text-ink">
              {type} Kibbe Style Guide
            </Link>
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setAnswers({});
          }}
          className={`mt-8 ${linkCls}`}
        >
          Start over
        </button>
      </div>
    );
  }

  const cur = questions[step];
  return (
    <div>
      <p className="kicker text-ink/60">
        Question {step + 1} of {questions.length}
      </p>
      <p className="mt-3 font-display text-[1.75rem] leading-[1.1] md:text-[2.5rem]">{cur.q}</p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {cur.a.map(([label, value]) => {
          const picked = answers[cur.key] === value;
          return (
            <li key={value}>
              <button
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, [cur.key]: value });
                  setStep(step + 1);
                }}
                className={`rounded-full px-5 py-2.5 text-[15px] font-medium ring-1 transition-colors ${
                  picked ? 'bg-ink text-mist ring-ink' : 'ring-ink/25 hover:bg-ink hover:text-mist hover:ring-ink'
                }`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      {step > 0 && (
        <button type="button" onClick={() => setStep(step - 1)} className={`mt-6 ${linkCls}`}>
          ← Back
        </button>
      )}
    </div>
  );
}
