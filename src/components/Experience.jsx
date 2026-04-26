import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="border-b-[3px] border-[#111111] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="mb-8">
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-[-0.08em]">
            About Me
          </h2>
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
              <div className="grid md:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr]">
                <div className={`border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#111111] p-4 sm:p-6 ${index === 1 ? 'bg-[#F04E23] text-[#FFF8EF]' : index === 2 ? 'bg-[#FFD84D]' : 'bg-[#111111] text-[#FFF8EF]'}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-60 mb-3">Year</p>
                  <p className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-[-0.06em]">{exp.year}</p>
                </div>

                <div className="p-4 sm:p-6 md:p-8 bg-[#FFF8EF]">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      {exp.roleUrl ? (
                        <h3 className="font-heading font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-[-0.06em] leading-none break-words">
                          <a
                            href={exp.roleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 decoration-[3px] break-words"
                          >
                            {exp.role}
                          </a>
                        </h3>
                      ) : (
                        <h3 className="font-heading font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-[-0.06em] leading-none break-words">
                          {exp.role}
                        </h3>
                      )}
                      <p className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.22em] text-[#111111]/55 break-words">{exp.company}</p>
                    </div>
                    <span className="self-start border-[3px] border-[#111111] px-3 py-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                      Entry 0{index + 1}
                    </span>
                  </div>

                  {exp.descriptionHtml ? (
                    <p
                      className="text-sm sm:text-base md:text-lg font-light text-[#111111]/72 leading-relaxed break-words [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-3"
                      dangerouslySetInnerHTML={{ __html: exp.descriptionHtml }}
                    />
                  ) : (
                    <p className="text-sm sm:text-base md:text-lg font-light text-[#111111]/72 leading-relaxed break-words">
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
