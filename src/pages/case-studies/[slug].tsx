import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import {
  CASE_STUDIES_SECTION_ID,
  caseStudyBySlug,
  caseStudyHref,
  caseStudyNeighbours,
  publishedCaseStudies,
} from '@/lib/caseStudies';
import { COMPANY_FOUNDER, SITE_URL } from '@/lib/site';

import CaseStudyArticle from '@/components/CaseStudy/CaseStudyArticle';
import BottomBar from '@/components/layout/BottomBar';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { caseStudyBodies as enBodies } from '@/locale/data/en/caseStudyBodies';
import { caseStudyBodies as plBodies } from '@/locale/data/pl/caseStudyBodies';
import { DEFAULT_LOCALE, useLocale } from '@/locale/LocaleContext';
import { pl } from '@/locale/pl';
import type { CaseStudyBody } from '@/locale/types';

type Props = { slug: string; body: CaseStudyBody };

/**
 * Metadata comes from the dictionary like on every page; the body arrives
 * through `getStaticProps`, so the prose is not in every page's bundle.
 */
export default function CaseStudyPage({ slug, body }: Props) {
  const { locale, t } = useLocale();
  const entry = caseStudyBySlug(t, slug);

  if (!entry) return null;

  const { prev, next } = caseStudyNeighbours(t, slug);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  const url = `${SITE_URL}${prefix}${caseStudyHref(entry.slug)}`;
  const image = entry.cover ? `${SITE_URL}${entry.cover.src}` : undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: entry.title,
    description: entry.summary,
    inLanguage: locale,
    url,
    ...(image && { image }),
    keywords: entry.stack.join(', '),
    author: { '@type': 'Person', name: COMPANY_FOUNDER },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.navHome,
        item: `${SITE_URL}${prefix || '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.caseStudiesSectionTitle,
        item: `${SITE_URL}${prefix}/#${CASE_STUDIES_SECTION_ID}`,
      },
      { '@type': 'ListItem', position: 3, name: entry.title, item: url },
    ],
  };

  return (
    <Layout>
      <Seo
        templateTitle={entry.title}
        description={entry.summary}
        image={image}
        ogType='article'
      />
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>
      <main className='overflow-x-clip'>
        {/* Keyed by slug: prev/next keeps the page component mounted, and the
            reveal effects must rebuild for the new article, not the old one. */}
        <CaseStudyArticle
          key={entry.slug}
          entry={entry}
          body={body}
          prev={prev}
          next={next}
        />
        <BottomBar />
      </main>
    </Layout>
  );
}

// Slugs are identical across locales, so the PL list is the canonical one;
// the parity test keeps EN in step.
export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => ({
  paths: publishedCaseStudies(pl).flatMap((entry) =>
    locales.map((locale) => ({ params: { slug: entry.slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  locale,
}) => {
  const slug = String(params?.slug ?? '');
  const body = (locale === 'en' ? enBodies : plBodies)[slug];
  if (!caseStudyBySlug(pl, slug) || !body) return { notFound: true };
  return { props: { slug, body } };
};
