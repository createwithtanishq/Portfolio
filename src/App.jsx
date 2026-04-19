import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';

function App() {
  useEffect(() => {
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
    <div className="min-h-screen text-[#111111] font-sans selection:bg-[#F04E23] selection:text-[#FFF8EF]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>

      <footer className="border-t-[3px] border-[#111111] bg-[#111111] text-[#FFF8EF]">
        <div className="poster-divider" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-3">
            <span className="tape-tag">Loud. Live. Built.</span>
            <p className="font-heading font-black text-3xl md:text-5xl uppercase tracking-[-0.06em]">
              Tanishq Aryan.
            </p>
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#FFF8EF]/60">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </span>

          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] font-bold">
            <a href="#work" className="border-2 border-[#FFF8EF] px-4 py-2 hover:bg-[#F04E23] transition-colors">
              Work
            </a>
            <a href="#about" className="border-2 border-[#FFF8EF] px-4 py-2 hover:bg-[#F04E23] transition-colors">
              About
            </a>
            <a href="#contact" className="border-2 border-[#FFF8EF] px-4 py-2 hover:bg-[#F04E23] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
