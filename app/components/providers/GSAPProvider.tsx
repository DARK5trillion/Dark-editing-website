'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    CustomEase.create('luxury', '0.87, 0, 0.13, 1');
    CustomEase.create('spring', '0.5, 2.5, 0.3, 0.9');
    CustomEase.create('expo', '0.87, 0, 0.13, 1');

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return <>{children}</>;
}