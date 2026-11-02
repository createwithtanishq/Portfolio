import React, { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { usePrefs } from '../lib/prefs-context';
import Hero from './Hero';
import ProofBand from './ProofBand';
import Work from './Work';
import LineUp from './LineUp';
import About from './About';
import Contact from './Contact';

const KEY = 'home-scroll';

const Home = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const { reduced } = usePrefs();

  /* A hash scrolls to its section; coming back from a case study restores where you were. */
  useLayoutEffect(() => {
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    let saved = null;
    try { saved = sessionStorage.getItem(KEY); } catch { /* blocked */ }
    if (navType === 'POP' && saved) window.scrollTo(0, Number(saved));
  }, [location.key, location.hash, navType, reduced]);

  /* Layout effect so the listener is gone before the next page scrolls itself to the top. */
  useLayoutEffect(() => {
    const save = () => {
      try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch { /* blocked */ }
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, []);

  return (
    <main>
      <Hero />
      <ProofBand />
      <Work />
      <LineUp />
      <About />
      <Contact />
    </main>
  );
};

export default Home;
