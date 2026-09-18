'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '@/components/ui/GlassCard';
import { ServicesScene } from '@/components/three/ServicesScene';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: 'Video Editing', desc: 'Reels, Ads, Promos, Cinematic', icon: '🎬' },
  { id: 2, title: 'Graphics & Motion', desc: 'Thumbnails, Posters, Visuals', icon: '🎨' },
  { id: 3, title: 'Social Media Content', desc: 'Instagram, YouTube, Facebook', icon: '📱' },
  { id: 4, title: 'Website Design', desc: 'Business, Portfolio, E-Commerce', icon: '🌐' },
  { id: 5, title: 'Brand Editing', desc: 'Logo, Identity, Highlights', icon: '✨' },
  { id: 6, title: 'Color Grading', desc: 'Cinematic Look, Premium Feel', icon: '🎞️' },
  { id: 7, title: 'Reels & Shorts', desc: 'Trendy, Engaging, Viral', icon: '📹' },
  { id: 8, title: 'SEO & Digital Support', desc: 'Rank Higher, Grow Faster', icon: '📈' },
];

export function Services() {
  const sectionRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'luxury',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray('.service-card').forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'spring',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <ServicesScene />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="font-serif text-4xl md:text-6xl font-bold text-platinum-100 mb-4">
            Our <span className="text-gold-400">Services</span>
          </h2>
          <p className="font-sans text-lg text-platinum-300 max-w-2xl mx-auto">
            Premium creative solutions tailored to elevate your brand presence across every platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <GlassCard
              key={service.id}
              className="service-card"
              service={service}
              index={service.id - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}