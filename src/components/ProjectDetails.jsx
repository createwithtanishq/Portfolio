import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = portfolioData.work.find((p) => p.id === parseInt(id));
  const index = portfolioData.work.findIndex((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 pt-20 bg-[#F4EFE6]">
        <h2 className="font-heading font-bold text-5xl uppercase">Not Found</h2>
        <Link
          to="/"
          className="brut-btn bg-[#0D0D0D] text-[#F4EFE6] px-8 py-4 font-mono font-bold uppercase tracking-widest text-sm"
        >
          ← Return Home
        </Link>
      </div>
    );
  }

  const accentColors = ['#F0E040', '#0D0D0D', '#F4EFE6'];
  const accent = accentColors[index] ?? '#F0E040';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#F4EFE6]"
    >
      {/* Project hero header */}
      <div className="border-b-2 border-[#0D0D0D] pt-20" style={{ borderTop: `8px solid ${accent}` }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-10 pb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/50 hover:text-[#0D0D0D] mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-150">←</span>
            Back to Home
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="border-2 border-[#0D0D0D] px-4 py-1.5 font-mono font-bold text-xs uppercase tracking-widest bg-white">
              {project.category}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/40">
              Project 0{index + 1}
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-tight tracking-tight uppercase mb-6">
            {project.title}
          </h1>

          <p className="text-xl font-light text-[#0D0D0D]/70 max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Project content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {project.fullContent ? (
          <div
            className="project-content"
            dangerouslySetInnerHTML={{ __html: project.fullContent }}
          />
        ) : (
          <p className="text-xl text-[#0D0D0D]/50 font-light">Detailed overview coming soon.</p>
        )}
      </div>

      {/* Next project */}
      {portfolioData.work[(index + 1) % portfolioData.work.length] && (
        <div className="border-t-2 border-[#0D0D0D] bg-[#0D0D0D] text-[#F4EFE6] px-6 md:px-12 py-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#F4EFE6]/40 mb-2">Next Project</p>
              <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase">
                {portfolioData.work[(index + 1) % portfolioData.work.length].title}
              </h3>
            </div>
            <Link
              to={`/project/${portfolioData.work[(index + 1) % portfolioData.work.length].id}`}
              className="brut-btn bg-[#F0E040] text-[#0D0D0D] border-[#F0E040] px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm whitespace-nowrap"
              style={{ boxShadow: '4px 4px 0 #F0E040' }}
            >
              View Next →
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectDetails;
