import React from 'react';
import { profile } from '../data/profile';

/* Side facts, wide paragraph: the short version for a recruiter, then the record. */
const About = () => (
  <section id="about" className="about page-x" aria-labelledby="about-title">
    <h2 id="about-title" className="head mb-14" data-reveal>About</h2>
    <div className="about-row">
      <dl className="about-facts m-0" data-reveal style={{ '--i': 1 }}>
        {profile.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="about-bio" data-reveal style={{ '--i': 2 }}>{profile.bio}</p>
    </div>
    <div className="about-row">
      <p className="small muted" data-reveal>The record</p>
      <div className="about-lists">
        <div data-reveal style={{ '--i': 1 }}>
          <h3>What I bring</h3>
          <ul>
            {profile.capabilities.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div data-reveal style={{ '--i': 2 }}>
          <h3>Recognition</h3>
          <ul>
            {profile.recognition.map((r) => (
              <li key={r.name}><span>{r.name}</span><span className="muted tabular">{r.year}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default About;
