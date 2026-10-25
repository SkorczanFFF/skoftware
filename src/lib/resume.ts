import type { Dictionary, ProjectEntry } from '@/locale/types';

/**
 * Projects on the CV, in reading order, by `ProjectEntry.id`. Kept apart from
 * the array order in `data/{pl,en}/projects.ts`, which is the home Portfolio's
 * order (VAT-OFF closes it there). Every id must exist in both locales
 * (`__tests__/lib/resume.test.ts`).
 */
export const RESUME_PROJECT_IDS = [0, 1, 4, 2, 3, 5];

export const resumeProjects = (t: Dictionary): ProjectEntry[] =>
  RESUME_PROJECT_IDS.map((id) => t.projects.find((p) => p.id === id)).filter(
    (project): project is ProjectEntry => project !== undefined,
  );
