// Performance Monitor & Auto-Quality Scaling
import { useEffect, useRef, useState } from 'react';

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memory?: number;
  quality: 'high' | 'medium' | 'low';
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    quality: 'high',
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const frameIdRef = useRef<number>();

  useEffect(() => {
    function measurePerformance(now: number) {
      frameCountRef.current++;
      const elapsed = now - lastTimeRef.current;
      
      if (elapsed >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        const frameTime = elapsed / frameCountRef.current;
        
        let quality: 'high' | 'medium' | 'low' = 'high';
        if (fps < 30) quality = 'low';
        else if (fps < 50) quality = 'medium';
        
        setMetrics({
          fps,
          frameTime,
          quality,
          memory: (performance as any).memory?.usedJSHeapSize 
            ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) 
            : undefined,
        });
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      frameIdRef.current = requestAnimationFrame(measurePerformance);
    }
    
    frameIdRef.current = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  return metrics;
}

export function getQualitySettings(quality: 'high' | 'medium' | 'low') {
  const settings = {
    high: {
      particleCount: { hero: 15000, background: 3000, contact: 2000 },
      dpr: [1, 2],
      shadows: false,
      postProcessing: false,
      shaderComplexity: 'full',
    },
    medium: {
      particleCount: { hero: 8000, background: 1500, contact: 1000 },
      dpr: [1, 1.5],
      shadows: false,
      postProcessing: false,
      shaderComplexity: 'reduced',
    },
    low: {
      particleCount: { hero: 3000, background: 500, contact: 500 },
      dpr: [1, 1],
      shadows: false,
      postProcessing: false,
      shaderComplexity: 'minimal',
    },
  };
  
  return settings[quality];
}

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getDeviceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';
  
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  
  if (isMobile || cores < 4 || memory < 4) return 'low';
  if (cores >= 8 && memory >= 8) return 'high';
  return 'medium';
}