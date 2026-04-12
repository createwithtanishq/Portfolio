import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// Splits a string into words wrapped in overflow-hidden spans — classic GSAP mask reveal
const SplitWords = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const { title, subtitle, cta } = portfolioData.hero;

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-start pt-20 pb-32 px-6 max-w-6xl mx-auto w-full relative overflow-hidden">

      {/* Background large watermark number */}
      <motion.div
        className="absolute right-0 bottom-10 text-[22vw] font-bold text-black/[0.03] select-none pointer-events-none leading-none tracking-tighter"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        TA
      </motion.div>



      {/* Main title — split word reveal */}
      <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.9] mb-10 tracking-tighter max-w-5xl">
        <SplitWords text={title} delay={0.15} />
      </h1>

      {/* Divider line */}
      <motion.div
        className="w-full h-px bg-black/10 mb-8"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      />

      {/* Subtitle + CTA row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
        <motion.p
          className="text-base md:text-lg text-black/60 max-w-sm font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          {subtitle}
        </motion.p>

        <motion.a
          href="#work"
          className="group relative inline-flex items-center gap-6 bg-black text-white px-10 py-5 font-medium tracking-widest uppercase overflow-hidden cursor-pointer shrink-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Hover fill animation */}
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">{cta}</span>
          <motion.span
            className="relative z-10 inline-block transition-colors duration-300 group-hover:text-black"
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-12 bg-black/30 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        <span className="text-xs tracking-[0.3em] uppercase text-black/40 rotate-0">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
