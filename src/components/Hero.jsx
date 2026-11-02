import React, { useCallback, useEffect, useRef, useState } from 'react';
import { heroReel, profile } from '../data/profile';
import { usePrefs } from '../lib/prefs-context';
import SpatialFrame from './SpatialFrame';
import TLink from './TLink';

/*
  The name holds while the world changes beneath it. With motion on, the stage is held for
  a little over a screen of scrolling and the camera travels through four stations;
  the chapter buttons jump straight to one. With motion off, the buttons switch stations in place.
*/
const Hero = () => {
  const { reduced } = usePrefs();
  const wrap = useRef(null);
  const [step, setStep] = useState(0);
  const pinned = !reduced;
  const n = heroReel.length;

  useEffect(() => {
    if (!pinned) return undefined;
    const el = wrap.current;
    let raf = 0;
    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
      setStep(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned, n]);

  const go = useCallback((target) => {
    if (!pinned) { setStep(target); return; }
    const el = wrap.current;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((target + 0.5) / n) * total, behavior: 'smooth' });
  }, [pinned, n]);

  const cur = heroReel[step];

  return (
    <section ref={wrap} className="hero" aria-labelledby="hero-title" style={pinned ? { height: '240svh' } : undefined}>
      <div className="hero-stage" style={pinned ? { position: 'sticky', top: 0 } : undefined}>
        <div className="hero-world" data-open>
          <SpatialFrame station={cur.station} compose="hero" className="absolute inset-0" />
        </div>

        <div className="hero-copy">
          <div>
            <h1 id="hero-title" className="hero-name display">
              <span className="line"><span data-line>{profile.name}</span></span>
            </h1>
            <p className="hero-lead lead" data-load style={{ '--d': '340ms' }}>{profile.lead}</p>
            <p className="hero-avail small muted" data-load style={{ '--d': '400ms' }}>{profile.availability}</p>
            <div className="hero-actions" data-load style={{ '--d': '460ms' }}>
              <a className="btn" href={profile.mailto}>Email me <span className="arrow" aria-hidden="true">→</span></a>
              <TLink to="/resume" className="link">Read the résumé</TLink>
            </div>
          </div>

          <div className="hero-reel" data-load style={{ '--d': '540ms' }}>
            <p className="hero-caption small" aria-live="polite">
              <span key={step} className="swap-in inline-block"><strong>{cur.title}</strong> {cur.caption}</span>
            </p>
            <ul className="hero-steps" aria-label="Chapters">
              {heroReel.map((r, i) => (
                <li key={r.station}>
                  <button type="button" className="hero-step" aria-current={i === step} onClick={() => go(i)}>{r.title}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
