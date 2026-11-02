import React from 'react';
import TLink from './TLink';
import MotionToggle from './MotionToggle';

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Experience', to: '/#experience' },
  { label: 'About', to: '/#about' },
  { label: 'Résumé', to: '/resume' },
];

/* A plain bar: the name, four links, the motion switch and one action. */
const Navbar = () => (
  <header className="nav">
    <nav aria-label="Primary" className="nav-inner page-x">
      <TLink to="/" className="nav-word">Tanishq Aryan</TLink>
      <div className="nav-links">
        <ul className="m-0 hidden list-none items-center p-0 md:flex" style={{ gap: 'inherit' }}>
          {links.map((l) => (
            <li key={l.label}>
              <TLink to={l.to} className="link link-quiet">{l.label}</TLink>
            </li>
          ))}
        </ul>
        <TLink to="/resume" className="link link-quiet md:hidden">Résumé</TLink>
        <span className="hidden md:inline-flex"><MotionToggle /></span>
        <TLink to="/#contact" className="btn btn-small">Contact</TLink>
      </div>
    </nav>
  </header>
);

export default Navbar;
