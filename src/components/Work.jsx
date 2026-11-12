import React, { useEffect, useRef, useState } from 'react';
import { lenses } from '../data/profile';
import { WORK } from '../data/work';
import { fits, usePrefs } from '../lib/prefs-context';
import SpatialFrame from './SpatialFrame';
import TLink from './TLink';

/*
  Names passing a held square: the case-study names scroll up through the centre of the screen
  while a square window into the 3D world holds behind them and shows the one crossing the middle.
  "Hiring for" dims the names that don't fit the role a recruiter is filling.
*/
const Work = () => {
  const { lens, setLens } = usePrefs();
  const items = WORK;
  const [current, setCurrent] = useState(items[0].id);
  const [settled, setSettled] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('[data-id]') ?? [];
    const inBand = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = Number(e.target.dataset.id);
        if (e.isIntersecting) { inBand.add(id); setCurrent(id); } else inBand.delete(id);
      });
      setSettled(inBand.size > 0);
    }, { rootMargin: '-44% 0px -44% 0px' });
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const cur = items.find((i) => i.id === current) ?? items[0];
  const lensLabel = lenses.find((l) => l.id === lens)?.label;
  const count = items.filter((i) => fits(lens, i.meta.lenses)).length;

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <h2 id="work-title" className="work-name work-heading page-x block text-center" data-reveal>Case studies</h2>

      <div className="work-lens" role="group" aria-labelledby="lens-label" data-reveal style={{ '--i': 1 }}>
        <p id="lens-label" className="work-lens-label">Hiring for</p>
        {lenses.map((l) => (
          <button key={l.id} type="button" className="chip" aria-pressed={lens === l.id} onClick={() => setLens(l.id)}>
            {l.label}
          </button>
        ))}
        <p className="small muted w-full text-center" aria-live="polite">
          {lens === 'all' ? `${items.length} case studies, most relevant first.` : `${count} of ${items.length} fit ${lensLabel.toLowerCase()} roles. Share this view: the link now opens with it.`}
        </p>
      </div>

      <div className="work-stage">
        <div className="work-held">
          <SpatialFrame station={cur.meta.station} className="work-held-frame" />
          <p className={`work-facts ${settled ? '' : 'is-hidden'}`} aria-hidden="true"><span key={cur.id} className="swap-in inline-block">{cur.meta.kind} <span className="muted">· {cur.meta.format}</span></span></p>
        </div>

        <ol ref={listRef} className="work-names">
          {items.map((it) => (
            <li key={it.id} data-id={it.id}>
              <TLink
                to={`/project/${it.id}`}
                className={`work-name ${fits(lens, it.meta.lenses) ? '' : 'is-out'}`}
                onClick={(e) => { e.currentTarget.style.viewTransitionName = 'case-title'; }}
              >
                {it.meta.short}
                <span className="sr-only">: {it.meta.kind}, {it.meta.format}</span>
              </TLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Work;
