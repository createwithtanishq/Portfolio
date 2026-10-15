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
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (event, href) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 120);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`mt-3 sm:mt-4 flex w-full max-w-4xl items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-4 transition-all duration-300 ${
          scrolled ? 'glass' : 'glass-weak'
        }`}
      >
        <a
          href="/"
          className="flex items-center gap-2.5 pl-1 pr-2"
          onClick={(e) => go(e, '#top')}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-[13px] font-extrabold text-[#1a0a03]">
            TA
          </span>
          <span className="hidden font-display text-sm font-bold tracking-tight text-ink sm:block">
            Tanishq<span className="text-ink/40"> / Aryan</span>
          </span>
        </a>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-ink/70 transition-colors hover:bg-ink/8 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="btn-signal px-4 py-2 text-[12px] sm:text-[13px]"
          >
            Let's talk
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
