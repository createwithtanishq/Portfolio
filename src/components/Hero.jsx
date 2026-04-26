import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { subtitle, supporting, focus, microStrip, cta } = portfolioData.hero;

  return (
    <section className="pt-28 md:pt-34 pb-10 md:pb-16 border-b-[3px] border-[#111111]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 md:gap-8 items-start">
          <motion.div
            className="poster-panel bg-[#FFF8EF] p-4 sm:p-6 md:p-10 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="font-heading font-black uppercase leading-[0.82] tracking-[-0.08em] text-[19vw] sm:text-[18vw] md:text-[11rem] lg:text-[12rem] text-[#111111]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Tanishq
              <br />
              Aryan
            </motion.h1>

            <div className="mt-6 md:mt-8 grid md:grid-cols-[0.9fr_1.1fr] gap-4 md:gap-6">
              <div className="bg-[#111111] text-[#FFF8EF] border-[3px] border-[#111111] p-4 sm:p-5 md:rotate-[-1.2deg]">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/55 mb-3">
                  Focus
                </p>
                <p className="text-sm md:text-base leading-relaxed text-[#FFF8EF]/85">
                  {focus}
                </p>
              </div>

              <div className="border-[3px] border-[#111111] bg-[#F6B4B0] p-4 sm:p-5 md:rotate-[1deg]">
                <p className="text-sm sm:text-base md:text-xl leading-relaxed font-light">{subtitle}</p>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#111111]/75">{supporting}</p>
              </div>
            </div>

            <div className="mt-5 border-[3px] border-[#111111] bg-[#FFD84D] px-4 sm:px-5 py-3">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#111111]">
                {microStrip}
              </p>
            </div>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <motion.a
                href="#contact"
                className="brut-btn bg-[#F04E23] text-[#FFF8EF] text-center px-5 sm:px-8 py-3.5 sm:py-4 font-heading font-black uppercase tracking-[0.15em] sm:tracking-[0.18em] text-xs sm:text-sm"
                whileTap={{ scale: 0.98 }}
              >
                {cta}
              </motion.a>
              <motion.a
                href="#work"
                className="brut-btn bg-[#FFF8EF] text-[#111111] text-center px-5 sm:px-8 py-3.5 sm:py-4 font-heading font-black uppercase tracking-[0.15em] sm:tracking-[0.18em] text-xs sm:text-sm"
                whileTap={{ scale: 0.98 }}
              >
                My Work
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 md:space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            <div className="poster-panel p-4 sm:p-6 bg-[#F04E23] text-[#FFF8EF]">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/65 mb-3">Years Active</p>
              <p className="font-heading font-black text-6xl sm:text-7xl leading-none">07</p>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.18em]">Esports / Systems / Operations / Performance</p>
            </div>

            <div className="poster-panel bg-[#FFF8EF] p-4 sm:p-6 md:rotate-[1deg]">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55 mb-4">Live Cut</p>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-base uppercase font-heading font-black tracking-[-0.04em]">
                <p>Esports Systems and Strategy</p>
                <p>Tournament and Event Operations</p>
                <p>Performance and Mental Frameworks</p>
                <p>Research-Led Systems Analysis</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
