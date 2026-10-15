import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HUDFrame from './components/HUDFrame';
import Starfield from './components/Starfield';
import SpatialCursor from './components/SpatialCursor';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import { portfolioData } from './data/portfolioData';

function App() {
  const reduce = useReducedMotion();

  useEffect(() => {
    // ambient light: track cursor into CSS vars for glass sheen
    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = document.documentElement.style;
        root.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`);
        root.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <div id="top" className="relative min-h-screen font-sans text-ink">
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <Starfield />
      <SpatialCursor />
      <HUDFrame />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>

      <footer className="relative mt-10 border-t border-ink/10 px-5 py-14 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="hud hud-accent">{portfolioData.footer.note}</p>
            <p className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {portfolioData.footer.title}
            </p>
            <p className="hud">{portfolioData.footer.subtitle}</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-wrap gap-2">
              {portfolioData.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip transition-colors hover:border-accent/60 hover:text-ink"
                >
                  {s.platform}
                </a>
              ))}
            </div>
            <p className="hud">&copy; {new Date().getFullYear()} · All systems nominal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
