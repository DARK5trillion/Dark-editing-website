'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      sizes[i] = 0.005 + Math.random() * 0.015;
      alphas[i] = 0.1 + Math.random() * 0.3;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xD4AF37,
      sizeAttenuation: true,
    });

    pointsRef.current.geometry = geometry;
    pointsRef.current.material = material;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = pointsRef.current.geometry.attributes.velocity.array as Float32Array;
    const alphas = pointsRef.current.geometry.attributes.alpha.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3] * delta * 60;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

      if (positions[i * 3] > 20) positions[i * 3] = -20;
      if (positions[i * 3] < -20) positions[i * 3] = 20;
      if (positions[i * 3 + 1] > 15) positions[i * 3 + 1] = -15;
      if (positions[i * 3 + 1] < -15) positions[i * 3 + 1] = 15;
      if (positions[i * 3 + 2] > 5) positions[i * 3 + 2] = -10;
      if (positions[i * 3 + 2] < -10) positions[i * 3 + 2] = 5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={pointsRef} />;
}