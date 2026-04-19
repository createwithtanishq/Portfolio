import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
    <>
      <div className="min-h-screen bg-[#F4EFE6] text-[#0D0D0D] font-sans selection:bg-[#F0E040] selection:text-[#0D0D0D]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        <footer className="border-t-2 border-[#0D0D0D] bg-[#0D0D0D] text-[#F4EFE6]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <span className="font-heading font-bold text-xl tracking-tight uppercase">Tanishq Aryan.</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#F4EFE6]/50">
              &copy; {new Date().getFullYear()} — All Rights Reserved
            </span>
            <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
              <a href="#work" className="hover:text-[#F0E040] transition-colors">Work</a>
              <a href="#about" className="hover:text-[#F0E040] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#F0E040] transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
