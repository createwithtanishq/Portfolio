import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';

const ProjectCard = ({ item, index }) => (
  <TiltCard className="h-full">
    <Link
      to={`/project/${item.id}`}
      className="glass group flex h-full flex-col p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="hud tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <span className="chip !px-2.5 !py-1 !text-[12px]">{item.category}</span>
      </div>

      <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">{item.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{item.description}</p>

      <p className="mt-6 border-t border-hairline pt-5 text-[14px] leading-snug text-ink-2">{item.impact}</p>

      <span className="mt-6 inline-flex items-center text-[15px] font-medium text-accent group-hover:underline underline-offset-4">
        View case study
      </span>
    </Link>
  </TiltCard>
);

const Work = () => {
  const items = useMemo(
    () => [...portfolioData.work].sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id)),
    []
  );
  const categories = useMemo(() => [...new Set(items.map((i) => i.category))], [items]);
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? items : items.filter((i) => i.category === active);

  return (
    <section id="work" className="scroll-mt-14 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="hud mb-3">Selected work</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-6xl">
            Case studies
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            {portfolioData.workIntro.supporting} {portfolioData.workIntro.additional}
          </p>
        </header>

        <div role="group" aria-label="Filter case studies by category" className="mb-10 flex flex-wrap gap-2">
          {['All', ...categories].map((c) => {
            const count = c === 'All' ? items.length : items.filter((i) => i.category === c).length;
            const on = active === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                  on
                    ? 'border-transparent bg-ink text-canvas'
                    : 'border-hairline text-ink-2 hover:text-ink'
                }`}
              >
                {c} <span className="tabular-nums opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <ProjectCard key={item.id} item={item} index={items.indexOf(item)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
