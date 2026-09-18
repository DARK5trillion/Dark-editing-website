'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleText } from '@/components/ui/ParticleText';
import { GoldButton } from '@/components/ui/GoldButton';
import { HeroScene } from '@/components/three/HeroScene';
import { BackgroundParticles } from '@/components/three/BackgroundParticles';
import { useScrollProgress } from '@/hooks/useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const scrollProgress = useScrollProgress();
  const heroRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'luxury',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <BackgroundParticles />
      <HeroScene progress={scrollProgress} />
      
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8 animate-in" style={{ animationDelay: '0.2s' }}>
            <ParticleText delay={0.3} className="text-5xl md:text-7xl lg:text-8xl leading-tight">
              DARK
            </ParticleText>
          </div>
          <div className="mb-10 animate-in" style={{ animationDelay: '0.6s' }}>
            <ParticleText delay={0.7} className="text-xl md:text-2xl lg:text-3xl font-display font-medium tracking-wider text-gold-400">
              EDITING AND WEBSITE
            </ParticleText>
          </div>
          <p className="font-serif text-xl md:text-2xl text-platinum-200 mb-12 max-w-2xl mx-auto animate-in leading-relaxed" style={{ animationDelay: '1s' }}>
            Your Vision, Our Editing Masterpiece
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in" style={{ animationDelay: '1.2s' }}>
            <GoldButton 
              label="Start Your Project" 
              icon="🚀"
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919209358212'}`}
              className="w-full sm:w-auto"
            />
            <GoldButton 
              label="View Portfolio" 
              icon="🎨"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-transparent border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-950"
            />
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-400/50">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}