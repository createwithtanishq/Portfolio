import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PrefsProvider } from './lib/prefs';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import Resume from './components/Resume';
import Footer from './components/Footer';

/*
  Reveals each [data-reveal] element once as it enters. A safety sweep after scrolling stops also
  reveals anything already passed (fast jumps, anchor links), so nothing is ever left hidden.
  Without JavaScript nothing is hidden in the first place.
*/
function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const show = (el) => el.setAttribute('data-in', '');
    const els = document.querySelectorAll('[data-reveal]:not([data-in])');
    if (!('IntersectionObserver' in window)) {
      els.forEach(show);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));

    let timer = 0;
    const sweep = () => {
      document.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { show(el); io.unobserve(el); }
      });
    };
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(sweep, 140); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, [pathname]);
}

function Shell() {
  useReveal();
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);
  return (
    <div id="top" className="relative min-h-svh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--bg)]">
        Skip to content
      </a>
      <Navbar />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<ProjectDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const App = () => (
  <PrefsProvider>
    <Shell />
  </PrefsProvider>
);

export default App;
