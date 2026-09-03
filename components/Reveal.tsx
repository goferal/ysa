'use client';

import { createElement, useEffect, useRef, type ReactNode } from 'react';

/**
 * Fades and lifts its children in the first time they scroll into view.
 * The hidden state only applies once <html> has the `js` class (set in layout),
 * so crawlers and no-JS readers see everything immediately.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'figure' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(
    as,
    { ref, className: `reveal ${className}`, style: delay ? { transitionDelay: `${delay}ms` } : undefined },
    children,
  );
}
