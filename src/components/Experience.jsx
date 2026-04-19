import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="border-b-[3px] border-[#111111] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <span className="tape-tag">Track List / Experience</span>
            <h2 className="mt-4 font-heading font-black text-4xl md:text-6xl uppercase tracking-[-0.08em]">
              A timeline with
              <br />
              stage lights on it.
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55">
            Education, competition, collaboration
          </p>
        </div>

        <div className="space-y-5">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="poster-panel bg-[#FFF8EF] p-0 overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className="grid md:grid-cols-[160px_1fr]">
                <div className={`border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#111111] p-6 ${index === 1 ? 'bg-[#F04E23] text-[#FFF8EF]' : index === 2 ? 'bg-[#FFD84D]' : 'bg-[#111111] text-[#FFF8EF]'}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60 mb-3">Year</p>
                  <p className="font-heading font-black text-3xl uppercase tracking-[-0.06em]">{exp.year}</p>
                </div>

                <div className="p-6 md:p-8 bg-[#FFF8EF]">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-[-0.06em] leading-none">
                        {exp.role}
                      </h3>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#111111]/55">{exp.company}</p>
                    </div>
                    <span className="border-[3px] border-[#111111] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
                      Entry 0{index + 1}
                    </span>
                  </div>

                  {exp.descriptionHtml ? (
                    <p
                      className="text-base md:text-lg font-light text-[#111111]/72 leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-3"
                      dangerouslySetInnerHTML={{ __html: exp.descriptionHtml }}
                    />
                  ) : (
                    <p className="text-base md:text-lg font-light text-[#111111]/72 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
