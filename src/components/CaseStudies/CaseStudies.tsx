import Link from 'next/link';
import React, { useRef } from 'react';

import {
  CASE_STUDIES_SECTION_ID,
  caseStudyHref,
  publishedCaseStudies,
} from '@/lib/caseStudies';
import { useActiveOnScroll } from '@/hooks/useActiveOnScroll';
import { useReveal } from '@/hooks/useReveal';
import { useSectionExit } from '@/hooks/useSectionExit';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';

import { useLocale } from '@/locale/LocaleContext';

/** White between the dark WhyMe (hence the `blue` arrow) and the gradient FAQ. */
export default function CaseStudies(): React.JSX.Element {
  const { t } = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const entries = publishedCaseStudies(t);

  useReveal(listRef, { selector: 'li', y: 16, z: -120 });
  useSectionExit(listRef);
  useActiveOnScroll(listRef, 'li');

  return (
    <Section
      id={CASE_STUDIES_SECTION_ID}
      tone='white'
      arrow='blue'
      className='pb-[100px] pt-[80px] md:pb-[130px] md:pt-[120px]'
    >
      <SectionTitle tone='dark'>{t.caseStudiesSectionTitle}</SectionTitle>

      <div className='mx-auto w-full max-w-wide px-6 md:px-10'>
        <p className='mb-10 max-w-[620px] text-[15px] leading-relaxed text-primary-blue/70 md:text-[17px]'>
          {t.caseStudiesLead}
        </p>

        <ol ref={listRef} aria-label={t.caseStudiesLabel}>
          {entries.map((entry, i) => (
            <li
              key={entry.slug}
              className='group border-t border-primary-blue/10 last:border-b'
            >
              <Link
                href={caseStudyHref(entry.slug)}
                className='grid gap-4 py-7 md:grid-cols-[60px_minmax(0,1fr)_220px] md:gap-8 md:py-8'
              >
                <span
                  className='font-unica text-3xl leading-none tracking-tighter text-primary-blue/25 transition-colors duration-300 group-hover:text-raspberry scroll-active:text-raspberry md:text-4xl'
                  aria-hidden='true'
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className='flex flex-col gap-3'>
                  <span className='text-[10px] uppercase tracking-[0.2em] text-primary-blue/50'>
                    {t.caseStudyKind[entry.kind]} · {entry.year}
                  </span>
                  <span className='font-unica text-xl uppercase leading-tight tracking-tight text-primary-blue transition-colors duration-300 group-hover:text-raspberry scroll-active:text-raspberry md:text-2xl'>
                    {entry.title}
                  </span>
                  <span className='max-w-[640px] text-[14px] leading-snug text-primary-blue/65 md:text-[15px]'>
                    {entry.summary}
                  </span>
                </span>

                <span className='flex flex-col justify-between gap-4 md:items-end md:text-right'>
                  <span className='flex flex-wrap gap-x-3 gap-y-1 text-[12px] tracking-wide text-primary-blue/50 md:justify-end'>
                    {entry.stack.slice(0, 4).map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </span>
                  <span className='inline-flex items-center gap-2 text-sm font-medium text-raspberry transition-transform duration-300 group-hover:translate-x-1 scroll-active:translate-x-1'>
                    {t.caseStudiesRead}
                    <span aria-hidden='true'>→</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
