import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Fades and rises content once as it enters the viewport. Static for reduced motion. */
const MotionDiv = motion.div;

const Reveal = ({ children, className = '' }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionDiv>
  );
};

export default Reveal;
