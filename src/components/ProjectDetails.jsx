import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const Paragraphs = ({ items }) =>
  items.map((t, i) => (
    <p key={i} className={`${i ? 'mt-4 ' : ''}leading-relaxed text-ink-2`}>{t}</p>
  ));

const ProjectDetails = () => {
  const { id } = useParams();
  const ordered = [...portfolioData.work].sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id));
  const numericId = Number.parseInt(id, 10);
  const index = ordered.findIndex((item) => item.id === numericId);
  const project = ordered[index];
  const progressRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = project ? `${project.title} · Tanishq Aryan` : 'Case study · Tanishq Aryan';
  }, [id, project]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Case study not found</h1>
        <p className="mt-4 text-ink-2">The link may be out of date.</p>
        <Link to="/#work" className="btn-signal mt-8 px-6 py-3 text-[15px]">Back to case studies</Link>
      </div>
    );
  }

  const prev = ordered[(index - 1 + ordered.length) % ordered.length];
  const next = ordered[(index + 1) % ordered.length];

  const devContext = project.devContext ?? [
    'This project was developed through iterative research, practical observation, and ongoing academic feedback.',
    'Initial concepts were refined into a structured case study, focusing on system-level analysis rather than surface-level description.',
  ];
  const devApproach = project.devApproach ?? [
    'This work is informed by a combination of academic literature, practical observation, and iterative analysis.',
    'Due to the limited availability of structured literature within esports, the approach emphasises pattern identification across sources, comparative analysis, and the development of system-level interpretations rather than reliance on a single established framework.',
  ];
  const positioning = project.positioning ?? {
    label: 'Positioning within a systems approach to esports',
    paragraphs: [
      'This project represents one layer of a broader systems-based approach to esports.',
      'Organisational systems define stability, operational systems define execution, and performance systems define consistency.',
      'Together, these layers form the foundation for understanding how esports environments function and how individuals operate within them.',
    ],
  };

  return (
    <>
      <div
        ref={progressRef}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      <article className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link to="/#work" className="btn-ghost px-4 py-2 text-[14px]">All case studies</Link>
        </nav>

        <header>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="chip">{project.category}</span>
            <span className="hud tabular-nums">Case study {String(index + 1).padStart(2, '0')} of {ordered.length}</span>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-2 sm:text-2xl">{project.description}</p>
        </header>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <section className="glass p-7 sm:p-8" aria-labelledby="ctx">
            <h2 id="ctx" className="hud mb-4 text-accent">Development context</h2>
            <Paragraphs items={devContext} />
          </section>
          <section className="glass p-7 sm:p-8" aria-labelledby="appr">
            <h2 id="appr" className="hud mb-4 text-accent">Development approach</h2>
            <Paragraphs items={devApproach} />
          </section>
        </div>

        {project.fullContent ? (
          <div className="project-content mt-14 space-y-6" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
        ) : (
          <p className="mt-14 text-lg text-ink-2">Detailed overview coming soon.</p>
        )}

        <section className="glass mt-14 p-7 sm:p-8" aria-labelledby="pos">
          <h2 id="pos" className="hud mb-4 text-accent">{positioning.label}</h2>
          <Paragraphs items={positioning.paragraphs} />
        </section>

        <nav aria-label="Other case studies" className="mt-16 grid gap-4 sm:grid-cols-2">
          {[
            { p: prev, label: 'Previous' },
            { p: next, label: 'Next' },
          ].map(({ p, label }) => (
            <Link
              key={label}
              to={`/project/${p.id}`}
              className="glass group flex flex-col gap-2 p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="hud">{label}</span>
              <span className="font-display text-xl font-semibold leading-snug tracking-tight">{p.title}</span>
            </Link>
          ))}
        </nav>
      </article>
    </>
  );
};

export default ProjectDetails;
