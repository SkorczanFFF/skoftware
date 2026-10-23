import type { CaseStudyEntry, CaseStudyKind } from './entries';

/** Case-study section on the home page and the `/case-studies/<slug>` template. */
export type CaseStudyStrings = {
  caseStudies: CaseStudyEntry[];

  navCaseStudies: string;
  caseStudiesSectionTitle: string;
  caseStudiesLead: string;
  /** Row / card link label, e.g. "Read the case study". */
  caseStudiesRead: string;
  /** Accessible name of the home section list. */
  caseStudiesLabel: string;

  /** Eyebrow over the title, by kind. */
  caseStudyKind: Record<CaseStudyKind, string>;
  caseStudyYearLabel: string;
  caseStudyRoleLabel: string;
  caseStudyStackLabel: string;
  caseStudyLinksLabel: string;
  caseStudyRepo: string;
  caseStudyLive: string;

  caseStudyProblemTitle: string;
  caseStudyApproachTitle: string;
  caseStudySolutionTitle: string;
  caseStudyOutcomeTitle: string;
  caseStudyLessonsTitle: string;

  caseStudyPrev: string;
  caseStudyNext: string;
  caseStudyAll: string;
  caseStudyCtaHeading: string;
  caseStudyCtaBody: string;
  caseStudyCtaButton: string;

  /** Third link on a portfolio panel. */
  portfolioCaseStudy: string;
  /** Link at the foot of a service card. */
  servicesCaseStudy: string;
};
