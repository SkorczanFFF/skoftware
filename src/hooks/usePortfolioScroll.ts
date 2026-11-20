import { useCallback, useLayoutEffect, useRef } from 'react';

import { BREAKPOINTS } from '@/lib/breakpoints';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

type Vars = gsap.TweenVars;

// A panel rests in HIDDEN, comes to SHOWN while it enters from the right, then
// leaves to EXIT. Enter is measured on its left edge, exit on its right.
const HIDDEN: Vars = { opacity: 0.2, x: 150, scale: 0.92 };
const EXIT: Vars = { opacity: 0.2, x: -150, scale: 0.92 };
const SHOWN: Vars = { opacity: 1, x: 0, scale: 1 };
const ENTER_WINDOW: [start: string, end: string] = ['left 90%', 'left 40%'];
const EXIT_WINDOW: [start: string, end: string] = ['right 60%', 'right 10%'];

type Options = {
  /** Must be stable: the effect runs once. */
  onActive: (index: number | null) => void;
  progressRef: React.RefObject<HTMLElement | null>;
};

export function usePortfolioScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
  { onActive, progressRef }: Options,
): (index: number) => void {
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const lastRef = useRef(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const mm = gsap.matchMedia();

    // Same boundary as Tailwind's `md:`, which switches the panel layout.
    mm.add(`(min-width: ${BREAKPOINTS.md}px)`, () => {
      const panels = [...track.querySelectorAll<HTMLElement>('.project-panel')];
      const last = panels.length - 1;
      const getScroll = () => track.scrollWidth - window.innerWidth;
      let current = 0;
      let settled = 0;

      lastRef.current = last;
      onActive(0);

      // Direction is judged against the project the track last rested on, not
      // ScrollTrigger's last tick: Lenis's final frame can step back a fraction
      // of a pixel and send the snap home. Called repeatedly, so it stays pure.
      const snapTo = (value: number) => {
        const at = value * last;
        const near = Math.round(at);
        if (Math.abs(at - near) < 0.02) return near / last;
        const next = at > settled ? Math.ceil(at) : Math.floor(at);
        return Math.min(last, Math.max(0, next)) / last;
      };

      const tween = gsap.to(track, {
        x: () => -getScroll(),
        ease: 'none',
        // The tween, not the scrollbar: with `scrub` the track trails behind.
        onUpdate(this: gsap.core.Tween) {
          const progress = this.progress();
          progressRef.current?.style.setProperty('--progress', `${progress}`);
          const at = progress * last;
          const index = Math.round(at);
          if (Math.abs(at - index) < 0.001) settled = index;
          if (index !== current) {
            current = index;
            onActive(index);
          }
        },
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${getScroll()}`,
          invalidateOnRefresh: true,
          // No inertia: snap reads speed off the scrubbed tween, still catching
          // up when the wheel stops, and would overshoot by a project or two.
          snap:
            last > 0
              ? {
                  snapTo,
                  inertia: false,
                  duration: { min: 0.2, max: 0.6 },
                  delay: 0.05,
                  ease: 'power1.inOut',
                }
              : undefined,
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;

      panels.forEach((panel) => {
        const scrub = ([start, end]: [string, string]): Vars => ({
          immediateRender: false,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start,
            end,
            scrub: true,
          },
        });

        // `immediateRender: false` leaves the panel untouched until its
        // trigger fires, so the resting state is set explicitly. GSAP mutates
        // the vars it is handed, hence the copies.
        gsap.set(panel, { ...HIDDEN });
        gsap.fromTo(panel, { ...HIDDEN }, { ...SHOWN, ...scrub(ENTER_WINDOW) });
        gsap.fromTo(panel, { ...SHOWN }, { ...EXIT, ...scrub(EXIT_WINDOW) });
      });

      return () => {
        triggerRef.current = null;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add(`(max-width: ${BREAKPOINTS.md - 1}px)`, () => {
      onActive(null);
      const triggers: ScrollTrigger[] = [];
      section.querySelectorAll<HTMLElement>('.mobile-fade').forEach((el) => {
        const tw = gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=80',
              toggleActions: 'play none none reverse',
            },
          },
        );
        if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
      });

      return () => triggers.forEach((st) => st.kill());
    });

    ScrollTrigger.refresh();
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useCallback((index: number) => {
    const st = triggerRef.current;
    const last = lastRef.current;
    if (!st || last < 1) return;
    const i = Math.min(last, Math.max(0, index));
    window.scrollTo({
      top: st.start + (st.end - st.start) * (i / last),
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  }, []);
}
