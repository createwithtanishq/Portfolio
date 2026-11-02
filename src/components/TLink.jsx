import React from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { usePrefs } from '../lib/prefs-context';

/*
  A router link that hands the page change to the browser's own view transition,
  so the old page fades and the new one rises in. Browsers without view transitions,
  modified clicks and reduced motion all fall back to a plain navigation.
*/
export default function TLink({ to, onClick, ...rest }) {
  const navigate = useNavigate();
  const { reduced } = usePrefs();

  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (reduced || typeof document.startViewTransition !== 'function') return;
    e.preventDefault();
    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };

  return <Link to={to} onClick={handle} {...rest} />;
}
