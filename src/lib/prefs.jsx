import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { lenses } from '../data/profile';
import { PrefsContext } from './prefs-context';

const read = (key) => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const write = (key, value) => {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* storage blocked: the choice still applies for this visit */ }
};

const osReduces = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const lensFromUrl = () => {
  const q = new URLSearchParams(window.location.search).get('for');
  return lenses.some((l) => l.id === q) ? q : 'all';
};

/* Motion preference (OS setting or the on-page switch) and the "Hiring for" lens, shared by every section. */
export function PrefsProvider({ children }) {
  const [osReduce, setOsReduce] = useState(osReduces);
  const [motionOff, setMotionOff] = useState(() => read('motion') === 'off');
  const [lens, setLensState] = useState(lensFromUrl);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setOsReduce(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('motion-off', motionOff);
    write('motion', motionOff ? 'off' : null);
  }, [motionOff]);

  const setLens = useCallback((id) => {
    setLensState(id);
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('for');
    else url.searchParams.set('for', id);
    window.history.replaceState(window.history.state, '', url);
  }, []);

  const value = useMemo(
    () => ({ reduced: osReduce || motionOff, osReduce, motionOff, setMotionOff, lens, setLens }),
    [osReduce, motionOff, lens, setLens]
  );
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}
