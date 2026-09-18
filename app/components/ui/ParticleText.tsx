'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ParticleTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function ParticleText({ children, className = '', delay = 0 }: ParticleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    const text = children;
    textRef.current.innerHTML = '';
    charsRef.current = [];

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(50px) rotateX(-90deg)';
      span.style.filter = 'blur(10px)';
      textRef.current?.appendChild(span);
      charsRef.current.push(span);
    });

    gsap.to(charsRef.current, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'luxury',
      stagger: 0.03,
      delay,
    });

    // Gold shimmer sweep
    gsap.fromTo(
      charsRef.current,
      { backgroundPosition: '-200%' },
      {
        backgroundPosition: '200%',
        duration: 3,
        ease: 'none',
        repeat: -1,
        stagger: 0.1,
      }
    );
  }, [children, delay]);

  return (
    <span
      ref={textRef}
      className={`particle-text inline-block ${className}`}
      style={{
        background: 'linear-gradient(135deg, #E0E0E0 0%, #D4AF37 50%, #E0E0E0 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    />
  );
}