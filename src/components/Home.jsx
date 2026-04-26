import React from 'react';
import Hero from './Hero';
import FinalProject from './FinalProject';
import Work from './Work';
import About from './About';
import Experience from './Experience';
import Contact from './Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <FinalProject />
      <About />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
