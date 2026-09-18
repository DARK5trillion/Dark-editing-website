'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GoldButton } from '@/components/ui/GoldButton';

export function ContactScene() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const particleCount = 2000;

  useEffect(() => {
    if (!particlesRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
      sizes[i] = 0.01 + Math.random() * 0.02;
      alphas[i] = 0.3 + Math.random() * 0.4;
      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: false,
      color: 0xD4AF37,
    });

    particlesRef.current.geometry = geometry;
    particlesRef.current.material = material;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;
    const alphas = particlesRef.current.geometry.attributes.alpha.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3] * delta * 60;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

      const dx = positions[i * 3] - mouseRef.current.x * 5;
      const dy = positions[i * 3 + 1] - mouseRef.current.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.5) {
        const force = (1.5 - dist) / 1.5;
        velocities[i * 3] += dx * force * 0.02;
        velocities[i * 3 + 1] += dy * force * 0.02;
        alphas[i] = Math.min(1, alphas[i] + force * 0.1);
      } else {
        alphas[i] = Math.max(0.3, alphas[i] - 0.01);
      }

      if (positions[i * 3] > 5) positions[i * 3] = -5;
      if (positions[i * 3] < -5) positions[i * 3] = 5;
      if (positions[i * 3 + 1] > 3) positions[i * 3 + 1] = -3;
      if (positions[i * 3 + 1] < -3) positions[i * 3 + 1] = 3;
      if (positions[i * 3 + 2] > 1) positions[i * 3 + 2] = -3;
      if (positions[i * 3 + 2] < -3) positions[i * 3 + 2] = 1;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.alpha.needsUpdate = true;
  });

  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <group ref={groupRef}>
      <points ref={particlesRef} />
      <GoldButton 
        position={[-2, -1.5, -1]} 
        label="WhatsApp" 
        icon="💬"
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919209358212'}`}
      />
      <GoldButton 
        position={[2, -1.5, -1]} 
        label="Instagram" 
        icon="📷"
        href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'darkeditingandwebsite'}`}
      />
    </group>
  );
}