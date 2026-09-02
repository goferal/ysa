/**
 * Hand-drawn line sketches. Each is a single-stroke ink drawing with a
 * slightly imperfect path so it reads as pencil, not vector clip art.
 * Stroke color inherits from `currentColor`.
 */

type P = { className?: string; title?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** A dress form on a stand. */
export function DressForm({ className, title = 'Sketch of a dress form' }: P) {
  return (
    <svg viewBox="0 0 120 220" className={`sketch ${className ?? ''}`} role="img" aria-label={title}>
      <g {...base}>
        <path d="M38 22c3-9 41-10 44 1 1 8-2 14-1 22" />
        <path d="M40 24c-2 9 2 16 1 23" />
        <path d="M41 47c-12 7-19 21-17 38 2 14 12 22 12 34 0 12-7 22-6 32 8 6 52 7 61 0 1-10-6-21-6-33 0-12 12-19 13-33 2-18-6-31-18-39" />
        <path d="M45 66c4 6 26 6 31 0" strokeOpacity=".55" />
        <path d="M60 152v34" />
        <path d="M43 200c5-9 29-9 34 0" />
        <path d="M36 206c8 8 40 8 48 0" strokeOpacity=".7" />
        <path d="M52 88c-5 3-7 9-6 14" strokeOpacity=".4" />
      </g>
    </svg>
  );
}

/** A wooden hanger with a soft dress on it. */
export function Hanger({ className, title = 'Sketch of a hanger' }: P) {
  return (
    <svg viewBox="0 0 220 160" className={`sketch ${className ?? ''}`} role="img" aria-label={title}>
      <g {...base}>
        <path d="M110 14c-8 0-11 8-6 12 3 2 6 4 6 9" />
        <path d="M110 35 24 78c-4 3-2 8 3 8h166c5 0 7-5 3-8L110 35z" />
        <path d="M62 86c-4 20-9 38-9 58 30 6 66 6 96 0 0-20-5-38-9-58" />
        <path d="M78 92c6 10 4 30 2 48M142 92c-6 10-4 30-2 48" strokeOpacity=".45" />
      </g>
    </svg>
  );
}

/** A fan of color swatches. */
export function SwatchFan({ className, title = 'Sketch of color swatches' }: P) {
  return (
    <svg viewBox="0 0 200 160" className={`sketch ${className ?? ''}`} role="img" aria-label={title}>
      <g {...base}>
        <path d="M60 140 76 42c1-6 8-8 12-3l3 4" transform="rotate(-38 60 140)" />
        <path d="M60 140 76 42c1-6 8-8 12-3l3 4" transform="rotate(-20 60 140)" />
        <path d="M60 140 76 42c1-6 8-8 12-3l3 4" transform="rotate(-2 60 140)" />
        <path d="M60 140 76 42c1-6 8-8 12-3l3 4" transform="rotate(16 60 140)" />
        <path d="M60 140 76 42c1-6 8-8 12-3l3 4" transform="rotate(34 60 140)" />
        <circle cx="60" cy="140" r="4" />
      </g>
      <g fill="currentColor" opacity=".18">
        <path d="M63 60l20-10 6 32-20 10z" transform="rotate(-38 60 140)" />
        <path d="M63 60l20-10 6 32-20 10z" transform="rotate(-2 60 140)" />
        <path d="M63 60l20-10 6 32-20 10z" transform="rotate(34 60 140)" />
      </g>
    </svg>
  );
}

/** A loose spool of thread with a needle. */
export function Thread({ className, title = 'Sketch of needle and thread' }: P) {
  return (
    <svg viewBox="0 0 200 120" className={`sketch ${className ?? ''}`} role="img" aria-label={title}>
      <g {...base}>
        <path d="M14 70c30-40 60 30 90-8s40-32 70 6" />
        <path d="M170 40 118 92" strokeWidth="2.2" />
        <ellipse cx="164" cy="46" rx="4" ry="6" transform="rotate(45 164 46)" />
        <path d="M22 78c26-30 50 24 78-6" strokeOpacity=".4" />
      </g>
    </svg>
  );
}

/** A little hand-drawn arrow, for annotations. */
export function Arrow({ className, title = 'arrow' }: P) {
  return (
    <svg viewBox="0 0 80 50" className={`sketch ${className ?? ''}`} role="img" aria-label={title}>
      <g {...base}>
        <path d="M4 8c22 4 44 18 68 34" />
        <path d="M58 40l14 2-2-14" />
      </g>
    </svg>
  );
}

/** A wobbly divider line, used between sections instead of borders. */
export function Squiggle({ className, title = 'divider' }: P) {
  return (
    <svg viewBox="0 0 400 20" preserveAspectRatio="none" className={className} role="img" aria-label={title}>
      <path
        d="M2 10c30-10 50 12 80 4s50-14 80-4 50 12 80 2 50-12 80-2 40 10 76 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A big hand-drawn opening quote mark. */
export function QuoteMark({ className }: P) {
  return (
    <svg viewBox="0 0 60 50" className={className} aria-hidden="true">
      <g {...base} strokeWidth="2">
        <path d="M22 8c-10 3-15 12-14 24 1 8 8 12 14 10 6-3 6-12 0-14-4-1-6 1-8 2" />
        <path d="M48 8c-10 3-15 12-14 24 1 8 8 12 14 10 6-3 6-12 0-14-4-1-6 1-8 2" />
      </g>
    </svg>
  );
}

/** Loose star, for the "most popular" note. */
export function Star({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 4l4 11 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
