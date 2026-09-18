'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';

extend({ ...THREE });

interface ThreeProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ThreeProvider({ children, fallback }: ThreeProviderProps) {
  const [webgpu, setWebgpu] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkWebGPU = async () => {
      if ('gpu' in navigator) {
        try {
          const adapter = await (navigator as any).gpu.requestAdapter();
          if (adapter) {
            setWebgpu(true);
          }
        } catch {
          setWebgpu(false);
        }
      } else {
        setWebgpu(false);
      }
    };
    checkWebGPU();
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      gl={{ 
        antialias: true, 
        alpha: true, 
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      shadows={false}
      dpr={[1, 2]}
    >
      {children}
      {fallback}
    </Canvas>
  );
}