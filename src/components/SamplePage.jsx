import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EMAIL } from '../data/profile';
import { services } from '../data/services';
import { sampleById, samplesFor } from '../data/samples';
import Sheet from './samples/Sheet';
import TLink from './TLink';

/* One sample on its own page: the sheet, an honest line about what it is, and the way to start a project. View only. */
const SamplePage = () => {
  const { id } = useParams();
  const sample = sampleById(id);
  const service = sample ? services.find((s) => s.id === sample.service) : null;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.title = sample ? `${sample.title} · Sample · Tanishq Aryan` : 'Sample · Tanishq Aryan';
  }, [sample]);

  if (!sample || !service) {
    return (
      <main className="case page-x min-h-[70vh]">
        <h1 className="case-title">Sample not found</h1>
        <p className="lead mt-6">The link may be out of date.</p>
        <TLink to="/services" className="btn mt-10">See all services</TLink>
      </main>
    );
  }

  const siblings = samplesFor(sample.service);
  const index = siblings.findIndex((s) => s.id === sample.id);
  const prev = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];

  return (
    <main className="sample-page page-x">
      <TLink to={`/services#${service.id}`} className="link small muted no-print">All {service.title.toLowerCase()} samples</TLink>

      <div className="sample-stage">
        <Sheet sample={sample} level="h1" />
      </div>

      <div className="sample-after no-print">
        <div>
          <p>This is a preview. The full file comes with the project.</p>
          {sample.source && (
            <p className="small muted mt-2">
              Case study: <TLink to={sample.source.to} className="link">{sample.source.label}</TLink>
            </p>
          )}
        </div>
        <TLink to={`/?service=${sample.service}&sample=${sample.id}#contact`} className="btn">Start a project like this</TLink>
      </div>

      <nav aria-label={`More ${service.title.toLowerCase()} samples`} className="case-next no-print">
        {[{ s: prev, label: 'Previous sample' }, { s: next, label: 'Next sample' }].map(({ s, label }) => (
          <TLink key={label} to={`/services/samples/${s.id}`}>
            <span className="small muted block">{label}</span>
            <span className="case-next-title">{s.title}</span>
          </TLink>
        ))}
      </nav>

      <p className="sample-print-note">Samples are for viewing only. To work together, email {EMAIL}.</p>
    </main>
  );
};

export default SamplePage;
