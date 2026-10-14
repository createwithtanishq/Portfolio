import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import { portfolioData } from './data/portfolioData';

function App() {
  useEffect(() => {
    // Honor reduced-motion: skip smooth-scroll hijacking entirely.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen text-ink font-sans selection:bg-acid selection:text-cream">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>

      <footer className="border-t-[3px] border-ink bg-noir text-cream">
        <div className="poster-divider" />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
          <div className="space-y-3">
            <span className="tape-tag">{portfolioData.footer.note}</span>
            <p className="font-heading font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-[-0.06em]">
              {portfolioData.footer.title}
            </p>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.22em] text-cream/60">
              {portfolioData.footer.subtitle}
            </p>
          </div>

          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.24em] text-cream/60">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </span>

          <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-bold">
            <a href="#work" className="border-2 border-cream px-3 sm:px-4 py-2 hover:bg-acid hover:border-acid transition-colors">
              Work
            </a>
            <a href="#about" className="border-2 border-cream px-3 sm:px-4 py-2 hover:bg-acid hover:border-acid transition-colors">
              About
            </a>
            <a href="#contact" className="border-2 border-cream px-3 sm:px-4 py-2 hover:bg-acid hover:border-acid transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
