import Link from 'next/link';
import React, { useRef } from 'react';

import { CASE_STUDIES_SECTION_ID, caseStudyHref } from '@/lib/caseStudies';
import { GithubIcon, GlobalIcon } from '@/lib/shared/Icons';
import { techIconMap } from '@/lib/shared/techMap';
import { useReveal } from '@/hooks/useReveal';

import Blocks from '@/components/CaseStudy/Blocks';
import Button from '@/components/ui/Button';
import ExternalLink from '@/components/ui/ExternalLink';
import SectionArrow from '@/components/ui/SectionArrow';

import { useLocale } from '@/locale/LocaleContext';
import type {
  CaseStudyBlock,
  CaseStudyBody,
  CaseStudyEntry,
} from '@/locale/types';

type Props = {
  entry: CaseStudyEntry;
  body: CaseStudyBody;
  prev?: CaseStudyEntry;
  next?: CaseStudyEntry;
};

const META_LABEL = 'text-[10px] uppercase tracking-[0.2em] text-white/50';

export default function CaseStudyArticle({ entry, body, prev, next }: Props) {
  const { t } = useLocale();
  const bodyRef = useRef<HTMLDivElement>(null);

  useReveal(bodyRef, { selector: '.cs-item', y: 16, z: -100 });

  const phases: Array<{ title: string; blocks: CaseStudyBlock[] }> = [
    { title: t.caseStudyProblemTitle, blocks: body.problem },
    { title: t.caseStudyApproachTitle, blocks: body.approach },
    { title: t.caseStudySolutionTitle, blocks: body.solution },
    { title: t.caseStudyOutcomeTitle, blocks: body.outcome },
  ];

  return (
    <article className='font-grotesk'>
      <header className='bg-primary-blue px-6 pb-16 pt-[120px] text-white md:px-10 md:pb-24 md:pt-[150px]'>
        <div className='mx-auto grid w-full max-w-wide gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end'>
          <div>
            <p className='mb-4 flex flex-wrap items-center gap-x-3 text-[11px] uppercase tracking-[0.2em] text-orange-bright'>
              <Link
                href={`/#${CASE_STUDIES_SECTION_ID}`}
                scroll={false}
                className='text-white/60 transition-colors duration-200 hover:text-white'
              >
                {t.caseStudiesSectionTitle}
              </Link>
              <span aria-hidden='true' className='text-white/25'>
                ·
              </span>
              <span>{t.caseStudyKind[entry.kind]}</span>
            </p>
            <h1 className='scroll-lean font-unica max-w-[900px] text-3xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-4xl md:text-5xl'>
              {entry.title}
            </h1>
            <p className='mt-6 max-w-[680px] text-[15px] leading-relaxed text-white/70 md:text-[17px]'>
              {entry.summary}
            </p>
          </div>

          <dl className='grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'>
            <div>
              <dt className={META_LABEL}>{t.caseStudyYearLabel}</dt>
              <dd className='mt-1 text-sm text-white/90'>{entry.year}</dd>
            </div>
            <div>
              <dt className={META_LABEL}>{t.caseStudyRoleLabel}</dt>
              <dd className='mt-1 text-sm text-white/90'>{entry.role}</dd>
            </div>
            <div className='col-span-2'>
              <dt className={META_LABEL}>{t.caseStudyStackLabel}</dt>
              <dd className='mt-2 flex flex-wrap gap-2'>
                {entry.stack.map((label) => {
                  const Icon = techIconMap[label];
                  return (
                    <span
                      key={label}
                      className='inline-flex items-center gap-1.5 border border-white/15 px-2 py-1 text-[12px] text-white/85'
                    >
                      {Icon && (
                        <Icon
                          className='text-sm text-white/70'
                          aria-hidden='true'
                        />
                      )}
                      {label}
                    </span>
                  );
                })}
              </dd>
            </div>
            {entry.links && (entry.links.git || entry.links.live) && (
              <div className='col-span-2'>
                <dt className={META_LABEL}>{t.caseStudyLinksLabel}</dt>
                <dd className='mt-2 flex flex-wrap gap-5'>
                  {entry.links.git && (
                    <ExternalLink
                      href={entry.links.git}
                      label={t.caseStudyRepo}
                      className='flex items-center gap-2 text-sm text-orange-bright transition-colors duration-150 hover:text-white'
                    >
                      <GithubIcon className='text-lg' aria-hidden='true' />
                      {t.caseStudyRepo}
                    </ExternalLink>
                  )}
                  {entry.links.live && (
                    <ExternalLink
                      href={entry.links.live}
                      label={entry.links.liveLabel ?? t.caseStudyLive}
                      className='flex items-center gap-2 text-sm text-orange-bright transition-colors duration-150 hover:text-white'
                    >
                      <GlobalIcon className='text-lg' aria-hidden='true' />
                      {entry.links.liveLabel ?? t.caseStudyLive}
                    </ExternalLink>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <div className='relative bg-white text-primary-blue'>
        <SectionArrow color='blue' />

        <div
          ref={bodyRef}
          className='mx-auto w-full max-w-wide px-6 pt-16 md:px-10 md:pt-20'
        >
          {entry.cover && (
            <figure className='cs-item'>
              <img
                src={entry.cover.src}
                alt={entry.cover.alt}
                width={entry.cover.width}
                height={entry.cover.height}
                className='block h-auto w-full border-2 border-orange object-cover'
              />
            </figure>
          )}

          {body.facts && body.facts.length > 0 && (
            <ul
              className={`grid gap-6 border-b border-primary-blue/10 pb-10 sm:grid-cols-3 ${entry.cover ? 'mt-12' : ''}`}
            >
              {body.facts.map((fact) => (
                <li key={fact.label} className='cs-item'>
                  <p className='font-unica text-4xl leading-none tracking-tight text-raspberry md:text-5xl'>
                    {fact.value}
                  </p>
                  <p className='mt-2 text-[13px] leading-snug text-primary-blue/60'>
                    {fact.label}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className='flex flex-col gap-16 py-16 md:py-20'>
            {phases.map((phase, i) => (
              <section
                key={phase.title}
                aria-labelledby={`phase-${i}`}
                className='grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10'
              >
                <div className='cs-item flex items-baseline gap-3 md:block'>
                  <span
                    className='font-unica text-3xl leading-none tracking-tighter text-primary-blue/25 md:text-5xl'
                    aria-hidden='true'
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2
                    id={`phase-${i}`}
                    className='font-unica text-xl uppercase tracking-tight text-primary-blue md:mt-3 md:text-2xl'
                  >
                    {phase.title}
                  </h2>
                  <span
                    className='hidden h-[2px] w-10 bg-raspberry md:mt-4 md:block'
                    aria-hidden='true'
                  />
                </div>
                <div className='flex max-w-prose flex-col gap-5'>
                  <Blocks blocks={phase.blocks} />
                </div>
              </section>
            ))}

            {body.lessons && body.lessons.length > 0 && (
              <section
                aria-labelledby='phase-lessons'
                className='grid gap-6 border-t border-primary-blue/10 pt-14 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10'
              >
                <h2
                  id='phase-lessons'
                  className='cs-item font-unica text-xl uppercase tracking-tight text-primary-blue md:text-2xl'
                >
                  {t.caseStudyLessonsTitle}
                </h2>
                <ul className='flex max-w-prose flex-col gap-4'>
                  {body.lessons.map((lesson) => (
                    <li
                      key={lesson}
                      className='cs-item border-l-2 border-raspberry pl-4 text-[15px] leading-relaxed text-primary-blue/80 md:text-[16px]'
                    >
                      {lesson}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      <footer className='bg-primary-blue text-white'>
        <div className='relative'>
          <SectionArrow color='white' />
        </div>
        <div className='mx-auto w-full max-w-wide px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20'>
          {(prev || next) && (
            <nav
              aria-label={t.caseStudyAll}
              className='grid gap-6 border-b border-white/10 pb-12 sm:grid-cols-2'
            >
              {prev && <Neighbour entry={prev} label={t.caseStudyPrev} />}
              {next && (
                <Neighbour entry={next} label={t.caseStudyNext} align='right' />
              )}
            </nav>
          )}

          <div className='flex flex-col items-start gap-6 pt-12 md:flex-row md:items-end md:justify-between'>
            <div>
              <h2 className='font-unica text-3xl uppercase leading-tight tracking-tight md:text-5xl'>
                {t.caseStudyCtaHeading}
              </h2>
              <p className='mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/60 md:text-[16px]'>
                {t.caseStudyCtaBody}
              </p>
            </div>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Button href='/#contact' variant='gradient'>
                {t.caseStudyCtaButton}
              </Button>
              <Link
                href={`/#${CASE_STUDIES_SECTION_ID}`}
                scroll={false}
                className='px-2 py-3 text-center text-sm uppercase tracking-widest text-white/60 transition-colors duration-200 hover:text-white'
              >
                {t.caseStudyAll}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}

function Neighbour({
  entry,
  label,
  align = 'left',
}: {
  entry: CaseStudyEntry;
  label: string;
  align?: 'left' | 'right';
}) {
  return (
    <Link
      href={caseStudyHref(entry.slug)}
      className={`group flex flex-col gap-2 ${align === 'right' ? 'sm:items-end sm:text-right' : ''}`}
    >
      <span className='text-[10px] uppercase tracking-[0.2em] text-white/50'>
        {align === 'left' ? '← ' : ''}
        {label}
        {align === 'right' ? ' →' : ''}
      </span>
      <span className='font-unica text-lg uppercase leading-tight tracking-tight text-white transition-colors duration-200 group-hover:text-orange-bright md:text-xl'>
        {entry.title}
      </span>
    </Link>
  );
}
