export type ExperienceEntry = {
  company: string;
  position: string;
  resumeDate: string;
  resumeType?: string;
  stack: string[];
  duties: string[];
};

export type ProjectEntry = {
  id: number;
  pic: string;
  /** Optional second image shown on hover (desktop). */
  pic2?: string;
  title: string;
  technos: string;
  description: string;
  live: string;
  git: string;
  /** Overrides `portfolioLiveDemo` for the live link label (e.g. Chrome Web Store). */
  liveLabel?: string;
  /** Whether to hide this project from the portfolio section. */
  resumeOnly?: boolean;
};

export type ServiceEntry = {
  /** Stable id, identical in PL and EN. */
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  /** 3 "what you get" bullets. */
  deliverables: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

/** One paragraph-level piece of a case study phase. */
export type CaseStudyBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | ({ type: 'image'; caption?: string } & CaseStudyImage)
  | { type: 'code'; code: string; lang?: string };

export type CaseStudyKind = 'personal' | 'work' | 'client';

export type CaseStudyFact = { value: string; label: string };

/** Width and height reserve the box before the file arrives: no layout shift. */
export type CaseStudyImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * The article itself: `data/{pl,en}/caseStudyBodies.ts`, keyed by slug and
 * handed to the page by `getStaticProps`. Kept out of the dictionary, which
 * ships in every page's bundle. The four phases are mandatory so every
 * write-up reads the same way; a dictionary string heads each of them.
 */
export type CaseStudyBody = {
  /** Headline numbers across the top of the article. */
  facts?: CaseStudyFact[];
  problem: CaseStudyBlock[];
  approach: CaseStudyBlock[];
  solution: CaseStudyBlock[];
  outcome: CaseStudyBlock[];
  lessons?: string[];
};

/**
 * One case study's metadata: everything the lists, links, OG tags and the
 * article header need. The body lives in `CaseStudyBody`.
 */
export type CaseStudyEntry = {
  /** URL segment, identical in PL and EN — the locale toggle keeps the path. */
  slug: string;
  title: string;
  /** The problem in one sentence: teaser rows, meta description, OG. */
  summary: string;
  kind: CaseStudyKind;
  /** Free text, e.g. "2024–2026". */
  year: string;
  role: string;
  /** Labels; those present in `techIconMap` get their icon. */
  stack: string[];
  cover?: CaseStudyImage;
  links?: { live?: string; liveLabel?: string; git?: string };
  /** `ProjectEntry.id` whose portfolio panel links here. */
  projectId?: number;
  /** `ServiceEntry.slug` whose card links here. */
  serviceSlug?: string;
  /** Kept out of the build: no page, no list row, no links. */
  draft?: boolean;
};
