'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useParticleTrail } from '@/hooks/useParticleTrail';

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  position?: [number, number, number];
  label?: string;
  icon?: string;
  tier?: any;
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ children, href, onClick, className = '', position, label, icon, tier, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const magnetic = useMagnetic(buttonRef, { strength: 0.3, radius: 100 });
    const particleTrail = useParticleTrail(buttonRef);

    useEffect(() => {
      if (position && buttonRef.current) {
        // Position is handled by Three.js scene
      }
    }, [position]);

    const handleClick = (e: React.MouseEvent) => {
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
      onClick?.();
      
      // Particle burst
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    };

    const combinedRef = (el: HTMLButtonElement | null) => {
      buttonRef.current = el;
      magnetic.ref.current = el;
      particleTrail.ref.current = el;
      if (ref) {
        if (typeof ref === 'function') ref(el);
        else ref.current = el;
      }
    };

    return (
      <button
        ref={combinedRef}
        className={`relative px-10 py-4 rounded-full font-display text-lg font-semibold text-dark-950 overflow-hidden z-10 ${className}`}
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
          backgroundSize: '200% 100%',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isPressed ? 'scale(0.96)' : isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered 
            ? '0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3)' 
            : '0 0 20px rgba(212, 175, 55, 0.3)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {label || children}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bg-[length:200%_100%] opacity-0 transition-opacity duration-300" />
      </button>
    );
  }
);

GoldButton.displayName = 'GoldButton';