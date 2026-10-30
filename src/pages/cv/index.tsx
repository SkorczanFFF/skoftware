import Head from 'next/head';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { resumeProjects } from '@/lib/resume';
import {
  CallIcon,
  CarIcon,
  ChipIcon,
  CompassIcon,
  GithubIcon,
  GlobalIcon,
  GuitarIcon,
  LinkedinIcon,
  LocationIcon,
  MailIcon,
  MusicIcon,
  PdfIcon,
  PotteryIcon,
  PrintIcon,
  VercelIcon,
} from '@/lib/shared/Icons';
import { resumeTechList, techIconMap } from '@/lib/shared/techMap';
import {
  COMPANY_FOUNDER,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  SOCIALS,
} from '@/lib/site';

import BottomBar from '@/components/layout/BottomBar';

import { useLocale } from '@/locale/LocaleContext';

/** Safari and every iOS browser (all WebKit) ignore `@page { margin: 0 }`
 *  and frame the sheet in margins of their own; the PDF prints edge to edge. */
const printsWithOwnMargins = (): boolean =>
  /AppleWebKit/.test(navigator.userAgent) &&
  !/Chrome\/|Chromium\/|Android/.test(navigator.userAgent);

export default function CV(): React.JSX.Element {
  const { locale, t } = useLocale();
  const pdfHref = `/Maciej-Skorus-CV-${locale.toUpperCase()}.pdf`;

  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const update = () => {
      const w = wrapperRef.current?.offsetWidth ?? 794;
      setScale(Math.min(1, w / 794));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (searchParams.get('download') === '1') {
      const link = document.createElement('a');
      link.href = pdfHref;
      link.download = '';
      link.click();
    }
  }, [searchParams, pdfHref]);

  const handlePrint = () => {
    if (printsWithOwnMargins()) {
      window.open(pdfHref, '_blank', 'noopener');
      return;
    }
    window.print();
  };

  return (
    <>
      <Head>
        <title>{t.resumePageTitle}</title>
        {/* Kept out of the index on purpose: a services site should not rank
            on its owner's CV. Still crawlable so the links are followed. */}
        <meta name='robots' content='noindex, follow' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: COMPANY_FOUNDER,
              url: `${SITE_URL}/cv`,
              email: CONTACT_EMAIL,
              telephone: CONTACT_PHONE,
              worksFor: { '@id': `${SITE_URL}/#organization` },
              sameAs: SOCIALS.map((s) => s.href),
            }),
          }}
        />
      </Head>
      <section className='font-grotesk pt-[60px] flex flex-col items-center justify-start md:justify-between bg-linear-to-b from-[#1A1A28] to-[#3a1323] min-h-screen'>
        <div className='flex justify-end gap-2 h-auto flex-row items-stretch w-full max-w-[794px] px-2 md:px-0'>
          <button
            type='button'
            onClick={handlePrint}
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150 cursor-pointer'
          >
            {t.resumeHeaderPrint}
            <PrintIcon className='ml-1 text-lg' />
          </button>
          <a
            href={pdfHref}
            download
            className='hover:bg-orange bg-raspberry my-6 flex items-center px-2 py-1 text-sm tracking-wider text-white duration-150 cursor-pointer'
          >
            {t.resumeHeaderDownload}
            <PdfIcon className='ml-1 text-lg' />
          </a>
        </div>
        <div className='w-full md:w-auto md:m-10 md:mt-0 px-2 md:px-0'>
          <div
            ref={wrapperRef}
            className='mx-auto overflow-hidden'
            style={{
              maxWidth: 794,
              height: 1123 * scale,
            }}
          >
            {/* #resume is what gets printed (globals.css) and what
                scripts/generate-cv-pdf.mjs cuts out for the PDF. */}
            <div
              id='resume'
              className='overflow-hidden flex h-[1123px] w-[794px] justify-center bg-primary-blue flex-row origin-top-left'
              style={{ transform: `scale(${scale})` }}
            >
              {/* Left side */}
              <div className='bg-transparent h-full w-[226px] border-r-[16px] border-raspberry'>
                <Image
                  src='/cv.png'
                  alt={t.resumeAltPhoto}
                  width={206}
                  height={206}
                />
                {/* <div className="bg-raspberry h-[8px] w-full"></div> */}
                {/* Grid rows interleave name and title visually; the DOM keeps
                    the name whole, and the PDF text stream follows the DOM.
                    The name bars run 2px into the raspberry border, so no
                    seam shows between them when the sheet is scaled. */}
                <div className='grid grid-cols-1 text-2xl tracking-wide'>
                  <h1 className='contents font-grotesk font-[500] text-primary-blue'>
                    <span className='row-start-2 -mr-[2px] bg-raspberry pl-2 text-left'>
                      MACIEJ
                    </span>{' '}
                    <span className='row-start-4 -mr-[2px] bg-raspberry pl-2 text-left'>
                      SKORUS
                    </span>
                  </h1>
                  <p className='contents font-unica font-light text-white'>
                    <span className='row-start-1 pr-2 text-right'>
                      creative
                    </span>{' '}
                    <span className='row-start-3 pr-2 text-right'>
                      fullstack
                    </span>{' '}
                    <span className='row-start-5 pr-2 text-right'>
                      developer
                    </span>
                  </p>
                </div>
                <div className='mt-1 flex flex-col gap-2.5 text-[9px]'>
                  {/* Contact */}
                  <div>
                    <h2 className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderContact}
                    </h2>
                    <address className='px-2 pt-1 text-white/80 flex flex-col gap-[2px] not-italic'>
                      <a
                        href={`mailto:${t.contactEmail}`}
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <MailIcon className='text-[10px] shrink-0' />
                        {t.contactEmail}
                      </a>
                      <a
                        href={`tel:${t.contactPhone.replace(/\s/g, '')}`}
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <CallIcon className='text-[10px] shrink-0' />
                        {t.contactPhone}
                      </a>
                      <span className='flex items-center gap-1'>
                        <LocationIcon className='text-[10px] shrink-0' />
                        {t.contactLocation}
                      </span>
                    </address>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderEducation}
                    </h2>
                    <div className='pl-2 pt-1 text-white/80'>
                      {/* Last word glued to the one before so it never wraps
                          alone; the ATS page keeps plain spaces for parsers. */}
                      <p className='font-semibold text-white'>
                        {t.resumeEducation.university.replace(
                          / (\S+)$/,
                          '\u00A0$1',
                        )}
                      </p>
                      <p>{t.resumeEducation.field}</p>
                      <p className='text-orange-bright'>
                        {t.resumeEducation.degree}
                      </p>
                      <p className='text-orange-bright'>
                        {t.resumeEducation.dates}
                      </p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h2 className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderLanguagesTitle}
                    </h2>
                    <div className='px-2 pt-1 text-white/80'>
                      <p>{t.resumeLanguageEnglish}</p>
                      <p>{t.resumeLanguageRussian}</p>
                      <p>{t.resumeLanguagePolish}</p>
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <h2 className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderLinks}
                    </h2>
                    <div className='px-2 pt-1 text-white/80 flex flex-col gap-[2px]'>
                      <a
                        href='https://github.com/SkorczanFFF'
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <GithubIcon className='text-[10px] shrink-0' />
                        github.com/SkorczanFFF
                      </a>
                      <a
                        href='https://www.linkedin.com/in/mskorus/'
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center gap-1 hover:text-white'
                      >
                        <LinkedinIcon className='text-[10px] shrink-0' />
                        linkedin.com/in/mskorus
                      </a>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_SITE_URL ||
                          'https://skoftware.pl/'
                        }
                        target='_blank'
                        rel='noreferrer'
                        className='flex items-center gap-1 hover:text-white -mt-[2px]'
                      >
                        <VercelIcon className='text-[10px] shrink-0' />
                        {(
                          process.env.NEXT_PUBLIC_SITE_URL ||
                          'https://skoftware.pl'
                        ).replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderSkills}
                    </h2>
                    <div className='px-2 pt-2 flex flex-col gap-[3px]'>
                      {Array.from(
                        { length: Math.ceil(resumeTechList.length / 3) },
                        (_, row) => (
                          <div key={row} className='flex gap-[6px]'>
                            {resumeTechList
                              .slice(row * 3, row * 3 + 3)
                              .map((tech) => {
                                const Icon = techIconMap[tech];
                                return (
                                  <div
                                    key={tech}
                                    className='flex items-center gap-[4px] text-[9px] text-white/70'
                                  >
                                    {Icon && (
                                      <Icon className='text-[11px] text-white/90' />
                                    )}
                                    <span className='whitespace-nowrap'>
                                      {tech}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div>
                    <h2 className='bg-deep-blue pl-2 py-[2px] text-[14px] font-semibold tracking-widest text-white font-unica'>
                      {t.resumeHeaderHobbies}
                    </h2>
                    <div className='px-2 pt-2 flex gap-2'>
                      {(
                        [
                          GuitarIcon,
                          CarIcon,
                          MusicIcon,
                          CompassIcon,
                          ChipIcon,
                          PotteryIcon,
                        ] as const
                      ).map((Icon, i) => (
                        <div key={i} className='flex flex-col items-center'>
                          <Icon className='text-[24px] text-white/90' />
                          <span
                            className='mt-1 font-[400] text-[9px] text-white/70'
                            style={{ writingMode: 'vertical-rl' }}
                          >
                            {t.resumeHobbies[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Main content */}
              <div className='bg-white h-full w-[594px] flex flex-col justify-between'>
                <div className='px-4 pt-2'>
                  {/* About */}
                  <h2 className='text-[13px] font-bold uppercase tracking-widest text-primary-blue border-b border-primary-blue/20 pb-0.5 mb-1.5 font-unica'>
                    {t.resumeHeaderAbout}
                  </h2>
                  <p className='text-[9px] leading-[12px] text-primary-blue/80 mb-2 text-justify'>
                    {t.resumeAboutMe}
                  </p>

                  {/* Experience */}
                  <h2 className='text-[13px] font-bold uppercase tracking-widest text-primary-blue border-b border-primary-blue/20 pb-0.5 mb-2'>
                    {t.resumeHeaderExperience}
                  </h2>
                  <div className='flex flex-col gap-[7px]'>
                    {t.experiences.map((exp) => (
                      <div key={exp.company}>
                        <div className='flex items-baseline justify-between'>
                          <p className='text-[12px] font-bold text-primary-blue'>
                            {exp.company}
                          </p>
                          <p className='text-[9px] text-primary-blue/60'>
                            {exp.resumeDate}
                          </p>
                        </div>
                        <div className='flex items-baseline justify-between'>
                          <p className='text-[10px] italic text-raspberry'>
                            {exp.position}
                          </p>
                          {exp.resumeType && (
                            <p className='text-[9px] text-primary-blue/50'>
                              {exp.resumeType}
                            </p>
                          )}
                        </div>
                        <p className='text-[9px] text-primary-blue/50 mt-[1px]'>
                          {exp.stack.join(' • ')}
                        </p>
                        {/* No positioning on the items: positioned elements
                            paint last, and the PDF text stream follows paint
                            order, which detached every bullet from its employer. */}
                        <ul className='mt-0.5 flex flex-col gap-[1px] list-disc pl-[11px] marker:text-raspberry'>
                          {exp.duties.map((duty, i) => (
                            <li
                              key={i}
                              className='text-[9px] leading-[11px] text-primary-blue/80 text-justify'
                            >
                              {duty}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Selected Projects */}
                  <h2 className='text-[13px] font-bold uppercase tracking-widest text-primary-blue border-b border-primary-blue/20 pb-0.5 mb-2 mt-3'>
                    {t.resumeHeaderSelectedProjects}
                  </h2>
                  <div className='flex flex-col gap-1'>
                    {resumeProjects(t).map((project) => (
                      <div key={project.id}>
                        <div className='flex items-baseline justify-between'>
                          <p className='text-[11px] font-bold text-primary-blue'>
                            {project.title}
                          </p>
                          <p className='text-[9px] text-primary-blue/50'>
                            {project.technos}
                          </p>
                        </div>
                        <p className='text-[9px] leading-[11px] text-primary-blue/80 mt-[1px] text-justify'>
                          {project.description}
                        </p>
                        {(project.git || project.live) && (
                          <div className='mt-[1px] flex gap-3 text-[8px] text-raspberry'>
                            {project.git && (
                              <a
                                href={project.git}
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center gap-[2px] hover:text-primary-blue'
                              >
                                <GithubIcon className='text-[8px]' />
                                {t.resumeRepo}
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target='_blank'
                                rel='noreferrer'
                                className='flex items-center gap-[2px] hover:text-primary-blue'
                              >
                                <GlobalIcon className='text-[8px]' />
                                {project.liveLabel || t.resumeDemo}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <p className='px-2 pb-1 text-[8.7px] leading-[8px] text-primary-blue/40 text-justify'>
                  {t.resumeRodo}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mt-auto md:mt-0'>
          <BottomBar />
        </div>
      </section>
    </>
  );
}
