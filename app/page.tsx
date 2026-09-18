'use client';

import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Pricing } from '@/components/sections/Pricing';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}