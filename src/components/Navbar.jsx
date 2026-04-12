import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setIsScrolled(v > 50));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#"
          className="text-lg font-heading font-bold tracking-tighter uppercase relative group"
          whileHover={{ scale: 1.03 }}
        >
          <span>Tanishq Aryan.</span>
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </motion.a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative group py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors">{link.label}</span>
              {/* Underline slide-in on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
