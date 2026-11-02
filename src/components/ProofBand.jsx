import React from 'react';
import { profile } from '../data/profile';

/* Names running off both edges: brands, the platform and the competitions behind the work. */
const ProofBand = () => {
  const loop = [...profile.proof, ...profile.proof];
  return (
    <section aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">Brands, platforms and competitions</h2>
      <div className="proof-band" aria-hidden="true">
        <div className="proof-track">
          {loop.map((name, i) => (
            <span key={i} className="proof-name">
              {name}
              <span className="proof-dot" />
            </span>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {profile.proof.map((name) => <li key={name}>{name}</li>)}
      </ul>
      <p className="proof-note" data-reveal>{profile.proofNote}</p>
    </section>
  );
};

export default ProofBand;
