import React from 'react';
import { career, lenses } from '../data/profile';
import { fits, usePrefs } from '../lib/prefs-context';

/* The line-up: every role at one type size, grouped, with the group name held at the top while you read it. */
const LineUp = () => {
  const { lens } = usePrefs();
  const lensLabel = lenses.find((l) => l.id === lens)?.label;
  return (
    <section id="experience" className="lineup page-x" aria-labelledby="exp-title">
      <h2 id="exp-title" className="head" data-reveal>Experience</h2>
      <p className="lead mt-6 max-w-[40ch]" data-reveal style={{ '--i': 1 }}>
        {lens === 'all'
          ? 'Seven years across tournaments, creators, coaching and operations.'
          : `Roles that fit ${lensLabel.toLowerCase()} are in full colour.`}
      </p>
      {career.map((g) => (
        <div key={g.group} className="lineup-group">
          <h3>{g.group}</h3>
          <ul className="m-0 list-none p-0">
            {g.rows.map((r, i) => (
              <li key={`${r.role}-${r.org}`} className={`lineup-row ${fits(lens, r.lenses) ? '' : 'is-out'}`} data-reveal style={{ '--i': i % 6 }}>
                <span className="lineup-role">{r.role}</span>
                <span className="lineup-org">
                  {r.link ? <a className="link" href={r.link} target="_blank" rel="noopener noreferrer">{r.org}</a> : r.org}
                </span>
                <span className="lineup-detail muted">{r.detail}</span>
                <span className="lineup-when">{r.when}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default LineUp;
