import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { title, subtitle, cta } = portfolioData.hero;

  return (
    <section className="min-h-screen flex flex-col justify-between pt-16 border-b-2 border-[#0D0D0D] overflow-hidden">

      {/* Giant name */}
      <div className="px-4 md:px-8 pt-10 md:pt-14">
        <motion.h1
          className="font-heading font-bold uppercase leading-[0.82] tracking-[-0.04em] text-[17vw] text-[#0D0D0D] select-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Tanishq<br />Aryan.
        </motion.h1>
      </div>

      {/* Yellow stripe */}
      <motion.div
        className="bg-[#F0E040] border-y-2 border-[#0D0D0D] flex items-center gap-8 px-6 md:px-12 py-3 overflow-hidden"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        {['Gaming Events & Operations', 'Esports', 'Content Creation', 'Strategy'].map((tag, i) => (
          <span key={i} className="font-mono font-bold text-xs md:text-sm uppercase tracking-widest whitespace-nowrap text-[#0D0D0D]">
            {tag} {i < 3 && <span className="mx-2 opacity-40">·</span>}
          </span>
        ))}
      </motion.div>

      {/* Bottom row */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 px-6 md:px-12 py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        {/* Subtitle */}
        <p className="max-w-sm text-base md:text-lg font-light leading-relaxed text-[#0D0D0D]/70">
          {subtitle}
        </p>

        {/* Stats / tagline */}
        <div className="hidden md:flex flex-col gap-2 items-center">
          <span className="font-mono text-6xl font-bold text-[#0D0D0D]/10 leading-none select-none">07</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0D]/40">Years Active</span>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="#work"
            className="brut-btn bg-[#0D0D0D] text-[#F4EFE6] px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm"
            whileTap={{ scale: 0.97 }}
          >
            {cta} →
          </motion.a>
          <motion.a
            href="#contact"
            className="brut-btn bg-transparent text-[#0D0D0D] px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm"
            whileTap={{ scale: 0.97 }}
          >
            Contact ↘
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="w-px h-10 bg-[#0D0D0D]/40 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#0D0D0D]/40 [writing-mode:vertical-rl]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
