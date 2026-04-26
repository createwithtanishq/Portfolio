import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const accents = ['#F04E23', '#111111', '#FFD84D'];
const backgrounds = ['#FFF8EF', '#F6B4B0', '#F5EAD7'];

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
        <div className="poster-panel bg-[#FFF8EF] p-10 text-center">
          <h2 className="font-heading font-black text-5xl uppercase tracking-[-0.07em]">Not Found</h2>
          <Link to="/" className="inline-block mt-6 brut-btn bg-[#F04E23] text-[#FFF8EF] px-8 py-4 font-heading font-black uppercase tracking-[0.18em] text-sm">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const accent = accents[index] ?? '#F04E23';
  const background = backgrounds[index] ?? '#FFF8EF';
  const nextProject = orderedProjects[(index + 1) % orderedProjects.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen pt-24 md:pt-28 pb-12"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="poster-panel bg-[#FFF8EF] overflow-hidden">
          <div className="h-6 border-b-[3px] border-[#111111]" style={{ background: accent }} />
          <div className="p-4 sm:p-6 md:p-10" style={{ background }}>
            <Link
              to="/"
              className="inline-flex border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] px-4 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] mb-6 sm:mb-8"
            >
              Back to Home
            </Link>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              <span className="tape-tag">Case Study</span>
              <span className="border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] px-3 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                {project.category}
              </span>
              <span className="border-[3px] border-[#111111] px-3 py-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                Project 0{index + 1}
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-7xl uppercase tracking-[-0.08em] leading-[0.9] max-w-4xl break-words">
              {project.title}
            </h1>

            <p className="mt-5 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-2xl font-light text-[#111111]/75 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid lg:grid-cols-2 gap-6">
          <div className="poster-panel p-4 sm:p-6 md:p-8 bg-[#111111] text-[#FFF8EF]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/55 mb-4">Development Context</p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#FFF8EF]/82">
              This project was developed through iterative research, practical observation, and ongoing academic feedback.
            </p>
            <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#FFF8EF]/82">
              Initial concepts were refined into a structured case study, focusing on system-level analysis rather than surface-level description.
            </p>
          </div>

          <div className="poster-panel p-4 sm:p-6 md:p-8 bg-[#FFF8EF] text-[#111111]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55 mb-4">Development Approach</p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">
              This work is informed by a combination of academic literature, practical observation, and iterative analysis.
            </p>
            <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/72">
              Due to the limited availability of structured literature within esports, the approach emphasises pattern identification across sources, comparative analysis, and the development of system-level interpretations rather than reliance on a single established framework.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 poster-panel p-4 sm:p-6 md:p-10 bg-[#FFF8EF] overflow-hidden">
          {project.fullContent ? (
            <div className="project-content space-y-6" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
          ) : (
            <p className="text-xl text-[#111111]/55 font-light">Detailed overview coming soon.</p>
          )}
        </div>

        <div className="mt-6 sm:mt-8 poster-panel p-4 sm:p-6 md:p-8 bg-[#F5EAD7] text-[#111111]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55 mb-4">
            Positioning Within a Systems Approach to Esports
          </p>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">
            This project represents one layer of a broader systems-based approach to esports.
          </p>
          <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">
            Organisational systems define stability, operational systems define execution, and performance systems define consistency.
          </p>
          <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">
            Together, these layers form the foundation for understanding how esports environments function and how individuals operate within them.
          </p>
        </div>

        {nextProject && (
          <div className="mt-6 sm:mt-8 poster-panel p-4 sm:p-6 md:p-8 bg-[#111111] text-[#FFF8EF]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/55 mb-3">Next Project</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-[-0.07em] break-words">
                  {nextProject.title}
                </h3>
              </div>
              <Link
                to={`/project/${nextProject.id}`}
                className="brut-btn bg-[#FFD84D] text-[#111111] w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 font-heading font-black uppercase tracking-[0.15em] sm:tracking-[0.18em] text-xs sm:text-sm"
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
