'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GoldButton } from '@/components/ui/GoldButton';

const tiers = [
  { id: 1, name: 'Basic', price: '₹450', period: '/project', features: ['1 Video Edit', 'Up to 60s', '2 Revisions', '48hr Delivery'], highlight: false },
  { id: 2, name: 'Medium', price: '₹750', period: '/project', features: ['2 Video Edits', 'Up to 120s', '3 Revisions', '24hr Delivery', 'Thumbnail'], highlight: false },
  { id: 3, name: 'Premium', price: '₹999', period: '/project', features: ['3 Video Edits', 'Up to 180s', '5 Revisions', '12hr Delivery', 'Thumbnail + Poster', 'Color Grading'], highlight: true },
  { id: 4, name: 'Epic Monthly', price: '₹899', period: '/month', features: ['8 Videos/Month', 'Up to 60s each', 'Unlimited Revisions', 'Priority Delivery', 'All Graphics Included', 'Dedicated Support'], highlight: false },
  { id: 5, name: 'Pro Website', price: '₹8,999', period: 'one-time', features: ['5-Page Website', 'Responsive Design', 'CMS Included', 'SEO Optimized', '3 Months Support', 'Custom Domain Setup'], highlight: false },
];

export function PricingScene() {
  const groupRef = useRef<THREE.Group>(null);
  const cardsRef = useRef<Array<{ mesh: THREE.Mesh; index: number }>>([]);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const selectedIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    cardsRef.current = [];

    tiers.forEach((tier, i) => {
      const geometry = new THREE.BoxGeometry(1.6, 2.2, 0.15, 10, 10, 2);
      const material = new THREE.MeshPhysicalMaterial({
        color: tier.highlight ? 0xD4AF37 : 0x1A1A1A,
        metalness: tier.highlight ? 0.8 : 0.1,
        roughness: tier.highlight ? 0.2 : 0.8,
        clearcoat: tier.highlight ? 1.0 : 0.3,
        clearcoatRoughness: 0.1,
        transmission: 0.1,
        thickness: 0.1,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      const spacing = 2.0;
      const startX = -((tiers.length - 1) * spacing) / 2;
      mesh.position.set(startX + i * spacing, 0, -1.5);
      mesh.rotation.x = -0.1;

      mesh.userData = { index: i, basePosition: mesh.position.clone(), baseScale: mesh.scale.clone(), highlight: tier.highlight };
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
      const isSelected = selectedIndex.current === index;
      const { highlight } = mesh.userData;

      if (isHovered || isSelected) {
        gsap.to(mesh.position, { y: 0.3, duration: 0.4, ease: 'power2.out' });
        gsap.to(mesh.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.4, ease: 'power2.out' });
        if (highlight) {
          gsap.to((mesh.material as THREE.MeshPhysicalMaterial), { clearcoat: 1.0, duration: 0.4 });
        }
      } else {
        gsap.to(mesh.position, { y: mesh.userData.basePosition.y, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      }

      mesh.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.02;
    });
  });

  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  };

  const handleClick = (e: MouseEvent) => {
    const { camera } = state;
    raycaster.setFromCamera(mouseRef.current, camera);
    const intersects = raycaster.intersectObjects(cardsRef.current.map(c => c.mesh));
    if (intersects.length > 0) {
      selectedIndex.current = intersects[0].object.userData.index;
      // Particle burst effect would go here
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <group ref={groupRef}>
      {tiers.map((tier) => (
        <GoldButton key={tier.id} tier={tier} />
      ))}
    </group>
  );
}

// Need to import gsap
import { gsap } from 'gsap';