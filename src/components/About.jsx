import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Decode from './Decode';

const rise = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const About = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="scene relative px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <Decode as="p" text="03 — Operator Profile" className="hud hud-accent mb-3" />
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
              Built to <span className="text-accent">hold</span> under pressure
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65 sm:text-base">{about.pitch}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/50">{about.developmentApproach}</p>
          </div>

          <div className="d3 space-y-4">
            {about.whatIDo.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass grain d3 p-5 sm:p-6"
                custom={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4, rotateY: 2 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-lg font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="hud mb-5">Capabilities loadout</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {about.skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                className="glass-weak grain p-5"
                custom={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                <h4 className="font-display text-sm font-bold tracking-tight text-ink">{skill.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
