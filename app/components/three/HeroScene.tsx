'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroSceneProps {
  progress: number;
}

export function HeroScene({ progress }: HeroSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uProgress: { value: number };
    uMouse: { value: THREE.Vector2 };
  }>({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  });

  const particleCount = 15000;

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = 0.02 + Math.random() * 0.03;
      alphas[i] = 0.5 + Math.random() * 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute float phase;
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uMouse;
        varying float vAlpha;
        varying float vPhase;
        varying vec3 vPosition;
        
        void main() {
          vAlpha = alpha;
          vPhase = phase;
          vPosition = position;
          
          vec3 pos = position;
          
          float morph = uProgress;
          float ringRadius = 1.8;
          float ringWidth = 0.3;
          
          float distFromRing = abs(length(pos.xy) - ringRadius);
          float ringFactor = smoothstep(ringWidth, 0.0, distFromRing);
          
          float angle = atan(pos.y, pos.x);
          float crownHeight = 0.0;
          for (int i = 0; i < 5; i++) {
            float crownAngle = float(i) * 3.14159 * 2.0 / 5.0;
            float diff = abs(angle - crownAngle);
            diff = min(diff, 6.28318 - diff);
            crownHeight += smoothstep(0.4, 0.0, diff) * 0.6;
          }
          
          vec3 targetPos = pos;
          targetPos.xy = normalize(pos.xy) * ringRadius;
          targetPos.z = mix(pos.z, crownHeight, ringFactor);
          
          pos = mix(pos, targetPos, morph * morph * (3.0 - 2.0 * morph));
          
          float mouseInfluence = 0.15 * (1.0 - morph);
          pos.x += uMouse.x * mouseInfluence * (1.0 + sin(uTime + phase));
          pos.y += uMouse.y * mouseInfluence * (1.0 + cos(uTime + phase));
          
          pos.y += sin(uTime * 0.5 + phase) * 0.02 * (1.0 - morph);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        varying float vAlpha;
        varying float vPhase;
        varying vec3 vPosition;
        
        void main() {
          float dist = length(gl_PointCoord - 0.5);
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vAlpha;
          
          vec3 goldColor = mix(
            vec3(0.83, 0.69, 0.22),
            vec3(1.0, 0.84, 0.0),
            sin(uTime + vPhase * 3.0) * 0.5 + 0.5
          );
          
          float crownGlow = smoothstep(0.5, 1.0, vPosition.z) * (1.0 - uProgress);
          goldColor += vec3(1.0, 0.9, 0.3) * crownGlow * 0.5;
          
          gl_FragColor = vec4(goldColor, alpha * (0.5 + 0.5 * uProgress));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    pointsRef.current.geometry = geometry;
    pointsRef.current.material = material;
  }, []);

  useFrame((state, delta) => {
    if (uniformsRef.current) {
      uniformsRef.current.uTime.value += delta;
      uniformsRef.current.uProgress.value = progress;
    }
  });

  const handleMouseMove = (e: MouseEvent) => {
    uniformsRef.current.uMouse.value.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <points ref={pointsRef} />;
}