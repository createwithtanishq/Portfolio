import React, { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { usePrefs } from '../lib/prefs-context';

const World = lazy(() => import('../three/World.jsx'));

const hasWebGL = (() => {
  let cached;
  return () => {
    if (cached !== undefined) return cached;
    try {
      const c = document.createElement('canvas');
      cached = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      cached = false;
    }
    return cached;
  };
})();

const mix = (a, b, t) => {
  const pa = a.replace('#', '');
  const pb = b.replace('#', '');
  return `#${[0, 2, 4].map((i) => Math.round(parseInt(pa.slice(i, i + 2), 16) * t + parseInt(pb.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, '0')).join('')}`;
};

/* The world takes its three colours from the page tokens. */
const readColors = () => {
  const s = getComputedStyle(document.documentElement);
  const onyx = s.getPropertyValue('--onyx').trim() || '#0d0c0b';
  const ivory = s.getPropertyValue('--ivory').trim() || '#ece7df';
  const champagne = s.getPropertyValue('--champagne').trim() || '#c8a46a';
  return { bg: onyx, ink: ivory, accent: champagne, floor: mix(ivory, onyx, 0.035), dim: mix(ivory, onyx, 0.24) };
};

/* If WebGL fails or the 3D chunk can't load, the frame keeps its flat ground and the page carries on. */
class Guard extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* the flat frame stays in place */ }
  render() { return this.state.failed ? null : this.props.children; }
}

/*
  A window into the 3D world. The canvas mounts only while the frame is near the viewport,
  so the page holds at most one or two WebGL contexts at a time.
*/
export default function SpatialFrame({ station, className = '', compose = 'center' }) {
  const ref = useRef(null);
  const { reduced } = usePrefs();
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [colors] = useState(readColors);
  const canRender = typeof window !== 'undefined' && hasWebGL() && !navigator.connection?.saveData;
  const [shadows] = useState(() => window.matchMedia('(pointer: fine) and (min-width: 900px)').matches);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canRender) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      setNear(entry.isIntersecting);
      if (!entry.isIntersecting) setReady(false);
    }, { rootMargin: '300px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [canRender]);

  return (
    <div ref={ref} className={className} data-world-ready={ready ? 'true' : 'false'} aria-hidden="true">
      {near && canRender && (
        <Guard>
          <Suspense fallback={null}>
            <World station={station} motion={!reduced} colors={colors} compose={compose} shadows={shadows} onReady={() => setReady(true)} />
          </Suspense>
        </Guard>
      )}
    </div>
  );
}
