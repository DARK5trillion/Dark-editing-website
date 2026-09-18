'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function useParticleTrail(ref: React.RefObject<HTMLElement>) {
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(container);

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      const size = 4 + Math.random() * 6;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #FFD700 0%, #D4AF37 70%, transparent 100%);
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        opacity: 0.8;
      `;
      container.appendChild(particle);
      particlesRef.current.push(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100 - 50,
        scale: 0,
        opacity: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => {
          particle.remove();
          particlesRef.current = particlesRef.current.filter(p => p !== particle);
        },
      });
    };

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime > 30) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        if (distance < Math.max(rect.width, rect.height) / 2 + 50) {
          createParticle(e.clientX, e.clientY);
          lastTime = now;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.remove();
      particlesRef.current.forEach(p => p.remove());
    };
  }, [ref]);

  return { ref };
}