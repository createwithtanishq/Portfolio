import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WORK as ordered } from '../data/work';
import SpatialFrame from './SpatialFrame';
import TLink from './TLink';

/* One case study: what it is and Tanishq's part in it first, then the full write-up. */
const ProjectDetails = () => {
  const { id } = useParams();
  const index = ordered.findIndex((item) => item.id === Number.parseInt(id, 10));
  const project = ordered[index];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.title = project ? `${project.title} · Tanishq Aryan` : 'Case study · Tanishq Aryan';
  }, [id, project]);

  if (!project) {
    return (
      <main className="case page-x min-h-[70vh]">
        <h1 className="case-title">Case study not found</h1>
        <p className="lead mt-6">The link may be out of date.</p>
        <TLink to="/#work" className="btn mt-10">Back to case studies</TLink>
      </main>
    );
  }

  const { meta } = project;
  const prev = ordered[(index - 1 + ordered.length) % ordered.length];
  const next = ordered[(index + 1) % ordered.length];

  return (
    <main className="case">
      <article>
        <header className="page-x">
          <TLink to="/#work" className="link small muted">All case studies</TLink>
          <h1 className="case-title mt-8" style={{ viewTransitionName: 'case-title' }}>{project.title}</h1>
          <p className="lead mt-6 max-w-[44ch]">{project.description}</p>
          <dl className="case-facts">
            <div><dt>Kind of work</dt><dd>{meta.kind}</dd></div>
            <div><dt>Format</dt><dd>{meta.format}</dd></div>
            {meta.role && <div><dt>My role</dt><dd>{meta.role}</dd></div>}
            <div className="sm:col-span-2"><dt>Outcome</dt><dd>{project.impact}</dd></div>
          </dl>
        </header>

        <SpatialFrame station={meta.station} className="case-world" />

        <div className="page-x">
          {project.fullContent ? (
            <div className="case-body project-content" dangerouslySetInnerHTML={{ __html: project.fullContent }} />
          ) : (
            <p className="case-body lead">The full write-up is on its way.</p>
          )}

          <nav aria-label="Other case studies" className="case-next">
            {[{ p: prev, label: 'Previous case study' }, { p: next, label: 'Next case study' }].map(({ p, label }) => (
              <TLink key={label} to={`/project/${p.id}`}>
                <span className="small muted block">{label}</span>
                <span className="case-next-title">{p.title}</span>
              </TLink>
            ))}
          </nav>
        </div>
      </article>
    </main>
  );
};

export default ProjectDetails;
