import React, { useEffect, useRef, useState } from 'react';
import { lenses } from '../data/profile';
import { WORK } from '../data/work';
import { fits, usePrefs } from '../lib/prefs-context';
import SpatialFrame from './SpatialFrame';
import TLink from './TLink';

/*
  An index of case studies beside a held square. Each row says what the work was and what it
  achieved; on wide screens a window into the 3D world stays in view and shows the row crossing
  the middle of the screen. "Hiring for" dims the rows that don't fit the role a recruiter is filling.
*/
const Work = () => {
  const { lens, setLens } = usePrefs();
  const items = WORK;
  const [current, setCurrent] = useState(items[0].id);
  const listRef = useRef(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('[data-id]') ?? [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCurrent(Number(e.target.dataset.id)); });
    }, { rootMargin: '-46% 0px -46% 0px' });
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const cur = items.find((i) => i.id === current) ?? items[0];
  const lensLabel = lenses.find((l) => l.id === lens)?.label;
  const count = items.filter((i) => fits(lens, i.meta.lenses)).length;

  return (
    <section id="work" className="work page-x" aria-labelledby="work-title">
      <div className="work-head">
        <h2 id="work-title" className="head" data-reveal>Case studies</h2>
        <p className="lead muted work-intro" data-reveal style={{ '--i': 1 }}>
          Events, tournament systems, a live web product, research and a game, most relevant first.
        </p>
      </div>

      <div className="work-lens" role="group" aria-labelledby="lens-label" data-reveal style={{ '--i': 2 }}>
        <p id="lens-label" className="work-lens-label">Hiring for</p>
        {lenses.map((l) => (
          <button key={l.id} type="button" className="chip" aria-pressed={lens === l.id} onClick={() => setLens(l.id)}>
            {l.label}
          </button>
        ))}
        <p className="small muted work-lens-note" aria-live="polite">
          {lens === 'all' ? '' : `${count} of ${items.length} fit ${lensLabel.toLowerCase()} roles. Share this view: the link now opens with it.`}
        </p>
      </div>

      <div className="work-grid">
        <div className="work-held" aria-hidden="true">
          <SpatialFrame station={cur.meta.station} className="work-held-frame" />
          <p className="work-held-cap small">
            <span key={cur.id} className="swap-in inline-block">{cur.meta.short} <span className="muted">· {cur.meta.format}</span></span>
          </p>
        </div>

        <ol ref={listRef} className="work-list">
          {items.map((it, i) => (
            <li
              key={it.id}
              data-id={it.id}
              className={`work-row ${fits(lens, it.meta.lenses) ? '' : 'is-out'} ${it.id === current ? 'is-current' : ''}`}
            >
              <TLink
                to={`/project/${it.id}`}
                className="work-link"
                onClick={(e) => {
                  const t = e.currentTarget.querySelector('.work-title');
                  if (t) t.style.viewTransitionName = 'case-title';
                }}
              >
                <span className="work-title">{it.meta.short}</span>
                <span className="work-kind">{it.meta.kind}{it.meta.role ? ` · ${it.meta.role}` : ''}</span>
                {it.impact && <span className="work-impact">{it.impact}</span>}
                <span className="work-go" aria-hidden="true">→</span>
              </TLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Work;
