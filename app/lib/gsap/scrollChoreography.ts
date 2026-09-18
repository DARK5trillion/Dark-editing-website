// GSAP Scroll Choreography - Master Timeline
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createScrollChoreography() {
  const ctx = gsap.context(() => {
    // Hero entrance
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 60, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        ease: 'luxury',
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'luxury',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.hero-subtitle',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.hero-tagline',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'luxury',
        delay: 0.6,
        scrollTrigger: {
          trigger: '.hero-tagline',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.hero-cta',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'spring',
        delay: 0.9,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.hero-cta',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Section reveals
    const sections = ['#services', '#pricing', '#contact'];
    sections.forEach((selector) => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'luxury',
          scrollTrigger: {
            trigger: selector,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    });

    // Card stagger animations
    gsap.utils.toArray('.service-card, .pricing-card').forEach((card: any, i) => {
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

    // Parallax for background elements
    gsap.to('.parallax-slow', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: 'main',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to('.parallax-medium', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: 'main',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Gold shimmer sweep on scroll
    gsap.to('.gold-shimmer', {
      backgroundPosition: '200% 0',
      ease: 'none',
      scrollTrigger: {
        trigger: 'main',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });

  return ctx;
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}