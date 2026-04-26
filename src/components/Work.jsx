import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const posterBackgrounds = ['#fff8ef', '#f6b4b0', '#ffd84d'];

const Work = () => {
  const orderedWork = [...portfolioData.work].sort((a, b) => (a.displayOrder ?? a.id) - (b.displayOrder ?? b.id));
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateButtons = () => {
    const element = trackRef.current;
    if (!element) return;
    setCanLeft(element.scrollLeft > 4);
    setCanRight(element.scrollLeft < element.scrollWidth - element.clientWidth - 4);
  };

  useEffect(() => {
    const element = trackRef.current;
    if (!element) return;
    updateButtons();
    element.addEventListener('scroll', updateButtons, { passive: true });
    return () => element.removeEventListener('scroll', updateButtons);
  }, []);

  const scroll = (direction) => {
    const element = trackRef.current;
    if (!element) return;
    const card = element.querySelector('.work-card');
    const amount = (card?.offsetWidth ?? 560) + 24;
    element.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="work" className="border-b-[3px] border-[#111111] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-4">
            <span className="tape-tag">Selected Work (Case Studies)</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-[-0.08em]">
              Systems-led
              <br />
              case studies.
            </h2>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/72">
              {portfolioData.workIntro.supporting}
            </p>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/62">
              {portfolioData.workIntro.additional}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className="brut-btn bg-[#FFF8EF] w-12 h-12 sm:w-14 sm:h-14 font-mono text-base sm:text-lg font-bold disabled:opacity-30"
              aria-label="Previous"
            >
              {'<'}
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className="brut-btn bg-[#F04E23] text-[#FFF8EF] w-12 h-12 sm:w-14 sm:h-14 font-mono text-base sm:text-lg font-bold disabled:opacity-30"
              aria-label="Next"
            >
              {'>'}
            </button>
          </div>
        </div>

        <div ref={trackRef} className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar pb-4">
          {orderedWork.map((item, index) => (
            <div
              key={item.id}
              className="work-card w-[92vw] sm:w-[82vw] md:w-[32rem] lg:w-[38rem] shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Link to={`/project/${item.id}`} className="block h-full">
                <motion.div
                  className="poster-panel h-full p-4 sm:p-6 md:p-8 flex flex-col"
                  style={{ background: posterBackgrounds[index % posterBackgrounds.length] }}
                  whileHover={{ rotate: index % 2 === 0 ? -1 : 1, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <span className="font-heading font-black text-6xl sm:text-7xl md:text-8xl leading-none tracking-[-0.08em] text-[#111111]/15">
                      0{index + 1}
                    </span>
                    <span className="border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] px-2.5 sm:px-3 py-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-[-0.06em] leading-[0.92] mb-4 sm:mb-5">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/72 flex-1 mb-6 sm:mb-8">
                    {item.description}
                  </p>

                  <div className="border-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF] p-4 mb-6 sm:mb-8">
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#FFF8EF]/55 mb-2">
                      Impact
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-[#FFF8EF]/82">
                      {item.impact}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t-[3px] border-[#111111] pt-4 sm:pt-5">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.24em]">Open Case Study</span>
                    <motion.span
                      className="font-heading font-black text-3xl"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                    >
                      {'>'}
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
