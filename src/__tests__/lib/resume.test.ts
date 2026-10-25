import { RESUME_PROJECT_IDS } from '@/lib/resume';

import { projects as en } from '@/locale/data/en/projects';
import { projects as pl } from '@/locale/data/pl/projects';

/** `resumeProjects` drops unknown ids, so a stale id would vanish from the CV silently. */
describe('resume project order', () => {
  it.each([
    ['pl', pl],
    ['en', en],
  ])('every id exists in %s, once', (_, projects) => {
    const ids = projects.map((p) => p.id);
    expect(new Set(RESUME_PROJECT_IDS).size).toBe(RESUME_PROJECT_IDS.length);
    RESUME_PROJECT_IDS.forEach((id) => expect(ids).toContain(id));
  });
});
