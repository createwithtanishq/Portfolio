import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* Additive reticle cursor (keeps the native cursor underneath). Desktop fine-pointer only. */
const SpatialCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target;
      setHot(!!(el && el.closest && el.closest('a, button, [role="group"], input, textarea, [data-magnetic]')));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: rx, y: ry, mixBlendMode: 'screen' }}
        animate={{
          width: hot ? 46 : 30,
          height: hot ? 46 : 30,
          borderColor: hot ? 'rgba(255,106,43,0.9)' : 'rgba(234,240,255,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <div className="h-full w-full rounded-full border" style={{ borderColor: 'inherit' }} />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y, mixBlendMode: 'screen' }}
      />
    </>
  );
};

export default SpatialCursor;
