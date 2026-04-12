import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Work = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Smooth spring on the scroll progress for buttery pan
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 90, mass: 0.8 });

  // Map to horizontal pan
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-72%']);

  // Scroll velocity for skew effect
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewX = useTransform(scrollVelocity, [-0.5, 0, 0.5], ['-6deg', '0deg', '6deg']);
  const smoothSkew = useSpring(skewX, { damping: 40, stiffness: 200 });

  return (
    <section id="work" ref={targetRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-white border-t border-black/10">

        {/* Section header */}
        <div className="px-6 max-w-6xl mx-auto w-full mb-12 shrink-0">
          <motion.div
            className="flex flex-col md:flex-row justify-between md:items-end gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">Selected Work</h2>
            <span className="text-sm font-medium tracking-widest uppercase text-black/40">01 // Scroll to explore →</span>
          </motion.div>
        </div>

        {/* Horizontal sliding track with velocity-based skew */}
        <motion.div
          style={{ x, skewX: smoothSkew }}
          className="flex gap-16 md:gap-24 px-6 md:px-32 w-max items-start"
        >
          {portfolioData.work.map((item, index) => (
            <div key={item.id} className="w-[85vw] md:w-[550px] lg:w-[720px] shrink-0 group">
              <Link to={`/project/${item.id}`} className="block h-full cursor-pointer">
                <div className="flex flex-col border-t-2 border-black pt-8 relative overflow-hidden">

                  {/* Number + Category */}
                  <div className="flex justify-between items-start mb-8">
                    <motion.span
                      className="text-7xl md:text-9xl font-bold tracking-tighter text-black/8 group-hover:text-black/20 transition-colors duration-700 select-none"
                    >
                      0{index + 1}
                    </motion.span>
                    <span className="text-xs font-semibold tracking-widest uppercase border border-black/30 px-4 py-2 opacity-60 group-hover:opacity-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight pr-8 group-hover:translate-x-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-black/50 font-light leading-relaxed mb-12 max-w-xl group-hover:text-black/70 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-4 text-sm font-semibold tracking-widest uppercase">
                    <span className="group-hover:underline underline-offset-8 decoration-2">Explore</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: index * 0.3 }}
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Bottom border that grows on hover */}
                  <div className="mt-8 h-px w-0 group-hover:w-full bg-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
