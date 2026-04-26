import React from 'react';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import Work from './Work';
import Experience from './Experience';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
