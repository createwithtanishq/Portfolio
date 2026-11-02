import { portfolioData } from './portfolioData';
import { workMeta } from './profile';

/* Case studies in display order, each with its presentation details attached. */
export const WORK = [...portfolioData.work]
  .sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id))
  .map((w) => ({
    ...w,
    meta: workMeta[w.id] ?? { short: w.title, kind: w.category, format: '', station: 'bracket', lenses: [] },
  }));
