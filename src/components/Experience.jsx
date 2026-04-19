import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="border-b-2 border-[#0D0D0D] bg-[#F4EFE6]">

      {/* Section header */}
      <div className="border-b-2 border-[#0D0D0D] px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-mono font-bold text-4xl text-[#0D0D0D]/10 leading-none select-none">03</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight">Experience</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/40 hidden md:block">Timeline</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {portfolioData.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            className="group"
          >
            <div className="brut-card bg-white mb-6 p-0 overflow-hidden">
              {/* Top accent */}
              <div
                className="h-1.5 w-full"
                style={{ background: index === 0 ? '#F0E040' : index === 1 ? '#0D0D0D' : '#F4EFE6', border: index === 2 ? '1px solid #0D0D0D' : 'none' }}
              />
              <div className="flex flex-col md:flex-row gap-0">
                {/* Year column */}
                <div className="md:w-40 shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-[#0D0D0D] px-6 py-6 flex md:flex-col justify-between md:justify-start items-start gap-2">
                  <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#0D0D0D]/50">Year</span>
                  <span className="font-mono font-bold text-lg text-[#0D0D0D]">{exp.year}</span>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 py-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight group-hover:text-[#0D0D0D] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-sm text-[#0D0D0D]/50 mt-1 uppercase tracking-wider">{exp.company}</p>
                    </div>
                    <span className="text-2xl text-[#0D0D0D]/20 group-hover:text-[#0D0D0D]/60 group-hover:translate-x-1 transition-all duration-200 shrink-0">→</span>
                  </div>
                  {exp.descriptionHtml ? (
                    <p
                      className="text-base font-light text-[#0D0D0D]/65 leading-relaxed [&_a]:font-medium [&_a]:text-[#0D0D0D] [&_a]:underline [&_a]:underline-offset-3 hover:[&_a]:text-[#0D0D0D]"
                      dangerouslySetInnerHTML={{ __html: exp.descriptionHtml }}
                    />
                  ) : (
                    <p className="text-base font-light text-[#0D0D0D]/65 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
