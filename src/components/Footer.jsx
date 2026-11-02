import React from 'react';
import { socials } from '../data/profile';
import TLink from './TLink';
import MotionToggle from './MotionToggle';

/* The name returns at full width, then the ways to reach Tanishq. */
const Footer = () => (
  <footer className="footer">
    <p className="footer-word" aria-hidden="true">Tanishq Aryan</p>
    <div className="footer-row">
      <ul className="footer-places m-0 list-none p-0">
        {socials.map((s) => (
          <li key={s.platform}>
            <a className="link link-quiet" href={s.url} target={s.url.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
              {s.platform}
            </a>
          </li>
        ))}
      </ul>
      <div className="footer-cols">
        <TLink className="link link-quiet" to="/#work">Work</TLink>
        <TLink className="link link-quiet" to="/resume">Résumé</TLink>
        <TLink className="link link-quiet" to="/#experience">Experience</TLink>
        <TLink className="link link-quiet" to="/#contact">Contact</TLink>
        <TLink className="link link-quiet" to="/#about">About</TLink>
        <span><MotionToggle /></span>
      </div>
    </div>
    <div className="footer-legal">
      <span>© {new Date().getFullYear()} Tanishq Aryan</span>
      <a className="link link-quiet" href="#top">Back to top</a>
    </div>
  </footer>
);

export default Footer;
