import type { CaseStudyEntry, Dictionary } from '@/locale/types';

/** Route root; `/case-studies` itself redirects to the home section (next.config.js). */
export const CASE_STUDIES_PATH = '/case-studies';
export const CASE_STUDIES_SECTION_ID = 'case-studies';

export const caseStudyHref = (slug: string) => `${CASE_STUDIES_PATH}/${slug}`;

/** Everything that ships: drafts have no page, no row and no links. */
export const publishedCaseStudies = (t: Dictionary): CaseStudyEntry[] =>
  t.caseStudies.filter((entry) => !entry.draft);

export const caseStudyBySlug = (t: Dictionary, slug: string) =>
  publishedCaseStudies(t).find((entry) => entry.slug === slug);

export const caseStudyForProject = (t: Dictionary, projectId: number) =>
  publishedCaseStudies(t).find((entry) => entry.projectId === projectId);

export const caseStudyForService = (t: Dictionary, serviceSlug: string) =>
  publishedCaseStudies(t).find((entry) => entry.serviceSlug === serviceSlug);

/** Wraps around at the ends. */
export const caseStudyNeighbours = (t: Dictionary, slug: string) => {
  const list = publishedCaseStudies(t);
  const i = list.findIndex((entry) => entry.slug === slug);
  if (i === -1 || list.length < 2) return { prev: undefined, next: undefined };
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
};
