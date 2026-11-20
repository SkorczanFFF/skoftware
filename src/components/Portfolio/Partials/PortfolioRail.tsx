import React, { useRef } from 'react';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface PortfolioRailProps {
  ref: React.Ref<HTMLElement>;
  projects: ProjectEntry[];
  active: number | null;
  onSelect: (index: number) => void;
}

const KEY_STEP: Record<string, (i: number, last: number) => number> = {
  ArrowRight: (i) => i + 1,
  ArrowLeft: (i) => i - 1,
  Home: () => 0,
  End: (_, last) => last,
};

export default function PortfolioRail({
  ref,
  projects,
  active,
  onSelect,
}: PortfolioRailProps): React.JSX.Element {
  const { t } = useLocale();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const last = projects.length - 1;
  const current = active ?? 0;

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = KEY_STEP[event.key];
    if (!step) return;
    event.preventDefault();
    const next = Math.min(last, Math.max(0, step(index, last)));
    onSelect(next);
    buttons.current[next]?.focus();
  };

  return (
    <nav
      ref={ref}
      aria-label={t.portfolioRailLabel}
      className='absolute bottom-7 left-1/2 z-10 hidden w-[min(62rem,calc(100vw-12rem))] -translate-x-1/2 md:block'
      style={{ ['--progress' as string]: 0 }}
    >
      <ol
        className='grid items-end'
        style={{
          gridTemplateColumns: `repeat(${projects.length}, minmax(0, 1fr))`,
        }}
      >
        {projects.map((project, index) => (
          <li key={project.id} className='flex justify-center'>
            <button
              ref={(el) => {
                buttons.current[index] = el;
              }}
              type='button'
              tabIndex={index === current ? 0 : -1}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className='font-unica cursor-pointer px-1 pb-3 text-center text-sm uppercase leading-tight tracking-wide text-balance text-white/45 transition-colors duration-200 hover:text-white/80 focus-visible:text-white aria-[current=true]:text-white lg:text-base'
            >
              {project.navTitle ?? project.title}
            </button>
          </li>
        ))}
      </ol>

      {/* Spans the first name's centre to the last's, so the fill meets each name. */}
      <div
        aria-hidden='true'
        className='relative h-0.5 bg-white/15'
        style={{ marginInline: `calc(100% / ${projects.length * 2})` }}
      >
        <span
          className='absolute inset-0 origin-left bg-linear-to-r from-raspberry-bright to-orange-bright'
          style={{ transform: 'scaleX(var(--progress))' }}
        />
        {projects.map((project, index) => (
          <span
            key={project.id}
            className={`absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors duration-200 ${
              active !== null && index <= active
                ? 'bg-orange-bright'
                : 'bg-primary-blue ring-1 ring-white/30'
            }`}
            style={{ left: last > 0 ? `${(index / last) * 100}%` : '50%' }}
          />
        ))}
      </div>
    </nav>
  );
}
