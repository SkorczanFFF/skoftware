import { gsap } from '@/lib/gsap';

/** Pause between two hops of one letter, in seconds. */
const REST_MIN = 0.05;
const REST_MAX = 0.55;

/** Jump height as a share of the letter's own box, so it scales with the type. */
const HEIGHT_MIN = 35;
const HEIGHT_MAX = 85;

/**
 * Letters hopping in place, each on its own random clock, with squash and
 * stretch: crouch, stretch on take-off, round out at the apex, stretch into
 * the fall, flatten on impact, wobble back. Every deformation is scaled from
 * the baseline, so the feet stay planted.
 *
 * The wordmark draws each letter more than once (its white copies), so the
 * spans are grouped by their `--i` and a group jumps as one.
 *
 * Returns a stop that kills every pending hop and hands `transform` back to
 * `.logo-letter`, which leans the letters with scroll speed.
 */
export function bounceLetters(root: HTMLElement): () => void {
  const groups = new Map<string, HTMLElement[]>();
  root.querySelectorAll<HTMLElement>('.logo-letter').forEach((letter) => {
    const index = letter.style.getPropertyValue('--i');
    groups.set(index, [...(groups.get(index) ?? []), letter]);
  });
  const letters = [...groups.values()];

  // One slot per group: at any moment a group is either waiting or jumping.
  const pending: gsap.core.Animation[] = [];
  let running = true;

  const rest = (slot: number, min = REST_MIN) => {
    pending[slot] = gsap.delayedCall(gsap.utils.random(min, REST_MAX), () =>
      hop(slot),
    );
  };

  const hop = (slot: number) => {
    if (!running) return;
    const group = letters[slot];
    // A higher jump lands harder.
    const force = Math.random();
    const height = gsap.utils.interpolate(HEIGHT_MIN, HEIGHT_MAX, force);
    const squash = 0.18 + 0.14 * force;

    pending[slot] = gsap
      .timeline({ onComplete: () => rest(slot) })
      .to(group, {
        scaleX: 1.22,
        scaleY: 0.78,
        duration: 0.08,
        ease: 'power2.out',
      })
      .to(group, {
        yPercent: -height,
        rotation: gsap.utils.random(-8, 8),
        duration: 0.22,
        ease: 'power2.out',
      })
      .to(
        group,
        { scaleX: 0.84, scaleY: 1.2, duration: 0.07, ease: 'power2.out' },
        '<',
      )
      // Right after the stretch, not after the rise: round by the apex.
      .to(
        group,
        { scaleX: 1, scaleY: 1, duration: 0.15, ease: 'sine.inOut' },
        '>',
      )
      .to(group, {
        yPercent: 0,
        rotation: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
      .to(
        group,
        { scaleX: 0.9, scaleY: 1.12, duration: 0.2, ease: 'power2.in' },
        '<',
      )
      .to(group, {
        scaleX: 1 + squash,
        scaleY: 1 - squash,
        duration: 0.06,
        ease: 'power2.out',
      })
      .to(group, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.35)',
      });
  };

  const all = letters.flat();
  // An explicit start: GSAP would otherwise read the scroll lean from the
  // computed matrix and keep it as the resting `y`.
  gsap.set(all, { transformOrigin: '50% 100%', y: 0, yPercent: 0 });
  letters.forEach((_, slot) => rest(slot, 0));

  return () => {
    running = false;
    pending.forEach((animation) => animation.kill());
    gsap.set(all, { clearProps: 'transform,transformOrigin' });
  };
}
