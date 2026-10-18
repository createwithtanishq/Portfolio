import React from 'react';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import Work from './Work';
import Experience from './Experience';
import Reveal from './Reveal';

const Home = () => (
  <main>
    <Hero />
    <Reveal><Work /></Reveal>
    <Reveal><About /></Reveal>
    <Reveal><Experience /></Reveal>
    <Reveal><Contact /></Reveal>
  </main>
);

export default Home;
