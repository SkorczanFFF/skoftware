import { type RefObject, useEffect } from 'react';

/** Below this the page counts as "at the top": no tint. */
const TOP = 24;

/**
 * Scroll state of the fixed header, written as data attributes so the styling
 * stays in the markup and React never re-renders for it:
 *
 * - `data-scrolled` once the page leaves the top — the header flattens from
 *   46px to 34px and takes a light tint;
 * - the progress line's `scaleX`, 0..1 over the whole document.
 *
 * The bar never hides on the way down: the CV and the case studies are long
 * reads, and losing the nav there cost more than the screen space it saved.
 *
 * Plain `scroll` listener rather than a ScrollTrigger: the header outlives
 * every page, and a trigger's `end` is only as fresh as its last refresh —
 * past a stale end it stops reporting. The live `scrollHeight` cannot go stale.
 */
export function useHeaderScroll(
  headerRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!header || !progress) return;

    const root = document.documentElement;

    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      // Clamped: rubber-band overscroll reports positions outside the page.
      const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0));

      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (y > TOP) header.setAttribute('data-scrolled', '');
      else header.removeAttribute('data-scrolled');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [headerRef, progressRef]);
}
