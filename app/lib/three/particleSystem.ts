// Particle System Factory
import * as THREE from 'three';

export interface ParticleSystemOptions {
  count: number;
  radius?: number;
  sizeRange?: [number, number];
  alphaRange?: [number, number];
  color?: THREE.Color;
  blending?: THREE.Blending;
}

export function createParticleSystem(options: ParticleSystemOptions) {
  const {
    count,
    radius = 5,
    sizeRange = [0.01, 0.05],
    alphaRange = [0.3, 0.8],
    color = new THREE.Color(0xD4AF37),
    blending = THREE.AdditiveBlending,
  } = options;

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const phases = new Float32Array(count);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = radius * (0.5 + Math.random() * 0.5);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    sizes[i] = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    alphas[i] = alphaRange[0] + Math.random() * (alphaRange[1] - alphaRange[0]);
    phases[i] = Math.random() * Math.PI * 2;
    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    transparent: true,
    depthWrite: false,
    blending,
    color,
    sizeAttenuation: true,
    vertexColors: false,
  });

  return new THREE.Points(geometry, material);
}

export function updateParticleSystem(
  points: THREE.Points,
  delta: number,
  bounds: { x: number; y: number; z: number } = { x: 20, y: 15, z: 10 },
  mouseInfluence?: { x: number; y: number; strength: number }
) {
  const positions = points.geometry.attributes.position.array as Float32Array;
  const velocities = points.geometry.attributes.velocity.array as Float32Array;
  const alphas = points.geometry.attributes.alpha.array as Float32Array;
  const count = positions.length / 3;

  for (let i = 0; i < count; i++) {
    positions[i * 3] += velocities[i * 3] * delta * 60;
    positions[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
    positions[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

    if (mouseInfluence) {
      const dx = positions[i * 3] - mouseInfluence.x;
      const dy = positions[i * 3 + 1] - mouseInfluence.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseInfluence.strength) {
        const force = (mouseInfluence.strength - dist) / mouseInfluence.strength;
        velocities[i * 3] += dx * force * 0.02;
        velocities[i * 3 + 1] += dy * force * 0.02;
        alphas[i] = Math.min(1, alphas[i] + force * 0.1);
      } else {
        alphas[i] = Math.max(0.1, alphas[i] - 0.01);
      }
    }

    // Wrap around bounds
    if (positions[i * 3] > bounds.x) positions[i * 3] = -bounds.x;
    if (positions[i * 3] < -bounds.x) positions[i * 3] = bounds.x;
    if (positions[i * 3 + 1] > bounds.y) positions[i * 3 + 1] = -bounds.y;
    if (positions[i * 3 + 1] < -bounds.y) positions[i * 3 + 1] = bounds.y;
    if (positions[i * 3 + 2] > bounds.z) positions[i * 3 + 2] = -bounds.z;
    if (positions[i * 3 + 2] < -bounds.z) positions[i * 3 + 2] = bounds.z;
  }

  points.geometry.attributes.position.needsUpdate = true;
  points.geometry.attributes.alpha.needsUpdate = true;
}