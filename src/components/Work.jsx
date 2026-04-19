import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Work = () => {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    return () => el.removeEventListener('scroll', updateButtons);
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.work-card');
    const amount = (card?.offsetWidth ?? 580) + 24;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const categoryColors = ['#F0E040', '#0D0D0D', '#F4EFE6'];
  const categoryText  = ['#0D0D0D', '#F0E040', '#0D0D0D'];

  return (
    <section id="work" className="border-b-2 border-[#0D0D0D] bg-[#F4EFE6]">

      {/* Section header */}
      <div className="border-b-2 border-[#0D0D0D] px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="font-mono font-bold text-4xl text-[#0D0D0D]/10 leading-none select-none">01</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight">Selected Work</h2>
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => scroll('left')}
            disabled={!canLeft}
            className="brut-btn border-2 border-[#0D0D0D] bg-white w-12 h-12 flex items-center justify-center font-mono font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0D0D0D] hover:text-[#F4EFE6] transition-colors duration-150"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canRight}
            className="brut-btn border-2 border-l-0 border-[#0D0D0D] bg-white w-12 h-12 flex items-center justify-center font-mono font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0D0D0D] hover:text-[#F4EFE6] transition-colors duration-150"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-12 py-10 hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {portfolioData.work.map((item, index) => (
          <div
            key={item.id}
            className="work-card w-[85vw] md:w-130 lg:w-155 shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <Link to={`/project/${item.id}`} className="block h-full group">
              <div
                className="brut-card h-full flex flex-col p-8 relative overflow-hidden"
                style={{ borderTopWidth: '6px', borderTopColor: categoryColors[index] }}
              >
                {/* Number + Category */}
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono font-bold text-[7rem] leading-none text-[#0D0D0D]/6 select-none group-hover:text-[#0D0D0D]/12 transition-colors duration-500">
                    0{index + 1}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 border-2 border-[#0D0D0D] shrink-0 mt-2"
                    style={{ background: categoryColors[index], color: categoryText[index] }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-3xl md:text-4xl leading-tight tracking-tight mb-4 group-hover:translate-x-1.5 transition-transform duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#0D0D0D]/60 font-light leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-widest uppercase border-t-2 border-[#0D0D0D] pt-6 mt-auto">
                  <span>Explore Project</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: index * 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
