import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = portfolioData.work.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="border-b border-black hover:border-transparent transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto w-full"
    >
      <div className="mb-12">
        <Link to="/" className="text-sm font-medium tracking-widest uppercase hover:underline opacity-60">
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
        {project.title}
      </h1>
      
      <div className="flex gap-4 mb-16">
        <span className="text-xs border border-black px-3 py-1 uppercase tracking-wider">
          {project.category}
        </span>
      </div>


      <div className="prose prose-lg max-w-none text-black/80 font-light leading-relaxed">
        <p className="text-2xl mb-8 leading-relaxed">
          {project.description}
        </p>
        
        {project.fullContent ? (
          <div dangerouslySetInnerHTML={{ __html: project.fullContent }} />
        ) : (
          <p>Detailed overview coming soon...</p>
        )}
      </div>
    </motion.main>
  );
};

export default ProjectDetails;
