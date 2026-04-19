import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-b-[3px] border-[#111111] bg-[#F5EAD7]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between gap-4">
          <a
            href="/"
            className={`font-heading font-black text-lg md:text-xl uppercase tracking-[-0.06em] border-[3px] border-[#111111] px-4 py-2 transition-all ${
              scrolled ? 'bg-[#111111] text-[#FFF8EF] rotate-[-2deg]' : 'bg-[#FFD84D] text-[#111111] rotate-[1deg]'
            }`}
          >
            TA LIVE
          </a>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="border-[3px] border-[#111111] bg-[#FFF8EF] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-[#F04E23] hover:text-[#FFF8EF] transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 + index * 0.06 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="border-2 border-[#111111] bg-[#FFF8EF] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="poster-divider" />
    </motion.nav>
  );
};

export default Navbar;
