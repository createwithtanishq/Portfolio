import React, { useLayoutEffect } from 'react';
import { career, EMAIL, LINKEDIN, profile } from '../data/profile';
import { WORK as work } from '../data/work';

/* The résumé, generated from the same data as the site, set to print on two pages. */
const Resume = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Résumé · Tanishq Aryan';
  }, []);

  return (
    <main className="resume page-x">
      <header>
        <h1>{profile.name}</h1>
        <p className="lead mt-4">{profile.role}. {profile.open}</p>
        <p className="mt-3">
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span className="muted"> · </span>
          <a className="link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">linkedin.com/in/tanishq-aryan-463009399</a>
          <span className="muted"> · </span>
          <span>tanishqaryan.netlify.app</span>
        </p>
        <button type="button" className="btn no-print mt-6" onClick={() => window.print()}>Print or save as PDF</button>
      </header>

      <section aria-labelledby="r-summary">
        <h2 id="r-summary">Summary</h2>
        <p>{profile.bio}</p>
      </section>

      {career.map((g) => (
        <section key={g.group} aria-label={g.group}>
          <h2>{g.group}</h2>
          {g.rows.map((r) => (
            <div key={`${r.role}-${r.org}`} className="resume-row">
              <span><strong className="font-semibold">{r.role}</strong>, {r.org}</span>
              <span className="tabular">{r.when}</span>
              <span className="muted">{r.detail}</span>
            </div>
          ))}
        </section>
      ))}

      <section aria-labelledby="r-work">
        <h2 id="r-work">Selected case studies</h2>
        {work.map((w) => (
          <div key={w.id} className="resume-row">
            <span><strong className="font-semibold">{w.title}</strong></span>
            <span className="muted">{w.meta.kind}</span>
            <span className="muted">{w.impact}</span>
          </div>
        ))}
      </section>

      <section aria-labelledby="r-skills">
        <h2 id="r-skills">What I bring</h2>
        <p>{profile.capabilities.join(' · ')}</p>
      </section>
    </main>
  );
};

export default Resume;
