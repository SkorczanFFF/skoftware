import { type RefObject, useEffect } from 'react';

/** Below this the page counts as "at the top": no tint, never hidden. */
const TOP = 24;
/** Scrolling this far down in one go tucks the header away. */
const HIDE_AFTER = 16;
/** Scrolling up this far brings it back — less than hiding, so it feels eager. */
const SHOW_AFTER = 8;

/**
 * Scroll state of the fixed header, written as data attributes so the styling
 * stays in the markup and React never re-renders for it:
 *
 * - `data-scrolled` once the page leaves the top — the header flattens from
 *   46px to 34px and takes a light tint;
 * - `data-hidden` while the reader travels down, cleared on the way back up.
 *   Only styled below `lg` (Header.tsx), where the screen is short and the
 *   header carries nothing but the logo and the menu button;
 * - the progress line's `scaleX`, 0..1 over the whole document.
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
    let last = window.scrollY;
    // Distance covered in the current direction; a turn starts it over.
    let travel = 0;

    const toggle = (name: string, on: boolean) => {
      if (on) header.setAttribute(name, '');
      else header.removeAttribute(name);
    };

    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      // Clamped: rubber-band overscroll reports positions outside the page.
      const y = Math.min(Math.max(window.scrollY, 0), Math.max(max, 0));
      const dy = y - last;
      last = y;
      travel = dy * travel > 0 ? travel + dy : dy;

      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      toggle('data-scrolled', y > TOP);

      if (y <= TOP || travel < -SHOW_AFTER) toggle('data-hidden', false);
      else if (travel > HIDE_AFTER) toggle('data-hidden', true);
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
