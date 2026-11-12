import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EMAIL } from '../data/profile';
import { services, steps, terms } from '../data/services';
import { samplesFor } from '../data/samples';
import { usePrefs } from '../lib/prefs-context';
import TLink from './TLink';

const pad = (n) => String(n).padStart(2, '0');

/* Scroll so the element's top sits under the bar, using layout position (ignores reveal transforms). */
const scrollToEl = (el, smooth) => {
  el.setAttribute('data-in', '');
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  window.scrollTo({ top: Math.max(0, y - offset), behavior: smooth ? 'smooth' : 'auto' });
};

/* The page to send a client: each service with what they get, where Tanishq has done it and five samples, then how a project runs. */
const ServicesPage = () => {
  const { hash } = useLocation();
  const { reduced } = usePrefs();
  const first = useRef(true);
  const reducedRef = useRef(reduced);
  useEffect(() => { reducedRef.current = reduced; }, [reduced]);

  useLayoutEffect(() => {
    document.title = 'Services · Tanishq Aryan';
  }, []);

  useLayoutEffect(() => {
    const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    const smooth = !first.current && !reducedRef.current;
    first.current = false;
    if (el) scrollToEl(el, smooth);
    else if (!hash) window.scrollTo(0, 0);
  }, [hash]);

  return (
    <main className="svc-page page-x">
      <header>
        <TLink to="/" className="link small muted">Home</TLink>
        <h1 className="svc-page-title mt-8">Work with me</h1>
        <p className="lead mt-6 max-w-[46ch]">
          Ten services for brands, creators, events and small businesses in any industry. Open any sample to see the work up close.
        </p>
        <dl className="case-facts">
          {terms.map((t) => (
            <div key={t.label}>
              <dt>{t.label}</dt>
              <dd>{t.value}</dd>
            </div>
          ))}
        </dl>
        <nav aria-label="Services on this page" className="svc-jump">
          {services.map((s) => (
            <Link key={s.id} to={`#${s.id}`} className="chip">{s.title}</Link>
          ))}
        </nav>
      </header>

      {services.map((s) => {
        const list = samplesFor(s.id);
        return (
          <article key={s.id} id={s.id} className="svc-block" aria-labelledby={`${s.id}-title`}>
            <div>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              <p className="lead mt-5">{s.line}</p>
              <p className="small muted mt-5">Good for: {s.for}</p>
              <TLink to={`/?service=${s.id}#contact`} className="link small mt-5 inline-block">Ask about {s.title.toLowerCase()}</TLink>
            </div>
            <div className="svc-cols">
              <div>
                <h3>What you get</h3>
                <ul>
                  {s.includes.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              {s.proof.length > 0 && (
                <div>
                  <h3>Where I’ve done it</h3>
                  <ul>
                    {s.proof.map((p) => (
                      <li key={p.label}>
                        {p.to ? (
                          <TLink to={p.to} className="link">{p.label}</TLink>
                        ) : p.href ? (
                          <a className="link" href={p.href} target="_blank" rel="noopener noreferrer">{p.label}</a>
                        ) : (
                          p.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {list.length > 0 && (
              <div className="svc-samples">
                <h3>Samples</h3>
                <ul className="svc-sample-list">
                  {list.map((sm) => (
                    <li key={sm.id}>
                      <TLink to={`/services/samples/${sm.id}`} className="svc-sample">
                        <span className="svc-thumb">
                          <img src={`/samples/${sm.id}.webp`} width="480" height="600" alt="" loading="lazy" decoding="async" draggable="false" />
                        </span>
                        <span className="svc-sample-title">{sm.title}</span>
                        <span className="svc-sample-tag">{sm.basis === 'real' ? 'From real work' : 'Sample'}</span>
                      </TLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        );
      })}

      <section className="svc-how" aria-labelledby="how-title">
        <h2 id="how-title" className="head" data-reveal>How a project runs</h2>
        <ol className="svc-steps">
          {steps.map((st, i) => (
            <li key={st.title} data-reveal style={{ '--i': i }}>
              <span className="svc-num">{pad(i + 1)}</span>
              <span className="svc-step-title">{st.title}</span>
              <p className="mt-3 muted">{st.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-cta" aria-labelledby="cta-title" data-reveal>
        <h2 id="cta-title" className="head">Have a project in mind?</h2>
        <p className="lead mt-5 max-w-[34ch]">Send the goal, the dates and your budget. I’ll reply with a plan and a price.</p>
        <div className="svc-actions">
          <TLink to="/#contact" className="btn">Start a project</TLink>
          <a className="link" href={`mailto:${EMAIL}?subject=${encodeURIComponent('A project for Tanishq')}`}>{EMAIL}</a>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
