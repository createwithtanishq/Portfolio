import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// Top accent bar colour per project. noir is fixed (stays dark in both themes).
const accents = ['var(--c-acid)', 'var(--c-noir)', 'var(--c-butter)'];
// Header panel background per project: surface + paper flip with theme; pink is a fixed light island.
const backgrounds = ['var(--c-surface)', 'var(--c-pink)', 'var(--c-paper)'];

const ProjectDetails = () => {
  const { id } = useParams();
  const orderedProjects = [...portfolioData.work].sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id));
  const project = orderedProjects.find((item) => item.id === Number.parseInt(id, 10));
  const index = orderedProjects.findIndex((item) => item.id === Number.parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] px-6 pt-28 flex flex-col items-center justify-center gap-6">
        <div className="poster-panel bg-surface text-ink p-10 text-center">
          <h2 className="font-heading font-black text-5xl uppercase tracking-[-0.07em]">Not Found</h2>
          <Link to="/" className="inline-block mt-6 brut-btn bg-acid text-cream px-8 py-4 font-heading font-black uppercase tracking-[0.18em] text-sm">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const accent = accents[index % accents.length] ?? 'var(--c-acid)';
  const background = backgrounds[index % backgrounds.length] ?? 'var(--c-surface)';
  // Header sits on a fixed light pink island when index%3 === 1 → keep heading text dark there.
  const headerLight = index % backgrounds.length === 1;
  const nextProject = orderedProjects[(index + 1) % orderedProjects.length];

  const devContext = project.devContext ?? [
    'This project was developed through iterative research, practical observation, and ongoing academic feedback.',
    'Initial concepts were refined into a structured case study, focusing on system-level analysis rather than surface-level description.',
  ];
  const devApproach = project.devApproach ?? [
    'This work is informed by a combination of academic literature, practical observation, and iterative analysis.',
    'Due to the limited availability of structured literature within esports, the approach emphasises pattern identification across sources, comparative analysis, and the development of system-level interpretations rather than reliance on a single established framework.',
  ];
  const positioning = project.positioning ?? {
    label: 'Positioning Within a Systems Approach to Esports',
    paragraphs: [
      'This project represents one layer of a broader systems-based approach to esports.',
      'Organisational systems define stability, operational systems define execution, and performance systems define consistency.',
      'Together, these layers form the foundation for understanding how esports environments function and how individuals operate within them.',
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen pt-24 md:pt-28 pb-12"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="poster-panel bg-surface overflow-hidden">
          <div className="h-6 border-b-[3px] border-ink" style={{ background: accent }} />
          <div className={`p-4 sm:p-6 md:p-10 ${headerLight ? 'text-noir' : 'text-ink'}`} style={{ background }}>
            <Link
              to="/"
              className="inline-flex border-[3px] border-ink bg-noir text-cream px-4 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] mb-6 sm:mb-8"
            >
              Back to Home
            </Link>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              <span className="tape-tag">Case Study</span>
              <span className="border-[3px] border-ink bg-noir text-cream px-3 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                {project.category}
              </span>
              <span className="border-[3px] border-ink px-3 py-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                Project 0{index + 1}
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-7xl uppercase tracking-[-0.08em] leading-[0.9] max-w-4xl break-words">
              {project.title}
            </h1>

            <p className={`mt-5 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-2xl font-light leading-relaxed ${headerLight ? 'text-noir/75' : 'text-ink/75'}`}>
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid lg:grid-cols-2 gap-6">
          <div className="poster-panel p-4 sm:p-6 md:p-8 bg-noir text-cream">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/55 mb-4">Development Context</p>
            {devContext.map((text, i) => (
              <p key={i} className={`${i ? 'mt-4 ' : ''}text-sm sm:text-base md:text-lg leading-relaxed text-cream/82`}>
                {text}
              </p>
            ))}
          </div>

          <div className="poster-panel p-4 sm:p-6 md:p-8 bg-surface text-ink">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/55 mb-4">Development Approach</p>
            {devApproach.map((text, i) => (
              <p key={i} className={`${i ? 'mt-4 ' : ''}text-sm sm:text-base md:text-lg leading-relaxed text-ink/78`}>
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 poster-panel p-4 sm:p-6 md:p-10 bg-surface overflow-hidden">
          {project.fullContent ? (
            <div className="project-content space-y-6" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
          ) : (
            <p className="text-xl text-ink/55 font-light">Detailed overview coming soon.</p>
          )}
        </div>

        <div className="mt-6 sm:mt-8 poster-panel p-4 sm:p-6 md:p-8 bg-paper text-ink">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/55 mb-4">
            {positioning.label}
          </p>
          {positioning.paragraphs.map((text, i) => (
            <p key={i} className={`${i ? 'mt-4 ' : ''}text-sm sm:text-base md:text-lg leading-relaxed text-ink/78`}>
              {text}
            </p>
          ))}
        </div>

        {nextProject && (
          <div className="mt-6 sm:mt-8 poster-panel p-4 sm:p-6 md:p-8 bg-noir text-cream">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/55 mb-3">Next Project</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-[-0.07em] break-words">
                  {nextProject.title}
                </h3>
              </div>
              <Link
                to={`/project/${nextProject.id}`}
                className="brut-btn bg-butter text-noir w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 font-heading font-black uppercase tracking-[0.15em] sm:tracking-[0.18em] text-xs sm:text-sm"
              >
                View Next
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
