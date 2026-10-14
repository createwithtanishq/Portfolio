import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/* Fixed heads-up-display overlay: corner brackets, a live readout, and a scroll-progress rail. */
const HUDFrame = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden sm:block">
      {/* corner brackets */}
      <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-ink/25" />
      <span className="absolute right-4 top-4 h-6 w-6 border-r border-t border-ink/25" />
      <span className="absolute left-4 bottom-4 h-6 w-6 border-l border-b border-ink/25" />
      <span className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-ink/25" />

      {/* top-right telemetry */}
      <div className="absolute right-7 top-6 text-right">
        <p className="hud">LAT 51.28° N · DECK ONLINE</p>
      </div>

      {/* left vertical label */}
      <p className="hud absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left tracking-[0.5em]">
        TANISHQ&nbsp;ARYAN // PORTFOLIO
      </p>

      {/* scroll-progress rail */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-3">
        <span className="hud">SCROLL</span>
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-ink/10">
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: progress }} />
        </div>
      </div>
    </div>
  );
};

export default HUDFrame;
