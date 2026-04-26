import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Capabilities = () => {
  return (
    <section id="capabilities" className="border-b-[3px] border-[#111111] py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="mb-6">
          <span className="tape-tag">Capabilities</span>
          <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl md:text-6xl uppercase tracking-[-0.08em]">
            Capabilities
          </h2>
        </div>

        <div className="poster-panel bg-[#FFF8EF] p-4 sm:p-5 md:p-6">
          <ul className="space-y-3 text-sm sm:text-base md:text-lg leading-relaxed text-[#111111]/80">
            {portfolioData.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
