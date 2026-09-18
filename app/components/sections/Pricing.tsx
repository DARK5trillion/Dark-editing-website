'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoldButton } from '@/components/ui/GoldButton';
import { GlassCard } from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { 
    id: 1, 
    name: 'Basic', 
    price: '₹450', 
    period: '/project', 
    features: ['1 Video Edit', 'Up to 60s', '2 Revisions', '48hr Delivery'], 
    highlight: false,
    cta: 'Get Started'
  },
  { 
    id: 2, 
    name: 'Medium', 
    price: '₹750', 
    period: '/project', 
    features: ['2 Video Edits', 'Up to 120s', '3 Revisions', '24hr Delivery', 'Thumbnail Included'], 
    highlight: false,
    cta: 'Get Started'
  },
  { 
    id: 3, 
    name: 'Premium', 
    price: '₹999', 
    period: '/project', 
    features: ['3 Video Edits', 'Up to 180s', '5 Revisions', '12hr Delivery', 'Thumbnail + Poster', 'Color Grading'], 
    highlight: true,
    cta: 'Most Popular'
  },
  { 
    id: 4, 
    name: 'Epic Monthly', 
    price: '₹899', 
    period: '/month', 
    features: ['8 Videos/Month', 'Up to 60s each', 'Unlimited Revisions', 'Priority Delivery', 'All Graphics Included', 'Dedicated Support'], 
    highlight: false,
    cta: 'Subscribe'
  },
  { 
    id: 5, 
    name: 'Pro Website', 
    price: '₹8,999', 
    period: 'one-time', 
    features: ['5-Page Website', 'Responsive Design', 'CMS Included', 'SEO Optimized', '3 Months Support', 'Custom Domain Setup'], 
    highlight: false,
    cta: 'Build Now'
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLSectionElement>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

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

      gsap.utils.toArray('.pricing-card').forEach((card: any, i) => {
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
      id="pricing"
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="pricing-heading" className="font-serif text-4xl md:text-6xl font-bold text-platinum-100 mb-4">
            Simple <span className="text-gold-400">Pricing</span>
          </h2>
          <p className="font-sans text-lg text-platinum-300 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Choose the plan that fits your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tiers.map((tier) => (
            <GlassCard
              key={tier.id}
              className={`pricing-card relative ${tier.highlight ? 'ring-2 ring-gold-400/50 scale-105 z-10' : ''}`}
            >
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-platinum-100 mb-2">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className="font-display text-5xl font-bold text-gold-400">
                    {tier.price}
                  </span>
                  <span className="font-sans text-platinum-300 ml-1">
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-platinum-200">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-400 flex-shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
                <GoldButton
                  label={tier.cta}
                  className="w-full"
                  onClick={() => setSelectedTier(tier.id)}
                />
              </div>
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-display font-bold text-dark-950 bg-gold-400">
                  MOST POPULAR
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}