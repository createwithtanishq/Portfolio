import React, { useEffect, useState } from 'react';

const MODES = ['system', 'light', 'dark'];
const LABEL = { system: 'Auto', light: 'Light', dark: 'Dark' };

const readStored = () => {
  try {
    const v = localStorage.getItem('theme');
    return MODES.includes(v) ? v : 'system';
  } catch {
    return 'system';
  }
};

/* Cycles Auto → Light → Dark. Auto follows the operating system. */
const ThemeToggle = () => {
  const [mode, setMode] = useState(readStored);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = mode === 'dark' || (mode === 'system' && mq.matches);
      root.classList.toggle('dark', dark);
      root.classList.toggle('light', !dark);
    };
    apply();
    try {
      if (mode === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', mode);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    if (mode !== 'system') return undefined;
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);

  const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];

  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={`Theme: ${LABEL[mode]}. Switch to ${LABEL[next]}`}
      className="rounded-full px-3 py-1.5 text-[13px] text-ink/75 transition-colors hover:text-ink"
    >
      {LABEL[mode]}
    </button>
  );
};

export default ThemeToggle;
