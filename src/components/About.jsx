import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { systemsApproach, about } = portfolioData;

  return (
    <section id="about" className="border-b-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 space-y-8 md:space-y-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 md:gap-8 items-start">
          <motion.div
            className="poster-panel bg-[#F04E23] text-[#FFF8EF] p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="border-[3px] border-[#FFF8EF] inline-block px-3 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.24em] mb-5 sm:mb-6">
              Systems Approach to Esports
            </span>
            <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#FFF8EF]/88">
              {systemsApproach.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="poster-panel bg-[#FFF8EF] text-[#111111] p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <span className="tape-tag">Development Approach</span>
            <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/82">{about.pitch}</p>
            <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/72">{about.developmentApproach}</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {systemsApproach.levels.map((level, index) => (
            <motion.div
              key={level.title}
              className={`poster-panel p-5 sm:p-6 ${index === 1 ? 'bg-[#FFD84D] text-[#111111]' : 'bg-[#FFF8EF] text-[#111111]'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/45 mb-3">Layer 0{index + 1}</p>
              <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-[-0.06em] leading-tight mb-3">{level.title}</h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#111111]/75">{level.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="poster-panel bg-[#FFF8EF] text-[#111111] p-4 sm:p-6 md:p-8">
          <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/78">
            {systemsApproach.closing.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8 items-start">
          <div className="space-y-5">
            <div className="poster-panel p-4 sm:p-6 md:p-8 bg-[#FFF8EF] text-[#111111]">
              <span className="tape-tag">What I Do</span>
            </div>

            <div className="space-y-4">
              {about.whatIDo.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="poster-panel bg-[#F5EAD7] text-[#111111] p-4 sm:p-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111]/45 mb-2">0{index + 1}</p>
                  <h3 className="font-heading font-black text-lg sm:text-xl uppercase tracking-[-0.05em] leading-tight mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#111111]/72">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="poster-panel p-4 sm:p-6 md:p-8 bg-[#F04E23] text-[#FFF8EF]">
              <span className="border-[3px] border-[#FFF8EF] inline-block px-3 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.24em] mb-5 sm:mb-6">
                Capabilities
              </span>
              <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {about.skills.map((skill, index) => (
                  <li key={skill.title} className="border-[3px] border-[#FFF8EF] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFF8EF]/60 mb-2">0{index + 1}</p>
                    <h3 className="font-heading font-black text-lg uppercase tracking-[-0.05em] leading-tight mb-2">{skill.title}</h3>
                    <p className="text-sm leading-relaxed text-[#FFF8EF]/82">{skill.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-[1fr] gap-6 md:gap-8">
          <div className="poster-panel bg-[#FFF8EF] text-[#111111] p-4 sm:p-6 md:p-8">
            <span className="tape-tag">How I Think</span>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {about.thinking.map((item) => (
                <div key={item.title} className="border-[3px] border-[#111111] p-4 bg-[#F5EAD7]">
                  <h3 className="font-heading font-black text-lg uppercase tracking-[-0.05em] leading-tight mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#111111]/74">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
