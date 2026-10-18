import React, { Suspense, lazy } from 'react';
import { useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Marquee from './Marquee';

const Scene3D = lazy(() => import('./Scene3D'));

const Hero = () => {
  const reduce = useReducedMotion();
  const { hero, work } = portfolioData;
  const chips = hero.microStrip.split('|').map((s) => s.trim()).filter(Boolean);
  const years = (chips.find((c) => /years/i.test(c)) || '').match(/\d+\+?/)?.[0];
  const stats = [
    { value: String(work.length), label: 'case studies' },
    years && { value: years, label: 'years in esports' },
    { value: String(new Set(work.map((w) => w.category)).size), label: 'categories' },
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-32 pb-16 sm:px-8 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="hud mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-accent3" aria-hidden="true" />
            <span>Available for work</span>
            <span className="text-ink/30" aria-hidden="true">/</span>
            <span>{hero.eyebrow}</span>
          </p>

          <h1
            id="hero-title"
            className="font-display text-[3.25rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[5.5rem] lg:text-[6.25rem]"
          >
            {hero.title}
          </h1>

          <p className="mt-7 max-w-xl text-2xl font-medium leading-snug tracking-tight sm:text-[1.7rem]">
            {hero.subtitle}.
          </p>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-2">{hero.supporting}.</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-signal px-6 py-3 text-[15px]">{hero.cta}</a>
            <a href="#work" className="btn-ghost px-6 py-3 text-[15px]">View selected work</a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-hairline pl-4">
                <dt className="hud order-2">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[340px] w-full sm:h-[480px]" aria-hidden="true">
          <div className="absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_65%)]" />
          <Suspense fallback={null}>
            <Scene3D reduce={!!reduce} />
          </Suspense>
        </div>
      </div>

      <Marquee items={[...chips, hero.focus.replace('Focus: ', '')]} />
    </section>
  );
};

export default Hero;
