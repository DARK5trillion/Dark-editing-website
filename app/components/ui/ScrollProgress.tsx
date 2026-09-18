'use client';

import { useEffect, useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function ScrollProgress() {
  const progress = useScrollProgress();
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = progress * Math.PI * 2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -progress * Math.PI * 2;
    }
  });

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-none" style={{ width: '80px', height: '80px' }}>
      <canvas
        ref={(el) => {
          if (el) {
            const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
            renderer.setSize(80, 80);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
            camera.position.z = 5;
            
            const geometry = new THREE.RingGeometry(0.35, 0.4, 64);
            const material = new THREE.MeshBasicMaterial({
              color: 0xD4AF37,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.8,
            });
            const ring = new THREE.Mesh(geometry, material);
            ringRef.current = ring;
            scene.add(ring);
            
            const geometry2 = new THREE.RingGeometry(0.42, 0.45, 64);
            const material2 = new THREE.MeshBasicMaterial({
              color: 0xFFD700,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.4,
            });
            const ring2 = new THREE.Mesh(geometry2, material2);
            ringRef2.current = ring2;
            scene.add(ring2);
            
            const animate = () => {
              renderer.render(scene, camera);
              requestAnimationFrame(animate);
            };
            animate();
          }
        }}
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-display text-xs font-bold text-gold-400" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}