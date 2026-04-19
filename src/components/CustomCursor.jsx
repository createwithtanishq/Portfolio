import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

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

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setHovered(true);
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
      {/* Outer ring — fills yellow on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered ? 68 : 36,
          height: hovered ? 68 : 36,
          backgroundColor: hovered ? '#F0E040' : 'rgba(0,0,0,0)',
          border: hovered ? '2px solid #0D0D0D' : '2px solid #0D0D0D',
          scale: clicked ? 0.85 : 1,
        }}
        transition={{
          width: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.2 },
          scale: { duration: 0.1 },
        }}
      >
        <motion.span
          className="text-[#0D0D0D] text-[9px] font-mono font-bold uppercase tracking-widest select-none whitespace-nowrap"
          animate={{ opacity: hovered && hoverLabel ? 1 : 0, scale: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.15 }}
        >
          {hoverLabel}
        </motion.span>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full bg-[#0D0D0D]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovered ? 0 : 5, height: hovered ? 0 : 5, opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
