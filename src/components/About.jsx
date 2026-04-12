import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto w-full border-t border-black/10 overflow-hidden">

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl md:text-5xl font-bold">About</h2>
        <span className="text-sm font-medium tracking-widest uppercase text-black/40">02 // Info</span>
      </motion.div>

      {/* Body grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

        {/* Pitch text — large editorial style */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
            {portfolioData.about.pitch}
          </p>
        </motion.div>

        {/* Skills list with stagger */}
        <div className="md:col-span-5">
          <motion.h3
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 text-black/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Core Capabilities
          </motion.h3>
          <motion.ul
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {portfolioData.about.skills.map((skill, index) => (
              <motion.li
                key={index}
                variants={lineVariants}
                className="group flex items-center justify-between py-4 border-b border-black/10 last:border-b-0"
              >
                <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {skill}
                </span>
                <span className="text-xs text-black/30 font-mono">0{index + 1}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default About;
