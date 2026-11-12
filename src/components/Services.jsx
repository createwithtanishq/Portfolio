import React from 'react';
import { services } from '../data/services';
import { samplesFor } from '../data/samples';
import TLink from './TLink';

/* The ten services as a two-column index on the home page; each item opens its entry on /services. */
const Services = () => (
  <section id="services" className="svc page-x" aria-labelledby="svc-title">
    <h2 id="svc-title" className="head" data-reveal>Services</h2>
    <p className="lead mt-6 max-w-[42ch]" data-reveal style={{ '--i': 1 }}>
      I also take on projects, for any industry. Ten services, each with samples you can open.
    </p>
    <ul className="svc-list">
      {services.map((s, i) => {
        const count = samplesFor(s.id).length;
        return (
          <li key={s.id} className="svc-row" data-reveal style={{ '--i': i % 4 }}>
            <TLink to={`/services#${s.id}`} className="svc-link">
              <span className="svc-title">{s.title}</span>
              <span className="svc-line">{s.line}</span>
              {count > 0 && <span className="svc-count">{count} samples</span>}
            </TLink>
          </li>
        );
      })}
    </ul>
    <div className="svc-actions" data-reveal>
      <TLink to="/services" className="btn">See services and samples</TLink>
      <TLink to="/#contact" className="link">Start a project</TLink>
    </div>
  </section>
);

export default Services;
