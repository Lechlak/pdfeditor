import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { Features } from '../components/Features';

export function Home() {
  return (
    <main className="flex-grow">
      <HomeHero />
      <Features />
    </main>
  );
}