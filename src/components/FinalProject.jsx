import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const FinalProject = () => {
  const { portfolioObjective, finalProject } = portfolioData;

  return (
    <section className="border-b-[3px] border-[#111111] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 md:gap-8 items-start">
          <motion.div
            className="poster-panel bg-[#111111] text-[#FFF8EF] p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="border-[3px] border-[#FFF8EF] inline-block px-3 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.24em] mb-5 sm:mb-6">
              {portfolioObjective.title}
            </span>
            <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#FFF8EF]/88">
              {portfolioObjective.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="poster-panel bg-[#FFF8EF] p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              <span className="tape-tag">{finalProject.eyebrow}</span>
              <span className="border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] px-3 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                {finalProject.label}
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-[-0.08em] leading-[0.92] mb-4">
              {finalProject.title}
            </h2>

            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#111111]/55 mb-5">
              {finalProject.status}
            </p>

            <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">
              {finalProject.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{finalProject.relationshipIntro}</p>
            </div>

            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {finalProject.relationships.map((item, index) => (
                <li key={item} className="border-[3px] border-[#111111] bg-[#F5EAD7] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/45 mb-2">
                    0{index + 1}
                  </p>
                  <p className="font-heading font-black text-lg sm:text-xl uppercase tracking-[-0.05em]">{item}</p>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">{finalProject.stage}</p>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="border-[3px] border-[#111111] bg-[#FFD84D] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/55 mb-3">Research Question</p>
                <p className="text-sm sm:text-base leading-relaxed text-[#111111]/80">{finalProject.researchQuestion}</p>
              </div>

              <div className="border-[3px] border-[#111111] bg-[#F6B4B0] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/55 mb-3">Methodology Preview</p>
                <ul className="space-y-2 text-sm sm:text-base leading-relaxed text-[#111111]/80">
                  {finalProject.methodology.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid xl:grid-cols-2 gap-4">
              <div className="border-[3px] border-[#111111] bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/55 mb-3">Why This Project</p>
                <ul className="space-y-2 text-sm sm:text-base leading-relaxed text-[#111111]/80">
                  {finalProject.whyThisProject.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-[3px] border-[#111111] bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/55 mb-3">Current Focus</p>
                <ul className="space-y-2 text-sm sm:text-base leading-relaxed text-[#111111]/80">
                  {finalProject.currentFocus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFF8EF]/55 mb-3">{finalProject.caseStudiesTitle}</p>
              <p className="text-sm sm:text-base leading-relaxed text-[#FFF8EF]/82 mb-4">{finalProject.caseStudiesIntro}</p>
              <ul className="space-y-2 text-sm sm:text-base leading-relaxed text-[#FFF8EF]">
                {finalProject.caseStudies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalProject;
