import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Decode from './Decode';

const Experience = () => {
  const items = portfolioData.experience;

  return (
    <section id="experience" className="scene relative px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 sm:mb-16">
          <Decode as="p" text="04 — Flight Log" className="hud hud-accent mb-3" />
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
            Track record
          </h2>
        </div>

        <div className="relative">
          {/* spine */}
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-ink/15 to-transparent md:left-1/2" />

          <div className="space-y-5">
            {items.map((exp, i) => {
              const side = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  className="relative pl-8 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                  initial={{ opacity: 0, x: side ? -40 : 40, rotateY: side ? 8 : -8 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* node */}
                  <span className="absolute left-0 top-6 h-3.5 w-3.5 -translate-x-[0px] rounded-full border-2 border-accent bg-space0 md:left-1/2 md:-translate-x-1/2" />

                  <div className={`${side ? 'md:col-start-1 md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'}`}>
                    <div className="glass grain p-5 sm:p-6">
                      <div className={`flex items-center gap-3 ${side ? 'md:justify-end' : ''}`}>
                        <span className="chip">{exp.year}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
                        {exp.roleUrl ? (
                          <a href={exp.roleUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                            {exp.role}
                          </a>
                        ) : (
                          exp.role
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-ink/45">{exp.company}</p>
                      {exp.descriptionHtml ? (
                        <p
                          className="mt-3 text-sm leading-relaxed text-ink/65 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2"
                          dangerouslySetInnerHTML={{ __html: exp.descriptionHtml }}
                        />
                      ) : (
                        <p className="mt-3 text-sm leading-relaxed text-ink/65">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
