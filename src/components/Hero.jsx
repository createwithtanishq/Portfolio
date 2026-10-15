import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Decode from './Decode';
import Magnetic from './Magnetic';

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { hero } = portfolioData;
  const chips = hero.microStrip.split('|').map((s) => s.trim()).filter(Boolean);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 16, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 50, damping: 16, mass: 0.7 });

  const rotY = useTransform(sx, [-1, 1], [18, -18]);
  const rotX = useTransform(sy, [-1, 1], [-14, 14]);
  const far = useTransform(sx, [-1, 1], [34, -34]);
  const farY = useTransform(sy, [-1, 1], [24, -24]);
  const near = useTransform(sx, [-1, 1], [-20, 20]);
  const nearY = useTransform(sy, [-1, 1], [-14, 14]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  const stageStyle = reduce ? {} : { y: stageY, scale: stageScale, opacity: stageOpacity };
  const coreStyle = reduce ? {} : { rotateX: rotX, rotateY: rotY };

  return (
    <section
      ref={sectionRef}
      className="scene relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]" style={stageStyle}>
        {/* left — identity */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            className="mb-6 inline-flex items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <span className="h-px w-8 bg-accent/70" />
            <Decode text={hero.eyebrow} className="hud hud-accent" />
          </motion.div>

          <h1 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.03em]">
            <motion.span
              className="block text-[17vw] sm:text-[12vw] lg:text-[8.5rem]"
              initial={{ opacity: 0, y: 60, rotateX: -35 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Tanishq
            </motion.span>
            <motion.span
              className="block text-grad text-[17vw] sm:text-[12vw] lg:text-[8.5rem]"
              initial={{ opacity: 0, y: 60, rotateX: -35 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Aryan
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-ink/70 sm:text-lg lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {hero.subtitle}.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent3/30 bg-accent3/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent3 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent3" />
              </span>
              <span className="hud" style={{ color: 'rgba(234,240,255,0.8)' }}>Available for work</span>
            </span>
          </motion.div>

          <motion.div
            className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8 }}
          >
            <Magnetic>
              <a href="#work" className="btn-signal px-6 py-3.5 text-sm">
                Enter the work <span aria-hidden="true">↳</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn-ghost px-6 py-3.5 text-sm">{hero.cta}</a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            {chips.map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </motion.div>
        </div>

        {/* right — 3D core */}
        <div className="scene relative mx-auto hidden h-[30rem] w-full max-w-sm items-center justify-center lg:flex">
          <motion.div
            className="core d3 relative h-[26rem] w-[26rem]"
            style={coreStyle}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* reticle rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border border-ink/8" />
              <div className="absolute inset-16 rounded-full border border-accent2/15" />
              <div className="absolute inset-32 rounded-full border border-ink/6" />
            </div>

            <div className={`core-spin d3 absolute inset-0 ${reduce ? 'core-spin-off' : ''}`} style={reduce ? { animation: 'none' } : undefined}>
              <div className="plane" style={{ transform: 'rotateX(62deg) translateZ(-80px)', opacity: 0.55 }} />
              <div className="plane" style={{ transform: 'rotateX(62deg) translateZ(10px)', borderColor: 'rgba(255,106,43,0.4)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14), 0 0 50px -6px rgba(255,106,43,.4)' }} />
              <div className="plane" style={{ transform: 'rotateX(62deg) translateZ(100px)', opacity: 0.85 }} />
            </div>
            <div className="core-orb" />
          </motion.div>

          {/* orbiting stats */}
          <motion.div className="absolute right-0 top-6" style={reduce ? {} : { x: far, y: farY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
            <div className="glass-weak px-4 py-3">
              <p className="hud hud-accent">07+ YRS</p>
              <p className="mt-1 text-xs text-ink/70">in competitive esports</p>
            </div>
          </motion.div>
          <motion.div className="absolute bottom-4 left-0" style={reduce ? {} : { x: near, y: nearY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
            <div className="glass-weak px-4 py-3">
              <p className="hud">{hero.focus.replace('Focus: ', '')}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
