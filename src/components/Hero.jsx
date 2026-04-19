import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { subtitle, cta } = portfolioData.hero;

  return (
    <section className="pt-28 md:pt-34 pb-10 md:pb-16 border-b-[3px] border-[#111111]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 items-start">
          <motion.div
            className="poster-panel bg-[#FFF8EF] p-6 md:p-10 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tape-tag">Poster Brutalism</span>
              <span className="border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.24em]">
                Portfolio 2026
              </span>
            </div>

            <motion.h1
              className="font-heading font-black uppercase leading-[0.82] tracking-[-0.08em] text-[20vw] md:text-[11rem] lg:text-[12rem] text-[#111111]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Tanishq
              <br />
              Aryan
            </motion.h1>

            <div className="mt-8 grid md:grid-cols-[0.9fr_1.1fr] gap-6">
              <div className="bg-[#111111] text-[#FFF8EF] border-[3px] border-[#111111] p-5 rotate-[-1.2deg]">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/55 mb-3">
                  Broadcast Energy
                </p>
                <p className="text-sm md:text-base leading-relaxed text-[#FFF8EF]/85">
                  Games, operations, content, and event thinking packaged like a loud print campaign.
                </p>
              </div>

              <div className="border-[3px] border-[#111111] bg-[#F6B4B0] p-5 rotate-[1deg]">
                <p className="text-base md:text-xl leading-relaxed font-light">{subtitle}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#work"
                className="brut-btn bg-[#F04E23] text-[#FFF8EF] px-8 py-4 font-heading font-black uppercase tracking-[0.18em] text-sm"
                whileTap={{ scale: 0.98 }}
              >
                {cta}
              </motion.a>
              <motion.a
                href="#contact"
                className="brut-btn bg-[#FFF8EF] text-[#111111] px-8 py-4 font-heading font-black uppercase tracking-[0.18em] text-sm"
                whileTap={{ scale: 0.98 }}
              >
                Book Contact
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            <div className="poster-panel p-6 bg-[#F04E23] text-[#FFF8EF]">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFF8EF]/65 mb-3">Years Active</p>
              <p className="font-heading font-black text-7xl leading-none">07</p>
              <p className="mt-4 text-sm uppercase tracking-[0.18em]">Esports / Events / Content / Systems</p>
            </div>

            <div className="poster-panel bg-[#FFF8EF] p-6 rotate-[1deg]">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#111111]/55 mb-4">Live Cut</p>
              <div className="space-y-3 text-sm md:text-base uppercase font-heading font-black tracking-[-0.04em]">
                <p>Gaming Events and Operations</p>
                <p>Esports Strategy and Team Systems</p>
                <p>Content and Brand Collaborations</p>
                <p>Community-Led Execution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
