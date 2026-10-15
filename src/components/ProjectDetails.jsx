import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ProjectDetails = () => {
  const { id } = useParams();
  const ordered = [...portfolioData.work].sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id));
  const project = ordered.find((item) => item.id === Number.parseInt(id, 10));
  const index = ordered.findIndex((item) => item.id === Number.parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
        <div className="glass grain p-10">
          <h2 className="font-display text-4xl font-extrabold uppercase">Signal lost</h2>
          <Link to="/" className="btn-signal mt-6 px-6 py-3 text-sm">Return to deck</Link>
        </div>
      </div>
    );
  }

  const nextProject = ordered[(index + 1) % ordered.length];

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
      transition={{ duration: 0.5 }}
      className="relative min-h-screen px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="glass grain overflow-hidden p-6 sm:p-10"
          initial={{ opacity: 0, y: 30, rotateX: -6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="btn-ghost mb-7 px-4 py-2 text-xs">← Back to deck</Link>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="chip border-accent/40 text-accent">Case Study</span>
            <span className="chip">{project.category}</span>
            <span className="chip">Mission 0{index + 1}</span>
          </div>
          <h1 className="max-w-3xl font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-ink/65 sm:text-lg">
            {project.description}
          </p>
        </motion.div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="glass grain p-6 sm:p-8">
            <p className="hud hud-accent mb-4">Development Context</p>
            {devContext.map((t, i) => (
              <p key={i} className={`${i ? 'mt-4 ' : ''}text-sm leading-relaxed text-ink/70 sm:text-base`}>{t}</p>
            ))}
          </div>
          <div className="glass grain p-6 sm:p-8">
            <p className="hud hud-accent mb-4">Development Approach</p>
            {devApproach.map((t, i) => (
              <p key={i} className={`${i ? 'mt-4 ' : ''}text-sm leading-relaxed text-ink/70 sm:text-base`}>{t}</p>
            ))}
          </div>
        </div>

        <div className="glass grain mt-6 overflow-hidden p-6 sm:p-10">
          {project.fullContent ? (
            <div className="project-content space-y-6" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
          ) : (
            <p className="text-lg font-light text-ink/50">Detailed overview coming soon.</p>
          )}
        </div>

        <div className="glass grain mt-6 p-6 sm:p-8">
          <p className="hud hud-accent mb-4">{positioning.label}</p>
          {positioning.paragraphs.map((t, i) => (
            <p key={i} className={`${i ? 'mt-4 ' : ''}text-sm leading-relaxed text-ink/70 sm:text-base`}>{t}</p>
          ))}
        </div>

        {nextProject && (
          <Link to={`/project/${nextProject.id}`} className="glass grain mt-6 flex flex-col gap-5 p-6 transition-transform hover:-translate-y-1 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <p className="hud mb-3">Next mission</p>
              <h3 className="max-w-2xl font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
                {nextProject.title}
              </h3>
            </div>
            <span className="btn-signal shrink-0 px-6 py-3 text-sm">Launch →</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
