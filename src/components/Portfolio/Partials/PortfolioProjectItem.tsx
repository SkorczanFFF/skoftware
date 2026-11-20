import Link from 'next/link';
import React, { useId, useState } from 'react';

import { caseStudyForProject, caseStudyHref } from '@/lib/caseStudies';
import { ArticleIcon, GithubIcon, GlobalIcon } from '@/lib/shared/Icons';

import ExternalLink from '@/components/ui/ExternalLink';

import { useLocale } from '@/locale/LocaleContext';
import type { ProjectEntry } from '@/locale/types';

interface PortfolioProjectItemProps {
  project: ProjectEntry;
  isLast?: boolean;
  short?: boolean;
  inert?: boolean;
}

// Physical paddings and borders: Tailwind's py and divide-* are logical and
// turn sideways in vertical-rl.
const LINK_CLASS =
  'relative flex flex-1 basis-0 items-center justify-center overflow-hidden pb-2.5 pt-2.5 text-white/85 transition-colors duration-150 not-last:border-r-2 not-last:border-orange hover:bg-orange hover:text-white md:w-full md:flex-none md:basis-auto md:pb-4 md:pt-4 md:not-last:border-b-2 md:not-last:border-r-0 md:[writing-mode:vertical-rl]';
// The icon is a cropped watermark behind the label: off the right edge of a
// mobile segment, off the bottom of a desktop tab. Without a label it shows plainly.
const WATERMARK =
  'pointer-events-none absolute -right-2 top-1/2 shrink-0 -translate-y-1/2 text-[2.5rem] opacity-15';
const ICON_CLASS = `${WATERMARK} md:-bottom-2 md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-y-0 md:text-[2.75rem]`;
const ICON_ONLY_CLASS = `${WATERMARK} md:static md:translate-y-0 md:text-lg md:opacity-100`;

function ProjectLinks({
  project,
  iconsOnly,
  className,
}: {
  project: ProjectEntry;
  iconsOnly?: boolean;
  className: string;
}) {
  const { t } = useLocale();
  const caseStudy = caseStudyForProject(t, project.id);
  if (!project.git && !project.live && !caseStudy) return null;
  const iconClass = iconsOnly ? ICON_ONLY_CLASS : ICON_CLASS;
  const labelClass = `relative font-unica text-sm uppercase leading-none tracking-wider md:text-[15px] ${iconsOnly ? 'md:sr-only' : ''}`;

  return (
    <div
      className={`flex border-2 border-t-0 border-orange bg-primary-blue md:w-10 md:flex-col md:border-l-0 md:border-t-2 ${className}`}
    >
      {project.live && (
        <ExternalLink
          href={project.live}
          label={project.liveLabel ?? t.portfolioLiveDemo}
          className={LINK_CLASS}
        >
          <GlobalIcon className={iconClass} aria-hidden='true' />
          <span className={labelClass}>
            {project.liveLabel ?? t.portfolioLiveDemo}
          </span>
        </ExternalLink>
      )}
      {caseStudy && (
        <Link href={caseStudyHref(caseStudy.slug)} className={LINK_CLASS}>
          <ArticleIcon className={iconClass} aria-hidden='true' />
          <span className={labelClass}>{t.portfolioCaseStudy}</span>
        </Link>
      )}
      {project.git && (
        <ExternalLink
          href={project.git}
          label={t.portfolioRepo}
          className={LINK_CLASS}
        >
          <GithubIcon className={iconClass} aria-hidden='true' />
          <span className={labelClass}>{t.portfolioRepo}</span>
        </ExternalLink>
      )}
    </div>
  );
}

function ViewSwitch({
  shots,
  view,
  onView,
}: {
  shots: [string, string];
  view: number;
  onView: (view: number) => void;
}) {
  const { t } = useLocale();

  return (
    <div
      role='group'
      aria-label={t.portfolioViews}
      className='flex shrink-0 gap-2'
    >
      {shots.map((src, i) => (
        <button
          key={src}
          type='button'
          aria-pressed={view === i}
          aria-label={t.portfolioShowView.replace('{n}', String(i + 1))}
          onClick={() => onView(i)}
          className={`h-9 w-16 cursor-pointer overflow-hidden border-2 transition duration-200 motion-reduce:transition-none ${
            view === i
              ? 'border-orange-bright'
              : 'border-white/20 opacity-55 hover:opacity-90'
          }`}
        >
          <img
            src={src}
            alt=''
            loading='lazy'
            className='block h-full w-full object-cover'
          />
        </button>
      ))}
    </div>
  );
}

export default function PortfolioProjectItem({
  project,
  isLast,
  short,
  inert,
}: PortfolioProjectItemProps): React.JSX.Element {
  const { t } = useLocale();
  const [view, setView] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();

  const titleSize = short
    ? 'text-xl md:text-2xl lg:text-3xl'
    : 'text-2xl md:text-3xl lg:text-4xl';

  return (
    <article
      inert={inert}
      className={`flex w-full flex-col md:grid md:max-w-[calc(var(--panel-w)-250px)] md:grid-cols-[minmax(0,1fr)_0] ${isLast ? 'pb-[80px] md:pb-0' : ''}`}
    >
      <div className='order-3 mt-4 flex items-center justify-between gap-4 md:col-start-1 md:row-start-1 md:mt-0 md:items-end'>
        <h3
          className={`font-unica gradient flex-1 px-4 py-1 font-normal md:flex-none ${titleSize}`}
        >
          {project.navTitle ?? project.title}
        </h3>
        {project.pic2 && (
          <ViewSwitch
            shots={[project.pic, project.pic2]}
            view={view}
            onView={setView}
          />
        )}
      </div>

      <div className='relative order-1 overflow-hidden border-2 border-orange md:col-start-1 md:row-start-2'>
        <img
          src={project.pic}
          alt={t.screenshotOf.replace('{title}', project.title)}
          aria-hidden={view === 1 || undefined}
          loading='lazy'
          className='block w-full'
        />
        {project.pic2 && (
          <img
            src={project.pic2}
            alt={t.screenshotAltView.replace('{title}', project.title)}
            aria-hidden={view === 0 || undefined}
            loading='lazy'
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${view === 1 ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      <ProjectLinks
        project={project}
        iconsOnly={short}
        className='order-2 md:col-start-2 md:row-start-2 md:self-start md:transition-opacity md:duration-300 md:in-[[inert]]:opacity-0'
      />

      <div
        className={`order-4 mt-4 px-1 md:col-start-1 md:row-start-3 md:px-0 ${short ? '' : 'md:mt-5'}`}
      >
        <p
          id={descriptionId}
          data-lenis-prevent={short && expanded ? '' : undefined}
          className={`text-[15px] font-light leading-[1.4] text-white/80 text-pretty ${short ? (expanded ? 'md:max-h-[4lh] md:overflow-y-auto md:pr-2' : 'md:line-clamp-2') : ''}`}
        >
          {project.description}
        </p>
        {short && (
          <button
            type='button'
            aria-expanded={expanded}
            aria-controls={descriptionId}
            onClick={() => setExpanded((open) => !open)}
            className='mt-1 hidden cursor-pointer text-sm text-white/60 underline underline-offset-4 transition-colors duration-150 hover:text-white md:inline'
          >
            {expanded ? t.portfolioLess : t.portfolioMore}
          </button>
        )}
        <p className='mt-2.5 text-[13px] tracking-wide text-gray-400'>
          {project.technos}
        </p>
      </div>
    </article>
  );
}
