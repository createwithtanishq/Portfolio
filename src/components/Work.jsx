import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Decode from './Decode';

const Card = ({ item, index, onOpen, active }) => (
  <div className={`glass d3 flex h-full w-full flex-col overflow-hidden p-6 sm:p-7 ${active ? 'edge-accent' : ''}`}>
    <div className="flex items-start justify-between">
      <span className="font-display text-5xl font-extrabold text-ink/12 sm:text-6xl">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="chip">{item.category}</span>
    </div>

    <h3 className="mt-5 font-display text-xl font-bold leading-[1.05] tracking-tight sm:text-2xl">
      {item.title}
    </h3>

    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/65">{item.description}</p>

    <div className="mt-5 rounded-xl border border-ink/10 bg-ink/4 p-4">
      <p className="hud hud-accent">Impact</p>
      <p className="mt-1.5 text-sm leading-snug text-ink/75">{item.impact}</p>
    </div>

    <button type="button" onClick={onOpen} className="btn-ghost mt-5 justify-between px-4 py-3 text-sm">
      <span className="font-medium">Open case study</span>
      <span aria-hidden="true">→</span>
    </button>
  </div>
);

const Work = () => {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const items = [...portfolioData.work].sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id));
  const [active, setActive] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  const clamp = (n) => Math.max(0, Math.min(items.length - 1, n));
  const go = (dir) => setActive((a) => clamp(a + dir));

  const onDown = (e) => {
    dragging.current = false;
    startX.current = e.clientX ?? 0;
  };
  const onUp = (e) => {
    const dx = (e.clientX ?? 0) - startX.current;
    if (Math.abs(dx) > 45) {
      dragging.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };
  const openProject = (id) => navigate(`/project/${id}`);

  const transform = (offset) => {
    const abs = Math.abs(offset);
    return {
      x: `${offset * 62}%`,
      rotateY: Math.max(-46, Math.min(46, offset * -25)),
      z: -abs * 230,
      scale: Math.max(0.64, 1 - abs * 0.13),
      opacity: abs > 2.3 ? 0 : 1 - abs * 0.16,
      filter: `blur(${Math.min(abs * 3, 7)}px)`,
    };
  };

  return (
    <section id="work" className="relative px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Decode as="p" text="02 — Selected Work" className="hud hud-accent mb-3" />
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
              The Missions
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
              {portfolioData.workIntro.supporting} {portfolioData.workIntro.additional}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hud">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => go(-1)} disabled={active === 0} aria-label="Previous project" className="btn-ghost h-11 w-11 justify-center p-0 text-lg disabled:opacity-30">‹</button>
            <button type="button" onClick={() => go(1)} disabled={active === items.length - 1} aria-label="Next project" className="btn-ghost h-11 w-11 justify-center p-0 text-lg disabled:opacity-30">›</button>
          </div>
        </div>

        {reduce ? (
          <div className="flex snap-x gap-5 overflow-x-auto pb-4 hide-scrollbar">
            {items.map((item, i) => (
              <div key={item.id} className="w-[86vw] max-w-[400px] shrink-0 snap-start" style={{ height: 480 }}>
                <Card item={item} index={i} onOpen={() => openProject(item.id)} active={false} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div
              className="relative h-[500px] w-full select-none sm:h-[520px]"
              style={{ perspective: 1500 }}
              role="group"
              aria-roledescription="carousel"
              tabIndex={0}
              onKeyDown={onKey}
              onPointerDown={onDown}
              onPointerUp={onUp}
            >
              {/* floor glow */}
              <div className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-[60%] -translate-x-1/2 rounded-[50%] bg-accent/20 blur-3xl" aria-hidden="true" />

              {items.map((item, i) => {
                const offset = i - active;
                return (
                  <motion.div
                    key={item.id}
                    className="absolute inset-x-0 top-0 bottom-0 m-auto h-[460px] w-[86vw] max-w-[400px] sm:h-[480px]"
                    style={{ zIndex: 50 - Math.abs(offset), transformStyle: 'preserve-3d' }}
                    animate={transform(offset)}
                    transition={{ type: 'spring', stiffness: 210, damping: 32, mass: 0.9 }}
                    onClick={() => {
                      if (dragging.current) return;
                      if (i === active) openProject(item.id);
                      else setActive(i);
                    }}
                  >
                    <div className="h-full w-full cursor-pointer" style={{ pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto' }}>
                      <Card item={item} index={i} onOpen={() => openProject(item.id)} active={offset === 0} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to project ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-accent' : 'w-1.5 bg-ink/25 hover:bg-ink/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Work;
