import Link from 'next/link';
import type React from 'react';

import { useLocale } from '@/locale/LocaleContext';

const LETTERS = [
  ...[...'SKO'].map((ch) => ({ ch, color: 'text-orange' })),
  ...[...'FT'].map((ch) => ({ ch, color: 'text-raspberry' })),
  ...[...'ware'].map((ch) => ({ ch, color: 'text-primary-blue' })),
];

/** One span per letter with its index as `--i`: `.logo-letter` (globals.css)
 *  drags each letter behind scroll speed by its distance from the first. */
const letterStyle = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Logo() {
  const { t } = useLocale();
  return (
    <Link
      href='/'
      className='font-unica font-bold select-none relative'
      aria-label={t.backToHome}
    >
      <span className='text-2xl relative'>
        {/* The white offset copy is split the same way, so it bends with the
            letters instead of staying straight behind them. */}
        <span
          className='absolute right-[-1px] bottom-[-3px] text-white pointer-events-none'
          aria-hidden='true'
        >
          {LETTERS.map(({ ch }, i) => (
            <span key={i} className='logo-letter' style={letterStyle(i)}>
              {ch}
            </span>
          ))}
        </span>
        <span className='relative'>
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
    </Link>
  );
}
