'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(ref: React.RefObject<HTMLElement>, options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const frameRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const force = (1 - distance / radius) * strength;
        const moveX = deltaX * force;
        const moveY = deltaY * force;

        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          gsap.to(element, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      } else {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [ref, strength, radius]);

  return { ref };
}