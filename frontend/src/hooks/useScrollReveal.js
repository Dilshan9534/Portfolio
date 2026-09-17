import { useEffect } from 'react';

/**
 * Adds the `is-visible` class to any element with a [data-reveal] attribute
 * once it scrolls into view. Re-scans on every render pass so elements that
 * arrive later (e.g. after the API responds) get observed too.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = document.querySelectorAll('[data-reveal]:not(.is-visible)');

    if (reduced) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, deps);
}
