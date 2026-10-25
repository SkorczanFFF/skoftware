import Head from 'next/head';
import React from 'react';

import { resumeProjects } from '@/lib/resume';
import { resumeTechList } from '@/lib/shared/techMap';
import { COMPANY_FOUNDER, SITE_DOMAIN, SITE_URL, SOCIALS } from '@/lib/site';

import { useLocale } from '@/locale/LocaleContext';

/**
 * Parser-first CV for recruitment portals: one column, no photo. Not linked
 * anywhere, noindex, out of the sitemap; printed by scripts/generate-cv-pdf.mjs.
 */
export default function AtsCv(): React.JSX.Element {
  const { t } = useLocale();

  const links = [
    { label: SITE_DOMAIN, href: SITE_URL },
    ...SOCIALS.map(({ label, href }) => ({
      label: `${label}: ${href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}`,
      href,
    })),
  ];

  return (
    <>
      <Head>
        <title>{`${COMPANY_FOUNDER} - CV`}</title>
        <meta name='robots' content='noindex, nofollow' />
        <meta name='author' content={COMPANY_FOUNDER} />
      </Head>
      <main className='font-grotesk min-h-screen bg-white pt-[60px] text-black'>
        <article
          id='ats-resume'
          className='mx-auto w-full max-w-[720px] px-6 py-10 text-[11px] leading-[15px]'
        >
          <header>
            <h1 className='font-grotesk text-[22px] font-bold leading-tight'>
              {COMPANY_FOUNDER}
            </h1>
            <p className='text-[13px] font-semibold'>{t.resumeAtsHeadline}</p>
            <address className='mt-1 not-italic'>
              <p>
                <a href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
                {' | '}
                <a href={`tel:${t.contactPhone.replace(/\s/g, '')}`}>
                  {t.contactPhone}
                </a>
                {' | '}
                {t.contactLocation}
              </p>
              <p>
                {links.map(({ label, href }, i) => (
                  <React.Fragment key={href}>
                    {i > 0 && ' | '}
                    <a href={href}>{label}</a>
                  </React.Fragment>
                ))}
              </p>
            </address>
          </header>

          <Section title={t.resumeHeaderAbout}>
            <p>{t.resumeAboutMe}</p>
          </Section>

          <Section title={t.resumeHeaderSkills}>
            <p>{resumeTechList.join(', ')}</p>
          </Section>

          <Section title={t.resumeAtsMethodsTitle}>
            <p>{t.resumeAtsMethods.join(', ')}</p>
          </Section>

          <Section title={t.resumeHeaderExperience}>
            {t.experiences.map((exp) => (
              <div key={exp.company} className='mb-3'>
                <h3 className='font-grotesk text-[12px] font-bold'>
                  {exp.position}, {exp.company}
                </h3>
                <p>
                  {exp.resumeDate}
                  {exp.resumeType ? ` | ${exp.resumeType}` : ''}
                </p>
                <p>{exp.stack.join(', ')}</p>
                <ul className='mt-1 list-disc pl-4'>
                  {exp.duties.map((duty, i) => (
                    <li key={i}>{duty}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          <Section title={t.resumeHeaderEducation}>
            <p className='font-bold'>{t.resumeEducation.university}</p>
            <p>
              {t.resumeEducation.field}, {t.resumeEducation.degree},{' '}
              {t.resumeEducation.dates}
            </p>
          </Section>

          <Section title={t.resumeHeaderLanguagesTitle}>
            <p>
              {[
                t.resumeLanguagePolish,
                t.resumeLanguageEnglish,
                t.resumeLanguageRussian,
              ].join(', ')}
            </p>
          </Section>

          <Section title={t.resumeHeaderSelectedProjects}>
            {resumeProjects(t).map((project) => (
              <div key={project.id} className='mb-2'>
                <h3 className='font-grotesk text-[12px] font-bold'>
                  {project.title.replace(/^★ /, '')}
                </h3>
                <p>{project.technos.split(' • ').join(', ')}</p>
                <p>{project.description}</p>
                <p>
                  {project.git && <a href={project.git}>{project.git}</a>}
                  {project.git && project.live && ' | '}
                  {project.live && <a href={project.live}>{project.live}</a>}
                </p>
              </div>
            ))}
          </Section>

          <Section title={t.resumeHeaderHobbies}>
            <p>{t.resumeHobbies.join(', ')}</p>
          </Section>

          {t.resumeRodo && (
            <p className='mt-6 text-[9px] leading-[12px] text-black/70'>
              {t.resumeRodo}
            </p>
          )}
        </article>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='mt-4'>
      <h2 className='font-grotesk mb-1 border-b border-black/30 pb-0.5 text-[13px] font-bold uppercase'>
        {title}
      </h2>
      {children}
    </section>
  );
}
