import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        <footer className="py-12 text-center border-t border-black/10 mt-16">
          <p className="text-sm text-black/40 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} Tanishq Aryan. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
