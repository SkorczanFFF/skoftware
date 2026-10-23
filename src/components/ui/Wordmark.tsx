import type React from 'react';

const LETTERS = [
  ...[...'SKO'].map((ch) => ({ ch, color: 'text-orange' })),
  ...[...'FT'].map((ch) => ({ ch, color: 'text-raspberry' })),
  ...[...'ware'].map((ch) => ({ ch, color: 'text-primary-blue' })),
];

/** One span per letter with its index as `--i`: `.logo-letter` (globals.css)
 *  drags each letter behind scroll speed by its distance from the first. */
const letterStyle = (i: number) => ({ '--i': i }) as React.CSSProperties;

type WordmarkProps = {
  /** Size and any placement; the face and weight are fixed. */
  className?: string;
  /** How far the white copy sits behind the letters, scaled with the size. */
  offsetClass?: string;
  /**
   * A second white copy pushed the opposite way (up and left), for grounds
   * the brand colours melt into — the gradient route curtain. Off by default.
   */
  mirrorOffsetClass?: string;
};

function WhiteCopy({ offsetClass }: { offsetClass: string }) {
  return (
    <span
      className={`[grid-area:1/1] text-white pointer-events-none ${offsetClass}`}
      aria-hidden='true'
    >
      {LETTERS.map(({ ch }, i) => (
        <span key={i} className='logo-letter' style={letterStyle(i)}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/**
 * All copies share one grid cell and only the white ones are translated, so
 * they get identical line boxes at any size: an absolutely positioned copy
 * drifted apart from the baseline-aligned letters at display sizes.
 */
export default function Wordmark({
  className = 'text-2xl',
  offsetClass = 'translate-x-[1px] translate-y-[3px]',
  mirrorOffsetClass,
}: WordmarkProps) {
  return (
    <span
      className={`font-unica inline-grid font-bold select-none ${className}`}
    >
      {mirrorOffsetClass && <WhiteCopy offsetClass={mirrorOffsetClass} />}
      <WhiteCopy offsetClass={offsetClass} />
      <span className='[grid-area:1/1]'>
        {LETTERS.map(({ ch, color }, i) => (
          <span
            key={i}
            className={`logo-letter ${color}`}
            style={letterStyle(i)}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
