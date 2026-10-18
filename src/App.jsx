import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import { portfolioData } from './data/portfolioData';

function App() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smooth: true });
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>

      <footer className="mt-24 border-t border-hairline px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="font-display text-2xl font-semibold tracking-tight">{portfolioData.footer.title}</p>
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
                  className="chip transition-colors hover:text-ink"
                >
                  {s.platform}
                </a>
              ))}
            </div>
            <p className="hud">&copy; {new Date().getFullYear()} {portfolioData.footer.title}</p>
            <p className="hud text-[12px]">
              3D model: &ldquo;Boom Box&rdquo; by Microsoft, CC0, via{' '}
              <a href="https://github.com/KhronosGroup/glTF-Sample-Assets" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">Khronos glTF Sample Assets</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
