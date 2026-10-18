import React from 'react';

/* Endless strip of focus areas. Decorative: the same words appear in the page copy. */
const Marquee = ({ items }) => {
  const loop = [...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-hairline py-5" aria-hidden="true">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center font-display text-xl font-medium tracking-tight text-ink-2">
            {t}
            <span className="mx-10 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
