import fs from 'fs';
import path from 'path';

import { caseStudies as en } from '@/locale/data/en/caseStudies';
import { caseStudyBodies as enBodies } from '@/locale/data/en/caseStudyBodies';
import { projects } from '@/locale/data/en/projects';
import { services } from '@/locale/data/en/services';
import { caseStudies as pl } from '@/locale/data/pl/caseStudies';
import { caseStudyBodies as plBodies } from '@/locale/data/pl/caseStudyBodies';
import type { CaseStudyBody } from '@/locale/types';

const phasesOf = (body: CaseStudyBody) => [
  body.problem,
  body.approach,
  body.solution,
  body.outcome,
];

/**
 * PL and EN are separate literals; everything that is not prose has to be
 * identical between them, or the locale toggle lands on a different page.
 */
describe('case studies PL/EN parity', () => {
  it('lists the same slugs in the same order', () => {
    expect(en.map((c) => c.slug)).toEqual(pl.map((c) => c.slug));
  });

  it('keeps the non-translatable fields identical', () => {
    const meta = (list: typeof pl) =>
      list.map(
        ({
          slug,
          kind,
          stack,
          cover,
          links,
          projectId,
          serviceSlug,
          draft,
        }) => ({
          slug,
          kind,
          stack,
          cover: cover && { src: cover.src, w: cover.width, h: cover.height },
          links,
          projectId,
          serviceSlug,
          draft: draft ?? false,
        }),
      );
    expect(meta(en)).toEqual(meta(pl));
  });

  it('has a body for every entry in both languages, and nothing else', () => {
    const slugs = pl.map((c) => c.slug).sort();
    expect(Object.keys(plBodies).sort()).toEqual(slugs);
    expect(Object.keys(enBodies).sort()).toEqual(slugs);
  });

  it('keeps the fact values identical', () => {
    for (const slug of Object.keys(plBodies)) {
      expect(enBodies[slug].facts?.map((f) => f.value)).toEqual(
        plBodies[slug].facts?.map((f) => f.value),
      );
    }
  });

  it('ships every phase with content in both languages', () => {
    for (const bodies of [plBodies, enBodies]) {
      for (const body of Object.values(bodies)) {
        for (const phase of phasesOf(body)) {
          expect(phase.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe('case study slugs', () => {
  it('are unique and URL-safe', () => {
    const slugs = pl.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

describe('case study references', () => {
  const published = pl.filter((c) => !c.draft);

  it('point at existing projects', () => {
    const ids = new Set(projects.map((p) => p.id));
    for (const c of pl) {
      if (c.projectId !== undefined) expect(ids.has(c.projectId)).toBe(true);
    }
  });

  it('point at existing services', () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const c of pl) {
      if (c.serviceSlug) expect(slugs.has(c.serviceSlug)).toBe(true);
    }
  });

  it('give each project and service at most one published link', () => {
    const projectIds = published
      .map((c) => c.projectId)
      .filter((id): id is number => id !== undefined);
    const serviceSlugs = published
      .map((c) => c.serviceSlug)
      .filter((s): s is string => Boolean(s));
    expect(new Set(projectIds).size).toBe(projectIds.length);
    expect(new Set(serviceSlugs).size).toBe(serviceSlugs.length);
  });

  it('reference images that exist in public/, with their size', () => {
    const images = [
      ...pl.map((c) => c.cover),
      ...Object.values(plBodies).flatMap((body) =>
        phasesOf(body).flatMap((phase) =>
          phase.map((b) => (b.type === 'image' ? b : undefined)),
        ),
      ),
    ];
    for (const image of images) {
      if (!image) continue;
      expect(fs.existsSync(path.join(process.cwd(), 'public', image.src))).toBe(
        true,
      );
      // Reserved space before the file loads — no layout shift.
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
  });
});
