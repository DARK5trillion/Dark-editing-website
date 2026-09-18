'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  index?: number;
  service?: any;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover = true, index, service, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out',
          'bg-dark-800/50 backdrop-blur-xl border border-gold-600/30',
          'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-gold-400/10 before:to-transparent before:pointer-events-none',
          'after:absolute after:inset-0 after:rounded-2xl after:border after:border-gold-500/20 after:pointer-events-none',
          hover && 'hover:border-gold-400/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:shadow-xl',
          className
        )}
        style={{
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(18, 18, 18, 0.9) 100%)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(212, 175, 55, 0.1),
            inset 0 -1px 0 rgba(212, 175, 55, 0.05)
          `,
        }}
        {...props}
      >
        {service && (
          <div className="relative z-10 flex flex-col items-center text-center h-full">
            <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))' }}>
              {service.icon}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-platinum-100 mb-2">
              {service.title}
            </h3>
            <p className="font-sans text-platinum-300 text-lg leading-relaxed">
              {service.desc}
            </p>
          </div>
        )}
        {children}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';