import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = '▲▼◆■□01x/\\<>·+=';

/* Scrambles then resolves its text the first time it scrolls into view. */
const Decode = ({ text, className = '', as: Tag = 'span' }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [out, setOut] = useState(reduce ? text : '');
  const done = useRef(reduce);

  useEffect(() => {
    if (reduce || done.current) {
      setOut(text);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf;
    const run = () => {
      const start = performance.now();
      const dur = 650;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const reveal = Math.floor(p * text.length);
        let s = '';
        for (let i = 0; i < text.length; i++) {
          if (i < reveal || text[i] === ' ') s += text[i];
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, reduce]);

  return (
    <Tag ref={ref} className={className}>
      {out || ' '}
    </Tag>
  );
};

export default Decode;
