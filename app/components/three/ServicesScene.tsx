'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GlassCard } from '@/components/ui/GlassCard';

const services = [
  { id: 1, title: 'Video Editing', desc: 'Reels, Ads, Promos, Cinematic', icon: '🎬' },
  { id: 2, title: 'Graphics & Motion', desc: 'Thumbnails, Posters, Visuals', icon: '🎨' },
  { id: 3, title: 'Social Media Content', desc: 'Instagram, YouTube, Facebook', icon: '📱' },
  { id: 4, title: 'Website Design', desc: 'Business, Portfolio, E-Commerce', icon: '🌐' },
  { id: 5, title: 'Brand Editing', desc: 'Logo, Identity, Highlights', icon: '✨' },
  { id: 6, title: 'Color Grading', desc: 'Cinematic Look, Premium Feel', icon: '🎞️' },
  { id: 7, title: 'Reels & Shorts', desc: 'Trendy, Engaging, Viral', icon: '📹' },
  { id: 8, title: 'SEO & Digital Support', desc: 'Rank Higher, Grow Faster', icon: '📈' },
];

export function ServicesScene() {
  const groupRef = useRef<THREE.Group>(null);
  const cardsRef = useRef<Array<{ mesh: THREE.Mesh; index: number }>>([]);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hoveredIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    cardsRef.current = [];

    services.forEach((service, i) => {
      const geometry = new THREE.PlaneGeometry(1.8, 1.2);
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      const angle = (i / services.length) * Math.PI * 2;
      const radius = 3.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.5,
        Math.sin(angle) * radius - 2
      );
      mesh.rotation.y = -angle + Math.PI / 2;
      mesh.rotation.x = -0.15;

      mesh.userData = { index: i, basePosition: mesh.position.clone(), baseRotation: mesh.rotation.clone() };
      group.add(mesh);
      cardsRef.current.push({ mesh, index: i });
    });
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    raycaster.setFromCamera(mouseRef.current, camera);
    const intersects = raycaster.intersectObjects(cardsRef.current.map(c => c.mesh));

    cardsRef.current.forEach(({ mesh, index }) => {
      const isHovered = intersects.length > 0 && intersects[0].object === mesh;
      
      if (isHovered && hoveredIndex.current !== index) {
        hoveredIndex.current = index;
        gsap.to(mesh.position, { z: mesh.userData.basePosition.z + 0.5, duration: 0.3, ease: 'power2.out' });
        gsap.to(mesh.scale, { x: 1.05, y: 1.05, duration: 0.3, ease: 'power2.out' });
      } else if (!isHovered && hoveredIndex.current === index) {
        hoveredIndex.current = null;
        gsap.to(mesh.position, { z: mesh.userData.basePosition.z, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        gsap.to(mesh.scale, { x: 1, y: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      }

      mesh.position.y = mesh.userData.basePosition.y + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.05;
      mesh.rotation.y = mesh.userData.baseRotation.y + Math.sin(state.clock.getElapsedTime() * 0.2 + index) * 0.02;
    });
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
      {services.map((service, i) => (
        <GlassCard key={service.id} index={i} service={service} />
      ))}
    </group>
  );
}