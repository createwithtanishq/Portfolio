import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 max-w-6xl mx-auto w-full border-t border-black/10">

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
        <span className="text-sm font-medium tracking-widest uppercase text-black/40">03 // Timeline</span>
      </motion.div>

      {/* Timeline items */}
      <div className="flex flex-col w-full relative">
        {portfolioData.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            className="group flex flex-col md:flex-row gap-8 py-10 border-b border-black/10 last:border-b-0 relative overflow-hidden"
          >
            {/* Hover full-width background reveal */}
            <span className="absolute inset-0 bg-black/[0.02] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />

            {/* Year */}
            <div className="relative w-full md:w-[18%] pt-1 shrink-0">
              <span className="text-xs font-semibold tracking-widest uppercase text-black/40 group-hover:text-black transition-colors duration-300">
                {exp.year}
              </span>
            </div>

            {/* Content */}
            <div className="relative w-full md:w-[82%] pl-0 md:pl-8 md:border-l border-black/10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {exp.role}
                  </h3>
                  <p className="text-base font-medium text-black/50 tracking-wide">{exp.company}</p>
                </div>
                {/* Animated arrow */}
                <motion.span
                  className="text-2xl text-black/20 group-hover:text-black group-hover:translate-x-2 transition-all duration-300 shrink-0"
                >
                  →
                </motion.span>
              </div>
              <p className="font-light text-black/60 leading-relaxed max-w-2xl mt-2">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
