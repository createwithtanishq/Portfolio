import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about" className="border-b-2 border-[#0D0D0D] bg-[#0D0D0D] text-[#F4EFE6]">

      {/* Section header bar */}
      <div className="border-b-2 border-[#F4EFE6]/20 px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-mono font-bold text-4xl text-[#F4EFE6]/10 leading-none select-none">02</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight">About</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#F4EFE6]/40 hidden md:block">Info & Capabilities</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

        {/* Pitch */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-[#F4EFE6]/80">
            {portfolioData.about.pitch}
          </p>
          <div className="mt-12 inline-block bg-[#F0E040] text-[#0D0D0D] border-2 border-[#F0E040] px-6 py-3 font-mono font-bold text-xs uppercase tracking-widest">
            Open to Opportunities
          </div>
        </motion.div>

        {/* Skills */}
        <div className="md:col-span-5">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#F4EFE6]/40 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Core Capabilities
          </motion.p>
          <ul className="flex flex-col border-t-2 border-[#F4EFE6]/20">
            {portfolioData.about.skills.map((skill, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex items-center justify-between py-5 border-b-2 border-[#F4EFE6]/20 hover:bg-[#F0E040] hover:text-[#0D0D0D] hover:px-4 transition-all duration-150"
              >
                <span className="font-heading font-bold text-lg">{skill}</span>
                <span className="font-mono text-xs text-[#F4EFE6]/30 group-hover:text-[#0D0D0D]/50">
                  0{index + 1}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
