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

  // pointer parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotY = useTransform(sx, [-1, 1], [10, -10]);
  const rotX = useTransform(sy, [-1, 1], [-7, 7]);
  const layerFar = useTransform(sx, [-1, 1], [26, -26]);
  const layerFarY = useTransform(sy, [-1, 1], [18, -18]);
  const layerMid = useTransform(sx, [-1, 1], [-16, 16]);
  const layerMidY = useTransform(sy, [-1, 1], [-12, 12]);

  // scroll exit
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const stageZ = useTransform(scrollYProgress, [0, 1], [0, -260]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const stageStyle = reduce ? {} : { y: stageY, scale: stageScale, opacity: stageOpacity, z: stageZ };
  const cardStyle = reduce ? {} : { rotateX: rotX, rotateY: rotY };

  return (
    <section
      ref={sectionRef}
      className="scene relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="d3 relative w-full max-w-5xl" style={stageStyle}>
        <motion.div className="d3 relative" style={cardStyle}>
          {/* far depth: rings / reticle */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2"
            style={reduce ? {} : { x: layerFar, y: layerFarY, translateZ: -220 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-full border border-ink/8" />
            <div className="absolute inset-10 rounded-full border border-ink/6" />
            <div className="absolute inset-24 rounded-full border border-accent2/15" />
          </motion.div>

          {/* eyebrow */}
          <motion.div
            className="mb-6 flex items-center justify-center gap-3"
            style={reduce ? {} : { x: layerMid, y: layerMidY }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="h-px w-8 bg-accent/60" />
            <Decode text={hero.eyebrow} className="hud hud-accent" />
            <span className="h-px w-8 bg-accent/60" />
          </motion.div>

          {/* title */}
          <motion.h1
            className="text-center font-display font-extrabold uppercase leading-[0.86] tracking-[-0.02em]"
            style={reduce ? {} : { translateZ: 60 }}
          >
            {['Tanishq', 'Aryan'].map((word, i) => (
              <motion.span
                key={word}
                className="block text-[16vw] leading-[0.84] sm:text-[12vw] md:text-[9.5rem]"
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  color: i === 1 ? 'transparent' : 'var(--color-ink)',
                  WebkitTextStroke: i === 1 ? '1.5px rgba(234,240,255,0.55)' : undefined,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* subtitle */}
          <motion.p
            className="mx-auto mt-7 max-w-2xl text-center text-base font-light leading-relaxed text-ink/70 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            {hero.subtitle}.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Magnetic>
              <a href="#work" className="btn-signal px-6 py-3.5 text-sm">
                Enter the work
                <span aria-hidden="true">↳</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#contact" className="btn-ghost px-6 py-3.5 text-sm">
                {hero.cta}
              </a>
            </Magnetic>
          </motion.div>

          {/* floating telemetry chips */}
          <motion.div
            className="pointer-events-none absolute -left-2 top-10 hidden md:block"
            style={reduce ? {} : { x: layerFar, y: layerFarY, translateZ: -40 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <div className="glass-weak grain px-4 py-3">
              <p className="hud hud-accent">07+ YRS</p>
              <p className="mt-1 text-xs text-ink/70">Esports / Systems / Ops</p>
            </div>
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -right-4 bottom-6 hidden md:block"
            style={reduce ? {} : { x: layerMid, y: layerMidY, translateZ: -20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="glass-weak grain px-4 py-3 text-right">
              <p className="hud">{hero.focus.replace('Focus: ', '')}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* telemetry strip */}
      <motion.div
        className="absolute inset-x-0 bottom-24 mx-auto flex max-w-4xl flex-wrap justify-center gap-2 px-5 sm:bottom-16"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        {chips.map((c) => (
          <span key={c} className="chip">{c}</span>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
