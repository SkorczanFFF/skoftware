import { type RefObject, useRef } from 'react';

import { useRouteTransition } from '@/hooks/useRouteTransition';

import Wordmark from '@/components/ui/Wordmark';

/**
 * The panel that carries one page out and the next one in. Both of its edges
 * are cut to the section arrow (`.route-curtain`), so it leads with a point
 * going up and hands the new page over with one going down.
 *
 * Decorative throughout: Next's own route announcer is what tells assistive
 * technology that the page changed.
 */
export default function RouteTransition({
  contentRef,
}: {
  contentRef: RefObject<HTMLElement | null>;
}) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);

  useRouteTransition(curtainRef, wordmarkRef, contentRef);

  return (
    <div
      ref={curtainRef}
      aria-hidden='true'
      className='route-curtain gradient z-[9999] flex items-center justify-center'
      // No starting transform: GSAP would read it back from the computed
      // matrix as pixels and keep them under its own yPercent. Hidden, the
      // panel's resting place does not matter; every cover parks it first.
      style={{ visibility: 'hidden' }}
    >
      <span ref={wordmarkRef} className='opacity-0'>
        <Wordmark
          className='text-5xl md:text-6xl'
          offsetClass='translate-x-[3px] translate-y-[3px]'
          mirrorOffsetClass='-translate-x-[3px] -translate-y-[3px]'
        />
      </span>
    </div>
  );
}
