import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const accents = ['#F04E23', '#111111', '#FFD84D'];
const backgrounds = ['#FFF8EF', '#F6B4B0', '#F5EAD7'];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = portfolioData.work.find((item) => item.id === Number.parseInt(id, 10));
  const index = portfolioData.work.findIndex((item) => item.id === Number.parseInt(id, 10));

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
  const nextProject = portfolioData.work[(index + 1) % portfolioData.work.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen pt-24 md:pt-28 pb-12"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="poster-panel bg-[#FFF8EF] overflow-hidden">
          <div className="h-6 border-b-[3px] border-[#111111]" style={{ background: accent }} />
          <div className="p-6 md:p-10" style={{ background }}>
            <Link
              to="/"
              className="inline-flex border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] mb-8"
            >
              Back to Home
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tape-tag">{project.category}</span>
              <span className="border-[3px] border-[#111111] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
                Project 0{index + 1}
              </span>
            </div>

            <h1 className="font-heading font-black text-4xl md:text-7xl uppercase tracking-[-0.08em] leading-[0.9] max-w-4xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg md:text-2xl font-light text-[#111111]/75 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mt-8 poster-panel p-6 md:p-10 bg-[#FFF8EF]">
          {project.fullContent ? (
            <div className="project-content space-y-6" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
          ) : (
            <p className="text-xl text-[#111111]/55 font-light">Detailed overview coming soon.</p>
          )}
        </div>

        {nextProject && (
          <div className="mt-8 poster-panel p-6 md:p-8 bg-[#111111] text-[#FFF8EF]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/55 mb-3">Next Project</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-[-0.07em]">
                  {nextProject.title}
                </h3>
              </div>
              <Link
                to={`/project/${nextProject.id}`}
                className="brut-btn bg-[#FFD84D] text-[#111111] px-8 py-4 font-heading font-black uppercase tracking-[0.18em] text-sm"
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
