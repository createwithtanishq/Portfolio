import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');

  // Precise dot — tracks mouse exactly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring — lags behind with spring physics
  const ringRawX = useMotionValue(-100);
  const ringRawY = useMotionValue(-100);
  const ringX = useSpring(ringRawX, { damping: 22, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(ringRawY, { damping: 22, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    const onMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringRawX.set(e.clientX);
      ringRawY.set(e.clientY);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    // Attach hover listeners to all interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setHovered(true);
          // Try to get a short label from the element
          const label = el.dataset.cursorLabel
            || (el.tagName === 'A' ? 'View' : '')
            || (el.type === 'submit' ? 'Send' : '')
            || '';
          setHoverLabel(label);
        });
        el.addEventListener('mouseleave', () => {
          setHovered(false);
          setHoverLabel('');
        });
      });
    };

    // Run immediately + re-run when DOM changes (e.g., React re-renders)
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, [dotX, dotY, ringRawX, ringRawY]);

  return (
    <>
      {/* === OUTER RING === */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 72 : 40,
          height: hovered ? 72 : 40,
          backgroundColor: hovered ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
          border: hovered ? '2px solid rgba(0,0,0,0)' : '1.5px solid rgba(0,0,0,0.5)',
          scale: clicked ? 0.88 : 1,
        }}
        transition={{
          width: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.3 },
          border: { duration: 0.3 },
          scale: { duration: 0.1 },
        }}
      >
        {/* Label inside ring on hover */}
        <motion.span
          className="text-white text-[9px] font-semibold uppercase tracking-widest select-none whitespace-nowrap"
          animate={{ opacity: hovered && hoverLabel ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {hoverLabel}
        </motion.span>
      </motion.div>

      {/* === PRECISE DOT === */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-black"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 0 : 6,
          height: hovered ? 0 : 6,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
};

export default CustomCursor;
