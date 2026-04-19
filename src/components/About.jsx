import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about" className="border-b-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-start">
          <motion.div
            className="poster-panel bg-[#F04E23] text-[#FFF8EF] p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="border-[3px] border-[#FFF8EF] inline-block px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.24em] mb-6">
              About / Frontwoman Energy
            </span>
            <p className="font-heading font-black uppercase text-3xl md:text-5xl tracking-[-0.07em] leading-[0.95] mb-8">
              Systems-minded
              <br />
              creative work
              <br />
              with live-event edge.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#FFF8EF]/88">{portfolioData.about.pitch}</p>
          </motion.div>

          <div className="space-y-5">
            <div className="poster-panel p-6 md:p-8 bg-[#FFF8EF] text-[#111111] rotate-[-1deg]">
              <span className="tape-tag">Open to Opportunities</span>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55">Capabilities</p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
              {portfolioData.about.skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  className="poster-panel p-5 bg-[#F5EAD7] text-[#111111]"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#111111]/45 mb-3">
                    0{index + 1}
                  </p>
                  <p className="font-heading font-black text-xl uppercase tracking-[-0.05em] leading-tight">{skill}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
