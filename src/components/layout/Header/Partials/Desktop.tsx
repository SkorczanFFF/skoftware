import Link from 'next/link';
import React from 'react';

import { sectionIdOf } from '@/components/layout/Header/sectionId';

interface DesktopProps {
  links: Array<{ href: string; label: string }>;
  activeSection: string;
}
export default function Desktop({
  links,
  activeSection,
}: DesktopProps): React.JSX.Element {
  return (
    <ul className='hidden h-full max-h-[40px] items-center justify-between space-x-10 px-6 lg:flex'>
      {links.map(({ href, label }) => {
        const isActive = sectionIdOf(href) === activeSection;
        return (
          <li key={`${href}${label}`}>
            <Link
              href={href}
              scroll={false}
              className={`group/link relative block h-5 overflow-hidden text-sm uppercase tracking-widest ${isActive ? 'text-real-white' : 'text-real-white/60'}`}
            >
              {/* Two copies stacked in a one-line window: hover or keyboard
                  focus rolls the label up and the full-white copy in from
                  below. `h-5` is the `text-sm` line height — the window has
                  to match it or the copies peek in. */}
              <span className='block transition-[translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-1/2 group-focus-visible/link:-translate-y-1/2'>
                <Label text={label} />
                <span className='block text-real-white' aria-hidden='true'>
                  <Label text={label} />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Label({ text }: { text: string }): React.JSX.Element {
  return (
    <span className='relative block'>
      <span
        className='absolute right-[-1px] bottom-[-1px] text-primary-blue pointer-events-none'
        aria-hidden='true'
      >
        {text}
      </span>
      <span className='relative'>{text}</span>
    </span>
  );
}
