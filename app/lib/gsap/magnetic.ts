// GSAP Magnetic Utility
import { gsap } from 'gsap';

interface MagneticOptions {
  strength?: number;
  radius?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function createMagnetic(element: HTMLElement, options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 100, onEnter, onLeave } = options;
  let isInside = false;
  let frameId: number;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < radius) {
      if (!isInside) {
        isInside = true;
        onEnter?.();
      }
      const force = (1 - distance / radius) * strength;
      const moveX = deltaX * force;
      const moveY = deltaY * force;

      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        gsap.to(element, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    } else if (isInside) {
      isInside = false;
      onLeave?.();
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
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
    if (frameId) cancelAnimationFrame(frameId);
  };
}

export function magneticHover(element: HTMLElement, scale = 1.05) {
  let frameId: number;

  const handleMouseEnter = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  };

  const handleMouseLeave = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      gsap.to(element, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    if (frameId) cancelAnimationFrame(frameId);
  };
}