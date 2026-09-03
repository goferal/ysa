'use client';

import { createElement, useEffect, useRef, type ReactNode } from 'react';

/**
 * Lifts its children in the first time they scroll into view.
 * Nothing is hidden until this has mounted, and blocks already on screen at
 * mount are left alone, so crawlers, no-JS readers, and the first screen never
 * wait on an observer.
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add('armed');
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
