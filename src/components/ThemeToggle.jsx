import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getInitial = () => {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};

const ThemeToggle = ({ compact = false }) => {
  const [dark, setDark] = useState(getInitial);

  // Keep in sync with the OS preference *only while the user hasn't chosen*.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (localStorage.getItem('theme')) return;
      setDark(e.matches);
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (e) {
        /* storage may be blocked — the class toggle below still applies */
      }
      return next;
    });
  };

  const box = compact
    ? 'w-9 h-9 border-2 shadow-[3px_3px_0_var(--c-shadow)]'
    : 'w-11 h-11 border-[3px] shadow-[4px_4px_0_var(--c-shadow)]';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      data-cursor-label={dark ? 'Light' : 'Dark'}
      className={`shrink-0 grid place-items-center overflow-hidden border-ink bg-surface text-ink ${box} transition-[transform,box-shadow,background-color] duration-150 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0_0_0_var(--c-shadow)]`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={compact ? 'w-4 h-4' : 'w-5 h-5'}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={compact ? 'w-4 h-4' : 'w-5 h-5'}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
